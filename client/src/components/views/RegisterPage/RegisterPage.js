import React, { Component } from 'react';
import axios from 'axios';
import '../LoginPage/Login.css';

class RegisterPage extends Component {

    state = {
        emailEntered: '',
        isEmailValid: false,
        passwordEntered: '',
        isPasswordValid: false,
        password: '',
        confirmPassword: '',
        ageEntered: '',
        isAgeValid: 'false',
        gender: '',
        typedEmail: '',
        isDuplicateUser: false
    };


    emailInputClassName() {
        if (this.state.emailEntered) {
            return this.state.isDuplicateUser ? 'is-invalid' : 'is-valid';
        }
        return '';
    }

    handleOnPasswordInput(passwordInput) {
        this.setState({ password: passwordInput });
    }

    handleOnConfirmPasswordInput(confirmPasswordInput) {
        this.setState({ confirmPassword: confirmPasswordInput });
    }

    doesPasswordMatch() {
        const { password, confirmPassword } = this.state;
        return password === confirmPassword;
    }

    confirmPasswordClassName() {
        const { confirmPassword } = this.state;

        if (confirmPassword) {
            return this.doesPasswordMatch() ? 'is-valid' : 'is-invalid';
        }
    }

    renderEmailFeedbackMessage() {


        if (this.state.emailEntered) {
            return this.state.isDuplicateUser ? (
                <div className="invalid-feedback">이미 등록되어 있는 이메일입니다</div>
            ) : (
                    <div className="valid-feedback">사용할 수 있는 이메일입니다</div>
                );
        }
    }

    renderPasswordFeedbackMessage() {
        const { confirmPassword } = this.state;

        if (confirmPassword) {
            if (!this.doesPasswordMatch()) {
                return (
                    <div className="invalid-feedback">패스워드가 일치하지 않습니다</div>
                );
            }
        }
    }



    inputClassNameHelper = boolean => {
        switch (boolean) {
            case true:
                return 'is-valid';
            case false:
                return 'is-invalid';
            default:
                return '';
        }
    };

    isEveryFieldValid = () => {
        const { isEmailValid, isNameValid, isAgeValid } = this.state;
        return isEmailValid && isNameValid && isAgeValid;
    };



    buttonClick(event, data) {
        event.preventDefault();
        //console.log(data);
        /*
        axios.post('/api/users/register',data)
            .then(res => {
                if(res.data.isRegisterSuccess){
                   //alert(data)
                   this.props.history.push('/');
                }else{
                    alert(res.data.message);
                   
                }
            })
        */
        this.props.history.push('/register/3', data)
    }


    renderSubmitBtn = (email, name, password, cpassword, age, gender) => {
        if (this.isEveryFieldValid()) {

            const body = {
                email: email,
                name: name,
                password: password,
                confirmpassword: cpassword,
                age: age,
                gender: gender

            }


            return (
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={(event) =>
                        this.buttonClick(event, body)}
                >
                    Submit
        </button>
            );
        }

        return (
            <button type="submit" className="btn btn-primary btn-block" disabled>
                Submit
      </button>
        );
    };

    //이메일
    validateEmail = emailEntered => {
        const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

        axios.get('/api/users').then(response => {
            const users = response.data;
            const isUserFound = users.filter(user => user.email.toLowerCase() === emailEntered.toLowerCase())
                .length;


            if (emailEntered.match(emailRegExp) && !isUserFound) {
                this.setState({
                    isEmailValid: true,
                    emailEntered,
                    isDuplicateUser: false
                });
            } else if (emailEntered.match(emailRegExp) && isUserFound) {
                this.setState({
                    isEmailValid: false,
                    emailEntered,
                    isDuplicateUser: true
                });
            } else if (!emailEntered.match(emailRegExp) && isUserFound) {
                this.setState({
                    isEmailValid: false,
                    emailEntered

                });
            } else if (!emailEntered.match(emailRegExp) && !isUserFound) {
                this.setState({
                    isEmailValid: false,
                    emailEntered
                });
            };
        })
    }

