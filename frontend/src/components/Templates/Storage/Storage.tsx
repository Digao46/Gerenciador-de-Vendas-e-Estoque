import React from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getProducts } from "../../../services/api";

import "./Storage.scss";
import { isAuthenticated, isAuthorizated } from "../../../services/auth";

class Storage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      filterKey: "",
      redirectTo: null,
    };
  }

  componentDidMount(): void {
    if (!isAuthenticated()) {
      this.setState({ redirectTo: "/login" });
    }

    this.props.props.setTitle("Estoque");

    this.getAllProducts();
  }

  getAllProducts = async () => {
    await getProducts()
      .then((res) => {
        this.setState({ products: res.data.products });
      })
      .catch((err: any) => {
        if (err.response.status === 401) {
          toast.error(err.response.data.message);

          this.setState({ redirectTo: "/login" });

          localStorage.removeItem("user");

          return;
        } else {
          toast.error(err.response.data.message);

          this.setState({ redirectTo: "/" });
        }
      });
  };

  getProductId = (productId: any) => {
    this.props.getProductId(productId);
  };

  handleChange = (e: any) => {
    this.getAllProducts();
    this.setState({ filterKey: e.target.value });
  };

  search = (e: any) => {
    e.preventDefault();
    this.getAllProducts()
      .then(() => {
        setTimeout(() => {
          let productsFiltered = this.state.products.filter((product: any) =>
            product.name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                this.state.filterKey
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              )
          );
          this.setState({ products: productsFiltered });
        }, 100);
      })
      .then(() => {
        toast.success("Filtro Aplicado");
      })
      .catch(() => {
        toast.error("N??o foi poss??vel aplicar o filtro!");
      });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    if (!this.state.products) {
      return (
        <section className="container d-flex flex-column align-items-center justify-content-center col-10 pt-3">
          <div>
            <p> Ainda n??o existem registros para serem exibidos! </p>
          </div>

          <div className="info text-end">
            <p>Clique aqui</p>

            <i className="fa fa-arrow-right"></i>
          </div>
        </section>
      );
    }
    return (
      <section className="container d-flex flex-column align-items-center col-10 pt-3">
        <div className="formArea container d-flex justify-content-center align-items-center mb-3">
          <form onSubmit={this.search} className="d-flex col-8">
            <input
              className="col-8 me-2 ps-4 py-1"
              type="text"
              onChange={this.handleChange}
              placeholder="Pesquisar produto"
              required
            />

            <button
              type="submit"
              className="btn col-2 d-flex justify-content-center align-items-center"
            >
              <i className="fa fa-search" />
            </button>
          </form>
        </div>

        <table className="table table-hover table-bordered table-striped">
          <thead className="text-center">
            <tr>
              <th scope="col">Produto</th>
              <th scope="col">Estoque</th>
              <th scope="col">Pre??o de Venda</th>
              {isAuthorizated() ? <th scope="col">Pre??o de Custo</th> : null}
              {isAuthorizated() ? <th scope="col">Lucro Unidade</th> : null}
              {isAuthorizated() ? <th scope="col">A????es</th> : null}
            </tr>
          </thead>
          <tbody className="text-center">
            {this.state.products?.map((product: any) => (
              <tr key={product.id}>
                <td>{product.name}</td>

                {product.storage < 50 ? (
                  <td className="text-danger">{product.storage} uni</td>
                ) : product.storage < 100 ? (
                  <td className="text-warning">{product.storage} uni</td>
                ) : (
                  <td>{product.storage} uni</td>
                )}

                <td>
                  R$
                  <span>{product.sellPrice.toFixed(2).replace(".", ",")}</span>
                </td>

                {isAuthorizated() && product.costPrice ? (
                  <td>
                    R$
                    <span>
                      {product.costPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </td>
                ) : null}

                {isAuthorizated() && product.costPrice ? (
                  <td>
                    R$
                    {(product.sellPrice - product.costPrice)
                      .toFixed(2)
                      .replace(".", ",")}
                  </td>
                ) : null}

                {isAuthorizated() && product.costPrice ? (
                  <td>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn"
                        onClick={() => {
                          this.getProductId(product.id);
                        }}
                      >
                        <Link to="/editProduct">
                          <i className="edit fa fa-edit" />
                        </Link>
                      </button>

                      <button
                        className="btn"
                        onClick={() => {
                          this.getProductId(product.id);
                        }}
                      >
                        <Link to="/deleteProduct">
                          <i className="delete fa fa-trash" />
                        </Link>
                      </button>
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Storage;
