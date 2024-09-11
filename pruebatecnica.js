var order = ["Amarillo", "Azul", "Rojo", "Verde", "Blanco"];
var toOrder = ["Rojo", "Azul", "Verde", "Rojo", "Amarillo", "Negro"];
var newtoOrder = order.sort(function (a, b) {
    return toOrder.indexOf(a) - order.indexOf(b);
});
console.log(order);
console.log(toOrder);
console.log(newtoOrder);
