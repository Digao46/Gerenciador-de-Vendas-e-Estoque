import React from "react";
import { getSales } from "../../../services/api";

import "./Sales.scss";

class Sales extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      sales: [],
      total: 0,
    };
  }

  componentDidMount(): void {
    this.props.props.getPath("/sales");

    this.getAllSales();
  }

  getAllSales = () => {
    getSales().then((res) => {
      this.setState({ sales: res.data });
    });
  };

  filterByPeriod = (days: number) => {
    this.getAllSales();

    let date = new Date();

    setTimeout(() => {
      const periodStart = this.getDate(date.setDate(date.getDate() - days));
      const periodEnd = new Date();

      const salesByPeriod = this.state.sales?.filter(
        (sale: any) =>
          this.getDate(sale.createdAt) >= periodStart &&
          this.getDate(sale.createdAt) <= periodEnd
      );

      this.setState({ sales: salesByPeriod });
    }, 10);
  };

  getDate = (item: any) => {
    const date = new Date(item);
    return date;
  };

  formatDate = (item: any) => {
    const date =
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
    return date;
  };

  render() {
    setTimeout(() => {
      const totals = document.querySelectorAll("span.total");
      let total = 0;
      let totalValue;

      for (let i = 0; i < totals.length; i++) {
        let value: number = parseFloat(totals[i].textContent!);

        totalValue = total += value;

        this.setState({ total: totalValue });
      }
    }, 10);

    return (
      <section className="container d-flex justify-content-center col-10 pt-3">
        <div className="container">
          <div className=" col-12 mb-2">
            <div className="cardTotal card justify-content-evenly flex-row col-12">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <p className="totalLabel">Valor total das vendas:</p>
                <p className="totalValue">
                  <span className="moneyLabel">R$</span>
                  {this.state.total.toFixed(2).replace(".", ",")}
                </p>
              </div>

              <div className="filter d-flex align-items-center">
                <i className="fa fa-filter" />

                <div className="dropdownFilter d-flex">
                  <ul className="dropdownMenuFilter d-flex align-items-center">
                    <li
                      onClick={() => {
                        this.filterByPeriod(7);
                      }}
                      className="ms-2"
                    >
                      7 dias
                    </li>
                    <p className="ms-2">|</p>
                    <li
                      onClick={() => {
                        this.filterByPeriod(30);
                      }}
                      className="ms-2"
                    >
                      30 dias
                    </li>
                    <p className="ms-2">|</p>
                    <li onClick={this.getAllSales} className="ms-2">
                      Todas
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mainDiv">
            {this.state.sales?.map((sale: any) => (
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
                      <span
                        onClick={() => {
                          this.getDate(sale.createdAt);
                        }}
                        className="totalLabel me-2"
                      >
                        Data: {this.formatDate(sale.createdAt)}
                      </span>
                    </div>
                    <div className="totalValue d-flex justify-content-between align-items-end me-4">
                      <p className="totalLabel mb-1"> Valor total: </p>

                      <div>
                        <span className="moneyLabel">R$</span>
                        <span className="total">
                          {sale.total.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </div>
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
  }
}

export default Sales;
