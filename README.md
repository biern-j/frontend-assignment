# Schibsted frontend task app

This is a very basic npm project with default webpack setup.

You should use this project as a base for your solution.
Feel free to modify/extend this with whatever you need.

In case you need some assistance take a look at official webpack docs:
 - [Guides](https://webpack.js.org/guides/) 
 - [Concepts](https://webpack.js.org/concepts/)

Eventually this application will request live data from a real API.

You can find the full description of your assignment in [ASSIGNMENT.md](ASSIGNMENT.md)

## API Documentation
Api server can be found in `server.js` file. You should not modify this file, only use it.

To run the server do:
> `$ node server.js`

Server will start listening on port `6010`.

The server has 2 endpoints:

`/articles/sports` - returns a list of articles from `sport` category

`/articles/fashion` - returns a list of articles from `fashion` category

Be aware of backend errors!