    isEnteredEmailValid = () => {
        const { emailEntered, isEmailValid } = this.state;

        if (emailEntered) return isEmailValid;
    };

    //이름 유효성 확인 후 setState()
    validateName = nameEntered => {
        if (nameEntered.length > 1) {
            this.setState({
                isNameValid: true,
                nameEntered
            });
        } else {
            this.setState({
                isNameValid: false,
                nameEntered
            });
        }
    };

    isEnteredNameValid = () => {
        const { nameEntered, isNameValid } = this.state;

        if (nameEntered) return isNameValid;
    };


    //패스워드 유효성 확인 후 setState()
    validatePassword = passwordEntered => {

        if (passwordEntered.length > 5) {
            this.setState({
                isPasswordValid: true,
                passwordEntered
            });
        } else {
            this.setState({
                isPasswordValid: false,
                passwordEntered
            });
        }
    };

    isEnteredPasswordValid = () => {
        const { passwordEntered, isPasswordValid } = this.state;

        if (passwordEntered) return isPasswordValid;
    };


    //나이
    validateAge = ageEntered => {

        if (ageEntered.length > 0) {
            this.setState({
                isAgeValid: true,
                ageEntered
            });
        } else {
            this.setState({
                isAgeValid: true,
                ageEntered
            });
        }
    };

    isEnteredAgeValid = () => {
        const { ageEntered, isAgeValid } = this.state;

        if (ageEntered) return isAgeValid;
    };



    //입력하는 폼
    render() {
        return (
            <div className="App">
                <form className="myForm">

                    <div className="form-group">
                        <label htmlFor="emailInput">이메일</label>
                        <input
                            type="email"
                            className={`form-control ${this.inputClassNameHelper(this.isEnteredEmailValid())

                                }`}
                            id="emailInput"
                            aria-describedby="emailHelp"
                            placeholder="abc@gmail.com"
                            onChange={e => this.validateEmail(e.target.value)}
                            required
                        />
                        {this.renderEmailFeedbackMessage()}
                    </div>

                    <div className="form-group">
                        <label htmlFor="emailInput">이름</label>
                        <input
                            type="text"
                            className={`form-control ${this.inputClassNameHelper(
                                this.isEnteredNameValid()
                            )}`}
                            id="nameInput"
                            autoComplete="username"
                            aria-describedby="nameHelp"
                            placeholder="닉네임을 입력해주세요"
                            onChange={e => this.validateName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nameInput">비밀번호</label>
                        <input
                            type="password"
                            className={`form-control ${this.inputClassNameHelper(
                                this.isEnteredPasswordValid()
                            )}`}
                            id="passwordInput"
                            autoComplete="new-password"
                            onChange={e => this.handleOnPasswordInput(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPasswordInput">비밀번호 확인</label>
                        <input
                            type="password"
                            className={`form-control ${this.confirmPasswordClassName()}`}
                            id="confirmPasswordInput"
                            autoComplete="new-password"
                            onChange={e =>
                                this.handleOnConfirmPasswordInput(e.target.value)
                            }
                        />
                        {this.renderPasswordFeedbackMessage()}
                    </div>

                    <div className="form-group">
                        <label htmlFor="nameInput">나이</label>
                        <input
                            type="number"
                            className={`form-control ${this.inputClassNameHelper(
                                this.isEnteredAgeValid())}`}
                            id="ageInput"
                            onChange={e => this.validateAge(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nameInput">성별</label>
                        <input
                            type="number"
                            className={`form-control `}
                            id="genderInput"
                            onChange={e => this.setState({ gender: e.target.value })}
                            placeholder="남자"
                            required
                        />
                    </div>
                    {this.renderSubmitBtn(
                        this.state.emailEntered,
                        this.state.nameEntered,
                        this.state.password,
                        this.state.confirmPassword,
                        this.state.ageEntered,
                        this.state.gender)}
                </form>

            </div>

        );
    }
}

export default RegisterPage;