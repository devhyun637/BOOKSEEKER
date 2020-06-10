import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

function CommunityHashtag(props) {

    const [hashtag, setHashtags] = useState("")

    useEffect(() => {
        // console.log(props.hashtags)
        // setHashtags(props.hashtags.slice(1,-1));
    }, [])

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
            href="">#{hashtag}</a>
        // </div>
    )
}

export default withRouter(CommunityHashtag)
