import { Breadcrumb, Button, Modal } from 'antd';
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import { ChildRemoveMethods } from '../..';
import { getLoadAllFolder } from '@/service/modules/home';
import { DataType } from '../../type';
import RenderName from '../RenderName';
import { Fragment } from 'hls.js';
import { RemoveStyled } from './style';

import './styles.css'

const index = memo(forwardRef<ChildRemoveMethods>((props, ref) => {

      // 暴露句柄
    useImperativeHandle(ref, () => {
        return {
            showModal,
        }
    }, []);

    // ----- state -----

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ showFolder, setShowFolder ] = useState<DataType[]>([])
    const [ breadItem, setBreadItem ] = useState<any[]>([
        {
          title: '全部文件',
        },
      ])


    // ----- method -----

    const showModal = () => {
        setIsModalOpen(true);
        getData('0')
    };

    const getData = (filePid: string) =>{
        getLoadAllFolder(filePid).then(res =>{
            let { data } = res.data
  
            for (const item of data) {
                item.key = item.fileId
            }
            
            setShowFolder(data)
        })
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const detail = (data: DataType) =>{
        console.log(data);
        getData(data.fileId)
    }

    return (
        <RemoveStyled>
            <Modal title="移动到" open={isModalOpen} onOk={handleOk} onCancel={()=>{setIsModalOpen(false)}} 
            okText='移动到此处' className='moda-body'
            footer={(_, { OkBtn }) => (
            <>
                <OkBtn />
            </>
            )}>
                <Breadcrumb separator=">" items={breadItem} />
                {
                    showFolder.map(item => {
                        return (
                            <div key={item.key} onClick={()=>{detail(item)}}>
                                <RenderName record={item}></RenderName>
                            </div>
                        )
                    })
                }
            </Modal>
        </RemoveStyled>
    );
}))

export default index