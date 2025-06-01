import nodeResolve from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import svelte from "rollup-plugin-svelte";
import path from "node:path";

const customRenderer = path.join(process.cwd(), "./src/renderer.js");

export default defineConfig({
	input: "src/index.js",
	output: {
		file: "dist/bundle.js",
		format: "cjs",
	},
	plugins: [
		svelte({
			include: "src/**/*.svelte",
			compilerOptions: {
				customRenderer,
			},
		}),
		nodeResolve(),
	],
});
