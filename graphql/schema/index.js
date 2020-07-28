const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Day {
    _id: ID!
    date: String
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
    physTiredness: Int
    mentTiredness: Int
    startTime: String
    endTime: String
  }
  
  input InitDayInput {
    startTime: String
    initPhysTiredness: Int
    initMentTiredness: Int
  }

  input UpdateInput {
    physTiredness: Int
    mentTiredness: Int
    endTime: String
  }

  input InitInput {
    category: Int
    startTime: String
  }

  type RootQuery {
    days: [Day]!
    logs: [Log]!
    today: Day
  }
  
  type RootMutation {
    initDay(initDayInput: InitDayInput!): Day!
    setBedTime(time: String!): Day!
    initLog(initInput: InitInput!): Log!
    updateLog(updateInput: UpdateInput!): Log!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
