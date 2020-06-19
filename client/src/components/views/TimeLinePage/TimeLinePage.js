import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import styled from 'styled-components';
import "./Post.css";
import { Dropdown, Button } from 'react-bootstrap';
import { HeartTwoTone, BarsOutlined } from '@ant-design/icons';

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
  const [content, setContent] = useState("");
  const [hashtags, setHashTags] = useState([]);
  const [createTime, setCreatedTime] = useState(null);


  useEffect(() => {

    axios.get('/api/users/search')
      .then(res => {
        if (res.data.isSearchSuccess) {
          setUserName(res.data.name);
        } else {
          alert(res.data.message);
        }
      })

    const moveDetail = function (event) {
      let url = '/booktrailer/details/' + event.target.id;
      props.history.push(url);
    }

    const deleting = async function (e) {
      e.preventDefault();
      let item = e.target.closest('.Post');
      await axios.post("/api/post/deletePost", {postId: e.target.id}).then(result =>{
        if(result.data.success){
          console.log("success");
          item.remove();
        }else{
          console.log(result);
        }
      });
    }

    const resultContent = (content, id) => {
      setContent(content)
      if (content.length > 40) {
        let contents = content.slice(0, 35);
        return (
          <div className="postDesc">
            <span className="">{contents}...</span>
            <button id={id} onClick={readMoreComment} className="readmore"> 더보기 </button>
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
        setCards(res.data.data.map(
          (data, index) => {
            return (
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
                        {/* <Dropdown.Item href="#">수정하기</Dropdown.Item> */}
                        <Dropdown.Item href="#" id={data.postId} onClick={deleting}>삭제하기</Dropdown.Item>
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
                    disabled
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
                  {data.created_at.slice(0, 10)}
                </div>

                {/* 해시태그*/}
                <div className="hashtags">
                  {data.hashtags[0].map((hashtag, index) => (
                    <TimeLineHashtag key={index} hashtags={hashtag} />
                  ))}
                </div>

                {/* 내용 */}
                <form>
                  {resultContent(data.content, data.postId)}
                </form>

                {/* 댓글 */}
                <button className="comment" id={data.postId} onClick={readMoreComment}>
                  댓글 {data.comments.length}개 보기
              </button>
              </article>
            )

          }
        ));
      }).catch(e => {
        console.log(e);
      });
    }

    fetchData();
  }, []);

  const readMoreComment = (e) => {
    e.preventDefault();
    const postId = e.target.id;
    props.history.push('/timeline/comments/' + postId);
  }

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