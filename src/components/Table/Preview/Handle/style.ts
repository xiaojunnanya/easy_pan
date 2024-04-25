import styled from "styled-components";

export const DocStyle = styled.div`
    .doc-content {
        margin: 0px auto;
        :deep .docx-wrapper {
            background: #fff;
            padding: 10px 0px;
        }

        :deep .docx-wrapper > section.docx {
            margin-bottom: 0px;
        }
    }

    .docx-wrapper{
        padding: 2px;
        background-color:#fff;
    }

    .docx{
        padding: 20px 50px !important;
    }
`

export const XlsStyle = styled.div`
    .table-info {
        width: 100%;
        padding: 10px;
        
        table {
            width: 100%;
            border-collapse: collapse;
            td {
                border: 1px solid #ddd;
                border-collapse: collapse;
                padding: 5px;
                height: 30px;
                min-width: 50px;
            }
        }
    }
`


export const PdfStyle = styled.div`
    canvas{
        margin: 0px auto;
    }
`