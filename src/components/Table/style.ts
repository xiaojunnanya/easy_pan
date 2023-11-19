import styled from "styled-components";


interface propsType{
    height?: number;
}

export const TableStyled = styled.div<propsType>`
    .ant-table-pagination{
        margin-right: 40px !important;
        position: relative;
        bottom: 10px;
    }

    .allHandle{
        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        .handle{
            color: #06A7FF;
            margin: 0 5px;
            cursor: pointer;

            img{
                width: 22px;
                height: 22px;
                vertical-align: bottom
            }
        }
    }

    .folderType{
        
        user-select: none;
        display: flex;
        align-items: center;

        .showImg{
            width: 30px;
            margin-right: 15px;
            text-align: center;
        }

        span, img{
            cursor: pointer;

            &:hover{
                color: #06A7FF;
            }
        }

        img{
            height: 30px;
            max-width: 42px;
        }
    }


    .ant-table{
        height: ${ props => props.height + 'px' }
    }
`

