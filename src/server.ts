import express from "express";
import { ENV } from "./config/env";
const app = express();

if (!process.env.VERCEL) {
  app.listen(ENV.PORT, () => {
    console.log(`Server running on port: ${ENV.PORT}`);
  });
}

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
