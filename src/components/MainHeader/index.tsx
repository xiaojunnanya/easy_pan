import { CloudUploadOutlined, DeleteOutlined, DragOutlined, SnippetsOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { memo, useState } from 'react'
import type { FC } from 'react'
import { MainHeaderStyled } from './style';
const { Search } = Input;

// isShowFolder为ture显示文件夹
interface propsType{
    isShowFolder?: boolean
  }

const index: FC<propsType> = memo((props) => {
    const [ isSpin, setIsSpin ] = useState<boolean>(false)
    
    const onSearch = () =>{
        console.log('1');
    }

    const upDate = () =>{
        console.log('1');
        setIsSpin(true)
        setTimeout(()=>{
            setIsSpin(false)
        },2000)
    }

  return (
    <MainHeaderStyled>
        <div>
            <Button type="primary" icon={<CloudUploadOutlined />} size="middle">
                上传
            </Button>
        </div>

        {
            props.isShowFolder && (
                <div>
                    <Button type="primary" icon={<SnippetsOutlined />} size="middle" style={{backgroundColor:'#67C23A'}}>
                        新建文件夹
                    </Button>
                </div>
            )
        }
    
        <div>
            <Button type="primary" icon={<DeleteOutlined />} size="middle" style={{backgroundColor:'#F56C6C'}}>
                批量删除
            </Button>
        </div>
        <div>
            <Button type="primary" icon={<DragOutlined />} size="middle" style={{backgroundColor:'#E6A23C'}}>
                批量移动
            </Button>
        </div>
        <div>
            <Search placeholder="输入文件名进行搜索" allowClear onSearch={onSearch} style={{ width: 300 }} />
        </div>
        <div>
            <SyncOutlined className="iconfont icon-refresh" onClick={upDate} spin={isSpin}/>
        </div>
    </MainHeaderStyled>
  )
})

export default index