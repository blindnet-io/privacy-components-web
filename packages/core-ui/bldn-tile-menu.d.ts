import { LitElement } from 'lit';
interface Tile {
    title: string;
    description: string;
    value: string;
}
export declare class BldnTileMenu extends LitElement {
    tiles: Tile[];
    handleTileClick(value: string): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};
