# Url-Shortener
The application takes a URL and converts it into tiny url. If there is an exisitng url which matches a url in the database, the system
just returns the shortened version or else, it firstly shortens it and saves it into mongoDB and then returns the tiny url. It is based on Javascript, AngularJS, NodeJS, MongoDB.
I have used 64-bit encoding technique to shorten the URLs. 

# Getting started

1. Import/Clone the git repository using  `https://github.com/ripu23/Url-Shortener.git`
2. Install [mongoDB](https://www.mongodb.com/download-center)
3. Install [NodeJS](https://nodejs.org/en/download/)
4. Start mongoDB by typing`mongod` on the terminal.
5. Open the terminal in the folder you have cloned this repository.
6. Start the node server by typing `node server` or if you have nodemon install type `nodemon server.js`.
and you are go to go, the application is up and running on 127.0.0.1:3000. 3000 is the default port, you can configure it by editing the server.js file.
