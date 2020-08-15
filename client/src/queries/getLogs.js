import { gql } from 'apollo-boost';

const getLogs = gql`
  query {
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
`;

export default getLogs;