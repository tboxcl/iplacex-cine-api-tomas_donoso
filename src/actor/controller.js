import client from "../common/db.js";

import { ObjectId } from "mongodb";

const db = client.db("cine-db");

const actorCollection = db.collection("actores");
const peliculasCollection = db.collection("peliculas");


// INSERTAR ACTOR
const handleInsertActorRequest = async (req, res) => {

    const pelicula = req.body.pelicula;

    peliculasCollection.findOne({ nombre: pelicula })
        .then((peliculaEncontrada) => {

            if (!peliculaEncontrada) {
                return res.status(404).json({
                    mensaje: "La película indicada no existe"
                });
            }

            const actor = {
                idPelicula: peliculaEncontrada._id.toString(),
                nombre: req.body.nombre,
                edad: req.body.edad,
                estaRetirado: req.body.estaRetirado,
                premios: req.body.premios
            };

            actorCollection.insertOne(actor)
                .then((resultado) => {
                    res.status(201).json({
                        mensaje: "Actor creado correctamente",
                        id: resultado.insertedId
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        mensaje: "Error al crear el actor",
                        error: error.message
                    });
                });

        })
        .catch((error) => {
            res.status(500).json({
                mensaje: "Error al buscar la película",
                error: error.message
            });
        });
};


// OBTENER TODOS LOS ACTORES
const handleGetActoresRequest = async (req, res) => {

    actorCollection.find().toArray()
        .then((actores) => {
            res.status(200).json(actores);
        })
        .catch((error) => {
            res.status(500).json({
                mensaje: "Error al obtener los actores",
                error: error.message
            });
        });

};


// OBTENER ACTOR POR ID
const handleGetActorByIdRequest = async (req, res) => {

    try {

        const id = new ObjectId(req.params.id);

        actorCollection.findOne({ _id: id })
            .then((actor) => {

                if (!actor) {
                    return res.status(404).json({
                        mensaje: "Actor no encontrado"
                    });
                }

                res.status(200).json(actor);

            })
            .catch((error) => {
                res.status(500).json({
                    mensaje: "Error al obtener el actor",
                    error: error.message
                });
            });

    } catch (error) {

        res.status(400).json({
            mensaje: "Id mal formado"
        });

    }

};


// OBTENER ACTORES DE UNA PELÍCULA
const handleGetActoresByPeliculaIdRequest = async (req, res) => {

    try {

        const idPelicula = new ObjectId(req.params.idPelicula);

        actorCollection.find({
            idPelicula: idPelicula.toString()
        }).toArray()
            .then((actores) => {
                res.status(200).json(actores);
            })
            .catch((error) => {
                res.status(500).json({
                    mensaje: "Error al obtener los actores de la película",
                    error: error.message
                });
            });

    } catch (error) {

        res.status(400).json({
            mensaje: "Id de película mal formado"
        });

    }

};


export {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};