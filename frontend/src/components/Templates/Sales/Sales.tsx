import React from "react";
import { getSales } from "../../../services/api";

import "./Sales.scss";

class Sales extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      sales: 0,
      total: 0,
    };
  }

  componentDidMount(): void {
    this.getAllSales().then(() => {
      this.props.props.getPath("/sales");
    });
  }

  getAllSales = async () => {
    await getSales().then((res) => {
      this.setState({ sales: res.data.sort((a: any, b: any) => b.id - a.id) });
    });
  };

  sortByDate = (oldNew: string) => {
    if (oldNew === "newestFirst") {
      this.setState({
        sales: this.state.sales.sort((a: any, b: any) => b.id - a.id),
      });
    } else {
      this.setState({
        sales: this.state.sales.sort((a: any, b: any) => a.id - b.id),
      });
    }
  };

  sortByPrice = (lowOrHigh: string) => {
    let prices: any = [];

    for (let i = 0; i < this.state.sales.length; i++) {
      prices.push(this.state.sales[i]);
    }

    if (lowOrHigh === "higher") {
      let higherPrice = this.state.sales.sort(
        (a: any, b: any) => b.total - a.total
      );

      this.setState({ sales: higherPrice });
    } else {
      let lowerPrice = this.state.sales.sort(
        (a: any, b: any) => a.total - b.total
      );

      this.setState({ sales: lowerPrice });
    }
  };

  filterByPeriod = (days: number) => {
    this.getAllSales().then(() => {
      let date = new Date();

      setTimeout(() => {
        const periodStart = this.getDate(date.setDate(date.getDate() - days));
        const periodEnd = new Date();

        const salesByPeriod = this.state.sales?.filter(
          (sale: any) =>
            this.getDate(sale.createdAt) >= periodStart &&
            this.getDate(sale.createdAt) <= periodEnd
        );

        this.setState({
          sales: salesByPeriod.sort((a: any, b: any) => b.id - a.id),
        });
      }, 0);
    });
  };

  getDate = (date: any) => {
    const newDate = new Date(date);
    return newDate;
  };

  formatDate = (date: any) => {
    const newDate = this.getDate(date);

    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    const shownDate = `${day}/${month}/${year}`;

    return shownDate;
  };

  render() {
    setTimeout(() => {
      const totals = document.querySelectorAll("span.total");
      let total = 0;

      for (let i = 0; i < totals.length; i++) {
        let value: number = parseFloat(totals[i].textContent!);
        let totalvalue = (total += value);

        this.setState({ total: totalvalue });
      }
    }, 0);

    if (!this.state.sales) {
      return (
        <section className="container d-flex flex-column align-items-center justify-content-center col-10 pt-3">
          <div>
            <p> Ainda não existem registros para serem exibidos! </p>
          </div>

          <div className="info text-end">
            <p>Clique aqui</p>

            <i className="fa fa-arrow-right"></i>
          </div>
        </section>
      );
    } else {
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
                  <div>
                    <span>Escolha um período:</span>
                    <div className="d-flex justify-content-center align-items-center">
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

                <div className="filter d-flex align-items-center">
                  <div>
                    <span>Ordenar:</span>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="fa fa-arrow-up-9-1" />

                      <div className="dropdownFilter d-flex">
                        <ul className="dropdownMenuFilter d-flex align-items-center">
                          <li
                            onClick={() => {
                              this.sortByDate("newestFirst");
                            }}
                            className="ms-2"
                          >
                            Mais Recentes
                          </li>
                          <p className="ms-2">|</p>
                          <li
                            onClick={() => {
                              this.sortByDate("oldestFirst");
                            }}
                            className="ms-2"
                          >
                            Mais Antigas
                          </li>
                          <p className="ms-2">|</p>
                          <li
                            onClick={() => {
                              this.sortByPrice("higher");
                            }}
                            className="ms-2"
                          >
                            Maior Valor
                          </li>
                          <p className="ms-2">|</p>
                          <li
                            onClick={() => {
                              this.sortByPrice("lower");
                            }}
                            className="ms-2"
                          >
                            Menor Valor
                          </li>
                        </ul>
                      </div>
                    </div>
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
}

export default Sales;
