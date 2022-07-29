import { TemplateResult } from 'lit';
import '../src/bldn-priv-request.js';
declare const _default: {
    title: string;
    component: string;
    argTypes: {
        actions: {
            control: string;
            description: string;
        };
        locale: {
            control: string;
            description: string;
            options: readonly ["en", "fr"];
        };
    };
};
export default _default;
interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
}
interface ArgTypes {
    actions?: string;
    locale?: string;
}
export declare const Regular: Story<ArgTypes>;
export declare const CustomActions: Story<ArgTypes>;
export declare const CustomLocale: Story<ArgTypes>;
