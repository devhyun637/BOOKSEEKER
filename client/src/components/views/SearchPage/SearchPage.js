import { InputGroup, FormControl, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import { Tag } from 'antd';


function SearchPage(props) {
    const [Search, setSearch] = useState("");
 
    const onSearchHandler = (event) =>{
        setSearch(event.currentTarget.value);
    }

    const onSubmitHandler = (evnet) => {
        evnet.preventDefault();
        console.log(Search);
        axios.get('/api/booktrailer/search/'+Search)
        .then(res => {
            if(res.data.isSearchSuccess){
                props.history.push("/searched",res.data.data);
            }else{
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
                        color : "white",
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
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                     </a>
                </Tag>
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                     </a>
                </Tag>
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                    </a>
                </Tag>
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                    </a>
                </Tag>
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                    </a>
                </Tag>
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                    </a>
                </Tag>
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                     </a>
                </Tag>
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                     </a>
                </Tag>
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                     </a>
                </Tag>
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                     </a>
                </Tag>
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                    </a>
                </Tag>
                <Tag color="#0492c2">
                    <a href="/register3">
                        해시태그1
                     </a>
                </Tag>
            </div>
        </div>
    )
}

export default SearchPage