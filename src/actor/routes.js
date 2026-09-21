import express from "express";

import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
} from "./controller.js";

const ActorRoutes = express.Router();

ActorRoutes.post("/actor", handleInsertActorRequest);

ActorRoutes.get("/actores", handleGetActoresRequest);

ActorRoutes.get("/actor/:id", handleGetActorByIdRequest);

ActorRoutes.get(
    "/peliculas/:idPelicula/actores",
    handleGetActoresByPeliculaIdRequest
);

export default ActorRoutes;