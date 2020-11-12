class Diagnostics {
	/**
   * @param {{ pass: string[], errors: (import('./error') | import('./warning') | Error)[]}} diagnostics
   */
	constructor(diagnostics) {
		this.diagnostics = diagnostics;
		this.groupedProblems = diagnostics.errors.reduce(
			(acc, error) => {
				// @ts-ignore
				const {path} = error;

				if (typeof acc[path] === "undefined") {
					acc[path] = [];
				}

				acc[path].push(error);

				return acc;
			},
			{},
		);
	}
}

module.exports = Diagnostics;
