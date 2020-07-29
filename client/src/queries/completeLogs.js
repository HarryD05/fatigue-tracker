import { gql } from 'apollo-boost';

const completeLogs = gql`
  mutation completeLogs($updateInput: UpdateInput!){
    completeLogs(updateInput: $updateInput) {
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

export default completeLogs;