import { useSSRContext, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, ref, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './nuxt-link-afaf4e47.mjs';
import { b as __nuxt_component_0$2 } from './Footer-8b202a1f.mjs';
import { _ as _export_sfc } from '../server.mjs';

const _sfc_main$7 = {
  __name: "Loading",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "showX" }, _attrs))}><div class="loading"><span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span></div><div id="preloader"></div></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/Loading.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$7;
const _sfc_main$6 = {
  __name: "ProjectDetails2Header",
  __ssrInlineRender: true,
  props: ["projectHeaderData"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "page-header proj-det bg-img parallaxie valign",
        style: `background-image: url(${__props.projectHeaderData.projectHeaderImage})`,
        "data-overlay-dark": "4"
      }, _attrs))}><div class="container"><div class="row"><div class="col-lg-7 col-md-9"><div class="cont"><h6>${ssrInterpolate(__props.projectHeaderData.title.small)}</h6><h2>${ssrInterpolate(__props.projectHeaderData.title.big)}</h2></div></div></div><div class="row"><div class="col-lg-3"><div class="item mt-30"><h6>Client</h6><p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: __props.projectHeaderData.clientURLLink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.projectHeaderData.clientURLName)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.projectHeaderData.clientURLName), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div><div class="col-lg-3"><div class="item mt-30"><h6>Date</h6><p>${ssrInterpolate(__props.projectHeaderData.date)}</p></div></div><div class="col-lg-3"><div class="item mt-30"><h6>Categories</h6><p><!--[-->`);
      ssrRenderList(__props.projectHeaderData.categories, (cat, index) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: cat.link,
          key: cat.id
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(cat.name)} ${ssrInterpolate(__props.projectHeaderData.categories.length != index + 1 ? " ," : "")}`);
            } else {
              return [
                createTextVNode(toDisplayString(cat.name) + " " + toDisplayString(__props.projectHeaderData.categories.length != index + 1 ? " ," : ""), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></p></div></div><div class="col-lg-3"><div class="item mt-30"><h6>Tags</h6><p><!--[-->`);
      ssrRenderList(__props.projectHeaderData.tags, (tag, index) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "tag.link",
          key: tag.id
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(tag.name)} ${ssrInterpolate(__props.projectHeaderData.tags.length != index + 1 ? " ," : "")}`);
            } else {
              return [
                createTextVNode(toDisplayString(tag.name) + " " + toDisplayString(__props.projectHeaderData.tags.length != index + 1 ? " ," : ""), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></p></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/ProjectDetails2Header.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "ProjectIntroduction",
  __ssrInlineRender: true,
  props: ["projectIntroductionData"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "intro-section section-padding" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-3 col-md-4"><div class="htit"><h4><span>01 </span> Introduction</h4></div></div><div class="col-lg-8 offset-lg-1 col-md-8"><div class="text js-scroll__content"><p class="extra-text">${ssrInterpolate(__props.projectIntroductionData.content)}</p><ul class="smp-list mt-30"><!--[-->`);
      ssrRenderList(__props.projectIntroductionData.spmList, (item) => {
        _push(`<li>${ssrInterpolate(item.name)}</li>`);
      });
      _push(`<!--]--></ul></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/ProjectIntroduction.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "ProjectGallery",
  __ssrInlineRender: true,
  props: ["projectGalleryData"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "projdtal" }, _attrs))}><div class="popup-img"><div class="row"><!--[-->`);
      ssrRenderList(__props.projectGalleryData, (imageLink, index) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "#0",
          key: index,
          class: `col-md-${index + 1 === __props.projectGalleryData.length ? "12" : "3"} popimg`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img alt=""${ssrRenderAttr("src", imageLink)}${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  alt: "",
                  src: imageLink
                }, null, 8, ["src"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/ProjectGallery.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "ProjectDescription",
  __ssrInlineRender: true,
  props: ["projectDescriptionData"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "intro-section section-padding" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-3 col-md-4"><div class="htit"><h4><span>02 </span> Description</h4></div></div><div class="col-lg-8 offset-lg-1 col-md-8"><div class="text js-scroll__content"><p class="extra-text">${ssrInterpolate(__props.projectDescriptionData.content)}</p></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/ProjectDescription.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "ModalVideo",
  __ssrInlineRender: true,
  props: ["videoId", "channel", "isOpen", "onClose", "autoplay"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$2;
      if (__props.isOpen) {
        _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/ModalVideo.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ModalVideo = _sfc_main$2;
const videoChannel = "vimeo";
const videoId = "127203262";
const _sfc_main$1 = {
  __name: "ProjectVideo",
  __ssrInlineRender: true,
  props: ["projectVideoData"],
  setup(__props) {
    const videoIsOpen = ref(false);
    function onClose() {
      videoIsOpen.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><div class="container-fluid"><div class="video-wrapper section-padding bg-img parallaxie valign" style="${ssrRenderStyle(`
            background-image: url(${__props.projectVideoData.projectHeaderImage})`)}" data-overlay-dark="4"><div class="full-width text-center">`);
      _push(ssrRenderComponent(ModalVideo, {
        channel: videoChannel,
        videoId,
        isOpen: unref(videoIsOpen),
        onClose
      }, null, _parent));
      _push(`<a href="#" class="vid"><div class="vid-butn"><span class="icon"><i class="fas fa-play"></i></span></div></a></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/ProjectVideo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "next-prog section-padding" }, _attrs))}><div class="container"><div class="row"><div class="col-12"><div class="box"><div class="bg-img valign" style="${ssrRenderStyle({ "background-image": "url('/img/portfolio/project2/6.jpg')" })}" data-overlay-dark="4"><div class="caption ontop valign"><div class="o-hidden full-width"><h1>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="stroke"${_scopeId}>Natural plus modern.</div>`);
      } else {
        return [
          createVNode("div", { class: "stroke" }, "Natural plus modern.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</h1></div></div><div class="copy-cap valign"><div class="cap full-width"><h1>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span${_scopeId}>Natural plus modern.</span>`);
      } else {
        return [
          createVNode("span", null, "Natural plus modern.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</h1></div></div></div></div></div></div></div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/NextProject.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NextProject = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const id = 1;
const title = {
  small: "art & illustration",
  big: "Inspiring new space."
};
const clientURLLink = "#";
const projectHeaderImage = "/img/portfolio/project2/bg.jpg";
const videoLink = "https://vimeo.com/127203262";
const clientURLName = "Envato.com";
const date = "6 August 2023";
const categories = [
  {
    id: 1,
    name: "Web Design",
    link: "#"
  },
  {
    id: 2,
    name: "WordPress",
    link: "#"
  }
];
const tags = [
  {
    id: 1,
    name: "Minimal",
    link: "#"
  },
  {
    id: 2,
    name: "Modern",
    link: "#"
  },
  {
    id: 3,
    name: "Design",
    link: "#"
  }
];
const intro = {
  content: "We are a Creative Agency & Startup Studio that provides Digital Products and Services turns to focus on client success. We specialize in user interface design, including front-end development which we consider to be an integral part.",
  spmList: [
    {
      id: 1,
      name: "Aenean sollicitudin"
    },
    {
      id: 2,
      name: "lorem quis bibendum auctor"
    },
    {
      id: 31,
      name: "nisi elit conseq uat ipsum"
    },
    {
      id: 4,
      name: "nec sagittis sem nibh id elit"
    }
  ]
};
const gallery = [
  "/img/portfolio/project2/1.jpg",
  "/img/portfolio/project2/2.jpg",
  "/img/portfolio/project2/3.jpg",
  "/img/portfolio/project2/5.jpg",
  "/img/portfolio/project2/7.jpg"
];
const description = {
  content: "We are a Creative Agency & Startup Studio that provides Digital Products and Services turns to focus on client success. We specialize in user interface design, including front-end development which we consider to be an integral part."
};
const ProjectDate = {
  id,
  title,
  clientURLLink,
  projectHeaderImage,
  videoLink,
  clientURLName,
  date,
  categories,
  tags,
  intro,
  gallery,
  description
};

export { NextProject as N, ProjectDate as P, _sfc_main$6 as _, _sfc_main$5 as a, _sfc_main$4 as b, _sfc_main$3 as c, _sfc_main$1 as d, __nuxt_component_0 as e };
//# sourceMappingURL=project-details2-48ff68d2.mjs.map
