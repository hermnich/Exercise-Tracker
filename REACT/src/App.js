import './App.css';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage'
import EditPage from './pages/EditPage'
import CreatePage from './pages/CreatePage'
import Navigation from './components/Navigation';


function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <header>
        <div className="App-header">
          <h1>Exercise Tracker</h1>
          <p>Full Stack MERN App Demonstration</p>
        </div>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
            <Route path="/edit" element={<EditPage exerciseToEdit={exerciseToEdit}/>}></Route>
            <Route path="/create" element={<CreatePage />}></Route>
          </Routes>
        </Router>
      </header>
      <footer className="App-footer">© 2023 Nicholas Herman</footer>
    </div>
  );
}

export default App;
