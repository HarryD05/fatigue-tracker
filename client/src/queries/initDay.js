import { gql } from 'apollo-boost';

const initDay = gql`
  mutation initDay($initDayInput: InitDayInput!){
    initDay(initDayInput: $initDayInput) {
      _id
      date
      startTime
      endTime
      initMentTiredness
      initPhysTiredness
      endMentTiredness
      endPhysTiredness
      avgMentTiredness
      avgPhysTiredness
      logs {
        _id 
        startTime
        endTime
        category
        initPhysTiredness
        initMentTiredness
        endPhysTiredness
       endMentTiredness
      }
    }
  }
`;

export default initDay;