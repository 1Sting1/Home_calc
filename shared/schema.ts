import { pgTable, text, serial, integer, json, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schema for users
export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  lastname: true,
  email: true,
  password: true,
});

// Calculations table
export const calculations = pgTable("calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  houseType: text("house_type").notNull(), // 'brick', 'wooden', 'concrete'
  foundationWidth: decimal("foundation_width", { precision: 10, scale: 2 }).notNull(),
  foundationLength: decimal("foundation_length", { precision: 10, scale: 2 }).notNull(),
  foundationType: text("foundation_type").notNull(), // 'strip', 'pile', 'monolithic'
  walls: json("walls").notNull().$type<Array<{
    width: number;
    length: number;
    material: string;
    hasOpening: boolean;
    openingType: string;
    openingWidth: number;
    openingHeight: number;
  }>>(),
  roofType: text("roof_type").notNull(), // 'flat', 'gable', 'hip', 'mansard'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  calculations: many(calculations),
}));

export const calculationsRelations = relations(calculations, ({ one }) => ({
  user: one(users, {
    fields: [calculations.userId],
    references: [users.id],
  }),
}));

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Calculation = typeof calculations.$inferSelect;
