/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_MODE: string
  readonly VITE_APP_USE_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 