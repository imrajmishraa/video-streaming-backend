import express from "express";

const app = express();

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
