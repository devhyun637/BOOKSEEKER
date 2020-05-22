import React from 'react';
import { withRouter } from 'react-router-dom';

function APISearched(props) {
    const bookTrailers = props.location.state.map(
        (data, index) => (
            <li key={index}>
                <h1>{data.title}</h1>
                <p>{data.author}</p>
                <p>{data.link}</p>
                <p>{data.description}</p>
                <p>{data.price}</p>
            </li>
        )
    );

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <ul>
                {bookTrailers}
            </ul>
        </div>
    )
}

export default withRouter(APISearched);