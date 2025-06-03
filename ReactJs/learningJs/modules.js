//exporting single variable
export const name = `Kiran`;
export const age = 22;
export const university = `Khwopa Engineering College`;

//exporting multiple variable
export{name, age, university};

//Default Exporting
const message = () => {
  const name = `Kiran`;
  const age = 22;
  return`${name} is ${age} years old.`;
};
export default message;

