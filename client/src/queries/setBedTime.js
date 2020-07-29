import { gql } from 'apollo-boost';

const setBedTime = gql`
  mutation setBedTime($time: String!){
    setBedTime(time: $time) {
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

export default setBedTime;