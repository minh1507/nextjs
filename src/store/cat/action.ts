export const catsActionTypes = {
  ADD_CAT: "ADD_CAT",
};

export const addCat = (cat: any) => {
  return { type: catsActionTypes.ADD_CAT, cat: cat };
};
