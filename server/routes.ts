import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Example route for material calculation
  app.post("/api/calculate", (req, res) => {
    try {
      const { houseType, data } = req.body;
      // In a real app, you might do more validation and calculations here
      
      res.status(200).json({
        success: true,
        message: "Calculation completed successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error during calculation: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
