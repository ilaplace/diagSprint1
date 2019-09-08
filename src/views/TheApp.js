import React ,{ useState, useEffect} from 'react'
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
    const [ baseExists, setBaseExists ] = useState();
  
    // Effect triggered on mount or when the data variable modified
    useEffect(()=>{
      if(data && data.getClassifier && data.getClassifier.classifierStatus )
        {setBaseExists(true)
        console.log("in effect true");
      }
        
      else
        {setBaseExists(false)
        console.log("in effect false");
        }
    },[data])

   
    //data && data.getClassifier && console.log(data.getClassifier.classifierStatus);
    const istate = data && data.getClassifier && data.getClassifier.classifierStatus  

    const typesOfFeatures = data && data.getClassifier && data.getClassifier.featureTypes 

    return (
        baseExists ?
        <>
       <Learner initialState={istate}/>  
            <hr />
            <h2>Run Diagnostics</h2>
            <DiagModal data={typesOfFeatures} />
        </>
        :
        <>            
            
            <p>first upload a database motherfucker</p>
        </>
    )
}
export default TheApp;