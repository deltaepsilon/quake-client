var convict = require('convict'),
  conf = convict({
    env: {
      doc: "The applicaton environment.",
      format: ["production", "development", "test"],
      default: "development",
      env: "NODE_ENV"
    },
    ip: {
      doc: "The IP address to bind.",
      format: "ipaddress",
      default: "127.0.0.1",
      env: "QUIVER_HOST"
    },
    port: {
      doc: "The port to bind.",
      format: "port",
      default: 9000,
      env: "QUIVER_PORT"
    },
    sessionSecret: {
      doc: "Connect session secret",
      format: "*",
      default: "You should really change this",
      env: "QUIVER_SESSION_SECRET"
    }
  });

conf.validate();

module.exports = conf;
