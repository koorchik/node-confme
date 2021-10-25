## confme

Opinionated config library that allows you to have complex config, and behaves according to "Twelve Factor App" rules.

- It is build on top of [dotenv-defaults](https://www.npmjs.com/package/dotenv-defaults)
- Uses [LIVR](https://www.npmjs.com/package/livr) ([with extra rules](https://www.npmjs.com/package/livr-extra-rules)) for config schema validation.
- Follows the ideas of [Twelve Factor App](https://12factor.net/config)

Read [Motivation section](#motivation)

So, it suits well for:

1. Local development
2. Docker environment
3. AWS Lambda and alternatives 

### How does it work?

"confme" loads your config and replaces placeholders with environment variables. For environemnt loading it uses [dotenv-defaults](https://www.npmjs.com/package/dotenv-defaults), so you can create ".env.defaults" file to set default values of environment variables. If you have placeholders for non set environment variables then "confme" will throw an error.

You can pass a path to a JSON/JSON5 file with [LIVR](https://www.npmjs.com/package/livr) rules as a second argument. In this case, it will use [LIVR](https://www.npmjs.com/package/livr) ([with extra rules](https://www.npmjs.com/package/livr-extra-rules)) to validate the config.

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


### Motivation

According to [Twelve Factor App](https://12factor.net/config), your config should be passed in envrironment variables. If you are not familiar with ideas of "Twelve Factor App," you should definitely read it.

Having all config variables in env variables is very flexible. You can run your app with docker and without docker. Moreover, you can reuse the same builds across all environments. For example, you can build an image, test it on QA and then run the same image well-tested imaged on production.  

But passing the conf in environment variables is not very convenient. So, there a popular library called [dotenv](dotenv) which allows you to store environment variables in ".env" files. But you should not commit them and you should have a sample in repository (like ".env.sample" which will be copied to ".env" on deployments without docker).

You can use [dotenv-defaults](https://www.npmjs.com/package/dotenv-defaults) which allows you to have file ".env.defaults" with default values commited to your repository. 

But in real life, if you have rather complex configs and you do not want to define all of the values in ENV, you want to use your config as a template and build final config based on this template. It is very common approach for ansible users. **confme** allows you to do that.

Moreover, **confme** allows you to define [LIVR](http://livr-spec.org/) schema to validate configurations. It can be helpful if you have complex configs with a lot of options but I prefer to use validation schema even with small configs.
