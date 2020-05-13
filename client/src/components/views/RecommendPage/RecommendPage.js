import React from 'react'
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const RecommandCard = styled.div`
    margin: 30px 0;
`;

const RecommandName = styled.h3`
    margin: 10px 20px;
`;

const RecommandList = styled.ul`
    list-style-type: none;
    display: flex;
`;


function RecommendPage() {
    return (
        <div>
            <form>
                <Button style={{
                    display: 'block',
                    border: "0.001px solid #222222",
                    background: "f7f7f7",
                    color: "#222222",
                    width: '90%',
                    fontSize: '14px',
                    margin: '20px auto',
                    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.19)'
                }}
                    href="/search"
                    variant="outline-secondary">
                    검색
                    </Button>
            </form>

            {/* 북트레일러 추천페이지 */}
            <div>
                <RecommandCard>
                    <RecommandName>오늘의 북트레일러</RecommandName>
                    <RecommandList>
                        <li>
                            <div>북트레일러 이미지</div>
                            <div>북트레일러 제목</div>
                        </li>
                        <li>
                            <div>북트레일러 이미지</div>
                            <div>북트레일러 제목</div>
                        </li>
                        <li>
                            <div>북트레일러 이미지</div>
                            <div>북트레일러 제목</div>
                        </li>
                    </RecommandList>
                </RecommandCard>
            </div>
        </div>
    )
}

export default RecommendPage
