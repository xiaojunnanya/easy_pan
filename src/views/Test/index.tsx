import React from 'react';
import { Button, Form, Input, Radio } from 'antd';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


const App: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item label="文件名">
      { 'admin' }
    </Form.Item>

    <Form.Item label="有效期" name='radio1' initialValue={'apple'}>
      <Radio.Group>
        <Radio value="apple"> 1天 </Radio>
        <Radio value="pear"> 7天 </Radio>
        <Radio value="app1le"> 30天 </Radio>
        <Radio value="pear"> 永久有效 </Radio>
      </Radio.Group>
    </Form.Item>

    <Form.Item label="提取码" name='radio2' initialValue={'apple'}>
      <Radio.Group>
        <Radio value="apple"> 系统生成 </Radio>
        <Radio value="pear"> 自定义 </Radio>
      </Radio.Group>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;