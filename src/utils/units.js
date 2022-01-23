const units = ["Grams", "Pounds", "Ounces"];

const converter = {
  Grams: {
    short: "g",
    ratio: 1,
  },
  Pounds: {
    short: "lb",
    ratio: 453.592,
  },
  Ounces: {
    short: "oz",
    ratio: 28.3495,
  },
};

export { units, converter };
