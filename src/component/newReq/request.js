import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'

import "./request.css"

export default function Request(props){
    const [showModal, setShowModel] = useState(false);
    // console.log(props.editData)
    const [showError, setShowError] = useState(false);
    const [FormDetails, setFormDetails] = useState({
        name: "",
        pickup: "",
        drop: "",
        date: "",
        time: "",
        PassengerCount: 1
    })

    function toggleModal(){
        setShowModel(!showModal);
        setShowError(false);
    }


    const updateForm = (e) =>{
        var val;
        e.target.name === "PassengerCount" ? val = parseInt(e.target.value) : val = e.target.value ;
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
        props.updatefunc(FormDetails);
        setFormDetails({
            name: "",
            pickup: "",
            drop: "",
            date: "",
            time: "",
            PassengerCount: 1
        });
        toggleModal();
    };

    return (
        <>
        <button onClick={toggleModal} className="PrimaryBtn navbarBtn"> + Add Request</button>
        
        {showModal && <div className="modalBG">
        <div onClick={toggleModal} className="modalBG"></div>
        <div className="addReq">
        <div className="closediv">
            <h2>Add request</h2>
            <button className="closebutton" onClick={toggleModal}><FontAwesomeIcon className="xIcon" icon={faXmark}/></button>
        </div>
        <form onSubmit={handleSubmit}>
        <label>
        Name <input
                type="text"
                name="name"
                required
                className="formInput"
                onChange={(e)=>updateForm(e)}/>
        </label>
        <label>
        Pickup <input
                type="text" 
                name="pickup"
                required
                className="formInput"
                onChange={(e)=>updateForm(e)}/>
        </label>
        <label>
        Drop <input
                type="text"
                name="drop"
                required
                className="formInput"
                onChange={(e)=>updateForm(e)}/>
        </label>
        <label>
        Date  <input
                type="date"
                name="date"
                required
                onChange={(e)=>updateForm(e)}/>
        </label>
        <span>
        <label className="timecontainer">
        Time <input
                type="time"
                name="time"
                required
                onChange={(e)=>updateForm(e)}/>
        </label>
        </span>
        <p>
            <label>
            Number of People:
            <br/>
            <input
                type="range"
                name="PassengerCount"
                required
                min="1" max="6" step="1"
                value={FormDetails.PassengerCount}
                onChange={(e)=>updateForm(e)}  
            >
            </input>
            </label>
            {FormDetails.PassengerCount}
        </p>
        {showError && <p className="error">Fields Cannot Be Empty!</p>}
        <input type="submit" className="PrimaryBtn" onClick={handleSubmit}/>
        <input type="button" value="Cancel" className="SecondaryBtn" onClick={toggleModal}/>    
    </form>
    </div>
    </div>}
    </>
    );
}


