// (function() {
//   'use strict';
function exportChat() {
    function sendNotif() {

    }
    const PUSHER_INSTANCE_LOCATOR = 'v1:us1:c0266633-91fb-4f9a-8567-34afe5f59db9';

    // ----------------------------------------------------
    // Chat Details
    // ----------------------------------------------------

    let chat = {
        messages: [],
        room: undefined,
        userId: undefined,
        currentUser: undefined,
    };

    // ----------------------------------------------------
    // Targeted Elements
    // ----------------------------------------------------

    const chatPage = $(document);
    const chatWindow = $('.chatbubble');
    const chatMessage = $('.messages');
    const chatHeader = chatWindow.find('.unexpanded');
    const chatBody = chatWindow.find('.chat-window');

    // ----------------------------------------------------
    // Helpers
    // ----------------------------------------------------

    let helpers = {
        /**
         * Toggles the display of the chat window.
         */
        ToggleChatWindow : function() {
            console.log('open');
            // chatWindow.toggleClass('opened');
            // chatHeader
            //     .find('.title')
            //     .text(
            //         chatWindow.hasClass('opened')
            //             ? 'Minimize Chat Window'
            //             : 'Chat with Support'
            //     );
        },

        /**
         * Show the appropriate display screen. Login screen
         * or Chat screen.
         */

        addMessageRobots:function(){

            setTimeout(function(){
                chatBody.find('ul.messages').append(
                    `<li class="clearfix message deta support">
                        <div class="sender">mr Robot</div>
                        <div class="message">Hello ! Djo n'est pas en ligne mais une notification va lui etre envoyé lors de l'envoi de votre premier message.  Merci </div>
                         <div class="userSeed"></div>
                    </li>`
                );
                }, 3000);

        },

        ShowAppropriateChatDisplay: function() {
            chat.room && chat.room.id
                ? helpers.ShowChatRoomDisplay()
                : helpers.ShowChatInitiationDisplay();
        },

        /**
         * Show the enter details form
         */
        ShowChatInitiationDisplay: function() {
            chatBody.find('.chats').removeClass('active');
            chatBody.find('.login-screen').addClass('active');
        },

        /**
         * Show the chat room messages dislay.
         */
        ShowChatRoomDisplay: function() {
            chatBody.find('.chats').addClass('active');
            chatBody.addClass('active');
            chatBody.find('.login-screen').removeClass('active');

            const chatManager = new Chatkit.ChatManager({
                userId: chat.userId,
                instanceLocator: PUSHER_INSTANCE_LOCATOR,
                tokenProvider: new Chatkit.TokenProvider({
                    url: '/session/auth',
                }),
            });

            chatManager
                .connect({
                    onPresenceChanged: (state, user) => {
                        console.log(`User ${user.name} is ${state.current}`);
                    }
                })
                .then(currentUser => {
                    chat.currentUser = currentUser;
                    console.log(chat.currentUser);
                    currentUser
                        .fetchMessages({
                            roomId: chat.room.id,
                            direction: 'older',
                        })
                        .then(
                            messages => {
                                chatBody.find('.loader-wrapper').hide();
                                chatBody.find('.input, .messages').show();
                                console.log(messages.length);
                                let isMessage = messages.length;

                                isMessage === 0 ? (
                                    helpers.addMessageRobots()
                                ) : (
                                   console.log('car')
                                );


                                messages.forEach(message => helpers.NewChatMessage(message));

                                currentUser.subscribeToRoom({
                                    roomId: chat.room.id,
                                    hooks: {
                                        onMessage: message => helpers.NewChatMessage(message),
                                        onUserStartedTyping: user => {
                                            console.log(`User ${user.name} started typing`);
                                            chatBody.find('.typing-content').show();
                                        },
                                        onUserStoppedTyping: user => {
                                            console.log(`User ${user.name} stopped typing`);
                                            chatBody.find('.typing-content').hide();
                                        }
                                    }
                                });
                            },
                            err => {
                                console.error(err);
                            }
                        );
                })
                .catch(err => {
                    console.log(err, 'Connection error');
                });
        },

        /**
         * Append a message to the chat messages UI.
         */
        NewChatMessage: function(message) {

            if (chat.messages[message.id] === undefined) {
                // console.log('1');

                const messageClass =
                    message.sender.id !== chat.userId ? 'support' : 'user';
                    // console.log(message);
                chatBody.find('ul.messages').append(
                    `<li class="clearfix message ${messageClass}">
                        <div class="sender">${message.sender.name}</div>
                        <div class="message">${message.text}</div>
                        <div class="userSeed"></div>
                    </li>`
                );
                chat.messages[message.id] = message;
                chatMessage.scrollTop(chatMessage[0].scrollHeight);
                // chatMessage[0].scrollIntoView(false);
                // setTimeout(function(){
                //     chatBody.scrollTop(chatBody[0].scrollHeight);
                //     chatMessage.scrollTop(chatMessage[0].scrollHeight) ;
                //     }, 3000);




            }else{
                console.log('2');
            }
        },

        /**
         * Send a message to the chat channel
         */
        SendMessageToSupport: function(evt) {
            evt.preventDefault();
                console.log('send');
            $.ajax({
                type: 'POST',
                url: 'http://localhost:5000/push',
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, err) {
                    console.log(xhr.responseText);
                }
            });
            const message = $('#newMessage')
                .val()
                .trim();

            chat.currentUser.sendMessage(
                { text: message, roomId: chat.room.id },
                msgId => {
                    console.log('Message added!');
                },
                error => {
                    console.log(`Error adding message to ${chat.room.id}: ${error}`);
                }
            );

            $('#newMessage').val('');
            $('.emoji-wysiwyg-editor').val('');
            $('.emoji-wysiwyg-editor').text('');
        },
        SendTypingEvent: function(evt) {
            evt.preventDefault();
            console.log('typping');
            const message = $('#newMessage');
            chat.currentUser.isTypingIn({ roomId: chat.room.id })
                .then(() => {
                    console.log('Success!');
                })
                .catch(err => {
                    console.log(`Error sending typing indicator: ${err}`);
                });
        },
        /**
         * Logs user into a chat session
         */

        LogIntoChatSession: function(evt) {
            const name = $('#fullname')
                .val()
                .trim();
            const email = $('#email')
                .val()
                .trim()
                .toLowerCase();

            //
            // const name = 'djo972';
            // const email = 'tels@gmail.com'
            //     .toLowerCase();


            // Disable the form
            chatBody
                .find('#loginScreenForm input, #loginScreenForm button')
                .attr('disabled', true);

            if (
                name !== '' &&
                name.length >= 3 &&
                (email !== '' && email.length >= 5)
            ) {
                axios.post('/session/load', { name, email }).then(response => {
                    chat.userId = email;
                    chat.room = response.data;
                    helpers.ShowAppropriateChatDisplay();
                    console.log(response);
                });
            } else {
                alert('Enter a valid name and email.');
            }
            evt.preventDefault();
        },
    };

    // ----------------------------------------------------
    // Register page event listeners
    // ----------------------------------------------------

    chatPage.ready(helpers.ShowAppropriateChatDisplay);
    // chatHeader.on('click', helpers.ToggleChatWindow);

    chatBody.find('#loginScreenForm').on('submit', helpers.LogIntoChatSession);
    chatBody.find('#messageSupport').on('submit', helpers.SendMessageToSupport);
    chatBody.find('#messageSupport').on('keyup', helpers.SendTypingEvent);

}
export { exportChat };
// })();
