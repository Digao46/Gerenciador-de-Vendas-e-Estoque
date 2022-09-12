import React, { useEffect } from "react";
import "./Cash.scss";

const Cash = (props: any) => {
  useEffect(() => {
    props.props.getPath("/cash");
  });
  return <section>Dados do Caixa Vão Aqui!!!</section>;
};

export default Cash;
