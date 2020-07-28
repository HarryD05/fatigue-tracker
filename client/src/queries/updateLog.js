import { gql } from 'apollo-boost';

const updateLog = gql`
  mutation updateLog($updateInput: UpdateInput!){
    updateLog(updateInput: $updateInput) {
      _id 
      startTime
      endTime
      category
      physTiredness
      mentTiredness
    }
  }
`;

export default updateLog;