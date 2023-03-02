import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { styles } from "../../styles/profile.css";
import { Categories } from "../component/Categories.jsx";

export const Profile = () => {

  
  const { store, actions } = useContext(Context);
  const params = useParams();
  const id = params.id


  useEffect(() => {
    actions.cleanInput()
    actions.getUserAlt(id)
    actions.getUser(id)
  }, [id])

  return (
    <div className="profile mx-auto">
      
      <div className="container mt-5">
        <div className="row d-flex gx-5 justify-content-center mx-auto">
          <div className="col-12 col-md-3 d-flex justify-content-center p-0">
            <img
              src={store?.tempUserData?.img_url}
              className="rounded w-100 h-100"
              alt="..."
              
            />
          </div>
          <div className="col-12 col-md-8">
            <div className="card-body  border rounded d-flex flex-column justify-content-between h-100">
              
                <h2 className="display-5 mx-2 my-4">{store?.tempUserData?.username}</h2>
                <div className="user-props">
                  <div className="d-flex justify-content-between">
                      <div className="d-flex">
                      {store?.tempUserData?.publisherTypeValue != ""  ? (
                        <ul class="list-group margin-right"> 
                            
                              <li className="list-group-item">
                              <strong>Publicador</strong>
                              </li>
                              <li className="list-group-item">
                                {store?.tempUserData?.publisherTypeValue}
                              </li>

                        </ul>
                      ) : null} 
                        <ul class="list-group">
                            
                          <li className="list-group-item">
                          <strong>Seguidores:</strong> 2094
                          </li>
                          <li className="list-group-item">
                          <strong>Seguidos:</strong> 46
                          </li>         
                        </ul>
                      </div>
                      
                      <button className="btn btn-success">Seguir</button>
                  </div>
                </div>         
            </div>
          </div>
        </div>
      </div>
      <div className="container my-4">
        <div className="row d-flex justify-content-start mx-auto">
          <div className="col-12 col-md-8 no-padding-left">
            <div className="border rounded ">
              
              {(() => {
                if(store.userData.id == store.tempUserData.id){
                  if(store.userData?.publisherMode){
                    return (<>
                    <h5 className="display-5 m-4">Creadas</h5>
                    <Categories created="true"/> 
                    </>)
                  }else{
                    return (<>
                      <h5 className="display-5 m-4">Guardados</h5>
                      <Categories favorite="true"/>
                    </>)
                  }
                } else{
                  return (
                    <>
                    <h5 className="display-5 m-4">Creadas</h5>
                    <Categories created="true"/> 
                    </>
                  )
                }
              })()}
              
            </div>
          </div>
          <div className="col-12 col-md-4 border feedback rounded d-flex flex-column justify-content-between">
            <div className="m-1 my-2">
              <div className="border rounded feedback-msg mx-1 my-2"></div>
              <div className="border rounded feedback-msg mx-1 my-2"></div>
              <div className="border rounded feedback-msg mx-1 my-2"></div>
            </div>
            <div className="d-flex mx-2 mb-4">
              <input className="form-control-lg form-control mx-1" placeholder="¿Qué piensas?"></input>
              <button type="button" className="form-control mx-1 btn btn-outline-success send-btn">
               {'>'}
              </button>
            </div>
          </div>         
        </div>
      </div>
    </div>
  );
};
