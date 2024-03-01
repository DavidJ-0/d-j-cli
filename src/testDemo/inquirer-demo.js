const inquirer = require("inquirer");

inquirer
  .prompt([
    { type: "input", name: "username", message: "What's your name?" },
    {
      type: "checkbox",
      name: "gender",
      message: "What's your gender?",
      choices: ["male", "female"],
    },
    {
      type: "number",
      name: "age",
      message: "How old are you?",
      validate: (Input) =>
        Number.isNaN(Number(Input)) ? "Number Required" : true,
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
