import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const MenuHeader: React.FC = () => {
  return (
    <Fragment>
      <div className="header">
        <Link to="/chart/user">Usuários por mês</Link>
        <Link to="/chart/weeding-types">Tipos de casamentos</Link>
        <Link to="/chart/weeding-count">Orçamento anual</Link>
        <Link to="/chart/weeding-month">Casamentos por mês</Link>
        <Link to="/chart/guests-by-budget">Convidados por Orçamento</Link>
        <Link to="/chart/invoice-amount">Montante anual de fornecedores</Link>
      </div>
    </Fragment>
  );
};
