import express from "express";
import cors from "cors";
import chamadosRoutes from "./routes/chamados.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chamados", chamadosRoutes);

app.listen(3000, () => {
  console.log("✅ API rodando em http://localhost:3000/chamados");
});
