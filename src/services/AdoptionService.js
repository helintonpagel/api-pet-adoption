import { Adoption } from "../models/Adoption.js";
import { Pet } from "../models/Pet.js";

export const AdoptionService = {
  async getAll() {
    return await Adoption.getAll();
  },

  async create(userId, petId) {
    const pet = await Pet.getOne(petId);

    if (!pet) {
      throw new Error("PET_NOT_FOUND");
    }

    if (pet.status !== "available") {
      throw new Error("PET_NOT_AVAILABLE");
    }

    return await Adoption.create(userId, petId);
  },
};
