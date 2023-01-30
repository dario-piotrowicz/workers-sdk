import { useMockIsTTY } from "../helpers/mock-istty";
import { runInTempDir } from "../helpers/run-in-tmp";
import { runWrangler } from "../helpers/run-wrangler";
import writeWranglerToml from "../helpers/write-wrangler-toml";

describe("execute", () => {
	runInTempDir();
	const { setIsTTY } = useMockIsTTY();

	describe("db initialization", () => {
		beforeEach(() => {
			setIsTTY(false);
			writeWranglerToml({
				d1_databases: [
					{ binding: "DATABASE", database_name: "db", database_id: "xxxx" },
				],
			});
		});

		it("should FAIL", async () => {
			// this causes a segmentation fault
			await expect(
				runWrangler(
					"d1 execute DATABASE -y --local --command 'CREATE TABLE if not exists T (id CHAR PRIMARY KEY);'"
				)
			).rejects.toThrowError(`FAIL`);
		});
	});
});
