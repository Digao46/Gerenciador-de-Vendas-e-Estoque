import React from "react";
import { Redirect } from "react-router-dom";
import { addUser } from "../../../../services/api";

import { toast } from "react-hot-toast";

import "./NewUser.scss";

class NewUser extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      passwordConfirm: "",
      isAdmin: false,
      redirectTo: null,
    };
  }

  handleChange = (e: any) => {
    const inputName = e.target.name;
    const value = e.target.value;

    this.setState({ [inputName]: value });
  };

  handleAdminChange = (e: any) => {
    let value: any = parseInt(e.target.value);

    value === 1 ? (value = true) : (value = false);

    this.setState({ isAdmin: value });
  };

  handleInputType = (e: any) => {
    let target = e.target;

    let input: any;
    let icon: any;

    if (target.id === "showPasswordIcon") {
      input = document.getElementById("password") as HTMLInputElement;
      icon = document.getElementById("showPasswordIcon") as HTMLElement;
    } else {
      input = document.getElementById("passwordConfirm") as HTMLInputElement;
      icon = document.getElementById("showPasswordConfirmIcon") as HTMLElement;
    }

    if (input.type === "password") {
      input.type = "text";
      icon.className = "showPasswordIcon fa fa-eye-slash";
    } else {
      input.type = "password";
      icon.className = "showPasswordIcon fa fa-eye";
    }
  };

  addNewUser = (e: any) => {
    e.preventDefault();

    if (this.state.password !== this.state.passwordConfirm) {
      return toast.error("Senhas não coincidem!");
    }

    const name = this.state.name;
    const username = this.state.username;
    const password = this.state.password;
    const isAdmin = this.state.isAdmin;

    addUser({ name, username, password, isAdmin })
      .then((res) => {
        toast.success(res.data.message);
        this.setState({ redirectTo: "/users" });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  cancel = (e: any) => {
    e.preventDefault();

    this.setState({ redirectTo: "/users" });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <div className="modal d-block d-flex justify-content-center align-items-center">
        <div className="modalFormArea d-flex flex-column justify-content-center align-items-center col-6">
          <div className="my-3">
            <h3> Adicionar Pessoa: </h3>
            <hr className="m-0" />
          </div>

          <form
            onSubmit={this.addNewUser}
            className="form d-flex justify-content-center align-items-center col-12"
          >
            <div className="col-6">
              <input
                onChange={this.handleChange}
                type="text"
                name="name"
                className="inputName col-12 ps-3 mb-2"
                placeholder="Nome"
                required
              />

              <input
                onChange={this.handleChange}
                type="text"
                name="username"
                className="inputUserame col-12 ps-3 mb-2"
                placeholder="Nome de Usuário"
                required
              />

              <div className="passwordInputArea input-group">
                <input
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  id="password"
                  className="password form-control col-12 ps-3 mb-2"
                  placeholder="Senha"
                  required
                />

                <span className="input-group-text">
                  <i
                    onClick={this.handleInputType}
                    id="showPasswordIcon"
                    className="showPasswordIcon fa fa-eye"
                  />
                </span>
              </div>

              <div className="passwordInputArea input-group">
                <input
                  onChange={this.handleChange}
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  className="passwordConfirm form-control col-12 ps-3 mb-2"
                  placeholder="Confirme a senha"
                  required
                />

                <span className="input-group-text">
                  <i
                    onClick={this.handleInputType}
                    id="showPasswordConfirmIcon"
                    className="showPasswordConfirmIcon fa fa-eye"
                  />
                </span>
              </div>

              <select
                className="roleInput col-12 ps-3 mb-2"
                onChange={this.handleAdminChange}
                name="Role"
                id="roleSelect"
                placeholder="Selecione o cargo:"
              >
                <option selected>Selecione o cargo:</option>
                <option value={1}>Administrador</option>
                <option value={0}>Vendedor</option>
              </select>

              <div className="btns d-flex justify-content-end mb-4">
                <button type="submit" className="btn btnAdd col-4 me-2">
                  Adicionar
                </button>
                <button
                  onClick={this.cancel}
                  className="btn btnCancel col-4 me-2"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewUser;
