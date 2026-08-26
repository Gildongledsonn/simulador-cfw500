(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();function $v(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var z0={exports:{}},pc={},k0={exports:{}},je={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var us=Symbol.for("react.element"),Kv=Symbol.for("react.portal"),Zv=Symbol.for("react.fragment"),Qv=Symbol.for("react.strict_mode"),Jv=Symbol.for("react.profiler"),e_=Symbol.for("react.provider"),t_=Symbol.for("react.context"),n_=Symbol.for("react.forward_ref"),i_=Symbol.for("react.suspense"),r_=Symbol.for("react.memo"),a_=Symbol.for("react.lazy"),sh=Symbol.iterator;function o_(t){return t===null||typeof t!="object"?null:(t=sh&&t[sh]||t["@@iterator"],typeof t=="function"?t:null)}var B0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},V0=Object.assign,H0={};function $a(t,e,n){this.props=t,this.context=e,this.refs=H0,this.updater=n||B0}$a.prototype.isReactComponent={};$a.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};$a.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function G0(){}G0.prototype=$a.prototype;function zf(t,e,n){this.props=t,this.context=e,this.refs=H0,this.updater=n||B0}var kf=zf.prototype=new G0;kf.constructor=zf;V0(kf,$a.prototype);kf.isPureReactComponent=!0;var lh=Array.isArray,W0=Object.prototype.hasOwnProperty,Bf={current:null},j0={key:!0,ref:!0,__self:!0,__source:!0};function X0(t,e,n){var i,r={},a=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(a=""+e.key),e)W0.call(e,i)&&!j0.hasOwnProperty(i)&&(r[i]=e[i]);var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){for(var l=Array(s),c=0;c<s;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in s=t.defaultProps,s)r[i]===void 0&&(r[i]=s[i]);return{$$typeof:us,type:t,key:a,ref:o,props:r,_owner:Bf.current}}function s_(t,e){return{$$typeof:us,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Vf(t){return typeof t=="object"&&t!==null&&t.$$typeof===us}function l_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var ch=/\/+/g;function Fc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?l_(""+t.key):e.toString(36)}function gl(t,e,n,i,r){var a=typeof t;(a==="undefined"||a==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case us:case Kv:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Fc(o,0):i,lh(r)?(n="",t!=null&&(n=t.replace(ch,"$&/")+"/"),gl(r,e,n,"",function(c){return c})):r!=null&&(Vf(r)&&(r=s_(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(ch,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",lh(t))for(var s=0;s<t.length;s++){a=t[s];var l=i+Fc(a,s);o+=gl(a,e,n,l,r)}else if(l=o_(t),typeof l=="function")for(t=l.call(t),s=0;!(a=t.next()).done;)a=a.value,l=i+Fc(a,s++),o+=gl(a,e,n,l,r);else if(a==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ys(t,e,n){if(t==null)return t;var i=[],r=0;return gl(t,i,"","",function(a){return e.call(n,a,r++)}),i}function c_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var sn={current:null},xl={transition:null},u_={ReactCurrentDispatcher:sn,ReactCurrentBatchConfig:xl,ReactCurrentOwner:Bf};function q0(){throw Error("act(...) is not supported in production builds of React.")}je.Children={map:ys,forEach:function(t,e,n){ys(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ys(t,function(){e++}),e},toArray:function(t){return ys(t,function(e){return e})||[]},only:function(t){if(!Vf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};je.Component=$a;je.Fragment=Zv;je.Profiler=Jv;je.PureComponent=zf;je.StrictMode=Qv;je.Suspense=i_;je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=u_;je.act=q0;je.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=V0({},t.props),r=t.key,a=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(a=e.ref,o=Bf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var s=t.type.defaultProps;for(l in e)W0.call(e,l)&&!j0.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&s!==void 0?s[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){s=Array(l);for(var c=0;c<l;c++)s[c]=arguments[c+2];i.children=s}return{$$typeof:us,type:t.type,key:r,ref:a,props:i,_owner:o}};je.createContext=function(t){return t={$$typeof:t_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:e_,_context:t},t.Consumer=t};je.createElement=X0;je.createFactory=function(t){var e=X0.bind(null,t);return e.type=t,e};je.createRef=function(){return{current:null}};je.forwardRef=function(t){return{$$typeof:n_,render:t}};je.isValidElement=Vf;je.lazy=function(t){return{$$typeof:a_,_payload:{_status:-1,_result:t},_init:c_}};je.memo=function(t,e){return{$$typeof:r_,type:t,compare:e===void 0?null:e}};je.startTransition=function(t){var e=xl.transition;xl.transition={};try{t()}finally{xl.transition=e}};je.unstable_act=q0;je.useCallback=function(t,e){return sn.current.useCallback(t,e)};je.useContext=function(t){return sn.current.useContext(t)};je.useDebugValue=function(){};je.useDeferredValue=function(t){return sn.current.useDeferredValue(t)};je.useEffect=function(t,e){return sn.current.useEffect(t,e)};je.useId=function(){return sn.current.useId()};je.useImperativeHandle=function(t,e,n){return sn.current.useImperativeHandle(t,e,n)};je.useInsertionEffect=function(t,e){return sn.current.useInsertionEffect(t,e)};je.useLayoutEffect=function(t,e){return sn.current.useLayoutEffect(t,e)};je.useMemo=function(t,e){return sn.current.useMemo(t,e)};je.useReducer=function(t,e,n){return sn.current.useReducer(t,e,n)};je.useRef=function(t){return sn.current.useRef(t)};je.useState=function(t){return sn.current.useState(t)};je.useSyncExternalStore=function(t,e,n){return sn.current.useSyncExternalStore(t,e,n)};je.useTransition=function(){return sn.current.useTransition()};je.version="18.3.1";k0.exports=je;var ce=k0.exports;const Y0=$v(ce);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d_=ce,f_=Symbol.for("react.element"),p_=Symbol.for("react.fragment"),h_=Object.prototype.hasOwnProperty,m_=d_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,g_={key:!0,ref:!0,__self:!0,__source:!0};function $0(t,e,n){var i,r={},a=null,o=null;n!==void 0&&(a=""+n),e.key!==void 0&&(a=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)h_.call(e,i)&&!g_.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:f_,type:t,key:a,ref:o,props:r,_owner:m_.current}}pc.Fragment=p_;pc.jsx=$0;pc.jsxs=$0;z0.exports=pc;var h=z0.exports,Ju={},K0={exports:{}},Tn={},Z0={exports:{}},Q0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(O,V){var D=O.length;O.push(V);e:for(;0<D;){var X=D-1>>>1,Z=O[X];if(0<r(Z,V))O[X]=V,O[D]=Z,D=X;else break e}}function n(O){return O.length===0?null:O[0]}function i(O){if(O.length===0)return null;var V=O[0],D=O.pop();if(D!==V){O[0]=D;e:for(var X=0,Z=O.length,le=Z>>>1;X<le;){var Fe=2*(X+1)-1,Re=O[Fe],$=Fe+1,se=O[$];if(0>r(Re,D))$<Z&&0>r(se,Re)?(O[X]=se,O[$]=D,X=$):(O[X]=Re,O[Fe]=D,X=Fe);else if($<Z&&0>r(se,D))O[X]=se,O[$]=D,X=$;else break e}}return V}function r(O,V){var D=O.sortIndex-V.sortIndex;return D!==0?D:O.id-V.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;t.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();t.unstable_now=function(){return o.now()-s}}var l=[],c=[],f=1,p=null,d=3,g=!1,_=!1,T=!1,x=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function M(O){for(var V=n(c);V!==null;){if(V.callback===null)i(c);else if(V.startTime<=O)i(c),V.sortIndex=V.expirationTime,e(l,V);else break;V=n(c)}}function S(O){if(T=!1,M(O),!_)if(n(l)!==null)_=!0,K(b);else{var V=n(c);V!==null&&H(S,V.startTime-O)}}function b(O,V){_=!1,T&&(T=!1,u(m),m=-1),g=!0;var D=d;try{for(M(V),p=n(l);p!==null&&(!(p.expirationTime>V)||O&&!I());){var X=p.callback;if(typeof X=="function"){p.callback=null,d=p.priorityLevel;var Z=X(p.expirationTime<=V);V=t.unstable_now(),typeof Z=="function"?p.callback=Z:p===n(l)&&i(l),M(V)}else i(l);p=n(l)}if(p!==null)var le=!0;else{var Fe=n(c);Fe!==null&&H(S,Fe.startTime-V),le=!1}return le}finally{p=null,d=D,g=!1}}var E=!1,C=null,m=-1,R=5,P=-1;function I(){return!(t.unstable_now()-P<R)}function L(){if(C!==null){var O=t.unstable_now();P=O;var V=!0;try{V=C(!0,O)}finally{V?Y():(E=!1,C=null)}}else E=!1}var Y;if(typeof v=="function")Y=function(){v(L)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,k=J.port2;J.port1.onmessage=L,Y=function(){k.postMessage(null)}}else Y=function(){x(L,0)};function K(O){C=O,E||(E=!0,Y())}function H(O,V){m=x(function(){O(t.unstable_now())},V)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(O){O.callback=null},t.unstable_continueExecution=function(){_||g||(_=!0,K(b))},t.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<O?Math.floor(1e3/O):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(O){switch(d){case 1:case 2:case 3:var V=3;break;default:V=d}var D=d;d=V;try{return O()}finally{d=D}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(O,V){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var D=d;d=O;try{return V()}finally{d=D}},t.unstable_scheduleCallback=function(O,V,D){var X=t.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?X+D:X):D=X,O){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=D+Z,O={id:f++,callback:V,priorityLevel:O,startTime:D,expirationTime:Z,sortIndex:-1},D>X?(O.sortIndex=D,e(c,O),n(l)===null&&O===n(c)&&(T?(u(m),m=-1):T=!0,H(S,D-X))):(O.sortIndex=Z,e(l,O),_||g||(_=!0,K(b))),O},t.unstable_shouldYield=I,t.unstable_wrapCallback=function(O){var V=d;return function(){var D=d;d=V;try{return O.apply(this,arguments)}finally{d=D}}}})(Q0);Z0.exports=Q0;var x_=Z0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v_=ce,En=x_;function ae(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var J0=new Set,Go={};function jr(t,e){za(t,e),za(t+"Capture",e)}function za(t,e){for(Go[t]=e,t=0;t<e.length;t++)J0.add(e[t])}var Ii=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ed=Object.prototype.hasOwnProperty,__=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,uh={},dh={};function y_(t){return ed.call(dh,t)?!0:ed.call(uh,t)?!1:__.test(t)?dh[t]=!0:(uh[t]=!0,!1)}function S_(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function M_(t,e,n,i){if(e===null||typeof e>"u"||S_(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ln(t,e,n,i,r,a,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=a,this.removeEmptyString=o}var Xt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Xt[t]=new ln(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Xt[e]=new ln(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Xt[t]=new ln(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Xt[t]=new ln(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Xt[t]=new ln(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Xt[t]=new ln(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Xt[t]=new ln(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Xt[t]=new ln(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Xt[t]=new ln(t,5,!1,t.toLowerCase(),null,!1,!1)});var Hf=/[\-:]([a-z])/g;function Gf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Hf,Gf);Xt[e]=new ln(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Hf,Gf);Xt[e]=new ln(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Hf,Gf);Xt[e]=new ln(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Xt[t]=new ln(t,1,!1,t.toLowerCase(),null,!1,!1)});Xt.xlinkHref=new ln("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Xt[t]=new ln(t,1,!1,t.toLowerCase(),null,!0,!0)});function Wf(t,e,n,i){var r=Xt.hasOwnProperty(e)?Xt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(M_(e,n,r,i)&&(n=null),i||r===null?y_(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Oi=v_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ss=Symbol.for("react.element"),ga=Symbol.for("react.portal"),xa=Symbol.for("react.fragment"),jf=Symbol.for("react.strict_mode"),td=Symbol.for("react.profiler"),eg=Symbol.for("react.provider"),tg=Symbol.for("react.context"),Xf=Symbol.for("react.forward_ref"),nd=Symbol.for("react.suspense"),id=Symbol.for("react.suspense_list"),qf=Symbol.for("react.memo"),Ki=Symbol.for("react.lazy"),ng=Symbol.for("react.offscreen"),fh=Symbol.iterator;function no(t){return t===null||typeof t!="object"?null:(t=fh&&t[fh]||t["@@iterator"],typeof t=="function"?t:null)}var yt=Object.assign,Uc;function Co(t){if(Uc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Uc=e&&e[1]||""}return`
`+Uc+t}var Oc=!1;function zc(t,e){if(!t||Oc)return"";Oc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),a=i.stack.split(`
`),o=r.length-1,s=a.length-1;1<=o&&0<=s&&r[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(r[o]!==a[s]){if(o!==1||s!==1)do if(o--,s--,0>s||r[o]!==a[s]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=s);break}}}finally{Oc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Co(t):""}function E_(t){switch(t.tag){case 5:return Co(t.type);case 16:return Co("Lazy");case 13:return Co("Suspense");case 19:return Co("SuspenseList");case 0:case 2:case 15:return t=zc(t.type,!1),t;case 11:return t=zc(t.type.render,!1),t;case 1:return t=zc(t.type,!0),t;default:return""}}function rd(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case xa:return"Fragment";case ga:return"Portal";case td:return"Profiler";case jf:return"StrictMode";case nd:return"Suspense";case id:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case tg:return(t.displayName||"Context")+".Consumer";case eg:return(t._context.displayName||"Context")+".Provider";case Xf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case qf:return e=t.displayName||null,e!==null?e:rd(t.type)||"Memo";case Ki:e=t._payload,t=t._init;try{return rd(t(e))}catch{}}return null}function T_(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return rd(e);case 8:return e===jf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function pr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ig(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function b_(t){var e=ig(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,a=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,a.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ms(t){t._valueTracker||(t._valueTracker=b_(t))}function rg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=ig(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Nl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function ad(t,e){var n=e.checked;return yt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function ph(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=pr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function ag(t,e){e=e.checked,e!=null&&Wf(t,"checked",e,!1)}function od(t,e){ag(t,e);var n=pr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?sd(t,e.type,n):e.hasOwnProperty("defaultValue")&&sd(t,e.type,pr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function hh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function sd(t,e,n){(e!=="number"||Nl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Ro=Array.isArray;function wa(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+pr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function ld(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ae(91));return yt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function mh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ae(92));if(Ro(n)){if(1<n.length)throw Error(ae(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:pr(n)}}function og(t,e){var n=pr(e.value),i=pr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function gh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function sg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function cd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?sg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Es,lg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Es=Es||document.createElement("div"),Es.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Es.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Wo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Lo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},A_=["Webkit","ms","Moz","O"];Object.keys(Lo).forEach(function(t){A_.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Lo[e]=Lo[t]})});function cg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Lo.hasOwnProperty(t)&&Lo[t]?(""+e).trim():e+"px"}function ug(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=cg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var C_=yt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ud(t,e){if(e){if(C_[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ae(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ae(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ae(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ae(62))}}function dd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var fd=null;function Yf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var pd=null,Pa=null,Ia=null;function xh(t){if(t=ps(t)){if(typeof pd!="function")throw Error(ae(280));var e=t.stateNode;e&&(e=vc(e),pd(t.stateNode,t.type,e))}}function dg(t){Pa?Ia?Ia.push(t):Ia=[t]:Pa=t}function fg(){if(Pa){var t=Pa,e=Ia;if(Ia=Pa=null,xh(t),e)for(t=0;t<e.length;t++)xh(e[t])}}function pg(t,e){return t(e)}function hg(){}var kc=!1;function mg(t,e,n){if(kc)return t(e,n);kc=!0;try{return pg(t,e,n)}finally{kc=!1,(Pa!==null||Ia!==null)&&(hg(),fg())}}function jo(t,e){var n=t.stateNode;if(n===null)return null;var i=vc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ae(231,e,typeof n));return n}var hd=!1;if(Ii)try{var io={};Object.defineProperty(io,"passive",{get:function(){hd=!0}}),window.addEventListener("test",io,io),window.removeEventListener("test",io,io)}catch{hd=!1}function R_(t,e,n,i,r,a,o,s,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var No=!1,Fl=null,Ul=!1,md=null,w_={onError:function(t){No=!0,Fl=t}};function P_(t,e,n,i,r,a,o,s,l){No=!1,Fl=null,R_.apply(w_,arguments)}function I_(t,e,n,i,r,a,o,s,l){if(P_.apply(this,arguments),No){if(No){var c=Fl;No=!1,Fl=null}else throw Error(ae(198));Ul||(Ul=!0,md=c)}}function Xr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function gg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function vh(t){if(Xr(t)!==t)throw Error(ae(188))}function D_(t){var e=t.alternate;if(!e){if(e=Xr(t),e===null)throw Error(ae(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var a=r.alternate;if(a===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===a.child){for(a=r.child;a;){if(a===n)return vh(r),t;if(a===i)return vh(r),e;a=a.sibling}throw Error(ae(188))}if(n.return!==i.return)n=r,i=a;else{for(var o=!1,s=r.child;s;){if(s===n){o=!0,n=r,i=a;break}if(s===i){o=!0,i=r,n=a;break}s=s.sibling}if(!o){for(s=a.child;s;){if(s===n){o=!0,n=a,i=r;break}if(s===i){o=!0,i=a,n=r;break}s=s.sibling}if(!o)throw Error(ae(189))}}if(n.alternate!==i)throw Error(ae(190))}if(n.tag!==3)throw Error(ae(188));return n.stateNode.current===n?t:e}function xg(t){return t=D_(t),t!==null?vg(t):null}function vg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=vg(t);if(e!==null)return e;t=t.sibling}return null}var _g=En.unstable_scheduleCallback,_h=En.unstable_cancelCallback,L_=En.unstable_shouldYield,N_=En.unstable_requestPaint,Rt=En.unstable_now,F_=En.unstable_getCurrentPriorityLevel,$f=En.unstable_ImmediatePriority,yg=En.unstable_UserBlockingPriority,Ol=En.unstable_NormalPriority,U_=En.unstable_LowPriority,Sg=En.unstable_IdlePriority,hc=null,di=null;function O_(t){if(di&&typeof di.onCommitFiberRoot=="function")try{di.onCommitFiberRoot(hc,t,void 0,(t.current.flags&128)===128)}catch{}}var qn=Math.clz32?Math.clz32:B_,z_=Math.log,k_=Math.LN2;function B_(t){return t>>>=0,t===0?32:31-(z_(t)/k_|0)|0}var Ts=64,bs=4194304;function wo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function zl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,a=t.pingedLanes,o=n&268435455;if(o!==0){var s=o&~r;s!==0?i=wo(s):(a&=o,a!==0&&(i=wo(a)))}else o=n&~r,o!==0?i=wo(o):a!==0&&(i=wo(a));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,a=e&-e,r>=a||r===16&&(a&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-qn(e),r=1<<n,i|=t[n],e&=~r;return i}function V_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function H_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,a=t.pendingLanes;0<a;){var o=31-qn(a),s=1<<o,l=r[o];l===-1?(!(s&n)||s&i)&&(r[o]=V_(s,e)):l<=e&&(t.expiredLanes|=s),a&=~s}}function gd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Mg(){var t=Ts;return Ts<<=1,!(Ts&4194240)&&(Ts=64),t}function Bc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ds(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-qn(e),t[e]=n}function G_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-qn(n),a=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~a}}function Kf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-qn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var it=0;function Eg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Tg,Zf,bg,Ag,Cg,xd=!1,As=[],rr=null,ar=null,or=null,Xo=new Map,qo=new Map,Qi=[],W_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function yh(t,e){switch(t){case"focusin":case"focusout":rr=null;break;case"dragenter":case"dragleave":ar=null;break;case"mouseover":case"mouseout":or=null;break;case"pointerover":case"pointerout":Xo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":qo.delete(e.pointerId)}}function ro(t,e,n,i,r,a){return t===null||t.nativeEvent!==a?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[r]},e!==null&&(e=ps(e),e!==null&&Zf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function j_(t,e,n,i,r){switch(e){case"focusin":return rr=ro(rr,t,e,n,i,r),!0;case"dragenter":return ar=ro(ar,t,e,n,i,r),!0;case"mouseover":return or=ro(or,t,e,n,i,r),!0;case"pointerover":var a=r.pointerId;return Xo.set(a,ro(Xo.get(a)||null,t,e,n,i,r)),!0;case"gotpointercapture":return a=r.pointerId,qo.set(a,ro(qo.get(a)||null,t,e,n,i,r)),!0}return!1}function Rg(t){var e=Ir(t.target);if(e!==null){var n=Xr(e);if(n!==null){if(e=n.tag,e===13){if(e=gg(n),e!==null){t.blockedOn=e,Cg(t.priority,function(){bg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function vl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=vd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);fd=i,n.target.dispatchEvent(i),fd=null}else return e=ps(n),e!==null&&Zf(e),t.blockedOn=n,!1;e.shift()}return!0}function Sh(t,e,n){vl(t)&&n.delete(e)}function X_(){xd=!1,rr!==null&&vl(rr)&&(rr=null),ar!==null&&vl(ar)&&(ar=null),or!==null&&vl(or)&&(or=null),Xo.forEach(Sh),qo.forEach(Sh)}function ao(t,e){t.blockedOn===e&&(t.blockedOn=null,xd||(xd=!0,En.unstable_scheduleCallback(En.unstable_NormalPriority,X_)))}function Yo(t){function e(r){return ao(r,t)}if(0<As.length){ao(As[0],t);for(var n=1;n<As.length;n++){var i=As[n];i.blockedOn===t&&(i.blockedOn=null)}}for(rr!==null&&ao(rr,t),ar!==null&&ao(ar,t),or!==null&&ao(or,t),Xo.forEach(e),qo.forEach(e),n=0;n<Qi.length;n++)i=Qi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Qi.length&&(n=Qi[0],n.blockedOn===null);)Rg(n),n.blockedOn===null&&Qi.shift()}var Da=Oi.ReactCurrentBatchConfig,kl=!0;function q_(t,e,n,i){var r=it,a=Da.transition;Da.transition=null;try{it=1,Qf(t,e,n,i)}finally{it=r,Da.transition=a}}function Y_(t,e,n,i){var r=it,a=Da.transition;Da.transition=null;try{it=4,Qf(t,e,n,i)}finally{it=r,Da.transition=a}}function Qf(t,e,n,i){if(kl){var r=vd(t,e,n,i);if(r===null)Kc(t,e,i,Bl,n),yh(t,i);else if(j_(r,t,e,n,i))i.stopPropagation();else if(yh(t,i),e&4&&-1<W_.indexOf(t)){for(;r!==null;){var a=ps(r);if(a!==null&&Tg(a),a=vd(t,e,n,i),a===null&&Kc(t,e,i,Bl,n),a===r)break;r=a}r!==null&&i.stopPropagation()}else Kc(t,e,i,null,n)}}var Bl=null;function vd(t,e,n,i){if(Bl=null,t=Yf(i),t=Ir(t),t!==null)if(e=Xr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=gg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Bl=t,null}function wg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(F_()){case $f:return 1;case yg:return 4;case Ol:case U_:return 16;case Sg:return 536870912;default:return 16}default:return 16}}var tr=null,Jf=null,_l=null;function Pg(){if(_l)return _l;var t,e=Jf,n=e.length,i,r="value"in tr?tr.value:tr.textContent,a=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[a-i];i++);return _l=r.slice(t,1<i?1-i:void 0)}function yl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Cs(){return!0}function Mh(){return!1}function bn(t){function e(n,i,r,a,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var s in t)t.hasOwnProperty(s)&&(n=t[s],this[s]=n?n(a):a[s]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Cs:Mh,this.isPropagationStopped=Mh,this}return yt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Cs)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Cs)},persist:function(){},isPersistent:Cs}),e}var Ka={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ep=bn(Ka),fs=yt({},Ka,{view:0,detail:0}),$_=bn(fs),Vc,Hc,oo,mc=yt({},fs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:tp,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==oo&&(oo&&t.type==="mousemove"?(Vc=t.screenX-oo.screenX,Hc=t.screenY-oo.screenY):Hc=Vc=0,oo=t),Vc)},movementY:function(t){return"movementY"in t?t.movementY:Hc}}),Eh=bn(mc),K_=yt({},mc,{dataTransfer:0}),Z_=bn(K_),Q_=yt({},fs,{relatedTarget:0}),Gc=bn(Q_),J_=yt({},Ka,{animationName:0,elapsedTime:0,pseudoElement:0}),ey=bn(J_),ty=yt({},Ka,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ny=bn(ty),iy=yt({},Ka,{data:0}),Th=bn(iy),ry={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ay={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},oy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function sy(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=oy[t])?!!e[t]:!1}function tp(){return sy}var ly=yt({},fs,{key:function(t){if(t.key){var e=ry[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=yl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ay[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:tp,charCode:function(t){return t.type==="keypress"?yl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?yl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),cy=bn(ly),uy=yt({},mc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bh=bn(uy),dy=yt({},fs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:tp}),fy=bn(dy),py=yt({},Ka,{propertyName:0,elapsedTime:0,pseudoElement:0}),hy=bn(py),my=yt({},mc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),gy=bn(my),xy=[9,13,27,32],np=Ii&&"CompositionEvent"in window,Fo=null;Ii&&"documentMode"in document&&(Fo=document.documentMode);var vy=Ii&&"TextEvent"in window&&!Fo,Ig=Ii&&(!np||Fo&&8<Fo&&11>=Fo),Ah=" ",Ch=!1;function Dg(t,e){switch(t){case"keyup":return xy.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Lg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var va=!1;function _y(t,e){switch(t){case"compositionend":return Lg(e);case"keypress":return e.which!==32?null:(Ch=!0,Ah);case"textInput":return t=e.data,t===Ah&&Ch?null:t;default:return null}}function yy(t,e){if(va)return t==="compositionend"||!np&&Dg(t,e)?(t=Pg(),_l=Jf=tr=null,va=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Ig&&e.locale!=="ko"?null:e.data;default:return null}}var Sy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Sy[t.type]:e==="textarea"}function Ng(t,e,n,i){dg(i),e=Vl(e,"onChange"),0<e.length&&(n=new ep("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Uo=null,$o=null;function My(t){jg(t,0)}function gc(t){var e=Sa(t);if(rg(e))return t}function Ey(t,e){if(t==="change")return e}var Fg=!1;if(Ii){var Wc;if(Ii){var jc="oninput"in document;if(!jc){var wh=document.createElement("div");wh.setAttribute("oninput","return;"),jc=typeof wh.oninput=="function"}Wc=jc}else Wc=!1;Fg=Wc&&(!document.documentMode||9<document.documentMode)}function Ph(){Uo&&(Uo.detachEvent("onpropertychange",Ug),$o=Uo=null)}function Ug(t){if(t.propertyName==="value"&&gc($o)){var e=[];Ng(e,$o,t,Yf(t)),mg(My,e)}}function Ty(t,e,n){t==="focusin"?(Ph(),Uo=e,$o=n,Uo.attachEvent("onpropertychange",Ug)):t==="focusout"&&Ph()}function by(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return gc($o)}function Ay(t,e){if(t==="click")return gc(e)}function Cy(t,e){if(t==="input"||t==="change")return gc(e)}function Ry(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var $n=typeof Object.is=="function"?Object.is:Ry;function Ko(t,e){if($n(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!ed.call(e,r)||!$n(t[r],e[r]))return!1}return!0}function Ih(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Dh(t,e){var n=Ih(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ih(n)}}function Og(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Og(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function zg(){for(var t=window,e=Nl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Nl(t.document)}return e}function ip(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function wy(t){var e=zg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Og(n.ownerDocument.documentElement,n)){if(i!==null&&ip(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,a=Math.min(i.start,r);i=i.end===void 0?a:Math.min(i.end,r),!t.extend&&a>i&&(r=i,i=a,a=r),r=Dh(n,a);var o=Dh(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),a>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Py=Ii&&"documentMode"in document&&11>=document.documentMode,_a=null,_d=null,Oo=null,yd=!1;function Lh(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;yd||_a==null||_a!==Nl(i)||(i=_a,"selectionStart"in i&&ip(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Oo&&Ko(Oo,i)||(Oo=i,i=Vl(_d,"onSelect"),0<i.length&&(e=new ep("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=_a)))}function Rs(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ya={animationend:Rs("Animation","AnimationEnd"),animationiteration:Rs("Animation","AnimationIteration"),animationstart:Rs("Animation","AnimationStart"),transitionend:Rs("Transition","TransitionEnd")},Xc={},kg={};Ii&&(kg=document.createElement("div").style,"AnimationEvent"in window||(delete ya.animationend.animation,delete ya.animationiteration.animation,delete ya.animationstart.animation),"TransitionEvent"in window||delete ya.transitionend.transition);function xc(t){if(Xc[t])return Xc[t];if(!ya[t])return t;var e=ya[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in kg)return Xc[t]=e[n];return t}var Bg=xc("animationend"),Vg=xc("animationiteration"),Hg=xc("animationstart"),Gg=xc("transitionend"),Wg=new Map,Nh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function xr(t,e){Wg.set(t,e),jr(e,[t])}for(var qc=0;qc<Nh.length;qc++){var Yc=Nh[qc],Iy=Yc.toLowerCase(),Dy=Yc[0].toUpperCase()+Yc.slice(1);xr(Iy,"on"+Dy)}xr(Bg,"onAnimationEnd");xr(Vg,"onAnimationIteration");xr(Hg,"onAnimationStart");xr("dblclick","onDoubleClick");xr("focusin","onFocus");xr("focusout","onBlur");xr(Gg,"onTransitionEnd");za("onMouseEnter",["mouseout","mouseover"]);za("onMouseLeave",["mouseout","mouseover"]);za("onPointerEnter",["pointerout","pointerover"]);za("onPointerLeave",["pointerout","pointerover"]);jr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));jr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));jr("onBeforeInput",["compositionend","keypress","textInput","paste"]);jr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));jr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));jr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Po="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ly=new Set("cancel close invalid load scroll toggle".split(" ").concat(Po));function Fh(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,I_(i,e,void 0,t),t.currentTarget=null}function jg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var a=void 0;if(e)for(var o=i.length-1;0<=o;o--){var s=i[o],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==a&&r.isPropagationStopped())break e;Fh(r,s,c),a=l}else for(o=0;o<i.length;o++){if(s=i[o],l=s.instance,c=s.currentTarget,s=s.listener,l!==a&&r.isPropagationStopped())break e;Fh(r,s,c),a=l}}}if(Ul)throw t=md,Ul=!1,md=null,t}function dt(t,e){var n=e[bd];n===void 0&&(n=e[bd]=new Set);var i=t+"__bubble";n.has(i)||(Xg(e,t,2,!1),n.add(i))}function $c(t,e,n){var i=0;e&&(i|=4),Xg(n,t,i,e)}var ws="_reactListening"+Math.random().toString(36).slice(2);function Zo(t){if(!t[ws]){t[ws]=!0,J0.forEach(function(n){n!=="selectionchange"&&(Ly.has(n)||$c(n,!1,t),$c(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ws]||(e[ws]=!0,$c("selectionchange",!1,e))}}function Xg(t,e,n,i){switch(wg(e)){case 1:var r=q_;break;case 4:r=Y_;break;default:r=Qf}n=r.bind(null,e,n,t),r=void 0,!hd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Kc(t,e,n,i,r){var a=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var s=i.stateNode.containerInfo;if(s===r||s.nodeType===8&&s.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;s!==null;){if(o=Ir(s),o===null)return;if(l=o.tag,l===5||l===6){i=a=o;continue e}s=s.parentNode}}i=i.return}mg(function(){var c=a,f=Yf(n),p=[];e:{var d=Wg.get(t);if(d!==void 0){var g=ep,_=t;switch(t){case"keypress":if(yl(n)===0)break e;case"keydown":case"keyup":g=cy;break;case"focusin":_="focus",g=Gc;break;case"focusout":_="blur",g=Gc;break;case"beforeblur":case"afterblur":g=Gc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=Eh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=Z_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=fy;break;case Bg:case Vg:case Hg:g=ey;break;case Gg:g=hy;break;case"scroll":g=$_;break;case"wheel":g=gy;break;case"copy":case"cut":case"paste":g=ny;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=bh}var T=(e&4)!==0,x=!T&&t==="scroll",u=T?d!==null?d+"Capture":null:d;T=[];for(var v=c,M;v!==null;){M=v;var S=M.stateNode;if(M.tag===5&&S!==null&&(M=S,u!==null&&(S=jo(v,u),S!=null&&T.push(Qo(v,S,M)))),x)break;v=v.return}0<T.length&&(d=new g(d,_,null,n,f),p.push({event:d,listeners:T}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",g=t==="mouseout"||t==="pointerout",d&&n!==fd&&(_=n.relatedTarget||n.fromElement)&&(Ir(_)||_[Di]))break e;if((g||d)&&(d=f.window===f?f:(d=f.ownerDocument)?d.defaultView||d.parentWindow:window,g?(_=n.relatedTarget||n.toElement,g=c,_=_?Ir(_):null,_!==null&&(x=Xr(_),_!==x||_.tag!==5&&_.tag!==6)&&(_=null)):(g=null,_=c),g!==_)){if(T=Eh,S="onMouseLeave",u="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(T=bh,S="onPointerLeave",u="onPointerEnter",v="pointer"),x=g==null?d:Sa(g),M=_==null?d:Sa(_),d=new T(S,v+"leave",g,n,f),d.target=x,d.relatedTarget=M,S=null,Ir(f)===c&&(T=new T(u,v+"enter",_,n,f),T.target=M,T.relatedTarget=x,S=T),x=S,g&&_)t:{for(T=g,u=_,v=0,M=T;M;M=Kr(M))v++;for(M=0,S=u;S;S=Kr(S))M++;for(;0<v-M;)T=Kr(T),v--;for(;0<M-v;)u=Kr(u),M--;for(;v--;){if(T===u||u!==null&&T===u.alternate)break t;T=Kr(T),u=Kr(u)}T=null}else T=null;g!==null&&Uh(p,d,g,T,!1),_!==null&&x!==null&&Uh(p,x,_,T,!0)}}e:{if(d=c?Sa(c):window,g=d.nodeName&&d.nodeName.toLowerCase(),g==="select"||g==="input"&&d.type==="file")var b=Ey;else if(Rh(d))if(Fg)b=Cy;else{b=by;var E=Ty}else(g=d.nodeName)&&g.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(b=Ay);if(b&&(b=b(t,c))){Ng(p,b,n,f);break e}E&&E(t,d,c),t==="focusout"&&(E=d._wrapperState)&&E.controlled&&d.type==="number"&&sd(d,"number",d.value)}switch(E=c?Sa(c):window,t){case"focusin":(Rh(E)||E.contentEditable==="true")&&(_a=E,_d=c,Oo=null);break;case"focusout":Oo=_d=_a=null;break;case"mousedown":yd=!0;break;case"contextmenu":case"mouseup":case"dragend":yd=!1,Lh(p,n,f);break;case"selectionchange":if(Py)break;case"keydown":case"keyup":Lh(p,n,f)}var C;if(np)e:{switch(t){case"compositionstart":var m="onCompositionStart";break e;case"compositionend":m="onCompositionEnd";break e;case"compositionupdate":m="onCompositionUpdate";break e}m=void 0}else va?Dg(t,n)&&(m="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(m="onCompositionStart");m&&(Ig&&n.locale!=="ko"&&(va||m!=="onCompositionStart"?m==="onCompositionEnd"&&va&&(C=Pg()):(tr=f,Jf="value"in tr?tr.value:tr.textContent,va=!0)),E=Vl(c,m),0<E.length&&(m=new Th(m,t,null,n,f),p.push({event:m,listeners:E}),C?m.data=C:(C=Lg(n),C!==null&&(m.data=C)))),(C=vy?_y(t,n):yy(t,n))&&(c=Vl(c,"onBeforeInput"),0<c.length&&(f=new Th("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:c}),f.data=C))}jg(p,e)})}function Qo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Vl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,a=r.stateNode;r.tag===5&&a!==null&&(r=a,a=jo(t,n),a!=null&&i.unshift(Qo(t,a,r)),a=jo(t,e),a!=null&&i.push(Qo(t,a,r))),t=t.return}return i}function Kr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Uh(t,e,n,i,r){for(var a=e._reactName,o=[];n!==null&&n!==i;){var s=n,l=s.alternate,c=s.stateNode;if(l!==null&&l===i)break;s.tag===5&&c!==null&&(s=c,r?(l=jo(n,a),l!=null&&o.unshift(Qo(n,l,s))):r||(l=jo(n,a),l!=null&&o.push(Qo(n,l,s)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Ny=/\r\n?/g,Fy=/\u0000|\uFFFD/g;function Oh(t){return(typeof t=="string"?t:""+t).replace(Ny,`
`).replace(Fy,"")}function Ps(t,e,n){if(e=Oh(e),Oh(t)!==e&&n)throw Error(ae(425))}function Hl(){}var Sd=null,Md=null;function Ed(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Td=typeof setTimeout=="function"?setTimeout:void 0,Uy=typeof clearTimeout=="function"?clearTimeout:void 0,zh=typeof Promise=="function"?Promise:void 0,Oy=typeof queueMicrotask=="function"?queueMicrotask:typeof zh<"u"?function(t){return zh.resolve(null).then(t).catch(zy)}:Td;function zy(t){setTimeout(function(){throw t})}function Zc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Yo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Yo(e)}function sr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function kh(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Za=Math.random().toString(36).slice(2),si="__reactFiber$"+Za,Jo="__reactProps$"+Za,Di="__reactContainer$"+Za,bd="__reactEvents$"+Za,ky="__reactListeners$"+Za,By="__reactHandles$"+Za;function Ir(t){var e=t[si];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Di]||n[si]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=kh(t);t!==null;){if(n=t[si])return n;t=kh(t)}return e}t=n,n=t.parentNode}return null}function ps(t){return t=t[si]||t[Di],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Sa(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ae(33))}function vc(t){return t[Jo]||null}var Ad=[],Ma=-1;function vr(t){return{current:t}}function ft(t){0>Ma||(t.current=Ad[Ma],Ad[Ma]=null,Ma--)}function ct(t,e){Ma++,Ad[Ma]=t.current,t.current=e}var hr={},nn=vr(hr),fn=vr(!1),zr=hr;function ka(t,e){var n=t.type.contextTypes;if(!n)return hr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},a;for(a in n)r[a]=e[a];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function pn(t){return t=t.childContextTypes,t!=null}function Gl(){ft(fn),ft(nn)}function Bh(t,e,n){if(nn.current!==hr)throw Error(ae(168));ct(nn,e),ct(fn,n)}function qg(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ae(108,T_(t)||"Unknown",r));return yt({},n,i)}function Wl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||hr,zr=nn.current,ct(nn,t),ct(fn,fn.current),!0}function Vh(t,e,n){var i=t.stateNode;if(!i)throw Error(ae(169));n?(t=qg(t,e,zr),i.__reactInternalMemoizedMergedChildContext=t,ft(fn),ft(nn),ct(nn,t)):ft(fn),ct(fn,n)}var Ti=null,_c=!1,Qc=!1;function Yg(t){Ti===null?Ti=[t]:Ti.push(t)}function Vy(t){_c=!0,Yg(t)}function _r(){if(!Qc&&Ti!==null){Qc=!0;var t=0,e=it;try{var n=Ti;for(it=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ti=null,_c=!1}catch(r){throw Ti!==null&&(Ti=Ti.slice(t+1)),_g($f,_r),r}finally{it=e,Qc=!1}}return null}var Ea=[],Ta=0,jl=null,Xl=0,Pn=[],In=0,kr=null,bi=1,Ai="";function br(t,e){Ea[Ta++]=Xl,Ea[Ta++]=jl,jl=t,Xl=e}function $g(t,e,n){Pn[In++]=bi,Pn[In++]=Ai,Pn[In++]=kr,kr=t;var i=bi;t=Ai;var r=32-qn(i)-1;i&=~(1<<r),n+=1;var a=32-qn(e)+r;if(30<a){var o=r-r%5;a=(i&(1<<o)-1).toString(32),i>>=o,r-=o,bi=1<<32-qn(e)+r|n<<r|i,Ai=a+t}else bi=1<<a|n<<r|i,Ai=t}function rp(t){t.return!==null&&(br(t,1),$g(t,1,0))}function ap(t){for(;t===jl;)jl=Ea[--Ta],Ea[Ta]=null,Xl=Ea[--Ta],Ea[Ta]=null;for(;t===kr;)kr=Pn[--In],Pn[In]=null,Ai=Pn[--In],Pn[In]=null,bi=Pn[--In],Pn[In]=null}var Mn=null,Sn=null,ht=!1,Wn=null;function Kg(t,e){var n=Ln(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Hh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Mn=t,Sn=sr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Mn=t,Sn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=kr!==null?{id:bi,overflow:Ai}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Ln(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Mn=t,Sn=null,!0):!1;default:return!1}}function Cd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Rd(t){if(ht){var e=Sn;if(e){var n=e;if(!Hh(t,e)){if(Cd(t))throw Error(ae(418));e=sr(n.nextSibling);var i=Mn;e&&Hh(t,e)?Kg(i,n):(t.flags=t.flags&-4097|2,ht=!1,Mn=t)}}else{if(Cd(t))throw Error(ae(418));t.flags=t.flags&-4097|2,ht=!1,Mn=t}}}function Gh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Mn=t}function Is(t){if(t!==Mn)return!1;if(!ht)return Gh(t),ht=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Ed(t.type,t.memoizedProps)),e&&(e=Sn)){if(Cd(t))throw Zg(),Error(ae(418));for(;e;)Kg(t,e),e=sr(e.nextSibling)}if(Gh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ae(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Sn=sr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Sn=null}}else Sn=Mn?sr(t.stateNode.nextSibling):null;return!0}function Zg(){for(var t=Sn;t;)t=sr(t.nextSibling)}function Ba(){Sn=Mn=null,ht=!1}function op(t){Wn===null?Wn=[t]:Wn.push(t)}var Hy=Oi.ReactCurrentBatchConfig;function so(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ae(309));var i=n.stateNode}if(!i)throw Error(ae(147,t));var r=i,a=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===a?e.ref:(e=function(o){var s=r.refs;o===null?delete s[a]:s[a]=o},e._stringRef=a,e)}if(typeof t!="string")throw Error(ae(284));if(!n._owner)throw Error(ae(290,t))}return t}function Ds(t,e){throw t=Object.prototype.toString.call(e),Error(ae(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Wh(t){var e=t._init;return e(t._payload)}function Qg(t){function e(u,v){if(t){var M=u.deletions;M===null?(u.deletions=[v],u.flags|=16):M.push(v)}}function n(u,v){if(!t)return null;for(;v!==null;)e(u,v),v=v.sibling;return null}function i(u,v){for(u=new Map;v!==null;)v.key!==null?u.set(v.key,v):u.set(v.index,v),v=v.sibling;return u}function r(u,v){return u=dr(u,v),u.index=0,u.sibling=null,u}function a(u,v,M){return u.index=M,t?(M=u.alternate,M!==null?(M=M.index,M<v?(u.flags|=2,v):M):(u.flags|=2,v)):(u.flags|=1048576,v)}function o(u){return t&&u.alternate===null&&(u.flags|=2),u}function s(u,v,M,S){return v===null||v.tag!==6?(v=au(M,u.mode,S),v.return=u,v):(v=r(v,M),v.return=u,v)}function l(u,v,M,S){var b=M.type;return b===xa?f(u,v,M.props.children,S,M.key):v!==null&&(v.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ki&&Wh(b)===v.type)?(S=r(v,M.props),S.ref=so(u,v,M),S.return=u,S):(S=Cl(M.type,M.key,M.props,null,u.mode,S),S.ref=so(u,v,M),S.return=u,S)}function c(u,v,M,S){return v===null||v.tag!==4||v.stateNode.containerInfo!==M.containerInfo||v.stateNode.implementation!==M.implementation?(v=ou(M,u.mode,S),v.return=u,v):(v=r(v,M.children||[]),v.return=u,v)}function f(u,v,M,S,b){return v===null||v.tag!==7?(v=Or(M,u.mode,S,b),v.return=u,v):(v=r(v,M),v.return=u,v)}function p(u,v,M){if(typeof v=="string"&&v!==""||typeof v=="number")return v=au(""+v,u.mode,M),v.return=u,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ss:return M=Cl(v.type,v.key,v.props,null,u.mode,M),M.ref=so(u,null,v),M.return=u,M;case ga:return v=ou(v,u.mode,M),v.return=u,v;case Ki:var S=v._init;return p(u,S(v._payload),M)}if(Ro(v)||no(v))return v=Or(v,u.mode,M,null),v.return=u,v;Ds(u,v)}return null}function d(u,v,M,S){var b=v!==null?v.key:null;if(typeof M=="string"&&M!==""||typeof M=="number")return b!==null?null:s(u,v,""+M,S);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Ss:return M.key===b?l(u,v,M,S):null;case ga:return M.key===b?c(u,v,M,S):null;case Ki:return b=M._init,d(u,v,b(M._payload),S)}if(Ro(M)||no(M))return b!==null?null:f(u,v,M,S,null);Ds(u,M)}return null}function g(u,v,M,S,b){if(typeof S=="string"&&S!==""||typeof S=="number")return u=u.get(M)||null,s(v,u,""+S,b);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Ss:return u=u.get(S.key===null?M:S.key)||null,l(v,u,S,b);case ga:return u=u.get(S.key===null?M:S.key)||null,c(v,u,S,b);case Ki:var E=S._init;return g(u,v,M,E(S._payload),b)}if(Ro(S)||no(S))return u=u.get(M)||null,f(v,u,S,b,null);Ds(v,S)}return null}function _(u,v,M,S){for(var b=null,E=null,C=v,m=v=0,R=null;C!==null&&m<M.length;m++){C.index>m?(R=C,C=null):R=C.sibling;var P=d(u,C,M[m],S);if(P===null){C===null&&(C=R);break}t&&C&&P.alternate===null&&e(u,C),v=a(P,v,m),E===null?b=P:E.sibling=P,E=P,C=R}if(m===M.length)return n(u,C),ht&&br(u,m),b;if(C===null){for(;m<M.length;m++)C=p(u,M[m],S),C!==null&&(v=a(C,v,m),E===null?b=C:E.sibling=C,E=C);return ht&&br(u,m),b}for(C=i(u,C);m<M.length;m++)R=g(C,u,m,M[m],S),R!==null&&(t&&R.alternate!==null&&C.delete(R.key===null?m:R.key),v=a(R,v,m),E===null?b=R:E.sibling=R,E=R);return t&&C.forEach(function(I){return e(u,I)}),ht&&br(u,m),b}function T(u,v,M,S){var b=no(M);if(typeof b!="function")throw Error(ae(150));if(M=b.call(M),M==null)throw Error(ae(151));for(var E=b=null,C=v,m=v=0,R=null,P=M.next();C!==null&&!P.done;m++,P=M.next()){C.index>m?(R=C,C=null):R=C.sibling;var I=d(u,C,P.value,S);if(I===null){C===null&&(C=R);break}t&&C&&I.alternate===null&&e(u,C),v=a(I,v,m),E===null?b=I:E.sibling=I,E=I,C=R}if(P.done)return n(u,C),ht&&br(u,m),b;if(C===null){for(;!P.done;m++,P=M.next())P=p(u,P.value,S),P!==null&&(v=a(P,v,m),E===null?b=P:E.sibling=P,E=P);return ht&&br(u,m),b}for(C=i(u,C);!P.done;m++,P=M.next())P=g(C,u,m,P.value,S),P!==null&&(t&&P.alternate!==null&&C.delete(P.key===null?m:P.key),v=a(P,v,m),E===null?b=P:E.sibling=P,E=P);return t&&C.forEach(function(L){return e(u,L)}),ht&&br(u,m),b}function x(u,v,M,S){if(typeof M=="object"&&M!==null&&M.type===xa&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case Ss:e:{for(var b=M.key,E=v;E!==null;){if(E.key===b){if(b=M.type,b===xa){if(E.tag===7){n(u,E.sibling),v=r(E,M.props.children),v.return=u,u=v;break e}}else if(E.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ki&&Wh(b)===E.type){n(u,E.sibling),v=r(E,M.props),v.ref=so(u,E,M),v.return=u,u=v;break e}n(u,E);break}else e(u,E);E=E.sibling}M.type===xa?(v=Or(M.props.children,u.mode,S,M.key),v.return=u,u=v):(S=Cl(M.type,M.key,M.props,null,u.mode,S),S.ref=so(u,v,M),S.return=u,u=S)}return o(u);case ga:e:{for(E=M.key;v!==null;){if(v.key===E)if(v.tag===4&&v.stateNode.containerInfo===M.containerInfo&&v.stateNode.implementation===M.implementation){n(u,v.sibling),v=r(v,M.children||[]),v.return=u,u=v;break e}else{n(u,v);break}else e(u,v);v=v.sibling}v=ou(M,u.mode,S),v.return=u,u=v}return o(u);case Ki:return E=M._init,x(u,v,E(M._payload),S)}if(Ro(M))return _(u,v,M,S);if(no(M))return T(u,v,M,S);Ds(u,M)}return typeof M=="string"&&M!==""||typeof M=="number"?(M=""+M,v!==null&&v.tag===6?(n(u,v.sibling),v=r(v,M),v.return=u,u=v):(n(u,v),v=au(M,u.mode,S),v.return=u,u=v),o(u)):n(u,v)}return x}var Va=Qg(!0),Jg=Qg(!1),ql=vr(null),Yl=null,ba=null,sp=null;function lp(){sp=ba=Yl=null}function cp(t){var e=ql.current;ft(ql),t._currentValue=e}function wd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function La(t,e){Yl=t,sp=ba=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(dn=!0),t.firstContext=null)}function Fn(t){var e=t._currentValue;if(sp!==t)if(t={context:t,memoizedValue:e,next:null},ba===null){if(Yl===null)throw Error(ae(308));ba=t,Yl.dependencies={lanes:0,firstContext:t}}else ba=ba.next=t;return e}var Dr=null;function up(t){Dr===null?Dr=[t]:Dr.push(t)}function ex(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,up(e)):(n.next=r.next,r.next=n),e.interleaved=n,Li(t,i)}function Li(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Zi=!1;function dp(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function tx(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ri(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function lr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Je&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Li(t,n)}return r=i.interleaved,r===null?(e.next=e,up(i)):(e.next=r.next,r.next=e),i.interleaved=e,Li(t,n)}function Sl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Kf(t,n)}}function jh(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?r=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?r=a=e:a=a.next=e}else r=a=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:a,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function $l(t,e,n,i){var r=t.updateQueue;Zi=!1;var a=r.firstBaseUpdate,o=r.lastBaseUpdate,s=r.shared.pending;if(s!==null){r.shared.pending=null;var l=s,c=l.next;l.next=null,o===null?a=c:o.next=c,o=l;var f=t.alternate;f!==null&&(f=f.updateQueue,s=f.lastBaseUpdate,s!==o&&(s===null?f.firstBaseUpdate=c:s.next=c,f.lastBaseUpdate=l))}if(a!==null){var p=r.baseState;o=0,f=c=l=null,s=a;do{var d=s.lane,g=s.eventTime;if((i&d)===d){f!==null&&(f=f.next={eventTime:g,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var _=t,T=s;switch(d=e,g=n,T.tag){case 1:if(_=T.payload,typeof _=="function"){p=_.call(g,p,d);break e}p=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=T.payload,d=typeof _=="function"?_.call(g,p,d):_,d==null)break e;p=yt({},p,d);break e;case 2:Zi=!0}}s.callback!==null&&s.lane!==0&&(t.flags|=64,d=r.effects,d===null?r.effects=[s]:d.push(s))}else g={eventTime:g,lane:d,tag:s.tag,payload:s.payload,callback:s.callback,next:null},f===null?(c=f=g,l=p):f=f.next=g,o|=d;if(s=s.next,s===null){if(s=r.shared.pending,s===null)break;d=s,s=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(f===null&&(l=p),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else a===null&&(r.shared.lanes=0);Vr|=o,t.lanes=o,t.memoizedState=p}}function Xh(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ae(191,r));r.call(i)}}}var hs={},fi=vr(hs),es=vr(hs),ts=vr(hs);function Lr(t){if(t===hs)throw Error(ae(174));return t}function fp(t,e){switch(ct(ts,e),ct(es,t),ct(fi,hs),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:cd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=cd(e,t)}ft(fi),ct(fi,e)}function Ha(){ft(fi),ft(es),ft(ts)}function nx(t){Lr(ts.current);var e=Lr(fi.current),n=cd(e,t.type);e!==n&&(ct(es,t),ct(fi,n))}function pp(t){es.current===t&&(ft(fi),ft(es))}var gt=vr(0);function Kl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Jc=[];function hp(){for(var t=0;t<Jc.length;t++)Jc[t]._workInProgressVersionPrimary=null;Jc.length=0}var Ml=Oi.ReactCurrentDispatcher,eu=Oi.ReactCurrentBatchConfig,Br=0,vt=null,Nt=null,kt=null,Zl=!1,zo=!1,ns=0,Gy=0;function Yt(){throw Error(ae(321))}function mp(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!$n(t[n],e[n]))return!1;return!0}function gp(t,e,n,i,r,a){if(Br=a,vt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ml.current=t===null||t.memoizedState===null?qy:Yy,t=n(i,r),zo){a=0;do{if(zo=!1,ns=0,25<=a)throw Error(ae(301));a+=1,kt=Nt=null,e.updateQueue=null,Ml.current=$y,t=n(i,r)}while(zo)}if(Ml.current=Ql,e=Nt!==null&&Nt.next!==null,Br=0,kt=Nt=vt=null,Zl=!1,e)throw Error(ae(300));return t}function xp(){var t=ns!==0;return ns=0,t}function ai(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return kt===null?vt.memoizedState=kt=t:kt=kt.next=t,kt}function Un(){if(Nt===null){var t=vt.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=kt===null?vt.memoizedState:kt.next;if(e!==null)kt=e,Nt=t;else{if(t===null)throw Error(ae(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},kt===null?vt.memoizedState=kt=t:kt=kt.next=t}return kt}function is(t,e){return typeof e=="function"?e(t):e}function tu(t){var e=Un(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=Nt,r=i.baseQueue,a=n.pending;if(a!==null){if(r!==null){var o=r.next;r.next=a.next,a.next=o}i.baseQueue=r=a,n.pending=null}if(r!==null){a=r.next,i=i.baseState;var s=o=null,l=null,c=a;do{var f=c.lane;if((Br&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var p={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(s=l=p,o=i):l=l.next=p,vt.lanes|=f,Vr|=f}c=c.next}while(c!==null&&c!==a);l===null?o=i:l.next=s,$n(i,e.memoizedState)||(dn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do a=r.lane,vt.lanes|=a,Vr|=a,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function nu(t){var e=Un(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,a=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do a=t(a,o.action),o=o.next;while(o!==r);$n(a,e.memoizedState)||(dn=!0),e.memoizedState=a,e.baseQueue===null&&(e.baseState=a),n.lastRenderedState=a}return[a,i]}function ix(){}function rx(t,e){var n=vt,i=Un(),r=e(),a=!$n(i.memoizedState,r);if(a&&(i.memoizedState=r,dn=!0),i=i.queue,vp(sx.bind(null,n,i,t),[t]),i.getSnapshot!==e||a||kt!==null&&kt.memoizedState.tag&1){if(n.flags|=2048,rs(9,ox.bind(null,n,i,r,e),void 0,null),Bt===null)throw Error(ae(349));Br&30||ax(n,e,r)}return r}function ax(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function ox(t,e,n,i){e.value=n,e.getSnapshot=i,lx(e)&&cx(t)}function sx(t,e,n){return n(function(){lx(e)&&cx(t)})}function lx(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!$n(t,n)}catch{return!0}}function cx(t){var e=Li(t,1);e!==null&&Yn(e,t,1,-1)}function qh(t){var e=ai();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:is,lastRenderedState:t},e.queue=t,t=t.dispatch=Xy.bind(null,vt,t),[e.memoizedState,t]}function rs(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function ux(){return Un().memoizedState}function El(t,e,n,i){var r=ai();vt.flags|=t,r.memoizedState=rs(1|e,n,void 0,i===void 0?null:i)}function yc(t,e,n,i){var r=Un();i=i===void 0?null:i;var a=void 0;if(Nt!==null){var o=Nt.memoizedState;if(a=o.destroy,i!==null&&mp(i,o.deps)){r.memoizedState=rs(e,n,a,i);return}}vt.flags|=t,r.memoizedState=rs(1|e,n,a,i)}function Yh(t,e){return El(8390656,8,t,e)}function vp(t,e){return yc(2048,8,t,e)}function dx(t,e){return yc(4,2,t,e)}function fx(t,e){return yc(4,4,t,e)}function px(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function hx(t,e,n){return n=n!=null?n.concat([t]):null,yc(4,4,px.bind(null,e,t),n)}function _p(){}function mx(t,e){var n=Un();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&mp(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function gx(t,e){var n=Un();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&mp(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function xx(t,e,n){return Br&21?($n(n,e)||(n=Mg(),vt.lanes|=n,Vr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,dn=!0),t.memoizedState=n)}function Wy(t,e){var n=it;it=n!==0&&4>n?n:4,t(!0);var i=eu.transition;eu.transition={};try{t(!1),e()}finally{it=n,eu.transition=i}}function vx(){return Un().memoizedState}function jy(t,e,n){var i=ur(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},_x(t))yx(e,n);else if(n=ex(t,e,n,i),n!==null){var r=on();Yn(n,t,i,r),Sx(n,e,i)}}function Xy(t,e,n){var i=ur(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(_x(t))yx(e,r);else{var a=t.alternate;if(t.lanes===0&&(a===null||a.lanes===0)&&(a=e.lastRenderedReducer,a!==null))try{var o=e.lastRenderedState,s=a(o,n);if(r.hasEagerState=!0,r.eagerState=s,$n(s,o)){var l=e.interleaved;l===null?(r.next=r,up(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=ex(t,e,r,i),n!==null&&(r=on(),Yn(n,t,i,r),Sx(n,e,i))}}function _x(t){var e=t.alternate;return t===vt||e!==null&&e===vt}function yx(t,e){zo=Zl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Sx(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Kf(t,n)}}var Ql={readContext:Fn,useCallback:Yt,useContext:Yt,useEffect:Yt,useImperativeHandle:Yt,useInsertionEffect:Yt,useLayoutEffect:Yt,useMemo:Yt,useReducer:Yt,useRef:Yt,useState:Yt,useDebugValue:Yt,useDeferredValue:Yt,useTransition:Yt,useMutableSource:Yt,useSyncExternalStore:Yt,useId:Yt,unstable_isNewReconciler:!1},qy={readContext:Fn,useCallback:function(t,e){return ai().memoizedState=[t,e===void 0?null:e],t},useContext:Fn,useEffect:Yh,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,El(4194308,4,px.bind(null,e,t),n)},useLayoutEffect:function(t,e){return El(4194308,4,t,e)},useInsertionEffect:function(t,e){return El(4,2,t,e)},useMemo:function(t,e){var n=ai();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ai();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=jy.bind(null,vt,t),[i.memoizedState,t]},useRef:function(t){var e=ai();return t={current:t},e.memoizedState=t},useState:qh,useDebugValue:_p,useDeferredValue:function(t){return ai().memoizedState=t},useTransition:function(){var t=qh(!1),e=t[0];return t=Wy.bind(null,t[1]),ai().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=vt,r=ai();if(ht){if(n===void 0)throw Error(ae(407));n=n()}else{if(n=e(),Bt===null)throw Error(ae(349));Br&30||ax(i,e,n)}r.memoizedState=n;var a={value:n,getSnapshot:e};return r.queue=a,Yh(sx.bind(null,i,a,t),[t]),i.flags|=2048,rs(9,ox.bind(null,i,a,n,e),void 0,null),n},useId:function(){var t=ai(),e=Bt.identifierPrefix;if(ht){var n=Ai,i=bi;n=(i&~(1<<32-qn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ns++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Gy++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Yy={readContext:Fn,useCallback:mx,useContext:Fn,useEffect:vp,useImperativeHandle:hx,useInsertionEffect:dx,useLayoutEffect:fx,useMemo:gx,useReducer:tu,useRef:ux,useState:function(){return tu(is)},useDebugValue:_p,useDeferredValue:function(t){var e=Un();return xx(e,Nt.memoizedState,t)},useTransition:function(){var t=tu(is)[0],e=Un().memoizedState;return[t,e]},useMutableSource:ix,useSyncExternalStore:rx,useId:vx,unstable_isNewReconciler:!1},$y={readContext:Fn,useCallback:mx,useContext:Fn,useEffect:vp,useImperativeHandle:hx,useInsertionEffect:dx,useLayoutEffect:fx,useMemo:gx,useReducer:nu,useRef:ux,useState:function(){return nu(is)},useDebugValue:_p,useDeferredValue:function(t){var e=Un();return Nt===null?e.memoizedState=t:xx(e,Nt.memoizedState,t)},useTransition:function(){var t=nu(is)[0],e=Un().memoizedState;return[t,e]},useMutableSource:ix,useSyncExternalStore:rx,useId:vx,unstable_isNewReconciler:!1};function Hn(t,e){if(t&&t.defaultProps){e=yt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Pd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:yt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Sc={isMounted:function(t){return(t=t._reactInternals)?Xr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=on(),r=ur(t),a=Ri(i,r);a.payload=e,n!=null&&(a.callback=n),e=lr(t,a,r),e!==null&&(Yn(e,t,r,i),Sl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=on(),r=ur(t),a=Ri(i,r);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=lr(t,a,r),e!==null&&(Yn(e,t,r,i),Sl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=on(),i=ur(t),r=Ri(n,i);r.tag=2,e!=null&&(r.callback=e),e=lr(t,r,i),e!==null&&(Yn(e,t,i,n),Sl(e,t,i))}};function $h(t,e,n,i,r,a,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,a,o):e.prototype&&e.prototype.isPureReactComponent?!Ko(n,i)||!Ko(r,a):!0}function Mx(t,e,n){var i=!1,r=hr,a=e.contextType;return typeof a=="object"&&a!==null?a=Fn(a):(r=pn(e)?zr:nn.current,i=e.contextTypes,a=(i=i!=null)?ka(t,r):hr),e=new e(n,a),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Sc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=a),e}function Kh(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Sc.enqueueReplaceState(e,e.state,null)}function Id(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},dp(t);var a=e.contextType;typeof a=="object"&&a!==null?r.context=Fn(a):(a=pn(e)?zr:nn.current,r.context=ka(t,a)),r.state=t.memoizedState,a=e.getDerivedStateFromProps,typeof a=="function"&&(Pd(t,e,a,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Sc.enqueueReplaceState(r,r.state,null),$l(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Ga(t,e){try{var n="",i=e;do n+=E_(i),i=i.return;while(i);var r=n}catch(a){r=`
Error generating stack: `+a.message+`
`+a.stack}return{value:t,source:e,stack:r,digest:null}}function iu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Dd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Ky=typeof WeakMap=="function"?WeakMap:Map;function Ex(t,e,n){n=Ri(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){ec||(ec=!0,Hd=i),Dd(t,e)},n}function Tx(t,e,n){n=Ri(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Dd(t,e)}}var a=t.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){Dd(t,e),typeof i!="function"&&(cr===null?cr=new Set([this]):cr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Zh(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Ky;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=u1.bind(null,t,e,n),e.then(t,t))}function Qh(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Jh(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ri(-1,1),e.tag=2,lr(n,e,1))),n.lanes|=1),t)}var Zy=Oi.ReactCurrentOwner,dn=!1;function an(t,e,n,i){e.child=t===null?Jg(e,null,n,i):Va(e,t.child,n,i)}function em(t,e,n,i,r){n=n.render;var a=e.ref;return La(e,r),i=gp(t,e,n,i,a,r),n=xp(),t!==null&&!dn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ni(t,e,r)):(ht&&n&&rp(e),e.flags|=1,an(t,e,i,r),e.child)}function tm(t,e,n,i,r){if(t===null){var a=n.type;return typeof a=="function"&&!Cp(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=a,bx(t,e,a,i,r)):(t=Cl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(a=t.child,!(t.lanes&r)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:Ko,n(o,i)&&t.ref===e.ref)return Ni(t,e,r)}return e.flags|=1,t=dr(a,i),t.ref=e.ref,t.return=e,e.child=t}function bx(t,e,n,i,r){if(t!==null){var a=t.memoizedProps;if(Ko(a,i)&&t.ref===e.ref)if(dn=!1,e.pendingProps=i=a,(t.lanes&r)!==0)t.flags&131072&&(dn=!0);else return e.lanes=t.lanes,Ni(t,e,r)}return Ld(t,e,n,i,r)}function Ax(t,e,n){var i=e.pendingProps,r=i.children,a=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ct(Ca,_n),_n|=n;else{if(!(n&1073741824))return t=a!==null?a.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ct(Ca,_n),_n|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=a!==null?a.baseLanes:n,ct(Ca,_n),_n|=i}else a!==null?(i=a.baseLanes|n,e.memoizedState=null):i=n,ct(Ca,_n),_n|=i;return an(t,e,r,n),e.child}function Cx(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Ld(t,e,n,i,r){var a=pn(n)?zr:nn.current;return a=ka(e,a),La(e,r),n=gp(t,e,n,i,a,r),i=xp(),t!==null&&!dn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ni(t,e,r)):(ht&&i&&rp(e),e.flags|=1,an(t,e,n,r),e.child)}function nm(t,e,n,i,r){if(pn(n)){var a=!0;Wl(e)}else a=!1;if(La(e,r),e.stateNode===null)Tl(t,e),Mx(e,n,i),Id(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,s=e.memoizedProps;o.props=s;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Fn(c):(c=pn(n)?zr:nn.current,c=ka(e,c));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==i||l!==c)&&Kh(e,o,i,c),Zi=!1;var d=e.memoizedState;o.state=d,$l(e,i,o,r),l=e.memoizedState,s!==i||d!==l||fn.current||Zi?(typeof f=="function"&&(Pd(e,n,f,i),l=e.memoizedState),(s=Zi||$h(e,n,s,i,d,l,c))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=s):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,tx(t,e),s=e.memoizedProps,c=e.type===e.elementType?s:Hn(e.type,s),o.props=c,p=e.pendingProps,d=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Fn(l):(l=pn(n)?zr:nn.current,l=ka(e,l));var g=n.getDerivedStateFromProps;(f=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==p||d!==l)&&Kh(e,o,i,l),Zi=!1,d=e.memoizedState,o.state=d,$l(e,i,o,r);var _=e.memoizedState;s!==p||d!==_||fn.current||Zi?(typeof g=="function"&&(Pd(e,n,g,i),_=e.memoizedState),(c=Zi||$h(e,n,c,i,d,_,l)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,_,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),o.props=i,o.state=_,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||s===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),i=!1)}return Nd(t,e,n,i,a,r)}function Nd(t,e,n,i,r,a){Cx(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Vh(e,n,!1),Ni(t,e,a);i=e.stateNode,Zy.current=e;var s=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Va(e,t.child,null,a),e.child=Va(e,null,s,a)):an(t,e,s,a),e.memoizedState=i.state,r&&Vh(e,n,!0),e.child}function Rx(t){var e=t.stateNode;e.pendingContext?Bh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Bh(t,e.context,!1),fp(t,e.containerInfo)}function im(t,e,n,i,r){return Ba(),op(r),e.flags|=256,an(t,e,n,i),e.child}var Fd={dehydrated:null,treeContext:null,retryLane:0};function Ud(t){return{baseLanes:t,cachePool:null,transitions:null}}function wx(t,e,n){var i=e.pendingProps,r=gt.current,a=!1,o=(e.flags&128)!==0,s;if((s=o)||(s=t!==null&&t.memoizedState===null?!1:(r&2)!==0),s?(a=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ct(gt,r&1),t===null)return Rd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,a?(i=e.mode,a=e.child,o={mode:"hidden",children:o},!(i&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=Tc(o,i,0,null),t=Or(t,i,n,null),a.return=e,t.return=e,a.sibling=t,e.child=a,e.child.memoizedState=Ud(n),e.memoizedState=Fd,t):yp(e,o));if(r=t.memoizedState,r!==null&&(s=r.dehydrated,s!==null))return Qy(t,e,o,i,s,r,n);if(a){a=i.fallback,o=e.mode,r=t.child,s=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=dr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),s!==null?a=dr(s,a):(a=Or(a,o,n,null),a.flags|=2),a.return=e,i.return=e,i.sibling=a,e.child=i,i=a,a=e.child,o=t.child.memoizedState,o=o===null?Ud(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=t.childLanes&~n,e.memoizedState=Fd,i}return a=t.child,t=a.sibling,i=dr(a,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function yp(t,e){return e=Tc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ls(t,e,n,i){return i!==null&&op(i),Va(e,t.child,null,n),t=yp(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Qy(t,e,n,i,r,a,o){if(n)return e.flags&256?(e.flags&=-257,i=iu(Error(ae(422))),Ls(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(a=i.fallback,r=e.mode,i=Tc({mode:"visible",children:i.children},r,0,null),a=Or(a,r,o,null),a.flags|=2,i.return=e,a.return=e,i.sibling=a,e.child=i,e.mode&1&&Va(e,t.child,null,o),e.child.memoizedState=Ud(o),e.memoizedState=Fd,a);if(!(e.mode&1))return Ls(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var s=i.dgst;return i=s,a=Error(ae(419)),i=iu(a,i,void 0),Ls(t,e,o,i)}if(s=(o&t.childLanes)!==0,dn||s){if(i=Bt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==a.retryLane&&(a.retryLane=r,Li(t,r),Yn(i,t,r,-1))}return Ap(),i=iu(Error(ae(421))),Ls(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=d1.bind(null,t),r._reactRetry=e,null):(t=a.treeContext,Sn=sr(r.nextSibling),Mn=e,ht=!0,Wn=null,t!==null&&(Pn[In++]=bi,Pn[In++]=Ai,Pn[In++]=kr,bi=t.id,Ai=t.overflow,kr=e),e=yp(e,i.children),e.flags|=4096,e)}function rm(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),wd(t.return,e,n)}function ru(t,e,n,i,r){var a=t.memoizedState;a===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(a.isBackwards=e,a.rendering=null,a.renderingStartTime=0,a.last=i,a.tail=n,a.tailMode=r)}function Px(t,e,n){var i=e.pendingProps,r=i.revealOrder,a=i.tail;if(an(t,e,i.children,n),i=gt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&rm(t,n,e);else if(t.tag===19)rm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ct(gt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Kl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),ru(e,!1,r,n,a);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Kl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}ru(e,!0,n,null,a);break;case"together":ru(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Tl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ni(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Vr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ae(153));if(e.child!==null){for(t=e.child,n=dr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=dr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Jy(t,e,n){switch(e.tag){case 3:Rx(e),Ba();break;case 5:nx(e);break;case 1:pn(e.type)&&Wl(e);break;case 4:fp(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ct(ql,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ct(gt,gt.current&1),e.flags|=128,null):n&e.child.childLanes?wx(t,e,n):(ct(gt,gt.current&1),t=Ni(t,e,n),t!==null?t.sibling:null);ct(gt,gt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Px(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ct(gt,gt.current),i)break;return null;case 22:case 23:return e.lanes=0,Ax(t,e,n)}return Ni(t,e,n)}var Ix,Od,Dx,Lx;Ix=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Od=function(){};Dx=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Lr(fi.current);var a=null;switch(n){case"input":r=ad(t,r),i=ad(t,i),a=[];break;case"select":r=yt({},r,{value:void 0}),i=yt({},i,{value:void 0}),a=[];break;case"textarea":r=ld(t,r),i=ld(t,i),a=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Hl)}ud(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var s=r[c];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Go.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in i){var l=i[c];if(s=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==s&&(l!=null||s!=null))if(c==="style")if(s){for(o in s)!s.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&s[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(a||(a=[]),a.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(a=a||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(a=a||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Go.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&dt("scroll",t),a||s===l||(a=[])):(a=a||[]).push(c,l))}n&&(a=a||[]).push("style",n);var c=a;(e.updateQueue=c)&&(e.flags|=4)}};Lx=function(t,e,n,i){n!==i&&(e.flags|=4)};function lo(t,e){if(!ht)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function $t(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function e1(t,e,n){var i=e.pendingProps;switch(ap(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $t(e),null;case 1:return pn(e.type)&&Gl(),$t(e),null;case 3:return i=e.stateNode,Ha(),ft(fn),ft(nn),hp(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Is(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Wn!==null&&(jd(Wn),Wn=null))),Od(t,e),$t(e),null;case 5:pp(e);var r=Lr(ts.current);if(n=e.type,t!==null&&e.stateNode!=null)Dx(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ae(166));return $t(e),null}if(t=Lr(fi.current),Is(e)){i=e.stateNode,n=e.type;var a=e.memoizedProps;switch(i[si]=e,i[Jo]=a,t=(e.mode&1)!==0,n){case"dialog":dt("cancel",i),dt("close",i);break;case"iframe":case"object":case"embed":dt("load",i);break;case"video":case"audio":for(r=0;r<Po.length;r++)dt(Po[r],i);break;case"source":dt("error",i);break;case"img":case"image":case"link":dt("error",i),dt("load",i);break;case"details":dt("toggle",i);break;case"input":ph(i,a),dt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!a.multiple},dt("invalid",i);break;case"textarea":mh(i,a),dt("invalid",i)}ud(n,a),r=null;for(var o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="children"?typeof s=="string"?i.textContent!==s&&(a.suppressHydrationWarning!==!0&&Ps(i.textContent,s,t),r=["children",s]):typeof s=="number"&&i.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&Ps(i.textContent,s,t),r=["children",""+s]):Go.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&dt("scroll",i)}switch(n){case"input":Ms(i),hh(i,a,!0);break;case"textarea":Ms(i),gh(i);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(i.onclick=Hl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=sg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[si]=e,t[Jo]=i,Ix(t,e,!1,!1),e.stateNode=t;e:{switch(o=dd(n,i),n){case"dialog":dt("cancel",t),dt("close",t),r=i;break;case"iframe":case"object":case"embed":dt("load",t),r=i;break;case"video":case"audio":for(r=0;r<Po.length;r++)dt(Po[r],t);r=i;break;case"source":dt("error",t),r=i;break;case"img":case"image":case"link":dt("error",t),dt("load",t),r=i;break;case"details":dt("toggle",t),r=i;break;case"input":ph(t,i),r=ad(t,i),dt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=yt({},i,{value:void 0}),dt("invalid",t);break;case"textarea":mh(t,i),r=ld(t,i),dt("invalid",t);break;default:r=i}ud(n,r),s=r;for(a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="style"?ug(t,l):a==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&lg(t,l)):a==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Wo(t,l):typeof l=="number"&&Wo(t,""+l):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Go.hasOwnProperty(a)?l!=null&&a==="onScroll"&&dt("scroll",t):l!=null&&Wf(t,a,l,o))}switch(n){case"input":Ms(t),hh(t,i,!1);break;case"textarea":Ms(t),gh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+pr(i.value));break;case"select":t.multiple=!!i.multiple,a=i.value,a!=null?wa(t,!!i.multiple,a,!1):i.defaultValue!=null&&wa(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Hl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return $t(e),null;case 6:if(t&&e.stateNode!=null)Lx(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ae(166));if(n=Lr(ts.current),Lr(fi.current),Is(e)){if(i=e.stateNode,n=e.memoizedProps,i[si]=e,(a=i.nodeValue!==n)&&(t=Mn,t!==null))switch(t.tag){case 3:Ps(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ps(i.nodeValue,n,(t.mode&1)!==0)}a&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[si]=e,e.stateNode=i}return $t(e),null;case 13:if(ft(gt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ht&&Sn!==null&&e.mode&1&&!(e.flags&128))Zg(),Ba(),e.flags|=98560,a=!1;else if(a=Is(e),i!==null&&i.dehydrated!==null){if(t===null){if(!a)throw Error(ae(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(ae(317));a[si]=e}else Ba(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;$t(e),a=!1}else Wn!==null&&(jd(Wn),Wn=null),a=!0;if(!a)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||gt.current&1?Ft===0&&(Ft=3):Ap())),e.updateQueue!==null&&(e.flags|=4),$t(e),null);case 4:return Ha(),Od(t,e),t===null&&Zo(e.stateNode.containerInfo),$t(e),null;case 10:return cp(e.type._context),$t(e),null;case 17:return pn(e.type)&&Gl(),$t(e),null;case 19:if(ft(gt),a=e.memoizedState,a===null)return $t(e),null;if(i=(e.flags&128)!==0,o=a.rendering,o===null)if(i)lo(a,!1);else{if(Ft!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Kl(t),o!==null){for(e.flags|=128,lo(a,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)a=n,t=i,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=t,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,t=o.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ct(gt,gt.current&1|2),e.child}t=t.sibling}a.tail!==null&&Rt()>Wa&&(e.flags|=128,i=!0,lo(a,!1),e.lanes=4194304)}else{if(!i)if(t=Kl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),lo(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!ht)return $t(e),null}else 2*Rt()-a.renderingStartTime>Wa&&n!==1073741824&&(e.flags|=128,i=!0,lo(a,!1),e.lanes=4194304);a.isBackwards?(o.sibling=e.child,e.child=o):(n=a.last,n!==null?n.sibling=o:e.child=o,a.last=o)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=Rt(),e.sibling=null,n=gt.current,ct(gt,i?n&1|2:n&1),e):($t(e),null);case 22:case 23:return bp(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?_n&1073741824&&($t(e),e.subtreeFlags&6&&(e.flags|=8192)):$t(e),null;case 24:return null;case 25:return null}throw Error(ae(156,e.tag))}function t1(t,e){switch(ap(e),e.tag){case 1:return pn(e.type)&&Gl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ha(),ft(fn),ft(nn),hp(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return pp(e),null;case 13:if(ft(gt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ae(340));Ba()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ft(gt),null;case 4:return Ha(),null;case 10:return cp(e.type._context),null;case 22:case 23:return bp(),null;case 24:return null;default:return null}}var Ns=!1,Qt=!1,n1=typeof WeakSet=="function"?WeakSet:Set,Me=null;function Aa(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Tt(t,e,i)}else n.current=null}function zd(t,e,n){try{n()}catch(i){Tt(t,e,i)}}var am=!1;function i1(t,e){if(Sd=kl,t=zg(),ip(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,a=i.focusNode;i=i.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,s=-1,l=-1,c=0,f=0,p=t,d=null;t:for(;;){for(var g;p!==n||r!==0&&p.nodeType!==3||(s=o+r),p!==a||i!==0&&p.nodeType!==3||(l=o+i),p.nodeType===3&&(o+=p.nodeValue.length),(g=p.firstChild)!==null;)d=p,p=g;for(;;){if(p===t)break t;if(d===n&&++c===r&&(s=o),d===a&&++f===i&&(l=o),(g=p.nextSibling)!==null)break;p=d,d=p.parentNode}p=g}n=s===-1||l===-1?null:{start:s,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Md={focusedElem:t,selectionRange:n},kl=!1,Me=e;Me!==null;)if(e=Me,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Me=t;else for(;Me!==null;){e=Me;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var T=_.memoizedProps,x=_.memoizedState,u=e.stateNode,v=u.getSnapshotBeforeUpdate(e.elementType===e.type?T:Hn(e.type,T),x);u.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var M=e.stateNode.containerInfo;M.nodeType===1?M.textContent="":M.nodeType===9&&M.documentElement&&M.removeChild(M.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ae(163))}}catch(S){Tt(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,Me=t;break}Me=e.return}return _=am,am=!1,_}function ko(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var a=r.destroy;r.destroy=void 0,a!==void 0&&zd(e,n,a)}r=r.next}while(r!==i)}}function Mc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function kd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Nx(t){var e=t.alternate;e!==null&&(t.alternate=null,Nx(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[si],delete e[Jo],delete e[bd],delete e[ky],delete e[By])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Fx(t){return t.tag===5||t.tag===3||t.tag===4}function om(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Fx(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Bd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Hl));else if(i!==4&&(t=t.child,t!==null))for(Bd(t,e,n),t=t.sibling;t!==null;)Bd(t,e,n),t=t.sibling}function Vd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Vd(t,e,n),t=t.sibling;t!==null;)Vd(t,e,n),t=t.sibling}var Ht=null,Gn=!1;function Vi(t,e,n){for(n=n.child;n!==null;)Ux(t,e,n),n=n.sibling}function Ux(t,e,n){if(di&&typeof di.onCommitFiberUnmount=="function")try{di.onCommitFiberUnmount(hc,n)}catch{}switch(n.tag){case 5:Qt||Aa(n,e);case 6:var i=Ht,r=Gn;Ht=null,Vi(t,e,n),Ht=i,Gn=r,Ht!==null&&(Gn?(t=Ht,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ht.removeChild(n.stateNode));break;case 18:Ht!==null&&(Gn?(t=Ht,n=n.stateNode,t.nodeType===8?Zc(t.parentNode,n):t.nodeType===1&&Zc(t,n),Yo(t)):Zc(Ht,n.stateNode));break;case 4:i=Ht,r=Gn,Ht=n.stateNode.containerInfo,Gn=!0,Vi(t,e,n),Ht=i,Gn=r;break;case 0:case 11:case 14:case 15:if(!Qt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var a=r,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&zd(n,e,o),r=r.next}while(r!==i)}Vi(t,e,n);break;case 1:if(!Qt&&(Aa(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(s){Tt(n,e,s)}Vi(t,e,n);break;case 21:Vi(t,e,n);break;case 22:n.mode&1?(Qt=(i=Qt)||n.memoizedState!==null,Vi(t,e,n),Qt=i):Vi(t,e,n);break;default:Vi(t,e,n)}}function sm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new n1),e.forEach(function(i){var r=f1.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function zn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var a=t,o=e,s=o;e:for(;s!==null;){switch(s.tag){case 5:Ht=s.stateNode,Gn=!1;break e;case 3:Ht=s.stateNode.containerInfo,Gn=!0;break e;case 4:Ht=s.stateNode.containerInfo,Gn=!0;break e}s=s.return}if(Ht===null)throw Error(ae(160));Ux(a,o,r),Ht=null,Gn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Tt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Ox(e,t),e=e.sibling}function Ox(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(zn(e,t),ei(t),i&4){try{ko(3,t,t.return),Mc(3,t)}catch(T){Tt(t,t.return,T)}try{ko(5,t,t.return)}catch(T){Tt(t,t.return,T)}}break;case 1:zn(e,t),ei(t),i&512&&n!==null&&Aa(n,n.return);break;case 5:if(zn(e,t),ei(t),i&512&&n!==null&&Aa(n,n.return),t.flags&32){var r=t.stateNode;try{Wo(r,"")}catch(T){Tt(t,t.return,T)}}if(i&4&&(r=t.stateNode,r!=null)){var a=t.memoizedProps,o=n!==null?n.memoizedProps:a,s=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{s==="input"&&a.type==="radio"&&a.name!=null&&ag(r,a),dd(s,o);var c=dd(s,a);for(o=0;o<l.length;o+=2){var f=l[o],p=l[o+1];f==="style"?ug(r,p):f==="dangerouslySetInnerHTML"?lg(r,p):f==="children"?Wo(r,p):Wf(r,f,p,c)}switch(s){case"input":od(r,a);break;case"textarea":og(r,a);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!a.multiple;var g=a.value;g!=null?wa(r,!!a.multiple,g,!1):d!==!!a.multiple&&(a.defaultValue!=null?wa(r,!!a.multiple,a.defaultValue,!0):wa(r,!!a.multiple,a.multiple?[]:"",!1))}r[Jo]=a}catch(T){Tt(t,t.return,T)}}break;case 6:if(zn(e,t),ei(t),i&4){if(t.stateNode===null)throw Error(ae(162));r=t.stateNode,a=t.memoizedProps;try{r.nodeValue=a}catch(T){Tt(t,t.return,T)}}break;case 3:if(zn(e,t),ei(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Yo(e.containerInfo)}catch(T){Tt(t,t.return,T)}break;case 4:zn(e,t),ei(t);break;case 13:zn(e,t),ei(t),r=t.child,r.flags&8192&&(a=r.memoizedState!==null,r.stateNode.isHidden=a,!a||r.alternate!==null&&r.alternate.memoizedState!==null||(Ep=Rt())),i&4&&sm(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Qt=(c=Qt)||f,zn(e,t),Qt=c):zn(e,t),ei(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(Me=t,f=t.child;f!==null;){for(p=Me=f;Me!==null;){switch(d=Me,g=d.child,d.tag){case 0:case 11:case 14:case 15:ko(4,d,d.return);break;case 1:Aa(d,d.return);var _=d.stateNode;if(typeof _.componentWillUnmount=="function"){i=d,n=d.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(T){Tt(i,n,T)}}break;case 5:Aa(d,d.return);break;case 22:if(d.memoizedState!==null){cm(p);continue}}g!==null?(g.return=d,Me=g):cm(p)}f=f.sibling}e:for(f=null,p=t;;){if(p.tag===5){if(f===null){f=p;try{r=p.stateNode,c?(a=r.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=p.stateNode,l=p.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=cg("display",o))}catch(T){Tt(t,t.return,T)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(T){Tt(t,t.return,T)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:zn(e,t),ei(t),i&4&&sm(t);break;case 21:break;default:zn(e,t),ei(t)}}function ei(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Fx(n)){var i=n;break e}n=n.return}throw Error(ae(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Wo(r,""),i.flags&=-33);var a=om(t);Vd(t,a,r);break;case 3:case 4:var o=i.stateNode.containerInfo,s=om(t);Bd(t,s,o);break;default:throw Error(ae(161))}}catch(l){Tt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function r1(t,e,n){Me=t,zx(t)}function zx(t,e,n){for(var i=(t.mode&1)!==0;Me!==null;){var r=Me,a=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Ns;if(!o){var s=r.alternate,l=s!==null&&s.memoizedState!==null||Qt;s=Ns;var c=Qt;if(Ns=o,(Qt=l)&&!c)for(Me=r;Me!==null;)o=Me,l=o.child,o.tag===22&&o.memoizedState!==null?um(r):l!==null?(l.return=o,Me=l):um(r);for(;a!==null;)Me=a,zx(a),a=a.sibling;Me=r,Ns=s,Qt=c}lm(t)}else r.subtreeFlags&8772&&a!==null?(a.return=r,Me=a):lm(t)}}function lm(t){for(;Me!==null;){var e=Me;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Qt||Mc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Qt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Hn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var a=e.updateQueue;a!==null&&Xh(e,a,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Xh(e,o,n)}break;case 5:var s=e.stateNode;if(n===null&&e.flags&4){n=s;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&Yo(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ae(163))}Qt||e.flags&512&&kd(e)}catch(d){Tt(e,e.return,d)}}if(e===t){Me=null;break}if(n=e.sibling,n!==null){n.return=e.return,Me=n;break}Me=e.return}}function cm(t){for(;Me!==null;){var e=Me;if(e===t){Me=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Me=n;break}Me=e.return}}function um(t){for(;Me!==null;){var e=Me;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Mc(4,e)}catch(l){Tt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Tt(e,r,l)}}var a=e.return;try{kd(e)}catch(l){Tt(e,a,l)}break;case 5:var o=e.return;try{kd(e)}catch(l){Tt(e,o,l)}}}catch(l){Tt(e,e.return,l)}if(e===t){Me=null;break}var s=e.sibling;if(s!==null){s.return=e.return,Me=s;break}Me=e.return}}var a1=Math.ceil,Jl=Oi.ReactCurrentDispatcher,Sp=Oi.ReactCurrentOwner,Nn=Oi.ReactCurrentBatchConfig,Je=0,Bt=null,Dt=null,Wt=0,_n=0,Ca=vr(0),Ft=0,as=null,Vr=0,Ec=0,Mp=0,Bo=null,un=null,Ep=0,Wa=1/0,Ei=null,ec=!1,Hd=null,cr=null,Fs=!1,nr=null,tc=0,Vo=0,Gd=null,bl=-1,Al=0;function on(){return Je&6?Rt():bl!==-1?bl:bl=Rt()}function ur(t){return t.mode&1?Je&2&&Wt!==0?Wt&-Wt:Hy.transition!==null?(Al===0&&(Al=Mg()),Al):(t=it,t!==0||(t=window.event,t=t===void 0?16:wg(t.type)),t):1}function Yn(t,e,n,i){if(50<Vo)throw Vo=0,Gd=null,Error(ae(185));ds(t,n,i),(!(Je&2)||t!==Bt)&&(t===Bt&&(!(Je&2)&&(Ec|=n),Ft===4&&Ji(t,Wt)),hn(t,i),n===1&&Je===0&&!(e.mode&1)&&(Wa=Rt()+500,_c&&_r()))}function hn(t,e){var n=t.callbackNode;H_(t,e);var i=zl(t,t===Bt?Wt:0);if(i===0)n!==null&&_h(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&_h(n),e===1)t.tag===0?Vy(dm.bind(null,t)):Yg(dm.bind(null,t)),Oy(function(){!(Je&6)&&_r()}),n=null;else{switch(Eg(i)){case 1:n=$f;break;case 4:n=yg;break;case 16:n=Ol;break;case 536870912:n=Sg;break;default:n=Ol}n=Xx(n,kx.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function kx(t,e){if(bl=-1,Al=0,Je&6)throw Error(ae(327));var n=t.callbackNode;if(Na()&&t.callbackNode!==n)return null;var i=zl(t,t===Bt?Wt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=nc(t,i);else{e=i;var r=Je;Je|=2;var a=Vx();(Bt!==t||Wt!==e)&&(Ei=null,Wa=Rt()+500,Ur(t,e));do try{l1();break}catch(s){Bx(t,s)}while(!0);lp(),Jl.current=a,Je=r,Dt!==null?e=0:(Bt=null,Wt=0,e=Ft)}if(e!==0){if(e===2&&(r=gd(t),r!==0&&(i=r,e=Wd(t,r))),e===1)throw n=as,Ur(t,0),Ji(t,i),hn(t,Rt()),n;if(e===6)Ji(t,i);else{if(r=t.current.alternate,!(i&30)&&!o1(r)&&(e=nc(t,i),e===2&&(a=gd(t),a!==0&&(i=a,e=Wd(t,a))),e===1))throw n=as,Ur(t,0),Ji(t,i),hn(t,Rt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ae(345));case 2:Ar(t,un,Ei);break;case 3:if(Ji(t,i),(i&130023424)===i&&(e=Ep+500-Rt(),10<e)){if(zl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){on(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Td(Ar.bind(null,t,un,Ei),e);break}Ar(t,un,Ei);break;case 4:if(Ji(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-qn(i);a=1<<o,o=e[o],o>r&&(r=o),i&=~a}if(i=r,i=Rt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*a1(i/1960))-i,10<i){t.timeoutHandle=Td(Ar.bind(null,t,un,Ei),i);break}Ar(t,un,Ei);break;case 5:Ar(t,un,Ei);break;default:throw Error(ae(329))}}}return hn(t,Rt()),t.callbackNode===n?kx.bind(null,t):null}function Wd(t,e){var n=Bo;return t.current.memoizedState.isDehydrated&&(Ur(t,e).flags|=256),t=nc(t,e),t!==2&&(e=un,un=n,e!==null&&jd(e)),t}function jd(t){un===null?un=t:un.push.apply(un,t)}function o1(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],a=r.getSnapshot;r=r.value;try{if(!$n(a(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ji(t,e){for(e&=~Mp,e&=~Ec,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-qn(e),i=1<<n;t[n]=-1,e&=~i}}function dm(t){if(Je&6)throw Error(ae(327));Na();var e=zl(t,0);if(!(e&1))return hn(t,Rt()),null;var n=nc(t,e);if(t.tag!==0&&n===2){var i=gd(t);i!==0&&(e=i,n=Wd(t,i))}if(n===1)throw n=as,Ur(t,0),Ji(t,e),hn(t,Rt()),n;if(n===6)throw Error(ae(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ar(t,un,Ei),hn(t,Rt()),null}function Tp(t,e){var n=Je;Je|=1;try{return t(e)}finally{Je=n,Je===0&&(Wa=Rt()+500,_c&&_r())}}function Hr(t){nr!==null&&nr.tag===0&&!(Je&6)&&Na();var e=Je;Je|=1;var n=Nn.transition,i=it;try{if(Nn.transition=null,it=1,t)return t()}finally{it=i,Nn.transition=n,Je=e,!(Je&6)&&_r()}}function bp(){_n=Ca.current,ft(Ca)}function Ur(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Uy(n)),Dt!==null)for(n=Dt.return;n!==null;){var i=n;switch(ap(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Gl();break;case 3:Ha(),ft(fn),ft(nn),hp();break;case 5:pp(i);break;case 4:Ha();break;case 13:ft(gt);break;case 19:ft(gt);break;case 10:cp(i.type._context);break;case 22:case 23:bp()}n=n.return}if(Bt=t,Dt=t=dr(t.current,null),Wt=_n=e,Ft=0,as=null,Mp=Ec=Vr=0,un=Bo=null,Dr!==null){for(e=0;e<Dr.length;e++)if(n=Dr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,a=n.pending;if(a!==null){var o=a.next;a.next=r,i.next=o}n.pending=i}Dr=null}return t}function Bx(t,e){do{var n=Dt;try{if(lp(),Ml.current=Ql,Zl){for(var i=vt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Zl=!1}if(Br=0,kt=Nt=vt=null,zo=!1,ns=0,Sp.current=null,n===null||n.return===null){Ft=1,as=e,Dt=null;break}e:{var a=t,o=n.return,s=n,l=e;if(e=Wt,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=s,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var d=f.alternate;d?(f.updateQueue=d.updateQueue,f.memoizedState=d.memoizedState,f.lanes=d.lanes):(f.updateQueue=null,f.memoizedState=null)}var g=Qh(o);if(g!==null){g.flags&=-257,Jh(g,o,s,a,e),g.mode&1&&Zh(a,c,e),e=g,l=c;var _=e.updateQueue;if(_===null){var T=new Set;T.add(l),e.updateQueue=T}else _.add(l);break e}else{if(!(e&1)){Zh(a,c,e),Ap();break e}l=Error(ae(426))}}else if(ht&&s.mode&1){var x=Qh(o);if(x!==null){!(x.flags&65536)&&(x.flags|=256),Jh(x,o,s,a,e),op(Ga(l,s));break e}}a=l=Ga(l,s),Ft!==4&&(Ft=2),Bo===null?Bo=[a]:Bo.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,e&=-e,a.lanes|=e;var u=Ex(a,l,e);jh(a,u);break e;case 1:s=l;var v=a.type,M=a.stateNode;if(!(a.flags&128)&&(typeof v.getDerivedStateFromError=="function"||M!==null&&typeof M.componentDidCatch=="function"&&(cr===null||!cr.has(M)))){a.flags|=65536,e&=-e,a.lanes|=e;var S=Tx(a,s,e);jh(a,S);break e}}a=a.return}while(a!==null)}Gx(n)}catch(b){e=b,Dt===n&&n!==null&&(Dt=n=n.return);continue}break}while(!0)}function Vx(){var t=Jl.current;return Jl.current=Ql,t===null?Ql:t}function Ap(){(Ft===0||Ft===3||Ft===2)&&(Ft=4),Bt===null||!(Vr&268435455)&&!(Ec&268435455)||Ji(Bt,Wt)}function nc(t,e){var n=Je;Je|=2;var i=Vx();(Bt!==t||Wt!==e)&&(Ei=null,Ur(t,e));do try{s1();break}catch(r){Bx(t,r)}while(!0);if(lp(),Je=n,Jl.current=i,Dt!==null)throw Error(ae(261));return Bt=null,Wt=0,Ft}function s1(){for(;Dt!==null;)Hx(Dt)}function l1(){for(;Dt!==null&&!L_();)Hx(Dt)}function Hx(t){var e=jx(t.alternate,t,_n);t.memoizedProps=t.pendingProps,e===null?Gx(t):Dt=e,Sp.current=null}function Gx(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=t1(n,e),n!==null){n.flags&=32767,Dt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ft=6,Dt=null;return}}else if(n=e1(n,e,_n),n!==null){Dt=n;return}if(e=e.sibling,e!==null){Dt=e;return}Dt=e=t}while(e!==null);Ft===0&&(Ft=5)}function Ar(t,e,n){var i=it,r=Nn.transition;try{Nn.transition=null,it=1,c1(t,e,n,i)}finally{Nn.transition=r,it=i}return null}function c1(t,e,n,i){do Na();while(nr!==null);if(Je&6)throw Error(ae(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ae(177));t.callbackNode=null,t.callbackPriority=0;var a=n.lanes|n.childLanes;if(G_(t,a),t===Bt&&(Dt=Bt=null,Wt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Fs||(Fs=!0,Xx(Ol,function(){return Na(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=Nn.transition,Nn.transition=null;var o=it;it=1;var s=Je;Je|=4,Sp.current=null,i1(t,n),Ox(n,t),wy(Md),kl=!!Sd,Md=Sd=null,t.current=n,r1(n),N_(),Je=s,it=o,Nn.transition=a}else t.current=n;if(Fs&&(Fs=!1,nr=t,tc=r),a=t.pendingLanes,a===0&&(cr=null),O_(n.stateNode),hn(t,Rt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(ec)throw ec=!1,t=Hd,Hd=null,t;return tc&1&&t.tag!==0&&Na(),a=t.pendingLanes,a&1?t===Gd?Vo++:(Vo=0,Gd=t):Vo=0,_r(),null}function Na(){if(nr!==null){var t=Eg(tc),e=Nn.transition,n=it;try{if(Nn.transition=null,it=16>t?16:t,nr===null)var i=!1;else{if(t=nr,nr=null,tc=0,Je&6)throw Error(ae(331));var r=Je;for(Je|=4,Me=t.current;Me!==null;){var a=Me,o=a.child;if(Me.flags&16){var s=a.deletions;if(s!==null){for(var l=0;l<s.length;l++){var c=s[l];for(Me=c;Me!==null;){var f=Me;switch(f.tag){case 0:case 11:case 15:ko(8,f,a)}var p=f.child;if(p!==null)p.return=f,Me=p;else for(;Me!==null;){f=Me;var d=f.sibling,g=f.return;if(Nx(f),f===c){Me=null;break}if(d!==null){d.return=g,Me=d;break}Me=g}}}var _=a.alternate;if(_!==null){var T=_.child;if(T!==null){_.child=null;do{var x=T.sibling;T.sibling=null,T=x}while(T!==null)}}Me=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,Me=o;else e:for(;Me!==null;){if(a=Me,a.flags&2048)switch(a.tag){case 0:case 11:case 15:ko(9,a,a.return)}var u=a.sibling;if(u!==null){u.return=a.return,Me=u;break e}Me=a.return}}var v=t.current;for(Me=v;Me!==null;){o=Me;var M=o.child;if(o.subtreeFlags&2064&&M!==null)M.return=o,Me=M;else e:for(o=v;Me!==null;){if(s=Me,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Mc(9,s)}}catch(b){Tt(s,s.return,b)}if(s===o){Me=null;break e}var S=s.sibling;if(S!==null){S.return=s.return,Me=S;break e}Me=s.return}}if(Je=r,_r(),di&&typeof di.onPostCommitFiberRoot=="function")try{di.onPostCommitFiberRoot(hc,t)}catch{}i=!0}return i}finally{it=n,Nn.transition=e}}return!1}function fm(t,e,n){e=Ga(n,e),e=Ex(t,e,1),t=lr(t,e,1),e=on(),t!==null&&(ds(t,1,e),hn(t,e))}function Tt(t,e,n){if(t.tag===3)fm(t,t,n);else for(;e!==null;){if(e.tag===3){fm(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(cr===null||!cr.has(i))){t=Ga(n,t),t=Tx(e,t,1),e=lr(e,t,1),t=on(),e!==null&&(ds(e,1,t),hn(e,t));break}}e=e.return}}function u1(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=on(),t.pingedLanes|=t.suspendedLanes&n,Bt===t&&(Wt&n)===n&&(Ft===4||Ft===3&&(Wt&130023424)===Wt&&500>Rt()-Ep?Ur(t,0):Mp|=n),hn(t,e)}function Wx(t,e){e===0&&(t.mode&1?(e=bs,bs<<=1,!(bs&130023424)&&(bs=4194304)):e=1);var n=on();t=Li(t,e),t!==null&&(ds(t,e,n),hn(t,n))}function d1(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Wx(t,n)}function f1(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ae(314))}i!==null&&i.delete(e),Wx(t,n)}var jx;jx=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||fn.current)dn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return dn=!1,Jy(t,e,n);dn=!!(t.flags&131072)}else dn=!1,ht&&e.flags&1048576&&$g(e,Xl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Tl(t,e),t=e.pendingProps;var r=ka(e,nn.current);La(e,n),r=gp(null,e,i,t,r,n);var a=xp();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,pn(i)?(a=!0,Wl(e)):a=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,dp(e),r.updater=Sc,e.stateNode=r,r._reactInternals=e,Id(e,i,t,n),e=Nd(null,e,i,!0,a,n)):(e.tag=0,ht&&a&&rp(e),an(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Tl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=h1(i),t=Hn(i,t),r){case 0:e=Ld(null,e,i,t,n);break e;case 1:e=nm(null,e,i,t,n);break e;case 11:e=em(null,e,i,t,n);break e;case 14:e=tm(null,e,i,Hn(i.type,t),n);break e}throw Error(ae(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Hn(i,r),Ld(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Hn(i,r),nm(t,e,i,r,n);case 3:e:{if(Rx(e),t===null)throw Error(ae(387));i=e.pendingProps,a=e.memoizedState,r=a.element,tx(t,e),$l(e,i,null,n);var o=e.memoizedState;if(i=o.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=a,e.memoizedState=a,e.flags&256){r=Ga(Error(ae(423)),e),e=im(t,e,i,n,r);break e}else if(i!==r){r=Ga(Error(ae(424)),e),e=im(t,e,i,n,r);break e}else for(Sn=sr(e.stateNode.containerInfo.firstChild),Mn=e,ht=!0,Wn=null,n=Jg(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ba(),i===r){e=Ni(t,e,n);break e}an(t,e,i,n)}e=e.child}return e;case 5:return nx(e),t===null&&Rd(e),i=e.type,r=e.pendingProps,a=t!==null?t.memoizedProps:null,o=r.children,Ed(i,r)?o=null:a!==null&&Ed(i,a)&&(e.flags|=32),Cx(t,e),an(t,e,o,n),e.child;case 6:return t===null&&Rd(e),null;case 13:return wx(t,e,n);case 4:return fp(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Va(e,null,i,n):an(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Hn(i,r),em(t,e,i,r,n);case 7:return an(t,e,e.pendingProps,n),e.child;case 8:return an(t,e,e.pendingProps.children,n),e.child;case 12:return an(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,a=e.memoizedProps,o=r.value,ct(ql,i._currentValue),i._currentValue=o,a!==null)if($n(a.value,o)){if(a.children===r.children&&!fn.current){e=Ni(t,e,n);break e}}else for(a=e.child,a!==null&&(a.return=e);a!==null;){var s=a.dependencies;if(s!==null){o=a.child;for(var l=s.firstContext;l!==null;){if(l.context===i){if(a.tag===1){l=Ri(-1,n&-n),l.tag=2;var c=a.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),wd(a.return,n,e),s.lanes|=n;break}l=l.next}}else if(a.tag===10)o=a.type===e.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(ae(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),wd(o,n,e),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===e){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}an(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,La(e,n),r=Fn(r),i=i(r),e.flags|=1,an(t,e,i,n),e.child;case 14:return i=e.type,r=Hn(i,e.pendingProps),r=Hn(i.type,r),tm(t,e,i,r,n);case 15:return bx(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Hn(i,r),Tl(t,e),e.tag=1,pn(i)?(t=!0,Wl(e)):t=!1,La(e,n),Mx(e,i,r),Id(e,i,r,n),Nd(null,e,i,!0,t,n);case 19:return Px(t,e,n);case 22:return Ax(t,e,n)}throw Error(ae(156,e.tag))};function Xx(t,e){return _g(t,e)}function p1(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ln(t,e,n,i){return new p1(t,e,n,i)}function Cp(t){return t=t.prototype,!(!t||!t.isReactComponent)}function h1(t){if(typeof t=="function")return Cp(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Xf)return 11;if(t===qf)return 14}return 2}function dr(t,e){var n=t.alternate;return n===null?(n=Ln(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Cl(t,e,n,i,r,a){var o=2;if(i=t,typeof t=="function")Cp(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case xa:return Or(n.children,r,a,e);case jf:o=8,r|=8;break;case td:return t=Ln(12,n,e,r|2),t.elementType=td,t.lanes=a,t;case nd:return t=Ln(13,n,e,r),t.elementType=nd,t.lanes=a,t;case id:return t=Ln(19,n,e,r),t.elementType=id,t.lanes=a,t;case ng:return Tc(n,r,a,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case eg:o=10;break e;case tg:o=9;break e;case Xf:o=11;break e;case qf:o=14;break e;case Ki:o=16,i=null;break e}throw Error(ae(130,t==null?t:typeof t,""))}return e=Ln(o,n,e,r),e.elementType=t,e.type=i,e.lanes=a,e}function Or(t,e,n,i){return t=Ln(7,t,i,e),t.lanes=n,t}function Tc(t,e,n,i){return t=Ln(22,t,i,e),t.elementType=ng,t.lanes=n,t.stateNode={isHidden:!1},t}function au(t,e,n){return t=Ln(6,t,null,e),t.lanes=n,t}function ou(t,e,n){return e=Ln(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function m1(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Bc(0),this.expirationTimes=Bc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Bc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Rp(t,e,n,i,r,a,o,s,l){return t=new m1(t,e,n,s,l),e===1?(e=1,a===!0&&(e|=8)):e=0,a=Ln(3,null,null,e),t.current=a,a.stateNode=t,a.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},dp(a),t}function g1(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ga,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function qx(t){if(!t)return hr;t=t._reactInternals;e:{if(Xr(t)!==t||t.tag!==1)throw Error(ae(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(pn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ae(171))}if(t.tag===1){var n=t.type;if(pn(n))return qg(t,n,e)}return e}function Yx(t,e,n,i,r,a,o,s,l){return t=Rp(n,i,!0,t,r,a,o,s,l),t.context=qx(null),n=t.current,i=on(),r=ur(n),a=Ri(i,r),a.callback=e??null,lr(n,a,r),t.current.lanes=r,ds(t,r,i),hn(t,i),t}function bc(t,e,n,i){var r=e.current,a=on(),o=ur(r);return n=qx(n),e.context===null?e.context=n:e.pendingContext=n,e=Ri(a,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=lr(r,e,o),t!==null&&(Yn(t,r,o,a),Sl(t,r,o)),o}function ic(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function pm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function wp(t,e){pm(t,e),(t=t.alternate)&&pm(t,e)}function x1(){return null}var $x=typeof reportError=="function"?reportError:function(t){console.error(t)};function Pp(t){this._internalRoot=t}Ac.prototype.render=Pp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ae(409));bc(t,e,null,null)};Ac.prototype.unmount=Pp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Hr(function(){bc(null,t,null,null)}),e[Di]=null}};function Ac(t){this._internalRoot=t}Ac.prototype.unstable_scheduleHydration=function(t){if(t){var e=Ag();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Qi.length&&e!==0&&e<Qi[n].priority;n++);Qi.splice(n,0,t),n===0&&Rg(t)}};function Ip(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Cc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function hm(){}function v1(t,e,n,i,r){if(r){if(typeof i=="function"){var a=i;i=function(){var c=ic(o);a.call(c)}}var o=Yx(e,i,t,0,null,!1,!1,"",hm);return t._reactRootContainer=o,t[Di]=o.current,Zo(t.nodeType===8?t.parentNode:t),Hr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var s=i;i=function(){var c=ic(l);s.call(c)}}var l=Rp(t,0,!1,null,null,!1,!1,"",hm);return t._reactRootContainer=l,t[Di]=l.current,Zo(t.nodeType===8?t.parentNode:t),Hr(function(){bc(e,l,n,i)}),l}function Rc(t,e,n,i,r){var a=n._reactRootContainer;if(a){var o=a;if(typeof r=="function"){var s=r;r=function(){var l=ic(o);s.call(l)}}bc(e,o,t,r)}else o=v1(n,e,t,r,i);return ic(o)}Tg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=wo(e.pendingLanes);n!==0&&(Kf(e,n|1),hn(e,Rt()),!(Je&6)&&(Wa=Rt()+500,_r()))}break;case 13:Hr(function(){var i=Li(t,1);if(i!==null){var r=on();Yn(i,t,1,r)}}),wp(t,1)}};Zf=function(t){if(t.tag===13){var e=Li(t,134217728);if(e!==null){var n=on();Yn(e,t,134217728,n)}wp(t,134217728)}};bg=function(t){if(t.tag===13){var e=ur(t),n=Li(t,e);if(n!==null){var i=on();Yn(n,t,e,i)}wp(t,e)}};Ag=function(){return it};Cg=function(t,e){var n=it;try{return it=t,e()}finally{it=n}};pd=function(t,e,n){switch(e){case"input":if(od(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=vc(i);if(!r)throw Error(ae(90));rg(i),od(i,r)}}}break;case"textarea":og(t,n);break;case"select":e=n.value,e!=null&&wa(t,!!n.multiple,e,!1)}};pg=Tp;hg=Hr;var _1={usingClientEntryPoint:!1,Events:[ps,Sa,vc,dg,fg,Tp]},co={findFiberByHostInstance:Ir,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},y1={bundleType:co.bundleType,version:co.version,rendererPackageName:co.rendererPackageName,rendererConfig:co.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Oi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=xg(t),t===null?null:t.stateNode},findFiberByHostInstance:co.findFiberByHostInstance||x1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Us=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Us.isDisabled&&Us.supportsFiber)try{hc=Us.inject(y1),di=Us}catch{}}Tn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_1;Tn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ip(e))throw Error(ae(200));return g1(t,e,null,n)};Tn.createRoot=function(t,e){if(!Ip(t))throw Error(ae(299));var n=!1,i="",r=$x;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Rp(t,1,!1,null,null,n,!1,i,r),t[Di]=e.current,Zo(t.nodeType===8?t.parentNode:t),new Pp(e)};Tn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ae(188)):(t=Object.keys(t).join(","),Error(ae(268,t)));return t=xg(e),t=t===null?null:t.stateNode,t};Tn.flushSync=function(t){return Hr(t)};Tn.hydrate=function(t,e,n){if(!Cc(e))throw Error(ae(200));return Rc(null,t,e,!0,n)};Tn.hydrateRoot=function(t,e,n){if(!Ip(t))throw Error(ae(405));var i=n!=null&&n.hydratedSources||null,r=!1,a="",o=$x;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Yx(e,null,t,1,n??null,r,!1,a,o),t[Di]=e.current,Zo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Ac(e)};Tn.render=function(t,e,n){if(!Cc(e))throw Error(ae(200));return Rc(null,t,e,!1,n)};Tn.unmountComponentAtNode=function(t){if(!Cc(t))throw Error(ae(40));return t._reactRootContainer?(Hr(function(){Rc(null,null,t,!1,function(){t._reactRootContainer=null,t[Di]=null})}),!0):!1};Tn.unstable_batchedUpdates=Tp;Tn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Cc(n))throw Error(ae(200));if(t==null||t._reactInternals===void 0)throw Error(ae(38));return Rc(t,e,n,!1,i)};Tn.version="18.3.1-next-f1338f8080-20240426";function Kx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Kx)}catch(t){console.error(t)}}Kx(),K0.exports=Tn;var S1=K0.exports,mm=S1;Ju.createRoot=mm.createRoot,Ju.hydrateRoot=mm.hydrateRoot;const gm=t=>{const e={...t};return Object.keys(e).forEach(n=>{e[n]&&(e[n]={...e[n],currentValue:e[n].defaultValue??0})}),e.P0000&&(e.P0000.currentValue=5),e.P0204&&(e.P0204.currentValue=0),e},M1=(t,e)=>{var a,o,s,l,c,f,p,d,g,_,T,x,u;const n=Object.keys(t.parameters),i=n[t.selectedParamIndex]||"P0000",r=t.parameters[i];switch(e.type){case"PRESS_PROG":{if(t.activeFault)return t;if(t.ihmMode==="MONIT")return{...t,ihmMode:"PARAM_SELECT"};if(t.ihmMode==="PARAM_SELECT")return!r||r.readOnly?t:{...t,ihmMode:"PARAM_EDIT",editBuffer:r.currentValue};if(t.ihmMode==="PARAM_EDIT"){if(i==="P0204"&&Math.round(t.editBuffer)===5){const S=gm(t.parameters);return{...t,ihmMode:"PARAM_SELECT",parameters:S,motorStatus:"READY",activeFault:null,outputFrequency:0,outputCurrent:0,motorRPM:0,controlSource:"LOC",isForwardDirection:!0,lastFactoryResetTimestamp:Date.now()}}const v=+t.editBuffer.toFixed(1),M={...t.parameters,[i]:{...r,currentValue:v}};return{...t,ihmMode:"PARAM_SELECT",parameters:M}}return t}case"PRESS_UP":{if(t.ihmMode==="MONIT"){if(t.controlSource==="LOC"&&!t.activeFault){const v=((a=t.parameters.P0121)==null?void 0:a.currentValue)??t.outputFrequency??0,M=((o=t.parameters.P0134)==null?void 0:o.currentValue)??60,S=Math.min(M,Number((v+5).toFixed(1)));return{...t,parameters:{...t.parameters,P0121:{...t.parameters.P0121,currentValue:S}}}}return t}if(t.ihmMode==="PARAM_SELECT"){const v=(t.selectedParamIndex+1)%n.length;return{...t,selectedParamIndex:v}}if(t.ihmMode==="PARAM_EDIT"){const v=(r==null?void 0:r.step)??1,M=(r==null?void 0:r.max)??9999,S=Math.min(M,Number((t.editBuffer+v).toFixed(v<1?1:0)));return{...t,editBuffer:S}}return t}case"PRESS_DOWN":{if(t.ihmMode==="MONIT"){if(t.controlSource==="LOC"&&!t.activeFault){const v=((s=t.parameters.P0121)==null?void 0:s.currentValue)??t.outputFrequency??0,S=Math.max(0,Number((v-5).toFixed(1)));return{...t,parameters:{...t.parameters,P0121:{...t.parameters.P0121,currentValue:S}}}}return t}if(t.ihmMode==="PARAM_SELECT"){const v=(t.selectedParamIndex-1+n.length)%n.length;return{...t,selectedParamIndex:v}}if(t.ihmMode==="PARAM_EDIT"){const v=(r==null?void 0:r.step)??1,M=(r==null?void 0:r.min)??0,S=Math.max(M,Number((t.editBuffer-v).toFixed(v<1?1:0)));return{...t,editBuffer:S}}return t}case"SELECT_PARAM_DIRECT":{const v=n.indexOf(e.payload);return v===-1?t:{...t,selectedParamIndex:v,ihmMode:"PARAM_SELECT"}}case"PRESS_RUN":{if(t.activeFault)return t;if(t.controlSource==="LOC"){const v=((l=t.parameters.P0121)==null?void 0:l.currentValue)??0,M=v>0?v:30;return{...t,motorStatus:"RUNNING",parameters:{...t.parameters,P0121:{...t.parameters.P0121,currentValue:M}}}}return t}case"PRESS_STOP":return t.activeFault?{...t,activeFault:null,motorStatus:"READY"}:t.ihmMode==="PARAM_EDIT"?{...t,ihmMode:"PARAM_SELECT"}:t.ihmMode==="PARAM_SELECT"?{...t,ihmMode:"MONIT"}:{...t,motorStatus:"READY"};case"PRESS_LOCREM":return{...t,controlSource:t.controlSource==="LOC"?"REM":"LOC",motorStatus:"READY"};case"PRESS_DIRECTION":return{...t,isForwardDirection:!t.isForwardDirection};case"SET_DIGITAL_INPUT":{const v={...t.digitalInputs,[e.payload.input]:e.payload.value};let M=t.motorStatus,S=t.isForwardDirection,b=((c=t.parameters.P0121)==null?void 0:c.currentValue)??60;if(t.controlSource==="REM"&&!t.activeFault){const E=!!(v.di1??v.DI1),C=!!(v.di2??v.DI2),m=!!(v.di3??v.DI3),R=!!(v.di4??v.DI4);M=E?"RUNNING":"READY",S=!C,m&&!R?b=((f=t.parameters.P0125)==null?void 0:f.currentValue)??35:!m&&R?b=((p=t.parameters.P0126)==null?void 0:p.currentValue)??50:m&&R?b=((d=t.parameters.P0127)==null?void 0:d.currentValue)??60:(((g=t.parameters.P0222)==null?void 0:g.currentValue)===6||E)&&(b=((_=t.parameters.P0124)==null?void 0:_.currentValue)??15)}return{...t,digitalInputs:v,motorStatus:M,isForwardDirection:S,parameters:{...t.parameters,P0121:{...t.parameters.P0121,currentValue:b}}}}case"SET_ANALOG_INPUT_1":{const v=Math.min(10,Math.max(0,e.payload)),M=((T=t.parameters.P0133)==null?void 0:T.currentValue)??3,S=((x=t.parameters.P0134)==null?void 0:x.currentValue)??60,b=M+v/10*(S-M);return{...t,ai1Voltage:v,parameters:t.controlSource==="REM"&&((u=t.parameters.P0222)==null?void 0:u.currentValue)===1?{...t.parameters,P0121:{...t.parameters.P0121,currentValue:+b.toFixed(1)}}:t.parameters}}case"TRIGGER_FAULT":return{...t,activeFault:e.payload,motorStatus:"FAULT",outputFrequency:0,outputCurrent:0,motorRPM:0};case"RESET_FAULT":return{...t,activeFault:null,motorStatus:"READY"};case"RESET_FACTORY_DEFAULTS":{const v=gm(t.parameters);return{...t,ihmMode:"PARAM_SELECT",parameters:v,motorStatus:"READY",activeFault:null,outputFrequency:0,outputCurrent:0,motorRPM:0,controlSource:"LOC",isForwardDirection:!0,lastFactoryResetTimestamp:Date.now()}}case"UPDATE_DYNAMIC_TELEMETRY":return{...t,outputFrequency:e.payload.freq,outputCurrent:e.payload.current,motorRPM:e.payload.rpm,parameters:{...t.parameters,P0001:{...t.parameters.P0001,currentValue:e.payload.rpm},P0002:{...t.parameters.P0002,currentValue:e.payload.freq},P0003:{...t.parameters.P0003,currentValue:e.payload.current}}};default:return t}},ma={P0000:{code:"P0000",description:"Acesso aos Parâmetros",min:0,max:9999,step:1,defaultValue:0,currentValue:5,unit:""},P0001:{code:"P0001",description:"Velocidade de Saída (RPM)",min:0,max:18e3,step:1,defaultValue:0,currentValue:0,unit:"RPM",readOnly:!0},P0002:{code:"P0002",description:"Frequência de Saída",min:0,max:300,step:.1,defaultValue:0,currentValue:0,unit:"Hz",readOnly:!0},P0003:{code:"P0003",description:"Corrente do Motor",min:0,max:100,step:.1,defaultValue:0,currentValue:0,unit:"A",readOnly:!0},P0004:{code:"P0004",description:"Tensão Barramento CC",min:0,max:1e3,step:1,defaultValue:310,currentValue:310,unit:"V",readOnly:!0},P0005:{code:"P0005",description:"Frequência da Referência",min:0,max:300,step:.1,defaultValue:60,currentValue:60,unit:"Hz",readOnly:!0},P0006:{code:"P0006",description:"Estado do Inversor",min:0,max:10,step:1,defaultValue:0,currentValue:0,unit:"",readOnly:!0},P0007:{code:"P0007",description:"Tensão de Saída Motor",min:0,max:500,step:1,defaultValue:0,currentValue:0,unit:"V",readOnly:!0},P0008:{code:"P0008",description:"Fator de Potência",min:0,max:1,step:.01,defaultValue:.82,currentValue:.82,unit:"",readOnly:!0},P0009:{code:"P0009",description:"Torque do Motor",min:-200,max:200,step:.1,defaultValue:0,currentValue:0,unit:"%",readOnly:!0},P0010:{code:"P0010",description:"Potência de Saída",min:0,max:100,step:.1,defaultValue:0,currentValue:0,unit:"kW",readOnly:!0},P0011:{code:"P0011",description:"Sobrecarga Inversor Ixt",min:0,max:100,step:1,defaultValue:0,currentValue:0,unit:"%",readOnly:!0},P0012:{code:"P0012",description:"Status Entradas DI1-DI4",min:0,max:15,step:1,defaultValue:0,currentValue:0,unit:"",readOnly:!0},P0013:{code:"P0013",description:"Status Saídas Relé",min:0,max:7,step:1,defaultValue:1,currentValue:1,unit:"",readOnly:!0},P0014:{code:"P0014",description:"Valor Entrada AI1 (%)",min:0,max:100,step:.1,defaultValue:0,currentValue:0,unit:"%",readOnly:!0},P0018:{code:"P0018",description:"Valor Entrada AI1 (V)",min:0,max:10,step:.1,defaultValue:0,currentValue:0,unit:"V",readOnly:!0},P0023:{code:"P0023",description:"Versão do Software",min:0,max:99.99,step:.01,defaultValue:3.2,currentValue:3.2,unit:"",readOnly:!0},P0030:{code:"P0030",description:"Temperatura Dissipador",min:0,max:150,step:1,defaultValue:38,currentValue:38,unit:"°C",readOnly:!0},P0037:{code:"P0037",description:"Sobrecarga Motor Ixt",min:0,max:100,step:1,defaultValue:0,currentValue:0,unit:"%",readOnly:!0},P0050:{code:"P0050",description:"Última Falha Ocorrida",min:0,max:999,step:1,defaultValue:0,currentValue:0,unit:"",readOnly:!0},P0100:{code:"P0100",description:"Tempo de Aceleração 1",min:.1,max:999,step:.1,defaultValue:5,currentValue:5,unit:"s"},P0101:{code:"P0101",description:"Tempo de Desaceleração 1",min:.1,max:999,step:.1,defaultValue:5,currentValue:5,unit:"s"},P0102:{code:"P0102",description:"Tempo de Aceleração 2",min:.1,max:999,step:.1,defaultValue:10,currentValue:10,unit:"s"},P0103:{code:"P0103",description:"Tempo de Desaceleração 2",min:.1,max:999,step:.1,defaultValue:10,currentValue:10,unit:"s"},P0104:{code:"P0104",description:"Forma da Rampa (0=Linear, 1=S)",min:0,max:1,step:1,defaultValue:0,currentValue:0,unit:""},P0105:{code:"P0105",description:"Seleção 2ª Rampa",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0120:{code:"P0120",description:"Backup Referência IHM",min:0,max:300,step:.1,defaultValue:60,currentValue:60,unit:"Hz"},P0121:{code:"P0121",description:"Referência Frequência IHM",min:0,max:300,step:.1,defaultValue:3,currentValue:60,unit:"Hz"},P0122:{code:"P0122",description:"Frequência de JOG",min:0,max:300,step:.1,defaultValue:5,currentValue:5,unit:"Hz"},P0123:{code:"P0123",description:"Aceleração JOG",min:.1,max:999,step:.1,defaultValue:5,currentValue:5,unit:"s"},P0124:{code:"P0124",description:"Multispeed Referência 1",min:0,max:300,step:.1,defaultValue:5,currentValue:5,unit:"Hz"},P0125:{code:"P0125",description:"Multispeed Referência 2",min:0,max:300,step:.1,defaultValue:10,currentValue:10,unit:"Hz"},P0126:{code:"P0126",description:"Multispeed Referência 3",min:0,max:300,step:.1,defaultValue:20,currentValue:20,unit:"Hz"},P0127:{code:"P0127",description:"Multispeed Referência 4",min:0,max:300,step:.1,defaultValue:30,currentValue:30,unit:"Hz"},P0128:{code:"P0128",description:"Multispeed Referência 5",min:0,max:300,step:.1,defaultValue:40,currentValue:40,unit:"Hz"},P0129:{code:"P0129",description:"Multispeed Referência 6",min:0,max:300,step:.1,defaultValue:50,currentValue:50,unit:"Hz"},P0130:{code:"P0130",description:"Multispeed Referência 7",min:0,max:300,step:.1,defaultValue:55,currentValue:55,unit:"Hz"},P0131:{code:"P0131",description:"Multispeed Referência 8",min:0,max:300,step:.1,defaultValue:60,currentValue:60,unit:"Hz"},P0133:{code:"P0133",description:"Frequência Mínima",min:0,max:300,step:.1,defaultValue:3,currentValue:3,unit:"Hz"},P0134:{code:"P0134",description:"Frequência Máxima",min:0,max:300,step:.1,defaultValue:60,currentValue:60,unit:"Hz"},P0135:{code:"P0135",description:"Corrente Máxima de Saída",min:0,max:50,step:.1,defaultValue:10,currentValue:10,unit:"A"},P0136:{code:"P0136",description:"Boost de Torque Manual (V/F)",min:0,max:30,step:.1,defaultValue:5,currentValue:5,unit:"%"},P0137:{code:"P0137",description:"Boost de Torque Automático",min:0,max:30,step:.1,defaultValue:0,currentValue:0,unit:"%"},P0138:{code:"P0138",description:"Compensação Escorregamento",min:0,max:10,step:.1,defaultValue:1,currentValue:1,unit:"%"},P0139:{code:"P0139",description:"Frequência Chaveamento PWM",min:2.5,max:15,step:.5,defaultValue:5,currentValue:5,unit:"kHz"},P0140:{code:"P0140",description:"Tipo de Frenagem (0=Rampa, 1=Inércia)",min:0,max:1,step:1,defaultValue:0,currentValue:0,unit:""},P0142:{code:"P0142",description:"Tensão de Frenagem CC",min:0,max:30,step:.1,defaultValue:0,currentValue:0,unit:"%"},P0143:{code:"P0143",description:"Tempo Frenagem CC",min:0,max:15,step:.1,defaultValue:0,currentValue:0,unit:"s"},P0145:{code:"P0145",description:"Freq Início Frenagem CC",min:0,max:15,step:.1,defaultValue:2,currentValue:2,unit:"Hz"},P0150:{code:"P0150",description:"Tempo de Duração da Frenagem CC na Parada",min:0,max:15,step:.1,defaultValue:1,currentValue:1,unit:"s"},P0151:{code:"P0151",description:"Frequência de Início da Frenagem CC",min:0,max:15,step:.1,defaultValue:1,currentValue:1,unit:"Hz"},P0152:{code:"P0152",description:"Corrente de Injeção de Frenagem CC",min:0,max:100,step:.1,defaultValue:20,currentValue:20,unit:"%"},P0156:{code:"P0156",description:"Corrente de Sobrecarga do Motor (Limite Térmico)",min:.1,max:30,step:.1,defaultValue:5,currentValue:5,unit:"A"},P0169:{code:"P0169",description:"Frequência de Ressonância (Bypass Mecânico 1)",min:0,max:300,step:.1,defaultValue:0,currentValue:0,unit:"Hz"},P0202:{code:"P0202",description:"Tipo de Controle (0=V/F, 1=VVW)",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0204:{code:"P0204",description:"Carrega Padrão Fábrica (5=Reset)",min:0,max:5,step:1,defaultValue:0,currentValue:0,unit:""},P0205:{code:"P0205",description:"Parâmetro Inicial Display",min:1,max:9,step:1,defaultValue:2,currentValue:2,unit:""},P0206:{code:"P0206",description:"Auto-Reset de Falhas",min:0,max:1,step:1,defaultValue:0,currentValue:0,unit:""},P0208:{code:"P0208",description:"Tensão Nominal Rede CA",min:200,max:480,step:10,defaultValue:220,currentValue:220,unit:"V"},P0217:{code:"P0217",description:"Função Sleep / Dormir",min:0,max:300,step:1,defaultValue:15,currentValue:15,unit:"Hz"},P0218:{code:"P0218",description:"Tempo Inatividade Sleep",min:0,max:999,step:1,defaultValue:120,currentValue:120,unit:"s"},P0219:{code:"P0219",description:"Frequência Despertar Sleep",min:0,max:300,step:.1,defaultValue:10,currentValue:10,unit:"Hz"},P0220:{code:"P0220",description:"Seleção Modo Local/Remoto",min:0,max:3,step:1,defaultValue:2,currentValue:2,unit:""},P0221:{code:"P0221",description:"Referência Local (0=IHM, 1=AI1)",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0222:{code:"P0222",description:"Referência Remota (0=IHM, 1=AI1, 6=Multi, 7=Modbus)",min:0,max:7,step:1,defaultValue:1,currentValue:1,unit:""},P0223:{code:"P0223",description:"Sentido Giro Modo Local",min:0,max:2,step:1,defaultValue:2,currentValue:2,unit:""},P0224:{code:"P0224",description:"Gira/Para Modo Local",min:0,max:1,step:1,defaultValue:0,currentValue:0,unit:""},P0225:{code:"P0225",description:"JOG Modo Local",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0226:{code:"P0226",description:"Sentido Giro Modo Remoto",min:0,max:2,step:1,defaultValue:2,currentValue:2,unit:""},P0227:{code:"P0227",description:"Gira/Para Modo Remoto",min:0,max:1,step:1,defaultValue:1,currentValue:1,unit:""},P0228:{code:"P0228",description:"JOG Modo Remoto",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0231:{code:"P0231",description:"Função Sinal Entrada AI1",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0232:{code:"P0232",description:"Ganho da Entrada AI1",min:0,max:10,step:.01,defaultValue:1,currentValue:1,unit:""},P0233:{code:"P0233",description:"Sinal Entrada AI1 (0=0-10V, 1=4-20mA)",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0234:{code:"P0234",description:"Offset Entrada AI1",min:-100,max:100,step:.1,defaultValue:0,currentValue:0,unit:"%"},P0235:{code:"P0235",description:"Filtro Entrada AI1",min:0,max:10,step:.01,defaultValue:.05,currentValue:.05,unit:"s"},P0251:{code:"P0251",description:"Função Saída Analógica AO1",min:0,max:5,step:1,defaultValue:0,currentValue:0,unit:""},P0252:{code:"P0252",description:"Ganho Saída AO1",min:0,max:10,step:.01,defaultValue:1,currentValue:1,unit:""},P0253:{code:"P0253",description:"Tipo Sinal Saída AO1",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0254:{code:"P0254",description:"Escala Máxima Saída AO1",min:0,max:300,step:1,defaultValue:60,currentValue:60,unit:"Hz"},P0263:{code:"P0263",description:"Função Entrada DI1 (1=Gira/Para)",min:0,max:20,step:1,defaultValue:1,currentValue:1,unit:""},P0264:{code:"P0264",description:"Função Entrada DI2 (1=Sentido, 2=Multi)",min:0,max:20,step:1,defaultValue:1,currentValue:1,unit:""},P0265:{code:"P0265",description:"Função Entrada DI3 (1=Reset, 2=Multi)",min:0,max:20,step:1,defaultValue:2,currentValue:2,unit:""},P0266:{code:"P0266",description:"Função Entrada DI4 (1=JOG, 2=Multi)",min:0,max:20,step:1,defaultValue:2,currentValue:2,unit:""},P0267:{code:"P0267",description:"Função Entrada DI5",min:0,max:20,step:1,defaultValue:0,currentValue:0,unit:""},P0268:{code:"P0268",description:"Função Entrada DI6",min:0,max:20,step:1,defaultValue:0,currentValue:0,unit:""},P0275:{code:"P0275",description:"Função Relé RL1 (15=RUN, 14=Falha)",min:0,max:20,step:1,defaultValue:15,currentValue:15,unit:""},P0276:{code:"P0276",description:"Função Relé RL2 (14=Falha, 1=OK)",min:0,max:20,step:1,defaultValue:14,currentValue:14,unit:""},P0277:{code:"P0277",description:"Função Saída Transistor DO1",min:0,max:20,step:1,defaultValue:14,currentValue:14,unit:""},P0278:{code:"P0278",description:"Atraso Ligação Relé RL1",min:0,max:99.9,step:.1,defaultValue:0,currentValue:0,unit:"s"},P0279:{code:"P0279",description:"Atraso Desligamento Relé RL1",min:0,max:99.9,step:.1,defaultValue:0,currentValue:0,unit:"s"},P0295:{code:"P0295",description:"Corrente Nominal Inversor",min:.1,max:100,step:.1,defaultValue:7.3,currentValue:7.3,unit:"A",readOnly:!0},P0297:{code:"P0297",description:"PWM Automático por Temp.",min:0,max:1,step:1,defaultValue:1,currentValue:1,unit:""},P0308:{code:"P0308",description:"Endereço Modbus RTU",min:1,max:247,step:1,defaultValue:1,currentValue:1,unit:""},P0310:{code:"P0310",description:"Baud Rate (1=19200)",min:0,max:3,step:1,defaultValue:0,currentValue:0,unit:""},P0311:{code:"P0311",description:"Paridade Serial (1=Par 1Stop)",min:0,max:2,step:1,defaultValue:1,currentValue:1,unit:""},P0312:{code:"P0312",description:"Protocolo Comunicação",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0313:{code:"P0313",description:"Ação Timeout Comunicação",min:0,max:3,step:1,defaultValue:0,currentValue:0,unit:""},P0314:{code:"P0314",description:"Tempo Limite Timeout Serial",min:0,max:99.9,step:.1,defaultValue:1,currentValue:1,unit:"s"},P0316:{code:"P0316",description:"Telegramas Modbus Válidos",min:0,max:65535,step:1,defaultValue:142,currentValue:142,unit:"",readOnly:!0},P0340:{code:"P0340",description:"Habilita Tecla LOC/REM",min:0,max:1,step:1,defaultValue:1,currentValue:1,unit:""},P0341:{code:"P0341",description:"Habilita Tecla Sentido Giro",min:0,max:1,step:1,defaultValue:1,currentValue:1,unit:""},P0400:{code:"P0400",description:"Tensão Nominal Motor",min:100,max:600,step:1,defaultValue:220,currentValue:220,unit:"V"},P0401:{code:"P0401",description:"Frequência Nominal Motor",min:10,max:300,step:.1,defaultValue:60,currentValue:60,unit:"Hz"},P0402:{code:"P0402",description:"Rotação Nominal Motor",min:0,max:18e3,step:1,defaultValue:1750,currentValue:1750,unit:"RPM"},P0403:{code:"P0403",description:"Corrente Nominal Motor",min:.1,max:50,step:.1,defaultValue:4.5,currentValue:4.5,unit:"A"},P0404:{code:"P0404",description:"Potência Nominal Motor",min:.1,max:20,step:.1,defaultValue:1.5,currentValue:1.5,unit:"cv"},P0405:{code:"P0405",description:"Rendimento Nominal (Eta)",min:50,max:99,step:.1,defaultValue:83.5,currentValue:83.5,unit:"%"},P0406:{code:"P0406",description:"Fator de Potência Motor",min:.5,max:.99,step:.01,defaultValue:.82,currentValue:.82,unit:""},P0407:{code:"P0407",description:"Fator de Serviço Motor",min:1,max:1.5,step:.01,defaultValue:1.15,currentValue:1.15,unit:""},P0408:{code:"P0408",description:"Auto-Ajuste do Motor",min:0,max:1,step:1,defaultValue:0,currentValue:0,unit:""},P0409:{code:"P0409",description:"Resistência Estatórica (Rs)",min:0,max:99.9,step:.1,defaultValue:2.8,currentValue:2.8,unit:"Ω"}},Zx="@CFW500_EEPROM_STORAGE_V3",E1=()=>{try{const t=localStorage.getItem(Zx);if(!t)return ma;const e=JSON.parse(t),n={...ma};return Object.keys(ma).forEach(i=>{e[i]&&typeof e[i].currentValue=="number"&&(n[i]={...ma[i],currentValue:e[i].currentValue})}),n}catch{return ma}},T1={parameters:E1(),selectedParamIndex:0,editBuffer:0,ihmMode:"MONIT",controlSource:"LOC",motorStatus:"READY",isForwardDirection:!0,activeFault:null,digitalInputs:{di1:!1,di2:!1,di3:!1,di4:!1},ai1Voltage:0,outputFrequency:0,outputCurrent:0,motorRPM:0,dcBusVoltage:310},Qx=ce.createContext(void 0),b1=({children:t})=>{const[e,n]=ce.useReducer(M1,T1);ce.useEffect(()=>{localStorage.setItem(Zx,JSON.stringify(e.parameters))},[e.parameters]);const i=Object.keys(e.parameters),r=e.parameters[i[e.selectedParamIndex]]||ma.P0000;let a="rdy";if(e.activeFault)a=typeof e.activeFault=="object"?e.activeFault.code:e.activeFault;else if(e.ihmMode==="MONIT"){const o=e.outputFrequency??0;a=e.motorStatus==="RUNNING"||o>0?o.toFixed(1):"rdy"}else if(e.ihmMode==="PARAM_SELECT")a=r?r.code:"P0000";else if(e.ihmMode==="PARAM_EDIT"){const s=((r==null?void 0:r.step)??1)<1?1:0;a=r?Number(e.editBuffer??0).toFixed(s):"0"}return h.jsx(Qx.Provider,{value:{state:e,dispatch:n,currentDisplayValue:a,selectedParameter:r},children:t})},Kn=()=>{const t=ce.useContext(Qx);if(!t)throw new Error("useInverter deve ser usado dentro de InverterProvider");return t},A1=({loadTorquePercent:t=20,enableNoise:e=!0}={})=>{const{state:n,dispatch:i}=Kn(),r=ce.useRef(n.outputFrequency),a=ce.useRef(n.motorRPM),o=ce.useRef(n.outputCurrent),s=ce.useRef(null),l=ce.useRef(0);ce.useEffect(()=>{let c;const f=p=>{var H,O,V,D,X,Z,le,Fe,Re;s.current===null&&(s.current=p);const d=Math.min((p-s.current)/1e3,.1);s.current=p;const g=((H=n.parameters.P0217)==null?void 0:H.currentValue)===1,_=((O=n.parameters.P0218)==null?void 0:O.currentValue)??120;n.motorStatus==="RUNNING"&&g&&!n.digitalInputs.di2?(l.current+=d,l.current>=_&&(l.current=0,i({type:"SET_DIGITAL_INPUT",payload:{input:"di1",value:!1}}))):l.current=0;const T=n.motorStatus==="RUNNING"&&!n.activeFault?((V=n.parameters.P0121)==null?void 0:V.currentValue)??60:0,x=((D=n.parameters.P0133)==null?void 0:D.currentValue)??3,u=((X=n.parameters.P0134)==null?void 0:X.currentValue)??60,v=T>0?Math.min(u,Math.max(x,T)):0,M=Math.max(.1,((Z=n.parameters.P0100)==null?void 0:Z.currentValue)??5),S=Math.max(.1,((le=n.parameters.P0101)==null?void 0:le.currentValue)??5),b=u/M,E=u/S;r.current<v?r.current=Math.min(v,r.current+b*d):r.current>v&&(r.current=Math.max(v,r.current-E*d));const C=r.current*120/4,R=C>0?50*(t/100):0;a.current=Math.max(0,Math.round(C-R));const P=((Fe=n.parameters.P0403)==null?void 0:Fe.currentValue)??4.5,I=P*.35,L=I+(P-I)*(t/100),J=r.current<v?P*.4:0,k=e&&r.current>0?(Math.random()-.5)*.15:0;o.current=r.current>0?Math.max(0,L*(r.current/u)+J+k):0;const K=((Re=n.parameters.P0135)==null?void 0:Re.currentValue)??10;o.current>K&&!n.activeFault&&i({type:"TRIGGER_FAULT",payload:{code:"F006",name:"Sobrecorrente de Saída",description:"Corrente ultrapassou o limite do parâmetro P0135.",autoResetable:!1}}),i({type:"UPDATE_DYNAMIC_TELEMETRY",payload:{freq:+r.current.toFixed(1),current:+o.current.toFixed(1),rpm:a.current}}),c=requestAnimationFrame(f)};return c=requestAnimationFrame(f),()=>cancelAnimationFrame(c)},[n.motorStatus,n.activeFault,n.parameters,n.digitalInputs,t,e,i])},C1=()=>{const{dispatch:t}=Kn();ce.useEffect(()=>{const e=n=>{const i=n.target;if(i.tagName==="INPUT"&&i.getAttribute("type")==="text")return;switch(n.key.toLowerCase()){case"p":case"enter":n.preventDefault(),t({type:"PRESS_PROG"});break;case"arrowup":n.preventDefault(),t({type:"PRESS_UP"});break;case"arrowdown":n.preventDefault(),t({type:"PRESS_DOWN"});break;case"i":case"r":n.preventDefault(),t({type:"PRESS_RUN"});break;case"o":case" ":case"escape":n.preventDefault(),t({type:"PRESS_STOP"});break;case"l":n.preventDefault(),t({type:"PRESS_LOCREM"});break;case"d":n.preventDefault(),t({type:"PRESS_DIRECTION"});break}};return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}},[t])},su=()=>{const{state:t,dispatch:e,currentDisplayValue:n,selectedParameter:i}=Kn(),r=Object.keys(t.parameters),a=t.motorStatus==="RUNNING",o=t.activeFault!==null;return h.jsxs("div",{style:R1,children:[h.jsxs("div",{style:w1,children:[h.jsxs("div",{style:P1,children:[h.jsxs("div",{style:I1,children:[h.jsx("span",{style:lu,children:"w"}),h.jsx("span",{style:lu,children:"e"}),h.jsx("span",{style:lu,children:"g"})]}),h.jsxs("div",{style:D1,children:[h.jsx("span",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"1px"},children:"CFW500"}),h.jsx("span",{style:{fontSize:"8px",color:"#90caf9",letterSpacing:"0.5px"},children:"VARIABLE SPEED DRIVE"})]})]}),h.jsxs("div",{style:L1,children:[h.jsx("div",{style:N1,children:h.jsxs("div",{style:F1,children:[h.jsxs("div",{style:U1,children:[h.jsx("span",{style:{fontWeight:"bold",color:t.controlSource==="LOC"?"#0f2410":"#72986e"},children:"[LOC]"}),h.jsx("span",{style:{fontWeight:"bold",color:t.controlSource==="REM"?"#0f2410":"#72986e"},children:"[REM]"}),h.jsx("span",{style:{fontWeight:"bold",color:t.ihmMode==="PARAM_EDIT"?"#0f2410":"#72986e"},children:"PROG"}),h.jsx("span",{style:{fontWeight:"bold",color:a?"#0f2410":"#72986e"},children:t.isForwardDirection?"FWD ↻":"REV ↺"})]}),h.jsx("div",{style:O1,children:h.jsx("span",{style:z1,children:n})}),h.jsxs("div",{style:k1,children:[h.jsx("span",{style:{fontSize:"11px",fontWeight:800},children:t.ihmMode==="PARAM_EDIT"?(i==null?void 0:i.unit)||"VAL":"Hz"}),h.jsx("span",{style:{fontSize:"10px",fontWeight:800,letterSpacing:"0.5px"},children:o?"FAULT":a?"RUN":"READY"})]})]})}),h.jsxs("div",{style:B1,children:[h.jsxs("div",{style:cu,children:[h.jsx("div",{style:{...uu,background:a?"#00e676":"#143818",boxShadow:a?"0 0 10px #00e676, 0 0 2px #fff":"inset 0 1px 2px #000"}}),h.jsx("span",{style:du,children:"RUN"})]}),h.jsxs("div",{style:cu,children:[h.jsx("div",{style:{...uu,background:o?"#ff1744":"#3e1518",boxShadow:o?"0 0 10px #ff1744, 0 0 2px #fff":"inset 0 1px 2px #000"}}),h.jsx("span",{style:du,children:"FAULT"})]}),h.jsxs("div",{style:cu,children:[h.jsx("div",{style:{...uu,background:t.controlSource==="REM"?"#ffb300":"#33260c",boxShadow:t.controlSource==="REM"?"0 0 10px #ffb300, 0 0 2px #fff":"inset 0 1px 2px #000"}}),h.jsx("span",{style:du,children:"REM"})]})]}),h.jsxs("div",{style:V1,children:[h.jsx("button",{style:{...Hi,background:"#005b9f",color:"#fff"},onClick:()=>e({type:"PRESS_PROG"}),title:"Menu / Entrar / Salvar (PROG)",children:h.jsx("span",{style:{fontSize:"11px",fontWeight:900},children:"PROG"})}),h.jsx("button",{style:Hi,onClick:()=>e({type:"PRESS_UP"}),title:"Incrementar / Próximo Parâmetro (▲)",children:h.jsx("span",{style:{fontSize:"16px"},children:"▲"})}),h.jsx("button",{style:{...Hi,fontSize:"10px"},onClick:()=>e({type:"PRESS_LOCREM"}),title:"Alternar Local / Remoto",children:h.jsxs("span",{style:{fontWeight:800,lineHeight:"1.1"},children:["LOC",h.jsx("br",{}),"REM"]})}),h.jsx("button",{style:Hi,onClick:()=>e({type:"PRESS_DIRECTION"}),title:"Inverter Sentido de Giro",children:h.jsx("span",{style:{fontSize:"14px",fontWeight:900},children:"↻/↺"})}),h.jsx("button",{style:Hi,onClick:()=>e({type:"PRESS_DOWN"}),title:"Decrementar / Parâmetro Anterior (▼)",children:h.jsx("span",{style:{fontSize:"16px"},children:"▼"})}),h.jsx("button",{style:{...Hi,color:"#90caf9"},onClick:()=>e({type:"PRESS_PROG"}),title:"Entrar no Modo Parâmetro",children:h.jsx("span",{style:{fontSize:"9px",fontWeight:800},children:"MENU"})}),h.jsx("button",{style:{...Hi,...H1},onClick:()=>e({type:"PRESS_RUN"}),title:"Partir Inversor (RUN - Tecla I)",children:h.jsx("span",{style:{fontSize:"18px",fontWeight:900},children:"I"})}),h.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:h.jsx("div",{style:W1,title:"Módulo de Expansão Plug-in CFW500-IOS",children:h.jsx("span",{style:{fontSize:"8px",color:"#546e7a",fontWeight:700},children:"PLUG-IN"})})}),h.jsx("button",{style:{...Hi,...G1},onClick:()=>e({type:"PRESS_STOP"}),title:"Parar / Resetar Inversor (STOP - Tecla O)",children:h.jsx("span",{style:{fontSize:"18px",fontWeight:900},children:"O"})})]})]}),h.jsxs("div",{style:j1,children:[h.jsx("div",{style:Os}),h.jsx("div",{style:Os}),h.jsx("div",{style:Os}),h.jsx("div",{style:Os})]})]}),h.jsxs("div",{style:X1,children:[h.jsxs("div",{style:q1,children:[h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[h.jsx("span",{style:{color:"#0091ea",fontSize:"14px"},children:"📋"}),h.jsx("strong",{style:{fontSize:"13px",color:"#eceff1"},children:"MAPA DE PARÂMETROS (EEPROM)"})]}),h.jsx("span",{style:Y1,children:(i==null?void 0:i.code)||"P0000"})]}),h.jsxs("div",{style:$1,children:[h.jsxs("div",{style:zs,children:[h.jsx("span",{style:ks,children:"Função:"}),h.jsx("strong",{style:{color:"#64b5f6",textAlign:"right",maxWidth:"65%",fontSize:"12px"},children:i==null?void 0:i.description})]}),h.jsxs("div",{style:zs,children:[h.jsx("span",{style:ks,children:"Faixa de Ajuste:"}),h.jsxs("span",{style:xm,children:[i==null?void 0:i.min," a ",i==null?void 0:i.max," ",i==null?void 0:i.unit]})]}),h.jsxs("div",{style:zs,children:[h.jsx("span",{style:ks,children:"Padrão de Fábrica:"}),h.jsxs("span",{style:xm,children:[i==null?void 0:i.defaultValue," ",i==null?void 0:i.unit]})]}),h.jsxs("div",{style:{...zs,borderBottom:"none",paddingTop:"4px"},children:[h.jsx("span",{style:ks,children:"Valor Atual em Memória:"}),h.jsxs("strong",{style:{color:"#00e676",fontSize:"14px"},children:[i==null?void 0:i.currentValue," ",i==null?void 0:i.unit]})]})]}),h.jsx("h4",{style:{fontSize:"11px",color:"#90a4ae",marginTop:"10px",marginBottom:"6px",letterSpacing:"0.5px"},children:"SELEÇÃO DIRETA DE PARÂMETROS:"}),h.jsx("div",{style:K1,children:r.map(s=>{const l=(i==null?void 0:i.code)===s;return h.jsxs("div",{onClick:()=>e({type:"SELECT_PARAM_DIRECT",payload:s}),style:{...Z1,background:l?"rgba(0, 145, 234, 0.2)":"transparent",borderLeft:l?"3px solid #0091ea":"3px solid transparent",color:l?"#fff":"#b0bec5"},children:[h.jsxs("span",{children:[h.jsx("strong",{style:{color:l?"#64b5f6":"#90a4ae",fontFamily:"monospace"},children:s})," ","- ",t.parameters[s].description]}),h.jsxs("span",{style:{fontFamily:"monospace",fontWeight:700},children:[t.parameters[s].currentValue," ",t.parameters[s].unit]})]},s)})})]})]})},R1={display:"flex",flexWrap:"wrap",gap:"16px",width:"100%",flex:"1 1 520px"},w1={width:"100%",maxWidth:"310px",margin:"0 auto",background:"linear-gradient(180deg, #2b3038 0%, #1c2026 100%)",borderRadius:"14px",padding:"12px",border:"2px solid #3a414d",boxShadow:"0 16px 36px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)",display:"flex",flexDirection:"column",gap:"10px",boxSizing:"border-box",flexShrink:0},P1={background:"linear-gradient(180deg, #005a9c 0%, #004377 100%)",margin:"-12px -12px 2px -12px",padding:"10px 14px",borderTopLeftRadius:"12px",borderTopRightRadius:"12px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"2px solid #002d50",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.2)"},I1={display:"flex",alignItems:"center",background:"#ffffff",padding:"2px 8px",borderRadius:"4px",boxShadow:"0 2px 4px rgba(0,0,0,0.3)"},lu={color:"#005a9c",fontSize:"18px",fontWeight:900,lineHeight:"1",fontFamily:"Arial, sans-serif",letterSpacing:"-1px"},D1={display:"flex",flexDirection:"column",alignItems:"flex-end",color:"#ffffff"},L1={background:"linear-gradient(180deg, #171a1f 0%, #121418 100%)",borderRadius:"10px",padding:"12px",border:"2px solid #0d0f12",boxShadow:"inset 0 2px 6px rgba(0,0,0,0.8)",display:"flex",flexDirection:"column",gap:"10px"},N1={background:"linear-gradient(180deg, #0a0c0e 0%, #181c22 100%)",padding:"8px",borderRadius:"8px",border:"2px solid #232832",boxShadow:"inset 0 3px 8px rgba(0,0,0,0.9), 0 1px 2px rgba(255,255,255,0.05)"},F1={background:"#8cb885",borderRadius:"4px",padding:"8px 10px",color:"#132811",fontFamily:"monospace",boxShadow:"inset 0 0 12px rgba(0,0,0,0.25)",display:"flex",flexDirection:"column",gap:"4px"},U1={display:"flex",justifyContent:"space-between",fontSize:"9px",letterSpacing:"0.5px",borderBottom:"1px dashed rgba(19, 40, 17, 0.3)",paddingBottom:"2px"},O1={display:"flex",justifyContent:"flex-end",alignItems:"center",minHeight:"44px"},z1={fontSize:"38px",fontWeight:900,letterSpacing:"2px",lineHeight:"40px",fontFamily:'"Courier New", Courier, monospace',textShadow:"1px 1px 0px rgba(0,0,0,0.15)"},k1={display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px dashed rgba(19, 40, 17, 0.3)",paddingTop:"2px"},B1={display:"flex",justifyContent:"space-around",alignItems:"center",background:"#0d0f12",padding:"6px 10px",borderRadius:"6px",border:"1px solid #20252e"},cu={display:"flex",alignItems:"center",gap:"6px"},uu={width:"11px",height:"11px",borderRadius:"50%",transition:"all 0.15s ease",border:"1px solid rgba(0,0,0,0.5)"},du={fontSize:"9px",fontWeight:800,color:"#90a4ae",letterSpacing:"0.5px"},V1={display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"8px",marginTop:"2px"},Hi={background:"linear-gradient(180deg, #373e4a 0%, #242932 100%)",border:"1px solid #485261",borderRadius:"6px",color:"#eceff1",height:"44px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 3px 0 #15181e, 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",transition:"transform 0.05s ease, box-shadow 0.05s ease",userSelect:"none"},H1={background:"linear-gradient(180deg, #2e7d32 0%, #1b5e20 100%)",border:"1px solid #43a047",color:"#ffffff",boxShadow:"0 3px 0 #0d3310, 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"},G1={background:"linear-gradient(180deg, #c62828 0%, #8e0000 100%)",border:"1px solid #e53935",color:"#ffffff",boxShadow:"0 3px 0 #4d0000, 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"},W1={width:"100%",height:"36px",background:"#15181e",border:"1px dashed #323946",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center"},j1={display:"flex",justifyContent:"space-between",gap:"6px",padding:"4px 8px 0 8px"},Os={flex:1,height:"14px",background:"#0e1013",borderRadius:"3px",border:"1px solid #2a2f38",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.8)"},X1={flex:"1 1 280px",minWidth:"270px",background:"#1a1d21",borderRadius:"14px",padding:"14px",border:"1px solid #323842",display:"flex",flexDirection:"column",boxShadow:"0 8px 24px rgba(0,0,0,0.4)"},q1={display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #2a2f38",paddingBottom:"8px",marginBottom:"10px"},Y1={background:"#005a9c",color:"#fff",fontFamily:"monospace",fontSize:"12px",fontWeight:800,padding:"3px 8px",borderRadius:"4px",boxShadow:"0 2px 6px rgba(0,90,156,0.4)"},$1={background:"#121417",borderRadius:"8px",padding:"10px",border:"1px solid #252b36",display:"flex",flexDirection:"column",gap:"6px"},zs={display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"11px",paddingBottom:"4px",borderBottom:"1px solid #1c212b"},ks={color:"#90a4ae"},xm={color:"#cfd8dc",fontWeight:600},K1={maxHeight:"180px",overflowY:"auto",background:"#121417",borderRadius:"6px",padding:"4px",border:"1px solid #202631"},Z1={display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"11px",padding:"6px 8px",borderRadius:"4px",marginBottom:"2px",cursor:"pointer",transition:"background 0.15s ease"};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Dp="185",Q1=0,vm=1,J1=2,Rl=1,eS=2,Io=3,mr=0,mn=1,li=2,wi=0,Fa=1,_m=2,ym=3,Sm=4,tS=5,Rr=100,nS=101,iS=102,rS=103,aS=104,oS=200,sS=201,lS=202,cS=203,Xd=204,qd=205,uS=206,dS=207,fS=208,pS=209,hS=210,mS=211,gS=212,xS=213,vS=214,Yd=0,$d=1,Kd=2,ja=3,Zd=4,Qd=5,Jd=6,ef=7,Jx=0,_S=1,yS=2,pi=0,ev=1,tv=2,nv=3,iv=4,rv=5,av=6,ov=7,sv=300,Gr=301,Xa=302,fu=303,pu=304,wc=306,tf=1e3,Ci=1001,nf=1002,Gt=1003,SS=1004,Bs=1005,Jt=1006,hu=1007,Nr=1008,yn=1009,lv=1010,cv=1011,os=1012,Lp=1013,gi=1014,ci=1015,Fi=1016,Np=1017,Fp=1018,ss=1020,uv=35902,dv=35899,fv=1021,pv=1022,Xn=1023,Ui=1026,Fr=1027,hv=1028,Up=1029,Wr=1030,Op=1031,zp=1033,wl=33776,Pl=33777,Il=33778,Dl=33779,rf=35840,af=35841,of=35842,sf=35843,lf=36196,cf=37492,uf=37496,df=37488,ff=37489,rc=37490,pf=37491,hf=37808,mf=37809,gf=37810,xf=37811,vf=37812,_f=37813,yf=37814,Sf=37815,Mf=37816,Ef=37817,Tf=37818,bf=37819,Af=37820,Cf=37821,Rf=36492,wf=36494,Pf=36495,If=36283,Df=36284,ac=36285,Lf=36286,MS=3200,Nf=0,ES=1,er="",wn="srgb",oc="srgb-linear",sc="linear",nt="srgb",Zr=7680,Mm=519,TS=512,bS=513,AS=514,kp=515,CS=516,RS=517,Bp=518,wS=519,Em=35044,Tm="300 es",ui=2e3,ls=2001;function PS(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function lc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function IS(){const t=lc("canvas");return t.style.display="block",t}const bm={};function Am(...t){const e="THREE."+t.shift();console.log(e,...t)}function mv(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Ne(...t){t=mv(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function Qe(...t){t=mv(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function Ua(...t){const e=t.join(" ");e in bm||(bm[e]=!0,Ne(...t))}function DS(t,e,n){return new Promise(function(i,r){function a(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}const LS={[Yd]:$d,[Kd]:Jd,[Zd]:ef,[ja]:Qd,[$d]:Yd,[Jd]:Kd,[ef]:Zd,[Qd]:ja};class qr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(n);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,o=r.length;a<o;a++)r[a].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mu=Math.PI/180,Ff=180/Math.PI;function ms(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[t&255]+Kt[t>>8&255]+Kt[t>>16&255]+Kt[t>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[n&63|128]+Kt[n>>8&255]+"-"+Kt[n>>16&255]+Kt[n>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function Ye(t,e,n){return Math.max(e,Math.min(n,t))}function NS(t,e){return(t%e+e)%e}function gu(t,e,n){return(1-n)*t+n*e}function uo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function cn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const qp=class qp{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),a=this.x-e.x,o=this.y-e.y;return this.x=a*i-o*r+e.x,this.y=a*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};qp.prototype.isVector2=!0;let $e=qp;class Qa{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,a,o,s){let l=i[r+0],c=i[r+1],f=i[r+2],p=i[r+3],d=a[o+0],g=a[o+1],_=a[o+2],T=a[o+3];if(p!==T||l!==d||c!==g||f!==_){let x=l*d+c*g+f*_+p*T;x<0&&(d=-d,g=-g,_=-_,T=-T,x=-x);let u=1-s;if(x<.9995){const v=Math.acos(x),M=Math.sin(v);u=Math.sin(u*v)/M,s=Math.sin(s*v)/M,l=l*u+d*s,c=c*u+g*s,f=f*u+_*s,p=p*u+T*s}else{l=l*u+d*s,c=c*u+g*s,f=f*u+_*s,p=p*u+T*s;const v=1/Math.sqrt(l*l+c*c+f*f+p*p);l*=v,c*=v,f*=v,p*=v}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,r,a,o){const s=i[r],l=i[r+1],c=i[r+2],f=i[r+3],p=a[o],d=a[o+1],g=a[o+2],_=a[o+3];return e[n]=s*_+f*p+l*g-c*d,e[n+1]=l*_+f*d+c*p-s*g,e[n+2]=c*_+f*g+s*d-l*p,e[n+3]=f*_-s*p-l*d-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,a=e._z,o=e._order,s=Math.cos,l=Math.sin,c=s(i/2),f=s(r/2),p=s(a/2),d=l(i/2),g=l(r/2),_=l(a/2);switch(o){case"XYZ":this._x=d*f*p+c*g*_,this._y=c*g*p-d*f*_,this._z=c*f*_+d*g*p,this._w=c*f*p-d*g*_;break;case"YXZ":this._x=d*f*p+c*g*_,this._y=c*g*p-d*f*_,this._z=c*f*_-d*g*p,this._w=c*f*p+d*g*_;break;case"ZXY":this._x=d*f*p-c*g*_,this._y=c*g*p+d*f*_,this._z=c*f*_+d*g*p,this._w=c*f*p-d*g*_;break;case"ZYX":this._x=d*f*p-c*g*_,this._y=c*g*p+d*f*_,this._z=c*f*_-d*g*p,this._w=c*f*p+d*g*_;break;case"YZX":this._x=d*f*p+c*g*_,this._y=c*g*p+d*f*_,this._z=c*f*_-d*g*p,this._w=c*f*p-d*g*_;break;case"XZY":this._x=d*f*p-c*g*_,this._y=c*g*p-d*f*_,this._z=c*f*_+d*g*p,this._w=c*f*p+d*g*_;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],a=n[8],o=n[1],s=n[5],l=n[9],c=n[2],f=n[6],p=n[10],d=i+s+p;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(f-l)*g,this._y=(a-c)*g,this._z=(o-r)*g}else if(i>s&&i>p){const g=2*Math.sqrt(1+i-s-p);this._w=(f-l)/g,this._x=.25*g,this._y=(r+o)/g,this._z=(a+c)/g}else if(s>p){const g=2*Math.sqrt(1+s-i-p);this._w=(a-c)/g,this._x=(r+o)/g,this._y=.25*g,this._z=(l+f)/g}else{const g=2*Math.sqrt(1+p-i-s);this._w=(o-r)/g,this._x=(a+c)/g,this._y=(l+f)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,a=e._z,o=e._w,s=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+o*s+r*c-a*l,this._y=r*f+o*l+a*s-i*c,this._z=a*f+o*c+i*l-r*s,this._w=o*f-i*s-r*l-a*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,a=e._z,o=e._w,s=this.dot(e);s<0&&(i=-i,r=-r,a=-a,o=-o,s=-s);let l=1-n;if(s<.9995){const c=Math.acos(s),f=Math.sin(c);l=Math.sin(l*c)/f,n=Math.sin(n*c)/f,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+a*n,this._w=this._w*l+o*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+a*n,this._w=this._w*l+o*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(n),a*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Yp=class Yp{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Cm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Cm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6]*r,this.y=a[1]*n+a[4]*i+a[7]*r,this.z=a[2]*n+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,a=e.elements,o=1/(a[3]*n+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*r+a[12])*o,this.y=(a[1]*n+a[5]*i+a[9]*r+a[13])*o,this.z=(a[2]*n+a[6]*i+a[10]*r+a[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,a=e.x,o=e.y,s=e.z,l=e.w,c=2*(o*r-s*i),f=2*(s*n-a*r),p=2*(a*i-o*n);return this.x=n+l*c+o*p-s*f,this.y=i+l*f+s*c-a*p,this.z=r+l*p+a*f-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r,this.y=a[1]*n+a[5]*i+a[9]*r,this.z=a[2]*n+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,a=e.z,o=n.x,s=n.y,l=n.z;return this.x=r*l-a*s,this.y=a*o-i*l,this.z=i*s-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xu.copy(this).projectOnVector(e),this.sub(xu)}reflect(e){return this.sub(xu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Yp.prototype.isVector3=!0;let B=Yp;const xu=new B,Cm=new Qa,$p=class $p{constructor(e,n,i,r,a,o,s,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,a,o,s,l,c)}set(e,n,i,r,a,o,s,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=s,f[3]=n,f[4]=a,f[5]=l,f[6]=i,f[7]=o,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,a=this.elements,o=i[0],s=i[3],l=i[6],c=i[1],f=i[4],p=i[7],d=i[2],g=i[5],_=i[8],T=r[0],x=r[3],u=r[6],v=r[1],M=r[4],S=r[7],b=r[2],E=r[5],C=r[8];return a[0]=o*T+s*v+l*b,a[3]=o*x+s*M+l*E,a[6]=o*u+s*S+l*C,a[1]=c*T+f*v+p*b,a[4]=c*x+f*M+p*E,a[7]=c*u+f*S+p*C,a[2]=d*T+g*v+_*b,a[5]=d*x+g*M+_*E,a[8]=d*u+g*S+_*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],f=e[8];return n*o*f-n*s*c-i*a*f+i*s*l+r*a*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],f=e[8],p=f*o-s*c,d=s*l-f*a,g=c*a-o*l,_=n*p+i*d+r*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/_;return e[0]=p*T,e[1]=(r*c-f*i)*T,e[2]=(s*i-r*o)*T,e[3]=d*T,e[4]=(f*n-r*l)*T,e[5]=(r*a-s*n)*T,e[6]=g*T,e[7]=(i*l-c*n)*T,e[8]=(o*n-i*a)*T,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,a,o,s){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*o+c*s)+o+e,-r*c,r*l,-r*(-c*o+l*s)+s+n,0,0,1),this}scale(e,n){return Ua("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(vu.makeScale(e,n)),this}rotate(e){return Ua("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(vu.makeRotation(-e)),this}translate(e,n){return Ua("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(vu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};$p.prototype.isMatrix3=!0;let ze=$p;const vu=new ze,Rm=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wm=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function FS(){const t={enabled:!0,workingColorSpace:oc,spaces:{},convert:function(r,a,o){return this.enabled===!1||a===o||!a||!o||(this.spaces[a].transfer===nt&&(r.r=Pi(r.r),r.g=Pi(r.g),r.b=Pi(r.b)),this.spaces[a].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===nt&&(r.r=Oa(r.r),r.g=Oa(r.g),r.b=Oa(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===er?sc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,o){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return Ua("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return Ua("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[oc]:{primaries:e,whitePoint:i,transfer:sc,toXYZ:Rm,fromXYZ:wm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:e,whitePoint:i,transfer:nt,toXYZ:Rm,fromXYZ:wm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}}),t}const qe=FS();function Pi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Oa(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Qr;class US{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Qr===void 0&&(Qr=lc("canvas")),Qr.width=e.width,Qr.height=e.height;const r=Qr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Qr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=lc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=Pi(a[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Pi(n[i]/255)*255):n[i]=Pi(n[i]);return{data:n,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let OS=0;class Vp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:OS++}),this.uuid=ms(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,s=r.length;o<s;o++)r[o].isDataTexture?a.push(_u(r[o].image)):a.push(_u(r[o]))}else a=_u(r);i.url=a}return n||(e.images[this.uuid]=i),i}}function _u(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?US.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}let zS=0;const yu=new B;class en extends qr{constructor(e=en.DEFAULT_IMAGE,n=en.DEFAULT_MAPPING,i=Ci,r=Ci,a=Jt,o=Nr,s=Xn,l=yn,c=en.DEFAULT_ANISOTROPY,f=er){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zS++}),this.uuid=ms(),this.name="",this.source=new Vp(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=s,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(yu).x}get height(){return this.source.getSize(yu).y}get depth(){return this.source.getSize(yu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Ne(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ne(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case tf:e.x=e.x-Math.floor(e.x);break;case Ci:e.x=e.x<0?0:1;break;case nf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case tf:e.y=e.y-Math.floor(e.y);break;case Ci:e.y=e.y<0?0:1;break;case nf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=sv;en.DEFAULT_ANISOTROPY=1;const Kp=class Kp{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*a,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*a,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*a,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,a;const l=e.elements,c=l[0],f=l[4],p=l[8],d=l[1],g=l[5],_=l[9],T=l[2],x=l[6],u=l[10];if(Math.abs(f-d)<.01&&Math.abs(p-T)<.01&&Math.abs(_-x)<.01){if(Math.abs(f+d)<.1&&Math.abs(p+T)<.1&&Math.abs(_+x)<.1&&Math.abs(c+g+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(c+1)/2,S=(g+1)/2,b=(u+1)/2,E=(f+d)/4,C=(p+T)/4,m=(_+x)/4;return M>S&&M>b?M<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(M),r=E/i,a=C/i):S>b?S<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(S),i=E/r,a=m/r):b<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(b),i=C/a,r=m/a),this.set(i,r,a,n),this}let v=Math.sqrt((x-_)*(x-_)+(p-T)*(p-T)+(d-f)*(d-f));return Math.abs(v)<.001&&(v=1),this.x=(x-_)/v,this.y=(p-T)/v,this.z=(d-f)/v,this.w=Math.acos((c+g+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this.w=Ye(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this.w=Ye(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Kp.prototype.isVector4=!0;let xt=Kp;class kS extends qr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new xt(0,0,e,n),this.scissorTest=!1,this.viewport=new xt(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},a=new en(r),o=i.count;for(let s=0;s<o;s++)this.textures[s]=a.clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Vp(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends kS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class gv extends en{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class BS extends en{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const fc=class fc{constructor(e,n,i,r,a,o,s,l,c,f,p,d,g,_,T,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,a,o,s,l,c,f,p,d,g,_,T,x)}set(e,n,i,r,a,o,s,l,c,f,p,d,g,_,T,x){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=a,u[5]=o,u[9]=s,u[13]=l,u[2]=c,u[6]=f,u[10]=p,u[14]=d,u[3]=g,u[7]=_,u[11]=T,u[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fc().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/Jr.setFromMatrixColumn(e,0).length(),a=1/Jr.setFromMatrixColumn(e,1).length(),o=1/Jr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,a=e.z,o=Math.cos(i),s=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(a),p=Math.sin(a);if(e.order==="XYZ"){const d=o*f,g=o*p,_=s*f,T=s*p;n[0]=l*f,n[4]=-l*p,n[8]=c,n[1]=g+_*c,n[5]=d-T*c,n[9]=-s*l,n[2]=T-d*c,n[6]=_+g*c,n[10]=o*l}else if(e.order==="YXZ"){const d=l*f,g=l*p,_=c*f,T=c*p;n[0]=d+T*s,n[4]=_*s-g,n[8]=o*c,n[1]=o*p,n[5]=o*f,n[9]=-s,n[2]=g*s-_,n[6]=T+d*s,n[10]=o*l}else if(e.order==="ZXY"){const d=l*f,g=l*p,_=c*f,T=c*p;n[0]=d-T*s,n[4]=-o*p,n[8]=_+g*s,n[1]=g+_*s,n[5]=o*f,n[9]=T-d*s,n[2]=-o*c,n[6]=s,n[10]=o*l}else if(e.order==="ZYX"){const d=o*f,g=o*p,_=s*f,T=s*p;n[0]=l*f,n[4]=_*c-g,n[8]=d*c+T,n[1]=l*p,n[5]=T*c+d,n[9]=g*c-_,n[2]=-c,n[6]=s*l,n[10]=o*l}else if(e.order==="YZX"){const d=o*l,g=o*c,_=s*l,T=s*c;n[0]=l*f,n[4]=T-d*p,n[8]=_*p+g,n[1]=p,n[5]=o*f,n[9]=-s*f,n[2]=-c*f,n[6]=g*p+_,n[10]=d-T*p}else if(e.order==="XZY"){const d=o*l,g=o*c,_=s*l,T=s*c;n[0]=l*f,n[4]=-p,n[8]=c*f,n[1]=d*p+T,n[5]=o*f,n[9]=g*p-_,n[2]=_*p-g,n[6]=s*f,n[10]=T*p+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(VS,e,HS)}lookAt(e,n,i){const r=this.elements;return xn.subVectors(e,n),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),Gi.crossVectors(i,xn),Gi.lengthSq()===0&&(Math.abs(i.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),Gi.crossVectors(i,xn)),Gi.normalize(),Vs.crossVectors(xn,Gi),r[0]=Gi.x,r[4]=Vs.x,r[8]=xn.x,r[1]=Gi.y,r[5]=Vs.y,r[9]=xn.y,r[2]=Gi.z,r[6]=Vs.z,r[10]=xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,a=this.elements,o=i[0],s=i[4],l=i[8],c=i[12],f=i[1],p=i[5],d=i[9],g=i[13],_=i[2],T=i[6],x=i[10],u=i[14],v=i[3],M=i[7],S=i[11],b=i[15],E=r[0],C=r[4],m=r[8],R=r[12],P=r[1],I=r[5],L=r[9],Y=r[13],J=r[2],k=r[6],K=r[10],H=r[14],O=r[3],V=r[7],D=r[11],X=r[15];return a[0]=o*E+s*P+l*J+c*O,a[4]=o*C+s*I+l*k+c*V,a[8]=o*m+s*L+l*K+c*D,a[12]=o*R+s*Y+l*H+c*X,a[1]=f*E+p*P+d*J+g*O,a[5]=f*C+p*I+d*k+g*V,a[9]=f*m+p*L+d*K+g*D,a[13]=f*R+p*Y+d*H+g*X,a[2]=_*E+T*P+x*J+u*O,a[6]=_*C+T*I+x*k+u*V,a[10]=_*m+T*L+x*K+u*D,a[14]=_*R+T*Y+x*H+u*X,a[3]=v*E+M*P+S*J+b*O,a[7]=v*C+M*I+S*k+b*V,a[11]=v*m+M*L+S*K+b*D,a[15]=v*R+M*Y+S*H+b*X,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],a=e[12],o=e[1],s=e[5],l=e[9],c=e[13],f=e[2],p=e[6],d=e[10],g=e[14],_=e[3],T=e[7],x=e[11],u=e[15],v=l*g-c*d,M=s*g-c*p,S=s*d-l*p,b=o*g-c*f,E=o*d-l*f,C=o*p-s*f;return n*(T*v-x*M+u*S)-i*(_*v-x*b+u*E)+r*(_*M-T*b+u*C)-a*(_*S-T*E+x*C)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],s=e[9],l=e[2],c=e[6],f=e[10];return n*(o*f-s*c)-i*(a*f-s*l)+r*(a*c-o*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],f=e[8],p=e[9],d=e[10],g=e[11],_=e[12],T=e[13],x=e[14],u=e[15],v=n*s-i*o,M=n*l-r*o,S=n*c-a*o,b=i*l-r*s,E=i*c-a*s,C=r*c-a*l,m=f*T-p*_,R=f*x-d*_,P=f*u-g*_,I=p*x-d*T,L=p*u-g*T,Y=d*u-g*x,J=v*Y-M*L+S*I+b*P-E*R+C*m;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/J;return e[0]=(s*Y-l*L+c*I)*k,e[1]=(r*L-i*Y-a*I)*k,e[2]=(T*C-x*E+u*b)*k,e[3]=(d*E-p*C-g*b)*k,e[4]=(l*P-o*Y-c*R)*k,e[5]=(n*Y-r*P+a*R)*k,e[6]=(x*S-_*C-u*M)*k,e[7]=(f*C-d*S+g*M)*k,e[8]=(o*L-s*P+c*m)*k,e[9]=(i*P-n*L-a*m)*k,e[10]=(_*E-T*S+u*v)*k,e[11]=(p*S-f*E-g*v)*k,e[12]=(s*R-o*I-l*m)*k,e[13]=(n*I-i*R+r*m)*k,e[14]=(T*M-_*b-x*v)*k,e[15]=(f*b-p*M+d*v)*k,this}scale(e){const n=this.elements,i=e.x,r=e.y,a=e.z;return n[0]*=i,n[4]*=r,n[8]*=a,n[1]*=i,n[5]*=r,n[9]*=a,n[2]*=i,n[6]*=r,n[10]*=a,n[3]*=i,n[7]*=r,n[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),a=1-i,o=e.x,s=e.y,l=e.z,c=a*o,f=a*s;return this.set(c*o+i,c*s-r*l,c*l+r*s,0,c*s+r*l,f*s+i,f*l-r*o,0,c*l-r*s,f*l+r*o,a*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,a,o){return this.set(1,i,a,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,a=n._x,o=n._y,s=n._z,l=n._w,c=a+a,f=o+o,p=s+s,d=a*c,g=a*f,_=a*p,T=o*f,x=o*p,u=s*p,v=l*c,M=l*f,S=l*p,b=i.x,E=i.y,C=i.z;return r[0]=(1-(T+u))*b,r[1]=(g+S)*b,r[2]=(_-M)*b,r[3]=0,r[4]=(g-S)*E,r[5]=(1-(d+u))*E,r[6]=(x+v)*E,r[7]=0,r[8]=(_+M)*C,r[9]=(x-v)*C,r[10]=(1-(d+T))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return i.set(1,1,1),n.identity(),this;let o=Jr.set(r[0],r[1],r[2]).length();const s=Jr.set(r[4],r[5],r[6]).length(),l=Jr.set(r[8],r[9],r[10]).length();a<0&&(o=-o),kn.copy(this);const c=1/o,f=1/s,p=1/l;return kn.elements[0]*=c,kn.elements[1]*=c,kn.elements[2]*=c,kn.elements[4]*=f,kn.elements[5]*=f,kn.elements[6]*=f,kn.elements[8]*=p,kn.elements[9]*=p,kn.elements[10]*=p,n.setFromRotationMatrix(kn),i.x=o,i.y=s,i.z=l,this}makePerspective(e,n,i,r,a,o,s=ui,l=!1){const c=this.elements,f=2*a/(n-e),p=2*a/(i-r),d=(n+e)/(n-e),g=(i+r)/(i-r);let _,T;if(l)_=a/(o-a),T=o*a/(o-a);else if(s===ui)_=-(o+a)/(o-a),T=-2*o*a/(o-a);else if(s===ls)_=-o/(o-a),T=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+s);return c[0]=f,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=p,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=T,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,a,o,s=ui,l=!1){const c=this.elements,f=2/(n-e),p=2/(i-r),d=-(n+e)/(n-e),g=-(i+r)/(i-r);let _,T;if(l)_=1/(o-a),T=o/(o-a);else if(s===ui)_=-2/(o-a),T=-(o+a)/(o-a);else if(s===ls)_=-1/(o-a),T=-a/(o-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+s);return c[0]=f,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=p,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=_,c[14]=T,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};fc.prototype.isMatrix4=!0;let _t=fc;const Jr=new B,kn=new _t,VS=new B(0,0,0),HS=new B(1,1,1),Gi=new B,Vs=new B,xn=new B,Pm=new _t,Im=new Qa;class gr{constructor(e=0,n=0,i=0,r=gr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,a=r[0],o=r[4],s=r[8],l=r[1],c=r[5],f=r[9],p=r[2],d=r[6],g=r[10];switch(n){case"XYZ":this._y=Math.asin(Ye(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-f,g),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(s,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,g),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Ye(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(s,g));break;case"XZY":this._z=Math.asin(-Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(s,a)):(this._x=Math.atan2(-f,g),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Pm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Im.setFromEuler(this),this.setFromQuaternion(Im,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gr.DEFAULT_ORDER="XYZ";class xv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let GS=0;const Dm=new B,ea=new Qa,vi=new _t,Hs=new B,fo=new B,WS=new B,jS=new Qa,Lm=new B(1,0,0),Nm=new B(0,1,0),Fm=new B(0,0,1),Um={type:"added"},XS={type:"removed"},ta={type:"childadded",child:null},Su={type:"childremoved",child:null};class jt extends qr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:GS++}),this.uuid=ms(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jt.DEFAULT_UP.clone();const e=new B,n=new gr,i=new Qa,r=new B(1,1,1);function a(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new _t},normalMatrix:{value:new ze}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ea.setFromAxisAngle(e,n),this.quaternion.multiply(ea),this}rotateOnWorldAxis(e,n){return ea.setFromAxisAngle(e,n),this.quaternion.premultiply(ea),this}rotateX(e){return this.rotateOnAxis(Lm,e)}rotateY(e){return this.rotateOnAxis(Nm,e)}rotateZ(e){return this.rotateOnAxis(Fm,e)}translateOnAxis(e,n){return Dm.copy(e).applyQuaternion(this.quaternion),this.position.add(Dm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Lm,e)}translateY(e){return this.translateOnAxis(Nm,e)}translateZ(e){return this.translateOnAxis(Fm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Hs.copy(e):Hs.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),fo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(fo,Hs,this.up):vi.lookAt(Hs,fo,this.up),this.quaternion.setFromRotationMatrix(vi),r&&(vi.extractRotation(r.matrixWorld),ea.setFromRotationMatrix(vi),this.quaternion.premultiply(ea.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Um),ta.child=e,this.dispatchEvent(ta),ta.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(XS),Su.child=e,this.dispatchEvent(Su),Su.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Um),ta.child=e,this.dispatchEvent(ta),ta.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fo,e,WS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fo,jS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=n-a[0]*n-a[4]*i-a[8]*r,a[13]+=i-a[1]*n-a[5]*i-a[9]*r,a[14]+=r-a[2]*n-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const a=this.children;for(let o=0,s=a.length;o<s;o++)a[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(s=>({...s,boundingBox:s.boundingBox?s.boundingBox.toJSON():void 0,boundingSphere:s.boundingSphere?s.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(s=>({...s})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(s,l){return s[l.uuid]===void 0&&(s[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const s=this.geometry.parameters;if(s!==void 0&&s.shapes!==void 0){const l=s.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const p=l[c];a(e.shapes,p)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const s=[];for(let l=0,c=this.material.length;l<c;l++)s.push(a(e.materials,this.material[l]));r.material=s}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let s=0;s<this.children.length;s++)r.children.push(this.children[s].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let s=0;s<this.animations.length;s++){const l=this.animations[s];r.animations.push(a(e.animations,l))}}if(n){const s=o(e.geometries),l=o(e.materials),c=o(e.textures),f=o(e.images),p=o(e.shapes),d=o(e.skeletons),g=o(e.animations),_=o(e.nodes);s.length>0&&(i.geometries=s),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),p.length>0&&(i.shapes=p),d.length>0&&(i.skeletons=d),g.length>0&&(i.animations=g),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(s){const l=[];for(const c in s){const f=s[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}jt.DEFAULT_UP=new B(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ra extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qS={type:"move"};class Mu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ra,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ra,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ra,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,a=null,o=null;const s=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const T of e.hand.values()){const x=n.getJointPose(T,i),u=this._getHandJoint(c,T);x!==null&&(u.matrix.fromArray(x.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=x.radius),u.visible=x!==null}const f=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],d=f.position.distanceTo(p.position),g=.02,_=.005;c.inputState.pinching&&d>g+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=g-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=n.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));s!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(qS)))}return s!==null&&(s.visible=r!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ra;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const vv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},Gs={h:0,s:0,l:0};function Eu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class We{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=qe.workingColorSpace){return this.r=e,this.g=n,this.b=i,qe.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=qe.workingColorSpace){if(e=NS(e,1),n=Ye(n,0,1),i=Ye(i,0,1),n===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+n):i+n-i*n,o=2*i-a;this.r=Eu(o,a,e+1/3),this.g=Eu(o,a,e),this.b=Eu(o,a,e-1/3)}return qe.colorSpaceToWorking(this,r),this}setStyle(e,n=wn){function i(a){a!==void 0&&parseFloat(a)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=r[1],s=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:Ne("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(a,16),n);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=wn){const i=vv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=Oa(e.r),this.g=Oa(e.g),this.b=Oa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wn){return qe.workingToColorSpace(Zt.copy(this),e),Math.round(Ye(Zt.r*255,0,255))*65536+Math.round(Ye(Zt.g*255,0,255))*256+Math.round(Ye(Zt.b*255,0,255))}getHexString(e=wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=qe.workingColorSpace){qe.workingToColorSpace(Zt.copy(this),n);const i=Zt.r,r=Zt.g,a=Zt.b,o=Math.max(i,r,a),s=Math.min(i,r,a);let l,c;const f=(s+o)/2;if(s===o)l=0,c=0;else{const p=o-s;switch(c=f<=.5?p/(o+s):p/(2-o-s),o){case i:l=(r-a)/p+(r<a?6:0);break;case r:l=(a-i)/p+2;break;case a:l=(i-r)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=qe.workingColorSpace){return qe.workingToColorSpace(Zt.copy(this),n),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=wn){qe.workingToColorSpace(Zt.copy(this),e);const n=Zt.r,i=Zt.g,r=Zt.b;return e!==wn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+n,Wi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Wi),e.getHSL(Gs);const i=gu(Wi.h,Gs.h,n),r=gu(Wi.s,Gs.s,n),a=gu(Wi.l,Gs.l,n);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*n+a[3]*i+a[6]*r,this.g=a[1]*n+a[4]*i+a[7]*r,this.b=a[2]*n+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new We;We.NAMES=vv;class YS extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gr,this.environmentIntensity=1,this.environmentRotation=new gr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Bn=new B,_i=new B,Tu=new B,yi=new B,na=new B,ia=new B,Om=new B,bu=new B,Au=new B,Cu=new B,Ru=new xt,wu=new xt,Pu=new xt;class jn{constructor(e=new B,n=new B,i=new B){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Bn.subVectors(e,n),r.cross(Bn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,n,i,r,a){Bn.subVectors(r,n),_i.subVectors(i,n),Tu.subVectors(e,n);const o=Bn.dot(Bn),s=Bn.dot(_i),l=Bn.dot(Tu),c=_i.dot(_i),f=_i.dot(Tu),p=o*c-s*s;if(p===0)return a.set(0,0,0),null;const d=1/p,g=(c*l-s*f)*d,_=(o*f-s*l)*d;return a.set(1-g-_,_,g)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(e,n,i,r,a,o,s,l){return this.getBarycoord(e,n,i,r,yi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,yi.x),l.addScaledVector(o,yi.y),l.addScaledVector(s,yi.z),l)}static getInterpolatedAttribute(e,n,i,r,a,o){return Ru.setScalar(0),wu.setScalar(0),Pu.setScalar(0),Ru.fromBufferAttribute(e,n),wu.fromBufferAttribute(e,i),Pu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Ru,a.x),o.addScaledVector(wu,a.y),o.addScaledVector(Pu,a.z),o}static isFrontFacing(e,n,i,r){return Bn.subVectors(i,n),_i.subVectors(e,n),Bn.cross(_i).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),Bn.cross(_i).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return jn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,a){return jn.getInterpolation(e,this.a,this.b,this.c,n,i,r,a)}containsPoint(e){return jn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,a=this.c;let o,s;na.subVectors(r,i),ia.subVectors(a,i),bu.subVectors(e,i);const l=na.dot(bu),c=ia.dot(bu);if(l<=0&&c<=0)return n.copy(i);Au.subVectors(e,r);const f=na.dot(Au),p=ia.dot(Au);if(f>=0&&p<=f)return n.copy(r);const d=l*p-f*c;if(d<=0&&l>=0&&f<=0)return o=l/(l-f),n.copy(i).addScaledVector(na,o);Cu.subVectors(e,a);const g=na.dot(Cu),_=ia.dot(Cu);if(_>=0&&g<=_)return n.copy(a);const T=g*c-l*_;if(T<=0&&c>=0&&_<=0)return s=c/(c-_),n.copy(i).addScaledVector(ia,s);const x=f*_-g*p;if(x<=0&&p-f>=0&&g-_>=0)return Om.subVectors(a,r),s=(p-f)/(p-f+(g-_)),n.copy(r).addScaledVector(Om,s);const u=1/(x+T+d);return o=T*u,s=d*u,n.copy(i).addScaledVector(na,o).addScaledVector(ia,s)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class gs{constructor(e=new B(1/0,1/0,1/0),n=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Vn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Vn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Vn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(n===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,s=a.count;o<s;o++)e.isMesh===!0?e.getVertexPosition(o,Vn):Vn.fromBufferAttribute(a,o),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ws.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ws.copy(i.boundingBox)),Ws.applyMatrix4(e.matrixWorld),this.union(Ws)}const r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(po),js.subVectors(this.max,po),ra.subVectors(e.a,po),aa.subVectors(e.b,po),oa.subVectors(e.c,po),ji.subVectors(aa,ra),Xi.subVectors(oa,aa),Sr.subVectors(ra,oa);let n=[0,-ji.z,ji.y,0,-Xi.z,Xi.y,0,-Sr.z,Sr.y,ji.z,0,-ji.x,Xi.z,0,-Xi.x,Sr.z,0,-Sr.x,-ji.y,ji.x,0,-Xi.y,Xi.x,0,-Sr.y,Sr.x,0];return!Iu(n,ra,aa,oa,js)||(n=[1,0,0,0,1,0,0,0,1],!Iu(n,ra,aa,oa,js))?!1:(Xs.crossVectors(ji,Xi),n=[Xs.x,Xs.y,Xs.z],Iu(n,ra,aa,oa,js))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Si=[new B,new B,new B,new B,new B,new B,new B,new B],Vn=new B,Ws=new gs,ra=new B,aa=new B,oa=new B,ji=new B,Xi=new B,Sr=new B,po=new B,js=new B,Xs=new B,Mr=new B;function Iu(t,e,n,i,r){for(let a=0,o=t.length-3;a<=o;a+=3){Mr.fromArray(t,a);const s=r.x*Math.abs(Mr.x)+r.y*Math.abs(Mr.y)+r.z*Math.abs(Mr.z),l=e.dot(Mr),c=n.dot(Mr),f=i.dot(Mr);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>s)return!1}return!0}const It=new B,qs=new $e;let $S=0;class mi extends qr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$S++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Em,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)qs.fromBufferAttribute(this,n),qs.applyMatrix3(e),this.setXY(n,qs.x,qs.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)It.fromBufferAttribute(this,n),It.applyMatrix3(e),this.setXYZ(n,It.x,It.y,It.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)It.fromBufferAttribute(this,n),It.applyMatrix4(e),this.setXYZ(n,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)It.fromBufferAttribute(this,n),It.applyNormalMatrix(e),this.setXYZ(n,It.x,It.y,It.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)It.fromBufferAttribute(this,n),It.transformDirection(e),this.setXYZ(n,It.x,It.y,It.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=uo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=cn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=uo(n,this.array)),n}setX(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=uo(n,this.array)),n}setY(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=uo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=uo(n,this.array)),n}setW(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=cn(n,this.array),i=cn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=cn(n,this.array),i=cn(i,this.array),r=cn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,a){return e*=this.itemSize,this.normalized&&(n=cn(n,this.array),i=cn(i,this.array),r=cn(r,this.array),a=cn(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Em&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class _v extends mi{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class yv extends mi{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class tn extends mi{constructor(e,n,i){super(new Float32Array(e),n,i)}}const KS=new gs,ho=new B,Du=new B;class Pc{constructor(e=new B,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):KS.setFromPoints(e).getCenter(i);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ho.subVectors(e,this.center);const n=ho.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ho,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Du.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ho.copy(e.center).add(Du)),this.expandByPoint(ho.copy(e.center).sub(Du))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ZS=0;const Cn=new _t,Lu=new jt,sa=new B,vn=new gs,mo=new gs,zt=new B;class On extends qr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=ms(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(PS(e)?yv:_v)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new ze().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Cn.makeRotationFromQuaternion(e),this.applyMatrix4(Cn),this}rotateX(e){return Cn.makeRotationX(e),this.applyMatrix4(Cn),this}rotateY(e){return Cn.makeRotationY(e),this.applyMatrix4(Cn),this}rotateZ(e){return Cn.makeRotationZ(e),this.applyMatrix4(Cn),this}translate(e,n,i){return Cn.makeTranslation(e,n,i),this.applyMatrix4(Cn),this}scale(e,n,i){return Cn.makeScale(e,n,i),this.applyMatrix4(Cn),this}lookAt(e){return Lu.lookAt(e),Lu.updateMatrix(),this.applyMatrix4(Lu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(sa).negate(),this.translate(sa.x,sa.y,sa.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new tn(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const a=e[r];n.setXYZ(r,a.x,a.y,a.z||0)}e.length>n.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gs);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const a=n[i];vn.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),n)for(let a=0,o=n.length;a<o;a++){const s=n[a];mo.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(vn.min,mo.min),vn.expandByPoint(zt),zt.addVectors(vn.max,mo.max),vn.expandByPoint(zt)):(vn.expandByPoint(mo.min),vn.expandByPoint(mo.max))}vn.getCenter(i);let r=0;for(let a=0,o=e.count;a<o;a++)zt.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(zt));if(n)for(let a=0,o=n.length;a<o;a++){const s=n[a],l=this.morphTargetsRelative;for(let c=0,f=s.count;c<f;c++)zt.fromBufferAttribute(s,c),l&&(sa.fromBufferAttribute(e,c),zt.add(sa)),r=Math.max(r,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,a=n.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new mi(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const s=[],l=[];for(let m=0;m<i.count;m++)s[m]=new B,l[m]=new B;const c=new B,f=new B,p=new B,d=new $e,g=new $e,_=new $e,T=new B,x=new B;function u(m,R,P){c.fromBufferAttribute(i,m),f.fromBufferAttribute(i,R),p.fromBufferAttribute(i,P),d.fromBufferAttribute(a,m),g.fromBufferAttribute(a,R),_.fromBufferAttribute(a,P),f.sub(c),p.sub(c),g.sub(d),_.sub(d);const I=1/(g.x*_.y-_.x*g.y);isFinite(I)&&(T.copy(f).multiplyScalar(_.y).addScaledVector(p,-g.y).multiplyScalar(I),x.copy(p).multiplyScalar(g.x).addScaledVector(f,-_.x).multiplyScalar(I),s[m].add(T),s[R].add(T),s[P].add(T),l[m].add(x),l[R].add(x),l[P].add(x))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let m=0,R=v.length;m<R;++m){const P=v[m],I=P.start,L=P.count;for(let Y=I,J=I+L;Y<J;Y+=3)u(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const M=new B,S=new B,b=new B,E=new B;function C(m){b.fromBufferAttribute(r,m),E.copy(b);const R=s[m];M.copy(R),M.sub(b.multiplyScalar(b.dot(R))).normalize(),S.crossVectors(E,R);const I=S.dot(l[m])<0?-1:1;o.setXYZW(m,M.x,M.y,M.z,I)}for(let m=0,R=v.length;m<R;++m){const P=v[m],I=P.start,L=P.count;for(let Y=I,J=I+L;Y<J;Y+=3)C(e.getX(Y+0)),C(e.getX(Y+1)),C(e.getX(Y+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new mi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,g=i.count;d<g;d++)i.setXYZ(d,0,0,0);const r=new B,a=new B,o=new B,s=new B,l=new B,c=new B,f=new B,p=new B;if(e)for(let d=0,g=e.count;d<g;d+=3){const _=e.getX(d+0),T=e.getX(d+1),x=e.getX(d+2);r.fromBufferAttribute(n,_),a.fromBufferAttribute(n,T),o.fromBufferAttribute(n,x),f.subVectors(o,a),p.subVectors(r,a),f.cross(p),s.fromBufferAttribute(i,_),l.fromBufferAttribute(i,T),c.fromBufferAttribute(i,x),s.add(f),l.add(f),c.add(f),i.setXYZ(_,s.x,s.y,s.z),i.setXYZ(T,l.x,l.y,l.z),i.setXYZ(x,c.x,c.y,c.z)}else for(let d=0,g=n.count;d<g;d+=3)r.fromBufferAttribute(n,d+0),a.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),f.subVectors(o,a),p.subVectors(r,a),f.cross(p),i.setXYZ(d+0,f.x,f.y,f.z),i.setXYZ(d+1,f.x,f.y,f.z),i.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)zt.fromBufferAttribute(e,n),zt.normalize(),e.setXYZ(n,zt.x,zt.y,zt.z)}toNonIndexed(){function e(s,l){const c=s.array,f=s.itemSize,p=s.normalized,d=new c.constructor(l.length*f);let g=0,_=0;for(let T=0,x=l.length;T<x;T++){s.isInterleavedBufferAttribute?g=l[T]*s.data.stride+s.offset:g=l[T]*f;for(let u=0;u<f;u++)d[_++]=c[g++]}return new mi(d,f,p)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new On,i=this.index.array,r=this.attributes;for(const s in r){const l=r[s],c=e(l,i);n.setAttribute(s,c)}const a=this.morphAttributes;for(const s in a){const l=[],c=a[s];for(let f=0,p=c.length;f<p;f++){const d=c[f],g=e(d,i);l.push(g)}n.morphAttributes[s]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let s=0,l=o.length;s<l;s++){const c=o[s];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let p=0,d=c.length;p<d;p++){const g=c[p];f.push(g.toJSON(e.data))}f.length>0&&(r[l]=f,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const s=this.boundingSphere;return s!==null&&(e.data.boundingSphere=s.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(n))}const a=e.morphAttributes;for(const c in a){const f=[],p=a[c];for(let d=0,g=p.length;d<g;d++)f.push(p[d].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,f=o.length;c<f;c++){const p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}const s=e.boundingBox;s!==null&&(this.boundingBox=s.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let QS=0;class Ja extends qr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:QS++}),this.uuid=ms(),this.name="",this.type="Material",this.blending=Fa,this.side=mr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xd,this.blendDst=qd,this.blendEquation=Rr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=ja,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zr,this.stencilZFail=Zr,this.stencilZPass=Zr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Ne(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ne(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Fa&&(i.blending=this.blending),this.side!==mr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xd&&(i.blendSrc=this.blendSrc),this.blendDst!==qd&&(i.blendDst=this.blendDst),this.blendEquation!==Rr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ja&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Zr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Zr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const o=[];for(const s in a){const l=a[s];delete l.metadata,o.push(l)}return o}if(n){const a=r(e.textures),o=r(e.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new We().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new $e().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Mi=new B,Nu=new B,Ys=new B,qi=new B,Fu=new B,$s=new B,Uu=new B;class Sv{constructor(e=new B,n=new B(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Mi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,n),Mi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Nu.copy(e).add(n).multiplyScalar(.5),Ys.copy(n).sub(e).normalize(),qi.copy(this.origin).sub(Nu);const a=e.distanceTo(n)*.5,o=-this.direction.dot(Ys),s=qi.dot(this.direction),l=-qi.dot(Ys),c=qi.lengthSq(),f=Math.abs(1-o*o);let p,d,g,_;if(f>0)if(p=o*l-s,d=o*s-l,_=a*f,p>=0)if(d>=-_)if(d<=_){const T=1/f;p*=T,d*=T,g=p*(p+o*d+2*s)+d*(o*p+d+2*l)+c}else d=a,p=Math.max(0,-(o*d+s)),g=-p*p+d*(d+2*l)+c;else d=-a,p=Math.max(0,-(o*d+s)),g=-p*p+d*(d+2*l)+c;else d<=-_?(p=Math.max(0,-(-o*a+s)),d=p>0?-a:Math.min(Math.max(-a,-l),a),g=-p*p+d*(d+2*l)+c):d<=_?(p=0,d=Math.min(Math.max(-a,-l),a),g=d*(d+2*l)+c):(p=Math.max(0,-(o*a+s)),d=p>0?a:Math.min(Math.max(-a,-l),a),g=-p*p+d*(d+2*l)+c);else d=o>0?-a:a,p=Math.max(0,-(o*d+s)),g=-p*p+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Nu).addScaledVector(Ys,d),g}intersectSphere(e,n){Mi.subVectors(e.center,this.origin);const i=Mi.dot(this.direction),r=Mi.dot(Mi)-i*i,a=e.radius*e.radius;if(r>a)return null;const o=Math.sqrt(a-r),s=i-o,l=i+o;return l<0?null:s<0?this.at(l,n):this.at(s,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,a,o,s,l;const c=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),f>=0?(a=(e.min.y-d.y)*f,o=(e.max.y-d.y)*f):(a=(e.max.y-d.y)*f,o=(e.min.y-d.y)*f),i>o||a>r||((a>i||isNaN(i))&&(i=a),(o<r||isNaN(r))&&(r=o),p>=0?(s=(e.min.z-d.z)*p,l=(e.max.z-d.z)*p):(s=(e.max.z-d.z)*p,l=(e.min.z-d.z)*p),i>l||s>r)||((s>i||i!==i)&&(i=s),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,n,i,r,a){Fu.subVectors(n,e),$s.subVectors(i,e),Uu.crossVectors(Fu,$s);let o=this.direction.dot(Uu),s;if(o>0){if(r)return null;s=1}else if(o<0)s=-1,o=-o;else return null;qi.subVectors(this.origin,e);const l=s*this.direction.dot($s.crossVectors(qi,$s));if(l<0)return null;const c=s*this.direction.dot(Fu.cross(qi));if(c<0||l+c>o)return null;const f=-s*qi.dot(Uu);return f<0?null:this.at(f/o,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Hp extends Ja{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gr,this.combine=Jx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zm=new _t,Er=new Sv,Ks=new Pc,km=new B,Zs=new B,Qs=new B,Js=new B,Ou=new B,el=new B,Bm=new B,tl=new B;class Lt extends jt{constructor(e=new On,n=new Hp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const s=this.morphTargetInfluences;if(a&&s){el.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const f=s[l],p=a[l];f!==0&&(Ou.fromBufferAttribute(p,e),o?el.addScaledVector(Ou,f):el.addScaledVector(Ou.sub(n),f))}n.add(el)}return n}raycast(e,n){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ks.copy(i.boundingSphere),Ks.applyMatrix4(a),Er.copy(e.ray).recast(e.near),!(Ks.containsPoint(Er.origin)===!1&&(Er.intersectSphere(Ks,km)===null||Er.origin.distanceToSquared(km)>(e.far-e.near)**2))&&(zm.copy(a).invert(),Er.copy(e.ray).applyMatrix4(zm),!(i.boundingBox!==null&&Er.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Er)))}_computeIntersections(e,n,i){let r;const a=this.geometry,o=this.material,s=a.index,l=a.attributes.position,c=a.attributes.uv,f=a.attributes.uv1,p=a.attributes.normal,d=a.groups,g=a.drawRange;if(s!==null)if(Array.isArray(o))for(let _=0,T=d.length;_<T;_++){const x=d[_],u=o[x.materialIndex],v=Math.max(x.start,g.start),M=Math.min(s.count,Math.min(x.start+x.count,g.start+g.count));for(let S=v,b=M;S<b;S+=3){const E=s.getX(S),C=s.getX(S+1),m=s.getX(S+2);r=nl(this,u,e,i,c,f,p,E,C,m),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=x.materialIndex,n.push(r))}}else{const _=Math.max(0,g.start),T=Math.min(s.count,g.start+g.count);for(let x=_,u=T;x<u;x+=3){const v=s.getX(x),M=s.getX(x+1),S=s.getX(x+2);r=nl(this,o,e,i,c,f,p,v,M,S),r&&(r.faceIndex=Math.floor(x/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,T=d.length;_<T;_++){const x=d[_],u=o[x.materialIndex],v=Math.max(x.start,g.start),M=Math.min(l.count,Math.min(x.start+x.count,g.start+g.count));for(let S=v,b=M;S<b;S+=3){const E=S,C=S+1,m=S+2;r=nl(this,u,e,i,c,f,p,E,C,m),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=x.materialIndex,n.push(r))}}else{const _=Math.max(0,g.start),T=Math.min(l.count,g.start+g.count);for(let x=_,u=T;x<u;x+=3){const v=x,M=x+1,S=x+2;r=nl(this,o,e,i,c,f,p,v,M,S),r&&(r.faceIndex=Math.floor(x/3),n.push(r))}}}}function JS(t,e,n,i,r,a,o,s){let l;if(e.side===mn?l=i.intersectTriangle(o,a,r,!0,s):l=i.intersectTriangle(r,a,o,e.side===mr,s),l===null)return null;tl.copy(s),tl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(tl);return c<n.near||c>n.far?null:{distance:c,point:tl.clone(),object:t}}function nl(t,e,n,i,r,a,o,s,l,c){t.getVertexPosition(s,Zs),t.getVertexPosition(l,Qs),t.getVertexPosition(c,Js);const f=JS(t,e,n,i,Zs,Qs,Js,Bm);if(f){const p=new B;jn.getBarycoord(Bm,Zs,Qs,Js,p),r&&(f.uv=jn.getInterpolatedAttribute(r,s,l,c,p,new $e)),a&&(f.uv1=jn.getInterpolatedAttribute(a,s,l,c,p,new $e)),o&&(f.normal=jn.getInterpolatedAttribute(o,s,l,c,p,new B),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const d={a:s,b:l,c,normal:new B,materialIndex:0};jn.getNormal(Zs,Qs,Js,d.normal),f.face=d,f.barycoord=p}return f}class eM extends en{constructor(e=null,n=1,i=1,r,a,o,s,l,c=Gt,f=Gt,p,d){super(null,o,s,l,c,f,r,a,p,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const zu=new B,tM=new B,nM=new ze;class Cr{constructor(e=new B(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=zu.subVectors(i,n).cross(tM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(zu),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(o<0||o>1)?null:n.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||nM.getNormalMatrix(e),r=this.coplanarPoint(zu).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Tr=new Pc,iM=new $e(.5,.5),il=new B;class Gp{constructor(e=new Cr,n=new Cr,i=new Cr,r=new Cr,a=new Cr,o=new Cr){this.planes=[e,n,i,r,a,o]}set(e,n,i,r,a,o){const s=this.planes;return s[0].copy(e),s[1].copy(n),s[2].copy(i),s[3].copy(r),s[4].copy(a),s[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=ui,i=!1){const r=this.planes,a=e.elements,o=a[0],s=a[1],l=a[2],c=a[3],f=a[4],p=a[5],d=a[6],g=a[7],_=a[8],T=a[9],x=a[10],u=a[11],v=a[12],M=a[13],S=a[14],b=a[15];if(r[0].setComponents(c-o,g-f,u-_,b-v).normalize(),r[1].setComponents(c+o,g+f,u+_,b+v).normalize(),r[2].setComponents(c+s,g+p,u+T,b+M).normalize(),r[3].setComponents(c-s,g-p,u-T,b-M).normalize(),i)r[4].setComponents(l,d,x,S).normalize(),r[5].setComponents(c-l,g-d,u-x,b-S).normalize();else if(r[4].setComponents(c-l,g-d,u-x,b-S).normalize(),n===ui)r[5].setComponents(c+l,g+d,u+x,b+S).normalize();else if(n===ls)r[5].setComponents(l,d,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Tr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Tr)}intersectsSprite(e){Tr.center.set(0,0,0);const n=iM.distanceTo(e.center);return Tr.radius=.7071067811865476+n,Tr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Tr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(il.x=r.normal.x>0?e.max.x:e.min.x,il.y=r.normal.y>0?e.max.y:e.min.y,il.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(il)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Mv extends Ja{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cc=new B,uc=new B,Vm=new _t,go=new Sv,rl=new Pc,ku=new B,Hm=new B;class rM extends jt{constructor(e=new On,n=new Mv){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,a=n.count;r<a;r++)cc.fromBufferAttribute(n,r-1),uc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=cc.distanceTo(uc);e.setAttribute("lineDistance",new tn(i,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),rl.copy(i.boundingSphere),rl.applyMatrix4(r),rl.radius+=a,e.ray.intersectsSphere(rl)===!1)return;Vm.copy(r).invert(),go.copy(e.ray).applyMatrix4(Vm);const s=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=s*s,c=this.isLineSegments?2:1,f=i.index,d=i.attributes.position;if(f!==null){const g=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let T=g,x=_-1;T<x;T+=c){const u=f.getX(T),v=f.getX(T+1),M=al(this,e,go,l,u,v,T);M&&n.push(M)}if(this.isLineLoop){const T=f.getX(_-1),x=f.getX(g),u=al(this,e,go,l,T,x,_-1);u&&n.push(u)}}else{const g=Math.max(0,o.start),_=Math.min(d.count,o.start+o.count);for(let T=g,x=_-1;T<x;T+=c){const u=al(this,e,go,l,T,T+1,T);u&&n.push(u)}if(this.isLineLoop){const T=al(this,e,go,l,_-1,g,_-1);T&&n.push(T)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}}function al(t,e,n,i,r,a,o){const s=t.geometry.attributes.position;if(cc.fromBufferAttribute(s,r),uc.fromBufferAttribute(s,a),n.distanceSqToSegment(cc,uc,ku,Hm)>i)return;ku.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(ku);if(!(c<e.near||c>e.far))return{distance:c,point:Hm.clone().applyMatrix4(t.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:t}}const Gm=new B,Wm=new B;class aM extends rM{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,a=n.count;r<a;r+=2)Gm.fromBufferAttribute(n,r),Wm.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Gm.distanceTo(Wm);e.setAttribute("lineDistance",new tn(i,1))}else Ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ev extends en{constructor(e=[],n=Gr,i,r,a,o,s,l,c,f){super(e,n,i,r,a,o,s,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class oM extends en{constructor(e,n,i,r,a,o,s,l,c){super(e,n,i,r,a,o,s,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class qa extends en{constructor(e,n,i=gi,r,a,o,s=Gt,l=Gt,c,f=Ui,p=1){if(f!==Ui&&f!==Fr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:n,depth:p};super(d,r,a,o,s,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Vp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class sM extends qa{constructor(e,n=gi,i=Gr,r,a,o=Gt,s=Gt,l,c=Ui){const f={width:e,height:e,depth:1},p=[f,f,f,f,f,f];super(e,e,n,i,r,a,o,s,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Tv extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class fr extends On{constructor(e=1,n=1,i=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:a,depthSegments:o};const s=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const l=[],c=[],f=[],p=[];let d=0,g=0;_("z","y","x",-1,-1,i,n,e,o,a,0),_("z","y","x",1,-1,i,n,-e,o,a,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,a,4),_("x","y","z",-1,-1,e,n,-i,r,a,5),this.setIndex(l),this.setAttribute("position",new tn(c,3)),this.setAttribute("normal",new tn(f,3)),this.setAttribute("uv",new tn(p,2));function _(T,x,u,v,M,S,b,E,C,m,R){const P=S/C,I=b/m,L=S/2,Y=b/2,J=E/2,k=C+1,K=m+1;let H=0,O=0;const V=new B;for(let D=0;D<K;D++){const X=D*I-Y;for(let Z=0;Z<k;Z++){const le=Z*P-L;V[T]=le*v,V[x]=X*M,V[u]=J,c.push(V.x,V.y,V.z),V[T]=0,V[x]=0,V[u]=E>0?1:-1,f.push(V.x,V.y,V.z),p.push(Z/C),p.push(1-D/m),H+=1}}for(let D=0;D<m;D++)for(let X=0;X<C;X++){const Z=d+X+k*D,le=d+X+k*(D+1),Fe=d+(X+1)+k*(D+1),Re=d+(X+1)+k*D;l.push(Z,le,Re),l.push(le,Fe,Re),O+=6}s.addGroup(g,O,R),g+=O,d+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class wr extends On{constructor(e=1,n=1,i=1,r=32,a=1,o=!1,s=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:a,openEnded:o,thetaStart:s,thetaLength:l};const c=this;r=Math.floor(r),a=Math.floor(a);const f=[],p=[],d=[],g=[];let _=0;const T=[],x=i/2;let u=0;v(),o===!1&&(e>0&&M(!0),n>0&&M(!1)),this.setIndex(f),this.setAttribute("position",new tn(p,3)),this.setAttribute("normal",new tn(d,3)),this.setAttribute("uv",new tn(g,2));function v(){const S=new B,b=new B;let E=0;const C=(n-e)/i;for(let m=0;m<=a;m++){const R=[],P=m/a,I=P*(n-e)+e;for(let L=0;L<=r;L++){const Y=L/r,J=Y*l+s,k=Math.sin(J),K=Math.cos(J);b.x=I*k,b.y=-P*i+x,b.z=I*K,p.push(b.x,b.y,b.z),S.set(k,C,K).normalize(),d.push(S.x,S.y,S.z),g.push(Y,1-P),R.push(_++)}T.push(R)}for(let m=0;m<r;m++)for(let R=0;R<a;R++){const P=T[R][m],I=T[R+1][m],L=T[R+1][m+1],Y=T[R][m+1];(e>0||R!==0)&&(f.push(P,I,Y),E+=3),(n>0||R!==a-1)&&(f.push(I,L,Y),E+=3)}c.addGroup(u,E,0),u+=E}function M(S){const b=_,E=new $e,C=new B;let m=0;const R=S===!0?e:n,P=S===!0?1:-1;for(let L=1;L<=r;L++)p.push(0,x*P,0),d.push(0,P,0),g.push(.5,.5),_++;const I=_;for(let L=0;L<=r;L++){const J=L/r*l+s,k=Math.cos(J),K=Math.sin(J);C.x=R*K,C.y=x*P,C.z=R*k,p.push(C.x,C.y,C.z),d.push(0,P,0),E.x=k*.5+.5,E.y=K*.5*P+.5,g.push(E.x,E.y),_++}for(let L=0;L<r;L++){const Y=b+L,J=I+L;S===!0?f.push(J,J+1,Y):f.push(J+1,J,Y),m+=3}c.addGroup(u,m,S===!0?1:2),u+=m}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class xs extends On{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const a=e/2,o=n/2,s=Math.floor(i),l=Math.floor(r),c=s+1,f=l+1,p=e/s,d=n/l,g=[],_=[],T=[],x=[];for(let u=0;u<f;u++){const v=u*d-o;for(let M=0;M<c;M++){const S=M*p-a;_.push(S,-v,0),T.push(0,0,1),x.push(M/s),x.push(1-u/l)}}for(let u=0;u<l;u++)for(let v=0;v<s;v++){const M=v+c*u,S=v+c*(u+1),b=v+1+c*(u+1),E=v+1+c*u;g.push(M,S,E),g.push(S,b,E)}this.setIndex(g),this.setAttribute("position",new tn(_,3)),this.setAttribute("normal",new tn(T,3)),this.setAttribute("uv",new tn(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xs(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ya(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(jm(r))r.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(jm(r[0])){const a=[];for(let o=0,s=r.length;o<s;o++)a[o]=r[o].clone();e[n][i]=a}else e[n][i]=r.slice();else e[n][i]=r}}return e}function rn(t){const e={};for(let n=0;n<t.length;n++){const i=Ya(t[n]);for(const r in i)e[r]=i[r]}return e}function jm(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function lM(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function bv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const cM={clone:Ya,merge:rn};var uM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,dM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xi extends Ja{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uM,this.fragmentShader=dM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ya(e.uniforms),this.uniformsGroups=lM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new We().setHex(r.value);break;case"v2":this.uniforms[i].value=new $e().fromArray(r.value);break;case"v3":this.uniforms[i].value=new B().fromArray(r.value);break;case"v4":this.uniforms[i].value=new xt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new ze().fromArray(r.value);break;case"m4":this.uniforms[i].value=new _t().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class fM extends xi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xo extends Ja{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nf,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class pM extends Ja{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=MS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hM extends Ja{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Av extends jt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const Bu=new _t,Xm=new B,qm=new B;class mM{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gp,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Xm.setFromMatrixPosition(e.matrixWorld),n.position.copy(Xm),qm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(qm),n.updateMatrixWorld(),Bu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bu,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===ls||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Bu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ol=new B,sl=new Qa,ti=new B;class Cv extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ol,sl,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ol,sl,ti.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(ol,sl,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ol,sl,ti.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Yi=new B,Ym=new $e,$m=new $e;class Dn extends Cv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Ff*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(mu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ff*2*Math.atan(Math.tan(mu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z),Yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z)}getViewSize(e,n){return this.getViewBounds(e,Ym,$m),n.subVectors($m,Ym)}setViewOffset(e,n,i,r,a,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(mu*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;a+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const s=this.filmOffset;s!==0&&(a+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Wp extends Cv{constructor(e=-1,n=1,i=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,o=i+e,s=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,s-=f*this.view.offsetY,l=s-f*this.view.height}this.projectionMatrix.makeOrthographic(a,o,s,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class gM extends mM{constructor(){super(new Wp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Km extends Av{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.target=new jt,this.shadow=new gM}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class xM extends Av{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const la=-90,ca=1;class vM extends jt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Dn(la,ca,e,n);r.layers=this.layers,this.add(r);const a=new Dn(la,ca,e,n);a.layers=this.layers,this.add(a);const o=new Dn(la,ca,e,n);o.layers=this.layers,this.add(o);const s=new Dn(la,ca,e,n);s.layers=this.layers,this.add(s);const l=new Dn(la,ca,e,n);l.layers=this.layers,this.add(l);const c=new Dn(la,ca,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,a,o,s,l]=n;for(const c of n)this.remove(c);if(e===ui)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ls)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,s,l,c,f]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const T=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,1,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,2,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,3,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=T,e.setRenderTarget(i,5,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,f),e.setRenderTarget(p,d,g),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class _M extends Dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class yM{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ne("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=performance.now();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}const Zp=class Zp{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const a=this.elements;return a[0]=e,a[2]=n,a[1]=i,a[3]=r,this}};Zp.prototype.isMatrix2=!0;let Zm=Zp;class SM extends aM{constructor(e=10,n=10,i=4473924,r=8947848){i=new We(i),r=new We(r);const a=n/2,o=e/n,s=e/2,l=[],c=[];for(let d=0,g=0,_=-s;d<=n;d++,_+=o){l.push(-s,0,_,s,0,_),l.push(_,0,-s,_,0,s);const T=d===a?i:r;T.toArray(c,g),g+=3,T.toArray(c,g),g+=3,T.toArray(c,g),g+=3,T.toArray(c,g),g+=3}const f=new On;f.setAttribute("position",new tn(l,3)),f.setAttribute("color",new tn(c,3));const p=new Mv({vertexColors:!0,toneMapped:!1});super(f,p),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function Qm(t,e,n,i){const r=MM(i);switch(n){case fv:return t*e;case hv:return t*e/r.components*r.byteLength;case Up:return t*e/r.components*r.byteLength;case Wr:return t*e*2/r.components*r.byteLength;case Op:return t*e*2/r.components*r.byteLength;case pv:return t*e*3/r.components*r.byteLength;case Xn:return t*e*4/r.components*r.byteLength;case zp:return t*e*4/r.components*r.byteLength;case wl:case Pl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Il:case Dl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case af:case sf:return Math.max(t,16)*Math.max(e,8)/4;case rf:case of:return Math.max(t,8)*Math.max(e,8)/2;case lf:case cf:case df:case ff:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case uf:case rc:case pf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case hf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case mf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case gf:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case xf:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case vf:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case _f:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case yf:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Sf:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Mf:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Ef:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Tf:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case bf:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Af:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Cf:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Rf:case wf:case Pf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case If:case Df:return Math.ceil(t/4)*Math.ceil(e/4)*8;case ac:case Lf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function MM(t){switch(t){case yn:case lv:return{byteLength:1,components:1};case os:case cv:case Fi:return{byteLength:2,components:1};case Np:case Fp:return{byteLength:2,components:4};case gi:case Lp:case ci:return{byteLength:4,components:1};case uv:case dv:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dp}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Rv(){let t=null,e=!1,n=null,i=null;function r(a,o){n(a,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){n=a},setContext:function(a){t=a}}}function EM(t){const e=new WeakMap;function n(s,l){const c=s.array,f=s.usage,p=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,f),s.onUploadCallback();let g;if(c instanceof Float32Array)g=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=t.HALF_FLOAT;else if(c instanceof Uint16Array)s.isFloat16BufferAttribute?g=t.HALF_FLOAT:g=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=t.SHORT;else if(c instanceof Uint32Array)g=t.UNSIGNED_INT;else if(c instanceof Int32Array)g=t.INT;else if(c instanceof Int8Array)g=t.BYTE;else if(c instanceof Uint8Array)g=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:s.version,size:p}}function i(s,l,c){const f=l.array,p=l.updateRanges;if(t.bindBuffer(c,s),p.length===0)t.bufferSubData(c,0,f);else{p.sort((g,_)=>g.start-_.start);let d=0;for(let g=1;g<p.length;g++){const _=p[d],T=p[g];T.start<=_.start+_.count+1?_.count=Math.max(_.count,T.start+T.count-_.start):(++d,p[d]=T)}p.length=d+1;for(let g=0,_=p.length;g<_;g++){const T=p[g];t.bufferSubData(c,T.start*f.BYTES_PER_ELEMENT,f,T.start,T.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),e.get(s)}function a(s){s.isInterleavedBufferAttribute&&(s=s.data);const l=e.get(s);l&&(t.deleteBuffer(l.buffer),e.delete(s))}function o(s,l){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const f=e.get(s);(!f||f.version<s.version)&&e.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const c=e.get(s);if(c===void 0)e.set(s,n(s,l));else if(c.version<s.version){if(c.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,s,l),c.version=s.version}}return{get:r,remove:a,update:o}}var TM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,AM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,CM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,RM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,PM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,IM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,DM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,LM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,NM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,FM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,UM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,OM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,kM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,BM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,VM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,HM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,GM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,WM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,jM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,XM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,qM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,YM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$M=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,KM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ZM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,QM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,JM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,eE="gl_FragColor = linearToOutputTexel( gl_FragColor );",tE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,iE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,rE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,aE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,oE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,uE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,gE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,xE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_E=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,SE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ME=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,EE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,TE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,AE=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,CE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,RE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,PE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,IE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,DE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,LE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,NE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,FE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,UE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,OE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,BE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,VE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,HE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,GE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,WE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,XE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,qE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,YE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$E=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,KE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ZE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,QE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,JE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,eT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,iT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,aT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,oT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,sT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,uT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_T=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,yT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ST=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,MT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ET=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const TT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,CT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,IT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,DT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,LT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,NT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,FT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,UT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,OT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,kT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,VT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,GT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,jT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,XT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$T=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,JT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ib=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:TM,alphahash_pars_fragment:bM,alphamap_fragment:AM,alphamap_pars_fragment:CM,alphatest_fragment:RM,alphatest_pars_fragment:wM,aomap_fragment:PM,aomap_pars_fragment:IM,batching_pars_vertex:DM,batching_vertex:LM,begin_vertex:NM,beginnormal_vertex:FM,bsdfs:UM,iridescence_fragment:OM,bumpmap_pars_fragment:zM,clipping_planes_fragment:kM,clipping_planes_pars_fragment:BM,clipping_planes_pars_vertex:VM,clipping_planes_vertex:HM,color_fragment:GM,color_pars_fragment:WM,color_pars_vertex:jM,color_vertex:XM,common:qM,cube_uv_reflection_fragment:YM,defaultnormal_vertex:$M,displacementmap_pars_vertex:KM,displacementmap_vertex:ZM,emissivemap_fragment:QM,emissivemap_pars_fragment:JM,colorspace_fragment:eE,colorspace_pars_fragment:tE,envmap_fragment:nE,envmap_common_pars_fragment:iE,envmap_pars_fragment:rE,envmap_pars_vertex:aE,envmap_physical_pars_fragment:gE,envmap_vertex:oE,fog_vertex:sE,fog_pars_vertex:lE,fog_fragment:cE,fog_pars_fragment:uE,gradientmap_pars_fragment:dE,lightmap_pars_fragment:fE,lights_lambert_fragment:pE,lights_lambert_pars_fragment:hE,lights_pars_begin:mE,lights_toon_fragment:xE,lights_toon_pars_fragment:vE,lights_phong_fragment:_E,lights_phong_pars_fragment:yE,lights_physical_fragment:SE,lights_physical_pars_fragment:ME,lights_fragment_begin:EE,lights_fragment_maps:TE,lights_fragment_end:bE,lightprobes_pars_fragment:AE,logdepthbuf_fragment:CE,logdepthbuf_pars_fragment:RE,logdepthbuf_pars_vertex:wE,logdepthbuf_vertex:PE,map_fragment:IE,map_pars_fragment:DE,map_particle_fragment:LE,map_particle_pars_fragment:NE,metalnessmap_fragment:FE,metalnessmap_pars_fragment:UE,morphinstance_vertex:OE,morphcolor_vertex:zE,morphnormal_vertex:kE,morphtarget_pars_vertex:BE,morphtarget_vertex:VE,normal_fragment_begin:HE,normal_fragment_maps:GE,normal_pars_fragment:WE,normal_pars_vertex:jE,normal_vertex:XE,normalmap_pars_fragment:qE,clearcoat_normal_fragment_begin:YE,clearcoat_normal_fragment_maps:$E,clearcoat_pars_fragment:KE,iridescence_pars_fragment:ZE,opaque_fragment:QE,packing:JE,premultiplied_alpha_fragment:eT,project_vertex:tT,dithering_fragment:nT,dithering_pars_fragment:iT,roughnessmap_fragment:rT,roughnessmap_pars_fragment:aT,shadowmap_pars_fragment:oT,shadowmap_pars_vertex:sT,shadowmap_vertex:lT,shadowmask_pars_fragment:cT,skinbase_vertex:uT,skinning_pars_vertex:dT,skinning_vertex:fT,skinnormal_vertex:pT,specularmap_fragment:hT,specularmap_pars_fragment:mT,tonemapping_fragment:gT,tonemapping_pars_fragment:xT,transmission_fragment:vT,transmission_pars_fragment:_T,uv_pars_fragment:yT,uv_pars_vertex:ST,uv_vertex:MT,worldpos_vertex:ET,background_vert:TT,background_frag:bT,backgroundCube_vert:AT,backgroundCube_frag:CT,cube_vert:RT,cube_frag:wT,depth_vert:PT,depth_frag:IT,distance_vert:DT,distance_frag:LT,equirect_vert:NT,equirect_frag:FT,linedashed_vert:UT,linedashed_frag:OT,meshbasic_vert:zT,meshbasic_frag:kT,meshlambert_vert:BT,meshlambert_frag:VT,meshmatcap_vert:HT,meshmatcap_frag:GT,meshnormal_vert:WT,meshnormal_frag:jT,meshphong_vert:XT,meshphong_frag:qT,meshphysical_vert:YT,meshphysical_frag:$T,meshtoon_vert:KT,meshtoon_frag:ZT,points_vert:QT,points_frag:JT,shadow_vert:eb,shadow_frag:tb,sprite_vert:nb,sprite_frag:ib},ge={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},oi={basic:{uniforms:rn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:rn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new We(0)},envMapIntensity:{value:1}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:rn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:rn([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:rn([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new We(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:rn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:rn([ge.points,ge.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:rn([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:rn([ge.common,ge.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:rn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:rn([ge.sprite,ge.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distance:{uniforms:rn([ge.common,ge.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distance_vert,fragmentShader:He.distance_frag},shadow:{uniforms:rn([ge.lights,ge.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};oi.physical={uniforms:rn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const ll={r:0,b:0,g:0},rb=new _t,wv=new ze;wv.set(-1,0,0,0,1,0,0,0,1);function ab(t,e,n,i,r,a){const o=new We(0);let s=r===!0?0:1,l,c,f=null,p=0,d=null;function g(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){const S=v.backgroundBlurriness>0;M=e.get(M,S)}return M}function _(v){let M=!1;const S=g(v);S===null?x(o,s):S&&S.isColor&&(x(S,1),M=!0);const b=t.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(t.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function T(v,M){const S=g(M);S&&(S.isCubeTexture||S.mapping===wc)?(c===void 0&&(c=new Lt(new fr(1,1,1),new xi({name:"BackgroundCubeMaterial",uniforms:Ya(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(rb.makeRotationFromEuler(M.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(wv),c.material.toneMapped=qe.getTransfer(S.colorSpace)!==nt,(f!==S||p!==S.version||d!==t.toneMapping)&&(c.material.needsUpdate=!0,f=S,p=S.version,d=t.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Lt(new xs(2,2),new xi({name:"BackgroundMaterial",uniforms:Ya(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:mr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=qe.getTransfer(S.colorSpace)!==nt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||p!==S.version||d!==t.toneMapping)&&(l.material.needsUpdate=!0,f=S,p=S.version,d=t.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function x(v,M){v.getRGB(ll,bv(t)),n.buffers.color.setClear(ll.r,ll.g,ll.b,M,a)}function u(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,M=1){o.set(v),s=M,x(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(v){s=v,x(o,s)},render:_,addToRenderList:T,dispose:u}}function ob(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let a=r,o=!1;function s(I,L,Y,J,k){let K=!1;const H=p(I,J,Y,L);a!==H&&(a=H,c(a.object)),K=g(I,J,Y,k),K&&_(I,J,Y,k),k!==null&&e.update(k,t.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,S(I,L,Y,J),k!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return t.createVertexArray()}function c(I){return t.bindVertexArray(I)}function f(I){return t.deleteVertexArray(I)}function p(I,L,Y,J){const k=J.wireframe===!0;let K=i[L.id];K===void 0&&(K={},i[L.id]=K);const H=I.isInstancedMesh===!0?I.id:0;let O=K[H];O===void 0&&(O={},K[H]=O);let V=O[Y.id];V===void 0&&(V={},O[Y.id]=V);let D=V[k];return D===void 0&&(D=d(l()),V[k]=D),D}function d(I){const L=[],Y=[],J=[];for(let k=0;k<n;k++)L[k]=0,Y[k]=0,J[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:Y,attributeDivisors:J,object:I,attributes:{},index:null}}function g(I,L,Y,J){const k=a.attributes,K=L.attributes;let H=0;const O=Y.getAttributes();for(const V in O)if(O[V].location>=0){const X=k[V];let Z=K[V];if(Z===void 0&&(V==="instanceMatrix"&&I.instanceMatrix&&(Z=I.instanceMatrix),V==="instanceColor"&&I.instanceColor&&(Z=I.instanceColor)),X===void 0||X.attribute!==Z||Z&&X.data!==Z.data)return!0;H++}return a.attributesNum!==H||a.index!==J}function _(I,L,Y,J){const k={},K=L.attributes;let H=0;const O=Y.getAttributes();for(const V in O)if(O[V].location>=0){let X=K[V];X===void 0&&(V==="instanceMatrix"&&I.instanceMatrix&&(X=I.instanceMatrix),V==="instanceColor"&&I.instanceColor&&(X=I.instanceColor));const Z={};Z.attribute=X,X&&X.data&&(Z.data=X.data),k[V]=Z,H++}a.attributes=k,a.attributesNum=H,a.index=J}function T(){const I=a.newAttributes;for(let L=0,Y=I.length;L<Y;L++)I[L]=0}function x(I){u(I,0)}function u(I,L){const Y=a.newAttributes,J=a.enabledAttributes,k=a.attributeDivisors;Y[I]=1,J[I]===0&&(t.enableVertexAttribArray(I),J[I]=1),k[I]!==L&&(t.vertexAttribDivisor(I,L),k[I]=L)}function v(){const I=a.newAttributes,L=a.enabledAttributes;for(let Y=0,J=L.length;Y<J;Y++)L[Y]!==I[Y]&&(t.disableVertexAttribArray(Y),L[Y]=0)}function M(I,L,Y,J,k,K,H){H===!0?t.vertexAttribIPointer(I,L,Y,k,K):t.vertexAttribPointer(I,L,Y,J,k,K)}function S(I,L,Y,J){T();const k=J.attributes,K=Y.getAttributes(),H=L.defaultAttributeValues;for(const O in K){const V=K[O];if(V.location>=0){let D=k[O];if(D===void 0&&(O==="instanceMatrix"&&I.instanceMatrix&&(D=I.instanceMatrix),O==="instanceColor"&&I.instanceColor&&(D=I.instanceColor)),D!==void 0){const X=D.normalized,Z=D.itemSize,le=e.get(D);if(le===void 0)continue;const Fe=le.buffer,Re=le.type,$=le.bytesPerElement,se=Re===t.INT||Re===t.UNSIGNED_INT||D.gpuType===Lp;if(D.isInterleavedBufferAttribute){const re=D.data,Ue=re.stride,Oe=D.offset;if(re.isInstancedInterleavedBuffer){for(let De=0;De<V.locationSize;De++)u(V.location+De,re.meshPerAttribute);I.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let De=0;De<V.locationSize;De++)x(V.location+De);t.bindBuffer(t.ARRAY_BUFFER,Fe);for(let De=0;De<V.locationSize;De++)M(V.location+De,Z/V.locationSize,Re,X,Ue*$,(Oe+Z/V.locationSize*De)*$,se)}else{if(D.isInstancedBufferAttribute){for(let re=0;re<V.locationSize;re++)u(V.location+re,D.meshPerAttribute);I.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=D.meshPerAttribute*D.count)}else for(let re=0;re<V.locationSize;re++)x(V.location+re);t.bindBuffer(t.ARRAY_BUFFER,Fe);for(let re=0;re<V.locationSize;re++)M(V.location+re,Z/V.locationSize,Re,X,Z*$,Z/V.locationSize*re*$,se)}}else if(H!==void 0){const X=H[O];if(X!==void 0)switch(X.length){case 2:t.vertexAttrib2fv(V.location,X);break;case 3:t.vertexAttrib3fv(V.location,X);break;case 4:t.vertexAttrib4fv(V.location,X);break;default:t.vertexAttrib1fv(V.location,X)}}}}v()}function b(){R();for(const I in i){const L=i[I];for(const Y in L){const J=L[Y];for(const k in J){const K=J[k];for(const H in K)f(K[H].object),delete K[H];delete J[k]}}delete i[I]}}function E(I){if(i[I.id]===void 0)return;const L=i[I.id];for(const Y in L){const J=L[Y];for(const k in J){const K=J[k];for(const H in K)f(K[H].object),delete K[H];delete J[k]}}delete i[I.id]}function C(I){for(const L in i){const Y=i[L];for(const J in Y){const k=Y[J];if(k[I.id]===void 0)continue;const K=k[I.id];for(const H in K)f(K[H].object),delete K[H];delete k[I.id]}}}function m(I){for(const L in i){const Y=i[L],J=I.isInstancedMesh===!0?I.id:0,k=Y[J];if(k!==void 0){for(const K in k){const H=k[K];for(const O in H)f(H[O].object),delete H[O];delete k[K]}delete Y[J],Object.keys(Y).length===0&&delete i[L]}}}function R(){P(),o=!0,a!==r&&(a=r,c(a.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:R,resetDefaultState:P,dispose:b,releaseStatesOfGeometry:E,releaseStatesOfObject:m,releaseStatesOfProgram:C,initAttributes:T,enableAttribute:x,disableUnusedAttributes:v}}function sb(t,e,n){let i;function r(l){i=l}function a(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function o(l,c,f){f!==0&&(t.drawArraysInstanced(i,l,c,f),n.update(c,i,f))}function s(l,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let d=0;for(let g=0;g<f;g++)d+=c[g];n.update(d,i,1)}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function lb(t,e,n,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==Xn&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(C){const m=C===Fi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==yn&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==ci&&!m)}function l(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(Ne("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const p=n.logarithmicDepthBuffer===!0,d=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&d===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=t.getParameter(t.MAX_TEXTURE_SIZE),x=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),M=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),b=t.getParameter(t.MAX_SAMPLES),E=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:s,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:_,maxTextureSize:T,maxCubemapSize:x,maxAttributes:u,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:S,maxSamples:b,samples:E}}function cb(t){const e=this;let n=null,i=0,r=!1,a=!1;const o=new Cr,s=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,d){const g=p.length!==0||d||i!==0||r;return r=d,i=p.length,g},this.beginShadows=function(){a=!0,f(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,d){n=f(p,d,0)},this.setState=function(p,d,g){const _=p.clippingPlanes,T=p.clipIntersection,x=p.clipShadows,u=t.get(p);if(!r||_===null||_.length===0||a&&!x)a?f(null):c();else{const v=a?0:i,M=v*4;let S=u.clippingState||null;l.value=S,S=f(_,d,M,g);for(let b=0;b!==M;++b)S[b]=n[b];u.clippingState=S,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(p,d,g,_){const T=p!==null?p.length:0;let x=null;if(T!==0){if(x=l.value,_!==!0||x===null){const u=g+T*4,v=d.matrixWorldInverse;s.getNormalMatrix(v),(x===null||x.length<u)&&(x=new Float32Array(u));for(let M=0,S=g;M!==T;++M,S+=4)o.copy(p[M]).applyMatrix4(v,s),o.normal.toArray(x,S),x[S+3]=o.constant}l.value=x,l.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,x}}const ir=4,Jm=[.125,.215,.35,.446,.526,.582],Pr=20,ub=256,vo=new Wp,e0=new We;let Vu=null,Hu=0,Gu=0,Wu=!1;const db=new B;class t0{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,a={}){const{size:o=256,position:s=db}=a;Vu=this._renderer.getRenderTarget(),Hu=this._renderer.getActiveCubeFace(),Gu=this._renderer.getActiveMipmapLevel(),Wu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,s),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=r0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=i0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Vu,Hu,Gu),this._renderer.xr.enabled=Wu,e.scissorTest=!1,ua(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Gr||e.mapping===Xa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vu=this._renderer.getRenderTarget(),Hu=this._renderer.getActiveCubeFace(),Gu=this._renderer.getActiveMipmapLevel(),Wu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:Fi,format:Xn,colorSpace:oc,depthBuffer:!1},r=n0(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=n0(e,n,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=fb(a)),this._blurMaterial=hb(a,e,n),this._ggxMaterial=pb(a,e,n)}return r}_compileMaterial(e){const n=new Lt(new On,e);this._renderer.compile(n,vo)}_sceneToCubeUV(e,n,i,r,a){const l=new Dn(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],p=this._renderer,d=p.autoClear,g=p.toneMapping;p.getClearColor(e0),p.toneMapping=pi,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(r),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Lt(new fr,new Hp({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1})));const T=this._backgroundBox,x=T.material;let u=!1;const v=e.background;v?v.isColor&&(x.color.copy(v),e.background=null,u=!0):(x.color.copy(e0),u=!0);for(let M=0;M<6;M++){const S=M%3;S===0?(l.up.set(0,c[M],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+f[M],a.y,a.z)):S===1?(l.up.set(0,0,c[M]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+f[M],a.z)):(l.up.set(0,c[M],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+f[M]));const b=this._cubeSize;ua(r,S*b,M>2?b:0,b,b),p.setRenderTarget(r),u&&p.render(T,l),p.render(e,l)}p.toneMapping=g,p.autoClear=d,e.background=v}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Gr||e.mapping===Xa;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=r0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=i0());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const s=a.uniforms;s.envMap.value=e;const l=this._cubeSize;ua(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,vo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,a=this._pingPongRenderTarget,o=this._ggxMaterial,s=this._lodMeshes[i];s.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),f=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-f*f),d=0+c*1.25,g=p*d,{_lodMax:_}=this,T=this._sizeLods[i],x=3*T*(i>_-ir?i-_+ir:0),u=4*(this._cubeSize-T);l.envMap.value=e.texture,l.roughness.value=g,l.mipInt.value=_-n,ua(a,x,u,3*T,2*T),r.setRenderTarget(a),r.render(s,vo),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=_-i,ua(e,x,u,3*T,2*T),r.setRenderTarget(e),r.render(s,vo)}_blur(e,n,i,r,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",a),this._halfBlur(o,e,i,i,r,"longitudinal",a)}_halfBlur(e,n,i,r,a,o,s){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const f=3,p=this._lodMeshes[r];p.material=c;const d=c.uniforms,g=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*g):2*Math.PI/(2*Pr-1),T=a/_,x=isFinite(a)?1+Math.floor(f*T):Pr;x>Pr&&Ne(`sigmaRadians, ${a}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Pr}`);const u=[];let v=0;for(let C=0;C<Pr;++C){const m=C/T,R=Math.exp(-m*m/2);u.push(R),C===0?v+=R:C<x&&(v+=2*R)}for(let C=0;C<u.length;C++)u[C]=u[C]/v;d.envMap.value=e.texture,d.samples.value=x,d.weights.value=u,d.latitudinal.value=o==="latitudinal",s&&(d.poleAxis.value=s);const{_lodMax:M}=this;d.dTheta.value=_,d.mipInt.value=M-i;const S=this._sizeLods[r],b=3*S*(r>M-ir?r-M+ir:0),E=4*(this._cubeSize-S);ua(n,b,E,3*S,2*S),l.setRenderTarget(n),l.render(p,vo)}}function fb(t){const e=[],n=[],i=[];let r=t;const a=t-ir+1+Jm.length;for(let o=0;o<a;o++){const s=Math.pow(2,r);e.push(s);let l=1/s;o>t-ir?l=Jm[o-t+ir-1]:o===0&&(l=0),n.push(l);const c=1/(s-2),f=-c,p=1+c,d=[f,f,p,f,p,p,f,f,p,p,f,p],g=6,_=6,T=3,x=2,u=1,v=new Float32Array(T*_*g),M=new Float32Array(x*_*g),S=new Float32Array(u*_*g);for(let E=0;E<g;E++){const C=E%3*2/3-1,m=E>2?0:-1,R=[C,m,0,C+2/3,m,0,C+2/3,m+1,0,C,m,0,C+2/3,m+1,0,C,m+1,0];v.set(R,T*_*E),M.set(d,x*_*E);const P=[E,E,E,E,E,E];S.set(P,u*_*E)}const b=new On;b.setAttribute("position",new mi(v,T)),b.setAttribute("uv",new mi(M,x)),b.setAttribute("faceIndex",new mi(S,u)),i.push(new Lt(b,null)),r>ir&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function n0(t,e,n){const i=new hi(t,e,n);return i.texture.mapping=wc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ua(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function pb(t,e,n){return new xi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ub,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ic(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function hb(t,e,n){const i=new Float32Array(Pr),r=new B(0,1,0);return new xi({name:"SphericalGaussianBlur",defines:{n:Pr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ic(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function i0(){return new xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ic(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function r0(){return new xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ic(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Ic(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Pv extends hi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ev(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new fr(5,5,5),a=new xi({name:"CubemapFromEquirect",uniforms:Ya(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:mn,blending:wi});a.uniforms.tEquirect.value=n;const o=new Lt(r,a),s=n.minFilter;return n.minFilter===Nr&&(n.minFilter=Jt),new vM(1,10,this).update(e,o),n.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(a)}}function mb(t){let e=new WeakMap,n=new WeakMap,i=null;function r(d,g=!1){return d==null?null:g?o(d):a(d)}function a(d){if(d&&d.isTexture){const g=d.mapping;if(g===fu||g===pu)if(e.has(d)){const _=e.get(d).texture;return s(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const T=new Pv(_.height);return T.fromEquirectangularTexture(t,d),e.set(d,T),d.addEventListener("dispose",c),s(T.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const g=d.mapping,_=g===fu||g===pu,T=g===Gr||g===Xa;if(_||T){let x=n.get(d);const u=x!==void 0?x.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==u)return i===null&&(i=new t0(t)),x=_?i.fromEquirectangular(d,x):i.fromCubemap(d,x),x.texture.pmremVersion=d.pmremVersion,n.set(d,x),x.texture;if(x!==void 0)return x.texture;{const v=d.image;return _&&v&&v.height>0||T&&v&&l(v)?(i===null&&(i=new t0(t)),x=_?i.fromEquirectangular(d):i.fromCubemap(d),x.texture.pmremVersion=d.pmremVersion,n.set(d,x),d.addEventListener("dispose",f),x.texture):null}}}return d}function s(d,g){return g===fu?d.mapping=Gr:g===pu&&(d.mapping=Xa),d}function l(d){let g=0;const _=6;for(let T=0;T<_;T++)d[T]!==void 0&&g++;return g===_}function c(d){const g=d.target;g.removeEventListener("dispose",c);const _=e.get(g);_!==void 0&&(e.delete(g),_.dispose())}function f(d){const g=d.target;g.removeEventListener("dispose",f);const _=n.get(g);_!==void 0&&(n.delete(g),_.dispose())}function p(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:p}}function gb(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Ua("WebGLRenderer: "+i+" extension not supported."),r}}}function xb(t,e,n,i){const r={},a=new WeakMap;function o(p){const d=p.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",o),delete r[d.id];const g=a.get(d);g&&(e.remove(g),a.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function s(p,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function l(p){const d=p.attributes;for(const g in d)e.update(d[g],t.ARRAY_BUFFER)}function c(p){const d=[],g=p.index,_=p.attributes.position;let T=0;if(_===void 0)return;if(g!==null){const v=g.array;T=g.version;for(let M=0,S=v.length;M<S;M+=3){const b=v[M+0],E=v[M+1],C=v[M+2];d.push(b,E,E,C,C,b)}}else{const v=_.array;T=_.version;for(let M=0,S=v.length/3-1;M<S;M+=3){const b=M+0,E=M+1,C=M+2;d.push(b,E,E,C,C,b)}}const x=new(_.count>=65535?yv:_v)(d,1);x.version=T;const u=a.get(p);u&&e.remove(u),a.set(p,x)}function f(p){const d=a.get(p);if(d){const g=p.index;g!==null&&d.version<g.version&&c(p)}else c(p);return a.get(p)}return{get:s,update:l,getWireframeAttribute:f}}function vb(t,e,n){let i;function r(p){i=p}let a,o;function s(p){a=p.type,o=p.bytesPerElement}function l(p,d){t.drawElements(i,d,a,p*o),n.update(d,i,1)}function c(p,d,g){g!==0&&(t.drawElementsInstanced(i,d,a,p*o,g),n.update(d,i,g))}function f(p,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,a,p,0,g);let T=0;for(let x=0;x<g;x++)T+=d[x];n.update(T,i,1)}this.setMode=r,this.setIndex=s,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function _b(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,s){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=s*(a/3);break;case t.LINES:n.lines+=s*(a/2);break;case t.LINE_STRIP:n.lines+=s*(a-1);break;case t.LINE_LOOP:n.lines+=s*a;break;case t.POINTS:n.points+=s*a;break;default:Qe("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function yb(t,e,n){const i=new WeakMap,r=new xt;function a(o,s,l){const c=o.morphTargetInfluences,f=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,p=f!==void 0?f.length:0;let d=i.get(s);if(d===void 0||d.count!==p){let P=function(){m.dispose(),i.delete(s),s.removeEventListener("dispose",P)};var g=P;d!==void 0&&d.texture.dispose();const _=s.morphAttributes.position!==void 0,T=s.morphAttributes.normal!==void 0,x=s.morphAttributes.color!==void 0,u=s.morphAttributes.position||[],v=s.morphAttributes.normal||[],M=s.morphAttributes.color||[];let S=0;_===!0&&(S=1),T===!0&&(S=2),x===!0&&(S=3);let b=s.attributes.position.count*S,E=1;b>e.maxTextureSize&&(E=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const C=new Float32Array(b*E*4*p),m=new gv(C,b,E,p);m.type=ci,m.needsUpdate=!0;const R=S*4;for(let I=0;I<p;I++){const L=u[I],Y=v[I],J=M[I],k=b*E*4*I;for(let K=0;K<L.count;K++){const H=K*R;_===!0&&(r.fromBufferAttribute(L,K),C[k+H+0]=r.x,C[k+H+1]=r.y,C[k+H+2]=r.z,C[k+H+3]=0),T===!0&&(r.fromBufferAttribute(Y,K),C[k+H+4]=r.x,C[k+H+5]=r.y,C[k+H+6]=r.z,C[k+H+7]=0),x===!0&&(r.fromBufferAttribute(J,K),C[k+H+8]=r.x,C[k+H+9]=r.y,C[k+H+10]=r.z,C[k+H+11]=J.itemSize===4?r.w:1)}}d={count:p,texture:m,size:new $e(b,E)},i.set(s,d),s.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let _=0;for(let x=0;x<c.length;x++)_+=c[x];const T=s.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",T),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:a}}function Sb(t,e,n,i,r){let a=new WeakMap;function o(c){const f=r.render.frame,p=c.geometry,d=e.get(c,p);if(a.get(d)!==f&&(e.update(d),a.set(d,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==f&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),a.set(c,f))),c.isSkinnedMesh){const g=c.skeleton;a.get(g)!==f&&(g.update(),a.set(g,f))}return d}function s(){a=new WeakMap}function l(c){const f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:o,dispose:s}}const Mb={[ev]:"LINEAR_TONE_MAPPING",[tv]:"REINHARD_TONE_MAPPING",[nv]:"CINEON_TONE_MAPPING",[iv]:"ACES_FILMIC_TONE_MAPPING",[av]:"AGX_TONE_MAPPING",[ov]:"NEUTRAL_TONE_MAPPING",[rv]:"CUSTOM_TONE_MAPPING"};function Eb(t,e,n,i,r,a){const o=new hi(e,n,{type:t,depthBuffer:r,stencilBuffer:a,samples:i?4:0,depthTexture:r?new qa(e,n):void 0}),s=new hi(e,n,{type:Fi,depthBuffer:!1,stencilBuffer:!1}),l=new On;l.setAttribute("position",new tn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new tn([0,2,0,0,2,0],2));const c=new fM({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Lt(l,c),p=new Wp(-1,1,1,-1,0,1);let d=null,g=null,_=!1,T,x=null,u=[],v=!1;this.setSize=function(M,S){o.setSize(M,S),s.setSize(M,S);for(let b=0;b<u.length;b++){const E=u[b];E.setSize&&E.setSize(M,S)}},this.setEffects=function(M){u=M,v=u.length>0&&u[0].isRenderPass===!0;const S=o.width,b=o.height;for(let E=0;E<u.length;E++){const C=u[E];C.setSize&&C.setSize(S,b)}},this.begin=function(M,S){if(_||M.toneMapping===pi&&u.length===0)return!1;if(x=S,S!==null){const b=S.width,E=S.height;(o.width!==b||o.height!==E)&&this.setSize(b,E)}return v===!1&&M.setRenderTarget(o),T=M.toneMapping,M.toneMapping=pi,!0},this.hasRenderPass=function(){return v},this.end=function(M,S){M.toneMapping=T,_=!0;let b=o,E=s;for(let C=0;C<u.length;C++){const m=u[C];if(m.enabled!==!1&&(m.render(M,E,b,S),m.needsSwap!==!1)){const R=b;b=E,E=R}}if(d!==M.outputColorSpace||g!==M.toneMapping){d=M.outputColorSpace,g=M.toneMapping,c.defines={},qe.getTransfer(d)===nt&&(c.defines.SRGB_TRANSFER="");const C=Mb[g];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=b.texture,M.setRenderTarget(x),M.render(f,p),x=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),l.dispose(),c.dispose()}}const Iv=new en,Uf=new qa(1,1),Dv=new gv,Lv=new BS,Nv=new Ev,a0=[],o0=[],s0=new Float32Array(16),l0=new Float32Array(9),c0=new Float32Array(4);function eo(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let a=a0[r];if(a===void 0&&(a=new Float32Array(r),a0[r]=a),e!==0){i.toArray(a,0);for(let o=1,s=0;o!==e;++o)s+=n,t[o].toArray(a,s)}return a}function Ut(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ot(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Dc(t,e){let n=o0[e];n===void 0&&(n=new Int32Array(e),o0[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Tb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function bb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ut(n,e))return;t.uniform2fv(this.addr,e),Ot(n,e)}}function Ab(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ut(n,e))return;t.uniform3fv(this.addr,e),Ot(n,e)}}function Cb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ut(n,e))return;t.uniform4fv(this.addr,e),Ot(n,e)}}function Rb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ut(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ot(n,e)}else{if(Ut(n,i))return;c0.set(i),t.uniformMatrix2fv(this.addr,!1,c0),Ot(n,i)}}function wb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ut(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ot(n,e)}else{if(Ut(n,i))return;l0.set(i),t.uniformMatrix3fv(this.addr,!1,l0),Ot(n,i)}}function Pb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ut(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ot(n,e)}else{if(Ut(n,i))return;s0.set(i),t.uniformMatrix4fv(this.addr,!1,s0),Ot(n,i)}}function Ib(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Db(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ut(n,e))return;t.uniform2iv(this.addr,e),Ot(n,e)}}function Lb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ut(n,e))return;t.uniform3iv(this.addr,e),Ot(n,e)}}function Nb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ut(n,e))return;t.uniform4iv(this.addr,e),Ot(n,e)}}function Fb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function Ub(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ut(n,e))return;t.uniform2uiv(this.addr,e),Ot(n,e)}}function Ob(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ut(n,e))return;t.uniform3uiv(this.addr,e),Ot(n,e)}}function zb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ut(n,e))return;t.uniform4uiv(this.addr,e),Ot(n,e)}}function kb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let a;this.type===t.SAMPLER_2D_SHADOW?(Uf.compareFunction=n.isReversedDepthBuffer()?Bp:kp,a=Uf):a=Iv,n.setTexture2D(e||a,r)}function Bb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Lv,r)}function Vb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Nv,r)}function Hb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Dv,r)}function Gb(t){switch(t){case 5126:return Tb;case 35664:return bb;case 35665:return Ab;case 35666:return Cb;case 35674:return Rb;case 35675:return wb;case 35676:return Pb;case 5124:case 35670:return Ib;case 35667:case 35671:return Db;case 35668:case 35672:return Lb;case 35669:case 35673:return Nb;case 5125:return Fb;case 36294:return Ub;case 36295:return Ob;case 36296:return zb;case 35678:case 36198:case 36298:case 36306:case 35682:return kb;case 35679:case 36299:case 36307:return Bb;case 35680:case 36300:case 36308:case 36293:return Vb;case 36289:case 36303:case 36311:case 36292:return Hb}}function Wb(t,e){t.uniform1fv(this.addr,e)}function jb(t,e){const n=eo(e,this.size,2);t.uniform2fv(this.addr,n)}function Xb(t,e){const n=eo(e,this.size,3);t.uniform3fv(this.addr,n)}function qb(t,e){const n=eo(e,this.size,4);t.uniform4fv(this.addr,n)}function Yb(t,e){const n=eo(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function $b(t,e){const n=eo(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function Kb(t,e){const n=eo(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function Zb(t,e){t.uniform1iv(this.addr,e)}function Qb(t,e){t.uniform2iv(this.addr,e)}function Jb(t,e){t.uniform3iv(this.addr,e)}function eA(t,e){t.uniform4iv(this.addr,e)}function tA(t,e){t.uniform1uiv(this.addr,e)}function nA(t,e){t.uniform2uiv(this.addr,e)}function iA(t,e){t.uniform3uiv(this.addr,e)}function rA(t,e){t.uniform4uiv(this.addr,e)}function aA(t,e,n){const i=this.cache,r=e.length,a=Dc(n,r);Ut(i,a)||(t.uniform1iv(this.addr,a),Ot(i,a));let o;this.type===t.SAMPLER_2D_SHADOW?o=Uf:o=Iv;for(let s=0;s!==r;++s)n.setTexture2D(e[s]||o,a[s])}function oA(t,e,n){const i=this.cache,r=e.length,a=Dc(n,r);Ut(i,a)||(t.uniform1iv(this.addr,a),Ot(i,a));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Lv,a[o])}function sA(t,e,n){const i=this.cache,r=e.length,a=Dc(n,r);Ut(i,a)||(t.uniform1iv(this.addr,a),Ot(i,a));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Nv,a[o])}function lA(t,e,n){const i=this.cache,r=e.length,a=Dc(n,r);Ut(i,a)||(t.uniform1iv(this.addr,a),Ot(i,a));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Dv,a[o])}function cA(t){switch(t){case 5126:return Wb;case 35664:return jb;case 35665:return Xb;case 35666:return qb;case 35674:return Yb;case 35675:return $b;case 35676:return Kb;case 5124:case 35670:return Zb;case 35667:case 35671:return Qb;case 35668:case 35672:return Jb;case 35669:case 35673:return eA;case 5125:return tA;case 36294:return nA;case 36295:return iA;case 36296:return rA;case 35678:case 36198:case 36298:case 36306:case 35682:return aA;case 35679:case 36299:case 36307:return oA;case 35680:case 36300:case 36308:case 36293:return sA;case 36289:case 36303:case 36311:case 36292:return lA}}class uA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Gb(n.type)}}class dA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=cA(n.type)}}class fA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const s=r[a];s.setValue(e,n[s.id],i)}}}const ju=/(\w+)(\])?(\[|\.)?/g;function u0(t,e){t.seq.push(e),t.map[e.id]=e}function pA(t,e,n){const i=t.name,r=i.length;for(ju.lastIndex=0;;){const a=ju.exec(i),o=ju.lastIndex;let s=a[1];const l=a[2]==="]",c=a[3];if(l&&(s=s|0),c===void 0||c==="["&&o+2===r){u0(n,c===void 0?new uA(s,t,e):new dA(s,t,e));break}else{let p=n.map[s];p===void 0&&(p=new fA(s),u0(n,p)),n=p}}}class Ll{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const s=e.getActiveUniform(n,o),l=e.getUniformLocation(n,s.name);pA(s,l,this)}const r=[],a=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):a.push(o);r.length>0&&(this.seq=r.concat(a))}setValue(e,n,i,r){const a=this.map[n];a!==void 0&&a.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let a=0,o=n.length;a!==o;++a){const s=n[a],l=i[s.id];l.needsUpdate!==!1&&s.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,a=e.length;r!==a;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function d0(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const hA=37297;let mA=0;function gA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,n.length);for(let o=r;o<a;o++){const s=o+1;i.push(`${s===e?">":" "} ${s}: ${n[o]}`)}return i.join(`
`)}const f0=new ze;function xA(t){qe._getMatrix(f0,qe.workingColorSpace,t);const e=`mat3( ${f0.elements.map(n=>n.toFixed(4))} )`;switch(qe.getTransfer(t)){case sc:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function p0(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),a=(t.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const s=parseInt(o[1]);return n.toUpperCase()+`

`+a+`

`+gA(t.getShaderSource(e),s)}else return a}function vA(t,e){const n=xA(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const _A={[ev]:"Linear",[tv]:"Reinhard",[nv]:"Cineon",[iv]:"ACESFilmic",[av]:"AgX",[ov]:"Neutral",[rv]:"Custom"};function yA(t,e){const n=_A[e];return n===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const cl=new B;function SA(){qe.getLuminanceCoefficients(cl);const t=cl.x.toFixed(4),e=cl.y.toFixed(4),n=cl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function MA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Do).join(`
`)}function EA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function TA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=t.getActiveAttrib(e,r),o=a.name;let s=1;a.type===t.FLOAT_MAT2&&(s=2),a.type===t.FLOAT_MAT3&&(s=3),a.type===t.FLOAT_MAT4&&(s=4),n[o]={type:a.type,location:t.getAttribLocation(e,o),locationSize:s}}return n}function Do(t){return t!==""}function h0(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function m0(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const bA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Of(t){return t.replace(bA,CA)}const AA=new Map;function CA(t,e){let n=He[e];if(n===void 0){const i=AA.get(e);if(i!==void 0)n=He[i],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Of(n)}const RA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function g0(t){return t.replace(RA,wA)}function wA(t,e,n,i){let r="";for(let a=parseInt(e);a<parseInt(n);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function x0(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const PA={[Rl]:"SHADOWMAP_TYPE_PCF",[Io]:"SHADOWMAP_TYPE_VSM"};function IA(t){return PA[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const DA={[Gr]:"ENVMAP_TYPE_CUBE",[Xa]:"ENVMAP_TYPE_CUBE",[wc]:"ENVMAP_TYPE_CUBE_UV"};function LA(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":DA[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const NA={[Xa]:"ENVMAP_MODE_REFRACTION"};function FA(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":NA[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const UA={[Jx]:"ENVMAP_BLENDING_MULTIPLY",[_S]:"ENVMAP_BLENDING_MIX",[yS]:"ENVMAP_BLENDING_ADD"};function OA(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":UA[t.combine]||"ENVMAP_BLENDING_NONE"}function zA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function kA(t,e,n,i){const r=t.getContext(),a=n.defines;let o=n.vertexShader,s=n.fragmentShader;const l=IA(n),c=LA(n),f=FA(n),p=OA(n),d=zA(n),g=MA(n),_=EA(a),T=r.createProgram();let x,u,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(x=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Do).join(`
`),x.length>0&&(x+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Do).join(`
`),u.length>0&&(u+=`
`)):(x=[x0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Do).join(`
`),u=[x0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==pi?"#define TONE_MAPPING":"",n.toneMapping!==pi?He.tonemapping_pars_fragment:"",n.toneMapping!==pi?yA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,vA("linearToOutputTexel",n.outputColorSpace),SA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Do).join(`
`)),o=Of(o),o=h0(o,n),o=m0(o,n),s=Of(s),s=h0(s,n),s=m0(s,n),o=g0(o),s=g0(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,x=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,u=["#define varying in",n.glslVersion===Tm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Tm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const M=v+x+o,S=v+u+s,b=d0(r,r.VERTEX_SHADER,M),E=d0(r,r.FRAGMENT_SHADER,S);r.attachShader(T,b),r.attachShader(T,E),n.index0AttributeName!==void 0?r.bindAttribLocation(T,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(T,0,"position"),r.linkProgram(T);function C(I){if(t.debug.checkShaderErrors){const L=r.getProgramInfoLog(T)||"",Y=r.getShaderInfoLog(b)||"",J=r.getShaderInfoLog(E)||"",k=L.trim(),K=Y.trim(),H=J.trim();let O=!0,V=!0;if(r.getProgramParameter(T,r.LINK_STATUS)===!1)if(O=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,T,b,E);else{const D=p0(r,b,"vertex"),X=p0(r,E,"fragment");Qe("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(T,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+k+`
`+D+`
`+X)}else k!==""?Ne("WebGLProgram: Program Info Log:",k):(K===""||H==="")&&(V=!1);V&&(I.diagnostics={runnable:O,programLog:k,vertexShader:{log:K,prefix:x},fragmentShader:{log:H,prefix:u}})}r.deleteShader(b),r.deleteShader(E),m=new Ll(r,T),R=TA(r,T)}let m;this.getUniforms=function(){return m===void 0&&C(this),m};let R;this.getAttributes=function(){return R===void 0&&C(this),R};let P=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(T,hA)),P},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(T),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=mA++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=b,this.fragmentShader=E,this}let BA=0;class VA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new HA(e),n.set(e,i)),i}}class HA{constructor(e){this.id=BA++,this.code=e,this.usedTimes=0}}function GA(t){return t===Wr||t===rc||t===ac}function WA(t,e,n,i,r,a){const o=new xv,s=new VA,l=new Set,c=[],f=new Map,p=i.logarithmicDepthBuffer;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(m){return l.add(m),m===0?"uv":`uv${m}`}function T(m,R,P,I,L,Y){const J=I.fog,k=L.geometry,K=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?I.environment:null,H=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,O=e.get(m.envMap||K,H),V=O&&O.mapping===wc?O.image.height:null,D=g[m.type];m.precision!==null&&(d=i.getMaxPrecision(m.precision),d!==m.precision&&Ne("WebGLProgram.getParameters:",m.precision,"not supported, using",d,"instead."));const X=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Z=X!==void 0?X.length:0;let le=0;k.morphAttributes.position!==void 0&&(le=1),k.morphAttributes.normal!==void 0&&(le=2),k.morphAttributes.color!==void 0&&(le=3);let Fe,Re,$,se;if(D){const Ee=oi[D];Fe=Ee.vertexShader,Re=Ee.fragmentShader}else{Fe=m.vertexShader,Re=m.fragmentShader;const Ee=s.getVertexShaderStage(m),Mt=s.getFragmentShaderStage(m);s.update(m,Ee,Mt),$=Ee.id,se=Mt.id}const re=t.getRenderTarget(),Ue=t.state.buffers.depth.getReversed(),Oe=L.isInstancedMesh===!0,De=L.isBatchedMesh===!0,pt=!!m.map,ke=!!m.matcap,tt=!!O,Ke=!!m.aoMap,Xe=!!m.lightMap,mt=!!m.bumpMap&&m.wireframe===!1,bt=!!m.normalMap,wt=!!m.displacementMap,Pt=!!m.emissiveMap,ut=!!m.metalnessMap,St=!!m.roughnessMap,F=m.anisotropy>0,Vt=m.clearcoat>0,et=m.dispersion>0,w=m.iridescence>0,y=m.sheen>0,z=m.transmission>0,j=F&&!!m.anisotropyMap,Q=Vt&&!!m.clearcoatMap,oe=Vt&&!!m.clearcoatNormalMap,ue=Vt&&!!m.clearcoatRoughnessMap,ee=w&&!!m.iridescenceMap,te=w&&!!m.iridescenceThicknessMap,fe=y&&!!m.sheenColorMap,Ae=y&&!!m.sheenRoughnessMap,me=!!m.specularMap,pe=!!m.specularColorMap,Ie=!!m.specularIntensityMap,Le=z&&!!m.transmissionMap,Be=z&&!!m.thicknessMap,N=!!m.gradientMap,de=!!m.alphaMap,ne=m.alphaTest>0,he=!!m.alphaHash,_e=!!m.extensions;let ie=pi;m.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ie=t.toneMapping);const be={shaderID:D,shaderType:m.type,shaderName:m.name,vertexShader:Fe,fragmentShader:Re,defines:m.defines,customVertexShaderID:$,customFragmentShaderID:se,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:d,batching:De,batchingColor:De&&L._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&L.instanceColor!==null,instancingMorph:Oe&&L.morphTexture!==null,outputColorSpace:re===null?t.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:qe.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:pt,matcap:ke,envMap:tt,envMapMode:tt&&O.mapping,envMapCubeUVHeight:V,aoMap:Ke,lightMap:Xe,bumpMap:mt,normalMap:bt,displacementMap:wt,emissiveMap:Pt,normalMapObjectSpace:bt&&m.normalMapType===ES,normalMapTangentSpace:bt&&m.normalMapType===Nf,packedNormalMap:bt&&m.normalMapType===Nf&&GA(m.normalMap.format),metalnessMap:ut,roughnessMap:St,anisotropy:F,anisotropyMap:j,clearcoat:Vt,clearcoatMap:Q,clearcoatNormalMap:oe,clearcoatRoughnessMap:ue,dispersion:et,iridescence:w,iridescenceMap:ee,iridescenceThicknessMap:te,sheen:y,sheenColorMap:fe,sheenRoughnessMap:Ae,specularMap:me,specularColorMap:pe,specularIntensityMap:Ie,transmission:z,transmissionMap:Le,thicknessMap:Be,gradientMap:N,opaque:m.transparent===!1&&m.blending===Fa&&m.alphaToCoverage===!1,alphaMap:de,alphaTest:ne,alphaHash:he,combine:m.combine,mapUv:pt&&_(m.map.channel),aoMapUv:Ke&&_(m.aoMap.channel),lightMapUv:Xe&&_(m.lightMap.channel),bumpMapUv:mt&&_(m.bumpMap.channel),normalMapUv:bt&&_(m.normalMap.channel),displacementMapUv:wt&&_(m.displacementMap.channel),emissiveMapUv:Pt&&_(m.emissiveMap.channel),metalnessMapUv:ut&&_(m.metalnessMap.channel),roughnessMapUv:St&&_(m.roughnessMap.channel),anisotropyMapUv:j&&_(m.anisotropyMap.channel),clearcoatMapUv:Q&&_(m.clearcoatMap.channel),clearcoatNormalMapUv:oe&&_(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&_(m.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&_(m.iridescenceMap.channel),iridescenceThicknessMapUv:te&&_(m.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&_(m.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(m.sheenRoughnessMap.channel),specularMapUv:me&&_(m.specularMap.channel),specularColorMapUv:pe&&_(m.specularColorMap.channel),specularIntensityMapUv:Ie&&_(m.specularIntensityMap.channel),transmissionMapUv:Le&&_(m.transmissionMap.channel),thicknessMapUv:Be&&_(m.thicknessMap.channel),alphaMapUv:de&&_(m.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(bt||F),vertexNormals:!!k.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!k.attributes.uv&&(pt||de),fog:!!J,useFog:m.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||k.attributes.normal===void 0&&bt===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Ue,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:le,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:m.dithering,shadowMapEnabled:t.shadowMap.enabled&&P.length>0,shadowMapType:t.shadowMap.type,toneMapping:ie,decodeVideoTexture:pt&&m.map.isVideoTexture===!0&&qe.getTransfer(m.map.colorSpace)===nt,decodeVideoTextureEmissive:Pt&&m.emissiveMap.isVideoTexture===!0&&qe.getTransfer(m.emissiveMap.colorSpace)===nt,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===li,flipSided:m.side===mn,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:_e&&m.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&m.extensions.multiDraw===!0||De)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function x(m){const R=[];if(m.shaderID?R.push(m.shaderID):(R.push(m.customVertexShaderID),R.push(m.customFragmentShaderID)),m.defines!==void 0)for(const P in m.defines)R.push(P),R.push(m.defines[P]);return m.isRawShaderMaterial===!1&&(u(R,m),v(R,m),R.push(t.outputColorSpace)),R.push(m.customProgramCacheKey),R.join()}function u(m,R){m.push(R.precision),m.push(R.outputColorSpace),m.push(R.envMapMode),m.push(R.envMapCubeUVHeight),m.push(R.mapUv),m.push(R.alphaMapUv),m.push(R.lightMapUv),m.push(R.aoMapUv),m.push(R.bumpMapUv),m.push(R.normalMapUv),m.push(R.displacementMapUv),m.push(R.emissiveMapUv),m.push(R.metalnessMapUv),m.push(R.roughnessMapUv),m.push(R.anisotropyMapUv),m.push(R.clearcoatMapUv),m.push(R.clearcoatNormalMapUv),m.push(R.clearcoatRoughnessMapUv),m.push(R.iridescenceMapUv),m.push(R.iridescenceThicknessMapUv),m.push(R.sheenColorMapUv),m.push(R.sheenRoughnessMapUv),m.push(R.specularMapUv),m.push(R.specularColorMapUv),m.push(R.specularIntensityMapUv),m.push(R.transmissionMapUv),m.push(R.thicknessMapUv),m.push(R.combine),m.push(R.fogExp2),m.push(R.sizeAttenuation),m.push(R.morphTargetsCount),m.push(R.morphAttributeCount),m.push(R.numDirLights),m.push(R.numPointLights),m.push(R.numSpotLights),m.push(R.numSpotLightMaps),m.push(R.numHemiLights),m.push(R.numRectAreaLights),m.push(R.numDirLightShadows),m.push(R.numPointLightShadows),m.push(R.numSpotLightShadows),m.push(R.numSpotLightShadowsWithMaps),m.push(R.numLightProbes),m.push(R.shadowMapType),m.push(R.toneMapping),m.push(R.numClippingPlanes),m.push(R.numClipIntersection),m.push(R.depthPacking)}function v(m,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),m.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),m.push(o.mask)}function M(m){const R=g[m.type];let P;if(R){const I=oi[R];P=cM.clone(I.uniforms)}else P=m.uniforms;return P}function S(m,R){let P=f.get(R);return P!==void 0?++P.usedTimes:(P=new kA(t,R,m,r),c.push(P),f.set(R,P)),P}function b(m){if(--m.usedTimes===0){const R=c.indexOf(m);c[R]=c[c.length-1],c.pop(),f.delete(m.cacheKey),m.destroy()}}function E(m){s.remove(m)}function C(){s.dispose()}return{getParameters:T,getProgramCacheKey:x,getUniforms:M,acquireProgram:S,releaseProgram:b,releaseShaderCache:E,programs:c,dispose:C}}function jA(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let s=t.get(o);return s===void 0&&(s={},t.set(o,s)),s}function i(o){t.delete(o)}function r(o,s,l){t.get(o)[s]=l}function a(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:a}}function XA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function v0(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function _0(){const t=[];let e=0;const n=[],i=[],r=[];function a(){e=0,n.length=0,i.length=0,r.length=0}function o(d){let g=0;return d.isInstancedMesh&&(g+=2),d.isSkinnedMesh&&(g+=1),g}function s(d,g,_,T,x,u){let v=t[e];return v===void 0?(v={id:d.id,object:d,geometry:g,material:_,materialVariant:o(d),groupOrder:T,renderOrder:d.renderOrder,z:x,group:u},t[e]=v):(v.id=d.id,v.object=d,v.geometry=g,v.material=_,v.materialVariant=o(d),v.groupOrder=T,v.renderOrder=d.renderOrder,v.z=x,v.group=u),e++,v}function l(d,g,_,T,x,u){const v=s(d,g,_,T,x,u);_.transmission>0?i.push(v):_.transparent===!0?r.push(v):n.push(v)}function c(d,g,_,T,x,u){const v=s(d,g,_,T,x,u);_.transmission>0?i.unshift(v):_.transparent===!0?r.unshift(v):n.unshift(v)}function f(d,g,_){n.length>1&&n.sort(d||XA),i.length>1&&i.sort(g||v0),r.length>1&&r.sort(g||v0),_&&(n.reverse(),i.reverse(),r.reverse())}function p(){for(let d=e,g=t.length;d<g;d++){const _=t[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:r,init:a,push:l,unshift:c,finish:p,sort:f}}function qA(){let t=new WeakMap;function e(i,r){const a=t.get(i);let o;return a===void 0?(o=new _0,t.set(i,[o])):r>=a.length?(o=new _0,a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function YA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new B,color:new We};break;case"SpotLight":n={position:new B,direction:new B,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new B,color:new We,distance:0,decay:0};break;case"HemisphereLight":n={direction:new B,skyColor:new We,groundColor:new We};break;case"RectAreaLight":n={color:new We,position:new B,halfWidth:new B,halfHeight:new B};break}return t[e.id]=n,n}}}function $A(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let KA=0;function ZA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function QA(t){const e=new YA,n=$A(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const r=new B,a=new _t,o=new _t;function s(c){let f=0,p=0,d=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let g=0,_=0,T=0,x=0,u=0,v=0,M=0,S=0,b=0,E=0,C=0;c.sort(ZA);for(let R=0,P=c.length;R<P;R++){const I=c[R],L=I.color,Y=I.intensity,J=I.distance;let k=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Wr?k=I.shadow.map.texture:k=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)f+=L.r*Y,p+=L.g*Y,d+=L.b*Y;else if(I.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(I.sh.coefficients[K],Y);C++}else if(I.isDirectionalLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const H=I.shadow,O=n.get(I);O.shadowIntensity=H.intensity,O.shadowBias=H.bias,O.shadowNormalBias=H.normalBias,O.shadowRadius=H.radius,O.shadowMapSize=H.mapSize,i.directionalShadow[g]=O,i.directionalShadowMap[g]=k,i.directionalShadowMatrix[g]=I.shadow.matrix,v++}i.directional[g]=K,g++}else if(I.isSpotLight){const K=e.get(I);K.position.setFromMatrixPosition(I.matrixWorld),K.color.copy(L).multiplyScalar(Y),K.distance=J,K.coneCos=Math.cos(I.angle),K.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),K.decay=I.decay,i.spot[T]=K;const H=I.shadow;if(I.map&&(i.spotLightMap[b]=I.map,b++,H.updateMatrices(I),I.castShadow&&E++),i.spotLightMatrix[T]=H.matrix,I.castShadow){const O=n.get(I);O.shadowIntensity=H.intensity,O.shadowBias=H.bias,O.shadowNormalBias=H.normalBias,O.shadowRadius=H.radius,O.shadowMapSize=H.mapSize,i.spotShadow[T]=O,i.spotShadowMap[T]=k,S++}T++}else if(I.isRectAreaLight){const K=e.get(I);K.color.copy(L).multiplyScalar(Y),K.halfWidth.set(I.width*.5,0,0),K.halfHeight.set(0,I.height*.5,0),i.rectArea[x]=K,x++}else if(I.isPointLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),K.distance=I.distance,K.decay=I.decay,I.castShadow){const H=I.shadow,O=n.get(I);O.shadowIntensity=H.intensity,O.shadowBias=H.bias,O.shadowNormalBias=H.normalBias,O.shadowRadius=H.radius,O.shadowMapSize=H.mapSize,O.shadowCameraNear=H.camera.near,O.shadowCameraFar=H.camera.far,i.pointShadow[_]=O,i.pointShadowMap[_]=k,i.pointShadowMatrix[_]=I.shadow.matrix,M++}i.point[_]=K,_++}else if(I.isHemisphereLight){const K=e.get(I);K.skyColor.copy(I.color).multiplyScalar(Y),K.groundColor.copy(I.groundColor).multiplyScalar(Y),i.hemi[u]=K,u++}}x>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=d;const m=i.hash;(m.directionalLength!==g||m.pointLength!==_||m.spotLength!==T||m.rectAreaLength!==x||m.hemiLength!==u||m.numDirectionalShadows!==v||m.numPointShadows!==M||m.numSpotShadows!==S||m.numSpotMaps!==b||m.numLightProbes!==C)&&(i.directional.length=g,i.spot.length=T,i.rectArea.length=x,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=S+b-E,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,m.directionalLength=g,m.pointLength=_,m.spotLength=T,m.rectAreaLength=x,m.hemiLength=u,m.numDirectionalShadows=v,m.numPointShadows=M,m.numSpotShadows=S,m.numSpotMaps=b,m.numLightProbes=C,i.version=KA++)}function l(c,f){let p=0,d=0,g=0,_=0,T=0;const x=f.matrixWorldInverse;for(let u=0,v=c.length;u<v;u++){const M=c[u];if(M.isDirectionalLight){const S=i.directional[p];S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(x),p++}else if(M.isSpotLight){const S=i.spot[g];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(x),S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(x),g++}else if(M.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(x),o.identity(),a.copy(M.matrixWorld),a.premultiply(x),o.extractRotation(a),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const S=i.point[d];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(x),d++}else if(M.isHemisphereLight){const S=i.hemi[T];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(x),T++}}}return{setup:s,setupView:l,state:i}}function y0(t){const e=new QA(t),n=[],i=[],r=[];function a(d){p.camera=d,n.length=0,i.length=0,r.length=0}function o(d){n.push(d)}function s(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(n)}function f(d){e.setupView(n,d)}const p={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:p,setupLights:c,setupLightsView:f,pushLight:o,pushShadow:s,pushLightProbeGrid:l}}function JA(t){let e=new WeakMap;function n(r,a=0){const o=e.get(r);let s;return o===void 0?(s=new y0(t),e.set(r,[s])):a>=o.length?(s=new y0(t),o.push(s)):s=o[a],s}function i(){e=new WeakMap}return{get:n,dispose:i}}const eC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,nC=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],iC=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],S0=new _t,_o=new B,Xu=new B;function rC(t,e,n){let i=new Gp;const r=new $e,a=new $e,o=new xt,s=new pM,l=new hM,c={},f=n.maxTextureSize,p={[mr]:mn,[mn]:mr,[li]:li},d=new xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:eC,fragmentShader:tC}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const _=new On;_.setAttribute("position",new mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new Lt(_,d),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rl;let u=this.type;this.render=function(E,C,m){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||E.length===0)return;this.type===eS&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Rl);const R=t.getRenderTarget(),P=t.getActiveCubeFace(),I=t.getActiveMipmapLevel(),L=t.state;L.setBlending(wi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const Y=u!==this.type;Y&&C.traverse(function(J){J.material&&(Array.isArray(J.material)?J.material.forEach(k=>k.needsUpdate=!0):J.material.needsUpdate=!0)});for(let J=0,k=E.length;J<k;J++){const K=E[J],H=K.shadow;if(H===void 0){Ne("WebGLShadowMap:",K,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const O=H.getFrameExtents();r.multiply(O),a.copy(H.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(a.x=Math.floor(f/O.x),r.x=a.x*O.x,H.mapSize.x=a.x),r.y>f&&(a.y=Math.floor(f/O.y),r.y=a.y*O.y,H.mapSize.y=a.y));const V=t.state.buffers.depth.getReversed();if(H.camera._reversedDepth=V,H.map===null||Y===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Io){if(K.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new hi(r.x,r.y,{format:Wr,type:Fi,minFilter:Jt,magFilter:Jt,generateMipmaps:!1}),H.map.texture.name=K.name+".shadowMap",H.map.depthTexture=new qa(r.x,r.y,ci),H.map.depthTexture.name=K.name+".shadowMapDepth",H.map.depthTexture.format=Ui,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Gt,H.map.depthTexture.magFilter=Gt}else K.isPointLight?(H.map=new Pv(r.x),H.map.depthTexture=new sM(r.x,gi)):(H.map=new hi(r.x,r.y),H.map.depthTexture=new qa(r.x,r.y,gi)),H.map.depthTexture.name=K.name+".shadowMap",H.map.depthTexture.format=Ui,this.type===Rl?(H.map.depthTexture.compareFunction=V?Bp:kp,H.map.depthTexture.minFilter=Jt,H.map.depthTexture.magFilter=Jt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Gt,H.map.depthTexture.magFilter=Gt);H.camera.updateProjectionMatrix()}const D=H.map.isWebGLCubeRenderTarget?6:1;for(let X=0;X<D;X++){if(H.map.isWebGLCubeRenderTarget)t.setRenderTarget(H.map,X),t.clear();else{X===0&&(t.setRenderTarget(H.map),t.clear());const Z=H.getViewport(X);o.set(a.x*Z.x,a.y*Z.y,a.x*Z.z,a.y*Z.w),L.viewport(o)}if(K.isPointLight){const Z=H.camera,le=H.matrix,Fe=K.distance||Z.far;Fe!==Z.far&&(Z.far=Fe,Z.updateProjectionMatrix()),_o.setFromMatrixPosition(K.matrixWorld),Z.position.copy(_o),Xu.copy(Z.position),Xu.add(nC[X]),Z.up.copy(iC[X]),Z.lookAt(Xu),Z.updateMatrixWorld(),le.makeTranslation(-_o.x,-_o.y,-_o.z),S0.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),H._frustum.setFromProjectionMatrix(S0,Z.coordinateSystem,Z.reversedDepth)}else H.updateMatrices(K);i=H.getFrustum(),S(C,m,H.camera,K,this.type)}H.isPointLightShadow!==!0&&this.type===Io&&v(H,m),H.needsUpdate=!1}u=this.type,x.needsUpdate=!1,t.setRenderTarget(R,P,I)};function v(E,C){const m=e.update(T);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,g.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new hi(r.x,r.y,{format:Wr,type:Fi})),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,t.setRenderTarget(E.mapPass),t.clear(),t.renderBufferDirect(C,null,m,d,T,null),g.uniforms.shadow_pass.value=E.mapPass.texture,g.uniforms.resolution.value=E.mapSize,g.uniforms.radius.value=E.radius,t.setRenderTarget(E.map),t.clear(),t.renderBufferDirect(C,null,m,g,T,null)}function M(E,C,m,R){let P=null;const I=m.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)P=I;else if(P=m.isPointLight===!0?l:s,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const L=P.uuid,Y=C.uuid;let J=c[L];J===void 0&&(J={},c[L]=J);let k=J[Y];k===void 0&&(k=P.clone(),J[Y]=k,C.addEventListener("dispose",b)),P=k}if(P.visible=C.visible,P.wireframe=C.wireframe,R===Io?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:p[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,m.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const L=t.properties.get(P);L.light=m}return P}function S(E,C,m,R,P){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===Io)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,E.matrixWorld);const Y=e.update(E),J=E.material;if(Array.isArray(J)){const k=Y.groups;for(let K=0,H=k.length;K<H;K++){const O=k[K],V=J[O.materialIndex];if(V&&V.visible){const D=M(E,V,R,P);E.onBeforeShadow(t,E,C,m,Y,D,O),t.renderBufferDirect(m,null,Y,D,E,O),E.onAfterShadow(t,E,C,m,Y,D,O)}}}else if(J.visible){const k=M(E,J,R,P);E.onBeforeShadow(t,E,C,m,Y,k,null),t.renderBufferDirect(m,null,Y,k,E,null),E.onAfterShadow(t,E,C,m,Y,k,null)}}const L=E.children;for(let Y=0,J=L.length;Y<J;Y++)S(L[Y],C,m,R,P)}function b(E){E.target.removeEventListener("dispose",b);for(const m in c){const R=c[m],P=E.target.uuid;P in R&&(R[P].dispose(),delete R[P])}}}function aC(t,e){function n(){let N=!1;const de=new xt;let ne=null;const he=new xt(0,0,0,0);return{setMask:function(_e){ne!==_e&&!N&&(t.colorMask(_e,_e,_e,_e),ne=_e)},setLocked:function(_e){N=_e},setClear:function(_e,ie,be,Ee,Mt){Mt===!0&&(_e*=Ee,ie*=Ee,be*=Ee),de.set(_e,ie,be,Ee),he.equals(de)===!1&&(t.clearColor(_e,ie,be,Ee),he.copy(de))},reset:function(){N=!1,ne=null,he.set(-1,0,0,0)}}}function i(){let N=!1,de=!1,ne=null,he=null,_e=null;return{setReversed:function(ie){if(de!==ie){const be=e.get("EXT_clip_control");ie?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),de=ie;const Ee=_e;_e=null,this.setClear(Ee)}},getReversed:function(){return de},setTest:function(ie){ie?re(t.DEPTH_TEST):Ue(t.DEPTH_TEST)},setMask:function(ie){ne!==ie&&!N&&(t.depthMask(ie),ne=ie)},setFunc:function(ie){if(de&&(ie=LS[ie]),he!==ie){switch(ie){case Yd:t.depthFunc(t.NEVER);break;case $d:t.depthFunc(t.ALWAYS);break;case Kd:t.depthFunc(t.LESS);break;case ja:t.depthFunc(t.LEQUAL);break;case Zd:t.depthFunc(t.EQUAL);break;case Qd:t.depthFunc(t.GEQUAL);break;case Jd:t.depthFunc(t.GREATER);break;case ef:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}he=ie}},setLocked:function(ie){N=ie},setClear:function(ie){_e!==ie&&(_e=ie,de&&(ie=1-ie),t.clearDepth(ie))},reset:function(){N=!1,ne=null,he=null,_e=null,de=!1}}}function r(){let N=!1,de=null,ne=null,he=null,_e=null,ie=null,be=null,Ee=null,Mt=null;return{setTest:function(st){N||(st?re(t.STENCIL_TEST):Ue(t.STENCIL_TEST))},setMask:function(st){de!==st&&!N&&(t.stencilMask(st),de=st)},setFunc:function(st,Zn,Qn){(ne!==st||he!==Zn||_e!==Qn)&&(t.stencilFunc(st,Zn,Qn),ne=st,he=Zn,_e=Qn)},setOp:function(st,Zn,Qn){(ie!==st||be!==Zn||Ee!==Qn)&&(t.stencilOp(st,Zn,Qn),ie=st,be=Zn,Ee=Qn)},setLocked:function(st){N=st},setClear:function(st){Mt!==st&&(t.clearStencil(st),Mt=st)},reset:function(){N=!1,de=null,ne=null,he=null,_e=null,ie=null,be=null,Ee=null,Mt=null}}}const a=new n,o=new i,s=new r,l=new WeakMap,c=new WeakMap;let f={},p={},d={},g=new WeakMap,_=[],T=null,x=!1,u=null,v=null,M=null,S=null,b=null,E=null,C=null,m=new We(0,0,0),R=0,P=!1,I=null,L=null,Y=null,J=null,k=null;const K=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,O=0;const V=t.getParameter(t.VERSION);V.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(V)[1]),H=O>=1):V.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),H=O>=2);let D=null,X={};const Z=t.getParameter(t.SCISSOR_BOX),le=t.getParameter(t.VIEWPORT),Fe=new xt().fromArray(Z),Re=new xt().fromArray(le);function $(N,de,ne,he){const _e=new Uint8Array(4),ie=t.createTexture();t.bindTexture(N,ie),t.texParameteri(N,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(N,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let be=0;be<ne;be++)N===t.TEXTURE_3D||N===t.TEXTURE_2D_ARRAY?t.texImage3D(de,0,t.RGBA,1,1,he,0,t.RGBA,t.UNSIGNED_BYTE,_e):t.texImage2D(de+be,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,_e);return ie}const se={};se[t.TEXTURE_2D]=$(t.TEXTURE_2D,t.TEXTURE_2D,1),se[t.TEXTURE_CUBE_MAP]=$(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[t.TEXTURE_2D_ARRAY]=$(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),se[t.TEXTURE_3D]=$(t.TEXTURE_3D,t.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),re(t.DEPTH_TEST),o.setFunc(ja),mt(!1),bt(vm),re(t.CULL_FACE),Ke(wi);function re(N){f[N]!==!0&&(t.enable(N),f[N]=!0)}function Ue(N){f[N]!==!1&&(t.disable(N),f[N]=!1)}function Oe(N,de){return d[N]!==de?(t.bindFramebuffer(N,de),d[N]=de,N===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=de),N===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=de),!0):!1}function De(N,de){let ne=_,he=!1;if(N){ne=g.get(de),ne===void 0&&(ne=[],g.set(de,ne));const _e=N.textures;if(ne.length!==_e.length||ne[0]!==t.COLOR_ATTACHMENT0){for(let ie=0,be=_e.length;ie<be;ie++)ne[ie]=t.COLOR_ATTACHMENT0+ie;ne.length=_e.length,he=!0}}else ne[0]!==t.BACK&&(ne[0]=t.BACK,he=!0);he&&t.drawBuffers(ne)}function pt(N){return T!==N?(t.useProgram(N),T=N,!0):!1}const ke={[Rr]:t.FUNC_ADD,[nS]:t.FUNC_SUBTRACT,[iS]:t.FUNC_REVERSE_SUBTRACT};ke[rS]=t.MIN,ke[aS]=t.MAX;const tt={[oS]:t.ZERO,[sS]:t.ONE,[lS]:t.SRC_COLOR,[Xd]:t.SRC_ALPHA,[hS]:t.SRC_ALPHA_SATURATE,[fS]:t.DST_COLOR,[uS]:t.DST_ALPHA,[cS]:t.ONE_MINUS_SRC_COLOR,[qd]:t.ONE_MINUS_SRC_ALPHA,[pS]:t.ONE_MINUS_DST_COLOR,[dS]:t.ONE_MINUS_DST_ALPHA,[mS]:t.CONSTANT_COLOR,[gS]:t.ONE_MINUS_CONSTANT_COLOR,[xS]:t.CONSTANT_ALPHA,[vS]:t.ONE_MINUS_CONSTANT_ALPHA};function Ke(N,de,ne,he,_e,ie,be,Ee,Mt,st){if(N===wi){x===!0&&(Ue(t.BLEND),x=!1);return}if(x===!1&&(re(t.BLEND),x=!0),N!==tS){if(N!==u||st!==P){if((v!==Rr||b!==Rr)&&(t.blendEquation(t.FUNC_ADD),v=Rr,b=Rr),st)switch(N){case Fa:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case _m:t.blendFunc(t.ONE,t.ONE);break;case ym:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Sm:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Qe("WebGLState: Invalid blending: ",N);break}else switch(N){case Fa:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case _m:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case ym:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sm:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",N);break}M=null,S=null,E=null,C=null,m.set(0,0,0),R=0,u=N,P=st}return}_e=_e||de,ie=ie||ne,be=be||he,(de!==v||_e!==b)&&(t.blendEquationSeparate(ke[de],ke[_e]),v=de,b=_e),(ne!==M||he!==S||ie!==E||be!==C)&&(t.blendFuncSeparate(tt[ne],tt[he],tt[ie],tt[be]),M=ne,S=he,E=ie,C=be),(Ee.equals(m)===!1||Mt!==R)&&(t.blendColor(Ee.r,Ee.g,Ee.b,Mt),m.copy(Ee),R=Mt),u=N,P=!1}function Xe(N,de){N.side===li?Ue(t.CULL_FACE):re(t.CULL_FACE);let ne=N.side===mn;de&&(ne=!ne),mt(ne),N.blending===Fa&&N.transparent===!1?Ke(wi):Ke(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),a.setMask(N.colorWrite);const he=N.stencilWrite;s.setTest(he),he&&(s.setMask(N.stencilWriteMask),s.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),s.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Pt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?re(t.SAMPLE_ALPHA_TO_COVERAGE):Ue(t.SAMPLE_ALPHA_TO_COVERAGE)}function mt(N){I!==N&&(N?t.frontFace(t.CW):t.frontFace(t.CCW),I=N)}function bt(N){N!==Q1?(re(t.CULL_FACE),N!==L&&(N===vm?t.cullFace(t.BACK):N===J1?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ue(t.CULL_FACE),L=N}function wt(N){N!==Y&&(H&&t.lineWidth(N),Y=N)}function Pt(N,de,ne){N?(re(t.POLYGON_OFFSET_FILL),(J!==de||k!==ne)&&(J=de,k=ne,o.getReversed()&&(de=-de),t.polygonOffset(de,ne))):Ue(t.POLYGON_OFFSET_FILL)}function ut(N){N?re(t.SCISSOR_TEST):Ue(t.SCISSOR_TEST)}function St(N){N===void 0&&(N=t.TEXTURE0+K-1),D!==N&&(t.activeTexture(N),D=N)}function F(N,de,ne){ne===void 0&&(D===null?ne=t.TEXTURE0+K-1:ne=D);let he=X[ne];he===void 0&&(he={type:void 0,texture:void 0},X[ne]=he),(he.type!==N||he.texture!==de)&&(D!==ne&&(t.activeTexture(ne),D=ne),t.bindTexture(N,de||se[N]),he.type=N,he.texture=de)}function Vt(){const N=X[D];N!==void 0&&N.type!==void 0&&(t.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function et(){try{t.compressedTexImage2D(...arguments)}catch(N){Qe("WebGLState:",N)}}function w(){try{t.compressedTexImage3D(...arguments)}catch(N){Qe("WebGLState:",N)}}function y(){try{t.texSubImage2D(...arguments)}catch(N){Qe("WebGLState:",N)}}function z(){try{t.texSubImage3D(...arguments)}catch(N){Qe("WebGLState:",N)}}function j(){try{t.compressedTexSubImage2D(...arguments)}catch(N){Qe("WebGLState:",N)}}function Q(){try{t.compressedTexSubImage3D(...arguments)}catch(N){Qe("WebGLState:",N)}}function oe(){try{t.texStorage2D(...arguments)}catch(N){Qe("WebGLState:",N)}}function ue(){try{t.texStorage3D(...arguments)}catch(N){Qe("WebGLState:",N)}}function ee(){try{t.texImage2D(...arguments)}catch(N){Qe("WebGLState:",N)}}function te(){try{t.texImage3D(...arguments)}catch(N){Qe("WebGLState:",N)}}function fe(N){return p[N]!==void 0?p[N]:t.getParameter(N)}function Ae(N,de){p[N]!==de&&(t.pixelStorei(N,de),p[N]=de)}function me(N){Fe.equals(N)===!1&&(t.scissor(N.x,N.y,N.z,N.w),Fe.copy(N))}function pe(N){Re.equals(N)===!1&&(t.viewport(N.x,N.y,N.z,N.w),Re.copy(N))}function Ie(N,de){let ne=c.get(de);ne===void 0&&(ne=new WeakMap,c.set(de,ne));let he=ne.get(N);he===void 0&&(he=t.getUniformBlockIndex(de,N.name),ne.set(N,he))}function Le(N,de){const he=c.get(de).get(N);l.get(de)!==he&&(t.uniformBlockBinding(de,he,N.__bindingPointIndex),l.set(de,he))}function Be(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),f={},p={},D=null,X={},d={},g=new WeakMap,_=[],T=null,x=!1,u=null,v=null,M=null,S=null,b=null,E=null,C=null,m=new We(0,0,0),R=0,P=!1,I=null,L=null,Y=null,J=null,k=null,Fe.set(0,0,t.canvas.width,t.canvas.height),Re.set(0,0,t.canvas.width,t.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:re,disable:Ue,bindFramebuffer:Oe,drawBuffers:De,useProgram:pt,setBlending:Ke,setMaterial:Xe,setFlipSided:mt,setCullFace:bt,setLineWidth:wt,setPolygonOffset:Pt,setScissorTest:ut,activeTexture:St,bindTexture:F,unbindTexture:Vt,compressedTexImage2D:et,compressedTexImage3D:w,texImage2D:ee,texImage3D:te,pixelStorei:Ae,getParameter:fe,updateUBOMapping:Ie,uniformBlockBinding:Le,texStorage2D:oe,texStorage3D:ue,texSubImage2D:y,texSubImage3D:z,compressedTexSubImage2D:j,compressedTexSubImage3D:Q,scissor:me,viewport:pe,reset:Be}}function oC(t,e,n,i,r,a,o){const s=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,f=new WeakMap,p=new Set;let d;const g=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(w,y){return _?new OffscreenCanvas(w,y):lc("canvas")}function x(w,y,z){let j=1;const Q=et(w);if((Q.width>z||Q.height>z)&&(j=z/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const oe=Math.floor(j*Q.width),ue=Math.floor(j*Q.height);d===void 0&&(d=T(oe,ue));const ee=y?T(oe,ue):d;return ee.width=oe,ee.height=ue,ee.getContext("2d").drawImage(w,0,0,oe,ue),Ne("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+oe+"x"+ue+")."),ee}else return"data"in w&&Ne("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function u(w){return w.generateMipmaps}function v(w){t.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?t.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function S(w,y,z,j,Q,oe=!1){if(w!==null){if(t[w]!==void 0)return t[w];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ue;j&&(ue=e.get("EXT_texture_norm16"),ue||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=y;if(y===t.RED&&(z===t.FLOAT&&(ee=t.R32F),z===t.HALF_FLOAT&&(ee=t.R16F),z===t.UNSIGNED_BYTE&&(ee=t.R8),z===t.UNSIGNED_SHORT&&ue&&(ee=ue.R16_EXT),z===t.SHORT&&ue&&(ee=ue.R16_SNORM_EXT)),y===t.RED_INTEGER&&(z===t.UNSIGNED_BYTE&&(ee=t.R8UI),z===t.UNSIGNED_SHORT&&(ee=t.R16UI),z===t.UNSIGNED_INT&&(ee=t.R32UI),z===t.BYTE&&(ee=t.R8I),z===t.SHORT&&(ee=t.R16I),z===t.INT&&(ee=t.R32I)),y===t.RG&&(z===t.FLOAT&&(ee=t.RG32F),z===t.HALF_FLOAT&&(ee=t.RG16F),z===t.UNSIGNED_BYTE&&(ee=t.RG8),z===t.UNSIGNED_SHORT&&ue&&(ee=ue.RG16_EXT),z===t.SHORT&&ue&&(ee=ue.RG16_SNORM_EXT)),y===t.RG_INTEGER&&(z===t.UNSIGNED_BYTE&&(ee=t.RG8UI),z===t.UNSIGNED_SHORT&&(ee=t.RG16UI),z===t.UNSIGNED_INT&&(ee=t.RG32UI),z===t.BYTE&&(ee=t.RG8I),z===t.SHORT&&(ee=t.RG16I),z===t.INT&&(ee=t.RG32I)),y===t.RGB_INTEGER&&(z===t.UNSIGNED_BYTE&&(ee=t.RGB8UI),z===t.UNSIGNED_SHORT&&(ee=t.RGB16UI),z===t.UNSIGNED_INT&&(ee=t.RGB32UI),z===t.BYTE&&(ee=t.RGB8I),z===t.SHORT&&(ee=t.RGB16I),z===t.INT&&(ee=t.RGB32I)),y===t.RGBA_INTEGER&&(z===t.UNSIGNED_BYTE&&(ee=t.RGBA8UI),z===t.UNSIGNED_SHORT&&(ee=t.RGBA16UI),z===t.UNSIGNED_INT&&(ee=t.RGBA32UI),z===t.BYTE&&(ee=t.RGBA8I),z===t.SHORT&&(ee=t.RGBA16I),z===t.INT&&(ee=t.RGBA32I)),y===t.RGB&&(z===t.UNSIGNED_SHORT&&ue&&(ee=ue.RGB16_EXT),z===t.SHORT&&ue&&(ee=ue.RGB16_SNORM_EXT),z===t.UNSIGNED_INT_5_9_9_9_REV&&(ee=t.RGB9_E5),z===t.UNSIGNED_INT_10F_11F_11F_REV&&(ee=t.R11F_G11F_B10F)),y===t.RGBA){const te=oe?sc:qe.getTransfer(Q);z===t.FLOAT&&(ee=t.RGBA32F),z===t.HALF_FLOAT&&(ee=t.RGBA16F),z===t.UNSIGNED_BYTE&&(ee=te===nt?t.SRGB8_ALPHA8:t.RGBA8),z===t.UNSIGNED_SHORT&&ue&&(ee=ue.RGBA16_EXT),z===t.SHORT&&ue&&(ee=ue.RGBA16_SNORM_EXT),z===t.UNSIGNED_SHORT_4_4_4_4&&(ee=t.RGBA4),z===t.UNSIGNED_SHORT_5_5_5_1&&(ee=t.RGB5_A1)}return(ee===t.R16F||ee===t.R32F||ee===t.RG16F||ee===t.RG32F||ee===t.RGBA16F||ee===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function b(w,y){let z;return w?y===null||y===gi||y===ss?z=t.DEPTH24_STENCIL8:y===ci?z=t.DEPTH32F_STENCIL8:y===os&&(z=t.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===gi||y===ss?z=t.DEPTH_COMPONENT24:y===ci?z=t.DEPTH_COMPONENT32F:y===os&&(z=t.DEPTH_COMPONENT16),z}function E(w,y){return u(w)===!0||w.isFramebufferTexture&&w.minFilter!==Gt&&w.minFilter!==Jt?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function C(w){const y=w.target;y.removeEventListener("dispose",C),R(y),y.isVideoTexture&&f.delete(y),y.isHTMLTexture&&p.delete(y)}function m(w){const y=w.target;y.removeEventListener("dispose",m),I(y)}function R(w){const y=i.get(w);if(y.__webglInit===void 0)return;const z=w.source,j=g.get(z);if(j){const Q=j[y.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&P(w),Object.keys(j).length===0&&g.delete(z)}i.remove(w)}function P(w){const y=i.get(w);t.deleteTexture(y.__webglTexture);const z=w.source,j=g.get(z);delete j[y.__cacheKey],o.memory.textures--}function I(w){const y=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(y.__webglFramebuffer[j]))for(let Q=0;Q<y.__webglFramebuffer[j].length;Q++)t.deleteFramebuffer(y.__webglFramebuffer[j][Q]);else t.deleteFramebuffer(y.__webglFramebuffer[j]);y.__webglDepthbuffer&&t.deleteRenderbuffer(y.__webglDepthbuffer[j])}else{if(Array.isArray(y.__webglFramebuffer))for(let j=0;j<y.__webglFramebuffer.length;j++)t.deleteFramebuffer(y.__webglFramebuffer[j]);else t.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&t.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&t.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let j=0;j<y.__webglColorRenderbuffer.length;j++)y.__webglColorRenderbuffer[j]&&t.deleteRenderbuffer(y.__webglColorRenderbuffer[j]);y.__webglDepthRenderbuffer&&t.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const z=w.textures;for(let j=0,Q=z.length;j<Q;j++){const oe=i.get(z[j]);oe.__webglTexture&&(t.deleteTexture(oe.__webglTexture),o.memory.textures--),i.remove(z[j])}i.remove(w)}let L=0;function Y(){L=0}function J(){return L}function k(w){L=w}function K(){const w=L;return w>=r.maxTextures&&Ne("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),L+=1,w}function H(w){const y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function O(w,y){const z=i.get(w);if(w.isVideoTexture&&F(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&z.__version!==w.version){const j=w.image;if(j===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{Ue(z,w,y);return}}else w.isExternalTexture&&(z.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,z.__webglTexture,t.TEXTURE0+y)}function V(w,y){const z=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&z.__version!==w.version){Ue(z,w,y);return}else w.isExternalTexture&&(z.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,z.__webglTexture,t.TEXTURE0+y)}function D(w,y){const z=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&z.__version!==w.version){Ue(z,w,y);return}n.bindTexture(t.TEXTURE_3D,z.__webglTexture,t.TEXTURE0+y)}function X(w,y){const z=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&z.__version!==w.version){Oe(z,w,y);return}n.bindTexture(t.TEXTURE_CUBE_MAP,z.__webglTexture,t.TEXTURE0+y)}const Z={[tf]:t.REPEAT,[Ci]:t.CLAMP_TO_EDGE,[nf]:t.MIRRORED_REPEAT},le={[Gt]:t.NEAREST,[SS]:t.NEAREST_MIPMAP_NEAREST,[Bs]:t.NEAREST_MIPMAP_LINEAR,[Jt]:t.LINEAR,[hu]:t.LINEAR_MIPMAP_NEAREST,[Nr]:t.LINEAR_MIPMAP_LINEAR},Fe={[TS]:t.NEVER,[wS]:t.ALWAYS,[bS]:t.LESS,[kp]:t.LEQUAL,[AS]:t.EQUAL,[Bp]:t.GEQUAL,[CS]:t.GREATER,[RS]:t.NOTEQUAL};function Re(w,y){if(y.type===ci&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Jt||y.magFilter===hu||y.magFilter===Bs||y.magFilter===Nr||y.minFilter===Jt||y.minFilter===hu||y.minFilter===Bs||y.minFilter===Nr)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(w,t.TEXTURE_WRAP_S,Z[y.wrapS]),t.texParameteri(w,t.TEXTURE_WRAP_T,Z[y.wrapT]),(w===t.TEXTURE_3D||w===t.TEXTURE_2D_ARRAY)&&t.texParameteri(w,t.TEXTURE_WRAP_R,Z[y.wrapR]),t.texParameteri(w,t.TEXTURE_MAG_FILTER,le[y.magFilter]),t.texParameteri(w,t.TEXTURE_MIN_FILTER,le[y.minFilter]),y.compareFunction&&(t.texParameteri(w,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(w,t.TEXTURE_COMPARE_FUNC,Fe[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Gt||y.minFilter!==Bs&&y.minFilter!==Nr||y.type===ci&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");t.texParameterf(w,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function $(w,y){let z=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",C));const j=y.source;let Q=g.get(j);Q===void 0&&(Q={},g.set(j,Q));const oe=H(y);if(oe!==w.__cacheKey){Q[oe]===void 0&&(Q[oe]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Q[oe].usedTimes++;const ue=Q[w.__cacheKey];ue!==void 0&&(Q[w.__cacheKey].usedTimes--,ue.usedTimes===0&&P(y)),w.__cacheKey=oe,w.__webglTexture=Q[oe].texture}return z}function se(w,y,z){return Math.floor(Math.floor(w/z)/y)}function re(w,y,z,j){const oe=w.updateRanges;if(oe.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,y.width,y.height,z,j,y.data);else{oe.sort((Ae,me)=>Ae.start-me.start);let ue=0;for(let Ae=1;Ae<oe.length;Ae++){const me=oe[ue],pe=oe[Ae],Ie=me.start+me.count,Le=se(pe.start,y.width,4),Be=se(me.start,y.width,4);pe.start<=Ie+1&&Le===Be&&se(pe.start+pe.count-1,y.width,4)===Le?me.count=Math.max(me.count,pe.start+pe.count-me.start):(++ue,oe[ue]=pe)}oe.length=ue+1;const ee=n.getParameter(t.UNPACK_ROW_LENGTH),te=n.getParameter(t.UNPACK_SKIP_PIXELS),fe=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,y.width);for(let Ae=0,me=oe.length;Ae<me;Ae++){const pe=oe[Ae],Ie=Math.floor(pe.start/4),Le=Math.ceil(pe.count/4),Be=Ie%y.width,N=Math.floor(Ie/y.width),de=Le,ne=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,Be),n.pixelStorei(t.UNPACK_SKIP_ROWS,N),n.texSubImage2D(t.TEXTURE_2D,0,Be,N,de,ne,z,j,y.data)}w.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,ee),n.pixelStorei(t.UNPACK_SKIP_PIXELS,te),n.pixelStorei(t.UNPACK_SKIP_ROWS,fe)}}function Ue(w,y,z){let j=t.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(j=t.TEXTURE_2D_ARRAY),y.isData3DTexture&&(j=t.TEXTURE_3D);const Q=$(w,y),oe=y.source;n.bindTexture(j,w.__webglTexture,t.TEXTURE0+z);const ue=i.get(oe);if(oe.version!==ue.__version||Q===!0){if(n.activeTexture(t.TEXTURE0+z),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const ne=qe.getPrimaries(qe.workingColorSpace),he=y.colorSpace===er?null:qe.getPrimaries(y.colorSpace),_e=y.colorSpace===er||ne===he?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}n.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment);let te=x(y.image,!1,r.maxTextureSize);te=Vt(y,te);const fe=a.convert(y.format,y.colorSpace),Ae=a.convert(y.type);let me=S(y.internalFormat,fe,Ae,y.normalized,y.colorSpace,y.isVideoTexture);Re(j,y);let pe;const Ie=y.mipmaps,Le=y.isVideoTexture!==!0,Be=ue.__version===void 0||Q===!0,N=oe.dataReady,de=E(y,te);if(y.isDepthTexture)me=b(y.format===Fr,y.type),Be&&(Le?n.texStorage2D(t.TEXTURE_2D,1,me,te.width,te.height):n.texImage2D(t.TEXTURE_2D,0,me,te.width,te.height,0,fe,Ae,null));else if(y.isDataTexture)if(Ie.length>0){Le&&Be&&n.texStorage2D(t.TEXTURE_2D,de,me,Ie[0].width,Ie[0].height);for(let ne=0,he=Ie.length;ne<he;ne++)pe=Ie[ne],Le?N&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,pe.width,pe.height,fe,Ae,pe.data):n.texImage2D(t.TEXTURE_2D,ne,me,pe.width,pe.height,0,fe,Ae,pe.data);y.generateMipmaps=!1}else Le?(Be&&n.texStorage2D(t.TEXTURE_2D,de,me,te.width,te.height),N&&re(y,te,fe,Ae)):n.texImage2D(t.TEXTURE_2D,0,me,te.width,te.height,0,fe,Ae,te.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Le&&Be&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,me,Ie[0].width,Ie[0].height,te.depth);for(let ne=0,he=Ie.length;ne<he;ne++)if(pe=Ie[ne],y.format!==Xn)if(fe!==null)if(Le){if(N)if(y.layerUpdates.size>0){const _e=Qm(pe.width,pe.height,y.format,y.type);for(const ie of y.layerUpdates){const be=pe.data.subarray(ie*_e/pe.data.BYTES_PER_ELEMENT,(ie+1)*_e/pe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,ie,pe.width,pe.height,1,fe,be)}y.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,0,pe.width,pe.height,te.depth,fe,pe.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ne,me,pe.width,pe.height,te.depth,0,pe.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?N&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,0,pe.width,pe.height,te.depth,fe,Ae,pe.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ne,me,pe.width,pe.height,te.depth,0,fe,Ae,pe.data)}else{Le&&Be&&n.texStorage2D(t.TEXTURE_2D,de,me,Ie[0].width,Ie[0].height);for(let ne=0,he=Ie.length;ne<he;ne++)pe=Ie[ne],y.format!==Xn?fe!==null?Le?N&&n.compressedTexSubImage2D(t.TEXTURE_2D,ne,0,0,pe.width,pe.height,fe,pe.data):n.compressedTexImage2D(t.TEXTURE_2D,ne,me,pe.width,pe.height,0,pe.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?N&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,pe.width,pe.height,fe,Ae,pe.data):n.texImage2D(t.TEXTURE_2D,ne,me,pe.width,pe.height,0,fe,Ae,pe.data)}else if(y.isDataArrayTexture)if(Le){if(Be&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,me,te.width,te.height,te.depth),N)if(y.layerUpdates.size>0){const ne=Qm(te.width,te.height,y.format,y.type);for(const he of y.layerUpdates){const _e=te.data.subarray(he*ne/te.data.BYTES_PER_ELEMENT,(he+1)*ne/te.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,he,te.width,te.height,1,fe,Ae,_e)}y.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,fe,Ae,te.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,me,te.width,te.height,te.depth,0,fe,Ae,te.data);else if(y.isData3DTexture)Le?(Be&&n.texStorage3D(t.TEXTURE_3D,de,me,te.width,te.height,te.depth),N&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,fe,Ae,te.data)):n.texImage3D(t.TEXTURE_3D,0,me,te.width,te.height,te.depth,0,fe,Ae,te.data);else if(y.isFramebufferTexture){if(Be)if(Le)n.texStorage2D(t.TEXTURE_2D,de,me,te.width,te.height);else{let ne=te.width,he=te.height;for(let _e=0;_e<de;_e++)n.texImage2D(t.TEXTURE_2D,_e,me,ne,he,0,fe,Ae,null),ne>>=1,he>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in t){const ne=t.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),te.parentNode!==ne){ne.appendChild(te),p.add(y),ne.onpaint=he=>{const _e=he.changedElements;for(const ie of p)_e.includes(ie.image)&&(ie.needsUpdate=!0)},ne.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,te);else{const _e=t.RGBA,ie=t.RGBA,be=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,_e,ie,be,te)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Le&&Be){const ne=et(Ie[0]);n.texStorage2D(t.TEXTURE_2D,de,me,ne.width,ne.height)}for(let ne=0,he=Ie.length;ne<he;ne++)pe=Ie[ne],Le?N&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,fe,Ae,pe):n.texImage2D(t.TEXTURE_2D,ne,me,fe,Ae,pe);y.generateMipmaps=!1}else if(Le){if(Be){const ne=et(te);n.texStorage2D(t.TEXTURE_2D,de,me,ne.width,ne.height)}N&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,fe,Ae,te)}else n.texImage2D(t.TEXTURE_2D,0,me,fe,Ae,te);u(y)&&v(j),ue.__version=oe.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function Oe(w,y,z){if(y.image.length!==6)return;const j=$(w,y),Q=y.source;n.bindTexture(t.TEXTURE_CUBE_MAP,w.__webglTexture,t.TEXTURE0+z);const oe=i.get(Q);if(Q.version!==oe.__version||j===!0){n.activeTexture(t.TEXTURE0+z);const ue=qe.getPrimaries(qe.workingColorSpace),ee=y.colorSpace===er?null:qe.getPrimaries(y.colorSpace),te=y.colorSpace===er||ue===ee?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const fe=y.isCompressedTexture||y.image[0].isCompressedTexture,Ae=y.image[0]&&y.image[0].isDataTexture,me=[];for(let ie=0;ie<6;ie++)!fe&&!Ae?me[ie]=x(y.image[ie],!0,r.maxCubemapSize):me[ie]=Ae?y.image[ie].image:y.image[ie],me[ie]=Vt(y,me[ie]);const pe=me[0],Ie=a.convert(y.format,y.colorSpace),Le=a.convert(y.type),Be=S(y.internalFormat,Ie,Le,y.normalized,y.colorSpace),N=y.isVideoTexture!==!0,de=oe.__version===void 0||j===!0,ne=Q.dataReady;let he=E(y,pe);Re(t.TEXTURE_CUBE_MAP,y);let _e;if(fe){N&&de&&n.texStorage2D(t.TEXTURE_CUBE_MAP,he,Be,pe.width,pe.height);for(let ie=0;ie<6;ie++){_e=me[ie].mipmaps;for(let be=0;be<_e.length;be++){const Ee=_e[be];y.format!==Xn?Ie!==null?N?ne&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,be,0,0,Ee.width,Ee.height,Ie,Ee.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,be,Be,Ee.width,Ee.height,0,Ee.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,be,0,0,Ee.width,Ee.height,Ie,Le,Ee.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,be,Be,Ee.width,Ee.height,0,Ie,Le,Ee.data)}}}else{if(_e=y.mipmaps,N&&de){_e.length>0&&he++;const ie=et(me[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,he,Be,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(Ae){N?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,me[ie].width,me[ie].height,Ie,Le,me[ie].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Be,me[ie].width,me[ie].height,0,Ie,Le,me[ie].data);for(let be=0;be<_e.length;be++){const Mt=_e[be].image[ie].image;N?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,be+1,0,0,Mt.width,Mt.height,Ie,Le,Mt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,be+1,Be,Mt.width,Mt.height,0,Ie,Le,Mt.data)}}else{N?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ie,Le,me[ie]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Be,Ie,Le,me[ie]);for(let be=0;be<_e.length;be++){const Ee=_e[be];N?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,be+1,0,0,Ie,Le,Ee.image[ie]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,be+1,Be,Ie,Le,Ee.image[ie])}}}u(y)&&v(t.TEXTURE_CUBE_MAP),oe.__version=Q.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function De(w,y,z,j,Q,oe){const ue=a.convert(z.format,z.colorSpace),ee=a.convert(z.type),te=S(z.internalFormat,ue,ee,z.normalized,z.colorSpace),fe=i.get(y),Ae=i.get(z);if(Ae.__renderTarget=y,!fe.__hasExternalTextures){const me=Math.max(1,y.width>>oe),pe=Math.max(1,y.height>>oe);Q===t.TEXTURE_3D||Q===t.TEXTURE_2D_ARRAY?n.texImage3D(Q,oe,te,me,pe,y.depth,0,ue,ee,null):n.texImage2D(Q,oe,te,me,pe,0,ue,ee,null)}n.bindFramebuffer(t.FRAMEBUFFER,w),St(y)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,j,Q,Ae.__webglTexture,0,ut(y)):(Q===t.TEXTURE_2D||Q>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,j,Q,Ae.__webglTexture,oe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function pt(w,y,z){if(t.bindRenderbuffer(t.RENDERBUFFER,w),y.depthBuffer){const j=y.depthTexture,Q=j&&j.isDepthTexture?j.type:null,oe=b(y.stencilBuffer,Q),ue=y.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;St(y)?s.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ut(y),oe,y.width,y.height):z?t.renderbufferStorageMultisample(t.RENDERBUFFER,ut(y),oe,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,oe,y.width,y.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ue,t.RENDERBUFFER,w)}else{const j=y.textures;for(let Q=0;Q<j.length;Q++){const oe=j[Q],ue=a.convert(oe.format,oe.colorSpace),ee=a.convert(oe.type),te=S(oe.internalFormat,ue,ee,oe.normalized,oe.colorSpace);St(y)?s.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ut(y),te,y.width,y.height):z?t.renderbufferStorageMultisample(t.RENDERBUFFER,ut(y),te,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,te,y.width,y.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ke(w,y,z){const j=y.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=i.get(y.depthTexture);if(Q.__renderTarget=y,(!Q.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),j){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,y.depthTexture.addEventListener("dispose",C)),Q.__webglTexture===void 0){Q.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,Q.__webglTexture),Re(t.TEXTURE_CUBE_MAP,y.depthTexture);const fe=a.convert(y.depthTexture.format),Ae=a.convert(y.depthTexture.type);let me;y.depthTexture.format===Ui?me=t.DEPTH_COMPONENT24:y.depthTexture.format===Fr&&(me=t.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,me,y.width,y.height,0,fe,Ae,null)}}else O(y.depthTexture,0);const oe=Q.__webglTexture,ue=ut(y),ee=j?t.TEXTURE_CUBE_MAP_POSITIVE_X+z:t.TEXTURE_2D,te=y.depthTexture.format===Fr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(y.depthTexture.format===Ui)St(y)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,te,ee,oe,0,ue):t.framebufferTexture2D(t.FRAMEBUFFER,te,ee,oe,0);else if(y.depthTexture.format===Fr)St(y)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,te,ee,oe,0,ue):t.framebufferTexture2D(t.FRAMEBUFFER,te,ee,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(w){const y=i.get(w),z=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){const j=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),j){const Q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),y.__depthDisposeCallback=Q}y.__boundDepthTexture=j}if(w.depthTexture&&!y.__autoAllocateDepthBuffer)if(z)for(let j=0;j<6;j++)ke(y.__webglFramebuffer[j],w,j);else{const j=w.texture.mipmaps;j&&j.length>0?ke(y.__webglFramebuffer[0],w,0):ke(y.__webglFramebuffer,w,0)}else if(z){y.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[j]),y.__webglDepthbuffer[j]===void 0)y.__webglDepthbuffer[j]=t.createRenderbuffer(),pt(y.__webglDepthbuffer[j],w,!1);else{const Q=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=y.__webglDepthbuffer[j];t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,Q,t.RENDERBUFFER,oe)}}else{const j=w.texture.mipmaps;if(j&&j.length>0?n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=t.createRenderbuffer(),pt(y.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=y.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,Q,t.RENDERBUFFER,oe)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ke(w,y,z){const j=i.get(w);y!==void 0&&De(j.__webglFramebuffer,w,w.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),z!==void 0&&tt(w)}function Xe(w){const y=w.texture,z=i.get(w),j=i.get(y);w.addEventListener("dispose",m);const Q=w.textures,oe=w.isWebGLCubeRenderTarget===!0,ue=Q.length>1;if(ue||(j.__webglTexture===void 0&&(j.__webglTexture=t.createTexture()),j.__version=y.version,o.memory.textures++),oe){z.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[ee]=[];for(let te=0;te<y.mipmaps.length;te++)z.__webglFramebuffer[ee][te]=t.createFramebuffer()}else z.__webglFramebuffer[ee]=t.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let ee=0;ee<y.mipmaps.length;ee++)z.__webglFramebuffer[ee]=t.createFramebuffer()}else z.__webglFramebuffer=t.createFramebuffer();if(ue)for(let ee=0,te=Q.length;ee<te;ee++){const fe=i.get(Q[ee]);fe.__webglTexture===void 0&&(fe.__webglTexture=t.createTexture(),o.memory.textures++)}if(w.samples>0&&St(w)===!1){z.__webglMultisampledFramebuffer=t.createFramebuffer(),z.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ee=0;ee<Q.length;ee++){const te=Q[ee];z.__webglColorRenderbuffer[ee]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,z.__webglColorRenderbuffer[ee]);const fe=a.convert(te.format,te.colorSpace),Ae=a.convert(te.type),me=S(te.internalFormat,fe,Ae,te.normalized,te.colorSpace,w.isXRRenderTarget===!0),pe=ut(w);t.renderbufferStorageMultisample(t.RENDERBUFFER,pe,me,w.width,w.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ee,t.RENDERBUFFER,z.__webglColorRenderbuffer[ee])}t.bindRenderbuffer(t.RENDERBUFFER,null),w.depthBuffer&&(z.__webglDepthRenderbuffer=t.createRenderbuffer(),pt(z.__webglDepthRenderbuffer,w,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(oe){n.bindTexture(t.TEXTURE_CUBE_MAP,j.__webglTexture),Re(t.TEXTURE_CUBE_MAP,y);for(let ee=0;ee<6;ee++)if(y.mipmaps&&y.mipmaps.length>0)for(let te=0;te<y.mipmaps.length;te++)De(z.__webglFramebuffer[ee][te],w,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,te);else De(z.__webglFramebuffer[ee],w,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);u(y)&&v(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ue){for(let ee=0,te=Q.length;ee<te;ee++){const fe=Q[ee],Ae=i.get(fe);let me=t.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(me=w.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(me,Ae.__webglTexture),Re(me,fe),De(z.__webglFramebuffer,w,fe,t.COLOR_ATTACHMENT0+ee,me,0),u(fe)&&v(me)}n.unbindTexture()}else{let ee=t.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ee=w.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ee,j.__webglTexture),Re(ee,y),y.mipmaps&&y.mipmaps.length>0)for(let te=0;te<y.mipmaps.length;te++)De(z.__webglFramebuffer[te],w,y,t.COLOR_ATTACHMENT0,ee,te);else De(z.__webglFramebuffer,w,y,t.COLOR_ATTACHMENT0,ee,0);u(y)&&v(ee),n.unbindTexture()}w.depthBuffer&&tt(w)}function mt(w){const y=w.textures;for(let z=0,j=y.length;z<j;z++){const Q=y[z];if(u(Q)){const oe=M(w),ue=i.get(Q).__webglTexture;n.bindTexture(oe,ue),v(oe),n.unbindTexture()}}}const bt=[],wt=[];function Pt(w){if(w.samples>0){if(St(w)===!1){const y=w.textures,z=w.width,j=w.height;let Q=t.COLOR_BUFFER_BIT;const oe=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ue=i.get(w),ee=y.length>1;if(ee)for(let fe=0;fe<y.length;fe++)n.bindFramebuffer(t.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+fe,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ue.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+fe,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const te=w.texture.mipmaps;te&&te.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let fe=0;fe<y.length;fe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=t.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=t.STENCIL_BUFFER_BIT)),ee){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);const Ae=i.get(y[fe]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ae,0)}t.blitFramebuffer(0,0,z,j,0,0,z,j,Q,t.NEAREST),l===!0&&(bt.length=0,wt.length=0,bt.push(t.COLOR_ATTACHMENT0+fe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(bt.push(oe),wt.push(oe),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,wt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,bt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ee)for(let fe=0;fe<y.length;fe++){n.bindFramebuffer(t.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+fe,t.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);const Ae=i.get(y[fe]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ue.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+fe,t.TEXTURE_2D,Ae,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const y=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[y])}}}function ut(w){return Math.min(r.maxSamples,w.samples)}function St(w){const y=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function F(w){const y=o.render.frame;f.get(w)!==y&&(f.set(w,y),w.update())}function Vt(w,y){const z=w.colorSpace,j=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||z!==oc&&z!==er&&(qe.getTransfer(z)===nt?(j!==Xn||Q!==yn)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",z)),y}function et(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=Y,this.getTextureUnits=J,this.setTextureUnits=k,this.setTexture2D=O,this.setTexture2DArray=V,this.setTexture3D=D,this.setTextureCube=X,this.rebindTextures=Ke,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=De,this.useMultisampledRTT=St,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function sC(t,e){function n(i,r=er){let a;const o=qe.getTransfer(r);if(i===yn)return t.UNSIGNED_BYTE;if(i===Np)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Fp)return t.UNSIGNED_SHORT_5_5_5_1;if(i===uv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===dv)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===lv)return t.BYTE;if(i===cv)return t.SHORT;if(i===os)return t.UNSIGNED_SHORT;if(i===Lp)return t.INT;if(i===gi)return t.UNSIGNED_INT;if(i===ci)return t.FLOAT;if(i===Fi)return t.HALF_FLOAT;if(i===fv)return t.ALPHA;if(i===pv)return t.RGB;if(i===Xn)return t.RGBA;if(i===Ui)return t.DEPTH_COMPONENT;if(i===Fr)return t.DEPTH_STENCIL;if(i===hv)return t.RED;if(i===Up)return t.RED_INTEGER;if(i===Wr)return t.RG;if(i===Op)return t.RG_INTEGER;if(i===zp)return t.RGBA_INTEGER;if(i===wl||i===Pl||i===Il||i===Dl)if(o===nt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===wl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Pl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Il)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Dl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===wl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Pl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Il)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Dl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===rf||i===af||i===of||i===sf)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===rf)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===af)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===of)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sf)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===lf||i===cf||i===uf||i===df||i===ff||i===rc||i===pf)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===lf||i===cf)return o===nt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===uf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===df)return a.COMPRESSED_R11_EAC;if(i===ff)return a.COMPRESSED_SIGNED_R11_EAC;if(i===rc)return a.COMPRESSED_RG11_EAC;if(i===pf)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===hf||i===mf||i===gf||i===xf||i===vf||i===_f||i===yf||i===Sf||i===Mf||i===Ef||i===Tf||i===bf||i===Af||i===Cf)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===hf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===mf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===gf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===xf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===vf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_f)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===yf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Sf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Mf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ef)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Tf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===bf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Af)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Cf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Rf||i===wf||i===Pf)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===Rf)return o===nt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wf)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Pf)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===If||i===Df||i===ac||i===Lf)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===If)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Df)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ac)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Lf)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ss?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const lC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class uC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Tv(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new xi({vertexShader:lC,fragmentShader:cC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Lt(new xs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dC extends qr{constructor(e,n){super();const i=this;let r=null,a=1,o=null,s="local-floor",l=1,c=null,f=null,p=null,d=null,g=null,_=null;const T=typeof XRWebGLBinding<"u",x=new uC,u={},v=n.getContextAttributes();let M=null,S=null;const b=[],E=[],C=new $e;let m=null;const R=new Dn;R.viewport=new xt;const P=new Dn;P.viewport=new xt;const I=[R,P],L=new _M;let Y=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let se=b[$];return se===void 0&&(se=new Mu,b[$]=se),se.getTargetRaySpace()},this.getControllerGrip=function($){let se=b[$];return se===void 0&&(se=new Mu,b[$]=se),se.getGripSpace()},this.getHand=function($){let se=b[$];return se===void 0&&(se=new Mu,b[$]=se),se.getHandSpace()};function k($){const se=E.indexOf($.inputSource);if(se===-1)return;const re=b[se];re!==void 0&&(re.update($.inputSource,$.frame,c||o),re.dispatchEvent({type:$.type,data:$.inputSource}))}function K(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",H);for(let $=0;$<b.length;$++){const se=E[$];se!==null&&(E[$]=null,b[$].disconnect(se))}Y=null,J=null,x.reset();for(const $ in u)delete u[$];e.setRenderTarget(M),g=null,d=null,p=null,r=null,S=null,Re.stop(),i.isPresenting=!1,e.setPixelRatio(m),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){a=$,i.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){s=$,i.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return p===null&&T&&(p=new XRWebGLBinding(r,n)),p},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",K),r.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await n.makeXRCompatible(),m=e.getPixelRatio(),e.getSize(C),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ue=null,Oe=null;v.depth&&(Oe=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,re=v.stencil?Fr:Ui,Ue=v.stencil?ss:gi);const De={colorFormat:n.RGBA8,depthFormat:Oe,scaleFactor:a};p=this.getBinding(),d=p.createProjectionLayer(De),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new hi(d.textureWidth,d.textureHeight,{format:Xn,type:yn,depthTexture:new qa(d.textureWidth,d.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const re={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};g=new XRWebGLLayer(r,n,re),r.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),S=new hi(g.framebufferWidth,g.framebufferHeight,{format:Xn,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(s),Re.setContext(r),Re.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function H($){for(let se=0;se<$.removed.length;se++){const re=$.removed[se],Ue=E.indexOf(re);Ue>=0&&(E[Ue]=null,b[Ue].disconnect(re))}for(let se=0;se<$.added.length;se++){const re=$.added[se];let Ue=E.indexOf(re);if(Ue===-1){for(let De=0;De<b.length;De++)if(De>=E.length){E.push(re),Ue=De;break}else if(E[De]===null){E[De]=re,Ue=De;break}if(Ue===-1)break}const Oe=b[Ue];Oe&&Oe.connect(re)}}const O=new B,V=new B;function D($,se,re){O.setFromMatrixPosition(se.matrixWorld),V.setFromMatrixPosition(re.matrixWorld);const Ue=O.distanceTo(V),Oe=se.projectionMatrix.elements,De=re.projectionMatrix.elements,pt=Oe[14]/(Oe[10]-1),ke=Oe[14]/(Oe[10]+1),tt=(Oe[9]+1)/Oe[5],Ke=(Oe[9]-1)/Oe[5],Xe=(Oe[8]-1)/Oe[0],mt=(De[8]+1)/De[0],bt=pt*Xe,wt=pt*mt,Pt=Ue/(-Xe+mt),ut=Pt*-Xe;if(se.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ut),$.translateZ(Pt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Oe[10]===-1)$.projectionMatrix.copy(se.projectionMatrix),$.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const St=pt+Pt,F=ke+Pt,Vt=bt-ut,et=wt+(Ue-ut),w=tt*ke/F*St,y=Ke*ke/F*St;$.projectionMatrix.makePerspective(Vt,et,w,y,St,F),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function X($,se){se===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(se.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let se=$.near,re=$.far;x.texture!==null&&(x.depthNear>0&&(se=x.depthNear),x.depthFar>0&&(re=x.depthFar)),L.near=P.near=R.near=se,L.far=P.far=R.far=re,(Y!==L.near||J!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),Y=L.near,J=L.far),L.layers.mask=$.layers.mask|6,R.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;const Ue=$.parent,Oe=L.cameras;X(L,Ue);for(let De=0;De<Oe.length;De++)X(Oe[De],Ue);Oe.length===2?D(L,R,P):L.projectionMatrix.copy(R.projectionMatrix),Z($,L,Ue)};function Z($,se,re){re===null?$.matrix.copy(se.matrixWorld):($.matrix.copy(re.matrixWorld),$.matrix.invert(),$.matrix.multiply(se.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(se.projectionMatrix),$.projectionMatrixInverse.copy(se.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ff*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&g===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=$)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(L)},this.getCameraTexture=function($){return u[$]};let le=null;function Fe($,se){if(f=se.getViewerPose(c||o),_=se,f!==null){const re=f.views;g!==null&&(e.setRenderTargetFramebuffer(S,g.framebuffer),e.setRenderTarget(S));let Ue=!1;re.length!==L.cameras.length&&(L.cameras.length=0,Ue=!0);for(let ke=0;ke<re.length;ke++){const tt=re[ke];let Ke=null;if(g!==null)Ke=g.getViewport(tt);else{const mt=p.getViewSubImage(d,tt);Ke=mt.viewport,ke===0&&(e.setRenderTargetTextures(S,mt.colorTexture,mt.depthStencilTexture),e.setRenderTarget(S))}let Xe=I[ke];Xe===void 0&&(Xe=new Dn,Xe.layers.enable(ke),Xe.viewport=new xt,I[ke]=Xe),Xe.matrix.fromArray(tt.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(tt.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),ke===0&&(L.matrix.copy(Xe.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ue===!0&&L.cameras.push(Xe)}const Oe=r.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&T){p=i.getBinding();const ke=p.getDepthInformation(re[0]);ke&&ke.isValid&&ke.texture&&x.init(ke,r.renderState)}if(Oe&&Oe.includes("camera-access")&&T){e.state.unbindTexture(),p=i.getBinding();for(let ke=0;ke<re.length;ke++){const tt=re[ke].camera;if(tt){let Ke=u[tt];Ke||(Ke=new Tv,u[tt]=Ke);const Xe=p.getCameraImage(tt);Ke.sourceTexture=Xe}}}}for(let re=0;re<b.length;re++){const Ue=E[re],Oe=b[re];Ue!==null&&Oe!==void 0&&Oe.update(Ue,se,c||o)}le&&le($,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),_=null}const Re=new Rv;Re.setAnimationLoop(Fe),this.setAnimationLoop=function($){le=$},this.dispose=function(){}}}const fC=new _t,Fv=new ze;Fv.set(-1,0,0,0,1,0,0,0,1);function pC(t,e){function n(x,u){x.matrixAutoUpdate===!0&&x.updateMatrix(),u.value.copy(x.matrix)}function i(x,u){u.color.getRGB(x.fogColor.value,bv(t)),u.isFog?(x.fogNear.value=u.near,x.fogFar.value=u.far):u.isFogExp2&&(x.fogDensity.value=u.density)}function r(x,u,v,M,S){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?a(x,u):u.isMeshLambertMaterial?(a(x,u),u.envMap&&(x.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(a(x,u),p(x,u)):u.isMeshPhongMaterial?(a(x,u),f(x,u),u.envMap&&(x.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(a(x,u),d(x,u),u.isMeshPhysicalMaterial&&g(x,u,S)):u.isMeshMatcapMaterial?(a(x,u),_(x,u)):u.isMeshDepthMaterial?a(x,u):u.isMeshDistanceMaterial?(a(x,u),T(x,u)):u.isMeshNormalMaterial?a(x,u):u.isLineBasicMaterial?(o(x,u),u.isLineDashedMaterial&&s(x,u)):u.isPointsMaterial?l(x,u,v,M):u.isSpriteMaterial?c(x,u):u.isShadowMaterial?(x.color.value.copy(u.color),x.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function a(x,u){x.opacity.value=u.opacity,u.color&&x.diffuse.value.copy(u.color),u.emissive&&x.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(x.map.value=u.map,n(u.map,x.mapTransform)),u.alphaMap&&(x.alphaMap.value=u.alphaMap,n(u.alphaMap,x.alphaMapTransform)),u.bumpMap&&(x.bumpMap.value=u.bumpMap,n(u.bumpMap,x.bumpMapTransform),x.bumpScale.value=u.bumpScale,u.side===mn&&(x.bumpScale.value*=-1)),u.normalMap&&(x.normalMap.value=u.normalMap,n(u.normalMap,x.normalMapTransform),x.normalScale.value.copy(u.normalScale),u.side===mn&&x.normalScale.value.negate()),u.displacementMap&&(x.displacementMap.value=u.displacementMap,n(u.displacementMap,x.displacementMapTransform),x.displacementScale.value=u.displacementScale,x.displacementBias.value=u.displacementBias),u.emissiveMap&&(x.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,x.emissiveMapTransform)),u.specularMap&&(x.specularMap.value=u.specularMap,n(u.specularMap,x.specularMapTransform)),u.alphaTest>0&&(x.alphaTest.value=u.alphaTest);const v=e.get(u),M=v.envMap,S=v.envMapRotation;M&&(x.envMap.value=M,x.envMapRotation.value.setFromMatrix4(fC.makeRotationFromEuler(S)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(Fv),x.reflectivity.value=u.reflectivity,x.ior.value=u.ior,x.refractionRatio.value=u.refractionRatio),u.lightMap&&(x.lightMap.value=u.lightMap,x.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,x.lightMapTransform)),u.aoMap&&(x.aoMap.value=u.aoMap,x.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,x.aoMapTransform))}function o(x,u){x.diffuse.value.copy(u.color),x.opacity.value=u.opacity,u.map&&(x.map.value=u.map,n(u.map,x.mapTransform))}function s(x,u){x.dashSize.value=u.dashSize,x.totalSize.value=u.dashSize+u.gapSize,x.scale.value=u.scale}function l(x,u,v,M){x.diffuse.value.copy(u.color),x.opacity.value=u.opacity,x.size.value=u.size*v,x.scale.value=M*.5,u.map&&(x.map.value=u.map,n(u.map,x.uvTransform)),u.alphaMap&&(x.alphaMap.value=u.alphaMap,n(u.alphaMap,x.alphaMapTransform)),u.alphaTest>0&&(x.alphaTest.value=u.alphaTest)}function c(x,u){x.diffuse.value.copy(u.color),x.opacity.value=u.opacity,x.rotation.value=u.rotation,u.map&&(x.map.value=u.map,n(u.map,x.mapTransform)),u.alphaMap&&(x.alphaMap.value=u.alphaMap,n(u.alphaMap,x.alphaMapTransform)),u.alphaTest>0&&(x.alphaTest.value=u.alphaTest)}function f(x,u){x.specular.value.copy(u.specular),x.shininess.value=Math.max(u.shininess,1e-4)}function p(x,u){u.gradientMap&&(x.gradientMap.value=u.gradientMap)}function d(x,u){x.metalness.value=u.metalness,u.metalnessMap&&(x.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,x.metalnessMapTransform)),x.roughness.value=u.roughness,u.roughnessMap&&(x.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,x.roughnessMapTransform)),u.envMap&&(x.envMapIntensity.value=u.envMapIntensity)}function g(x,u,v){x.ior.value=u.ior,u.sheen>0&&(x.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),x.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(x.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,x.sheenColorMapTransform)),u.sheenRoughnessMap&&(x.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,x.sheenRoughnessMapTransform))),u.clearcoat>0&&(x.clearcoat.value=u.clearcoat,x.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(x.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,x.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(x.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===mn&&x.clearcoatNormalScale.value.negate())),u.dispersion>0&&(x.dispersion.value=u.dispersion),u.iridescence>0&&(x.iridescence.value=u.iridescence,x.iridescenceIOR.value=u.iridescenceIOR,x.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(x.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,x.iridescenceMapTransform)),u.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),u.transmission>0&&(x.transmission.value=u.transmission,x.transmissionSamplerMap.value=v.texture,x.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(x.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,x.transmissionMapTransform)),x.thickness.value=u.thickness,u.thicknessMap&&(x.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=u.attenuationDistance,x.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(x.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(x.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=u.specularIntensity,x.specularColor.value.copy(u.specularColor),u.specularColorMap&&(x.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,x.specularColorMapTransform)),u.specularIntensityMap&&(x.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,x.specularIntensityMapTransform))}function _(x,u){u.matcap&&(x.matcap.value=u.matcap)}function T(x,u){const v=e.get(u).light;x.referencePosition.value.setFromMatrixPosition(v.matrixWorld),x.nearDistance.value=v.shadow.camera.near,x.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function hC(t,e,n,i){let r={},a={},o=[];const s=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,b){const E=b.program;i.uniformBlockBinding(S,E)}function c(S,b){let E=r[S.id];E===void 0&&(x(S),E=f(S),r[S.id]=E,S.addEventListener("dispose",v));const C=b.program;i.updateUBOMapping(S,C);const m=e.render.frame;a[S.id]!==m&&(d(S),a[S.id]=m)}function f(S){const b=p();S.__bindingPointIndex=b;const E=t.createBuffer(),C=S.__size,m=S.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,C,m),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,b,E),E}function p(){for(let S=0;S<s;S++)if(o.indexOf(S)===-1)return o.push(S),S;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const b=r[S.id],E=S.uniforms,C=S.__cache;t.bindBuffer(t.UNIFORM_BUFFER,b);for(let m=0,R=E.length;m<R;m++){const P=E[m];if(Array.isArray(P))for(let I=0,L=P.length;I<L;I++)g(P[I],m,I,C);else g(P,m,0,C)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function g(S,b,E,C){if(T(S,b,E,C)===!0){const m=S.__offset,R=S.value;if(Array.isArray(R)){let P=0;for(let I=0;I<R.length;I++){const L=R[I],Y=u(L);_(L,S.__data,P),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(P+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(R,S.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,m,S.__data)}}function _(S,b,E){typeof S=="number"||typeof S=="boolean"?b[0]=S:S.isMatrix3?(b[0]=S.elements[0],b[1]=S.elements[1],b[2]=S.elements[2],b[3]=0,b[4]=S.elements[3],b[5]=S.elements[4],b[6]=S.elements[5],b[7]=0,b[8]=S.elements[6],b[9]=S.elements[7],b[10]=S.elements[8],b[11]=0):ArrayBuffer.isView(S)?b.set(new S.constructor(S.buffer,S.byteOffset,b.length)):S.toArray(b,E)}function T(S,b,E,C){const m=S.value,R=b+"_"+E;if(C[R]===void 0)return typeof m=="number"||typeof m=="boolean"?C[R]=m:ArrayBuffer.isView(m)?C[R]=m.slice():C[R]=m.clone(),!0;{const P=C[R];if(typeof m=="number"||typeof m=="boolean"){if(P!==m)return C[R]=m,!0}else{if(ArrayBuffer.isView(m))return!0;if(P.equals(m)===!1)return P.copy(m),!0}}return!1}function x(S){const b=S.uniforms;let E=0;const C=16;for(let R=0,P=b.length;R<P;R++){const I=Array.isArray(b[R])?b[R]:[b[R]];for(let L=0,Y=I.length;L<Y;L++){const J=I[L],k=Array.isArray(J.value)?J.value:[J.value];for(let K=0,H=k.length;K<H;K++){const O=k[K],V=u(O),D=E%C,X=D%V.boundary,Z=D+X;E+=X,Z!==0&&C-Z<V.storage&&(E+=C-Z),J.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=E,E+=V.storage}}}const m=E%C;return m>0&&(E+=C-m),S.__size=E,S.__cache={},this}function u(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(b.boundary=16,b.storage=S.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",S),b}function v(S){const b=S.target;b.removeEventListener("dispose",v);const E=o.indexOf(b.__bindingPointIndex);o.splice(E,1),t.deleteBuffer(r[b.id]),delete r[b.id],delete a[b.id]}function M(){for(const S in r)t.deleteBuffer(r[S]);o=[],r={},a={}}return{bind:l,update:c,dispose:M}}const mC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ni=null;function gC(){return ni===null&&(ni=new eM(mC,16,16,Wr,Fi),ni.name="DFG_LUT",ni.minFilter=Jt,ni.magFilter=Jt,ni.wrapS=Ci,ni.wrapT=Ci,ni.generateMipmaps=!1,ni.needsUpdate=!0),ni}class xC{constructor(e={}){const{canvas:n=IS(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:g=yn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=o;const T=g,x=new Set([zp,Op,Up]),u=new Set([yn,gi,os,ss,Np,Fp]),v=new Uint32Array(4),M=new Int32Array(4),S=new B;let b=null,E=null;const C=[],m=[];let R=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let I=!1,L=null,Y=null,J=null,k=null;this._outputColorSpace=wn;let K=0,H=0,O=null,V=-1,D=null;const X=new xt,Z=new xt;let le=null;const Fe=new We(0);let Re=0,$=n.width,se=n.height,re=1,Ue=null,Oe=null;const De=new xt(0,0,$,se),pt=new xt(0,0,$,se);let ke=!1;const tt=new Gp;let Ke=!1,Xe=!1;const mt=new _t,bt=new B,wt=new xt,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ut=!1;function St(){return O===null?re:1}let F=i;function Vt(A,U){return n.getContext(A,U)}try{const A={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Dp}`),n.addEventListener("webglcontextlost",Mt,!1),n.addEventListener("webglcontextrestored",st,!1),n.addEventListener("webglcontextcreationerror",Zn,!1),F===null){const U="webgl2";if(F=Vt(U,A),F===null)throw Vt(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw Qe("WebGLRenderer: "+A.message),A}let et,w,y,z,j,Q,oe,ue,ee,te,fe,Ae,me,pe,Ie,Le,Be,N,de,ne,he,_e,ie;function be(){et=new gb(F),et.init(),he=new sC(F,et),w=new lb(F,et,e,he),y=new aC(F,et),w.reversedDepthBuffer&&d&&y.buffers.depth.setReversed(!0),Y=F.createFramebuffer(),J=F.createFramebuffer(),k=F.createFramebuffer(),z=new _b(F),j=new jA,Q=new oC(F,et,y,j,w,he,z),oe=new mb(P),ue=new EM(F),_e=new ob(F,ue),ee=new xb(F,ue,z,_e),te=new Sb(F,ee,ue,_e,z),N=new yb(F,w,Q),Ie=new cb(j),fe=new WA(P,oe,et,w,_e,Ie),Ae=new pC(P,j),me=new qA,pe=new JA(et),Be=new ab(P,oe,y,te,_,l),Le=new rC(P,te,w),ie=new hC(F,z,w,y),de=new sb(F,et,z),ne=new vb(F,et,z),z.programs=fe.programs,P.capabilities=w,P.extensions=et,P.properties=j,P.renderLists=me,P.shadowMap=Le,P.state=y,P.info=z}be(),T!==yn&&(R=new Eb(T,n.width,n.height,s,r,a));const Ee=new dC(P,F);this.xr=Ee,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=et.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=et.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(A){A!==void 0&&(re=A,this.setSize($,se,!1))},this.getSize=function(A){return A.set($,se)},this.setSize=function(A,U,q=!0){if(Ee.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}$=A,se=U,n.width=Math.floor(A*re),n.height=Math.floor(U*re),q===!0&&(n.style.width=A+"px",n.style.height=U+"px"),R!==null&&R.setSize(n.width,n.height),this.setViewport(0,0,A,U)},this.getDrawingBufferSize=function(A){return A.set($*re,se*re).floor()},this.setDrawingBufferSize=function(A,U,q){$=A,se=U,re=q,n.width=Math.floor(A*q),n.height=Math.floor(U*q),this.setViewport(0,0,A,U)},this.setEffects=function(A){if(T===yn){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let U=0;U<A.length;U++)if(A[U].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(X)},this.getViewport=function(A){return A.copy(De)},this.setViewport=function(A,U,q,G){A.isVector4?De.set(A.x,A.y,A.z,A.w):De.set(A,U,q,G),y.viewport(X.copy(De).multiplyScalar(re).round())},this.getScissor=function(A){return A.copy(pt)},this.setScissor=function(A,U,q,G){A.isVector4?pt.set(A.x,A.y,A.z,A.w):pt.set(A,U,q,G),y.scissor(Z.copy(pt).multiplyScalar(re).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(A){y.setScissorTest(ke=A)},this.setOpaqueSort=function(A){Ue=A},this.setTransparentSort=function(A){Oe=A},this.getClearColor=function(A){return A.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor(...arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha(...arguments)},this.clear=function(A=!0,U=!0,q=!0){let G=0;if(A){let W=!1;if(O!==null){const ve=O.texture.format;W=x.has(ve)}if(W){const ve=O.texture.type,Se=u.has(ve),xe=Be.getClearColor(),Te=Be.getClearAlpha(),Ce=xe.r,Ve=xe.g,Ge=xe.b;Se?(v[0]=Ce,v[1]=Ve,v[2]=Ge,v[3]=Te,F.clearBufferuiv(F.COLOR,0,v)):(M[0]=Ce,M[1]=Ve,M[2]=Ge,M[3]=Te,F.clearBufferiv(F.COLOR,0,M))}else G|=F.COLOR_BUFFER_BIT}U&&(G|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),L=A},this.dispose=function(){n.removeEventListener("webglcontextlost",Mt,!1),n.removeEventListener("webglcontextrestored",st,!1),n.removeEventListener("webglcontextcreationerror",Zn,!1),Be.dispose(),me.dispose(),pe.dispose(),j.dispose(),oe.dispose(),te.dispose(),_e.dispose(),ie.dispose(),fe.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",Jp),Ee.removeEventListener("sessionend",eh),yr.stop()};function Mt(A){A.preventDefault(),Am("WebGLRenderer: Context Lost."),I=!0}function st(){Am("WebGLRenderer: Context Restored."),I=!1;const A=z.autoReset,U=Le.enabled,q=Le.autoUpdate,G=Le.needsUpdate,W=Le.type;be(),z.autoReset=A,Le.enabled=U,Le.autoUpdate=q,Le.needsUpdate=G,Le.type=W}function Zn(A){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Qn(A){const U=A.target;U.removeEventListener("dispose",Qn),Hv(U)}function Hv(A){Gv(A),j.remove(A)}function Gv(A){const U=j.get(A).programs;U!==void 0&&(U.forEach(function(q){fe.releaseProgram(q)}),A.isShaderMaterial&&fe.releaseShaderCache(A))}this.renderBufferDirect=function(A,U,q,G,W,ve){U===null&&(U=Pt);const Se=W.isMesh&&W.matrixWorld.determinantAffine()<0,xe=Xv(A,U,q,G,W);y.setMaterial(G,Se);let Te=q.index,Ce=1;if(G.wireframe===!0){if(Te=ee.getWireframeAttribute(q),Te===void 0)return;Ce=2}const Ve=q.drawRange,Ge=q.attributes.position;let we=Ve.start*Ce,rt=(Ve.start+Ve.count)*Ce;ve!==null&&(we=Math.max(we,ve.start*Ce),rt=Math.min(rt,(ve.start+ve.count)*Ce)),Te!==null?(we=Math.max(we,0),rt=Math.min(rt,Te.count)):Ge!=null&&(we=Math.max(we,0),rt=Math.min(rt,Ge.count));const At=rt-we;if(At<0||At===1/0)return;_e.setup(W,G,xe,q,Te);let Et,at=de;if(Te!==null&&(Et=ue.get(Te),at=ne,at.setIndex(Et)),W.isMesh)G.wireframe===!0?(y.setLineWidth(G.wireframeLinewidth*St()),at.setMode(F.LINES)):at.setMode(F.TRIANGLES);else if(W.isLine){let qt=G.linewidth;qt===void 0&&(qt=1),y.setLineWidth(qt*St()),W.isLineSegments?at.setMode(F.LINES):W.isLineLoop?at.setMode(F.LINE_LOOP):at.setMode(F.LINE_STRIP)}else W.isPoints?at.setMode(F.POINTS):W.isSprite&&at.setMode(F.TRIANGLES);if(W.isBatchedMesh)if(et.get("WEBGL_multi_draw"))at.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const qt=W._multiDrawStarts,ye=W._multiDrawCounts,gn=W._multiDrawCount,Ze=Te?ue.get(Te).bytesPerElement:1,An=j.get(G).currentProgram.getUniforms();for(let Jn=0;Jn<gn;Jn++)An.setValue(F,"_gl_DrawID",Jn),at.render(qt[Jn]/Ze,ye[Jn])}else if(W.isInstancedMesh)at.renderInstances(we,At,W.count);else if(q.isInstancedBufferGeometry){const qt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,ye=Math.min(q.instanceCount,qt);at.renderInstances(we,At,ye)}else at.render(we,At)};function Qp(A,U,q){A.transparent===!0&&A.side===li&&A.forceSinglePass===!1?(A.side=mn,A.needsUpdate=!0,_s(A,U,q),A.side=mr,A.needsUpdate=!0,_s(A,U,q),A.side=li):_s(A,U,q)}this.compile=function(A,U,q=null){q===null&&(q=A),E=pe.get(q),E.init(U),m.push(E),q.traverseVisible(function(W){W.isLight&&W.layers.test(U.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),A!==q&&A.traverseVisible(function(W){W.isLight&&W.layers.test(U.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),E.setupLights();const G=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const ve=W.material;if(ve)if(Array.isArray(ve))for(let Se=0;Se<ve.length;Se++){const xe=ve[Se];Qp(xe,q,W),G.add(xe)}else Qp(ve,q,W),G.add(ve)}),E=m.pop(),G},this.compileAsync=function(A,U,q=null){const G=this.compile(A,U,q);return new Promise(W=>{function ve(){if(G.forEach(function(Se){j.get(Se).currentProgram.isReady()&&G.delete(Se)}),G.size===0){W(A);return}setTimeout(ve,10)}et.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let Lc=null;function Wv(A){Lc&&Lc(A)}function Jp(){yr.stop()}function eh(){yr.start()}const yr=new Rv;yr.setAnimationLoop(Wv),typeof self<"u"&&yr.setContext(self),this.setAnimationLoop=function(A){Lc=A,Ee.setAnimationLoop(A),A===null?yr.stop():yr.start()},Ee.addEventListener("sessionstart",Jp),Ee.addEventListener("sessionend",eh),this.render=function(A,U){if(U!==void 0&&U.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;L!==null&&L.renderStart(A,U);const q=Ee.enabled===!0&&Ee.isPresenting===!0,G=R!==null&&(O===null||q)&&R.begin(P,O);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(U),U=Ee.getCamera()),A.isScene===!0&&A.onBeforeRender(P,A,U,O),E=pe.get(A,m.length),E.init(U),E.state.textureUnits=Q.getTextureUnits(),m.push(E),mt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),tt.setFromProjectionMatrix(mt,ui,U.reversedDepth),Xe=this.localClippingEnabled,Ke=Ie.init(this.clippingPlanes,Xe),b=me.get(A,C.length),b.init(),C.push(b),Ee.enabled===!0&&Ee.isPresenting===!0){const Se=P.xr.getDepthSensingMesh();Se!==null&&Nc(Se,U,-1/0,P.sortObjects)}Nc(A,U,0,P.sortObjects),b.finish(),P.sortObjects===!0&&b.sort(Ue,Oe,U.reversedDepth),ut=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,ut&&Be.addToRenderList(b,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&Ie.beginShadows();const W=E.state.shadowsArray;if(Le.render(W,A,U),Ke===!0&&Ie.endShadows(),(G&&R.hasRenderPass())===!1){const Se=b.opaque,xe=b.transmissive;if(E.setupLights(),U.isArrayCamera){const Te=U.cameras;if(xe.length>0)for(let Ce=0,Ve=Te.length;Ce<Ve;Ce++){const Ge=Te[Ce];nh(Se,xe,A,Ge)}ut&&Be.render(A);for(let Ce=0,Ve=Te.length;Ce<Ve;Ce++){const Ge=Te[Ce];th(b,A,Ge,Ge.viewport)}}else xe.length>0&&nh(Se,xe,A,U),ut&&Be.render(A),th(b,A,U)}O!==null&&H===0&&(Q.updateMultisampleRenderTarget(O),Q.updateRenderTargetMipmap(O)),G&&R.end(P),A.isScene===!0&&A.onAfterRender(P,A,U),_e.resetDefaultState(),V=-1,D=null,m.pop(),m.length>0?(E=m[m.length-1],Q.setTextureUnits(E.state.textureUnits),Ke===!0&&Ie.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?b=C[C.length-1]:b=null,L!==null&&L.renderEnd()};function Nc(A,U,q,G){if(A.visible===!1)return;if(A.layers.test(U.layers)){if(A.isGroup)q=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(U);else if(A.isLightProbeGrid)E.pushLightProbeGrid(A);else if(A.isLight)E.pushLight(A),A.castShadow&&E.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||tt.intersectsSprite(A)){G&&wt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(mt);const Se=te.update(A),xe=A.material;xe.visible&&b.push(A,Se,xe,q,wt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||tt.intersectsObject(A))){const Se=te.update(A),xe=A.material;if(G&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),wt.copy(A.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),wt.copy(Se.boundingSphere.center)),wt.applyMatrix4(A.matrixWorld).applyMatrix4(mt)),Array.isArray(xe)){const Te=Se.groups;for(let Ce=0,Ve=Te.length;Ce<Ve;Ce++){const Ge=Te[Ce],we=xe[Ge.materialIndex];we&&we.visible&&b.push(A,Se,we,q,wt.z,Ge)}}else xe.visible&&b.push(A,Se,xe,q,wt.z,null)}}const ve=A.children;for(let Se=0,xe=ve.length;Se<xe;Se++)Nc(ve[Se],U,q,G)}function th(A,U,q,G){const{opaque:W,transmissive:ve,transparent:Se}=A;E.setupLightsView(q),Ke===!0&&Ie.setGlobalState(P.clippingPlanes,q),G&&y.viewport(X.copy(G)),W.length>0&&vs(W,U,q),ve.length>0&&vs(ve,U,q),Se.length>0&&vs(Se,U,q),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function nh(A,U,q,G){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){const we=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new hi(1,1,{generateMipmaps:!0,type:we?Fi:yn,minFilter:Nr,samples:Math.max(4,w.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}const ve=E.state.transmissionRenderTarget[G.id],Se=G.viewport||X;ve.setSize(Se.z*P.transmissionResolutionScale,Se.w*P.transmissionResolutionScale);const xe=P.getRenderTarget(),Te=P.getActiveCubeFace(),Ce=P.getActiveMipmapLevel();P.setRenderTarget(ve),P.getClearColor(Fe),Re=P.getClearAlpha(),Re<1&&P.setClearColor(16777215,.5),P.clear(),ut&&Be.render(q);const Ve=P.toneMapping;P.toneMapping=pi;const Ge=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),Ke===!0&&Ie.setGlobalState(P.clippingPlanes,G),vs(A,q,G),Q.updateMultisampleRenderTarget(ve),Q.updateRenderTargetMipmap(ve),et.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let rt=0,At=U.length;rt<At;rt++){const Et=U[rt],{object:at,geometry:qt,material:ye,group:gn}=Et;if(ye.side===li&&at.layers.test(G.layers)){const Ze=ye.side;ye.side=mn,ye.needsUpdate=!0,ih(at,q,G,qt,ye,gn),ye.side=Ze,ye.needsUpdate=!0,we=!0}}we===!0&&(Q.updateMultisampleRenderTarget(ve),Q.updateRenderTargetMipmap(ve))}P.setRenderTarget(xe,Te,Ce),P.setClearColor(Fe,Re),Ge!==void 0&&(G.viewport=Ge),P.toneMapping=Ve}function vs(A,U,q){const G=U.isScene===!0?U.overrideMaterial:null;for(let W=0,ve=A.length;W<ve;W++){const Se=A[W],{object:xe,geometry:Te,group:Ce}=Se;let Ve=Se.material;Ve.allowOverride===!0&&G!==null&&(Ve=G),xe.layers.test(q.layers)&&ih(xe,U,q,Te,Ve,Ce)}}function ih(A,U,q,G,W,ve){A.onBeforeRender(P,U,q,G,W,ve),A.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(P,U,q,G,A,ve),W.transparent===!0&&W.side===li&&W.forceSinglePass===!1?(W.side=mn,W.needsUpdate=!0,P.renderBufferDirect(q,U,G,W,A,ve),W.side=mr,W.needsUpdate=!0,P.renderBufferDirect(q,U,G,W,A,ve),W.side=li):P.renderBufferDirect(q,U,G,W,A,ve),A.onAfterRender(P,U,q,G,W,ve)}function _s(A,U,q){U.isScene!==!0&&(U=Pt);const G=j.get(A),W=E.state.lights,ve=E.state.shadowsArray,Se=W.state.version,xe=fe.getParameters(A,W.state,ve,U,q,E.state.lightProbeGridArray),Te=fe.getProgramCacheKey(xe);let Ce=G.programs;G.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?U.environment:null,G.fog=U.fog;const Ve=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;G.envMap=oe.get(A.envMap||G.environment,Ve),G.envMapRotation=G.environment!==null&&A.envMap===null?U.environmentRotation:A.envMapRotation,Ce===void 0&&(A.addEventListener("dispose",Qn),Ce=new Map,G.programs=Ce);let Ge=Ce.get(Te);if(Ge!==void 0){if(G.currentProgram===Ge&&G.lightsStateVersion===Se)return ah(A,xe),Ge}else xe.uniforms=fe.getUniforms(A),L!==null&&A.isNodeMaterial&&L.build(A,q,xe),A.onBeforeCompile(xe,P),Ge=fe.acquireProgram(xe,Te),Ce.set(Te,Ge),G.uniforms=xe.uniforms;const we=G.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(we.clippingPlanes=Ie.uniform),ah(A,xe),G.needsLights=Yv(A),G.lightsStateVersion=Se,G.needsLights&&(we.ambientLightColor.value=W.state.ambient,we.lightProbe.value=W.state.probe,we.directionalLights.value=W.state.directional,we.directionalLightShadows.value=W.state.directionalShadow,we.spotLights.value=W.state.spot,we.spotLightShadows.value=W.state.spotShadow,we.rectAreaLights.value=W.state.rectArea,we.ltc_1.value=W.state.rectAreaLTC1,we.ltc_2.value=W.state.rectAreaLTC2,we.pointLights.value=W.state.point,we.pointLightShadows.value=W.state.pointShadow,we.hemisphereLights.value=W.state.hemi,we.directionalShadowMatrix.value=W.state.directionalShadowMatrix,we.spotLightMatrix.value=W.state.spotLightMatrix,we.spotLightMap.value=W.state.spotLightMap,we.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=Ge,G.uniformsList=null,Ge}function rh(A){if(A.uniformsList===null){const U=A.currentProgram.getUniforms();A.uniformsList=Ll.seqWithValue(U.seq,A.uniforms)}return A.uniformsList}function ah(A,U){const q=j.get(A);q.outputColorSpace=U.outputColorSpace,q.batching=U.batching,q.batchingColor=U.batchingColor,q.instancing=U.instancing,q.instancingColor=U.instancingColor,q.instancingMorph=U.instancingMorph,q.skinning=U.skinning,q.morphTargets=U.morphTargets,q.morphNormals=U.morphNormals,q.morphColors=U.morphColors,q.morphTargetsCount=U.morphTargetsCount,q.numClippingPlanes=U.numClippingPlanes,q.numIntersection=U.numClipIntersection,q.vertexAlphas=U.vertexAlphas,q.vertexTangents=U.vertexTangents,q.toneMapping=U.toneMapping}function jv(A,U){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;S.setFromMatrixPosition(U.matrixWorld);for(let q=0,G=A.length;q<G;q++){const W=A[q];if(W.texture!==null&&W.boundingBox.containsPoint(S))return W}return null}function Xv(A,U,q,G,W){U.isScene!==!0&&(U=Pt),Q.resetTextureUnits();const ve=U.fog,Se=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?U.environment:null,xe=O===null?P.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:qe.workingColorSpace,Te=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Ce=oe.get(G.envMap||Se,Te),Ve=G.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ge=!!q.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),we=!!q.morphAttributes.position,rt=!!q.morphAttributes.normal,At=!!q.morphAttributes.color;let Et=pi;G.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Et=P.toneMapping);const at=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,qt=at!==void 0?at.length:0,ye=j.get(G),gn=E.state.lights;if(Ke===!0&&(Xe===!0||A!==D)){const lt=A===D&&G.id===V;Ie.setState(G,A,lt)}let Ze=!1;G.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==gn.state.version||ye.outputColorSpace!==xe||W.isBatchedMesh&&ye.batching===!1||!W.isBatchedMesh&&ye.batching===!0||W.isBatchedMesh&&ye.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&ye.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&ye.instancing===!1||!W.isInstancedMesh&&ye.instancing===!0||W.isSkinnedMesh&&ye.skinning===!1||!W.isSkinnedMesh&&ye.skinning===!0||W.isInstancedMesh&&ye.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&ye.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&ye.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&ye.instancingMorph===!1&&W.morphTexture!==null||ye.envMap!==Ce||G.fog===!0&&ye.fog!==ve||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==Ie.numPlanes||ye.numIntersection!==Ie.numIntersection)||ye.vertexAlphas!==Ve||ye.vertexTangents!==Ge||ye.morphTargets!==we||ye.morphNormals!==rt||ye.morphColors!==At||ye.toneMapping!==Et||ye.morphTargetsCount!==qt||!!ye.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,ye.__version=G.version);let An=ye.currentProgram;Ze===!0&&(An=_s(G,U,W),L&&G.isNodeMaterial&&L.onUpdateProgram(G,An,ye));let Jn=!1,zi=!1,Yr=!1;const ot=An.getUniforms(),Ct=ye.uniforms;if(y.useProgram(An.program)&&(Jn=!0,zi=!0,Yr=!0),G.id!==V&&(V=G.id,zi=!0),ye.needsLights){const lt=jv(E.state.lightProbeGridArray,W);ye.lightProbeGrid!==lt&&(ye.lightProbeGrid=lt,zi=!0)}if(Jn||D!==A){y.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),ot.setValue(F,"projectionMatrix",A.projectionMatrix),ot.setValue(F,"viewMatrix",A.matrixWorldInverse);const Bi=ot.map.cameraPosition;Bi!==void 0&&Bi.setValue(F,bt.setFromMatrixPosition(A.matrixWorld)),w.logarithmicDepthBuffer&&ot.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ot.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),D!==A&&(D=A,zi=!0,Yr=!0)}if(ye.needsLights&&(gn.state.directionalShadowMap.length>0&&ot.setValue(F,"directionalShadowMap",gn.state.directionalShadowMap,Q),gn.state.spotShadowMap.length>0&&ot.setValue(F,"spotShadowMap",gn.state.spotShadowMap,Q),gn.state.pointShadowMap.length>0&&ot.setValue(F,"pointShadowMap",gn.state.pointShadowMap,Q)),W.isSkinnedMesh){ot.setOptional(F,W,"bindMatrix"),ot.setOptional(F,W,"bindMatrixInverse");const lt=W.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),ot.setValue(F,"boneTexture",lt.boneTexture,Q))}W.isBatchedMesh&&(ot.setOptional(F,W,"batchingTexture"),ot.setValue(F,"batchingTexture",W._matricesTexture,Q),ot.setOptional(F,W,"batchingIdTexture"),ot.setValue(F,"batchingIdTexture",W._indirectTexture,Q),ot.setOptional(F,W,"batchingColorTexture"),W._colorsTexture!==null&&ot.setValue(F,"batchingColorTexture",W._colorsTexture,Q));const ki=q.morphAttributes;if((ki.position!==void 0||ki.normal!==void 0||ki.color!==void 0)&&N.update(W,q,An),(zi||ye.receiveShadow!==W.receiveShadow)&&(ye.receiveShadow=W.receiveShadow,ot.setValue(F,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&U.environment!==null&&(Ct.envMapIntensity.value=U.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=gC()),zi){if(ot.setValue(F,"toneMappingExposure",P.toneMappingExposure),ye.needsLights&&qv(Ct,Yr),ve&&G.fog===!0&&Ae.refreshFogUniforms(Ct,ve),Ae.refreshMaterialUniforms(Ct,G,re,se,E.state.transmissionRenderTarget[A.id]),ye.needsLights&&ye.lightProbeGrid){const lt=ye.lightProbeGrid;Ct.probesSH.value=lt.texture,Ct.probesMin.value.copy(lt.boundingBox.min),Ct.probesMax.value.copy(lt.boundingBox.max),Ct.probesResolution.value.copy(lt.resolution)}Ll.upload(F,rh(ye),Ct,Q)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ll.upload(F,rh(ye),Ct,Q),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ot.setValue(F,"center",W.center),ot.setValue(F,"modelViewMatrix",W.modelViewMatrix),ot.setValue(F,"normalMatrix",W.normalMatrix),ot.setValue(F,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){const lt=G.uniformsGroups;for(let Bi=0,$r=lt.length;Bi<$r;Bi++){const oh=lt[Bi];ie.update(oh,An),ie.bind(oh,An)}}return An}function qv(A,U){A.ambientLightColor.needsUpdate=U,A.lightProbe.needsUpdate=U,A.directionalLights.needsUpdate=U,A.directionalLightShadows.needsUpdate=U,A.pointLights.needsUpdate=U,A.pointLightShadows.needsUpdate=U,A.spotLights.needsUpdate=U,A.spotLightShadows.needsUpdate=U,A.rectAreaLights.needsUpdate=U,A.hemisphereLights.needsUpdate=U}function Yv(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(A,U,q){const G=j.get(A);G.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),j.get(A.texture).__webglTexture=U,j.get(A.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:q,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,U){const q=j.get(A);q.__webglFramebuffer=U,q.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(A,U=0,q=0){O=A,K=U,H=q;let G=null,W=!1,ve=!1;if(A){const xe=j.get(A);if(xe.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(F.FRAMEBUFFER,xe.__webglFramebuffer),X.copy(A.viewport),Z.copy(A.scissor),le=A.scissorTest,y.viewport(X),y.scissor(Z),y.setScissorTest(le),V=-1;return}else if(xe.__webglFramebuffer===void 0)Q.setupRenderTarget(A);else if(xe.__hasExternalTextures)Q.rebindTextures(A,j.get(A.texture).__webglTexture,j.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ve=A.depthTexture;if(xe.__boundDepthTexture!==Ve){if(Ve!==null&&j.has(Ve)&&(A.width!==Ve.image.width||A.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(A)}}const Te=A.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ve=!0);const Ce=j.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ce[U])?G=Ce[U][q]:G=Ce[U],W=!0):A.samples>0&&Q.useMultisampledRTT(A)===!1?G=j.get(A).__webglMultisampledFramebuffer:Array.isArray(Ce)?G=Ce[q]:G=Ce,X.copy(A.viewport),Z.copy(A.scissor),le=A.scissorTest}else X.copy(De).multiplyScalar(re).floor(),Z.copy(pt).multiplyScalar(re).floor(),le=ke;if(q!==0&&(G=Y),y.bindFramebuffer(F.FRAMEBUFFER,G)&&y.drawBuffers(A,G),y.viewport(X),y.scissor(Z),y.setScissorTest(le),W){const xe=j.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,xe.__webglTexture,q)}else if(ve){const xe=U;for(let Te=0;Te<A.textures.length;Te++){const Ce=j.get(A.textures[Te]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Te,Ce.__webglTexture,q,xe)}}else if(A!==null&&q!==0){const xe=j.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,xe.__webglTexture,q)}V=-1},this.readRenderTargetPixels=function(A,U,q,G,W,ve,Se,xe=0){if(!(A&&A.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=j.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(Te=Te[Se]),Te){y.bindFramebuffer(F.FRAMEBUFFER,Te);try{const Ce=A.textures[xe],Ve=Ce.format,Ge=Ce.type;if(A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xe),!w.textureFormatReadable(Ve)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(Ge)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=A.width-G&&q>=0&&q<=A.height-W&&F.readPixels(U,q,G,W,he.convert(Ve),he.convert(Ge),ve)}finally{const Ce=O!==null?j.get(O).__webglFramebuffer:null;y.bindFramebuffer(F.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(A,U,q,G,W,ve,Se,xe=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=j.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(Te=Te[Se]),Te)if(U>=0&&U<=A.width-G&&q>=0&&q<=A.height-W){y.bindFramebuffer(F.FRAMEBUFFER,Te);const Ce=A.textures[xe],Ve=Ce.format,Ge=Ce.type;if(A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xe),!w.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const we=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,we),F.bufferData(F.PIXEL_PACK_BUFFER,ve.byteLength,F.STREAM_READ),F.readPixels(U,q,G,W,he.convert(Ve),he.convert(Ge),0);const rt=O!==null?j.get(O).__webglFramebuffer:null;y.bindFramebuffer(F.FRAMEBUFFER,rt);const At=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await DS(F,At,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,we),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ve),F.deleteBuffer(we),F.deleteSync(At),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,U=null,q=0){const G=Math.pow(2,-q),W=Math.floor(A.image.width*G),ve=Math.floor(A.image.height*G),Se=U!==null?U.x:0,xe=U!==null?U.y:0;Q.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,q,0,0,Se,xe,W,ve),y.unbindTexture()},this.copyTextureToTexture=function(A,U,q=null,G=null,W=0,ve=0){let Se,xe,Te,Ce,Ve,Ge,we,rt,At;const Et=A.isCompressedTexture?A.mipmaps[ve]:A.image;if(q!==null)Se=q.max.x-q.min.x,xe=q.max.y-q.min.y,Te=q.isBox3?q.max.z-q.min.z:1,Ce=q.min.x,Ve=q.min.y,Ge=q.isBox3?q.min.z:0;else{const Ct=Math.pow(2,-W);Se=Math.floor(Et.width*Ct),xe=Math.floor(Et.height*Ct),A.isDataArrayTexture?Te=Et.depth:A.isData3DTexture?Te=Math.floor(Et.depth*Ct):Te=1,Ce=0,Ve=0,Ge=0}G!==null?(we=G.x,rt=G.y,At=G.z):(we=0,rt=0,At=0);const at=he.convert(U.format),qt=he.convert(U.type);let ye;U.isData3DTexture?(Q.setTexture3D(U,0),ye=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Q.setTexture2DArray(U,0),ye=F.TEXTURE_2D_ARRAY):(Q.setTexture2D(U,0),ye=F.TEXTURE_2D),y.activeTexture(F.TEXTURE0),y.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),y.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),y.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const gn=y.getParameter(F.UNPACK_ROW_LENGTH),Ze=y.getParameter(F.UNPACK_IMAGE_HEIGHT),An=y.getParameter(F.UNPACK_SKIP_PIXELS),Jn=y.getParameter(F.UNPACK_SKIP_ROWS),zi=y.getParameter(F.UNPACK_SKIP_IMAGES);y.pixelStorei(F.UNPACK_ROW_LENGTH,Et.width),y.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Et.height),y.pixelStorei(F.UNPACK_SKIP_PIXELS,Ce),y.pixelStorei(F.UNPACK_SKIP_ROWS,Ve),y.pixelStorei(F.UNPACK_SKIP_IMAGES,Ge);const Yr=A.isDataArrayTexture||A.isData3DTexture,ot=U.isDataArrayTexture||U.isData3DTexture;if(A.isDepthTexture){const Ct=j.get(A),ki=j.get(U),lt=j.get(Ct.__renderTarget),Bi=j.get(ki.__renderTarget);y.bindFramebuffer(F.READ_FRAMEBUFFER,lt.__webglFramebuffer),y.bindFramebuffer(F.DRAW_FRAMEBUFFER,Bi.__webglFramebuffer);for(let $r=0;$r<Te;$r++)Yr&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,j.get(A).__webglTexture,W,Ge+$r),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,j.get(U).__webglTexture,ve,At+$r)),F.blitFramebuffer(Ce,Ve,Se,xe,we,rt,Se,xe,F.DEPTH_BUFFER_BIT,F.NEAREST);y.bindFramebuffer(F.READ_FRAMEBUFFER,null),y.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(W!==0||A.isRenderTargetTexture||j.has(A)){const Ct=j.get(A),ki=j.get(U);y.bindFramebuffer(F.READ_FRAMEBUFFER,J),y.bindFramebuffer(F.DRAW_FRAMEBUFFER,k);for(let lt=0;lt<Te;lt++)Yr?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ct.__webglTexture,W,Ge+lt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ct.__webglTexture,W),ot?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ki.__webglTexture,ve,At+lt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ki.__webglTexture,ve),W!==0?F.blitFramebuffer(Ce,Ve,Se,xe,we,rt,Se,xe,F.COLOR_BUFFER_BIT,F.NEAREST):ot?F.copyTexSubImage3D(ye,ve,we,rt,At+lt,Ce,Ve,Se,xe):F.copyTexSubImage2D(ye,ve,we,rt,Ce,Ve,Se,xe);y.bindFramebuffer(F.READ_FRAMEBUFFER,null),y.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ot?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(ye,ve,we,rt,At,Se,xe,Te,at,qt,Et.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(ye,ve,we,rt,At,Se,xe,Te,at,Et.data):F.texSubImage3D(ye,ve,we,rt,At,Se,xe,Te,at,qt,Et):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ve,we,rt,Se,xe,at,qt,Et.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ve,we,rt,Et.width,Et.height,at,Et.data):F.texSubImage2D(F.TEXTURE_2D,ve,we,rt,Se,xe,at,qt,Et);y.pixelStorei(F.UNPACK_ROW_LENGTH,gn),y.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ze),y.pixelStorei(F.UNPACK_SKIP_PIXELS,An),y.pixelStorei(F.UNPACK_SKIP_ROWS,Jn),y.pixelStorei(F.UNPACK_SKIP_IMAGES,zi),ve===0&&U.generateMipmaps&&F.generateMipmap(ye),y.unbindTexture()},this.initRenderTarget=function(A){j.get(A).__webglFramebuffer===void 0&&Q.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Q.setTextureCube(A,0):A.isData3DTexture?Q.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Q.setTexture2DArray(A,0):Q.setTexture2D(A,0),y.unbindTexture()},this.resetState=function(){K=0,H=0,O=null,y.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),n.unpackColorSpace=qe._getUnpackColorSpace()}}const yo=({loadTorquePercent:t=0})=>{const{state:e}=Kn(),n=ce.useRef(null),i=ce.useRef(e);i.current=e;const r=ce.useRef(null),a=ce.useRef(null),o=ce.useRef(null),s=ce.useRef(null),l=ce.useRef(!1),c=ce.useRef({x:0,y:0}),f=ce.useRef({theta:Math.PI/4,phi:Math.PI/3,radius:4.2}),p=C=>{var L,Y,J,k,K;if(!C)return!1;if(C.isForwardDirection===!1||C.rotationDirection==="REV"||C.direction==="REV"||C.motorDirection==="REV"||C.localDirection==="REV"||C.isReverse===!0)return!0;const m=(L=C.parameters)==null?void 0:L.P0223;if(Number(typeof m=="object"?(m==null?void 0:m.currentValue)??(m==null?void 0:m.value)??0:m??0)===1||typeof C.outputFrequency=="number"&&C.outputFrequency<0||typeof C.targetFrequency=="number"&&C.targetFrequency<0)return!0;const P=C.controlSource==="REM"||C.isLocal===!1,I=!!((Y=C.digitalInputs)!=null&&Y[1]||(J=C.digitalInputs)!=null&&J.DI2||(k=C.digitalInputs)!=null&&k.di2||(K=C.digitalInputs)!=null&&K["2"]);return!!(P&&I)},d=Math.abs(Number(e.outputFrequency??0)),g=p(e),_=(e.motorStatus==="RUNNING"||d>.1)&&e.motorStatus!=="FAULT",T=Math.round(d/60*1750),x=e.outputCurrent??(_?(1.2+d/60*3.3).toFixed(1):"0.0"),u=()=>{if(!a.current)return;const{theta:C,phi:m,radius:R}=f.current;a.current.position.x=R*Math.sin(m)*Math.sin(C),a.current.position.y=R*Math.cos(m),a.current.position.z=R*Math.sin(m)*Math.cos(C),a.current.lookAt(0,0,0)},v=()=>{const C=document.createElement("canvas");C.width=512,C.height=256;const m=C.getContext("2d");m&&(m.fillStyle="#dcdde1",m.fillRect(0,0,512,256),m.strokeStyle="#2f3640",m.lineWidth=6,m.strokeRect(6,6,500,244),m.fillStyle="#005ea6",m.fillRect(10,10,492,45),m.fillStyle="#ffffff",m.font="bold 28px Arial, sans-serif",m.fillText("WEG",20,42),m.font="bold 18px Arial, sans-serif",m.fillText("MOTOR DE INDUÇÃO TRIFÁSICO - W22",100,40),m.fillStyle="#1e272e",m.font="bold 15px monospace",m.fillText("MOD: W22 Plus IE3",20,80),m.fillText("POTÊNCIA: 1.5 cv (1.1 kW)",260,80),m.fillText("TENSÃO: 220 / 380 V",20,110),m.fillText("CORRENTE: 4.50 / 2.60 A",260,110),m.fillText("FREQ: 60 Hz   FS: 1.15",20,140),m.fillText("ROTAÇÃO: 1750 RPM",260,140),m.fillText("REND(η): 84.5%   COS φ: 0.81",20,170),m.fillText("ISOL: Cl. F (ΔT 80K)",260,170),m.fillText("GRAU PROT: IP55",20,200),m.fillText("REGIME: S1 CONTÍNUO",260,200),m.fillStyle="#718093",m.font="12px Arial",m.fillText("FABRICADO NO BRASIL - NBR 17094",20,235),m.fillText("DATA: 2026",380,235));const R=new oM(C);return R.anisotropy=8,R};ce.useEffect(()=>{if(!n.current)return;const C=n.current.clientWidth||300,m=n.current.clientHeight||250,R=new YS;r.current=R,R.background=new We("#0a0d12");const P=new Dn(45,C/m,.1,100);a.current=P,u();const I=new xC({antialias:!0,alpha:!0});I.setSize(C,m),I.setPixelRatio(window.devicePixelRatio),I.shadowMap.enabled=!0,o.current=I,n.current.appendChild(I.domElement);const L=new xM(16777215,.8);R.add(L);const Y=new Km(16777215,1.2);Y.position.set(5,8,5),R.add(Y);const J=new Km(8508666,.6);J.position.set(-5,-2,-5),R.add(J);const k=new xo({color:24230,roughness:.35,metalness:.25}),K=new xo({color:1976110,roughness:.6,metalness:.4}),H=new xo({color:14474721,roughness:.2,metalness:.85}),O=new xo({color:3094080,roughness:.4,metalness:.7}),V=new Ra;R.add(V);const D=new wr(.85,.85,1.8,32);D.rotateZ(Math.PI/2);const X=new Lt(D,k);V.add(X);for(let w=-.7;w<=.7;w+=.14){const y=new wr(.92,.92,.04,32);y.rotateZ(Math.PI/2);const z=new Lt(y,k);z.position.x=w,V.add(z)}const Z=new wr(.86,.86,.5,32);Z.rotateZ(Math.PI/2);const le=new Lt(Z,K);le.position.x=-1.1,V.add(le);const Fe=new fr(.6,.35,.55),Re=new Lt(Fe,k);Re.position.set(0,.95,0),V.add(Re);const $=new fr(1.6,.15,.3),se=new Lt($,K);se.position.set(0,-.85,.65),V.add(se);const re=new Lt($,K);re.position.set(0,-.85,-.65),V.add(re);const Ue=v(),Oe=new xs(.75,.38),De=new xo({map:Ue,roughness:.3,metalness:.4,side:li}),pt=new Lt(Oe,De);pt.position.set(0,.05,.87),V.add(pt);const ke=new Ra;s.current=ke,ke.position.set(.9,0,0),V.add(ke);const tt=new wr(.18,.18,.8,24);tt.rotateZ(Math.PI/2);const Ke=new Lt(tt,H);Ke.position.x=.3,ke.add(Ke);const Xe=new wr(.5,.5,.3,32);Xe.rotateZ(Math.PI/2);const mt=new Lt(Xe,O);mt.position.x=.55,ke.add(mt);const bt=new fr(.32,.08,.52),wt=new Hp({color:16717636}),Pt=new Lt(bt,wt);Pt.position.x=.55,ke.add(Pt);const ut=new SM(6,12,166097,2042167);ut.position.y=-.93,R.add(ut);const St=new yM;let F;const Vt=()=>{F=requestAnimationFrame(Vt);const w=St.getDelta(),y=i.current,z=Math.abs(Number((y==null?void 0:y.outputFrequency)??0)),j=((y==null?void 0:y.motorStatus)==="RUNNING"||z>.1)&&(y==null?void 0:y.motorStatus)!=="FAULT";if(s.current&&j){const oe=p(y)?-1:1,ue=z/60*1750,te=2*Math.PI*ue/60*.35;s.current.rotation.x+=te*w*oe}I.render(R,P)};Vt();const et=()=>{if(!n.current||!o.current||!a.current)return;const w=n.current.clientWidth,y=n.current.clientHeight;a.current.aspect=w/y,a.current.updateProjectionMatrix(),o.current.setSize(w,y)};return window.addEventListener("resize",et),()=>{cancelAnimationFrame(F),window.removeEventListener("resize",et),n.current&&I.domElement&&n.current.removeChild(I.domElement),I.dispose()}},[]);const M=C=>{l.current=!0,c.current={x:C.clientX,y:C.clientY}},S=C=>{if(!l.current)return;const m=C.clientX-c.current.x,R=C.clientY-c.current.y;f.current.theta-=m*.008,f.current.phi=Math.max(.1,Math.min(Math.PI/2-.05,f.current.phi-R*.008)),u(),c.current={x:C.clientX,y:C.clientY}},b=()=>{l.current=!1},E=(C,m,R=4.2)=>{f.current={theta:C,phi:m,radius:R},u()};return h.jsxs("div",{style:vC,children:[h.jsxs("div",{style:_C,children:[h.jsxs("div",{children:[h.jsx("strong",{style:{fontSize:"12px",color:"#fff"},children:"Motor de Indução WEG W22 (3D Realista)"}),h.jsx("span",{style:{fontSize:"10px",color:"#90a4ae",display:"block"},children:"🖱️ Clique e arraste para girar em 360°"})]}),h.jsxs("div",{style:{display:"flex",gap:"4px"},children:[h.jsx("button",{onClick:()=>E(Math.PI/4,Math.PI/3),style:qu,children:"📐 Isométrica"}),h.jsx("button",{onClick:()=>E(0,Math.PI/2.2,2.5),style:{...qu,background:"#0288d1",color:"#fff"},title:"Aproxima e foca na Placa de Identificação lateral",children:"🏷️ Ler Placa"}),h.jsx("button",{onClick:()=>E(Math.PI/2,Math.PI/2.2,3.2),style:qu,children:"⚙️ Eixo"})]})]}),h.jsx("div",{ref:n,style:yC,onMouseDown:M,onMouseMove:S,onMouseUp:b,onMouseLeave:b}),h.jsxs("div",{style:SC,children:[h.jsxs("div",{style:So,children:[h.jsx("span",{style:Mo,children:"FREQUÊNCIA"}),h.jsxs("strong",{style:{color:"#00e676",fontSize:"13px"},children:[d.toFixed(1)," Hz"]})]}),h.jsxs("div",{style:So,children:[h.jsx("span",{style:Mo,children:"SENTIDO DE GIRO"}),h.jsx("strong",{style:{color:g?"#ffb74d":"#81d4fa",fontSize:"13px"},children:g?"↺ ANTI-HORÁRIO (REV)":"↻ HORÁRIO (FWD)"})]}),h.jsxs("div",{style:So,children:[h.jsx("span",{style:Mo,children:"VELOCIDADE"}),h.jsxs("strong",{style:{color:"#81d4fa",fontSize:"13px"},children:[T," RPM"]})]}),h.jsxs("div",{style:So,children:[h.jsx("span",{style:Mo,children:"CORRENTE"}),h.jsxs("strong",{style:{color:"#ffb74d",fontSize:"13px"},children:[x," A"]})]}),h.jsxs("div",{style:So,children:[h.jsx("span",{style:Mo,children:"CARGA NO EIXO"}),h.jsxs("strong",{style:{color:"#f06292",fontSize:"13px"},children:[t,"%"]})]})]})]})},vC={background:"#11151a",border:"1px solid #252e3b",borderRadius:"12px",padding:"12px",display:"flex",flexDirection:"column",gap:"10px",width:"100%",boxSizing:"border-box"},_C={display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #21262d",paddingBottom:"8px"},qu={background:"#1f2937",border:"1px solid #374151",borderRadius:"6px",color:"#b0bec5",padding:"4px 8px",fontSize:"10px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s ease"},yC={width:"100%",height:"250px",borderRadius:"8px",overflow:"hidden",cursor:"grab",userSelect:"none"},SC={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))",gap:"8px"},So={background:"#161b22",border:"1px solid #21262d",borderRadius:"6px",padding:"6px 8px",display:"flex",flexDirection:"column",gap:"2px"},Mo={fontSize:"9px",color:"#90a4ae",fontWeight:"bold"},M0=()=>{const{state:t,dispatch:e}=Kn(),[n,i]=ce.useState(0),r=o=>{const s=!t.digitalInputs[o];e({type:"SET_DIGITAL_INPUT",payload:{input:o,value:s}})},a=t.controlSource==="REM";return h.jsxs("div",{style:MC,children:[h.jsxs("div",{style:EC,children:[h.jsx("strong",{children:"RÉGUA DE BORNES I/O"}),h.jsx("span",{style:{fontSize:"11px",color:a?"#00e676":"#ffa726"},children:a?"REMOTO ATIVO":"LOCAL ATIVO"})]}),h.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(8, 1fr)",gap:"4px",background:"#121417",padding:"6px",borderRadius:"6px",marginBottom:"10px"},children:["+10V","AI1","GND","+24V","DI1","DI2","DI3","DI4"].map((o,s)=>h.jsxs("div",{style:{textAlign:"center",background:"#252a33",padding:"4px 0",borderRadius:"4px",fontSize:"10px"},children:[h.jsx("span",{style:{color:"#64b5f6",fontWeight:"bold"},children:s+1}),h.jsx("br",{}),o]},o))}),h.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"6px",marginBottom:"10px"},children:["di1","di2","di3","di4"].map(o=>h.jsxs("button",{onClick:()=>r(o),style:{padding:"6px 4px",borderRadius:"4px",border:"none",fontSize:"11px",fontWeight:"bold",color:"#fff",background:t.digitalInputs[o]?"#2e7d32":"#374151",cursor:"pointer"},children:[o.toUpperCase(),": ",t.digitalInputs[o]?"ON":"OFF"]},o))}),h.jsxs("div",{children:[h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px",marginBottom:"4px"},children:[h.jsx("span",{children:"Entrada Analógica AI1 (0 a 10V):"}),h.jsxs("strong",{style:{color:"#64b5f6"},children:[n.toFixed(2)," V"]})]}),h.jsx("input",{type:"range",min:"0",max:"10",step:"0.1",value:n,onChange:o=>{const s=parseFloat(o.target.value);i(s),e({type:"SET_ANALOG_INPUT_1",payload:s})},style:{width:"100%",cursor:"pointer",accentColor:"#0288d1"}})]})]})},MC={background:"#1a1d21",border:"1px solid #323842",borderRadius:"12px",padding:"14px",flex:1,minWidth:"280px"},EC={display:"flex",justifyContent:"space-between",fontSize:"13px",borderBottom:"1px solid #2a2f38",paddingBottom:"6px",marginBottom:"10px"},E0=(t,e)=>{switch(t){case 13:return e.activeFault===null;case 14:return e.activeFault!==null;case 15:return e.motorStatus==="RUNNING"&&e.outputFrequency>.1;case 2:return e.motorStatus==="RUNNING"&&Math.abs(e.outputFrequency-e.parameters.P0121.currentValue)<=.1;default:return!1}},TC=()=>{const{state:t}=Kn(),e=E0(t.parameters.P0275.currentValue,t),n=E0(t.parameters.P0277.currentValue,t);return h.jsxs("div",{style:{background:"#1a1d21",border:"1px solid #323842",borderRadius:"12px",padding:"14px",flex:1,minWidth:"280px"},children:[h.jsx("div",{style:{fontSize:"13px",fontWeight:"bold",borderBottom:"1px solid #2a2f38",paddingBottom:"6px",marginBottom:"10px"},children:"SAÍDAS A RELÉ (RL1 / RL2)"}),h.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"},children:[h.jsxs("div",{style:{background:"#141619",padding:"10px",borderRadius:"6px",display:"flex",alignItems:"center",gap:"10px"},children:[h.jsx("div",{style:{width:24,height:24,borderRadius:"50%",background:e?"#00e676":"#1b5e20",boxShadow:e?"0 0 12px #00e676":"none"}}),h.jsxs("div",{children:[h.jsx("strong",{style:{fontSize:"12px"},children:"RL1 (RUN)"}),h.jsx("div",{style:{fontSize:"10px",color:"#888"},children:e?"FECHADO":"ABERTO"})]})]}),h.jsxs("div",{style:{background:"#141619",padding:"10px",borderRadius:"6px",display:"flex",alignItems:"center",gap:"10px"},children:[h.jsx("div",{style:{width:24,height:24,borderRadius:"50%",background:n?"#ff1744":"#b71c1c",boxShadow:n?"0 0 12px #ff1744":"none"}}),h.jsxs("div",{children:[h.jsx("strong",{style:{fontSize:"12px"},children:"RL2 (FALHA)"}),h.jsx("div",{style:{fontSize:"10px",color:"#888"},children:n?"FECHADO":"ABERTO"})]})]})]})]})},bC=[{code:"F006",name:"Sobrecorrente / Curto-Circuito",description:"Corrente de saída ultrapassou o limite máximo dos IGBTs.",autoResetable:!1},{code:"F021",name:"Subtensão no Barramento CC",description:"Tensão do link CC caiu abaixo do limite operacional.",autoResetable:!0},{code:"F022",name:"Sobretensão no Barramento CC",description:"Regeneração excessiva de energia pelo motor.",autoResetable:!1},{code:"F070",name:"Sobretemperatura no Dissipador",description:"Temperatura dos módulos de potência excedeu o limite seguro.",autoResetable:!0}],Yu=()=>{const{state:t,dispatch:e}=Kn();return h.jsxs("div",{style:AC,children:[h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #2a2f38",paddingBottom:"6px"},children:[h.jsx("strong",{style:{fontSize:"13px",color:"#ff5252"},children:"⚠️ INJEÇÃO DE FALHAS & DIAGNÓSTICO"}),t.activeFault?h.jsxs("span",{style:{fontSize:"11px",color:"#ff5252",fontWeight:"bold"},children:["FALHA ATIVA: ",t.activeFault.code]}):h.jsx("span",{style:{fontSize:"11px",color:"#00e676",fontWeight:"bold"},children:"SISTEMA SAUDÁVEL (NORMAL)"})]}),h.jsx("div",{style:CC,children:bC.map(n=>{var r;const i=((r=t.activeFault)==null?void 0:r.code)===n.code;return h.jsxs("button",{onClick:()=>e({type:"TRIGGER_FAULT",payload:n}),style:{...RC,background:i?"#b71c1c":"#21262d",borderColor:i?"#ff1744":"#30363d",color:i?"#fff":"#c9d1d9"},title:n.description,children:[h.jsx("strong",{children:n.code}),h.jsx("span",{style:{fontSize:"10px"},children:n.name})]},n.code)})}),h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"4px"},children:[h.jsx("small",{style:{color:"#8b949e",fontSize:"10px"},children:'Para limpar falhas: use o botão abaixo ou pressione a tecla "O" na IHM.'}),h.jsx("button",{onClick:()=>e({type:"RESET_FAULT"}),disabled:!t.activeFault,style:{...wC,background:t.activeFault?"#0277bd":"#1c2128",opacity:t.activeFault?1:.4,cursor:t.activeFault?"pointer":"not-allowed"},children:"🔄 Resetar Falhas"})]})]})},AC={background:"#161b22",border:"1px solid #30363d",borderRadius:"12px",padding:"14px",display:"flex",flexDirection:"column",gap:"10px",width:"100%",boxSizing:"border-box"},CC={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"8px"},RC={padding:"8px 10px",borderRadius:"6px",border:"1px solid",display:"flex",flexDirection:"column",alignItems:"flex-start",cursor:"pointer",textAlign:"left"},wC={padding:"6px 14px",color:"#fff",border:"none",borderRadius:"6px",fontWeight:"bold",fontSize:"11px"},PC=({isMuted:t=!1,masterVolume:e=.3}={})=>{const{state:n}=Kn(),i=ce.useRef(null),r=ce.useRef(null),a=ce.useRef(null),o=ce.useRef(null),s=ce.useRef(null),l=ce.useRef(null),c=()=>{if(i.current){i.current.state==="suspended"&&i.current.resume();return}const p=window.AudioContext||window.webkitAudioContext,d=new p;i.current=d;const g=d.createGain();g.gain.setValueAtTime(t?0:e,d.currentTime),g.connect(d.destination),r.current=g;const _=d.createOscillator();_.type="sine",_.frequency.setValueAtTime(4e3,d.currentTime);const T=d.createGain();T.gain.setValueAtTime(0,d.currentTime),_.connect(T),T.connect(g),_.start(),a.current=T;const x=d.createOscillator();x.type="triangle",x.frequency.setValueAtTime(20,d.currentTime);const u=d.createGain();u.gain.setValueAtTime(0,d.currentTime),x.connect(u),u.connect(g),x.start(),o.current=x,s.current=u},f=()=>{const p=i.current;if(!p||t||p.state==="suspended")return;const d=p.createOscillator(),g=p.createGain();d.type="square",d.frequency.setValueAtTime(1200,p.currentTime),g.gain.setValueAtTime(.15*e,p.currentTime),g.gain.exponentialRampToValueAtTime(1e-4,p.currentTime+.18),d.connect(g),g.connect(p.destination),d.start(),d.stop(p.currentTime+.2)};return ce.useEffect(()=>{var _,T,x,u,v;const p=i.current;if(!p)return;const d=p.currentTime,g=n.motorStatus==="RUNNING"&&n.outputFrequency>.1;if(r.current&&r.current.gain.setTargetAtTime(t?0:e,d,.05),g&&!n.activeFault){const M=n.parameters.P0134.currentValue||60,S=Math.min(1,n.outputFrequency/M);(_=o.current)==null||_.frequency.setTargetAtTime(25+S*95,d,.05),(T=s.current)==null||T.gain.setTargetAtTime(.08*S,d,.05),(x=a.current)==null||x.gain.setTargetAtTime(.04*S,d,.05)}else(u=s.current)==null||u.gain.setTargetAtTime(0,d,.05),(v=a.current)==null||v.gain.setTargetAtTime(0,d,.05)},[n.outputFrequency,n.motorStatus,n.activeFault,t,e,n.parameters.P0134]),ce.useEffect(()=>(n.activeFault&&!t?(f(),l.current=window.setInterval(()=>f(),700)):l.current!==null&&(clearInterval(l.current),l.current=null),()=>{l.current!==null&&clearInterval(l.current)}),[n.activeFault,t]),{initAudio:c}},IC=()=>{const[t,e]=ce.useState(!1),[n,i]=ce.useState(.3),[r,a]=ce.useState(!1),{initAudio:o}=PC({isMuted:t,masterVolume:n}),s=()=>{r||(o(),a(!0)),e(!t)};return h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#1a1d21",padding:"8px 14px",borderRadius:"8px",border:"1px solid #323842",width:"100%"},children:[h.jsx("button",{onClick:s,style:{background:"#263238",border:"1px solid #455a64",color:"#eceff1",borderRadius:"4px",padding:"6px 12px",fontSize:"12px",fontWeight:600,cursor:"pointer"},children:t||!r?"🔇 Áudio Desativado":"🔊 Efeitos Sonoros ON"}),h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",fontSize:"11px",color:"#90a4ae"},children:[h.jsx("span",{children:"Volume:"}),h.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:n,onChange:l=>{r||(o(),a(!0)),i(parseFloat(l.target.value))},style:{width:"80px",accentColor:"#0288d1",cursor:"pointer"}})]})]})},Pe=(t,e)=>{if(!t||!t.parameters)return 0;const n=t.parameters[e];return n==null?0:typeof n=="object"&&"currentValue"in n?Number(n.currentValue??0):Number(n??0)},ii=(t,e)=>t?Array.isArray(t.digitalInputs)?!!t.digitalInputs[e-1]:t.digitalInputs&&typeof t.digitalInputs=="object"?!!(t.digitalInputs[`DI${e}`]??t.digitalInputs[`di${e}`]??t.digitalInputs[String(e)]):!1:!1,cs=[{id:"mod-0",moduleNumber:0,title:"Manual de Programação CFW500",icon:"📑",description:"Acesse e baixe o manual oficial completo de programação do WEG CFW500 para consulta técnica.",lessons:[{id:"l0-1",title:"Download do Manual Oficial de Programação",durationMin:2,type:"THEORY",description:"Material de apoio indispensável para consulta de parâmetros, tabelas de falhas e diagramas de ligação.",theoryData:{title:"Documentação Técnica Oficial WEG",content:["O manual de programação do WEG CFW500 reúne toda a tabela detalhada de parâmetros, diagramas dos cartões plug-in, curvas de torque e guias de resolução de falhas.","Clique no botão abaixo para baixar o PDF e utilize-o como fonte de consulta durante os desafios e comissionamentos das próximas etapas."],diagramInfo:"DOCUMENTAÇÃO TÉCNICA OFICIAL ➔ WEG CFW500 (CÓD. 10001469555)",keyTakeaway:"Baixe o manual no seu computador ou celular para consultar os parâmetros e grupos de controle durante o treinamento."}}]},{id:"mod-1",moduleNumber:1,title:"Fundamentos da IHM e Primeiro Acionamento",icon:"⚡",description:"Navegação pelas teclas da IHM, liberação de acesso aos parâmetros e partida local.",lessons:[{id:"l1-1",title:"Estrutura da IHM e Senha de Acesso (P0000)",durationMin:5,type:"THEORY",description:"Aprenda como a IHM WEG opera e como desbloquear a edição de parâmetros.",theoryData:{title:"Proteção por Senha e Modos da IHM",content:["A IHM do WEG CFW500 possui 3 modos de operação: Monitor (leitura), Seleção de Parâmetros (Pxxxx) e Edição (valor piscando).","Para liberar a alteração de parâmetros de controle, insira a senha mestra no parâmetro P0000 (valor padrão: 5).","Pressione PROG para entrar no modo de edição, ajuste com as setas ▲ e ▼ e confirme com PROG."],diagramInfo:"[MONIT: 0.0Hz] ➔ (PROG) ➔ [P0000] ➔ (PROG) ➔ [EDITAR: 5] ➔ (PROG) ➔ [LIBERADO]",keyTakeaway:"Sempre defina P0000 = 5 antes de tentar alterar qualquer parâmetro operacional."}},{id:"l1-2",title:"Prática: Desbloqueio e Partida em Modo Local",durationMin:8,type:"PRACTICE",description:"Desbloqueie o inversor no P0000, garanta o modo Local e acione o motor.",steps:[{id:"s1-1",title:"Desbloquear Acesso no P0000 (Definir como 5)",instruction:"Na IHM, aperte PROG em P0000, ajuste o valor para 5 com a seta ▲ e aperte PROG para salvar.",tip:"O inversor precisa estar com a senha 5 para liberar a parametrização.",isCompleted:t=>Pe(t,"P0000")===5||t.isUnlocked===!0},{id:"s1-2",title:"Garantir Modo Local (LOC)",instruction:"Pressione a tecla LOC/REM se necessário até o LED verde LOC acender no topo da IHM.",tip:"O inversor só aceita o comando RUN do teclado se estiver em modo LOC.",isCompleted:t=>t.controlSource==="LOC"||t.isLocal===!0},{id:"s1-3",title:"Ligar o Motor e Elevar Frequência",instruction:"Aperte a tecla verde I (RUN) e use a seta ▲ para acelerar o motor acima de 15.0 Hz.",tip:"Observe o motor girando e a frequência de saída subir.",isCompleted:t=>{const e=t.outputFrequency??0,n=t.targetFrequency??0,i=Pe(t,"P0121");return(t.motorStatus==="RUNNING"||e>.1||n>.1)&&(e>=15||n>=15||i>=15)}}]}]},{id:"mod-2",moduleNumber:2,title:"Dados do Motor e Rampas de Aceleração/Desaceleração",icon:"⚙️",description:"Configuração da curva V/F, corrente nominal e tempos de rampa (P0100 e P0101).",lessons:[{id:"l2-1",title:"Rampas Lineares de Aceleração e Parada",durationMin:6,type:"THEORY",description:"Compreenda a relação entre inércia da carga, tempo de rampa e corrente de pico.",theoryData:{title:"Ajuste de Rampas: P0100 (Aceleração) e P0101 (Desaceleração)",content:["O parâmetro P0100 define o tempo em segundos para acelerar de 0 até 60Hz.","O parâmetro P0101 define o tempo para desacelerar de 60Hz até a parada completa.","Rampas muito curtas em cargas pesadas causam sobrecorrente (F070) ou sobretensão (F021)."],diagramInfo:"P0100 (0 a 60Hz em T seg) | P0101 (60Hz a 0 em T seg)",keyTakeaway:"Ajuste P0100 e P0101 de acordo com o peso da carga para evitar disparos térmicos."}},{id:"l2-2",title:"Prática: Parametrizar Rampa Rápida e Rampa Suave",durationMin:10,type:"PRACTICE",description:"Configure P0100 para 3.0s e P0101 para 2.0s e teste o comportamento dinâmico.",steps:[{id:"s2-1",title:"Ajustar Rampa de Aceleração (P0100 = 3.0s)",instruction:"Acesse o parâmetro P0100 na IHM, pressione PROG, ajuste para 3.0 segundos e pressione PROG.",tip:"Ajuste para 3.0 com as setas e salve.",isCompleted:t=>{const e=Pe(t,"P0100");return e>=2.8&&e<=3.2}},{id:"s2-2",title:"Ajustar Rampa de Desaceleração (P0101 = 2.0s)",instruction:"Acesse o parâmetro P0101 na IHM, pressione PROG, configure para 2.0 segundos e pressione PROG.",tip:"Isso garantirá uma frenagem controlada rápida de 2 segundos.",isCompleted:t=>{const e=Pe(t,"P0101");return e>=1.8&&e<=2.2}},{id:"s2-3",title:"Testar Resposta Dinâmica (Ligar e Parar)",instruction:"Ligue o motor pela tecla I (RUN), aguarde acelerar e em seguida pressione a tecla O (STOP).",tip:"O inversor desacelerará até 0 Hz em 2 segundos.",isCompleted:t=>(t.motorStatus==="READY"||t.motorStatus==="STOPPED")&&t.outputFrequency<=.5}]}]},{id:"mod-3",moduleNumber:3,title:"Entradas Digitais (DI1 a DI4) e Modo Remoto",icon:"🔌",description:"Comando por chaves externas de borne com controle de partida e reversão de rotação.",lessons:[{id:"l3-1",title:"Comando a 2 Fios (Gira/Para) e Sentido de Giro",durationMin:6,type:"THEORY",description:"Como configurar as funções das entradas digitais P0263 a P0266 e a comutação REMOTO.",theoryData:{title:"Configuração dos Bornes da Régua de Controle",content:["O parâmetro P0263 define a função da entrada digital DI1 (Padrão: 1 = Gira/Para a 2 fios).","O parâmetro P0264 define a função da entrada digital DI2 (Padrão: 1 = Sentido de Giro Horário/Anti-horário).","Para que o inversor responda às chaves DI1 e DI2, o modo de controle deve estar em REMOTO."],diagramInfo:"[P0000=5] ➔ [LED REM ACESO] ➔ [DI1: ON = PARTIDA] ➔ [DI2: ON = SENTIDO REV]",keyTakeaway:"Em modo Remoto, os botões I (RUN) e ▲/▼ da IHM transferem o controle para os bornes."}},{id:"l3-2",title:"Prática: Ligar e Inverter Rotação pelos Bornes Externos",durationMin:10,type:"PRACTICE",description:"Comute para modo Remoto, acione a partida pela chave DI1 e execute a reversão pela chave DI2.",steps:[{id:"s3-1",title:"Comutar para Modo Remoto (LED REM Aceso)",instruction:"Pressione o botão LOC/REM na IHM até o LED verde REM acender.",tip:"Isso habilita os comandos vindos das chaves de borne.",isCompleted:t=>t.controlSource==="REM"||t.isLocal===!1},{id:"s3-2",title:"Ligar o Motor pela Chave Externa DI1",instruction:"Com o inversor em REM, clique na chave DI1 no painel de bornes (posição ON).",tip:"Observe o motor acelerar em sentido horário (FWD).",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ii(t,1)},{id:"s3-3",title:"Inverter Sentido de Giro pela Chave Externa DI2",instruction:"Com a chave DI1 ligada, clique na chave DI2 para fechar o contato e acionar a reversão.",tip:"O inversor desacelerará até 0 Hz e reacelerará em sentido anti-horário (REV).",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ii(t,1)&&ii(t,2)}]}]},{id:"mod-4",moduleNumber:4,title:"Velocidades Fixas Pré-Programadas (Multispeed)",icon:"📊",description:"Seleção digital de frequências pré-programadas através da comutação da entrada digital DI3.",lessons:[{id:"l4-1",title:"Tabela Lógica de Multispeed no CFW500",durationMin:7,type:"THEORY",description:"Entenda como os parâmetros P0124 e P0125 trabalham na seleção de velocidades.",theoryData:{title:"Controle de Velocidade em Etapas",content:["A função Multispeed permite selecionar velocidades fixas sem potenciômetro.","• DI3 = OFF ➔ Frequência P0124 (Velocidade 1: 15.0 Hz)","• DI3 = ON  ➔ Frequência P0125 (Velocidade 2: 35.0 Hz)","Ao comutar a chave DI3, o inversor aplica a rampa suavemente até a nova velocidade."],diagramInfo:"[DI3: OFF] = P0124 (15.0 Hz) ➔ [DI3: ON] = P0125 (35.0 Hz)",keyTakeaway:"Ideal para esteiras industriais com velocidade lenta de carga e rápida de transporte."}},{id:"l4-2",title:"Prática: Programar e Selecionar Velocidades por DI3",durationMin:12,type:"PRACTICE",description:"Configure P0124=15Hz, P0125=35Hz e alterne a velocidade pela chave digital DI3.",steps:[{id:"s4-1",title:"Ajustar Frequência Multispeed 1 (P0124 = 15Hz)",instruction:"Acesse o parâmetro P0124 na IHM e configure o valor para 15.0 Hz.",tip:"Esta será a primeira velocidade padrão do motor.",isCompleted:t=>{const e=Pe(t,"P0124");return e>=14&&e<=16}},{id:"s4-2",title:"Ajustar Frequência Multispeed 2 (P0125 = 35Hz)",instruction:"Acesse o parâmetro P0125 na IHM e configure o valor para 35.0 Hz.",tip:"Esta será a segunda velocidade (mais rápida).",isCompleted:t=>{const e=Pe(t,"P0125");return e>=34&&e<=36}},{id:"s4-3",title:"Ligar em Modo Remoto e Acionar DI3",instruction:"Comute para REM, ligue a chave DI1 para partir e acione a chave DI3 para comutar a rotação para 35.0 Hz.",tip:"Observe a velocidade subir suavemente pela rampa.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ii(t,1)&&ii(t,3)}]}]},{id:"mod-5",moduleNumber:5,title:'Entrada Analógica (0-10V) e Rampa em "S"',icon:"🎛️",description:"Controle contínuo de rotação via sinal analógico e curvas suaves de aceleração sem trancos.",lessons:[{id:"l5-1",title:"Entrada Analógica AI1 e Rampa em S",durationMin:6,type:"THEORY",description:"Dimensionamento do sinal analógico e suavização de esforços mecânicos.",theoryData:{title:"Potenciômetro e Suavização de Cargas Críticas",content:["A entrada analógica AI1 lê um sinal de 0 a 10V.","0V corresponde a 0.0 Hz e 10V corresponde à frequência máxima programada (P0134).",'A rampa em "S" insere uma curvatura suave evitando trancos mecânicos.'],diagramInfo:'0V (0 Hz) ➔ 5V (30 Hz) ➔ 10V (60 Hz) com curva amortecida em "S"',keyTakeaway:"A rampa em S protege engrenagens e caixas redutoras contra choque mecânico."}},{id:"l5-2",title:"Prática: Variar Velocidade pelo Potenciômetro Analógico",durationMin:8,type:"PRACTICE",description:"Defina a referência remota para analógica (P0222 = 1) e acelere o motor via potenciômetro.",steps:[{id:"s5-1",title:"Configurar Referência Remota via AI1 (P0222 = 1)",instruction:"Acesse o parâmetro P0222 e ajuste para 1 (Referência Remota via Entrada Analógica AI1).",tip:"Padrão WEG para controle por potenciômetro.",isCompleted:t=>Pe(t,"P0222")===1||Pe(t,"P0222")===0},{id:"s5-2",title:"Ligar em Modo Remoto (DI1=ON)",instruction:"Comute para REM e feche a chave DI1 para habilitar o acionamento do motor.",tip:"O motor responderá proporcionalmente ao potenciômetro.",isCompleted:t=>ii(t,1)&&(t.motorStatus==="RUNNING"||t.outputFrequency>.5)},{id:"s5-3",title:"Ajustar Potenciômetro para mais de 40 Hz",instruction:"Mova o cursor analógico para cima até atingir mais de 40.0 Hz de rotação.",tip:"Veja a rotação do motor aumentar em tempo real.",isCompleted:t=>t.outputFrequency>=40}]}]},{id:"mod-6",moduleNumber:6,title:"Função Sleep / Modo Dormir (P0217 e P0218)",icon:"💤",description:"Desligamento automático inteligente para sistemas de bombeamento e economia de energia.",lessons:[{id:"l6-1",title:"Princípio do Modo Sleep para Economia de Energia",durationMin:6,type:"THEORY",description:"Entenda como o inversor suspende o motor quando a demanda cai abaixo do limite.",theoryData:{title:"Automação de Bombas de Pressurização",content:["Em sistemas de bombeamento com válvulas fechadas, o motor não precisa continuar girando.","O parâmetro P0217 define a frequência de dormir e P0218 define o tempo de atraso para desligamento.","Assim que a demanda sobe, o inversor acorda automaticamente."],diagramInfo:"Referência < P0217 por P0218 seg ➔ Desliga Motor (0Hz)",keyTakeaway:"Economiza eletricidade e evita o superaquecimento do fluido na bomba."}},{id:"l6-2",title:"Prática: Parametrizar Limiar de Dormir (P0217 = 20Hz)",durationMin:8,type:"PRACTICE",description:"Configure P0217 para 20 Hz e o atraso P0218 para 5 segundos na IHM.",steps:[{id:"s6-1",title:"Ajustar Frequência de Sleep (P0217 = 20Hz)",instruction:"Acesse o parâmetro P0217 na IHM e configure o valor para 20.0 Hz.",tip:"Abaixo de 20 Hz, o inversor iniciará a contagem regressiva para repouso.",isCompleted:t=>{const e=Pe(t,"P0217");return e>=18&&e<=22}},{id:"s6-2",title:"Definir Tempo de Atraso de Sleep (P0218 = 5.0s)",instruction:"Acesse o parâmetro P0218 e configure para 5.0 segundos.",tip:"Tempo de filtro para evitar desligamentos falsos por oscilação de pressão.",isCompleted:t=>{const e=Pe(t,"P0218");return e>=4&&e<=6}}]}]},{id:"mod-7",moduleNumber:7,title:"Frenagem por Injeção de Corrente Contínua (CC)",icon:"🛑",description:"Parada ultrarrápida e travamento de eixo magnético em máquinas de alta inércia.",lessons:[{id:"l7-1",title:"Teoria da Frenagem CC (P0150 e P0151)",durationMin:5,type:"THEORY",description:"Como a corrente contínua cria um torque de travamento no estator.",theoryData:{title:"Frenagem Elétrica sem Resistores Externos",content:["O inversor injeta CC no estator gerando um campo estático que trava o rotor.","O parâmetro P0150 define o tempo de duração e P0151 define a frequência de início da injeção.","Ideal para serras, exaustores e centrífugas industriais."],diagramInfo:"Desacelera normal ➔ Atinge P0151 (5Hz) ➔ Injeta CC por P0150 seg ➔ Eixo Travado",keyTakeaway:"Garante a parada do eixo mecânico sem rotação residual perigosa."}},{id:"l7-2",title:"Prática: Programar Injeção CC na Parada",durationMin:8,type:"PRACTICE",description:"Configure P0150 para 2.0s e P0151 para 5.0Hz na IHM.",steps:[{id:"s7-1",title:"Ajustar Duração da Frenagem CC (P0150 = 2.0s)",instruction:"Acesse o parâmetro P0150 e defina o tempo em 2.0 segundos.",tip:"Tempo em que o campo magnético de parada atuará.",isCompleted:t=>{const e=Pe(t,"P0150");return e>=1.5&&e<=2.5}},{id:"s7-2",title:"Ajustar Frequência de Início CC (P0151 = 5.0Hz)",instruction:"Acesse o parâmetro P0151 e configure para 5.0 Hz.",tip:"Abaixo de 5 Hz, a rampa cessa e o freio CC atua.",isCompleted:t=>{const e=Pe(t,"P0151");return e>=4&&e<=6}}]}]},{id:"mod-8",moduleNumber:8,title:"Diagnóstico de Falhas (F070) e Reset Operacional",icon:"🚨",description:"Identificação de falha de sobrecorrente e procedimento seguro de rearme.",lessons:[{id:"l8-1",title:"Principais Códigos de Falha do CFW500",durationMin:7,type:"THEORY",description:"Tabela de códigos de alarme e falhas do inversor.",theoryData:{title:"Guia de Diagnóstico de Campo",content:["• F006: Subtensão no Link CC (rede caiu).","• F070: Sobrecorrente / Curto-circuito na saída.","• F072: Sobrecarga térmica no motor (Ixt).","• F021: Sobretensão no barramento CC."],diagramInfo:"FALHA ATIVA ➔ Display pisca [F0xx] ➔ Inspecionar Carga ➔ Tecla STOP (O) para Reset",keyTakeaway:"Sempre identifique e elimine a causa raiz antes de resetar falhas repetitivas."}},{id:"l8-2",title:"Prática: Simular Falha F070 e Efetuar Reset",durationMin:10,type:"PRACTICE",description:"Injete a falha F070 pelo painel de testes e efetue o rearme pela tecla STOP/RESET.",steps:[{id:"s8-1",title:"Verificar Disparo de Falha (F070)",instruction:'No painel de Falhas / Injeção, clique em "Injetar F070 (Sobrecorrente)".',tip:"O display começará a piscar o código F070.",isCompleted:t=>t.motorStatus==="FAULT"||!!t.activeFault},{id:"s8-2",title:"Executar Reset Seguro pela IHM",instruction:"Pressione a tecla vermelha O (STOP/RESET) na IHM para rearmar o inversor.",tip:"O inversor voltará ao estado PRONTO (READY) com 0.0 Hz.",isCompleted:t=>(t.motorStatus==="READY"||t.motorStatus==="STOPPED")&&!t.activeFault}]}]},{id:"mod-9",moduleNumber:9,title:"Rede e Comunicação Industrial (Modbus RTU / RS485)",icon:"🌐",description:"Integração do CFW500 com PLCs, CLPs industriais e sistemas SCADA.",lessons:[{id:"l9-1",title:"Arquitetura de Comunicação Serial RS485",durationMin:6,type:"THEORY",description:"Endereçamento de rede, baud rate e registradores Modbus.",theoryData:{title:"Parâmetros de Rede: P0308 e P0310",content:["O WEG CFW500 possui porta serial RS485 nativa com protocolo Modbus RTU.","• P0308: Endereço do escravo na rede (1 a 247).","• P0310: Taxa de transmissão serial (1 = 19200 bps)."],diagramInfo:"CLP Mestre (RS485) ➔ Inversor Escravo (P0308=2)",keyTakeaway:"Utilize cabo blindado com par trançado e resistor de terminação de 120 ohms."}},{id:"l9-2",title:"Prática: Configurar Endereço de Rede Modbus (P0308 = 2)",durationMin:8,type:"PRACTICE",description:"Parametrize o endereço do inversor na rede RS485 para controle remoto via CLP.",steps:[{id:"s9-1",title:"Definir Endereço de Rede (P0308 = 2)",instruction:"Acesse o parâmetro P0308 na IHM e configure o endereço para 2.",tip:"Identifica o escravo na rede RS485.",isCompleted:t=>Pe(t,"P0308")===2},{id:"s9-2",title:"Verificar Taxa de Transmissão (P0310 = 1)",instruction:"Acesse P0310 e certifique-se de que está ajustado em 1 (19200 bps).",tip:"Velocidade padrão de 19200 bps.",isCompleted:t=>Pe(t,"P0310")===1}]}]},{id:"mod-10",moduleNumber:10,title:"Desafio 1: Diagnóstico de Falha de Partida em Modo Remoto",icon:"🔍",description:"O operador fechou a chave externa de comando, o display acusa REM, mas o inversor ignora o sinal de partida. Descubra a causa raiz e repare o acionamento.",lessons:[{id:"l10-1",title:"Cenário: Chave de Partida Acionada sem Resposta do Motor",durationMin:10,type:"PRACTICE",description:"Analise os grupos de parametrização de origem de comando remoto e as funções dos bornes digitais para restabelecer a operação.",steps:[{id:"s10-1",title:"Corrigir Origem de Partida em Modo Remoto",instruction:"Identifique na memória do inversor qual registro define a fonte do comando Gira/Para quando em controle remoto e configure-o para aceitar os bornes físicos.",tip:"Investigue o grupo de seleção de comandos remotos.",isCompleted:t=>Pe(t,"P0227")===1},{id:"s10-2",title:"Validar Função da Entrada Digital de Partida",instruction:"Acesse a configuração da primeira entrada digital da régua de bornes e assegure que sua função esteja programada como comando de Partida/Parada (Gira/Para).",tip:"Consulte a lista de funções das entradas digitais.",isCompleted:t=>Pe(t,"P0263")===1},{id:"s10-3",title:"Testar e Validar Acionamento em Campo",instruction:"Comute a IHM para modo Remoto e feche a chave de partida no painel para confirmar que o motor acelera normalmente.",tip:"A frequência de saída deve se elevar e o status mudar para operação.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ii(t,1)&&(t.motorStatus==="RUNNING"||t.outputFrequency>.5)}]}]},{id:"mod-11",moduleNumber:11,title:"Desafio 2: Proteção Térmica e Subfrequência em Bomba Centrífuga",icon:"💧",description:"Uma bomba de recalque industrial está sofrendo aquecimento e cavitação quando o operador reduz a rotação. Aplique as proteções necessárias.",lessons:[{id:"l11-1",title:"Cenário: Proteção Hidráulica e Limite Térmico de Corrente",durationMin:12,type:"PRACTICE",description:"Imponha um piso de segurança para a rotação mínima do rotor e calibre a corrente nominal exata de proteção térmica do enrolamento.",steps:[{id:"s11-1",title:"Parametrizar Piso de Velocidade Mínima de Segurança",instruction:"Localize a configuração de limite inferior de frequência e ajuste-a para 20.0 Hz, impedindo que a bomba trabalhe sem fluxo de refrigeração.",tip:"Procure o parâmetro de frequência mínima no grupo de limites.",isCompleted:t=>{const e=Pe(t,"P0133");return e>=19.5&&e<=20.5}},{id:"s11-2",title:"Calibrar Proteção de Sobrecarga Térmica do Motor",instruction:"A placa de identificação da bomba especifica corrente de serviço contínua de 4.8 A. Ajuste o limite térmico de sobrecarga para exatamente 4.8 A.",tip:"Ajuste a corrente de sobrecarga térmica do motor.",isCompleted:t=>{const e=Pe(t,"P0156");return e>=4.7&&e<=4.9}},{id:"s11-3",title:"Validar Estabilidade com Referência no Mínimo",instruction:"Ligue o comando de partida em modo remoto e posicione o sinal analógico no zero. A rotação deve se manter perfeitamente travada no piso de segurança.",tip:"Verifique se a frequência de saída não desce abaixo do limite estabelecido.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ii(t,1)&&t.outputFrequency>=19&&t.outputFrequency<=21}]}]},{id:"mod-12",moduleNumber:12,title:"Comissionamento: Esteira Transportadora de Embalagens",icon:"🍾",description:"Linha de envase de produtos de vidro. Exige partida progressiva para não tombar frascos e parada controlada por frenagem elétrica.",lessons:[{id:"l12-1",title:"Adequação da Dinâmica Mecânica da Esteira",durationMin:12,type:"PRACTICE",description:"Configure o formato da aceleração para curva amortecida, defina o tempo de subida em 8.0s e programe a frenagem estática na parada em 1.5s.",steps:[{id:"s12-1",title:"Ativar Perfil de Aceleração com Curvatura Suave",instruction:"Modifique o formato padrão da rampa de linear para Curva S para eliminar solavancos mecânicos no instante da partida.",tip:"Ajuste o parâmetro que altera o formato da rampa.",isCompleted:t=>Pe(t,"P0104")===1},{id:"s12-2",title:"Programar Tempo de Rampa de Subida",instruction:"Ajuste o tempo da primeira rampa de aceleração da máquina para 8.0 segundos.",tip:"Configure o parâmetro principal de tempo de aceleração.",isCompleted:t=>{const e=Pe(t,"P0100");return e>=7.8&&e<=8.2}},{id:"s12-3",title:"Configurar Duração da Frenagem por Injeção CC",instruction:"Ajuste o tempo de aplicação do campo estático de frenagem CC na parada para 1.5 segundos, garantindo imobilização rápida.",tip:"Localize o tempo de duração da frenagem CC.",isCompleted:t=>{const e=Pe(t,"P0150");return e>=1.4&&e<=1.6}}]}]},{id:"mod-13",moduleNumber:13,title:"Comissionamento: Exaustor com Salto de Ressonância (Bypass)",icon:"🌪️",description:"Um sistema de ventilação entra em ressonância mecânica destrutiva aos 25.0 Hz e precisa desligar automaticamente quando a pressão estabilizar.",lessons:[{id:"l13-1",title:"Proteção contra Vibração Estrutural e Repouso Automático",durationMin:12,type:"PRACTICE",description:"Parametrize o salto da faixa crítica de vibração e ative a lógica de repouso automático com atraso.",steps:[{id:"s13-1",title:"Definir Ponto Crítico de Salto Mecânico",instruction:"Insira a frequência de ressonância mecânica em 25.0 Hz para que o inversor transite por ela sem permanecer estacionado.",tip:"Ajuste a frequência de rejeição / bypass mecânico.",isCompleted:t=>{const e=Pe(t,"P0169");return e>=24.5&&e<=25.5}},{id:"s13-2",title:"Ajustar Limiar de Frequência para Repouso Automático",instruction:"Configure a frequência de acionamento do modo dormir para 18.0 Hz.",tip:"Ajuste o valor do limiar de sleep.",isCompleted:t=>{const e=Pe(t,"P0217");return e>=17.5&&e<=18.5}},{id:"s13-3",title:"Definir Tempo de Atraso para Entrada em Repouso",instruction:"Programe o temporizador de confirmação de inatividade em 6.0 segundos antes de suspender a modulação.",tip:"Ajuste o atraso do modo dormir.",isCompleted:t=>{const e=Pe(t,"P0218");return e>=5.5&&e<=6.5}}]}]},{id:"mod-14",moduleNumber:14,title:"Desafio 3: Solução de Sobretensão no Barramento CC (F021)",icon:"⚡",description:"Uma centrífuga industrial desarma por sobretensão interna no barramento contínuo toda vez que recebe ordem de parada rápida. Solucione o problema.",lessons:[{id:"l14-1",title:"Cenário: Regeneração Excessiva em Carga de Alta Inércia",durationMin:14,type:"PRACTICE",description:"Readeque a rampa de desaceleração para 12.0s e regule a tensão de frenagem CC para 15.0%.",steps:[{id:"s14-1",title:"Alongar o Tempo de Desaceleração Controlada",instruction:"Aumente o tempo da rampa de descida para 12.0 segundos, reduzindo a taxa de regeneração de energia para o barramento CC.",tip:"Ajuste o tempo da primeira rampa de desaceleração.",isCompleted:t=>{const e=Pe(t,"P0101");return e>=11.5&&e<=12.5}},{id:"s14-2",title:"Calibrar Tensão de Injeção de Frenagem CC",instruction:"Ajuste o nível percentual de tensão de frenagem CC para 15.0% para garantir frenagem magnética suave.",tip:"Localize a configuração de nível de tensão de frenagem CC.",isCompleted:t=>{const e=Pe(t,"P0142");return e>=14&&e<=16}},{id:"s14-3",title:"Validar Ciclo Operacional Completo",instruction:"Em modo Local, acelere o motor até a velocidade máxima e pressione STOP. O motor deve desacelerar sem apresentar código de falha.",tip:"Aguarde a parada completa em 0.0 Hz.",isCompleted:t=>(t.motorStatus==="READY"||t.motorStatus==="STOPPED")&&!t.activeFault&&Pe(t,"P0101")>=11.5}]}]},{id:"mod-15",moduleNumber:15,title:"Comissionamento: Içamento de Cargas em Ponte Rolante",icon:"🏗️",description:"Sistema de elevação de carga que necessita de velocidades fixas pré-programadas para aproximação milimétrica, média, transporte e velocidade máxima.",lessons:[{id:"l15-1",title:"Programação dos Estágios de Velocidade Fixa",durationMin:15,type:"PRACTICE",description:"Programe os 4 primeiros estágios de velocidades digitais conforme os requisitos de projeto: 10.0 Hz, 25.0 Hz, 45.0 Hz e 60.0 Hz.",steps:[{id:"s15-1",title:"Programar Velocidade de Posicionamento Lento",instruction:"Defina a primeira frequência da tabela de velocidades fixas em 10.0 Hz.",tip:"Ajuste o primeiro estágio da tabela de multispeed.",isCompleted:t=>{const e=Pe(t,"P0124");return e>=9.5&&e<=10.5}},{id:"s15-2",title:"Programar Velocidade Intermediária",instruction:"Defina a segunda frequência da tabela de velocidades fixas em 25.0 Hz.",tip:"Ajuste o segundo estágio da tabela de multispeed.",isCompleted:t=>{const e=Pe(t,"P0125");return e>=24.5&&e<=25.5}},{id:"s15-3",title:"Programar Velocidade de Transporte Rápido",instruction:"Defina a terceira frequência da tabela de velocidades fixas em 45.0 Hz.",tip:"Ajuste o terceiro estágio da tabela de multispeed.",isCompleted:t=>{const e=Pe(t,"P0126");return e>=44.5&&e<=45.5}},{id:"s15-4",title:"Programar Velocidade Máxima de Içamento",instruction:"Defina a quarta frequência da tabela de velocidades fixas em 60.0 Hz.",tip:"Ajuste o quarto estágio da tabela de multispeed.",isCompleted:t=>{const e=Pe(t,"P0127");return e>=59&&e<=61}}]}]},{id:"mod-16",moduleNumber:16,title:"Desafio 4: Motor Travado na Partida por Falta de Torque Inicial",icon:"🔩",description:"Um moinho triturador com material acumulado na câmara não consegue quebrar a inércia estática e trava na partida. Aumente a força inicial.",lessons:[{id:"l16-1",title:"Cenário: Carga com Alto Conjugado Resistente Estático",durationMin:14,type:"PRACTICE",description:"Aplique reforço de magnetização em baixas rotações, amplie o teto de corrente momentânea e ative a correção de escorregamento.",steps:[{id:"s16-1",title:"Elevar o Reforço de Torque Manual na Partida",instruction:"Aumente a compensação de torque manual da curva V/F para 12.0%, elevando a tensão aplicada nas frequências de 0 a 10 Hz.",tip:"Localize o parâmetro de Boost de Torque Manual.",isCompleted:t=>{const e=Pe(t,"P0136");return e>=11.5&&e<=12.5}},{id:"s16-2",title:"Ajustar o Teto de Corrente Máxima de Partida",instruction:"Permita que o inversor forneça até 15.0 A de corrente instantânea para vencer o travamento mecânico.",tip:"Ajuste o limite de corrente máxima de saída.",isCompleted:t=>{const e=Pe(t,"P0135");return e>=14.5&&e<=15.5}},{id:"s16-3",title:"Ativar Compensação de Queda de Rotação por Carga",instruction:"Ajuste a compensação de escorregamento do rotor em 3.0% para manter a velocidade constante sob esforço.",tip:"Ajuste o parâmetro de compensação de escorregamento.",isCompleted:t=>{const e=Pe(t,"P0138");return e>=2.8&&e<=3.2}}]}]},{id:"mod-17",moduleNumber:17,title:"Comissionamento: Compressor de Parafuso e Pressurização",icon:"💨",description:"Compressor rotativo de ar comprimido. Exige dinâmica de alívio rápido, velocidade mínima para circulação de óleo e ruído eletromagnético reduzido.",lessons:[{id:"l17-1",title:"Parametrização Específica para Compressores Industriais",durationMin:15,type:"PRACTICE",description:"Ajuste as rampas para 4.0s de subida e 3.0s de descida, fixe o piso de lubrificação em 25.0 Hz e eleve a portadora PWM para 10.0 kHz.",steps:[{id:"s17-1",title:"Ajustar Rampa de Carga",instruction:"Defina o tempo de aceleração em 4.0 segundos.",tip:"Ajuste o tempo de aceleração.",isCompleted:t=>{const e=Pe(t,"P0100");return e>=3.8&&e<=4.2}},{id:"s17-2",title:"Ajustar Rampa de Alívio Rápido",instruction:"Defina o tempo de desaceleração em 3.0 segundos para fechamento rápido de válvula.",tip:"Ajuste o tempo de desaceleração.",isCompleted:t=>{const e=Pe(t,"P0101");return e>=2.8&&e<=3.2}},{id:"s17-3",title:"Fixar Piso de Rotação para Bombeamento de Óleo",instruction:"Configure a frequência mínima em 25.0 Hz para assegurar a película de lubrificação no elemento compressor.",tip:"Ajuste o limite de frequência mínima.",isCompleted:t=>{const e=Pe(t,"P0133");return e>=24.5&&e<=25.5}},{id:"s17-4",title:"Ajustar Frequência de Chaveamento Silenciosa",instruction:"Eleve a frequência de chaveamento PWM para 10.0 kHz para eliminar o ruído audível na casa de máquinas.",tip:"Ajuste a frequência de chaveamento PWM dos IGBTs.",isCompleted:t=>{const e=Pe(t,"P0139");return e>=9.5&&e<=10.5}}]}]},{id:"mod-18",moduleNumber:18,title:"Desafio 5: Otimização Térmica dos IGBTs e Redução de Ruído",icon:"🔥",description:"Um técnico elevou a frequência PWM ao máximo e o inversor agora desarma por sobreaquecimento nos transistores de potência. Recalibre o sistema.",lessons:[{id:"l18-1",title:"Cenário: Perdas Excessivas por Comutação no Módulo IGBT",durationMin:12,type:"PRACTICE",description:"Reduza a taxa de chaveamento para 5.0 kHz e habilite o algoritmo de rebaixamento térmico automático.",steps:[{id:"s18-1",title:"Recalibrar Frequência de Chaveamento PWM",instruction:"Ajuste a frequência PWM para 5.0 kHz para diminuir as perdas térmicas por comutação nos semicondutores.",tip:"Ajuste a frequência de chaveamento PWM.",isCompleted:t=>{const e=Pe(t,"P0139");return e>=4.8&&e<=5.2}},{id:"s18-2",title:"Habilitar Redução Automática de PWM por Temperatura",instruction:"Ative a proteção inteligente que diminui o PWM automaticamente se o dissipador atingir temperatura crítica.",tip:"Habilite o parâmetro de redução de PWM automática.",isCompleted:t=>Pe(t,"P0297")===1},{id:"s18-3",title:"Validar Estabilidade de Temperatura do Dissipador",instruction:"Acesse o parâmetro de leitura da temperatura interna dos IGBTs na IHM para validar a estabilidade.",tip:"Consulte o parâmetro de leitura de temperatura.",isCompleted:t=>Pe(t,"P0139")<=5.2&&Pe(t,"P0297")===1}]}]},{id:"mod-19",moduleNumber:19,title:"Comissionamento: Misturador Químico com Reversão Cíclica",icon:"🧪",description:"Tanque de homogeneização que realiza bateladas alternando o sentido de rotação das pás através de sinal digital de CLP.",lessons:[{id:"l19-1",title:"Parametrização de Transições Suaves de Inversão",durationMin:15,type:"PRACTICE",description:"Configure a entrada DI2 para inversão de giro, estabeleça rampas simétricas de 4.0s e teste a reversão em modo remoto.",steps:[{id:"s19-1",title:"Configurar Entrada Digital para Sentido de Giro",instruction:"Programe a segunda entrada digital da régua de bornes com a função de comando de Sentido de Giro.",tip:"Ajuste a função da entrada DI2.",isCompleted:t=>Pe(t,"P0264")===1},{id:"s19-2",title:"Equalizar Tempos de Aceleração e Desaceleração",instruction:"Ajuste tanto o tempo de aceleração quanto o de desaceleração para exatamente 4.0 segundos.",tip:"Configure os tempos das rampas de subida e descida.",isCompleted:t=>{const e=Pe(t,"P0100"),n=Pe(t,"P0101");return e>=3.8&&e<=4.2&&n>=3.8&&n<=4.2}},{id:"s19-3",title:"Executar Ciclo de Reversão em Modo Remoto",instruction:"Em modo REM, acione a partida pela chave DI1 e, em seguida, feche a chave DI2 para testar a rampa de inversão completa.",tip:"Observe a passagem por 0.0 Hz e a rotação no sentido inverso.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ii(t,1)&&ii(t,2)}]}]},{id:"mod-20",moduleNumber:20,title:"Desafio Mestre: Comissionamento Completo de Retificadora CNC",icon:"🏆",description:"O teste definitivo: parametrização integral a partir da placa do motor, seleção de controle vetorial sensorless e integração na rede RS485 da máquina.",lessons:[{id:"l20-1",title:"Parametrização Integral de Todos os Grupos Funcionais",durationMin:20,type:"PRACTICE",description:"Insira os dados elétricos de placa, ative o controle vetorial VVW e configure os parâmetros de comunicação serial.",steps:[{id:"s20-1",title:"Inserir Dados de Tensão, Frequência e Rotação Nominal",instruction:"Acesse o grupo de dados do motor e programe: Tensão Nominal = 220 V, Frequência Nominal = 60.0 Hz e Rotação Nominal = 1750 RPM.",tip:"Localize os parâmetros de placa do motor.",isCompleted:t=>Pe(t,"P0400")===220&&Pe(t,"P0401")>=59&&Pe(t,"P0402")>=1700},{id:"s20-2",title:"Ajustar Corrente e Potência Nominal do Motor",instruction:"Programe a Corrente Nominal em 4.5 A e a Potência Nominal em 1.5 cv nos parâmetros correspondentes.",tip:"Ajuste corrente e potência de placa.",isCompleted:t=>{const e=Pe(t,"P0403"),n=Pe(t,"P0404");return e>=4.4&&e<=4.6&&n>=1.4&&n<=1.6}},{id:"s20-3",title:"Selecionar Modo de Controle Vetorial Sensorless (VVW)",instruction:"Altere o algoritmo de controle do inversor de Escalar (V/F) para Controle Vetorial VVW para assegurar alto torque e rigidez em baixas rotações.",tip:"Altere o método de controle.",isCompleted:t=>Pe(t,"P0202")===2},{id:"s20-4",title:"Configurar Endereço e Taxa de Rede Serial do CNC",instruction:"Defina o endereço escravo da rede Modbus RS485 para 5 e certifique-se de que a taxa de comunicação esteja em 19200 bps.",tip:"Ajuste os parâmetros de comunicação serial.",isCompleted:t=>Pe(t,"P0308")===5&&Pe(t,"P0310")===1},{id:"s20-5",title:"Concluir Comissionamento Geral da Máquina",instruction:"Certifique-se de que todos os parâmetros foram gravados na memória e que o acesso mestre permaneça validado com senha.",tip:"Validação final de comissionamento.",isCompleted:t=>Pe(t,"P0202")===2&&Pe(t,"P0308")===5&&Pe(t,"P0400")===220}]}]}],$i=(t,e)=>{if(!t||!t.parameters)return 0;const n=t.parameters[e];return n==null?0:typeof n=="object"&&"currentValue"in n?Number(n.currentValue??0):Number(n??0)},Eo=(t,e)=>t?Array.isArray(t.digitalInputs)?!!t.digitalInputs[e-1]:t.digitalInputs&&typeof t.digitalInputs=="object"?!!(t.digitalInputs[`DI${e}`]??t.digitalInputs[`di${e}`]??t.digitalInputs[String(e)]):!1:!1,T0=[{id:"cfw300-mod-1",moduleNumber:1,title:"IHM do CFW300 e Desbloqueio P0000",icon:"⚡",description:"Navegação pela IHM compacta do inversor CFW300, liberação de escrita no P0000 e acionamento local.",lessons:[{id:"c300-l1-1",title:"Operação da IHM Compacta e Senha Mestra",durationMin:5,type:"THEORY",description:"Conheça o display LED de 4 dígitos e a lógica de parametrização do inversor micro CFW300.",theoryData:{title:"Estrutura da IHM e Parâmetro P0000",content:["O WEG CFW300 é um microinversor compacto voltado para máquinas e esteiras de pequeno porte.","Por padrão de fábrica da WEG, para alterar parâmetros de ajuste o usuário deve inserir o valor 5 no parâmetro P0000.","A tecla PROG seleciona o parâmetro e confirma o novo valor programado."],diagramInfo:"[DISPLAY: 0.0] ➔ (PROG) ➔ [P0000] ➔ (PROG) ➔ [VALOR: 5] ➔ (PROG) ➔ [LIBERADO]",keyTakeaway:"Sempre insira P0000 = 5 antes de iniciar a parametrização do inversor CFW300."}},{id:"c300-l1-2",title:"Prática: Desbloqueio e Partida Local no CFW300",durationMin:8,type:"PRACTICE",description:"Insira a senha mestra 5 no P0000, verifique o modo Local e dê a primeira partida.",steps:[{id:"c300-s1-1",title:"Desbloquear o Acesso no P0000",instruction:"Acesse o parâmetro P0000, pressione PROG, insira o valor 5 e pressione PROG para confirmar.",tip:"O parâmetro P0000 deve ficar com o valor 5.",isCompleted:t=>$i(t,"P0000")===5||t.isUnlocked===!0},{id:"c300-s1-2",title:"Verificar Modo Local",instruction:"Certifique-se de que o inversor está em modo Local (LED LOC aceso).",tip:"Use a tecla LOC/REM se necessário.",isCompleted:t=>t.controlSource==="LOC"||t.isLocal===!0},{id:"c300-s1-3",title:"Ligar e Acelerar o Motor",instruction:"Pressione a tecla I (RUN) e eleve a frequência acima de 20.0 Hz usando as setas ▲.",tip:"A frequência de saída deve subir no display.",isCompleted:t=>(t.motorStatus==="RUNNING"||(t.outputFrequency??0)>.1)&&((t.outputFrequency??0)>=20||(t.targetFrequency??0)>=20)}]}]},{id:"cfw300-mod-2",moduleNumber:2,title:"Dados do Motor e Parametrização Escalar V/F",icon:"⚙️",description:"Inserção dos dados de catálogo do motor e configuração dos limites de frequência P0133 e P0134.",lessons:[{id:"c300-l2-1",title:"Configuração da Faixa Operacional e Placa",durationMin:6,type:"THEORY",description:"Como o CFW300 calcula a curva V/F e protege contra rotação excessiva.",theoryData:{title:"Limites de Frequência no CFW300",content:["• P0133: Frequência mínima do motor (padrão 0.0 Hz).","• P0134: Frequência máxima de saída permitida (padrão 60.0 Hz ou até 400.0 Hz em retíficas).","• P0156: Corrente de sobrecarga térmica para proteção do motor."],diagramInfo:"P0133 (Frequência Mínima) ➔ Faixa Linear V/F ➔ P0134 (Frequência Máxima)",keyTakeaway:"Sempre configure P0133 e P0134 antes de liberar o inversor para produção."}},{id:"c300-l2-2",title:"Prática: Programar Frequência Máxima e Rampas",durationMin:10,type:"PRACTICE",description:"Ajuste a frequência máxima P0134 para 65.0 Hz e a aceleração P0100 para 2.5s.",steps:[{id:"c300-s2-1",title:"Ajustar Frequência Máxima (P0134 = 65.0 Hz)",instruction:"Acesse o parâmetro P0134 na IHM e configure o valor para 65.0 Hz.",tip:"Defina P0134 em 65.0.",isCompleted:t=>{const e=$i(t,"P0134");return e>=64&&e<=66}},{id:"c300-s2-2",title:"Programar Tempo de Aceleração Rápida (P0100 = 2.5s)",instruction:"Acesse P0100 e ajuste o tempo de subida para 2.5 segundos.",tip:"Ajuste P0100 = 2.5.",isCompleted:t=>{const e=$i(t,"P0100");return e>=2.3&&e<=2.7}},{id:"c300-s2-3",title:"Testar e Validar Resposta",instruction:"Ligue o motor em modo Local e comprove a aceleração até a velocidade máxima.",tip:"Acelere o motor com a tecla ▲ até atingir a nova velocidade.",isCompleted:t=>(t.motorStatus==="RUNNING"||(t.outputFrequency??0)>.5)&&(t.outputFrequency??0)>=60}]}]},{id:"cfw300-mod-3",moduleNumber:3,title:"Entradas Digitais e Bornes Remotos do CFW300",icon:"🔌",description:"Comando por chaves a 2 fios (Gira/Para e Sentido de Giro) nas entradas digitais integradas.",lessons:[{id:"c300-l3-1",title:"Régua de Controle e Funções P0263 a P0266",durationMin:7,type:"THEORY",description:"Atribuição de funções das entradas DI1 a DI4 no inversor compacto.",theoryData:{title:"Configuração de Bornes no CFW300",content:["O CFW300 possui entradas digitais configuráveis na régua de controle.","• P0263: Função da entrada digital DI1 (1 = Gira/Para).","• P0264: Função da entrada digital DI2 (1 = Sentido de Giro Horário/Anti-horário).","• P0220: Seleção da fonte Local/Remoto."],diagramInfo:"[DI1: ON = RUN] | [DI2: ON = SENTIDO REV] em Modo Remoto (LED REM)",keyTakeaway:"Em modo REM, o CFW300 obedece diretamente às chaves da régua de bornes."}},{id:"c300-l3-2",title:"Prática: Partida e Reversão Remota no CFW300",durationMin:10,type:"PRACTICE",description:"Comute para REM, ligue DI1 e realize a reversão de giro acionando DI2.",steps:[{id:"c300-s3-1",title:"Comutar para Modo Remoto",instruction:"Pressione a tecla LOC/REM para acender o LED verde REM no inversor.",tip:"Transfere o controle para os bornes.",isCompleted:t=>t.controlSource==="REM"||t.isLocal===!1},{id:"c300-s3-2",title:"Ligar o Motor pela Chave DI1",instruction:"Feche a chave digital DI1 para acionar o motor em sentido direto.",tip:"O motor deve acelerar em FWD.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&Eo(t,1)},{id:"c300-s3-3",title:"Comutar Sentido de Giro pela Chave DI2",instruction:"Com DI1 ligada, acione a chave DI2 para inverter o giro para sentido anti-horário (REV).",tip:"O inversor desacelera até 0 e reacelera em rotação invertida.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&Eo(t,1)&&Eo(t,2)}]}]},{id:"cfw300-mod-4",moduleNumber:4,title:"Desafio CFW300 1: Parametrização de Micro-Esteira Seletora",icon:"🔍",description:"Uma micro-esteira de bancada requer 2 velocidades digitais: 12.0 Hz para inspeção visual e 40.0 Hz para descarte rápido sem uso de potenciômetro.",lessons:[{id:"c300-l4-1",title:"Cenário: Programação de Velocidades Fixas no CFW300",durationMin:12,type:"PRACTICE",description:"Analise os parâmetros de velocidade pré-programada (Multispeed) do CFW300 e calibre os dois estágios solicitados.",steps:[{id:"c300-s4-1",title:"Programar Frequência do Estágio 1 (Inspeção Lenta)",instruction:"Localize na memória do inversor a primeira frequência da tabela de velocidades pré-programadas e ajuste para 12.0 Hz.",tip:"Acesse o primeiro estágio de multispeed do CFW300.",isCompleted:t=>{const e=$i(t,"P0124");return e>=11.5&&e<=12.5}},{id:"c300-s4-2",title:"Programar Frequência do Estágio 2 (Descarte Rápido)",instruction:"Localize a segunda frequência da tabela de velocidades pré-programadas e ajuste para 40.0 Hz.",tip:"Acesse o segundo estágio de multispeed do CFW300.",isCompleted:t=>{const e=$i(t,"P0125");return e>=39&&e<=41}},{id:"c300-s4-3",title:"Validar Seleção em Modo Remoto",instruction:"Em modo REM, ligue a chave de partida DI1 e acione a chave seletora DI3 para comutar para a velocidade rápida.",tip:"A rotação deve atingir a velocidade correspondente ao estágio 2.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&Eo(t,1)&&Eo(t,3)}]}]},{id:"cfw300-mod-5",moduleNumber:5,title:"Desafio CFW300 2: Diagnóstico e Proteção Térmica em Ventilador",icon:"🌪️",description:"Um micro-ventilador de painel está sofrendo sobreaquecimento por operação em rampa excessivamente curta. Reajuste a dinâmica e a corrente térmica.",lessons:[{id:"c300-l5-1",title:"Cenário: Sobrecarga na Partida e Parametrização Segura",durationMin:12,type:"PRACTICE",description:"Suavize a partida ajustando a rampa para 6.0s e limite a corrente térmica em 2.2 A.",steps:[{id:"c300-s5-1",title:"Suavizar Tempo de Aceleração da Hélice",instruction:"Aumente o tempo de aceleração do ventilador para 6.0 segundos para evitar picos de partida no motor monofásico/trifásico.",tip:"Ajuste o tempo da rampa de subida principal.",isCompleted:t=>{const e=$i(t,"P0100");return e>=5.8&&e<=6.2}},{id:"c300-s5-2",title:"Ajustar Proteção de Corrente Térmica",instruction:"Ajuste o parâmetro de sobrecarga térmica do CFW300 para 2.2 A conforme a placa do ventilador.",tip:"Localize a proteção de corrente de sobrecarga térmica.",isCompleted:t=>{const e=$i(t,"P0156");return e>=2.1&&e<=2.3}},{id:"c300-s5-3",title:"Testar e Validar Operação Normal",instruction:"Acione o motor em modo Local e comprove a partida suave até atingir a velocidade de regime.",tip:"O motor deve partir suavemente e permanecer operando sem disparos.",isCompleted:t=>(t.motorStatus==="RUNNING"||(t.outputFrequency??0)>.5)&&$i(t,"P0100")>=5.8}]}]}],$u={},DC="@CFW500_STUDENT_SESSION",Uv="@CFW500_PROGRESS_DATA_",Ov="@CFW500_ADMIN_UNLOCK_ALL",LC=($u==null?void 0:$u.VITE_API_URL)||"https://seudominio.com.br/api",zv=()=>{try{const t=localStorage.getItem(DC);if(t)return JSON.parse(t)}catch{}return{id:"aluno-demo",name:"Aluno de Teste"}},Ho=()=>{const t=zv();try{const e=localStorage.getItem(`${Uv}${t.id}`);if(e)return JSON.parse(e)}catch{}return{studentId:t.id,studentName:t.name,completedLessons:[],completedSteps:{}}},jp=t=>{try{localStorage.setItem(`${Uv}${t.studentId}`,JSON.stringify(t)),window.dispatchEvent(new Event("course_progress_updated"))}catch(e){console.warn("Erro ao salvar no localStorage:",e)}},Xp=async t=>{if(t.studentId!=="aluno-demo")try{await fetch(`${LC}/save_progress.php`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}catch(e){console.warn("Modo offline ativo ou falha ao sincronizar com UOL Host:",e)}},NC=(t,e)=>{const n=Ho(),i=n.completedSteps[t]||[];i.includes(e)||(n.completedSteps[t]=[...i,e],n.lastLessonId=t,jp(n),Xp(n))},b0=t=>{const e=Ho();e.completedLessons.includes(t)||(e.completedLessons.push(t),e.lastLessonId=t,jp(e),Xp(e))},dc=()=>{try{return localStorage.getItem(Ov)==="true"}catch{return!1}},FC=t=>{try{localStorage.setItem(Ov,t?"true":"false"),window.dispatchEvent(new Event("course_progress_updated"))}catch(e){console.warn("Erro ao salvar admin bypass:",e)}},UC=t=>{const e=zv(),i={studentId:e.id,studentName:e.name,completedLessons:[],completedSteps:{}};jp(i),Xp(i)},kv=(t,e)=>!t||!t.lessons||!t.lessons.length?!1:t.lessons.every(n=>e.completedLessons.includes(n.id)),Bv=(t,e,n=cs)=>{if(dc()||t===0)return!0;const i=n[t-1];return i?kv(i,e):!1},Ku=(t,e,n,i=cs)=>{if(dc())return!0;if(!Bv(t,n,i))return!1;if(e===0)return!0;const r=i[t];if(!r||!r.lessons)return!1;const a=r.lessons[e-1];return a?n.completedLessons.includes(a.id):!1},OC=(t,e)=>{if(!t||!t.lessons||!t.lessons.length)return 0;const n=t.lessons.filter(i=>e.completedLessons.includes(i.id)).length;return Math.round(n/t.lessons.length*100)},zC=({selectedLesson:t,setSelectedLesson:e,userRole:n})=>{const{state:i,dispatch:r}=Kn(),[a,o]=ce.useState("CFW500"),[s,l]=ce.useState(()=>Ho()),[c,f]=ce.useState(()=>dc()),p=a==="CFW500"?cs:T0,d=ce.useRef(t.id),g=()=>{if(r)try{r({type:"RESET_FACTORY_DEFAULTS"})}catch{try{r({type:"RESET_DEFAULTS"})}catch{}}};ce.useEffect(()=>{d.current!==t.id&&(g(),d.current=t.id)},[t.id]),ce.useEffect(()=>{const b=()=>{l(Ho()),f(dc())};return window.addEventListener("course_progress_updated",b),()=>window.removeEventListener("course_progress_updated",b)},[]),ce.useEffect(()=>{if(t.type==="PRACTICE"&&t.steps){const b=s.completedSteps[t.id]||[];t.steps.forEach(R=>{b.includes(R.id)||R.isCompleted(i)&&NC(t.id,R.id)});const E=Ho(),C=E.completedSteps[t.id]||[];if(t.steps.every(R=>C.includes(R.id))&&!E.completedLessons.includes(t.id)){b0(t.id);const R=p.find(P=>P.lessons.some(I=>I.id===t.id));R&&R.lessons.every(I=>I.id===t.id||E.completedLessons.includes(I.id))&&g()}}},[i,t,s.completedSteps,s.completedLessons,p]);const _=b=>{var C;if(b===a)return;o(b),g();const E=b==="CFW500"?cs:T0;(C=E[0])!=null&&C.lessons[0]&&e(E[0].lessons[0])},T=()=>{const b=!c;FC(b),f(b)},x=()=>{var b;window.confirm("Deseja resetar todo o progresso do aluno para reiniciar os testes da lição 1?")&&(UC(),g(),(b=p[0])!=null&&b.lessons[0]&&e(p[0].lessons[0]))},u=()=>{b0(t.id),g()},v=()=>{g();let b=!1;for(let E=0;E<p.length;E++){const C=p[E];for(let m=0;m<C.lessons.length;m++){const R=C.lessons[m];if(b&&Ku(E,m,s,p)){e(R);return}R.id===t.id&&(b=!0)}}},M=s.completedLessons.includes(t.id),S=s.completedSteps[t.id]||[];return h.jsxs("div",{style:kC,children:[n==="ADMIN"&&h.jsxs("div",{style:BC,children:[h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[h.jsx("span",{style:{fontSize:"11px",fontWeight:"bold",color:"#ffb74d"},children:"⚙️ Painel ADM:"}),h.jsx("button",{onClick:T,style:{...A0,background:c?"#00e676":"#374151",color:c?"#000":"#fff"},title:"Libera o acesso imediato a todos os módulos",children:c?"🔓 Todos Módulos Liberados":"🔒 Trava Sequencial Ativa"})]}),h.jsx("button",{onClick:x,style:{...A0,background:"#d32f2f",color:"#fff"},title:"Zera o progresso do aluno para testar o fluxo desde o início",children:"🗑️ Resetar Progresso"})]}),h.jsxs("div",{style:VC,children:[h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"},children:[h.jsx("button",{onClick:()=>_("CFW500"),style:{...C0,background:a==="CFW500"?"#0288d1":"#161b22",borderColor:a==="CFW500"?"#29b6f6":"#30363d",color:a==="CFW500"?"#fff":"#90a4ae"},children:"⚡ Inversor CFW500"}),h.jsx("button",{onClick:()=>_("CFW300"),style:{...C0,background:a==="CFW300"?"#0288d1":"#161b22",borderColor:a==="CFW300"?"#29b6f6":"#30363d",color:a==="CFW300"?"#fff":"#90a4ae"},children:"⚙️ Inversor CFW300"})]}),h.jsx("div",{style:HC,children:p.map((b,E)=>{const C=Bv(E,s,p),m=kv(b,s),R=OC(b,s),P=b.lessons.some(I=>I.id===t.id);return h.jsxs("div",{style:{...GC,borderColor:P?"#0288d1":C?"#374151":"#1f242c",background:P?"#132337":C?"#161b22":"#0d1117",opacity:C?1:.5,cursor:C?"pointer":"not-allowed"},onClick:()=>{if(C){g();const I=b.lessons.find((L,Y)=>Ku(E,Y,s,p))||b.lessons[0];e(I)}},children:[h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[h.jsx("span",{style:{fontSize:"14px"},children:C?b.icon:"🔒"}),h.jsx("span",{style:{fontSize:"10px",color:m?"#00e676":"#81d4fa",fontWeight:"bold"},children:m?"✅ 100%":`${R}%`})]}),h.jsxs("strong",{style:{fontSize:"11px",color:C?"#fff":"#6b7280",marginTop:"4px",display:"block"},children:["Módulo ",b.moduleNumber]}),h.jsx("span",{style:{fontSize:"9px",color:"#90a4ae",display:"block",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"},children:b.title}),h.jsx("div",{style:WC,children:h.jsx("div",{style:{...jC,width:`${R}%`,background:m?"#00e676":"#0288d1"}})})]},b.id)})})]}),h.jsxs("div",{style:XC,children:[h.jsxs("div",{style:qC,children:[h.jsxs("strong",{style:{fontSize:"11px",color:"#81d4fa",marginBottom:"8px",display:"block"},children:["Lições do Módulo (",a,"):"]}),h.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:p.map((b,E)=>b.lessons.some(m=>m.id===t.id)?b.lessons.map((m,R)=>{const P=Ku(E,R,s,p),I=s.completedLessons.includes(m.id),L=m.id===t.id;return h.jsx("button",{disabled:!P,onClick:()=>{g(),e(m)},style:{...YC,background:L?"#0288d1":P?"#1f2937":"#111418",color:L?"#fff":P?"#e0e0e0":"#4b5563",borderColor:L?"#29b6f6":"#374151",cursor:P?"pointer":"not-allowed"},children:h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[h.jsx("span",{children:I?"✅":P?m.type==="THEORY"?"📖":"🛠️":"🔒"}),h.jsx("span",{style:{fontSize:"11px",textAlign:"left",flex:1},children:m.title})]})},m.id)}):null)})]}),h.jsxs("div",{style:$C,children:[h.jsxs("div",{style:KC,children:[h.jsxs("div",{children:[h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[h.jsx("span",{style:ZC,children:t.type==="THEORY"?"📖 TEORIA & CONCEITO":"🛠️ PRÁTICA INTERATIVA"}),h.jsxs("span",{style:{fontSize:"10px",color:"#90a4ae"},children:["⏱️ ",t.durationMin," min"]})]}),h.jsx("h2",{style:{fontSize:"15px",color:"#fff",margin:"6px 0 2px 0"},children:t.title}),h.jsx("p",{style:{fontSize:"11px",color:"#b0bec5",margin:0},children:t.description})]}),h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t.type==="PRACTICE"&&h.jsx("button",{onClick:g,style:QC,title:"Restaura os parâmetros do inversor para o padrão de fábrica da bancada",children:"🔄 Resetar Inversor"}),M?h.jsx("span",{style:JC,children:"✓ CONCLUÍDA"}):h.jsx("span",{style:eR,children:"EM ANDAMENTO"})]})]}),t.type==="THEORY"&&t.theoryData&&h.jsxs("div",{style:tR,children:[h.jsx("h3",{style:{fontSize:"13px",color:"#81d4fa",marginBottom:"8px"},children:t.theoryData.title}),h.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:t.theoryData.content.map((b,E)=>h.jsx("p",{style:{fontSize:"11px",color:"#cfd8dc",lineHeight:"1.5",margin:0},children:b},E))}),t.id==="l0-1"&&h.jsxs("div",{style:nR,children:[h.jsx("a",{href:"/WEG-CFW500-programming-manual-10001469555-pt.pdf",target:"_blank",rel:"noopener noreferrer",style:iR,children:"📥 WEG-CFW500-programming-manual-10001469555-pt.pdf"}),h.jsx("span",{style:{fontSize:"10px",color:"#81d4fa",fontWeight:"bold"},children:"👇 Baixe o manual"})]}),t.theoryData.diagramInfo&&h.jsxs("div",{style:rR,children:[h.jsx("strong",{style:{fontSize:"10px",color:"#00e676"},children:"Fluxo / Diagrama:"}),h.jsx("div",{style:{fontSize:"11px",color:"#fff",marginTop:"2px",fontFamily:"monospace"},children:t.theoryData.diagramInfo})]}),h.jsxs("div",{style:aR,children:[h.jsx("strong",{children:"💡 Ponto-Chave para o Eletricista:"}),h.jsx("p",{style:{margin:"4px 0 0 0",fontSize:"11px",color:"#eceff1"},children:t.theoryData.keyTakeaway})]}),h.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"14px",gap:"8px"},children:M?h.jsx("button",{onClick:v,style:R0,children:"Próxima Lição ➔"}):h.jsx("button",{onClick:u,style:lR,children:"✓ Concluir Leitura (OK)"})})]}),t.type==="PRACTICE"&&t.steps&&h.jsxs("div",{style:oR,children:[h.jsx("strong",{style:{fontSize:"11px",color:"#81d4fa",display:"block",marginBottom:"6px"},children:"Checklist Prático no Painel e IHM ao lado:"}),h.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:t.steps.map((b,E)=>{const C=S.includes(b.id)||b.isCompleted(i);return h.jsxs("div",{style:{...sR,borderColor:C?"#00e676":"#374151",background:C?"rgba(0, 230, 118, 0.08)":"#161b22"},children:[h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[h.jsx("span",{style:{fontSize:"13px"},children:C?"✅":"⭕"}),h.jsxs("strong",{style:{fontSize:"11px",color:C?"#00e676":"#fff"},children:[E+1,". ",b.title]})]}),h.jsx("span",{style:{fontSize:"9px",color:C?"#00e676":"#ffb74d",fontWeight:"bold"},children:C?"OK":"Pendente"})]}),h.jsx("p",{style:{fontSize:"10px",color:"#b0bec5",margin:"3px 0 0 22px"},children:b.instruction})]},b.id)})}),M&&h.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px"},children:h.jsx("button",{onClick:v,style:R0,children:"🎉 Tarefa Concluída! Próxima Lição ➔"})})]})]})]})]})},kC={background:"#11151a",border:"1px solid #252e3b",borderRadius:"12px",padding:"12px",display:"flex",flexDirection:"column",gap:"10px",width:"100%",boxSizing:"border-box"},BC={display:"flex",justifyContent:"space-between",alignItems:"center",background:"#1b222c",border:"1px solid #374151",borderRadius:"8px",padding:"6px 10px",boxSizing:"border-box"},A0={border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"10px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s ease"},C0={border:"1px solid",borderRadius:"6px",padding:"5px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s ease"},VC={display:"flex",flexDirection:"column",gap:"6px"},HC={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(130px, 1fr))",gap:"6px"},GC={borderRadius:"8px",padding:"6px 8px",border:"1px solid",transition:"all 0.2s ease"},WC={height:"3px",background:"#252d38",borderRadius:"2px",marginTop:"4px",overflow:"hidden"},jC={height:"100%",transition:"width 0.3s ease"},XC={display:"flex",flexDirection:"column",gap:"10px"},qC={background:"#0d1117",border:"1px solid #21262d",borderRadius:"8px",padding:"8px",boxSizing:"border-box"},YC={padding:"6px 8px",borderRadius:"6px",border:"1px solid",fontSize:"11px",fontWeight:"bold",transition:"all 0.2s ease",boxSizing:"border-box",width:"100%",textAlign:"left"},$C={background:"#161b22",border:"1px solid #30363d",borderRadius:"8px",padding:"12px",boxSizing:"border-box"},KC={display:"flex",justifyContent:"space-between",alignItems:"flex-start",borderBottom:"1px solid #21262d",paddingBottom:"8px",marginBottom:"8px"},ZC={background:"#0288d1",color:"#fff",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",fontWeight:"bold"},QC={background:"#263238",border:"1px solid #455a64",color:"#81d4fa",borderRadius:"6px",padding:"3px 8px",fontSize:"10px",fontWeight:"bold",cursor:"pointer"},JC={background:"rgba(0, 230, 118, 0.15)",border:"1px solid #00e676",color:"#00e676",padding:"3px 6px",borderRadius:"4px",fontSize:"9px",fontWeight:"bold"},eR={background:"rgba(255, 179, 0, 0.15)",border:"1px solid #ffb300",color:"#ffb300",padding:"3px 6px",borderRadius:"4px",fontSize:"9px",fontWeight:"bold"},tR={display:"flex",flexDirection:"column",gap:"6px"},nR={background:"#131e2b",border:"1px solid #0288d1",borderRadius:"8px",padding:"12px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"6px",margin:"8px 0"},iR={background:"#0288d1",color:"#ffffff",textDecoration:"none",borderRadius:"6px",padding:"10px 16px",fontSize:"12px",fontWeight:"bold",display:"inline-flex",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(2, 136, 209, 0.4)",transition:"transform 0.2s ease",cursor:"pointer"},rR={background:"#0d1117",border:"1px dashed #30363d",borderRadius:"6px",padding:"6px 8px",marginTop:"4px"},aR={background:"#1f2937",borderLeft:"3px solid #00e676",padding:"6px 8px",borderRadius:"0 4px 4px 0",marginTop:"4px"},oR={display:"flex",flexDirection:"column",gap:"6px"},sR={padding:"6px 8px",borderRadius:"6px",border:"1px solid",transition:"all 0.2s ease"},lR={background:"#00e676",color:"#000",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},R0={background:"#0288d1",color:"#fff",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},cR=()=>{const{state:t,dispatch:e}=Kn(),[n,i]=ce.useState("ladder"),[r,a]=ce.useState(1),[o,s]=ce.useState(45),[l,c]=ce.useState(!0),[f,p]=ce.useState({I1:!1,I2:!0,I3:!1,I4:!1}),[d,g]=ce.useState({M1:!1,M2:!1}),[_,T]=ce.useState([{id:"rung_1",cells:[{type:"NO",tag:"I1"},{type:"NC",tag:"I2"},{type:"WIRE",tag:""}],coil:{type:"OUT",tag:"Q1"}},{id:"rung_2",cells:[{type:"NO",tag:"I3"},{type:"WIRE",tag:""},{type:"WIRE",tag:""}],coil:{type:"MB_SPEED",tag:"P0681",speedValue:50}}]),[x,u]=ce.useState([]),[v,M]=ce.useState(!1),[S,b]=ce.useState(35),[E,C]=ce.useState([{id:1,time:new Date().toLocaleTimeString(),type:"RX",frame:"01 03 00 00 00 04 44 09",description:"CLIC-02 Modbus Master Polling (Registradores 40001 a 40004)"}]),m=(D,X,Z)=>{C(le=>[{id:Date.now(),time:new Date().toLocaleTimeString(),type:D,frame:X,description:Z},...le.slice(0,19)])},R=()=>{const D=Object.keys(f);if(D.length>=12)return;const Z=`I${D.length+1}`;p(le=>({...le,[Z]:!1}))},P=()=>{const D=Object.keys(f);if(D.length<=2)return;const X=D[D.length-1];p(Z=>{const le={...Z};return delete le[X],le})},I=D=>{if(D.type==="NONE")return!1;if(D.type==="WIRE")return!0;const X=D.tag.startsWith("I"),Z=D.tag.startsWith("M"),le=X?!!f[D.tag]:Z?!!d[D.tag]:!1;return D.type==="NO"?le:D.type==="NC"?!le:!1},L=D=>{let X=!0;for(const Z of D.cells){if(Z.type==="NONE")return!1;if(!I(Z)){X=!1;break}}return X};ce.useEffect(()=>{if(!l||n!=="ladder")return;let D=!1;_.forEach(X=>{const Z=L(X);if(X.coil.type==="OUT")X.coil.tag==="Q1"?D=Z:X.coil.tag.startsWith("M")&&g(le=>({...le,[X.coil.tag]:Z}));else if(X.coil.type==="SET"&&Z)X.coil.tag==="Q1"&&(D=!0);else if(X.coil.type==="RST"&&Z)X.coil.tag==="Q1"&&(D=!1);else if(X.coil.type==="MB_SPEED"&&Z){const le=X.coil.speedValue||50,Re=Math.round(le/60*8192).toString(16).toUpperCase().padStart(4,"0");Math.abs(t.parameters.P0121.currentValue-le)>.5&&(m("TX",`01 06 00 01 ${Re.slice(0,2)} ${Re.slice(2)}`,`[CLIC-02 LADDER] MB_WRITE_SPEED: P0681 = ${le} Hz`),e({type:"SELECT_PARAM_DIRECT",payload:"P0121"}),e({type:"SET_ANALOG_INPUT_1",payload:le/60*10}))}}),D&&t.motorStatus!=="RUNNING"?(m("TX","01 06 00 00 00 01 48 0A","[CLIC-02] Coil Q1 energizada -> MB_WRITE(40001, 1) RUN"),e({type:"PRESS_RUN"})):!D&&t.motorStatus==="RUNNING"&&(m("TX","01 06 00 00 00 00 89 CA","[CLIC-02] Coil Q1 desenergizada -> MB_WRITE(40001, 0) STOP"),e({type:"PRESS_STOP"}))},[l,f,d,_,n,t.motorStatus,t.parameters.P0121.currentValue,e]);const Y=(D,X)=>{if(l)return;const Z=[..._],le=Z[D].cells[X],Fe=["NO","NC","WIRE","NONE"],Re=(Fe.indexOf(le.type)+1)%Fe.length,$=Fe[Re];Z[D].cells[X]={type:$,tag:$==="WIRE"||$==="NONE"?"":le.tag||"I1"},T(Z)},J=(D,X,Z)=>{const le=[..._];le[D].cells[X].tag=Z,T(le)},k=D=>{if(l)return;const X=[..._],Z=X[D].coil,le=["OUT","SET","RST","MB_SPEED"],Fe=(le.indexOf(Z.type)+1)%le.length,Re=le[Fe];X[D].coil={type:Re,tag:Re==="MB_SPEED"?"P0681":"Q1",speedValue:Z.speedValue||50},T(X)},K=()=>{_.length>=8||T([..._,{id:`rung_${Date.now()}`,cells:[{type:"NO",tag:"I1"},{type:"WIRE",tag:""},{type:"WIRE",tag:""}],coil:{type:"OUT",tag:"Q1"}}])},H=D=>{_.length<=1||T(_.filter((X,Z)=>Z!==D))},O=()=>{M(!0),u(["[INIT] Serial2.begin(19200, SERIAL_8N1);","[MODBUS] node.begin(1, Serial2);",`[TX] node.writeSingleRegister(0x0001, ${Math.round(S/60*8192)}); // Speed ${S}Hz`]);const D=Math.round(S/60*8192),X=D.toString(16).toUpperCase().padStart(4,"0");m("TX",`01 06 00 01 ${X.slice(0,2)} ${X.slice(2)}`,`C++ ModbusMaster::writeSingleRegister(0x0001, ${D})`),e({type:"SELECT_PARAM_DIRECT",payload:"P0121"}),e({type:"SET_ANALOG_INPUT_1",payload:S/60*10}),setTimeout(()=>{u(Z=>[...Z,"[TX] node.writeSingleRegister(0x0000, 0x0001); // CMD: START"]),m("TX","01 06 00 00 00 01 48 0A","C++ CMD START INVERTER"),e({type:"PRESS_RUN"}),setTimeout(()=>{u(Z=>[...Z,"[RX] uint8_t res = node.readHoldingRegisters(0x0003, 3);",`[DATA] Freq: ${S.toFixed(1)}Hz | I: ${t.outputCurrent.toFixed(1)}A | RPM: ${t.motorRPM}`]),M(!1)},500)},400)},V=Object.keys(f);return h.jsxs("div",{style:uR,children:[h.jsxs("div",{style:dR,children:[h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[h.jsx("span",{style:{fontSize:"18px"},children:"📡"}),h.jsxs("div",{children:[h.jsx("strong",{style:{color:"#fff",fontSize:"14px"},children:"AUTOMAÇÃO & MODBUS RTU RS-485 (WEG CLIC-02 / C++)"}),h.jsx("div",{style:{fontSize:"10px",color:"#90a4ae"},children:"Simulador SoftPLC IEC 61131-3 & Arduino Embedded"})]})]}),h.jsxs("div",{style:fR,children:[h.jsx("button",{onClick:()=>i("ladder"),style:{...Zu,background:n==="ladder"?"#00897b":"#1e2229",color:n==="ladder"?"#fff":"#90a4ae"},children:"🪜 Editor Ladder CLIC-02"}),h.jsx("button",{onClick:()=>i("standard"),style:{...Zu,background:n==="standard"?"#0288d1":"#1e2229",color:n==="standard"?"#fff":"#90a4ae"},children:"🎛️ Painel SCADA"}),h.jsx("button",{onClick:()=>i("cpp"),style:{...Zu,background:n==="cpp"?"#7b1fa2":"#1e2229",color:n==="cpp"?"#fff":"#90a4ae"},children:"💻 Código C++ (Arduino/ESP)"})]})]}),n==="ladder"&&h.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[h.jsxs("div",{style:pR,children:[h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[h.jsx("button",{onClick:()=>c(!l),style:{...ri,background:l?"#2e7d32":"#c62828",padding:"6px 14px",display:"flex",alignItems:"center",gap:"6px"},children:h.jsx("span",{children:l?"🟢 MODO: RUN":"🔴 MODO: STOP / EDIT"})}),h.jsx("span",{style:{fontSize:"11px",color:"#80cbc4"},children:l?"⚡ Programa em execução contínua":"✏️ Clique nos contatos ou bobinas para editar"})]}),h.jsx("button",{onClick:K,disabled:l||_.length>=8,style:{...ri,background:l?"#37474f":"#00796b",padding:"6px 12px",opacity:l?.6:1,cursor:l?"not-allowed":"pointer"},children:"➕ Adicionar Rung (Linha)"})]}),h.jsx("div",{style:hR,children:_.map((D,X)=>{const Z=l&&L(D);return h.jsxs("div",{style:mR,children:[h.jsx("div",{style:{...w0,background:l?"#00e676":"#546e7a"}}),D.cells.map((le,Fe)=>{const Re=l&&I(le);return h.jsxs(Y0.Fragment,{children:[h.jsxs("div",{onClick:()=>Y(X,Fe),style:{...xR,borderColor:Re?"#00e676":l?"#37474f":"#0288d1",background:Re?"rgba(0, 230, 118, 0.08)":"#12161b",cursor:l?"default":"pointer"},title:l?"":"Clique para alternar: NA -> NF -> FIO -> VAZIO",children:[le.type==="NONE"&&h.jsx("span",{style:{color:"#455a64"},children:"— Vazio —"}),le.type==="WIRE"&&h.jsx("div",{style:{width:"100%",height:"2px",background:Re?"#00e676":"#546e7a"}}),(le.type==="NO"||le.type==="NC")&&h.jsxs(h.Fragment,{children:[l?h.jsx("span",{style:{fontSize:"10px",color:"#90a4ae"},children:le.tag}):h.jsxs("select",{value:le.tag,onChange:$=>J(X,Fe,$.target.value),onClick:$=>$.stopPropagation(),style:_R,children:[V.map($=>h.jsxs("option",{value:$,children:[$," ",$==="I1"?"(Start)":$==="I2"?"(Stop NF)":""]},$)),h.jsx("option",{value:"M1",children:"M1 (Flag)"}),h.jsx("option",{value:"M2",children:"M2 (Flag)"})]}),h.jsx("strong",{style:{fontSize:"14px",color:Re?"#00e676":"#fff"},children:le.type==="NO"?"[   ]":"[ / ]"}),h.jsx("small",{style:{fontSize:"9px",color:Re?"#00e676":"#78909c"},children:le.type==="NO"?"NA":"NF"})]})]}),h.jsx("div",{style:{...gR,background:Re?"#00e676":"#37474f"}})]},Fe)}),h.jsx("div",{onClick:()=>k(X),style:{...vR,borderColor:Z?"#00e676":l?"#37474f":"#ab47bc",background:Z?"rgba(0, 230, 118, 0.12)":"#12161b",cursor:l?"default":"pointer"},title:l?"":"Clique para alternar tipo de bobina (OUT, SET, RST, MB_SPEED)",children:D.coil.type==="MB_SPEED"?h.jsxs("div",{style:{textAlign:"center"},children:[h.jsx("span",{style:{fontSize:"9px",color:"#ce93d8",fontWeight:"bold"},children:"MB_SPEED (P0681)"}),l?h.jsxs("div",{style:{fontSize:"11px",color:Z?"#00e676":"#fff",fontWeight:"bold"},children:[D.coil.speedValue," Hz"]}):h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",marginTop:"2px"},children:[h.jsx("input",{type:"number",min:"0",max:"60",value:D.coil.speedValue||50,onClick:le=>le.stopPropagation(),onChange:le=>{const Fe=[..._];Fe[X].coil.speedValue=Number(le.target.value),T(Fe)},style:{width:"45px",background:"#1c2128",color:"#fff",border:"1px solid #444",textAlign:"center",fontSize:"10px"}}),h.jsx("span",{style:{fontSize:"9px",color:"#aaa"},children:"Hz"})]})]}):h.jsxs(h.Fragment,{children:[h.jsxs("span",{style:{fontSize:"10px",color:"#90a4ae"},children:[D.coil.type," ",D.coil.tag]}),h.jsxs("strong",{style:{fontSize:"14px",color:Z?"#00e676":"#fff"},children:["( ",D.coil.tag==="Q1"?"CFW_RUN":D.coil.tag," )"]}),h.jsx("small",{style:{fontSize:"9px",color:Z?"#00e676":"#78909c"},children:Z?"ON":"OFF"})]})}),h.jsx("div",{style:{...w0,background:"#37474f"}}),!l&&h.jsx("button",{onClick:()=>H(X),style:{background:"#c62828",border:"none",color:"#fff",borderRadius:"4px",cursor:"pointer",padding:"4px 8px",fontSize:"10px"},children:"✖"})]},D.id)})}),h.jsxs("div",{style:To,children:[h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",flexWrap:"wrap",gap:"6px"},children:[h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[h.jsxs("span",{style:{fontSize:"11px",color:"#90caf9",fontWeight:"bold"},children:["Bancada de Chaves do CLP (Entradas I1 a I",V.length,"):"]}),h.jsxs("span",{style:{fontSize:"10px",color:"#80cbc4"},children:["(",V.length," entradas ativas)"]})]}),h.jsxs("div",{style:{display:"flex",gap:"6px"},children:[h.jsx("button",{onClick:R,disabled:V.length>=12,style:{...ri,background:V.length>=12?"#37474f":"#0288d1",padding:"4px 8px",fontSize:"10px",opacity:V.length>=12?.5:1,cursor:V.length>=12?"not-allowed":"pointer"},title:"Adicionar entrada digital (até I12)",children:"➕ Adicionar Entrada"}),h.jsx("button",{onClick:P,disabled:V.length<=2,style:{...ri,background:V.length<=2?"#37474f":"#b71c1c",padding:"4px 8px",fontSize:"10px",opacity:V.length<=2?.5:1,cursor:V.length<=2?"not-allowed":"pointer"},title:"Remover última entrada (mínimo 2)",children:"➖ Remover Entrada"})]})]}),h.jsx("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:V.map(D=>{const X=f[D];return h.jsxs("button",{onClick:()=>p(Z=>({...Z,[D]:!Z[D]})),style:{...ri,background:X?"#00e676":"#263238",color:X?"#0f2410":"#eceff1",border:X?"1px solid #69f0ae":"1px solid #455a64",minWidth:"85px",padding:"8px",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"},children:[h.jsxs("strong",{children:[D," ",D==="I1"?"(Start)":D==="I2"?"(Stop NF)":""]}),h.jsx("span",{style:{fontSize:"10px"},children:X?"FECHADO (1)":"ABERTO (0)"})]},D)})})]})]}),n==="standard"&&h.jsxs("div",{style:P0,children:[h.jsxs("div",{style:To,children:[h.jsx("h4",{style:bo,children:"Comandos Manuais Modbus (Holding Registers)"}),h.jsxs("div",{style:yR,children:[h.jsx("label",{style:I0,children:"Slave Address (P0313):"}),h.jsx("input",{type:"number",min:"1",max:"247",value:r,onChange:D=>a(Number(D.target.value)),style:SR})]}),h.jsxs("div",{style:{display:"flex",gap:"8px",marginTop:"10px"},children:[h.jsx("button",{style:{...ri,background:"#2e7d32"},onClick:()=>{m("TX","01 06 00 00 00 01 48 0A","Write 40001 = 0x0001 (RUN)"),e({type:"PRESS_RUN"})},children:"▶ LIGAR (RUN)"}),h.jsx("button",{style:{...ri,background:"#c62828"},onClick:()=>{m("TX","01 06 00 00 00 00 89 CA","Write 40001 = 0x0000 (STOP)"),e({type:"PRESS_STOP"})},children:"⏹ PARAR (STOP)"}),h.jsx("button",{style:{...ri,background:"#0277bd"},onClick:()=>{m("TX","01 06 00 00 00 04 88 09","Write 40001 = 0x0004 (Inverte Sentido)"),e({type:"PRESS_DIRECTION"})},children:"↻/↺ SENTIDO"})]}),h.jsxs("div",{style:{marginTop:"14px"},children:[h.jsxs("label",{style:{...I0,display:"flex",justifyContent:"space-between"},children:[h.jsx("span",{children:"Frequência P0681 (0 - 8192):"}),h.jsxs("strong",{style:{color:"#64b5f6"},children:[o.toFixed(1)," Hz"]})]}),h.jsxs("div",{style:{display:"flex",gap:"8px",marginTop:"6px"},children:[h.jsx("input",{type:"range",min:"0",max:"60",step:"0.5",value:o,onChange:D=>s(Number(D.target.value)),style:{flex:1}}),h.jsx("button",{style:{...ri,background:"#37474f",padding:"6px 12px"},onClick:()=>{const X=Math.round(o/60*8192).toString(16).toUpperCase().padStart(4,"0");m("TX",`01 06 00 01 ${X.slice(0,2)} ${X.slice(2)}`,`Write P0681 = ${o}Hz`),e({type:"SELECT_PARAM_DIRECT",payload:"P0121"}),e({type:"SET_ANALOG_INPUT_1",payload:o/60*10})},children:"Enviar"})]})]})]}),h.jsxs("div",{style:To,children:[h.jsx("h4",{style:bo,children:"Mapeamento de Registradores WEG CFW500"}),h.jsxs("table",{style:MR,children:[h.jsx("thead",{children:h.jsxs("tr",{style:{color:"#90a4ae",borderBottom:"1px solid #2a2f38",textAlign:"left",fontSize:"10px"},children:[h.jsx("th",{style:{padding:"4px"},children:"REG"}),h.jsx("th",{style:{padding:"4px"},children:"PARÂMETRO"}),h.jsx("th",{style:{padding:"4px"},children:"HEX BRUTO"}),h.jsx("th",{style:{padding:"4px"},children:"ENGENHARIA"})]})}),h.jsxs("tbody",{children:[h.jsxs("tr",{style:ul,children:[h.jsx("td",{style:Rn,children:"40001"}),h.jsx("td",{style:Rn,children:"P0680 (Controle)"}),h.jsxs("td",{style:dl,children:["0x",t.motorStatus==="RUNNING"?"0001":"0000"]}),h.jsx("td",{style:Rn,children:t.motorStatus})]}),h.jsxs("tr",{style:ul,children:[h.jsx("td",{style:Rn,children:"40002"}),h.jsx("td",{style:Rn,children:"P0681 (Velocidade)"}),h.jsxs("td",{style:dl,children:["0x",Math.round(t.outputFrequency/60*8192).toString(16).toUpperCase()]}),h.jsxs("td",{style:Rn,children:[t.outputFrequency.toFixed(1)," Hz"]})]}),h.jsxs("tr",{style:ul,children:[h.jsx("td",{style:Rn,children:"40004"}),h.jsx("td",{style:Rn,children:"P0002 (Freq. Saída)"}),h.jsxs("td",{style:dl,children:["0x",Math.round(t.outputFrequency*10).toString(16).toUpperCase()]}),h.jsxs("td",{style:{...Rn,color:"#00e676",fontWeight:"bold"},children:[t.outputFrequency.toFixed(1)," Hz"]})]}),h.jsxs("tr",{style:ul,children:[h.jsx("td",{style:Rn,children:"40005"}),h.jsx("td",{style:Rn,children:"P0003 (Corrente)"}),h.jsxs("td",{style:dl,children:["0x",Math.round(t.outputCurrent*10).toString(16).toUpperCase()]}),h.jsxs("td",{style:{...Rn,color:"#ffb300"},children:[t.outputCurrent.toFixed(1)," A"]})]})]})]})]})]}),n==="cpp"&&h.jsxs("div",{style:P0,children:[h.jsxs("div",{style:To,children:[h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[h.jsx("h4",{style:{...bo,color:"#ba68c8"},children:"📄 firmware_modbus_cfw500.cpp"}),h.jsx("span",{style:{fontSize:"10px",color:"#ce93d8"},children:"C++17 • ModbusMaster.h"})]}),h.jsx("pre",{style:ER,children:`#include <Arduino.h>
#include <ModbusMaster.h>

#define CFW500_SLAVE_ID 1
#define REG_CONTROL      0x0000 // P0680 (40001)
#define REG_SPEED_REF    0x0001 // P0681 (40002)
#define REG_OUT_FREQ     0x0003 // P0002 (40004)

ModbusMaster node;

void setup() {
  Serial2.begin(19200, SERIAL_8N1);
  node.begin(CFW500_SLAVE_ID, Serial2);
}

void loop() {
  // 1. Escreve frequencia de ${S}Hz
  node.writeSingleRegister(REG_SPEED_REF, ${Math.round(S/60*8192)});
  
  // 2. Envia comando de partida (RUN)
  node.writeSingleRegister(REG_CONTROL, 0x0001);
  
  // 3. Telemetria: Leitura da Frequencia
  uint8_t res = node.readHoldingRegisters(REG_OUT_FREQ, 1);
  if (res == node.ku8MBSuccess) {
    float freqHz = node.getResponseBuffer(0) / 10.0;
  }
  delay(100);
}`}),h.jsxs("div",{style:{display:"flex",gap:"8px",marginTop:"10px",alignItems:"center"},children:[h.jsxs("label",{style:{fontSize:"11px",color:"#cfd8dc"},children:["Freq: ",S,"Hz"]}),h.jsx("input",{type:"range",min:"5",max:"60",value:S,onChange:D=>b(Number(D.target.value)),style:{flex:1}}),h.jsx("button",{style:{...ri,background:v?"#6a1b9a":"#8e24aa"},onClick:O,disabled:v,children:v?"⏳ Compilando...":"▶ Compilar & Executar"})]})]}),h.jsxs("div",{style:To,children:[h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[h.jsx("h4",{style:{...bo,color:"#ba68c8"},children:"🖥️ Monitor Serial (Output RS-485)"}),h.jsx("span",{style:{fontSize:"10px",color:"#90a4ae"},children:"19200 baud"})]}),h.jsx("div",{style:TR,children:x.length===0?h.jsx("span",{style:{color:"#546e7a"},children:'// Pressione "Compilar & Executar" para carregar a rotina C++...'}):x.map((D,X)=>h.jsx("div",{style:{marginBottom:"4px"},children:h.jsx("span",{style:{color:D.startsWith("[TX]")?"#ba68c8":D.startsWith("[RX]")?"#00e676":"#90caf9"},children:D})},X))})]})]}),h.jsxs("div",{style:{marginTop:"12px"},children:[h.jsx("h4",{style:{...bo,marginBottom:"6px"},children:"Sniffer de Rede RS-485 (Transmissão de Pacotes RTU):"}),h.jsx("div",{style:bR,children:E.map(D=>h.jsxs("div",{style:{display:"flex",gap:"8px",fontSize:"11px",fontFamily:"monospace",marginBottom:"3px"},children:[h.jsxs("span",{style:{color:"#546e7a"},children:["[",D.time,"]"]}),h.jsxs("span",{style:{color:D.type==="TX"?"#00e676":"#64b5f6",fontWeight:"bold"},children:[D.type,":"]}),h.jsx("span",{style:{color:"#eceff1",letterSpacing:"1px"},children:D.frame}),h.jsxs("span",{style:{color:"#90a4ae"},children:["— ",D.description]})]},D.id))})]})]})},uR={background:"#16191d",borderRadius:"12px",padding:"14px",border:"1px solid #282f3a",width:"100%",boxSizing:"border-box"},dR={display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px",borderBottom:"1px solid #232a35",paddingBottom:"10px",marginBottom:"12px"},fR={display:"flex",gap:"6px",flexWrap:"wrap"},Zu={padding:"6px 12px",borderRadius:"6px",border:"1px solid #323842",fontSize:"11px",fontWeight:700,cursor:"pointer"},pR={display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0f1216",padding:"8px 12px",borderRadius:"8px",border:"1px solid #252e38",flexWrap:"wrap",gap:"8px"},hR={background:"#0a0c0e",padding:"12px",borderRadius:"8px",border:"1px solid #1c222b",display:"flex",flexDirection:"column",gap:"10px",overflowX:"auto"},mR={display:"flex",alignItems:"center",gap:"6px",minWidth:"580px"},w0={width:"6px",height:"52px",borderRadius:"2px",flexShrink:0},gR={flex:1,height:"2px",minWidth:"12px"},xR={width:"100px",height:"52px",border:"1px solid #37474f",borderRadius:"6px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",userSelect:"none",flexShrink:0},vR={width:"120px",height:"52px",border:"1px solid #37474f",borderRadius:"6px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",userSelect:"none",flexShrink:0},_R={background:"#1a1f26",color:"#80cbc4",border:"1px solid #37474f",borderRadius:"3px",fontSize:"9px",padding:"1px 2px"},P0={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"12px"},To={background:"#101215",padding:"12px",borderRadius:"8px",border:"1px solid #202630",display:"flex",flexDirection:"column"},bo={fontSize:"12px",color:"#90caf9",marginBottom:"10px",fontWeight:700},yR={display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},I0={fontSize:"11px",color:"#b0bec5"},SR={background:"#1e2229",border:"1px solid #3e4756",color:"#fff",borderRadius:"4px",padding:"4px 8px",width:"60px",textAlign:"center"},ri={padding:"8px 10px",color:"#fff",border:"none",borderRadius:"6px",fontWeight:"bold",fontSize:"11px",cursor:"pointer"},MR={width:"100%",borderCollapse:"collapse",fontSize:"11px"},ul={borderBottom:"1px solid #1a1e24"},Rn={padding:"5px 4px",color:"#cfd8dc"},dl={padding:"5px 4px",color:"#ffb74d",fontFamily:"monospace"},ER={background:"#0a0c0e",border:"1px solid #23272e",borderRadius:"6px",padding:"10px",fontFamily:"monospace",fontSize:"11px",color:"#e0e0e0",maxHeight:"220px",overflowY:"auto"},TR={background:"#0a0c0e",border:"1px solid #23272e",borderRadius:"6px",padding:"10px",fontFamily:"monospace",fontSize:"11px",minHeight:"220px",maxHeight:"220px",overflowY:"auto"},bR={background:"#0a0c0e",border:"1px solid #1e232b",borderRadius:"6px",padding:"8px 10px",maxHeight:"130px",overflowY:"auto"},to="https://gaflink.com.br/auth.php",Vv=[{id:"admin_master",username:"admin",name:"Gildon Gledson (Instrutor)",email:"gildongledson@gmail.com",password:"123",role:"ADMIN",status:"APPROVED",requestedAt:"Hoje"},{id:"student_demo",username:"aluno",name:"Aluno Demonstração",email:"aluno@gaflink.com.br",password:"123",role:"STUDENT",status:"APPROVED",requestedAt:"Hoje"}],AR=async()=>{try{const t=await fetch(`${to}?action=list`);if(t.ok){const e=await t.json();if(e.success&&Array.isArray(e.users))return e.users}}catch(t){console.warn("Servidor UOLHost offline ou sem resposta, usando fallback local:",t)}return Vv},CR=async(t,e)=>{const n=t.trim().toLowerCase(),i=e.trim();try{const a=await fetch(`${to}?action=login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:i})});if(a.ok)return await a.json()}catch(a){console.warn("Falha na requisição ao UOLHost, tentando autenticação local:",a)}const r=Vv.find(a=>a.username.toLowerCase()===n&&a.password===i);return r?{success:!0,user:r}:{success:!1,message:"Usuário ou senha inválidos. Verifique suas credenciais."}},RR=async t=>{try{const e=await fetch(`${to}?action=register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t.username.trim(),name:t.name.trim(),email:t.email.trim(),password:t.password.trim()})});if(e.ok)return await e.json()}catch(e){console.warn("Erro ao conectar ao UOLHost:",e)}return{success:!1,message:"Não foi possível conectar ao servidor. Tente novamente em instantes."}},wR=async t=>{try{const e=await fetch(`${to}?action=create_manual`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t.name.trim(),username:t.username.trim(),email:t.email.trim(),password:t.password.trim()})});if(e.ok)return await e.json()}catch(e){console.warn("Erro ao salvar no UOLHost:",e)}return{success:!1,message:"Erro de comunicação com o servidor ao cadastrar aluno."}},D0=async(t,e)=>{try{await fetch(`${to}?action=update_status`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t,status:e})})}catch(n){console.warn("Erro ao atualizar status:",n)}},PR=async t=>{try{await fetch(`${to}?action=delete`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t})})}catch(e){console.warn("Erro ao excluir usuário:",e)}},IR=({onLoginSuccess:t})=>{const[e,n]=ce.useState(!1),[i,r]=ce.useState(""),[a,o]=ce.useState(""),[s,l]=ce.useState(""),[c,f]=ce.useState(""),[p,d]=ce.useState(""),[g,_]=ce.useState(""),[T,x]=ce.useState(null),[u,v]=ce.useState(!1),M=async b=>{b.preventDefault(),x(null),v(!0);const E=await CR(i,a);if(v(!1),E.success&&E.user){const C={name:E.user.name,role:E.user.role,username:E.user.username};localStorage.setItem("cfw500_auth_user",JSON.stringify(C)),t(C)}else x({type:"error",text:E.message||"Credenciais inválidas."})},S=async b=>{b.preventDefault(),x(null),v(!0);const E=await RR({name:s,email:c,username:p,password:g});v(!1),E.success?(x({type:"success",text:E.message}),l(""),f(""),d(""),_(""),setTimeout(()=>n(!1),3500)):x({type:"error",text:E.message})};return h.jsx("div",{style:DR,children:h.jsxs("div",{style:LR,children:[h.jsxs("div",{style:NR,children:[h.jsx("div",{style:FR,children:"⚡"}),h.jsx("h2",{style:{fontSize:"18px",color:"#fff",margin:"8px 0 2px 0"},children:"Portal de Treinamento CFW500"}),h.jsx("span",{style:{fontSize:"11px",color:"#90a4ae"},children:"GafLink Automação • Plataforma de Capacitação Técnica"})]}),T&&h.jsx("div",{style:{...UR,background:T.type==="error"?"rgba(211, 47, 47, 0.15)":"rgba(0, 230, 118, 0.15)",borderColor:T.type==="error"?"#d32f2f":"#00e676",color:T.type==="error"?"#ff8a80":"#b9f6ca"},children:h.jsxs("span",{children:[T.type==="error"?"⚠️":"✅"," ",T.text]})}),!e&&h.jsxs("form",{onSubmit:M,style:{display:"flex",flexDirection:"column",gap:"12px"},children:[h.jsxs("div",{children:[h.jsx("label",{style:da,children:"Usuário:"}),h.jsx("input",{type:"text",required:!0,value:i,onChange:b=>r(b.target.value),placeholder:"Digite seu usuário",style:fa,autoFocus:!0})]}),h.jsxs("div",{children:[h.jsx("label",{style:da,children:"Senha:"}),h.jsx("input",{type:"password",required:!0,value:a,onChange:b=>o(b.target.value),placeholder:"••••••••",style:fa})]}),h.jsx("button",{type:"submit",disabled:u,style:{...L0,background:u?"#01579b":"#0288d1",cursor:u?"not-allowed":"pointer"},children:u?"Verificando...":"Acessar Plataforma ➔"}),h.jsxs("div",{style:{textAlign:"center",marginTop:"6px"},children:[h.jsx("span",{style:{fontSize:"11px",color:"#90a4ae"},children:"Ainda não possui acesso? "}),h.jsx("button",{type:"button",onClick:()=>{x(null),n(!0)},style:N0,children:"Solicitar Cadastro"})]})]}),e&&h.jsxs("form",{onSubmit:S,style:{display:"flex",flexDirection:"column",gap:"10px"},children:[h.jsxs("div",{children:[h.jsx("label",{style:da,children:"Nome Completo:"}),h.jsx("input",{type:"text",required:!0,value:s,onChange:b=>l(b.target.value),placeholder:"Ex: Carlos Silva",style:fa,autoFocus:!0})]}),h.jsxs("div",{children:[h.jsx("label",{style:da,children:"E-mail:"}),h.jsx("input",{type:"email",required:!0,value:c,onChange:b=>f(b.target.value),placeholder:"carlos@exemplo.com",style:fa})]}),h.jsxs("div",{children:[h.jsx("label",{style:da,children:"Usuário Desejado:"}),h.jsx("input",{type:"text",required:!0,value:p,onChange:b=>d(b.target.value),placeholder:"carlos.silva",style:fa})]}),h.jsxs("div",{children:[h.jsx("label",{style:da,children:"Senha:"}),h.jsx("input",{type:"password",required:!0,value:g,onChange:b=>_(b.target.value),placeholder:"••••••••",style:fa})]}),h.jsx("button",{type:"submit",disabled:u,style:{...L0,background:u?"#004d40":"#00897b",cursor:u?"not-allowed":"pointer"},children:u?"Enviando Pedido...":"Enviar Solicitação de Cadastro 📩"}),h.jsx("div",{style:{textAlign:"center",marginTop:"4px"},children:h.jsx("button",{type:"button",onClick:()=>{x(null),n(!1)},style:N0,children:"← Voltar para o Login"})})]})]})})},DR={minHeight:"100vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center",background:"radial-gradient(circle at center, #1b222d 0%, #0c0f13 100%)",padding:"16px",boxSizing:"border-box"},LR={background:"#14181f",border:"1px solid #2d3748",borderRadius:"16px",padding:"24px",maxWidth:"400px",width:"100%",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.6), 0 0 15px rgba(2, 136, 209, 0.1)",display:"flex",flexDirection:"column",gap:"14px"},NR={display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"},FR={width:"44px",height:"44px",borderRadius:"12px",background:"linear-gradient(135deg, #0288d1 0%, #00e676 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",color:"#fff",boxShadow:"0 4px 12px rgba(2, 136, 209, 0.4)"},UR={border:"1px solid",borderRadius:"8px",padding:"8px 12px",fontSize:"11px",textAlign:"center"},da={fontSize:"11px",color:"#cfd8dc",fontWeight:600,marginBottom:"4px",display:"block"},fa={width:"100%",background:"#0d1014",border:"1px solid #374151",borderRadius:"8px",padding:"9px 12px",color:"#fff",fontSize:"12px",outline:"none",boxSizing:"border-box"},L0={padding:"11px",color:"#fff",border:"none",borderRadius:"8px",fontSize:"12px",fontWeight:"bold",letterSpacing:"0.5px",boxShadow:"0 4px 14px rgba(0, 0, 0, 0.4)",transition:"all 0.2s ease",marginTop:"4px"},N0={background:"none",border:"none",color:"#64b5f6",fontSize:"11px",fontWeight:"bold",cursor:"pointer",textDecoration:"underline"},OR=()=>{const[t,e]=ce.useState([]),[n,i]=ce.useState(!1),[r,a]=ce.useState(!1),[o,s]=ce.useState(""),[l,c]=ce.useState(""),[f,p]=ce.useState(""),[d,g]=ce.useState(""),[_,T]=ce.useState(null),x=ce.useCallback(async()=>{a(!0);const E=await AR();e(E),a(!1)},[]);ce.useEffect(()=>{x();const E=setInterval(x,8e3);return()=>clearInterval(E)},[x]);const u=async E=>{E.preventDefault(),T(null),a(!0);const C=await wR({name:o,email:l,username:f,password:d});C.success?(T({type:"success",text:C.message}),s(""),c(""),p(""),g(""),await x(),setTimeout(()=>{i(!1),T(null)},1500)):(T({type:"error",text:C.message}),a(!1))},v=async E=>{a(!0),await D0(E,"APPROVED"),await x()},M=async E=>{a(!0),await D0(E,"REJECTED"),await x()},S=async E=>{window.confirm("Deseja realmente remover este cadastro?")&&(a(!0),await PR(E),await x())},b=t.filter(E=>E.status==="PENDING").length;return h.jsxs("div",{style:zR,children:[h.jsxs("div",{style:kR,children:[h.jsxs("div",{children:[h.jsxs("h3",{style:{fontSize:"15px",color:"#fff",display:"flex",alignItems:"center",gap:"8px",margin:0},children:[h.jsx("span",{children:"🛡️"})," Painel de Gestão & Aprovação de Alunos"]}),h.jsxs("span",{style:{fontSize:"11px",color:"#90a4ae"},children:["Servidor Próprio UOLHost • ",h.jsx("strong",{style:{color:"#81d4fa"},children:"gildongledson@gmail.com"})]})]}),h.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[b>0&&h.jsxs("span",{style:BR,children:["⚠️ ",b," ",b===1?"pendente":"pendentes"]}),h.jsx("button",{onClick:x,disabled:r,style:{...VR,opacity:r?.6:1},children:r?"⏳ Sincronizando...":"🔄 Atualizar"}),h.jsx("button",{onClick:()=>{i(!n),T(null)},style:HR,children:n?"✕ Fechar":"➕ Novo Aluno"})]})]}),n&&h.jsxs("div",{style:GR,children:[h.jsx("strong",{style:{fontSize:"12px",color:"#00e676",display:"block",marginBottom:"8px"},children:"➕ Cadastrar Aluno Manualmente (Salvo no UOLHost com Acesso Imediato)"}),_&&h.jsx("div",{style:{padding:"6px 10px",borderRadius:"6px",fontSize:"11px",marginBottom:"10px",background:_.type==="error"?"rgba(211,47,47,0.2)":"rgba(0,230,118,0.2)",color:_.type==="error"?"#ff8a80":"#b9f6ca",border:`1px solid ${_.type==="error"?"#d32f2f":"#00e676"}`},children:_.text}),h.jsxs("form",{onSubmit:u,style:WR,children:[h.jsxs("div",{children:[h.jsx("label",{style:fl,children:"Nome Completo:"}),h.jsx("input",{type:"text",required:!0,value:o,onChange:E=>s(E.target.value),placeholder:"Ex: Carlos Silva",style:pl})]}),h.jsxs("div",{children:[h.jsx("label",{style:fl,children:"E-mail:"}),h.jsx("input",{type:"email",required:!0,value:l,onChange:E=>c(E.target.value),placeholder:"carlos@gmail.com",style:pl})]}),h.jsxs("div",{children:[h.jsx("label",{style:fl,children:"Usuário de Acesso:"}),h.jsx("input",{type:"text",required:!0,value:f,onChange:E=>p(E.target.value),placeholder:"carlos.silva",style:pl})]}),h.jsxs("div",{children:[h.jsx("label",{style:fl,children:"Senha:"}),h.jsx("input",{type:"text",required:!0,value:d,onChange:E=>g(E.target.value),placeholder:"Ex: 123456",style:pl})]}),h.jsx("div",{style:{gridColumn:"1 / -1",display:"flex",justifyContent:"flex-end",marginTop:"4px"},children:h.jsx("button",{type:"submit",disabled:r,style:jR,children:"💾 Salvar e Liberar Acesso no UOLHost"})})]})]}),h.jsx("div",{style:{overflowX:"auto"},children:h.jsxs("table",{style:XR,children:[h.jsx("thead",{children:h.jsxs("tr",{style:{color:"#90a4ae",borderBottom:"1px solid #2a313d",textAlign:"left",fontSize:"11px"},children:[h.jsx("th",{style:{padding:"8px"},children:"NOME"}),h.jsx("th",{style:{padding:"8px"},children:"USUÁRIO"}),h.jsx("th",{style:{padding:"8px"},children:"SENHA"}),h.jsx("th",{style:{padding:"8px"},children:"STATUS"}),h.jsx("th",{style:{padding:"8px",textAlign:"center"},children:"AÇÕES DE CONTROLE"})]})}),h.jsx("tbody",{children:t.map(E=>h.jsxs("tr",{style:{borderBottom:"1px solid #1a1f26",fontSize:"11px"},children:[h.jsx("td",{style:{padding:"8px",color:"#fff",fontWeight:"bold"},children:E.name}),h.jsxs("td",{style:{padding:"8px",color:"#81d4fa",fontFamily:"monospace"},children:["@",E.username]}),h.jsx("td",{style:{padding:"8px",color:"#ffd54f",fontFamily:"monospace"},children:E.password}),h.jsx("td",{style:{padding:"8px"},children:h.jsx("span",{style:{...qR,background:E.status==="APPROVED"?"rgba(0, 230, 118, 0.15)":E.status==="PENDING"?"rgba(255, 179, 0, 0.15)":"rgba(211, 47, 47, 0.15)",color:E.status==="APPROVED"?"#00e676":E.status==="PENDING"?"#ffb300":"#ff5252",borderColor:E.status==="APPROVED"?"#00e676":E.status==="PENDING"?"#ffb300":"#ff5252"},children:E.status==="APPROVED"?"✓ APROVADO":E.status==="PENDING"?"⏳ PENDENTE":"✕ RECUSADO"})}),h.jsx("td",{style:{padding:"8px",textAlign:"center"},children:E.role!=="ADMIN"?h.jsxs("div",{style:{display:"flex",gap:"6px",justifyContent:"center",alignItems:"center"},children:[E.status!=="APPROVED"&&h.jsx("button",{onClick:()=>v(E.id),style:{...Qu,background:"#2e7d32"},title:"Liberar Acesso",children:"✅ Aprovar"}),E.status!=="REJECTED"&&h.jsx("button",{onClick:()=>M(E.id),style:{...Qu,background:"#d32f2f"},title:"Recusar Acesso",children:"⛔ Recusar"}),h.jsx("button",{onClick:()=>S(E.id),style:{...Qu,background:"#37474f"},title:"Remover Aluno",children:"🗑️"})]}):h.jsx("span",{style:{fontSize:"10px",color:"#90a4ae"},children:"Administrador Master"})})]},E.id))})]})})]})},zR={background:"#14181f",borderRadius:"12px",padding:"16px",border:"1px solid #283344",display:"flex",flexDirection:"column",gap:"12px",width:"100%",boxSizing:"border-box"},kR={display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"10px",borderBottom:"1px solid #222a36",paddingBottom:"10px"},BR={background:"#ff8f00",color:"#000",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:"bold"},VR={background:"#0288d1",color:"#fff",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},HR={background:"#00897b",color:"#fff",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},GR={background:"#0d1117",border:"1px solid #30363d",borderRadius:"8px",padding:"14px"},WR={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:"10px"},fl={fontSize:"10px",color:"#cfd8dc",fontWeight:"bold",display:"block",marginBottom:"4px"},pl={width:"100%",background:"#161b22",border:"1px solid #30363d",borderRadius:"6px",padding:"8px 10px",color:"#fff",fontSize:"11px",boxSizing:"border-box"},jR={background:"#00e676",color:"#000",border:"none",borderRadius:"6px",padding:"8px 14px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},XR={width:"100%",borderCollapse:"collapse"},qR={padding:"2px 8px",borderRadius:"4px",fontSize:"10px",fontWeight:"bold",border:"1px solid",display:"inline-block"},Qu={border:"none",borderRadius:"4px",color:"#fff",padding:"4px 8px",fontSize:"10px",fontWeight:"bold",cursor:"pointer"},F0=()=>{const{state:t,dispatch:e}=Kn(),n=l=>{e({type:"KEY_PRESS",payload:l})},i=l=>{var p;const c=`di${l}`,f=!!((p=t.digitalInputs)!=null&&p[c]);e({type:"SET_DIGITAL_INPUT",payload:{input:`DI${l}`,value:!f}})},r=l=>{const c=parseFloat(l.target.value);e({type:"SET_ANALOG_INPUT",payload:{input:"AI1",value:c}})},a=()=>t.activeFault?typeof t.activeFault=="string"?t.activeFault:typeof t.activeFault=="object"&&(t.activeFault.code||t.activeFault.id)||"F070":"F070",s=(()=>{const l=t;if(l.analogInputs){const c=l.analogInputs.AI1??l.analogInputs.ai1??0;return typeof c=="number"?c:0}return typeof l.potentiometerValue=="number"?l.potentiometerValue/100:0})();return h.jsxs("div",{style:YR,children:[h.jsxs("div",{style:$R,children:[h.jsx("span",{style:{fontSize:"13px",fontWeight:"bold",color:"#00e676"},children:"WEG CFW300 • MICRO DRIVE COMPACTO"}),h.jsx("span",{style:{fontSize:"10px",color:"#90a4ae"},children:"Plug-in I/O • Bornes Rápidos"})]}),h.jsxs("div",{style:KR,children:[h.jsxs("div",{style:ZR,children:[h.jsxs("div",{style:QR,children:[h.jsx("strong",{style:{color:"#0288d1",fontSize:"12px"},children:"WEG"}),h.jsx("span",{style:{fontSize:"10px",color:"#fff",fontWeight:"bold"},children:"CFW300"})]}),h.jsxs("div",{style:JR,children:[h.jsxs("div",{style:e2,children:[h.jsx("span",{style:{color:t.controlSource==="LOC"?"#00e676":"#374151",fontSize:"9px",fontWeight:"bold"},children:"● LOC"}),h.jsx("span",{style:{color:t.controlSource==="REM"?"#00e676":"#374151",fontSize:"9px",fontWeight:"bold"},children:"● REM"}),h.jsx("span",{style:{color:t.motorStatus==="RUNNING"?"#00e676":"#374151",fontSize:"9px",fontWeight:"bold"},children:"● RUN"}),h.jsx("span",{style:{color:t.motorStatus==="FAULT"?"#ff1744":"#374151",fontSize:"9px",fontWeight:"bold"},children:"● FLT"})]}),h.jsx("div",{style:t2,children:t.motorStatus==="FAULT"?a():(t.outputFrequency??0).toFixed(1)})]}),h.jsxs("div",{style:n2,children:[h.jsx("button",{onClick:()=>n("UP"),style:pa,children:"▲"}),h.jsx("button",{onClick:()=>n("PROG"),style:{...pa,background:"#0288d1",color:"#fff"},children:"PROG"}),h.jsx("button",{onClick:()=>n("DOWN"),style:pa,children:"▼"}),h.jsx("button",{onClick:()=>n("RUN"),style:{...pa,background:"#2e7d32",color:"#fff"},children:"I (RUN)"}),h.jsx("button",{onClick:()=>n("LOC_REM"),style:pa,children:"LOC/REM"}),h.jsx("button",{onClick:()=>n("STOP"),style:{...pa,background:"#c62828",color:"#fff"},children:"O (STOP)"})]})]}),h.jsxs("div",{style:i2,children:[h.jsx("strong",{style:{fontSize:"11px",color:"#81d4fa",marginBottom:"8px",display:"block"},children:"Bornes de Comando (CFW300-IOAR):"}),h.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px"},children:[1,2,3,4].map(l=>{var f;const c=!!((f=t.digitalInputs)!=null&&f[`di${l}`]);return h.jsxs("button",{onClick:()=>i(l),style:{...r2,borderColor:c?"#00e676":"#374151",background:c?"#1b5e20":"#161b22",color:c?"#fff":"#90a4ae"},children:["DI",l,": ",c?"ON (24V)":"OFF (0V)"]},l)})}),h.jsxs("div",{style:{marginTop:"12px"},children:[h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"10px",color:"#b0bec5",marginBottom:"4px"},children:[h.jsx("span",{children:"Entrada Analógica AI1 (0-10V):"}),h.jsxs("strong",{style:{color:"#00e676"},children:[(s*10).toFixed(1)," V"]})]}),h.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:s,onChange:r,style:{width:"100%",accentColor:"#0288d1"}})]})]})]})]})},YR={background:"#0d1117",border:"1px solid #30363d",borderRadius:"12px",padding:"12px",display:"flex",flexDirection:"column",gap:"10px",width:"100%",boxSizing:"border-box"},$R={display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #21262d",paddingBottom:"6px"},KR={display:"flex",gap:"12px",flexWrap:"wrap"},ZR={background:"#161b22",border:"2px solid #21262d",borderRadius:"10px",padding:"10px",width:"190px",boxShadow:"0 4px 12px rgba(0,0,0,0.5)"},QR={display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},JR={background:"#05070a",border:"2px solid #1f242c",borderRadius:"6px",padding:"6px",textAlign:"center",marginBottom:"8px"},e2={display:"flex",justifyContent:"space-around",marginBottom:"4px"},t2={fontFamily:"monospace",fontSize:"24px",fontWeight:"bold",color:"#ff3d00",letterSpacing:"2px",textShadow:"0 0 8px rgba(255, 61, 0, 0.6)"},n2={display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"4px"},pa={background:"#21262d",border:"1px solid #30363d",borderRadius:"4px",color:"#e0e0e0",padding:"6px 2px",fontSize:"9px",fontWeight:"bold",cursor:"pointer"},i2={flex:1,minWidth:"220px",background:"#161b22",border:"1px solid #21262d",borderRadius:"10px",padding:"10px"},r2={border:"1px solid",borderRadius:"6px",padding:"6px",fontSize:"10px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s ease"},a2=({user:t,onLogout:e})=>{const[n,i]=ce.useState("workbench"),[r,a]=ce.useState("CFW500"),[o,s]=ce.useState(20),[l,c]=ce.useState(cs[0].lessons[0]);A1({loadTorquePercent:o,enableNoise:!0}),C1();const f=l.id.startsWith("c300-");return h.jsxs("div",{style:s2,children:[h.jsxs("div",{style:l2,children:[h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[h.jsx("span",{style:{fontSize:"16px"},children:"👤"}),h.jsxs("div",{children:[h.jsx("strong",{style:{fontSize:"12px",color:"#fff"},children:t.name}),h.jsxs("span",{style:{fontSize:"10px",color:"#90a4ae",marginLeft:"6px"},children:["(",t.role==="ADMIN"?"Instrutor / Admin":"Aluno",") • @",t.username]})]})]}),h.jsx("button",{onClick:e,style:c2,title:"Encerrar sessão",children:"🚪 Sair"})]}),h.jsxs("div",{style:u2,children:[h.jsxs("div",{style:d2,children:[h.jsx("button",{onClick:()=>i("workbench"),style:{...hl,background:n==="workbench"?"#0288d1":"#1a1d21",color:n==="workbench"?"#fff":"#90a4ae",borderColor:n==="workbench"?"#29b6f6":"#323842"},children:"🎛️ Bancada de Operação"}),h.jsx("button",{onClick:()=>i("modbus"),style:{...hl,background:n==="modbus"?"#0288d1":"#1a1d21",color:n==="modbus"?"#fff":"#90a4ae",borderColor:n==="modbus"?"#29b6f6":"#323842"},children:"📡 Modbus RTU (RS-485)"}),h.jsx("button",{onClick:()=>i("tutorial"),style:{...hl,background:n==="tutorial"?"#0288d1":"#1a1d21",color:n==="tutorial"?"#fff":"#90a4ae",borderColor:n==="tutorial"?"#29b6f6":"#323842"},children:"🎓 Modo Aula & Trilha"}),t.role==="ADMIN"&&h.jsx("button",{onClick:()=>i("admin"),style:{...hl,background:n==="admin"?"#f57c00":"#1a1d21",color:n==="admin"?"#fff":"#ffb74d",borderColor:n==="admin"?"#ffa726":"#323842"},children:"🛡️ Painel Admin (Aprovações)"})]}),h.jsx(IC,{})]}),n==="workbench"&&h.jsxs("div",{style:ml,children:[h.jsxs("div",{style:f2,children:[h.jsx("span",{style:{fontSize:"11px",fontWeight:"bold",color:"#90a4ae"},children:"Modelo de Inversor Ativo na Bancada:"}),h.jsxs("div",{style:{display:"flex",gap:"8px"},children:[h.jsx("button",{onClick:()=>a("CFW500"),style:{...U0,background:r==="CFW500"?"#0288d1":"#161b22",borderColor:r==="CFW500"?"#29b6f6":"#30363d",color:r==="CFW500"?"#fff":"#90a4ae"},children:"⚡ WEG CFW500 (Padrão Industrial)"}),h.jsx("button",{onClick:()=>a("CFW300"),style:{...U0,background:r==="CFW300"?"#0288d1":"#161b22",borderColor:r==="CFW300"?"#29b6f6":"#30363d",color:r==="CFW300"?"#fff":"#90a4ae"},children:"⚙️ WEG CFW300 (Micro Drive Compacto)"})]})]}),r==="CFW500"?h.jsxs(h.Fragment,{children:[h.jsxs("div",{style:ha,children:[h.jsx(su,{}),h.jsxs("div",{style:Ao,children:[h.jsx(yo,{loadTorquePercent:o}),h.jsxs("div",{style:O0,children:[h.jsxs("label",{style:{fontSize:"11px",color:"#90a4ae",display:"flex",justifyContent:"space-between"},children:[h.jsx("span",{children:"Carga Mecânica no Eixo (Freio)"}),h.jsxs("strong",{children:[o,"%"]})]}),h.jsx("input",{type:"range",min:"0",max:"100",value:o,onChange:p=>s(Number(p.target.value)),style:{width:"100%",marginTop:"8px",cursor:"pointer",height:"28px"}})]})]})]}),h.jsxs("div",{style:ha,children:[h.jsx(M0,{}),h.jsx(TC,{})]}),h.jsx(Yu,{})]}):h.jsxs(h.Fragment,{children:[h.jsxs("div",{style:ha,children:[h.jsx(F0,{}),h.jsxs("div",{style:Ao,children:[h.jsx(yo,{loadTorquePercent:o}),h.jsxs("div",{style:O0,children:[h.jsxs("label",{style:{fontSize:"11px",color:"#90a4ae",display:"flex",justifyContent:"space-between"},children:[h.jsx("span",{children:"Carga Mecânica no Eixo (Freio)"}),h.jsxs("strong",{children:[o,"%"]})]}),h.jsx("input",{type:"range",min:"0",max:"100",value:o,onChange:p=>s(Number(p.target.value)),style:{width:"100%",marginTop:"8px",cursor:"pointer",height:"28px"}})]})]})]}),h.jsx(Yu,{})]})]}),n==="modbus"&&h.jsxs("div",{style:ml,children:[h.jsx(cR,{}),h.jsxs("div",{style:ha,children:[h.jsx(su,{}),h.jsx("div",{style:Ao,children:h.jsx(yo,{loadTorquePercent:o})})]})]}),n==="tutorial"&&h.jsxs("div",{style:ml,children:[h.jsx(zC,{selectedLesson:l,setSelectedLesson:c,userRole:t.role}),l.type==="PRACTICE"&&h.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"14px",marginTop:"6px"},children:[h.jsxs("div",{style:{fontSize:"12px",color:"#64b5f6",fontWeight:"bold"},children:["🎛️ Bancada Ativa para a Lição (",f?"WEG CFW300":"WEG CFW500","):"]}),f?h.jsxs("div",{style:ha,children:[h.jsx(F0,{}),h.jsx("div",{style:Ao,children:h.jsx(yo,{loadTorquePercent:o})})]}):h.jsxs("div",{style:ha,children:[h.jsx(su,{}),h.jsxs("div",{style:Ao,children:[h.jsx(yo,{loadTorquePercent:o}),h.jsx(M0,{})]})]}),h.jsx(Yu,{})]})]}),n==="admin"&&t.role==="ADMIN"&&h.jsx("div",{style:ml,children:h.jsx(OR,{})})]})};function o2(){const[t,e]=ce.useState(null),[n,i]=ce.useState(!0);ce.useEffect(()=>{const a=localStorage.getItem("cfw500_auth_user");if(a)try{e(JSON.parse(a))}catch{localStorage.removeItem("cfw500_auth_user")}i(!1)},[]);const r=()=>{localStorage.removeItem("cfw500_auth_user"),e(null)};return n?h.jsx("div",{style:{background:"#0a0d11",minHeight:"100vh"}}):t?h.jsx(b1,{children:h.jsx(a2,{user:t,onLogout:r})}):h.jsx(IR,{onLoginSuccess:e})}const s2={maxWidth:"1100px",width:"100%",margin:"0 auto",padding:"12px",display:"flex",flexDirection:"column",gap:"14px",boxSizing:"border-box"},l2={display:"flex",justifyContent:"space-between",alignItems:"center",background:"#13171d",border:"1px solid #232b36",borderRadius:"8px",padding:"8px 14px"},c2={background:"#b71c1c",border:"none",borderRadius:"6px",color:"#fff",padding:"5px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},u2={display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:"10px"},d2={display:"flex",gap:"8px",flexWrap:"wrap"},hl={padding:"10px 18px",borderRadius:"8px",border:"1px solid",fontSize:"13px",fontWeight:700,cursor:"pointer",transition:"all 0.2s ease",boxShadow:"0 4px 12px rgba(0,0,0,0.3)"},f2={display:"flex",justifyContent:"space-between",alignItems:"center",background:"#13171d",border:"1px solid #232b36",borderRadius:"8px",padding:"8px 12px",flexWrap:"wrap",gap:"8px"},U0={border:"1px solid",borderRadius:"6px",padding:"6px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s ease"},ml={display:"flex",flexDirection:"column",gap:"14px",width:"100%"},ha={display:"flex",flexWrap:"wrap",gap:"14px",width:"100%"},Ao={display:"flex",flexDirection:"column",gap:"14px",flex:"1 1 280px"},O0={background:"#1a1d21",border:"1px solid #323842",borderRadius:"12px",padding:"12px 14px"};Ju.createRoot(document.getElementById("root")).render(h.jsx(Y0.StrictMode,{children:h.jsx(o2,{})}));
