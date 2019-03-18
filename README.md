## confme

Opinionated config library that allows you to have complex config and behaves according to 12-factors apps rules.

- It is build on top of "dotenv-defaults"
- Uses LIVR (with extra rules) for config schema validation.
- Follows the ideas of 12 factors app

```javascript
const confme = require("confme");
const config = confme(__dirname + "/config.json");
```

```javascript
const confme = require("confme");

const config = confme(
  __dirname + "/config.json",
  __dirname + "/config-schema.json"
);
```

Full example in [examples folder](./examples)
