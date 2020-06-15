import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { BsTextareaT } from 'react-icons/bs';

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

function QuizPage(props) {

    // useEffect(() => {
    //     if (props.history.location) {
    //         const trailerId = props.history.location.state.data.trailerId;
    //         console.log(trailerId)

    //         const booktraileVariable = {
    //             booktrailerId: trailerId
    //         }

    //         axios.post('/api/booktrailer/getVideo', booktraileVariable)
    //             .then(response => {
    //                 if (response.data.success) {
    //                     // console.log(response.data.booktrailerInfo);
    //                     const { booktrailerInfo } = response.data;
    //                     setBooktrailerTitle(booktrailerInfo.title);
    //                     setBooktrailerDesc(booktrailerInfo.content);
    //                 } else {
    //                     alert('Failed to get booktrailer Info')
    //                 }
    //             })
    //     }
    // }, [])
    const [tags, setTags] = useState([]);
    const [booktrailerQuiz, setBooktrailerQuiz] = useState("");
    const [booktrailerAnswer, setBooktrailerAnswer] = useState("");
    const [sendButtonShow, setSendButtonShow] = useState('none');
    const [inputable, setInputalbe] = useState(false);

    // const componentDidMount = () => {

    //     let body = {
            
    //         quiz: booktrailerQuiz,
    //         desc: booktrailerAnswer
    //     }

    //     return body
    // }

    const [form] = Form.useForm();

    const onFinish = values => {
        // const values = await form.validateFields();
        // console.log('Success:', values);
        let quiz = values.booktrailer_quiz;
        let answer = values.booktrailer_answer;

        console.log(quiz)
        console.log(answer)

        setBooktrailerQuiz(quiz);
        setBooktrailerAnswer(answer);

        // alert(`북트레일러 제목 : ${title}`);
        setSendButtonShow('');
        // setCheckButtonShow('none');
        setInputalbe(true);
    };

    const onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

    const reset = (e) => {
        e.preventDefault();
        // let data = componentDidMount();
        console.log("취소버튼 눌렁씀")
        // props.history.push('/mypage/booktrailer/upload2', data);
        // setSendButtonShow('none');
        // setCheckButtonShow('');
        setInputalbe(false);
        // form.resetFields();
    }

    const realSend = (e) => {
        e.preventDefault();
        // let data = componentDidMount();
        console.log("등록버튼눌러씀")
        // console.log(data);
            // props.history.push('/mypage/booktrailer/upload3', data);
            //console.log(data);
    
    };

   
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
                    name="booktrailer_quiz"
                    label="문제"
                    rules={[
                        {
                            required: true,
                            message: '북트레일러에 관한 문제를 입력해주세요',
                        },
                    ]}
                >
                    <TextArea 
                        placeholder="문제는 필수 입력입니다."
                        disabled={inputable} 
                        autoSize={{ minRows: 5, maxRows: 15 }}
                        value={booktrailerQuiz} />
                </Form.Item>
                <hr />
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
                        // display: `${checkButtonShow}`
                    }}
                        type="primary"
                        htmlType="submit"
                    >확인</Button>
                    <Button style={{
                        marginRight: "5px",
                        border: "0.5px solid #717171",
                        backgroundColor: "white",
                        color: "black",
                        display: `${sendButtonShow}`
                    }}
                        onClick={reset}
                    >취소</Button>
                    <Button style={{
                        border: "0.5px solid #717171",
                        backgroundColor: "black",
                        color: "white",
                        display: `${sendButtonShow}`
                    }}
                        type="submit"
                        onClick={realSend}
                    >등록</Button>
                </Form.Item>
            </Form>
        </Box >
    )
}

export default withRouter(QuizPage)