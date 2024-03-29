const express = require('express');
const db = require('./config/connection');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

//aws
const s3 = require('./controllers/s3-controller');
require('dotenv').config();
const routes = require('./routes');
app.use(routes);

// create new Apollo Server and pass in middleware
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});


// aws code ------------------------- //
// app.get('sign-s3', (req, res) => {
//     const s3 = new aws.S3();
//     const fileName = req.query['file-name'];
//     const fileType = req.query['file-type'];
//     const s3Params = {
//         Bucket: "my-maker-bucket",
//         Key: fileName,
//         Expires: 60,
//         ContentType: fileType,
//         ACL: 'public-read'
//     };

//     s3.getSignedUrl('putObject', s3Params, (err, data) => {
//         if (err){
//             console.log(err);
//             return res.end();
//         }
//         const returnData = {
//             signedRequest: data,
//             url: `https://my-maker-bucket.s3.amazonaws.com/${fileName}`
//         }
//         res.write(JSON.stringify(returnData));
//         res.end()
//     });
// });


// ---------------------------------- //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/', restRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../maker-client/build')));
}

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../maker-client/build/index.html'));
})

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    // integrate apollo server with express application as middleware
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

startApolloServer(typeDefs, resolvers);

