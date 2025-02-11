import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const app = express();
const port = process.env.PORT || 8000;


const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
        hello: String
        say(name: String): String
    }
`,
    resolvers: {
        Query: {
            hello: () => "Hello from GraphQL!",
            say:(_, {name}) => `Hello ${name}!`,
        },
    },
});

await gqlServer.start();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/gql', expressMiddleware(gqlServer));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
