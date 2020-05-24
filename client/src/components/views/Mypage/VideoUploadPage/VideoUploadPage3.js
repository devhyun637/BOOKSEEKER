import React from 'react';
import { withRouter } from 'react-router';
// import NaverBookAPI from '../../Mypage/naverBookAPI/NaverBookAPI';
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

function VideoUploadPage3(props) {

    const [form] = Form.useForm();

    //APISearch에서 받아온 책정보 book state에 저장
    // const handleBook = (filter1, filter2, filter3, filter4) => {
    //     document.querySelector('.titleInput').value = filter1;
    //     document.querySelector('.publisherInput').value = filter2;
    //     document.querySelector('.authorInput').value = filter3;
    //     document.querySelector('.descriptionInput').value = filter4;
    // }

    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    return (
        <Box>
            <Title>
                STEP2 <br />
                북트레일러 <br />
                책 정보 등록
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

                <Form.Item
                    {...formItemLayout}
                    name="introudce"
                    label="책소개"
                    rules={[
                        {
                            required: true,
                            message: '책소개를 필수 입력입니다.',
                        },
                    ]}
                >
                    <TextArea
                        // value={value}
                        // onChange={this.onChange}
                        className="descriptionInput"
                        placeholder="책소개를 입력해주세요"
                        autoSize={{ minRows: 5, maxRows: 10 }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button style={{
                        margin: "0 auto",
                        border: "0.5px solid #717171",
                        backgroundColor: "black",
                        color: "white"
                    }}
                        type="primary"
                        onClick={onCheck}
                    >등록하기</Button>
                </Form.Item>
            </Form>
        </Box >
    )
}

export default withRouter(VideoUploadPage3)
