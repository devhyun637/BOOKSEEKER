import React from 'react';
import axios from 'axios';
import { Tag, Input, Button } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { BsPlusCircle } from 'react-icons/bs';
import { withRouter } from 'react-router';

class RegisterPage4 extends React.Component {

    state = {
        tags: ['캡스톤디자인', 'BOOKSEEKER'],
        inputVisible: false,
        inputValue: '',
    };

    componentDidMount = () => {
        const info = this.props.history.location.state
        console.log("데이터 보낸거 register4에서", info)
        let body = {
            email: info.email,
            name: info.name,
            password: info.password,
            confirmpassword: info.confirmpassword,
            birthDate: info.birthDate,
            gender: info.gender,
            categoryIds: info.categoryIds,
            hashtags: this.state.tags
        }
        return body
        
    }

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        // console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);

    forMap = tag => {
        const tagElem = (
            <Tag
                style={{
                    display: 'inline-block',
                    marginBottom: '5px',
                    borderRadius: '10px',
                    fontSize: '14px'
                }}
                closable
                onClose={e => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag}
                style={{
                    display: 'inline-block'
                }}
            >
                {tagElem}
            </span>
        );
    };

    sendHashtag = e => {
        e.preventDefault()
        const data = this.componentDidMount()

        let { tags } = this.state;
        console.log(tags);

        axios.post('/api/hashtags/select', tags)
            .then((res) => {
                if (!res.data.categorySelectSuccess) {
                    alert(res.data.message);
                    console.log("선택해줘");
                } else {
                    console.log("뭐라도 선택했군");

                    // register+register3+regist4 보내기
                    axios.post('/api/users/register', data)
                   .then(res => {
                        if (res.data.isRegisterSuccess) {
                            console.log("회원가입 성공!")
                        } else {
                              alert(res.data.message)
                         }
                         })
                    console.log(res.data.message);
                    console.log(data);
                    this.props.history.push('/login');
                }
            }).catch(e => {
                console.log('해시태그 선택에 실패', e)
            })
    }

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        const tagChild = tags.map(this.forMap);

        return (
            <form style={{
                position: 'relative',
                paddingBottom: '30px',
                textAlign: 'center'
            }} onSubmit={this.sendHashtag}>
                <div
                    style={{
                        position: 'relative',
                        padding: '20px',
                        textAlign: 'center'
                    }}>

                    {/* 해시태그 입력중 */}
                    {inputVisible && (
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="large"
                            style={{
                                background: 'white',
                                color: 'black',
                                border: '1px solid #717171',
                                padding: 0,
                                width: '90%',
                                height: '40px',
                                margin: '0 auto',
                                fontSize: '16px',
                                lineHeight: '40px',
                                textAlign: 'center'
                            }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                    )}

                    {/* 해시태그 입력 안하고 있음 */}
                    {!inputVisible && (
                        <Tag onClick={this.showInput}
                            style={{
                                background: 'white',
                                color: 'gray',
                                border: '1px dashed #717171',
                                padding: 0,
                                width: '90%',
                                height: '40px',
                                margin: '0 auto',
                                fontSize: '16px',
                                lineHeight: '40px'
                            }}
                        >
                            <BsPlusCircle
                                style={{
                                    margin: '0 3px 3px 3px'
                                }} />
                            해시태그 입력
                        </Tag>
                    )}
                </div>

                <div className="hashtag_box"
                    style={{
                        width: '300px',
                        padding: '10px',
                        margin: '0 auto',
                        overflow: 'hidden'
                    }}>
                    <TweenOneGroup
                        enter={{
                            scale: 1,
                            opacity: 0,
                            type: 'from',
                            duration: 100,
                            onComplete: e => {
                                e.target.style = '';
                            },
                        }}
                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                        appear={false}
                    >
                        {tagChild}
                    </TweenOneGroup>
                </div>

                {/* 버튼 */}
                <Button style={{
                    border: '1px solid black',
                    color: 'black',
                    paddingTop: '0',
                    height: '40px',
                    width: '30%',
                    lineHeight: '40px',
                    margin: '20px'
                }}
                    htmlType="submit"
                    type="button">
                    <span style={{
                        textAlign: 'center',
                        marginRight: '0px',
                        paddingRight: '0px',
                        letterSpacing: '-1px',
                        fontWeight: 'normal',
                        fontSize: '16px',
                        textJustify: 'justify'
                    }}> 회원가입</span>
                </Button>
            </form>
        );
    }
}

export default withRouter(RegisterPage4)