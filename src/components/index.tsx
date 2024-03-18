/*React Component whose props can be serialised / deserialised*/

import { ReactNode } from "react";
import { v4 } from "uuid";


type UuidV4 = `${string}-${string}-${string}-${string}-${string}`;
type Identifiable = { id: UuidV4 };
type RenderableNodeProps<T, P> = { type: T; props: P };



type PlaceHolderNode = RenderableNodeProps<
    "Placeholder",
    Record<string, unknown>
>;


type RenderableNode = PlaceHolderNode;
type Renderable = RenderableNode & Partial<Identifiable>;

const render = ({ type, props, id }: Renderable): ReactNode => {
    const uuid = v4() as UuidV4;

    switch (type) {
        default:
            return null;
    }
};

export { render };
export type {
    Identifiable,
    Renderable,
    RenderableNodeProps,
    UuidV4
};

/// utility functions
