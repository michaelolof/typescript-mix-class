export declare type Constructor<T> = new (...args: any[]) => T;
export default function use(...options: Constructor<{}>[]): (target: any, propertyKey: string) => void;
