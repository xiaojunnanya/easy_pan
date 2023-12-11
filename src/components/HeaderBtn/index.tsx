/*
 * @Author: XJN
 * @Date: 2023-10-16 21:20:16
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-11 15:15:21
 * @FilePath: \easy_pan\src\components\HeaderBtn\index.tsx
 * @Description: 头部按钮部分
 * @前端实习生: 鲸落
 */


import { SyncOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { Fragment, memo, useState } from 'react'
import type { FC } from 'react'
import { MainHeaderStyled } from './style';
import { btnType } from './type';
const { Search } = Input;

interface propsType{
    showBtn: btnType[], // 展示的按钮
    getData?: (filterValue?: string)=> void // 更新数据
    isSearch?: boolean
}


const index: FC<propsType> = memo((props) => {
    const { showBtn, getData, isSearch = true } = props
    const [ isSpin, setIsSpin ] = useState<boolean>(false)
    
    const onSearch = (e: string) =>{
        getData && getData(e)
    }

    const upDate = () =>{
        setIsSpin(true)
        getData && getData()
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
        {
            isSearch && (
                <>
                    <div>
                        <Search placeholder="输入文件名进行搜索" allowClear onSearch={onSearch} 
                        style={{ width: 300 }}/>
                    </div>
                    <div>
                        <SyncOutlined className="iconfont icon-refresh" onClick={upDate} spin={isSpin}/>
                    </div>
                </>
            )
        }
    </MainHeaderStyled>
  )
})

export default index