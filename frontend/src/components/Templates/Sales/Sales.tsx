import React, { useEffect, useState } from "react";
import { getSales } from "../../../services/api";

import "./Sales.scss";

const Sales = (props: any) => {
  const [sales, setSales] = useState<any[]>();

  const totals = document.querySelectorAll("span.total");
  let total = 0;

  for (let i = 0; i < totals.length; i++) {
    let value: number = parseFloat(totals[i].textContent!);

    total += value;
  }

  useEffect(() => {
    props.props.getPath("/sales");

    getSales().then((res) => {
      setSales(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sales]);

  const getDate = (item: any) => {
    const data =
      item[8] +
      item[9] +
      "/" +
      item[5] +
      item[6] +
      "/" +
      item[0] +
      item[1] +
      item[2] +
      item[3];

    return data;
  };

  return (
    <section className="container d-flex justify-content-center col-10 pt-3">
      <div className="  container">
        <div className=" col-12 mb-2">
          <div className="cardTotal card justify-content-evenly flex-row col-12">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="totalLabel">Valor total das vendas:</p>
              <p className="totalValue">
                <span className="moneyLabel">R$</span>
                {total.toFixed(2).replace(".", ",")}
              </p>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="totalLabel">Valor total das vendas de hoje:</p>
              <p className="totalValue">
                <span className="moneyLabel">R$</span>
                0,00
              </p>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="totalLabel">Vendas últimos 30 dias:</p>
              <p className="totalValue">
                <span className="moneyLabel">R$</span>
                {total.toFixed(2).replace(".", ",")}
              </p>
            </div>
          </div>
        </div>

        <div className="mainDiv">
          {sales?.map((sale) => (
            <div
              className="container d-flex justify-content-center"
              key={sale.id}
            >
              <div className="sale card col-5 d-flex flex-row justify-content-center align-items-center mb-2 me-2">
                <div className="saleId col-4 d-flex justify-content-center align-items-center">
                  <h3>#{sale.id}</h3>
                </div>
                <div className="col-8">
                  <div className="d-flex justify-content-between">
                    <p className="totalLabel"> Valor da venda: </p>
                  </div>
                  <p className="totalValue d-flex justify-content-between align-items-end text-end me-4">
                    <span className="totalLabel me-2">
                      Data: {getDate(sale.createdAt)}
                    </span>

                    <div>
                      <span className="moneyLabel">R$</span>
                      <span className="total">
                        {sale.total.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </p>
                </div>
              </div>

              <div className="products card d-flex justify-content-center  col-5">
                <div className="title d-flex justify-content-around">
                  <p className="itemsLabel col-5 text-start"> Items: </p>
                  <p className="itemsLabel col-5 text-start"> Qtd: </p>
                </div>

                <div className="productsList d-flex flex-column justify-content-center">
                  {sale.products.map((product: any, i: any) => (
                    <div
                      key={i}
                      className="productArea d-flex justify-content-center"
                    >
                      <p className="productName d-flex justify-content-center align-items-center col-5 text-start">
                        {sale.products[i]}
                      </p>
                      <p className="d-flex justify-content-center align-items-center col-1">
                        |
                      </p>
                      <p className="soldQuantity d-flex justify-content-center align-items-center col-5">
                        {sale.quantity[i]}
                        <span className="unity ms-1">unidades</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sales;
