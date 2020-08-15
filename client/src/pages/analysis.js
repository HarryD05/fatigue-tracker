//React dependencies
import React, { useState } from 'react';

//Components
import SleepChart from './../components/sleepChart/sleepChart';
import CategoryImpact from './../components/categoryImpact/categoryImpact';

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

  const renderSleepCause = () => {
    return (
      <>
        {loadingDays ? <h2 className="loading">Loading...</h2> : null}
        {errorDays ? <h2 className="error">ERROR (refresh page)</h2> : null}
        {!loadingDays && !errorDays ? <SleepChart days={days} /> : null}
      </>
    )
  }
  const toggleSleepCause = () => setIsSleepCauseExpanded(!isSleepCauseExpanded);

  const renderCategoryImpact = () => {
    return (
      <>
        {loadingLogs ? <h2 className="loading">Loading...</h2> : null}
        {errorLogs ? <h2 className="error">ERROR (refresh page)</h2> : null}
        {!loadingLogs && !errorLogs ? <CategoryImpact logs={logs} /> : null}
      </>
    )
  }
  const toggleCategoryImpact = () => setIsCategoriesExpanded(!isCategoriesExpanded);

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
        <button onClick={toggleCategoryImpact}>Toggle</button><br />
        {isCategoriesExpanded ? renderCategoryImpact() : null}
      </div>
    </main>
  )
}

export default compose(
  graphql(getDays, { name: 'getDays' }),
  graphql(getLogs, { name: 'getLogs' }),
)(Analysis);