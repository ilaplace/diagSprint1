import React, { useState } from 'react';
import { Button } from "reactstrap";
import { useMutation }  from "@apollo/react-hooks";
import gql from "graphql-tag";

const START_TRAINING = gql`
  mutation StartTraining{
        startTraining
  }
`
const Learner = () => {

    const [status, setStatus] = useState("untrained");
    const [startTrain, {data}] = useMutation(START_TRAINING);

    const trainHandler = () => {
        setStatus("In training");
        startTrain();
    };
    return(
        <div>
            <h1>Learner</h1>
            <p>Your database is {status}</p>
            <Button color="primary" className="mt-3" 
                    onClick={trainHandler}>
                    Train
            </Button>{' '}

            <Button color="secondary" className="mt-3" 
                    onClick={()=>{setStatus("canceled")}}>
                    Cancel
            </Button>
        </div>
    )
};


export default Learner;