import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './ScrollToTop-a160cca4.mjs';
import { useSSRContext } from 'vue';
import { u as useHead } from './index-88e9f29c.mjs';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import 'unhead';
import '@unhead/shared';

const _sfc_main = {
  __name: "arch-light",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      link: [
        { rel: "stylesheet", href: "/assets/css/light.css" },
        { rel: "stylesheet", href: "/assets/css/arch-skin-light.css" },
        { rel: "stylesheet", href: "/assets/css/globals.css" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonMouseCursor = __nuxt_component_0;
      const _component_CommonScrollToTop = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonMouseCursor, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonScrollToTop, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/arch-light.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=arch-light-18d5e528.mjs.map
