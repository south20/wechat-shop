<?php

namespace app\controllers\shop;

use app\controllers\pay\WechatController1;
use app\models\admin\system\SystemSmsModel;
use app\models\merchant\distribution\AgentModel;
use app\models\merchant\distribution\DistributionAccessModel;
use app\models\merchant\distribution\OperatorModel;
use app\models\merchant\distribution\SuperModel;
use app\models\merchant\user\LevelModel;
use app\models\merchant\vip\UnpaidVipModel;
use app\models\merchant\vip\VipConfigModel;
use app\models\merchant\vip\VipModel;
use app\models\shop\GoodsAdvanceSaleModel;
use app\models\shop\GroupOrderModel;
use app\models\shop\MerchantCategoryModel;
use app\models\shop\SaleGoodsStockModel;
use app\models\shop\ShopAssembleAccessModel;
use app\models\shop\ShopAssembleModel;
use app\models\shop\ShopBargainInfoModel;
use app\models\shop\ShopGoodsModel;
use app\models\shop\VipAccessModel;
use app\models\shop\VoucherTypeModel;
use app\models\system\SystemMerchantMiniAccessModel;
use app\models\system\SystemMerchantMiniSubscribeTemplateAccessModel;
use app\models\system\SystemMerchantMiniSubscribeTemplateModel;
use app\models\system\SystemPicServerModel;
use app\models\system\SystemSmsTemplateAccessModel;
use app\models\system\SystemSmsTemplateIdModel;
use app\models\system\SystemWxConfigModel;
use app\models\tuan\LeaderModel;
use Qcloud\Sms\SmsSingleSender;
use tools\pay\mini_pay\MiniPay;
use tools\pay\Payx;
use yii;
use yii\base\Exception;
use yii\web\ShopController;
use app\models\shop\StockModel;
use app\models\shop\GoodsModel;
use app\models\shop\CashbackModel;
use app\models\shop\VoucherModel;
use app\models\shop\ContactModel;
use app\models\shop\OrderModel;
use app\models\shop\SubOrderModel;
use app\models\core\TableModel;
use app\models\core\CosModel;
use app\models\shop\UserModel;
use EasyWeChat\Factory;
use app\models\shop\ShopExpressTemplateDetailsModel;
use app\models\merchant\pay\PayModel;
use app\models\shop\CartModel;
use app\models\core\UploadsModel;
use app\models\shop\ShopExpressTemplateModel;
use app\models\shop\ScoreModel;
use app\models\admin\app\AppAccessModel;
use app\models\admin\system\SystemCosModel;

require_once yii::getAlias('@vendor/wxpay/Wechat.php');
require_once yii::getAlias('@vendor/tencentyun/image/sample.php');
include dirname(dirname(__DIR__)) . '/extend/tools/pay/MiniPay/MiniPay.php';
include dirname(dirname(__DIR__)) . '/extend/tools/pay/Pay.php';
include dirname(dirname(__DIR__)) . '/extend/tools/pay/Refund/Refund.php';

/**
 * ????????????????????????
 * ??????:/admin/rule
 * @throws Exception if the model cannot be found
 * @return array
 */
class OrderController extends ShopController
{

    public $enableCsrfValidation = false; //??????CSRF???????????????????????????????????????


