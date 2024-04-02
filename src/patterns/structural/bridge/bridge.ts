// API using the dbs in different ways
// have two APIs (user and posts) and each can use different DBs

// Implementor
interface Database {
  find(query: string): string | null;
  update(query: string): string | null;
  create(query: string): string | null;
}

// ConcreteImplementor
export class MongoDB implements Database {
  find(query: string): string | null {
    return `Found ${query} in mongo`;
  }
  update(query: string): string | null {
    return `Updated ${query} in mongo`;
  }
  create(query: string): string | null {
    return `Created ${query} in mongo`;
  }
}

// ConcreteImplementor
export class PostgresDB implements Database {
  find(query: string): string | null {
    return `Found ${query} in postgres`;
  }
  update(query: string): string | null {
    return `Updated ${query} in postgres`;
  }
  create(query: string): string | null {
    return `Created ${query} in postgres`;
  }
}

// Abstraction
abstract class API {
  protected db: Database;
  constructor(db: Database) {
    this.db = db;
  }

  protected abstract update(query: string): string | null;

  protected abstract create(query: string): string | null;

  protected abstract find(query: string): string | null;
}

// RefinedAbstraction
class UserAPI extends API {
  constructor(db: Database) {
    super(db);
  }

  find(query: string): string | null {
    return this.db.find(query);
  }

  update(query: string): string | null {
    return this.db.update(query);
  }

  create(query: string): string | null {
    return this.db.create(query);
  }
}

// RefinedAbstraction
class PostsAPI extends API {
  constructor(db: Database) {
    super(db);
  }

  find(query: string): string | null {
    return this.db.find(query);
  }

  update(query: string): string | null {
    return this.db.update(query);
  }

  create(query: string): string | null {
    return this.db.create(query);
  }
}

const userApi = new UserAPI(new MongoDB());
console.log(userApi.find("user1"));
