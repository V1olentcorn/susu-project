// .vitepress/types.d.ts
declare global {
  interface ImportMeta {
    env: {
      MODE: string;
      DEV: boolean;
      PROD: boolean;
      SSR: boolean;
    };
  }
}

export {};
