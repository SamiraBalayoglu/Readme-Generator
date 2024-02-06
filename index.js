const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

const directoryPath = 'Output';
const generatedReadmeFileName = 'README.md';

// List of common open-source licenses
const licenses = [
    'MIT',
    'Apache-2.0',
    'GPL-3.0',
    'BSD-2-Clause',
    'BSD-3-Clause',
    'ISC',
    'Unlicense'
];

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: "The title of my project:",
    },
    {
        type: 'input',
        name: 'description',
        message: "The description of my project:",
    },
    {
        type: 'input',
        name: 'username',
        message: "Github username:",
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: "Email address:",
    },
    {
        type: 'input',
        name: 'installation',
        message: "Installation",
    },
    {
        type: 'input',
        name: 'usage',
        message: "Usage",
    },
    {
        type: 'list',
        name: 'license',
        message: 'Pick a license:',
        choices: licenses,
    },
    {
        type: 'input',
        name: 'contributing',
        message: "Contributing",
    },
    {
        type: 'input',
        name: 'tests',
        message: "Tests",
    }
];

// function to write README file
function writeToFile(fileName, data) {
    let fileContent = generateMarkdown(data);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }

    // Specify the file path
    const filePath = path.join(directoryPath, fileName);

    // Write the content to the file
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
        console.error('Error writing to file:', err);
        } else {
        console.log('Content has been written to the file successfully.');
        }
    });
}

// function to initialize program
function init() {
    // Prompt the user with the defined questions
    inquirer.prompt(questions)
      .then(answers => {
        console.log('Answers:', answers);
        writeToFile(generatedReadmeFileName, answers);
        // Do something with the answers
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

// function call to initialize program
init();
