import { gql } from 'apollo-boost';

const today = gql`
  query {
    today {
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

export default today;