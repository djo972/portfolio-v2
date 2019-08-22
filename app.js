// ----------------------------------------------------------------------------
// Load dependencies...
// ----------------------------------------------------------------------------

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const Chatkit = require('@pusher/chatkit-server');
const MobileDetect = require('mobile-detect');
const Instagram = require('node-instagram').default;
const PORT = process.env.PORT || 3000;
const util = require('util');
// ----------------------------------------------------------------------------
// Instantiate Express and Chatkit
// ----------------------------------------------------------------------------
const app = express();
const chatkit = new Chatkit.default(require('./config.js'));
// ----------------------------------------------------------------------------
// Load Express Middlewares
// ----------------------------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.set('view engine', 'ejs');
// ----------------------------------------------------------------------------
// Load instagram
//  ----------------------------------------------------------------------------
const instagram = new Instagram({
    clientId: '89171b857d74483db09e3509fcfb6aa8',
    clientSecret: '4b19d68a5fab43a2a210e2daf1d74e93',
    accessToken: '208075717.89171b8.6982811f36c8426fa898cf0da5a5cf57',
});
// ----------------------------------------------------------------------------
// Define Routes
// ----------------------------------------------------------------------------
// Example with express
const redirectUri = 'http://localhost:3000/auth/instagram/callback';
// create express server
// Redirect user to instagram oauth
app.get('/auth/instagram', (req, res) => {
    res.redirect(instagram.getAuthorizationUrl(redirectUri, { scope: ['basic'] }));
});
// Handle auth code and get access_token for user
app.get('/auth/instagram/callback', async (req, res) => {
    try {
        const data = await instagram.authorizeUser(req.query.code, redirectUri);
        // access_token in data.access_token
        res.json(data);
        console.log(data.access_token);
    } catch (err) {
        res.json(err);
    }
});
app.post('/session/load', (req, res, next) => {
    // Attempt to create a new user with the email will serving as the ID of the user.
    // If there is no user matching the ID, we create one but if there is one we skip
    // creating and go straight into fetching the chat room for that user

    let createdUser = null;

    chatkit
        .createUser({
            id: req.body.email,
            name: req.body.name,
        })
        .then(user => {
            createdUser = user;
            getUserRoom(req, res, next, false);
        })
        .catch(err => {
            if (err.error === 'services/chatkit/user_already_exists') {
                createdUser = {
                    id: req.body.email,
                };

                getUserRoom(req, res, next, true);
                return;
            }

            next(err);
        });

    function getUserRoom(req, res, next, existingAccount) {
        const name = createdUser.name;
        const email = createdUser.email;

        // Get the list of rooms the user belongs to. Check within that room list for one whos
        // name matches the users ID. If we find one, we return that as the response, else
        // we create the room and return it as the response.

        chatkit
            .getUserRooms({
                userId: createdUser.id,
            })
            .then(rooms => {
                let clientRoom = null;

                // Loop through user rooms to see if there is already a room for the client
                clientRoom = rooms.find(room => {
                    return room.name === createdUser.id;
                });

                if (clientRoom && clientRoom.id) {
                    return res.json(clientRoom);
                }

                // Since we can't find a client room, we will create one and return that.
                chatkit
                    .createRoom({
                        creatorId: createdUser.id,
                        isPrivate: true,
                        name: createdUser.id,
                        userIds: ['Chatkit-dashboard', createdUser.id],
                    })
                    .then(room => res.json(room))
                    .catch(err => {
                        console.log(err);
                        next(new Error(`${err.error_type} - ${err.error_description}`));
                    });
            })
            .catch(err => {
                console.log(err);
                next(new Error(`ERROR: ${err.error_type} - ${err.error_description}`));
            });
    }
});
app.post('/session/auth', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id });
    res.status(authData.status).send(authData.body);
});
app.get('/admin', (req, res) => {
    res.render('admin.ejs', { root: __dirname + '/views' });
});
app.get('/contact', (req, res) => {
    instagram.get('tags/search', { q: 'paris' })
        .then(data => {
        console.log(data);
    });


    res.render('contact.ejs', { root: __dirname + '/views' });
});
app.get('/', (req, res) => {
    // let  md = new MobileDetect(req.headers['user-agent']);
    // console.log(md);
    res.render('index.ejs', { root: __dirname + '/views' });      
});


app.get('/insta',async (req, res) => {
    instagram.get('users/self/media/recent').then(data => {
        let instagram = data;
        let insta = instagram.data;
        console.log(instagram);
        // let img1 = insta[1].images.standard_resolution.url;
        //
        // console.log(insta[1].images.standard_resolution.url);
        // console.log(insta[1].images);


        res.render('insta.ejs', {
            root: __dirname + '/views' ,
            insta : instagram.data
        });
    })
        .catch(err => {
            // An error occured
            console.log(err);
        });
});

// app.get('/insta',(req, res) => {
//     instagram.get('users/self/media/recent').then(data => {
//         let instagram = data;
//         let insta = instagram.data;
//         let img1 = insta[1].images.standard_resolution.url;
//
//             console.log(insta[1].images.standard_resolution.url);
//             console.log(insta[1].images);
//         res.render('index.ejs', {
//             root: __dirname + '/views' ,
//             insta : instagram.data
//         });
//     });
// });
// ----------------------------------------------------------------------------
// Start Express Application
// ----------------------------------------------------------------------------
app.listen(PORT, () => console.log(`App listening on *:${PORT}`));
