import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'

// import "./request.css"

export default function EditForm(props){
    const [showModal, setShowModel] = useState(props.showEdit);
    const [showError, setShowError] = useState(false);
    const [FormDetails, setFormDetails] = useState({});

    function toggleModal(){
        setShowModel(!showModal);
        props.toggleEdit();
    }

    useEffect(() => {
        const editObj = {
          name: props.data.name || '',
          source: props.data.source || '',
          destination: props.data.destination || '',
          date: props.data.date || '',
          time: props.data.time || '',
          passengerCount: props.data.passengerCount || 1,
        };
        setFormDetails(editObj);
      },[props.data.name, props.data.source, props.data.destination, props.data.date, props.data.passengerCount, props.data.time]);

      useEffect(() => {
        const show = props.showEdit;
        setShowModel(show);
      },[props.showEdit]);

    const updateForm = (e) =>{
        var val;
        e.target.name === "passengerCount" ? val = parseInt(e.target.value) : val = e.target.value ;
        setFormDetails({
            ...FormDetails,
            [e.target.name] : val,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(FormDetails.name === "" || FormDetails.pickup === "" || FormDetails.drop === "" || FormDetails.time === "" || FormDetails.date === ""){
            setShowError(true);
            return;
        }
        props.updatefunc(props.data.id , FormDetails);
        toggleModal();
        setShowError(false);
    };

    if(!showModal){
        return (
            <>
            </>
        );
        
    }


    return (
        <>
        <div className="modalBG">
        <div onClick={props.toggleEdit} className="modalBG"></div>
        <div className="addReq">
        <div className="closediv">
            <h2>Edit request</h2>
            <button className="closebutton" onClick={props.toggleEdit}><FontAwesomeIcon className="xIcon" icon={faXmark}/></button>
        </div>
        <form>
        <label>
        Name <input
                type="text"
                name="name"
                className="formInput"
                value={FormDetails.name}
                onChange={(e)=>updateForm(e)}/>
        </label>
        <label>
        Pickup <input
                type="text" 
                name="source"
                value={FormDetails.source}
                className="formInput"
                onChange={(e)=>updateForm(e)}/>
        </label>
        <label>
        Drop <input
                type="text"
                name="destination"
                value={FormDetails.destination}
                className="formInput"
                onChange={(e)=>updateForm(e)}/>
        </label>
        <label>
        Date  <input
                type="date"
                name="date"
                value={FormDetails.date}
                onChange={(e)=>updateForm(e)}/>
        </label>
        <span>
        <label className="timecontainer">
        Time <input
                type="time"
                name="time"
                value={FormDetails.time}
                onChange={(e)=>updateForm(e)}/>
        </label>
        </span>
        <p>
            <label>
            Number of People:
            <br/>
            <input
                type="range"
                name="passengerCount"
                min="1" max="6" step="1"
                value={FormDetails.passengerCount}
                onChange={(e)=>updateForm(e)}  
            >
            </input>
            </label>
            {FormDetails.passengerCount}
        </p>
        {showError && <p className="error">Fields Cannot Be Empty!</p>}
        <input type="submit" className="PrimaryBtn" onClick={handleSubmit}/>
        <input type="button" value="Cancel" className="SecondaryBtn" onClick={toggleModal}/> 
    </form>
    </div>
    </div>
    </>
    );
}


