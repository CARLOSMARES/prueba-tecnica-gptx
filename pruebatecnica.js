var order = ["Amarillo", "Azul", "Rojo", "Verde", "Blanco"];
var toOrder = ["Rojo", "Azul", "Verde", "Rojo", "Amarillo", "Negro"];
var newtoOrder = order.sort(function (a, b) {
    return toOrder.indexOf(a) - order.indexOf(b);
});
console.log(order);
console.log(toOrder);
console.log(newtoOrder);
function numberRepeatColor() {
    var colorCounts = {
        Rojo: 0,
        Verde: 0,
        Azul: 0,
        Amarillo: 0,
    };
    order.forEach(function (color) {
        if (colorCounts.hasOwnProperty(color)) {
            colorCounts[color]++;
        }
    });
    return colorCounts;
}
console.log("Color Counts:", numberRepeatColor());
