import { InputGroup, FormControl, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '2%',
    overflow: 'scroll'
  },
}));



function APISearch(props) {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [Search, setSearch] = useState("");
    const [selected, setSelected] = useState('');

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

    const handleCheck = (event) =>{
        setSelected(event.currentTarget.id);
        console.log(event.currentTarget.id);
    }

    const onSubmitHandler = (evnet) => {
        evnet.preventDefault();

        axios.get('/api/booktrailer/search/APISearch/' + Search)
            .then(res => {
                if (res.data.isSearchSuccess) {
                    const element = []
                    for(var i=0;i<res.data.data.length;i++){
                        var data = res.data.data[i];
                        element.push(
                        <li key={i} style={{
                            width:'100%'
                        }}>
                            <img src={data.image} />
                            <p>title:{data.title.replace(/(<([^>]+)>)/ig , ' ' )}</p>
                            <p>author:{data.author}</p>
                            <p>{data.publisher}</p>
                            <input type="radio" id={i} name="gener" className='radioBox' onChange={handleCheck}/>
                            <br/>
                        </li>
                        );
                    }
                    setBody(element);
                    
                    handleOpen();
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
            <Modal
                open={open}
                onClose={handleClose}
            >
                <form style={modalStyle} className={classes.paper}>
                    <ul style={{
                        'listStyle': 'none'
                    }}>
                        {body}
                    </ul>
                    <button className="notSelect">
                        건너뛰기
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default withRouter(APISearch)