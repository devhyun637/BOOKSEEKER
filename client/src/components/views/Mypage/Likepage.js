import React, { useEffect, useState } from 'react'
import { Typography, List } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import "./Page.css";

const { Title } = Typography;

function Likepage(props) {

    const [videos, setVideos] = useState([]);

    const fetchData = async function () {
        await axios.get('/api/users/getLikeTrailers').then(async result => {
           // console.log(result.data.data);
            await setVideos(result.data.data);

        });
       // console.log(videos);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const moveDetail = function (event) {
        let url = '/booktrailer/details/' + event.target.id;
        props.history.push(url);
    }

    const renderCards = videos.map((video, index) => {
        let url = "https://bookseeker-data-storage.s3.ap-northeast-2.amazonaws.com/image/" + video.thumbnail;

        return (
            <div>
                <ul style={{ padding: '0px' }}>
                    <li key={index} id={video.id}
                        style={{
                            listStyle: 'none',
                            padding: '0px',
                            margin: 0,
                        }} onClick={moveDetail}>
                        <div
                            onClick={moveDetail}
                            id={video.id} style={{
                                display: 'inline-block'
                            }}>
                            <img
                                onClick={moveDetail}
                                id={video.id}
                                src={url} width="128px" height="72px" />
                        </div>
                        <div
                            className="ListTitle"
                            id={video.id}>{video.title}</div>
                    </li>
                </ul>
            </div>
        )
    })

    return (
        <div>

            <Title style={{
                margin: '20px',
                fontSize: '20px',
                marginBottom: '40px'
            }}>좋아요한 북트레일러</Title>
            <hr style={{ margin: '10px' }} />
            <List
                itemLayout="vertical"
                size="small"
                // pagination={{
                //     onChange: page => {
                //         console.log(page);
                //     },
                //     pageSize: 9,
                // }}

                dataSource={renderCards}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </div>
    )
}

export default withRouter(Likepage);