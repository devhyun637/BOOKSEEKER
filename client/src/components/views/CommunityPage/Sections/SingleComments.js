import React, { useEffect, useState } from 'react';
import { Comment } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router'

import styled from 'styled-components';

//스타일 component
const UserName = styled.p`
    margin: 0;
    padding: 0;
    font-size: 16px;
    color: black;
`;

const UserContent = styled.p`
    margin: 0;
    padding: 0;
    // border: 1px solid black;
    color: #717171;
`;

const DeleteButton = styled.button`
    background-color: white;
    color: blue;
    border: none;
`;

function SingleComments(props) {

    useEffect(() => {

        const userId = {
            userId: props.users
        }

        setReviewId(props.reivews.id);
        serUserId(props.users);

        //User 정보 가져오기
        axios.post('/api/users/getUser', userId)
            .then(result => {
                if (result.data.success) {
                    setUserName(result.data.userInfo.name)
                } else {
                    console.log('User정보 가져오기 실패')
                    alert("error")
                }
            })

    }, [])

    const [userName, setUserName] = useState("");
    const [userId, serUserId] = useState(-1);
    const [reviewId, setReviewId] = useState(-1);

    const deleteReview = () => {
        axios.post('/api/review/deleteReview', { reviewId: reviewId, userId: userId })
            .then(result => {
                if (!result.data.success) {
                    alert("댓글 삭제 실패")
                }
            })
    }

    return (
        <form>
            <Comment
                author={<UserName>{userName}</UserName>}
                // avator={<Avatar alt src />}
                content={<UserContent>{props.reivews.review}</UserContent>}
                datetime={<UserContent>{props.date.slice(0, 10)}</UserContent>}
            />
            <div style={{
                textAlign: 'right'
            }}>
                <DeleteButton onClick={deleteReview}>delete</DeleteButton>
            </div>
            <hr />
        </form>
    )
}

export default withRouter(SingleComments)
