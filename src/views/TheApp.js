import React  from 'react'
import ExternalApi from '../components/FileUpload'
import Learner from './Learner'
import Diagnose from './Diagnose'
import DiagModal from '../components/DiagModal'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_CLASSIFIER = gql`
query GetClassifie{
    getClassifier{
        numberOfFeatureTypes
  }
}
`



 const TheApp = () => {
    const { data } = useQuery(GET_CLASSIFIER);
    return (
        <>
            <ExternalApi />
            {/* <Diagnose classifier={data}/> */}
            <hr />
            <Learner/> 
            
            <hr />
            <DiagModal />
        </>
    )
}
export default TheApp;