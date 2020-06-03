import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Card.css";
import LikeButton from '../Sections/LikeButton'



function Card({profile_image, userName, url, likecount, hashtags, comments}) {
     
    
        return (
        <article className="Post" ref="">
            <header>
              <div className="Post-user">
                <div className="Post-user-profile">
                  <img src={profile_image} alt="user_image" />
                </div>
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
                width="90%" height="100%" src={url} 
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
                  <p>{likecount}명이좋아합니다.</p>
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
                댓글보기{comments}
                </div>
            </div>
          </article>
          
          )
        }

        Card.propTypes = {
          id: PropTypes.number.isRequired,
          profile_image: PropTypes.string.isRequired,
          userName: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
          likecount: PropTypes.number.isRequired,
          hashtags: PropTypes.arrayOf(PropTypes.string).isRequired,
          comments: PropTypes.string.isRequired

        }

        
    
    export default Card;