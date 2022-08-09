import React from 'react';

function Login() {
  return (
    <div>
      <form action="/session" method="post">
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
};

export default Login
