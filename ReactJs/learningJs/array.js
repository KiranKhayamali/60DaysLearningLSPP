const vehicles = ['mustang', 'f-150', 'expedition'];

// old way
const car = vehicles[0];
const truck = vehicles[1];
const suv = vehicles[2];
console.log(car);
console.log(truck);
console.log(suv);

//Using destructing
const [car2, truck2, suv2] = vehicles;
console.log(car2);
console.log(truck2);
console.log(suv2);

//Leaving Unnecessary variables
const [car3,, suv3] = vehicles;

//Example of using destructing
calculate= (a, b)=> {
  const add = a + b;
  const subtract = a - b;
  const multiply = a * b;
  const divide = a / b;

  return [add, subtract, multiply, divide];
}

const [add, subtract, multiply, divide] = calculate(4, 7);
console.log(add);
console.log(subtract);
console.log(multiply);
console.log(divide);

//destructing objects
const vehicleOne = {
  brand: 'Ford',
  model: 'Mustang',
  type: 'car',
  year: 2021, 
  color: 'red',
  registration: {
    city: 'Houston',
    state: 'Texas',
    country: 'USA'
  }
}

myVehicle(vehicleOne)

function myVehicle({ model, registration: { state } }) {
  const message = 'My ' + model + ' is registered in ' + state + '.';
}