import React, { useState } from 'react';
import axios from 'axios'
import { Button } from 'antd';
import { withRouter } from 'react-router';
import RegisterPage2 from '../RegisterPage/RegisterPage2';

function RegisterPage3(props) {

    const componentDidMount = () => {
        const info = props.history.location.state

        let body = {
            email: info.email,
            name: info.name,
            password: info.password,
            confirmpassword: info.confirmpassword,
            birthDate: info.birthDate,
            gender: info.gender,
            categoryIds: ChooseCategory
        }
        return body
    }

    const [ChooseCategory, setChooseCategory] = useState([]);

    const handleCategory = (filter) => {
        let newCategory = [...ChooseCategory];
        newCategory = filter;

        setChooseCategory(newCategory)
    }

    const sendCategory = (e) => {
        e.preventDefault()

        let data = componentDidMount()
        let body = ChooseCategory

        axios.post('/api/categories/select', body)
            .then((res) => {
                if (!res.data.categorySelectSuccess) {
                    alert(res.data.message);
                } else {
                    // register+register3 보내기
                    axios.post('/api/users/register', data)
                        .then(res => {
                            if (res.data.isRegisterSuccess) {
                                console.log("회원가입 성공!")
                            } else {
                                alert(res.data.message)
                            }
                        })
                    console.log(res.data.message);
                    console.log(body);
                    props.history.push('/login');
                }
            }).catch(e => {
                console.log('카테고리 선택에 실패', e)
            })
    }

    return (
        <form style={{ position: 'relative', padding: '20px', textAlign: 'center' }} onSubmit={sendCategory}>
            <RegisterPage2 handleCategory={filter => handleCategory(filter)} />
            <Button style={{
                background: 'black',
                color: 'white',
                padding: '0',
                height: '40px',
                width: '30%'
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
            <br />
            <br />
            <br />
        </form>
    )
}

export default withRouter(RegisterPage3)