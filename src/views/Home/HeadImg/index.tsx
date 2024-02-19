import { getHeaderImg, logout } from '@/service/modules/home'
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Modal, Upload, UploadFile, UploadProps } from 'antd'
import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HeadImgStyle } from './style';
import { RcFile } from 'antd/es/upload';
const { confirm } = Modal;
const items: MenuProps['items'] = [
    {
      key: '1',
      label: (<span> 修改头像 </span>),
    },
    {
      key: '2',
      label: (<span> 修改账户 </span>),
    },
    {
      key: '3',
      label: (<span> 修改密码 </span>),
    },
    {
      key: '4',
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


const index = memo(() => {
    const { nickName, userId } = JSON.parse(sessionStorage.getItem('userInfo') || JSON.stringify({nickName:'', userId:''}))
    const naviage = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
      setFileList(newFileList)
      if( file.status === 'done' ){
        setIsModalOpen(false)
        window.location.reload();
      }
      
    };
    const handleCancel = () => setPreviewOpen(false);
    // 方法：
  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1': 
        setIsModalOpen(true)
        break;
      case '2': break;
      case '3': break;
      case '4': 
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
    <HeadImgStyle>
        <Modal title="修改头像" 
        open={isModalOpen} 
        onCancel={()=>{setIsModalOpen(false)}} footer={[]} width='200px'>
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

        <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
            <div className="user-info">
                <div className="avatar">
                    <img src={getHeaderImg(userId)} alt="" />
                </div>
                <div className="nick-name">{ nickName }</div>
            </div>
        </Dropdown>
    </HeadImgStyle>
  )
})

export default index