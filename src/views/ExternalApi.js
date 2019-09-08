import React , { useState } from "react";
import FileUpload  from "../components/FileUpload";
import axios from 'axios';
import { Alert } from 'reactstrap';

const ExternalApi = () => {
  const [success, setSuccess] = useState(false);

  const sendToServer = async (data) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post("http://127.0.0.1:3010/api/upload",
            data, { headers: { Authorization: token ? `Bearer ${token}` : "" } });
        console.log(response);
        setSuccess(true)
    } catch (error) {
        console.error(error)
    }

};
  
  return (
    <>
      <div className="mb-5">
        {success ? <Alert>Done</Alert> : null}
        <h1>Databases</h1>
        <p>
          You can upload your database from here!
        </p>
        <div> <FileUpload sendToServer={sendToServer}/> </div>
      </div>
      
        {/* <div className={`result-block ${showResult && "show"}`}> */} 

    </>
  );
};

export default ExternalApi;
