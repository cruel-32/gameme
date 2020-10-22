/* eslint-disable prettier/prettier */
export const toASCII = (plaintext:string) => Array.from(plaintext).map((t:string) => t.charCodeAt(0)).join('_');
export const fromASCII = (ASCII:string) => ASCII.split('_').map((t:string) => String.fromCharCode(parseInt(t, 10))).join('');
