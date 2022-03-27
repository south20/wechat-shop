<?php

namespace app\controllers\admin\voucher;

use yii;
use yii\web\CommonController;
use yii\db\Exception;
use app\models\admin\voucher\VoucherTypeModel;

/**
 * 抵用卷类型表控制器
 * 地址:/admin/rule
 * @throws Exception if the model cannot be found
 * @return array
 */
class TypeController extends CommonController {

    public $enableCsrfValidation = false; //禁用CSRF令牌验证，可以在基类中设置

    /**
     * 地址:/admin/group/index 默认访问
     * @throws Exception if the model cannot be found
     * @return array
     */

    public function actionIndex() {
//        $uid = $_SESSION['uid'];//获取当前登录的用户 id，如果需要的话
        $request = yii::$app->request; //获取 request 对象
        $method = $request->getMethod(); //获取请求方式 GET POST PUT DELETE
        if ($method == 'GET') {
            $params = $request->get(); //获取地址栏参数
        } else {
            $params = $request->bodyParams; //获取body传参
        }

        $voucher = new VoucherTypeModel();
        switch ($method) {
            case 'GET':
                if (!isset($params['searchName'])) {
                    $array = ['status' => 400, 'message' => '缺少参数 searchName'];
                    return json_encode($array, JSON_UNESCAPED_UNICODE);
                }
                if ($params['searchName'] == "list") {
                    $array = $voucher->findall($params);
                } else if ($params['searchName'] == "single") {
                    $array = $voucher->find($params);
                } else {
                    $array = ['status' => 501, 'message' => '无该 searchName 请求'];
                    return json_encode($array, JSON_UNESCAPED_UNICODE);
                }
                break;
            case 'POST':
                $must = ['name', 'price', 'full_price', 'count', 'days', 'act_id', 'from_date', 'to_date'];
                $rs = $this->checkInput($must, $params);
                $params['from_date'] = strtotime($params['from_date']);
                $params['to_date'] = strtotime($params['to_date']);
                if ($rs != false) {
                    return json_encode($rs, JSON_UNESCAPED_UNICODE);
                }
                $params['set_online_time'] = $params['from_date'];
                $array = $voucher->add($params);
                break;
            case 'PUT':
                if (!isset($params['id'])) {
                    $array = ['status' => 400, 'message' => '缺少参数 id',];
                    return json_encode($array, JSON_UNESCAPED_UNICODE);
                } else {
                    if (isset($params['from_date'])) {
                        $params['from_date'] = $params['from_date'];
                    }
                    if (isset($params['to_date'])) {
                        $params['to_date'] = $params['to_date'];
                    }
                    if (isset($params['from_date'])) {
                        $params['set_online_time'] = $params['from_date'];
                    }

                    $array = $voucher->update($params);
                }
                break;
            case 'DELETE':
                if (!isset($params['id'])) {
                    $array = ['status' => 400, 'message' => '缺少参数 id',];
                } else {
                    $array = $voucher->delete($params);
                }
                break;
            default:
                return json_encode(['status' => 404, 'message' => 'ajax请求类型错误，找不到该请求',], JSON_UNESCAPED_UNICODE);
        }
        return $array;
    }

    public function actionList() {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数
            $voucher = new VoucherTypeModel();
            $array = $voucher->findall($params);
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionSingle($id) {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数
            $voucher = new VoucherTypeModel();
            $params['id'] = $id;
            $array = $voucher->find($params);
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionAdd() {
        if (yii::$app->request->isPost) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $voucher = new VoucherTypeModel();
            $must = ['name', 'price', 'full_price', 'count', 'days', 'act_id', 'from_date', 'to_date'];
            $rs = $this->checkInput($must, $params);
            $params['from_date'] = strtotime($params['from_date']);
            $params['to_date'] = strtotime($params['to_date']);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            $params['set_online_time'] = $params['from_date'];
            $array = $voucher->add($params);

            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionUpdate($id) {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $params['id'] = $id;
            $voucher = new VoucherTypeModel();
            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            } else {
                if (isset($params['from_date'])) {
                    $params['from_date'] = strtotime($params['from_date']);
                }
                if (isset($params['to_date'])) {
                    $params['to_date'] = strtotime($params['to_date']);
                }
                if (isset($params['from_date'])) {
                    $params['set_online_time'] = $params['from_date'];
                }

                $array = $voucher->update($params);
            }
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionDelete($id) {
        if (yii::$app->request->isDelete) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $voucher = new VoucherTypeModel();
            $params['id'] = $id;
            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            } else {
                $array = $voucher->delete($params);
            }
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

}