    public function actionAdd()
    {
        if (yii::$app->request->isPost) {
            $request = yii::$app->request; //?????? request ??????
            $params = $request->bodyParams; //??????body??????
            $goodsModel = new GoodsModel();
            $orderGroupModel = new OrderModel();

            $userModel = new UserModel();
            $user = $userModel->find(['id' => yii::$app->session['user_id']]);
            if ($user['status'] == 200) {
                if ($user['data']['status'] == 0) {
                    return result(500, '???????????????????????????????????????');
                }
            } else {
                return $user;
            }
//            $bool = getConfig(yii::$app->session['user_id'] . '-order');
//            if ($bool == true) {
//                return result(500, "???????????????");
//            }
            if (isset($params['group_type']) && $params['group_type'] == 1) {// ????????????
                if (!isset($params['number']) || empty($params['number'])) {
                    return result(500, "??????????????????");
                }
                return $this->groupOrder($params);
//            }else if (isset($params['advance_sale']) && $params['advance_sale'] == 1) {// ??????????????????
//                return $this->advanceSaleOrder($params);
            } else {
                $tuanConfig = new ConfigModel();
                $tuan = $tuanConfig->do_one(['key' => 'ccvWPn', 'merchant_id' => 13]);
                if ($tuan['status'] == 200) {
                    if ($tuan['data']['is_open'] == 1) {
                        if ($params['leader_id'] != 0) {
                            $leaderModel = new LeaderModel();
                            $leader = $leaderModel->do_one(['status' => 1, 'state' => 0, 'uid' => $params['leader_id']]);
                            if ($leader['status'] != 200) {
                                return result(500, "???????????????????????????!");
                            }
                        }
                    } else {
                        $params['leader_id'] = 0;
                    }

                } else {
                    $params['leader_id'] = 0;
                }
                $params['goods'] = json_decode($params['goods'], true);
                do {
                    $transaction_order_sn = "t_" . order_sn();
                    $orderFindData['transaction_order_sn'] = $transaction_order_sn;
                    $rs = $orderGroupModel->find($orderFindData);
                } while ($rs['status'] == 200);
                for ($i = 0; $i < count($params['goods']); $i++) {
                    if (isset($params['goods'][$i]['solitaire_id'])) {
                        $solitaireModel = new ShopSolitaireModel();
                        $solitaireInfo = $solitaireModel->do_one(['id' => $params['goods'][$i]['solitaire_id']]);
                        if ($solitaireInfo['status'] != 200) {
                            echo json_encode(result(500, "???????????????????????????"), JSON_UNESCAPED_UNICODE);
                            die();
                        }
                        if ($solitaireInfo['data']['end_time'] < time()) {
                            echo json_encode(result(500, "????????????????????????"), JSON_UNESCAPED_UNICODE);
                            die();
                        }
                        $solitaireGoodsIds = json_decode($solitaireInfo['data']['goods_ids'], true);
                    }

                    $goods = $params['goods'][$i]['list'];

                    for ($j = 0; $j < count($goods); $j++) {
                        if (isset($params['goods'][$i]['solitaire_id'])) {
                            if (!in_array($goods[$j]['goods_id'], $solitaireGoodsIds)) {
                                echo json_encode(result(500, "?????????????????????????????????"), JSON_UNESCAPED_UNICODE);
                                die();
                            }
                        }
                        $goodData = $goodsModel->find(['id' => $goods[$j]['goods_id'], 'status' => 1]);
                        $type = 0;
                        if (count($params['goods']) == 1 && count($goods) == 1) {
                            if ($goodData['status'] != 200) {
                                echo json_encode(result(500, "????????????????????????????????????"));
                                die();
                            }
                            if ($goodData['data']['is_open_assemble']) {
                                $type = 2; //????????????;
                            }
                            if ($goodData['data']['is_bargain']) {
                                $type = 3; //????????????;
                            }
                        } else {
                            if ($goodData['status'] != 200) {
                                echo json_encode(result(500, "????????????????????????????????????"));
                                die();
                            }
                            if ($goodData['data']['is_open_assemble']) {
                                echo json_encode(result(500, "??????????????????????????????"));
                                die();
                            }
                            if ($goodData['data']['is_bargain']) {
                                echo json_encode(result(500, "??????????????????????????????" . $goodData['data']['name']));
                                die();
                            }
                            $type = 1;//???????????????
                        }
                    }
                    $data['bargin_id'] = isset($params['bargin_id']) ? $params['bargin_id'] : "";
                    $data['estimated_service_time'] = isset($params['estimated_service_time']) ? $params['estimated_service_time'] : "";
                    $data['supplier_id'] = $params['goods'][$i]['supplier_id'];
                    $data['leader_id'] = $params['leader_id'];
                    $data['type'] = $params['type'];
                    $data['partner_id'] = $params['partner_id'] ?? 0;
                    $data['user_contact_id'] = isset($params['user_contact_id']) ? $params['user_contact_id'] : 0;
                    $data['voucher_id'] = isset($params['goods'][$i]['voucher_id']) ? $params['goods'][$i]['voucher_id'] : 0;
                    $data['remark'] = isset($params['goods'][$i]['remark']) ? $params['goods'][$i]['remark'] : "";
                    $data['solitaire_id'] = isset($params['goods'][$i]['solitaire_id']) ? $params['goods'][$i]['solitaire_id'] : 0;
                    $data['transaction_order_sn'] = $transaction_order_sn;
                    if ($params['user_contact_id'] == 0) {
                        $data['name'] = $params['name'];
                        $data['phone'] = $params['phone'];
                    }
                    $data = $this->ptrder($goods, $data);//????????????
                    if ($data['status'] == 200) {
                        for ($j = 0; $j < count($goods); $j++) {
                            $cartModel = new CartModel();
                            $res = $cartModel->delete(['goods_id' => $goods[$j]['goods_id'], 'user_id' => yii::$app->session['user_id'], 'key' => yii::$app->session['key'], 'merchant_id' => yii::$app->session['merchant_id']]);

                        }

                    }
                }
                setConfig(yii::$app->session['user_id'] . '-order', true, '5');
                return $data;
            }
        } else {
            return result(500, "??????????????????");
        }
    }

