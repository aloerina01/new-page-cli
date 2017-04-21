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
        name: 'fileName',
        type: 'input',
        message: 'Enter finename of new page:',
        default: 'Index.vue'
    },
    {
        name: 'path',
        type: 'input',
        message: 'Enter directory path that new page will be created:',
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
    const vueTemplate = fs.createReadStream('./src/templates/xxxx.vue');
    var fileName = answers.fileName;
    if (fileName.indexOf('.vue') <= 0) {
        filename += '.vue';
    }
    var filePath = answers.path;
    if (filePath.slice(-1) !== '/') {
        filePath += '/';
    }
    console.log(`${filePath}${fileName}`);
    fs.createWriteStream(`${filePath}${fileName}`);
}
