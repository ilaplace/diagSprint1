import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import Diagnose from '../views/Diagnose'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_CLASSIFIER = gql`
    query GetClassifie{
        getClassifier{
            numberOfFeatureTypes
    }
}
`
const ModalDiag =   () => {
    const { data } = useQuery(GET_CLASSIFIER);
    const [state, setMyState] = useState(false);
    const [secondState, setSecondState] = useState(false);
    const [patientNumber, setPatientNumber] = useState(1);

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
    return (
        <div>
                <Form >
                <Button onClick={toggle}>Diag</Button>
                <FormGroup>
                    <Label for="Select the number of patients"></Label>
                    <Input type="select" name="select" onChange={selectHandler} value={patientNumber}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
            </Form>
            <Modal isOpen={state} toggle={toggle}>
                <ModalHeader toggle={toggle}>Diagonse a sucker</ModalHeader>
                <ModalBody>

                    <Diagnose classifier={data} numberOfPatients={patientNumber} />
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