# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It validates the input data and creates a new user in the database.

### Method
`POST`

### Request Body
The request body must be in JSON format and include the following fields:

| Field            | Type   | Required | Description                                      |
|-------------------|--------|----------|--------------------------------------------------|
| `fullname`        | Object | Yes      | An object containing the user's full name.       |
| `fullname.firstname` | String | Yes   | The user's first name (minimum 3 characters).    |
| `fullname.lastname`  | String | Yes   | The user's last name (minimum 3 characters).     |
| `email`           | String | Yes      | The user's email address (must be valid).        |
| `password`        | String | Yes      | The user's password (minimum 6 characters).      |

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Response

#### Success (201 Created)
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

### Status Codes
- `201 Created`: User successfully registered.
- `400 Bad Request`: Validation error in the input data.

## Endpoint: `/users/login`

### Description
This endpoint is used to authenticate a user. It validates the input credentials and returns a JWT token if the credentials are correct.

### Method
`POST`

### Request Body
The request body must be in JSON format and include the following fields:

| Field     | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| `email`   | String | Yes      | The user's email address (must be valid).        |
| `password`| String | Yes      | The user's password (minimum 6 characters).      |

### Example Request
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Response

#### Success (200 OK)
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

#### Error (401 Unauthorized)
```json
{
  "errors": [
    {
      "msg": "Invalid email or password",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Status Codes
- `200 OK`: User successfully authenticated.
- `401 Unauthorized`: Invalid email or password.

## Endpoint: `/users/profile`

### Description
This endpoint is used to retrieve the profile information of the authenticated user.

### Method
`GET`

### Headers
The request must include the following header:

| Header         | Type   | Required | Description                           |
|----------------|--------|----------|---------------------------------------|
| `Authorization`| String | Yes      | Bearer token for user authentication. |

### Example Request
```
GET /users/profile HTTP/1.1
Authorization: Bearer jwt_token_here
```

### Response

#### Success (200 OK)
```json
{
  "_id": "user_id_here",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com"
}
```

#### Error (401 Unauthorized)
```json
{
  "errors": [
    {
      "msg": "Unauthorized access",
      "param": "Authorization",
      "location": "headers"
    }
  ]
}
```

### Status Codes
- `200 OK`: User profile retrieved successfully.
- `401 Unauthorized`: Missing or invalid authentication token.

## Endpoint: `/users/logout`

### Description
This endpoint is used to log out the authenticated user by invalidating their session.

### Method
`POST`

### Headers
The request must include the following header:

| Header         | Type   | Required | Description                           |
|----------------|--------|----------|---------------------------------------|
| `Authorization`| String | Yes      | Bearer token for user authentication. |

### Example Request
```
POST /users/logout HTTP/1.1
Authorization: Bearer jwt_token_here
```

### Response

#### Success (200 OK)
```json
{
  "message": "User successfully logged out"
}
```

#### Error (401 Unauthorized)
```json
{
  "errors": [
    {
      "msg": "Unauthorized access",
      "param": "Authorization",
      "location": "headers"
    }
  ]
}
```

### Status Codes
- `200 OK`: User successfully logged out.
- `401 Unauthorized`: Missing or invalid authentication token.
