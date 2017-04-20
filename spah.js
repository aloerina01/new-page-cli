#!/usr/bin/env node

const yargs = require('yargs');

const argv = yargs
    .commandDir('./src/commands')
    .usage('spah <command> [options]')
    .version()
    .help('help')
    .alias('help', 'h')
    .alias('version', 'v')
    .argv;