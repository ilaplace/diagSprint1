import React , {useState }from 'react';
import { Button } from "reactstrap";
import axios from 'axios'
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

const Diagnose = (props) => {
    
    const typesOfFeatures = props.classifier.getClassifier.numberOfFeatureTypes
    var objects = [];

    for (var i = 0; i < typesOfFeatures; i++){
        objects.push({ value: ''});
    }
    const grid = [
        [
          {value: 'A', readOnly: true},
          {value: 'B', readOnly: true},
          {value: 'C', readOnly: true}
        ]
      ]
      grid.push(objects)
    const [myState, setMyState] = useState(grid)
  


    const sendToServer = async (data)=> {
        const token = localStorage.getItem('token');
  
        try{
            const response = await axios.post("http://127.0.0.1:3010/api/diagnose",
                    data, { headers: {Authorization: token ? `Bearer ${token}` : ""}});
            console.log(response);
        }catch(error){
            console.error(error)
        }
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendToServer(myState);
        
    };

    return(
        <div>
            <h1>Diagnose</h1>
            <ReactDataSheet
                data={myState}
                overflow={'wrap'}
                valueRenderer={(cell) => cell.value}
                onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
                onCellsChanged={changes => {
                const grid = myState.map(row => [...row])
                changes.forEach(({cell, row, col, value}) => {
                    grid[row][col] = {...grid[row][col], value}
                })
          setMyState(grid)
        }}
      />
        
        <Button color="primary" className="mt-5" onClick={handleSubmit}>
          Submit
        </Button>
        <br />
            
        </div>
    )
}

export default Diagnose;