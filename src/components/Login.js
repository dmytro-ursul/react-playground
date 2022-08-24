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
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    form.classList.add('was-validated');
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

  render() {
    const { token } = this.props;
    return (
      <div>
        { token ? <Navigate to="/" /> : null }
        <form className="needs-validation" action="http://localhost:3051/sessions" method="post" onSubmit={this.handleSubmit} noValidate>
          <input className="form-control" type="text" name="username" placeholder="username" required/>
          <div className="invalid-feedback">
            Please provide a username.
          </div>
          <input className="form-control" type="password" name="password" placeholder="password" required/>
          <div className="invalid-feedback">
            Please provide a password.
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
