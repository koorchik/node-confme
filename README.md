## confme

Opinionated config library that allows you to have complex config and behaves according to 12-factors apps rules.

- It is build on top of "dotenv-defaults"
- Uses LIVR (with extra rules) for config schema validation.
- Follows the ideas of 12 factors app

### How does it work?

"confme" loads your config and replaces placeholders with environment variables. For environemnt loading it uses "dotenv-defaults", so you can create ".env.defaults" file to set default values of environment variables. If you have placeholders for non set environment variables then "confme" will throw an error.

You can pass a path to a JSON file with LIVR rules as a second argument. In this case, it will use LIVR (with extra rules) to validate the config.

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
