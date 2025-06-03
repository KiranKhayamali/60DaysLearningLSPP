//Spread Operator
const numbers = [1, 2, 3, 4, 5, 6];

const [one, two, ...rest] = numbers;
console.log(x);

//Combine these two objects using spread operator
const myVehicle = {
  brand: 'Ford',
  model: 'Mustang',
  color: 'red'
};

const updateMyVehicle = {
  type: 'car',
  year: 2021, 
  color: 'yellow'
};

const myUpdatedVehicle = {...myVehicle, ...updateMyVehicle};