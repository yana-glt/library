# Online Library

## Description
This is an Online Library implemented in Node.js and TypeScript.

After registration, the user must sign in, after that he will get access to the Home page, where the latest book releases added to the library are presented.

The user will also get access to a page with a list of authors and a list of their books, and a list of genres, 
as well as the ability to search, edit, delete them and add new books (after adding new author and genre, if this data is not contained in the database yet). 

The application also offers the option of viewing reviews of a book and writing your own review.

The user can also use the Contact page to leave comments, remarks or suggestions.


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




## Registration
- Description
    
The user registration API creates a user account in application. A registration request must provide a user object as a collection of key/value properties. The collection must contain a property "email" and "password".  Password will be stored in the database in encrypted form.
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

## Add author
- Description
  
This endpoint provides the ability to add new author to the library.
- Endpoint http://localhost:3000/author
- Method: POST
- Request Body
```
{
  "name": "Author",
  "country": "Country"
}
```
- Response Body
```
{
  "name": "Author",
  "country": "Country",
  "books": [
    
  ],
  "_id": "6584be96ceb678f4b32cd066",
  "createdAt": "2023-12-21T22:39:18.786Z",
  "updatedAt": "2023-12-21T22:39:18.786Z",
  "__v": 0
}
```

## Edit author
- Description
  
This endpoint provides the ability to edit author.
- Endpoint http://localhost:3000/author/:id
- Method: POST
- Parameter: id
- Request Body
```
{
  "name": "New Author",
  "country": "New Country"
}
```
- Response Body
```
{
  "_id": "6584be96ceb678f4b32cd066",
  "name": "New Author",
  "country": "New Country",
  "books": [
    "6584c0c8f6b16a6a9ebc88b8"
  ],
  "createdAt": "2023-12-21T22:39:18.786Z",
  "updatedAt": "2023-12-21T23:06:13.639Z",
  "__v": 1
}
```

## Delete author
- Description
  
This endpoint provides the ability to delete a particular author.
- Endpoint http://localhost:3000/author/:id?_method=DELETE
- Method: DELETE
- Parameter: id
- Response Body
```
{
  "_id": "6584be96ceb678f4b32cd066",
  "name": "New Author",
  "country": "New Country",
  "books": [
    
  ],
  "createdAt": "2023-12-21T22:39:18.786Z",
  "updatedAt": "2023-12-21T23:14:12.361Z",
  "__v": 2
}
```

## Search author
- Description
  
This endpoint provides the ability to search by author name
- Endpoint http://localhost:3000/author?name=Joyce
- Method: GET
- Parameter: name
- Response Body
  
  JSON array containing all authors matching a given search condition

## Get all authors
- Description
  
This endpoint provide access to all authors added to the library.
- Endpoint http://localhost:3000/author
- Method: GET
- Response Body
  
  JSON array containing all authors

## Add genre
- Description
  
This endpoint provides the ability to add new genre to the library.
- Endpoint http://localhost:3000/genre
- Method: POST
- Request Body
```
{
  "name": "Genre",
  "description": "Genre Description"
}
```
- Response Body
```
{
  "name": "Genre",
  "description": "Genre Description",
  "books": [
    
  ],
  "_id": "6584bf31694d8efbcdad9910",
  "__v": 0
}
```

## Edit genre
- Description
  
This endpoint provides the ability to edit genre.
- Endpoint http://localhost:3000/genre/:id
- Method: POST
- Parameter: id
- Request Body
```
{
  "name": "New Genre",
  "description": " New Genre Description"
}
```
- Response Body
```
{
  "_id": "6584bf31694d8efbcdad9910",
  "name": "New Genre",
  "description": " New Genre Description",
  "books": [
    "6584c0c8f6b16a6a9ebc88b8"
  ],
  "__v": 1
}
```

## Delete genre
- Description
  
This endpoint provides the ability to delete a particular genre.
- Endpoint http://localhost:3000/genre/:id?_method=DELETE
- Method: DELETE
- Parameter: id
- Response Body
```
{
  "_id": "6584bf31694d8efbcdad9910",
  "name": "New Genre",
  "description": " New Genre Description",
  "books": [
    
  ],
  "__v": 2
}
```

