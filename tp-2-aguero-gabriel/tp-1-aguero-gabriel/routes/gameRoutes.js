import express from "express";
import { getGame, getGameByName, getGamesByGenre, createGame, updateGame, deleteGame } from "../controller/gameController.js";
import tokenVerify from '../middleware/auth.js';

const gameRoutes = express.Router();

gameRoutes.get('/', async (req, res) => {
    try {
        let game = await getGame();
        res.status(200).json(game);
    } catch (error) {
        res.status(404).json({ message: "Error al obtener los juegos", error: error.message });
    }
});

gameRoutes.get('/nombre', async (req, res) => {
    let name = req.query.name;
    try {
        let game = await getGameByName(name);
        res.status(200).json(game);
    } catch (error) {
        res.status(404).json({ message: "Juego no encontrado", error: error.message });
    }
});

gameRoutes.get("/genero", async (req, res) => {
    try {
        const genre = req.query.genre; 
        const games = await getGamesByGenre(genre); 
        res.status(200).json(games); 
    } catch (error) {
        res.status(404).json({
            message: "Error al buscar juegos por género",
            error: error.message
        });
    }
});

gameRoutes.post("/", async (req, res) => {
    try {
        let game = await createGame(req.body);
        res.status(201).json(game);
    } catch (error) {
        res.status(400).json({ message: "Error al crear el juego", error: error.message });
    }
});

gameRoutes.put('/:id', async (req, res) => { 
    let body = req.body;
    try {
        let game = await updateGame(req.params.id, body);
        res.status(200).json(game);
    } catch (error) {
        res.status(404).json({ message: "Error al actualizar el juego", error: error.message });
    }
});

gameRoutes.delete('/:id', async (req, res) => { 
    try {
      let game = await deleteGame(req.params.id);
      res.status(200).json(game);
    } catch (error) {
      res.status(404).json({ message: "Error al eliminar el juego", error: error.message });
    }
  });
  

export { gameRoutes };
