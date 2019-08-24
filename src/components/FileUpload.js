import React, {Component, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
const { Mutation } = require('react-apollo')

const UPLOAD = gql`
    mutation Upload($file: Upload! ){
        uploadImage(file: $file)
            
        
    }
`;
const Uploader = () => {
    const [selectedFile, setFile] = useState(null);
    const [upload, {data}] = useMutation(UPLOAD);
    const fileInput = React.createRef();
    
    const handleSubmit = (e) => {
        e.preventDefault();
            setFile(fileInput.current.files[0]);
            upload({variables: {selectedFile}})
            console.log(selectedFile)
     
    };

    
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Upload file:
                    <input type="file" ref={fileInput} />
                </label>
                <br />
                <button type="submit">Submit</button>

            </form>
        );
    
    
}
class FileUpload extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.state={
            selectedFile: null
        }
        
    };

    handleSubmit(event){
        event.preventDefault();
        if(this.state.selectedFile){
            const data = new FormData();
            data.append('file', this.state.selectedFile)
            //alert(`Selected file - ${this.fileInput.current.files[0].name}`)
        }else
        alert(`Selecte a file dumbass`)
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input type="file" ref={this.fileInput} />
                </label>
                <br />
                <button type="submit">Submit</button>

            </form>
        );
    }
}
export default Uploader;