const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Day {
    _id: ID!
    startTime: String
    endTime: String
    initPhysTiredness: Int
    initMentTiredness: Int
    avgPhysTiredness: Float
    avgMentTiredness: Float
    logs: [Log]
  }
  
  type Log {
    _id: ID!
    category: Int
    notes: String
    physTiredness: Int
    mentTiredness: Int
  }
  
  input InitDayInput {
    startTime: String
    initPhysTiredness: Int
    initMentTiredness: Int
  }

  input UpdateInput {
    notes: String
    physTiredness: Int
    mentTiredness: Int
  }

  type RootQuery {
    days: [Day]!
    logs: [Log]!
  }
  
  type RootMutation {
    initDay(initDayInput: InitDayInput!): String!
    setBedTime(time: String!): String!
    initLog(category: Int): Log!
    updateLog(updateInput: UpdateInput): Log!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
