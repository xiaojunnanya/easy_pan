
// 将数据转为MB或GB
export default function(size: number){
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
// 10747904000
// 3188111