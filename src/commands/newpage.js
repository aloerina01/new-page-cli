const readline = require('readline');

const stack = {};

exports.command = 'newpage';
exports.desc = 'create a new page based on the template.';
exports.builder = {

}
exports.handler = (argv) => {
    const rl = readline.createInterface(process.stdin, process.stdout, null);
    rl.setPrompt('spah > ');
    rl.question("new page name?", (answer) => {
        console.log('I see.');

        close(rl);
    });
}

const close = (instance) => {
    instance.close();
    process.stdin.destroy();
} 