
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const crypto = require("crypto");
const Consultation = require("./models/Consultation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "10kb" }));
// Admin login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required."
      });
    }

    if (
      !process.env.ADMIN_USERNAME ||
      !process.env.ADMIN_PASSWORD_HASH ||
      !process.env.JWT_SECRET
    ) {
      return res.status(500).json({
        message: "Admin authentication is not configured."
      });
    }

    const usernameMatches =
      username === process.env.ADMIN_USERNAME;

    const passwordMatches = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!usernameMatches || !passwordMatches) {
      return res.status(401).json({
        message: "Invalid username or password."
      });
    }

    const token = jwt.sign(
      { username: process.env.ADMIN_USERNAME },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      message: "Admin login successful.",
      token,
      expiresIn: "2h"
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    return res.status(500).json({
      message: "Unable to process admin login."
    });
  }
});

// Home route
app.get("/", (req, res) => {
  res.send("Amrutha Passport Consultancy Backend");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Amrutha Passport Consultancy API is running",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Temporary admin API protection.
// Configure ADMIN_API_KEY in backend/.env before using admin routes.

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required."
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.username !== process.env.ADMIN_USERNAME) {
      return res.status(403).json({
        success: false,
        message: "Access denied."
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error(
      "Admin token verification error:",
      error.name,
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });
  }
}

// CREATE: Save a consultation booking
app.post("/api/consultations", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      service,
      serviceName,
      preferredDate,
      preferredTime,
      notes,
      agreeTerms,
    } = req.body;

    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      !phone ||
      typeof email !== "string" ||
      !email.trim() ||
      !service ||
      !serviceName ||
      !preferredDate ||
      !preferredTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required booking details.",
      });
    }

    if (fullName.trim().length < 3 || fullName.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "Full name must contain between 3 and 100 characters.",
      });
    }

    const cleanPhone = String(phone).replace(/\D/g, "");

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit Indian mobile number.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (agreeTerms !== true) {
      return res.status(400).json({
        success: false,
        message: "Please accept the consultancy terms.",
      });
    }

    
    if (
      typeof preferredDate !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid consultation date.",
      });
    }

    // Validate the actual calendar date using local time.
    const [year, month, day] = preferredDate.split("-").map(Number);

    const selectedDate = new Date(year, month - 1, day);

    const isValidDate =
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month - 1 &&
      selectedDate.getDate() === day;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!isValidDate || selectedDate < today) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid consultation date that is not in the past.",
      });
    }


    const allowedTimes = [
      "10:00 AM",
      "11:30 AM",
      "02:30 PM",
      "04:30 PM",
    ];

    if (!allowedTimes.includes(preferredTime)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid consultation time.",
      });
    }

    // Generate a unique reference ID.
    // MongoDB's unique index on referenceId should also be enabled.
    let referenceId;
    let exists = true;

    while (exists) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      referenceId = `APC-${new Date().getFullYear()}-${randomNum}`;
      exists = await Consultation.exists({ referenceId });
    }

    const consultation = await Consultation.create({
      referenceId,
      fullName: fullName.trim(),
      phone: cleanPhone,
      email: email.trim().toLowerCase(),
      service,
      serviceName,
      preferredDate,
      preferredTime,
      notes: typeof notes === "string" ? notes.trim() : "",
      status: "Pending Review",
    });

    return res.status(201).json({
      success: true,
      message: "Consultation request saved successfully.",
      consultation: {
        id: consultation.referenceId,
        referenceId: consultation.referenceId,
        fullName: consultation.fullName,
        phone: consultation.phone,
        email: consultation.email,
        service: consultation.service,
        serviceName: consultation.serviceName,
        preferredDate: consultation.preferredDate,
        preferredTime: consultation.preferredTime,
        notes: consultation.notes,
        status: consultation.status,
        createdAt: consultation.createdAt,
      },
    });
  } catch (error) {
    console.error("Booking error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save your booking. Please try again.",
    });
  }
});

// READ: Customer tracks their own consultation.
// Requires both reference number and registered phone number.
app.post("/api/consultations/track", async (req, res) => {
  try {
    const { referenceId, phone } = req.body;

    if (
      typeof referenceId !== "string" ||
      typeof phone !== "string" ||
      !referenceId.trim() ||
      !phone.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter your reference number and registered mobile number.",
      });
    }

    const cleanPhone = phone.replace(/\D/g, "");

    const consultation = await Consultation.findOne({
      referenceId: referenceId.trim().toUpperCase(),
      phone: cleanPhone,
    }).select(
      "referenceId serviceName preferredDate preferredTime status createdAt"
    );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "No matching consultation was found. Check your details.",
      });
    }

    return res.json({
      success: true,
      consultation,
    });
  } catch (error) {
    console.error("Tracking error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to track your consultation right now.",
    });
  }
});

// ADMIN READ: Get all consultation records
app.get("/api/admin/consultations", requireAdmin, async (req, res) => {
  try {
    const consultations = await Consultation.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      count: consultations.length,
      consultations,
    });
  } catch (error) {
    console.error("Admin list error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve consultations.",
    });
  }
});

// ADMIN UPDATE: Change status and/or staff remarks
app.patch(
  "/api/admin/consultations/:referenceId",
  requireAdmin,
  async (req, res) => {
    try {
      const { status, adminRemarks } = req.body;
      const update = {};

      const allowedStatuses = [
  "Pending Review",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled"
];

      if (status !== undefined) {
        if (!allowedStatuses.includes(status)) {
          return res.status(400).json({
            success: false,
            message: "Invalid consultation status.",
          });
        }

        update.status = status;
      }

      if (adminRemarks !== undefined) {
        if (
          typeof adminRemarks !== "string" ||
          adminRemarks.length > 2000
        ) {
          return res.status(400).json({
            success: false,
            message: "Remarks must be text with at most 2000 characters.",
          });
        }

        update.adminRemarks = adminRemarks.trim();
      }

      if (Object.keys(update).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Provide a status or staff remarks to update.",
        });
      }

      const consultation = await Consultation.findOneAndUpdate(
        { referenceId: req.params.referenceId },
        { $set: update },
        { new: true, runValidators: true }
      );

      if (!consultation) {
        return res.status(404).json({
          success: false,
          message: "Consultation not found.",
        });
      }

      return res.json({
        success: true,
        message: "Consultation updated successfully.",
        consultation,
      });
    } catch (error) {
      console.error("Admin update error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to update consultation.",
      });
    }
  }
);

// ADMIN DELETE: Delete a consultation record
app.delete(
  "/api/admin/consultations/:referenceId",
  requireAdmin,
  async (req, res) => {
    try {
      const consultation = await Consultation.findOneAndDelete({
        referenceId: req.params.referenceId,
      });

      if (!consultation) {
        return res.status(404).json({
          success: false,
          message: "Consultation not found.",
        });
      }

      return res.json({
        success: true,
        message: "Consultation deleted successfully.",
      });
    } catch (error) {
      console.error("Admin delete error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to delete consultation.",
      });
    }
  }
);

// Start server after connecting to MongoDB
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
