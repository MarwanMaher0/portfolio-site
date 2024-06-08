import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { unref, useSSRContext, mergeProps, withCtx, createVNode, createTextVNode, ref } from 'vue';
import { u as useHead } from './index-88e9f29c.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _sfc_main$1$1, a as _sfc_main$6, b as __nuxt_component_0 } from './Footer-8b202a1f.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-afaf4e47.mjs';
import 'vue-bundle-renderer/runtime';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '../server.mjs';
import 'vue-router';

const _imports_0$1 = "" + publicAssetsURL("img/1711434167660.jpeg");
const _sfc_main$5 = {
  __name: "FreelanceHeader",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "freelancre valign" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-4"><div class="img"><img${ssrRenderAttr("src", _imports_0$1)} alt="Hero Image"></div></div><div class="col-lg-8 valign"><div class="cont"><h1 class="cd-headline clip"> Hello, I&#39;m Marwan, a passionate Vue.js developer with a flair for creating stunning and interactive web designs. I specialize in crafting <span class="cd-words-wrapper">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</span></h1></div></div></div><div class="states"><div class="container"><ul class="flex"><li class="flex"><div class="numb valign"><h3>2</h3></div><div class="text valign"><p> Years <br> Of Experience </p></div></li><li class="flex"><div class="numb valign"><h3>10</h3></div><div class="text valign"><p> Projects Completed </p></div></li><li class="mail-us"><a href="mailto:marwanmaher635@Gmail.Com?subject=Get in Touch"><div class="flex"><div class="text valign"><div class="full-width"><p>Get In Touch</p><h6>Marwanmaher635@Gmail.Com</h6></div></div><div class="mail-icon"><div class="icon-box"><span class="icon color-font pe-7s-mail"></span></div></div></div></a></li></ul></div></div></div><div class="line bottom left"></div></header>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Headers/FreelanceHeader.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const featuresData = [
  {
    id: 1,
    icon: "pe-7s-gleam",
    title: "Vue.js Development",
    content: "Building dynamic and responsive web applications using Vue.js."
  },
  {
    id: 2,
    icon: "pe-7s-phone",
    title: "Responsive Design",
    content: "Crafting mobile-first designs that provide a seamless user experience across all devices."
  },
  {
    id: 3,
    icon: "pe-7s-graph1",
    title: "API Integration",
    content: "Integrating RESTful APIs to enhance the functionality of web applications."
  },
  {
    id: 4,
    icon: "pe-7s-paint-bucket",
    title: "UI/UX Design",
    content: "Designing intuitive and visually appealing user interfaces."
  }
];
const _sfc_main$4 = {
  __name: "Services5",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "services box lficon section-padding position-re" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-8 col-md-10"><div class="sec-head text-center"><h6 class="wow fadeIn" data-wow-delay=".5s">Best Features</h6><h3 class="wow color-font"> We are a new digital product development agency </h3></div></div></div><div class="row"><!--[-->`);
      ssrRenderList(unref(featuresData), (item, index) => {
        _push(`<div class="col-lg-6 wow fadeInLeft"${ssrRenderAttr(
          "data-wow-delay",
          index == 0 ? ".5s" : index == 1 ? ".7s" : index === 2 ? ".9s" : ".5s"
        )}><div class="item-box no-curve"><div><span class="${ssrRenderClass(`icon color-font ${item.icon}`)}"></span></div><div class="cont"><h6>${ssrInterpolate(item.title)}</h6><p>${ssrInterpolate(item.content)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="line bottom right"></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Services/Services5.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _imports_0 = "" + publicAssetsURL("img/portfolio/freelancer/1.jpg");
const _imports_1 = "" + publicAssetsURL("img/portfolio/freelancer/2.jpg");
const _imports_2 = "" + publicAssetsURL("img/portfolio/freelancer/3.jpg");
const _imports_3 = "" + publicAssetsURL("img/portfolio/freelancer/4.jpg");
const _imports_4 = "" + publicAssetsURL("img/portfolio/freelancer/5.jpg");
const _imports_5 = "" + publicAssetsURL("img/portfolio/freelancer/6.jpg");
const _sfc_main$3 = {
  __name: "Works5",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "portfolio-frl section-padding pb-70" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-8 col-md-10"><div class="sec-head text-center"><h6 class="wow fadeIn" data-wow-delay=".5s">Portfolio</h6><h3 class="wow color-font"> Our Recent Web Design &amp; <br> Some Past Projects. </h3></div></div></div></div><div class="container"><div class="row"><div class="filtering col-12"><div class="filter wow fadeIn" data-wow-delay=".5s"><span data-filter="*" class="active"> All </span><span data-filter=".NuxtJs">NuxtJs</span><span data-filter=".VueJs">Vue.Js</span><span data-filter=".HTML">HTML</span></div></div><div class="gallery full-width"><div class="col-md-6 items NuxtJs graphic lg-mr wow fadeInUp" data-wow-delay=".4s"><div class="item-img"><div class="cont"><h6>Jironis</h6><p>Vue - Nuxt App Landing Page</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "rota",
        to: "/project-details2/project-details2-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="image"${_scopeId}><div class="item-img-overlay"${_scopeId}></div>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "image"
              }),
              createVNode("div", { class: "item-img-overlay" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="tags"><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`App`);
          } else {
            return [
              createTextVNode("App")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Fitnes`);
          } else {
            return [
              createTextVNode("Fitnes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Creative`);
          } else {
            return [
              createTextVNode("Creative")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></div></div><div class="col-md-6 items NuxtJs web wow fadeInUp" data-wow-delay=".4s"><div class="item-img"><div class="cont"><h6>Bonx</h6><p>Vue - Nuxt Gaming Website </p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "rota",
        to: "/project-details2/project-details2-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_1)} alt="image"${_scopeId}><div class="item-img-overlay"${_scopeId}></div>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_1,
                alt: "image"
              }),
              createVNode("div", { class: "item-img-overlay" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="tags"><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`App`);
          } else {
            return [
              createTextVNode("App")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Fitnes`);
          } else {
            return [
              createTextVNode("Fitnes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Creative`);
          } else {
            return [
              createTextVNode("Creative")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></div></div><div class="col-md-6 items VueJs web wow fadeInUp" data-wow-delay=".4s"><div class="item-img"><div class="cont"><h6>Educal Courses</h6><p>Vue- Online Course &amp; Education Vue js</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "rota",
        to: "/project-details2/project-details2-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_2)} alt="image"${_scopeId}><div class="item-img-overlay"${_scopeId}></div>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_2,
                alt: "image"
              }),
              createVNode("div", { class: "item-img-overlay" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="tags"><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`App`);
          } else {
            return [
              createTextVNode("App")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Fitnes`);
          } else {
            return [
              createTextVNode("Fitnes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Creative`);
          } else {
            return [
              createTextVNode("Creative")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></div></div><div class="col-md-6 items HTML web graphic wow fadeInUp" data-wow-delay=".4s"><div class="item-img"><div class="cont"><h6>eCommerce Furniture</h6><p>HTML - Furniture Website</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "rota",
        to: "/project-details2/project-details2-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_3)} alt="image"${_scopeId}><div class="item-img-overlay"${_scopeId}></div>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_3,
                alt: "image"
              }),
              createVNode("div", { class: "item-img-overlay" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="tags"><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`App`);
          } else {
            return [
              createTextVNode("App")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Fitnes`);
          } else {
            return [
              createTextVNode("Fitnes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Creative`);
          } else {
            return [
              createTextVNode("Creative")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></div></div><div class="col-md-6 items VueJs brand wow fadeInUp" data-wow-delay=".4s"><div class="item-img"><div class="cont"><h6>Resilience Scale For Schools </h6><p>Vue - website to assist engineers in meeting design standards</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "rota",
        to: "/project-details2/project-details2-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_4)} alt="image"${_scopeId}><div class="item-img-overlay"${_scopeId}></div>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_4,
                alt: "image"
              }),
              createVNode("div", { class: "item-img-overlay" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="tags"><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`App`);
          } else {
            return [
              createTextVNode("App")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Fitnes`);
          } else {
            return [
              createTextVNode("Fitnes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Creative`);
          } else {
            return [
              createTextVNode("Creative")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></div></div><div class="col-md-6 items HTML brand wow fadeInUp" data-wow-delay=".4s"><div class="item-img"><div class="cont"><h6>Massively</h6><p>HTML - First style I train on</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "rota",
        to: "/project-details2/project-details2-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_5)} alt="image"${_scopeId}><div class="item-img-overlay"${_scopeId}></div>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_5,
                alt: "image"
              }),
              createVNode("div", { class: "item-img-overlay" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="tags"><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`App`);
          } else {
            return [
              createTextVNode("App")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Fitnes`);
          } else {
            return [
              createTextVNode("Fitnes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "#0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Creative`);
          } else {
            return [
              createTextVNode("Creative")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Works/Works5.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const id = 1;
const image1 = "/img/intro/1.jpg";
const image2 = "/img/intro/3.jpg";
const image3 = "/img/intro/2.jpg";
const smallTitle = "About Me";
const title = {
  first: "Crafting Excellence",
  second: "with Vue.js"
};
const content = "Hello! I'm Marwan, a passionate Front End Developer specializing in Vue.js. I thrive on transforming innovative designs into fully functional, responsive web applications. With a keen eye for detail and a commitment to quality, I aim to deliver exceptional user experiences. Let's create something amazing together.";
const features = [
  {
    id: 1,
    icon: "monitor ",
    name: {
      first: "Clean",
      second: "Code"
    },
    wowDelay: ".3s"
  },
  {
    id: 2,
    icon: "paint-bucket",
    name: {
      first: "Creative",
      second: "Design"
    },
    wowDelay: ".5s"
  },
  {
    id: 3,
    icon: "graph1",
    name: {
      first: "High",
      second: "Performance"
    },
    wowDelay: ".8s"
  }
];
const AboutUs2Data = {
  id,
  image1,
  image2,
  image3,
  smallTitle,
  title,
  content,
  features
};
const _sfc_main$2 = {
  __name: "AboutUs2",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about section-padding" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-5"><div class="img-mons sm-mb30"><div class="row"><div class="col-md-5 cmd-padding valign"><div class="img1 wow imago" data-wow-delay=".5s"><img${ssrRenderAttr("src", unref(AboutUs2Data).image1)} alt=""></div></div><div class="col-md-7 cmd-padding"><div class="img2 wow imago" data-wow-delay=".3s"><img${ssrRenderAttr("src", unref(AboutUs2Data).image2)} alt=""></div><div class="img3 wow imago" data-wow-delay=".8s"><img${ssrRenderAttr("src", unref(AboutUs2Data).image3)} alt=""></div></div></div></div></div><div class="col-lg-6 offset-lg-1 valign"><div class="content"><div class="sub-title"><h6>${ssrInterpolate(unref(AboutUs2Data).smallTitle)}</h6></div><h3 class="words chars splitting main-title wow" data-splitting>${ssrInterpolate(unref(AboutUs2Data).title.first)} <br> ${ssrInterpolate(unref(AboutUs2Data).title.second)}</h3><p class="words chars splitting wow txt" data-splitting>${ssrInterpolate(unref(AboutUs2Data).content)}</p><div class="ftbox mt-30"><ul><!--[-->`);
      ssrRenderList(unref(AboutUs2Data).features, (feature) => {
        _push(`<li class="${ssrRenderClass(`wow fadeIn ${feature.id == 2 ? "space" : ""}`)}"${ssrRenderAttr("data-wow-delay", feature.wowDelay)}><span class="${ssrRenderClass(`icon color-font pe-7s-${feature.icon}`)}"></span><h6>${ssrInterpolate(feature.name.first)} <br> ${ssrInterpolate(feature.name.second)}</h6><div class="dots"><span></span><span></span><span></span></div></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AboutUs/AboutUs2.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ContactFormS",
  __ssrInlineRender: true,
  props: ["noLine"],
  setup(__props) {
    const form = ref({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "contact-sec section-padding position-re" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-8 col-md-10"><div class="sec-head text-center"><h6 class="wow fadeIn" data-wow-delay=".5s">Contact Us</h6><h3 class="wow color-font"> Let&#39;s Get in Touch And Make Magic Together. </h3></div></div></div><div class="row justify-content-center"><div class="col-lg-10"><div class="form wow fadeInUp" data-wow-delay=".5s"><form id="contact-form" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field"><div class="messages"></div><div class="controls"><div class="row"><div class="col-lg-4"><div class="form-group"><input${ssrRenderAttr("value", form.value.name)} type="text" name="name" placeholder="Name" required="required"></div></div><div class="col-lg-4"><div class="form-group"><input${ssrRenderAttr("value", form.value.email)} type="email" name="email" placeholder="Email" required="required"></div></div><div class="col-lg-4"><div class="form-group"><input${ssrRenderAttr("value", form.value.subject)} type="text" name="subject" placeholder="Subject" required="required"></div></div><div class="col-12"><div class="form-group"><textarea name="message" placeholder="Message" rows="4" required="required">${ssrInterpolate(form.value.message)}</textarea></div></div><div class="col-12"><div class="text-center"><button type="submit" class="butn bord curve mt-30"><span>Send Message</span></button></div></div></div><div style="${ssrRenderStyle({ "display": "none" })}"><label>Don\u2019t fill this out if you&#39;re human: <input name="bot-field"></label></div></div></form></div></div></div></div>`);
      if (!__props.noLine) {
        _push(`<div class="line bottom left"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contact/ContactFormS.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `Marwan Maher Mostafa`
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(_sfc_main$1$1), { theme: "light" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), { id: "Home" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), { id: "About" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), { id: "Works" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        noLine: "",
        id: "Contact"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-2a98e781.mjs.map
