import React from "react";
import { Chart } from "react-google-charts";

import { getSales } from "../../../services/api";

class Charts extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      sales: [],
      todayData: [],
      todayQuantity: 0,
      lastWeekQuantity: 0,
      lastMonthQuantity: 0,
      allSalesQuantity: 0,
    };
  }

  componentDidMount(): void {
    getSales()
      .then((res) => {
        this.setState({ sales: res.data.sales });
        this.setState({ allSalesQuantity: this.state.sales.length });
      })
      .then(() => {
        this.filterSalesToday();
        this.filterSalesPeriod(this.props.periods);
      });
  }

  getDate = (date: any) => {
    const newDate = new Date(date);
    return newDate;
  };

  filterSalesToday = () => {
    let date = new Date();

    let formatedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    let data = [[formatedDate, "Valor"]];

    const periodStart = this.getDate((date.setHours(0), date.setMinutes(0)));
    const periodEnd = new Date();

    const salesByPeriod = this.state.sales?.filter(
      (sale: any) =>
        this.getDate(sale.createdAt) >= periodStart &&
        this.getDate(sale.createdAt) <= periodEnd
    );

    for (let i = 0; i < salesByPeriod.length; i++) {
      let gotDate = this.getDate(salesByPeriod[i].createdAt);

      let time = `${gotDate.getHours()}:${gotDate.getMinutes()}`;

      let newData = [time, salesByPeriod[i].total];

      data.push(newData);
    }

    this.setState({ todayData: data });

    this.setState({ todayQuantity: salesByPeriod.length });
  };

  filterSalesPeriod = (days: any) => {
    for (let i = 0; i < days.length; i++) {
      let date = new Date();

      const periodStart = this.getDate(date.setDate(date.getDate() - days[i]));
      const periodEnd = new Date();

      const salesByPeriod = this.state.sales?.filter(
        (sale: any) =>
          this.getDate(sale.createdAt) >= periodStart &&
          this.getDate(sale.createdAt) <= periodEnd
      );

      if (days[i] === 7) {
        this.setState({ lastWeekQuantity: salesByPeriod.length });
      } else {
        this.setState({ lastMonthQuantity: salesByPeriod.length });
      }
    }
  };

  render() {
    let optionsPeriod = {
      chart: {
        title: "Vendas",
        subtitle: "Vendas (Período)",
        colors: ["#24212a", "#24212a", "#24212a", "#24212a", "#24212a"],
      },
    };

    let dataPeriod = [
      ["Periodo", "Vendas"],
      ["Hoje", this.state.todayQuantity],
      ["7 Dias", this.state.lastWeekQuantity],
      ["30 Dias", this.state.lastMonthQuantity],
      ["Todas", this.state.allSalesQuantity],
    ];

    let optionsToday = {
      chart: {
        title: "Vendas",
        subtitle: "Vendas (Hoje)",
      },
    };

    let dataToday = this.state.todayData;

    return (
      <section className="container d-flex justify-content-center align-items-center mt-4">
        <div className="d-flex justify-content-center col-5">
          <Chart className="dark"
            chartType="Bar"
            data={dataPeriod}
            options={optionsPeriod}
            width={"90%"}
            height={"400px"}
          />
        </div>
        <div className="d-flex justify-content-center col-5">
          <Chart
            chartType="Bar"
            data={dataToday}
            options={optionsToday}
            width={"90%"}
            height={"400px"}
          />
        </div>
      </section>
    );
  }
}

export default Charts;
