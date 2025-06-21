//Using jsx
const myElement1 = <h1>I am learning JSX!</h1>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement1);

//using jsx with attributes
const myElement2 = <h1 className="myclass">Hello World</h1>;

//using jsx with if else statement
const x = 5;
let greeting = `Goodbye!!!`;
if (x < 10) {
  greeting = `Hello!!!`;
}
const myElement3 = <h1>{text}</h1>;

//using jsx with ternary operators
const y = 3;
const myElement = <h1>{(y) < 7 ? "Hello!!!" : "Goodbye!!!"}</h1>;