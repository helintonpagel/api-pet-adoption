import { AdoptionService } from "../services/AdoptionService.js";

export const AdoptionController = {
  async getAll(req, res) {
    try {
      const adoptions = await AdoptionService.getAll();
      res.json(adoptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const userId = req.user.id;
      const { pet_id } = req.body;

      if (!pet_id) {
        return res.status(400).json({ error: "PET_ID_REQUIRED" });
      }

      const adoption = await AdoptionService.create(userId, pet_id);
      res.status(201).json(adoption);
    } catch (error) {
      if (error.message === "PET_NOT_FOUND") {
        res.status(404).json({ error: error.message });
      } else if (error.message === "PET_NOT_AVAILABLE") {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async update(req, res) {
    try {
      const adoption = await AdoptionService.update(req.params.id, req.body);
      res.json(adoption);
    } catch (error) {
      if (error.message === "ADOPTION_NOT_FOUND") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async delete(req, res) {
    try {
      await AdoptionService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "ADOPTION_NOT_FOUND") {
        return res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
};
