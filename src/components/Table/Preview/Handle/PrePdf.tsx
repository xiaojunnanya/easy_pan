/*
 * @Author: XJN
 * @Date: 2023-12-05 17:55:28
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-07 09:01:54
 * @FilePath: \easy_pan\src\components\Table\Preview\prePdf.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import { previewFile } from '@/service/modules/home';
import React, { FC, memo, useState } from 'react'

import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`


interface IProps {
    fileId: string
}

const PrePdf: FC<IProps> = memo((props) => {
    console.log('props.fileId', props.fileId);
    
    const [numPages, setNumPages] = useState<number>(0)

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {setNumPages(numPages)}

    const show = new Array(numPages).fill('').map((item, index) =><Page key={index} pageNumber={index} />)

    return (
        <Document file={previewFile(props.fileId)} loading='加载中...' onLoadSuccess={onDocumentLoadSuccess}>
            {
                show
            }
        </Document>
    )
})

export default PrePdf