import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `nuxt-snackbar`
     */
    ["snackbar"]: typeof import("nuxt-snackbar").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/leaflet`
     */
    ["leaflet"]: typeof import("@nuxtjs/leaflet").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `nuxt-snackbar`
     */
    ["snackbar"]?: typeof import("nuxt-snackbar").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/leaflet`
     */
    ["leaflet"]?: typeof import("@nuxtjs/leaflet").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["nuxt-snackbar", Exclude<NuxtConfig["snackbar"], boolean>] | ["@nuxtjs/leaflet", Exclude<NuxtConfig["leaflet"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `nuxt-snackbar`
     * @see https://www.npmjs.com/package/nuxt-snackbar
     */
    ["snackbar"]: typeof import("nuxt-snackbar").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/leaflet`
     * @see https://www.npmjs.com/package/@nuxtjs/leaflet
     */
    ["leaflet"]: typeof import("@nuxtjs/leaflet").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `nuxt-snackbar`
     * @see https://www.npmjs.com/package/nuxt-snackbar
     */
    ["snackbar"]?: typeof import("nuxt-snackbar").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/leaflet`
     * @see https://www.npmjs.com/package/@nuxtjs/leaflet
     */
    ["leaflet"]?: typeof import("@nuxtjs/leaflet").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["nuxt-snackbar", Exclude<NuxtConfig["snackbar"], boolean>] | ["@nuxtjs/leaflet", Exclude<NuxtConfig["leaflet"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },

   snackbar: {
      top: boolean,

      bottom: boolean,

      left: boolean,

      right: boolean,

      groups: boolean,

      success: string,

      error: string,

      warning: string,

      info: string,

      duration: number,

      limit: number,

      messageClass: string,

      messageActionClass: string,

      zIndex: number,

      dense: boolean,

      shadow: boolean,

      reverse: boolean,

      border: string,

      backgroundOpacity: number,

      backgroundColor: string,

      baseBackgroundColor: string,

      dismissOnActionClick: boolean,

      iconPresets: any,
   },
  }
  interface PublicRuntimeConfig {
   snackbar: {
      top: boolean,

      bottom: boolean,

      left: boolean,

      right: boolean,

      groups: boolean,

      success: string,

      error: string,

      warning: string,

      info: string,

      duration: number,

      limit: number,

      messageClass: string,

      messageActionClass: string,

      zIndex: number,

      dense: boolean,

      shadow: boolean,

      reverse: boolean,

      border: string,

      backgroundOpacity: number,

      backgroundColor: string,

      baseBackgroundColor: string,

      dismissOnActionClick: boolean,

      iconPresets: any,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }