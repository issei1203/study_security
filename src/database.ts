interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  full_name: string;
  role: string;
  created_at: Date;
}

export class Database {
  private users: User[] = [];
  private nextId = 1;

  constructor() {
    this.seedUsers();
  }

  async initialize() {
    console.log('In-memory database initialized successfully');
    console.log(`Created ${this.users.length} sample users for security testing`);
  }

  private seedUsers() {
    const userData = [
      { username: 'admin', email: 'admin@company.com', password: 'admin123', full_name: 'System Administrator', role: 'admin' },
      { username: 'john_doe', email: 'john@company.com', password: 'password123', full_name: 'John Doe', role: 'user' },
      { username: 'jane_smith', email: 'jane@company.com', password: 'secret456', full_name: 'Jane Smith', role: 'user' },
      { username: 'bob_wilson', email: 'bob@company.com', password: 'mypass789', full_name: 'Bob Wilson', role: 'manager' },
      { username: 'alice_brown', email: 'alice@company.com', password: 'alice2024', full_name: 'Alice Brown', role: 'user' }
    ];

    this.users = userData.map(user => ({
      ...user,
      id: this.nextId++,
      created_at: new Date()
    }));
  }

  async authenticateUser(username: string, password: string): Promise<User[]> {
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log('Executing vulnerable query:', query);
    
    if (username.includes("'") || username.includes("--") || username.toLowerCase().includes("union") || username.toLowerCase().includes(" or ")) {
      console.log('🚨 SQL Injection attempt detected!');
      if (username.toLowerCase().includes("' or '1'='1") || username.toLowerCase().includes("' or 1=1")) {
        console.log('Classic OR injection - returning all users');
        return [...this.users];
      }
      if (username.includes("'--")) {
        console.log('Comment injection - bypassing password check');
        const targetUser = this.users.find(u => username.startsWith(u.username));
        return targetUser ? [targetUser] : [];
      }
      if (username.toLowerCase().includes("union")) {
        console.log('UNION injection - returning all users');
        return [...this.users];
      }
    }
    
    return this.users.filter(user => 
      user.username === username && user.password === password
    );
  }

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return this.users.map(({ password, ...user }) => user);
  }

  async close() {
    console.log('Closing in-memory database');
  }
}
