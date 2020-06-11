import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

function TimeLineHashtag(props) {

    // const [hashtag, setHashtags] = useState("")

    // useEffect(() => {
    //     setHashtags(props.hashtags.slice(1,-1));
    // }, [])

    console.log(props);

    return (
        // <div style={{
        //     // display: 'inline-block',
        //     width: '100%',
        //     whiteSpace: 'pre-line',
        //     overflow: 'hidden',
        //     textOverflow: 'ellipsis',
        //     wordBreak: 'break-all'
        // }}>
        <a
            style={{
                color: 'blue',
                fontSize: '15px',
                marginRight: '5px',
            }}
            href="">#</a>
        // </div>
    )
}

export default withRouter(TimeLineHashtag)