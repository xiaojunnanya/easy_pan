import { Button, Form, Modal, Radio, message } from 'antd'
import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import { DataType } from '../../type';
import { ChildShareMethods } from '../..';
import { shareFile, shareFileUrl } from '@/service/modules/share';
import copy from 'copy-to-clipboard';

const index = memo(forwardRef<ChildShareMethods>((props, ref) => {
  const [form] = Form.useForm(); // 使用 useForm 创建表单实例
    // 暴露句柄
  useImperativeHandle(ref, () => {
    return {
      openModel,
    }
  }, []);

  const ref1 = useRef()
  const ref2 = useRef()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ recordData, setRecordData ] = useState<DataType>()
    const [ shareUrl, setShareUrl ] = useState<{
      shareId:string,
      code: string
    }>({
      shareId: '',
      code: ''
    })

    const [ cancelText, setCancelText ] = useState('取消')

    const openModel = (record: DataType) =>{
      setShareUrl({
        shareId: '',
        code: ''
      })
      setIsModalOpen(true)
      setRecordData(record)
      setCancelText('取消')
    }

    const handleOk = async () => {
      const res = await form.validateFields()
      console.log(res);
      const res1 = await shareFile(recordData!.fileId, res.radio1, res.radio2)
      console.log(res1.data.data.code); // 提取码: code
      console.log(res1.data.data.shareId); // 分享连接:http://netdisk.kbws.xyz/share/shareId
      setShareUrl({
        shareId: shareFileUrl(res1.data.data.shareId),
        code: res1.data.data.code
      })
      setCancelText('关闭')
    }

    function coppyUrl(url: any){
      copy('分享链接：'+url.shareId +'\n提取码：'+url.code);
      message.destroy()
      message.success('复制成功');
    };

  return (
    <>
        <Modal title="文件分享" open={isModalOpen} onOk={handleOk} onCancel={()=>{setIsModalOpen(false)}} 
        cancelText={cancelText} footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            {
              cancelText === '取消' && <OkBtn />
            }
          </>
        )}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600 }}
            form={form}
          >
            <Form.Item label="文件名">
              { recordData?.fileName }
            </Form.Item>

            {
              ( shareUrl.shareId && shareUrl.code ) ? (
                <>
                  <Form.Item label="分享连接">
                    { shareUrl.shareId }
                  </Form.Item>
                  <Form.Item label="提取码">
                    { shareUrl.code }
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={()=>coppyUrl(shareUrl)}>
                      复制链接及提取码
                    </Button>
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item label="有效期" name='radio1' initialValue={'0'}>
                  <Radio.Group>
                    <Radio value="0"> 1天 </Radio>
                    <Radio value="1"> 7天 </Radio>
                    <Radio value="2"> 30天 </Radio>
                    <Radio value="3"> 永久有效 </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="提取码" name='radio2' initialValue={'1'}>
                  <Radio.Group>
                    <Radio value="1"> 系统生成 </Radio>
                    <Radio value="0"> 自定义 </Radio>
                  </Radio.Group>
                </Form.Item>
                </>
              )
            }

          </Form>
        </Modal>
    </>
  )
}))

export default index