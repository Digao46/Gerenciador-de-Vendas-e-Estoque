import React, { useEffect } from "react";
import "./Cash.scss";

const Cash = (props: any) => {
  useEffect(() => {
    props.props.getPath("/cash");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="container d-flex justify-content-around pt-3">
      Dados do Caixa Vão Aqui!!!
    </section>
  );
};

export default Cash;
