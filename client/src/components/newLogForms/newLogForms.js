//React dependencies
import React, { useState } from 'react';

//Apollo dependencies
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

//Queries
import initLog from './../../queries/initLog';
import updateLog from './../../queries/updateLog';
import completeLogs from './../../queries/completeLogs';
import setBedTime from './../../queries/setBedTime';
import calculateAverages from './../../queries/calculateAverages';

//Styling
import './newLogForms.scss';

const NewLogForms = props => {
  const [initLog, setInitLog] = useState({
    category: null,
    physTiredness: 9,
    mentTiredness: 9
  });

  const [finalLog, setFinalLog] = useState({
    endTime: null,
    physTiredness: 9,
    mentTiredness: 9
  });

  const changeHandler = (e, isFinal) => {
    if (isFinal) {
      setFinalLog({
        ...finalLog,
        [e.target.name]: e.target.value
      })
    } else {
      setInitLog({
        ...initLog,
        [e.target.name]: e.target.value
      })
    }
  }

  const updateLogFunc = isFinal => {
    if (!isFinal) {
      document.getElementById('init-log').reset();
      props.updateLog({
        variables: {
          updateInput: {
            physTiredness: Number(initLog.physTiredness),
            mentTiredness: Number(initLog.mentTiredness),
            endTime: new Date()
          }
        }
      }).then(() => {
        props.onComplete('Log submitted!');
      })
    } else {
      props.completeLogs({
        variables: {
          updateInput: {
            physTiredness: Number(finalLog.physTiredness),
            mentTiredness: Number(finalLog.mentTiredness),
            endTime: new Date(finalLog.endTime)
          }
        }
      }).then(() => {
        props.calculateAverages({
          variables: {
            date: new Date()
          }
        }).then(() => {
          props.onComplete('Final log set, you\'re done for the day!');
        })
      });
    }
  }

  const submitHandler = (e, isFinal) => {
    e.preventDefault();

    if (isFinal) {
      props.setBedTime({
        variables: {
          time: new Date(new Date().toDateString() + " " + finalLog.endTime)
        }
      }).then(() => {
        updateLogFunc(true);
      })
    } else {
      if (props.isFirstLog) {
        props.initLog({
          variables: {
            initInput: {
              category: 0,
              startTime: new Date(props.startTime)
            }
          }
        })
      }

      props.initLog({
        variables: {
          initInput: {
            category: Number(initLog.category),
            startTime: new Date()
          }
        }
      }).then(() => {
        updateLogFunc(false);
      });
    }
  }

  return (
    <div className="log-forms">
      <form id="init-log" onSubmit={e => submitHandler(e, false)}>
        <h1>New Log</h1>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category" onChange={e => changeHandler(e, false)}>
            <option value={0}>Required</option>
            <option value={1}>Rest</option>
            <option value={2}>Rehabilitation</option>
            <option value={3}>Socialising</option>
            <option value={4}>Non-productive</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="physTiredness">physical tiredness: </label>
          <input type="range" min="0" max="9" step="1" defaultValue="9" name="physTiredness" onChange={e => changeHandler(e, false)} />
        </div>

        <div className="form-group">
          <label htmlFor="mentTiredness">mental tiredness: </label>
          <input type="range" min="0" max="9" step="1" defaultValue="9" name="mentTiredness" onChange={e => changeHandler(e, false)} />
        </div>

        <div className="init-container">
          <button type="submit">Submit log</button>
        </div>
      </form>

      <form id="bedtime-form" onSubmit={e => submitHandler(e, true)}>
        <h1>Final log</h1>
        <div className="form-group">
          <label htmlFor="endTime">Bed time: </label>
          <input type="time" name="endTime" onChange={e => changeHandler(e, true)} />
        </div>

        <div className="form-group">
          <label htmlFor="physTiredness">physical tiredness: </label>
          <input type="range" min="0" max="9" step="1" defaultValue="9" name="physTiredness" onChange={e => changeHandler(e, true)} />
        </div>

        <div className="form-group">
          <label htmlFor="mentTiredness">mental tiredness: </label>
          <input type="range" min="0" max="9" step="1" defaultValue="9" name="mentTiredness" onChange={e => changeHandler(e, true)} />
        </div>

        <div className="init-container">
          <button type="submit">Submit log</button>
        </div>
      </form>
    </div>
  )
}

export default compose(
  graphql(initLog, { name: 'initLog' }),
  graphql(updateLog, { name: 'updateLog' }),
  graphql(completeLogs, { name: 'completeLogs' }),
  graphql(setBedTime, { name: 'setBedTime' }),
  graphql(calculateAverages, { name: 'calculateAverages' })
)(NewLogForms);