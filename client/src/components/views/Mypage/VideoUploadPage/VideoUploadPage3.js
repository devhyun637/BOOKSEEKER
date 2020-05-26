import React, { useState } from 'react';
import { withRouter } from 'react-router';
// import NaverBookAPI from '../../Mypage/naverBookAPI/NaverBookAPI';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Form, Input } from 'antd';


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

function VideoUploadPage3(props) {

    const [form] = Form.useForm();

    const [bookTitle, setBookTitle] = useState("");
    const [publisher, setPublisher] = useState("");
    const [author, setAuthor] = useState("");

    const [checkButtonShow, setCheckButtonShow] = useState('');
    const [sendButtonShow, setSendButtonShow] = useState('none');

    const componentDidMount = () => {
        const booktrailer = props.history.location.state

        let body = {
            url: booktrailer.url,
            thumbnail: booktrailer.thumbnail,
            hashtag: booktrailer.hashtag,
            title: booktrailer.title,
            desc: booktrailer.desc,
            bookTitle: bookTitle,
            publisher: publisher,
            author: author
        }

        return body
    }

    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            // console.log('Success:', values);

            setBookTitle(values.book);
            setPublisher(values.publisher);
            setAuthor(values.autor);

            alert(`책 제목 : ${values.book}`);
            setSendButtonShow('');
            setCheckButtonShow('none');

        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const realSend = (e) => {
        e.preventDefault();
        let data = componentDidMount();
        console.log(data);
        props.history.push('/mypage', data);
    };

    return (
        <Box>
            <Title>
                STEP3 <br />
                북트레일러 <br />
                도서 정보 등록
            </Title>
            {/* <NaverBookAPI handleBook={(filter1, filter2, filter3, filter4) => handleBook(filter1, filter2, filter3, filter4)} /> */}
            <Hr />

            <Form form={form} name="dynamic_rule">

                <Form.Item
                    {...formItemLayout}
                    name="book"
                    label="책제목"
                    rules={[
                        {
                            required: true,
                            message: '책제목을 입력해주세요',
                        },
                    ]}
                >
                    <Input className="titleInput" placeholder="책 제목은 필수 입력입니다." />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="publisher"
                    label="출판사"
                    rules={[
                        {
                            required: true,
                            message: '출판사를 입력해주세요',
                        },
                    ]}
                >
                    <Input className="publisherInput" placeholder="출판사는 필수 입력입니다." />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="autor"
                    label="작가"
                    rules={[
                        {
                            required: true,
                            message: '작가를 입력해주세요',
                        },
                    ]}
                >
                    <Input className="authorInput" placeholder="작가는 필수 입력입니다." />
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

export default withRouter(VideoUploadPage3)
