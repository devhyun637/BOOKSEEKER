import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Post.css";
import { withRouter } from 'react-router';

import styled from 'styled-components';
import { Dropdown, Button } from 'react-bootstrap';
import { EditOutlined, HeartTwoTone, BarsOutlined, ConsoleSqlOutlined } from '@ant-design/icons';

import TimeLineHashtag from './Sections/TimeLineHashtag';

const TimeLineSection = styled.section`   
    margin: 30px auto;
`;

const NickName = styled.p`   
    margin: 0 15px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 20px;
`;


function TimeLinePage(props) {

  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState("");
  const [userName, setUserName] = useState("");
  const [likeCount, setLikeCount] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [postId, setPostId] = useState(null);
  // const [content, setContent] = useState("");
  const [hashtags, setHashTags] = useState([]);
  const [createTime, setCreatedTime] = useState(null);

  const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta quam et lectus dignissim, id dignissim elit laoreet. Aliquam id orci mauris. Morbi neque lacus, aliquet vel dolor condimentum, consequat accumsan tellus. Proin venenatis feugiat quam tempor tincidunt. Aliquam sit amet fringilla leo. Maecenas laoreet ipsum nisi, vitae faucibus magna fermentum et. Cras eu nunc at velit ultricies molestie in sit amet nunc. Vivamus sollicitudin iaculis magna. Integer vitae pulvinar ligula. Donec rutrum ultrices metus id feugiat. Morbi rutrum, ex vitae sollicitudin posuere, ex massa efficitur quam, suscipit aliquam lacus mauris non dolor. Proin efficitur arcu id dolor auctor, at luctus enim imperdiet. Praesent facilisis turpis felis, in porta libero mattis mattis. Pellentesque vel lobortis lacus, sit amet congue nibh. Phasellus posuere nulla ac mi placerat commodo.";

  const readMoreComment = (e) => {
    e.preventDefault();

    const variables = {
      postId: postId,
      content: content,
      hashtags: hashtags,
      userName: userName,
      createTime: createTime
    }

    props.history.push('/timeline/comments/5', variables);
  }
  

  useEffect(() => {

    const moveDetail = function(event){
      let url = '/booktrailer/'+event.target.id;
      props.history.push(url);
    }

    const deleting = function(event){
      axios.post("/api/users/deletePost", {})
    }

    const resultContent = (content) => {
      if (content.length > 40) {
        let contents = content.slice(0, 35);
        return (
          <div className="postDesc">
            <span className="">{contents}...</span>
            <button onClick={readMoreComment} className="readmore"> 더보기 </button>
          </div>)
      } else {
        return (<div className="postDesc">
          <span className="content" style={{ marginBottom: '10px' }}>{content}</span>
        </div>)
      }
    }

    function fetchData() {
      axios.get('/api/booktrailer/video').then(res => {
        setIsLoading(false);
        setUserName(res.data.data.userName);
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
                      <Dropdown.Item href="#" id={data.id} onClick={moveDetail}>상세보기</Dropdown.Item>
                      <Dropdown.Item href="#">수정하기</Dropdown.Item>
                      <Dropdown.Item href="#" id={data.id} onClick={deleting}>삭제하기</Dropdown.Item>
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
                    // twoToneColor
                    style={{
                      float: 'left',
                      fontSize: '25px',
                    }} />
                  <div style={{ float: 'left', marginLeft: '5px', heigth: 'center', lineHeight: 'center' }}>
                    {data.likeCount}
                  </div>
                </Button>
              </div>
              <div className="post_time">
                  {data.created_at}
              </div>

              {/* 해시태그*/}
              <div className="hashtags">
                {data.hashtags[0].map((hashtag, index) => (
                  <TimeLineHashtag key={index} hashtags={hashtag} />
                ))}
              </div>

              {/* 내용 */}
              <form>
                {resultContent(data.content)}
              </form>

              {/* 댓글 */}
              <button className="comment" onClick={readMoreComment}>
                댓글 {data.comments.length}개 보기
              </button>
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

export default withRouter(TimeLinePage)