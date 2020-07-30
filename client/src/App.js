import React from 'react';
import { Switch, Route } from 'react-router-dom';

//components
import Navbar from './components/navigation/Navbar';

//pages
import Home from './pages/home';
import Today from './pages/today';
import Logs from './pages/logs';
import LogDetails from './pages/logDetails';

function App() {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/today" component={Today} />
        <Route exact path="/logs" component={Logs} />
        <Route path="/logs/:id" component={LogDetails} />
      </Switch>
    </div>
  );
}

export default App;
