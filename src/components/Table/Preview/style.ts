import styled from "styled-components";

export const PreviewStyled = styled.div`
    height: 100%;

    .img{
        height: 75vh;
        display: flex;
        align-items: center;
        justify-content: center;

        img{
            margin-top: 10px;
            max-height: 100%;
            max-width: 100%;
        }
    }

    .other{
        height: 100%;
        display: flex;
        justify-content:center;
        align-items: center;
        

        div{
            text-align: center;

            .name{
                font-weight: 700;
                font-size:18px;
                color: #636D7E;
            }

            .info{
                font-size: 12px;
                color: #9FA09E;
                margin: 10px 0 15px 0;
            }
        }
    }
`