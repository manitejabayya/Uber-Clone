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
