declare type Nullable<T> = T | null;
declare type Action<T> = { type: string; payload: T };
declare type ToFix = any;