## Search genre
- Description
  
This endpoint provides the ability to search by genre name
- Endpoint http://localhost:3000/genre?name=fiction
- Method: GET
- Parameter: name
- Response Body
  
  JSON array containing all genres matching a given search condition

## Get latest added books
- Description
  
After sign in user will get access to the latest book releases added to the library. 
- Endpoint http://localhost:3000/
- Method: GET
- Response Body 

    JSON array containing the 2 books most recently added to the library

## Add book

- Description

This endpoint provides the ability to add new book to the library.
- Endpoint http://localhost:3000/book
- Method: POST
- Request Body
```
{
  "title": "Title",
  "author": "6584be96ceb678f4b32cd066",
  "genre": "6584bf31694d8efbcdad9910",
  "publishDate": "2023-12-21T00:00:00.000Z",
  "pageCount": 100,
  "description": "Book Description"
}
```
- Response Body
```
{
  "title": "Title",
  "description": "Book Description",
  "genre": "6584bf31694d8efbcdad9910",
  "publishDate": "2023-12-21T00:00:00.000Z",
  "pageCount": 100,
  "author": "6584be96ceb678f4b32cd066",
  "reviews": [
    
  ],
  "_id": "6584c0c8f6b16a6a9ebc88b8",
  "cover": {
    "type": "Buffer",
    "data": [
      ...
    ]
  },
  "coverType": "image/jpeg",
  "createdAt": "2023-12-21T22:48:40.468Z",
  "updatedAt": "2023-12-21T22:48:40.468Z",
  "__v": 0
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
  "title": "New Title",
  "author": "6584be96ceb678f4b32cd066",
  "genre": "6584bf31694d8efbcdad9910",
  "publishDate": "2023-12-21T11:09:43.938Z",
  "pageCount": 200,
  "description": "New Description"
}
```
- Response Body
```
{
  "_id": "6584c0c8f6b16a6a9ebc88b8",
  "title": "New Title",
  "description": "New Book Description",
  "genre": "6584bf31694d8efbcdad9910",
  "publishDate": "2023-12-21T00:00:00.000Z",
  "pageCount": 200,
  "author": "6584be96ceb678f4b32cd066",
  "reviews": [
    
  ],
  "cover": {
    "type": "Buffer",
    "data": [
      ...
    ]
  },
  "coverType": "image/jpeg",
  "createdAt": "2023-12-21T22:48:40.468Z",
  "updatedAt": "2023-12-21T22:57:34.099Z",
  "__v": 0
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
  "_id": "6584c0c8f6b16a6a9ebc88b8",
  "title": "New Title",
  "description": "New Book Description",
  "genre": "6584bf31694d8efbcdad9910",
  "publishDate": "2023-12-21T00:00:00.000Z",
  "pageCount": 200,
  "author": "6584be96ceb678f4b32cd066",
  "reviews": [
    "6584c3ec69815a91ca48fc9a"
  ],
  "cover": {
    "type": "Buffer",
    "data": [
      ...
    ]
  },
  "coverType": "image/jpeg",
  "createdAt": "2023-12-21T22:48:40.468Z",
  "updatedAt": "2023-12-21T23:02:04.126Z",
  "__v": 1
}
```

## Search book

- Description

This endpoint provides the ability to search by book title
- Endpoint http://localhost:3000/book?title=ulysses
- Method: GET
- Parameter: title
- Response Body 

    JSON array containing all books matching a given search condition
 
## Get book

- Description

