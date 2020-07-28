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
      avgMentTiredness
      avgPhysTiredness
      logs {
        _id 
        startTime
        endTime
        category
        physTiredness
        mentTiredness
      }
    }
  }
`;

export default setBedTime;