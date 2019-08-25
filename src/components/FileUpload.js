import React, { useState} from 'react';
import axios from 'axios';


const Uploader = () => {
    const [selectedFile, setFile] = useState(null);
    const fileInput = React.createRef();
    
    const sendToServer = async (data)=> {
        const response = await axios.post("http://localhost:5000",
                    data, {});
        console.log(response);
        
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append(selectedFile.name, selectedFile);
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