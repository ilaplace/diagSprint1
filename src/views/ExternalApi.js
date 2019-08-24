import React, { useState } from "react";
import { Button } from "reactstrap";
//import Highlight from "../components/Highlight";
import FileUpload  from "../components/FileUpload";
import { useQuery }  from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_HELLO = gql`
  query hellom{
    hello
  }
`

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const {data, error, refetch} = useQuery(GET_HELLO);
  

  const callApi = async () => {
    const responseData = data;
    setShowResult(true);
    setApiMessage(responseData);
    refetch()
    if (error) return `Error! ${error}`;
  };
  
  return (
    <>
      <div className="mb-5">
        <h1>External API</h1>
        <p>
          Ping an external API by clicking the button below. This will call the
          external API using an access token, and the API will validate it using
          the API's audience value.
        </p>
        <Button color="primary" className="mt-5" onClick={callApi}>
          Ping API
        </Button>
      </div>
      <div className="result-block-container">
        <div className={`result-block ${showResult && "show"}`}>
          <h6 className="muted">Result</h6>
          {/* <Highlight>{JSON.stringify(apiMessage, null, 2)}</Highlight> */}
        </div>
        <div className="pt-5"><h5>{apiMessage ? JSON.stringify(apiMessage,null,6) : null}</h5></div>
      <div> <FileUpload /> </div>
      </div>
      

    </>
  );
};

export default ExternalApi;
