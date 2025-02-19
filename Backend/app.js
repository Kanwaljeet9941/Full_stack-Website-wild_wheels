const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./contorller/errorController");

const productRouter = require("./routes/porductRouter");
const userRouter = require("./routes/userRouter");

const app = express();

// Enable CORS for the frontend
app.use(cors({ origin: "http://localhost:3000" }));

// Logging middleware for development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser for JSON
app.use(express.json());

// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount routers
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

// Handle unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
