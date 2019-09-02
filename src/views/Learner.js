import React, { useState } from 'react';
import { Button } from "reactstrap";
import { useMutation, useQuery }  from "@apollo/react-hooks";
import gql from "graphql-tag";


const START_TRAINING = gql`
  mutation StartTraining{
        startTraining
  }
`
const CHECK_STATUS = gql`
    query CheckStatus{
        checkStatus
    }
`

const Learner = () => {

    const [training, setTraining] = useState("");
    const [startTrain, {response}] = useMutation(START_TRAINING);
    const {data, error, refetch, startPolling, stopPolling} = useQuery(CHECK_STATUS);

    
    const trainHandler = () => {
        
        startTrain();
        startPolling(500)
        if (data.checkStatus === 'done') {
            stopPolling()
        }
        //refetch()
        setTraining(response)       
         
        
    };
    return(
        <div>
            <h1>Learner</h1>
            <p>{data.checkStatus} </p>

            <p>Your database is {training}</p>
            <Button color="primary" className="mt-3" 
                    onClick={trainHandler}>
                    Train
            </Button>{' '}
            
            <Button color="secondary" className="mt-3" 
                    onClick={()=>{setTraining(0)}}>
                    Cancel
            </Button>
        </div>
    )
};


export default Learner;