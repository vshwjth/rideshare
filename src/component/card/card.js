import "./card.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendar, faUsers, faLocationDot, faClock, faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'


export default function Card(props){
    function formatDate(dateString) {
        const dateParts = dateString.split('-'); // Split the date string into year, month, and day parts
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript's Date object
        const day = parseInt(dateParts[2]);
        
        const formattedDate = new Date(year, month, day).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      
        return formattedDate;
      }
    
   
    return (
      <div className="card"> 
        <div>
          <p className="Name">{props.name}</p> <span><FontAwesomeIcon className="Icon" icon={faUsers}/> {props.passengerCount}</span>
          <button className="editBtn" onClick={() => {props.editReq(props.id)}}><FontAwesomeIcon className="editIcon" icon={faPenToSquare}/></button>
          <button className="delBtn" onClick={() => {props.deleteReq(props.id)}}><FontAwesomeIcon className="trashIcon" icon={faTrash}/></button>
        </div>
        <hr></hr>
        <div>
			<FontAwesomeIcon className="Icon" icon={faLocationDot}/> 
			<div className="Loc"> {props.pickup} </div>
			<div className="line">|   </div>
			<FontAwesomeIcon className="Icon"  icon={faLocationDot}/>         
			<p className="Loc">{props.drop}</p>
		</div>
        <hr/>
        <div className="dateTimeDiv">
            <FontAwesomeIcon className="Icon"  icon={faCalendar}/>         
            <p className="Date">{formatDate(props.date)}</p>
            <FontAwesomeIcon className="Icon"  icon={faClock}/>         
            <p className="Date">{props.time}</p>
        </div>
      </div>
    );
  };
  