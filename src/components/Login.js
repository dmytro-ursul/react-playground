import React from 'react';
import { setToken } from "./todoList/actions";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const { setToken } = this.props;
    const form = e.target;
    const data = new FormData(form);
    if (!this.validateFormData(data))
      return;
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.responseText.length > 0) {
        const response = JSON.parse(xhr.responseText);
        setToken(response.token);
      } else {
        alert("Login failed");
      }
    };
    xhr.send(data);
  }

  validateFormData = (data) => {
    if (data.get("username").length === 0 || data.get("password").length === 0) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const { token } = this.props;
    return (
      <div>
        { token ? <Navigate to="/" /> : null }
        <form action="http://localhost:3051/sessions" method="post" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" name="username" placeholder="username"/>
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="password"/>
          </div>
          <input className="btn btn-primary" type="submit" value="login"/>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(
  mapStateToProps,
  { setToken }
)(Login);
