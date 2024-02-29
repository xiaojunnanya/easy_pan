import styled from "styled-components";

export const UploadShowStyle = styled.div`

    .uploadShow{
        margin: 18px 0;

        .bottom{

            display: flex;
            align-items: center;

            .progress{
                width: 88%;
            }

            .btn{
                height: 100%;
                flex: 1;
                margin-left: 10px;
                
                &>span{
                    margin:  0 3px;
                    font-size: 16px;
                }
            }
        }
    }

    .cutShow{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
    }


    .top{
        &>span:nth-child(1){
            margin-right: 10px;
        }
    }

    
    
`