import { gql } from 'apollo-boost';

const completeLogs = gql`
  mutation completeLogs($updateInput: UpdateInput!){
    completeLogs(updateInput: $updateInput) {
      _id 
      startTime
      endTime
      category
      physTiredness
      mentTiredness
    }
  }
`;

export default completeLogs;