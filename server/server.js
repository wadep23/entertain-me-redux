const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDef, resolvers } = require('./schemas');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();
    const app = express();

    server.applyMiddleware({ app });

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    })

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API Server active, listening on localhost:${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
}