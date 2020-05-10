import React from 'react';

function searchedPage(props){
        const bookTrailers = props.location.state.map(
            (data, index) => (
                <li key={index}>
                    <h1>{data.title}</h1>
                    <p>{data.author}</p>
                    <p>{data.URL}</p>
                    <p>{data.content}</p>
                    <p>{data.likeCount}</p>
                </li>
            )
        );
    

    return(
        <div style = {{
            display:'flex', justifyContent: 'center', alignItems:'center',
            width: '100%', height: '100vh'
        }}>
            <ul>
                {bookTrailers}
            </ul>
        </div>
    )
}

export default searchedPage;