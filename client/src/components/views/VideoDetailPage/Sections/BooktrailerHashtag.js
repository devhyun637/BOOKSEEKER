import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';

function BooktrailerHashtag(props) {

    const [hashtag, setHashtags] = useState("");

    useEffect(() => {
        setHashtags(props.hashtags.hashtag);
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

export default BooktrailerHashtag