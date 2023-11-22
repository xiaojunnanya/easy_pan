import styled from "styled-components";


interface propsType{
    height?: number;
}

export const RecyclePreStyled = styled.div<propsType>`
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
            /* width: 30px; */
            margin-right: 10px;
            text-align: center;
        }

        img{
            height: 30px;
            width: 30px;
            object-fit: cover;
        }
    }


    .ant-table{
        height: ${ props => props.height + 'px' }
    }
`

