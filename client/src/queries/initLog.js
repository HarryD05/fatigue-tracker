import { gql } from 'apollo-boost';

const initLog = gql`
  mutation initLog($initInput: InitInput!){
    initLog(initInput: $initInput) {
      _id 
      startTime
      endTime
      category
      physTiredness
      mentTiredness
    }
  }
`;

export default initLog;