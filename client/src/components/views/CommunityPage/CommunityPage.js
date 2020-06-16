import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Post.css";
import { withRouter } from 'react-router';

import styled from 'styled-components';
import { Dropdown, Button } from 'react-bootstrap';
import { EditOutlined, HeartTwoTone, BarsOutlined, ConsoleSqlOutlined } from '@ant-design/icons';

import CommunityHashtag from './Sections/CommunityHashtag';

const TimeLineSection = styled.section`   
    margin: 30px auto;
`;

const NickName = styled.p`   
    margin: 0 15px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 20px;
`;

function CommunityPage(props) {

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
      let url = '/booktrailer/' + event.target.id;
      props.history.push(url);
    }

    const likeColor = async function(e) {
      console.log("?");
      console.log(e);
      let button = e.target.closest('.likeButton');
      console.log(button);
      await axios.post('/api/post/updateLike',{postId:button.id}).then(result =>{
        let heart = button.querySelector('.HeartButton');

        if(result.data.isLike){
          button.style.color = '#ff3232';
          heart.querySelectorAll('path')[1].setAttribute( 'fill', '#ff3232' );
          button.querySelector('.likeCounter').innerHTML = result.data.data.likeCount+1;
        }else{
          button.style.color = '#6C757D';
          heart.querySelectorAll('path')[1].setAttribute('fill','#6C757D');
          button.querySelector('.likeCounter').innerHTML = result.data.data.likeCount-1;
        }

      });

    }

    const likeButtonClick = async function(e) {
      e.preventDefault();
      let button = e.target.closest('.likeButton');
      await axios.post('/api/post/updateLike',{postId:button.id}).then(result =>{
        let heart = button.querySelector('.HeartButton');

        if(result.data.isLike){
          button.style.color = '#ff3232';
          heart.querySelectorAll('path')[1].setAttribute( 'fill', '#ff3232' );
          button.querySelector('.likeCounter').innerHTML = result.data.data.likeCount+1;
        }else{
          button.style.color = '#6C757D';
          heart.querySelectorAll('path')[1].setAttribute('fill','#6C757D');
          button.querySelector('.likeCounter').innerHTML = result.data.data.likeCount-1;
        }

      });

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

    function setColors(){
      
    }

    async function fetchData() {
      await axios.get('/api/booktrailer/followVideo').then(async res => {
        await setIsLoading(false);
        await setCards(res.data.data.map(
          (data, index) => {
            console.log(data);
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
                    className="likeButton"
                    id = {data.postId}
                    onClick={likeButtonClick}
                    onLoad={likeColor.bind(this)}
                    style={{
                      color: 'black',
                      backgroundColor: "white",
                      border: 'none',
                    }}
                    variant="secondary">
                    <HeartTwoTone
                      id = {data.postId}
                      className="HeartButton"
                      style={{
                        backgroundColor: 'white',
                        float: 'left',
                        fontSize: '25px',
                      }} />
                    <div className = "likeCounter" style={{ float: 'left', marginLeft: '5px', heigth: 'center', lineHeight: 'center' }}>
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
                    <CommunityHashtag key={index} hashtags={hashtag} />
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

    setColors();

  }, []);

  const readMoreComment = (e) => {
    e.preventDefault();
    const postId = e.target.id;
    props.history.push('/timeline/comments/' + postId);
  }


  return (
    <TimeLineSection className="container">
      <NickName>BOOK SEEKER</NickName>
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

export default withRouter(CommunityPage)