    function order1()
    {
        $order = array();
    }

    // ????????????
    function test1($data)
    {
        //????????????????????????
        //??????vip  return ??????
        $vip = $this->vip();

        $this->goods();


        $res = array();
        $appaccessModel = new AppAccessModel();
        $merchant = $appaccessModel->find(['merchant_id' => yii::$app->session['merchant_id']]);
        if ($merchant['status'] != 200) {
            echo json_encode(result(500, '???????????????'));
            die();
        }
        if ($res['order']['payment_money'] <= ($merchant['data']['starting_price'] - 0.01)) {
            $aaa = $merchant['data']['starting_price'] - $res['order']['payment_money'];
            echo json_encode(result(500, "????????????{$merchant['data']['starting_price']}??????????????????{$aaa}???"));
            die();
        }

        $goods[0] = array(
            'price' => '',
            'number' => '',
            'leader_money' => '',//??????   *  ???????????????
            'commission' => '', //??????
        );
        if ($data['supplier_id'] == 0) {
            //??????????????????
            $this->mj();
        }


        //??????????????? return ???????????????
        $this->voucher();
        //???????????????
        $this->kdf();
        return $goods;
    }

    public function goods($goods, $data)
    {
        $user_id = yii::$app->session['user_id'];
        $key = yii::$app->session['key'];
        $merchant_id = yii::$app->session['merchant_id'];
        $stockModel = new StockModel();
        $goodModel = new GoodsModel();
        $orderGroupModel = new OrderModel();
        $total_price = 0;
        $service_goods_status = 0;
        $address = "";
        $name = "";
        $phone = "";
        $number = 0;
        $is_bargain = 0;
        $goodsname = "";
        $weight = 0;
        do {
            $order_sn = order_sn();
            $orderFindData['order_sn'] = $order_sn;
            $rs = $orderGroupModel->find($orderFindData);
        } while ($rs['status'] == 200);

        for ($i = 0; $i < count($goods); $i++) {
            $stockData = $stockModel->find(['id' => $goods[$i]['stock_id']]);
            $goodData = $goodModel->find(['id' => $goods[$i]['goods_id']]);
            if ($goodData['status'] != 200 && $stockData['status'] != 200) {
                echo json_encode(result(500, "????????????????????????????????????"));
                die();
            }

            if ($goodData['data']['is_recruits'] == 1) {
                $sql = "select count(id)as num from shop_order_group where (status >2 or status =1) and  user_id = {$user_id}";
                $is_recruits = $orderGroupModel->querySql($sql);
                if ($is_recruits[0]['num'] != 0) {
                    echo json_encode(result(500, "????????????????????????????????????????????????"));
                    die();
                }
            }
            if (count($goods) == 1 && $goodData['data']['type'] == 3 && $goodData['data']['service_goods_is_ship'] == 1) {
                $service_goods_status = 1;
            }
            if ($goodData['data']['is_limit'] == 1 && $goodData['data']['limit_number'] > 0) { // ????????????????????????????????????
                $sql = "SELECT sum(so.number) as total FROM shop_order_group as sog
                          LEFT JOIN shop_order as so ON sog.order_sn = so.order_group_sn WHERE  so.goods_id = {$goods[$i]['goods_id']} and sog.`status` in  (0,1,3,5,6,7) and sog.user_id = {$user_id} ";
                $total = $orderGroupModel->querySql($sql);
                $total[0]['total'] = $total[0]['total'] == null ? 0 : $total[0]['total'];
                if ((int)$total[0]['total'] >= (int)$goodData['data']['limit_number']) {
                    echo json_encode(result(500, "????????????????????????"));
                    die();
                }
                if ($goods[$i]['number'] > (int)$goodData['data']['limit_number']) {
                    echo json_encode(result(500, "????????????????????????"));
                    die();
                }
            }
            $time = time();
            $sql = "SELECT * FROM `shop_flash_sale_group` where FIND_IN_SET({$goods[$i]['goods_id']},goods_ids) and start_time <={$time} and end_time >={$time} and `key` = '{$key}' and merchant_id = {$merchant_id} and delete_time is null;";
            $res = yii::$app->db->createCommand($sql)->queryAll();

            if (count($res) == 0) {
                if ($stockData['data']['number'] == 0) {
                    echo json_encode(result(500, "?????????{$goodData['data']['name']}-{$stockData['data']['property1_name']}-{$stockData['data']['property1_name']}?????????!"));
                    die();
                } else if ($stockData['data']['number'] < $goods[$i]['number']) {
                    echo json_encode(result(500, "?????????{$goodData['data']['name']}-{$stockData['data']['property1_name']}-{$stockData['data']['property1_name']}????????????????????????!"));
                    die();
                }
                $subGoods[$i]['price'] = $stockData['data']['price'];
                $subGoods[$i]['is_flash_sale'] = 0;
            } else {
                $time = time();
                $sql = "SELECT * FROM `shop_flash_sale` as a  inner join shop_flash_sale_group as b on a.flash_sale_group_id and b.id  where a.goods_id = {$goods[$i]['goods_id']} and a.delete_time is null and b.delete_time is null and b.start_time <={$time} and b.end_time >={$time}  ";
                $res = yii::$app->db->createCommand($sql)->queryAll();
                // var_dump($sql);die();
                $property = explode("-", $res[0]['property']);
                for ($k = 0; $k < count($property); $k++) {
                    $a = json_decode($property[$k], true);
                    if ($stockData['data']['id'] == $a['stock_id']) {
                        if ($a['stocks'] == 0) {
                            echo json_encode(result(500, "?????????{$goodData['data']['name']}-{$stockData['data']['property1_name']}-{$stockData['data']['property1_name']}?????????!"));
                            die();
                        } else if ($a['stocks'] < $goods[$i]['number']) {
                            echo json_encode(result(500, "?????????{$goodData['data']['name']}-{$stockData['data']['property1_name']}-{$stockData['data']['property1_name']}????????????????????????!"));
                            die();
                        }
                        $subGoods[$i]['price'] = $a['flash_price'];
                        $stockData['data']['price'] = $a['flash_price'];
                    }

                }
                $subGoods[$i]['is_flash_sale'] = 1;
            }

            $is_bargain = 0;
            //??????
            if ($data['bargin_id'] != 0) {
                if ($goodData['data']['is_bargain'] == 1) {
                    $bargainModel = new ShopBargainInfoModel();
                    $bargins = $bargainModel->do_one(['id' => $data['bargin_id'], 'goods_id' => $goodData['data']['id'], 'promoter_user_id' => yii::$app->session['user_id']]);
                    $barginInfo = $bargainModel->do_one(['orderby' => 'id desc', 'goods_id' => $goodData['data']['id'], 'promoter_user_id' => yii::$app->session['user_id'], 'promoter_sn' => $bargins['data']['promoter_sn']]);
                    $subGoods[$i]['price'] = $barginInfo['data']['goods_price'];
                    $stockData['data']['price'] = $barginInfo['data']['goods_price'];
                    $is_bargain = 1;
                }
            }

            if ($i == 0) {
                $total_price = $stockData['data']['price'] * $goods[$i]['number'];
                $goodsname = $goodData['data']['name'];
            } else {
                $total_price = $total_price + $stockData['data']['price'] * $goods[$i]['number'];
                $goodsname = $goodsname . "," . $goodData['data']['name'];
            }
            $number = $number + $goods[$i]['number'];
            //???????????????
            $supplier_id = $goodData['data']['supplier_id'];
            $subGoods[$i]['`key`'] = yii::$app->session['key'];
            $subGoods[$i]['merchant_id'] = yii::$app->session['merchant_id'];
            $subGoods[$i]['user_id'] = yii::$app->session['user_id'];
            $subGoods[$i]['goods_id'] = $goodData['data']['id'];
            $subGoods[$i]['order_group_sn'] = $order_sn;
            $subGoods[$i]['stock_id'] = $stockData['data']['id'];
            $subGoods[$i]['pic_url'] = $stockData['data']['pic_url'];
            $subGoods[$i]['name'] = $goodData['data']['name'];
            $subGoods[$i]['number'] = $goods[$i]['number'];
            $subGoods[$i]['price'] = $stockData['data']['price'];
            $weight = $weight + $stockData['data']['weight'] * $goods[$i]['number'];
            $subGoods[$i]['payment_money'] = $stockData['data']['price'] * $goods[$i]['number'];
            $subGoods[$i]['total_price'] = $stockData['data']['price'] * $goods[$i]['number'];
            $subGoods[$i]['property1_name'] = isset($goods[$i]['property1_name']) ? $goods[$i]['property1_name'] : "";
            $subGoods[$i]['property2_name'] = isset($goods[$i]['property2_name']) ? $goods[$i]['property2_name'] : "";
        }

        if ($data['user_contact_id'] == 0) {
            //????????????
            $phone = $data['phone'];
            $name = $data['name'];
        }
        $express_price = 0.00;
        if ($data['type'] == 0) {
            //????????????
            $contactModel = new ContactModel();
            if (!isset($data['user_contact_id'])) {
                return result(500, '?????????????????????');
            }
            $contactParams['id'] = $data['user_contact_id'];
            $contactParams['user_id'] = yii::$app->session['user_id'];
            $contactData = $contactModel->find($contactParams);
            if ($contactData['status'] != 200) {
                return result(500, '????????????????????????');
            }
            $address = $contactData['data']['loction_address'] . $contactData['data']['loction_name'] . "-" . $contactData['data']['address'];
            $phone = $contactData['data']['phone'];
            $name = $contactData['data']['name'];
            //?????????
            $express = $this->express($number, $contactData['data']['id'], $weight, $data['supplier_id']);
            if ($express['status'] != 200) {
                return $express;
            } else {
                $express_price = isset($express['data']) ? $express['data'] : 0.00;
            }
        } else if ($data['type'] == 1) { // ??????
            $express_price = 0;
        } else if ($data['type'] == 2) { // ????????????
            $express_price = 0;
            $contactModel = new ContactModel();
            if (!isset($data['user_contact_id'])) {
                return result(500, '?????????????????????');
            }
            $contactParams['id'] = $data['user_contact_id'];
            $contactParams['user_id'] = yii::$app->session['user_id'];
            $contactData = $contactModel->find($contactParams);
            if ($contactData['status'] != 200) {
                echo json_encode(result(500, '????????????????????????'));
                die();
            }
            $contactData['data']['city'] = $contactData['data']['city'] == "" ? $contactData['data']['province'] : $contactData['data']['city'];
            $address = $contactData['data']['province'] . "-" . $contactData['data']['city'] . "-" . $contactData['data']['area'] . "-" . $contactData['data']['loction_name'] . $contactData['data']['address'];
            $phone = $contactData['data']['phone'];
            $name = $contactData['data']['name'];

            $tuanLeaderModel = new \app\models\tuan\LeaderModel();
            if ($data['supplier_id'] == 0) {
                $lerder = $tuanLeaderModel->do_one(['uid' => $data['leader_id']]);
                if ($lerder['data']['is_tuan_express'] == 0) {
                    echo json_encode(result(500, "????????????????????????"));
                    die();
                }
                if ($lerder['data']['state'] == 1 || $lerder['data']['state'] == 2) {
                    echo json_encode(result(500, "????????????????????????????????????"));
                    die();
                }
                $express_price = $lerder['data']['tuan_express_fee'];
            } else {
                $lerder = $tuanLeaderModel->do_one(['supplier_id' => $data['supplier_id']]);
                if ($lerder['data']['is_tuan_express'] == 0) {
                    echo json_encode(result(500, "????????????????????????"));
                    die();
                }
                $express_price = $lerder['data']['tuan_express_fee'];
            }
        }
        if (count($goods) == 1 && $goodData['data']['is_parcel'] == 1) {
            $express_price = 0.00;
        }

        $order = array(
            '`key`' => yii::$app->session['key'],
            'merchant_id' => yii::$app->session['merchant_id'],
            'user_id' => yii::$app->session['user_id'],
            'goodsname' => $goodsname,
            'order_sn' => $order_sn,
            'user_contact_id' => $data['user_contact_id'],
            'address' => $address,
            'phone' => $phone,
            'name' => $name,
            'total_price' => $total_price + $express_price,
            'payment_money' => $total_price + $express_price,
            'voucher_id' => isset($data['voucher_id']) ? $data['voucher_id'] : 0,
            'express_price' => $express_price,
            'express_type' => $data['type'],
            'after_sale' => -1,
            'status' => 0,
            'remark' => isset($data['remark']) ? $data['remark'] : "",
            'supplier_id' => $data['supplier_id'],
            'partner_id' => $data['partner_id'] ?? 0,
            'create_time' => time(),
            'service_goods_status' => $service_goods_status,
            'estimated_service_time' => isset($goods['estimated_service_time']) ? $goods['estimated_service_time'] : "",
            'is_assemble' => 0,
            'is_tuan' => $data['is_tuan'],
            'is_bargain' => $is_bargain,
            'solitaire_id' => $data['solitaire_id'] ?? 0,
        );

        unset($data['partner_id']);
        $res['order'] = $order;
        $res['subOrder'] = $subGoods;
        return result(200, "????????????", $res);
    }

