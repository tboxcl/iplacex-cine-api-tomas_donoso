import express from "express";
import cors from "cors";
import client from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ruta por defecto
app.get("/", (req, res) => {
    res.send("Bienvenido al cine Iplacex");
});

// Rutas personalizadas
app.use("/api", peliculaRoutes);
app.use("/api", actorRoutes);

// Conexión a MongoDB Atlas y levantamiento del servidor
client.connect()
    .then(() => {
        console.log("Conexión a MongoDB Atlas realizada correctamente");

        app.listen(PORT, () => {
            console.log(`Servidor Express ejecutándose en puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar con MongoDB Atlas:", error);
    });