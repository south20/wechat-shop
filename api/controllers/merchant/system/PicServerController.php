<?php

namespace app\controllers\merchant\system;

use app\models\system\SystemPicServerModel;
use yii;
use yii\web\MerchantController;

class PicServerController extends MerchantController
{

    public $enableCsrfValidation = false; //禁用CSRF令牌验证，可以在基类中设置

    /**
     * 新增banner
     * @return array
     */
    public function actionAdd()
    {
        if (yii::$app->request->isPost) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->bodyParams; //获取body传参

            $must = ['type'];
            //设置类目 参数
            $rs = $this->checkInput($must, $params);
            if ($rs != false) {
                return $rs;
            }

            $model = new SystemPicServerModel();
            //关闭所有服务器，只开启当前编辑服务器
            $data['status'] = 0;
            $array = $model->do_update([],$data);
            if ($params['type'] == 0){  //使用本地存储,将其他关闭
                return $array;
            }
            $where['type'] = $params['type'];
            $info = $model->do_one($where);
            $data['type'] = $params['type'];
            if (isset($params['config'])){
                $data['config'] = json_encode($params['config'],JSON_UNESCAPED_UNICODE);
            }
            $data['status'] = 1;
            if ($info['status'] == 200){
                $array = $model->do_update($where,$data);
            }else{
                $array = $model->do_add($data);
            }
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }


    /**
     * 查询单条数据
     * @param $id
     * @return array
     */
    public function actionList()
    {
        if (yii::$app->request->isGet) {
            $request = yii::$app->request; //获取 request 对象
            $params = $request->get(); //获取地址栏参数

            $model = new SystemPicServerModel();
            $where['limit'] = false;
            $array = $model->do_select($where);
            if ($array['status'] == 200){
                foreach ($array['data'] as $k=>$v){
                    $array['data'][$k]['config'] = json_decode($v['config'],true);
                }
            }
            return $array;
        } else {
            return result(500, "请求方式错误");
        }
    }


}
