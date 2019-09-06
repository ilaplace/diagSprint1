import React, { useState } from 'react';
import { Button } from "reactstrap";
import axios from 'axios'
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

const Diagnose = ({classifier, numberOfPatients}) => {

    // If condition the avoid this error if classifier could not be read
   
    
    var objects = [];

    for (var i = 0; i < classifier.length; i++) {
        objects.push({ value: '' });
    }

    // const grid = [
    //     [{ value: 'A', readOnly: true },
    //      { value: 'B', readOnly: true },
    //      { value: 'C', readOnly: true }]]

    const grid = []
    const header = []
    for (var k =0; k < classifier.length; k++){
        header.push({value: classifier[k], readOnly: true})
    }
    grid.push(header)

    for (var j = 0; j < numberOfPatients; j++) {
        grid.push(objects)
    }
    const [myState, setMyState] = useState(grid)

    const sendToServer = async (data) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post("http://127.0.0.1:3010/api/diagnose",
                data, { headers: { Authorization: token ? `Bearer ${token}` : "" } });
            console.log(response);
        }catch (error) {
            console.error(error)
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        sendToServer(myState);
    };
    return (
        <div>
            <h1>Diagnose</h1>
            <ReactDataSheet
                data={myState}
                overflow={'wrap'}
                valueRenderer={(cell) => cell.value}
                onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
                onCellsChanged={changes => {
                    const grid = myState.map(row => [...row])
                    changes.forEach(({ cell, row, col, value }) => {
                        grid[row][col] = { ...grid[row][col], value }
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