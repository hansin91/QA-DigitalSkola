const n = Number(process.argv[2]);

for (let i = 1; i <= n; i++) {
  let row = "";
  for (let j = 1; j <= i; j++) {
    row += "*";
  }
  console.log(row);
}

// console.log();
// console.log("================");
// console.log();

// for (let i = 1; i <= n; i++) {
//   console.log("*".repeat(i));
// }
