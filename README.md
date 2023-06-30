# Football Manager

# Setup

```sh
$ npm install
$ npm run lerna-bootstrap
$ npm run lerna-build-dev
```

# Build Configuration

## ts-node

ts-node works by registering hooks for .ts, .tsx, .js, and/or .jsx extensions.
Vanilla node loads .js by reading code from disk and executing it. 
ts-node runs in the middle, transforming code from TypeScript to JavaScript and 
passing the result to node for execution.
This transformation will respect the tsconfig.json as if you compiled via tsc.

*Note: In case of a monorepo ts-node will only compile the local package. All dependencies
(external or local scope) needs to be pre compiled by tsc.*

*Note: When launching a debugging process with VSCode (e.g. for the initialize package) 
by using the following launch config,
ts-node was not compiling and instead the pre compiled files from the dist folder were executed.*

```json
{
  "type": "node",
  "request": "launch",
  "name": "initialize (ts-node)",
  "cwd": "${workspaceRoot}/packages/initialize",
  "runtimeArgs": [
      "-r",
      "ts-node/register"
  ],
  "program": "${workspaceRoot}/packages/initialize/src/start.ts",
  "args": []
},
```

The solution was to prepare an npm script and to use it with the launch configuration:
```json
{
  "name": "initialize (ts-node)",
  "type": "node",
  "request": "launch",
  "cwd": "${workspaceRoot}/packages/initialize",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run-script", "start:dev"]
},
```

# Authentication and Authorization

- Email and Password
- JWT
- Refresh Token Rotation with Reuse Detection


# Links 

## Angular

https://angular.io/guide/rx-library

## Typescript 

https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/
https://blog.logrocket.com/using-sequelize-with-typescript/

## Authentication with Express Session and Passport

https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d

## Authentication with JWT

https://dev-academy.com/angular-user-login-and-registration-guide-cookies-and-jwt/
https://dev-academy.com/angular-jwt/
https://github.com/bartosz-io/budget-angular
https://www.codemag.com/article/1711021/Logging-in-Angular-Applications
https://auth0.com/blog/amp/refresh-tokens-what-are-they-and-when-to-use-them/