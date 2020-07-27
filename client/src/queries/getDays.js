import { gql } from 'apollo-boost';

const getDays = gql`
  {
    days {
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

export default getDays;