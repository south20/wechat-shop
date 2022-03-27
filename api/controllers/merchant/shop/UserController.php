<?php

namespace app\controllers\merchant\shop;

use app\models\core\TableModel;
use app\models\merchant\distribution\AgentModel;
use app\models\merchant\distribution\OperatorModel;
use app\models\merchant\system\OperationRecordModel;
use app\models\merchant\user\MerchantModel;
use app\models\merchant\vip\UnpaidVipModel;
use app\models\shop\GroupOrderModel;
use app\models\shop\ShopUserModel;
use app\models\shop\StorePaymentModel;
use app\models\tuan\LeaderModel;
use yii;
use yii\web\MerchantController;
use app\models\shop\OrderModel;
use app\models\shop\UserModel;
use app\models\shop\CartModel;
use app\models\shop\ContactModel;

class UserController extends MerchantController
{

    public $enableCsrfValidation = false; //禁用CSRF令牌验证，可以在基类中设置

    public function actionList()
    {
//        if (yii::$app->request->isGet) {
//            $request = yii::$app->request; //获取 request 对象
//            $params = $request->get(); //获取地址栏参数
//            $userModel = new UserModel();
//            $data['`key`'] = $params['key'];
//            $data['merchant_id'] = yii::$app->session['uid'];
//            if (isset($params['searchName'])) {
//                $data['searchName'] = $params['searchName'];
//                $userData = $userModel->findall($data);
//                unset($data['searchName']);
//            } else {
//                $userData = $userModel->findall($data);
//            }
//            $orderModel = new OrderModel();
//            $orderData = $orderModel->findList($data);
//            if ($orderData['status'] != 200) {
//                return result(200, '请求成功');
//            }
//            $cartModel = new CartModel();
//            $cartData = $cartModel->findall($data);
//
//            $array = array();
//            if ($userData['status'] == 200) {
//                for ($i = 0; $i < count($userData['data']); $i++) {
//                    $array[$i]['id'] = $userData['data'][$i]['id'];
//                    $array[$i]['nickname'] = $userData['data'][$i]['nickname'];
//                    $array[$i]['avatar'] = $userData['data'][$i]['avatar'];
//                    $array[$i]['is_vip'] = $userData['data'][$i]['is_vip'];
//                    $array[$i]['sex'] = $userData['data'][$i]['sex'];
//                    $array[$i]['type'] = $userData['data'][$i]['type'];
//                    $array[$i]['money'] = $userData['data'][$i]['money'];
//                    $array[$i]['create_time'] = $userData['data'][$i]['create_time'];
//                    $array[$i]['status'] = $userData['data'][$i]['status'];
//                    if ($orderData['status'] == 200) {
//                        $array[$i]['pay_num'] = 0;
//                        $array[$i]['pay_price'] = 0;
//                        for ($j = 0; $j < count($orderData['data']); $j++) {
//                            if ($userData['data'][$i]['id'] == $orderData['data'][$j]['user_id']) {
//                                $array[$i]['pay_num'] = $array[$i]['pay_num'] + 1;
//                                $array[$i]['pay_price'] = $array[$i]['pay_price'] + $orderData['data'][$j]['total_price'];
//                            }
//                        }
//                    }
//                    if ($cartData['status'] == 200) {
//                        $array[$i]['cart_num'] = 0;
//                        for ($j = 0; $j < count($orderData['data']); $j++) {
//                            if ($userData['data'][$i]['id'] == $orderData['data'][$j]['user_id']) {
//                                $array[$i]['cart_num'] += 1;
//                            }
//                        }
//                    } else {
//                        $array[$i]['cart_num'] = 0;
//                    }
//                    //获取团长姓名
//                    $tuanModel = new \app\models\tuan\UserModel();
//                    $tuanUser = $tuanModel->do_one(['merchant_id' => yii::$app->session['uid'], 'uid' => $userData['data'][$i]['id'], '`key`' => $params['key']]);
//                    $array[$i]['leader_name'] = '无';//默认无，有数据的时候直接修改
//                    if ($tuanUser['status'] == 200) {
//                        $leader_uid = $tuanUser['data']['leader_uid'];
//                        if ($leader_uid != '0') {
//                            //当团长id不为0时需要查询团长的姓名
//                            $leaderModel = new LeaderModel();
//                            $leader_info = $leaderModel->do_one(['uid' => $leader_uid, '`key`' => $params['key']]);
//                            if ($leader_info['status'] == 200) {
//                                $array[$i]['leader_name'] = $leader_info['data']['realname'];
//                            }
//                        }
//                    }
//                    //获取团员收货地址和电话
//                    $contactModel = new ContactModel();
//                    $params['`key`'] = $params['key'];
//                    $params['merchant_id'] = yii::$app->session['uid'];
//                    $params['user_id'] = $userData['data'][$i]['id'];
//                    $params['status'] = 1;
//                    $params['is_default'] = 1;
//                    $contactDefault = $contactModel->find($params);
//                    $array[$i]['pca'] = '';
//                    $array[$i]['address'] = '';
//                    $array[$i]['phone'] = '';
//                    if ($contactDefault['status'] == 200) {
//                        $array[$i]['pca'] = $contactDefault['data']['province'] . $contactDefault['data']['city'] . $contactDefault['data']['area'];
//                        $array[$i]['address'] = $contactDefault['data']['address'];
//                        $array[$i]['phone'] = $contactDefault['data']['phone'];
//                    } else {
//                        $params['is_default'] = 0;
//                        $contact = $contactModel->find($params);
//                        if ($contact['status'] == 200) {
//                            $array[$i]['pca'] = $contact['data']['province'] . $contact['data']['city'] . $contact['data']['area'];
//                            $array[$i]['address'] = $contact['data']['address'];
//                            $array[$i]['phone'] = $contact['data']['phone'];
//                        }
//                    }
//                }
//            }
//            $number = count($array);
//            for ($i = 0; $i < $number; $i++) {
//                if (isset($params['cart_num']) && $params['cart_num'] != "") {
//                    if ($params['cart_num'] != $array[$i]['cart_num']) {
//                        unset($array[$i]);
//                        continue;
//                    }
//                }
//                if (isset($params['is_vip']) && $params['is_vip'] != "") {
//                    if ($params['is_vip'] != $array[$i]['is_vip']) {
//                        unset($array[$i]);
//                        continue;
//                    }
//                }
//                if (isset($params['pay_num']) && $params['pay_num'] != "") {
//                    if ($params['pay_num'] != $array[$i]['pay_num']) {
//                        unset($array[$i]);
//                        continue;
//                    }
//                }
//
//                if (isset($params['type']) && $params['type'] != "") {
//                    if ($params['type'] != $array[$i]['type']) {
//                        unset($array[$i]);
//                        continue;
//                    }
//                }
//            }
//            $array = array_values($array);
//
//            $udata = array();
//            $num = $params['limit'] * ($params['page'] - 1);
//
//            for ($j = 0; $j < count($array); $j++) {
//                if ($j == $num && $j < $params['limit'] * ($params['page'])) {
//
//                    $udata[] = $array[$j];
//                    $num = $num + 1;
//                }
//            }
//            $rs['status'] = 200;
//            $rs['message'] = "请求成功";
//            $rs['data'] = $udata;
//            $rs['count'] = count($array);
//            return $rs;
//        } else {
//            return result(500, "请求方式错误");
//        }
        if (!yii::$app->request->isGet) {
            return result(500, '请求方式错误');
        }
        $request = yii::$app->request; //获取 request 对象
        $params = $request->get(); //获取地址栏参数
        $limits = ($params['page'] - 1) * $params['limit'];
        $data['`key`'] = $params['key'];
        $data['merchant_id'] = yii::$app->session['uid'];
        //添加查询条件，包括页面查询
        $where = " su.`key`='" . $params['key'] . "' and su.merchant_id=" . yii::$app->session['uid'] . " and su.delete_time IS NULL ";
        if (isset($params['searchName']) && trim($params['searchName']) != '') {
            $search_name = trim($params['searchName']);
            $where .= " and (su.id like '%{$search_name}%' or su.nickname like '%{$search_name}%') ";
        }
        if (isset($params['phone']) && trim($params['phone']) != '') {
            $phone = trim($params['phone']);
            $where .= " and suc.phone = {$phone} ";
        }
        if (isset($params['realname']) && trim($params['realname']) != '') {
            $realname = trim($params['realname']);
            $where .= " and stl.realname = '{$realname}' ";
        }
        if (isset($params['time']) && trim($params['time']) != '') {
            $time = explode(' - ', trim($params['time']));
            if (count($time) == 2) {
                $start_time = strtotime($time[0]);
                $end_time = strtotime($time[1]);
                $where .= " and su.create_time > {$start_time} and su.create_time < {$end_time} ";
            }
        }
        //只为获取数量，分页使用
        $sql = "SELECT su.id, su.nickname, su.`key`, su.status,su.total_score,su.commission,su.withdrawable_commission,psu.nickname as parent_name,
                (CASE su.sex WHEN 1 THEN '男' WHEN 2 THEN '女' WHEN 0 THEN '保密' END) sex, 
                su.avatar, FROM_UNIXTIME( su.create_time, '%Y-%m-%d %H:%i:%s' ) create_time,su.score,su.money,su.recharge_balance, stl.realname,
                CONCAT( suc.province, suc.city, suc.area ) pca, suc.address, suc.phone
                FROM shop_user su
                LEFT JOIN shop_user psu ON su.parent_id = psu.id
                LEFT JOIN shop_tuan_user stu ON su.id = stu.uid
                LEFT JOIN shop_tuan_leader stl ON stu.leader_uid = stl.uid
                LEFT JOIN shop_user_contact suc ON su.id = suc.user_id
                WHERE {$where}
                GROUP BY su.id ORDER BY su.id desc";
        $count = count(yii::$app->db->createCommand($sql)->queryAll());

        $sql = "SELECT su.id, su.nickname, su.`key`, su.status,su.total_score,su.commission,su.withdrawable_commission,psu.nickname as parent_name,
                (CASE su.sex WHEN 1 THEN '男' WHEN 2 THEN '女' WHEN 0 THEN '保密' END) sex, 
                su.avatar, FROM_UNIXTIME( su.create_time, '%Y-%m-%d %H:%i:%s' ) create_time, su.score,su.money, su.recharge_balance,stl.realname,
                CONCAT( suc.province, suc.city, suc.area ) pca, suc.address, suc.phone
                FROM shop_user su
                LEFT JOIN shop_user psu ON su.parent_id = psu.id
                LEFT JOIN shop_tuan_user stu ON su.id = stu.uid
                LEFT JOIN shop_tuan_leader stl ON stu.leader_uid = stl.uid
                LEFT JOIN shop_user_contact suc ON su.id = suc.user_id
                WHERE {$where}
                GROUP BY su.id ORDER BY su.id desc LIMIT {$limits},{$params['limit']}";
        $res = yii::$app->db->createCommand($sql)->queryAll();

        if (empty($res)) {
            return result(204, '查询失败');
        }

        //会员等级名称
        $vipModel = new UnpaidVipModel();
        $vipWhere['key'] = $params['key'];
        $vipWhere['merchant_id'] = yii::$app->session['uid'];
        $vipWhere['limit'] = false;
        $vipInfo = $vipModel->do_select($vipWhere);

        foreach ($res as $k => $v) {
            $res[$k]['pay_num'] = 0;
            $res[$k]['cart_num'] = 0;
            $res[$k]['pay_price'] = 0;
            $res[$k]['level_name'] = '会员';
            $orderModel = new OrderModel();
            $data['user_id'] = $v['id'];
            $data['(status=6 or status = 7 or status= 3)'] =null ;
            $orderData = $orderModel->findList($data);
            if ($orderData['status'] == 200) {
                $res[$k]['pay_num'] = count($orderData['data']);
                $pay_price = 0;
                foreach ($orderData['data'] as $ko => $vo) {
                    $pay_price += $vo['payment_money'];
                }
                if ($vipInfo['status'] == 200){
                    $minLev = reset($vipInfo['data']);//最低等级
                    $maxLev = end($vipInfo['data']);//最高等级
                    //总积分大于等于最高等级
                    if ($pay_price >= $maxLev['min_score']){
                        $res[$k]['level_name'] = $maxLev['name'];
                    }
                    //总积分在最低和最高之间的
                    if ($pay_price >= $minLev['min_score'] && $pay_price < $maxLev['min_score']){
                        foreach ($vipInfo['data'] as $key=>$val){
                            if ($pay_price >= $val['min_score']){
                                $res[$k]['level_name'] = $val['name'];
                            }
                        }
                    }
                }
                $res[$k]['pay_price'] = number_format($pay_price, 2);
            }

            $cartModel = new CartModel();
            $cartData = $cartModel->findall(['user_id'=>$v['id']]);
            if ($cartData['status'] == 200) {
                $res[$k]['cart_num'] = count($cartData['data']);
            }
        }
        return ['status' => 200, 'message' => '请求成功', 'data' => $res, 'count' => $count];
    }

