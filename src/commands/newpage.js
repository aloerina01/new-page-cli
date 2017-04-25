const inquirer = require('inquirer');
const fs = require('fs-extra');
const chalk = require('chalk');

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
        name: 'viewTitle',
        type: 'input',
        message: 'Enter page title (metadata) of new page:',
        default: ''
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
    console.log();
    try {
        optimize(answers);
        createVueFile();
        createHtmlFile();
    } catch (err) {
        console.error(err);
    } finally {
        console.log();
    }

}

const optimize = (answers) => {
    // path
    if (answers.path.slice(-1) !== '/') {
        stack.path = answers.path + '/';
    } else {
        stack.path = answers.path;
    }

    // vueFileName
    var vueFileName = answers.fileName;
    if (vueFileName.indexOf('.vue') <= 0) {
        vueFileName += '.vue';
    }
    stack.vueFileName = vueFileName;

    // templateFileName
    if (answers.separateTemplate) {
        var templateFileName = answers.fileName.replace(/\.vue/, '').toLowerCase();
        templateFileName = `_${templateFileName}.tmpl.html`;
        stack.templateFileName = templateFileName;
    }

    // flag of separating template
    stack.isSeparate = answers.separateTemplate;

    // VIEW_TITLE
    stack.viewTitle = answers.viewTitle;
}

const createVueFile = () => {
    var w = fs.createWriteStream(stack.vueFileName);
    w.on("error", function (err) {
        hundleError(err);
    });
    w.on("finish", () => {
        success(`Create ${stack.vueFileName}`);
    });

    var r = fs.createReadStream('./src/templates/Index.vue');
    r.on("error", (err) => {
        hundleError(err);
    });
    
    r.pipe(w);
    w.end();
}

const createHtmlFile = () => {
    if (!stack.isSeparate) {
        return;
    }
    var w = fs.createWriteStream(stack.templateFileName);
    w.on("error", function (err) {
        hundleError(err);
    });
    w.on("finish", () => {
        success(`Create ${stack.templateFileName}`);
    });
    w.end();
}

const hundleError = (err) => {
    throw new Error(err);
}

const success = (message) => {
    console.log(`${chalk.green('✓ SUCCESS  ')}${message}`);
}
const error = (message) => {
    console.log(`${chalk.red('❌ FAILED')}`);
    console.log(message);
}