const order = ["Amarillo", "Azul", "Rojo", "Verde", "Blanco"];
const toOrder = ["Rojo", "Azul", "Verde", "Rojo", "Amarillo", "Negro"];

const newtoOrder = order.sort((a, b) => {
  return toOrder.indexOf(a) - order.indexOf(b);
});

console.log(order);
console.log(toOrder);
console.log(newtoOrder);

function numberRepeatColor() {
  let Rojo: Number = 0;
  let verde: number = 0;
  let Azul: number = 0;
  let Amarillo: number = 0;
  let Negro: number = 0;

  //Saber cuantas veces se repite un color
  newtoOrder.forEach(() => {});
}
