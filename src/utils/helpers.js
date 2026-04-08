import { CATEGORIES } from "../data/categories";

export const getCat = (id) => CATEGORIES.find((c) => c.id === id);
