import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import Cookies from 'js-cookie';

import styled from 'styled-components';
import { Card, Collapse } from 'antd';
import { Dropdown, Button } from 'react-bootstrap';
import { EditOutlined, HeartTwoTone, BarsOutlined } from '@ant-design/icons';

import Reviews from './Sections/Review';
import BooktrailerHashtag from './Sections/BooktrailerHashtag';

const { Panel } = Collapse;

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

    const booktrailerId = props.match.params.booktrailerId;

    // const [booktrailer, setBooktrailer] = useState({});
    const [booktrailerTitle, setBooktrailerTitle] = useState("");
    const [booktrailerDesc, setBooktrailerDesc] = useState("");
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookPublisher, setBookPublisher] = useState("");
    const [bookTrailerUser, setBookTrailerUser] = useState("");
    const [bookTrailerURL, setBookTrailerURL] = useState("");
    const [bookTrailerCategory, setBookTrailerCategory] = useState("");
    const [bookTrailerUserId, setBooktrailerUserId] = useState("");
    const [buttonColor, setButtonColor] = useState("");
    const [likeCount, setLikeCount] = useState("");
    const [isLike, setIsLike] = useState(false);
    const [likeColor, setLikeColor] = useState("");
    const [menuBody, setMenuBody] = useState([]);

    const [count, setCount] = useState(0);

    //모든 댓글 가져오기 
    const [allReviews, setAllReviews] = useState([]);

    //해시태그 가져오기
    const [hashTags, setHashTags] = useState([]);

    const booktraileVariable = {
        booktrailerId: booktrailerId
    }

    const delMovie = async function () {

        await axios.post('/api/booktrailer/delete', { booktrailerId: booktrailerId }).then(result => {
            if (result.data.success) {
                props.history.push('/mypage');
            } else {
                alert("동영상 삭제 실패");
            }
        });
    }

    const getIsFollowing = async function (bookTrailerUserId) {
        let target = document.querySelector('.follow');
        if (bookTrailerUserId == Cookies.get('id')) {
            target.style.backgroundColor = '#6C757D';
            setButtonColor('#6C757D');
        }

        await axios.post('/api/users/isFollowing', { bookTrailerUserId: bookTrailerUserId }).then(res => {
            if (res.data.isFollowing) {
                target.style.backgroundColor = '#6C757D';
                setButtonColor('#6C757D');
                target.innerHTML = "팔로우 취소";
            } else {
                target.style.backgroundColor = '#ff3232';
                setButtonColor('#ff3232');
                target.innerHTML = "팔로우";
            }
        });
    }

    const follow = async function () {
        if (Cookies.get('id') == bookTrailerUserId) {
            alert("본인의 북트레일러 입니다");
        } else {
            let target = document.querySelector('.follow');

            await axios.post('/api/users/follow', { bookTrailerUserId: bookTrailerUserId }).then(res => {
               // console.log(res.data.data);
                if (res.data.data == '1') {
                    target.style.backgroundColor = '#6C757D';
                    setButtonColor('#6C757D');
                   // console.log("follow success");
                    target.innerHTML = "팔로우 취소";
                } else if (res.data.data == '0') {
                    target.style.backgroundColor = '#ff3232';
                    setButtonColor('#ff3232');
                    //console.log("follow delete success");
                    target.innerHTML = "팔로우";
                } else {
                    alert(res.data.message);
                }
            });
        }
    }

    const getButtonColor = async function () {
        await axios.post('/api/users/followex', { bookTrailerUserId: bookTrailerUserId }).then(res => {
            setButtonColor(res.data.color);
        });
    }

    const getLikeCount = async function (booktrailerId) {
        await axios.post('/api/booktrailer/getLike', { booktrailerId: booktrailerId }).then(res => {
            setLikeCount(res.data.count);
        });
    }

    const getIsLike = async function (booktrailerId) {
        if (bookTrailerUserId == Cookies.get('id')) {
            setIsLike(true);
            setLikeColor("#ff3232");
        } else {
            await axios.post('/api/booktrailer/getIsLike', { booktrailerId: booktrailerId }).then(res => {
                setIsLike(res.data.isLike);
                if (res.data.isLike) {
                    setLikeColor("#ff3232");
                } else {
                    setLikeColor("gray");
                }
            });
        }
    }

    const moveQuiz = (e) => {
        e.preventDefault();
        let data = {
            userId: Cookies.get('id'),
            booktrailerId: booktrailerId
        }
        console.log(data)
        props.history.push('/mypage/booktrailer/quiz', data)

    }

    const settingDisplay = function (userID) {
        if (userID == Cookies.get('id')) {
            setMenuBody(<Dropdown>
                <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-basic"
                    style={{
                        backgroundColor: 'white',
                        color: 'black',
                        border: 'none'
                    }} >
                    <BarsOutlined style={{
                        fontSize: '25px',
                    }} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={
                        (e) => {
                            e.preventDefault()
                            props.history.push({
                                pathname: '/share',
                                state: {
                                    booktrailerId
                                }
                            })
                        }}>공유하기</Dropdown.Item>
                    <Dropdown.Item className="changeState" href="#" onClick={moveQuiz}>퀴즈만들기</Dropdown.Item>
                    {/* <Dropdown.Item
                        className="changeState"
                        onClick={
                            (e) => {
                                e.preventDefault()
                                props.history.push({
                                    pathname: '/mypage/booktrailer/upload',
                                    state: {
                                        booktrailerId,
                                        //props.history.location.state.booktrailerId
                                    }
                                })
                            }}
                    >수정하기</Dropdown.Item> */}
                    <Dropdown.Item className="changeState" href="#" onClick={delMovie}>삭제하기</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>);
        } else {
            setMenuBody(<Dropdown>
                <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-basic"
                    style={{
                        backgroundColor: 'white',
                        color: 'black',
                        border: 'none'
                    }} >
                    <BarsOutlined style={{
                        fontSize: '25px',
                    }} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={
                        (e) => {
                            e.preventDefault()
                            props.history.push({
                                pathname: '/share',
                                state: {
                                    booktrailerId
                                }
                            })
                        }}>공유하기</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>);
        }
    }

    const likeButtonClick = async function () {
        if (Cookies.get('id') == null) {
            alert("로그인 해주세요");
        } else if (Cookies.get('id') == bookTrailerUserId) {
            alert("본인의 북트레일러 입니다");
        } else {
            if (isLike) {
                setLikeCount(Number(likeCount) - 1);
                setIsLike(false);
                setLikeColor("gray");
                await axios.post("/api/users/changeLike", { booktrailerId: booktrailerId, isLike: "true" })
                    .then(result => {
                        if (result.data.success == 'false') {
                            alert("잘못된 접근입니다.")
                        }
                    });
            } else {
                setLikeCount(Number(likeCount) + 1);
                setIsLike(true);
                setLikeColor("#ff3232");
                await axios.post("/api/users/changeLike", { booktrailerId: booktrailerId, isLike: "false" })
                    .then(result => {
                        if (result.data.success == 'false') {
                            alert("잘못된 접근입니다.")
                        }
                    });
            }
        }
    }

    useEffect(() => {
        //북트레일러 정보 가져오기
        axios.post('/api/booktrailer/getVideo', booktraileVariable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data);
                    // setBooktrailer(response.data);
                    setHashTags(response.data.hashtags[0]);//해쉬태그
                    settingDisplay(response.data.booktrailerUser.id);
                    setBooktrailerUserId(response.data.booktrailerUser.id);
                    setBooktrailerTitle(response.data.booktrailerInfo.title);
                    setBooktrailerDesc(response.data.booktrailerInfo.content);
                    setBookTitle(response.data.booktrailerInfo.bookTitle);
                    setBookAuthor(response.data.booktrailerInfo.author);
                    setBookPublisher(response.data.booktrailerInfo.bookPublisher);
                    setBookTrailerUser(response.data.booktrailerUser.name);
                    setBookTrailerURL(response.data.booktrailerInfo.URL.replace("youtu.be/", "www.youtube.com/embed/").replace("watch?v=", "embed/"));
                    setBookTrailerCategory(response.data.bookTrailerCategory.categoryName);
                    getLikeCount(response.data.booktrailerInfo.id);
                    getIsLike(booktrailerId);
                    getIsFollowing(response.data.booktrailerUser.id);
                    setBookTrailerCategory(response.data.bookTrailerCategory.categoryName);
                    axios.post('/api/booktrailer/countUp', { booktrailerId: booktrailerId });
                    // console.log("check!!!!!!!, ", response.data.booktrailerUser.id)
                } else {
                    alert('Failed to get booktrailer Info')
                }

            })

        //댓글 가져오기
        axios.post('/api/review/getReviews', booktraileVariable)
            .then(response => {
                if (response.data.success) {
                    setAllReviews(response.data.result)
                    // console.log(response.data.result)
                } else {
                    alert('댓글 가져오기 실패')
                }
            })

        //해시태그 가져오기
        // axios.post('/api/hashtags/trailer_hashtag', booktraileVariable)
        //     .then(response => {
        //         if (response.data.success) {

        //         } else {
        //             alert('댓글 가져오기 실패')
        //         }
        //     })


    }, [])

    const refreshFunction = (newReview) => {
        setAllReviews(allReviews.concat(newReview));
    }

    return (
        <BooktrailerDetail>
            <div style={{
                textAlign: 'center',
            }}>
                <iframe
                    display='block'
                    title={booktrailerTitle}
                    width="100%" src={bookTrailerURL}
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
                <Button onClick={likeButtonClick}
                    style={{
                        color: 'black',
                        backgroundColor: "white",
                        border: 'none'
                    }}
                    variant="secondary">
                    <HeartTwoTone
                        twoToneColor={likeColor}
                        style={{
                            fontSize: '25px',
                        }} /> {likeCount}
                </Button>
                <Button style={{
                    color: 'black',
                    backgroundColor: 'white',
                    border: 'none'
                }}
                    variant="secondary">
                    <EditOutlined
                        style={{
                            fontSize: '25px',
                        }} />
                </Button>

                {menuBody}
            </div>
            <Card title={bookTrailerUser} style={{ width: "100%", }} extra={<Button className="follow" variant="secondary" onClick={follow} style={{ border: 'none', backgroundColor: { buttonColor } }}>팔로우</Button>}>
                <Collapse style={{
                    width: '100%',
                    border: 'none',
                    backgroundColor: '#Dee2e6'
                }} defaultActiveKey={['1']}>
                    <Panel header={booktrailerTitle} key="1">
                        <BooktrailerTitle>{booktrailerTitle}</BooktrailerTitle>
                        {hashTags.map((hashtag, index) => (
                            <BooktrailerHashtag key={index} hashtags={hashtag} />
                        ))}
                        <br />
                        <p>{booktrailerDesc}</p>
                        <hr />
                        <p> 제목 <Bold>{bookTitle}</Bold></p>
                        <p> 작가 <Bold>{bookAuthor}</Bold></p>
                        <p> 출판사 <Bold>{bookPublisher}</Bold></p>
                        <p>카테고리 <Bold>{bookTrailerCategory}</Bold></p>
                    </Panel>
                    <Panel header="공유한 글" key="2" disabled>
                        <p>책정보</p>
                    </Panel>
                    <Panel header="댓글" key="3">
                        <Reviews refreshFunction={refreshFunction} reviewList={allReviews} booktrailerId={booktrailerId} />
                    </Panel>
                </Collapse>
            </Card>

        </BooktrailerDetail >
    )
}

export default withRouter(VideoDatailPage);