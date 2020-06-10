import React, { useState } from 'react';
import { withRouter } from 'react-router';

import { Button } from 'react-bootstrap';
import { Input } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

import SingleComments from './SingleComments';

const { TextArea } = Input;

function Comments(props) {

    // const booktrailerId = props.booktrailerId;
    const [reviewValue, setReviewValue] = useState("");

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
            <div>
                게시글 본문 영역
            </div>
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