This endpoint provides the ability to retrieve a particular book.
- Endpoint http://localhost:3000/book/:id
- Method: GET
- Parameter: id
- Response Body
```
{
  "_id": "6584c0c8f6b16a6a9ebc88b8",
  "title": "Title",
  "description": "Book Description",
  "genre": {
    "_id": "6584bf31694d8efbcdad9910",
    "name": "Genre",
    "description": "Genre Description",
    "books": [
      "6584c0c8f6b16a6a9ebc88b8"
    ],
    "__v": 1
  },
  "publishDate": "2023-12-21T00:00:00.000Z",
  "pageCount": 100,
  "author": {
    "_id": "6584be96ceb678f4b32cd066",
    "name": "Author",
    "country": "Country",
    "books": [
      "6584c0c8f6b16a6a9ebc88b8"
    ],
    "createdAt": "2023-12-21T22:39:18.786Z",
    "updatedAt": "2023-12-21T22:48:40.556Z",
    "__v": 1
  },
  "reviews": [
    
  ],
  "cover": {
    "type": "Buffer",
    "data": [
      ...
    ]
  },
  "coverType": "image/jpeg",
  "createdAt": "2023-12-21T22:48:40.468Z",
  "updatedAt": "2023-12-21T22:48:40.468Z",
  "__v": 0
}
```

## Get all available books

- Description

This endpoint provide access to all books added to the library. 
- Endpoint http://localhost:3000/book
- Method: GET
- Response Body 

    JSON array containing all books 

## Add review
- Description

This endpoint provides the ability to add new review for a particular book
- Endpoint http://localhost:3000/book/:id/review
- Method: POST
- Parameter: id
- Request Body
```
{
  "nickname": "reviewer",
  "message": "Review"
}
```
- Response Body
```
{
  "nickname": "reviewer",
  "email": "example@example.com",
  "book": "6584c0c8f6b16a6a9ebc88b8",
  "message": "Review",
  "_id": "6584c3ec69815a91ca48fc9a",
  "createdAt": "2023-12-21T23:02:04.028Z",
  "updatedAt": "2023-12-21T23:02:04.028Z",
  "__v": 0
}
```

## View book reviews

- Description

This endpoint provides access to all reviews for a particular book.
- Endpoint http://localhost:3000/book/:id/review
- Method: GET
- Parameter: id
- Response Body 

    JSON array containing all reviews for a particular book

## Add magazine type
- Description

This endpoint provides the ability to add new magazine type to the library.
- Endpoint http://localhost:3000/type
- Method: POST
- Request Body
```
{
  "name": "Type",
  "description": "Type Description"
}
```
- Response Body
```
{
  "name": "Type",
  "description": "Type Description",
  "magazines": [
    
  ],
  "_id": "6584bf31694d8efbcdad8812",
  "__v": 0
}
```


## Edit magazine type
- Description

This endpoint provides the ability to edit magazine type.

- Endpoint http://localhost:3000/type/:id
- Method: POST
- Parameter: id
- Request Body
```
{
  "name": "New Genre",
  "description": " New Genre Description"
}
```
- Response Body
```
{
  "_id": "6584bf31694d8efbcdad8812",
  "name": "New Type",
  "description": " New Type Description",
  "magazines": [
    "6584c0c8f6b16a6a9ebc77b7"
  ],
  "__v": 1
}
```

## Delete magazine type
- Description

This endpoint provides the ability to delete a particular magazine type.

- Endpoint http://localhost:3000/type/:id?_method=DELETE
- Method: DELETE
- Parameter: id
- Response Body
```
{
  "_id": "6584bf31694d8efbcdad8812",
  "name": "New Type",
  "description": " New Type Description",
  "magazines": [
    
  ],
  "__v": 1
}
```

## Search magazine type
- Description

This endpoint provides the ability to search by magazine type name

- Endpoint http://localhost:3000/type?name=science
- Method: GET
- Parameter: name
- Response Body

  JSON array containing all magazine types matching a given search condition

## Add magazine
- Description

This endpoint provides the ability to add new magazine to the library.

- Endpoint http://localhost:3000/magazine
- Method: POST
- Request Body
```
{
  "title": "Title",
  "magazineType": "6584bf31694d8efbcdad8812",
  "publishDate": "2023-12-21T00:00:00.000Z",
  "pageCount": 50
}
```
- Response Body
```
{
  "title": "Title",
  "magazineType": "6584bf31694d8efbcdad8812",
  "publishDate": "2023-12-21T00:00:00.000Z",
  "pageCount": 50,
  "_id": "6584c0c8f6b16a6a9ebc77b7",
  "cover": {
    "type": "Buffer",
    "data": [
      ...
    ]
  },
  "coverType": "image/jpeg",
  "createdAt": "2023-12-21T23:48:40.468Z",
  "updatedAt": "2023-12-21T23:48:40.468Z",
  "__v": 0
}
```

