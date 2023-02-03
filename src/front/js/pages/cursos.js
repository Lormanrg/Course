import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../tools/searchBar";

import { Context } from "../store/appContext";

export const Cursos = () => {
  const { store, actions } = useContext(Context);

  return (
  <>
    <div className="container text-center border rounded mt-5 h-100 w-100 d-flex justify-content-end flex-column p-4">

      <div className="d-flex justify-content-between w-100">
        <h3>Cursos</h3>
        <SearchBar />
      </div>

      {/* Lorman - Categorias */}
      <div className="m-5"><p>Aqui van las categorias</p></div>  
      

      <div className="d-flex justify-content-end w-100">
        <Link to="/">
          <button className="btn btn-primary">Back home</button>
        </Link>
      </div>
    
		</div>
  </> 
  );
};
