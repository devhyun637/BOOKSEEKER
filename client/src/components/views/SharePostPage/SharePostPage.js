import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import styled from 'styled-components';
import { Card, Form, Input, Button } from 'antd';
import Hashtags from './Sections/Hashtags';

const { Meta } = Card;
const { TextArea } = Input;

const BooktrailerDetail = styled.div`   
    margin-top: 15px;
`;

const Title = styled.h2`
    margin: 16px;
    text-align: center;
    // border: 1px solid red;
`;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

function SharePostPage(props) {

    useEffect(() => {
        if (props.history.location) {
            const trailerId = props.history.location.state.booktrailerId;

            const booktraileVariable = {
                booktrailerId: trailerId
            }

            axios.post('/api/booktrailer/getVideo', booktraileVariable)
                .then(response => {
                    if (response.data.success) {
                        // console.log(response.data.booktrailerInfo);
                        const { booktrailerInfo } = response.data;
                        setURL(booktrailerInfo.URL);
                        setBooktrailerTitle(booktrailerInfo.bookTitle);
                    } else {
                        alert('Failed to get booktrailer Info')
                    }
                })
        }
    }, [])

    //북트레일러 정보
    const [booktrailerTitle, setBooktrailerTitle] = useState("");
    const [URL, setURL] = useState("");

    //Post 정보
    const [PostConent, setPostConent] = useState("");
    const [PostHashtag, setPostHashtag] = useState([]);

    //버튼 처리
    const [checkButtonShow, setCheckButtonShow] = useState('');
    const [sendButtonShow, setSendButtonShow] = useState('none');
    const [inputable, setInputalbe] = useState(false);

    const [form] = Form.useForm();

    const componentDidMount = () => {

        let postBody = {
            booktrailerId: props.history.location.state.booktrailerId,
            url: URL,
            content: PostConent,
            hashtags: PostHashtag
        }

        return postBody
    }

    const onFinish = values => {
        let content = values.post_description;
        setPostConent(content);
        setSendButtonShow('');
        setCheckButtonShow('none');
        setInputalbe(true);
    };

    const reset = (e) => {
        e.preventDefault();
        let data = componentDidMount();
        props.history.push('/share', data);
        setSendButtonShow('none');
        setCheckButtonShow('');
        setInputalbe(false);
    }

    const realSend = (e) => {
        e.preventDefault();
        let data = componentDidMount();
        console.log(data);

        //Post 공유한거 등록하기 ()
    };

    const PostHashtags = (newHashtag) => {
        setPostHashtag(newHashtag);
    }

    return (
        <div>
            <BooktrailerDetail>
                <Title>
                    북트레일러 공유하기
            </Title>
                <Card hoverable
                    style={{ width: '100%' }}>
                    <iframe
                        display='block'
                        title={booktrailerTitle}
                        width="100%" src={URL.replace("youtu.be/", "www.youtube.com/embed/").replace("watch?v=", "embed/")}
                        frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen style={{ height: '210px', margin: 0, padding: 0 }}>
                    </iframe>
                    <Meta title={booktrailerTitle} />
                </Card>
            </BooktrailerDetail >

            <br />
            <p style={{
                        fontSize: '14px'
                    }}>해시태그 입력</p>
            <Hashtags PostHashtags={PostHashtags}/>
            <br />
            <br />

            <Form form={form}
                name="dynamic_rule"
                onFinish={onFinish}>

                <Form.Item
                    {...formItemLayout}
                    name="post_description"
                    label="공유할 글"
                    rules={[
                        {
                            required: true,
                            message: '내용작성은 필수입니다.',
                        },
                    ]}
                >
                    <TextArea
                        placeholder="내용작성은 필수입니다."
                        disabled={inputable}
                        autoSize={{ minRows: 12, maxRows: 13 }}
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
                    >공유</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withRouter(SharePostPage)
