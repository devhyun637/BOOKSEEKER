import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// import Hashtags from '../../SharePostPage/Sections/Hashtags';
import Dropzone from 'react-dropzone';

//스타일 component
const Box = styled.div`
    width: 100%;
    height: auto;
    // border: 1px solid black;
    text-align: center;
    positon: absolute;
`;

const Title = styled.h2`
    margin: 20px;
    text-align: left;
    // border: 1px solid red;
`;

const Hr = styled.hr`
    margin: 30px 0;
    border: 1px solid gray;
`;

const Content = styled.div`
    margin-top: 10px;
`;

function VideoUploadPage(props) {

    // const [tags, setTags] = useState([]);

    // useEffect(() => {
    //     if (props.history.location) {
    //         const trailerId = props.history.location.state.booktrailerId;

    //         const booktraileVariable = {
    //             booktrailerId: trailerId
    //         }

    //         axios.post('/api/booktrailer/getVideo', booktraileVariable)
    //             .then(response => {
    //                 if (response.data.success) {
    //                     // console.log(response.data.booktrailerInfo);
    //                     const { booktrailerInfo } = response.data;
    //                     setValidURL(booktrailerInfo.URL);
    //                 } else {
    //                     alert('Failed to get booktrailer Info')
    //                 }
    //             })
    //     }
    // }, [])

    const [URL, setURL] = useState("");
    const [Open, setOpen] = useState(false);
    const [ValidURL, setValidURL] = useState("");
    const [img, setImg] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onURLChange = (e) => {
        setURL(e.currentTarget.value)
    }

    const onSubmitURL = (e, URL) => {
        e.preventDefault();

        let url = { URL: URL }
        // console.log("잘가나?", url)

        axios.post('/api/booktrailer/urlsearch', url)
            .then(res => {
                if (res.data.isSearchSuccess) {
                    // console.log(res.data.message)
                    setValidURL(res.data.url)
                    setOpen(false)
                } else {
                    alert("영상없음");
                   // console.log(res.data.message)
                    // console.log('영상못차즘~')
                }
            })
    }

    //썸네일 관련
    const onThumbnailSubmit = (event) => {
        event.preventDefault();
    }

    const onDrop = (imgFile) => {
        let reader = new FileReader();
        reader.readAsDataURL(imgFile[0]);
        reader.onload = e => {
            setImg(e.target.result);
        };
    }

    //전체보내주기
    const sendStep1 = (e) => {
        e.preventDefault();

        let data = {
            url: ValidURL,
            thumbnail: img,
            // hashtag: tags,
            // trailerId: props.history.location.state.booktrailerId
        }

        if (!img) {
            alert("썸네일을 등록해주세요");
        } else if (!ValidURL) {
            alert("Youtube URL을 검색해주세요");
        } else {
            props.history.push('/mypage/booktrailer/upload2', data);
        }
    }

    return (
        <Box>
            <Title>
                STEP1 <br />
                북트레일러 <br />
                영상 정보 등록1
                </Title>
            <Hr />

            <div
                style={{
                    margin: "20px",
                }}>
                <Button style={{
                    textAlign: "center",
                    border: "0.5px solid #717171",
                    backgroundColor: "black",
                    color: "white",
                }}
                    type="submit"
                    onClick={handleOpen}
                >Youtube 영상검색</Button>

                <Content>
                    <label>URL:
                        <a href={ValidURL}>  {ValidURL} </a>
                    </label>
                </Content>

                <Dialog open={Open} onClose={handleClose}>
                    <DialogTitle>
                        URL검색
                    </DialogTitle>
                    <DialogContent>
                        <TextField label="URL을 입력하세요." type="text" name="URL" value={URL} onChange={onURLChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{
                                border: "0.5px solid #717171",
                                backgroundColor: "black",
                                color: "white"
                            }}
                            onClick={(e) =>
                                onSubmitURL(e, URL)}>검색하기</Button>
                        <Button style={{
                            border: "0.5px solid #717171",
                            color: "black"
                        }}
                            onClick={handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <hr />

            {/* 썸네일 파일선택 */}
            <Content>
                <form onSubmit={onThumbnailSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={800000000}>

                            {({ getRootProps, getInputProps }) => (
                                <div style={{
                                    margin: '0 auto',
                                    fontSize: '14px',
                                    width: '80%',
                                    backgroundColor: 'black',
                                    color: 'white',
                                    borderRadius: '5px',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    lineHeight: 2.5,
                                    fontWeight: 'bold',
                                }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    썸네일 이미지를 업로드 (클릭)
                         </div>
                            )}
                        </Dropzone>
                        <div className="thumbnail"
                            style={{ margin: '10px' }}>
                            <img src={img} alt={''} width='320px' height='180px' />
                        </div>

                    </div>
                </form>
            </Content>
            <br />
            <form onSubmit={sendStep1}>
                <Button style={{
                    border: '1px solid black',
                    color: 'black',
                    paddingTop: '0',
                    height: '40px',
                    width: '30%',
                    lineHeight: '40px'
                }}
                    type="submit">
                    <span style={{
                        textAlign: 'center',
                        marginRight: '0px',
                        paddingRight: '0px',
                        letterSpacing: '-1px',
                        fontWeight: 'normal',
                        fontSize: '16px',
                        textJustify: 'justify'
                    }}> 다음 </span>
                </Button>
            </form>
        </Box >
    )
}

export default withRouter(VideoUploadPage);