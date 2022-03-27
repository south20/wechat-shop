<?php

namespace app\controllers\merchant\shop;

use app\models\admin\app\AppAccessModel;
use app\models\admin\user\SystemAccessModel;
use app\models\core\TableModel;
use app\models\merchant\distribution\DistributionAccessModel;
use app\models\merchant\system\OperationRecordModel;
use app\models\merchant\user\MerchantModel;
use app\models\shop\AdvanceOrderModel;
use app\models\shop\BalanceModel;
use app\models\shop\GroupOrderModel;
use app\models\shop\ShopUserModel;
use app\models\shop\SubOrdersModel;
use app\models\shop\UserModel;
use app\models\system\SystemMerchantMiniAccessModel;
use app\models\system\SystemMerchantMiniSubscribeTemplateAccessModel;
use app\models\system\SystemMerchantMiniSubscribeTemplateModel;
use app\models\tuan\LeaderModel;
use foo\bar;
use tools\pay\Payx;
use yii;
use yii\db\Exception;
use yii\web\MerchantController;
use app\models\shop\OrderModel;
use app\models\core\SMS\SMS;
use app\models\core\UploadsModel;
use app\models\core\CosModel;
use app\models\core\WxConfigModel;
use app\models\merchant\pay\PayModel;
use app\models\shop\SubOrderModel;
use EasyWeChat\Factory;
use app\models\shop\AfterInfoModel;
use app\models\shop\ElectronicsModel;
use app\models\shop\SystemExpressModel;

require_once yii::getAlias('@vendor/wxpay/Wechat.php');
include dirname(dirname(dirname(__DIR__))) . '/extend/tools/pay/Refund/Refund.php';
include dirname(dirname(dirname(__DIR__))) . '/extend/tools/pay/Pay.php';

/**
 * 应用类目表控制器
 * 地址:/admin/rule
 * @throws Exception if the model cannot be found
 * @return array
 */
class OrderController extends MerchantController
{

    public $enableCsrfValidation = false; //禁用CSRF令牌验证，可以在基类中设置

    public function behaviors()
    {
        return [
            'token' => [
                'class' => 'yii\filters\MerchantFilter', //调用过滤器
                // 'only' => ['single'], //指定控制器应用到哪些动作
                'except' => ['order'], //指定控制器不应用到哪些动作
            ]
        ];
    }

    /**
     * 订单概述
     * @return array
     */
    public function actionSummary()
    {
        if (yii::$app->request->isGet) {
            $request = request(); //获取地址栏参数
            $params = $request['params'];
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            $params['`key`'] = $params['key'];
            unset($params['key']);
            $params['merchant_id'] = yii::$app->session['uid'];

            $model = new OrderModel();
            $payment = 0; //待付款数量
            $delivery = 0; //待发货数量
            $evaluate = 0; //待评价数量
            $safeguardingRights = 0; //维权中数量
            $todayOrder = 0; //今日下单数量
            $todayPrice = 0; //今日订单金额
            $array = $model->findSummary($params);
            if ($array['status'] != 200) {
                return result(200, "请求成功");
            }
            $data = $array['data']; //订单列表
            $order = count($data); //订单数量
            $today = Date('Y-m-d'); //今日日期
            for ($i = 0; $i < $order; $i++) {
                $status = $data[$i]['status'];
                $afterSale = $data[$i]['after_sale'];
                $create_time = Date('Y-m-d', $data[$i]['create_time']);
                $payment_money = $data[$i]['payment_money'];
                if ($status == 0) {//待付款
                    $payment++;
                } else if ($status == 1) {//待发货
                    $delivery++;
                } else if ($status == 6) {//待评价
                    $evaluate++;
                }
                if ($afterSale !== '-1' && $status == 5) {//维权中
                    $safeguardingRights++;
                }
                if ($today == $create_time) {
                    $todayOrder++;
                    $todayPrice += $payment_money;
                }
            }

            for ($i = 0; $i <= 29; $i++) {
                $time = date("Y-m-d", strtotime("-{$i} day"));
                $startTime = strtotime($time . " 00:00:00");
                $params["create_time >={$startTime}"] = null;
                $endTime = strtotime($time . " 23:59:59");
                $params["create_time <={$endTime}"] = null;
                $orderArray = $model->findSummary($params);
                unset($params["create_time >={$startTime}"]);
                unset($params["create_time <={$endTime}"]);
                $out['day'][] = $time;
                if ($orderArray['status'] === 200) {
                    $dataCount = count($orderArray['data']);
                    //  $out['num'][] = $dataCount;
                    //循环获取价格
                    $outPrice = 0;
                    $out['num'][$i] = 0;
                    //status <> 2 and status <> 0 and status <>9
                    for ($j = 0; $j < $dataCount; $j++) {
                        if ($orderArray['data'][$j]['status'] != 2 && $orderArray['data'][$j]['status'] != 0 && $orderArray['data'][$j]['status'] != 9) {
                            $outPrice += $orderArray['data'][$j]['payment_money'];
                            $out['num'][$i] = $out['num'][$i] + 1;
                        }
                    }
                    $out['price'][] = sprintf("%.2f", substr(sprintf("%.3f", $outPrice), 0, -2));
                } else {
                    $out['num'][] = 0;
                    $out['price'][] = 0;
                }
            }

            $out['total'] = [
                'order' => $order,
                'payment' => $payment,
                'delivery' => $delivery,
                'evaluate' => $evaluate,
                'safeguardingRights' => $safeguardingRights,
                'todayOrder' => $todayOrder,
                'todayPrice' => $todayPrice,
            ];
            return result(200, "请求成功", $out);
        } else {
            return result(500, "请求方式错误");
        }
    }

