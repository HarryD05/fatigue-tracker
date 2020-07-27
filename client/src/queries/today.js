import { gql } from 'apollo-boost';

const today = gql`
  {
    today {
      _id
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

export default today;