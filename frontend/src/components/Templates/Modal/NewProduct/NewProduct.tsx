import React from "react";

import "./NewProduct.scss";

const NewProduct = (props: any) => {
  return (
    <div
      className={`modal ${props.addClassName} d-flex justify-content-center align-items-center`}
    >
      <div className="modalFormArea d-flex flex-column justify-content-center align-items-center col-6">
        <div className="my-3">
          <h3> Adicionar Produto: </h3>
          <hr className="m-0" />
        </div>

        <form className="form d-flex justify-content-center align-items-center col-12">
          <div className="col-6">
            <input
              type="text"
              name="name"
              className="inputName col-12 ps-3 mb-4"
              placeholder="Nome do Produto"
            />

            <div className="d-flex flex-row justify-content-evenly mb-4">
              <div className="input-group">
                <span className="holder input-group-text">R$</span>
                <input
                  type="text"
                  name="costPrice"
                  className="costPrice form-control col-12 ps-3"
                  placeholder="Preço de Custo"
                />
              </div>

              <div className="input-group">
                <span className="holder input-group-text">R$</span>
                <input
                  type="text"
                  name="sellPrice"
                  className="sellPrice form-control col-12 ps-3"
                  placeholder="Preço de Venda"
                />
              </div>
            </div>

            <input
              name="quantity"
              className="inputQuantity col-12 ps-3 mb-4"
              placeholder="Quantidade"
            />

            <div className="btns d-flex justify-content-end mb-4">
              <button type="submit" className="btn btnAdd col-4 me-2">
                Adicionar
              </button>
              <button
                onClick={props.handleNewProductModal}
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
};

export default NewProduct;
