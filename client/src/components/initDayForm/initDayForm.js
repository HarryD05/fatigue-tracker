//React dependencies
import React, { useState } from 'react';

//Apollo dependencies
import { graphql } from 'react-apollo';
import initDay from './../../queries/initDay';

//Components 
import SleepQualityScale from '../sleepScales/sleepQualityScale';
import TirednessScale from '../tirednessScale/tirednessScale';

//Helpers
import { sleepCause } from './../../helpers/enum';

//Styling
import './initDayForm.scss';

const InitDayForm = props => {
  const [initInput, setInitInput] = useState({
    startTime: null,
    sleepQuality: null,
    sleepCause: 0,
    initPhysTiredness: null,
    initMentTiredness: null
  })

  const changeHandler = e => {
    setInitInput({
      ...initInput,
      [e.target.name]: e.target.value
    })
  }

  const submitForm = async e => {
    e.preventDefault();

    if (initInput.initMentTiredness === null || initInput.sleepCause === null || initInput.sleepQuality === null || initInput.initPhysTiredness === null || initInput.startTime === null) {
      alert('Please fill in all inputs');
      return;
    }

    props.mutate({
      variables: {
        initDayInput: {
          startTime: new Date(new Date().toDateString() + " " + initInput.startTime),
          sleepQuality: Number(initInput.sleepQuality),
          sleepCause: Number(initInput.sleepCause),
          initPhysTiredness: Number(initInput.initPhysTiredness),
          initMentTiredness: Number(initInput.initMentTiredness)
        }
      }
    }).then(() => {
      props.onComplete();
      return;
    })


  }

  const renderOptions = () => {
    return sleepCause.map((cause, index) => {
      return <option key={index} value={index}>{cause}</option>
    })
  }

  return (
    <form id="init-day" onSubmit={submitForm}>

      <div className="form-group">
        <label htmlFor="sleepQuality"><b>Sleep quality</b></label><br />
        <SleepQualityScale name="sleepQuality" radioChange={changeHandler} />
      </div>

      <div className="form-group">
        <label htmlFor="sleepCause"><b>Worst cause of bad sleep</b></label><br />
        <select name="sleepCause" onChange={changeHandler}>
          {renderOptions()}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="startTime"><b>Woke up: </b></label><br />
        <input type="time" name="startTime" onChange={changeHandler}></input>
      </div>

      <em>Remember 0 means not tired at all, 6 means completely drained</em><br />

      <div className="form-group spacing-t spacing-b">
        <label htmlFor="initPhysTiredness">Initial <b style={{ color: '#33f' }}>PHYSICAL </b>tiredness: </label>
        <TirednessScale name="initPhysTiredness" radioChange={changeHandler} />
      </div>

      <div className="form-group spacing-t" >
        <label htmlFor="initMentTiredness">Initial <b style={{ color: '#060' }}>MENTAL </b>tiredness: </label>
        <TirednessScale name="initMentTiredness" radioChange={changeHandler} />
      </div>

      <div className="init-container">
        <button type="submit"><b>Initialise new day</b></button>
      </div>
    </form >
  )
}

export default graphql(initDay)(InitDayForm);