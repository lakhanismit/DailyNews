import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const [progress, setProgress] = useState(0)
  const apiKey = process.env.REACT_APP_API_KEY
  return (
    <>
      <Router>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        // onLoaderFinished={() => setProgress(0)} // THIS IS FOR FUCTION BASE COMPONENTS
        />
        <Navbar />
        <Routes>

          {/* CATEGORY ROUTES */}
          <Route exact path='/' element={<News apiKey={apiKey} setProgress={setProgress} key="general" country="in" category="general" pageSize={6} />} />

          <Route exact path='/business' element={<News apiKey={apiKey} setProgress={setProgress} key="business" country="in" category="business" pageSize={6} />} />

          <Route exact path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" country="in" category="entertainment" pageSize={6} />} />

          <Route exact path='/health' element={<News apiKey={apiKey} setProgress={setProgress} key="health" country="in" category="health" pageSize={6} />} />

          <Route exact path='/science' element={<News apiKey={apiKey} setProgress={setProgress} key="science" country="in" category="science" pageSize={6} />} />

          <Route exact path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} key="sports" country="in" category="sports" pageSize={6} />} />

          <Route exact path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} key="technology" country="in" category="technology" pageSize={6} />} />

          {/* COUNTURY ROUTES */}
          <Route exact path='/india' element={<News apiKey={apiKey} setProgress={setProgress} key="in" country="in" category="general" pageSize={6} />} />
          <Route exact path='/usa' element={<News apiKey={apiKey} setProgress={setProgress} key="us" country="us" category="general" pageSize={6} />} />

        </Routes>
      </Router >
    </>
  )
}

export default App
