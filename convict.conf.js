var convict = require('convict'),
  conf = convict({
    env: {
      doc: "The applicaton environment.",
      format: ["production", "development", "test"],
      default: "development",
      env: "NODE_ENV"
    },
    quiver_host: {
      doc: "Quiver host",
      format: "ipaddress",
      default: "127.0.0.1",
      env: "QUIVER_HOST"
    },
    quiver_port: {
      doc: "Quiver port",
      format: "port",
      default: 9000,
      env: "QUIVER_PORT"
    },
    quake_external: {
      doc: "Quake external",
      format: "url",
      default: "https://api.dev.quiver.is",
      env: "QUAKE_EXTERNAL"
    },
    quake_host: {
      doc: "Quake host",
      format: "ipaddress",
      default: "127.0.0.1",
      env: "QUAKE_HOST"
    },
    quake_port: {
      doc: "Quake port",
      format: "port",
      default: 9001,
      env: "QUAKE_PORT"
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
