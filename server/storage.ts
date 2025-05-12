import { db } from "@db";
import { users, calculations, User, Calculation, insertUserSchema } from "@shared/schema";
import { eq } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "@db";

// Create session store
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(userData: { name: string, lastname: string, email: string, password: string }): Promise<User>;
  getCalculations(userId: number): Promise<Calculation[]>;
  getCalculation(id: number): Promise<Calculation | undefined>;
  getLatestCalculation(userId: number): Promise<Calculation | undefined>;
  createCalculation(data: any): Promise<Calculation>;
  sessionStore: session.Store;
}

class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(userData: { name: string, lastname: string, email: string, password: string }): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async getCalculations(userId: number): Promise<Calculation[]> {
    return await db.select().from(calculations).where(eq(calculations.userId, userId));
  }

  async getCalculation(id: number): Promise<Calculation | undefined> {
    const result = await db.select().from(calculations).where(eq(calculations.id, id)).limit(1);
    return result[0];
  }

  async getLatestCalculation(userId: number): Promise<Calculation | undefined> {
    const result = await db
      .select()
      .from(calculations)
      .where(eq(calculations.userId, userId))
      .orderBy(calculations.createdAt)
      .limit(1);
    return result[0];
  }

  async createCalculation(data: any): Promise<Calculation> {
    const [calculation] = await db.insert(calculations).values(data).returning();
    return calculation;
  }
}

export const storage = new DatabaseStorage();
