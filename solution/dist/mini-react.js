!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);let r=["tagName","children","textcontent"];(()=>{let e,t;const n=()=>{t.innerHTML="",s(e,t)},o=(e,t)=>{t instanceof Array?t.forEach(t=>o(e,t)):t instanceof HTMLElement?e.appendChild(t):o(e,t.render())},a=e=>{let{tagName:t,textContent:n,children:a}=e;const s=document.createElement(t);return n&&(s.innerText=n),a&&a.forEach(e=>o(s,e)),Object.entries((e=>{if(e.hasOwnProperty("componentClass"))throw Error();let t={...e};return r.forEach(e=>{t.hasOwnProperty(e)&&delete t[e]}),t})(e)).forEach(e=>((e,t,n)=>{(e=>/^on.*$/.test(e))(t)?e.addEventListener(t.substring(2).toLowerCase(),n):"className"===t?e.setAttribute("class",n):e.setAttribute(t,n)})(s,e[0],e[1])),s},s=(n,r)=>{t=r;const o=(e=n).render();t.appendChild(o)};window.Component=class{constructor(e){this.props=e}setState(e){let t=e();this.state={...this.state,...t},n()}},window.node=e=>{try{return e.tagName&&a(e)||e.componentClass&&(e=>{let{componentClass:t,props:n}=e;return new t(n)})(e)}catch(e){throw new SyntaxError("Your instance of Render() should have either a tagName or a componentClass and never both")}},window.MiniReact={render:s}})()}]);