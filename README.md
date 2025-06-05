📝 What I Learned from Building This Spring Security App
The main goal of this app was to help me learn and better understand how Spring Security works — especially when using JWT (JSON Web Tokens) for authentication.

🔁 The Flow When the App Starts
When the application receives a request, it first runs through the security filter chain, which is defined in the SecurityConfig class. This chain is where I set which routes are open to the public (like login or register) and which ones need the user to be logged in or even have specific roles (like admin routes).

🔐 How Authentication Works
Instead of using Spring's default session-based login, I implemented JWT-based authentication. Here's how it works:

When a user logs in, if their credentials are valid, they get a JWT token.

This token is a long string with three parts:

Header (info about the token type and algorithm),

Payload (contains user info like username, role, and expiry),

Signature (used to verify the token hasn’t been tampered with).

This token is returned to the frontend and must be included in the Authorization header of every request that needs authentication.

🧱 What Happens on Each Request
Each time the user sends a request, a custom filter called JwtAuthenticationFilter checks if the request has a token:

If the token is there and valid, the user is authenticated, and their identity (and role) is stored in Spring's security context.

If it’s missing or invalid, the user gets a 401 Unauthorized or 403 Forbidden error.

This process happens before the controller logic runs, thanks to the filter chain.

🧑‍💼 Role-Based Access
After the user is authenticated, Spring Security can also handle authorization. For example, I can restrict routes like /api/admin/** so only users with the ADMIN role can access them.

🤔 What About UsernamePasswordAuthenticationFilter?
Spring has a built-in filter for form-based logins (UsernamePasswordAuthenticationFilter), but since I’m using JWT and not managing sessions, I don’t rely on that anymore. I built my own authentication filter for handling tokens instead.

Some images from the blog application that I have completed in 3 weeks 💙
🍀 Login & Register implemented using jwt
<img width="1706" alt="Screenshot 2025-06-05 at 11 44 21 PM" src="https://github.com/user-attachments/assets/d434baf2-426a-4899-b6bd-c8b5338c2b86" />
<img width="1708" alt="Screenshot 2025-06-05 at 11 44 40 PM" src="https://github.com/user-attachments/assets/200cd53e-da86-4e67-b7ca-f3c7910799a8" />
🍀 Home page, 3 sections, has nav, footer, different apis for calling blogs (random blogs, blogs written by users, most popular blogs, signature blog)
<img width="1708" alt="Screenshot 2025-06-05 at 11 45 10 PM" src="https://github.com/user-attachments/assets/68d7e377-5cf7-4f54-9831-fa4a8b7f10f8" />
<img width="1703" alt="Screenshot 2025-06-05 at 11 51 34 PM" src="https://github.com/user-attachments/assets/6f74aba9-ac19-497a-8b65-dbe739cb4c7c" />
🍀 Single Page, implemented comments too (not likes yet). 
<img width="1710" alt="Screenshot 2025-06-05 at 11 47 26 PM" src="https://github.com/user-attachments/assets/885e4b44-da47-46f1-afc5-9fc813c7c132" />
<img width="1706" alt="Screenshot 2025-06-05 at 11 51 06 PM" src="https://github.com/user-attachments/assets/47e44cd3-588f-442c-a90d-df2cb5cd0eba" />



