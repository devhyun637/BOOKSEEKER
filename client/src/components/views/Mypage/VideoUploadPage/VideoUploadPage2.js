import React, { useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Form, Input } from 'antd';

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

    const [booktrailerTitle, setBooktrailerTitle] = useState("");
    const [booktrailerDesc, setBooktrailerDesc] = useState("");
    const [checkButtonShow, setCheckButtonShow] = useState('');
    const [sendButtonShow, setSendButtonShow] = useState('none');

    const componentDidMount = () => {
        const booktrailer = props.history.location.state

        let body = {
            url: booktrailer.url,
            thumbnail: booktrailer.thumbnail,
            hashtag: booktrailer.hashtag,
            title: booktrailerTitle,
            desc: booktrailerDesc
        }

        return body
    }

    const [form] = Form.useForm();

    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            // console.log('Success:', values);
            let title = values.booktrailer_title;
            let desc = values.booktrailer_description;

            setBooktrailerTitle(title);
            setBooktrailerDesc(desc);

            alert(`북트레일러 제목 : ${title}`);
            setSendButtonShow('');
            setCheckButtonShow('none');

        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const realSend = (e) => {
        e.preventDefault();
        let data = componentDidMount();
        // console.log(data);
        props.history.push('/mypage/booktrailer/upload3', data);
        console.log(data);
    };

    return (
        <Box>
            <Title>
                STEP2 <br />
                북트레일러 <br />
                영상 정보 등록2
            </Title>
            <Hr />

            <Form form={form} name="dynamic_rule">

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
                    <Input placeholder="제목은 필수 입력입니다." />
                </Form.Item>

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
                        autoSize={{ minRows: 5, maxRows: 10 }}
                    />
                </Form.Item>

                <br />
                <br />

                <Form.Item>
                    <Button style={{
                        margin: "0 auto",
                        border: "0.5px solid #717171",
                        backgroundColor: "white",
                        color: "black",
                        display: `${checkButtonShow}`
                    }}
                        onClick={onCheck}
                    >확인</Button>
                    <Button style={{
                        margin: "0 auto",
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
