# Auth Flow

The signup endpoint supports:

- Manual Authentication
- OAuth Authentication (Google)

---

# Manual Authentication

This flow expects:

- Username
- Email
- Password

The request body is safely validated using Zod  
↓  
On successful validation, a new user is created  
↓  
The `user_id` is used to generate a JWT token  
↓  
An HttpOnly cookie is created using the JWT token  
↓  
The cookie is sent to the frontend in the response

---

# OAuth Authentication (Google)

This flow expects:

- Google Credential Response

The request body is safely validated using Zod  
↓  
On successful validation, the Google credential is decoded using `jwtDecode()`  
*(This only decodes the token, not verifies it)*  
↓  
The decoded payload provides:

- Email
- Username
- Profile Picture
- `googleId`

↓  
Check whether the user already exists  
↓  

If the user exists:
- Log the user in

Else:
- Create a new user with:
  - Email
  - Username
  - `provider: "google"`
  - `googleId`

↓  
The `user_id` is used to generate a JWT token  
↓  
An HttpOnly cookie is created using the JWT token  
↓  
The cookie is sent to the frontend in the response