    /**
     * 商城后台，订单管理，主订单列表
     * 地址:/admin/group/index 默认访问
     * @return array
     */
    public function actionList()
    {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数

            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            $model = new OrderModel();
            $params['shop_order_group.`key`'] = $params['key'];
            unset($params['key']);
            $params['shop_order_group.merchant_id'] = yii::$app->session['uid'];
            $params['shop_order_group.supplier_id'] = 0;
            // $array = $model->findAll($params);

            $model = new GroupOrderModel();
            if (isset($params['goods_name'])) {
                if ($params['goods_name'] != "") {
                    $goods_name = trim($params['goods_name']);
                    $params['goodsname'] = ['like', $goods_name];
                    unset($params['goods_name']);
                } else {
                    unset($params['goods_name']);
                }
            }
            if (isset($params['user_id'])) {
                if ($params['user_id'] != "") {
                    $params['user_id'] = trim($params['user_id']);
                    $params["shop_order_group.user_id"] = $params['user_id'];
                }
                unset($params['user_id']);
            }
            if (isset($params['order_sn'])) {
                if ($params['order_sn'] != "") {
                    $params['order_sn'] = trim($params['order_sn']);
                    $params["shop_order_group.order_sn"] = ['like', trim($params['order_sn'])];
                }
                unset($params['order_sn']);
            }
            if (isset($params['start_time'])) {
                if ($params['start_time'] != "") {
                    $time = strtotime(str_replace("+", " ", $params['start_time']));
                    $params[">="] = ['shop_order_group.create_time', $time];
                }
                unset($params['start_time']);
            }
            if (isset($params['end_time'])) {
                if ($params['end_time'] != "") {
                    $time = strtotime(str_replace("+", " ", $params['end_time']));
                    //   $params["shop_order_group.create_time <={$time} "] = null;
                    $params["<="] = ['shop_order_group.create_time', $time];
                }
                unset($params['end_time']);
            }
            if (isset($params['searchNameType'])) {
                if ($params['searchNameType'] != "") {
                    if ($params['searchName'] != "") {
                        if ($params['searchNameType'] == 1) {
                            $params['shop_order_group.order_sn'] = ['like', trim($params['searchName'])];
                        }
                        if ($params['searchNameType'] == 2) {
                            $name = trim($params['searchName']);
                            $params['shop_order_group.name'] = ['like', $name];
                        }
                        if ($params['searchNameType'] == 3) {
                            $params['shop_order_group.phone'] = ['like', trim($params['searchName'])];
                        }
                    }
                }
                unset($params['searchNameType']);
                unset($params['searchName']);
            }
            if (isset($params['status'])) {
                if ($params['status'] != 11) {
                    $params['<>'] = ['shop_order_group.status', 11];   //排除订单列表中的拼团订单
                }
            }

            if (isset($params['status'])) {
                if ($params['status'] != "") {
                    if ($params['status'] == 2) {
                        //  $params['(shop_order_group.status = 2 or shop_order_group.status = 4) '] = null;
                        $params['or']['shop_order_group.status'] = [4, 2];
                    } else if ($params['status'] == 7) {
                        $params['or']['shop_order_group.status'] = [6, 7];
                    } else if ($params['status'] == 5) {
                        $params['<>'] = ['after_sale', -1];
                    } else if ($params['status'] == 8) {
                        $params['or']['shop_order_group.status'] = [8, 2];
                    } else {
                        $params['shop_order_group.status'] = $params['status'];
                    }
                }
                unset($params['status']);
            }

            if (isset($params['pay_type'])) {
                if ($params['pay_type'] != "") {
                    $params['sp.type'] = $params['pay_type'];
                }
                unset($params['pay_type']);
            }
            if (isset($params['after_sale'])) {
                if ($params['after_sale'] != "") {
                    $params['shop_order_group.after_sale'] = $params['after_sale'];
                    $params['or']['shop_order_group.status'] = [4, 5];
                }
                unset($params['after_sale']);
            }
            if (isset($params['leader_uid'])) {
                if ($params['leader_uid'] != "") {
                    $params['shop_order_group.leader_uid'] = $params['leader_uid'];
                }
                unset($params['leader_uid']);
            }
            $params['field'] = "shop_order_group.*,shop_order_group.id as group_id,shop_user.nickname,shop_tuan_leader.realname,shop_tuan_leader.phone as leader_phone,shop_tuan_leader.area_name,shop_tuan_leader.province_code,shop_tuan_leader.city_code,shop_tuan_leader.area_code,shop_tuan_leader.addr,shop_order_group.status as order_status,shop_voucher.type_name as voucher_name,shop_voucher.price as voucher_price";
            $params['join'][] = ['left join', 'shop_tuan_leader', 'shop_tuan_leader.uid=shop_order_group.leader_self_uid and shop_tuan_leader.`delete_time` IS NULL  and shop_tuan_leader.`key`="' . $params['shop_order_group.`key`'] . '"'];
            $params['join'][] = ['left join', 'shop_user', 'shop_user.id=shop_order_group.user_id'];
            $params['join'][] = ['left join', 'shop_voucher', 'shop_voucher.id=shop_order_group.voucher_id'];
            $array = $model->do_select($params);

            if ($array['status'] == 200) {
                $subModel = new SubOrdersModel();

                $leaderModel = new LeaderModel();
                for ($i = 0; $i < count($array['data']); $i++) {
                    $data = array();
                    $data['order_group_sn'] = $array['data'][$i]['order_sn'];
                    $data['field'] = "shop_order.*,shop_stock.weight,system_express.name as express_name";
                    $data['join'][] = ['left join', 'shop_order_group', 'shop_order_group.order_sn=shop_order.order_group_sn'];
                    $data['join'][] = ['left join', 'shop_stock', 'shop_stock.id=shop_order.stock_id'];
                    $data['join'][] = ['left join', 'shop_user', 'shop_user.id=shop_order_group.user_id'];
                    $data['join'][] = ['left join', 'system_express', 'system_express.id=shop_order.express_id'];
                    // $data['col'] = [' stock_id', 'shop_stock.id'];
                    $data['limit'] = false;
                    $order = $subModel->do_select($data);
                    if ($order['status'] == 200) {
                        $array['data'][$i]['order'] = $order['data'];
                    } else {
                        $array['data'][$i]['order'] = array();
                    }

                    if ($array['data'][$i]['leader_self_uid'] != 0) {
                        $leader = $leaderModel->do_one(['uid' => $array['data'][$i]['leader_self_uid']]);
                        $array['data'][$i]['leader_phone'] = $leader['data']['phone'];
                        $array['data'][$i]['area_name'] = $leader['data']['area_name'];
                        $array['data'][$i]['realname'] = $leader['data']['realname'];
                        $array['data'][$i]['province_code'] = $leader['data']['province_code'];
                        $array['data'][$i]['city_code'] = $leader['data']['city_code'];
                        $array['data'][$i]['area_code'] = $leader['data']['area_code'];
                        $array['data'][$i]['addr'] = $leader['data']['addr'];
                    }

                }
                if ($array['status'] == 200 && $array['data'][$i]['is_advance'] == 1) {
                    $advanceOrderModel = new AdvanceOrderModel();
                    $adv = $advanceOrderModel->do_one(['order_sn' => $array['data'][$i]['order_sn']]);
                    if ($adv['status'] == 200) {
                        $array['data'][$i]['pay_start_time'] = date('Y-m-d H:i', $adv['data']['pay_start_time']);
                        $array['data'][$i]['pay_end_time'] = date('Y-m-d H:i', $adv['data']['pay_end_time']);
                        $array['advance_front_money'] = $adv['data']['front_money'];
                        $array['advance_money'] = $adv['data']['money'];
                        $array['advance_status'] = $adv['data']['status'];
                    }

                }
            }


            if ($array['status'] == 200) {
                $areaModel = new \app\models\system\SystemAreaModel();
                for ($i = 0; $i < count($array['data']); $i++) {
                    if ($array['data'][$i]['province_code'] != null && $array['data'][$i]['city_code'] != null && $array['data'][$i]['area_code'] != null) {
                        $province = $areaModel->do_column(['field' => 'name', 'code' => $array['data'][$i]['province_code']]);
                        $city = $areaModel->do_column(['field' => 'name', 'code' => $array['data'][$i]['city_code']]);
                        $area = $areaModel->do_column(['field' => 'name', 'code' => $array['data'][$i]['area_code']]);
                        $array['data'][$i]['province'] = $province['data'][0];
                        $array['data'][$i]['city'] = isset($city['data']) ? $city['data'][0] : '';
                        $array['data'][$i]['area'] = isset($area['data']) ? $area['data'][0] : '';
                    } else {
                        $array['data'][$i]['province'] = "";
                        $array['data'][$i]['city'] = "";
                        $array['data'][$i]['area'] = "";
                    }
                }
            }

            //查询闪送查询是否开启
            $appModel = new AppAccessModel();
            $res = $appModel->find(['`key`' => $params['shop_order_group.`key`']]);
            if ($res['status'] == 200) {
                $array['shansong'] = $res['data']['shansong'];
                $array['uu_is_open'] = $res['data']['uu_is_open'];
                $array['dianwoda_is_open'] = $res['data']['dianwoda_is_open'];
                $array['bird_is_open'] = $res['data']['bird_is_open'];
            }

            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionOrder()
    {
        $model = new OrderModel();
        $params['shop_order_group.`key`'] = "iGhRmF";
        $params['shop_order_group.merchant_id'] = 4;
        $array = $model->test($params);
        return $array;
    }

    /**
     * 子订单列表
     * @return array
     */
    public function actionSuborder()
    {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            $model = new OrderModel();
            $params['shop_order.`key`'] = $params['key'];

            $params['shop_order.merchant_id'] = yii::$app->session['uid'];
            $data['merchant_id'] = yii::$app->session['uid'];
            $data['`key`'] = $params['key'];
            //  $data['order_sn'] = $params['order_group_sn'];
            $res = $model->find($data);
            if ($res['status'] != 200) {
                return result(500, "找不到该订单");
            }
            unset($params['key']);
            $array = $model->findSuborder($params);
            if ($array['status'] == '200') {
                for ($i = 0; $i < $array['count']; $i++) {
                    $pic_urls = $array['data'][$i]['pic_url'];
                    $array['data'][$i]['pic_urls'] = $pic_urls;
                }
            }
            $array['refund'] = $res['data']['refund'];
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionAll()
    {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            $model = new OrderModel();
            $params['shop_order_group.`key`'] = $params['key'];
            unset($params['key']);
            $params['shop_order_group.merchant_id'] = yii::$app->session['uid'];
            if (!isset($params['after_sale']) || $params['after_sale'] == "") {
                $params['after_sale !=-1'] = null;
            }
            $params['status'] = 5;
            $array = $model->findAll($params);
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionSingle($id)
    {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            $category = new OrderModel();
            $params['id'] = $id;
            $array = $category->find($params);
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionAdd()
    {
        if (yii::$app->request->isPost) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            $model = new GoodsModel();
            //设置类目 参数
            $must = ['name', 'key', 'price', 'line_price'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return $rs;
            }
            $params['`key`'] = $params['key'];
            unset($params['key']);
            $params['merchant_id'] = yii::$app->session['uid'];
            $params['start_time'] = str_replace("+", " ", $params['start_time']);
            $start_time = $params['start_time'] == "" ? time() : strtotime($params['start_time']);
            $goodsData = array(
                '`key`' => $params['`key`'],
                'merchant_id' => yii::$app->session['uid'],
                'name' => $params['name'],
                'code' => $params['code'],
                'price' => $params['price'],
                'line_price' => $params['line_price'],
                'pic_urls' => $params['pic_urls'],
                'stocks' => $params['stocks'],
                'category_id' => $params['category_id'],
                'm_category_id' => $params['m_category_id'],
                //     'sort' => $params['sort'],
                'type' => $params['type'],
                'start_time' => $start_time,
                'detail_info' => $params['detail_info'],
                'simple_info' => $params['simple_info'],
                'is_top' => $params['is_top'],
                'status' => $params['status'],
            );
            $array = $model->add($goodsData);
            $stockModel = new StockModel();

            $num = count($params['stock']['code']);
            for ($i = 0; $i < $num; $i++) {
                $data['`key`'] = $params['`key`'];
                $data['merchant_id'] = yii::$app->session['uid'];
                $data['goods_id'] = $array['data'];
                $data['name'] = $params['name'];
                $data['code'] = $params['stock']['code'][$i];
                $data['number'] = $params['stock']['number'][$i];
                $data['price'] = $params['stock']['price'][$i];
                $data['cost_price'] = $params['stock']['cost_price'][$i];
                //  $data['pic_url'] = $url;
                $data['status'] = 1;
                $stockModel->add($data);
            }
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    /**
     * 订单主表简单编辑，没有其他关联表时可用
     * @param $id
     * @return array
     */
    public function actionUpdate($id)
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            $model = new OrderModel();
            $params['id'] = $id;

            $params['`key`'] = $params['key'];
            unset($params['key']);

            $params['merchant_id'] = yii::$app->session['uid'];
            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            } else {

                //   if (isset($params['modify_price'])) {
//                    $groupModel = new GroupOrderModel();
//                    $group = $groupModel->one(['order_sn' => $params['order_sn']]);
//                    $payment_money = $group['data']['payment_money']+$group['data']['modify_price'];
//                    $modify_price = $params['modify_price'];
//                    $params['modify_price'] = $payment_money - $params['modify_price'];
//                    $params['payment_money'] = $modify_price;
                //              }
                $array = $model->update($params);
                if ($array['status'] == 200) {
                    //添加操作记录
                    $operationRecordModel = new OperationRecordModel();
                    $operationRecordData['key'] = $params['`key`'];
                    if (isset(yii::$app->session['sid'])) {
                        $subModel = new \app\models\merchant\system\UserModel();
                        $subInfo = $subModel->find(['id'=>yii::$app->session['sid']]);
                        if ($subInfo['status'] == 200){
                            $operationRecordData['merchant_id'] = $subInfo['data']['username'];
                        }
                    } else {
                        $merchantModle = new MerchantModel();
                        $merchantInfo = $merchantModle->find(['id'=>yii::$app->session['uid']]);
                        if ($merchantInfo['status'] == 200) {
                            $operationRecordData['merchant_id'] = $merchantInfo['data']['name'];
                        }
                    }
                    $operationRecordData['operation_type'] = '更新';
                    $operationRecordData['operation_id'] = $id;
                    $operationRecordData['module_name'] = '订单管理';
                    $operationRecordModel->do_add($operationRecordData);
                }
                return $array;
            }
        } else {
            return result(500, "请求方式错误");
        }
    }

    /**
     * 订单主表编辑，确认拒绝操作
     * @param $id
     * @return array
     */
    public function actionRefuse($id)
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $model = new OrderModel();
            $params['id'] = $id;

            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            if (isset($params['key'])) {
                $params['`key`'] = $params['key'];
                unset($params['key']);
            }

            $params['merchant_id'] = yii::$app->session['uid'];
            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            } else {
                $params['after_sale'] = 2;
                $params['status'] = 3;
                $array = $model->update($params);
                return $array;
            }
        } else {
            return result(500, "请求方式错误");
        }
    }

    /**
     * 订单主表编辑，同意只退款
     * @param $id
     * @return array
     */
    public function actionAgreemoney($id)
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参

            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            $model = new OrderModel();
            $params['id'] = $id;
            if (isset($params['key'])) {
                $params['`key`'] = $params['key'];
                unset($params['key']);
            }

            $params['merchant_id'] = yii::$app->session['uid'];
            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            } else {
                //执行原路退回操作 未完善

                $params['after_sale'] = 1;
                $params['status'] = 7;
                $array = $model->update($params);
                return $array;
            }
        } else {
            return result(500, "请求方式错误");
        }
    }

    /**
     * 订单主表编辑，同意退款退货
     * @param $id
     * @return array
     */
    public function actionAgreegoods($id)
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参

            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            $model = new OrderModel();
            $params['id'] = $id;
            if (isset($params['key'])) {
                $params['`key`'] = $params['key'];
                unset($params['key']);
            }

            $params['merchant_id'] = yii::$app->session['uid'];
            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            } else {
                $params['after_sale'] = 1;
                $array = $model->update($params);
                return $array;
            }
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionDelete($id)
    {
        if (yii::$app->request->isDelete) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参


            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            $model = new GoodsModel();
            $params['id'] = $id;
            $params['`key`'] = $params['key'];
            unset($params['key']);
            $params['merchant_id'] = yii::$app->session['uid'];
            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            } else {
                $array = $model->delete($params);
            }
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    /**
     * 订单发货
     * @return array
     * @throws Exception
     */
    public function actionSend()
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参

            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            $model = new OrderModel();
            if (isset($params['key'])) {
                $params['`key`'] = $params['key'];
                unset($params['key']);
            }
            $params['merchant_id'] = yii::$app->session['uid'];
            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            }
            $subOrderModel = new SubOrdersModel();
            $subOrder = $subOrderModel->one(['id' => $params['id']]);
            $params['order_sn'] = $subOrder['data']['order_group_sn'];
            $id = $params['id'];
            unset($params['id']);
            $data = $model->find($params);
            //目前按卖家实际选择的发货方式为准，不需要判断买家选择的发货方式
