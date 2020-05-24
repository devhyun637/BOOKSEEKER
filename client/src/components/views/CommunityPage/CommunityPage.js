import React, { Component } from "react";
import Card from "../Sections/Card";
import "./Post.css";

class CommunityPage extends React.Component {

    state = {
        isLoading: true,
        card: []
    };
    // getCards = async () => {
    //     const {
    //       data: {
    //         data:{ card }
    //       }
    //     } = await axios.get(이부분에서 card에 들어갈 데이터 가져오기)
    //     //console.log(movies);
    //     this.setState({ card, isLoadig: false})
    //   }
    
    //   componentDidMount(){
    //     this.getCards();
    //   }
    
    render() {
        const { isLoading, cards } = this.state;
        return (
            <section className="container">
              {isLoading ? (
              <div className="loader">
                <span className="loader__text">Loading...</span>
              </div>)
               : (  
               
               <div className="cards">
                 { cards.map(card =>
                 <Card 
                    key = {card.id}
                    id = {card.id} 
                    image = {card.profile_image}
                    userName = {card.userName} 
                    url = {card.url} 
                    likecount = {card.likecount}
                    hashtags = {card.hashtags}
                />
              )}
               </div>
          )}
               
            </section>);
        }
      }
      
      export default CommunityPage;
      