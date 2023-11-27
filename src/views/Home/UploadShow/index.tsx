import { SwapOutlined } from '@ant-design/icons'
import { Popover, Progress } from 'antd'
import React, { memo, useState } from 'react'

const index = memo(() => {
    // Popover 是否展示
  const [ isPopoverShow, setIsPopoverShow ] = useState<boolean>(false)


    // 上传区域展示
  const showContent = () =>{
    return (
      <div className="content">
        <div>
          <span>11</span>
          <Progress percent={30} status="active" />
        </div>
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
      </div>
    )
  }

  return (
    <>
        <Popover content={showContent} title="上传任务（仅展示本次上传任务）" trigger="click" overlayInnerStyle={{
            width: '500px',
            marginRight: '10px'
        }} open={isPopoverShow} onOpenChange={()=>{setIsPopoverShow(!isPopoverShow)}}>
            <SwapOutlined className='icon-transfer'/>
        </Popover>
    </>
  )
})

export default index