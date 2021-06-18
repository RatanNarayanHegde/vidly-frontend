import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div className="container w-50">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              onChange={this.handleChange}
              value={account.username}
              id="username"
              name="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={this.handleChange}
              name="password"
              value={account.password}
              id="password"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">LogIn</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
