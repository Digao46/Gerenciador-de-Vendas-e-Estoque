import React from "react";
import { Link } from "react-router-dom";
import { getProducts, getProduct, deleteProduct } from "../../../services/api";

import "./Storage.scss";

class Storage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: 0,
    };
  }

  componentDidMount(): void {
    this.getAllProducts().then(() => {
      this.props.props.getPath("/storage");
    });
  }

  getAllProducts = async () => {
    await getProducts().then((res) => this.setState({ products: res.data }));
  };

  getProductById = (productId: any) => {
    getProduct(productId).then(this.props.getProductId(productId));
  };

  delProduct = (productId: any) => {
    deleteProduct(productId);
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
    } else {
      return (
        <section className="container d-flex justify-content-center col-10 pt-3">
          <table className="table table-hover table-bordered table-striped">
            <thead className="text-center">
              <tr>
                <th scope="col">Produto</th>
                <th scope="col">Estoque</th>
                <th scope="col">Preço de Custo</th>
                <th scope="col">Preço de Venda</th>
                <th scope="col">Lucro Unidade</th>
                <th scope="col">Ações</th>
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
                    <span>
                      {product.costPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </td>
                  <td>
                    R$
                    <span>
                      {product.sellPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </td>
                  <td>
                    R$
                    {(product.sellPrice - product.costPrice)
                      .toFixed(2)
                      .replace(".", ",")}
                  </td>
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
                          this.delProduct(product.id);
                        }}
                      >
                        <i className="delete fa fa-trash" />
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
}

export default Storage;
