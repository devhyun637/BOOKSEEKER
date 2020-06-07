import React, { Component } from "react";
import PropTypes from "prop-types";

function Card({userName, URL, likeCount, hashtags, comments}) {
     

        return (
        <article className="Post" ref="">
            <header>
              <div className="Post-user">
                <div className="Post-user-name">
                    <span>{userName}</span>
                </div>
                <div className="Post-detail">
                   <button className="detail-button">
                       상세
                   </button>
                </div>
              </div>
            </header>
            <div className="Post-image">
              <div className="Post-image-bg">
             <p align = "middle">   
              <iframe 
                width="90%" height="100%" src={URL} 
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
              </p>  
              </div>
            </div>
            <div className="Post-caption">
              <div className="Like-about">
               <div className="Like-button">
                  <button>
                    좋아요
                  </button>
               </div>
               <div className="Like-count">
                  <p>{likeCount}명이좋아합니다.</p>
              </div>
              <div className="share-button">
                <button>
                  공유
                </button>
              </div>
              </div>
              <div className="hashtags">
                #해쉬태그 #감성 #고양이...{hashtags.map((hashtag, index) => (
                  <li key={index} className="hashtags_hashtag">{hashtag}</li>
                ))}
              </div>
              <div className="comments">
                댓글보기
                {/* 댓글보기{comments} */}
                </div>
            </div>
          </article>
          
          )
        }

        Card.propTypes = {
          id: PropTypes.number.isRequired,
          userName: PropTypes.string.isRequired,
          URL: PropTypes.string.isRequired,
          likeCount: PropTypes.number.isRequired,
          hashtags: PropTypes.arrayOf(PropTypes.string).isRequired
        }

        
    
    export default Card;