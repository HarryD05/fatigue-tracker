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

//Components
import TirednessScale from './../tirednessScale/tirednessScale';

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
            endTime: new Date(new Date().toDateString() + " " + finalLog.endTime)
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
      if (finalLog.mentTiredness === null || finalLog.physTiredness === null || finalLog.endTime === null) {
        return;
      }

      props.setBedTime({
        variables: {
          time: new Date(new Date().toDateString() + " " + finalLog.endTime)
        }
      }).then(() => {
        updateLogFunc(true);
      })
    } else {
      if (initLog.mentTiredness === null || initLog.physTiredness === null) {
        return;
      }

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
        <h2 className="header">New Log</h2>
        <div className="form-group">
          <label htmlFor="category">Category</label><br />
          <select name="category" onChange={e => changeHandler(e, false)}>
            <option value={0}>Required</option>
            <option value={1}>Rest</option>
            <option value={2}>Rehabilitation</option>
            <option value={3}>Socialising</option>
            <option value={4}>Non-productive</option>
          </select>
        </div>

        <div className="form-group">
          <em>Remember 0 means not tired at all, 6 means completely drained</em><br />
          <label htmlFor="physTiredness">physical tiredness: </label>
          <TirednessScale name="physTiredness" radioChange={e => changeHandler(e, false)} />
        </div>

        <div className="form-group">
          <label htmlFor="mentTiredness">mental tiredness: </label>
          <TirednessScale name="mentTiredness" radioChange={e => changeHandler(e, false)} />
        </div>

        <div className="init-container">
          <button type="submit">Submit log</button>
        </div>
      </form>

      <form id="bedtime-form" onSubmit={e => submitHandler(e, true)}>
        <h2 className="header">Final log</h2>
        <div className="form-group">
          <label htmlFor="endTime">Bed time: </label><br />
          <input type="time" name="endTime" onChange={e => changeHandler(e, true)} />
        </div>

        <div className="form-group">
          <em>Remember 0 means not tired at all, 6 means completely drained</em><br />
          <label htmlFor="physTiredness">physical tiredness: </label>
          <TirednessScale name="physTiredness" radioChange={e => changeHandler(e, true)} />
        </div>

        <div className="form-group">
          <label htmlFor="mentTiredness">mental tiredness: </label>
          <TirednessScale name="mentTiredness" radioChange={e => changeHandler(e, true)} />
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