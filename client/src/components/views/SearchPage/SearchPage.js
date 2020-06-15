import { InputGroup, FormControl, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tag } from 'antd';
import { withRouter } from 'react-router-dom';


function SearchPage(props) {
    const [Search, setSearch] = useState("");
    const [hashtags, setHashTags] = useState([]);

    useEffect(()=> {
        axios.get('/api/hashtags/hashtags').then(result =>{
            let element = [];
            if(result.data.success){
                for(let i=0;i<result.data.hashtags[0].length;i++){
                    let id = result.data.hashtags[0][i].id
                    let categoryName = result.data.hashtags[0][i].hashtagName;
                    element.push(
                        <Tag color="#0492c2" key={id}>
                        <a href="/register3">
                            {categoryName}
                        </a>
                        </Tag>
                    );
                }
                setHashTags(element);
            }
        });

    },[])

    const onSearchHandler = (event) => {
        setSearch(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        axios.get('/api/booktrailer/search/' + Search)
            .then(res => {
               // console.log("res: ", res)
                if (res.data.isSearchSuccess) {
                    //console.log("음오아예")
                     props.history.push('/search/results', res.data.data);
                    // props.history.push({
                    //     pathname: '/results',
                    //     state: {
                    //         data: res.data.data
                    //     }
                    // })
                } else {
                    alert(res.data.message);
                }
            })
    }

    return (
        <div style={{
            position: 'relative',
            textAlign: 'center',
            margin: '20px',
        }}>
            <br />
            <form onSubmit={onSubmitHandler}>
                <InputGroup className="mb-3">
                    <FormControl
                        style={{
                            padding: "22px",
                            border: "0.5px solid #0f4c81",
                            color: "#0f4c81",
                            fontSize: '14px'
                        }}
                        placeholder="검색어를 입력하세요"
                        aria-label="검색어를 입력하세요"
                        aria-describedby="basic-addon2"
                        value={Search}
                        onChange={onSearchHandler}
                    />
                    <InputGroup.Append>
                        <Button style={{
                            border: "0.5px solid #0f4c81",
                            background: "#0f4c81",
                            color: "white",
                            fontSize: '14px'
                        }}
                            type="submit"
                            variant="outline-secondary">
                            검색
                    </Button>
                    </InputGroup.Append>
                </InputGroup>
            </form>
            <br />
            <br />
            {/* 해시태그 영역 */}
            <div>
                {hashtags}
            </div>
        </div>
    )
}

export default withRouter(SearchPage)