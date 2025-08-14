import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from './todoList/features/authSlice';
import { Navigate } from "react-router-dom";
import { useLoginMutation } from "./todoList/services/apiSlice";
import { RootState } from '../store';

const Login: React.FC = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const submitButtonRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (submitButtonRef.current) {
      submitButtonRef.current.focus();
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { signIn: { token, user} } = await login({ username, password }).unwrap();
      dispatch(setToken(token));
      dispatch(setUser(user));
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login-container">
      { token ? <Navigate to="/" /> : null }
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
