
const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

rl.question("Enter a new admin password: ", async (password) => {
  if (password.length < 12) {
    console.log("Password must contain at least 12 characters.");
    rl.close();
    return;
  }

  const hash = await bcrypt.hash(password, 12);

  console.log("\nYour password hash is:\n");
  console.log(hash);

  rl.close();
});
