/*!
 * sweetalert2 v11.7.15
 * Released under the MIT License.
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e =
        "undefined" != typeof globalThis ? globalThis : e || self).Sweetalert2 =
        t());
})(this, function () {
  "use strict";
  const e = {},
    t = (t) =>
      new Promise((o) => {
        if (!t) return o();
        const n = window.scrollX,
          i = window.scrollY;
        (e.restoreFocusTimeout = setTimeout(() => {
          e.previousActiveElement instanceof HTMLElement
            ? (e.previousActiveElement.focus(),
              (e.previousActiveElement = null))
            : document.body && document.body.focus(),
            o();
        }, 100)),
          window.scrollTo(n, i);
      });
  var o = {
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap(),
  };
  const n = "swal2-",
    i = [
      "container",
      "shown",
      "height-auto",
      "iosfix",
      "popup",
      "modal",
      "no-backdrop",
      "no-transition",
      "toast",
      "toast-shown",
      "show",
      "hide",
      "close",
      "title",
      "html-container",
      "actions",
      "confirm",
      "deny",
      "cancel",
      "default-outline",
      "footer",
      "icon",
      "icon-content",
      "image",
      "input",
      "file",
      "range",
      "select",
      "radio",
      "checkbox",
      "label",
      "textarea",
      "inputerror",
      "input-label",
      "validation-message",
      "progress-steps",
      "active-progress-step",
      "progress-step",
      "progress-step-line",
      "loader",
      "loading",
      "styled",
      "top",
      "top-start",
      "top-end",
      "top-left",
      "top-right",
      "center",
      "center-start",
      "center-end",
      "center-left",
      "center-right",
      "bottom",
      "bottom-start",
      "bottom-end",
      "bottom-left",
      "bottom-right",
      "grow-row",
      "grow-column",
      "grow-fullscreen",
      "rtl",
      "timer-progress-bar",
      "timer-progress-bar-container",
      "scrollbar-measure",
      "icon-success",
      "icon-warning",
      "icon-info",
      "icon-question",
      "icon-error",
    ].reduce((e, t) => ((e[t] = n + t), e), {}),
    s = ["success", "warning", "info", "question", "error"].reduce(
      (e, t) => ((e[t] = n + t), e),
      {}
    ),
    r = "SweetAlert2:",
    a = (e) => e.charAt(0).toUpperCase() + e.slice(1),
    l = (e) => {
      console.warn(`${r} ${"object" == typeof e ? e.join(" ") : e}`);
    },
    c = (e) => {
      console.error(`${r} ${e}`);
    },
    u = [],
    d = (e, t) => {
      var o;
      (o = `"${e}" is deprecated and will be removed in the next major release. Please use "${t}" instead.`),
        u.includes(o) || (u.push(o), l(o));
    },
    p = (e) => ("function" == typeof e ? e() : e),
    m = (e) => e && "function" == typeof e.toPromise,
    g = (e) => (m(e) ? e.toPromise() : Promise.resolve(e)),
    h = (e) => e && Promise.resolve(e) === e,
    f = () => document.body.querySelector(`.${i.container}`),
    b = (e) => {
      const t = f();
      return t ? t.querySelector(e) : null;
    },
    y = (e) => b(`.${e}`),
    w = () => y(i.popup),
    v = () => y(i.icon),
    C = () => y(i.title),
    A = () => y(i["html-container"]),
    k = () => y(i.image),
    B = () => y(i["progress-steps"]),
    P = () => y(i["validation-message"]),
    $ = () => b(`.${i.actions} .${i.confirm}`),
    E = () => b(`.${i.actions} .${i.cancel}`),
    x = () => b(`.${i.actions} .${i.deny}`),
    T = () => b(`.${i.loader}`),
    L = () => y(i.actions),
    S = () => y(i.footer),
    O = () => y(i["timer-progress-bar"]),
    M = () => y(i.close),
    j = () => {
      const e = w();
      if (!e) return [];
      const t = e.querySelectorAll(
          '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
        ),
        o = Array.from(t).sort((e, t) => {
          const o = parseInt(e.getAttribute("tabindex") || "0"),
            n = parseInt(t.getAttribute("tabindex") || "0");
          return o > n ? 1 : o < n ? -1 : 0;
        }),
        n = e.querySelectorAll(
          '\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n'
        ),
        i = Array.from(n).filter((e) => "-1" !== e.getAttribute("tabindex"));
      return [...new Set(o.concat(i))].filter((e) => X(e));
    },
    I = () =>
      q(document.body, i.shown) &&
      !q(document.body, i["toast-shown"]) &&
      !q(document.body, i["no-backdrop"]),
    H = () => {
      const e = w();
      return !!e && q(e, i.toast);
    },
    D = (e, t) => {
      if (((e.textContent = ""), t)) {
        const o = new DOMParser().parseFromString(t, "text/html");
        Array.from(o.querySelector("head").childNodes).forEach((t) => {
          e.appendChild(t);
        }),
          Array.from(o.querySelector("body").childNodes).forEach((t) => {
            t instanceof HTMLVideoElement || t instanceof HTMLAudioElement
              ? e.appendChild(t.cloneNode(!0))
              : e.appendChild(t);
          });
      }
    },
    q = (e, t) => {
      if (!t) return !1;
      const o = t.split(/\s+/);
      for (let t = 0; t < o.length; t++)
        if (!e.classList.contains(o[t])) return !1;
      return !0;
    },
    V = (e, t, o) => {
      if (
        (((e, t) => {
          Array.from(e.classList).forEach((o) => {
            Object.values(i).includes(o) ||
              Object.values(s).includes(o) ||
              Object.values(t.showClass).includes(o) ||
              e.classList.remove(o);
          });
        })(e, t),
        t.customClass && t.customClass[o])
      ) {
        if ("string" != typeof t.customClass[o] && !t.customClass[o].forEach)
          return void l(
            `Invalid type of customClass.${o}! Expected string or iterable object, got "${typeof t
              .customClass[o]}"`
          );
        R(e, t.customClass[o]);
      }
    },
    N = (e, t) => {
      if (!t) return null;
      switch (t) {
        case "select":
        case "textarea":
        case "file":
          return e.querySelector(`.${i.popup} > .${i[t]}`);
        case "checkbox":
          return e.querySelector(`.${i.popup} > .${i.checkbox} input`);
        case "radio":
          return (
            e.querySelector(`.${i.popup} > .${i.radio} input:checked`) ||
            e.querySelector(`.${i.popup} > .${i.radio} input:first-child`)
          );
        case "range":
          return e.querySelector(`.${i.popup} > .${i.range} input`);
        default:
          return e.querySelector(`.${i.popup} > .${i.input}`);
      }
    },
    F = (e) => {
      if ((e.focus(), "file" !== e.type)) {
        const t = e.value;
        (e.value = ""), (e.value = t);
      }
    },
    _ = (e, t, o) => {
      e &&
        t &&
        ("string" == typeof t && (t = t.split(/\s+/).filter(Boolean)),
        t.forEach((t) => {
          Array.isArray(e)
            ? e.forEach((e) => {
                o ? e.classList.add(t) : e.classList.remove(t);
              })
            : o
            ? e.classList.add(t)
            : e.classList.remove(t);
        }));
    },
    R = (e, t) => {
      _(e, t, !0);
    },
    U = (e, t) => {
      _(e, t, !1);
    },
    z = (e, t) => {
      const o = Array.from(e.children);
      for (let e = 0; e < o.length; e++) {
        const n = o[e];
        if (n instanceof HTMLElement && q(n, t)) return n;
      }
    },
    W = (e, t, o) => {
      o === `${parseInt(o)}` && (o = parseInt(o)),
        o || 0 === parseInt(o)
          ? (e.style[t] = "number" == typeof o ? `${o}px` : o)
          : e.style.removeProperty(t);
    },
    K = function (e) {
      let t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "flex";
      e && (e.style.display = t);
    },
    Y = (e) => {
      e && (e.style.display = "none");
    },
    Z = (e, t, o, n) => {
      const i = e.querySelector(t);
      i && (i.style[o] = n);
    },
    J = function (e, t) {
      t
        ? K(
            e,
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "flex"
          )
        : Y(e);
    },
    X = (e) =>
      !(!e || !(e.offsetWidth || e.offsetHeight || e.getClientRects().length)),
    G = (e) => !!(e.scrollHeight > e.clientHeight),
    Q = (e) => {
      const t = window.getComputedStyle(e),
        o = parseFloat(t.getPropertyValue("animation-duration") || "0"),
        n = parseFloat(t.getPropertyValue("transition-duration") || "0");
      return o > 0 || n > 0;
    },
    ee = function (e) {
      let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      const o = O();
      X(o) &&
        (t && ((o.style.transition = "none"), (o.style.width = "100%")),
        setTimeout(() => {
          (o.style.transition = `width ${e / 1e3}s linear`),
            (o.style.width = "0%");
        }, 10));
    },
    te = () => "undefined" == typeof window || "undefined" == typeof document,
    oe =
      `\n <div aria-labelledby="${i.title}" aria-describedby="${i["html-container"]}" class="${i.popup}" tabindex="-1">\n   <button type="button" class="${i.close}"></button>\n   <ul class="${i["progress-steps"]}"></ul>\n   <div class="${i.icon}"></div>\n   <img class="${i.image}" />\n   <h2 class="${i.title}" id="${i.title}"></h2>\n   <div class="${i["html-container"]}" id="${i["html-container"]}"></div>\n   <input class="${i.input}" id="${i.input}" />\n   <input type="file" class="${i.file}" />\n   <div class="${i.range}">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="${i.select}" id="${i.select}"></select>\n   <div class="${i.radio}"></div>\n   <label class="${i.checkbox}">\n     <input type="checkbox" id="${i.checkbox}" />\n     <span class="${i.label}"></span>\n   </label>\n   <textarea class="${i.textarea}" id="${i.textarea}"></textarea>\n   <div class="${i["validation-message"]}" id="${i["validation-message"]}"></div>\n   <div class="${i.actions}">\n     <div class="${i.loader}"></div>\n     <button type="button" class="${i.confirm}"></button>\n     <button type="button" class="${i.deny}"></button>\n     <button type="button" class="${i.cancel}"></button>\n   </div>\n   <div class="${i.footer}"></div>\n   <div class="${i["timer-progress-bar-container"]}">\n     <div class="${i["timer-progress-bar"]}"></div>\n   </div>\n </div>\n`.replace(
        /(^|\n)\s*/g,
        ""
      ),
    ne = () => {
      e.currentInstance.resetValidationMessage();
    },
    ie = (e) => {
      const t = (() => {
        const e = f();
        return (
          !!e &&
          (e.remove(),
          U(
            [document.documentElement, document.body],
            [i["no-backdrop"], i["toast-shown"], i["has-column"]]
          ),
          !0)
        );
      })();
      if (te()) return void c("SweetAlert2 requires document to initialize");
      const o = document.createElement("div");
      (o.className = i.container), t && R(o, i["no-transition"]), D(o, oe);
      const n =
        "string" == typeof (s = e.target) ? document.querySelector(s) : s;
      var s;
      n.appendChild(o),
        ((e) => {
          const t = w();
          t.setAttribute("role", e.toast ? "alert" : "dialog"),
            t.setAttribute("aria-live", e.toast ? "polite" : "assertive"),
            e.toast || t.setAttribute("aria-modal", "true");
        })(e),
        ((e) => {
          "rtl" === window.getComputedStyle(e).direction && R(f(), i.rtl);
        })(n),
        (() => {
          const e = w(),
            t = z(e, i.input),
            o = z(e, i.file),
            n = e.querySelector(`.${i.range} input`),
            s = e.querySelector(`.${i.range} output`),
            r = z(e, i.select),
            a = e.querySelector(`.${i.checkbox} input`),
            l = z(e, i.textarea);
          (t.oninput = ne),
            (o.onchange = ne),
            (r.onchange = ne),
            (a.onchange = ne),
            (l.oninput = ne),
            (n.oninput = () => {
              ne(), (s.value = n.value);
            }),
            (n.onchange = () => {
              ne(), (s.value = n.value);
            });
        })();
    },
    se = (e, t) => {
      e instanceof HTMLElement
        ? t.appendChild(e)
        : "object" == typeof e
        ? re(e, t)
        : e && D(t, e);
    },
    re = (e, t) => {
      e.jquery ? ae(t, e) : D(t, e.toString());
    },
    ae = (e, t) => {
      if (((e.textContent = ""), 0 in t))
        for (let o = 0; o in t; o++) e.appendChild(t[o].cloneNode(!0));
      else e.appendChild(t.cloneNode(!0));
    },
    le = (() => {
      if (te()) return !1;
      const e = document.createElement("div"),
        t = {
          WebkitAnimation: "webkitAnimationEnd",
          animation: "animationend",
        };
      for (const o in t)
        if (Object.prototype.hasOwnProperty.call(t, o) && void 0 !== e.style[o])
          return t[o];
      return !1;
    })(),
    ce = (e, t) => {
      const o = L(),
        n = T();
      o &&
        n &&
        (t.showConfirmButton || t.showDenyButton || t.showCancelButton
          ? K(o)
          : Y(o),
        V(o, t, "actions"),
        (function (e, t, o) {
          const n = $(),
            s = x(),
            r = E();
          if (!n || !s || !r) return;
          ue(n, "confirm", o),
            ue(s, "deny", o),
            ue(r, "cancel", o),
            (function (e, t, o, n) {
              if (!n.buttonsStyling) return void U([e, t, o], i.styled);
              R([e, t, o], i.styled),
                n.confirmButtonColor &&
                  ((e.style.backgroundColor = n.confirmButtonColor),
                  R(e, i["default-outline"]));
              n.denyButtonColor &&
                ((t.style.backgroundColor = n.denyButtonColor),
                R(t, i["default-outline"]));
              n.cancelButtonColor &&
                ((o.style.backgroundColor = n.cancelButtonColor),
                R(o, i["default-outline"]));
            })(n, s, r, o),
            o.reverseButtons &&
              (o.toast
                ? (e.insertBefore(r, n), e.insertBefore(s, n))
                : (e.insertBefore(r, t),
                  e.insertBefore(s, t),
                  e.insertBefore(n, t)));
        })(o, n, t),
        D(n, t.loaderHtml || ""),
        V(n, t, "loader"));
    };
  function ue(e, t, o) {
    const n = a(t);
    J(e, o[`show${n}Button`], "inline-block"),
      D(e, o[`${t}ButtonText`] || ""),
      e.setAttribute("aria-label", o[`${t}ButtonAriaLabel`] || ""),
      (e.className = i[t]),
      V(e, o, `${t}Button`);
  }
  const de = (e, t) => {
    const o = f();
    o &&
      (!(function (e, t) {
        "string" == typeof t
          ? (e.style.background = t)
          : t || R([document.documentElement, document.body], i["no-backdrop"]);
      })(o, t.backdrop),
      (function (e, t) {
        if (!t) return;
        t in i
          ? R(e, i[t])
          : (l('The "position" parameter is not valid, defaulting to "center"'),
            R(e, i.center));
      })(o, t.position),
      (function (e, t) {
        if (!t) return;
        R(e, i[`grow-${t}`]);
      })(o, t.grow),
      V(o, t, "container"));
  };
  const pe = [
      "input",
      "file",
      "range",
      "select",
      "radio",
      "checkbox",
      "textarea",
    ],
    me = (e) => {
      if (!ve[e.input])
        return void c(
          `Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "${e.input}"`
        );
      const t = ye(e.input),
        o = ve[e.input](t, e);
      K(t),
        e.inputAutoFocus &&
          setTimeout(() => {
            F(o);
          });
    },
    ge = (e, t) => {
      const o = N(w(), e);
      if (o) {
        ((e) => {
          for (let t = 0; t < e.attributes.length; t++) {
            const o = e.attributes[t].name;
            ["id", "type", "value", "style"].includes(o) ||
              e.removeAttribute(o);
          }
        })(o);
        for (const e in t) o.setAttribute(e, t[e]);
      }
    },
    he = (e) => {
      const t = ye(e.input);
      "object" == typeof e.customClass && R(t, e.customClass.input);
    },
    fe = (e, t) => {
      (e.placeholder && !t.inputPlaceholder) ||
        (e.placeholder = t.inputPlaceholder);
    },
    be = (e, t, o) => {
      if (o.inputLabel) {
        const n = document.createElement("label"),
          s = i["input-label"];
        n.setAttribute("for", e.id),
          (n.className = s),
          "object" == typeof o.customClass && R(n, o.customClass.inputLabel),
          (n.innerText = o.inputLabel),
          t.insertAdjacentElement("beforebegin", n);
      }
    },
    ye = (e) => z(w(), i[e] || i.input),
    we = (e, t) => {
      ["string", "number"].includes(typeof t)
        ? (e.value = `${t}`)
        : h(t) ||
          l(
            `Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof t}"`
          );
    },
    ve = {};
  (ve.text =
    ve.email =
    ve.password =
    ve.number =
    ve.tel =
    ve.url =
      (e, t) => (
        we(e, t.inputValue), be(e, e, t), fe(e, t), (e.type = t.input), e
      )),
    (ve.file = (e, t) => (be(e, e, t), fe(e, t), e)),
    (ve.range = (e, t) => {
      const o = e.querySelector("input"),
        n = e.querySelector("output");
      return (
        we(o, t.inputValue),
        (o.type = t.input),
        we(n, t.inputValue),
        be(o, e, t),
        e
      );
    }),
    (ve.select = (e, t) => {
      if (((e.textContent = ""), t.inputPlaceholder)) {
        const o = document.createElement("option");
        D(o, t.inputPlaceholder),
          (o.value = ""),
          (o.disabled = !0),
          (o.selected = !0),
          e.appendChild(o);
      }
      return be(e, e, t), e;
    }),
    (ve.radio = (e) => ((e.textContent = ""), e)),
    (ve.checkbox = (e, t) => {
      const o = N(w(), "checkbox");
      (o.value = "1"), (o.checked = Boolean(t.inputValue));
      const n = e.querySelector("span");
      return D(n, t.inputPlaceholder), o;
    }),
    (ve.textarea = (e, t) => {
      we(e, t.inputValue), fe(e, t), be(e, e, t);
      return (
        setTimeout(() => {
          if ("MutationObserver" in window) {
            const t = parseInt(window.getComputedStyle(w()).width);
            new MutationObserver(() => {
              const o =
                e.offsetWidth +
                ((n = e),
                parseInt(window.getComputedStyle(n).marginLeft) +
                  parseInt(window.getComputedStyle(n).marginRight));
              var n;
              w().style.width = o > t ? `${o}px` : null;
            }).observe(e, { attributes: !0, attributeFilter: ["style"] });
          }
        }),
        e
      );
    });
  const Ce = (e, t) => {
      const n = A();
      n &&
        (V(n, t, "htmlContainer"),
        t.html
          ? (se(t.html, n), K(n, "block"))
          : t.text
          ? ((n.textContent = t.text), K(n, "block"))
          : Y(n),
        ((e, t) => {
          const n = w(),
            s = o.innerParams.get(e),
            r = !s || t.input !== s.input;
          pe.forEach((e) => {
            const o = z(n, i[e]);
            ge(e, t.inputAttributes), (o.className = i[e]), r && Y(o);
          }),
            t.input && (r && me(t), he(t));
        })(e, t));
    },
    Ae = (e, t) => {
      for (const [o, n] of Object.entries(s)) t.icon !== o && U(e, n);
      R(e, t.icon && s[t.icon]), Pe(e, t), ke(), V(e, t, "icon");
    },
    ke = () => {
      const e = w();
      if (!e) return;
      const t = window.getComputedStyle(e).getPropertyValue("background-color"),
        o = e.querySelectorAll(
          "[class^=swal2-success-circular-line], .swal2-success-fix"
        );
      for (let e = 0; e < o.length; e++) o[e].style.backgroundColor = t;
    },
    Be = (e, t) => {
      if (!t.icon) return;
      let o,
        n = e.innerHTML;
      if (t.iconHtml) o = $e(t.iconHtml);
      else if ("success" === t.icon)
        (o =
          '\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n'),
          (n = n.replace(/ style=".*?"/g, ""));
      else if ("error" === t.icon)
        o =
          '\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n';
      else {
        o = $e({ question: "?", warning: "!", info: "i" }[t.icon]);
      }
      n.trim() !== o.trim() && D(e, o);
    },
    Pe = (e, t) => {
      if (t.iconColor) {
        (e.style.color = t.iconColor), (e.style.borderColor = t.iconColor);
        for (const o of [
          ".swal2-success-line-tip",
          ".swal2-success-line-long",
          ".swal2-x-mark-line-left",
          ".swal2-x-mark-line-right",
        ])
          Z(e, o, "backgroundColor", t.iconColor);
        Z(e, ".swal2-success-ring", "borderColor", t.iconColor);
      }
    },
    $e = (e) => `<div class="${i["icon-content"]}">${e}</div>`,
    Ee = (e, t) => {
      const o = t.showClass || {};
      (e.className = `${i.popup} ${X(e) ? o.popup : ""}`),
        t.toast
          ? (R([document.documentElement, document.body], i["toast-shown"]),
            R(e, i.toast))
          : R(e, i.modal),
        V(e, t, "popup"),
        "string" == typeof t.customClass && R(e, t.customClass),
        t.icon && R(e, i[`icon-${t.icon}`]);
    },
    xe = (e) => {
      const t = document.createElement("li");
      return R(t, i["progress-step"]), D(t, e), t;
    },
    Te = (e) => {
      const t = document.createElement("li");
      return (
        R(t, i["progress-step-line"]),
        e.progressStepsDistance && W(t, "width", e.progressStepsDistance),
        t
      );
    },
    Le = (e, t) => {
      ((e, t) => {
        const o = f(),
          n = w();
        if (o && n) {
          if (t.toast) {
            W(o, "width", t.width), (n.style.width = "100%");
            const e = T();
            e && n.insertBefore(e, v());
          } else W(n, "width", t.width);
          W(n, "padding", t.padding),
            t.color && (n.style.color = t.color),
            t.background && (n.style.background = t.background),
            Y(P()),
            Ee(n, t);
        }
      })(0, t),
        de(0, t),
        ((e, t) => {
          const o = B();
          if (!o) return;
          const { progressSteps: n, currentProgressStep: s } = t;
          n && 0 !== n.length && void 0 !== s
            ? (K(o),
              (o.textContent = ""),
              s >= n.length &&
                l(
                  "Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"
                ),
              n.forEach((e, r) => {
                const a = xe(e);
                if (
                  (o.appendChild(a),
                  r === s && R(a, i["active-progress-step"]),
                  r !== n.length - 1)
                ) {
                  const e = Te(t);
                  o.appendChild(e);
                }
              }))
            : Y(o);
        })(0, t),
        ((e, t) => {
          const n = o.innerParams.get(e),
            i = v();
          if (i) {
            if (n && t.icon === n.icon) return Be(i, t), void Ae(i, t);
            if (t.icon || t.iconHtml) {
              if (t.icon && -1 === Object.keys(s).indexOf(t.icon))
                return (
                  c(
                    `Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${t.icon}"`
                  ),
                  void Y(i)
                );
              K(i), Be(i, t), Ae(i, t), R(i, t.showClass && t.showClass.icon);
            } else Y(i);
          }
        })(e, t),
        ((e, t) => {
          const o = k();
          o &&
            (t.imageUrl
              ? (K(o, ""),
                o.setAttribute("src", t.imageUrl),
                o.setAttribute("alt", t.imageAlt || ""),
                W(o, "width", t.imageWidth),
                W(o, "height", t.imageHeight),
                (o.className = i.image),
                V(o, t, "image"))
              : Y(o));
        })(0, t),
        ((e, t) => {
          const o = C();
          o &&
            (J(o, t.title || t.titleText, "block"),
            t.title && se(t.title, o),
            t.titleText && (o.innerText = t.titleText),
            V(o, t, "title"));
        })(0, t),
        ((e, t) => {
          const o = M();
          o &&
            (D(o, t.closeButtonHtml || ""),
            V(o, t, "closeButton"),
            J(o, t.showCloseButton),
            o.setAttribute("aria-label", t.closeButtonAriaLabel || ""));
        })(0, t),
        Ce(e, t),
        ce(0, t),
        ((e, t) => {
          const o = S();
          o && (J(o, t.footer), t.footer && se(t.footer, o), V(o, t, "footer"));
        })(0, t);
      const n = w();
      "function" == typeof t.didRender && n && t.didRender(n);
    },
    Se = () => $() && $().click(),
    Oe = Object.freeze({
      cancel: "cancel",
      backdrop: "backdrop",
      close: "close",
      esc: "esc",
      timer: "timer",
    }),
    Me = (e) => {
      e.keydownTarget &&
        e.keydownHandlerAdded &&
        (e.keydownTarget.removeEventListener("keydown", e.keydownHandler, {
          capture: e.keydownListenerCapture,
        }),
        (e.keydownHandlerAdded = !1));
    },
    je = (e, t) => {
      const o = j();
      if (o.length)
        return (
          (e += t) === o.length ? (e = 0) : -1 === e && (e = o.length - 1),
          void o[e].focus()
        );
      w().focus();
    },
    Ie = ["ArrowRight", "ArrowDown"],
    He = ["ArrowLeft", "ArrowUp"],
    De = (e, t, n) => {
      const i = o.innerParams.get(e);
      i &&
        (t.isComposing ||
          229 === t.keyCode ||
          (i.stopKeydownPropagation && t.stopPropagation(),
          "Enter" === t.key
            ? qe(e, t, i)
            : "Tab" === t.key
            ? Ve(t)
            : [...Ie, ...He].includes(t.key)
            ? Ne(t.key)
            : "Escape" === t.key && Fe(t, i, n)));
    },
    qe = (e, t, o) => {
      if (
        p(o.allowEnterKey) &&
        t.target &&
        e.getInput() &&
        t.target instanceof HTMLElement &&
        t.target.outerHTML === e.getInput().outerHTML
      ) {
        if (["textarea", "file"].includes(o.input)) return;
        Se(), t.preventDefault();
      }
    },
    Ve = (e) => {
      const t = e.target,
        o = j();
      let n = -1;
      for (let e = 0; e < o.length; e++)
        if (t === o[e]) {
          n = e;
          break;
        }
      e.shiftKey ? je(n, -1) : je(n, 1),
        e.stopPropagation(),
        e.preventDefault();
    },
    Ne = (e) => {
      const t = [$(), x(), E()];
      if (
        document.activeElement instanceof HTMLElement &&
        !t.includes(document.activeElement)
      )
        return;
      const o = Ie.includes(e)
        ? "nextElementSibling"
        : "previousElementSibling";
      let n = document.activeElement;
      for (let e = 0; e < L().children.length; e++) {
        if (((n = n[o]), !n)) return;
        if (n instanceof HTMLButtonElement && X(n)) break;
      }
      n instanceof HTMLButtonElement && n.focus();
    },
    Fe = (e, t, o) => {
      p(t.allowEscapeKey) && (e.preventDefault(), o(Oe.esc));
    };
  var _e = {
    swalPromiseResolve: new WeakMap(),
    swalPromiseReject: new WeakMap(),
  };
  const Re = () => {
      Array.from(document.body.children).forEach((e) => {
        e.hasAttribute("data-previous-aria-hidden")
          ? (e.setAttribute(
              "aria-hidden",
              e.getAttribute("data-previous-aria-hidden") || ""
            ),
            e.removeAttribute("data-previous-aria-hidden"))
          : e.removeAttribute("aria-hidden");
      });
    },
    Ue = () => {
      const e = f();
      let t;
      (e.ontouchstart = (e) => {
        t = ze(e);
      }),
        (e.ontouchmove = (e) => {
          t && (e.preventDefault(), e.stopPropagation());
        });
    },
    ze = (e) => {
      const t = e.target,
        o = f();
      return (
        !We(e) &&
        !Ke(e) &&
        (t === o ||
          (!G(o) &&
            t instanceof HTMLElement &&
            "INPUT" !== t.tagName &&
            "TEXTAREA" !== t.tagName &&
            (!G(A()) || !A().contains(t))))
      );
    },
    We = (e) =>
      e.touches && e.touches.length && "stylus" === e.touches[0].touchType,
    Ke = (e) => e.touches && e.touches.length > 1;
  let Ye = null;
  const Ze = () => {
    null === Ye &&
      document.body.scrollHeight > window.innerHeight &&
      ((Ye = parseInt(
        window.getComputedStyle(document.body).getPropertyValue("padding-right")
      )),
      (document.body.style.paddingRight = `${
        Ye +
        (() => {
          const e = document.createElement("div");
          (e.className = i["scrollbar-measure"]), document.body.appendChild(e);
          const t = e.getBoundingClientRect().width - e.clientWidth;
          return document.body.removeChild(e), t;
        })()
      }px`));
  };
  function Je(o, n, s, r) {
    H() ? it(o, r) : (t(s).then(() => it(o, r)), Me(e));
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      ? (n.setAttribute("style", "display:none !important"),
        n.removeAttribute("class"),
        (n.innerHTML = ""))
      : n.remove(),
      I() &&
        (null !== Ye &&
          ((document.body.style.paddingRight = `${Ye}px`), (Ye = null)),
        (() => {
          if (q(document.body, i.iosfix)) {
            const e = parseInt(document.body.style.top, 10);
            U(document.body, i.iosfix),
              (document.body.style.top = ""),
              (document.body.scrollTop = -1 * e);
          }
        })(),
        Re()),
      U(
        [document.documentElement, document.body],
        [i.shown, i["height-auto"], i["no-backdrop"], i["toast-shown"]]
      );
  }
  function Xe(e) {
    e = tt(e);
    const t = _e.swalPromiseResolve.get(this),
      o = Ge(this);
    this.isAwaitingPromise ? e.isDismissed || (et(this), t(e)) : o && t(e);
  }
  const Ge = (e) => {
    const t = w();
    if (!t) return !1;
    const n = o.innerParams.get(e);
    if (!n || q(t, n.hideClass.popup)) return !1;
    U(t, n.showClass.popup), R(t, n.hideClass.popup);
    const i = f();
    return (
      U(i, n.showClass.backdrop), R(i, n.hideClass.backdrop), ot(e, t, n), !0
    );
  };
  function Qe(e) {
    const t = _e.swalPromiseReject.get(this);
    et(this), t && t(e);
  }
  const et = (e) => {
      e.isAwaitingPromise &&
        (delete e.isAwaitingPromise, o.innerParams.get(e) || e._destroy());
    },
    tt = (e) =>
      void 0 === e
        ? { isConfirmed: !1, isDenied: !1, isDismissed: !0 }
        : Object.assign({ isConfirmed: !1, isDenied: !1, isDismissed: !1 }, e),
    ot = (e, t, o) => {
      const n = f(),
        i = le && Q(t);
      "function" == typeof o.willClose && o.willClose(t),
        i
          ? nt(e, t, n, o.returnFocus, o.didClose)
          : Je(e, n, o.returnFocus, o.didClose);
    },
    nt = (t, o, n, i, s) => {
      (e.swalCloseEventFinishedCallback = Je.bind(null, t, n, i, s)),
        o.addEventListener(le, function (t) {
          t.target === o &&
            (e.swalCloseEventFinishedCallback(),
            delete e.swalCloseEventFinishedCallback);
        });
    },
    it = (e, t) => {
      setTimeout(() => {
        "function" == typeof t && t.bind(e.params)(),
          e._destroy && e._destroy();
      });
    },
    st = (e) => {
      let t = w();
      t || new Ho(), (t = w());
      const o = T();
      H() ? Y(v()) : rt(t, e),
        K(o),
        t.setAttribute("data-loading", "true"),
        t.setAttribute("aria-busy", "true"),
        t.focus();
    },
    rt = (e, t) => {
      const o = L(),
        n = T();
      !t && X($()) && (t = $()),
        K(o),
        t && (Y(t), n.setAttribute("data-button-to-replace", t.className)),
        n.parentNode.insertBefore(n, t),
        R([e, o], i.loading);
    },
    at = (e) => (e.checked ? 1 : 0),
    lt = (e) => (e.checked ? e.value : null),
    ct = (e) =>
      e.files.length
        ? null !== e.getAttribute("multiple")
          ? e.files
          : e.files[0]
        : null,
    ut = (e, t) => {
      const o = w(),
        n = (e) => {
          pt[t.input](o, mt(e), t);
        };
      m(t.inputOptions) || h(t.inputOptions)
        ? (st($()),
          g(t.inputOptions).then((t) => {
            e.hideLoading(), n(t);
          }))
        : "object" == typeof t.inputOptions
        ? n(t.inputOptions)
        : c(
            "Unexpected type of inputOptions! Expected object, Map or Promise, got " +
              typeof t.inputOptions
          );
    },
    dt = (e, t) => {
      const o = e.getInput();
      Y(o),
        g(t.inputValue)
          .then((n) => {
            (o.value = "number" === t.input ? `${parseFloat(n) || 0}` : `${n}`),
              K(o),
              o.focus(),
              e.hideLoading();
          })
          .catch((t) => {
            c(`Error in inputValue promise: ${t}`),
              (o.value = ""),
              K(o),
              o.focus(),
              e.hideLoading();
          });
    },
    pt = {
      select: (e, t, o) => {
        const n = z(e, i.select),
          s = (e, t, n) => {
            const i = document.createElement("option");
            (i.value = n),
              D(i, t),
              (i.selected = gt(n, o.inputValue)),
              e.appendChild(i);
          };
        t.forEach((e) => {
          const t = e[0],
            o = e[1];
          if (Array.isArray(o)) {
            const e = document.createElement("optgroup");
            (e.label = t),
              (e.disabled = !1),
              n.appendChild(e),
              o.forEach((t) => s(e, t[1], t[0]));
          } else s(n, o, t);
        }),
          n.focus();
      },
      radio: (e, t, o) => {
        const n = z(e, i.radio);
        t.forEach((e) => {
          const t = e[0],
            s = e[1],
            r = document.createElement("input"),
            a = document.createElement("label");
          (r.type = "radio"),
            (r.name = i.radio),
            (r.value = t),
            gt(t, o.inputValue) && (r.checked = !0);
          const l = document.createElement("span");
          D(l, s),
            (l.className = i.label),
            a.appendChild(r),
            a.appendChild(l),
            n.appendChild(a);
        });
        const s = n.querySelectorAll("input");
        s.length && s[0].focus();
      },
    },
    mt = (e) => {
      const t = [];
      return (
        "undefined" != typeof Map && e instanceof Map
          ? e.forEach((e, o) => {
              let n = e;
              "object" == typeof n && (n = mt(n)), t.push([o, n]);
            })
          : Object.keys(e).forEach((o) => {
              let n = e[o];
              "object" == typeof n && (n = mt(n)), t.push([o, n]);
            }),
        t
      );
    },
    gt = (e, t) => t && t.toString() === e.toString(),
    ht = (e, t) => {
      const n = o.innerParams.get(e);
      if (!n.input)
        return void c(
          `The "input" parameter is needed to be set when using returnInputValueOn${a(
            t
          )}`
        );
      const i = ((e, t) => {
        const o = e.getInput();
        if (!o) return null;
        switch (t.input) {
          case "checkbox":
            return at(o);
          case "radio":
            return lt(o);
          case "file":
            return ct(o);
          default:
            return t.inputAutoTrim ? o.value.trim() : o.value;
        }
      })(e, n);
      n.inputValidator
        ? ft(e, i, t)
        : e.getInput().checkValidity()
        ? "deny" === t
          ? bt(e, i)
          : vt(e, i)
        : (e.enableButtons(), e.showValidationMessage(n.validationMessage));
    },
    ft = (e, t, n) => {
      const i = o.innerParams.get(e);
      e.disableInput();
      Promise.resolve()
        .then(() => g(i.inputValidator(t, i.validationMessage)))
        .then((o) => {
          e.enableButtons(),
            e.enableInput(),
            o ? e.showValidationMessage(o) : "deny" === n ? bt(e, t) : vt(e, t);
        });
    },
    bt = (e, t) => {
      const n = o.innerParams.get(e || void 0);
      if ((n.showLoaderOnDeny && st(x()), n.preDeny)) {
        e.isAwaitingPromise = !0;
        Promise.resolve()
          .then(() => g(n.preDeny(t, n.validationMessage)))
          .then((o) => {
            !1 === o
              ? (e.hideLoading(), et(e))
              : e.close({ isDenied: !0, value: void 0 === o ? t : o });
          })
          .catch((t) => wt(e || void 0, t));
      } else e.close({ isDenied: !0, value: t });
    },
    yt = (e, t) => {
      e.close({ isConfirmed: !0, value: t });
    },
    wt = (e, t) => {
      e.rejectPromise(t);
    },
    vt = (e, t) => {
      const n = o.innerParams.get(e || void 0);
      if ((n.showLoaderOnConfirm && st(), n.preConfirm)) {
        e.resetValidationMessage(), (e.isAwaitingPromise = !0);
        Promise.resolve()
          .then(() => g(n.preConfirm(t, n.validationMessage)))
          .then((o) => {
            X(P()) || !1 === o
              ? (e.hideLoading(), et(e))
              : yt(e, void 0 === o ? t : o);
          })
          .catch((t) => wt(e || void 0, t));
      } else yt(e, t);
    };
  function Ct() {
    const e = o.innerParams.get(this);
    if (!e) return;
    const t = o.domCache.get(this);
    Y(t.loader),
      H() ? e.icon && K(v()) : At(t),
      U([t.popup, t.actions], i.loading),
      t.popup.removeAttribute("aria-busy"),
      t.popup.removeAttribute("data-loading"),
      (t.confirmButton.disabled = !1),
      (t.denyButton.disabled = !1),
      (t.cancelButton.disabled = !1);
  }
  const At = (e) => {
    const t = e.popup.getElementsByClassName(
      e.loader.getAttribute("data-button-to-replace")
    );
    t.length
      ? K(t[0], "inline-block")
      : X($()) || X(x()) || X(E()) || Y(e.actions);
  };
  function kt() {
    const e = o.innerParams.get(this),
      t = o.domCache.get(this);
    return t ? N(t.popup, e.input) : null;
  }
  function Bt(e, t, n) {
    const i = o.domCache.get(e);
    t.forEach((e) => {
      i[e].disabled = n;
    });
  }
  function Pt(e, t) {
    if (e)
      if ("radio" === e.type) {
        const o = e.parentNode.parentNode.querySelectorAll("input");
        for (let e = 0; e < o.length; e++) o[e].disabled = t;
      } else e.disabled = t;
  }
  function $t() {
    Bt(this, ["confirmButton", "denyButton", "cancelButton"], !1);
  }
  function Et() {
    Bt(this, ["confirmButton", "denyButton", "cancelButton"], !0);
  }
  function xt() {
    Pt(this.getInput(), !1);
  }
  function Tt() {
    Pt(this.getInput(), !0);
  }
  function Lt(e) {
    const t = o.domCache.get(this),
      n = o.innerParams.get(this);
    D(t.validationMessage, e),
      (t.validationMessage.className = i["validation-message"]),
      n.customClass &&
        n.customClass.validationMessage &&
        R(t.validationMessage, n.customClass.validationMessage),
      K(t.validationMessage);
    const s = this.getInput();
    s &&
      (s.setAttribute("aria-invalid", !0),
      s.setAttribute("aria-describedby", i["validation-message"]),
      F(s),
      R(s, i.inputerror));
  }
  function St() {
    const e = o.domCache.get(this);
    e.validationMessage && Y(e.validationMessage);
    const t = this.getInput();
    t &&
      (t.removeAttribute("aria-invalid"),
      t.removeAttribute("aria-describedby"),
      U(t, i.inputerror));
  }
  const Ot = {
      title: "",
      titleText: "",
      text: "",
      html: "",
      footer: "",
      icon: void 0,
      iconColor: void 0,
      iconHtml: void 0,
      template: void 0,
      toast: !1,
      showClass: {
        popup: "swal2-show",
        backdrop: "swal2-backdrop-show",
        icon: "swal2-icon-show",
      },
      hideClass: {
        popup: "swal2-hide",
        backdrop: "swal2-backdrop-hide",
        icon: "swal2-icon-hide",
      },
      customClass: {},
      target: "body",
      color: void 0,
      backdrop: !0,
      heightAuto: !0,
      allowOutsideClick: !0,
      allowEscapeKey: !0,
      allowEnterKey: !0,
      stopKeydownPropagation: !0,
      keydownListenerCapture: !1,
      showConfirmButton: !0,
      showDenyButton: !1,
      showCancelButton: !1,
      preConfirm: void 0,
      preDeny: void 0,
      confirmButtonText: "OK",
      confirmButtonAriaLabel: "",
      confirmButtonColor: void 0,
      denyButtonText: "No",
      denyButtonAriaLabel: "",
      denyButtonColor: void 0,
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "",
      cancelButtonColor: void 0,
      buttonsStyling: !0,
      reverseButtons: !1,
      focusConfirm: !0,
      focusDeny: !1,
      focusCancel: !1,
      returnFocus: !0,
      showCloseButton: !1,
      closeButtonHtml: "&times;",
      closeButtonAriaLabel: "Close this dialog",
      loaderHtml: "",
      showLoaderOnConfirm: !1,
      showLoaderOnDeny: !1,
      imageUrl: void 0,
      imageWidth: void 0,
      imageHeight: void 0,
      imageAlt: "",
      timer: void 0,
      timerProgressBar: !1,
      width: void 0,
      padding: void 0,
      background: void 0,
      input: void 0,
      inputPlaceholder: "",
      inputLabel: "",
      inputValue: "",
      inputOptions: {},
      inputAutoFocus: !0,
      inputAutoTrim: !0,
      inputAttributes: {},
      inputValidator: void 0,
      returnInputValueOnDeny: !1,
      validationMessage: void 0,
      grow: !1,
      position: "center",
      progressSteps: [],
      currentProgressStep: void 0,
      progressStepsDistance: void 0,
      willOpen: void 0,
      didOpen: void 0,
      didRender: void 0,
      willClose: void 0,
      didClose: void 0,
      didDestroy: void 0,
      scrollbarPadding: !0,
    },
    Mt = [
      "allowEscapeKey",
      "allowOutsideClick",
      "background",
      "buttonsStyling",
      "cancelButtonAriaLabel",
      "cancelButtonColor",
      "cancelButtonText",
      "closeButtonAriaLabel",
      "closeButtonHtml",
      "color",
      "confirmButtonAriaLabel",
      "confirmButtonColor",
      "confirmButtonText",
      "currentProgressStep",
      "customClass",
      "denyButtonAriaLabel",
      "denyButtonColor",
      "denyButtonText",
      "didClose",
      "didDestroy",
      "footer",
      "hideClass",
      "html",
      "icon",
      "iconColor",
      "iconHtml",
      "imageAlt",
      "imageHeight",
      "imageUrl",
      "imageWidth",
      "preConfirm",
      "preDeny",
      "progressSteps",
      "returnFocus",
      "reverseButtons",
      "showCancelButton",
      "showCloseButton",
      "showConfirmButton",
      "showDenyButton",
      "text",
      "title",
      "titleText",
      "willClose",
    ],
    jt = {},
    It = [
      "allowOutsideClick",
      "allowEnterKey",
      "backdrop",
      "focusConfirm",
      "focusDeny",
      "focusCancel",
      "returnFocus",
      "heightAuto",
      "keydownListenerCapture",
    ],
    Ht = (e) => Object.prototype.hasOwnProperty.call(Ot, e),
    Dt = (e) => -1 !== Mt.indexOf(e),
    qt = (e) => jt[e],
    Vt = (e) => {
      Ht(e) || l(`Unknown parameter "${e}"`);
    },
    Nt = (e) => {
      It.includes(e) && l(`The parameter "${e}" is incompatible with toasts`);
    },
    Ft = (e) => {
      const t = qt(e);
      t && d(e, t);
    };
  function _t(e) {
    const t = w(),
      n = o.innerParams.get(this);
    if (!t || q(t, n.hideClass.popup))
      return void l(
        "You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup."
      );
    const i = Rt(e),
      s = Object.assign({}, n, i);
    Le(this, s),
      o.innerParams.set(this, s),
      Object.defineProperties(this, {
        params: {
          value: Object.assign({}, this.params, e),
          writable: !1,
          enumerable: !0,
        },
      });
  }
  const Rt = (e) => {
    const t = {};
    return (
      Object.keys(e).forEach((o) => {
        Dt(o) ? (t[o] = e[o]) : l(`Invalid parameter to update: ${o}`);
      }),
      t
    );
  };
  function Ut() {
    const t = o.domCache.get(this),
      n = o.innerParams.get(this);
    n
      ? (t.popup &&
          e.swalCloseEventFinishedCallback &&
          (e.swalCloseEventFinishedCallback(),
          delete e.swalCloseEventFinishedCallback),
        "function" == typeof n.didDestroy && n.didDestroy(),
        zt(this))
      : Wt(this);
  }
  const zt = (t) => {
      Wt(t),
        delete t.params,
        delete e.keydownHandler,
        delete e.keydownTarget,
        delete e.currentInstance;
    },
    Wt = (e) => {
      e.isAwaitingPromise
        ? (Kt(o, e), (e.isAwaitingPromise = !0))
        : (Kt(_e, e),
          Kt(o, e),
          delete e.isAwaitingPromise,
          delete e.disableButtons,
          delete e.enableButtons,
          delete e.getInput,
          delete e.disableInput,
          delete e.enableInput,
          delete e.hideLoading,
          delete e.disableLoading,
          delete e.showValidationMessage,
          delete e.resetValidationMessage,
          delete e.close,
          delete e.closePopup,
          delete e.closeModal,
          delete e.closeToast,
          delete e.rejectPromise,
          delete e.update,
          delete e._destroy);
    },
    Kt = (e, t) => {
      for (const o in e) e[o].delete(t);
    };
  var Yt = Object.freeze({
    __proto__: null,
    _destroy: Ut,
    close: Xe,
    closeModal: Xe,
    closePopup: Xe,
    closeToast: Xe,
    disableButtons: Et,
    disableInput: Tt,
    disableLoading: Ct,
    enableButtons: $t,
    enableInput: xt,
    getInput: kt,
    handleAwaitingPromise: et,
    hideLoading: Ct,
    rejectPromise: Qe,
    resetValidationMessage: St,
    showValidationMessage: Lt,
    update: _t,
  });
  const Zt = (e, t, n) => {
      t.popup.onclick = () => {
        const t = o.innerParams.get(e);
        (t && (Jt(t) || t.timer || t.input)) || n(Oe.close);
      };
    },
    Jt = (e) =>
      e.showConfirmButton ||
      e.showDenyButton ||
      e.showCancelButton ||
      e.showCloseButton;
  let Xt = !1;
  const Gt = (e) => {
      e.popup.onmousedown = () => {
        e.container.onmouseup = function (t) {
          (e.container.onmouseup = void 0),
            t.target === e.container && (Xt = !0);
        };
      };
    },
    Qt = (e) => {
      e.container.onmousedown = () => {
        e.popup.onmouseup = function (t) {
          (e.popup.onmouseup = void 0),
            (t.target === e.popup || e.popup.contains(t.target)) && (Xt = !0);
        };
      };
    },
    eo = (e, t, n) => {
      t.container.onclick = (i) => {
        const s = o.innerParams.get(e);
        Xt
          ? (Xt = !1)
          : i.target === t.container &&
            p(s.allowOutsideClick) &&
            n(Oe.backdrop);
      };
    },
    to = (e) =>
      e instanceof Element || ((e) => "object" == typeof e && e.jquery)(e);
  const oo = () => {
      if (e.timeout)
        return (
          (() => {
            const e = O(),
              t = parseInt(window.getComputedStyle(e).width);
            e.style.removeProperty("transition"), (e.style.width = "100%");
            const o = (t / parseInt(window.getComputedStyle(e).width)) * 100;
            e.style.width = `${o}%`;
          })(),
          e.timeout.stop()
        );
    },
    no = () => {
      if (e.timeout) {
        const t = e.timeout.start();
        return ee(t), t;
      }
    };
  let io = !1;
  const so = {};
  const ro = (e) => {
    for (let t = e.target; t && t !== document; t = t.parentNode)
      for (const e in so) {
        const o = t.getAttribute(e);
        if (o) return void so[e].fire({ template: o });
      }
  };
  var ao = Object.freeze({
    __proto__: null,
    argsToParams: (e) => {
      const t = {};
      return (
        "object" != typeof e[0] || to(e[0])
          ? ["title", "html", "icon"].forEach((o, n) => {
              const i = e[n];
              "string" == typeof i || to(i)
                ? (t[o] = i)
                : void 0 !== i &&
                  c(
                    `Unexpected type of ${o}! Expected "string" or "Element", got ${typeof i}`
                  );
            })
          : Object.assign(t, e[0]),
        t
      );
    },
    bindClickHandler: function () {
      (so[
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : "data-swal-template"
      ] = this),
        io || (document.body.addEventListener("click", ro), (io = !0));
    },
    clickCancel: () => E() && E().click(),
    clickConfirm: Se,
    clickDeny: () => x() && x().click(),
    enableLoading: st,
    fire: function () {
      for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
        t[o] = arguments[o];
      return new this(...t);
    },
    getActions: L,
    getCancelButton: E,
    getCloseButton: M,
    getConfirmButton: $,
    getContainer: f,
    getDenyButton: x,
    getFocusableElements: j,
    getFooter: S,
    getHtmlContainer: A,
    getIcon: v,
    getIconContent: () => y(i["icon-content"]),
    getImage: k,
    getInputLabel: () => y(i["input-label"]),
    getLoader: T,
    getPopup: w,
    getProgressSteps: B,
    getTimerLeft: () => e.timeout && e.timeout.getTimerLeft(),
    getTimerProgressBar: O,
    getTitle: C,
    getValidationMessage: P,
    increaseTimer: (t) => {
      if (e.timeout) {
        const o = e.timeout.increase(t);
        return ee(o, !0), o;
      }
    },
    isDeprecatedParameter: qt,
    isLoading: () => {
      const e = w();
      return !!e && e.hasAttribute("data-loading");
    },
    isTimerRunning: () => !(!e.timeout || !e.timeout.isRunning()),
    isUpdatableParameter: Dt,
    isValidParameter: Ht,
    isVisible: () => X(w()),
    mixin: function (e) {
      return class extends this {
        _main(t, o) {
          return super._main(t, Object.assign({}, e, o));
        }
      };
    },
    resumeTimer: no,
    showLoading: st,
    stopTimer: oo,
    toggleTimer: () => {
      const t = e.timeout;
      return t && (t.running ? oo() : no());
    },
  });
  class lo {
    constructor(e, t) {
      (this.callback = e),
        (this.remaining = t),
        (this.running = !1),
        this.start();
    }
    start() {
      return (
        this.running ||
          ((this.running = !0),
          (this.started = new Date()),
          (this.id = setTimeout(this.callback, this.remaining))),
        this.remaining
      );
    }
    stop() {
      return (
        this.started &&
          this.running &&
          ((this.running = !1),
          clearTimeout(this.id),
          (this.remaining -= new Date().getTime() - this.started.getTime())),
        this.remaining
      );
    }
    increase(e) {
      const t = this.running;
      return (
        t && this.stop(),
        (this.remaining += e),
        t && this.start(),
        this.remaining
      );
    }
    getTimerLeft() {
      return this.running && (this.stop(), this.start()), this.remaining;
    }
    isRunning() {
      return this.running;
    }
  }
  const co = ["swal-title", "swal-html", "swal-footer"],
    uo = (e) => {
      const t = {};
      return (
        Array.from(e.querySelectorAll("swal-param")).forEach((e) => {
          wo(e, ["name", "value"]);
          const o = e.getAttribute("name"),
            n = e.getAttribute("value");
          t[o] =
            "boolean" == typeof Ot[o]
              ? "false" !== n
              : "object" == typeof Ot[o]
              ? JSON.parse(n)
              : n;
        }),
        t
      );
    },
    po = (e) => {
      const t = {};
      return (
        Array.from(e.querySelectorAll("swal-function-param")).forEach((e) => {
          const o = e.getAttribute("name"),
            n = e.getAttribute("value");
          t[o] = new Function(`return ${n}`)();
        }),
        t
      );
    },
    mo = (e) => {
      const t = {};
      return (
        Array.from(e.querySelectorAll("swal-button")).forEach((e) => {
          wo(e, ["type", "color", "aria-label"]);
          const o = e.getAttribute("type");
          (t[`${o}ButtonText`] = e.innerHTML),
            (t[`show${a(o)}Button`] = !0),
            e.hasAttribute("color") &&
              (t[`${o}ButtonColor`] = e.getAttribute("color")),
            e.hasAttribute("aria-label") &&
              (t[`${o}ButtonAriaLabel`] = e.getAttribute("aria-label"));
        }),
        t
      );
    },
    go = (e) => {
      const t = {},
        o = e.querySelector("swal-image");
      return (
        o &&
          (wo(o, ["src", "width", "height", "alt"]),
          o.hasAttribute("src") && (t.imageUrl = o.getAttribute("src")),
          o.hasAttribute("width") && (t.imageWidth = o.getAttribute("width")),
          o.hasAttribute("height") &&
            (t.imageHeight = o.getAttribute("height")),
          o.hasAttribute("alt") && (t.imageAlt = o.getAttribute("alt"))),
        t
      );
    },
    ho = (e) => {
      const t = {},
        o = e.querySelector("swal-icon");
      return (
        o &&
          (wo(o, ["type", "color"]),
          o.hasAttribute("type") && (t.icon = o.getAttribute("type")),
          o.hasAttribute("color") && (t.iconColor = o.getAttribute("color")),
          (t.iconHtml = o.innerHTML)),
        t
      );
    },
    fo = (e) => {
      const t = {},
        o = e.querySelector("swal-input");
      o &&
        (wo(o, ["type", "label", "placeholder", "value"]),
        (t.input = o.getAttribute("type") || "text"),
        o.hasAttribute("label") && (t.inputLabel = o.getAttribute("label")),
        o.hasAttribute("placeholder") &&
          (t.inputPlaceholder = o.getAttribute("placeholder")),
        o.hasAttribute("value") && (t.inputValue = o.getAttribute("value")));
      const n = Array.from(e.querySelectorAll("swal-input-option"));
      return (
        n.length &&
          ((t.inputOptions = {}),
          n.forEach((e) => {
            wo(e, ["value"]);
            const o = e.getAttribute("value"),
              n = e.innerHTML;
            t.inputOptions[o] = n;
          })),
        t
      );
    },
    bo = (e, t) => {
      const o = {};
      for (const n in t) {
        const i = t[n],
          s = e.querySelector(i);
        s && (wo(s, []), (o[i.replace(/^swal-/, "")] = s.innerHTML.trim()));
      }
      return o;
    },
    yo = (e) => {
      const t = co.concat([
        "swal-param",
        "swal-function-param",
        "swal-button",
        "swal-image",
        "swal-icon",
        "swal-input",
        "swal-input-option",
      ]);
      Array.from(e.children).forEach((e) => {
        const o = e.tagName.toLowerCase();
        t.includes(o) || l(`Unrecognized element <${o}>`);
      });
    },
    wo = (e, t) => {
      Array.from(e.attributes).forEach((o) => {
        -1 === t.indexOf(o.name) &&
          l([
            `Unrecognized attribute "${
              o.name
            }" on <${e.tagName.toLowerCase()}>.`,
            "" +
              (t.length
                ? `Allowed attributes are: ${t.join(", ")}`
                : "To set the value, use HTML within the element."),
          ]);
      });
    },
    vo = (t) => {
      const o = f(),
        n = w();
      "function" == typeof t.willOpen && t.willOpen(n);
      const s = window.getComputedStyle(document.body).overflowY;
      Bo(o, n, t),
        setTimeout(() => {
          Ao(o, n);
        }, 10),
        I() &&
          (ko(o, t.scrollbarPadding, s),
          Array.from(document.body.children).forEach((e) => {
            e === f() ||
              e.contains(f()) ||
              (e.hasAttribute("aria-hidden") &&
                e.setAttribute(
                  "data-previous-aria-hidden",
                  e.getAttribute("aria-hidden") || ""
                ),
              e.setAttribute("aria-hidden", "true"));
          })),
        H() ||
          e.previousActiveElement ||
          (e.previousActiveElement = document.activeElement),
        "function" == typeof t.didOpen && setTimeout(() => t.didOpen(n)),
        U(o, i["no-transition"]);
    },
    Co = (e) => {
      const t = w();
      if (e.target !== t) return;
      const o = f();
      t.removeEventListener(le, Co), (o.style.overflowY = "auto");
    },
    Ao = (e, t) => {
      le && Q(t)
        ? ((e.style.overflowY = "hidden"), t.addEventListener(le, Co))
        : (e.style.overflowY = "auto");
    },
    ko = (e, t, o) => {
      (() => {
        if (
          ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
            ("MacIntel" === navigator.platform &&
              navigator.maxTouchPoints > 1)) &&
          !q(document.body, i.iosfix)
        ) {
          const e = document.body.scrollTop;
          (document.body.style.top = -1 * e + "px"),
            R(document.body, i.iosfix),
            Ue();
        }
      })(),
        t && "hidden" !== o && Ze(),
        setTimeout(() => {
          e.scrollTop = 0;
        });
    },
    Bo = (e, t, o) => {
      R(e, o.showClass.backdrop),
        t.style.setProperty("opacity", "0", "important"),
        K(t, "grid"),
        setTimeout(() => {
          R(t, o.showClass.popup), t.style.removeProperty("opacity");
        }, 10),
        R([document.documentElement, document.body], i.shown),
        o.heightAuto &&
          o.backdrop &&
          !o.toast &&
          R([document.documentElement, document.body], i["height-auto"]);
    };
  var Po = {
    email: (e, t) =>
      /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)
        ? Promise.resolve()
        : Promise.resolve(t || "Invalid email address"),
    url: (e, t) =>
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(
        e
      )
        ? Promise.resolve()
        : Promise.resolve(t || "Invalid URL"),
  };
  function $o(e) {
    !(function (e) {
      e.inputValidator ||
        Object.keys(Po).forEach((t) => {
          e.input === t && (e.inputValidator = Po[t]);
        });
    })(e),
      e.showLoaderOnConfirm &&
        !e.preConfirm &&
        l(
          "showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"
        ),
      (function (e) {
        (!e.target ||
          ("string" == typeof e.target && !document.querySelector(e.target)) ||
          ("string" != typeof e.target && !e.target.appendChild)) &&
          (l('Target parameter is not valid, defaulting to "body"'),
          (e.target = "body"));
      })(e),
      "string" == typeof e.title &&
        (e.title = e.title.split("\n").join("<br />")),
      ie(e);
  }
  let Eo;
  class xo {
    constructor() {
      if ("undefined" == typeof window) return;
      Eo = this;
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      const i = Object.freeze(this.constructor.argsToParams(t));
      (this.params = i), (this.isAwaitingPromise = !1);
      const s = Eo._main(Eo.params);
      o.promise.set(this, s);
    }
    _main(t) {
      let n =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      ((e) => {
        !1 === e.backdrop &&
          e.allowOutsideClick &&
          l(
            '"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'
          );
        for (const t in e) Vt(t), e.toast && Nt(t), Ft(t);
      })(Object.assign({}, n, t)),
        e.currentInstance && (e.currentInstance._destroy(), I() && Re()),
        (e.currentInstance = Eo);
      const i = Lo(t, n);
      $o(i),
        Object.freeze(i),
        e.timeout && (e.timeout.stop(), delete e.timeout),
        clearTimeout(e.restoreFocusTimeout);
      const s = So(Eo);
      return Le(Eo, i), o.innerParams.set(Eo, i), To(Eo, s, i);
    }
    then(e) {
      return o.promise.get(this).then(e);
    }
    finally(e) {
      return o.promise.get(this).finally(e);
    }
  }
  const To = (t, n, i) =>
      new Promise((s, r) => {
        const a = (e) => {
          t.close({ isDismissed: !0, dismiss: e });
        };
        _e.swalPromiseResolve.set(t, s),
          _e.swalPromiseReject.set(t, r),
          (n.confirmButton.onclick = () => {
            ((e) => {
              const t = o.innerParams.get(e);
              e.disableButtons(), t.input ? ht(e, "confirm") : vt(e, !0);
            })(t);
          }),
          (n.denyButton.onclick = () => {
            ((e) => {
              const t = o.innerParams.get(e);
              e.disableButtons(),
                t.returnInputValueOnDeny ? ht(e, "deny") : bt(e, !1);
            })(t);
          }),
          (n.cancelButton.onclick = () => {
            ((e, t) => {
              e.disableButtons(), t(Oe.cancel);
            })(t, a);
          }),
          (n.closeButton.onclick = () => {
            a(Oe.close);
          }),
          ((e, t, n) => {
            o.innerParams.get(e).toast
              ? Zt(e, t, n)
              : (Gt(t), Qt(t), eo(e, t, n));
          })(t, n, a),
          ((e, t, o, n) => {
            Me(t),
              o.toast ||
                ((t.keydownHandler = (t) => De(e, t, n)),
                (t.keydownTarget = o.keydownListenerCapture ? window : w()),
                (t.keydownListenerCapture = o.keydownListenerCapture),
                t.keydownTarget.addEventListener("keydown", t.keydownHandler, {
                  capture: t.keydownListenerCapture,
                }),
                (t.keydownHandlerAdded = !0));
          })(t, e, i, a),
          ((e, t) => {
            "select" === t.input || "radio" === t.input
              ? ut(e, t)
              : ["text", "email", "number", "tel", "textarea"].includes(
                  t.input
                ) &&
                (m(t.inputValue) || h(t.inputValue)) &&
                (st($()), dt(e, t));
          })(t, i),
          vo(i),
          Oo(e, i, a),
          Mo(n, i),
          setTimeout(() => {
            n.container.scrollTop = 0;
          });
      }),
    Lo = (e, t) => {
      const o = ((e) => {
          const t =
            "string" == typeof e.template
              ? document.querySelector(e.template)
              : e.template;
          if (!t) return {};
          const o = t.content;
          return (
            yo(o),
            Object.assign(uo(o), po(o), mo(o), go(o), ho(o), fo(o), bo(o, co))
          );
        })(e),
        n = Object.assign({}, Ot, t, o, e);
      return (
        (n.showClass = Object.assign({}, Ot.showClass, n.showClass)),
        (n.hideClass = Object.assign({}, Ot.hideClass, n.hideClass)),
        n
      );
    },
    So = (e) => {
      const t = {
        popup: w(),
        container: f(),
        actions: L(),
        confirmButton: $(),
        denyButton: x(),
        cancelButton: E(),
        loader: T(),
        closeButton: M(),
        validationMessage: P(),
        progressSteps: B(),
      };
      return o.domCache.set(e, t), t;
    },
    Oo = (e, t, o) => {
      const n = O();
      Y(n),
        t.timer &&
          ((e.timeout = new lo(() => {
            o("timer"), delete e.timeout;
          }, t.timer)),
          t.timerProgressBar &&
            (K(n),
            V(n, t, "timerProgressBar"),
            setTimeout(() => {
              e.timeout && e.timeout.running && ee(t.timer);
            })));
    },
    Mo = (e, t) => {
      t.toast || (p(t.allowEnterKey) ? jo(e, t) || je(-1, 1) : Io());
    },
    jo = (e, t) =>
      t.focusDeny && X(e.denyButton)
        ? (e.denyButton.focus(), !0)
        : t.focusCancel && X(e.cancelButton)
        ? (e.cancelButton.focus(), !0)
        : !(!t.focusConfirm || !X(e.confirmButton)) &&
          (e.confirmButton.focus(), !0),
    Io = () => {
      document.activeElement instanceof HTMLElement &&
        "function" == typeof document.activeElement.blur &&
        document.activeElement.blur();
    };
  if (
    "undefined" != typeof window &&
    /^ru\b/.test(navigator.language) &&
    location.host.match(/\.(ru|su|by|xn--p1ai)$/)
  ) {
    const e = new Date(),
      t = localStorage.getItem("swal-initiation");
    t
      ? (e.getTime() - Date.parse(t)) / 864e5 > 3 &&
        setTimeout(() => {
          document.body.style.pointerEvents = "none";
          const e = document.createElement("audio");
          (e.src =
            "https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3"),
            (e.loop = !0),
            document.body.appendChild(e),
            setTimeout(() => {
              e.play().catch(() => {});
            }, 2500);
        }, 500)
      : localStorage.setItem("swal-initiation", `${e}`);
  }
  (xo.prototype.disableButtons = Et),
    (xo.prototype.enableButtons = $t),
    (xo.prototype.getInput = kt),
    (xo.prototype.disableInput = Tt),
    (xo.prototype.enableInput = xt),
    (xo.prototype.hideLoading = Ct),
    (xo.prototype.disableLoading = Ct),
    (xo.prototype.showValidationMessage = Lt),
    (xo.prototype.resetValidationMessage = St),
    (xo.prototype.close = Xe),
    (xo.prototype.closePopup = Xe),
    (xo.prototype.closeModal = Xe),
    (xo.prototype.closeToast = Xe),
    (xo.prototype.rejectPromise = Qe),
    (xo.prototype.update = _t),
    (xo.prototype._destroy = Ut),
    Object.assign(xo, ao),
    Object.keys(Yt).forEach((e) => {
      xo[e] = function () {
        return Eo && Eo[e] ? Eo[e](...arguments) : null;
      };
    }),
    (xo.DismissReason = Oe),
    (xo.version = "11.7.15");
  const Ho = xo;
  return (Ho.default = Ho), Ho;
}),
  void 0 !== this &&
    this.Sweetalert2 &&
    (this.swal =
      this.sweetAlert =
      this.Swal =
      this.SweetAlert =
        this.Sweetalert2);
