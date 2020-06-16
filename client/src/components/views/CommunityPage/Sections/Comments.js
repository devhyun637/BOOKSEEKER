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

    // const booktrailerId = props.booktrailerId;
    const [commentValue, setCommentValue] = useState("");
    const [userName, setUserName] = useState("");
    const [content, setContent] = useState("");

    const variables = {
        userId: userId,
        postId: props.postId,
        comment: commentValue,
    }

    useEffect(() => {
        setContent(props.contents);
        // console.log(variables);
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
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!Cookies.get('user')) {
            alert("로그인을 해주세요");
        } else {

            //댓글 저장
            // console.log(variables);
            axios.post('/api/comment/saveComment', variables)
                .then(response => {
                    if (response.data.success) {
                        // console.log(response.data)
                        setCommentValue("");
                        props.refreshFunction(response.data.result)
                    } else {
                        document.location.href = '/community/comments/' + variables.postId;
                    }
                })
        }
    }

    return (
        <div>
            <TimeLineCommnetPage>
                <TimeLineUser>{userName}</TimeLineUser>
                <div>
                    <div>
                        {props.hashtags.map((hashtag, index) => (
                            <CommentHashtag key={index} hashtags={hashtag} />
                        ))}
                    </div>
                    <TimeLineDesc>{props.contents}</TimeLineDesc>
                </div>
                {/* {console.log(props.contents)} */}
            </TimeLineCommnetPage>
            <hr />
            <div style={{ width: '90%', margin: '0 auto', alignItems: 'center', justifyContent: 'center', display: 'block' }}>
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '80%', display: 'flex', borderRadius: '1px' }}
                        onChange={handleClick}
                        value={commentValue}
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
                </form>
            </div>
            {/* Comment List */}
            <div style={{ margin: '10px' }}>
                {props.commentList && props.commentList.map((comment, index) => (
                    // console.log(comment)
                    <SingleComments key={comment.id} comments={comment} users={comment.userId} date={comment.createdAt} />
                ))}
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}

export default withRouter(Comments)