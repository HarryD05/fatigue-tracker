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
import CurrentActivity from './../currentActivity/currentActivity';

//Helpers
import { categories } from './../../helpers/enum';

//Styling
import './newLogForms.scss';

const NewLogForms = props => {
  const [initLog, setInitLog] = useState({
    category: null,
    physTiredness: null,
    mentTiredness: null,
    startTime: null
  });

  const [finalLog, setFinalLog] = useState({
    endTime: null,
    physTiredness: null,
    mentTiredness: null
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
      let time = null;
      if (initLog.startTime === null) {
        time = new Date();
      } else {
        time = new Date(new Date().toDateString() + " " + initLog.startTime)
      }

      props.updateLog({
        variables: {
          updateInput: {
            physTiredness: Number(initLog.physTiredness),
            mentTiredness: Number(initLog.mentTiredness),
            endTime: time
          }
        }
      }).then(() => {
        props.onComplete('Log submitted!');
        setInitLog({
          category: null,
          physTiredness: null,
          mentTiredness: null,
          startTime: null
        })
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

      let time = null;
      if (initLog.startTime === null) {
        time = new Date();
      } else {
        time = new Date(new Date().toDateString() + " " + initLog.startTime)
      }

      if (props.isFirstLog) {
        props.initLog({
          variables: {
            initInput: {
              category: 0,
              startTime: time
            }
          }
        })
      }

      props.initLog({
        variables: {
          initInput: {
            category: Number(initLog.category),
            startTime: time
          }
        }
      }).then(() => {
        updateLogFunc(false);
      });
    }
  }

  const renderOptions = () => {
    return categories.map((cat, index) => {
      return <option key={index} value={index}>{cat}</option>
    })
  }

  return (
    <div className="log-forms">
      <CurrentActivity />

      <form id="init-log" onSubmit={e => submitHandler(e, false)}>
        <h2 className="header">New Log</h2>
        <div className="form-group">
          <label name="startTime"><b>Start time</b> <em>(Optional)</em></label><br />
          <input type="time" name="startTime" onChange={e => changeHandler(e, false)} />
        </div>

        <div className="form-group">
          <label htmlFor="category"><b>Category</b></label><br />
          <select name="category" onChange={e => changeHandler(e, false)}>
            {renderOptions()}
          </select>
        </div>

        <div className="form-group">
          <em>Remember 0 means not tired at all, 6 means completely drained</em><br /><br />
          <label htmlFor="physTiredness"><b style={{ color: '#33f' }}>PHYSICAL</b> tiredness:</label>
          <TirednessScale name="physTiredness" radioChange={e => changeHandler(e, false)} />
        </div>

        <div className="form-group">
          <label htmlFor="mentTiredness"><b style={{ color: '#060' }}>MENTAL</b> tiredness: </label>
          <TirednessScale name="mentTiredness" radioChange={e => changeHandler(e, false)} />
        </div>

        <div className="init-container">
          <button type="submit">Submit log</button>
        </div>
      </form>

      <form id="bedtime-form" onSubmit={e => submitHandler(e, true)}>
        <h2 className="header">Final log</h2>
        <div className="form-group">
          <label htmlFor="endTime"><b>Bed time:</b></label><br />
          <input type="time" name="endTime" onChange={e => changeHandler(e, true)} />
        </div>

        <em>Remember 0 means not tired at all, 6 means completely drained</em><br />

        <div className="form-group spacing-t spacing-b">
          <label htmlFor="physTiredness"><b style={{ color: '#33f' }}>PHYSICAL</b> tiredness:</label>
          <TirednessScale name="physTiredness" radioChange={e => changeHandler(e, true)} />
        </div>

        <div className="form-group spacing-t">
          <label htmlFor="mentTiredness"><b style={{ color: '#060' }}>MENTAL</b> tiredness: </label>
          <TirednessScale name="mentTiredness" radioChange={e => changeHandler(e, true)} />
        </div>

        <div className="init-container">
          <button type="submit">Submit log</button>
        </div>
      </form>
    </div >
  )
}

export default compose(
  graphql(initLog, { name: 'initLog' }),
  graphql(updateLog, { name: 'updateLog' }),
  graphql(completeLogs, { name: 'completeLogs' }),
  graphql(setBedTime, { name: 'setBedTime' }),
  graphql(calculateAverages, { name: 'calculateAverages' })
)(NewLogForms);