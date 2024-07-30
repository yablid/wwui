// src/types/declarations.d.ts
import 'axios';

declare module '*.png';
declare module '*.webp';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}