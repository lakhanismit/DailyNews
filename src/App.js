import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <>
        <Router>
          <LoadingBar
          height={3}
            color='#f11946'
            progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)} // THIS IS FOR FUCTION BASE COMPONENTS
          />
          <Navbar />
          <Routes>

            {/* CATEGORY ROUTES */}
            <Route exact path='/' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" country="in" category="general" pageSize={6} />} />

            <Route exact path='/business' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="business" country="in" category="business" pageSize={6} />} />

            <Route exact path='/entertainment' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" country="in" category="entertainment" pageSize={6} />} />

            <Route exact path='/health' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="health" country="in" category="health" pageSize={6} />} />

            <Route exact path='/science' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="science" country="in" category="science" pageSize={6} />} />

            <Route exact path='/sports' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" country="in" category="sports" pageSize={6} />} />

            <Route exact path='/technology' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" country="in" category="technology" pageSize={6} />} />

            {/* COUNTURY ROUTES */}
            <Route exact path='/india' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="in" country="in" category="general" pageSize={6} />} />
            <Route exact path='/usa' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="us" country="us" category="general" pageSize={6} />} />

          </Routes>
        </Router >
      </>
    )
  }
}

export default App
