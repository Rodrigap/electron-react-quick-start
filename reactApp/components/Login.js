import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register.js';
import DocLibrary from './DocLibrary.js'
import { Link, Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      redirect: false
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: {
        username: this.state.name,
        password: this.state.password
      }
    })
    .then(response => {
      console.log('resp', response)
      if (response.data === "SUCCESS") {
        this.setState({redirect: true})
        this.props.login = true;
      }
    })
  }

  handleChangeName(e) {
    this.setState({name: e.target.value})
  }

  handleChangePass(e) {
    this.setState({password: e.target.value})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/library" />
    }
    return (
      <div>
        <div className="body">
          <p className="docHeader">Login!</p>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group">
              <label>Username</label>
              <input
                onChange={(e) => this.handleChangeName(e)}
                type="text"
                name="name"
                className="form-control registerInput"
                placeholder="Enter Username"
                value={this.state.name}></input>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={(e) => this.handleChangePass(e)}
                type="password"
                name="password"
                className="form-control registerInput"
                placeholder="Password"
                value={this.state.password}></input>
            </div>
            <button className="saveButton" type="submit">
              Login
            </button>
          </form>
          <Link to="/register">
            <button className="saveButton" type="button">
              Not registered?
            </button>
          </Link>
        </div>
        <Route path="/library" component={DocLibrary} />
        <Route path="/register" component={Register} />
      </div>
    )
  }
}


export default Login;