import { gql } from 'apollo-boost';

const today = gql`
  query {
    today {
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

export default today;