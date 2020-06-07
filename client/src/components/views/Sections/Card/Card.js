import React, { Component } from "react";
import PropTypes from "prop-types";
import "../Card/Card.css";
import LikeButton from '../LikeButton'



function Card({ URL, userName, likeCount, comments, hashtags}) { 
        return (
        <article className="Post" ref="Post">
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
              <img
                width="90%" height="100%" src={URL} 
                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </img>
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
                 {hashtags}
               </div>
               <div className="comments">
                 댓글보기{comments.map((comment, index) => (
                   <li key={index} className="hashtags_hashtag">{comment}</li>
                 ))}
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
          hashtags: PropTypes.arrayOf(PropTypes.string).isRequired,
          comments: PropTypes.arrayOf(PropTypes.string).isRequired
        }

        
    
    export default Card;