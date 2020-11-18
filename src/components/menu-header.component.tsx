import React, { Fragment } from "react";

export const MenuHeader: React.FC = () => {
  return (
    <Fragment>
      <div className="header">
        <a href="/chart/user">Usuários por mês</a>
        <a href="/chart/weeding-types">Orçamento médio</a>
        <a href="/chart/weeding-count">Casamentos por ano</a>
        <a href="/chart/weeding-month">Casamentos por mês</a>
        <a href="/chart/weeding-month">Custo por número de convidados</a>
        <a href="/chart/weeding-month">Receita Anual de Fornecedores</a>
      </div>
    </Fragment>
  );
};
