import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button } from 'reactstrap'

const DELETE_DATABASE = gql`
    mutation DeleteDatabase{
        deleteDatabase

}`

const Uploader = () => {
    const [selectedFile, setFile] = useState(null);
    const [deleteDatabase] = useMutation(DELETE_DATABASE);
    const fileInput = React.createRef();

    // TODO: Show error to the user
    // TODO: Show that the upload is done
    const sendToServer = async (data) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post("http://127.0.0.1:3010/api/upload",
                data, { headers: { Authorization: token ? `Bearer ${token}` : "" } });
            console.log(response);
        } catch (error) {
            console.error(error)
        }

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("in submit");

        const data = new FormData();
        data.append('file', selectedFile);
        sendToServer(data);

    };
    const stil = {
        width: '50%'
    }
    return (
        <>
            <form className="input-group" style={stil} onSubmit={handleSubmit}>
                <div className="input-group-prepend">
                    <button type="submit" className="input-group-text">Upload</button>
                </div>
                <div className="custom-file">
                    <input type="file"
                        className="custom-file-input"
                        aria-describedby="inputGroupFileAddon01"
                        ref={fileInput}
                        onChange={(e) => { setFile(e.target.files[0]) }} />
                    <label className="custom-file-label">
                        {selectedFile ? (selectedFile.name) : "Choose File"}

                    </label>
                </div>
            </form>
            <Button className="my-3" color="danger" onClick={() => { deleteDatabase() }}>Delete Database</Button>
            {/* <form onSubmit={handleSubmit}>
                <label>
                    Upload file:
                    {' '} <input type="file" 
                            ref={fileInput} 
                            onChange={(e)=>{setFile(e.target.files[0])}}/> 
                </label>
                <br />
                <button type="submit">Submit</button>
            </form> */}
        </>
    );


}

export default Uploader;