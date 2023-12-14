# Online Library

## Description
This is an Online Library implemented in Node.js and TypeScript.
After registration, the user must log in, after that he will get access to the Home page, where the latest book releases added to the library are presented. 
The user will also get access to a page with a list of authors and a list of their books, 
as well as the ability to search, edit, delete them and add new books (after adding new author, if the author's data is not contained in the database yet). 
The user can also use the Contact page to leave comments, remarks or suggestions.

___

## Dependencies

- [express](https://www.npmjs.com/package/express) - Simplifies writing Server-side Code and Logic handling HTTP requests and responses.
- [dotenv](https://www.npmjs.com/package/dotenv) - Stores configuration in the environment separate from code.
- [mongoose](https://www.npmjs.com/package/mongoose) - ODM library for MongoDB and Node.js that provides a schema-based solution to model application data.
- [body-parser](https://www.npmjs.com/package/body-parser) - Used to process data sent in an HTTP request body.
- [nodemon](https://www.npmjs.com/package/nodemon) - Automatically restarts node application when file changes in the directory are detected.
- [ts-node](https://www.npmjs.com/package/ts-node) - Used to directly execute TypeScript on Node.js without precompiling.
- [typescript](https://www.npmjs.com/package/typescript) -  Offers static typing allowing to define variable types and catch potential errors during development.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Middleware which parses cookies attached to the client request object.
- [crypto](https://www.npmjs.com/package/crypto) - Provides cryptographic functions to secure Node.js app.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Allows to generate, sign, and verify tokens seamlessly.
- [method-override](https://www.npmjs.com/package/method-override) - Used to override the method for requests to be different from the original request. Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
- [ejs](https://www.npmjs.com/package/ejs) - Generates HTML markup with plain JavaScript.
- [express-ejs-layouts](https://www.npmjs.com/package/express-ejs-layouts) - Extension of ejs that allows server side layouts with ejs templates.
- [express-fileupload](https://www.npmjs.com/package/express-fileupload) - Middleware for uploading files and accessing them from req.files.
- [log4js](https://www.npmjs.com/package/log4js) - JavaScript library to record events – errors and routine system operations.
- [npm-run-all](https://www.npmjs.com/package/npm-run-all) - Allows to run multiple npm-scripts in sequential.
- [shelljs](https://www.npmjs.com/package/shelljs) -  Implementation of Unix shell commands on top of the Node.js API.
- [@types/express](https://www.npmjs.com/package/@types/express) - Provides type definitions for express.
- [@types/cookie-parser](https://www.npmjs.com/package/@types/cookie-parser) - Provides type definitions for cookie-parser.
- [@types/express-ejs-layouts](https://www.npmjs.com/package/@types/express-ejs-layouts) - Provides type definitions contains for express-ejs-layouts.
- [@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken) - Provides type definitions for jsonwebtoken.
- [@types/method-override](https://www.npmjs.com/package/@types/method-override) - Provides type definitions for method-override.
- [@types/express-fileupload](https://www.npmjs.com/package/@types/express-fileupload) - Provides type definitions for express-fileupload.
- [@types/shelljs](https://www.npmjs.com/package/@types/shelljs) - Provides type definitions for shelljs.
  
___  
  
## Getting Started

### Prerequisites

- [X] Node.js
- [X] npm
- [X] MongoDB

### Installation

- [X] Clone this repository.
```
git clone https://github.com/yana-glt/library.git
```

- [X] Open package with project in your IDE
- [X] Install dependencies npm install
```
npm install
```
- [X] Create your MohgoDb database and setup .env file with credentials.
- [X] Run application

## Usage

```
npm run start 
```