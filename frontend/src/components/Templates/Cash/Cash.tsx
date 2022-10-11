import React from "react";

import Charts from "../Charts/Charts";

import { getSales } from "../../../services/api";

import "./Cash.scss";

class Cash extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      allSales: [],
      salesToday: 0,
      todayQuantity: 0,
      salesLastWeek: 0,
      lastWeekQuantity: 0,
      salesLastMonth: 0,
      lastMonthQuantity: 0,
      periods: [7, 30],
    };
  }

  componentDidMount(): void {
    getSales()
      .then((res) => this.setState({ allSales: res.data }))
      .then(() => {
        setTimeout(() => {
          this.filterToday();
          this.filterPeriod(this.state.periods);
          console.log("rodou")
        }, 0);
      })
      .then(this.props.props.getPath("/cash"));
  }

  filterToday = () => {
    let date = new Date();
    let total = 0;

    const periodStart = this.getDate((date.setHours(0), date.setMinutes(0)));
    const periodEnd = new Date();

    const salesByPeriod = this.state.allSales?.filter(
      (sale: any) =>
        this.getDate(sale.createdAt) >= periodStart &&
        this.getDate(sale.createdAt) <= periodEnd
    );

    for (let i = 0; i < salesByPeriod.length; i++) {
      total += salesByPeriod[i].total;
    }

    this.setState({ salesToday: total });
    this.setState({ todayQuantity: salesByPeriod.length });
  };

  filterPeriod = (days: any) => {
    for (let i = 0; i < days.length; i++) {
      let date = new Date();
      let total = 0;

      const periodStart = this.getDate(date.setDate(date.getDate() - days[i]));
      const periodEnd = new Date();

      const salesByPeriod = this.state.allSales?.filter(
        (sale: any) =>
          this.getDate(sale.createdAt) >= periodStart &&
          this.getDate(sale.createdAt) <= periodEnd
      );

      for (let i = 0; i < salesByPeriod.length; i++) {
        total += salesByPeriod[i].total;
      }

      if (days[i] === 7) {
        this.setState({ salesLastWeek: total });
        this.setState({ lastWeekQuantity: salesByPeriod.length });
      } else {
        this.setState({ salesLastMonth: total });
        this.setState({ lastMonthQuantity: salesByPeriod.length });
      }
    }
  };

  getDate = (date: any) => {
    const newDate = new Date(date);
    return newDate;
  };

  render() {
    if (!this.state.allSales) {
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
        <section className="container d-flex flex-column align-items-center pt-3">
          <div className="container d-flex justify-content-around">
            <div className="card cashControl col-3">
              <div className="salesInfo d-flex flex-column justify-content-center">
                <span className="salesValue ms-4">
                  R${this.state.salesToday.toFixed(2).replace(".", ",")}
                </span>

                <span className="salesPeriod ms-3">Vendas Hoje</span>
              </div>

              <div className="cardFooter d-flex justify-content-center align-items-center">
                <p className="salesQuantity">
                  {this.state.todayQuantity} venda(s)
                </p>
              </div>
            </div>

            <div className="card cashControl col-3">
              <div className="salesInfo d-flex flex-column justify-content-center">
                <span className="salesValue ms-4">
                  R${this.state.salesLastWeek.toFixed(2).replace(".", ",")}
                </span>

                <span className="salesPeriod ms-3">Vendas (7 dias)</span>
              </div>

              <div className="cardFooter d-flex justify-content-center align-items-center">
                <p className="salesQuantity">
                  {this.state.lastWeekQuantity} venda(s)
                </p>
              </div>
            </div>

            <div className="card cashControl col-3">
              <div className="salesInfo d-flex flex-column justify-content-center">
                <span className="salesValue ms-4">
                  R${this.state.salesLastMonth.toFixed(2).replace(".", ",")}
                </span>

                <span className="salesPeriod ms-3">Vendas (30 dias)</span>
              </div>

              <div className="cardFooter d-flex justify-content-center align-items-center">
                <p className="salesQuantity">
                  {this.state.lastMonthQuantity} venda(s)
                </p>
              </div>
            </div>
          </div>

          <Charts periods={this.state.periods} />
        </section>
      );
    }
  }
}

export default Cash;
