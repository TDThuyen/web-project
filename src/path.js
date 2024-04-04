import { URL } from 'node:url';
import path from "path";
export const _dirname = new URL('.', import.meta.url).pathname.slice(1);
export const _dirnameView = path.join(new URL('.', import.meta.url).pathname.slice(1),"/views");
export const _dirnamePublic = path.join(new URL('.', import.meta.url).pathname.slice(1),"/public");
