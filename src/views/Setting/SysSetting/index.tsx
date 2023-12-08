/*
 * @Author: XJN
 * @Date: 2023-10-08 21:24:59
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-05 15:31:04
 * @FilePath: \easy_pan\src\views\Setting\SysSetting\index.tsx
 * @Description: 系统设置
 * @前端实习生: 鲸落
 */
import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { getSysSettings, saveSysSettings } from '@/service/modules/setting';
import { changeMessageApi } from '@/store/modules/common';
import { useAppDispatch } from '@/store';


type FieldType = {
  registerEmailTitle: string;
  registerEmailContent: string;
  userInitUseSpace: string;
};

const App: React.FC = () => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const onFinish = (values: any) => {
    console.log('Success:', values);
    saveSysSettings(values).then(res =>{
      console.log(res.data);
      if( res?.data.code === 200 && res?.data.status === 'success'){
          dispatch(changeMessageApi({
            type: 'success',
            info: '修改成功'
        }))
      }else{
          dispatch(changeMessageApi({
            type: 'error',
            info: res?.data.info || '服务器异常，请稍后重试'
        }))
      }
    })
  };

  
  useEffect(()=>{
    getSysSettings().then(res =>{
      const { data } = res.data
      form.setFieldsValue(data)
    })
  }, [])

  return (
    <>
      <Form  name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600,marginTop:50 }} 
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item<FieldType>
          label="注册邮件标题"
          name="registerEmailTitle"
          rules={[{ required: true, message: '请输入注册邮箱标题' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item<FieldType>
          label="注册邮件内容"
          name="registerEmailContent"
          rules={[{ required: true, message: '请输入注册邮件内容' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item<FieldType>
          label="初始空间大小"
          name="userInitUseSpace"
          rules={[{ required: true, message: '请输入初始空间大小' }]}
        >
          <Input addonAfter="MB"/>
        </Form.Item>
    
    
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>

    </>
  )
}

export default App;