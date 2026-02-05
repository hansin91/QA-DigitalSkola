export function kalkulator(number1, number2, operator) {
  let operatorName = "";
  let result = "";
  switch (operator) {
    case "+":
      result = number1 + number2;
      operatorName = "penjumlahan";
      break;
    case "-":
      result = number1 - number2;
      operatorName = "pengurangan";
      break;
    case "*":
      result = number1 * number2;
      operatorName = "perkalian";
      break;
    case "/":
      if (number2 === 0) return "Tidak dapat dibagi dengan nol";
      result = number1 / number2;
      result = Number.isInteger(result) ? result : parseFloat(result.toString()).toFixed(2);
      operatorName = "pembagian";
      break;
    default:
      return "Operator tidak valid!";
  }
  return `Hasil ${operatorName} antara ${number1} dan ${number2} adalah ${result}`;
}
