import React from "react";
import { Link } from "react-router-dom";
import { getProduct, editProduct } from "../../../../services/api";

import "./EditProduct.scss";

class EditProduct extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      sellPrice: "",
      costPrice: "",
      quantity: "",
    };
  }

  componentDidMount(): void {
    getProduct(this.props.productId).then((res) => {
      this.setState({
        name: res.data.name,
        sellPrice: res.data.sellPrice.toFixed(2).replace(",", "."),
        costPrice: res.data.costPrice.toFixed(2).replace(",", "."),
        quantity: res.data.storage,
      });
    });
  }

  handleChange = (e: any) => {
    const inputName = e.target.name;
    const value = e.target.value;

    this.setState({ [inputName]: value });
  };

  updateProduct = (e: any) => {
    e.preventDefault();

    const id = this.props.productId;
    const name = this.state.name;
    const sellPrice = this.state.sellPrice;
    const costPrice = this.state.costPrice;
    const storage = this.state.quantity;

    editProduct(id, { name, sellPrice, costPrice, storage }).then(() => {
      window.location.href = "/storage";
    });
  };

  cancel = (e: any) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="modal d-block d-flex justify-content-center align-items-center">
        <div className="modalFormArea d-flex flex-column justify-content-center align-items-center col-6">
          <div className="my-3">
            <h3> Editar Produto: </h3>
            <hr className="m-0" />
          </div>

          <form
            onSubmit={this.updateProduct}
            className="form d-flex justify-content-center align-items-center col-12"
          >
            <div className="col-6">
              <input
                onChange={this.handleChange}
                type="text"
                name="name"
                value={this.state.name}
                className="inputName col-12 ps-3 mb-4"
                placeholder="Nome do Produto"
              />

              <div className="d-flex flex-row justify-content-evenly mb-4">
                <div className="input-group">
                  <span className="holder input-group-text">R$</span>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    name="sellPrice"
                    value={this.state.sellPrice}
                    className="sellPrice form-control col-12 ps-1"
                    placeholder="Preço de Venda"
                  />
                </div>

                <div className="input-group">
                  <span className="holder input-group-text">R$</span>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    name="costPrice"
                    value={this.state.costPrice}
                    className="costPrice form-control col-12 ps-1"
                    placeholder="Preço de Compra"
                  />
                </div>
              </div>

              <input
                onChange={this.handleChange}
                name="quantity"
                value={this.state.quantity}
                className="inputQuantity col-12 ps-3 mb-4"
                placeholder="Quantidade"
              />

              <div className="btns d-flex justify-content-end mb-4">
                <button type="submit" className="btn btnAdd col-4 me-2">
                  Confirmar
                </button>
                <button
                  onClick={this.cancel}
                  className="btn btnCancel col-4 me-2"
                >
                  <Link to="/storage">Cancelar</Link>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProduct;
