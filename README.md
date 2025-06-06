# Security Study Web Application

An educational web application designed for studying SQL injection vulnerabilities in web application security.

## Overview

This application demonstrates common SQL injection vulnerabilities in a controlled environment, allowing security students and professionals to practice identifying and exploiting these weaknesses safely.

## Features

- **Vulnerable Login System**: Intentionally vulnerable to SQL injection attacks
- **User Database**: Pre-populated with sample user data for testing
- **Educational Interface**: Clear hints and guidance for learning
- **Real-time Feedback**: Shows when SQL injection attempts are detected
- **Complete User Data Exposure**: Demonstrates the impact of successful attacks

## Technology Stack

- **Backend**: Node.js with Express.js and TypeScript
- **Database**: In-memory database (simulating PostgreSQL structure)
- **Testing**: Vitest with comprehensive test coverage
- **Frontend**: Vanilla HTML/CSS/JavaScript with modern styling

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the application:
   ```bash
   npm run build
   ```

## Usage

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Mode
```bash
npm run build
npm start
```

### Running Tests
```bash
npm test
```

## SQL Injection Examples

### Basic OR Injection
- **Username**: `' OR '1'='1`
- **Password**: `anything`
- **Result**: Bypasses authentication and returns all users

### Comment Injection
- **Username**: `admin'--`
- **Password**: `anything`
- **Result**: Bypasses password check for admin user

### UNION Injection
- **Username**: `admin' UNION SELECT * FROM users --`
- **Password**: `anything`
- **Result**: Returns all user data

## Sample Users

The application includes the following pre-populated users for testing:

| Username | Email | Role | Password |
|----------|-------|------|----------|
| admin | admin@company.com | admin | admin123 |
| john_doe | john@company.com | user | password123 |
| jane_smith | jane@company.com | user | secret456 |
| bob_wilson | bob@company.com | manager | mypass789 |
| alice_brown | alice@company.com | user | alice2024 |

## Security Vulnerabilities (Intentional)

⚠️ **WARNING**: This application contains intentional security vulnerabilities for educational purposes only.

### SQL Injection Vulnerabilities

1. **Direct String Concatenation**: User input is directly concatenated into SQL queries
2. **No Input Validation**: No sanitization or validation of user inputs
3. **Verbose Error Messages**: Detailed error information exposed to attackers
4. **No Rate Limiting**: No protection against brute force attacks

### Educational Value

This application demonstrates:
- How SQL injection attacks work
- The impact of successful attacks (data exposure)
- Common attack vectors and techniques
- The importance of proper input validation and parameterized queries

## Testing

The application includes comprehensive tests covering:
- Normal authentication flows
- SQL injection vulnerability verification
- Error handling
- API endpoint functionality

Run tests with: `npm test`

## Project Structure

```
security-study-app/
├── src/
│   ├── index.ts          # Main Express application
│   ├── database.ts       # In-memory database with vulnerabilities
│   ├── index.test.ts     # API endpoint tests
│   └── database.test.ts  # Database functionality tests
├── public/
│   └── index.html        # Frontend login interface
├── dist/                 # Compiled TypeScript output
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Test configuration
└── README.md            # This file
```

## Educational Use Only

This application is designed exclusively for educational purposes in controlled environments. It should never be deployed to production or used with real user data.

## License

This project is for educational use only.
