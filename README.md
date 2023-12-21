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
  
```
npm run start 
```

## Usage
Application implements the following features for diferent users correspondingly.

### Unauthenticated Users

- [Register in the application](#registration) 

- [Sign into the application](#sign-in)
  
### Authenticated Users

- [View the latest books added to the application](#latest-added-books) 

- [View all available books in the application](#all-available-books) 
  
- [Search the book by title](#search-book) 

- [View the particular book in the application](#view-book) 
  
- [Add the book with details like book title, author, genre, description, number of pages, publication date, cover](#add-book) 

- [Edit the particular book detail](#edit-book) 

- [Delete the book](#delete-book) 
  
- View all reviews for the selected book http://localhost:3000/book/:id/review

- Add review for the selected book http://localhost:3000/book/:id/review/new

- View all available authors in the application http://localhost:3000/author

- Add the author with details like country http://localhost:3000/author/new

- Search the author by name http://localhost:3000/author?name=Joyce

- Edit the particular author detail http://localhost:3000/author/:id/edit

- Delete the author http://localhost:3000/author/:id?_method=DELETE

- View all available genres in the application http://localhost:3000/genre

- Add the genre with brief description http://localhost:3000/genre/new

- Search the genre by name http://localhost:3000/genre?name=fiction

- Edit the particular genre detail http://localhost:3000/genre/:id/edit

- Delete the genre http://localhost:3000/genre/:id?_method=DELETE

- Contact the library developer http://localhost:3000/contact

- [Sign out of the application](#sign-out)


## Registration
- Description
    
The user registration API creates a user account in application. A registration request must provide a user object as a collection of key/value properties. The collection must contain a property "email" and "password".
- Endpoint   http://localhost:3000/user/register
- Method: POST
- Request Body
```
{  
  "email" : "example@example.com",  
  "password" : "password",   
}
```
- Response Body
```
{
  "_id": "65841cbbf85e675e96010f9b",
  "email": "example@example.com",
  "password": "0TcPF457RaicgoroBpWehw==",
  "role": "user",
  "createdAt": "2023-12-21T11:08:43.938Z",
  "updatedAt": "2023-12-21T11:08:43.938Z",
  "__v": 0
}
```
## Sign in
- Description
  
Registered users can sign in using the API described below. The sign in operation requires two properties: email and password. The application automatically generates an access token for each successfully logged in user and stores it in the cookies.
- Endpoint    http://localhost:3000/user/signin
- Method: POST
- Request Body
```
{  
  "email" : "example@example.com",  
  "password" : "password",   
}
```
- Response Body
```
{
  "_id": "65841cbbf85e675e96010f9b",
  "email": "example@example.com",
  "password": "0TcPF457RaicgoroBpWehw==",
  "role": "user",
  "createdAt": "2023-12-21T11:08:43.938Z",
  "updatedAt": "2023-12-21T11:08:43.938Z",
  "__v": 0
}
```
## Latest added books

- Description
  
After sign in user will get access to the latest book releases added to the library. 
- Endpoint http://localhost:3000/
- Method: GET
- Response Body 

    JSON array containing the 2 books most recently added to the library

## All available books

- Description

This endpoint provide access to all books added to the library. 
- Endpoint http://localhost:3000/book
- Method: GET
- Response Body 

    JSON array containing all books 

## Search book

- Description

This endpoint provides the ability to search by book title
- Endpoint http://localhost:3000/book?title=ulysses
- Method: GET
- Parameter: title
- Response Body 

    JSON array containing all books matching a given search condition

## View book

- Description

This endpoint provides the ability to retrieve a particular book.
- Endpoint http://localhost:3000/book/:id
- Method: GET
- Parameter: id
- Response Body
```
{
 
}
```

## Add book

- Description

This endpoint provides the ability to add new book to the library.
- Endpoint http://localhost:3000/book
- Method: POST
- Request Body
```
{
  "title": "title",
  "author": "6581651418ea89b55547ab06",
  "genre": "6581652a18ea89b55547ab0f",
  "publishDate": "2023-12-21T11:09:43.938Z",
  "pageCount": 100,
  "description": "description"
}
```
- Response Body
```
{
 
}
```

## Edit book

- Description

This endpoint provides the ability to edit book.
- Endpoint http://localhost:3000/book/:id
- Method: POST
- Parameter: id
- Request Body
```
{
  "title": "newTitle",
  "author": "6581651418ea89b55547ab06",
  "genre": "6581652a18ea89b55547ab0f",
  "publishDate": "2023-12-21T11:09:43.938Z",
  "pageCount": 200,
  "description": "newDdescription"
}
```
- Response Body
```
{
 
}
```
## Delete book

- Description

This endpoint provides the ability to delete a particular book.
- Endpoint http://localhost:3000/book/:id?_method=DELETE
- Method: DELETE
- Parameter: id
- Response Body
```
{
 
}
```
http://localhost:3000/book/:id?_method=DELETE

## Sign out

- Description

The Signout operation terminates user session by cleaning the cookies. The user accessToken is required for successful Signout operation.
- Endpoint    http://localhost:3000/user/signout
- Method: GET