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
    stripe_pk: {
      doc: "Stripe publishable key",
      format: "*",
      default: "This is totally invalid. Fix it.",
      env: "QUIVER_STRIPE_PK"
    },
    sessionSecret: {
      doc: "Connect session secret",
      format: "*",
      default: "You should really change this",
      env: "QUIVER_SESSION_SECRET"
    },
    admin_user: {
      doc: "Quiver admin user hash",
      format: "*",
      default: "You really suck if you cannot change this",
      env: "QUIVER_ADMIN_USER"
    },
    admin_pass: {
      doc: "Quiver admin password hash",
      format: "*",
      default: "You really suck if you cannot change this",
      env: "QUIVER_ADMIN_PASS"
    }
  });

conf.validate();

module.exports = conf;
