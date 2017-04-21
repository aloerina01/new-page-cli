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
    try {
        createVueFile(answers.fileName, normalize(answers.path), null, null, answers.isSeparate);
        createHtmlFile(answers.fileName, normalize(answers.path), answers.isSeparate);
    } catch (err) {
        console.error(err);
    }

}

const normalize = (path) => {
    var _path = path.slice();
    if (_path.slice(-1) !== '/') {
        return _path + '/';
    }
    return _path;
}

const createVueFile = (fileName, path, pageTitle, pageName, isSeparate) => {
    if (fileName.indexOf('.vue') <= 0) {
        filename += '.vue';
    }

    var w = fs.createWriteStream(`${path}${fileName}`);
    w.on("error", function (err) {
        hundleError(err);
    });
    w.on("close", function (ex) {
        // TODO:
    });

    var r = fs.createReadStream('./src/templates/xxxx.vue');
    r.on("error", function (err) {
        hundleError(err);
    });
    
    r.pipe(w);
}

const createHtmlFile = (fileName, path, isSeparate) => {
    if (!isSeparate) {
        return;
    }
    var _filename = fileName.replace('.vue', '');
    fs.createWriteStream(`${path}${_filename}.tmpl.html`);
}

const hundleError = (err) => {
    console.log(err);
    throw new Error(err);
}