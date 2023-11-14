import styled from "styled-components";

export const NoDataStyled = styled.div`
    user-select: none;
    
    .no-data {
        height: calc(100vh - 150px);
        display: flex;
        align-items: center;
        justify-content: center;

        .no-data-inner {
            text-align: center;

            .tips {
                margin-top: 10px;
            }

            .op-list {
                margin-top: 20px;
                display: flex;
                justify-content: center;
                align-items: center;

                .op-item {
                    cursor: pointer;
                    width: 100px;
                    height: 100px;
                    margin: 0px 10px;
                    padding: 5px 0px;
                    background: rgb(241, 241, 241);
                }
            }
        }
    }

`