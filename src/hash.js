require("dotenv").config({ path: "config.js" });
// const Datastore = require("nedb");
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const cron = require("node-cron");
// const Pusher = require("pusher");

/* get the hash of the url (when the user grants access the final url contains a hash fragment) */
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

export default hash;
