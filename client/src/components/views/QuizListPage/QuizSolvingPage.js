import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { BsTextareaT } from 'react-icons/bs';
import axios from 'axios';

const { TextArea } = Input;

//스타일 component
const Box = styled.div`
    width: 100%;
    height: auto;
    // border: 1px solid black;
    text-align: center;
    positon: absolute;
`;

const Title = styled.h2`
    margin: 20px;
    text-align: left;
    // border: 1px solid red;
`;

const Hr = styled.hr`
    margin: 30px 0;
    border: 1px solid gray;
`;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

function QuizSolvingPage(props) {

    useEffect(() => {
        if (props.history.location) {
            const userId = props.history.location.state.userId;
            const booktrailerId = props.history.location.state.booktrailerId;

            //console.log("제대로받아라",userId)
            setuserId(userId);
            setbooktrailerId(booktrailerId);
            
        }
    }, [])

    const [tags, setTags] = useState([]);
    const [userId, setuserId] = useState("");
    const [booktrailerId, setbooktrailerId] = useState("")
    const [answer, setanswer] = useState("");
    const [checkButtonShow, setCheckButtonShow] = useState('');
    const [sendButtonShow, setSendButtonShow] = useState('none');
    const [inputable, setInputalbe] = useState(false);

    const [form] = Form.useForm();

    const onFinish = values => {
        // const values = await form.validateFields();
        // console.log('Success:', values);
        
        let answer = values.booktrailer_answer;
        console.log("정답은..........", answer)
        setanswer(answer)
        // console.log(userId)
        // console.log(booktrailerId)
        // console.log(question)
        // console.log(answer)


        // alert(`북트레일러 제목 : ${title}`);
        setSendButtonShow('');
        setCheckButtonShow('none');
        setInputalbe(true);
    };

    const onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

   
    const submitAnswer = (e) => {
        e.preventDefault();
        
        //입력한 정답(answer), booktrailerId, userId를 서버로 보내야함
    }

   
    return (
        <Box>
            <Title>Quiz!</Title>
            <Hr />

            <Form form={form}
                name="dynamic_rule"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>

                
                <Form.Item
                    {...formItemLayout}
                    name="booktrailer_answer"
                    label="정답"
                    rules={[
                        {
                            required: true,
                            message: '정답을 입력해주세요.',
                        },
                    ]}
                >
                    <TextArea
                        placeholder="정답은 필수 입력입니다."
                        disabled={inputable}
                        
                    />
                </Form.Item>

                <Form.Item>
                    <Button style={{
                        border: "0.5px solid #717171",
                        backgroundColor: "white",
                        color: "black",
                        display: `${checkButtonShow}`
                    }}
                        type="primary"
                        htmlType="submit"
                    >확인</Button>
                    {/* <Button style={{
                        marginRight: "5px",
                        border: "0.5px solid #717171",
                        backgroundColor: "white",
                        color: "black",
                        display: `${sendButtonShow}`
                    }}
                        onClick={reset}
                    >취소</Button> */}
                    <Button style={{
                        border: "0.5px solid #717171",
                        backgroundColor: "black",
                        color: "white",
                        display: `${sendButtonShow}`
                    }}
                        type="submit"
                        onClick={submitAnswer}
                    >정답확인</Button>
                </Form.Item>
            </Form>
        </Box >
    )
}

export default withRouter(QuizSolvingPage)