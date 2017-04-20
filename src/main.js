const yargs = require('yargs');

const argv = yargs
    .commandDir('commands')
    .usage('spah <command> [options]')
    .version()
    .help('help')
    .alias('help', 'h')
    .alias('version', 'v')
    .argv;