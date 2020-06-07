import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Typography} from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function SearchedPage(props) {

    const [videos, setVideos] = useState([])   

    useEffect(() => {
        //search 페이지에서 보낸 video를 받는다.
        //그리고 setVideos한다.
        //각각의 속성 map은 renderCards에서 해본다.

        let data = props.history.location.state
        console.log(data)

    }, [])

   
    

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <ul>
                
            </ul>
            <Title>북트레일러 검색 결과...</Title>
            <hr/>
        </div>
    )
}

export default SearchedPage;