import React, { useEffect, useState } from "react";
import "./Sales.scss";

import { api } from "../../../services/api";

const Sales = () => {
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    api.get("/products").then((res) => setSales(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container d-flex justify-content-center col-10 pt-3">
      <table className="table table-bordered table-striped">
        <thead className="text-center">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Vendido</th>
            <th scope="col">Preço</th>
            <th scope="col">sales</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {sales.map((sales) => (
            <tr key={sales.id}>
              <th>{sales.id}</th>
              <td>{sales.name}</td>
              <td>{sales.sold} un</td>
              <td>R${sales.price.toFixed(2)}</td>
              <td>{sales.data}</td>
              <td className="d-flex justify-content-center">
                <button className="btn">
                  <i className="edit fa fa-edit me-2" />
                </button>
                <button className="btn">
                  <i className="del fa fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Sales;
