/*
 * @Author: XJN
 * @Date: 2023-10-06 15:44:38
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-14 02:02:18
 * @FilePath: \easy_pan\src\views\Home\index.tsx
 * @Description: 首页
 * @前端实习生: 鲸落
 */
import React, { memo, useState, useEffect, useMemo, Fragment } from 'react'
import { HomeStyled } from './style'
import { AppstoreAddOutlined, CloudUploadOutlined, CustomerServiceOutlined, 
  DeleteOutlined, EllipsisOutlined, FileImageOutlined, 
  FileWordOutlined, HomeOutlined, PlayCircleOutlined, SettingOutlined, 
  ShareAltOutlined, SyncOutlined } from '@ant-design/icons'
import { Progress } from 'antd'

import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { space } from '@/service/modules/home'
import { setSize } from '@/utils'
import { useAppDispatch } from '@/store'
import { changeBtnDisabled, changeFilePid } from '@/store/modules/home'
import { changeLoading, changeMessageApi, changeSelectKeys } from '@/store/modules/common'
import HeadImg from './HeadImg'
import UploadShow from './UploadShow'
import { changeIsPopoverShow } from '@/store/modules/upload'


interface menuType{
  name: string,
  icon: any;
  menuCode: string,
  path: string,
  isShow: boolean,
  tips?:string,
  children: {
    name: string,
    path: string,
    icon?: any;
    category: string,
  }[],
}

type menuTypes = menuType[]

