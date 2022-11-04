import React from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  getProducts,
  editProductStorage,
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
      idSeller: "",
      quantity: 1,
      total: 0,

      redirectTo: null,
    };
  }

  componentDidMount(): void {
    getProducts().then((res) => {
      this.setState({ products: res.data.products });
    });
  }

  handleChange = (e: any) => {
    const inputName = e.target.name;
    let value = e.target.value;

    if (!value) value = 1;

    this.setState({ [inputName]: value });
  };

  cancel = (e: any) => {
    e.preventDefault();

    this.setState({ redirectTo: "/sales" });
  };

  getSelectedProduct = () => {
    let productInput = document.getElementById(
      "productInput"
    ) as HTMLInputElement;
    let name = productInput.value;

    let id: any;

    try {
      id = this.state.products.filter((product: any) =>
        product.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .startsWith(
            name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
      )[0].id;
    } catch (err) {
      return toast.error("Não foi possível encontrar esse produto!");
    }

    getProduct(id).then((res) => {
      this.setState({
        name: res.data.product.name,
        price: res.data.product.sellPrice.toFixed(2),
        storage: res.data.product.storage,
        id: id,
      });
    });
  };

  addToCart = (e: any) => {
    e.preventDefault();

    let productInput = document.getElementById(
      "productInput"
    ) as HTMLInputElement;

    let quantityInput = document.getElementById("quantity") as HTMLInputElement;

    const product = {
      name: this.state.name,
      price: this.state.price,
      quantity: this.state.quantity,
      storage: this.state.storage,
      id: this.state.id,
    };

    const verifyStorage = this.state.quantity <= this.state.storage;
    const alreadyInCart = this.state.productsInCart.find(
      (e: any) => e.id === product.id
    );

    if (!alreadyInCart && verifyStorage) {
      this.state.productsInCart.push(product);
    } else if (alreadyInCart) {
      alreadyInCart.quantity =
        parseInt(alreadyInCart.quantity) + parseInt(product.quantity);
    } else {
      return toast("Estoque Insuficiente!", {
        icon: "⚠️",
      });
    }

    productInput.value = "";
    quantityInput.value = "";
    this.setState({
      name: "",
      price: "",
      quantity: 1,
      storage: "",
      id: "",
    });
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

      editProductStorage(id, { storage });
    }
  };

  addNewSale = (e: any) => {
    e.preventDefault();

    this.soldProducts();

    const products = this.state.names;
    const quantity = this.state.quantities;
    const total = this.state.total;
    const idSeller = JSON.parse(localStorage.getItem("user")!).userId;

    addSale({ products, quantity, total, idSeller })
      .then((res) => {
        toast.success(res.data.message);
        this.setState({ redirectTo: "/sales" });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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
                <input
                  type="text"
                  onChange={this.getSelectedProduct}
                  id="productInput"
                  className="selectName col-12 ps-3 pe-3 mb-4"
                  list="productsList"
                  placeholder="Selecione um produto:"
                  required
                />

                <datalist id="productsList">
                  {this.state.products.map((product: any) => (
                    <option
                      id="productId"
                      key={product.id}
                      value={product.name}
                    />
                  ))}
                </datalist>

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
