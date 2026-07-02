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
    // TODO: adicionar validações de negócio aqui, como garantir que
    // a data de nascimento não é no futuro, etc.
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
