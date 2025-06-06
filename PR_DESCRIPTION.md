# Educational SQL Injection Study Application

## Overview
Complete TypeScript web application designed for internal security study sessions, featuring intentional SQL injection vulnerabilities for educational purposes.

## Implementation Details

**Technology Stack (as requested):**
- ✅ TypeScript programming language
- ✅ Express web framework  
- ✅ npm package manager
- ✅ Vitest unit testing framework
- ✅ PostgreSQL-style database structure (in-memory implementation)

## Key Features

### 🎯 Vulnerable Login System
- Intentionally susceptible to multiple SQL injection attack vectors
- Real-time attack detection and logging
- Educational feedback when attacks are successful

### 👥 Users Table Implementation
Pre-populated with 5 sample users for testing:
- `admin` (admin@company.com) - Administrator role
- `john_doe` (john@company.com) - User role  
- `jane_smith` (jane@company.com) - User role
- `bob_wilson` (bob@company.com) - Manager role
- `alice_brown` (alice@company.com) - User role

### 🔓 SQL Injection Attack Scenarios

**1. OR Injection Bypass**
- Input: `' OR '1'='1` in username field
- Result: Complete authentication bypass, returns all users

**2. Comment Injection**  
- Input: `admin'--` in username field
- Result: Bypasses password verification for admin user

**3. UNION Attack**
- Input: `admin' UNION SELECT * FROM users --` 
- Result: Extracts complete user database

## Testing & Verification

### ✅ Comprehensive Test Suite
- **11 unit tests** covering normal authentication flows
- **SQL injection vulnerability verification** tests
- **API endpoint functionality** tests
- **Error handling** coverage

### ✅ Browser Testing Confirmed
![SQL Injection Demo](![alt text](/home/ubuntu/screenshots/localhost_3000_123722.png))

The screenshot demonstrates successful SQL injection attack showing:
- Authentication bypass achieved
- Complete user database exposed in table format
- Clear "SQL Injection Detected!" warning for educational purposes

## Educational Value

### 🎓 Learning Objectives
- Understand how SQL injection vulnerabilities work
- Practice identifying and exploiting security weaknesses
- See real-world impact of successful attacks
- Learn importance of input validation and parameterized queries

### 🔍 Attack Vector Coverage
- String concatenation vulnerabilities
- Input validation bypass techniques  
- Comment-based SQL injection
- UNION-based data extraction
- Boolean-based authentication bypass

## Project Structure

```
security-study-app/
├── src/
│   ├── index.ts          # Main Express application with vulnerable endpoints
│   ├── database.ts       # In-memory database with intentional vulnerabilities
│   ├── index.test.ts     # API endpoint tests
│   └── database.test.ts  # Database functionality tests
├── public/
│   └── index.html        # Educational login interface with hints
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Test configuration
└── README.md            # Complete documentation
```

## Security Warnings

⚠️ **EDUCATIONAL USE ONLY**: This application contains intentional security vulnerabilities and should never be deployed to production environments or used with real user data.

## Usage Instructions

### Development Mode
```bash
npm install
npm run dev
# Application available at http://localhost:3000
```

### Testing
```bash
npm test
# All 11 tests should pass
```

## Link to Devin Run
https://app.devin.ai/sessions/699c45e0b9ec4acaa4620953b738f320

## Requested by
板垣一成 (i-itagaki@atware.co.jp)

This application is ready for immediate use in your internal security study session, providing a safe environment for participants to practice SQL injection techniques and understand their real-world impact.
