import React, { Component } from "react";
import "./Post.css";

class CommunityPage extends Component {

    render() {
        return (
            <article className="Post" ref="Post">
                <header>
                    <div className="Post-user">
                        <div className="Post-user-profile">
                            <img src="/Images/pengsu.jpg" alt="user_image" />
                        </div>
                        <div className="Post-user-name">
                            <span>pengsu</span>
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
                        <p align="middle">
                            <iframe
                                title="first"
                                width="90%" height="100%" src="https://www.youtube.com/embed/HmBJDuPbFa4"
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
                            좋아요수
              </div>
                        <div className="share-button">
                            <button>
                                공유
                </button>
                        </div>
                    </div>
                    <div className="hashtags">
                        #해쉬태그 #감성 #고양이...
              </div>
                    <div className="comments">
                        댓글보기
                </div>
                </div>
            </article>

        )
    }


}
export default CommunityPage;
