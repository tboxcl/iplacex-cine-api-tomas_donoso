import client from "../common/db.js";
import { ObjectId } from "mongodb";
import Pelicula from "./pelicula.js";

const db = client.db("cine-db");
const peliculaCollection = db.collection("peliculas");

// OBTENER TODAS LAS PELÍCULAS
const handleGetPeliculasRequest = async (req, res) => {
    peliculaCollection.find().toArray()
        .then((peliculas) => {
            res.status(200).json(peliculas);
        })
        .catch((error) => {
            res.status(500).json({
                mensaje: "Error al obtener las películas",
                error: error.message
            });
        });
};

// OBTENER UNA PELÍCULA POR ID
const handleGetPeliculaByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        peliculaCollection.findOne({ _id: id })
            .then((pelicula) => {
                if (!pelicula) {
                    return res.status(404).json({
                        mensaje: "Película no encontrada"
                    });
                }

                res.status(200).json(pelicula);
            })
            .catch((error) => {
                res.status(500).json({
                    mensaje: "Error al obtener la película",
                    error: error.message
                });
            });

    } catch (error) {
        res.status(400).json({
            mensaje: "Id mal formado"
        });
    }
};

// INSERTAR UNA PELÍCULA
const handleInsertPeliculaRequest = async (req, res) => {
    const pelicula = {
        ...Pelicula,
        nombre: req.body.nombre,
        generos: req.body.generos,
        anioEstreno: req.body.anioEstreno
    };

    delete pelicula._id;

    peliculaCollection.insertOne(pelicula)
        .then((resultado) => {
            res.status(201).json({
                mensaje: "Película creada correctamente",
                id: resultado.insertedId
            });
        })
        .catch((error) => {
            res.status(500).json({
                mensaje: "Error al crear la película",
                error: error.message
            });
        });
};

// ACTUALIZAR UNA PELÍCULA POR ID
const handleUpdatePeliculaByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        const datos = {
            nombre: req.body.nombre,
            generos: req.body.generos,
            anioEstreno: req.body.anioEstreno
        };

        peliculaCollection.updateOne(
            { _id: id },
            { $set: datos }
        )
            .then((resultado) => {
                if (resultado.matchedCount === 0) {
                    return res.status(404).json({
                        mensaje: "Película no encontrada"
                    });
                }

                res.status(200).json({
                    mensaje: "Película actualizada correctamente"
                });
            })
            .catch((error) => {
                res.status(500).json({
                    mensaje: "Error al actualizar la película",
                    error: error.message
                });
            });

    } catch (error) {
        res.status(400).json({
            mensaje: "Id mal formado"
        });
    }
};

// ELIMINAR UNA PELÍCULA POR ID
const handleDeletePeliculaByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        peliculaCollection.deleteOne({ _id: id })
            .then((resultado) => {
                if (resultado.deletedCount === 0) {
                    return res.status(404).json({
                        mensaje: "Película no encontrada"
                    });
                }

                res.status(200).json({
                    mensaje: "Película eliminada correctamente"
                });
            })
            .catch((error) => {
                res.status(500).json({
                    mensaje: "Error al eliminar la película",
                    error: error.message
                });
            });

    } catch (error) {
        res.status(400).json({
            mensaje: "Id mal formado"
        });
    }
};

export {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
};