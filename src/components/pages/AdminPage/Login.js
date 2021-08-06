import React, { useState, useEffect } from "react";


const Login = props => {
  return (
    <>
        <form className="order-form" onSubmit={props.loginHandler}>
        <input
          value={props.email}
          onChange={e => props.setEmail(e.target.value)}
          placeholder="Email"
          type="text"
          name="email"
          required
        />
        <input
          value={props.password}
          onChange={e => props.setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
export default Login;