import { gql } from 'apollo-boost';

const getDays = gql`
  query {
    days {
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

export default getDays;