# User Registration API

## Overview
This API allows users to register by providing their details. It creates a new user in the database and returns a JSON Web Token (JWT) for authentication.

## API Endpoint

### Register User
- **URL:** `/api/user/register`
- **Method:** `POST`
- **Authentication:** None required for registration.

#### Description
The `/api/user/register` endpoint is used to create a new user account. Users must provide their first name, last name (optional), email, and password. Upon successful registration, the API will return a JWT that can be used for authenticating future requests.

## Request Format

### Headers
- `Content-Type: application/json`

### Body
The request body must be a JSON object containing the following fields:

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourSecurePassword"
}
```

### Required Fields
- `firstname` (String): The first name of the user (required, minimum length: 3).
- `lastname` (String): The last name of the user (optional, minimum length: 3).
- `email` (String): The email address of the user (required, must be unique and valid).
- `password` (String): The password for the user account (required).

## Example Response

### Success Response
- **Status Code:** `201 Created`
- **Response Body:**
```json
{
    "success": true,
    "token": "yourJWTtoken",
    "user": {
        "_id": "userId",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null,
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z",
        "__v": 0
    }
}
```

### Error Response
- **Status Code:** `400 Bad Request` (if required fields are missing)
- **Response Body:**
```json
{
    "error": "Missing Field Firstname"
}
```

## Login User
- **URL:** `/api/user/login`
- **Method:** `POST`
- **Authentication:** None required for login.

#### Description
The `/api/user/login` endpoint is used to authenticate an existing user. Users must provide their email and password. Upon successful login, the API will return a JWT that can be used for authenticating future requests.

### Request Format

### Headers
- `Content-Type: application/json`

### Body
The request body must be a JSON object containing the following fields:

```json
{
    "email": "john.doe@example.com",
    "password": "yourSecurePassword"
}
```

### Required Fields
- `email` (String): The email address of the user (required).
- `password` (String): The password for the user account (required).

## Example Response

### Success Response
- **Status Code:** `200 OK`
- **Response Body:**
```json
{
    "success": true,
    "user": {
        "_id": "userId",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null,
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z",
        "__v": 0
    },
    "token": "yourJWTtoken"
}
```

### Error Response
- **Status Code:** `400 Bad Request` (if email or password is missing)
- **Response Body:**
```json
{
    "error": "Either Email or password is missing"
}
```

## Notes
- Ensure that the email provided is unique; otherwise, the registration will fail.
- Passwords are hashed before being stored in the database for security.

## User Profile
- **URL:** `/api/user/profile`
- **Method:** `GET`
- **Authentication:** Bearer token required.

#### Description
The `/api/user/profile` endpoint is used to retrieve the profile information of the currently logged-in user. The user must be authenticated with a valid JWT token.

### Request Format

### Headers
- `Content-Type: application/json`
- `Authorization: Bearer yourJWTtoken`

### Example Response

#### Success Response
- **Status Code:** `200 OK`
- **Response Body:**
```json
{
    "success": true,
    "user": {
        "_id": "userId",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null,
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z",
        "__v": 0
    }
}
```

#### Error Response
- **Status Code:** `401 Unauthorized` (if the user is not logged in)
- **Response Body:**
```json
{
    "success": false,
    "error": "No user is currently logged in"
}
```
- **Status Code:** `404 Not Found` (if the user is invalid)
- **Response Body:**
```json
{
    "success": false,
    "error": "Invalid user"
}
```