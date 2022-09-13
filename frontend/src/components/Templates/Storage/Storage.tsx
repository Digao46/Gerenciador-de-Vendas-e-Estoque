import React, { useEffect, useState } from "react";
import "./Storage.scss";

import { api } from "../../../services/api";

const Storage = (props: any) => {
  const [storage, setStorage] = useState<any[]>([]);

  const totals = document.querySelectorAll("td.total");
  let total = 0;

  for (let i = 0; i < totals.length; i++) {
    let value: number = parseFloat(totals[i].textContent!);

    total += value;
  }

  useEffect(() => {
    props.props.getPath("/storage");
    api.get("/sales").then((res) => setStorage(res.data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container d-flex justify-content-center col-10 pt-3">
      <table className="table table-bordered table-striped">
        <thead className="text-center">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Estoque</th>
            <th scope="col">Preço de Custo</th>
            <th scope="col">Total</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {storage.map((storage) => (
            <tr key={storage.id}>
              <th>{storage.id}</th>
              <td>{storage.name}</td>
              <td>{storage.storage} un</td>
              <td>R${storage.costPrice.toFixed(2).replace(".", ",")}</td>
              <td className="total">
                {(storage.storage * storage.costPrice)
                  .toFixed(2)
                  .replace(".", ",")}
              </td>
              <td className="d-flex justify-content-center">
                <button className="btn">
                  <i className="add fa fa-plus me-2" />
                </button>
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
            <th colSpan={4} className="text-end">
              TOTAL
            </th>
            <td> R${total.toFixed(2).replace(".", ",")}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Storage;
