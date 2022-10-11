import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  getProducts,
  editProduct,
  getProduct,
  addSale,
} from "../../../../services/api";

import "./NewSale.scss";

class NewSale extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],

      productsInCart: [],

      names: [],
      quantities: [],

      id: "",
      name: "",
      price: "",
      storage: "",
      quantity: 1,
      total: 0,

      redirectTo: null,
    };
  }

  componentDidMount(): void {
    getProducts().then((res) => {
      this.setState({ products: res.data });
    });
  }

  handleChange = (e: any) => {
    const inputName = e.target.name;
    const value = e.target.value;

    this.setState({ [inputName]: value });
  };

  cancel = (e: any) => {
    e.preventDefault();

    this.setState({ redirectTo: "/" });
  };

  getSelectedProduct = () => {
    let select = document.getElementById("product") as HTMLSelectElement;
    let selectedId = select.options[select.selectedIndex].value;

    getProduct(selectedId).then((res) => {
      this.setState({
        name: res.data.name,
        price: res.data.sellPrice.toFixed(2),
        storage: res.data.storage,
        id: selectedId,
      });
    });
  };

  addToCart = (e: any) => {
    e.preventDefault();

    const product = {
      name: this.state.name,
      price: this.state.price,
      quantity: this.state.quantity,
      storage: this.state.storage,
      id: this.state.id,
    };

    if (this.state.quantity > this.state.storage) {
      alert("Estoque Insuficiente");
    } else {
      this.state.productsInCart.push(product);
    }
  };

  removeFromCart = (id: any) => {
    const newCart = this.state.productsInCart.filter(
      (item: any) => item.id !== id
    );

    this.setState({ productsInCart: newCart });
  };

  soldProducts = () => {
    for (let i = 0; i < this.state.productsInCart.length; i++) {
      this.state.names.push(this.state.productsInCart[i].name);
      this.state.quantities.push(this.state.productsInCart[i].quantity);

      const id = this.state.productsInCart[i].id;
      const storage =
        this.state.productsInCart[i].storage -
        this.state.productsInCart[i].quantity;

      editProduct(id, { storage });
    }
  };

  addNewSale = (e: any) => {
    e.preventDefault();

    this.soldProducts();

    const products = this.state.names;
    const quantity = this.state.quantities;
    const total = this.state.total;

    addSale({ products, quantity, total }).then(() => {
      this.setState({ redirectTo: "/sales" });
    });
  };

  render() {
    setTimeout(() => {
      const totals = document.querySelectorAll("span.totalValue");
      let totalValue = 0;

      for (let i = 0; i < totals.length; i++) {
        let value: number = parseFloat(totals[i].textContent!);

        totalValue += value;
      }
      this.setState({ total: totalValue });
    }, 10);

    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <div className="modal d-block d-flex justify-content-center align-items-center">
        <div className="modalFormArea d-flex justify-content-around align-items-center col-8">
          <div className="d-flex-flex-column justify-content-center align-items-center col-5">
            <div className="my-3">
              <h3 className="text-center"> Nova Venda: </h3>
              <hr className="m-0" />
            </div>

            <form
              onSubmit={this.addToCart}
              className="form d-flex justify-content-center align-items-center col-12"
            >
              <div className="col-10">
                <select
                  onChange={this.getSelectedProduct}
                  id="product"
                  name="id"
                  className="selectName col-12 ps-3 pe-3 mb-4"
                >
                  <option>Selecione um produto:</option>

                  {this.state.products.map((product: any) => (
                    <option id="productId" key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <div className="d-flex flex-row justify-content-evenly mb-4">
                  <div className="input-group">
                    <span className="holder input-group-text">R$</span>
                    <input
                      type="text"
                      name="sellPrice"
                      className="sellPrice form-control col-12 ps-1"
                      placeholder="Preço"
                      value={this.state.price}
                      readOnly
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="sellPrice"
                      className="storage form-control col-12 ps-3"
                      placeholder="Estoque"
                      value={this.state.storage}
                      readOnly
                    />
                  </div>
                </div>

                <input
                  onChange={this.handleChange}
                  id="quantity"
                  name="quantity"
                  className="inputQuantity col-12 ps-3 mb-4"
                  placeholder="Quantidade: 1"
                />

                <div className="btns d-flex justify-content-end mb-4">
                  <button type="submit" className="btn btnAdd col-4 me-2">
                    Adicionar
                  </button>
                  <Link to="/sales" className="btn btnCancel col-4 me-2">
                    Cancelar
                  </Link>
                </div>
              </div>
            </form>
          </div>

          <div className="cart col-5">
            <div className="my-3">
              <h3 className="text-center"> Carrinho: </h3>
              <hr className="m-0" />
            </div>

            <ul className="list">
              <div className="itemList">
                {this.state.productsInCart.map((product: any) => (
                  <li key={product.id} className="mb-4 me-2">
                    <div className="item d-flex justify-content-between">
                      <span className="itemName">
                        {product.name.toUpperCase()}
                      </span>

                      <button
                        onClick={() => {
                          this.removeFromCart(product.id);
                        }}
                        className="btn"
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </div>
                    <div>
                      <span>Preço = R$</span>
                      {product.price} *{" "}
                      <span className="quantity">
                        Qtd = {product.quantity}{" "}
                      </span>
                    </div>
                    <div className="text-end me-1">
                      <span className="subtotal">Subtotal </span>= R$
                      <span className="totalValue">
                        {(product.price * product.quantity).toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </div>
              <li className="text-end">
                <span className="total">
                  Total = R$
                  {this.state.total.toFixed(2).replace(".", ",")}
                </span>
              </li>
            </ul>

            {this.state.productsInCart.length > 0 && (
              <div className="d-flex justify-content-center">
                <button onClick={this.addNewSale} className="btn btnAdd">
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NewSale;
