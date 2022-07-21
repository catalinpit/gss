const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const express = require("express");
const http = require("http");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// from docs
// https://www.apollographql.com/docs/apollo-server/integrations/middleware/#swapping-out-apollo-server
// https://www.apollographql.com/docs/apollo-server/data/subscriptions
async function startServer() {
    const app = express();
    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql'
    });

    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({ 
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ]
    });

    await server.start();

    server.applyMiddleware({ app });

    httpServer.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();