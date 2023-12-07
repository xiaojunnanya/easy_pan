import React, { FC, memo, useEffect, useRef } from 'react'
import * as docx from "docx-preview";
import { getFileDetailInfo } from '@/service/modules/home';
import { HandleStyle } from './style';

interface IProps {
    fileId: string
}

const PreDoc:FC<IProps> = memo((props) => {
    const docRef = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        getFileDetailInfo(props.fileId).then(res =>{
            console.log(res.data);
            if(!res) return
            docx.renderAsync(res.data, docRef.current as HTMLDivElement);
        })
    }, [props.fileId])

    return (
        <HandleStyle ref={docRef}></HandleStyle>
    )
})

export default PreDoc