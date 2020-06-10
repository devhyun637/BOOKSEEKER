import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import Comments from './Comments';

function CommentsPage(props) {

    const data = props.history.location.state;
    console.log(data);

    //댓글
    const [comments, setComments] = useState([])

    useEffect(() => {
        //댓글 모두 가져오기
        // axios.post('/api/post/getComments', booktraileVariable)
        //   .then(response => {
        //     if (response.data.success) {
        //       setAllReviews(response.data.result)
        //     } else {
        //       alert('댓글 가져오기 실패')
        //     }
        //   })
    }, [])

    const refreshFunction = (newComments) => {
        setComments(comments.concat(newComments));
    }

    return (
        <div>
            댓글페이지입니다.
            <Comments refreshFunction={refreshFunction} commentList={comments} />
        </div>
    )
}

export default withRouter(CommentsPage)
