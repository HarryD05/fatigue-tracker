import { gql } from 'apollo-boost';

const calculateAverages = gql`
  mutation calculateAverages($date: String!){
    calculateAverages(date: $date) {
      _id
      date
      startTime
      endTime
      sleepQuality
      sleepCause
      initPhysTiredness
      initMentTiredness
      endMentTiredness
      endPhysTiredness
      avgPhysTiredness
      avgMentTiredness
      logs {
        _id
      }
    }
  }
`;

export default calculateAverages;