/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_UNDER_CONSTRUCTION?: string;
  readonly REACT_APP_SITE_UNDER_CONSTRUCTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
