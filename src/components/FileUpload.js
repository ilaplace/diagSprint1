import React, {Component} from 'react';


class FileUpload extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.state={
            selectedFile: null
        }
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.selectedFile){
        alert(`Selected file - ${this.fileInput.current.files[0].name}`)
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
export default FileUpload;