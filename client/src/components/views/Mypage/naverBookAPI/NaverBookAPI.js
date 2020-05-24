import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';

//스타일 component
const BookLi = styled.li`
    // border: 0.5px solid #717171;
    margin: 10px auto;
    padding-top: 10px;
`

const Checkbox = styled.input`
    margin-right: 10px;
    display: inline;
    width: 20px;
    height: 20px;
    &:checked {
        background: #0DFF92;
`

const Thumbnail = styled.img`
    width: 40%;
    margin-bottom: 10px;
`;

const Name = styled.h3`
    font-size: 20px;
    font-weight: bold;
    margin: 0 10px;
    // border: 1px solid red;
`;

const Contents = styled.p`
    font-size: 16px;
    margin: 3px;
`

const ModalBox = styled.div`
    text-align: center;
`

const Text = styled.p`
    font-size: 20px;
    line-height: 20px;
    margin: 10px;
    font-weight: bold;
`

const Hr = styled.hr`
    padding: 0;
`

const getModalStyle = () => {
    return {
        width: '80%',
        positon: 'absolute',
        left: '10%',
        top: '10%'
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        height: '70%',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #717171',
        boxShadow: theme.shadows[4],
        padding: '2%',
        overflow: 'scroll'
    }
}));


function NaverBookAPI(props) {

    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const [Search, setSearch] = useState("");

    const [publisher, setPublisher] = useState("");
    const [author, setAuthor] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [body, setBody] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSearchHandler = (event) => {
        setSearch(event.currentTarget.value);
    }

    const cancle = () => {
        setOpen(false);
    };

    const handleCheck = (event) => {
        let params = [];
        let parent = event.currentTarget.parentNode;

        let authors = parent.querySelector('.author').innerHTML.split('|');
        for (var i = 0; i < authors.length; i++) {
            params.push(authors[i]);
        }

        setAuthor(params)
        setPublisher(parent.querySelector('.publisher').innerHTML);
        setTitle(parent.querySelector('.name').innerHTML);
        setDescription(parent.querySelector('.description').innerHTML);
    }


    const onSubmitHandler = (evnet) => {
        evnet.preventDefault();

        axios.get('/api/booktrailer/search/APISearch/' + Search)
            .then(res => {
                if (res.data.isSearchSuccess) {
                    const element = []
                    for (let i = 0; i < res.data.data.length; i++) {
                        let data = res.data.data[i];
                        element.push(
                            <BookLi key={i}>
                                <Checkbox type="radio" id={i} name="gener" className='radioBox' onChange={handleCheck} />
                                <Thumbnail src={data.image} alt={data.title.replace(/(<([^>]+)>)/ig, '')} />
                                <Name className="name">{data.title.replace(/(<([^>]+)>)/ig, '')}</Name>
                                <br />
                                <Contents className="author">{data.author.replace(/(<([^>]+)>)/ig, '')}</Contents>
                                <Contents className="publisher">{data.publisher.replace(/(<([^>]+)>)/ig, '')}</Contents>
                                <Contents className="description"
                                    style={{ display: "none" }}>
                                    {data.description.replace(/(<([^>]+)>)/ig, '')}
                                </Contents>
                                <Hr />
                            </BookLi>
                        );
                    }
                    setBody(element);
                    handleOpen();
                } else {
                    alert(res.data.message);
                }
            })
    }

    const sendBook = (e) => {
        e.preventDefault();
        props.handleBook(title, publisher, author, description);
        setOpen(false);
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler} >
                <InputGroup className="mb-3"
                    style={{
                        width: "90%",
                        margin: "0 auto"
                    }}>
                    <FormControl
                        style={{
                            padding: "10px",
                            border: "1px solid #171717",
                            color: "#0f4c81",
                            fontSize: '14px'
                        }}
                        placeholder="책제목을 입력하세요"
                        aria-label="책제목을 입력하세요"
                        aria-describedby="basic-addon2"
                        value={Search}
                        onChange={onSearchHandler}
                    />
                    <InputGroup.Append>
                        <Button style={{
                            border: "0.5px solid #171717",
                            background: "#171717",
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


            <Modal open={open} onClose={handleClose}>
                <form style={modalStyle} className={classes.paper} onSubmit={sendBook}>
                    <ModalBox>
                        <Text>책 검색 결과</Text>
                        <Hr style={{ border: "1px solid black" }} />
                        <ul style={{
                            listStyle: 'none',
                            padding: '0',
                            textAlign: 'center'
                        }}>
                            {body}
                        </ul>
                        <Button
                            onClick={cancle}
                            style={{
                                margin: "5px",
                                backgroundColor: "white",
                                border: "1px solid gray",
                                color: "gray"
                            }}>
                            취소
                        </Button>
                        <Button
                            type="submit"
                            style={{
                                margin: "5px",
                                backgroundColor: "#171717",
                                border: "1px solid #171717",
                            }}>
                            선택
                        </Button>
                    </ModalBox>
                </form>
            </Modal>
        </div>
    )
}

export default withRouter(NaverBookAPI)