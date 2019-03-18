## confme

Opinionated config library that allows you to have complex config and behaves according to "Twelve Factor App" rules.

- It is build on top of ["dotenv-defaults"](https://www.npmjs.com/package/dotenv-defaults)
- Uses [LIVR](https://www.npmjs.com/package/livr) ([with extra rules](https://www.npmjs.com/package/livr-extra-rules)) for config schema validation.
- Follows the ideas of ["Twelve Factor App"](https://12factor.net/config)

### How does it work?

"confme" loads your config and replaces placeholders with environment variables. For environemnt loading it uses ["dotenv-defaults"](https://www.npmjs.com/package/dotenv-defaults), so you can create ".env.defaults" file to set default values of environment variables. If you have placeholders for non set environment variables then "confme" will throw an error.

You can pass a path to a JSON file with [LIVR](https://www.npmjs.com/package/livr) rules as a second argument. In this case, it will use [LIVR](https://www.npmjs.com/package/livr) ([with extra rules](https://www.npmjs.com/package/livr-extra-rules)) to validate the config.

### Usage examples

**Load config**

```javascript
const confme = require("confme");
const config = confme(__dirname + "/config.json");
```

**Load config with validation**

```javascript
const confme = require("confme");

const config = confme(
  __dirname + "/config.json",
  __dirname + "/config-schema.json"
);
```

**Example config**

Placeholders are optional

```json
{
  "listenPort": "{{PORT}}",
  "apiPath": "https://{{DOMAIN}}:{{PORT}}/api/v1",
  "staticUrl": "https://{{DOMAIN}}:{{PORT}}/static",
  "mainPage": "https://{{DOMAIN}}:{{PORT}}",
  "mail": {
    "from": "MyApp",
    "transport": "SMTP",
    "auth": {
      "user": "{{SMTP_USER}}",
      "pass": "{{SMTP_PASS}}"
    }
  }
}
```

**Example LIVR schema**

See [LIVR](https://www.npmjs.com/package/livr) for details.

```json
{
  "listenPort": ["required", "positive_integer"],
  "apiPath": ["required", "url"],
  "staticUrl": ["required", "url"],
  "mainPage": ["required", "url"],
  "mail": ["required", {"nested_object": {
    "from": ["required", "string"],
    "transport": ["required", {"one_of": ["SMTP", "SENDMAIL"] }],
    "auth": {"nested_object": {
      "user": ["required", "string"],
      "pass": ["required", "string"]
    }}
  }}]
}
```

**Full example in [examples folder](./examples).**

Try it with

- `node app.js`
- `DOMAIN=myapp.com PORT=80 node app.js`