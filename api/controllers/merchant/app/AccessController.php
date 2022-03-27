<?php

namespace app\controllers\merchant\app;

use app\models\merchant\system\OperationRecordModel;
use app\models\merchant\system\UnitModel;
use app\models\merchant\user\MerchantModel;
use app\models\system\PluginModel;
use yii;
use yii\web\MerchantController;
use yii\db\Exception;
use app\models\merchant\app\AppAccessModel;
use app\models\core\Base64Model;
use app\models\core\CosModel;
use app\models\wolive\ServiceModel;

/**
 * 应用类目表控制器
 * 地址:/admin/rule
 * @throws Exception if the model cannot be found
 * @return array
 */
class AccessController extends MerchantController
{

    public function behaviors()
    {
        return [
            'token' => [
                'class' => 'yii\filters\MerchantFilter', //调用过滤器
//                'only' => ['single'],//指定控制器应用到哪些动作
                'except' => ['plugin', 'copyright'], //指定控制器不应用到哪些动作
            ]
        ];
    }

    public $enableCsrfValidation = false; //禁用CSRF令牌验证，可以在基类中设置

    /**
     * 地址:/admin/group/index 默认访问
     * @throws Exception if the model cannot be found
     * @return array
     */

    public function actionSingle($id)
    {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数
            $app = new AppAccessModel();
            $params['id'] = $id;
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            $params['merchant_id'] = yii::$app->session['uid'];
            if (isset($params['key'])) {
                $params['`key`'] = $params['key'];
                unset($params['key']);
            }

            $array = $app->find($params);
            if ($array['status'] == 200 && isset($array['data']['estimated_service_time_info'])) {
                $array['data']['estimated_service_time_info'] = json_decode($array['data']['estimated_service_time_info'], true);
            }
            if ($array['status'] == 200 && isset($array['data']['reduction_info'])) {
                $array['data']['reduction_info'] = json_decode($array['data']['reduction_info'], true);
            }
            if ($array['status'] == 200 && isset($array['data']['reduction_info'])) {
                $array['data']['distribution'] = json_decode($array['data']['distribution'], true);
            }
            if ($array['status'] == 200 && $array['data']['supplier_pic_url'] == "") {
                $array['data']['supplier_pic_url'] = "http://" . $_SERVER['HTTP_HOST'] . "/api/web/uploads/mdhb.png";
            }
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionOne()
    {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数
            $app = new AppAccessModel();
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            $params['merchant_id'] = yii::$app->session['uid'];
            $params['fields'] = " pic_url ";
            $params['`key`'] = $params['key'];
            unset($params['key']);
            $array = $app->find($params);
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionUpdate($id)
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $model = new AppAccessModel();
            $base = new Base64Model();
            $params['id'] = $id;
            $data = $model->find(['id' => $params['id'], '`key`' => $params['key'], 'merchant_id' => yii::$app->session['uid']]);
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }

            if (isset($params['estimated_service_time_info'])) {
                $params['estimated_service_time_info'] = json_encode($params['estimated_service_time_info'], JSON_UNESCAPED_UNICODE);
            }

            if (isset($params['key'])) {
                $params['`key`'] = $params['key'];
                unset($params['key']);
            }
            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            } else {
                $url = "";
                if (isset($params['pic_url'])) {
                    if ($params['pic_url'] == "") {
                        $url = $data['data']['pic_url'];
                        unset($params['pic_url']);
                    } else {
                        $url = $params['pic_url'];
                    }
                }
                $url_login = "";
                if (isset($params['pic_url_login'])) {
                    if ($params['pic_url_login'] == "") {
                        $url_login = $data['data']['pic_url_login'];
                        unset($params['pic_url_login']);
                    } else {
                        $url_login = $params['pic_url_login'];
                    }
                }
                if(isset($params['distribution'])){
                    if(is_array($params['distribution'])){
                        $params['distribution'] = json_encode($params['distribution']);
                    }
                }

                //开始事务
                $transaction = Yii::$app->db->beginTransaction();
                try {
                    $array = $model->update($params);
               //     $serveiceModel = new ServiceModel();
//                    if (!isset($params['pic_url'])) {
//                        $serveiceModel->update(['business_id' => $params['`key`'], 'nick_name' => $params['name']]);
//                    } else {
//                        $serveiceModel->update(['business_id' => $params['`key`'], 'nick_name' => $params['name'], 'avatar' => $params['pic_url']]);
//                    }
                    $transaction->commit(); //提交
                } catch (\yii\base\Exception $e) {
                    $transaction->rollBack(); //回滚
                    return result(500, "添加失败");
                }

                $array['data']['pic_url'] = $url;
                $array['data']['pic_url_login'] = $url_login;
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
                    $operationRecordData['module_name'] = '基础设置';
                    $operationRecordModel->do_add($operationRecordData);
                }
                return $array;
            }
        } else {
            return result(500, "请求方式错误");
        }
    }

    //添加、修改满减活动数据
    public function actionUpdates($id)
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $model = new AppAccessModel();
            $params['id'] = $id;
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            if (isset($params['reduction_info'])) {
                $params['reduction_info'] = json_encode($params['reduction_info'], JSON_UNESCAPED_UNICODE);
            }
            if (isset($params['key'])) {
                $params['`key`'] = $params['key'];
                unset($params['key']);
            }
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
                    if (isset($params['reduction_info'])) {
                        $operationRecordData['module_name'] = '满减';
                    } elseif (isset($params['is_recruits']) || isset($params['is_recruits_show'])) {
                        $operationRecordData['module_name'] = '新人专享';
                    }
                    $operationRecordData['operation_type'] = '更新';
                    $operationRecordData['operation_id'] = $id;
                    $operationRecordModel->do_add($operationRecordData);
                }
                return $array;
            }
        } else {
            return result(500, "请求方式错误");
        }
    }

    //门店配置
    public function actionSupplierConfig()
    {
        if (yii::$app->request->isPost) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参

            $must = ['key'];
            //设置类目 参数
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return $rs;
            }

            $model = new AppAccessModel();
            $data['`key`'] = $params['key'];
            $data['supplier_pic_url'] = isset($params['supplier_pic_url']) ? $params['supplier_pic_url'] : "http://".$_SERVER['HTTP_HOST'].'/api/web/uploads/mdhb.png';
            $data['is_show_supplier_goods'] = $params['is_show_supplier_goods'];
            $data['supplier_sort'] = $params['supplier_sort'];
            $array = $model->update($data);
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionDistributions()
    {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数
            $app = new AppAccessModel();
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            $params['merchant_id'] = yii::$app->session['uid'];
            if (isset($params['key'])) {
                $params['`key`'] = $params['key'];
                unset($params['key']);
            }

            $array = $app->find($params);
            if ($array['status'] == 200) {
                $data['id'] = $array['data']['id'];
                $data['distribution'] = json_decode($array['data']['distribution'], true);
                return result(200, '请求成功', $data);
            }
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionDistribution($id)
    {
        if (yii::$app->request->isPut) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参
            $model = new AppAccessModel();
            $params['id'] = $id;
            $must = ['key'];
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return json_encode($rs, JSON_UNESCAPED_UNICODE);
            }
            if (isset($params['distribution'])) {
                $params['distribution_is_open'] = $params['distribution']['distribution_is_open'];
                $params['distribution'] = json_encode($params['distribution'], JSON_UNESCAPED_UNICODE);
            }
            if (isset($params['key'])) {
                $params['`key`'] = $params['key'];
                unset($params['key']);
            }
            if (!isset($params['id'])) {
                return result(400, "缺少参数 id");
            } else {
                $array = $model->update($params);
                if ($array['status'] == 200) {
                    //添加操作记录
                    $operationRecordModel = new OperationRecordModel();
                    $operationRecordData['key'] = $params['`key`'];
                    $operationRecordData['merchant_id'] = yii::$app->session['uid'];
                    if (isset($params['reduction_info'])) {
                        $operationRecordData['module_name'] = '设置分销佣金';
                    } elseif (isset($params['distribution']) || isset($params['distribution'])) {
                        $operationRecordData['module_name'] = '设置分销佣金';
                    }
                    $operationRecordData['operation_type'] = '更新';
                    $operationRecordData['operation_id'] = $id;
                    $operationRecordModel->do_add($operationRecordData);
                }
                return $array;
            }
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionPlugin()
    {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数
            $url = "https://api.juanpao.com/shop/test/api?url=" . \Yii::$app->request->hostInfo;
            $res = json_decode(curlGet($url), true);
            \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
            return $res;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionCopyright()
    {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数
            $model = new UnitModel();
            $copyright = $model->find(['`key`=>ccvWPn', 'route' => 'copyright']);
            if ($copyright['status'] != 200) {
                return $copyright;
            } else {
                $a = json_decode($copyright['data']['config'], true);
                $copyright['data'] = array();
                $copyright['data'] = $a;
            }
            return $copyright;
        } else {
            return result(500, "请求方式错误");
        }
    }

    public function actionApp(){
        isset($_SESSION) or session_start();
        if (!isset($_SESSION['authcode']) || $_SESSION['authcode'] != '25b7fbcf28') {
            $hosts = $_SERVER['HTTP_HOST'] . '|' . $_SERVER['SERVER_NAME'];
            $ckret = file_get_contents('http://mf.juanpao.com/check.php?a=index&appsign=2_200813175144427_112f7126_a1c888aa1b2164cf647f289939cf2051&h=' . urlencode($hosts) . '&t=' . $_SERVER['REQUEST_TIME'] . '&token=' . md5($_SERVER['REQUEST_TIME'] . '|' . $hosts . '|xzphp|25b7fbcf28'), false, stream_context_create(array('http' => array('method' => 'GET', 'timeout' => 3))));
            if ($ckret) {
                $ckret = json_decode($ckret, true);
                if ($ckret['status'] != 1) {
                    //exit($ckret['msg']);
                    return result(500,'授权检测失败，请联系授权提供商。');
                } else {
                    $_SESSION['authcode'] = '25b7fbcf28';
                    unset($hosts, $ckret);
                }
                return result(200,'请求成功');
            } else {
                return result(500,'授权检测失败，请联系授权提供商。');
            }
        }else{
            return result(500,'授权检测失败，请联系授权提供商。');
        }
    }

}
