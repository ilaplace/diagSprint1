import React, { useState} from 'react';
import { Button } from "reactstrap";
import { useMutation, useQuery }  from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Spinner } from 'reactstrap';

// TODO: Disable the train button after training started

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

    const timerCallback = async () => {

        // Should not await the the data 
        const {data} = await refetch()
        data && console.log(data);
        
        // gotta check if the check status available
        data.checkStatus && setTraining(data.checkStatus)
        if (data.checkStatus === 'done') {
            clearInterval(t)
        }
    
    };
    
    
    const [ training, setTraining ] = useState('untrained');
    const [ startTrain ] = useMutation(START_TRAINING);
    const { refetch } = useQuery(CHECK_STATUS);
    var t;
    t = setInterval(timerCallback,1000);
    
    const trainHandler = () => {
        setTraining('training');
        startTrain();
        
        
    };
    const cancelHandler = () =>{
        clearInterval(t)
        
    }
    return(
        <div>
            <h2>Learner</h2>
            {(training==='training') ?(
                <>
                <Spinner />
                <br />
                </>
            ) : (
                <p>Your database is {training}</p>)}
           
            <Button color="primary" className="my-3" 
                    onClick={trainHandler}>
                    Train
            </Button>{' '}
            
            <Button color="secondary" className="my-3" 
                    onClick={()=>{cancelHandler()}}>
                    Cancel
            </Button>
        </div>
    )
};


export default Learner;