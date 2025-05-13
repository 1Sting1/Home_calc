import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  lastname: text("lastname"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  lastname: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Calculation-related schemas
export const calculationSchema = z.object({
  houseType: z.enum(["brick", "wooden", "concrete", "blocks"]),
  foundation: z.object({
    width: z.number().min(0),
    depth: z.number().min(0),
    length: z.number().min(0),
    type: z.string(),
    finishing: z.string().optional(),
    hasBasement: z.boolean(),
    hasBasementFloor: z.boolean(),
    floorMaterial: z.string().optional(),
  }),
  walls: z.array(z.object({
    width: z.number().min(0),
    length: z.number().min(0),
    height: z.number().min(0),
    material: z.string(),
    insulation: z.string(),
    finishing: z.string().optional(),
  })),
  roof: z.object({
    type: z.string(),
    material: z.string(),
    length: z.number().min(0),
    width: z.number().min(0),
  }),
});

export type CalculationData = z.infer<typeof calculationSchema>;
