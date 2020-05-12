import React, { Component } from "react";
import "./Post.css";




class CommunityPage extends Component {
     
    render() {
        return <article className="Post" ref="Post">
            <header>
              <div className="Post-user">
                <div className="Post-user-profile">
                  <img src="/Images/pengsu.jpg" alt="user_image" />
                </div>
                <div className="Post-user-nickname">
                  <span>pengsu</span>
                </div>
              </div>
            </header>
            <div className="Post-image">
              <div className="Post-image-bg">
                <img alt="Icon Living" src="" />
              </div>
            </div>
            <div className="Post-caption">
              <strong>Chris</strong> Moving the community!
            </div>
          </article>;
        }
    }
    export default CommunityPage;