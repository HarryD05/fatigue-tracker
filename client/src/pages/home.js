import React from 'react';
import { Link } from 'react-router-dom';

//Styling
import './pages.scss';

const Home = props => {
  return (
    <main className="home">
      <h1>Home</h1>

      <div className="aim">
        <h2>Aim</h2>
        <p>Track activity & tiredness througout the day - to see what activities have the greatest toll on fatigue.</p>
      </div>

      <h2>Types of activity: </h2>
      <ul>
        <li><b>Required</b> e.g. eating, showering, time with helpers</li>
        <li><b>Resting</b> e.g. napping in bed, sitting with no stimulation or in the garden with no activity</li>
        <li><b>Rehabilitation</b> e.g. physio & exercise</li>
        <li><b>Socialising</b> e.g. phone call, facebook portal, facetime, posting on facebook</li>
        <li><b>Non-productive</b> e.g. reading, watching TV, listening to radio, browsing facebook, sudoko</li>
      </ul>

      <br /><p>The tiredness scale is from 0 (excellent) to 6 (completely drained)</p>

      <h2>Start of day</h2>
      <p>When you get to your tablet/computer in the morning, you will initalise the day...</p>
      <ul>
        <li>First, go to the <Link to="/today">today tab</Link></li>
        <li>Select how you slept (good, okay or bad)</li>
        <ul>
          <li>if the sleep was not good, you can also select the worst cause of the bad sleep</li>
        </ul>
        <li>Log the time you woke up</li>
        <li>Log your current tiredness (physical & mental)</li>
        <li>You will then be sent to a different page</li>
      </ul>

      <h2>Activity Logs</h2>
      <p>Each time you start an activity a new activity, you add a new log - you will need to ...</p>
      <ul>
        <li>First, go to the <Link to="/today">today tab</Link></li>
        <li>(optional) the start time of the activity</li>
        <li>Select what type of activity it is</li>
        <li>Log your current tiredness (physical & mental)</li>
      </ul>
    </main>
  )
}

export default Home;