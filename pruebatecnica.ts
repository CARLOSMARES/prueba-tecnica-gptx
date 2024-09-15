const order = ["Amarillo", "Azul", "Rojo", "Verde", "Blanco"];
const toOrder = ["Rojo", "Azul", "Verde", "Rojo", "Amarillo", "Negro"];

const newtoOrder = order.sort((a, b) => {
  return toOrder.indexOf(a) - order.indexOf(b);
});

console.log(order);
console.log(toOrder);
console.log(newtoOrder);

function numberRepeatColor() {
  const colorCounts = {
    Rojo: 0,
    Verde: 0,
    Azul: 0,
    Amarillo: 0,
  };

  order.forEach((color) => {
    if (colorCounts.hasOwnProperty(color)) {
      colorCounts[color]++;
    }
  });

  return colorCounts;
}

console.log("Color Counts:", numberRepeatColor());
