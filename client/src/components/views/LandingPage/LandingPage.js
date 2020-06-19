import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {auth} from '../../../_actions/user_action';
import {useEffect} from 'react';

function LandingPage() {

    const [verify, setVerify] = useState(false);

    const dispatch = useDispatch();

    //back에 req날리기
    useEffect(() => {
        dispatch(auth()).then(res => {
            setVerify(res.payload.verify);
        })
        
     });

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(res => {
                if (res.data.isLogoutSuccess) {
                    document.location.href = "/";
                } else {
                    alert('로그아웃 실패');
                }
            });
    }

    if(verify){
        return (
            <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '40vh 0',
                width: '100%',
                height: '100vh'
            }}>
                <div>잘못된 페이지입니다.</div>
                <img src='pengsu.jpg'></img>

                <button onClick={onClickHandler}>
                    로그아웃
                </button>
            </div>
        )
    }else{
        return (
            <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '40vh 0',
                width: '100%',
                height: '100vh'
            }}>
                <h2>LandingPage</h2>

                <div>로그인 안내와 함께 검색창이 제공될 예정</div>
            </div>
        )
    }
}

export default withRouter(LandingPage);


// import React from 'react'
// import { Button } from 'react-bootstrap';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

// const sampleImage1 = '/images/booktrailer.jpg';
// const sampleImage2 = '/images/booktrailer2.jpeg';
// const sampleImage3 = '/images/booktrailer3.jpeg';

// //스타일 component
// const RecommandCard = styled.div`
//     margin: 30px 0;
// `;

// const RecommandName = styled.h3`
//     margin: 10px 30px;
// `;

// const RecommandList = styled.ul`
//     white-space: nowrap;
//     overflow-x: scroll;
//     &::-webkit-scrollbar {
//         display: none;
//     }
// `;

// const RecommandListLi = styled.li`
//     list-style: none;
//     display: inline-block;
//     margin: 10px;
//     width: 214px;
// `;

// const Image1 = styled.img.attrs({
//     src: `${sampleImage1}`
// })`
//     width: 214px;
//     height: 130px;
//     background-size: cover;
//     background-position: center;
// `;

// const Image2 = styled.img.attrs({
//     src: `${sampleImage2}`
// })`
//     width: 214px;
//     height: 130px;
//     background-size:cover;
//     background-position: center;
// `;

// const Image3 = styled.img.attrs({
//     src: `${sampleImage3}`
// })`
//     width: 214px;
//     height: 130px;
//     background-size:cover;
//     background-position: center;
// `;

// const RecommandLink = styled(Link)`  
//     color: black;
//     &:hover {
//         text-decoration: none;
// } 
// `;

// const Name = styled.p`
//     font-weight: bold;
//     color: black;
//     margin-top: 10px;
//     margin-bottom: 0;
//     overflow: hidden; 
//     text-overflow: ellipsis;
//     width: inherit;
// `;

// function RecommendPage() {
//     return (
//         <div>
//             <form>
//                 <Button style={{
//                     display: 'block',
//                     border: "0px",
//                     background: "f7f7f7",
//                     color: "#222222",
//                     width: '90%',
//                     height: '40px',
//                     fontSize: '20px',
//                     margin: '30px auto',
//                     boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1), 0 3px 10px 0 rgba(0,0,0,0.19)'
//                 }}
//                     href="/search"
//                     variant="outline-secondary">
//                     검색
//                     </Button>
//             </form>

//             {/* 북트레일러 추천페이지 */}
//             <div>
//                 <RecommandCard>
//                     <RecommandName>오늘의 북트레일러</RecommandName>
//                     <RecommandList>
//                         <RecommandListLi>
//                             <RecommandLink to="">
//                                 <Image1 />
//                                 <Name>사소한 개인의 사소한 것에 대한 사소한 취향</Name>
//                             </RecommandLink>
//                         </RecommandListLi>
//                         <RecommandListLi>
//                             <RecommandLink to="">
//                                 <Image2 />
//                                 <Name>홍남권 작가의 역사소설, 안시성</Name>
//                             </RecommandLink>
//                         </RecommandListLi>
//                         <RecommandListLi>
//                             <RecommandLink to="">
//                                 <Image3 />
//                                 <Name>몽실이 몽실이 몽실언니</Name>
//                             </RecommandLink>
//                         </RecommandListLi>
//                     </RecommandList>
//                 </RecommandCard>

//                 <RecommandCard>
//                     <RecommandName>00 관련 북트레일러1</RecommandName>
//                     <RecommandList>
//                         <RecommandListLi>
//                             <RecommandLink to="">
//                                 <Image1 />
//                                 <Name>사소한 개인의 사소한 것에 대한 사소한 취향</Name>
//                             </RecommandLink>
//                         </RecommandListLi>
//                         <RecommandListLi>
//                             <RecommandLink to="">
//                                 <Image2 />
//                                 <Name>홍남권 작가의 역사소설, 안시성</Name>
//                             </RecommandLink>
//                         </RecommandListLi>
//                         <RecommandListLi>
//                             <RecommandLink to="">
//                                 <Image3 />
//                                 <Name>몽실이 몽실이 몽실언니</Name>
//                             </RecommandLink>
//                         </RecommandListLi>
//                     </RecommandList>
//                 </RecommandCard>

//                 <RecommandCard>
//                     <RecommandName>00 관련 북트레일러2</RecommandName>
//                     <RecommandList>
//                         <RecommandListLi>
//                             <RecommandLink to="">
//                                 <Image1 />
//                                 <Name>사소한 개인의 사소한 것에 대한 사소한 취향</Name>
//                             </RecommandLink>
//                         </RecommandListLi>
//                         <RecommandListLi>
//                             <RecommandLink to="">
//                                 <Image2 />
//                                 <Name>홍남권 작가의 역사소설, 안시성</Name>
//                             </RecommandLink>
//                         </RecommandListLi>
//                         <RecommandListLi>
//                             <RecommandLink to="">
//                                 <Image3 />
//                                 <Name>몽실이 몽실이 몽실언니</Name>
//                             </RecommandLink>
//                         </RecommandListLi>
//                     </RecommandList>
//                 </RecommandCard>
//             </div>
//         </div>
//     )
// }

// export default RecommendPage