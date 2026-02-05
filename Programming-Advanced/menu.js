import { kalkulator } from "./rumus.js";
import readline from "readline";
// Membuat interface untuk input dari terminal
const inputUser = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Minta input dari pengguna
function askNumber(question, callback) {
  inputUser.question(question, (input) => {
    const number = Number(input);

    if (isNaN(number)) {
      console.log("Input harus berupa angka! Coba lagi.");
      askNumber(question, callback);
      return;
    }

    callback(number);
  });
}

function selectOperator(callback) {
  inputUser.question("Masukkan operator (+, -, *, /): ", (op) => {
    if (!["+", "-", "*", "/"].includes(op)) {
      console.log("Operator tidak valid! Gunakan +, -, *, atau /");
      selectOperator(callback);
      return;
    }
    callback(op);
  });
}

askNumber("Masukkan angka pertama: ", (number1) => {
  askNumber("Masukkan angka kedua: ", (number2) => {
    selectOperator((operator) => {
      console.log(kalkulator(number1, number2, operator));
      inputUser.close();
    });
  });
});
