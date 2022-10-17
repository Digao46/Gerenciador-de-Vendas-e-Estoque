import React from "react";
import toast from "react-hot-toast";
import { Redirect } from "react-router-dom";

import { logIn } from "../../services/api";

import "./Login.scss";

class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLogged: false,
      redirectTo: null,
    };
  }

  handleChange = (e: any) => {
    const inputName = e.target.name;
    const value = e.target.value;

    this.setState({ [inputName]: value });
  };

  logIn = async (e: any) => {
    e.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    const user = { username, password };

    await logIn(user).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));

        this.setState({ isLogged: true });
        this.setState({ redirectTo: "/" });
        // });
      } else if (res.status === 203) {
        return toast.error("Usuário não encontrado!");
      } else {
        return toast.error("Usuário ou senha incorretos!");
      }
    });
  };

  render() {
    if (this.state.isLogged) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <section className="d-flex justify-content-center align-items-center">
        <div className="header d-flex justify-content-center align-items-center">
          Gerenciador de Vendas e Estoque
        </div>

        <div className="formLoginArea container d-flex flex-column justify-content-center align-items-center col-4">
          <div>
            <h1>Login</h1>
          </div>

          <form onSubmit={this.logIn}>
            <div className="formContainer mb-3">
              <input
                onChange={this.handleChange}
                type="text"
                name="username"
                required
              />
              <span>Usuário</span>
            </div>

            <div className="formContainer mb-2">
              <input
                onChange={this.handleChange}
                type="password"
                name="password"
                required
              />
              <span>Senha</span>
            </div>

            <div className="buttons d-flex flex-column justify-content-center align-items-center">
              <button className="btn mb-1 col-12">Entrar</button>
              <hr className="separation" />
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
