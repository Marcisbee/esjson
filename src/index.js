const arg = require('arg');
const {resolve} = require('path');

const {directory} = require('./directory');
const Warning = require('./diagnostics/warning');
const Diagnostics = require('./diagnostics/diagnostics');
const report = require('./report');
const validate = require('./validate');

const defaultConfig = {
  extensions: [
    '*.json'
  ]
};

/**
 * @typedef Context
 * @property {(json: *, position: (string | number)[], currentSchema?: *) => void} validateSchema
 * @property {(message: string, code: string, position: (string | number)[]) => (import('./diagnostics/error') | Warning | Error)} error
 * @property {(import('./diagnostics/error') | Warning | Diagnostics | Error)[]} errors
 * @property {Record<string, any>} schema
 * @property {string} filePath
 * @property {boolean=} shallow
 */

function validator() {
  const args = arg({
    // Types
    '--version': Boolean,
    '--schema': String,
    '--extensions': [String],

    // Aliases
    '-v': '--version',
    '-s': '--schema',
    '-e': '--extensions'
  });

  if (args['--version']) {
    const packageJson = require('../package.json');
    console.log(`v${packageJson.version}`);
    process.exit(0);
  }

  const userConfig = {};
  if (args['--extensions']) {
    userConfig.extensions = args['--extensions'];
  }

  const rootPathRelative = args._[0] || '.';
  const rootPath = resolve(rootPathRelative);

  if (!args['--schema']) {
    console.log('Missing option: --schema');
    process.exit(1);
  }

  const schema = require(require.resolve(args['--schema'], {paths: [resolve('.')]}));

  const diagnostics = {
    pass: [],
    errors: []
  };
  const queue = [];
  const config = {...defaultConfig, ...userConfig};

  process.stdout.write('\r\x1b[KFetching json files...');

  try {
    directory(rootPath, (filePath, read) => {
      queue.push(() => {
        const pathEnding = filePath.slice(-60);
        const printPath = pathEnding.length < filePath.length ? `...${pathEnding}` : pathEnding;

        process.stdout.write(`\r\x1b[KEvaluating ${printPath}...`);

        try {
          validate(filePath, read(), schema);
          diagnostics.pass.push(filePath);
        } catch (e) {
          if (Array.isArray(e)) {
            diagnostics.errors.push(
              ...e.map(error => {
                error.path = filePath;
                return error;
              })
            );
          } else {
            e.path = filePath;
            diagnostics.errors.push(e);
          }
        }

        const next = queue.shift();

        if (typeof next === 'function') {
          next();
        }
      });
    }, {
      include: config.extensions
    });
  } catch (_) {
    // Just skip
  }

  const fn = queue.shift();

  if (typeof fn === 'function') {
    fn();

    process.stdout.write('\r\x1b[K');
    report(new Diagnostics(diagnostics));

    return;
  }

  process.stdout.write('\r\x1b[K');
  console.log(report(new Warning(`No json files found in directory "${rootPath}"\n`, [])));
}

module.exports = validator;
