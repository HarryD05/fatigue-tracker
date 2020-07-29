import { gql } from 'apollo-boost';

const log = gql`
  query log($logId: ID!){
    log(logId: $logId){
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

export default log;