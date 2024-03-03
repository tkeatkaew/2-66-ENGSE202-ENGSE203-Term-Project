const express = require("express");
const cors = require("cors");
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.paths = {
      auth: "/api/auth",
      homepage: "/api/homepage",
      users: "/api/users",
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    /*
    // Pick up React index.html file
    this.app.use(
      express.static(path.join(__dirname, "../../client/build"))
    );
    */

  }

  // Bind controllers to routes
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.homepage, require("../routes/homepage"));
    this.app.use(this.paths.users, require("../routes/users"));

    // Catch all requests that don't match any route
    this.app.get("*", (req, res) => {
      /*
      res.sendFile(
        path.join(__dirname, "../../client/build/index.html")
      );
      */
      res.send("<h1>Hello, This is API Back-end of Thanit.</h1>");
    });

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;
