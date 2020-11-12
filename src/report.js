const {dim, yellow, red, bold, green, blue} = require("colorette");

const Diagnostics = require("./diagnostics/diagnostics");
const ValidationError = require("./diagnostics/error");
const Warning = require("./diagnostics/warning");
const plural = require("./utils/plural");

/**
 * @param {Warning | ValidationError | Error | Diagnostics} params
 * @returns {string | void}
 */
function report(params) {
	if (params instanceof Warning) {
		return `  ${yellow("warning")}  ${params.message}  ${dim(
			`#/${params.position.join("/")}`,
		)}`;
	}

	if (params instanceof ValidationError) {
		return `  ${red("error")}  ${params.message}  ${dim(
			`#/${params.position.join("/")}`,
		)}`;
	}

	if (params instanceof Error) {
		return `  ${red(params.stack)}`;
	}

	if (params instanceof Diagnostics) {
		const passedLength = params.diagnostics.pass.length;
		const problemsLength = params.diagnostics.errors.length;
		const warningsLength = params.diagnostics.errors.filter((error) =>
			error instanceof Warning
		).length;
		const errorsLength = problemsLength - warningsLength;

		const passed = plural(passedLength, "file", "files");

		if (errorsLength > 0) {
			const problems = plural(problemsLength, "problem", "problems");
			const errors = plural(errorsLength, "error", "errors");
			const warnings = plural(warningsLength, "warning", "warnings");
			const summary =
				"\n" +
				blue(`ℹ ${passed} passed`) +
				"\n" +
				bold(red(`✖ ${problems} (${errors}, ${yellow(warnings)})`)) +
				"\n\n";
			const reportChunks = Object.entries(params.groupedProblems).map((
				[key, errors],
			) => {
				return ["\n" + key, ...errors.map(report)].join("\n");
			});
			const fullReport = reportChunks.concat(summary).join("\n");

			process.stdout.write(fullReport);
			process.exit(1);
		}

		if (warningsLength > 0) {
			const warnings = plural(warningsLength, "warning", "warnings");
			const summary =
				"\n" +
				blue(`ℹ ${passed} passed`) +
				"\n" +
				bold(yellow(`⚠ ${warnings}`)) +
				"\n\n";
			const reportChunks = Object.entries(params.groupedProblems).map((
				[key, errors],
			) => {
				return ["\n" + key, ...errors.map(report)].join("\n");
			});
			const fullReport = reportChunks.concat(summary).join("\n");

			process.stdout.write(fullReport);
			process.exit(0);
		}

		process.stdout.write(
			"\n" +
			blue(`ℹ ${passed} validated`) +
			"\n" +
			bold(green("\u2714 No knowns problems!")) +
			"\n\n",
		);
		process.exit(0);
	}
}

module.exports = report;
