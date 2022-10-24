import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getProducts, getProduct } from "../../../services/api";

import "./Storage.scss";
import { isAuthorizated } from "../../../services/auth";

class Storage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: 0,
      filterKey: "",
      redirectTo: null,
    };
  }

  componentDidMount(): void {
    this.props.props.setTitle("Estoque");

    this.getAllProducts();
  }

  getAllProducts = async () => {
    await getProducts().then((res) => {
      this.setState({ products: res.data.products });
    });
  };

  getProductById = (productId: any) => {
    getProduct(productId).then(this.props.getProductId(productId));
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
        toast.error("Não foi possível aplicar o filtro!");
      });
  };

  render() {
    if (!this.state.products) {
      return (
        <section className="container d-flex flex-column align-items-center justify-content-center col-10 pt-3">
          <div>
            <p> Ainda não existem registros para serem exibidos! </p>
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
              {isAuthorizated() && <th scope="col">Preço de Custo</th>}
              <th scope="col">Preço de Venda</th>
              {isAuthorizated() && <th scope="col">Lucro Unidade</th>}
              {isAuthorizated() && <th scope="col">Ações</th>}
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

                {isAuthorizated() && (
                  <td>
                    R$
                    <span>
                      {product.costPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </td>
                )}

                <td>
                  R$
                  <span>{product.sellPrice.toFixed(2).replace(".", ",")}</span>
                </td>
                {isAuthorizated() && (
                  <td>
                    R$
                    {(product.sellPrice - product.costPrice)
                      .toFixed(2)
                      .replace(".", ",")}
                  </td>
                )}
                {isAuthorizated() && (
                  <td>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn"
                        onClick={() => {
                          this.getProductById(product.id);
                        }}
                      >
                        <Link to="/editProduct">
                          <i className="edit fa fa-edit" />
                        </Link>
                      </button>

                      <button
                        className="btn"
                        onClick={() => {
                          this.getProductById(product.id);
                        }}
                      >
                        <Link to="/deleteProduct">
                          <i className="delete fa fa-trash" />
                        </Link>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Storage;
