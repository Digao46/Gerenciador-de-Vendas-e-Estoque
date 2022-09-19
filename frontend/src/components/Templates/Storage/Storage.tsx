import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getProduct, deleteProduct } from "../../../services/api";

import "./Storage.scss";

const Storage = (props: any) => {
  const [products, setProducts] = useState<any[]>();

  const totals = document.querySelectorAll(".total");
  let total = 0;

  for (let i = 0; i < totals.length; i++) {
    let value: number = parseFloat(totals[i].textContent!);

    total += value;
  }

  useEffect(() => {
    props.props.getPath("/storage");

    getProducts().then((res) => setProducts(res.data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const delProduct = (productId: any) => {
    deleteProduct(productId);
  };

  const getProductById = (productId: any) => {
    getProduct(productId).then(props.getProductId(productId));
  };

  return (
    <section className="container d-flex justify-content-center col-10 pt-3">
      <table className="table table-bordered table-striped">
        <thead className="text-center">
          <tr>
            <th scope="col" className="d-none">
              Id
            </th>
            <th scope="col">Nome</th>
            <th scope="col">Estoque</th>
            <th scope="col">Preço de Custo</th>
            <th scope="col">Preço de Venda</th>
            <th scope="col">Lucro Unidade</th>
            <th scope="col">Lucro Total</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.storage} uni</td>
              <td>
                R$<span>{product.costPrice.toFixed(2).replace(",", ".")}</span>
              </td>
              <td>
                R$<span>{product.sellPrice.toFixed(2).replace(",", ".")}</span>
              </td>
              <td>
                R$
                {(product.sellPrice - product.costPrice)
                  .toFixed(2)
                  .replace(",", ".")}
              </td>
              <td>
                R$
                <span className="total">
                  {((product.sellPrice - product.costPrice) * product.storage)
                    .toFixed(2)
                    .replace(",", ".")}
                </span>
              </td>
              <td>
                <div className="d-flex">
                  <button
                    className="btn"
                    onClick={() => {
                      getProductById(product.id);
                    }}
                  >
                    <Link to="/editProduct">
                      <i className="edit fa fa-edit" />
                    </Link>
                  </button>

                  <button
                    className="btn"
                    onClick={() => {
                      delProduct(product.id);
                    }}
                  >
                    <i className="delete fa fa-trash" />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          <tr>
            <th colSpan={5} className="text-end">
              TOTAL
            </th>
            <td>R${total.toFixed(2).replace(",", ".")}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Storage;
