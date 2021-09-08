import { ApolloServer,gql } from 'apollo-server'
import schema from './modules/gql.js'
import handler from './modules/handler.js'
import {PORT} from './config.js'

const server = new ApolloServer({ typeDefs: schema, resolvers: handler })

server.listen(PORT).then(({ url }) => console.log('Server is ready at ' + url))