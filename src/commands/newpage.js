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
        default: 'example-page',
    },
    {
        name: 'viewUniqueName',
        type: 'input',
        message: 'Enter unique key of new page:',
        default: 'unique-page-name',
        validate: function(value) {
            // TODO: 一意かどうかの判定
            return true;
        }
    },
    {
        name: 'path',
        type: 'input',
        message: 'Enter directory path that new page will be created:',
        default: './',
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
    optimize(answers);
    createVueFile();
    createHtmlFile();
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
    var w = fs.createWriteStream(`${stack.path}${stack.vueFileName}`);
    w.on("error", function (err) {
        hundleError(err);
    });

    fs.readFile('./src/templates/Index.vue', 'utf8', (err, template) => {
        if (err) {
            return error(err);
        }
        var replaced = template.replace(/__viewtitle__/, stack.viewTitle);
        if (stack.isSeparate) {
            replaced = replaced.replace(/__src__/, ` src="./${stack.templateFileName}"`);
        } else {
            replaced = replaced.replace(/__src__/, '');
        }
        w.write(replaced, 'utf8', (err) => {
            if (err) {
                return error(err);
            }
            success(`Create ${stack.path}${stack.vueFileName}`);
        });
    });
}

const createHtmlFile = () => {
    if (!stack.isSeparate) {
        return;
    }
    var w = fs.createWriteStream(`${stack.path}${stack.templateFileName}`);
    w.on("error", function (err) {
        hundleError(err);
    });
    w.on("finish", () => {
        success(`Create ${stack.path}${stack.templateFileName}`);
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
    console.log(chalk.red(message));
}