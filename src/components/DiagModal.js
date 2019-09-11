import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import Diagnose from '../views/Diagnose'
import gql from "graphql-tag"
import {useQuery} from '@apollo/react-hooks'

const GET_DIAGNOSE_RESPONSE = gql`
{
    diagnoseResponse @client
}
`
const ModalDiag = ({typesOfFeatures}) => {
    
    const [state, setMyState] = useState(false);
    const [secondState, setSecondState] = useState(false);
    const [patientNumber, setPatientNumber] = useState(1);
    const { data } = useQuery(GET_DIAGNOSE_RESPONSE);
    
    const toggle = () => {
        setMyState(!state)
    }

    const secondToggle = () => {
        setMyState(false)
        setSecondState(!secondState)
    }

    const selectHandler = (event) => {
        setPatientNumber(event.target.value);
    }
    data && data.diagnoseResponse && console.log(data.diagnoseResponse);
    
    return (
        <div>
                <Form >
                <Label>Please select the number of patients that you want to diagnose</Label>
                <FormGroup >
                    <Label for="Select the number of patients"></Label>
                    <Input type="select" name="select" style={{width: "20%"}} onChange={selectHandler} value={patientNumber}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
            </Form>
            <Button onClick={toggle} className="my-3">Diagnose</Button>
            <Modal isOpen={state} toggle={toggle}>
                <ModalHeader toggle={toggle}>Diagonse a sucker</ModalHeader>
                <ModalBody>

                    <Diagnose classifier={typesOfFeatures} numberOfPatients={patientNumber} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={secondToggle}>Forward</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={secondState} toggle={secondToggle}>
                <ModalHeader toggle={secondToggle}>Suckers</ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={secondToggle}>Diagnose</Button>{' '}
                    <Button color="secondary" onClick={secondToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ModalDiag;