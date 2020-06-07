import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import styled from 'styled-components';
import { Card, Collapse, Comment } from 'antd';
import { Dropdown, Button } from 'react-bootstrap';
import { EditOutlined, HeartOutlined, BarsOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

// ========= 제안2 ================================
const tabList = [
    {
        key: 'tab1',
        tab: 'tab1',
    },
    {
        key: 'tab2',
        tab: 'tab2',
    },
];

const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
};
// =============================================

const contentListNoTitle = {
    article: <p>article content</p>,
    app: <p>app content</p>,
    project: <p>project content</p>,
};

const BooktrailerDetail = styled.div`   
    margin-top: 15px;
`;

const BooktrailerTitle = styled.p`   
    font-size: 16px;
    font-weight: bold;
    color: black;
`;

const Bold = styled.b`   
    color: black;
`;

function VideoDatailPage(props) {

    const handleMenuClick = (e) => {
        console.log('click', e)
    }

    const booktrailerId = props.match.params.booktrailerId;

    const [key, setKey] = useState('tab1');
    const [noTitleKey, setNoTitleKey] = useState('app');

    // const [booktrailer, setBooktrailer] = useState({});
    const [booktrailerTitle, setBooktrailerTitle] = useState("");
    const [booktrailerDesc, setBooktrailerDesc] = useState("");
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookPublisher, setBookPublisher] = useState("");
    const [bookTrailerUser, setBookTrailerUser] = useState("");
    const [bookTrailerURL, setBookTrailerURL] = useState("");
    const [bookTrailerCategory, setBookTrailerCategory] = useState("");

    const booktraileVariable = {
        booktrailerId: booktrailerId
    }

    useEffect(() => {

        //북트레일러 정보 가져오기
        axios.post('/api/booktrailer/getVideo', booktraileVariable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data);
                    // setBooktrailer(response.data);
                    setBooktrailerTitle(response.data.booktrailerInfo.title);
                    setBooktrailerDesc(response.data.booktrailerInfo.content);
                    setBookTitle(response.data.booktrailerInfo.bookTitle);
                    setBookAuthor(response.data.booktrailerInfo.author);
                    setBookPublisher(response.data.booktrailerInfo.bookPublisher);
                    setBookTrailerUser(response.data.booktrailerUser.name);
                    setBookTrailerURL(response.data.booktrailerInfo.URL);
                    setBookTrailerCategory(response.data.bookTrailerCategory.categoryName);
                } else {
                    alert('Failed to get booktrailer Info')
                }
            })
    }, [booktraileVariable])

    return (
        <BooktrailerDetail>
            <div style={{
                textAlign: 'center',
            }}>
                <iframe
                    title={booktrailerTitle}
                    width="100%" src={bookTrailerURL.replace("youtu.be/", "www.youtube.com/embed/")}
                    frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen style={{ height: '210px', margin: 0, padding: 0 }}>
                </iframe>
            </div>
            <div style={{
                // border: '1px solid red',
                display: 'flex',
                alignItmes: 'center',
                justifyContent: 'space-between',
                margin: '10px 20px'
            }}>
                <Button style={{
                    color : 'black',
                    backgroundColor: 'white',
                    border: 'none'
                }}
                variant="secondary">
                    <HeartOutlined
                        style={{
                            fontSize: '25px',
                        }} /> 11
                    </Button>
                <Button style={{
                    color : 'black',
                    backgroundColor: 'white',
                    border: 'none'
                }}
                variant="secondary">
                    <EditOutlined
                        style={{
                            fontSize: '25px',
                        }} />
                </Button>
                <Dropdown>
                    <Dropdown.Toggle
                        variant="secondary" 
                        id="dropdown-basic"
                        style={{
                            backgroundColor: 'white',
                            color: 'black',
                            border: 'none',
                        }} >
                        <BarsOutlined style={{
                            fontSize: '25px',
                        }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#">공유하기</Dropdown.Item>
                        <Dropdown.Item href="#">수정하기</Dropdown.Item>
                        <Dropdown.Item href="#">삭제하기</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Card title={bookTrailerUser} style={{ width: "100%", }} extra={<Button variant="secondary">팔로우</Button>}>
                <Collapse style={{
                    width: '100%',
                    border: 'none',
                    backgroundColor: '#Dee2e6'
                }} defaultActiveKey={['1']}>
                    <Panel header={booktrailerTitle} key="1">
                        <BooktrailerTitle>{booktrailerTitle}</BooktrailerTitle>
                        <p>{booktrailerDesc}</p>
                        <hr />
                        <p> 제목 <Bold>{bookTitle}</Bold></p>
                        <p> 작가 <Bold>{bookAuthor}</Bold></p>
                        <p> 출판사 <Bold>{bookPublisher}</Bold></p>
                        <p>카테고리 <Bold>{bookTrailerCategory}</Bold></p>
                    </Panel>
                    <Panel header="공유한 글" key="3" disabled>
                        <p>책정보</p>
                    </Panel>
                    <Panel header="댓글" key="4">

                    </Panel>
                </Collapse>
            </Card>

        </BooktrailerDetail >
    )
}

export default withRouter(VideoDatailPage)

//1. 북트레일러 ID를 가져온다. : booktrailerId
//2. 북트레일러 ID에 해당하는 영상을 가져온다. : bookTrailerURL 
//3. 북트레일러 ID에 해당하는 User name을 가져온다. : bookTrailerUser
//4. 북트레일러 ID에 해당하는 User와 현재 로그인한 User가 같으면 구독 버튼이 눌리면 안된다.
//5. 북트레일러 ID에 해당하는 글을 공유한 적이 없다면 공유버튼이 없어야 한다.
//6. 북트레일러 ID에 해당하는 정보를 가져온다. : booktrailerInfo
//7. 북트레일러 ID에 해당하는 것을 공유한 목록을 가져온다.
//8. 북트레일러 ID에 해당하는 댓글을 가져온다.
//9. 북트에릴러 ID에 해당하는 퀴즈 목록을 가져온다.

