import React from "react";
import FileUpload  from "../components/FileUpload";
import gql from "graphql-tag";

const ExternalApi = () => {
  
  
  return (
    <>
      <div className="mb-5">
        <h1>Databases</h1>
        <p>
          You can upload your database from here!
        </p>
        <div> <FileUpload /> </div>
      </div>
      
        {/* <div className={`result-block ${showResult && "show"}`}> */} 

    </>
  );
};

export default ExternalApi;
