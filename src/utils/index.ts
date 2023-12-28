/*
 * @Author: XJN
 * @Date: 2023-11-30 17:10:38
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-28 09:57:18
 * @FilePath: \easy_pan\src\utils\index.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
import { getDownCode, downloadFile } from "@/service/modules/home";
import { shareFileUrl } from "@/service/modules/share";
import { message } from "antd";
import copy from 'copy-to-clipboard';

// 将数据转为MB或GB
export function setSize(size: number){
    let result = size / 1024 / 1024 / 1024;
    if(result < 1){
        result = size / 1024 / 1024;

        if( result < 1 ){
            result = size / 1024;

            return result.toFixed(2) + 'KB';
        }
        return result.toFixed(2) + 'MB';
    }
    return result.toFixed(2) + 'GB';
}

// 下载
export async function downLoadFile(fileId: string){
    const res = await getDownCode(fileId)
    // 执行下载
    const link = document.createElement('a');
    link.href = downloadFile(res.data.data);
    document.body.appendChild(link);
    link.click();
}

// 复制链接
export function coppyUrl(
    shareId: string,
    code: string
){
    copy('分享链接：'+ shareFileUrl(shareId) +'\n提取码：'+code);
    message.destroy()
    message.success('复制成功');
};


// 将字符串携带'/'转为数组
export function setArr(str: string){
    if(str.includes('/')){
        return str.split('/')
    }else{
        return str
    }
}