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
      avgMentTiredness
      avgPhysTiredness
      logs {
        _id 
        startTime
        endTime
        category
        notes
        physTiredness
        mentTiredness
      }
    }
  }
`;

export default initDay;