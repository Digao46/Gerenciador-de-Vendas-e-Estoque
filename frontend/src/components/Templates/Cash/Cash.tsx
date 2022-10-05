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
      salesLastWeek: 0,
      salesLastMonth: 0,
    };
  }

  componentDidMount(): void {
    this.getAllSales().then(() => {
      this.props.props.getPath("/cash");
    });
  }

  getAllSales = async () => {
    const periods = [1, 7, 30];

    await getSales()
      .then((res) => {
        this.setState({ allSales: res.data });
      })
      .then(() => {
        this.filterPeriod(periods);
      });
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

      if (days[i] === 1) {
        this.setState({ salesToday: total });
      } else if (days[i] === 7) {
        this.setState({ salesLastWeek: total });
      } else {
        this.setState({ salesLastMonth: total });
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
            <div className="card cashControl d-flex justify-content-center align-items-center col-3">
              <div className="row w-100 h-80">
                <span>Vendas Hoje</span>

                <span>
                  R${this.state.salesToday.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            <div className="card cashControl d-flex justify-content-center align-items-center col-3">
              <div className="row w-100 h-80">
                <span>Vendas nos últimos 7 dias</span>

                <span>
                  R${this.state.salesLastWeek.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            <div className="card cashControl d-flex justify-content-center align-items-center col-3">
              <div className="row w-100 h-80">
                <span>Vendas nos últimos 30 dias</span>

                <span>
                  R${this.state.salesLastMonth.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          </div>

          <div className="charts">
            <Charts />
          </div>
        </section>
      );
    }
  }
}

export default Cash;
