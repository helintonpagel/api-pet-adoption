import { PetService } from "../services/PetService.js";

export const PetController = {
  async getAll(req, res) {
    try {
      const pets = await PetService.getAll();
      res.json(pets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const pet = await PetService.getOne(req.params.id);
      res.json(pet);
    } catch (error) {
      if (error.message === "PET_NOT_FOUND") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async create(req, res) {
    try {
      const pet = await PetService.create(req.body);
      res.status(201).json(pet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const pet = await PetService.update(req.params.id, req.body);
      res.json(pet);
    } catch (error) {
      if (error.message === "PET_NOT_FOUND") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async delete(req, res) {
    try {
      await PetService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "PET_NOT_FOUND") {
        return res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
};
