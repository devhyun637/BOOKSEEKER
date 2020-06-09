import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Typography, List} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { text } from 'body-parser';

const { Title } = Typography;
const { Meta } = Card;


function UploadBooktrailersPage(props) {

    const [videos, setVideos] = useState([])   

    useEffect(() => {
        //search 페이지에서 보낸 video를 받는다.
        //그리고 setVideos한다.
        //각각의 속성 map은 renderCards에서 해본다.

        const info = props.history.location.state
        console.log("given data",info)

        setVideos(info)
    
    }, [])

    const getThumbnail = async function(thumbnail){
        await axios.post('/api/users/getThumbnail',{thumbnail:thumbnail}).then(result => {
            console.log(result);
            return result.data.thumbnail;
        });
    }

    const moveDetail = function(event){
        let url = '/booktrailer/'+event.target.id;
        props.history.push(url);
    }

    const renderCards = videos.map((video, index) => {
        let url = "https://bookseeker-data-storage.s3.ap-northeast-2.amazonaws.com/image/"+video.thumbnail;

        return (
        <div>
             <ul>
                <li key={index} id={video.id} style={{listStyle: 'none'}} onClick={moveDetail}> 
                    <div style={{display: 'inline', marginLeft: '-40px' }}>
                                <img src={url} width="128px" height="72px" /></div>
                    <div
                        style={{
                            display: 'inline', 
                            border:'1px', 
                            marginLeft: '20px',
                            fontSize: '20px',
                            fontWeight: 'bold'
                        }}>{video.title}</div>
                </li>
            </ul>
        </div>
        )
    })

   
    

    return (
        <div>
            
            <Title>등록한 북트레일러들...</Title>
            <hr/>
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 6,
                }}
               
                dataSource={renderCards}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </div>
    )

}

export default withRouter(UploadBooktrailersPage);