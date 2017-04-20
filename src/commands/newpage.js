const inquirer = require('inquirer');
const fs = require('fs-extra');

const stack = {};

exports.command = 'newpage';
exports.desc = 'create a new page based on the template.';
exports.builder = {

}
exports.handler = (argv) => {
    inquirer.prompt(questions).then(execute);

}

const questions = [
    {
        name: 'pageName',
        type: 'input',
        message: 'Enter new page name:',
        default: 'Index'
    },
    {
        name: 'path',
        type: 'input',
        message: 'Enter path that new page will be created:',
        validate: function(value) {
            try {
                fs.statSync(value);
                return true;
            } catch (err) {
                if (err.code === 'ENOENT') return `no such directory: ${value}`;
            }
        }
    },
    {
        name: 'separateTemplate',
        type: 'confirm',
        message: 'Do you want separate a template file ?'
    }
];

const execute = (answers) => {
    fs.copy
}
