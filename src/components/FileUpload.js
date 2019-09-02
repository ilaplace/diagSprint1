import React, { useState} from 'react';
import axios from 'axios';


const Uploader = () => {
    const [selectedFile, setFile] = useState(null);
    const fileInput = React.createRef();
    
    // TODO: Show error to the user
    // TODO: Show that the upload is done
    const sendToServer = async (data)=> {
        const token = localStorage.getItem('token');
  
        try{
            const response = await axios.post("http://127.0.0.1:3010/api/upload",
                    data, { headers: {Authorization: token ? `Bearer ${token}` : ""}});
            console.log(response);
        }catch(error){
            console.error(error)
        }
        
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', selectedFile);
        sendToServer(data);
        
    };
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Upload file:
                    <input type="file" 
                            ref={fileInput} 
                            onChange={(e)=>{setFile(e.target.files[0])}}/>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    
    
}

export default Uploader;