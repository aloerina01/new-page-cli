const inquirer = require('inquirer');

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
        name: 'pagename',
        type: 'input',
        message: 'Enter new page name:',
        default: 'Index'
    }
];

const execute = () => {
    console.log('thx!');
}

const close = (instance) => {
    instance.close();
    process.stdin.destroy();
} 