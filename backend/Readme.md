# User Management API

## Overview
This API provides endpoints for user registration, login, and profile management. It utilizes JSON Web Tokens (JWT) for authentication and ensures secure password storage through hashing.

## Endpoints

### User Registration
- **URL:** `/api/user/register`
- **Method:** `POST`
- **Authentication:** None required for registration.

#### Description
Registers a new user by creating a user account in the database and issuing a JWT for authentication.

#### Request Format

### Headers
- `Content-Type: application/json`

### Body
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

#### Response

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

### User Login
- **URL:** `/api/user/login`
- **Method:** `POST`
- **Authentication:** None required for login.

#### Description
Authenticates an existing user by verifying their email and password, issuing a JWT for future requests.

#### Request Format

### Headers
- `Content-Type: application/json`

### Body
```json
{
    "email": "john.doe@example.com",
    "password": "yourSecurePassword"
}
```

### Required Fields
- `email` (String): The email address of the user (required).
- `password` (String): The password for the user account (required).

#### Response

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

### User Profile
- **URL:** `/api/user/profile`
- **Method:** `GET`
- **Authentication:** Bearer token required.

#### Description
Retrieves the profile information of the currently logged-in user.

#### Request Format

### Headers
- `Content-Type: application/json`
- `Authorization: Bearer yourJWTtoken`

#### Response

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
    }
}
```

### Error Response
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