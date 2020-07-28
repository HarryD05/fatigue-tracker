//React dependencies
import React, { useState } from 'react';

//Apollo dependencies
import { graphql } from 'react-apollo';
import initDay from './../../queries/initDay';

//Styling
import './initDayForm.scss';

const InitDayForm = props => {
  const [initInput, setInitInput] = useState({
    startTime: null,
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

    props.mutate({
      variables: {
        initDayInput: {
          startTime: new Date(new Date().toDateString() + " " + initInput.startTime),
          initPhysTiredness: Number(initInput.initPhysTiredness),
          initMentTiredness: Number(initInput.initMentTiredness)
        }
      }
    }).then(() => {
      props.onComplete();
    })
  }

  return (
    <form id="init-day" onSubmit={submitForm}>
      <div className="form-group">
        <label htmlFor="startTime">Woke up: </label>
        <input type="time" name="startTime" onChange={changeHandler}></input>
      </div>

      <div className="form-group">
        <label htmlFor="initPhysTiredness">Initial physical tiredness: </label>
        <input type="range" min="0" max="9" step="1" name="initPhysTiredness" onChange={changeHandler}></input>
      </div>

      <div className="form-group">
        <label htmlFor="initMentTiredness">Initial mental tiredness: </label>
        <input type="range" min="0" max="9" step="1" name="initMentTiredness" onChange={changeHandler}></input>
      </div>

      <div className="init-container">
        <button type="submit">Initialise new day</button>
      </div>
    </form>
  )
}

export default graphql(initDay)(InitDayForm);