const Home = memo(() => {
  const { admin } = JSON.parse(sessionStorage.getItem('userInfo') || JSON.stringify({admin:false}))
  const menus: menuTypes = useMemo(()=>{
    return [
      {
          name: "首页",
          icon: <HomeOutlined className='iconfont'/>,
          menuCode: "main",
          path: "/main/home/all",
          isShow: true,
          children: [
              {
                  icon: <AppstoreAddOutlined className='iconfont'/>,
                  name: "全部",
                  category: "all",
                  path: "/main/home/all",
              },
              {
                  icon: <PlayCircleOutlined className='iconfont'/>,
                  name: "视频",
                  category: "video",
                  path: "/main/home/video",
              },
              {
                  icon: <CustomerServiceOutlined className='iconfont'/>,
                  name: "音频",
                  category: "music",
                  path: "/main/home/music",
              },
              {
                  icon: <FileImageOutlined className='iconfont'/>,
                  name: "图片",
                  category: "image",
                  path: "/main/home/image",
              },
              {
                  icon: <FileWordOutlined className='iconfont'/>,
                  name: "文档",
                  category: "doc",
                  path: "/main/home/doc",
              },
              {
                  icon: <EllipsisOutlined className='iconfont'/>,
                  name: "其他",
                  category: "others",
                  path: "/main/home/others",
              },
          ],
      },
      {
          path: "/main/share",
          icon: <ShareAltOutlined className='iconfont'/>,
          name: "分享",
          menuCode: "share",
          isShow: true,
          children: [
              {
                  name: "分享记录",
                  path: "/main/share",
                  category: "share",
              },
          ],
      },
      {
          path: "/main/recycle",
          icon: <DeleteOutlined className='iconfont'/>,
          name: "回收站",
          menuCode: "recycle",
          tips: "回收站为你保存10天内删除的文件",
          isShow: true,
          children: [
              {
                  name: "删除的文件",
                  path: "/main/recycle",
                  category: "recycle",
              },
          ],
      },
      {
          path: "/main/settings/fileList",
          icon: <SettingOutlined className='iconfont'/>,
          name: "设置",
          menuCode: "settings",
          isShow: admin,
          children: [
              {
                  name: "用户文件",
                  path: "/main/settings/fileList",
                  category: "fileList",
              },
              {
                  name: "用户管理",
                  path: "/main/settings/userList",
                  category: "userList",
              },
              {
                  name: "系统设置",
                  path: "/main/settings/sysSetting",
                  category: "sysSetting",
              },
          ],
      },
    ]
  }, [admin])

  const dispatch = useAppDispatch()

  // 定义：
  // 跳转
  const naviage = useNavigate()
  // 路径
  let { pathname } = useLocation()
  // 动态路由
  const { category } = useParams()
  
  const [ showSecondaryMenu, setShowSecondaryMenu  ] = useState<menuType>()
  const [ userSpace, setUserSpace ] = useState<{
    useSpace: number,
    totalSpace: number
  }>({
    useSpace: 0,
    totalSpace: 0,
  }) 
  const [ isSpin, setIsSpin ] = useState<boolean>(false)

  let pathnameSplit = pathname.split('/').slice(0,3).join('/')



  // useEffect：
  useEffect(()=>{

    getSpace()

    for (const item of menus) {
      if( item.path.includes(pathnameSplit) ){
        setShowSecondaryMenu( item )
        return
      }
    }
  }, [])


  const oneMenu = (item: menuType) =>{
    setShowSecondaryMenu(item)
    
    // 恢复最外侧的列表
    dispatch(changeFilePid('0'))
    // 关闭全局提示
    dispatch(changeMessageApi({info:'', type:''}))
    // 清空表格选中数据
    dispatch(changeSelectKeys([]))
    dispatch(changeBtnDisabled(true))
    // 关闭上传列表
    dispatch(changeIsPopoverShow(false))

    naviage(item.path)
  }

  const twoMenu = (item: any) =>{ 
    // 获取当前路由
    const urlParams = new URL(window.location.href);
    const pathname = urlParams?.pathname;
    naviage(item.path)
    // 开启表格加载
    item.path === pathname || dispatch(changeLoading(true))
    
    // 恢复最大的列表
    dispatch(changeFilePid('0'))
   }

  /**
   * 获取空间
   */
  const getSpace = () =>{
    setIsSpin(true)
    space().then(res =>{
      setUserSpace(res.data.data)
      setIsSpin(false)
    })
  }



  // 展示区域：

  // 一级菜单
  const firstLevelMenu = menus.map((item ,index) =>{
    
    return (
      <Fragment key={item.path}>
        {
          item.isShow && (
            <div className={ `menu-item ${ item.path.includes(pathnameSplit) ? 'active' : '' }  ` } onClick={()=>{oneMenu(item)}}>
              { item.icon }
              <div className="text"> { item.name } </div>
            </div>
          )
        }
      </Fragment>
    )
  })

  
  // 二级菜单
  const SecondaryMenu = showSecondaryMenu?.children.map((item, index) =>{
    return (
      <div className={ `menu-item-sub ${ category === item.category || !category ? 'active' : '' }  ` } key={index} onClick={()=>{twoMenu(item)}}>
        {
          !!item.icon && item.icon
        }
        <span> { item.name } </span>
      </div>
    )
  })


  const a = useMemo(()=>{
    return setSize(userSpace.useSpace)
  }, [ userSpace.useSpace ])
  const b = useMemo(()=>{
    return setSize(userSpace.totalSpace)
  }, [ userSpace.totalSpace ])
  
  return (
    <HomeStyled>
      <div className="framework">
        <div className="header">
          <div className="logo" onClick={()=>{naviage('/main')}}>
            <CloudUploadOutlined className='icon-pan'/>
            <div className="name">Easy云盘</div>
          </div>
          <div className="right-panel">
            
            <UploadShow></UploadShow>

            <HeadImg></HeadImg>
            
          </div>
        </div>
        <div className="body">
          <div className="left-sider">
            <div className="menu-list"> { firstLevelMenu } </div>
            <div className="menu-sub-list">

              <>
                {
                  SecondaryMenu
                }
              </>
              
              <div className="tips">
                {
                  !!showSecondaryMenu?.tips && showSecondaryMenu.tips
                }
              </div>

              <div className="space-info">
                <div>空间使用</div>
                <div className="percent">
                  <Progress percent={( Number(((userSpace.useSpace / userSpace.totalSpace) * 100).toFixed(2)))} size="small" />
                </div>
                <div className="space-use">
                  <div className="use">
                    { a } / { b }
                  </div>
                  
                  <SyncOutlined className="iconfont icon-refresh" onClick={getSpace} spin={isSpin}/>
                </div>
              </div>
            </div>

          </div>
          <div className="body-content">
             <Outlet context={getSpace}></Outlet>
          </div>
        </div>
      </div>
    </HomeStyled>
  )
})

export default Home