//            if ($data['status'] == 200) {
//                if ($data['data']['is_tuan'] == 1 && ($data['data']['express_type'] == 1 || $data['data']['express_type'] == 2)) {
//                    $params['express_id'] = 0;
//                    $params['express_number'] = "本地配送";
//                }
//            }

            if ($data['status'] == 200) {
                if ($params['express_type'] != 0) {
                    $params['express_id'] = 0;
                    $params['express_number'] = "本地配送";
                    $express_name = "本地配送";
                } else {
                    if (!isset($params['electronics_express_id'])) {
                        return result(400, "缺少参数 电子面单id");
                    }
                    $electronicsModel = new ElectronicsModel();
                    $electronicsWhere['field'] = "shop_electronics.express_id,system_express.name";
                    $electronicsWhere['shop_electronics.id'] = $params['electronics_express_id'];
                    $electronicsWhere['join'][] = ['LEFT JOIN ', 'system_express', 'shop_electronics.express_id = system_express.id'];
                    $electronicsInfo = $electronicsModel->do_select($electronicsWhere);
                    if ($electronicsInfo['status'] != 200) {
                        return result(400, "未查询到电子面单信息");
                    }
                    $params['express_id'] = $electronicsInfo['data'][0]['express_id'];
                    $express_name = $electronicsInfo['data'][0]['name'];
                    if (!isset($params['express_number'])) {
                        return result(400, "缺少参数 快递单号");
                    }
                    unset($params['electronics_express_id']);
                }
                $sendExpressType = $params['express_type'];
                unset($params['express_type']);
            }


            if ($data['status'] != 200) {
                return result(400, "缺少数据");
            }

            if ($data['data']['is_tuan'] == 1) {
                $type = 2;
            } else {
                $type = 1;
            }
            $params['send_express_type'] = $sendExpressType;
            $array = $model->updateSend($params, $type);
            $subOrderModel->do_update(['id' => $id], ['status' => 3, 'send_express_type' => $sendExpressType, 'express_id' => $params['express_id']]);
