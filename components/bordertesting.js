// borderModule.js

let isBordered = false;

const giveBorder = (exempt = true) => {
  return isBordered && exempt
    ? {
        borderBlockColor: '#000000',
        borderWidth: 3,
      }
    : {};
};

const setIsBordered = (value) => {
  isBordered = value;
};

export { giveBorder, setIsBordered };
