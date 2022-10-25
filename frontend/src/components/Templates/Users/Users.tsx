import React from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../../services/api";

import "./Users.scss";

class Users extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount(): void {
    this.props.props.setTitle("Pessoas");

    this.getAllUsers();
  }

  getAllUsers = async () => {
    await getUsers().then((res) => {
      this.setState({ users: res.data.users });
    });
  };

  getUserId = (userId: any) => {
    this.props.getUserId(userId);
  };

  render() {
    return (
      <section className="container d-flex flex-column align-items-center col-10 pt-3">
        <table className="table table-hover table-bordered table-striped">
          <thead className="text-center">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nome</th>
              <th scope="col">Apelido</th>
              <th scope="col">Admin</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {this.state.users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                {user.isAdmin === true ? <td>Sim</td> : <td>Não</td>}
                <td>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn"
                      onClick={() => {
                        this.getUserId(user.id);
                      }}
                    >
                      <Link to="/editUser">
                        <i className="edit fa fa-edit" />
                      </Link>
                    </button>

                    <button
                      className="btn"
                      onClick={() => {
                        this.getUserId(user.id);
                      }}
                    >
                      <Link to="/deleteUser">
                        <i className="delete fa fa-trash" />
                      </Link>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Users;