## Edit magazine
- Description

This endpoint provides the ability to edit magazine.

- Endpoint http://localhost:3000/magazine/:id
- Method: POST
- Parameter: id
- Request Body
```
{
  "title": "New Title",
  "magazineType": "6584bf31694d8efbcdad8812",
  "publishDate": "2023-12-21T11:09:43.938Z",
  "pageCount": 80
}

```
- Response Body
```
{
  "_id": "6584c0c8f6b16a6a9ebc77b7",
  "title": "New Title",
  "magazineType": "6584bf31694d8efbcdad8812",
  "publishDate": "2023-12-21T00:00:00.000Z",
  "pageCount": 80,
  "cover": {
    "type": "Buffer",
    "data": [
      ...
    ]
  },
  "coverType": "image/jpeg",
  "createdAt": "2023-12-21T23:48:40.468Z",
  "updatedAt": "2023-12-21T23:57:34.099Z",
  "__v": 1
}
```

## Delete magazine
- Description

This endpoint provides the ability to delete a particular magazine.

- Endpoint http://localhost:3000/magazine/:id?_method=DELETE
- Method: DELETE
- Parameter: id
- Response Body
```
{
  "_id": "6584c0c8f6b16a6a9ebc77b7",
  "title": "New Title",
  "magazineType": "6584bf31694d8efbcdad8812",
  "publishDate": "2023-12-21T00:00:00.000Z",
  "pageCount": 80,
  "cover": {
    "type": "Buffer",
    "data": [
      ...
    ]
  },
  "coverType": "image/jpeg",
  "createdAt": "2023-12-21T23:48:40.468Z",
  "updatedAt": "2023-12-21T23:52:04.126Z",
  "__v": 1
}
```

## Search magazine
- Description

This endpoint provides the ability to search by magazine title

- Endpoint http://localhost:3000/magazine?title=lancet
- Method: GET
- Parameter: title
- Response Body

  JSON array containing all magazines matching a given search condition

## Get magazine
- Description

This endpoint provides the ability to retrieve a particular magazine.

- Endpoint http://localhost:3000/magazine/:id
- Method: GET
- Parameter: id
- Response Body
```
{
  "_id": "6584c0c8f6b16a6a9ebc77b7",
  "title": "Title",
  "magazineType": {
    "_id": "6584bf31694d8efbcdad8812",
    "name": "Type",
    "description": "Type Description",
    "magazines": [
      "6584c0c8f6b16a6a9ebc77b7"
    ],
    "__v": 1
  },
  "publishDate": "2023-12-21T00:00:00.000Z",
  "pageCount": 50,
  "cover": {
    "type": "Buffer",
    "data": [
      ...
    ]
  },
  "coverType": "image/jpeg",
  "createdAt": "2023-12-21T23:48:40.468Z",
  "updatedAt": "2023-12-21T23:48:40.468Z",
  "__v": 0
}
```

## Get all available magazines
- Description

This endpoint provide access to all magazines added to the library.

- Endpoint http://localhost:3000/magazine
- Method: GET
- Response Body

  JSON array containing all magazines

## Send message
- Description
  
This endpoint provides the ability to send a message to the library developer
- Endpoint http://localhost:3000/contact
- Method: POST
- Request Body
```
{
  "name": "user",
  "email": "example@example.com",
  "subject": "Title",
  "message": "Message"
}
```
- Response Body
```
{
  "name": "user",
  "email": "example@example.com",
  "subject": "Title",
  "message": "Message",
  "_id": "6584c6315d2449d5b0d6f39e",
  "createdAt": "2023-12-21T23:11:45.018Z",
  "updatedAt": "2023-12-21T23:11:45.018Z",
  "__v": 0
}
```

## Sign out

- Description

The Signout operation terminates user session by cleaning the cookies. The user accessToken is required for successful Signout operation.
- Endpoint    http://localhost:3000/user/signout
- Method: GET
  