    function mj($data)
    {
        $appModel = new \app\models\admin\app\AppAccessModel();
        $app = $appModel->find(['merchant_id' => yii::$app->session['merchant_id'], '`key`' => yii::$app->session['key']]);
        $reduction_info = json_decode($app['data']['reduction_info'], true);
        if ($reduction_info['is_reduction'] == 1) {
            for ($i = 0; $i < count($reduction_info['reduction_achieve']); $i++) {
                // ???????????????$i+1??????????????????????????????
                for ($j = $i + 1; $j < count($reduction_info['reduction_achieve']); $j++) {
                    // ???????????????????????????????????????
                    if ($reduction_info['reduction_achieve'][$i] > $reduction_info['reduction_achieve'][$j]) {
                        $tem = $reduction_info['reduction_achieve'][$i]; // ???????????????????????????$i??????
                        $reduction_info['reduction_achieve'][$i] = $reduction_info['reduction_achieve'][$j]; // ?????????????????????
                        $reduction_info['reduction_achieve'][$j] = $tem; // ??????????????????

                        $tem1 = $reduction_info['reduction_decrease'][$i]; // ???????????????????????????$i??????
                        $reduction_info['reduction_decrease'][$i] = $reduction_info['reduction_decrease'][$j]; // ?????????????????????
                        $reduction_info['reduction_decrease'][$j] = $tem1; // ??????????????????

                        $tem2 = $reduction_info['free_shipping'][$i]; // ???????????????????????????$i??????
                        $reduction_info['free_shipping'][$i] = $reduction_info['free_shipping'][$j]; // ?????????????????????
                        $reduction_info['free_shipping'][$j] = $tem2; // ??????????????????
                    }
                }
            }

            $price = $res['order']['payment_money'] - $res['order']['express_price'];
            $reduction_decrease = 0;
            $free_shipping = false;

            for ($i = 0; $i < count($reduction_info['reduction_achieve']); $i++) {
                if ($price >= $reduction_info['reduction_achieve'][$i]) {
                    $reduction_decrease = (float)$reduction_info['reduction_decrease'][$i];
                    $free_shipping = $reduction_info['free_shipping'][$i];
                }
            }
            $res['order']['reduction_achieve'] = $reduction_decrease;
            if ($free_shipping == true) {
                $res['order']['total_price'] = $res['order']['payment_money'] - $res['order']['express_price'];
                $res['order']['express_price'] = 0;
                $res['order']['payment_money'] = $price - $reduction_decrease;
            } else {
                $res['order']['payment_money'] = $price - $reduction_decrease + $res['order']['express_price'];
            }

        }

    }

