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
      env: "QUIVER_IP_ADDRESS"
    },
    port: {
      doc: "The port to bind.",
      format: "port",
      default: 8080,
      env: "QUIVER_PORT"
    }
  });

conf.validate();

module.exports = conf;