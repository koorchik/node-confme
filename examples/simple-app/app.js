const confme = require("../../src/confme");

function main() {
  const config = confme(
    __dirname + "/config.json"
    // __dirname + "/config-schema.json"
  );
  console.log("CONFIG", config);
}

main();
