import { SyncOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { Fragment, memo, useState } from 'react'
import type { FC } from 'react'
import { MainHeaderStyled } from './style';
import { btnType } from './type';
const { Search } = Input;

// isShowFolder为ture显示文件夹
interface propsType{
    showBtn: btnType[],
    getData: (filterValue?: string)=> void
}


const index: FC<propsType> = memo((props) => {
    const { showBtn, getData } = props
    const [ isSpin, setIsSpin ] = useState<boolean>(false)
    const onSearch = (e: string) =>{
        getData(e)
    }

    const upDate = () =>{
        setIsSpin(true)
        getData()
        setTimeout(()=>{
            setIsSpin(false)
        }, 700)
    }


    const bntshow = showBtn?.map((item, index) =>{
        return (
            <Fragment key={index}>
                {
                    item.show && (
                        <div key={index}>
                            <Button type="primary" icon={item.icon} size="middle" style={item?.style} 
                            disabled={item.disabled} onClick={item.onClick}>
                                { item.name }
                            </Button>
                        </div>
                    )
                }
            </Fragment>
        )
    })

  return (
    <MainHeaderStyled>
        {bntshow}
        <div>
            <Search placeholder="输入文件名进行搜索" allowClear onSearch={onSearch} 
            style={{ width: 300 }}/>
        </div>
        <div>
            <SyncOutlined className="iconfont icon-refresh" onClick={upDate} spin={isSpin}/>
        </div>
    </MainHeaderStyled>
  )
})

export default index