import { InspectorView, TreeBuilder } from "../types";
import { buildComponentTree } from "./build-component-tree";
import { buildFlatTree } from "./build-flat-tree";
import { buildRuntimeTree } from "./build-runtime-tree";

export const builders: Record<InspectorView, TreeBuilder> = {
    component: {
        id: 'component',
        label: 'Render as list of components',
        build: buildComponentTree,
    },
    flat: {
        id: 'flat',
        label: 'Render as flat list of composables',
        build: buildFlatTree,
    },
    tree: {
        id: 'tree',
        label: 'Render as tree of composables',
        build: buildRuntimeTree
    }
}