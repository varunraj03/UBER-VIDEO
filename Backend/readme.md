# User Registration API

## Endpoint

### `POST /users/register`

Registers a new user in the system.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe" // optional
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `fullname.firstname` (string, required): Must be at least 3 characters.
- `fullname.lastname` (string, optional): If provided, must be at least 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Must be at least 6 characters.

---

## Responses

- **201 Created**
  - User registered successfully.
  - Returns a JSON object with a JWT token and the user data.
  - Example:
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - Validation failed (e.g., missing or invalid fields).
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email format",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - Server encountered an error.
  - Example:
    ```json
    {
      "error": "Server error"
    }
    ```

---

## Example Request

```sh
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```