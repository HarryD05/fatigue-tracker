import React from 'react';

//Styling
import './pages.scss';

const Home = props => {
  return (
    <div className="home">
      <h1>Home</h1>

      <div className="aim">
        <h2>Aim</h2>
        <p>Track activity & tiredness througout the day - to see what activities have the greatest toll on fatigue.</p>
      </div>

      <h2>Types of activity: </h2>
      <ul>
        <li><b>Required</b> e.g. eating & time with helpers</li>
        <li><b>Resting</b> e.g. napping in bed or sitting with no stimulation</li>
        <li><b>Rehabilitation</b> e.g. physio & exercise</li>
        <li><b>Socialising</b> e.g. phone call, facebook portal, facetime & posting on facebook</li>
        <li><b>Non-productive</b> e.g. reading, watching TV, listening to radio & browsing facebook</li>
      </ul>

      <h2>Logs</h2>
      <p>Each time you start an activity a new activity, you add a new log - you will need to ...</p>
      <ul>
        <li>Select what type of activity it is</li>
        <li>Log your current tiredness (physical & mental)</li>
      </ul>
    </div>
  )
}

export default Home;