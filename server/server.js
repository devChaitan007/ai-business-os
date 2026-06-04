const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const chatRoutes = require("./routes/chatRoutes");
const businessRoutes = require("./routes/businessRoutes");
const leadRoutes = require("./routes/leadRoutes");
const dashboardRoutes = require(
  "./routes/dashboardRoutes"
);
const crmAiRoutes = require(
  "./routes/crmAiRoutes"
);
const knowledgeRoutes =
  require("./routes/knowledgeRoutes");
const uploadRoutes =
  require("./routes/uploadRoutes");
const leadAiRoutes = require("./routes/leadAiRoutes");
const knowledgeAiRoutes = require(
  "./routes/knowledgeAiRoutes"
);



connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/leads", leadRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/crm-ai",
  crmAiRoutes
);
app.use(
  "/api/knowledge",
  knowledgeRoutes
);
app.use(
  "/api/upload",
  uploadRoutes
);
app.use("/api/leads-ai", leadAiRoutes);
app.use(
  "/api/knowledge-ai",
  knowledgeAiRoutes
);

app.get("/", (req, res) => {
  res.send("AI Business OS API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});