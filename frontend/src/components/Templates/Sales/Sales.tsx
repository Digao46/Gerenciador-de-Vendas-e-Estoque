import React from "react";
import { DatePicker, Space } from "antd";
import { toast } from "react-hot-toast";

import { getSales } from "../../../services/api";
import { isAuthenticated } from "../../../services/auth";

import "./Sales.scss";
import { Redirect } from "react-router";

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

class Sales extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      sales: [],
      total: 0,
      periodBegin: "",
      periodEnd: "",
    };
  }

  componentDidMount(): void {
    if (!isAuthenticated()) {
      this.setState({ redirectTo: "/login" });
    }

    this.props.props.setTitle("Vendas");

    this.getAllSales().then(() => {
      let total = 0;

      for (let i = 0; i < this.state.sales.length; i++) {
        total += this.state.sales[i].total;
      }

      this.setState({ total: total });
    });
  }

  getAllSales = async () => {
    await getSales()
      .then((res) => {
        this.setState({
          sales: res.data.sales.sort((a: any, b: any) => b.id - a.id),
        });
      })
      .catch((err: any) => {
        if (err.response.status === 401) {
          toast.error(err.response.data.message);

          this.setState({ redirectTo: "/login" });

          localStorage.removeItem("user");

          return;
        } else {
          toast.error(err.response.data.message);

          this.setState({ redirectTo: "/" });
        }
      });
  };

  filterByCustomPeriod = (e: any) => {
    e.preventDefault();

    this.getAllSales()
      .then(() => {
        setTimeout(() => {
          const begin = this.getDate(this.state.periodBegin);
          begin.setHours(0);
          begin.setMinutes(0);
          const end = this.getDate(this.state.periodEnd);
          end.setHours(23);
          end.setMinutes(59);

          const salesByPeriod = this.state.sales?.filter(
            (sale: any) =>
              this.getDate(sale.createdAt) >= this.getDate(begin) &&
              this.getDate(sale.createdAt) <= this.getDate(end)
          );

          this.setState({
            sales: salesByPeriod.sort((a: any, b: any) => b.id - a.id),
          });
        }, 0);
      })
      .then(() => {
        setTimeout(() => {
          let total = 0;

          for (let i = 0; i < this.state.sales.length; i++) {
            total += this.state.sales[i].total;
          }

          this.setState({ total: total });
        }, 20);
      })
      .then(() => {
        toast.success("Filtro Aplicado");
      })
      .catch(() => {
        toast.error("Não foi possível aplicar o filtro!");
      });
  };

  handleChange = (e: any) => {
    this.getAllSales().then(() => {
      if (e) {
        const dateBegin = this.getDate(e[0]._d);
        const dateEnd = this.getDate(e[1]._d);

        this.setState({ periodBegin: dateBegin });
        this.setState({ periodEnd: dateEnd });
      }
      setTimeout(() => {
        let total = 0;

        for (let i = 0; i < this.state.sales.length; i++) {
          total += this.state.sales[i].total;
        }

        this.setState({ total: total });
      }, 20);
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
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    if (!this.state.sales) {
      return (
        <section className="container d-flex flex-column align-items-center justify-content-center col-10 pt-3">
          <div className="infoText">
            <p> Ainda não existem registros para serem exibidos! </p>
          </div>

          <div className="info text-end">
            <p>Clique aqui</p>

            <i className="fa fa-arrow-right"></i>
          </div>
        </section>
      );
    }

    return (
      <section className="container d-flex justify-content-center col-10 pt-3">
        <div className="container row d-flex justify-content-center">
          <div className="d-flex col-3 mb-2">
            <div className="cardTotal card justify-content-evenly col-12">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <p className="totalLabel">Valor total das vendas:</p>
                <p className="totalValue">
                  <span className="moneyLabel">R$</span>
                  {this.state.total.toFixed(2).replace(".", ",")}
                </p>
              </div>

              <div className="filter d-flex flex-column justify-content-center align-items-center">
                <span>Escolha um período:</span>

                <div className="formFilter d-flex justify-content-center align-items-center mt-2">
                  <form
                    className="d-flex flex-column align-items-center"
                    onSubmit={this.filterByCustomPeriod}
                  >
                    <Space direction="vertical" className="mb-1 col-11">
                      <RangePicker
                        format={dateFormat}
                        onChange={this.handleChange}
                      />
                    </Space>
                    <button
                      type="submit"
                      className="btn d-flex justify-content-center align-items-center mb-1"
                    >
                      <i className="fa fa-search" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="mainDiv col-8">
            {this.state.sales.length > 0 ? (
              this.state.sales?.map((sale: any) => (
                <div
                  className="container d-flex justify-content-center"
                  key={sale.id}
                >
                  <div className="sale card col-7 d-flex flex-row justify-content-center align-items-center mb-2 me-2">
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

                  <div className="products card d-flex justify-content-center col-4">
                    <div className="title d-flex justify-content-around">
                      <p className="itemsLabel col-6 "> Items: </p>
                      <p className="itemsLabel col-4"> Qtd: </p>
                    </div>

                    <div className="productsList d-flex flex-column justify-content-center">
                      {sale.products.map((product: any, i: any) => (
                        <div
                          key={i}
                          className="productArea d-flex justify-content-center"
                        >
                          {sale.products[i].length > 10 ? (
                            <p className="productName d-flex justify-content-center align-items-center col-6 text-start">
                              {sale.products[i][0]}
                              {sale.products[i][1]}
                              {sale.products[i][2]}
                              {sale.products[i][3]}
                              {sale.products[i][4]}
                              {sale.products[i][5]}
                              {sale.products[i][6]}
                              {sale.products[i][7]}
                              {sale.products[i][8]}
                              {sale.products[i][9]}
                              {sale.products[i][10]}
                              {sale.products[i][11]}
                              {sale.products[i][12]}...
                            </p>
                          ) : (
                            <p className="productName d-flex justify-content-center align-items-center col-6 text-start">
                              {sale.products[i]}
                            </p>
                          )}

                          <p className="d-flex justify-content-center align-items-center col-1">
                            |
                          </p>
                          <p className="soldQuantity d-flex justify-content-center align-items-center col-4">
                            {sale.quantity[i]}
                            <span className="unity ms-1">uni.</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <section className="container d-flex flex-column align-items-center justify-content-center col-10 pt-3">
                <div>
                  <p>
                    Não existem registros nesse período para serem exibidos!
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Sales;
