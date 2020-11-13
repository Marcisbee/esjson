const arg = require("arg");
const {yellow, bold} = require("colorette");
const {resolve} = require("path");

const {directory} = require("./directory");
const Warning = require("./diagnostics/warning");
const Diagnostics = require("./diagnostics/diagnostics");
const report = require("./report");
const validate = require("./validate");

const defaultConfig = {
	include: ["*.json"],
	exclude: ["node_modules/**"],
};

/**
 * @typedef Ref
 * @property {string} key
 * @property {string} definition
 */

/**
 * @typedef Context
 * @property {(json: *, position: (string | number)[], currentSchema?: *) => void} validateSchema
 * @property {(message: string, code: string, position: (string | number)[], ref?: Ref) => (import('./diagnostics/error') | Warning | Error)} error
 * @property {(import('./diagnostics/error') | Warning | Diagnostics | Error)[]} errors
 * @property {Record<string, any>} schema
 * @property {Record<string, any>} config
 * @property {string} filePath
 * @property {boolean=} shallow
 */

function validator() {
	const args = arg({
		// Types
		"--version": Boolean,
		"--schema": String,
		"--include": [String],
		"--exclude": [String],
		"--allow": [String],

		// Aliases
		"-v": "--version",
		"-s": "--schema",
		"-i": "--include",
		"-e": "--exclude",
		"-a": "--allow",
	});

	if (args["--version"]) {
		const packageJson = require("../package.json");
		console.log(`v${packageJson.version}`);
		process.exit(0);
	}

	const userConfig = {};
	if (args["--include"]) {
		userConfig.include = args["--include"];
	}

	if (args["--allow"]) {
		userConfig.allow = args["--allow"].reduce(
			(acc, rule) => {
				const [type, name, title] = rule.split(":");

				if (!rule) {
					throw new Error("Empty `allow` option provided");
				}

				if (!type) {
					throw new Error("Second parameter is not defined in `allow` option");
				}

				if (!type) {
					throw new Error("Third parameter is not defined in `allow` option");
				}

				if (title) {
					console.log(
						yellow(
							`${bold("!")} Allowing "${name}" to pass ${type} on "${title}"`,
						),
					);
				} else {
					console.log(
						yellow(
							`${bold("!")} Allowing "${name}" to pass ${type} on every definition`,
						),
					);
				}

				acc[type] = {
					...acc[type],
					[name]: title || true,
				};

				return acc;
			},
			{},
		);
	}

	const rootPathRelative = args._[0] || ".";
	const rootPath = resolve(rootPathRelative);

	if (!args["--schema"]) {
		console.log("Missing option: --schema");
		process.exit(1);
	}

	const schema = require(
		require.resolve(args["--schema"], {paths: [resolve(".")]}),
	);

	const diagnostics = {
		pass: [],
		errors: [],
	};
	const queue = [];
	const config = {...defaultConfig, ...userConfig};

	process.stdout.write("\r\x1b[KFetching json files...");

	try {
		directory(
			rootPath,
			(filePath, read) => {
				queue.push(() => {
					const pathEnding = filePath.slice(-60);
					const printPath =
						pathEnding.length < filePath.length
							? `...${pathEnding}`
							: pathEnding;

					process.stdout.write(`\r\x1b[KEvaluating ${printPath}`);

					try {
						validate(filePath, read(), schema, userConfig);
						diagnostics.pass.push(filePath);
					} catch (e) {
						if (Array.isArray(e)) {
							diagnostics.errors.push(
								...e.map((error) => {
									error.path = filePath;
									return error;
								}),
							);
						} else {
							e.path = filePath;
							diagnostics.errors.push(e);
						}
					}

					const next = queue.shift();

					if (typeof next === "function") {
						next();
					}
				});
			},
			{
				include: config.include,
			},
		);
	} catch (_) {
		// Just skip
	}

	const fn = queue.shift();

	if (typeof fn === "function") {
		fn();

		process.stdout.write("\r\x1b[K");
		report(new Diagnostics(diagnostics));

		return;
	}

	process.stdout.write("\r\x1b[K");
	console.log(
		report(
			new Warning(
				`No json files found in directory "${rootPath}"\n`,
				"not-found",
				[],
			),
		),
	);
}

module.exports = validator;
