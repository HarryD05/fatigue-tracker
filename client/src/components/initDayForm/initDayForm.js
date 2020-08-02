//React dependencies
import React, { useState } from 'react';

//Apollo dependencies
import { graphql } from 'react-apollo';
import initDay from './../../queries/initDay';

//Components 
import TirednessScale from '../tirednessScale/tirednessScale';

//Styling
import './initDayForm.scss';

const InitDayForm = props => {
  const [initInput, setInitInput] = useState({
    startTime: null,
    initPhysTiredness: 0,
    initMentTiredness: 0
  })

  const changeHandler = e => {
    setInitInput({
      ...initInput,
      [e.target.name]: e.target.value
    })

    console.log(initInput);
  }

  const submitForm = async e => {
    if (initInput.initMentTiredness === null || initInput.initPhysTiredness === null || initInput.startTime === null) {
      return;
    }

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
        <label htmlFor="startTime">Woke up: </label><br />
        <input type="time" name="startTime" onChange={changeHandler}></input>
      </div>

      <div className="form-group">
        <em>Remember 0 means not tired at all, 6 means completely drained</em><br />
        <label htmlFor="initPhysTiredness">Initial physical tiredness: </label>
        {/*<input type="range" min="0" max="9" step="1" name="initPhysTiredness" onChange={changeHandler}></input>*/}
        <TirednessScale name="initPhysTiredness" radioChange={changeHandler} />
      </div>

      <div className="form-group">
        <label htmlFor="initMentTiredness">Initial mental tiredness: </label>
        <TirednessScale name="initMentTiredness" radioChange={changeHandler} />
      </div>

      <div className="init-container">
        <button type="submit">Initialise new day</button>
      </div>
    </form>
  )
}

export default graphql(initDay)(InitDayForm);