//
            $orderModel = new OrderModel;
            $orderRs = $orderModel->find(['order_sn' => $params['order_sn']]);

            $shopUserModel = new \app\models\shop\UserModel();
            $shopUser = $shopUserModel->find(['id' => $orderRs['data']['user_id']]);
            $tempModel = new \app\models\system\SystemMiniTemplateModel();
            $minitemp = $tempModel->do_one(['id' => 29]);


            //订阅消息
            $subscribeTempModel = new SystemMerchantMiniSubscribeTemplateModel();
            $subscribeTempInfo = $subscribeTempModel->do_one(['template_purpose' => 'send_goods']);
            if ($subscribeTempInfo['status'] == 200) {
                if ($params['express_number'] == '本地配送') {
                    $params['express_number'] = 0;
                }
                if (mb_strlen($orderRs['data']['goodsname'], 'utf-8') > 20) {
                    $goodsName = mb_substr($orderRs['data']['goodsname'], 0, 17, 'utf-8') . '...'; //商品名超过20个汉字截断
                } else {
                    $goodsName = $orderRs['data']['goodsname'];
                }
                $accessParams = array(
                    'character_string1' => ['value' => $params['order_sn']],  //订单号
                    'thing2' => ['value' => $goodsName],  //商品名
                    'thing8' => ['value' => $express_name],    //快递公司
                    'character_string9' => ['value' => $params['express_number']],   //快递单号
                );
                $subscribeTempAccessModel = new SystemMerchantMiniSubscribeTemplateAccessModel();
                $subscribeTempAccessData = array(
                    'key' => $orderRs['data']['key'],
                    'merchant_id' => $orderRs['data']['merchant_id'],
                    'mini_open_id' => $shopUser['data']['mini_open_id'],
                    'template_id' => $subscribeTempInfo['data']['template_id'],
                    'number' => '0',
                    'template_params' => json_encode($accessParams, JSON_UNESCAPED_UNICODE),
                    'template_purpose' => 'send_goods',
                    'page' => "/pages/orderItem/orderItem/orderItem?order_sn={$params['order_sn']}",
                    'status' => '-1',
                );
                $subscribeTempAccessModel->do_add($subscribeTempAccessData);
            }

            if ($array['status'] == 200) {
                //添加操作记录
                $operationRecordModel = new OperationRecordModel();
                $operationRecordData['key'] = $params['`key`'];
                if (isset(yii::$app->session['sid'])) {
                    $subModel = new \app\models\merchant\system\UserModel();
                    $subInfo = $subModel->find(['id'=>yii::$app->session['sid']]);
                    if ($subInfo['status'] == 200){
                        $operationRecordData['merchant_id'] = $subInfo['data']['username'];
                    }
                } else {
                    $merchantModle = new MerchantModel();
                    $merchantInfo = $merchantModle->find(['id'=>yii::$app->session['uid']]);
                    if ($merchantInfo['status'] == 200) {
                        $operationRecordData['merchant_id'] = $merchantInfo['data']['name'];
                    }
                }
                $operationRecordData['operation_type'] = '更新';
                $operationRecordData['operation_id'] = $params['order_sn'];
                $operationRecordData['module_name'] = '订单管理';
                $operationRecordModel->do_add($operationRecordData);
            }
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    /**
     * 取消订单
     * @param $id
     * @return array
     * @throws Exception
     */
    public function actionCancel($id)
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参

            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            $model = new OrderModel();
            $params['id'] = $id;
            if (isset($params['key'])) {
                $params['`key`'] = $params['key'];
                unset($params['key']);
            }
            $params['merchant_id'] = yii::$app->session['uid'];
            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            }
            //获取该订单详情
            $res = $model->find($params);
            if ($res['status'] != '200') {
                return result($res['status'], '请求失败');
            }

            //1.判断订单状态是否为未支付，如果 status 不为0，则不允许请求
            if ($res['data']['status'] != '0') {
                return result(500, "请求错误");
            }
            $array = $model->cancel($params);
            if ($array['status'] == 200) {
                //添加操作记录
                $operationRecordModel = new OperationRecordModel();
                $operationRecordData['key'] = $params['`key`'];
                if (isset(yii::$app->session['sid'])) {
                    $subModel = new \app\models\merchant\system\UserModel();
                    $subInfo = $subModel->find(['id'=>yii::$app->session['sid']]);
                    if ($subInfo['status'] == 200){
                        $operationRecordData['merchant_id'] = $subInfo['data']['username'];
                    }
                } else {
                    $merchantModle = new MerchantModel();
                    $merchantInfo = $merchantModle->find(['id'=>yii::$app->session['uid']]);
                    if ($merchantInfo['status'] == 200) {
                        $operationRecordData['merchant_id'] = $merchantInfo['data']['name'];
                    }
                }
                $operationRecordData['operation_type'] = '更新';
                $operationRecordData['operation_id'] = $res['data']['order_sn'];
                $operationRecordData['module_name'] = '订单管理';
                $operationRecordModel->do_add($operationRecordData);
            }
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionUploads()
    {
        if (yii::$app->request->isPost) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            //设置类目 参数
            $upload = new UploadsModel('file', "./uploads/orders");
            $str = $upload->upload();
            if (!$str) {
                return "上传文件错误";
            }
            //将图片上传到cos
            $cos = new CosModel();
            $cosRes = $cos->putObject($str);
            if ($cosRes['status'] == '200') {
                $url = $cosRes['data'];
                unlink(Yii::getAlias('@webroot/') . $str);
            } else {
                unlink(Yii::getAlias('@webroot/') . $str);
                return json_encode($cosRes, JSON_UNESCAPED_UNICODE);
            }
            $data['code'] = 200;
            $data['msg'] = "上传成功！";
            $data['data']['src'] = $url;
            return json_encode($data);
        } else {
            return result(500, "请求方式错误");
        }
    }

    /**
     * 订单退款，退货操作，1 仅退款 staus 同意，不同意  调用退款方法RefundMoney   2， 退款退货，同意or不同意    更新状态   3，卖家确认收货，调用退款方法RefundMoney
     *
     */
    public function actionRefund($id)
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            //查询订单状态
            $data['id'] = $id;
            $data['merchant_id'] = yii::$app->session['uid'];
            $model = new OrderModel();
            $subOrderModel = new SubOrdersModel();
            $order = $subOrderModel->one(['id' => $id]);
            if ($order['status'] != 200) {
                return result(500, "订单状态异常！");
            }
            //after_type 退款类型 1=退款退货 2=只退款  status 5退款中  4已退款
            if ($order['data']['after_type'] == 2 && $order['data']['status'] == 5) {
                //卖家确认退款  仅退款  同意退款
                if ($params['status'] == 1) {
                    $res = $this->RefundMoney($order['data']['order_sn'], $params['key'], $order['data']['pay_money']);
                    if ($res['result_code'] == "SUCCESS") {
                        if (isset($res['result_msg'])) { //扫呗退款 直接修改订单状态
                            $data['status'] = 4;
                            // $data['order_sn'] = $order['data']['order_sn'];
                            $data['refund'] = 'saobei';
                        }
                        $data['status'] = 4;
                        $data['after_sale'] = 1;
                        $array = $subOrderModel->do_update(['id' => $id], $data);

                        $balanceModel = new \app\models\shop\BalanceAccessModel();
                        $balanceModel->do_update(['balance_sn' => $id], ['status' => 2]);

                        $commission_money = $order['data']['commission_money'];
                        $leader_money = $order['data']['leader_money'];
                        $oredrGroupSn = $order['data']['order_group_sn'];
                        $sql = "update shop_order_group set commission = commission-{$commission_money},leader_money = leader_money -{$leader_money} where order_sn = '{$oredrGroupSn}'";
                        Yii::$app->db->createCommand($sql)->execute();
                        $this->actionRecalculate($oredrGroupSn);

                        $this->isRefund($oredrGroupSn);
                        //订阅消息(退款通知)
                        $userModel = new UserModel();
                        $userInfo = $userModel->find(['id' => $order['data']['user_id']]);
                        $subscribeTempModel = new SystemMerchantMiniSubscribeTemplateModel();
                        $subscribeTempInfo = $subscribeTempModel->do_one(['template_purpose' => 'refund']);
                        if ($subscribeTempInfo['status'] == 200) {
                            $accessParams = array(
                                'number1' => ['value' => $order['data']['order_sn']],  //订单号
                                'date2' => ['value' => $order['data']['create_time']],  //订单时间
                                'phrase3' => ['value' => '已退款'],    //退款状态
                                'amount7' => ['value' => $order['data']['payment_money']],   //退款金额
                                'thing15' => ['value' => '有问题可以随时联系商家客服哦！'],   //温馨提示
                            );
                            $subscribeTempAccessModel = new SystemMerchantMiniSubscribeTemplateAccessModel();
                            $subscribeTempAccessData = array(
                                'key' => $order['data']['key'],
                                'merchant_id' => $order['data']['merchant_id'],
                                'mini_open_id' => $userInfo['data']['mini_open_id'],
                                'template_id' => $subscribeTempInfo['data']['template_id'],
                                'number' => '0',
                                'template_params' => json_encode($accessParams, JSON_UNESCAPED_UNICODE),
                                'template_purpose' => 'refund',
                                'page' => "/pages/orderItem/orderItem/orderItem?order_sn={$order['data']['order_sn']}",
                                'status' => '-1',
                            );
                            $subscribeTempAccessModel->do_add($subscribeTempAccessData);
                        } else {
                            file_put_contents(Yii::getAlias('@webroot/') . '/log.text', date('Y-m-d H:i:s') . "退款通知_未查询到该订阅消息模板" . PHP_EOL, FILE_APPEND);
                        }

                        return $array;
                    } else {
                        //订阅消息(退款通知)
                        $userModel = new UserModel();
                        $userInfo = $userModel->find(['id' => $order['data']['user_id']]);
                        $subscribeTempModel = new SystemMerchantMiniSubscribeTemplateModel();
                        $subscribeTempInfo = $subscribeTempModel->do_one(['template_purpose' => 'refund']);
                        if ($subscribeTempInfo['status'] == 200) {
                            $accessParams = array(
                                'number1' => ['value' => $order['data']['order_sn']],  //订单号
                                'date2' => ['value' => $order['data']['create_time']],  //订单时间
                                'phrase3' => ['value' => '退款失败'],    //退款状态
                                'amount7' => ['value' => $order['data']['payment_money']],   //退款金额
                                'thing15' => ['value' => '有问题可以随时联系商家客服哦！'],   //温馨提示
                            );
                            $subscribeTempAccessModel = new SystemMerchantMiniSubscribeTemplateAccessModel();
                            $subscribeTempAccessData = array(
                                'key' => $order['data']['key'],
                                'merchant_id' => $order['data']['merchant_id'],
                                'mini_open_id' => $userInfo['data']['mini_open_id'],
                                'template_id' => $subscribeTempInfo['data']['template_id'],
                                'number' => '0',
                                'template_params' => json_encode($accessParams, JSON_UNESCAPED_UNICODE),
                                'template_purpose' => 'refund',
                                'page' => "/pages/orderItem/orderItem/orderItem?order_sn={$order['data']['order_sn']}",
                                'status' => '-1',
                            );
                            $subscribeTempAccessModel->do_add($subscribeTempAccessData);
                        } else {
                            file_put_contents(Yii::getAlias('@webroot/') . '/log.text', date('Y-m-d H:i:s') . "退款通知_未查询到该订阅消息模板" . PHP_EOL, FILE_APPEND);
                        }
                        return result(500, $res);
                    }
                } else if ($params['status'] == 2) {
                    //不同意退款 更新订单状态,状态还原到 1 已付款  
                    $data['after_sale'] = 2;
                    $data['status'] = 1;
                    $array = $subOrderModel->do_update(['id' => $id], $data);
                    return $array;
                } else {
                    return result(500, '请求失败');
                }
            } else if ($order['data']['after_type'] == 1 && $order['data']['status'] == 5) {
                //同意退款退货
                if ($order['data']['after_sale'] == 0) {
                    if ($params['status'] == 1) {
                        //获取卖家收货地址
                        $afterModel = new AfterInfoModel();
                        $da['merchant_id'] = yii::$app->session['uid'];
                        $da['`key`'] = $params['key'];
                        $res = $afterModel->find($da);
                        if ($res['status'] != 200) {
                            return result(500, "请设置卖家收货信息");
                        }
                        //同意退款退货，更新订单状态
                        $data['after_sale'] = 1;
                        $data['after_addr'] = $res['data']['after_addr'];
                        $data['after_phone'] = $res['data']['after_phone'];
                        $data['status'] = 5;
                        $array = $subOrderModel->do_update(['id' => $id], $data);
                        return $array;
                    } elseif ($params['status'] == 2) {
                        //不同意退款退货，更新订单状态,状态还原到 3 已发货  
                        $data['after_sale'] = 2;
                        $data['after_admin_imgs'] = $params['after_admin_imgs'];
                        $data['status'] = 3;
                        $array = $subOrderModel->do_update(['id' => $id], $data);
                        return $array;
                    } else {
                        return result(500, '请求失败');
                    }
                } else if ($order['data']['after_sale'] == 1) {
                    //卖家确认退款
                    $res = $this->RefundMoney($order['data']['order_group_sn'], $params['key'], $order['data']['payment_money']);

                    if ($res['result_code'] == "SUCCESS") {
                        $data['after_sale'] = 1;
                        $data['status'] = 4;
                        $array = $subOrderModel->do_update(['id' => $id], $data);

                        $balanceModel = new \app\models\shop\BalanceAccessModel();
                        $balanceModel->do_update(['balance_sn' => $id], ['status' => 2]);

                        $commission_money = $order['data']['commission_money'];
                        $leader_money = $order['data']['leader_money'];
                        $oredrGroupSn = $order['data']['order_group_sn'];
                        $sql = "update shop_order_group set commission = commission-{$commission_money},leader_money = leader_money -{$leader_money} where order_sn = '{$oredrGroupSn}'";
                        Yii::$app->db->createCommand($sql)->execute();
                        $this->actionRecalculate($oredrGroupSn);

                        $this->isRefund($oredrGroupSn);
                        //订阅消息(退款通知)
                        $userModel = new UserModel();
                        $userInfo = $userModel->find(['id' => $order['data']['user_id']]);
                        $subscribeTempModel = new SystemMerchantMiniSubscribeTemplateModel();
                        $subscribeTempInfo = $subscribeTempModel->do_one(['template_purpose' => 'refund']);
                        if ($subscribeTempInfo['status'] == 200) {
                            $accessParams = array(
                                'number1' => ['value' => $order['data']['order_sn']],  //订单号
                                'date2' => ['value' => $order['data']['create_time']],  //订单时间
                                'phrase3' => ['value' => '已退款'],    //退款状态
                                'amount7' => ['value' => $order['data']['payment_money']],   //退款金额
                                'thing15' => ['value' => '有问题可以随时联系商家客服哦！'],   //温馨提示
                            );
                            $subscribeTempAccessModel = new SystemMerchantMiniSubscribeTemplateAccessModel();
                            $subscribeTempAccessData = array(
                                'key' => $order['data']['key'],
                                'merchant_id' => $order['data']['merchant_id'],
                                'mini_open_id' => $userInfo['data']['mini_open_id'],
                                'template_id' => $subscribeTempInfo['data']['template_id'],
                                'number' => '0',
                                'template_params' => json_encode($accessParams, JSON_UNESCAPED_UNICODE),
                                'template_purpose' => 'refund',
                                'page' => "/pages/orderItem/orderItem/orderItem?order_sn={$order['data']['order_sn']}",
                                'status' => '-1',
                            );
                            $subscribeTempAccessModel->do_add($subscribeTempAccessData);
                        } else {
                            file_put_contents(Yii::getAlias('@webroot/') . '/log.text', date('Y-m-d H:i:s') . "退款通知_未查询到该订阅消息模板" . PHP_EOL, FILE_APPEND);
                        }

                        return $array;
                    } else {
                        //订阅消息(退款通知)
                        $userModel = new UserModel();
                        $userInfo = $userModel->find(['id' => $order['data']['user_id']]);
                        $subscribeTempModel = new SystemMerchantMiniSubscribeTemplateModel();
                        $subscribeTempInfo = $subscribeTempModel->do_one(['template_purpose' => 'refund']);
                        if ($subscribeTempInfo['status'] == 200) {
                            $accessParams = array(
                                'number1' => ['value' => $order['data']['order_sn']],  //订单号
                                'date2' => ['value' => $order['data']['create_time']],  //订单时间
                                'phrase3' => ['value' => '退款失败'],    //退款状态
                                'amount7' => ['value' => $order['data']['payment_money']],   //退款金额
                                'thing15' => ['value' => '有问题可以随时联系商家客服哦！'],   //温馨提示
                            );
                            $subscribeTempAccessModel = new SystemMerchantMiniSubscribeTemplateAccessModel();
                            $subscribeTempAccessData = array(
                                'key' => $order['data']['key'],
                                'merchant_id' => $order['data']['merchant_id'],
                                'mini_open_id' => $userInfo['data']['mini_open_id'],
                                'template_id' => $subscribeTempInfo['data']['template_id'],
                                'number' => '0',
                                'template_params' => json_encode($accessParams, JSON_UNESCAPED_UNICODE),
                                'template_purpose' => 'refund',
                                'page' => "/pages/orderItem/orderItem/orderItem?order_sn={$order['data']['order_sn']}",
                                'status' => '-1',
                            );
                            $subscribeTempAccessModel->do_add($subscribeTempAccessData);
                        } else {
                            file_put_contents(Yii::getAlias('@webroot/') . '/log.text', date('Y-m-d H:i:s') . "退款通知_未查询到该订阅消息模板" . PHP_EOL, FILE_APPEND);
                        }
                        return result(500, '请求失败');
                    }
                } else {
                    return result(500, '请求失败');
                }
            } else {
                return result(500, '请求失败,找不到订单');
            }
        } else {
            return result(500, "请求方式错误");
        }
    }

    /**
     * 一键退款 不论什么情况，直接退款,交易关闭
     * 状态 0=待付款 1=待发货 2=已取消(24小时未支付) 3=已发货 4=已退款 5=退款中 6=待评价 7=已完成(评价后)  8=已删除
     */
    public function actionRefunds($id)
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }


            //查询订单状态
            $data['id'] = $id;
            $data['merchant_id'] = yii::$app->session['uid'];
            $data['`key`'] = $params['key'];
            $model = new OrderModel();

            $subOrderModel = new SubOrdersModel();
            $subOrder = $subOrderModel->one(['id' => $id]);
            if ($subOrder['status'] != 200) {
                return result(500, "请求失败！");
            }
            if (isset($params['money'])) {
                $subOrder['data']['payment_money'] = $params['money'];
            }
            $res = $this->RefundMoney($subOrder['data']['order_group_sn'], $params['key'], $subOrder['data']['payment_money']);
            $order = $model->find(['order_sn' => $subOrder['data']['order_group_sn']]);
            if ($res['result_code'] == "SUCCESS") {
                $data['after_sale'] = 1;
                $data['status'] = 9;
                $array = $subOrderModel->do_update(['id' => $id], $data);

                if ($order['status'] != 200) {
                    return result(500, "请求失败！");
                }

                $balanceModel = new BalanceModel();
                $balanceModel->do_update(['order_sn' => $order['data']['order_sn']], ['status' => 2]);
                $commission_money = $subOrder['data']['commission_money'];
                $leader_money = $subOrder['data']['leader_money'];
                $oredrGroupSn = $subOrder['data']['order_group_sn'];
                $sql = "update shop_order_group set commission = commission-{$commission_money},leader_money = leader_money -{$leader_money} where order_sn = '{$oredrGroupSn}'";
                Yii::$app->db->createCommand($sql)->execute();
                $this->actionRecalculate($oredrGroupSn);
                $this->isRefund($oredrGroupSn);
                //订阅消息(退款通知)
                $userModel = new UserModel();
                $userInfo = $userModel->find(['id' => $order['data']['user_id']]);
                $subscribeTempModel = new SystemMerchantMiniSubscribeTemplateModel();
                $subscribeTempInfo = $subscribeTempModel->do_one(['template_purpose' => 'refund']);
                if ($subscribeTempInfo['status'] == 200) {
                    $accessParams = array(
                        'number1' => ['value' => $order['data']['order_sn']],  //订单号
                        'date2' => ['value' => $order['data']['create_time']],  //订单时间
                        'phrase3' => ['value' => '已退款'],    //退款状态
                        'amount7' => ['value' => $order['data']['payment_money']],   //退款金额
                        'thing15' => ['value' => '有问题可以随时联系商家客服哦！'],   //温馨提示
                    );
                    $subscribeTempAccessModel = new SystemMerchantMiniSubscribeTemplateAccessModel();
                    $subscribeTempAccessData = array(
                        'key' => $order['data']['key'],
                        'merchant_id' => $order['data']['merchant_id'],
                        'mini_open_id' => $userInfo['data']['mini_open_id'],
                        'template_id' => $subscribeTempInfo['data']['template_id'],
                        'number' => '0',
                        'template_params' => json_encode($accessParams, JSON_UNESCAPED_UNICODE),
                        'template_purpose' => 'refund',
                        'page' => "/pages/orderItem/orderItem/orderItem?order_sn={$order['data']['order_sn']}",
                        'status' => '-1',
                    );
                    $subscribeTempAccessModel->do_add($subscribeTempAccessData);
                } else {
                    file_put_contents(Yii::getAlias('@webroot/') . '/log.text', date('Y-m-d H:i:s') . "退款通知_未查询到该订阅消息模板" . PHP_EOL, FILE_APPEND);
                }

                if ($array['status'] == 200) {
                    //添加操作记录
                    $operationRecordModel = new OperationRecordModel();
                    $operationRecordData['key'] = $params['key'];
                    if (isset(yii::$app->session['sid'])) {
                        $subModel = new \app\models\merchant\system\UserModel();
                        $subInfo = $subModel->find(['id'=>yii::$app->session['sid']]);
                        if ($subInfo['status'] == 200){
                            $operationRecordData['merchant_id'] = $subInfo['data']['username'];
                        }
                    } else {
                        $merchantModle = new MerchantModel();
                        $merchantInfo = $merchantModle->find(['id'=>yii::$app->session['uid']]);
                        if ($merchantInfo['status'] == 200) {
                            $operationRecordData['merchant_id'] = $merchantInfo['data']['name'];
                        }
                    }
                    $operationRecordData['operation_type'] = '更新';
                    $operationRecordData['operation_id'] = $order['data']['order_sn'];
                    $operationRecordData['module_name'] = '订单管理';
                    $operationRecordModel->do_add($operationRecordData);
                }
                return $array;
            } else {
                //订阅消息(退款通知)
                $userModel = new UserModel();
                $userInfo = $userModel->find(['id' => $order['data']['user_id']]);
                $subscribeTempModel = new SystemMerchantMiniSubscribeTemplateModel();
                $subscribeTempInfo = $subscribeTempModel->do_one(['template_purpose' => 'refund']);
                if ($subscribeTempInfo['status'] == 200) {
                    $accessParams = array(
                        'number1' => ['value' => $order['data']['order_sn']],  //订单号
                        'date2' => ['value' => $order['data']['create_time']],  //订单时间
                        'phrase3' => ['value' => '退款失败'],    //退款状态
                        'amount7' => ['value' => $order['data']['payment_money']],   //退款金额
                        'thing15' => ['value' => '有问题可以随时联系商家客服哦！'],   //温馨提示
                    );
                    $subscribeTempAccessModel = new SystemMerchantMiniSubscribeTemplateAccessModel();
                    $subscribeTempAccessData = array(
                        'key' => $order['data']['key'],
                        'merchant_id' => $order['data']['merchant_id'],
                        'mini_open_id' => $userInfo['data']['mini_open_id'],
                        'template_id' => $subscribeTempInfo['data']['template_id'],
                        'number' => '0',
                        'template_params' => json_encode($accessParams, JSON_UNESCAPED_UNICODE),
                        'template_purpose' => 'refund',
                        'page' => "/pages/orderItem/orderItem/orderItem?order_sn={$order['data']['order_sn']}",
                        'status' => '-1',
                    );
                    $subscribeTempAccessModel->do_add($subscribeTempAccessData);
                } else {
                    file_put_contents(Yii::getAlias('@webroot/') . '/log.text', date('Y-m-d H:i:s') . "退款通知_未查询到该订阅消息模板" . PHP_EOL, FILE_APPEND);
                }
                return result(500, $res);
            }
        } else {
            return result(500, "请求方式错误");
        }
    }

    /**
     * 退款
     * @param $order_sn
     * @param $key
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws Exception
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     */
    public function RefundMoney($order_sn, $key, $money = 0)
    {

        $params['order_sn'] = $order_sn;
        $params['merchant_id'] = yii::$app->session['uid'];
        $params['`key`'] = $key;
        $orderModel = new OrderModel;
        $orderData = $orderModel->find($params);

        $payModel = new PayModel();

        $pays = $payModel->find(['order_id' => $orderData['data']['transaction_order_sn']]);

        //获取商户微信配置
        if ($orderData['data']['order_type'] == 3) { //余额退款
            $userModel = new UserModel();
            $userInfo = $userModel->find(['id' => $orderData['data']['user_id']]);
            if ($userInfo['status'] == 200) {
                if ($money == 0) {
                    $data['recharge_balance'] = bcadd($orderData['data']['payment_money'], $userInfo['data']['recharge_balance'], 2);
                } else {
                    $data['recharge_balance'] = $userInfo['data']['recharge_balance'] - $money;
                }

                $data['id'] = $orderData['data']['user_id'];
                $data['`key`'] = $orderData['data']['key'];
                $re_ = $userModel->update($data);
                if ($re_['status'] == 200) {

                    $res = ['result_code' => 'SUCCESS', 'result_msg' => 'yue'];
                } else {
                    $res = ['result_code' => 'FAIL'];
                }
            }

        } else {
            $config = $this->getSystemConfig($key, "miniprogrampay", 1);
            if ($config == false) {
                return result(500, "未配置小程序信息");
            }

            if ($config['wx_pay_type'] == 1) {

                $config['notify_url'] = "https://" . $_SERVER['HTTP_HOST'] . "/api/web/index.php/pay/wechat/notifyreturn";
                $config['cert_path'] = yii::getAlias('@webroot/') . $config['cert_path'];
                $config['key_path'] = yii::getAlias('@webroot/') . $config['key_path'];
                $app = Factory::payment($config);
                // 参数分别为：微信订单号、商户退款单号、订单金额、退款金额、其他参数
                if ($pays['status'] != 200) {
                    return ['result_code' => 'FAIL', 'result_msg' => '退款失败查询到微信支付订单号'];
                }
                $number = intval($orderData['data']['payment_money'] * 1000) / 10;
                if ($orderData['data']['is_advance'] == 1) {
                    $advanceOrder = new AdvanceOrderModel();
                    $advance = $advanceOrder->do_one(['order_sn' => $orderData['data']['order_sn']]);
                    $res = $app->refund->byTransactionId($advance['data']['transaction_id'], $advance['data']['sale_order_sn'], $advance['data']['front_money'] * 100, $advance['data']['front_money'] * 100, ['refund_desc' => '商品退款']);
                    $res = $app->refund->byTransactionId($pays['data']['transaction_id'], $advance['data']['order_sn'], $advance['data']['money'] * 100, $advance['data']['money'] * 100, ['refund_desc' => '商品退款']);
                } else {
                    // var_dump(intval($money * 1000) / 10);die();
                    if ($money == 0) {
                        $res = $app->refund->byTransactionId($pays['data']['transaction_id'], $pays['data']['order_id'], $number, $number, ['refund_desc' => '商品退款']);
                    } else {
                        $res = $app->refund->byTransactionId($pays['data']['transaction_id'], $pays['data']['order_id'] . rand(100, 999), $number, intval($money * 1000) / 10, ['refund_desc' => '商品退款']);
                    }

                }

            } else {
                $mini_pay = new \tools\pay\refund\Refund();
                $mini_pay->setPay_ver(Payx::PAY_VER);
                $mini_pay->setPay_type("010");
                $mini_pay->setService_id(Payx::SERVICE_ID);
                $mini_pay->setMerchant_no($config['merchant_no']);
                $mini_pay->setTerminal_id($config['terminal_id']);
                $mini_pay->setTerminal_trace($orderData['data']['order_sn']);
                $mini_pay->setTerminal_time(date("YmdHis"));
                $mini_pay->setRefund_fee($orderData['data']['payment_money'] * 100);
                $mini_pay->setOut_trade_no($pays['data']['transaction_id']);
                $pay_pre = Payx::refund($mini_pay, $config['saobei_access_token']);
                if ($pay_pre->return_code == "01") {
                    //修改当前订单的优惠卷状态改成0
                    $voucherModel = new \app\models\shop\VoucherModel();
                    $where['order_sn'] = $orderData['data']['order_sn'];
                    $where['status'] = 0;
                    $voucherModel->update($where);
                    $res = ['result_code' => 'SUCCESS', 'result_msg' => 'saobei'];
                } else {
                    $res = ['result_code' => 'FAIL'];
                }
            }
        }

        return $res;
    }



