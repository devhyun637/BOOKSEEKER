import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';

import { Button } from 'react-bootstrap';
import { Input } from 'antd';
import styled from 'styled-components';

import CommentHashtag from './CommentHashtag';
import SingleComments from './SingleComments';

const TimeLineCommnetPage = styled.div`   
    margin: 10px;
    // border: 1px solid black;
`;

const TimeLineUser = styled.p`   
    font-size: 16px;
    font-weight: bold;
    margin-bottom : 5px;
`;

const TimeLineDesc = styled.div`   
    font-size: 14px;
    margin-top: 0;
`;


const { TextArea } = Input;

function Comments(props) {

    const userId = Cookies.get('id');
    // console.log(props.hashtags);

    const variables = {
        userId: userId,
        postId: props.postId
    }

    // const booktrailerId = props.booktrailerId;
    const [reviewValue, setReviewValue] = useState("");
    const [userName, setUserName] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(props.contents);

        axios.post('/api/users/getUserName', variables)
            .then(response => {
                if (response.data.success) {
                    setUserName(response.data.userInfo.name);
                } else {
                    alert('사용자 가져오기 실패')
                }
            })


    }, [])

    const handleClick = (event) => {
        setReviewValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        // event.preventDefault();
        // if (!Cookies.get('user')) {
        //     alert("로그인을 해주세요");
        // } else {
        //     const variables = {
        //         review: reviewValue,
        //         booktrailerId: booktrailerId
        //     }

        //     //댓글 저장
        //     axios.post('/api/review/saveReview', variables)
        //         .then(response => {
        //             if (response.data.success) {
        //                 // console.log(response.data)
        //                 setReviewValue("");
        //                 props.refreshFunction(response.data.result)
        //             } else {
        //                 document.location.href = '/booktrailer/' + booktrailerId;
        //             }
        //         })
        // }
    }

    return (
        <div>
            <TimeLineCommnetPage>
                <TimeLineUser>{userName}</TimeLineUser>
                <div>
                    {props.hashtags.map((hashtag, index) => (
                        <CommentHashtag key={index} hashtags={hashtag} />
                    ))}
                </div>
                <TimeLineDesc>{props.contents}</TimeLineDesc>
            </TimeLineCommnetPage>
            <hr />
            <div style={{ width: '90%', margin: '0 auto', alignItems: 'center', justifyContent: 'center' }}>
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '80%', display: 'flex', borderRadius: '1px' }}
                        onChange={handleClick}
                        value={reviewValue}
                        placeholder="댓글을 작성해주세요"
                    />
                    <br />
                    <Button style={{
                        width: '20%',
                        heigth: '20px',
                        margin: '0 auto',
                        padding: '0',
                        background: 'white',
                        border: '1px solid black',
                        color: 'black',
                        fontSize: '14px'
                    }}
                        onClick={onSubmit}>등록</Button>
                    <br />
                    {/* Comment List */}
                    {/* {props.commentList && props.commentList.map((comment, index) => (
                <SingleReview key={comment.id}
                    comments={comment}
                    users={comment.userId}
                    date={review.createdAt} 
                    />
            ))} */}
                </form>
            </div>
        </div>
    )
}

export default withRouter(Comments)
