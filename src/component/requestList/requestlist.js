// import { useState } from "react";
import Card from "../card/card";
import "./requestlist.css"


export default function ReqList(props){
    return(
      <>
    <div className="card-list">
    {props.show404 && <div className="errordiv">Uh-oh! Some error has occured.</div>}
    {props.data.length === 0 && !props.show404 && <div className="errordiv">There are no requests right now.<br/>Add one using the "Add Request" Button.</div>}
      {props.data.map((request, index) => (
        <Card key={index} id={request.id} name={request.name} pickup={request.source} drop={request.destination}
                passengerCount={request.passengerCount} deleteReq={props.deleteReq} editReq={props.editReq} date={request.date} time={request.time}/>
      ))}
    </div>
    </>
    );    
};