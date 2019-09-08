import React  from 'react'
import Learner from './Learner'
import DiagModal from '../components/DiagModal'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading'

const GET_CLASSIFIER = gql`
query GetClassifie{
    getClassifier{
        featureTypes
        classifierStatus
  }
}
`

 const TheApp = () => {

    const { data } = useQuery(GET_CLASSIFIER);

   
    //data && data.getClassifier && console.log(data.getClassifier.classifierStatus);
    const istate = data && data.getClassifier && data.getClassifier.classifierStatus  

    const typesOfFeatures = data && data.getClassifier && data.getClassifier.featureTypes 

    return (
        <>            
            <Learner initialState={istate}/>  
            <hr />
            <h2>Run Diagnostics</h2>
            <DiagModal data={typesOfFeatures} />
        </>
    )
}
export default TheApp;