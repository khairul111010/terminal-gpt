import axios from "axios";
import readline from "readline";
import { config } from "dotenv";
config();

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: process.env.GPT_AUTH,
  };
  const message = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
  };
  const res = await axios.post(process.env.GPT_URL, message, headers);
  console.log(res.data.choices[0].message.content);
  userInterface.prompt();
});
