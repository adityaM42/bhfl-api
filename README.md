# BHFL API

This is a Node.js + Express API built as part of Bajaj Finserv coding assignment.  
It accepts an array of items (numbers and alphabets), processes them, and returns structured JSON output.

---

##  Features
- Accepts JSON input with mixed data (numbers, alphabets, etc.)
- Separates odd and even numbers
- Identifies alphabets
- Concatenates strings
- Returns well-structured JSON response

---

##  Tech Stack
- Node.js
- Express.js
- Railway (for deployment)

---

##  Installation

1. Clone the repository
    ```bash
    git clone https://github.com/adityaM42/bfhl-api.git
    cd bfhl-api
2. Install dependencies
    ```bash
    npm install
3. Create a .env file in the root folder with:
    ```bash
    DOB_DDMMYYYY=11062004
    EMAIL=adityamehta767@gmail.com
    ROLL_NUMBER=22BCT0181
    PORT=3000
4. Run the Project Locally
    ```bash
    npm start
  The server will start at:
  http://localhost:3000

---

##API Endpoints
1. Health Check
    ```bash
    GET /bfhl
  Response:
    
    {
      "operation_code": 1
    }

2. Data API
    ```bash
    POST /bfhl
  Request Body:

    {
      "data": ["A", "C", "z", "1", "2"]
    }

  Response:

    {
      "is_success": true,
      "user_id": "adityamehta767_11062004",
      "email": "adityamehta767@gmail.com",
      "roll_number": "22BCT0181",
      "numbers": ["1", "2"],
      "alphabets": ["A", "C", "z"],
      "highest_lowercase_alphabet": ["z"]
    }

---

Deployment

The project is deployed on Railway:
[Live API URL](https://bhfl-api-production.up.railway.app)

Example:

GET https://bfhl-api-production.up.railway.app/bfhl

POST https://bfhl-api-production.up.railway.app/bfhl


