import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import { Input } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

import SingleReview from './SingleReview';

const { TextArea } = Input;

function Review(props) {

    const booktrailerId = props.booktrailerId;
    const [reviewValue, setReviewValue] = useState("");

    const handleClick = (event) => {
        setReviewValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!Cookies.get('user')) {
            alert("로그인을 해주세요");
        } else {
            const variables = {
                review: reviewValue,
                booktrailerId: booktrailerId
            }

            //댓글 저장
            axios.post('/api/review/saveReview', variables)
                .then(response => {
                    if (response.data.success) {
                        // console.log(response.data)
                        setReviewValue("");
                        props.refreshFunction(response.data.result)
                    } else {
                        document.location.href = '/booktrailer/' + booktrailerId;
                    }
                })
        }

    }

    return (
        <div>
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '1px' }}
                    onChange={handleClick}
                    value={reviewValue}
                    placeholder="댓글을 작성해주세요"
                />
                <br />
                <Button style={{
                    width: '20%',
                    heigth: '52px',
                    background: 'white',
                    border: '1px solid black',
                    color: 'black'
                }}
                    onClick={onSubmit}>등록</Button>
                {/* Comment List */}
                <br />
            </form>
            <br />

            {props.reviewList && props.reviewList.map((review, index) => (
                <SingleReview key={review.id} reivews={review} users={review.userId} date={review.createdAt} />
            ))}
        </div>
    )
}

export default Review
