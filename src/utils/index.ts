import { getDownCode, downloadFile } from "@/service/modules/home";

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