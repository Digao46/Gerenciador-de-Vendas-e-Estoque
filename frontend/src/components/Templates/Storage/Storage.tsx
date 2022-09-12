import React, { useEffect, useState } from "react";
import "./Storage.scss";

import { api } from "../../../services/api";

const Storage = () => {
  const [storage, setStorage] = useState<any[]>([]);

  useEffect(() => {
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
            <th scope="col">Vendido</th>
            <th scope="col">Preço</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {storage.map((storage) => (
            <tr key={storage.id}>
              <th>{storage.id}</th>
              <td>{storage.name}</td>
              <td>{storage.storage} un</td>
              <td>R${storage.price.toFixed(2)}</td>
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
        </tbody>
      </table>
    </section>
  );
};

export default Storage;
