## confme

Opinionated config library that allows you to have complex config and behaves according to "Twelve Factor App" rules.

- It is build on top of [dotenv-defaults](https://www.npmjs.com/package/dotenv-defaults)
- Uses [LIVR](https://www.npmjs.com/package/livr) ([with extra rules](https://www.npmjs.com/package/livr-extra-rules)) for config schema validation.
- Follows the ideas of [Twelve Factor App](https://12factor.net/config)

### How does it work?

"confme" loads your config and replaces placeholders with environment variables. For environemnt loading it uses [dotenv-defaults](https://www.npmjs.com/package/dotenv-defaults), so you can create ".env.defaults" file to set default values of environment variables. If you have placeholders for non set environment variables then "confme" will throw an error.

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
You can play with it [in livr playground](http://webbylab.github.io/livr-playground/#%7B%22rules%22%3A%22%7B%5Cn%20%20%5C%22listenPort%5C%22%3A%20%5B%5C%22required%5C%22%2C%20%5C%22positive_integer%5C%22%5D%2C%5Cn%20%20%5C%22apiPath%5C%22%3A%20%5B%5C%22required%5C%22%2C%20%5C%22url%5C%22%5D%2C%5Cn%20%20%5C%22staticUrl%5C%22%3A%20%5B%5C%22required%5C%22%2C%20%5C%22url%5C%22%5D%2C%5Cn%20%20%5C%22mainPage%5C%22%3A%20%5B%5C%22required%5C%22%2C%20%5C%22url%5C%22%5D%2C%5Cn%20%20%5C%22mail%5C%22%3A%20%5B%5C%22required%5C%22%2C%20%7B%5C%22nested_object%5C%22%3A%20%7B%5Cn%20%20%20%5C%22from%5C%22%3A%20%5B%5C%22required%5C%22%2C%20%5C%22string%5C%22%5D%2C%5Cn%20%20%20%5C%22transport%5C%22%3A%20%5B%5C%22required%5C%22%2C%20%7B%5C%22one_of%5C%22%3A%20%5B%5C%22SMTP%5C%22%2C%20%5C%22SENDMAIL%5C%22%5D%7D%5D%2C%5Cn%20%20%20%20%5C%22auth%5C%22%3A%20%7B%5C%22nested_object%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%5C%22user%5C%22%3A%20%5B%5C%22required%5C%22%2C%20%5C%22string%5C%22%5D%2C%5Cn%20%20%20%20%20%20%5C%22pass%5C%22%3A%20%5B%5C%22required%5C%22%2C%20%5C%22string%5C%22%5D%5Cn%20%20%20%20%7D%7D%5Cn%20%20%7D%7D%5D%5Cn%7D%22%2C%22data%22%3A%22%7B%20%5Cn%20%20listenPort%3A%203000%2C%5Cn%20%20apiPath%3A%20'https%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1'%2C%5Cn%20%20staticUrl%3A%20'https%3A%2F%2Flocalhost%3A3000%2Fstatic'%2C%5Cn%20%20mainPage%3A%20'https%3A%2F%2Flocalhost%3A3000'%2C%5Cn%20%20mail%3A%20%7B%20from%3A%20'MyApp'%2C%5Cn%20%20%20%20%20transport%3A%20'SMTP'%2C%5Cn%20%20%20%20%20auth%3A%20%7B%20%5Cn%20%20%20%20%20%20%20%20user%3A%20'user'%2C%20%5Cn%20%20%20%20%20%20%20%20pass%3A%20'password'%20%5Cn%20%20%20%20%20%20%7D%20%5Cn%20%20%20%7D%20%5Cn%7D%5Cn%22%7D) 

**Full example in [examples folder](./examples).**

Try it with

- `node app.js`
- `DOMAIN=myapp.com PORT=80 node app.js`
- `PORT='AAA' node app.js`