    public function vip($payment_money)
    {
        $appModel = new AppAccessModel();
        $appWhere['`key`'] = yii::$app->session['key'];
        $appInfo = $appModel->find($appWhere);
        if ($appInfo['status'] != 200 || $appInfo['data']['user_vip'] == 0) {
            return result(200, "?????????????????????????????????", $payment_money);
        }
        $discount_ratio = 1;
        if ($appInfo['data']['user_vip'] == 1) {
            $userModel = new UserModel();
            $orderGroupModel = new OrderModel();
            $where['id'] = yii::$app->session['user_id'];
            $userInfo = $userModel->find($where);
            if ($userInfo['status'] != 200) {
                return result(500, '??????????????????');
            }
            $discount_ratio = 1;
            if ($userInfo['data']['is_vip'] == 1 && $userInfo['data']['vip_validity_time'] >= time()) {
                //??????????????????????????????vip??????????????????????????????
                $vipAccessModel = new VipAccessModel();
                $key = yii::$app->session['key'];
                $merchant_id = yii::$app->session['merchant_id'];
                $user_id = yii::$app->session['user_id'];
                $where_ = "sva.`key` = '{$key}' 
            AND sva.merchant_id = {$merchant_id} 
            AND sva.user_id = {$user_id}
            AND sva.`status`=1
            AND sv.`status`=1";
                $sql = "SELECT sva.*,sv.`status` as sv_status FROM shop_vip_access as sva
                          LEFT JOIN shop_vip as sv ON sva.vip_id = sv.id WHERE  " . $where_;
                $list = $orderGroupModel->querySql($sql);
                if ($list) {
                    $vipConfigModel = new VipConfigModel();
                    $whereConfig['key'] = yii::$app->session['key'];
                    $whereConfig['merchant_id'] = yii::$app->session['merchant_id'];
                    $whereConfig['status'] = 1;
                    $info = $vipConfigModel->one($whereConfig);
                    $payment_money = bcmul($payment_money, $info['data']['discount_ratio'], 2); // ??????????????????
                    $discount_ratio = $info['data']['discount_ratio'];
                }
            }
        } else {
            $vipModel = new UnpaidVipModel();
            $vipWhere['key'] = yii::$app->session['key'];
            $vipWhere['merchant_id'] = yii::$app->session['merchant_id'];
            $vipWhere['limit'] = false;
            $vipInfo = $vipModel->do_select($vipWhere);

            $orderModel = new GroupOrderModel();
            $orderWhere['user_id'] = yii::$app->session['user_id'];
            $orderWhere['or'] = ['or', ['=', 'status', 6], ['=', 'status', 7], ['=', 'status', 3]];
            $orderWhere['limit'] = false;
            $orderWhere['field'] = 'sum(payment_money) as payment_money';
            $orderInfo = $orderModel->do_select($orderWhere);
            $pay_price = 0;
            $discount_ratio = 1;
            if ($orderInfo['status'] == 200) {
                $pay_price = $orderInfo['data'][0]['payment_money'];
            }
            if ($vipInfo['status'] == 200) {
                $minLev = reset($vipInfo['data']);//????????????
                $maxLev = end($vipInfo['data']);//????????????
                //?????????????????????????????????
                if ($pay_price >= $maxLev['min_score']) {
                    $discount_ratio = $maxLev['discount_ratio'];
                }
                //????????????????????????????????????
                if ($pay_price >= $minLev['min_score'] && $pay_price < $maxLev['min_score']) {
                    foreach ($vipInfo['data'] as $key => $val) {
                        if ($pay_price >= $val['min_score']) {
                            $discount_ratio = $val['discount_ratio'];
                        }
                    }
                }

            }
        }
        return result(200, "?????????????????????????????????", $discount_ratio);
    }

}
