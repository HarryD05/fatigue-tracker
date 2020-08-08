import { gql } from 'apollo-boost';

const getDay = gql`
  query getDay($dayId: ID!){
    day (dayId: $dayId) {
      _id
      date
      startTime
      endTime
      sleepQuality
      sleepCause
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

export default getDay;