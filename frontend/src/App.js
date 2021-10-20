import React, { useState } from 'react'

import { Route } from "react-router-dom";
import Layout from "./hoc/Layout"; 
import './assets/css/app.css'

 
import CreateJob from "./components/Job/CreateJob";  
import Jobs from "./components/Job/Jobs";  
import Skills from "./components/Job/Skills";  

function App() { 
  return (
    <>
      <Layout>
        <Route exact path='/'   >
          <CreateJob  />
          <Jobs   />
          <Skills   />
        </Route>  
      </Layout>
    </>
  );
}

export default App;


