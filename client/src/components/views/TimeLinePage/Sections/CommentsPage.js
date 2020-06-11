import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';

import Comments from './Comments';

function CommentsPage(props) {

    const postId = props.match.params.postId;
    const userId = Cookies.get('id')

    const variables = {
        postId: postId,
        userId: userId
    }

    //댓글
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [comment, setComment] = useState("");
    const [hashtags, setHashtags] = useState([]);

    useEffect(() => {

        //컨텐츠 가져오기
        axios.post('/api/post/getPost', variables)
            .then(response => {
                if (response.data.success) {
                    setContent(response.data.postInfo.content);
                    // console.log(response.data.postInfo.content);
                } else {
                    alert('글 가져오기 실패')
                }
            })

        //댓글 가져오기
        axios.post('/api/comment/getComments', variables)
            .then(response => {
                if (response.data.success) {
                    setComment(response.data);
                } else {
                    alert('댓글 가져오기 실패')
                }
            })

        //해시태그 가져오기
        axios.post('/api/hashtags/getHashtags', variables)
            .then(response => {
                if (response.data.success) {
                    setHashtags(response.data.hashtags);
                    console.log(response.data.hashtags);
                } else {
                    alert('해시태그 가져오기 실패')
                }
            })


        //댓글 모두 가져오기
        // axios.post('/api/post/getComments', booktraileVariable)
        //     .then(response => {
        //         if (response.data.success) {
        //             setAllReviews(response.data.result)
        //         } else {
        //             alert('댓글 가져오기 실패')
        //         }
        //     })
    }, [])

    const refreshFunction = (newComments) => {
        setComments(comments.concat(newComments));
    }

    return (
        <div>
            <Comments refreshFunction={refreshFunction} commentList={comments} contents={content} hashtags={hashtags}/>
        </div>
    )
}

export default withRouter(CommentsPage)
