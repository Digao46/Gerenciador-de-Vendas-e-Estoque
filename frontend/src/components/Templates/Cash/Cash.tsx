import React, { useEffect } from "react";

import "./Cash.scss";

const Cash = (props: any) => {
  useEffect(() => {
    props.props.getPath("/cash");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // filterToday = () => {
  //   const date = new Date();
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();

  //   const today = `${day}/${month}/${year}`;

  //   const salesToday = this.state.sales?.filter(
  //     (sale: any) => this.getDate(sale.createdAt) === today
  //   );

  //   this.setState({ sales: salesToday });
  // };

  return (
    <section className="container d-flex justify-content-around pt-3">
      Dados do Caixa Vão Aqui!!!
    </section>
  );
};

export default Cash;
