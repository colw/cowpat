# News Reader

A simple news aggregator in the browser.

News feeds are fetched periodically and if the date of the article is a recent one, it is sent to the user.

Used on conjuction with the Node.js [feed reader](https://github.com/colw/ruminator)

- [Socket.io](http://socket.io) is used for communicating with the browser.
- Facebook's [React](http://facebook.github.io/react) is used to render in the browser.
- [SASS](http://sass-lang.com) for CSS.
- [Webpack](http://webpack.github.io/) for building (incl. ES6 and JSX)

## Install and Run

You will need `node` and `npm` installed.

Clone the repository, install the necessary dependencies and run:

    git clone https://github.com/colw/cowpat.git
    cd cowpat
    npm install
    npm run dev

Go to [http://localhost:5000](http://localhost:5000) to view it.
