import React, { useState} from 'react';
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

    const [ training, setTraining ] = useState('untrained');
    const [ startTrain ] = useMutation(START_TRAINING);
    const { refetch } = useQuery(CHECK_STATUS);
    
    var t;
    const timerCallback = async () => {
        const {data} = await refetch()
        setTraining(data.checkStatus)
        if (data.checkStatus === 'done') {
            clearInterval(t)
        }
    
    };
    const trainHandler = () => {
        setTraining('training');
        startTrain();
        t = setInterval(timerCallback,1000);
        
    };
    const cancelHandler = () =>{
        clearInterval(t)
        
    }
    return(
        <div>
            <h1>Learner</h1>

            <p>Your database is {training}</p>
            <Button color="primary" className="mt-3" 
                    onClick={trainHandler}>
                    Train
            </Button>{' '}
            
            <Button color="secondary" className="mt-3" 
                    onClick={()=>{cancelHandler()}}>
                    Cancel
            </Button>
        </div>
    )
};


export default Learner;