import express from "express";
import { ENV } from "./config/env";
const app = express();
import { prisma } from "./config/prisma";

async function startServer() {
  try {
    // Verify database connection
    await prisma.$connect();

    console.log("✅ Connected to PostgreSQL");

    const server = app.listen(ENV.PORT, () => {
      console.log(`🚀Server running on ${ENV.PORT}`);
    });

    process.on("SIGINT", async () => {
      console.log("⏳Stopping server...");

      server.close(async () => {
        await prisma.$disconnect();

        console.log("Database disconnected");
        console.log("⌛️Server closed");

        process.exit(0);
      });
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();

// connection checkup
app.get("/", (req, res) => {
  res.send("Hello");
});

// import routes
import healthzRouter from "./routes/healthz/healthz.route";

// managed routes
app.use("/api/v1/", healthzRouter);

// Error Middleware (Must be last)
import { errorHandler } from "./middleware/error";
app.use(errorHandler);

export { app };
