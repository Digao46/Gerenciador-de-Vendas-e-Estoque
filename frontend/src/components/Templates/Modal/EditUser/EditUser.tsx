import React from "react";
import { Redirect } from "react-router-dom";
import { getUser, editUser } from "../../../../services/api";

import { toast } from "react-hot-toast";

import "./EditUser.scss";

class EditUser extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      isAdmin: "",
    };
  }

  componentDidMount(): void {
    getUser(this.props.userId).then((res) => {
      this.setState({
        name: res.data.user.name,
        username: res.data.user.username,
        password: res.data.user.password,
        isAdmin: res.data.user.isAdmin,
      });
    });
  }

  handleChange = (e: any) => {
    const inputName = e.target.name;
    const value = e.target.value;

    this.setState({ [inputName]: value });
  };

  updateUser = (e: any) => {
    e.preventDefault();

    const id = this.props.userId;
    const name = this.state.name;
    const username = this.state.username;
    const password = this.state.password;
    const isAdmin = this.state.isAdmin;

    editUser(id, { name, username, password, isAdmin })
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
            <h3> Editar Usuário: </h3>
            <hr className="m-0" />
          </div>

          <form
            onSubmit={this.updateUser}
            className="form d-flex justify-content-center align-items-center col-12"
          >
            <div className="col-6">
              <input
                onChange={this.handleChange}
                type="text"
                name="name"
                className="name col-12 ps-3 mb-1"
                placeholder="Nome"
                value={this.state.name}
                required
              />

              <input
                onChange={this.handleChange}
                type="text"
                name="username"
                className="username col-12 ps-3 mb-1"
                placeholder="Preço de Venda"
                value={this.state.username}
                required
              />

              <input
                onChange={this.handleChange}
                type="password"
                name="password"
                className="password col-12 ps-3 mb-1"
                placeholder="Senha"
                value={this.state.password}
                required
              />

              <input
                onChange={this.handleChange}
                type="text"
                name="admin"
                className="admin col-12 ps-3 mb-3"
                placeholder="Cargo"
                value={this.state.isAdmin}
                required
              />

              <div className="btns d-flex justify-content-end mb-4">
                <button type="submit" className="btn btnAdd col-4 me-2">
                  Confirmar
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

export default EditUser;