//    public function actionTuan($order_sn) {
//        $configModel = new \app\models\tuan\ConfigModel();
//
//        $con = $configModel->do_one(['merchant_id' => yii::$app->session['merchant_id'], 'key' => $params['key']]);
//        if ($con['status'] == 200 && $con['data']['status'] == 1) {
//            $model = new BalanceModel();
//            $balance = $model->do_one(['order_sn' => $order_sn, 'merchant_id' => yii::$app->session['uid'], 'key' => $params['key']]);
//            $userModel = new \app\models\shop\UserModel();
//            $user = $userModel->find(['id' => $balance['data']['uid']]);
//            $userModel->update(['balance' => $user['data']['balance'] + $balance['data']['money']]);
//        }
//    }

    public function actionRemark()
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $must = ['key', 'remark', 'id'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            $model = new SubOrdersModel();
            $array = $model->do_update(['id' => $params['id']], ['admin_remark' => $params['remark']]);
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionLeader()
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $must = ['key', 'leader_uid', 'order_sn'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            $orderModel = new OrderModel();
            $res = $orderModel->update(['order_sn' => $params['order_sn'], 'leader_self_uid' => $params['leader_uid'], 'leader_uid' => $params['leader_uid'], 'is_tuan' => 1, '`key`' => $params['key'], 'merchant_id' => yii::$app->session['uid']]);
            if ($res['status'] == 200) {
                $balanceModel = new BalanceModel();
                $data['type'] = 1;
                $data['order_sn'] = $params['order_sn'];
                //$data['merchant_id'] = yii::$app->session['uid'];
                //$data['key'] = $params['key'];
                $balanceModel->do_update($data, ['uid' => $params['leader_uid']]);

                //添加操作记录
                $operationRecordModel = new OperationRecordModel();
                $operationRecordData['key'] = $params['key'];
                if (isset(yii::$app->session['sid'])) {
                    $subModel = new \app\models\merchant\system\UserModel();
                    $subInfo = $subModel->find(['id'=>yii::$app->session['sid']]);
                    if ($subInfo['status'] == 200){
                        $operationRecordData['merchant_id'] = $subInfo['data']['username'];
                    }
                } else {
                    $merchantModle = new MerchantModel();
                    $merchantInfo = $merchantModle->find(['id'=>yii::$app->session['uid']]);
                    if ($merchantInfo['status'] == 200) {
                        $operationRecordData['merchant_id'] = $merchantInfo['data']['name'];
                    }
                }
                $operationRecordData['operation_type'] = '更新';
                $operationRecordData['operation_id'] = $params['order_sn'];
                $operationRecordData['module_name'] = '订单管理';
                $operationRecordModel->do_add($operationRecordData);

                return result(200, "请求成功");
            } else {
                return result(500, "请求失败");
            }

        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionConfimOrder()
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $must = ['key', 'user_id'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            $orderModel = new OrderModel();
            $where = ['order_sn' => $params['order_sn'], 'is_tuan' => 0, 'after_sale' => -1, 'status' => 3, 'user_id' => $params['user_id'], '`key`' => $params['key'], 'merchant_id' => yii::$app->session['uid']];
            $data = ['status' => 6];
            $res = $orderModel->update($where, $data);
            if ($res['status'] == 200) {
                $balanceModel = new BalanceModel();
                $data['type'] = 3;
                $data['order_sn'] = $params['order_sn'];
                $data['merchant_id'] = yii::$app->session['uid'];
                $data['key'] = $params['key'];
                $balanceModel->do_update($data, ['uid' => $params['leader_uid']]);

                //添加操作记录
                $operationRecordModel = new OperationRecordModel();
                $operationRecordData['key'] = $params['key'];
                if (isset(yii::$app->session['sid'])) {
                    $subModel = new \app\models\merchant\system\UserModel();
                    $subInfo = $subModel->find(['id'=>yii::$app->session['sid']]);
                    if ($subInfo['status'] == 200){
                        $operationRecordData['merchant_id'] = $subInfo['data']['username'];
                    }
                } else {
                    $merchantModle = new MerchantModel();
                    $merchantInfo = $merchantModle->find(['id'=>yii::$app->session['uid']]);
                    if ($merchantInfo['status'] == 200) {
                        $operationRecordData['merchant_id'] = $merchantInfo['data']['name'];
                    }
                }
                $operationRecordData['operation_type'] = '更新';
                $operationRecordData['operation_id'] = $params['order_sn'];
                $operationRecordData['module_name'] = '订单管理';
                $operationRecordModel->do_add($operationRecordData);

                return result(200, "请求成功");
            } else {
                return result(500, "请求失败");
            }

        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionExpress($id)
    {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数

            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            $model = new SubOrdersModel();
            $data['key'] = $params['key'];
            $data['merchant_id'] = yii::$app->session['uid'];
            $data['id'] = $id;
            $array = $model->one($data);
            $shopExpress = $this->express($array['data']['express_id'], $array['data']['express_number']);
            return result(200, '请求成功', $shopExpress);
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionDelOrder()
    {
        if (yii::$app->request->isDelete) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参

            $must = ['start_time', 'end_time'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            if (isset($params['start_time'])) {
                if ($params['start_time'] != "") {
                    $start_time = strtotime($params['start_time']);
                }
            }
            if (isset($params['end_time'])) {
                if ($params['end_time'] != "") {
                    $end_time = strtotime($params['end_time']);
                }
            }
            $sql = " delete  from shop_order_group where status = 2 and create_time>={$start_time} and create_time<={$end_time}";
            Yii::$app->db->createCommand($sql)->execute();
            return result(200, "请求成功");
        } else {
            return result(500, "请求方式错误");
        }
    }

    //退款后重新计算分销佣金
    public function actionRecalculate($order_sn)
    {
        $model = new DistributionAccessModel();
        $userModel = new ShopUserModel();
        $where['order_sn'] = $order_sn;
        $where['limit'] = false;
        $info = $model->do_select($where);
        if ($info['status'] != 200) {
            return result(500, "未查询到佣金记录");
        }
        foreach ($info['data'] as $k => $v) {
            $userWhere['id'] = $v['uid'];
            $userInfo = $userModel->do_one($userWhere);
            if ($userInfo['status'] == 200) {
                //减去各会员预估佣金
                $userData['commission'] = $userInfo['data']['commission'] - $v['money'];
                $userModel->do_update($userWhere, $userData);
            }
            //删除之前的佣金记录
            $model->do_delete(['order_sn' => $order_sn]);
        }
        //将订单号放入redis重新计算
        $dtbData['order_sn'] = $order_sn;
        lpushRedis('distribution', $dtbData);
        return result(200, "请求成功");
    }

    public function isRefund($order_sn)
    {
        $orderModel = new SubOrdersModel();
        $list = $orderModel->do_select(['order_group_sn' => $order_sn]);
        $bool = false;
        if ($list['status'] == 200) {
            for ($i = 0; $i < count($list['data']); $i++) {
                if ($list['data'][$i]['status'] == 4 || $list['data'][$i]['status'] == 9) {
                    $bool = true;
                } else {
                    $bool = false;
                }
            }
        }

        if ($bool) {
            $model = new GroupOrderModel();
            $res = $model->do_update(['order_sn' => $order_sn], ['status' => 4]);
        }

    }

    function express($express_id, $express_number)
    {
        $table = new TableModel();
        $company = $table->tableSingle('system_express', ['id' => $express_id]);

        $shopExpress = logistics($express_number, $company['simple_name']);
        $shopExpress['mailNo'] = $express_number;
        $shopExpress['expTextName'] = $company['name'];
        return $shopExpress;
    }


}
