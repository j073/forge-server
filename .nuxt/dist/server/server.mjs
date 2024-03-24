import { effectScope, reactive, hasInjectionContext, getCurrentInstance, inject, toRef, version, unref, ref, watchEffect, watch, computed, defineComponent, h, isReadonly, isRef, isShallow, isReactive, toRaw, provide, createElementBlock, createVNode, Fragment, withDirectives, resolveDirective, createTextVNode, resolveComponent, mergeProps, withCtx, openBlock, createBlock, renderList, useSSRContext, defineAsyncComponent, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, createApp } from "vue";
import { useRuntimeConfig as useRuntimeConfig$1 } from "#internal/nitro";
import { $fetch as $fetch$1 } from "ofetch";
import { createHooks } from "hookable";
import { getContext } from "unctx";
import { sanitizeStatusCode, createError as createError$1, appendHeader } from "h3";
import { withQuery, hasProtocol, parseURL, isScriptProtocol, joinURL, isEqual, stringifyParsedURL, stringifyQuery, parseQuery, withLeadingSlash } from "ufo";
import { getActiveHead } from "unhead";
import { defineHeadPlugin, composableNames } from "@unhead/shared";
import { toRouteMatcher, createRouter } from "radix3";
import { defu } from "defu";
import "klona";
import "devalue";
import "destr";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrGetDirectiveProps, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderSuspense, ssrRenderVNode } from "vue/server-renderer";
import "react";
import { Carousel, Slide } from "vue3-carousel";
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options2) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.11.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set(),
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options2
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options2.ssrContext.runtimeConfig.public,
      app: options2.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options2.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
  if (typeof plugin === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.push(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
// @__NO_SIDE_EFFECTS__
function tryUseNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  return nuxtAppInstance || null;
}
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  const nuxtAppInstance = /* @__PURE__ */ tryUseNuxtApp();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options2) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options2 == null ? void 0 : options2.open) {
    return Promise.resolve();
  }
  const isExternal = (options2 == null ? void 0 : options2.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options2 == null ? void 0 : options2.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options2 == null ? void 0 : options2.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options2 == null ? void 0 : options2.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options2 == null ? void 0 : options2.replace) ? router.replace(to) : router.push(to);
};
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error2 = useError();
    if (false)
      ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const clearError = async (options2 = {}) => {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const error = useError();
  nuxtApp.callHook("app:error:cleared", options2);
  if (options2.redirect) {
    await useRouter().replace(options2.redirect);
  }
  error.value = null;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && process.env.NODE_ENV !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options2 = {}) {
  const head = options2.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options2);
    return head.push(input, options2);
  }
}
function clientUseHead(head, input, options2 = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options2);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  manifest_45route_45rule
];
function getRouteFromPath(fullPath) {
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = parseURL(fullPath.toString());
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: {},
    name: void 0,
    matched: [],
    redirectedFrom: void 0,
    meta: {},
    href: fullPath
  };
}
const router_CaKIoANnI2 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      error: []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    const baseURL2 = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (typeof result === "string" && result.length) {
            return handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false)
          ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const currentRoute = computed(() => route);
    const router = {
      currentRoute,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url, false),
      replace: (url) => handleNavigation(url, true),
      back: () => (void 0).history.go(-1),
      go: (delta) => (void 0).history.go(delta),
      forward: () => (void 0).history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", defineComponent({
      functional: true,
      props: {
        to: {
          type: String,
          required: true
        },
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          var _a;
          const route2 = router.resolve(props.to);
          return props.custom ? (_a = slots.default) == null ? void 0 : _a.call(slots, { href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    }));
    nuxtApp._route = route;
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    const initialLayout = nuxtApp.payload.state._layout;
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        var _a;
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout;
        }
        nuxtApp._processingMiddleware = true;
        if (!((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext)) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          {
            const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
            if (routeRules.appMiddleware) {
              for (const key in routeRules.appMiddleware) {
                const guard = nuxtApp._middleware.named[key];
                if (!guard) {
                  return;
                }
                if (routeRules.appMiddleware[key]) {
                  middlewareEntries.add(guard);
                } else {
                  middlewareEntries.delete(guard);
                }
              }
            }
          }
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`,
                  data: {
                    path: initialURL
                  }
                });
                delete nuxtApp._processingMiddleware;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result === true) {
              continue;
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
function useRequestEvent(nuxtApp = /* @__PURE__ */ useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const options = {
  "images": true,
  "videos": true,
  "audios": true,
  "iframes": true,
  "native": false,
  "directiveOnly": false,
  "defaultImage": false,
  "loadingClass": "isLoading",
  "loadedClass": "isLoaded",
  "appendClass": "lazyLoad",
  "observerConfig": {}
};
const plugin_hwlJ5PmHMh = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const isPictureChild = (el) => el.parentNode && el.parentNode.tagName.toLowerCase() === "picture";
  const setAttribute = (el, attribute) => {
    const dataAttribute = `data-${attribute}`;
    if (Array.isArray(el))
      for (const item of el)
        setAttribute(item, attribute);
    else if (el.getAttribute(dataAttribute)) {
      el.setAttribute(attribute, el.getAttribute(dataAttribute));
      el.removeAttribute(dataAttribute);
      if (el.parentNode.load)
        el.parentNode.load();
    } else if (el.tagName.toLowerCase() === "picture") {
      const img = el.querySelector("img");
      if (img) {
        setAttribute(img, "src");
        setAttribute(img, "srcset");
        img.addEventListener("load", () => setClass(el));
      }
    }
  };
  const setClass = (el) => {
    el.classList.remove(options.loadingClass);
    el.classList.add(options.loadedClass);
  };
  const setEvents = (el) => {
    const tagName = el.tagName.toLowerCase();
    let eventName = "load";
    if (["video", "audio"].includes(tagName))
      eventName = "loadeddata";
    el.addEventListener(eventName, () => {
      if (isPictureChild(el)) {
        if (el.parentNode.getAttribute("data-not-lazy") === null)
          setClass(el.parentNode);
        else
          el.parentNode.removeAttribute("data-not-lazy");
      } else
        setClass(el);
    });
  };
  nuxtApp.vueApp.directive("lazy-load", {
    beforeMount(el) {
      setEvents(el);
      if (!isPictureChild(el) && options.appendClass)
        el.classList.add(options.appendClass);
    },
    mounted(el) {
    },
    getSSRProps() {
      return {};
    }
  });
  nuxtApp.vueApp.directive("not-lazy", {
    beforeMount(el) {
      for (const item of [...el.querySelectorAll("source"), ...el.querySelectorAll("img")]) {
        setAttribute(item, "src");
        setAttribute(item, "srcset");
      }
      if (el.tagName.toLowerCase() !== "picture")
        el.removeAttribute("data-not-lazy");
    },
    getSSRProps() {
      return {};
    }
  });
});
const plugins = [
  unhead_KgADcZ0jPj,
  router_CaKIoANnI2,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  plugin_hwlJ5PmHMh
];
function HeaderLayout() {
  function closeMenu(e) {
    e.preventDefault();
    var element = (void 0).getElementById("append-menu-header");
    element.classList.remove("active");
  }
  return createVNode(Fragment, null, [createVNode("header", {
    "className": "site-header site-header--menu-right fugu--header-section fugu--header-three ",
    "id": "sticky-menu"
  }, [createVNode("div", {
    "className": "container-fluid"
  }, [createVNode("nav", {
    "className": "navbar site-navbar"
  }, [createVNode("div", {
    "className": "brand-logo"
  }, [createVNode("a", {
    "href": "/",
    "aria-label": "Great RAJAZEUS"
  }, [createVNode("noscript", null, [withDirectives(createVNode("img", {
    "id": "logobrand",
    "alt": "",
    "srcSet": "./assets/img/logorz.webp 1x, /images/nextImageExportOptimizer/logortpgroup-opt-384.WEBP 2x",
    "data-src": "https://it-cgg.b-cdn.net/rtp/rmj/999f3b90-5abf-4ec3-8c68-3f9def53cb01.webp",
    "width": "350",
    "height": "45",
    "decoding": "async",
    "data-nimg": "1",
    "className": "light-version-logo",
    "loading": "lazy",
    "style": {
      color: "transparent"
    }
  }, null), [[resolveDirective("lazy-load")]])]), withDirectives(createVNode("img", {
    "id": "logobrand",
    "alt": "",
    "srcSet": "https://it-cgg.b-cdn.net/rtp/rmj/999f3b90-5abf-4ec3-8c68-3f9def53cb01.webp",
    "data-src": "https://it-cgg.b-cdn.net/rtp/rmj/999f3b90-5abf-4ec3-8c68-3f9def53cb01.webp",
    "width": "350",
    "height": "45",
    "decoding": "async",
    "data-nimg": "1",
    "className": "light-version-logo",
    "loading": "lazy"
  }, null), [[resolveDirective("lazy-load")]]), createVNode("svg", {
    "style": {
      width: "auto",
      maxHeight: "100%",
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 0,
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: "1px"
    }
  }, [createVNode("filter", {
    "id": "sharpBlur"
  }, [createVNode("feGaussianBlur", {
    "stdDeviation": "20",
    "colorInterpolationFilters": "sRGB"
  }, null), createVNode("feColorMatrix", {
    "type": "matrix",
    "colorInterpolationFilters": "sRGB",
    "values": "1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"
  }, null), createVNode("feComposite", {
    "in2": "SourceGraphic",
    "operator": "in"
  }, null)])])])]), createVNode("div", {
    "className": "header-btn desktop header-btn-l1 ms-auto d-flex d-none d-xs-inline-flex"
  }, [createVNode("a", {
    "className": "btn",
    "href": "https://urlshortenertool.com/RTP-RM",
    "style": {
      color: "white",
      marginRight: "10px"
    }
  }, [createTextVNode("CEK RTP SEKARANG")]), createVNode("a", {
    "className": "fugu--btn fugu--menu-btn1",
    "href": "https://urlshortenertool.com/RTP-RM"
  }, [createTextVNode("DAFTAR")])]), createVNode("div", {
    "className": "header-btn mobile"
  }, [createVNode("a", {
    "className": "fugu--btn fugu--menu-btn1",
    "style": {
      width: "25px !important",
      marginTop: "15px",
      marginRight: "2.5px",
      color: "white !important"
    },
    "href": "https://urlshortenertool.com/RTP-RM"
  }, [createTextVNode("Daftar")])])]), createVNode("nav", {
    "className": "menu-block",
    "id": "append-menu-header"
  }, [createVNode("div", {
    "className": "mobile-menu-head"
  }, [createVNode("div", {
    "className": "mobile-menu-close",
    "onClick": closeMenu
  }, [createTextVNode("×")])]), createVNode("ul", {
    "className": "site-menu-main"
  }, [createVNode("li", {
    "className": "nav-item nav-item-has-children desktop-d-none"
  }, [createVNode("ul", {
    "className": "sub-menu active nav-item",
    "id": "submenu-2"
  }, [createVNode("li", {
    "className": "sub-menu--item"
  }, [createVNode("a", {
    "className": "drop-trigger",
    "href": "/rtp-gbowin/"
  }, [createTextVNode("Menu 1")])]), createVNode("li", {
    "className": "sub-menu--item"
  }, [createVNode("a", {
    "className": "drop-trigger",
    "href": "/rtp-gbowin/"
  }, [createTextVNode("Menu 2")])]), createVNode("li", {
    "className": "sub-menu--item"
  }, [createVNode("a", {
    "className": "drop-trigger",
    "href": "/rtp-gbowin/"
  }, [createTextVNode("Menu 3")])]), createVNode("li", {
    "className": "sub-menu--item"
  }, [createVNode("a", {
    "className": "drop-trigger",
    "href": "/rtp-gbowin/"
  }, [createTextVNode("Menu 4")])])])])])])])])]);
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$6 = defineComponent({
  name: "ImageSlider",
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      images: [
        { src: "https://it-cgg.b-cdn.net/rtp/rmj/banner1.webp", alt: "Image 1" },
        { src: "https://it-cgg.b-cdn.net/rtp/rmj/banner2.webp", alt: "Image 2" },
        { src: "https://it-cgg.b-cdn.net/rtp/rmj/banner3.webp", alt: "Image 3" }
      ]
    };
  },
  computed: {
    imagesWithDuplicates() {
      return [
        ...this.images.slice(-1),
        ...this.images,
        ...this.images.slice(0, 1)
      ];
    }
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Carousel = resolveComponent("Carousel");
  const _component_Slide = resolveComponent("Slide");
  const _directive_lazy_load = resolveDirective("lazy-load");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Carousel, {
    autoplay: 2e3,
    loop: true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.imagesWithDuplicates, (image, index) => {
          _push2(ssrRenderComponent(_component_Slide, { key: index }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<img${ssrRenderAttrs(mergeProps({
                  "data-src": image.src,
                  alt: image.alt,
                  class: "carousel__item",
                  loading: "lazy"
                }, ssrGetDirectiveProps(_ctx, _directive_lazy_load)))}${_scopeId2}>`);
              } else {
                return [
                  withDirectives(createVNode("img", {
                    "data-src": image.src,
                    alt: image.alt,
                    class: "carousel__item",
                    loading: "lazy"
                  }, null, 8, ["data-src", "alt"]), [
                    [_directive_lazy_load]
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.imagesWithDuplicates, (image, index) => {
            return openBlock(), createBlock(_component_Slide, { key: index }, {
              default: withCtx(() => [
                withDirectives(createVNode("img", {
                  "data-src": image.src,
                  alt: image.alt,
                  class: "carousel__item",
                  loading: "lazy"
                }, null, 8, ["data-src", "alt"]), [
                  [_directive_lazy_load]
                ])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BannerSlide.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const BannerSlide = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$5 = {
  __name: "Checkup",
  __ssrInlineRender: true,
  setup(__props) {
    const titleCheck = ref("Server sedang dimuat...");
    return (_ctx, _push, _parent, _attrs) => {
      if (titleCheck.value !== null) {
        _push(`<div${ssrRenderAttrs(_attrs)}><p style="${ssrRenderStyle({ "color": "white" })}">${ssrInterpolate(titleCheck.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkup.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Checkup = _sfc_main$5;
async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import("image-meta").then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry2 of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry2.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function prerenderStaticImages(src = "", srcset = "") {
  if (!process.env.prerender) {
    return;
  }
  const paths = [
    src,
    ...srcset.split(", ").map((s) => s.trim().split(" ")[0].trim())
  ].filter((s) => s && s.includes("/_ipx/"));
  if (!paths.length) {
    return;
  }
  appendHeader(
    useRequestEvent(),
    "x-nitro-prerender",
    paths.map((p) => encodeURIComponent(p)).join(", ")
  );
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options2 = {}) => {
    const image = resolveImage(ctx, input, options2);
    if (process.env.prerender) {
      prerenderStaticImages(image.url);
    }
    return image;
  };
  const $img = (input, modifiers = {}, options2 = {}) => {
    return getImage2(input, {
      ...options2,
      modifiers: defu(modifiers, options2.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options2) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options2 });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options2) => getMeta(ctx, input, options2);
  $img.getSizes = (input, options2) => getSizes(ctx, input, options2);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options2) {
  const image = resolveImage(ctx, input, { ...options2 });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options2) {
  var _a, _b;
  if (typeof input !== "string" || input === "") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options2.provider || ctx.options.provider);
  const preset = getPreset(ctx, options2.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        input = joinURL(ctx.options.alias[base], input.substr(base.length));
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options2, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a, _b, _c, _d, _e;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const sizes = parseSizes(opts.sizes);
  const densities = ((_c = opts.densities) == null ? void 0 : _c.trim()) ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: (_d = opts.modifiers) == null ? void 0 : _d.width,
          _cHeight: (_e = opts.modifiers) == null ? void 0 : _e.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant == null ? void 0 : defaultVariant.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  var _a;
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = ((_a = sizeVariants[i + 1]) == null ? void 0 : _a.media) || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const getImage = (url) => ({ url });
const noneRuntime$nJY3PJXDWH = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getImage
});
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "none",
  "domains": [],
  "alias": {},
  "densities": [
    1,
    2
  ],
  "format": [
    "webp"
  ]
};
imageOptions.providers = {
  ["none"]: { provider: noneRuntime$nJY3PJXDWH, defaults: {} }
};
const useImage = () => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    nuxt: {
      baseURL: config.app.baseURL
    }
  }));
};
const baseImageProps = {
  // input source
  src: { type: String, required: true },
  // modifiers
  format: { type: String, default: void 0 },
  quality: { type: [Number, String], default: void 0 },
  background: { type: String, default: void 0 },
  fit: { type: String, default: void 0 },
  modifiers: { type: Object, default: void 0 },
  // options
  preset: { type: String, default: void 0 },
  provider: { type: String, default: void 0 },
  sizes: { type: [Object, String], default: void 0 },
  densities: { type: String, default: void 0 },
  preload: { type: Boolean, default: void 0 },
  // <img v-lazy-load > attributes
  width: { type: [String, Number], default: void 0 },
  height: { type: [String, Number], default: void 0 },
  alt: { type: String, default: void 0 },
  referrerpolicy: { type: String, default: void 0 },
  usemap: { type: String, default: void 0 },
  longdesc: { type: String, default: void 0 },
  ismap: { type: Boolean, default: void 0 },
  loading: {
    type: String,
    default: void 0,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    default: void 0,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    default: void 0,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], default: void 0 }
};
const useBaseImage = (props) => {
  const options2 = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options: options2,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], default: void 0 }
};
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtImg",
  props: imgProps,
  emits: ["load", "error"],
  setup: (props, ctx) => {
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const attrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          }
        }]
      });
    }
    if (process.env.prerender) {
      prerenderStaticImages(src.value, sizes.value.srcset);
    }
    const imgEl = ref();
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.isHydrating;
    return () => h("img", {
      ref: imgEl,
      src: src.value,
      ...{ onerror: "this.setAttribute('data-error', 1)" },
      ...attrs.value,
      ...ctx.attrs
    });
  }
});
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main$4 = {
  data() {
    return {
      activeItem: "Pragmatic Play",
      hotimages: [
        "https://it-cgg.b-cdn.net/rtp/rajapanen/hot-games/so-hot.webp",
        "https://it-cgg.b-cdn.net/rtp/rajapanen/hot-games/hot-bigwin.webp"
      ],
      currentIndex: 0,
      intervalId: null,
      queryPragma: "",
      queryPgsoft: "",
      queryJoker: "",
      queryMicro: "",
      queryHabanero: "",
      pragmadata: [],
      pgsoftdata: [],
      jokerdata: [],
      microdata: [],
      habanerodata: []
    };
  },
  mounted() {
    this.fetchPragmaData();
    this.fetchPgData();
    this.fetchJoker();
    this.fetchMicro();
    this.fetchHabanero();
    this.intervalId = setInterval();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    handleItemClick(item) {
      this.activeItem = item;
    },
    async fetchPragmaData() {
      try {
        const responsePragma = await $fetch("https://152.42.160.119/data/nuxt/pragmatic", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache"
          }
        });
        const jsonPragma = responsePragma.data;
        this.pragmadata = jsonPragma;
      } catch (error) {
        console.log("Error fetching", error);
      }
    },
    async fetchPgData() {
      try {
        const responsePg = await $fetch("https://152.42.160.119/data/nuxt/pgsoft", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache"
          }
        });
        const jsonPg = responsePg.data;
        this.pgsoftdata = jsonPg;
      } catch (error) {
        console.log("Error fetching", error);
      }
    },
    async fetchJoker() {
      try {
        const responseJoker = await $fetch("https://152.42.160.119/data/nuxt/joker", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache"
          }
        });
        const jsonJoker = responseJoker.data;
        this.jokerdata = jsonJoker;
      } catch (error) {
        console.log("Error fetching", error);
      }
    },
    async fetchMicro() {
      try {
        const responseMicro = await $fetch("https://152.42.160.119/data/nuxt/microgaming", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache"
          }
        });
        const jsonMicro = responseMicro.data;
        this.microdata = jsonMicro;
      } catch (error) {
        console.log("Error fetching", error);
      }
    },
    async fetchHabanero() {
      try {
        const responseHabanero = await $fetch("https://152.42.160.119/data/nuxt/habanero", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache"
          }
        });
        const jsonHabanero = responseHabanero.data;
        this.habanerodata = jsonHabanero;
      } catch (error) {
        console.log("Error fetching", error);
      }
    },
    switchImage() {
      this.currentIndex = (this.currentIndex + 1) % this.hotimages.length;
      this.$forceUpdate();
    }
  },
  computed: {
    liClasses() {
      return {
        active: this.activeItem,
        btnprovider: this.activeItem
      };
    },
    currentImage() {
      return this.hotimages[this.currentIndex];
    },
    filteredPragmadata() {
      return this.pragmadata.filter((item) => item.game_name.toLowerCase().includes(this.queryPragma.toLowerCase()));
    },
    filteredPgsoftdata() {
      return this.pgsoftdata.filter((item) => item.game_name.toLowerCase().includes(this.queryPgsoft.toLowerCase()));
    },
    filteredJokerData() {
      return this.jokerdata.filter((item) => item.game_name.toLowerCase().includes(this.queryJoker.toLowerCase()));
    },
    filteredeMicroData() {
      return this.microdata.filter((item) => item.game_name.toLowerCase().includes(this.queryMicro.toLowerCase()));
    },
    filteredHabaneroData() {
      return this.habanerodata.filter((item) => item.game_name.toLowerCase().includes(this.queryHabanero.toLowerCase()));
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_img = __nuxt_component_0$1;
  _push(`<!--[--><div class="container fugu-gallery-menu" style="${ssrRenderStyle({ "text-align": "center" })}"><ul><li class="${ssrRenderClass({
    active: $data.activeItem === "Pragmatic Play",
    j0x73fx: $data.activeItem === "Pragmatic Play"
  })}">`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    loading: "lazy",
    effect: "blur",
    src: "https://it-cgg.b-cdn.net/rtp/rmj/provider/pragmaticplay.webp",
    style: { "width": "100px" }
  }, null, _parent));
  _push(`<br>PRAGMATIC PLAY </li><li class="${ssrRenderClass({
    active: $data.activeItem === "PG Soft",
    j0x73fx: $data.activeItem === "PG Soft"
  })}">`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    loading: "lazy",
    effect: "blur",
    src: "https://it-cgg.b-cdn.net/rtp/rmj/provider/pgsoft.webp",
    style: { "width": "100px" }
  }, null, _parent));
  _push(`<br>PG SOFT </li><li class="${ssrRenderClass({
    active: $data.activeItem === "Joker",
    j0x73fx: $data.activeItem === "Joker"
  })}">`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    loading: "lazy",
    effect: "blur",
    src: "https://it-cgg.b-cdn.net/rtp/rmj/provider/joker.webp",
    style: { "width": "100px" }
  }, null, _parent));
  _push(`<br>JOKER </li><li class="${ssrRenderClass({
    active: $data.activeItem === "MicroGaming",
    j0x73fx: $data.activeItem === "MicroGaming"
  })}">`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    loading: "lazy",
    effect: "blur",
    src: "https://it-cgg.b-cdn.net/rtp/rmj/provider/microgaming.webp",
    style: { "width": "100px" }
  }, null, _parent));
  _push(`<br>MICROGAMING </li><li class="${ssrRenderClass({
    active: $data.activeItem === "Habanero",
    j0x73fx: $data.activeItem === "Habanero"
  })}">`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    loading: "lazy",
    effect: "blur",
    src: "https://it-cgg.b-cdn.net/rtp/rmj/provider/habanero.webp",
    style: { "width": "100px" }
  }, null, _parent));
  _push(`<br>HABANERO </li></ul></div><div class="container">`);
  if ($data.activeItem === "Pragmatic Play") {
    _push(`<div>`);
    if ($options.filteredPragmadata.length > 0) {
      _push(`<div class="row"><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><input type="text"${ssrRenderAttr("value", $data.queryPragma)} placeholder="Cari games..." style="${ssrRenderStyle({ "color": "white !important" })}"></div><!--[-->`);
      ssrRenderList($options.filteredPragmadata, (itemPragma) => {
        _push(`<div class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft"><div class="portfolio-item"><a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank"><div class="thumb img-fluid">`);
        _push(ssrRenderComponent(_component_nuxt_img, {
          loading: "lazy",
          effect: "blur",
          alt: itemPragma.game_name,
          src: itemPragma.img_src,
          style: { "width": "100%", "height": "auto" }
        }, null, _parent));
        _push(`</div></a><div class="progress-rtp"><p class="rtp-style">RTP: ${ssrInterpolate(itemPragma.number)} %</p><div class="${ssrRenderClass(["bg-progress-rtp", itemPragma.number < 55 && "red" || itemPragma.number >= 55 && itemPragma.number <= 75 && "yellow" || itemPragma.number > 75 && "green"])}" style="${ssrRenderStyle({ width: `${itemPragma.number}%` })}"></div></div><div class="down-content"><span>${ssrInterpolate(itemPragma.game_name)}</span></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<div><div class="row"><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><input type="text"${ssrRenderAttr("value", $data.queryPragma)} placeholder="Cari games..." style="${ssrRenderStyle({ "color": "white !important" })}"></div><!--[-->`);
      ssrRenderList($options.filteredPragmadata, (itemPragma) => {
        _push(`<div class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft"><div class="portfolio-item"><a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank"><div class="thumb img-fluid">`);
        _push(ssrRenderComponent(_component_nuxt_img, {
          loading: "lazy",
          effect: "blur",
          alt: itemPragma.game_name,
          src: itemPragma.img_src,
          style: { "width": "100%", "height": "auto" }
        }, null, _parent));
        _push(`</div></a><div class="progress-rtp"><p class="rtp-style">RTP: ${ssrInterpolate(itemPragma.number)} %</p><div class="${ssrRenderClass(["bg-progress-rtp", itemPragma.number < 55 && "red" || itemPragma.number >= 55 && itemPragma.number <= 75 && "yellow" || itemPragma.number > 75 && "green"])}" style="${ssrRenderStyle({ width: `${itemPragma.number}%` })}"></div></div><div class="down-content"><span>${ssrInterpolate(itemPragma.game_name)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="text-center" style="${ssrRenderStyle({ "color": "white", "animation": "fadeIn 2s", "width": "100%" })}">Data Game tidak ditemukan...</div></div>`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.activeItem === "PG Soft") {
    _push(`<div>`);
    if ($options.filteredPgsoftdata.length > 0) {
      _push(`<div class="row"><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><input type="text"${ssrRenderAttr("value", $data.queryPgsoft)} placeholder="Cari games..." style="${ssrRenderStyle({ "color": "white !important" })}"></div><!--[-->`);
      ssrRenderList($options.filteredPgsoftdata, (itemPG) => {
        _push(`<div class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft"><div class="portfolio-item"><a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank"><div class="thumb img-fluid">`);
        _push(ssrRenderComponent(_component_nuxt_img, {
          loading: "lazy",
          effect: "blur",
          alt: itemPG.game_name,
          src: itemPG.img_src,
          style: { "width": "100%", "height": "auto" }
        }, null, _parent));
        _push(`</div></a><div class="progress-rtp"><p class="rtp-style">RTP: ${ssrInterpolate(itemPG.number)} %</p><div class="${ssrRenderClass(["bg-progress-rtp", itemPG.number < 55 && "red" || itemPG.number >= 55 && itemPG.number <= 75 && "yellow" || itemPG.number > 75 && "green"])}" style="${ssrRenderStyle({ width: `${itemPG.number}%` })}"></div></div><div class="down-content"><span>${ssrInterpolate(itemPG.game_name)}</span></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<div><div class="row"><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><input type="text"${ssrRenderAttr("value", $data.queryPgsoft)} placeholder="Cari games..." style="${ssrRenderStyle({ "color": "white !important" })}"></div><!--[-->`);
      ssrRenderList($options.filteredPgsoftdata, (itemPG) => {
        _push(`<div class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft"><div class="portfolio-item"><a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank"><div class="thumb img-fluid">`);
        _push(ssrRenderComponent(_component_nuxt_img, {
          loading: "lazy",
          effect: "blur",
          alt: itemPG.game_name,
          src: itemPG.img_src,
          style: { "width": "100%", "height": "auto" }
        }, null, _parent));
        _push(`</div></a><div class="progress-rtp"><p class="rtp-style">RTP: ${ssrInterpolate(itemPG.number)} %</p><div class="${ssrRenderClass(["bg-progress-rtp", itemPG.number < 55 && "red" || itemPG.number >= 55 && itemPG.number <= 75 && "yellow" || itemPG.number > 75 && "green"])}" style="${ssrRenderStyle({ width: `${itemPG.number}%` })}"></div></div><div class="down-content"><span>${ssrInterpolate(itemPG.game_name)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="text-center" style="${ssrRenderStyle({ "color": "white", "animation": "fadeIn 2s", "width": "100%" })}">Data Game tidak ditemukan...</div></div>`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.activeItem === "Joker") {
    _push(`<div>`);
    if ($options.filteredJokerData.length > 0) {
      _push(`<div class="row"><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><input type="text"${ssrRenderAttr("value", $data.queryJoker)} placeholder="Cari games..." style="${ssrRenderStyle({ "color": "white !important" })}"></div><!--[-->`);
      ssrRenderList($options.filteredJokerData, (itemJoker) => {
        _push(`<div class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft"><div class="portfolio-item"><a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank"><div class="thumb img-fluid">`);
        _push(ssrRenderComponent(_component_nuxt_img, {
          loading: "lazy",
          effect: "blur",
          alt: itemJoker.game_name,
          src: itemJoker.img_src,
          style: { "width": "100%", "height": "auto" }
        }, null, _parent));
        _push(`</div></a><div class="progress-rtp"><p class="rtp-style">RTP: ${ssrInterpolate(itemJoker.number)} %</p><div class="${ssrRenderClass(["bg-progress-rtp", itemJoker.number < 55 && "red" || itemJoker.number >= 55 && itemJoker.number <= 75 && "yellow" || itemJoker.number > 75 && "green"])}" style="${ssrRenderStyle({ width: `${itemJoker.number}%` })}"></div></div><div class="down-content"><span>${ssrInterpolate(itemJoker.game_name)}</span></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<div><div class="row"><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><input type="text"${ssrRenderAttr("value", $data.queryJoker)} placeholder="Cari games..." style="${ssrRenderStyle({ "color": "white !important" })}"></div><!--[-->`);
      ssrRenderList($options.filteredPgsoftdata, (itemJoker) => {
        _push(`<div class="fugu-grid-itemJoker fugu-grid-itemJoker-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft"><div class="portfolio-itemJoker"><a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank"><div class="thumb img-fluid">`);
        _push(ssrRenderComponent(_component_nuxt_img, {
          loading: "lazy",
          effect: "blur",
          alt: itemJoker.game_name,
          src: itemJoker.img_src,
          style: { "width": "100%", "height": "auto" }
        }, null, _parent));
        _push(`</div></a><div class="progress-rtp"><p class="rtp-style">RTP: ${ssrInterpolate(itemJoker.number)} %</p><div class="${ssrRenderClass(["bg-progress-rtp", itemJoker.number < 55 && "red" || itemJoker.number >= 55 && itemJoker.number <= 75 && "yellow" || itemJoker.number > 75 && "green"])}" style="${ssrRenderStyle({ width: `${itemJoker.number}%` })}"></div></div><div class="down-content"><span>${ssrInterpolate(itemJoker.game_name)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="text-center" style="${ssrRenderStyle({ "color": "white", "animation": "fadeIn 2s", "width": "100%" })}">Data Game tidak ditemukan...</div></div>`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.activeItem === "MicroGaming") {
    _push(`<div>`);
    if ($options.filteredeMicroData.length > 0) {
      _push(`<div class="row"><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><input type="text"${ssrRenderAttr("value", $data.queryMicro)} placeholder="Cari games..." style="${ssrRenderStyle({ "color": "white !important" })}"></div><!--[-->`);
      ssrRenderList($options.filteredeMicroData, (microItem) => {
        _push(`<div class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft"><div class="portfolio-item"><a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank"><div class="thumb img-fluid">`);
        _push(ssrRenderComponent(_component_nuxt_img, {
          loading: "lazy",
          effect: "blur",
          alt: microItem.game_name,
          src: microItem.img_src,
          style: { "width": "100%", "height": "auto" }
        }, null, _parent));
        _push(`</div></a><div class="progress-rtp"><p class="rtp-style">RTP: ${ssrInterpolate(microItem.number)} %</p><div class="${ssrRenderClass(["bg-progress-rtp", microItem.number < 55 && "red" || microItem.number >= 55 && microItem.number <= 75 && "yellow" || microItem.number > 75 && "green"])}" style="${ssrRenderStyle({ width: `${microItem.number}%` })}"></div></div><div class="down-content"><span>${ssrInterpolate(microItem.game_name)}</span></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<div><div class="row"><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><input type="text"${ssrRenderAttr("value", $data.queryMicro)} placeholder="Cari games..." style="${ssrRenderStyle({ "color": "white !important" })}"></div><!--[-->`);
      ssrRenderList($options.filteredeMicroData, (microItem) => {
        _push(`<div class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft"><div class="portfolio-item"><a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank"><div class="thumb img-fluid">`);
        _push(ssrRenderComponent(_component_nuxt_img, {
          loading: "lazy",
          effect: "blur",
          alt: microItem.game_name,
          src: microItem.img_src,
          style: { "width": "100%", "height": "auto" }
        }, null, _parent));
        _push(`</div></a><div class="progress-rtp"><p class="rtp-style">RTP: ${ssrInterpolate(microItem.number)} %</p><div class="${ssrRenderClass(["bg-progress-rtp", microItem.number < 55 && "red" || microItem.number >= 55 && microItem.number <= 75 && "yellow" || microItem.number > 75 && "green"])}" style="${ssrRenderStyle({ width: `${microItem.number}%` })}"></div></div><div class="down-content"><span>${ssrInterpolate(microItem.game_name)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="text-center" style="${ssrRenderStyle({ "color": "white", "animation": "fadeIn 2s", "width": "100%" })}">Data Game tidak ditemukan...</div></div>`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.activeItem === "Habanero") {
    _push(`<div>`);
    if ($options.filteredHabaneroData.length > 0) {
      _push(`<div class="row"><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><input type="text"${ssrRenderAttr("value", $data.queryHabanero)} placeholder="Cari games..." style="${ssrRenderStyle({ "color": "white !important" })}"></div><!--[-->`);
      ssrRenderList($options.filteredHabaneroData, (itemHabanero) => {
        _push(`<div class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft"><div class="portfolio-item"><a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank"><div class="thumb img-fluid">`);
        _push(ssrRenderComponent(_component_nuxt_img, {
          loading: "lazy",
          effect: "blur",
          alt: itemHabanero.game_name,
          src: itemHabanero.img_src,
          style: { "width": "100%", "height": "auto" }
        }, null, _parent));
        _push(`</div></a><div class="progress-rtp"><p class="rtp-style">RTP: ${ssrInterpolate(itemHabanero.number)} %</p><div class="${ssrRenderClass(["bg-progress-rtp", itemHabanero.number < 55 && "red" || itemHabanero.number >= 55 && itemHabanero.number <= 75 && "yellow" || itemHabanero.number > 75 && "green"])}" style="${ssrRenderStyle({ width: `${itemHabanero.number}%` })}"></div></div><div class="down-content"><span>${ssrInterpolate(itemHabanero.game_name)}</span></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<div><div class="row"><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><input type="text"${ssrRenderAttr("value", $data.queryHabanero)} placeholder="Cari games..." style="${ssrRenderStyle({ "color": "white !important" })}"></div><!--[-->`);
      ssrRenderList($options.filteredHabaneroData, (itemHabanero) => {
        _push(`<div class="fugu-grid-item fugu-grid-item-w2 col-4 col-md-4 col-lg-2 wow fadeInUpX pgsoft"><div class="portfolio-item"><a href="https://urlshortenertool.com/RTP-RM" rel="noopener noreferrer nofollow" target="_blank"><div class="thumb img-fluid">`);
        _push(ssrRenderComponent(_component_nuxt_img, {
          loading: "lazy",
          effect: "blur",
          alt: itemHabanero.game_name,
          src: itemHabanero.img_src,
          style: { "width": "100%", "height": "auto" }
        }, null, _parent));
        _push(`</div></a><div class="progress-rtp"><p class="rtp-style">RTP: ${ssrInterpolate(itemHabanero.number)} %</p><div class="${ssrRenderClass(["bg-progress-rtp", itemHabanero.number < 55 && "red" || itemHabanero.number >= 55 && itemHabanero.number <= 75 && "yellow" || itemHabanero.number > 75 && "green"])}" style="${ssrRenderStyle({ width: `${itemHabanero.number}%` })}"></div></div><div class="down-content"><span>${ssrInterpolate(itemHabanero.game_name)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="text-center" style="${ssrRenderStyle({ "color": "white", "animation": "fadeIn 2s", "width": "100%" })}">Data Game tidak ditemukan...</div></div>`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><!--]-->`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Menu.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
function BodyLayout() {
  return createVNode(Fragment, null, [createVNode("div", {
    "id": "sectmobile",
    "class": "fugu--hero-section"
  }, [createVNode(BannerSlide, null, null), createVNode("div", {
    "class": "container"
  }, [createVNode("div", {
    "class": " container slick containerwd slick-initialized slick-slider",
    "id": "titleupdated"
  }, [createVNode("div", {
    "class": "slick-list draggable container"
  }, [createVNode("div", {
    "class": "marquee"
  }, [createVNode(Checkup, null, null)])])])]), createVNode("div", {
    "class": "container"
  }, [createVNode("div", {
    "class": "fugu--hero-shape1"
  }, [createVNode("svg", {
    "style": {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 0,
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: "1px"
    }
  }, [createVNode("filter", {
    "id": "sharpBlur"
  }, [createVNode("feGaussianBlur", {
    "stdDeviation": "20",
    "colorInterpolationFilters": "sRGB"
  }, null), createVNode("feColorMatrix", {
    "type": "matrix",
    "colorInterpolationFilters": "sRGB",
    "values": "1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"
  }, null), createVNode("feComposite", {
    "in2": "SourceGraphic",
    "operator": "in"
  }, null)])])]), createVNode("div", {
    "class": "fugu--hero-shape2"
  }, null)])]), createVNode("div", {
    "class": "section",
    "style": "background-color: #25013b"
  }, [createVNode(Menu, null, null)])]);
}
const _sfc_main$3 = {
  mounted() {
    (void 0).__lc = (void 0).__lc || {};
    (void 0).__lc.license = 15368679;
    function i(n) {
      return e._h ? e._h.apply(null, n) : e._q.push(n);
    }
    const e = {
      _q: [],
      _h: null,
      _v: "2.0",
      on() {
        i(["on", Array.prototype.slice.call(arguments)]);
      },
      once() {
        i(["once", Array.prototype.slice.call(arguments)]);
      },
      off() {
        i(["off", Array.prototype.slice.call(arguments)]);
      },
      get() {
        if (!e._h)
          throw new Error("[LiveChatWidget] You can't use getters before load.");
        return i(["get", Array.prototype.slice.call(arguments)]);
      },
      call() {
        i(["call", Array.prototype.slice.call(arguments)]);
      },
      init() {
        const n = (void 0).createElement("script");
        n.async = true;
        n.type = "text/javascript";
        n.src = "https://cdn.livechatinc.com/tracking.js";
        (void 0).head.appendChild(n);
      }
    };
    if (!(void 0).__lc.asyncInit) {
      e.init();
    }
    (void 0).LiveChatWidget = e;
    const liveChatLink = (void 0).querySelector(".livechat-container a");
    liveChatLink.addEventListener("click", (event) => {
      event.preventDefault();
    });
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "livechat-container" }, _attrs))}><a href="https://www.livechat.com/chat-with/15368679/" rel="nofollow"></a><a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank"></a></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Livechat.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
function FooterLayout() {
  return createVNode(Fragment, null, [createVNode("footer", {
    "className": "fugu--footer-section"
  }, [createVNode("div", {
    "className": "container"
  }, [createVNode(__nuxt_component_0, null, null), createVNode("div", {
    "className": "fugu--footer-bottom",
    "style": {
      color: "white"
    }
  }, [createTextVNode("© Copyright 2024 All Rights Reserved by RAJAMAHJONG")])])])]);
}
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_HeaderLayout = HeaderLayout;
  const _component_BodyLayout = BodyLayout;
  const _component_FooterLayout = FooterLayout;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_HeaderLayout, null, null, _parent));
  _push(ssrRenderComponent(_component_BodyLayout, null, null, _parent));
  _push(ssrRenderComponent(_component_FooterLayout, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import("./_nuxt/error-404-CUl5lVcb.js").then((r) => r.default || r));
    const _Error = defineAsyncComponent(() => import("./_nuxt/error-500-DcRjQ5N5.js").then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = _sfc_main$1;
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);
export {
  _export_sfc as _,
  useRuntimeConfig as a,
  useHead as b,
  entry$1 as default,
  navigateTo as n,
  useRouter as u
};
//# sourceMappingURL=server.mjs.map
