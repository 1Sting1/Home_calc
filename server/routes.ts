import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Get latest calculation
  app.get("/api/calculations/latest", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const latestCalculation = await storage.getLatestCalculation(req.user!.id);
      if (!latestCalculation) {
        return res.status(404).json({ message: "No calculations found" });
      }
      
      res.json(latestCalculation);
    } catch (error) {
      console.error("Error getting latest calculation:", error);
      res.status(500).json({ message: "Failed to retrieve calculation" });
    }
  });

  // Get all calculations for the user
  app.get("/api/calculations", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const calculations = await storage.getCalculations(req.user!.id);
      res.json(calculations);
    } catch (error) {
      console.error("Error getting calculations:", error);
      res.status(500).json({ message: "Failed to retrieve calculations" });
    }
  });

  // Get a specific calculation
  app.get("/api/calculations/:id", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const calculation = await storage.getCalculation(id);
      if (!calculation) {
        return res.status(404).json({ message: "Calculation not found" });
      }
      
      // Check if the calculation belongs to the user
      if (calculation.userId !== req.user!.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(calculation);
    } catch (error) {
      console.error("Error getting calculation:", error);
      res.status(500).json({ message: "Failed to retrieve calculation" });
    }
  });

  // Create a new calculation
  app.post("/api/calculations", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const userId = req.user!.id;
      
      // Extract calculation data from request body
      const {
        houseType,
        foundationWidth,
        foundationLength,
        foundationType,
        walls,
        roofType,
      } = req.body;
      
      // Create the calculation
      const calculation = await storage.createCalculation({
        userId,
        houseType,
        foundationWidth,
        foundationLength,
        foundationType,
        walls,
        roofType,
        createdAt: new Date(),
      });
      
      res.status(201).json(calculation);
    } catch (error) {
      console.error("Error creating calculation:", error);
      res.status(500).json({ message: "Failed to create calculation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
