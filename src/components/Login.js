import React from 'react';

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        window.location.href = "/";
      } else {
        alert("Login failed");
      }
    };
    xhr.send(data);
  }

  render() {
    return (
      <div>
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

export default Login
