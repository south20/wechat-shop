<?php

/**
 * This file is part of Swoft.
 *
 * @link https://swoft.org
 * @document https://doc.swoft.org
 * @contact group@swoft.org
 * @license https://github.com/swoft-cloud/swoft/blob/master/LICENSE
 */

namespace app\models\shop;

use app\models\common\CommonModel;

/**
 * Class LuckyVoucherModel
 * @package app\models\vip
 */
class LuckyVoucherModel extends CommonModel {

    /**
     * shop_vip_config
     * @return string
     */
    public static function tableName() {
        return 'shop_lucky_voucher';
    }

    /**
     * 列表
     * @param $params
     * @return array
     */
    public function do_select($params) {
        //数据库操作
        $params['orderby'] = "id desc";
        $params['count'] = true;
        $res = $this->get_list($params);
        if (empty($res)) {
            return result(204, '查询失败');
        } else {
            return ['data' => $res['data'], 'count' => $res['count']];
        }
    }
    /**
     * 新增
     * @param $params
     * @return array
     */
    public function add($params) {
        $data = array();
        $res = $this->modify($params, $data);
        if (empty($res)) {
            return result(204, '新增失败');
        } else {
            return result(200, '新增成功',$res);
        }
    }


    /**
     * @param $where
     * @param $data
     * @return array
     */
    public function do_update($where, $data) {
    
        $res = $this->modify($where, $data);
        if ($res == false) {
            return result(500, '更新失败');
        } else {
           return result(200, '请求成功');
        }
    }


    /**
     * 查询单条数据
     * @param $params
     * @return array
     */
    public function one($params) {

        $res = $this->get_info($params);

        if (empty($res)) {
            return result(204, '查询失败');
        } else {
            return result(200, '请求成功',$res);
        }
    }

    /**
     * 删除
     * @param $where
     * @return array
     */
    public function do_delete($where) {
        $res = $this->soft_delete($where);
        if ($res == false) {
            return result(500, '删除失败');
        } else {
            return result(200, '请求成功');
        }
    }
}
