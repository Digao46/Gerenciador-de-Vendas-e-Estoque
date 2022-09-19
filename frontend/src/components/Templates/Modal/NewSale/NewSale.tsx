import React from "react";
import { Link } from "react-router-dom";

import "./NewSale.scss";

class NewSale extends React.Component<any, any> {
  render() {
    return (
      <div
        className={`modal d-block d-flex justify-content-center align-items-center`}
      >
        <div className="modalFormArea d-flex justify-content-around align-items-center col-8">
          <div className="d-flex-flex-column justify-content-center align-items-center col-5">
            <div className="my-3">
              <h3 className="text-center"> Nova Venda: </h3>
              <hr className="m-0" />
            </div>

            <form className="form d-flex justify-content-center align-items-center col-12">
              <div className="col-10">
                <select
                  id="product"
                  name="id"
                  className="selectName col-12 ps-3 pe-3 mb-4"
                >
                  <option>Selecione um produto:</option>
                  {/* {this.state.products.map((product: any) => (
                    <option id="productId" key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))} */}
                </select>

                <div className="input-group mb-4">
                  <span className="holder input-group-text">R$</span>
                  <input
                    type="text"
                    name="sellPrice"
                    className="sellPrice form-control col-12 ps-3"
                    placeholder="Preço"
                    // value={this.state.price.toFixed(2)}
                    readOnly
                  />
                </div>

                <input
                  id="quantity"
                  name="quantity"
                  className="inputQuantity col-12 ps-3 mb-4"
                  placeholder="Quantidade: 1"
                />

                <div className="btns d-flex justify-content-end mb-4">
                  <button type="submit" className="btn btnAdd col-4 me-2">
                    Adicionar
                  </button>
                  <button className="btn btnCancel col-4 me-2">
                    <Link to="/sales">Cancelar</Link>
                  </button>
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
                {/* {this.state.cartProducts.map((product: any) => (
                  <li key={product.id} className="mb-4">
                    <div className="item">
                      <span className="itemName">
                        {product.name.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      Preço: R$
                      {product.price.toFixed(2).replace(".", ",")} *{" "}
                      <span className="quantity">
                        Qtd = {product.quantity}{" "}
                      </span>
                    </div>
                    <div className="text-end">
                      <span className="subtotal">Subtotal </span>= R$
                      {(product.price * product.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </div>
                  </li>
                ))} */}
              </div>
              {/* {this.state.cartProducts.length > 0 && (
                <li className="text-end">
                  <span className="total">
                    Total = R$
                    {this.state.cartTotal.toFixed(2).replace(".", ",")}
                  </span>
                </li>
              )} */}
            </ul>

            {/* {this.state.cartProducts.length > 0 && ( */}
            <div className="d-flex justify-content-center">
              <button className="btn btnAdd">
                <Link to="/sales">Finalizar Compra</Link>
              </button>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    );
  }
}

export default NewSale;
