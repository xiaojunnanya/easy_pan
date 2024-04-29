import { getHeaderImg, logout, updatePassword } from '@/service/modules/home'
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Dropdown, Form, Input, MenuProps, Modal, Upload, UploadFile, UploadProps } from 'antd'
import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HeadImgStyle } from './style';
import { RcFile } from 'antd/es/upload';
import { changeMessageApi } from '@/store/modules/common';
import { useAppDispatch } from '@/store';
const { confirm } = Modal;
const items: MenuProps['items'] = [
    {
      key: '1',
      label: (<span> 修改头像 </span>),
    },
    {
      key: '2',
      label: (<span> 修改密码 </span>),
    },
    {
      key: '3',
      label: (<span> 退出登录 </span>),
    },
  ];


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type FieldType = {
  nickName: string;
  password: string;
};

const index = memo(() => {
    const { nickName, userId } = JSON.parse(sessionStorage.getItem('userInfo') || JSON.stringify({nickName:'', userId:''}))
    const naviage = useNavigate()
    // 头像模态框
    const [isHeadModalOpen, setIsHeadModalOpen] = useState(false);
    // 修改账户密码模态框
    const [isPwdModalOpen, setIsPwdModalOpen] = useState(false);
    
    // 头像列表
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const handleChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
      setFileList(newFileList)
      if( file.status === 'done' ){
        setIsHeadModalOpen(false)
        window.location.reload();
      }
      
    };
    const handleCancel = () => setPreviewOpen(false);
    // 方法：
  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1': 
        setIsHeadModalOpen(true)
        break;
      case '2': 
        setIsPwdModalOpen(true)
        break;
      case '3': 
        showConfirm()
        break;
    
      default:
        break;
    }
  };

  const showConfirm = () => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleFilled />,
      content: '你确定要退出登录吗',
      cancelText:"取消",
      okText:"确定",
      onOk() {
        logout()
        sessionStorage.removeItem('userInfo')
        naviage('/login')
      },
    });
  };

  const handleOk = async () =>{
    let obj = form.getFieldsValue()
    // 暂时是修改密码，回头要改
    let res = await updatePassword(obj.password)
    if( res.data.code === 200 ){
      dispatch(changeMessageApi({ type:'success', info: '修改成功，请重新登录' }))
      naviage('/login')
    }else{
      dispatch(changeMessageApi({ type:'error', info: '修改失败，请稍后重试' }))
    }
  }

  // 预览，但是现在的模式是没有用了，暂时先留着
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );

  return (
    <>
      <>
        <Modal title="修改头像" 
          open={isHeadModalOpen} 
          onCancel={()=>{setIsHeadModalOpen(false)}} footer={[]} width='200px'>
            {/* 上传 */}
            <Upload
              action="/api/updateUserAvatar"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              name='avatar'
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {/* 预览头像 */}
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Modal>

        <Modal title="修改密码" 
          open={isPwdModalOpen} 
          onOk={handleOk}
          onCancel={()=>{setIsPwdModalOpen(false)}}>
             <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600,marginTop:50 }} 
                // onFinish={onFinish}
                autoComplete="off"
                form={form}
              >
                {/* <Form.Item<FieldType>
                  label="昵称"
                  name="nickName"
                  rules={[{ required: true, message: '请输入昵称' }]}
                >
                  <Input/>
                </Form.Item> */}
                <Form.Item<FieldType>
                  label="密码"
                  name="password"
                  rules={[
                    { required: true, message: '请输入密码' },
                    { min: 8, max: 18, message: '密码长度不能小于8位且不能超过18位'},
                    {
                      validator(rule, value, callback) {
                        // 正则：必须既有数字也有字母
                        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/.test(value)) {
                          callback('密码必须要由数字和字母组成');
                        }else{
                          return Promise.resolve()
                        }
                      },
                    }
                  ]}
                >
                  <Input/>
                </Form.Item>
              </Form>
        </Modal>
      </>

      <HeadImgStyle>
          {/* 头像名字展示 */}
          <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
              <div className="user-info">
                  <div className="avatar">
                      <img src={getHeaderImg(userId)} alt="" />
                  </div>
                  <div className="nick-name">{ nickName }</div>
              </div>
          </Dropdown>
      </HeadImgStyle>
    </>
    
  )
})

export default index