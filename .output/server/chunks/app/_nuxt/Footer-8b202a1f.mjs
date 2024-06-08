import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-afaf4e47.mjs';
import { ref, mergeProps, withCtx, createVNode, useSSRContext, defineComponent, createElementBlock } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main$1 = {
  __name: "Navbar",
  __ssrInlineRender: true,
  props: ["lr", "theme"],
  setup(__props) {
    const navbar = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        ref_key: "navbar",
        ref: navbar,
        class: ["navbar navbar-expand-lg change", __props.theme === "light" ? "light" : ""]
      }, _attrs))}><div class="container">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Marwan Maher Mostafa</span>`);
          } else {
            return [
              createVNode("span", null, "Marwan Maher Mostafa")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="icon-bar"><i class="fas fa-bars"></i></span></button><div class="collapse navbar-collapse" id="navbarSupportedContent"><ul class="navbar-nav ml-auto"><li class="nav-item"><a class="nav-link"> Home </a></li><li class="nav-item"><a class="nav-link"> About </a></li><li class="nav-item"><a class="nav-link"> Works </a></li><li class="nav-item"><a class="nav-link"> Contact </a></li></ul></div></div></nav>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/Navbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
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
const _imports_0 = "" + publicAssetsURL("img/blog/1.jpg");
const _imports_1 = "" + publicAssetsURL("img/blog/2.jpg");
const _imports_2 = "" + publicAssetsURL("img/logo-light.png");
const _sfc_main = {
  __name: "Footer",
  __ssrInlineRender: true,
  props: ["hideBGCOLOR"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({
        class: `${!__props.hideBGCOLOR ? "sub-bg" : ""}`
      }, _attrs))}><div class="container"><div class="row"><div class="col-lg-4"><div class="item md-mb50"><div class="title"><h5>Contact Us</h5></div><ul><li><span class="icon pe-7s-map-marker"></span><div class="cont"><h6>Officeal Address</h6><p>504 White St . Dawsonville, GA 30534 , New York</p></div></li><li><span class="icon pe-7s-mail"></span><div class="cont"><h6>Email Us</h6><p>support@gmail.com</p></div></li><li><span class="icon pe-7s-call"></span><div class="cont"><h6>Call Us</h6><p>+87986451666</p></div></li></ul></div></div><div class="col-lg-4"><div class="item md-mb50"><div class="title"><h5>Recent News</h5></div><ul><li><div class="img"><a href="#"><img${ssrRenderAttr("src", _imports_0)} alt=""></a></div><div class="sm-post"><a href="#"><p> The Start-Up Ultimate Guide to Make Your WordPress Journal. </p><span class="date">14 sep 2023</span></a></div></li><li><div class="img"><a href="#"><img${ssrRenderAttr("src", _imports_1)} alt=""></a></div><div class="sm-post"><a href="#"><p> The Start-Up Ultimate Guide to Make Your WordPress Journal. </p><span class="date">14 sep 2023</span></a></div></li><li><div class="subscribe"><input type="text" placeholder="Type Your Email"><span class="subs pe-7s-paper-plane"></span></div></li></ul></div></div><div class="col-lg-4"><div class="item"><div class="logo"><img${ssrRenderAttr("src", _imports_2)} alt="logo"></div><div class="social"><a href="#0"><i class="fab fa-facebook-f"></i></a><a href="#0"><i class="fab fa-twitter"></i></a><a href="#0"><i class="fab fa-instagram"></i></a><a href="#0"><i class="fab fa-youtube"></i></a></div><div class="copy-right"><p> \xA9 2023, Vie Template. Made with passion by <a href="#0">ThemesCamp</a>. </p></div></div></div></div></div></footer>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a, __nuxt_component_0 as b };
//# sourceMappingURL=Footer-8b202a1f.mjs.map
