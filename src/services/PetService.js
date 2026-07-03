import { Pet } from "../models/Pet.js";

export const PetService = {
  async getAll() {
    return await Pet.getAll();
  },

  async getOne(id) {
    const pet = await Pet.getOne(id);

    if (!pet) {
      throw new Error("PET_NOT_FOUND");
    }

    return pet;
  },

  async create(pet) {
    if (!pet.name || !pet.birth_date || !pet.gender || !pet.species || !pet.size) {
      throw new Error("MISSING_REQUIRED_FIELDS");
    }

    if (new Date(pet.birth_date) > new Date()) {
      throw new Error("INVALID_BIRTH_DATE");
    }

    return await Pet.create(pet);
  },

  async update(id, pet) {
    const existingPet = await Pet.getOne(id);

    if (!existingPet) {
      throw new Error("PET_NOT_FOUND");
    }

    return await Pet.update(id, pet);
  },

  async delete(id) {
    const existingPet = await Pet.getOne(id);

    if (!existingPet) {
      throw new Error("PET_NOT_FOUND");
    }

    return await Pet.delete(id);
  },
};
