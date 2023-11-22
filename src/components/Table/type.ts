import React from 'react'

export interface DataType {
    key: React.Key
    fileCategory:number | null, // 文件类型 1 视频 2 音频 3 图片 4 文档 5 其他
    fileCover: string | null // 文件封面
    fileId: string // 文件ID
    fileName: string // 文件名称
    filePid: string // 父级ID
    fileSize: string | null // 文件大小
    fileType: number | null // 1:视频 2:音频  3:图片 4:pdf 5:doc 6:excel 7:txt 8:code 9:zip 10:其他
    folderType: number // 0:文件 1:目录
    lastUpdateTime: string // 最后更新时间
    recoveryTime: string | null // 回收站时间
    status: number // 0:转码中 1转码失败 2:转码成功
}

// isShowFolder为ture显示文件夹按钮
export interface propsType{
    data: any
}