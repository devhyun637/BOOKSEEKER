import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'antd';
import RegisterPage2 from '../RegisterPage/RegisterPage2';
import { withRouter } from 'react-router-dom';

function RegisterPage3(props) {

    const componentDidMount = () => {
        const info = props.history.location.state

        let body = {
            email: info.email,
            name: info.name,
            password: info.password,
            confirmpassword: info.confirmpassword,
            age: info.age,
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
        //componentDidMount()

        let data = componentDidMount()
        let body = ChooseCategory


        console.log(data)

        /*
                for (const value of ChooseCategory) { 
                    let test = {
                        container: value
                    }
                    console.log("과연...", test)
                }
        */

        axios.post('/api/categories/select', body)
            .then(res => {
                if (!res.data.categorySelectSuccess) {
                    alert(res.data.message);
                } else {
                    //register+register3 보내기
                    axios.post('/api/users/register', data)
                        .then(res => {
                            if (res.data.isRegisterSuccess) {
                                console.log("회원가입 성공!")
                            } else {
                                alert(res.data.message)
                            }
                        })
                    console.log(res.data.message);
                    console.log(body)
                    props.history.push('/');
                }
            }).catch(e => {
                console.log('카테고리 선택에 실패', e)
            })



    }

    return (
        <form style={{ position: 'relative', padding: '20px', textAlign: 'center' }} onSubmit={sendCategory}>
            <RegisterPage2 handleCategory={filter => handleCategory(filter)} />
            <Button style={{
                background: 'white',
                color: 'blue',
                border: '1px solid blue',
                padding: '0',
                width: '20%'
            }}
                htmlType="submit"
                type="button">
                <span style={{
                    textAlign: 'center',
                    marginRight: '0px',
                    paddingRight: '0px',
                    letterSpacing: '-1px',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    textJustify: 'justify'
                }}

                > 회원가입</span>
            </Button>

        </form>
    )
}

export default withRouter(RegisterPage3)