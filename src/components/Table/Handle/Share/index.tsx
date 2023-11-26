import { Button, Form, Modal, Radio, message, Input } from 'antd'
import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import { DataType } from '../../type';
import { ChildShareMethods } from '../..';
import { shareFile, shareFileUrl } from '@/service/modules/share';
import { coppyUrl } from '@/utils';

const index = memo(forwardRef<ChildShareMethods>((props, ref) => {
  const [form] = Form.useForm(); // 使用 useForm 创建表单实例
    // 暴露句柄
  useImperativeHandle(ref, () => {
    return {
      openModel,
    }
  }, []);


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
    const [ radio2Value, setRadio2Value ] = useState('1')

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
      try {
        const res = await form.validateFields()
        console.log(res);
        const res1 = await shareFile(recordData!.fileId, res.radio1, res.radio2, res.code && res.code)
        setShareUrl({
          shareId: res1.data.data.shareId,
          code: res1.data.data.code
        })
        setCancelText('关闭')
      } catch (error) {
        console.log(error);
        
      }
    }

    const radio2Change = (e: any) =>{
      console.log(e.target.value);
      setRadio2Value(e.target.value)
    }

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
                    { shareFileUrl(shareUrl.shareId) }
                  </Form.Item>
                  <Form.Item label="提取码">
                    { shareUrl.code }
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={()=>coppyUrl(shareUrl.shareId, shareUrl.code)}>
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
                    <Radio.Group onChange={radio2Change}>
                      <Radio value="1"> 系统生成 </Radio>
                      <Radio value="0"> 自定义 </Radio>
                    </Radio.Group>
                  </Form.Item>

                  {
                    radio2Value === '0' && (
                      <>
                        <Form.Item label="提取码" name='code' rules={
                          [
                            { 
                              required: true, 
                              message:"请输入提取码" 
                            }, 
                            { 
                              type: 'string', 
                              len: 5,
                              message:"提取码必须为5位"
                            }
                          ]
                        }>
                          <Input showCount maxLength={5} placeholder='请输入5位提取码'/>
                        </Form.Item>
                      </>
                    )
                  }

                </>
              )
            }

          </Form>
        </Modal>
    </>
  )
}))

export default index