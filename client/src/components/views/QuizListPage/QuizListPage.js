import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Typography, List } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { text } from 'body-parser';

const { Title } = Typography;
const { Meta } = Card;


function QuizListPage(props) {

    const [quizes, setquizes] = useState([])
    const [ids, setIds] = useState([])

    useEffect(() => {

        const userId = props.history.location.state.userId
        const booktrailerId = props.history.location.state.booktrailerId

        let data = {
            userId: userId,
            booktrailerId: booktrailerId
        }
        console.log(data)
        setIds(data)
        //console.log("given data",info)

        axios.post('/api/quiz/getQuiz', data)
            .then(res => {
                if (res.data.success) {
                    const question = res.data.result
                    //console.log("성공")
                    //setquizes(res.data.result)
                    console.log(question)
                    setquizes(question)

                } else {
                    alert(res.data.message)
                }
            })

    }, [])

    const moveDetail = (e) => {
        
        let url = '/booktrailer/quizlist/solving/' + e.target.id;

        let quiz = e.target.closest('li').querySelector('.QuizTitle').innerHTML.split('.')[1];

        let data = {
            userId: ids.userId,
            booktrailerId: ids.booktrailerId,
            quiz: quiz,
            quizId: e.target.id
        }

        console.log(data)

        //userId, booktrailerId 보내주는 거 추가하기
        props.history.push(url, data);
    }

    const renderCards = quizes.map((quiz, index) => {

        return (
            <div>
                <ul style={{ padding: '0px' }}>
                    <li key={index} id={quiz.id} className={index}
                        style={{
                            listStyle: 'none',
                            padding: '0px',
                            margin: 0,
                        }} onClick={moveDetail}>
                        {/* <div
                            onClick={moveDetail}
                            id={quiz.id} style={{
                                display: 'inline-block'
                            }}>
                            
                        </div> */}
                        <div
                            className="QuizTitle"
                            id={quiz.id}
                    >Quiz {index + 1}. {quiz.question} </div>
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
            }}>퀴즈 목록</Title>
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

export default withRouter(QuizListPage);