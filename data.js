export const characters = [
  {
    id: 1,
    name: "Common Fit-Buddy",
    image: require("./assets/char1.png"),
    level: 1,
    buff: 0,
  },
  {
    id: 2,
    name: "Uncommon Fit-Buddy",
    image: require("./assets/char2.png"),
    level: 2,
    buff: 3,
  },
  {
    id: 3,
    name: "Rare Fit-Buddy",
    image: require("./assets/char3.png"),
    level: 3,
    buff: 5,
  },
  {
    id: 4,
    name: "Special Fit-Buddy",
    image: require("./assets/char4.png"),
    level: 4,
    buff: 7,
  },
  {
    id: 5,
    name: "Enchanted Fit-Buddy",
    image: require("./assets/char5.png"),
    level: 5,
    buff: 10,
  },
];

export const eggs = [
  {
    id: 1,
    tier: 1,
    cost: 5000,
    probabilities: [0.75, 0.19, 0.05, 0.01],
  },
  {
    id: 2,
    tier: 2,
    cost: 10000,
    probabilities: [0.5, 0.27, 0.2, 0.03],
  },
  {
    id: 3,
    tier: 3,
    cost: 25000,
    probabilities: [0.5, 0.22, 0.13, 0.05],
  },
  {
    id: 4,
    tier: 4,
    cost: 50000,
    probabilities: [0, 0.5, 0.35, 0.15],
  },
  {
    id: 5,
    tier: 5,
    cost: 100000,
    probabilities: [0, 0, 0.5, 0.5],
  },
];
