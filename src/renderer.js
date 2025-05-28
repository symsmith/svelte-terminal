import { createCustomRenderer } from "svelte/renderer";

export function createTerminalRenderer(options) {
	const parents = new WeakMap();

	const log = options?.debug ? console.log : () => {};

	return createCustomRenderer({
		createFragment() {
			log("create fragment");
			return { kind: "fragment", children: [] };
		},
		createElement(name) {
			log("create", { name });
			return { kind: "element", name, children: [], attributes: {} };
		},
		createComment(comment) {
			log("create", { comment });
			return { kind: "comment", comment };
		},
		createTextNode(text) {
			log("create", { text });
			return { kind: "text", text };
		},
		getFirstChild(node) {
			log("get first child", { node });
			return node.children?.at(0);
		},
		getNextSibling(node) {
			log("get next sibling", { node });
			const parent = parents.get(node);
			if (!parent || !parent.children) return;
			const index = parent.children.indexOf(node);
			return parent.children[index + 1];
		},
		getParent(node) {
			log("get parent", { node });
			return parents.get(node);
		},
		setAttribute(node, key, value) {
			log("setting attribute", { node, key, value });
			if ("attributes" in node) {
				node.attributes[key] = value;
			}
		},
		insert(parent, element, anchor) {
			log("insert", { parent, element, anchor });
			if (!parent.children) return;
			if (element.kind === "fragment") {
				for (let child of element.children) {
					const idx = parent.children.findIndex((el) => el === anchor);
					parent.children.splice(
						idx !== -1 ? idx : parent.children.length,
						0,
						child
					);
					parents.set(child, parent);
				}
			} else {
				const idx = parent.children.findIndex((el) => el === anchor);
				parent.children.splice(
					idx !== -1 ? idx : parent.children.length,
					0,
					element
				);
				parents.set(element, parent);
			}
		},
		remove(node) {
			log("remove", { node });
			if (!node) return;
			const parent = parents.get(node);
			if (!parent) return;
			if (parent.kind === "fragment") {
				parent.children = parent.children.filter((el) => el !== node);
			} else {
				log("remove element", { node, parent });
				log("flush");
			}
		},
	});
}

const renderer = createTerminalRenderer();

export default renderer;
