import React from 'react';
import { Switch, Route } from 'react-router-dom';

//components
import Navbar from './components/navigation/Navbar';

//pages
import Home from './pages/home';
import Logs from './pages/logs';
import Today from './pages/today';

function App() {
  return (
    <div>
      <Navbar />

      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/logs" component={Logs} />
          <Route path="/today" component={Today} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
