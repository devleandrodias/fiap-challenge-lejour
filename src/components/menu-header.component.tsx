import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const MenuHeader: React.FC = () => {
  return (
    <Fragment>
      <div className="header">
        <Link to="/chart/user">Usuários por mês</Link>
        <Link to="/chart/weeding-types">Orçamento médio</Link>
        <Link to="/chart/weeding-count">Casamentos por ano</Link>
        <Link to="/chart/weeding-month">Casamentos por mês</Link>
        <Link to="/chart/weeding-month">Custo por número de convidados</Link>
        <Link to="/chart/weeding-month">Receita Anual de Fornecedores</Link>
      </div>
    </Fragment>
  );
};
