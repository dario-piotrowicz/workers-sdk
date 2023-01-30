import { main } from "../../index";
import { normalizeSlashes, stripTimings } from "./mock-console";

/**
 * A helper to 'run' wrangler commands for tests.
 */
export async function runWrangler(cmd?: string) {
	try {
		const argv = (cmd?.match(/([^\s"']+|"[^"]*"|'[^']*')/g) ?? []).map(
			(match) => `${match}`
		);
		await main(argv);
	} catch (err) {
		if (err instanceof Error) {
			err.message = normalizeSlashes(stripTimings(err.message));
		}
		throw err;
	}
}
