import React, { useEffect } from "react";

import "./Sales.scss";

const Sales = (props: any) => {
  useEffect(() => {
    props.props.getPath("/sales");
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
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <th colSpan={4} className="text-end">
              TOTAL
            </th>
            <td> R$0.00</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Sales;
