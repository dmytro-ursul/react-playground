import React from 'react';
import { setToken } from "./todoList/actions";
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from "react-router-dom";

interface Props extends PropsFromRedux {}

const Login: React.FC<Props> = ({ token, setToken }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: { "Accept": "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging in");
    } finally {
      form.classList.add('was-validated');
    }
  };

  return (
    <div>
      { token ? <Navigate to="/" /> : null }
      <form className="needs-validation" action="http://localhost:3051/sessions" method="post" onSubmit={handleSubmit} noValidate>
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

const mapStateToProps = (state: { token: any }) => ({
  token: state.token,
});

const connector = connect(mapStateToProps, { setToken });
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Login);
