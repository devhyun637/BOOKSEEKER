import React, { useState } from 'react'
import { withRouter } from 'react-router';
import { Typography, Form, message, Input } from 'antd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
var url = require('url');


const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" }
]

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

//'/api/booktrailer/urlsearch'

function VideoUploadPage(props) {

    const [URL, setURL] = useState('');
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const onURLChange = (e) => {
        setURL(e.currentTarget.value)
    }

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onSubmitURL = (e, URL) => {
        e.preventDefault();
        
        let Url={
            URL: URL
        }
        console.log("잘가나?",Url)
        
        axios.post('/api/booktrailer/urlsearch', Url)
                   .then(res => {
                        if (!res.data.isSearchSuccess) {
                            console.log(res.data.message)
                            console.log("영상 찾기 실패~!")
                        } else {
                            console.log(res.data.message)
                            console.log('영상차즘~')
                         }
            })
        }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2}> UploadVideo </Title>
        </div>
       
            <div>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    영상검색하기
                </Button>
                <Dialog open={Open} onClose={handleClose}>
                    <DialogTitle>
                        URL검색
                    </DialogTitle>
                    <DialogContent>
                         <TextField label="URL을 입력하세요." type="text" name="URL" value={URL} onChange={onURLChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={(e) =>
                                     onSubmitURL(e, URL)}>검색하기</Button>
                        <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
           
            <Form onSubmit>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* 업로드 모달창 */}
                   
                    {/* Thumbnail */}
                    <div>
                        <img src alt />
                    </div>
                </div>

                <br />
                <br />
                <lable>Title</lable>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>

                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />

                <select onChange>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br />
                <br />

                <select onChange>
                    <option key value></option>
                </select>

                <br />
                <br />

                <Button type="primary" size="large">
                    submit
                </Button>


            </Form>

            </div>
        
    )
}

export default withRouter(VideoUploadPage);