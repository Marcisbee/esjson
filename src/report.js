const {dim, yellow, red, bold, green} = require('colorette');

const Diagnostics = require('./diagnostics/diagnostics');
const ValidationError = require('./diagnostics/error');
const Warning = require('./diagnostics/warning');

/**
 * @param {Warning | ValidationError | Error | Diagnostics} params
 * @returns {string | void}
 */
function report(params) {
  if (params instanceof Warning) {
    return `  ${yellow('warning')}  ${params.message}  ${dim('#/' + params.position.join('/'))}`;
  }

  if (params instanceof ValidationError) {
    return `  ${red('error')}  ${params.message}  ${dim('#/' + params.position.join('/'))}`;
  }

  if (params instanceof Error) {
    return `  ${red(params.stack)}`;
  }

  if (params instanceof Diagnostics) {
    if (params.diagnostics.errors.length > 0) {
      const summary = '\n' + bold(red(`✖ ${params.diagnostics.errors.length} problem (${params.diagnostics.errors.length} errors, 0 warnings)`)) + '\n\n';
      const reportChunks = Object.entries(params.groupedProblems)
        .map(([key, errors]) => {
          return [
            '\n' + key,
            ...errors.map(report)
          ].join('\n');
        });
      const fullReport = reportChunks.concat(summary).join('\n');

      process.stdout.write(fullReport);
      process.exit(1);
    }

    process.stdout.write('\n' + bold(green('✔ No problems found')) + '\n\n');
    process.exit(0);
  }
}

module.exports = report;
