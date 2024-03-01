const path = require('path');
const { Command } = require("commander");
const inquirer = require("inquirer");
const gitClone = require("git-clone/promise");
const ora = require("ora");
const chalk = require('chalk');
const { dirIsExist, removeDir } = require("./src/utils/index");

const program = new Command();

const log = console.log;

const comObj = {
  CRT: "crt",
};

const gitPathObj = {
  vue: "git@github.com:DavidJ-0/react-admin.git",
  react: "git@github.com:DavidJ-0/react-admin2.git",
};

const cwd = process.cwd();

async function entryCreateInfo(targetPath,dirName) {
  const spinner = ora("download project ...");

  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "pType",
        message: "select project Type?",
        choices: ["vue", "react"],
      },
      {
        type: "confirm",
        name: "isTs",
        message: "Is not use TypeScript?",
        default: false,
      },
    ]);
    spinner.start();
    await gitClone(gitPathObj[answers.pType], targetPath);
    await removeDir(path.join(targetPath, ".git"));
    spinner.succeed("create success");
    log(chalk.green(`\ncd ./${dirName}`));
    log(chalk.green(`npm install`));
    log(chalk.green(`npm run start`));
  } catch (error) {
    spinner.fail("create fail");
    console.log(error);

  }
}

program
  .name("david-j-cli")
  .description("CLI to some JavaScript string utilities")
  .version("0.0.1");

program
  .command(comObj.CRT)
  .description("create project")
  .argument("<string>", `project name to ${comObj.CRT}`)
  .action(async (str, options) => {
    const path = `${cwd}\\${str}`;
    const isHas = await dirIsExist(path);
    console.log(path, isHas);
    if (isHas) {
      const answers = await inquirer.prompt([
        {
          type: "confirm",
          name: "isCover",
          message: "is not cover?",
          default: false,
        },
      ]);
      if (answers.isCover) {
        await removeDir(path);
        console.log(`delete ${str} success`);
      } else {
        return;
      }
    } else {
      // fs.mkdir()
    }
    await entryCreateInfo(path,str);
  });

// program
//   .command("clone <source> [destination]")
//   .description("clone a repository into a newly created directory")
//   .action((source, destination) => {
//     console.log("clone command called");
//   });
program.parse();
