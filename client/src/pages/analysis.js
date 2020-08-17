//React dependencies
import React, { useState } from 'react';

//Components
import SleepChart from './../components/sleepChart/sleepChart';
import CategoryImpact from './../components/categoryImpact/categoryImpact';
import StartingTiredness from './../components/startingTiredness/startingTiredness';
import ActivityRehab from './../components/activityRehab/activityRehab';

//Styling
import './pages.scss';

//Queries
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getDays from './../queries/getDays';
import getLogs from './../queries/getLogs';

const Analysis = props => {
  const { loading: loadingDays, error: errorDays, days } = props.getDays;
  const { loading: loadingLogs, error: errorLogs, logs } = props.getLogs;

  const [isSleepCauseExpanded, setIsSleepCauseExpanded] = useState(false);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [isStartTiredExpanded, setIsStartTiredExpanded] = useState(false);
  const [isActivityRehabExpanded, setIsActivityRehabExpanded] = useState(false);

  const renderSleepCause = () => {
    return (
      <>
        {loadingDays ? <h2 className="loading">Loading...</h2> : null}
        {errorDays ? <h2 className="error">ERROR (refresh page)</h2> : null}
        {!loadingDays && !errorDays ? <SleepChart days={days} /> : null}
      </>
    )
  }

  const renderCategoryImpact = () => {
    return (
      <>
        {loadingLogs ? <h2 className="loading">Loading...</h2> : null}
        {errorLogs ? <h2 className="error">ERROR (refresh page)</h2> : null}
        {!loadingLogs && !errorLogs ? <CategoryImpact logs={logs} /> : null}
      </>
    )
  }

  const renderStartTiredness = () => {
    return (
      <>
        {loadingLogs ? <h2 className="loading">Loading...</h2> : null}
        {errorLogs ? <h2 className="error">ERROR (refresh page)</h2> : null}
        {!loadingLogs && !errorLogs ? <StartingTiredness logs={logs} /> : null}
      </>
    )
  }

  const renderActivityRehab = () => {
    return (
      <>
        {loadingLogs ? <h2 className="loading">Loading...</h2> : null}
        {errorLogs ? <h2 className="error">ERROR (refresh page)</h2> : null}
        {!loadingLogs && !errorLogs ? <ActivityRehab logs={logs} /> : null}
      </>
    )
  }

  const toggleSleepCause = () => setIsSleepCauseExpanded(!isSleepCauseExpanded);
  const toggleCategoryImpact = () => setIsCategoriesExpanded(!isCategoriesExpanded);
  const toggleStartTiredness = () => setIsStartTiredExpanded(!isStartTiredExpanded);
  const toggleActivityRehab = () => setIsActivityRehabExpanded(!isActivityRehabExpanded);

  return (
    <main className="analysis">
      <h1>Analysis</h1>

      <div className="tab">
        <h2>Causes of bad sleep</h2>
        <button onClick={toggleSleepCause}>Toggle</button>
        {isSleepCauseExpanded ? renderSleepCause() : null}
      </div>

      <div className="tab">
        <h2>Effects of each category on tiredness</h2>
        <p>(at different times of the day)</p>
        <button onClick={toggleCategoryImpact}>Toggle</button><br />
        {isCategoriesExpanded ? renderCategoryImpact() : null}
      </div>

      <div className="tab">
        <h2>Effect of starting tiredness on rehabilitation</h2>
        <button onClick={toggleStartTiredness}>Toggle</button>
        {isStartTiredExpanded ? renderStartTiredness() : null}
      </div>

      <div className="tab">
        <h2>Effect of previous activity's category + duration on rehabilitation</h2>
        <button onClick={toggleActivityRehab}>Toggle</button>
        {isActivityRehabExpanded ? renderActivityRehab() : null}
      </div>


    </main>
  )
}

export default compose(
  graphql(getDays, { name: 'getDays' }),
  graphql(getLogs, { name: 'getLogs' }),
)(Analysis);