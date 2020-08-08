const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Day {
    _id: ID!
    date: String
    startTime: String
    endTime: String
    sleepQuality: Int
    sleepCause: Int
    initPhysTiredness: Int
    initMentTiredness: Int
    endPhysTiredness: Int
    endMentTiredness: Int
    avgPhysTiredness: Float
    avgMentTiredness: Float
    logs: [Log]
  }
  
  type Log {
    _id: ID!
    category: Int
    initPhysTiredness: Int
    initMentTiredness: Int
    endPhysTiredness: Int
    endMentTiredness: Int
    startTime: String
    endTime: String
  }
  
  input InitDayInput {
    startTime: String
    sleepQuality: Int
    sleepCause: Int
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
    log(logId: ID!): Log
    day(dayId: ID!): Day
  }
  
  type RootMutation {
    initDay(initDayInput: InitDayInput!): Day!
    setBedTime(time: String!): Day!
    initLog(initInput: InitInput!): Log!
    updateLog(updateInput: UpdateInput!): Log!
    completeLogs(updateInput: UpdateInput!): Log!
    calculateAverages(date: String!): Day!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
