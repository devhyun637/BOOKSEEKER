import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';

import Hashtags from '../../SharePostPage/Sections/Hashtags';
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

function VideoUploadPage2(props) {

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
    const [booktrailerTitle, setBooktrailerTitle] = useState("");
    const [booktrailerDesc, setBooktrailerDesc] = useState("");
    const [checkButtonShow, setCheckButtonShow] = useState('');
    const [sendButtonShow, setSendButtonShow] = useState('none');
    const [inputable, setInputalbe] = useState(false);

    const componentDidMount = () => {
        const booktrailer = props.history.location.state

        let body = {
            url: booktrailer.url,
            thumbnail: booktrailer.thumbnail,
            hashtag: tags,
            title: booktrailerTitle,
            desc: booktrailerDesc
        }

        return body
    }

    const [form] = Form.useForm();

    const onFinish = values => {
        // const values = await form.validateFields();
        // console.log('Success:', values);
        let title = values.booktrailer_title;
        let desc = values.booktrailer_description;

        setBooktrailerTitle(title);
        setBooktrailerDesc(desc);

        // alert(`북트레일러 제목 : ${title}`);
        setSendButtonShow('');
        setCheckButtonShow('none');
        setInputalbe(true);
    };

    const onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

    const reset = (e) => {
        e.preventDefault();
        let data = componentDidMount();
        props.history.push('/mypage/booktrailer/upload2', data);
        setSendButtonShow('none');
        setCheckButtonShow('');
        setInputalbe(false);
        // form.resetFields();
    }

    const realSend = (e) => {
        e.preventDefault();
        let data = componentDidMount();
        // console.log(data);
        if (tags.length === 0) {
            alert("해시태그를 입력해주세요");
        } else {
            props.history.push('/mypage/booktrailer/upload3', data);
            console.log(data);
        }
    };

    const PostHashtags = (newHashtag) => {
        setTags(newHashtag);
    }

    return (
        <Box>
            <Title>
                STEP2 <br />
                북트레일러 <br />
                영상 정보 등록2
            </Title>
            <Hr />

            <Form form={form}
                name="dynamic_rule"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>

                <Form.Item
                    {...formItemLayout}
                    name="booktrailer_title"
                    label="북트레일러 제목"
                    rules={[
                        {
                            required: true,
                            message: '북트레일러 제목을 입력해주세요',
                        },
                    ]}
                >
                    <Input placeholder="제목은 필수 입력입니다." disabled={inputable} value={booktrailerTitle} />
                </Form.Item>
                <hr />
                {/* 해시태그 */}
                <br />
                <Hashtags PostHashtags={PostHashtags}/>
                <br />
                <hr />
                <Form.Item
                    {...formItemLayout}
                    name="booktrailer_description"
                    label="북트레일러 소개"
                    rules={[
                        {
                            required: true,
                            message: '북트레일러 소개는 필수 입력입니다.',
                        },
                    ]}
                >
                    <TextArea
                        placeholder="제목은 필수 입력입니다."
                        disabled={inputable}
                        autoSize={{ minRows: 5, maxRows: 15 }}
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
                    >등록</Button>
                </Form.Item>
            </Form>
        </Box >
    )
}

export default withRouter(VideoUploadPage2)