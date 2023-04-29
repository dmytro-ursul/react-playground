import React from 'react';
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useLoginMutation } from "./todoList/services/apiSlice";

const Login: React.FC = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { signIn: { token } } = await login({ username, password }).unwrap();
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      { token ? <Navigate to="/" /> : null }
      <form className="needs-validation" action="http://localhost:3051/sessions" method="post" onSubmit={handleSubmit} noValidate>
        <input
          className="form-control"
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <div className="invalid-feedback">
          Please provide a username.
        </div>
        <input
          className="form-control"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <div className="invalid-feedback">
          Please provide a password.
        </div>
        <input className="btn btn-primary" type="submit" value="login"/>
      </form>
    </div>
  );
}

export default Login;
