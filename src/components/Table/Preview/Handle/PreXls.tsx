import React, { FC, memo, useEffect, useRef } from 'react'

import { getFileDetailInfo } from '@/service/modules/home';

import * as XLSX from "xlsx";
import { XlsStyle } from './style';

interface IProps {
    fileId: string
}

const PreXls:FC<IProps> = memo((props) => {
    const docRef = useRef<any>(null)
    useEffect(()=>{
        getFileDetailInfo(props.fileId, false).then(res =>{
            if(!res.data) return
            let workbook = XLSX.read(new Uint8Array(res.data), {type: "array"});
            var worksheet = workbook.Sheets[workbook.SheetNames[0]];
            docRef.current.innerHTML = XLSX.utils.sheet_to_html(worksheet)
        })
    }, [props.fileId])

    return (
        <XlsStyle>
            <XlsStyle ref={docRef} className='table-info'></XlsStyle>
        </XlsStyle>
    )
})

export default PreXls