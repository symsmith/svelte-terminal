import renderer from "./renderer.js";
import App from "./App.svelte";
import { output } from "./runtime.js";

const fragment = renderer.createFragment();
renderer.render(App, { target: fragment });
output(fragment);
