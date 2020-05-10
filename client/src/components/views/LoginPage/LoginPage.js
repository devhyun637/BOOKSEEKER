import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

class LoginPage extends Component {
  state = {
    emailEntered: '',
    isEmailValid: false,
    passwordEntered: '',
    isPasswordValid: false
  };

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
    const { isEmailValid, isPasswordValid } = this.state;
    return isEmailValid && isPasswordValid;
  };

  buttonClick(event, data) {
    event.preventDefault();
    console.log(data);
    axios.post('/api/users/login', data)
      .then(res => {
        if (res.data.loginSuccess) {
          this.props.history.push('/');
        } else {
          alert(res.data.message);
        }
      })

  }

  renderSubmitBtn = (emailEntered, passwordEntered) => {
    if (this.isEveryFieldValid()) {

      const body = {
        email: emailEntered,
        password: passwordEntered
      }
      //const jBody = JSON.stringify(body)

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

  validateEmail = emailEntered => {
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

    if (emailEntered.match(emailRegExp)) {
      this.setState({
        isEmailValid: true,
        emailEntered
      });
    } else {
      this.setState({
        isEmailValid: false,
        emailEntered
      });
    }
  };

  isEnteredEmailValid = () => {
    const { emailEntered, isEmailValid } = this.state;

    if (emailEntered) return isEmailValid;
  };

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


  render() {
    return (
      <div className="App">
        <form className="myForm">

          <div className="form-group">
            <label htmlFor="emailInput">이메일</label>
            <input
              type="email"
              className={`form-control ${this.inputClassNameHelper(
                this.isEnteredEmailValid()
              )}`}
              id="emailInput"
              aria-describedby="emailHelp"
              placeholder="abc@gmail.com"
              onChange={e => this.validateEmail(e.target.value)}
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
              onChange={e => this.validatePassword(e.target.value)}
              required
            />
          </div>

          {this.renderSubmitBtn(this.state.emailEntered, this.state.passwordEntered)}
        </form>
      </div>
    );
  }
}

export default LoginPage;