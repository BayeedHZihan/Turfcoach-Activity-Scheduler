import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ActivityForm from './components/ActivityForm';
import Navbar from './components/Navbar';
import ActivityList from './components/ActivityList';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [activities, setActivities] = useState([
    {
      id: "abc", 
      type: 'Mowing',
      time: new Date().toString(),
      performer: 'John',
      pitch: 'Pitch 1'
    },
    {
      id: "def", 
      type: 'Irrigation',
      time: new Date().toString(),
      performer: 'Tom',
      pitch: 'Pitch 3'
    },
    {
      id: "ghi", 
      type: 'Fertilization',
      time: new Date().toString(),
      performer: 'Tony',
      pitch: 'Pitch 2'
    },
  ]);
  const [editActivity, setEditActivity] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar setEditActivity={setEditActivity}/>
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <ActivityList 
                    activities={activities} 
                    setActivities={setActivities} 
                    setEditActivity={setEditActivity}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <WeatherDisplay />
                </Grid>
              </Grid>
            </Route>
            <Route path="/create">
              <ActivityForm 
                activities={activities} 
                setActivities={setActivities} 
                editActivity={editActivity}
              />
            </Route>
          </Switch>
        </div>        
      </div>
    </Router>
  );
}

export default App;