    public function actionUpdate($id)
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $model = new UserModel();
            $params['id'] = $id;
            $params['`key`'] = $params['key'];
            unset($params['key']);
            $params['merchant_id'] = yii::$app->session['uid'];

            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            } else {
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
                    $operationRecordData['module_name'] = '会员列表';
                    $operationRecordModel->do_add($operationRecordData);
                }

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
            $model = new UserModel();
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

    public function actionTotal(){
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数

            $leaderModel = new LeaderModel();
            $leader = $leaderModel->do_select(['key'=> $params['key'],'merchant_id'=>yii::$app->session['uid'],'status'=>1]);
            $key = $params['key'];
            $merchant = yii::$app->session['uid'];
            $table = new TableModel();
            $sql = "select count(id) as num from shop_user where `key`='{$key}' and merchant_id = {$merchant} and delete_time is null ";
            $user  =$table->querySql($sql);
           // var_dump($user[0]['num']==null);die();
            $sql = "select count(order_sn) as num from shop_order_group where `key`='{$key}' and merchant_id = {$merchant} and delete_time is null ";
            $order  =$table->querySql($sql);

            $sql = "select sum(total_price) as num from shop_order_group where `key`='{$key}' and merchant_id = {$merchant} and delete_time is null ";
            $money  =$table->querySql($sql);

            $sql = "select sum(money) as num from shop_user_balance where `key`='{$key}' and  (type <>7 and type <>8)  and delete_time is null";
            $balance  =$table->querySql($sql);

            $res['leader'] = $leader['status']!=200?count($leader['data']):0;
            $res['user'] =  $user[0]['num']!=null?(int)$user[0]['num']:0;
            $res['order'] = $order[0]['num']!=null?(int)$order[0]['num']:0;
            $res['money'] = $money[0]['num']!=null?(int)$money[0]['num']:0;
            $res['balance'] = $balance[0]['num']!=null?(float)$balance[0]['num']:0;
       //     $res['order'] = $order[0]['num']!=null?$order[0]['num']:0;
            return result(200,'请求成功',$res);
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionPayment(){
        if (yii::$app->request->isPost) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $model = new UserModel();
            $params['merchant_id'] = yii::$app->session['uid'];
            if($params['time']<time()-7200){
                return result(500,'二维码已超时');
            }
            $array = $model->find(['`key`'=>$params['key'],'merchant_id'=>yii::$app->session['uid'],'id'=>$params['user_id']]);
            if($array['status']!=200){
                return result(500,'找不到此用户');
            }
            if($array['data']['recharge_balance']==0){
            	 return result(500,'账户0元');
            }
            
            if($array['data']['recharge_balance']<$params['money']){
            	 return result(500,'余额不足');
            }
            
            $paymentModel = new StorePaymentModel();
            $res = $paymentModel->do_one(['order_sn'=>$params['order_sn']]); 
            if($res['status']==200){
            	if($res['data']['status']==1){
            		return result(500,'改二维码已失效');
            	}else{
            		 $udata['recharge_balance']=(float)$array['data']['recharge_balance']-(float)$params['money'];
			          $udata['id']=$params['user_id'];
			          $udata['`key`']=$params['key'];
			          $res =  $model->update($udata);
			          $paymentModel->do_update(['order_sn'=>$params['order_sn'],'status'=>1]); 
            	}
            }else{
            	$udata['recharge_balance']=(float)$array['data']['recharge_balance']-(float)$params['money'];
	            $udata['id']=$params['user_id'];
	            $udata['`key`']=$params['key'];
	            $res =  $model->update($udata);
	            $paymentModel = new StorePaymentModel();
	            $data['order_sn'] = $params['order_sn'];
	            $data['user_id']= $params['user_id'];
	            $data['money']= $params['money'];
	            $data['merchant_id']=yii::$app->session['uid'];
	            $data['key']= $params['key'];
	            $data['type']='门店余额付款';
	            $data['nickname'] = $array['data']['nickname'];
	            $data['status'] =1;
	            $paymentModel->do_add($data);
            }
            
            
            return $res;
        } else {
            return result(500, "请求方式错误");
        }
    }
    
    public function actionUpdateSuperior($id){
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参

            $must = ['key','parent_id'];
            //设置类目 参数
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return $rs;
            }

            $model = new UserModel();
            //查询用户是否有下级
            $subordinateWhere['parent_id'] = $id;
            $subordinateInfo = $model->find($subordinateWhere);
            if ($subordinateInfo['status'] == 200){
                return result(500, "该用户已有下属团队，不能修改上级");
            }
            //查询所选上级信息
            $parentWhere['id'] = $params['parent_id'];
            $parentInfo = $model->find($parentWhere);
            if ($parentInfo['status'] != 200){
                return result(204, "未查询到所选上级会员信息");
            }
            //上三级父节点url
            $data['parent_url'] = '/' . $params['parent_id'] . '/';
            if (!empty($parentInfo['data']['parent_url'])) {
                $parentUrl = explode('/', trim($parentInfo['data']['parent_url'], '/'));
                $data['parent_url'] .= $parentUrl[0] . '/';
                if (isset($parentUrl[1])) {
                    $data['parent_url'] .= $parentUrl[1] . '/';
                }
                if (isset($parentUrl[2])) {
                    $data['parent_url'] .= $parentUrl[2] . '/';
                }
            }
            $data['id'] = $id;
            $data['parent_id'] = $params['parent_id'];
            $array = $model->update($data);

            return $array;

        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionDistributor(){
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数

            $must = ['key'];
            //设置类目 参数
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return $rs;
            }

            $userModel = new UserModel();
            $params['level >= 1'] = null;
            if (isset($params['key'])) {
                $params['`key`'] = $params['key'];
                unset($params['key']);
            }
            $array = $userModel->findall($params);
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    //删除会员
    public function actionDeleteUser($id){
        if (yii::$app->request->isDelete) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参

            $orderModel = new GroupOrderModel();
            $orderWhere['user_id'] = $id;
            $order = $orderModel->one($orderWhere);
            if ($order['status'] == 200){
                return result(500, "会员已产生订单，无法删除");
            }

            $model = new ShopUserModel();
            $where['id'] = $id;
            $info = $model->do_one($where);
            if ($info['status'] != 200){
                return result(500, "未查询到会员信息");
            }
            if ($info['data']['score'] != 0 || $info['data']['recharge_balance'] != 0 || $info['data']['balance'] != 0){
                return result(500, "会员还有积分或余额，无法删除");
            }
            $array = $model->do_delete($where);
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

}
