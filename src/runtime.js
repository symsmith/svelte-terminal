import { backgroundColorNames, Chalk, foregroundColorNames } from "chalk";

const defaultChalk = new Chalk({ level: 3 });

function capitalizeFirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getChalk(node, chalk) {
	const modifiers = [];
	if (
		node.attributes?.color &&
		foregroundColorNames.includes(node.attributes.color)
	) {
		modifiers.push(node.attributes?.color);
	}
	if (
		node.attributes?.bg &&
		backgroundColorNames.find(
			(c) => c === "bg" + capitalizeFirst(node.attributes.bg)
		)
	) {
		modifiers.push("bg" + capitalizeFirst(node.attributes.bg));
	}
	let customChalk = chalk || defaultChalk;
	for (const modifier of modifiers) {
		customChalk = customChalk[modifier];
	}
	return customChalk;
}

function getText(node, chalk) {
	if (node.kind === "element" && node.name !== "internal-text") {
		throw new Error("Text can only contain text");
	}
	let text = "";
	const newChalk = getChalk(node, chalk);

	if ("children" in node) {
		for (const child of node.children) {
			text += getText(child, newChalk);
		}
	} else if (node.kind === "text") {
		text += newChalk(node.text);
	}

	return text;
}

function outputText(node) {
	const text = getText(node);

	console.log(text);
}

function outputInternal(node) {
	if (node.kind === "element" && node.name === "internal-text") {
		outputText(node);
	} else if ("children" in node) {
		for (const child of node.children) {
			outputInternal(child);
		}
	}
}

export function output(node) {
	outputInternal(node);
}
