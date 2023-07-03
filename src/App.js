import Request from "./component/newReq/request";
import axios from "axios";
import "./App.css"
import { useState, useEffect } from "react";
import ReqList from "./component/requestList/requestlist";
import SearchBar from "./component/searchbar/searchbar";
import EditForm from "./component/editform/editform";


const baseURL = "https://b6ed-103-191-90-42.ngrok-free.app";
const App = () => {
    const [rides, setRides] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [show404, setShow404] = useState(false);
    const [clearSearch, setClearSearch] = useState(false);
    const [editData, setEditData] = useState(
      {
        "name": "",
        "source":"",
        "destination":"",
        "date":"",
        "time":"",
        "passengerCount": 0,
      }
    );

    const sortRides = (data) => {
      return data.sort((a,b) => a.id - b.id)
    } 

    const fetchRides = async () => {
      try {
        const response = await axios.get(baseURL+'/rides', {
          headers: {
            'ngrok-skip-browser-warning': '1',
          },
        });
        setRides(sortRides(response.data));
        setShow404(false);
        setClearSearch(false);
      } catch (error) {
        console.error(error);
        setShow404(true);
      }
    };

    useEffect(() => {
      fetchRides()
    })
    

    const filteredData = async (query) =>{
      if(query === ""){
        fetchRides();
        return;
      }
      const url = baseURL + '/rides/search?source=' + query + '&destination=' + query;
      try {
        const response = await axios.get(url, {
          headers: {
            'ngrok-skip-browser-warning': '1',
          },
        });
        setRides(response.data);
        setClearSearch(true);
      } catch (error) {
        console.log(error.response.data)
      }
    };

    const deleteReq = async (id) => {
      console.log(id);
      const url = baseURL + '/rides/cancel?id=' + id;
      console.log(url);
      try{
        const response = await axios.delete(url,
        // withCredentials: false,
        {
            'Access-control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
        });
        console.log(response);
        fetchRides();
      } catch (error){
        console.log(error);
      }
    };

    const openEdit = async (id) => {
      const url = baseURL + '/rides/search?id=' + id;
      try{
        const response = await axios.get(url, {
          headers: {
            'ngrok-skip-browser-warning': '1',
          },
        });
        setEditData(response.data[0]);
        // console.log(response);
        setShowEdit(true);
      }catch(error){

      }
    };

    const editReq = async (id, data) => {
      const url = baseURL + '/rides/edit?id=' + id;
      try{
        await axios.put(url, data, {
          headers: {
            'ngrok-skip-browser-warning': '1',
          },
        });
        // console.log(response);
        fetchRides();
      }catch(error){
        console.error(error);
      }
    }

    const toggleEdit = () => {
      setShowEdit(!showEdit);
    }

    const addData = async (details) => {
      const newDetails = {
        'name': details.name,
        'source': details.pickup,
        'destination': details.drop,
        'time': details.time,
        'date': details.date,
        'passengerCount': details.PassengerCount
      }
      console.log(newDetails);
      try {
        const response = await axios.post(baseURL + '/rides/request', newDetails, 
        {
            'Access-control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
        });
        console.log(response);
        fetchRides();
      } catch (error) {
        console.error(error);
      }
    };
    
   
    return(
          <>
            <section className="navBar">
              <h1><span style={{fontWeight: "bolder"}}>Ride</span><span style={{fontWeight: "normal"}}>Share</span></h1>
              <Request updatefunc={addData}/>
              <SearchBar filteredData={filteredData}/>
              {clearSearch && <button onClick={() => {fetchRides(); }} className="SecondaryBtn clearsrch">Clear Search</button>}
            </section>
            <section>
              <ReqList data={rides} deleteReq={deleteReq} editReq={openEdit} show404={show404}/>
              <EditForm showEdit={showEdit} updatefunc={editReq} data={editData} toggleEdit={toggleEdit}/>
            </section>
            
          </>
    );
}

export default App;


