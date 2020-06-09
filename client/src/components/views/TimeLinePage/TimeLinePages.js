import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Post.css";

import styled from 'styled-components';
import { Dropdown, Button } from 'react-bootstrap';
import { EditOutlined, HeartTwoTone, BarsOutlined } from '@ant-design/icons';

const TimeLineSection = styled.section`   
    margin: 30px auto;
`;

const NickName = styled.p`   
    margin: 0 15px;
    margin-bottom: 10px;
    border: 1px solid black;
    font-weight: bold;
    font-size: 20px;
`;

//1. User Id를 담는다.
//2. User Id가 가지고 있는 공유된 북트레일러를 가져온다.
//3. 뿌려준다.
//4. 좋아요 버튼은 없다.
//5. 댓글 작성으로 유도한다.
//6. 상세페이지로 이동할 때, 조회수 증가

function TimeLinePages() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState("");
  const [userName, setUserName] = useState("");
  const [likeCount, setLikeCount] = useState("");

  useEffect(() => {

    function fetchData() {
      axios.get('/api/booktrailer/video').then(res => {
        setIsLoading(false);
        setCards(res.data.data.map(
          (data, index) => (
            <article className="Post" key={index} >
              <header>
                <div className="Post-user">
                  <div className="Post-user-name">
                    <span>{data.userName}</span>
                  </div>
                  <Dropdown>
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
                      <Dropdown.Item href="#">상세보기</Dropdown.Item>
                      <Dropdown.Item href="#">수정하기</Dropdown.Item>
                      <Dropdown.Item href="#">삭제하기</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </header>

              <div className="Post-image">
                <div className="Post-image-bg">
                  <iframe
                    width="90%" src={data.URL.replace("youtu.be/", "www.youtube.com/embed/").replace("watch?v=", "embed/")}
                    frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
              </div>

              {/* 좋아요 버튼 */}
              <div className="Like-button">
                <Button
                  // onClick
                  style={{
                    color: 'black',
                    backgroundColor: "white",
                    border: 'none',

                  }}
                  variant="secondary">
                  <HeartTwoTone
                    twoToneColor
                    style={{
                      float: 'left',
                      fontSize: '25px',
                      // border: '1px solid red'
                    }} />
                  <div style={{ float:'left', marginLeft: '5px', heigth: 'center', lineHeight: 'center'}}>
                    3000
                    </div>
                </Button>
              </div>

              {/* 해시태그 버튼 */}
              <div className="hashtags">
                {data.hashtags.map((hashtag, index) => (
                  <li key={index} className="hashtags_hashtag">{hashtag}</li>
                ))}
              </div>

            </article>
          )

        ));
        console.log(cards);
      }).catch(e => {
        console.log(e);
      });
    }

    fetchData();
  }, []);

  return (
    <TimeLineSection className="container">
      <NickName>{userName}님</NickName>
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">북트레일러 가져오는 중...</span>
        </div>)
        : (
          <div className="cards">
            {cards}
          </div>
        )}

    </TimeLineSection>);

}

export default TimeLinePages
