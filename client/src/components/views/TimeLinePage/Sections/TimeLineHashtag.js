import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

function TimeLineHashtag(props) {

    const [hashtag, setHashtags] = useState("")

    useEffect(() => {
<<<<<<< HEAD
        // console.log(props.hashtags)
        setHashtags(props.hashtags.slice(1,-1));
=======
        setHashtags(props.hashtags.hashtag);
>>>>>>> 54fca8e5c6ec68a3a9b6e62ad089c24f93dfe3b4
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

<<<<<<< HEAD
export default withRouter(TimeLineHashtag)
=======
export default withRouter(TimeLineHashtag)
>>>>>>> 54fca8e5c6ec68a3a9b6e62ad089c24f93dfe3b4
