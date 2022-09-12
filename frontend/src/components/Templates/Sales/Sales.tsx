import React, { useEffect, useState } from "react";
import "./Sales.scss";

import { api } from "../../../services/api";

const Sales = (props: any) => {
  const [sales, setSales] = useState<any[]>([]);

  const totals = document.querySelectorAll("td.total");
  let total = 0;

  for (let i = 0; i < totals.length; i++) {
    let value: number = parseFloat(totals[i].textContent!);

    total += value;
  }

  useEffect(() => {
    props.props.getPath("/sales");

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
            <th scope="col">Última Venda</th>
            <th scope="col">Total</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {sales.map((sales) => (
            <tr key={sales.id}>
              <th>{sales.id}</th>
              <td>{sales.name}</td>
              <td>{sales.sold} un</td>
              <td>R${sales.price.toFixed(2).replace(".", ",")}</td>
              <td>{sales.data}</td>
              <td className="total">
                {(sales.sold * sales.price).toFixed(2).replace(".", ",")}
              </td>
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

          <tr>
            <th colSpan={5} className="text-end">
              TOTAL
            </th>
            <td> R${total.toFixed(2).replace(".", ",")}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Sales;
