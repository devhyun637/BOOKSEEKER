import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Typography, List} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { text } from 'body-parser';

const { Title } = Typography;
const { Meta } = Card;


function SearchedPage(props) {

    const [videos, setVideos] = useState([])   

    useEffect(() => {
        //search 페이지에서 보낸 video를 받는다.
        //그리고 setVideos한다.
        //각각의 속성 map은 renderCards에서 해본다.

        const info = props.history.location.state
        console.log("given data",info)

        setVideos(info)
    
    }, [])


    const renderCards = videos.map((video, index) => {

        //https://www.youtube.com/watch?v=
        const str = "https://youtu.be/"
        //위의 문자열을 https://www.youtube.com/embed/로 바꾸자

        const url = video.URL.replace('https://youtu.be/', 'https://www.youtube.com/embed/')
        if(video.URL.match(str)!==null){
            const url = video.URL.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
        }
         //console.log(url)
        return (
        <div>
           <li
                    key={index}>
                    <h4>{video.title}</h4>
                    <iframe src={url} width="320px" height="180px"></iframe>
                    </li>
        </div>
        )
    })

   
    

    return (
        <div>
            
            <Title>북트레일러 검색 결과...</Title>
            <hr/>
            <List
<<<<<<< HEAD
                margin = "10px"
=======
                margin_ = "10px"
>>>>>>> e433e1d0cb0b7e5747ae9412305ac0473a6c433e
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 3,
                  }}
               
                dataSource={renderCards}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </div>
    )
}

export default withRouter(SearchedPage);