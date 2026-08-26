(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();function Zv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var B0={exports:{}},hc={},V0={exports:{}},je={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ds=Symbol.for("react.element"),Qv=Symbol.for("react.portal"),Jv=Symbol.for("react.fragment"),e_=Symbol.for("react.strict_mode"),t_=Symbol.for("react.profiler"),n_=Symbol.for("react.provider"),i_=Symbol.for("react.context"),r_=Symbol.for("react.forward_ref"),a_=Symbol.for("react.suspense"),o_=Symbol.for("react.memo"),s_=Symbol.for("react.lazy"),lh=Symbol.iterator;function l_(t){return t===null||typeof t!="object"?null:(t=lh&&t[lh]||t["@@iterator"],typeof t=="function"?t:null)}var H0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},G0=Object.assign,W0={};function Za(t,e,n){this.props=t,this.context=e,this.refs=W0,this.updater=n||H0}Za.prototype.isReactComponent={};Za.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Za.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function j0(){}j0.prototype=Za.prototype;function kf(t,e,n){this.props=t,this.context=e,this.refs=W0,this.updater=n||H0}var Bf=kf.prototype=new j0;Bf.constructor=kf;G0(Bf,Za.prototype);Bf.isPureReactComponent=!0;var ch=Array.isArray,X0=Object.prototype.hasOwnProperty,Vf={current:null},q0={key:!0,ref:!0,__self:!0,__source:!0};function Y0(t,e,n){var i,r={},a=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(a=""+e.key),e)X0.call(e,i)&&!q0.hasOwnProperty(i)&&(r[i]=e[i]);var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){for(var l=Array(s),c=0;c<s;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in s=t.defaultProps,s)r[i]===void 0&&(r[i]=s[i]);return{$$typeof:ds,type:t,key:a,ref:o,props:r,_owner:Vf.current}}function c_(t,e){return{$$typeof:ds,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Hf(t){return typeof t=="object"&&t!==null&&t.$$typeof===ds}function u_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var uh=/\/+/g;function Uc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?u_(""+t.key):e.toString(36)}function xl(t,e,n,i,r){var a=typeof t;(a==="undefined"||a==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ds:case Qv:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Uc(o,0):i,ch(r)?(n="",t!=null&&(n=t.replace(uh,"$&/")+"/"),xl(r,e,n,"",function(c){return c})):r!=null&&(Hf(r)&&(r=c_(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(uh,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",ch(t))for(var s=0;s<t.length;s++){a=t[s];var l=i+Uc(a,s);o+=xl(a,e,n,l,r)}else if(l=l_(t),typeof l=="function")for(t=l.call(t),s=0;!(a=t.next()).done;)a=a.value,l=i+Uc(a,s++),o+=xl(a,e,n,l,r);else if(a==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Ss(t,e,n){if(t==null)return t;var i=[],r=0;return xl(t,i,"","",function(a){return e.call(n,a,r++)}),i}function d_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var sn={current:null},vl={transition:null},f_={ReactCurrentDispatcher:sn,ReactCurrentBatchConfig:vl,ReactCurrentOwner:Vf};function $0(){throw Error("act(...) is not supported in production builds of React.")}je.Children={map:Ss,forEach:function(t,e,n){Ss(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ss(t,function(){e++}),e},toArray:function(t){return Ss(t,function(e){return e})||[]},only:function(t){if(!Hf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};je.Component=Za;je.Fragment=Jv;je.Profiler=t_;je.PureComponent=kf;je.StrictMode=e_;je.Suspense=a_;je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=f_;je.act=$0;je.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=G0({},t.props),r=t.key,a=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(a=e.ref,o=Vf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var s=t.type.defaultProps;for(l in e)X0.call(e,l)&&!q0.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&s!==void 0?s[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){s=Array(l);for(var c=0;c<l;c++)s[c]=arguments[c+2];i.children=s}return{$$typeof:ds,type:t.type,key:r,ref:a,props:i,_owner:o}};je.createContext=function(t){return t={$$typeof:i_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:n_,_context:t},t.Consumer=t};je.createElement=Y0;je.createFactory=function(t){var e=Y0.bind(null,t);return e.type=t,e};je.createRef=function(){return{current:null}};je.forwardRef=function(t){return{$$typeof:r_,render:t}};je.isValidElement=Hf;je.lazy=function(t){return{$$typeof:s_,_payload:{_status:-1,_result:t},_init:d_}};je.memo=function(t,e){return{$$typeof:o_,type:t,compare:e===void 0?null:e}};je.startTransition=function(t){var e=vl.transition;vl.transition={};try{t()}finally{vl.transition=e}};je.unstable_act=$0;je.useCallback=function(t,e){return sn.current.useCallback(t,e)};je.useContext=function(t){return sn.current.useContext(t)};je.useDebugValue=function(){};je.useDeferredValue=function(t){return sn.current.useDeferredValue(t)};je.useEffect=function(t,e){return sn.current.useEffect(t,e)};je.useId=function(){return sn.current.useId()};je.useImperativeHandle=function(t,e,n){return sn.current.useImperativeHandle(t,e,n)};je.useInsertionEffect=function(t,e){return sn.current.useInsertionEffect(t,e)};je.useLayoutEffect=function(t,e){return sn.current.useLayoutEffect(t,e)};je.useMemo=function(t,e){return sn.current.useMemo(t,e)};je.useReducer=function(t,e,n){return sn.current.useReducer(t,e,n)};je.useRef=function(t){return sn.current.useRef(t)};je.useState=function(t){return sn.current.useState(t)};je.useSyncExternalStore=function(t,e,n){return sn.current.useSyncExternalStore(t,e,n)};je.useTransition=function(){return sn.current.useTransition()};je.version="18.3.1";V0.exports=je;var ue=V0.exports;const K0=Zv(ue);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p_=ue,h_=Symbol.for("react.element"),m_=Symbol.for("react.fragment"),g_=Object.prototype.hasOwnProperty,x_=p_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v_={key:!0,ref:!0,__self:!0,__source:!0};function Z0(t,e,n){var i,r={},a=null,o=null;n!==void 0&&(a=""+n),e.key!==void 0&&(a=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)g_.call(e,i)&&!v_.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:h_,type:t,key:a,ref:o,props:r,_owner:x_.current}}hc.Fragment=m_;hc.jsx=Z0;hc.jsxs=Z0;B0.exports=hc;var f=B0.exports,ed={},Q0={exports:{}},Tn={},J0={exports:{}},eg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(U,V){var N=U.length;U.push(V);e:for(;0<N;){var X=N-1>>>1,Z=U[X];if(0<r(Z,V))U[X]=V,U[N]=Z,N=X;else break e}}function n(U){return U.length===0?null:U[0]}function i(U){if(U.length===0)return null;var V=U[0],N=U.pop();if(N!==V){U[0]=N;e:for(var X=0,Z=U.length,ce=Z>>>1;X<ce;){var De=2*(X+1)-1,Ie=U[De],K=De+1,re=U[K];if(0>r(Ie,N))K<Z&&0>r(re,Ie)?(U[X]=re,U[K]=N,X=K):(U[X]=Ie,U[De]=N,X=De);else if(K<Z&&0>r(re,N))U[X]=re,U[K]=N,X=K;else break e}}return V}function r(U,V){var N=U.sortIndex-V.sortIndex;return N!==0?N:U.id-V.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;t.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();t.unstable_now=function(){return o.now()-s}}var l=[],c=[],p=1,h=null,u=3,m=!1,_=!1,E=!1,g=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function M(U){for(var V=n(c);V!==null;){if(V.callback===null)i(c);else if(V.startTime<=U)i(c),V.sortIndex=V.expirationTime,e(l,V);else break;V=n(c)}}function S(U){if(E=!1,M(U),!_)if(n(l)!==null)_=!0,G(b);else{var V=n(c);V!==null&&L(S,V.startTime-U)}}function b(U,V){_=!1,E&&(E=!1,d(v),v=-1),m=!0;var N=u;try{for(M(V),h=n(l);h!==null&&(!(h.expirationTime>V)||U&&!I());){var X=h.callback;if(typeof X=="function"){h.callback=null,u=h.priorityLevel;var Z=X(h.expirationTime<=V);V=t.unstable_now(),typeof Z=="function"?h.callback=Z:h===n(l)&&i(l),M(V)}else i(l);h=n(l)}if(h!==null)var ce=!0;else{var De=n(c);De!==null&&L(S,De.startTime-V),ce=!1}return ce}finally{h=null,u=N,m=!1}}var T=!1,A=null,v=-1,R=5,P=-1;function I(){return!(t.unstable_now()-P<R)}function O(){if(A!==null){var U=t.unstable_now();P=U;var V=!0;try{V=A(!0,U)}finally{V?$():(T=!1,A=null)}}else T=!1}var $;if(typeof x=="function")$=function(){x(O)};else if(typeof MessageChannel<"u"){var ee=new MessageChannel,D=ee.port2;ee.port1.onmessage=O,$=function(){D.postMessage(null)}}else $=function(){g(O,0)};function G(U){A=U,T||(T=!0,$())}function L(U,V){v=g(function(){U(t.unstable_now())},V)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(U){U.callback=null},t.unstable_continueExecution=function(){_||m||(_=!0,G(b))},t.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<U?Math.floor(1e3/U):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(U){switch(u){case 1:case 2:case 3:var V=3;break;default:V=u}var N=u;u=V;try{return U()}finally{u=N}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(U,V){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var N=u;u=U;try{return V()}finally{u=N}},t.unstable_scheduleCallback=function(U,V,N){var X=t.unstable_now();switch(typeof N=="object"&&N!==null?(N=N.delay,N=typeof N=="number"&&0<N?X+N:X):N=X,U){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=N+Z,U={id:p++,callback:V,priorityLevel:U,startTime:N,expirationTime:Z,sortIndex:-1},N>X?(U.sortIndex=N,e(c,U),n(l)===null&&U===n(c)&&(E?(d(v),v=-1):E=!0,L(S,N-X))):(U.sortIndex=Z,e(l,U),_||m||(_=!0,G(b))),U},t.unstable_shouldYield=I,t.unstable_wrapCallback=function(U){var V=u;return function(){var N=u;u=V;try{return U.apply(this,arguments)}finally{u=N}}}})(eg);J0.exports=eg;var __=J0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y_=ue,En=__;function se(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var tg=new Set,Wo={};function Xr(t,e){Ba(t,e),Ba(t+"Capture",e)}function Ba(t,e){for(Wo[t]=e,t=0;t<e.length;t++)tg.add(e[t])}var Li=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),td=Object.prototype.hasOwnProperty,S_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,dh={},fh={};function M_(t){return td.call(fh,t)?!0:td.call(dh,t)?!1:S_.test(t)?fh[t]=!0:(dh[t]=!0,!1)}function E_(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function T_(t,e,n,i){if(e===null||typeof e>"u"||E_(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ln(t,e,n,i,r,a,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=a,this.removeEmptyString=o}var qt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){qt[t]=new ln(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];qt[e]=new ln(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){qt[t]=new ln(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){qt[t]=new ln(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){qt[t]=new ln(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){qt[t]=new ln(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){qt[t]=new ln(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){qt[t]=new ln(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){qt[t]=new ln(t,5,!1,t.toLowerCase(),null,!1,!1)});var Gf=/[\-:]([a-z])/g;function Wf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Gf,Wf);qt[e]=new ln(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Gf,Wf);qt[e]=new ln(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Gf,Wf);qt[e]=new ln(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){qt[t]=new ln(t,1,!1,t.toLowerCase(),null,!1,!1)});qt.xlinkHref=new ln("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){qt[t]=new ln(t,1,!1,t.toLowerCase(),null,!0,!0)});function jf(t,e,n,i){var r=qt.hasOwnProperty(e)?qt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(T_(e,n,r,i)&&(n=null),i||r===null?M_(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Bi=y_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ms=Symbol.for("react.element"),va=Symbol.for("react.portal"),_a=Symbol.for("react.fragment"),Xf=Symbol.for("react.strict_mode"),nd=Symbol.for("react.profiler"),ng=Symbol.for("react.provider"),ig=Symbol.for("react.context"),qf=Symbol.for("react.forward_ref"),id=Symbol.for("react.suspense"),rd=Symbol.for("react.suspense_list"),Yf=Symbol.for("react.memo"),Ji=Symbol.for("react.lazy"),rg=Symbol.for("react.offscreen"),ph=Symbol.iterator;function ro(t){return t===null||typeof t!="object"?null:(t=ph&&t[ph]||t["@@iterator"],typeof t=="function"?t:null)}var _t=Object.assign,Oc;function Ro(t){if(Oc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Oc=e&&e[1]||""}return`
`+Oc+t}var zc=!1;function kc(t,e){if(!t||zc)return"";zc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),a=i.stack.split(`
`),o=r.length-1,s=a.length-1;1<=o&&0<=s&&r[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(r[o]!==a[s]){if(o!==1||s!==1)do if(o--,s--,0>s||r[o]!==a[s]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=s);break}}}finally{zc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ro(t):""}function b_(t){switch(t.tag){case 5:return Ro(t.type);case 16:return Ro("Lazy");case 13:return Ro("Suspense");case 19:return Ro("SuspenseList");case 0:case 2:case 15:return t=kc(t.type,!1),t;case 11:return t=kc(t.type.render,!1),t;case 1:return t=kc(t.type,!0),t;default:return""}}function ad(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case _a:return"Fragment";case va:return"Portal";case nd:return"Profiler";case Xf:return"StrictMode";case id:return"Suspense";case rd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case ig:return(t.displayName||"Context")+".Consumer";case ng:return(t._context.displayName||"Context")+".Provider";case qf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Yf:return e=t.displayName||null,e!==null?e:ad(t.type)||"Memo";case Ji:e=t._payload,t=t._init;try{return ad(t(e))}catch{}}return null}function C_(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ad(e);case 8:return e===Xf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function mr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ag(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function A_(t){var e=ag(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,a=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,a.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Es(t){t._valueTracker||(t._valueTracker=A_(t))}function og(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=ag(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Fl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function od(t,e){var n=e.checked;return _t({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function hh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=mr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function sg(t,e){e=e.checked,e!=null&&jf(t,"checked",e,!1)}function sd(t,e){sg(t,e);var n=mr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?ld(t,e.type,n):e.hasOwnProperty("defaultValue")&&ld(t,e.type,mr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function mh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function ld(t,e,n){(e!=="number"||Fl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var wo=Array.isArray;function Ia(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+mr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function cd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(se(91));return _t({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function gh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(se(92));if(wo(n)){if(1<n.length)throw Error(se(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:mr(n)}}function lg(t,e){var n=mr(e.value),i=mr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function xh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function cg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ud(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?cg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ts,ug=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ts=Ts||document.createElement("div"),Ts.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ts.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function jo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var No={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},R_=["Webkit","ms","Moz","O"];Object.keys(No).forEach(function(t){R_.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),No[e]=No[t]})});function dg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||No.hasOwnProperty(t)&&No[t]?(""+e).trim():e+"px"}function fg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=dg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var w_=_t({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function dd(t,e){if(e){if(w_[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(se(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(se(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(se(61))}if(e.style!=null&&typeof e.style!="object")throw Error(se(62))}}function fd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var pd=null;function $f(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var hd=null,Da=null,La=null;function vh(t){if(t=hs(t)){if(typeof hd!="function")throw Error(se(280));var e=t.stateNode;e&&(e=_c(e),hd(t.stateNode,t.type,e))}}function pg(t){Da?La?La.push(t):La=[t]:Da=t}function hg(){if(Da){var t=Da,e=La;if(La=Da=null,vh(t),e)for(t=0;t<e.length;t++)vh(e[t])}}function mg(t,e){return t(e)}function gg(){}var Bc=!1;function xg(t,e,n){if(Bc)return t(e,n);Bc=!0;try{return mg(t,e,n)}finally{Bc=!1,(Da!==null||La!==null)&&(gg(),hg())}}function Xo(t,e){var n=t.stateNode;if(n===null)return null;var i=_c(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(se(231,e,typeof n));return n}var md=!1;if(Li)try{var ao={};Object.defineProperty(ao,"passive",{get:function(){md=!0}}),window.addEventListener("test",ao,ao),window.removeEventListener("test",ao,ao)}catch{md=!1}function P_(t,e,n,i,r,a,o,s,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(p){this.onError(p)}}var Fo=!1,Ul=null,Ol=!1,gd=null,I_={onError:function(t){Fo=!0,Ul=t}};function D_(t,e,n,i,r,a,o,s,l){Fo=!1,Ul=null,P_.apply(I_,arguments)}function L_(t,e,n,i,r,a,o,s,l){if(D_.apply(this,arguments),Fo){if(Fo){var c=Ul;Fo=!1,Ul=null}else throw Error(se(198));Ol||(Ol=!0,gd=c)}}function qr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function vg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function _h(t){if(qr(t)!==t)throw Error(se(188))}function N_(t){var e=t.alternate;if(!e){if(e=qr(t),e===null)throw Error(se(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var a=r.alternate;if(a===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===a.child){for(a=r.child;a;){if(a===n)return _h(r),t;if(a===i)return _h(r),e;a=a.sibling}throw Error(se(188))}if(n.return!==i.return)n=r,i=a;else{for(var o=!1,s=r.child;s;){if(s===n){o=!0,n=r,i=a;break}if(s===i){o=!0,i=r,n=a;break}s=s.sibling}if(!o){for(s=a.child;s;){if(s===n){o=!0,n=a,i=r;break}if(s===i){o=!0,i=a,n=r;break}s=s.sibling}if(!o)throw Error(se(189))}}if(n.alternate!==i)throw Error(se(190))}if(n.tag!==3)throw Error(se(188));return n.stateNode.current===n?t:e}function _g(t){return t=N_(t),t!==null?yg(t):null}function yg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=yg(t);if(e!==null)return e;t=t.sibling}return null}var Sg=En.unstable_scheduleCallback,yh=En.unstable_cancelCallback,F_=En.unstable_shouldYield,U_=En.unstable_requestPaint,Pt=En.unstable_now,O_=En.unstable_getCurrentPriorityLevel,Kf=En.unstable_ImmediatePriority,Mg=En.unstable_UserBlockingPriority,zl=En.unstable_NormalPriority,z_=En.unstable_LowPriority,Eg=En.unstable_IdlePriority,mc=null,di=null;function k_(t){if(di&&typeof di.onCommitFiberRoot=="function")try{di.onCommitFiberRoot(mc,t,void 0,(t.current.flags&128)===128)}catch{}}var Yn=Math.clz32?Math.clz32:H_,B_=Math.log,V_=Math.LN2;function H_(t){return t>>>=0,t===0?32:31-(B_(t)/V_|0)|0}var bs=64,Cs=4194304;function Po(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function kl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,a=t.pingedLanes,o=n&268435455;if(o!==0){var s=o&~r;s!==0?i=Po(s):(a&=o,a!==0&&(i=Po(a)))}else o=n&~r,o!==0?i=Po(o):a!==0&&(i=Po(a));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,a=e&-e,r>=a||r===16&&(a&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Yn(e),r=1<<n,i|=t[n],e&=~r;return i}function G_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function W_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,a=t.pendingLanes;0<a;){var o=31-Yn(a),s=1<<o,l=r[o];l===-1?(!(s&n)||s&i)&&(r[o]=G_(s,e)):l<=e&&(t.expiredLanes|=s),a&=~s}}function xd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Tg(){var t=bs;return bs<<=1,!(bs&4194240)&&(bs=64),t}function Vc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function fs(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Yn(e),t[e]=n}function j_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Yn(n),a=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~a}}function Zf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Yn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var it=0;function bg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Cg,Qf,Ag,Rg,wg,vd=!1,As=[],sr=null,lr=null,cr=null,qo=new Map,Yo=new Map,tr=[],X_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Sh(t,e){switch(t){case"focusin":case"focusout":sr=null;break;case"dragenter":case"dragleave":lr=null;break;case"mouseover":case"mouseout":cr=null;break;case"pointerover":case"pointerout":qo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Yo.delete(e.pointerId)}}function oo(t,e,n,i,r,a){return t===null||t.nativeEvent!==a?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[r]},e!==null&&(e=hs(e),e!==null&&Qf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function q_(t,e,n,i,r){switch(e){case"focusin":return sr=oo(sr,t,e,n,i,r),!0;case"dragenter":return lr=oo(lr,t,e,n,i,r),!0;case"mouseover":return cr=oo(cr,t,e,n,i,r),!0;case"pointerover":var a=r.pointerId;return qo.set(a,oo(qo.get(a)||null,t,e,n,i,r)),!0;case"gotpointercapture":return a=r.pointerId,Yo.set(a,oo(Yo.get(a)||null,t,e,n,i,r)),!0}return!1}function Pg(t){var e=Dr(t.target);if(e!==null){var n=qr(e);if(n!==null){if(e=n.tag,e===13){if(e=vg(n),e!==null){t.blockedOn=e,wg(t.priority,function(){Ag(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function _l(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=_d(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);pd=i,n.target.dispatchEvent(i),pd=null}else return e=hs(n),e!==null&&Qf(e),t.blockedOn=n,!1;e.shift()}return!0}function Mh(t,e,n){_l(t)&&n.delete(e)}function Y_(){vd=!1,sr!==null&&_l(sr)&&(sr=null),lr!==null&&_l(lr)&&(lr=null),cr!==null&&_l(cr)&&(cr=null),qo.forEach(Mh),Yo.forEach(Mh)}function so(t,e){t.blockedOn===e&&(t.blockedOn=null,vd||(vd=!0,En.unstable_scheduleCallback(En.unstable_NormalPriority,Y_)))}function $o(t){function e(r){return so(r,t)}if(0<As.length){so(As[0],t);for(var n=1;n<As.length;n++){var i=As[n];i.blockedOn===t&&(i.blockedOn=null)}}for(sr!==null&&so(sr,t),lr!==null&&so(lr,t),cr!==null&&so(cr,t),qo.forEach(e),Yo.forEach(e),n=0;n<tr.length;n++)i=tr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<tr.length&&(n=tr[0],n.blockedOn===null);)Pg(n),n.blockedOn===null&&tr.shift()}var Na=Bi.ReactCurrentBatchConfig,Bl=!0;function $_(t,e,n,i){var r=it,a=Na.transition;Na.transition=null;try{it=1,Jf(t,e,n,i)}finally{it=r,Na.transition=a}}function K_(t,e,n,i){var r=it,a=Na.transition;Na.transition=null;try{it=4,Jf(t,e,n,i)}finally{it=r,Na.transition=a}}function Jf(t,e,n,i){if(Bl){var r=_d(t,e,n,i);if(r===null)Zc(t,e,i,Vl,n),Sh(t,i);else if(q_(r,t,e,n,i))i.stopPropagation();else if(Sh(t,i),e&4&&-1<X_.indexOf(t)){for(;r!==null;){var a=hs(r);if(a!==null&&Cg(a),a=_d(t,e,n,i),a===null&&Zc(t,e,i,Vl,n),a===r)break;r=a}r!==null&&i.stopPropagation()}else Zc(t,e,i,null,n)}}var Vl=null;function _d(t,e,n,i){if(Vl=null,t=$f(i),t=Dr(t),t!==null)if(e=qr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=vg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Vl=t,null}function Ig(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(O_()){case Kf:return 1;case Mg:return 4;case zl:case z_:return 16;case Eg:return 536870912;default:return 16}default:return 16}}var rr=null,ep=null,yl=null;function Dg(){if(yl)return yl;var t,e=ep,n=e.length,i,r="value"in rr?rr.value:rr.textContent,a=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[a-i];i++);return yl=r.slice(t,1<i?1-i:void 0)}function Sl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Rs(){return!0}function Eh(){return!1}function bn(t){function e(n,i,r,a,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var s in t)t.hasOwnProperty(s)&&(n=t[s],this[s]=n?n(a):a[s]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Rs:Eh,this.isPropagationStopped=Eh,this}return _t(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Rs)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Rs)},persist:function(){},isPersistent:Rs}),e}var Qa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},tp=bn(Qa),ps=_t({},Qa,{view:0,detail:0}),Z_=bn(ps),Hc,Gc,lo,gc=_t({},ps,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:np,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==lo&&(lo&&t.type==="mousemove"?(Hc=t.screenX-lo.screenX,Gc=t.screenY-lo.screenY):Gc=Hc=0,lo=t),Hc)},movementY:function(t){return"movementY"in t?t.movementY:Gc}}),Th=bn(gc),Q_=_t({},gc,{dataTransfer:0}),J_=bn(Q_),ey=_t({},ps,{relatedTarget:0}),Wc=bn(ey),ty=_t({},Qa,{animationName:0,elapsedTime:0,pseudoElement:0}),ny=bn(ty),iy=_t({},Qa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ry=bn(iy),ay=_t({},Qa,{data:0}),bh=bn(ay),oy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ly={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function cy(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=ly[t])?!!e[t]:!1}function np(){return cy}var uy=_t({},ps,{key:function(t){if(t.key){var e=oy[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Sl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?sy[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:np,charCode:function(t){return t.type==="keypress"?Sl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Sl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),dy=bn(uy),fy=_t({},gc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ch=bn(fy),py=_t({},ps,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:np}),hy=bn(py),my=_t({},Qa,{propertyName:0,elapsedTime:0,pseudoElement:0}),gy=bn(my),xy=_t({},gc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),vy=bn(xy),_y=[9,13,27,32],ip=Li&&"CompositionEvent"in window,Uo=null;Li&&"documentMode"in document&&(Uo=document.documentMode);var yy=Li&&"TextEvent"in window&&!Uo,Lg=Li&&(!ip||Uo&&8<Uo&&11>=Uo),Ah=" ",Rh=!1;function Ng(t,e){switch(t){case"keyup":return _y.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Fg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ya=!1;function Sy(t,e){switch(t){case"compositionend":return Fg(e);case"keypress":return e.which!==32?null:(Rh=!0,Ah);case"textInput":return t=e.data,t===Ah&&Rh?null:t;default:return null}}function My(t,e){if(ya)return t==="compositionend"||!ip&&Ng(t,e)?(t=Dg(),yl=ep=rr=null,ya=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Lg&&e.locale!=="ko"?null:e.data;default:return null}}var Ey={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Ey[t.type]:e==="textarea"}function Ug(t,e,n,i){pg(i),e=Hl(e,"onChange"),0<e.length&&(n=new tp("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Oo=null,Ko=null;function Ty(t){qg(t,0)}function xc(t){var e=Ea(t);if(og(e))return t}function by(t,e){if(t==="change")return e}var Og=!1;if(Li){var jc;if(Li){var Xc="oninput"in document;if(!Xc){var Ph=document.createElement("div");Ph.setAttribute("oninput","return;"),Xc=typeof Ph.oninput=="function"}jc=Xc}else jc=!1;Og=jc&&(!document.documentMode||9<document.documentMode)}function Ih(){Oo&&(Oo.detachEvent("onpropertychange",zg),Ko=Oo=null)}function zg(t){if(t.propertyName==="value"&&xc(Ko)){var e=[];Ug(e,Ko,t,$f(t)),xg(Ty,e)}}function Cy(t,e,n){t==="focusin"?(Ih(),Oo=e,Ko=n,Oo.attachEvent("onpropertychange",zg)):t==="focusout"&&Ih()}function Ay(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return xc(Ko)}function Ry(t,e){if(t==="click")return xc(e)}function wy(t,e){if(t==="input"||t==="change")return xc(e)}function Py(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Kn=typeof Object.is=="function"?Object.is:Py;function Zo(t,e){if(Kn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!td.call(e,r)||!Kn(t[r],e[r]))return!1}return!0}function Dh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Lh(t,e){var n=Dh(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Dh(n)}}function kg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?kg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Bg(){for(var t=window,e=Fl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Fl(t.document)}return e}function rp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Iy(t){var e=Bg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&kg(n.ownerDocument.documentElement,n)){if(i!==null&&rp(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,a=Math.min(i.start,r);i=i.end===void 0?a:Math.min(i.end,r),!t.extend&&a>i&&(r=i,i=a,a=r),r=Lh(n,a);var o=Lh(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),a>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Dy=Li&&"documentMode"in document&&11>=document.documentMode,Sa=null,yd=null,zo=null,Sd=!1;function Nh(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Sd||Sa==null||Sa!==Fl(i)||(i=Sa,"selectionStart"in i&&rp(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),zo&&Zo(zo,i)||(zo=i,i=Hl(yd,"onSelect"),0<i.length&&(e=new tp("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Sa)))}function ws(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ma={animationend:ws("Animation","AnimationEnd"),animationiteration:ws("Animation","AnimationIteration"),animationstart:ws("Animation","AnimationStart"),transitionend:ws("Transition","TransitionEnd")},qc={},Vg={};Li&&(Vg=document.createElement("div").style,"AnimationEvent"in window||(delete Ma.animationend.animation,delete Ma.animationiteration.animation,delete Ma.animationstart.animation),"TransitionEvent"in window||delete Ma.transitionend.transition);function vc(t){if(qc[t])return qc[t];if(!Ma[t])return t;var e=Ma[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Vg)return qc[t]=e[n];return t}var Hg=vc("animationend"),Gg=vc("animationiteration"),Wg=vc("animationstart"),jg=vc("transitionend"),Xg=new Map,Fh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vr(t,e){Xg.set(t,e),Xr(e,[t])}for(var Yc=0;Yc<Fh.length;Yc++){var $c=Fh[Yc],Ly=$c.toLowerCase(),Ny=$c[0].toUpperCase()+$c.slice(1);vr(Ly,"on"+Ny)}vr(Hg,"onAnimationEnd");vr(Gg,"onAnimationIteration");vr(Wg,"onAnimationStart");vr("dblclick","onDoubleClick");vr("focusin","onFocus");vr("focusout","onBlur");vr(jg,"onTransitionEnd");Ba("onMouseEnter",["mouseout","mouseover"]);Ba("onMouseLeave",["mouseout","mouseover"]);Ba("onPointerEnter",["pointerout","pointerover"]);Ba("onPointerLeave",["pointerout","pointerover"]);Xr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Xr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Xr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Xr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Xr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Xr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Io="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Fy=new Set("cancel close invalid load scroll toggle".split(" ").concat(Io));function Uh(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,L_(i,e,void 0,t),t.currentTarget=null}function qg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var a=void 0;if(e)for(var o=i.length-1;0<=o;o--){var s=i[o],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==a&&r.isPropagationStopped())break e;Uh(r,s,c),a=l}else for(o=0;o<i.length;o++){if(s=i[o],l=s.instance,c=s.currentTarget,s=s.listener,l!==a&&r.isPropagationStopped())break e;Uh(r,s,c),a=l}}}if(Ol)throw t=gd,Ol=!1,gd=null,t}function ut(t,e){var n=e[Cd];n===void 0&&(n=e[Cd]=new Set);var i=t+"__bubble";n.has(i)||(Yg(e,t,2,!1),n.add(i))}function Kc(t,e,n){var i=0;e&&(i|=4),Yg(n,t,i,e)}var Ps="_reactListening"+Math.random().toString(36).slice(2);function Qo(t){if(!t[Ps]){t[Ps]=!0,tg.forEach(function(n){n!=="selectionchange"&&(Fy.has(n)||Kc(n,!1,t),Kc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ps]||(e[Ps]=!0,Kc("selectionchange",!1,e))}}function Yg(t,e,n,i){switch(Ig(e)){case 1:var r=$_;break;case 4:r=K_;break;default:r=Jf}n=r.bind(null,e,n,t),r=void 0,!md||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Zc(t,e,n,i,r){var a=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var s=i.stateNode.containerInfo;if(s===r||s.nodeType===8&&s.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;s!==null;){if(o=Dr(s),o===null)return;if(l=o.tag,l===5||l===6){i=a=o;continue e}s=s.parentNode}}i=i.return}xg(function(){var c=a,p=$f(n),h=[];e:{var u=Xg.get(t);if(u!==void 0){var m=tp,_=t;switch(t){case"keypress":if(Sl(n)===0)break e;case"keydown":case"keyup":m=dy;break;case"focusin":_="focus",m=Wc;break;case"focusout":_="blur",m=Wc;break;case"beforeblur":case"afterblur":m=Wc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Th;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=J_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=hy;break;case Hg:case Gg:case Wg:m=ny;break;case jg:m=gy;break;case"scroll":m=Z_;break;case"wheel":m=vy;break;case"copy":case"cut":case"paste":m=ry;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Ch}var E=(e&4)!==0,g=!E&&t==="scroll",d=E?u!==null?u+"Capture":null:u;E=[];for(var x=c,M;x!==null;){M=x;var S=M.stateNode;if(M.tag===5&&S!==null&&(M=S,d!==null&&(S=Xo(x,d),S!=null&&E.push(Jo(x,S,M)))),g)break;x=x.return}0<E.length&&(u=new m(u,_,null,n,p),h.push({event:u,listeners:E}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",u&&n!==pd&&(_=n.relatedTarget||n.fromElement)&&(Dr(_)||_[Ni]))break e;if((m||u)&&(u=p.window===p?p:(u=p.ownerDocument)?u.defaultView||u.parentWindow:window,m?(_=n.relatedTarget||n.toElement,m=c,_=_?Dr(_):null,_!==null&&(g=qr(_),_!==g||_.tag!==5&&_.tag!==6)&&(_=null)):(m=null,_=c),m!==_)){if(E=Th,S="onMouseLeave",d="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(E=Ch,S="onPointerLeave",d="onPointerEnter",x="pointer"),g=m==null?u:Ea(m),M=_==null?u:Ea(_),u=new E(S,x+"leave",m,n,p),u.target=g,u.relatedTarget=M,S=null,Dr(p)===c&&(E=new E(d,x+"enter",_,n,p),E.target=M,E.relatedTarget=g,S=E),g=S,m&&_)t:{for(E=m,d=_,x=0,M=E;M;M=Zr(M))x++;for(M=0,S=d;S;S=Zr(S))M++;for(;0<x-M;)E=Zr(E),x--;for(;0<M-x;)d=Zr(d),M--;for(;x--;){if(E===d||d!==null&&E===d.alternate)break t;E=Zr(E),d=Zr(d)}E=null}else E=null;m!==null&&Oh(h,u,m,E,!1),_!==null&&g!==null&&Oh(h,g,_,E,!0)}}e:{if(u=c?Ea(c):window,m=u.nodeName&&u.nodeName.toLowerCase(),m==="select"||m==="input"&&u.type==="file")var b=by;else if(wh(u))if(Og)b=wy;else{b=Ay;var T=Cy}else(m=u.nodeName)&&m.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(b=Ry);if(b&&(b=b(t,c))){Ug(h,b,n,p);break e}T&&T(t,u,c),t==="focusout"&&(T=u._wrapperState)&&T.controlled&&u.type==="number"&&ld(u,"number",u.value)}switch(T=c?Ea(c):window,t){case"focusin":(wh(T)||T.contentEditable==="true")&&(Sa=T,yd=c,zo=null);break;case"focusout":zo=yd=Sa=null;break;case"mousedown":Sd=!0;break;case"contextmenu":case"mouseup":case"dragend":Sd=!1,Nh(h,n,p);break;case"selectionchange":if(Dy)break;case"keydown":case"keyup":Nh(h,n,p)}var A;if(ip)e:{switch(t){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else ya?Ng(t,n)&&(v="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(v="onCompositionStart");v&&(Lg&&n.locale!=="ko"&&(ya||v!=="onCompositionStart"?v==="onCompositionEnd"&&ya&&(A=Dg()):(rr=p,ep="value"in rr?rr.value:rr.textContent,ya=!0)),T=Hl(c,v),0<T.length&&(v=new bh(v,t,null,n,p),h.push({event:v,listeners:T}),A?v.data=A:(A=Fg(n),A!==null&&(v.data=A)))),(A=yy?Sy(t,n):My(t,n))&&(c=Hl(c,"onBeforeInput"),0<c.length&&(p=new bh("onBeforeInput","beforeinput",null,n,p),h.push({event:p,listeners:c}),p.data=A))}qg(h,e)})}function Jo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Hl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,a=r.stateNode;r.tag===5&&a!==null&&(r=a,a=Xo(t,n),a!=null&&i.unshift(Jo(t,a,r)),a=Xo(t,e),a!=null&&i.push(Jo(t,a,r))),t=t.return}return i}function Zr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Oh(t,e,n,i,r){for(var a=e._reactName,o=[];n!==null&&n!==i;){var s=n,l=s.alternate,c=s.stateNode;if(l!==null&&l===i)break;s.tag===5&&c!==null&&(s=c,r?(l=Xo(n,a),l!=null&&o.unshift(Jo(n,l,s))):r||(l=Xo(n,a),l!=null&&o.push(Jo(n,l,s)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Uy=/\r\n?/g,Oy=/\u0000|\uFFFD/g;function zh(t){return(typeof t=="string"?t:""+t).replace(Uy,`
`).replace(Oy,"")}function Is(t,e,n){if(e=zh(e),zh(t)!==e&&n)throw Error(se(425))}function Gl(){}var Md=null,Ed=null;function Td(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var bd=typeof setTimeout=="function"?setTimeout:void 0,zy=typeof clearTimeout=="function"?clearTimeout:void 0,kh=typeof Promise=="function"?Promise:void 0,ky=typeof queueMicrotask=="function"?queueMicrotask:typeof kh<"u"?function(t){return kh.resolve(null).then(t).catch(By)}:bd;function By(t){setTimeout(function(){throw t})}function Qc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),$o(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);$o(e)}function ur(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Bh(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ja=Math.random().toString(36).slice(2),li="__reactFiber$"+Ja,es="__reactProps$"+Ja,Ni="__reactContainer$"+Ja,Cd="__reactEvents$"+Ja,Vy="__reactListeners$"+Ja,Hy="__reactHandles$"+Ja;function Dr(t){var e=t[li];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ni]||n[li]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Bh(t);t!==null;){if(n=t[li])return n;t=Bh(t)}return e}t=n,n=t.parentNode}return null}function hs(t){return t=t[li]||t[Ni],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ea(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(se(33))}function _c(t){return t[es]||null}var Ad=[],Ta=-1;function _r(t){return{current:t}}function dt(t){0>Ta||(t.current=Ad[Ta],Ad[Ta]=null,Ta--)}function ct(t,e){Ta++,Ad[Ta]=t.current,t.current=e}var gr={},nn=_r(gr),fn=_r(!1),kr=gr;function Va(t,e){var n=t.type.contextTypes;if(!n)return gr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},a;for(a in n)r[a]=e[a];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function pn(t){return t=t.childContextTypes,t!=null}function Wl(){dt(fn),dt(nn)}function Vh(t,e,n){if(nn.current!==gr)throw Error(se(168));ct(nn,e),ct(fn,n)}function $g(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(se(108,C_(t)||"Unknown",r));return _t({},n,i)}function jl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||gr,kr=nn.current,ct(nn,t),ct(fn,fn.current),!0}function Hh(t,e,n){var i=t.stateNode;if(!i)throw Error(se(169));n?(t=$g(t,e,kr),i.__reactInternalMemoizedMergedChildContext=t,dt(fn),dt(nn),ct(nn,t)):dt(fn),ct(fn,n)}var Ti=null,yc=!1,Jc=!1;function Kg(t){Ti===null?Ti=[t]:Ti.push(t)}function Gy(t){yc=!0,Kg(t)}function yr(){if(!Jc&&Ti!==null){Jc=!0;var t=0,e=it;try{var n=Ti;for(it=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ti=null,yc=!1}catch(r){throw Ti!==null&&(Ti=Ti.slice(t+1)),Sg(Kf,yr),r}finally{it=e,Jc=!1}}return null}var ba=[],Ca=0,Xl=null,ql=0,In=[],Dn=0,Br=null,Ci=1,Ai="";function Cr(t,e){ba[Ca++]=ql,ba[Ca++]=Xl,Xl=t,ql=e}function Zg(t,e,n){In[Dn++]=Ci,In[Dn++]=Ai,In[Dn++]=Br,Br=t;var i=Ci;t=Ai;var r=32-Yn(i)-1;i&=~(1<<r),n+=1;var a=32-Yn(e)+r;if(30<a){var o=r-r%5;a=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Ci=1<<32-Yn(e)+r|n<<r|i,Ai=a+t}else Ci=1<<a|n<<r|i,Ai=t}function ap(t){t.return!==null&&(Cr(t,1),Zg(t,1,0))}function op(t){for(;t===Xl;)Xl=ba[--Ca],ba[Ca]=null,ql=ba[--Ca],ba[Ca]=null;for(;t===Br;)Br=In[--Dn],In[Dn]=null,Ai=In[--Dn],In[Dn]=null,Ci=In[--Dn],In[Dn]=null}var Mn=null,Sn=null,pt=!1,jn=null;function Qg(t,e){var n=Nn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Gh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Mn=t,Sn=ur(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Mn=t,Sn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Br!==null?{id:Ci,overflow:Ai}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Nn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Mn=t,Sn=null,!0):!1;default:return!1}}function Rd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function wd(t){if(pt){var e=Sn;if(e){var n=e;if(!Gh(t,e)){if(Rd(t))throw Error(se(418));e=ur(n.nextSibling);var i=Mn;e&&Gh(t,e)?Qg(i,n):(t.flags=t.flags&-4097|2,pt=!1,Mn=t)}}else{if(Rd(t))throw Error(se(418));t.flags=t.flags&-4097|2,pt=!1,Mn=t}}}function Wh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Mn=t}function Ds(t){if(t!==Mn)return!1;if(!pt)return Wh(t),pt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Td(t.type,t.memoizedProps)),e&&(e=Sn)){if(Rd(t))throw Jg(),Error(se(418));for(;e;)Qg(t,e),e=ur(e.nextSibling)}if(Wh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(se(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Sn=ur(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Sn=null}}else Sn=Mn?ur(t.stateNode.nextSibling):null;return!0}function Jg(){for(var t=Sn;t;)t=ur(t.nextSibling)}function Ha(){Sn=Mn=null,pt=!1}function sp(t){jn===null?jn=[t]:jn.push(t)}var Wy=Bi.ReactCurrentBatchConfig;function co(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(se(309));var i=n.stateNode}if(!i)throw Error(se(147,t));var r=i,a=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===a?e.ref:(e=function(o){var s=r.refs;o===null?delete s[a]:s[a]=o},e._stringRef=a,e)}if(typeof t!="string")throw Error(se(284));if(!n._owner)throw Error(se(290,t))}return t}function Ls(t,e){throw t=Object.prototype.toString.call(e),Error(se(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function jh(t){var e=t._init;return e(t._payload)}function ex(t){function e(d,x){if(t){var M=d.deletions;M===null?(d.deletions=[x],d.flags|=16):M.push(x)}}function n(d,x){if(!t)return null;for(;x!==null;)e(d,x),x=x.sibling;return null}function i(d,x){for(d=new Map;x!==null;)x.key!==null?d.set(x.key,x):d.set(x.index,x),x=x.sibling;return d}function r(d,x){return d=hr(d,x),d.index=0,d.sibling=null,d}function a(d,x,M){return d.index=M,t?(M=d.alternate,M!==null?(M=M.index,M<x?(d.flags|=2,x):M):(d.flags|=2,x)):(d.flags|=1048576,x)}function o(d){return t&&d.alternate===null&&(d.flags|=2),d}function s(d,x,M,S){return x===null||x.tag!==6?(x=ou(M,d.mode,S),x.return=d,x):(x=r(x,M),x.return=d,x)}function l(d,x,M,S){var b=M.type;return b===_a?p(d,x,M.props.children,S,M.key):x!==null&&(x.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ji&&jh(b)===x.type)?(S=r(x,M.props),S.ref=co(d,x,M),S.return=d,S):(S=Rl(M.type,M.key,M.props,null,d.mode,S),S.ref=co(d,x,M),S.return=d,S)}function c(d,x,M,S){return x===null||x.tag!==4||x.stateNode.containerInfo!==M.containerInfo||x.stateNode.implementation!==M.implementation?(x=su(M,d.mode,S),x.return=d,x):(x=r(x,M.children||[]),x.return=d,x)}function p(d,x,M,S,b){return x===null||x.tag!==7?(x=zr(M,d.mode,S,b),x.return=d,x):(x=r(x,M),x.return=d,x)}function h(d,x,M){if(typeof x=="string"&&x!==""||typeof x=="number")return x=ou(""+x,d.mode,M),x.return=d,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ms:return M=Rl(x.type,x.key,x.props,null,d.mode,M),M.ref=co(d,null,x),M.return=d,M;case va:return x=su(x,d.mode,M),x.return=d,x;case Ji:var S=x._init;return h(d,S(x._payload),M)}if(wo(x)||ro(x))return x=zr(x,d.mode,M,null),x.return=d,x;Ls(d,x)}return null}function u(d,x,M,S){var b=x!==null?x.key:null;if(typeof M=="string"&&M!==""||typeof M=="number")return b!==null?null:s(d,x,""+M,S);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Ms:return M.key===b?l(d,x,M,S):null;case va:return M.key===b?c(d,x,M,S):null;case Ji:return b=M._init,u(d,x,b(M._payload),S)}if(wo(M)||ro(M))return b!==null?null:p(d,x,M,S,null);Ls(d,M)}return null}function m(d,x,M,S,b){if(typeof S=="string"&&S!==""||typeof S=="number")return d=d.get(M)||null,s(x,d,""+S,b);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Ms:return d=d.get(S.key===null?M:S.key)||null,l(x,d,S,b);case va:return d=d.get(S.key===null?M:S.key)||null,c(x,d,S,b);case Ji:var T=S._init;return m(d,x,M,T(S._payload),b)}if(wo(S)||ro(S))return d=d.get(M)||null,p(x,d,S,b,null);Ls(x,S)}return null}function _(d,x,M,S){for(var b=null,T=null,A=x,v=x=0,R=null;A!==null&&v<M.length;v++){A.index>v?(R=A,A=null):R=A.sibling;var P=u(d,A,M[v],S);if(P===null){A===null&&(A=R);break}t&&A&&P.alternate===null&&e(d,A),x=a(P,x,v),T===null?b=P:T.sibling=P,T=P,A=R}if(v===M.length)return n(d,A),pt&&Cr(d,v),b;if(A===null){for(;v<M.length;v++)A=h(d,M[v],S),A!==null&&(x=a(A,x,v),T===null?b=A:T.sibling=A,T=A);return pt&&Cr(d,v),b}for(A=i(d,A);v<M.length;v++)R=m(A,d,v,M[v],S),R!==null&&(t&&R.alternate!==null&&A.delete(R.key===null?v:R.key),x=a(R,x,v),T===null?b=R:T.sibling=R,T=R);return t&&A.forEach(function(I){return e(d,I)}),pt&&Cr(d,v),b}function E(d,x,M,S){var b=ro(M);if(typeof b!="function")throw Error(se(150));if(M=b.call(M),M==null)throw Error(se(151));for(var T=b=null,A=x,v=x=0,R=null,P=M.next();A!==null&&!P.done;v++,P=M.next()){A.index>v?(R=A,A=null):R=A.sibling;var I=u(d,A,P.value,S);if(I===null){A===null&&(A=R);break}t&&A&&I.alternate===null&&e(d,A),x=a(I,x,v),T===null?b=I:T.sibling=I,T=I,A=R}if(P.done)return n(d,A),pt&&Cr(d,v),b;if(A===null){for(;!P.done;v++,P=M.next())P=h(d,P.value,S),P!==null&&(x=a(P,x,v),T===null?b=P:T.sibling=P,T=P);return pt&&Cr(d,v),b}for(A=i(d,A);!P.done;v++,P=M.next())P=m(A,d,v,P.value,S),P!==null&&(t&&P.alternate!==null&&A.delete(P.key===null?v:P.key),x=a(P,x,v),T===null?b=P:T.sibling=P,T=P);return t&&A.forEach(function(O){return e(d,O)}),pt&&Cr(d,v),b}function g(d,x,M,S){if(typeof M=="object"&&M!==null&&M.type===_a&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case Ms:e:{for(var b=M.key,T=x;T!==null;){if(T.key===b){if(b=M.type,b===_a){if(T.tag===7){n(d,T.sibling),x=r(T,M.props.children),x.return=d,d=x;break e}}else if(T.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ji&&jh(b)===T.type){n(d,T.sibling),x=r(T,M.props),x.ref=co(d,T,M),x.return=d,d=x;break e}n(d,T);break}else e(d,T);T=T.sibling}M.type===_a?(x=zr(M.props.children,d.mode,S,M.key),x.return=d,d=x):(S=Rl(M.type,M.key,M.props,null,d.mode,S),S.ref=co(d,x,M),S.return=d,d=S)}return o(d);case va:e:{for(T=M.key;x!==null;){if(x.key===T)if(x.tag===4&&x.stateNode.containerInfo===M.containerInfo&&x.stateNode.implementation===M.implementation){n(d,x.sibling),x=r(x,M.children||[]),x.return=d,d=x;break e}else{n(d,x);break}else e(d,x);x=x.sibling}x=su(M,d.mode,S),x.return=d,d=x}return o(d);case Ji:return T=M._init,g(d,x,T(M._payload),S)}if(wo(M))return _(d,x,M,S);if(ro(M))return E(d,x,M,S);Ls(d,M)}return typeof M=="string"&&M!==""||typeof M=="number"?(M=""+M,x!==null&&x.tag===6?(n(d,x.sibling),x=r(x,M),x.return=d,d=x):(n(d,x),x=ou(M,d.mode,S),x.return=d,d=x),o(d)):n(d,x)}return g}var Ga=ex(!0),tx=ex(!1),Yl=_r(null),$l=null,Aa=null,lp=null;function cp(){lp=Aa=$l=null}function up(t){var e=Yl.current;dt(Yl),t._currentValue=e}function Pd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Fa(t,e){$l=t,lp=Aa=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(dn=!0),t.firstContext=null)}function Un(t){var e=t._currentValue;if(lp!==t)if(t={context:t,memoizedValue:e,next:null},Aa===null){if($l===null)throw Error(se(308));Aa=t,$l.dependencies={lanes:0,firstContext:t}}else Aa=Aa.next=t;return e}var Lr=null;function dp(t){Lr===null?Lr=[t]:Lr.push(t)}function nx(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,dp(e)):(n.next=r.next,r.next=n),e.interleaved=n,Fi(t,i)}function Fi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var er=!1;function fp(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ix(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Pi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function dr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Je&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Fi(t,n)}return r=i.interleaved,r===null?(e.next=e,dp(i)):(e.next=r.next,r.next=e),i.interleaved=e,Fi(t,n)}function Ml(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Zf(t,n)}}function Xh(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?r=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?r=a=e:a=a.next=e}else r=a=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:a,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Kl(t,e,n,i){var r=t.updateQueue;er=!1;var a=r.firstBaseUpdate,o=r.lastBaseUpdate,s=r.shared.pending;if(s!==null){r.shared.pending=null;var l=s,c=l.next;l.next=null,o===null?a=c:o.next=c,o=l;var p=t.alternate;p!==null&&(p=p.updateQueue,s=p.lastBaseUpdate,s!==o&&(s===null?p.firstBaseUpdate=c:s.next=c,p.lastBaseUpdate=l))}if(a!==null){var h=r.baseState;o=0,p=c=l=null,s=a;do{var u=s.lane,m=s.eventTime;if((i&u)===u){p!==null&&(p=p.next={eventTime:m,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var _=t,E=s;switch(u=e,m=n,E.tag){case 1:if(_=E.payload,typeof _=="function"){h=_.call(m,h,u);break e}h=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=E.payload,u=typeof _=="function"?_.call(m,h,u):_,u==null)break e;h=_t({},h,u);break e;case 2:er=!0}}s.callback!==null&&s.lane!==0&&(t.flags|=64,u=r.effects,u===null?r.effects=[s]:u.push(s))}else m={eventTime:m,lane:u,tag:s.tag,payload:s.payload,callback:s.callback,next:null},p===null?(c=p=m,l=h):p=p.next=m,o|=u;if(s=s.next,s===null){if(s=r.shared.pending,s===null)break;u=s,s=u.next,u.next=null,r.lastBaseUpdate=u,r.shared.pending=null}}while(!0);if(p===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=p,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else a===null&&(r.shared.lanes=0);Hr|=o,t.lanes=o,t.memoizedState=h}}function qh(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(se(191,r));r.call(i)}}}var ms={},fi=_r(ms),ts=_r(ms),ns=_r(ms);function Nr(t){if(t===ms)throw Error(se(174));return t}function pp(t,e){switch(ct(ns,e),ct(ts,t),ct(fi,ms),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ud(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=ud(e,t)}dt(fi),ct(fi,e)}function Wa(){dt(fi),dt(ts),dt(ns)}function rx(t){Nr(ns.current);var e=Nr(fi.current),n=ud(e,t.type);e!==n&&(ct(ts,t),ct(fi,n))}function hp(t){ts.current===t&&(dt(fi),dt(ts))}var mt=_r(0);function Zl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var eu=[];function mp(){for(var t=0;t<eu.length;t++)eu[t]._workInProgressVersionPrimary=null;eu.length=0}var El=Bi.ReactCurrentDispatcher,tu=Bi.ReactCurrentBatchConfig,Vr=0,xt=null,Ft=null,Bt=null,Ql=!1,ko=!1,is=0,jy=0;function $t(){throw Error(se(321))}function gp(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Kn(t[n],e[n]))return!1;return!0}function xp(t,e,n,i,r,a){if(Vr=a,xt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,El.current=t===null||t.memoizedState===null?$y:Ky,t=n(i,r),ko){a=0;do{if(ko=!1,is=0,25<=a)throw Error(se(301));a+=1,Bt=Ft=null,e.updateQueue=null,El.current=Zy,t=n(i,r)}while(ko)}if(El.current=Jl,e=Ft!==null&&Ft.next!==null,Vr=0,Bt=Ft=xt=null,Ql=!1,e)throw Error(se(300));return t}function vp(){var t=is!==0;return is=0,t}function oi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Bt===null?xt.memoizedState=Bt=t:Bt=Bt.next=t,Bt}function On(){if(Ft===null){var t=xt.alternate;t=t!==null?t.memoizedState:null}else t=Ft.next;var e=Bt===null?xt.memoizedState:Bt.next;if(e!==null)Bt=e,Ft=t;else{if(t===null)throw Error(se(310));Ft=t,t={memoizedState:Ft.memoizedState,baseState:Ft.baseState,baseQueue:Ft.baseQueue,queue:Ft.queue,next:null},Bt===null?xt.memoizedState=Bt=t:Bt=Bt.next=t}return Bt}function rs(t,e){return typeof e=="function"?e(t):e}function nu(t){var e=On(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=Ft,r=i.baseQueue,a=n.pending;if(a!==null){if(r!==null){var o=r.next;r.next=a.next,a.next=o}i.baseQueue=r=a,n.pending=null}if(r!==null){a=r.next,i=i.baseState;var s=o=null,l=null,c=a;do{var p=c.lane;if((Vr&p)===p)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:p,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(s=l=h,o=i):l=l.next=h,xt.lanes|=p,Hr|=p}c=c.next}while(c!==null&&c!==a);l===null?o=i:l.next=s,Kn(i,e.memoizedState)||(dn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do a=r.lane,xt.lanes|=a,Hr|=a,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function iu(t){var e=On(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,a=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do a=t(a,o.action),o=o.next;while(o!==r);Kn(a,e.memoizedState)||(dn=!0),e.memoizedState=a,e.baseQueue===null&&(e.baseState=a),n.lastRenderedState=a}return[a,i]}function ax(){}function ox(t,e){var n=xt,i=On(),r=e(),a=!Kn(i.memoizedState,r);if(a&&(i.memoizedState=r,dn=!0),i=i.queue,_p(cx.bind(null,n,i,t),[t]),i.getSnapshot!==e||a||Bt!==null&&Bt.memoizedState.tag&1){if(n.flags|=2048,as(9,lx.bind(null,n,i,r,e),void 0,null),Ht===null)throw Error(se(349));Vr&30||sx(n,e,r)}return r}function sx(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=xt.updateQueue,e===null?(e={lastEffect:null,stores:null},xt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function lx(t,e,n,i){e.value=n,e.getSnapshot=i,ux(e)&&dx(t)}function cx(t,e,n){return n(function(){ux(e)&&dx(t)})}function ux(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Kn(t,n)}catch{return!0}}function dx(t){var e=Fi(t,1);e!==null&&$n(e,t,1,-1)}function Yh(t){var e=oi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:t},e.queue=t,t=t.dispatch=Yy.bind(null,xt,t),[e.memoizedState,t]}function as(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=xt.updateQueue,e===null?(e={lastEffect:null,stores:null},xt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function fx(){return On().memoizedState}function Tl(t,e,n,i){var r=oi();xt.flags|=t,r.memoizedState=as(1|e,n,void 0,i===void 0?null:i)}function Sc(t,e,n,i){var r=On();i=i===void 0?null:i;var a=void 0;if(Ft!==null){var o=Ft.memoizedState;if(a=o.destroy,i!==null&&gp(i,o.deps)){r.memoizedState=as(e,n,a,i);return}}xt.flags|=t,r.memoizedState=as(1|e,n,a,i)}function $h(t,e){return Tl(8390656,8,t,e)}function _p(t,e){return Sc(2048,8,t,e)}function px(t,e){return Sc(4,2,t,e)}function hx(t,e){return Sc(4,4,t,e)}function mx(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function gx(t,e,n){return n=n!=null?n.concat([t]):null,Sc(4,4,mx.bind(null,e,t),n)}function yp(){}function xx(t,e){var n=On();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&gp(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function vx(t,e){var n=On();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&gp(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function _x(t,e,n){return Vr&21?(Kn(n,e)||(n=Tg(),xt.lanes|=n,Hr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,dn=!0),t.memoizedState=n)}function Xy(t,e){var n=it;it=n!==0&&4>n?n:4,t(!0);var i=tu.transition;tu.transition={};try{t(!1),e()}finally{it=n,tu.transition=i}}function yx(){return On().memoizedState}function qy(t,e,n){var i=pr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Sx(t))Mx(e,n);else if(n=nx(t,e,n,i),n!==null){var r=on();$n(n,t,i,r),Ex(n,e,i)}}function Yy(t,e,n){var i=pr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Sx(t))Mx(e,r);else{var a=t.alternate;if(t.lanes===0&&(a===null||a.lanes===0)&&(a=e.lastRenderedReducer,a!==null))try{var o=e.lastRenderedState,s=a(o,n);if(r.hasEagerState=!0,r.eagerState=s,Kn(s,o)){var l=e.interleaved;l===null?(r.next=r,dp(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=nx(t,e,r,i),n!==null&&(r=on(),$n(n,t,i,r),Ex(n,e,i))}}function Sx(t){var e=t.alternate;return t===xt||e!==null&&e===xt}function Mx(t,e){ko=Ql=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Ex(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Zf(t,n)}}var Jl={readContext:Un,useCallback:$t,useContext:$t,useEffect:$t,useImperativeHandle:$t,useInsertionEffect:$t,useLayoutEffect:$t,useMemo:$t,useReducer:$t,useRef:$t,useState:$t,useDebugValue:$t,useDeferredValue:$t,useTransition:$t,useMutableSource:$t,useSyncExternalStore:$t,useId:$t,unstable_isNewReconciler:!1},$y={readContext:Un,useCallback:function(t,e){return oi().memoizedState=[t,e===void 0?null:e],t},useContext:Un,useEffect:$h,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Tl(4194308,4,mx.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Tl(4194308,4,t,e)},useInsertionEffect:function(t,e){return Tl(4,2,t,e)},useMemo:function(t,e){var n=oi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=oi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=qy.bind(null,xt,t),[i.memoizedState,t]},useRef:function(t){var e=oi();return t={current:t},e.memoizedState=t},useState:Yh,useDebugValue:yp,useDeferredValue:function(t){return oi().memoizedState=t},useTransition:function(){var t=Yh(!1),e=t[0];return t=Xy.bind(null,t[1]),oi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=xt,r=oi();if(pt){if(n===void 0)throw Error(se(407));n=n()}else{if(n=e(),Ht===null)throw Error(se(349));Vr&30||sx(i,e,n)}r.memoizedState=n;var a={value:n,getSnapshot:e};return r.queue=a,$h(cx.bind(null,i,a,t),[t]),i.flags|=2048,as(9,lx.bind(null,i,a,n,e),void 0,null),n},useId:function(){var t=oi(),e=Ht.identifierPrefix;if(pt){var n=Ai,i=Ci;n=(i&~(1<<32-Yn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=is++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=jy++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Ky={readContext:Un,useCallback:xx,useContext:Un,useEffect:_p,useImperativeHandle:gx,useInsertionEffect:px,useLayoutEffect:hx,useMemo:vx,useReducer:nu,useRef:fx,useState:function(){return nu(rs)},useDebugValue:yp,useDeferredValue:function(t){var e=On();return _x(e,Ft.memoizedState,t)},useTransition:function(){var t=nu(rs)[0],e=On().memoizedState;return[t,e]},useMutableSource:ax,useSyncExternalStore:ox,useId:yx,unstable_isNewReconciler:!1},Zy={readContext:Un,useCallback:xx,useContext:Un,useEffect:_p,useImperativeHandle:gx,useInsertionEffect:px,useLayoutEffect:hx,useMemo:vx,useReducer:iu,useRef:fx,useState:function(){return iu(rs)},useDebugValue:yp,useDeferredValue:function(t){var e=On();return Ft===null?e.memoizedState=t:_x(e,Ft.memoizedState,t)},useTransition:function(){var t=iu(rs)[0],e=On().memoizedState;return[t,e]},useMutableSource:ax,useSyncExternalStore:ox,useId:yx,unstable_isNewReconciler:!1};function Gn(t,e){if(t&&t.defaultProps){e=_t({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Id(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:_t({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Mc={isMounted:function(t){return(t=t._reactInternals)?qr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=on(),r=pr(t),a=Pi(i,r);a.payload=e,n!=null&&(a.callback=n),e=dr(t,a,r),e!==null&&($n(e,t,r,i),Ml(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=on(),r=pr(t),a=Pi(i,r);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=dr(t,a,r),e!==null&&($n(e,t,r,i),Ml(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=on(),i=pr(t),r=Pi(n,i);r.tag=2,e!=null&&(r.callback=e),e=dr(t,r,i),e!==null&&($n(e,t,i,n),Ml(e,t,i))}};function Kh(t,e,n,i,r,a,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,a,o):e.prototype&&e.prototype.isPureReactComponent?!Zo(n,i)||!Zo(r,a):!0}function Tx(t,e,n){var i=!1,r=gr,a=e.contextType;return typeof a=="object"&&a!==null?a=Un(a):(r=pn(e)?kr:nn.current,i=e.contextTypes,a=(i=i!=null)?Va(t,r):gr),e=new e(n,a),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Mc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=a),e}function Zh(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Mc.enqueueReplaceState(e,e.state,null)}function Dd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},fp(t);var a=e.contextType;typeof a=="object"&&a!==null?r.context=Un(a):(a=pn(e)?kr:nn.current,r.context=Va(t,a)),r.state=t.memoizedState,a=e.getDerivedStateFromProps,typeof a=="function"&&(Id(t,e,a,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Mc.enqueueReplaceState(r,r.state,null),Kl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function ja(t,e){try{var n="",i=e;do n+=b_(i),i=i.return;while(i);var r=n}catch(a){r=`
Error generating stack: `+a.message+`
`+a.stack}return{value:t,source:e,stack:r,digest:null}}function ru(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Ld(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Qy=typeof WeakMap=="function"?WeakMap:Map;function bx(t,e,n){n=Pi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){tc||(tc=!0,Gd=i),Ld(t,e)},n}function Cx(t,e,n){n=Pi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Ld(t,e)}}var a=t.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){Ld(t,e),typeof i!="function"&&(fr===null?fr=new Set([this]):fr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Qh(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Qy;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=f1.bind(null,t,e,n),e.then(t,t))}function Jh(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function em(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Pi(-1,1),e.tag=2,dr(n,e,1))),n.lanes|=1),t)}var Jy=Bi.ReactCurrentOwner,dn=!1;function an(t,e,n,i){e.child=t===null?tx(e,null,n,i):Ga(e,t.child,n,i)}function tm(t,e,n,i,r){n=n.render;var a=e.ref;return Fa(e,r),i=xp(t,e,n,i,a,r),n=vp(),t!==null&&!dn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ui(t,e,r)):(pt&&n&&ap(e),e.flags|=1,an(t,e,i,r),e.child)}function nm(t,e,n,i,r){if(t===null){var a=n.type;return typeof a=="function"&&!Rp(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=a,Ax(t,e,a,i,r)):(t=Rl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(a=t.child,!(t.lanes&r)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:Zo,n(o,i)&&t.ref===e.ref)return Ui(t,e,r)}return e.flags|=1,t=hr(a,i),t.ref=e.ref,t.return=e,e.child=t}function Ax(t,e,n,i,r){if(t!==null){var a=t.memoizedProps;if(Zo(a,i)&&t.ref===e.ref)if(dn=!1,e.pendingProps=i=a,(t.lanes&r)!==0)t.flags&131072&&(dn=!0);else return e.lanes=t.lanes,Ui(t,e,r)}return Nd(t,e,n,i,r)}function Rx(t,e,n){var i=e.pendingProps,r=i.children,a=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ct(wa,_n),_n|=n;else{if(!(n&1073741824))return t=a!==null?a.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ct(wa,_n),_n|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=a!==null?a.baseLanes:n,ct(wa,_n),_n|=i}else a!==null?(i=a.baseLanes|n,e.memoizedState=null):i=n,ct(wa,_n),_n|=i;return an(t,e,r,n),e.child}function wx(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Nd(t,e,n,i,r){var a=pn(n)?kr:nn.current;return a=Va(e,a),Fa(e,r),n=xp(t,e,n,i,a,r),i=vp(),t!==null&&!dn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ui(t,e,r)):(pt&&i&&ap(e),e.flags|=1,an(t,e,n,r),e.child)}function im(t,e,n,i,r){if(pn(n)){var a=!0;jl(e)}else a=!1;if(Fa(e,r),e.stateNode===null)bl(t,e),Tx(e,n,i),Dd(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,s=e.memoizedProps;o.props=s;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Un(c):(c=pn(n)?kr:nn.current,c=Va(e,c));var p=n.getDerivedStateFromProps,h=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==i||l!==c)&&Zh(e,o,i,c),er=!1;var u=e.memoizedState;o.state=u,Kl(e,i,o,r),l=e.memoizedState,s!==i||u!==l||fn.current||er?(typeof p=="function"&&(Id(e,n,p,i),l=e.memoizedState),(s=er||Kh(e,n,s,i,u,l,c))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=s):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,ix(t,e),s=e.memoizedProps,c=e.type===e.elementType?s:Gn(e.type,s),o.props=c,h=e.pendingProps,u=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Un(l):(l=pn(n)?kr:nn.current,l=Va(e,l));var m=n.getDerivedStateFromProps;(p=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==h||u!==l)&&Zh(e,o,i,l),er=!1,u=e.memoizedState,o.state=u,Kl(e,i,o,r);var _=e.memoizedState;s!==h||u!==_||fn.current||er?(typeof m=="function"&&(Id(e,n,m,i),_=e.memoizedState),(c=er||Kh(e,n,c,i,u,_,l)||!1)?(p||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,_,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),o.props=i,o.state=_,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||s===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),i=!1)}return Fd(t,e,n,i,a,r)}function Fd(t,e,n,i,r,a){wx(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Hh(e,n,!1),Ui(t,e,a);i=e.stateNode,Jy.current=e;var s=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Ga(e,t.child,null,a),e.child=Ga(e,null,s,a)):an(t,e,s,a),e.memoizedState=i.state,r&&Hh(e,n,!0),e.child}function Px(t){var e=t.stateNode;e.pendingContext?Vh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Vh(t,e.context,!1),pp(t,e.containerInfo)}function rm(t,e,n,i,r){return Ha(),sp(r),e.flags|=256,an(t,e,n,i),e.child}var Ud={dehydrated:null,treeContext:null,retryLane:0};function Od(t){return{baseLanes:t,cachePool:null,transitions:null}}function Ix(t,e,n){var i=e.pendingProps,r=mt.current,a=!1,o=(e.flags&128)!==0,s;if((s=o)||(s=t!==null&&t.memoizedState===null?!1:(r&2)!==0),s?(a=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ct(mt,r&1),t===null)return wd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,a?(i=e.mode,a=e.child,o={mode:"hidden",children:o},!(i&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=bc(o,i,0,null),t=zr(t,i,n,null),a.return=e,t.return=e,a.sibling=t,e.child=a,e.child.memoizedState=Od(n),e.memoizedState=Ud,t):Sp(e,o));if(r=t.memoizedState,r!==null&&(s=r.dehydrated,s!==null))return e1(t,e,o,i,s,r,n);if(a){a=i.fallback,o=e.mode,r=t.child,s=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=hr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),s!==null?a=hr(s,a):(a=zr(a,o,n,null),a.flags|=2),a.return=e,i.return=e,i.sibling=a,e.child=i,i=a,a=e.child,o=t.child.memoizedState,o=o===null?Od(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=t.childLanes&~n,e.memoizedState=Ud,i}return a=t.child,t=a.sibling,i=hr(a,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Sp(t,e){return e=bc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ns(t,e,n,i){return i!==null&&sp(i),Ga(e,t.child,null,n),t=Sp(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function e1(t,e,n,i,r,a,o){if(n)return e.flags&256?(e.flags&=-257,i=ru(Error(se(422))),Ns(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(a=i.fallback,r=e.mode,i=bc({mode:"visible",children:i.children},r,0,null),a=zr(a,r,o,null),a.flags|=2,i.return=e,a.return=e,i.sibling=a,e.child=i,e.mode&1&&Ga(e,t.child,null,o),e.child.memoizedState=Od(o),e.memoizedState=Ud,a);if(!(e.mode&1))return Ns(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var s=i.dgst;return i=s,a=Error(se(419)),i=ru(a,i,void 0),Ns(t,e,o,i)}if(s=(o&t.childLanes)!==0,dn||s){if(i=Ht,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==a.retryLane&&(a.retryLane=r,Fi(t,r),$n(i,t,r,-1))}return Ap(),i=ru(Error(se(421))),Ns(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=p1.bind(null,t),r._reactRetry=e,null):(t=a.treeContext,Sn=ur(r.nextSibling),Mn=e,pt=!0,jn=null,t!==null&&(In[Dn++]=Ci,In[Dn++]=Ai,In[Dn++]=Br,Ci=t.id,Ai=t.overflow,Br=e),e=Sp(e,i.children),e.flags|=4096,e)}function am(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Pd(t.return,e,n)}function au(t,e,n,i,r){var a=t.memoizedState;a===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(a.isBackwards=e,a.rendering=null,a.renderingStartTime=0,a.last=i,a.tail=n,a.tailMode=r)}function Dx(t,e,n){var i=e.pendingProps,r=i.revealOrder,a=i.tail;if(an(t,e,i.children,n),i=mt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&am(t,n,e);else if(t.tag===19)am(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ct(mt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Zl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),au(e,!1,r,n,a);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Zl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}au(e,!0,n,null,a);break;case"together":au(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function bl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ui(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Hr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(se(153));if(e.child!==null){for(t=e.child,n=hr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=hr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function t1(t,e,n){switch(e.tag){case 3:Px(e),Ha();break;case 5:rx(e);break;case 1:pn(e.type)&&jl(e);break;case 4:pp(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ct(Yl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ct(mt,mt.current&1),e.flags|=128,null):n&e.child.childLanes?Ix(t,e,n):(ct(mt,mt.current&1),t=Ui(t,e,n),t!==null?t.sibling:null);ct(mt,mt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Dx(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ct(mt,mt.current),i)break;return null;case 22:case 23:return e.lanes=0,Rx(t,e,n)}return Ui(t,e,n)}var Lx,zd,Nx,Fx;Lx=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};zd=function(){};Nx=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Nr(fi.current);var a=null;switch(n){case"input":r=od(t,r),i=od(t,i),a=[];break;case"select":r=_t({},r,{value:void 0}),i=_t({},i,{value:void 0}),a=[];break;case"textarea":r=cd(t,r),i=cd(t,i),a=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Gl)}dd(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var s=r[c];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Wo.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in i){var l=i[c];if(s=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==s&&(l!=null||s!=null))if(c==="style")if(s){for(o in s)!s.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&s[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(a||(a=[]),a.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(a=a||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(a=a||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Wo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ut("scroll",t),a||s===l||(a=[])):(a=a||[]).push(c,l))}n&&(a=a||[]).push("style",n);var c=a;(e.updateQueue=c)&&(e.flags|=4)}};Fx=function(t,e,n,i){n!==i&&(e.flags|=4)};function uo(t,e){if(!pt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Kt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function n1(t,e,n){var i=e.pendingProps;switch(op(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Kt(e),null;case 1:return pn(e.type)&&Wl(),Kt(e),null;case 3:return i=e.stateNode,Wa(),dt(fn),dt(nn),mp(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Ds(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,jn!==null&&(Xd(jn),jn=null))),zd(t,e),Kt(e),null;case 5:hp(e);var r=Nr(ns.current);if(n=e.type,t!==null&&e.stateNode!=null)Nx(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(se(166));return Kt(e),null}if(t=Nr(fi.current),Ds(e)){i=e.stateNode,n=e.type;var a=e.memoizedProps;switch(i[li]=e,i[es]=a,t=(e.mode&1)!==0,n){case"dialog":ut("cancel",i),ut("close",i);break;case"iframe":case"object":case"embed":ut("load",i);break;case"video":case"audio":for(r=0;r<Io.length;r++)ut(Io[r],i);break;case"source":ut("error",i);break;case"img":case"image":case"link":ut("error",i),ut("load",i);break;case"details":ut("toggle",i);break;case"input":hh(i,a),ut("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!a.multiple},ut("invalid",i);break;case"textarea":gh(i,a),ut("invalid",i)}dd(n,a),r=null;for(var o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="children"?typeof s=="string"?i.textContent!==s&&(a.suppressHydrationWarning!==!0&&Is(i.textContent,s,t),r=["children",s]):typeof s=="number"&&i.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&Is(i.textContent,s,t),r=["children",""+s]):Wo.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&ut("scroll",i)}switch(n){case"input":Es(i),mh(i,a,!0);break;case"textarea":Es(i),xh(i);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(i.onclick=Gl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=cg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[li]=e,t[es]=i,Lx(t,e,!1,!1),e.stateNode=t;e:{switch(o=fd(n,i),n){case"dialog":ut("cancel",t),ut("close",t),r=i;break;case"iframe":case"object":case"embed":ut("load",t),r=i;break;case"video":case"audio":for(r=0;r<Io.length;r++)ut(Io[r],t);r=i;break;case"source":ut("error",t),r=i;break;case"img":case"image":case"link":ut("error",t),ut("load",t),r=i;break;case"details":ut("toggle",t),r=i;break;case"input":hh(t,i),r=od(t,i),ut("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=_t({},i,{value:void 0}),ut("invalid",t);break;case"textarea":gh(t,i),r=cd(t,i),ut("invalid",t);break;default:r=i}dd(n,r),s=r;for(a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="style"?fg(t,l):a==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&ug(t,l)):a==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&jo(t,l):typeof l=="number"&&jo(t,""+l):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Wo.hasOwnProperty(a)?l!=null&&a==="onScroll"&&ut("scroll",t):l!=null&&jf(t,a,l,o))}switch(n){case"input":Es(t),mh(t,i,!1);break;case"textarea":Es(t),xh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+mr(i.value));break;case"select":t.multiple=!!i.multiple,a=i.value,a!=null?Ia(t,!!i.multiple,a,!1):i.defaultValue!=null&&Ia(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Gl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Kt(e),null;case 6:if(t&&e.stateNode!=null)Fx(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(se(166));if(n=Nr(ns.current),Nr(fi.current),Ds(e)){if(i=e.stateNode,n=e.memoizedProps,i[li]=e,(a=i.nodeValue!==n)&&(t=Mn,t!==null))switch(t.tag){case 3:Is(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Is(i.nodeValue,n,(t.mode&1)!==0)}a&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[li]=e,e.stateNode=i}return Kt(e),null;case 13:if(dt(mt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(pt&&Sn!==null&&e.mode&1&&!(e.flags&128))Jg(),Ha(),e.flags|=98560,a=!1;else if(a=Ds(e),i!==null&&i.dehydrated!==null){if(t===null){if(!a)throw Error(se(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(se(317));a[li]=e}else Ha(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Kt(e),a=!1}else jn!==null&&(Xd(jn),jn=null),a=!0;if(!a)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||mt.current&1?Ut===0&&(Ut=3):Ap())),e.updateQueue!==null&&(e.flags|=4),Kt(e),null);case 4:return Wa(),zd(t,e),t===null&&Qo(e.stateNode.containerInfo),Kt(e),null;case 10:return up(e.type._context),Kt(e),null;case 17:return pn(e.type)&&Wl(),Kt(e),null;case 19:if(dt(mt),a=e.memoizedState,a===null)return Kt(e),null;if(i=(e.flags&128)!==0,o=a.rendering,o===null)if(i)uo(a,!1);else{if(Ut!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Zl(t),o!==null){for(e.flags|=128,uo(a,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)a=n,t=i,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=t,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,t=o.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ct(mt,mt.current&1|2),e.child}t=t.sibling}a.tail!==null&&Pt()>Xa&&(e.flags|=128,i=!0,uo(a,!1),e.lanes=4194304)}else{if(!i)if(t=Zl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),uo(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!pt)return Kt(e),null}else 2*Pt()-a.renderingStartTime>Xa&&n!==1073741824&&(e.flags|=128,i=!0,uo(a,!1),e.lanes=4194304);a.isBackwards?(o.sibling=e.child,e.child=o):(n=a.last,n!==null?n.sibling=o:e.child=o,a.last=o)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=Pt(),e.sibling=null,n=mt.current,ct(mt,i?n&1|2:n&1),e):(Kt(e),null);case 22:case 23:return Cp(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?_n&1073741824&&(Kt(e),e.subtreeFlags&6&&(e.flags|=8192)):Kt(e),null;case 24:return null;case 25:return null}throw Error(se(156,e.tag))}function i1(t,e){switch(op(e),e.tag){case 1:return pn(e.type)&&Wl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Wa(),dt(fn),dt(nn),mp(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return hp(e),null;case 13:if(dt(mt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(se(340));Ha()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return dt(mt),null;case 4:return Wa(),null;case 10:return up(e.type._context),null;case 22:case 23:return Cp(),null;case 24:return null;default:return null}}var Fs=!1,Jt=!1,r1=typeof WeakSet=="function"?WeakSet:Set,Me=null;function Ra(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Tt(t,e,i)}else n.current=null}function kd(t,e,n){try{n()}catch(i){Tt(t,e,i)}}var om=!1;function a1(t,e){if(Md=Bl,t=Bg(),rp(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,a=i.focusNode;i=i.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,s=-1,l=-1,c=0,p=0,h=t,u=null;t:for(;;){for(var m;h!==n||r!==0&&h.nodeType!==3||(s=o+r),h!==a||i!==0&&h.nodeType!==3||(l=o+i),h.nodeType===3&&(o+=h.nodeValue.length),(m=h.firstChild)!==null;)u=h,h=m;for(;;){if(h===t)break t;if(u===n&&++c===r&&(s=o),u===a&&++p===i&&(l=o),(m=h.nextSibling)!==null)break;h=u,u=h.parentNode}h=m}n=s===-1||l===-1?null:{start:s,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ed={focusedElem:t,selectionRange:n},Bl=!1,Me=e;Me!==null;)if(e=Me,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Me=t;else for(;Me!==null;){e=Me;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var E=_.memoizedProps,g=_.memoizedState,d=e.stateNode,x=d.getSnapshotBeforeUpdate(e.elementType===e.type?E:Gn(e.type,E),g);d.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var M=e.stateNode.containerInfo;M.nodeType===1?M.textContent="":M.nodeType===9&&M.documentElement&&M.removeChild(M.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(se(163))}}catch(S){Tt(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,Me=t;break}Me=e.return}return _=om,om=!1,_}function Bo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var a=r.destroy;r.destroy=void 0,a!==void 0&&kd(e,n,a)}r=r.next}while(r!==i)}}function Ec(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Bd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Ux(t){var e=t.alternate;e!==null&&(t.alternate=null,Ux(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[li],delete e[es],delete e[Cd],delete e[Vy],delete e[Hy])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Ox(t){return t.tag===5||t.tag===3||t.tag===4}function sm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Ox(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Vd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Gl));else if(i!==4&&(t=t.child,t!==null))for(Vd(t,e,n),t=t.sibling;t!==null;)Vd(t,e,n),t=t.sibling}function Hd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Hd(t,e,n),t=t.sibling;t!==null;)Hd(t,e,n),t=t.sibling}var Gt=null,Wn=!1;function Wi(t,e,n){for(n=n.child;n!==null;)zx(t,e,n),n=n.sibling}function zx(t,e,n){if(di&&typeof di.onCommitFiberUnmount=="function")try{di.onCommitFiberUnmount(mc,n)}catch{}switch(n.tag){case 5:Jt||Ra(n,e);case 6:var i=Gt,r=Wn;Gt=null,Wi(t,e,n),Gt=i,Wn=r,Gt!==null&&(Wn?(t=Gt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Gt.removeChild(n.stateNode));break;case 18:Gt!==null&&(Wn?(t=Gt,n=n.stateNode,t.nodeType===8?Qc(t.parentNode,n):t.nodeType===1&&Qc(t,n),$o(t)):Qc(Gt,n.stateNode));break;case 4:i=Gt,r=Wn,Gt=n.stateNode.containerInfo,Wn=!0,Wi(t,e,n),Gt=i,Wn=r;break;case 0:case 11:case 14:case 15:if(!Jt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var a=r,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&kd(n,e,o),r=r.next}while(r!==i)}Wi(t,e,n);break;case 1:if(!Jt&&(Ra(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(s){Tt(n,e,s)}Wi(t,e,n);break;case 21:Wi(t,e,n);break;case 22:n.mode&1?(Jt=(i=Jt)||n.memoizedState!==null,Wi(t,e,n),Jt=i):Wi(t,e,n);break;default:Wi(t,e,n)}}function lm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new r1),e.forEach(function(i){var r=h1.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function kn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var a=t,o=e,s=o;e:for(;s!==null;){switch(s.tag){case 5:Gt=s.stateNode,Wn=!1;break e;case 3:Gt=s.stateNode.containerInfo,Wn=!0;break e;case 4:Gt=s.stateNode.containerInfo,Wn=!0;break e}s=s.return}if(Gt===null)throw Error(se(160));zx(a,o,r),Gt=null,Wn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Tt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)kx(e,t),e=e.sibling}function kx(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(kn(e,t),ti(t),i&4){try{Bo(3,t,t.return),Ec(3,t)}catch(E){Tt(t,t.return,E)}try{Bo(5,t,t.return)}catch(E){Tt(t,t.return,E)}}break;case 1:kn(e,t),ti(t),i&512&&n!==null&&Ra(n,n.return);break;case 5:if(kn(e,t),ti(t),i&512&&n!==null&&Ra(n,n.return),t.flags&32){var r=t.stateNode;try{jo(r,"")}catch(E){Tt(t,t.return,E)}}if(i&4&&(r=t.stateNode,r!=null)){var a=t.memoizedProps,o=n!==null?n.memoizedProps:a,s=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{s==="input"&&a.type==="radio"&&a.name!=null&&sg(r,a),fd(s,o);var c=fd(s,a);for(o=0;o<l.length;o+=2){var p=l[o],h=l[o+1];p==="style"?fg(r,h):p==="dangerouslySetInnerHTML"?ug(r,h):p==="children"?jo(r,h):jf(r,p,h,c)}switch(s){case"input":sd(r,a);break;case"textarea":lg(r,a);break;case"select":var u=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!a.multiple;var m=a.value;m!=null?Ia(r,!!a.multiple,m,!1):u!==!!a.multiple&&(a.defaultValue!=null?Ia(r,!!a.multiple,a.defaultValue,!0):Ia(r,!!a.multiple,a.multiple?[]:"",!1))}r[es]=a}catch(E){Tt(t,t.return,E)}}break;case 6:if(kn(e,t),ti(t),i&4){if(t.stateNode===null)throw Error(se(162));r=t.stateNode,a=t.memoizedProps;try{r.nodeValue=a}catch(E){Tt(t,t.return,E)}}break;case 3:if(kn(e,t),ti(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{$o(e.containerInfo)}catch(E){Tt(t,t.return,E)}break;case 4:kn(e,t),ti(t);break;case 13:kn(e,t),ti(t),r=t.child,r.flags&8192&&(a=r.memoizedState!==null,r.stateNode.isHidden=a,!a||r.alternate!==null&&r.alternate.memoizedState!==null||(Tp=Pt())),i&4&&lm(t);break;case 22:if(p=n!==null&&n.memoizedState!==null,t.mode&1?(Jt=(c=Jt)||p,kn(e,t),Jt=c):kn(e,t),ti(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!p&&t.mode&1)for(Me=t,p=t.child;p!==null;){for(h=Me=p;Me!==null;){switch(u=Me,m=u.child,u.tag){case 0:case 11:case 14:case 15:Bo(4,u,u.return);break;case 1:Ra(u,u.return);var _=u.stateNode;if(typeof _.componentWillUnmount=="function"){i=u,n=u.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(E){Tt(i,n,E)}}break;case 5:Ra(u,u.return);break;case 22:if(u.memoizedState!==null){um(h);continue}}m!==null?(m.return=u,Me=m):um(h)}p=p.sibling}e:for(p=null,h=t;;){if(h.tag===5){if(p===null){p=h;try{r=h.stateNode,c?(a=r.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=h.stateNode,l=h.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=dg("display",o))}catch(E){Tt(t,t.return,E)}}}else if(h.tag===6){if(p===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(E){Tt(t,t.return,E)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;p===h&&(p=null),h=h.return}p===h&&(p=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:kn(e,t),ti(t),i&4&&lm(t);break;case 21:break;default:kn(e,t),ti(t)}}function ti(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Ox(n)){var i=n;break e}n=n.return}throw Error(se(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(jo(r,""),i.flags&=-33);var a=sm(t);Hd(t,a,r);break;case 3:case 4:var o=i.stateNode.containerInfo,s=sm(t);Vd(t,s,o);break;default:throw Error(se(161))}}catch(l){Tt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function o1(t,e,n){Me=t,Bx(t)}function Bx(t,e,n){for(var i=(t.mode&1)!==0;Me!==null;){var r=Me,a=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Fs;if(!o){var s=r.alternate,l=s!==null&&s.memoizedState!==null||Jt;s=Fs;var c=Jt;if(Fs=o,(Jt=l)&&!c)for(Me=r;Me!==null;)o=Me,l=o.child,o.tag===22&&o.memoizedState!==null?dm(r):l!==null?(l.return=o,Me=l):dm(r);for(;a!==null;)Me=a,Bx(a),a=a.sibling;Me=r,Fs=s,Jt=c}cm(t)}else r.subtreeFlags&8772&&a!==null?(a.return=r,Me=a):cm(t)}}function cm(t){for(;Me!==null;){var e=Me;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Jt||Ec(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Jt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Gn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var a=e.updateQueue;a!==null&&qh(e,a,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}qh(e,o,n)}break;case 5:var s=e.stateNode;if(n===null&&e.flags&4){n=s;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var p=c.memoizedState;if(p!==null){var h=p.dehydrated;h!==null&&$o(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(se(163))}Jt||e.flags&512&&Bd(e)}catch(u){Tt(e,e.return,u)}}if(e===t){Me=null;break}if(n=e.sibling,n!==null){n.return=e.return,Me=n;break}Me=e.return}}function um(t){for(;Me!==null;){var e=Me;if(e===t){Me=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Me=n;break}Me=e.return}}function dm(t){for(;Me!==null;){var e=Me;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Ec(4,e)}catch(l){Tt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Tt(e,r,l)}}var a=e.return;try{Bd(e)}catch(l){Tt(e,a,l)}break;case 5:var o=e.return;try{Bd(e)}catch(l){Tt(e,o,l)}}}catch(l){Tt(e,e.return,l)}if(e===t){Me=null;break}var s=e.sibling;if(s!==null){s.return=e.return,Me=s;break}Me=e.return}}var s1=Math.ceil,ec=Bi.ReactCurrentDispatcher,Mp=Bi.ReactCurrentOwner,Fn=Bi.ReactCurrentBatchConfig,Je=0,Ht=null,Nt=null,jt=0,_n=0,wa=_r(0),Ut=0,os=null,Hr=0,Tc=0,Ep=0,Vo=null,un=null,Tp=0,Xa=1/0,Ei=null,tc=!1,Gd=null,fr=null,Us=!1,ar=null,nc=0,Ho=0,Wd=null,Cl=-1,Al=0;function on(){return Je&6?Pt():Cl!==-1?Cl:Cl=Pt()}function pr(t){return t.mode&1?Je&2&&jt!==0?jt&-jt:Wy.transition!==null?(Al===0&&(Al=Tg()),Al):(t=it,t!==0||(t=window.event,t=t===void 0?16:Ig(t.type)),t):1}function $n(t,e,n,i){if(50<Ho)throw Ho=0,Wd=null,Error(se(185));fs(t,n,i),(!(Je&2)||t!==Ht)&&(t===Ht&&(!(Je&2)&&(Tc|=n),Ut===4&&nr(t,jt)),hn(t,i),n===1&&Je===0&&!(e.mode&1)&&(Xa=Pt()+500,yc&&yr()))}function hn(t,e){var n=t.callbackNode;W_(t,e);var i=kl(t,t===Ht?jt:0);if(i===0)n!==null&&yh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&yh(n),e===1)t.tag===0?Gy(fm.bind(null,t)):Kg(fm.bind(null,t)),ky(function(){!(Je&6)&&yr()}),n=null;else{switch(bg(i)){case 1:n=Kf;break;case 4:n=Mg;break;case 16:n=zl;break;case 536870912:n=Eg;break;default:n=zl}n=Yx(n,Vx.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Vx(t,e){if(Cl=-1,Al=0,Je&6)throw Error(se(327));var n=t.callbackNode;if(Ua()&&t.callbackNode!==n)return null;var i=kl(t,t===Ht?jt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=ic(t,i);else{e=i;var r=Je;Je|=2;var a=Gx();(Ht!==t||jt!==e)&&(Ei=null,Xa=Pt()+500,Or(t,e));do try{u1();break}catch(s){Hx(t,s)}while(!0);cp(),ec.current=a,Je=r,Nt!==null?e=0:(Ht=null,jt=0,e=Ut)}if(e!==0){if(e===2&&(r=xd(t),r!==0&&(i=r,e=jd(t,r))),e===1)throw n=os,Or(t,0),nr(t,i),hn(t,Pt()),n;if(e===6)nr(t,i);else{if(r=t.current.alternate,!(i&30)&&!l1(r)&&(e=ic(t,i),e===2&&(a=xd(t),a!==0&&(i=a,e=jd(t,a))),e===1))throw n=os,Or(t,0),nr(t,i),hn(t,Pt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(se(345));case 2:Ar(t,un,Ei);break;case 3:if(nr(t,i),(i&130023424)===i&&(e=Tp+500-Pt(),10<e)){if(kl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){on(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=bd(Ar.bind(null,t,un,Ei),e);break}Ar(t,un,Ei);break;case 4:if(nr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Yn(i);a=1<<o,o=e[o],o>r&&(r=o),i&=~a}if(i=r,i=Pt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*s1(i/1960))-i,10<i){t.timeoutHandle=bd(Ar.bind(null,t,un,Ei),i);break}Ar(t,un,Ei);break;case 5:Ar(t,un,Ei);break;default:throw Error(se(329))}}}return hn(t,Pt()),t.callbackNode===n?Vx.bind(null,t):null}function jd(t,e){var n=Vo;return t.current.memoizedState.isDehydrated&&(Or(t,e).flags|=256),t=ic(t,e),t!==2&&(e=un,un=n,e!==null&&Xd(e)),t}function Xd(t){un===null?un=t:un.push.apply(un,t)}function l1(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],a=r.getSnapshot;r=r.value;try{if(!Kn(a(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function nr(t,e){for(e&=~Ep,e&=~Tc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Yn(e),i=1<<n;t[n]=-1,e&=~i}}function fm(t){if(Je&6)throw Error(se(327));Ua();var e=kl(t,0);if(!(e&1))return hn(t,Pt()),null;var n=ic(t,e);if(t.tag!==0&&n===2){var i=xd(t);i!==0&&(e=i,n=jd(t,i))}if(n===1)throw n=os,Or(t,0),nr(t,e),hn(t,Pt()),n;if(n===6)throw Error(se(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ar(t,un,Ei),hn(t,Pt()),null}function bp(t,e){var n=Je;Je|=1;try{return t(e)}finally{Je=n,Je===0&&(Xa=Pt()+500,yc&&yr())}}function Gr(t){ar!==null&&ar.tag===0&&!(Je&6)&&Ua();var e=Je;Je|=1;var n=Fn.transition,i=it;try{if(Fn.transition=null,it=1,t)return t()}finally{it=i,Fn.transition=n,Je=e,!(Je&6)&&yr()}}function Cp(){_n=wa.current,dt(wa)}function Or(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,zy(n)),Nt!==null)for(n=Nt.return;n!==null;){var i=n;switch(op(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Wl();break;case 3:Wa(),dt(fn),dt(nn),mp();break;case 5:hp(i);break;case 4:Wa();break;case 13:dt(mt);break;case 19:dt(mt);break;case 10:up(i.type._context);break;case 22:case 23:Cp()}n=n.return}if(Ht=t,Nt=t=hr(t.current,null),jt=_n=e,Ut=0,os=null,Ep=Tc=Hr=0,un=Vo=null,Lr!==null){for(e=0;e<Lr.length;e++)if(n=Lr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,a=n.pending;if(a!==null){var o=a.next;a.next=r,i.next=o}n.pending=i}Lr=null}return t}function Hx(t,e){do{var n=Nt;try{if(cp(),El.current=Jl,Ql){for(var i=xt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Ql=!1}if(Vr=0,Bt=Ft=xt=null,ko=!1,is=0,Mp.current=null,n===null||n.return===null){Ut=1,os=e,Nt=null;break}e:{var a=t,o=n.return,s=n,l=e;if(e=jt,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,p=s,h=p.tag;if(!(p.mode&1)&&(h===0||h===11||h===15)){var u=p.alternate;u?(p.updateQueue=u.updateQueue,p.memoizedState=u.memoizedState,p.lanes=u.lanes):(p.updateQueue=null,p.memoizedState=null)}var m=Jh(o);if(m!==null){m.flags&=-257,em(m,o,s,a,e),m.mode&1&&Qh(a,c,e),e=m,l=c;var _=e.updateQueue;if(_===null){var E=new Set;E.add(l),e.updateQueue=E}else _.add(l);break e}else{if(!(e&1)){Qh(a,c,e),Ap();break e}l=Error(se(426))}}else if(pt&&s.mode&1){var g=Jh(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),em(g,o,s,a,e),sp(ja(l,s));break e}}a=l=ja(l,s),Ut!==4&&(Ut=2),Vo===null?Vo=[a]:Vo.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,e&=-e,a.lanes|=e;var d=bx(a,l,e);Xh(a,d);break e;case 1:s=l;var x=a.type,M=a.stateNode;if(!(a.flags&128)&&(typeof x.getDerivedStateFromError=="function"||M!==null&&typeof M.componentDidCatch=="function"&&(fr===null||!fr.has(M)))){a.flags|=65536,e&=-e,a.lanes|=e;var S=Cx(a,s,e);Xh(a,S);break e}}a=a.return}while(a!==null)}jx(n)}catch(b){e=b,Nt===n&&n!==null&&(Nt=n=n.return);continue}break}while(!0)}function Gx(){var t=ec.current;return ec.current=Jl,t===null?Jl:t}function Ap(){(Ut===0||Ut===3||Ut===2)&&(Ut=4),Ht===null||!(Hr&268435455)&&!(Tc&268435455)||nr(Ht,jt)}function ic(t,e){var n=Je;Je|=2;var i=Gx();(Ht!==t||jt!==e)&&(Ei=null,Or(t,e));do try{c1();break}catch(r){Hx(t,r)}while(!0);if(cp(),Je=n,ec.current=i,Nt!==null)throw Error(se(261));return Ht=null,jt=0,Ut}function c1(){for(;Nt!==null;)Wx(Nt)}function u1(){for(;Nt!==null&&!F_();)Wx(Nt)}function Wx(t){var e=qx(t.alternate,t,_n);t.memoizedProps=t.pendingProps,e===null?jx(t):Nt=e,Mp.current=null}function jx(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=i1(n,e),n!==null){n.flags&=32767,Nt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ut=6,Nt=null;return}}else if(n=n1(n,e,_n),n!==null){Nt=n;return}if(e=e.sibling,e!==null){Nt=e;return}Nt=e=t}while(e!==null);Ut===0&&(Ut=5)}function Ar(t,e,n){var i=it,r=Fn.transition;try{Fn.transition=null,it=1,d1(t,e,n,i)}finally{Fn.transition=r,it=i}return null}function d1(t,e,n,i){do Ua();while(ar!==null);if(Je&6)throw Error(se(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(se(177));t.callbackNode=null,t.callbackPriority=0;var a=n.lanes|n.childLanes;if(j_(t,a),t===Ht&&(Nt=Ht=null,jt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Us||(Us=!0,Yx(zl,function(){return Ua(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=Fn.transition,Fn.transition=null;var o=it;it=1;var s=Je;Je|=4,Mp.current=null,a1(t,n),kx(n,t),Iy(Ed),Bl=!!Md,Ed=Md=null,t.current=n,o1(n),U_(),Je=s,it=o,Fn.transition=a}else t.current=n;if(Us&&(Us=!1,ar=t,nc=r),a=t.pendingLanes,a===0&&(fr=null),k_(n.stateNode),hn(t,Pt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(tc)throw tc=!1,t=Gd,Gd=null,t;return nc&1&&t.tag!==0&&Ua(),a=t.pendingLanes,a&1?t===Wd?Ho++:(Ho=0,Wd=t):Ho=0,yr(),null}function Ua(){if(ar!==null){var t=bg(nc),e=Fn.transition,n=it;try{if(Fn.transition=null,it=16>t?16:t,ar===null)var i=!1;else{if(t=ar,ar=null,nc=0,Je&6)throw Error(se(331));var r=Je;for(Je|=4,Me=t.current;Me!==null;){var a=Me,o=a.child;if(Me.flags&16){var s=a.deletions;if(s!==null){for(var l=0;l<s.length;l++){var c=s[l];for(Me=c;Me!==null;){var p=Me;switch(p.tag){case 0:case 11:case 15:Bo(8,p,a)}var h=p.child;if(h!==null)h.return=p,Me=h;else for(;Me!==null;){p=Me;var u=p.sibling,m=p.return;if(Ux(p),p===c){Me=null;break}if(u!==null){u.return=m,Me=u;break}Me=m}}}var _=a.alternate;if(_!==null){var E=_.child;if(E!==null){_.child=null;do{var g=E.sibling;E.sibling=null,E=g}while(E!==null)}}Me=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,Me=o;else e:for(;Me!==null;){if(a=Me,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Bo(9,a,a.return)}var d=a.sibling;if(d!==null){d.return=a.return,Me=d;break e}Me=a.return}}var x=t.current;for(Me=x;Me!==null;){o=Me;var M=o.child;if(o.subtreeFlags&2064&&M!==null)M.return=o,Me=M;else e:for(o=x;Me!==null;){if(s=Me,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Ec(9,s)}}catch(b){Tt(s,s.return,b)}if(s===o){Me=null;break e}var S=s.sibling;if(S!==null){S.return=s.return,Me=S;break e}Me=s.return}}if(Je=r,yr(),di&&typeof di.onPostCommitFiberRoot=="function")try{di.onPostCommitFiberRoot(mc,t)}catch{}i=!0}return i}finally{it=n,Fn.transition=e}}return!1}function pm(t,e,n){e=ja(n,e),e=bx(t,e,1),t=dr(t,e,1),e=on(),t!==null&&(fs(t,1,e),hn(t,e))}function Tt(t,e,n){if(t.tag===3)pm(t,t,n);else for(;e!==null;){if(e.tag===3){pm(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(fr===null||!fr.has(i))){t=ja(n,t),t=Cx(e,t,1),e=dr(e,t,1),t=on(),e!==null&&(fs(e,1,t),hn(e,t));break}}e=e.return}}function f1(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=on(),t.pingedLanes|=t.suspendedLanes&n,Ht===t&&(jt&n)===n&&(Ut===4||Ut===3&&(jt&130023424)===jt&&500>Pt()-Tp?Or(t,0):Ep|=n),hn(t,e)}function Xx(t,e){e===0&&(t.mode&1?(e=Cs,Cs<<=1,!(Cs&130023424)&&(Cs=4194304)):e=1);var n=on();t=Fi(t,e),t!==null&&(fs(t,e,n),hn(t,n))}function p1(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Xx(t,n)}function h1(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(se(314))}i!==null&&i.delete(e),Xx(t,n)}var qx;qx=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||fn.current)dn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return dn=!1,t1(t,e,n);dn=!!(t.flags&131072)}else dn=!1,pt&&e.flags&1048576&&Zg(e,ql,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;bl(t,e),t=e.pendingProps;var r=Va(e,nn.current);Fa(e,n),r=xp(null,e,i,t,r,n);var a=vp();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,pn(i)?(a=!0,jl(e)):a=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,fp(e),r.updater=Mc,e.stateNode=r,r._reactInternals=e,Dd(e,i,t,n),e=Fd(null,e,i,!0,a,n)):(e.tag=0,pt&&a&&ap(e),an(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(bl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=g1(i),t=Gn(i,t),r){case 0:e=Nd(null,e,i,t,n);break e;case 1:e=im(null,e,i,t,n);break e;case 11:e=tm(null,e,i,t,n);break e;case 14:e=nm(null,e,i,Gn(i.type,t),n);break e}throw Error(se(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),Nd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),im(t,e,i,r,n);case 3:e:{if(Px(e),t===null)throw Error(se(387));i=e.pendingProps,a=e.memoizedState,r=a.element,ix(t,e),Kl(e,i,null,n);var o=e.memoizedState;if(i=o.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=a,e.memoizedState=a,e.flags&256){r=ja(Error(se(423)),e),e=rm(t,e,i,n,r);break e}else if(i!==r){r=ja(Error(se(424)),e),e=rm(t,e,i,n,r);break e}else for(Sn=ur(e.stateNode.containerInfo.firstChild),Mn=e,pt=!0,jn=null,n=tx(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ha(),i===r){e=Ui(t,e,n);break e}an(t,e,i,n)}e=e.child}return e;case 5:return rx(e),t===null&&wd(e),i=e.type,r=e.pendingProps,a=t!==null?t.memoizedProps:null,o=r.children,Td(i,r)?o=null:a!==null&&Td(i,a)&&(e.flags|=32),wx(t,e),an(t,e,o,n),e.child;case 6:return t===null&&wd(e),null;case 13:return Ix(t,e,n);case 4:return pp(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ga(e,null,i,n):an(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),tm(t,e,i,r,n);case 7:return an(t,e,e.pendingProps,n),e.child;case 8:return an(t,e,e.pendingProps.children,n),e.child;case 12:return an(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,a=e.memoizedProps,o=r.value,ct(Yl,i._currentValue),i._currentValue=o,a!==null)if(Kn(a.value,o)){if(a.children===r.children&&!fn.current){e=Ui(t,e,n);break e}}else for(a=e.child,a!==null&&(a.return=e);a!==null;){var s=a.dependencies;if(s!==null){o=a.child;for(var l=s.firstContext;l!==null;){if(l.context===i){if(a.tag===1){l=Pi(-1,n&-n),l.tag=2;var c=a.updateQueue;if(c!==null){c=c.shared;var p=c.pending;p===null?l.next=l:(l.next=p.next,p.next=l),c.pending=l}}a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),Pd(a.return,n,e),s.lanes|=n;break}l=l.next}}else if(a.tag===10)o=a.type===e.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(se(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),Pd(o,n,e),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===e){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}an(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Fa(e,n),r=Un(r),i=i(r),e.flags|=1,an(t,e,i,n),e.child;case 14:return i=e.type,r=Gn(i,e.pendingProps),r=Gn(i.type,r),nm(t,e,i,r,n);case 15:return Ax(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),bl(t,e),e.tag=1,pn(i)?(t=!0,jl(e)):t=!1,Fa(e,n),Tx(e,i,r),Dd(e,i,r,n),Fd(null,e,i,!0,t,n);case 19:return Dx(t,e,n);case 22:return Rx(t,e,n)}throw Error(se(156,e.tag))};function Yx(t,e){return Sg(t,e)}function m1(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Nn(t,e,n,i){return new m1(t,e,n,i)}function Rp(t){return t=t.prototype,!(!t||!t.isReactComponent)}function g1(t){if(typeof t=="function")return Rp(t)?1:0;if(t!=null){if(t=t.$$typeof,t===qf)return 11;if(t===Yf)return 14}return 2}function hr(t,e){var n=t.alternate;return n===null?(n=Nn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Rl(t,e,n,i,r,a){var o=2;if(i=t,typeof t=="function")Rp(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case _a:return zr(n.children,r,a,e);case Xf:o=8,r|=8;break;case nd:return t=Nn(12,n,e,r|2),t.elementType=nd,t.lanes=a,t;case id:return t=Nn(13,n,e,r),t.elementType=id,t.lanes=a,t;case rd:return t=Nn(19,n,e,r),t.elementType=rd,t.lanes=a,t;case rg:return bc(n,r,a,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case ng:o=10;break e;case ig:o=9;break e;case qf:o=11;break e;case Yf:o=14;break e;case Ji:o=16,i=null;break e}throw Error(se(130,t==null?t:typeof t,""))}return e=Nn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=a,e}function zr(t,e,n,i){return t=Nn(7,t,i,e),t.lanes=n,t}function bc(t,e,n,i){return t=Nn(22,t,i,e),t.elementType=rg,t.lanes=n,t.stateNode={isHidden:!1},t}function ou(t,e,n){return t=Nn(6,t,null,e),t.lanes=n,t}function su(t,e,n){return e=Nn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function x1(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Vc(0),this.expirationTimes=Vc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Vc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function wp(t,e,n,i,r,a,o,s,l){return t=new x1(t,e,n,s,l),e===1?(e=1,a===!0&&(e|=8)):e=0,a=Nn(3,null,null,e),t.current=a,a.stateNode=t,a.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},fp(a),t}function v1(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:va,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function $x(t){if(!t)return gr;t=t._reactInternals;e:{if(qr(t)!==t||t.tag!==1)throw Error(se(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(pn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(se(171))}if(t.tag===1){var n=t.type;if(pn(n))return $g(t,n,e)}return e}function Kx(t,e,n,i,r,a,o,s,l){return t=wp(n,i,!0,t,r,a,o,s,l),t.context=$x(null),n=t.current,i=on(),r=pr(n),a=Pi(i,r),a.callback=e??null,dr(n,a,r),t.current.lanes=r,fs(t,r,i),hn(t,i),t}function Cc(t,e,n,i){var r=e.current,a=on(),o=pr(r);return n=$x(n),e.context===null?e.context=n:e.pendingContext=n,e=Pi(a,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=dr(r,e,o),t!==null&&($n(t,r,o,a),Ml(t,r,o)),o}function rc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function hm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Pp(t,e){hm(t,e),(t=t.alternate)&&hm(t,e)}function _1(){return null}var Zx=typeof reportError=="function"?reportError:function(t){console.error(t)};function Ip(t){this._internalRoot=t}Ac.prototype.render=Ip.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(se(409));Cc(t,e,null,null)};Ac.prototype.unmount=Ip.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Gr(function(){Cc(null,t,null,null)}),e[Ni]=null}};function Ac(t){this._internalRoot=t}Ac.prototype.unstable_scheduleHydration=function(t){if(t){var e=Rg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<tr.length&&e!==0&&e<tr[n].priority;n++);tr.splice(n,0,t),n===0&&Pg(t)}};function Dp(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Rc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function mm(){}function y1(t,e,n,i,r){if(r){if(typeof i=="function"){var a=i;i=function(){var c=rc(o);a.call(c)}}var o=Kx(e,i,t,0,null,!1,!1,"",mm);return t._reactRootContainer=o,t[Ni]=o.current,Qo(t.nodeType===8?t.parentNode:t),Gr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var s=i;i=function(){var c=rc(l);s.call(c)}}var l=wp(t,0,!1,null,null,!1,!1,"",mm);return t._reactRootContainer=l,t[Ni]=l.current,Qo(t.nodeType===8?t.parentNode:t),Gr(function(){Cc(e,l,n,i)}),l}function wc(t,e,n,i,r){var a=n._reactRootContainer;if(a){var o=a;if(typeof r=="function"){var s=r;r=function(){var l=rc(o);s.call(l)}}Cc(e,o,t,r)}else o=y1(n,e,t,r,i);return rc(o)}Cg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Po(e.pendingLanes);n!==0&&(Zf(e,n|1),hn(e,Pt()),!(Je&6)&&(Xa=Pt()+500,yr()))}break;case 13:Gr(function(){var i=Fi(t,1);if(i!==null){var r=on();$n(i,t,1,r)}}),Pp(t,1)}};Qf=function(t){if(t.tag===13){var e=Fi(t,134217728);if(e!==null){var n=on();$n(e,t,134217728,n)}Pp(t,134217728)}};Ag=function(t){if(t.tag===13){var e=pr(t),n=Fi(t,e);if(n!==null){var i=on();$n(n,t,e,i)}Pp(t,e)}};Rg=function(){return it};wg=function(t,e){var n=it;try{return it=t,e()}finally{it=n}};hd=function(t,e,n){switch(e){case"input":if(sd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=_c(i);if(!r)throw Error(se(90));og(i),sd(i,r)}}}break;case"textarea":lg(t,n);break;case"select":e=n.value,e!=null&&Ia(t,!!n.multiple,e,!1)}};mg=bp;gg=Gr;var S1={usingClientEntryPoint:!1,Events:[hs,Ea,_c,pg,hg,bp]},fo={findFiberByHostInstance:Dr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},M1={bundleType:fo.bundleType,version:fo.version,rendererPackageName:fo.rendererPackageName,rendererConfig:fo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Bi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=_g(t),t===null?null:t.stateNode},findFiberByHostInstance:fo.findFiberByHostInstance||_1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Os=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Os.isDisabled&&Os.supportsFiber)try{mc=Os.inject(M1),di=Os}catch{}}Tn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=S1;Tn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Dp(e))throw Error(se(200));return v1(t,e,null,n)};Tn.createRoot=function(t,e){if(!Dp(t))throw Error(se(299));var n=!1,i="",r=Zx;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=wp(t,1,!1,null,null,n,!1,i,r),t[Ni]=e.current,Qo(t.nodeType===8?t.parentNode:t),new Ip(e)};Tn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(se(188)):(t=Object.keys(t).join(","),Error(se(268,t)));return t=_g(e),t=t===null?null:t.stateNode,t};Tn.flushSync=function(t){return Gr(t)};Tn.hydrate=function(t,e,n){if(!Rc(e))throw Error(se(200));return wc(null,t,e,!0,n)};Tn.hydrateRoot=function(t,e,n){if(!Dp(t))throw Error(se(405));var i=n!=null&&n.hydratedSources||null,r=!1,a="",o=Zx;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Kx(e,null,t,1,n??null,r,!1,a,o),t[Ni]=e.current,Qo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Ac(e)};Tn.render=function(t,e,n){if(!Rc(e))throw Error(se(200));return wc(null,t,e,!1,n)};Tn.unmountComponentAtNode=function(t){if(!Rc(t))throw Error(se(40));return t._reactRootContainer?(Gr(function(){wc(null,null,t,!1,function(){t._reactRootContainer=null,t[Ni]=null})}),!0):!1};Tn.unstable_batchedUpdates=bp;Tn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Rc(n))throw Error(se(200));if(t==null||t._reactInternals===void 0)throw Error(se(38));return wc(t,e,n,!1,i)};Tn.version="18.3.1-next-f1338f8080-20240426";function Qx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Qx)}catch(t){console.error(t)}}Qx(),Q0.exports=Tn;var E1=Q0.exports,gm=E1;ed.createRoot=gm.createRoot,ed.hydrateRoot=gm.hydrateRoot;const xm=t=>{const e={...t};return Object.keys(e).forEach(n=>{e[n]&&(e[n]={...e[n],currentValue:e[n].defaultValue??0})}),e.P0000&&(e.P0000.currentValue=5),e.P0204&&(e.P0204.currentValue=0),e},T1=(t,e)=>{var a,o,s,l,c,p,h,u,m,_,E,g,d;const n=Object.keys(t.parameters),i=n[t.selectedParamIndex]||"P0000",r=t.parameters[i];switch(e.type){case"PRESS_PROG":{if(t.activeFault)return t;if(t.ihmMode==="MONIT")return{...t,ihmMode:"PARAM_SELECT"};if(t.ihmMode==="PARAM_SELECT")return!r||r.readOnly?t:{...t,ihmMode:"PARAM_EDIT",editBuffer:r.currentValue};if(t.ihmMode==="PARAM_EDIT"){if(i==="P0204"&&Math.round(t.editBuffer)===5){const S=xm(t.parameters);return{...t,ihmMode:"PARAM_SELECT",parameters:S,motorStatus:"READY",activeFault:null,outputFrequency:0,outputCurrent:0,motorRPM:0,controlSource:"LOC",isForwardDirection:!0,lastFactoryResetTimestamp:Date.now()}}const x=+t.editBuffer.toFixed(1),M={...t.parameters,[i]:{...r,currentValue:x}};return{...t,ihmMode:"PARAM_SELECT",parameters:M}}return t}case"PRESS_UP":{if(t.ihmMode==="MONIT"){if(t.controlSource==="LOC"&&!t.activeFault){const x=((a=t.parameters.P0121)==null?void 0:a.currentValue)??t.outputFrequency??0,M=((o=t.parameters.P0134)==null?void 0:o.currentValue)??60,S=Math.min(M,Number((x+5).toFixed(1)));return{...t,parameters:{...t.parameters,P0121:{...t.parameters.P0121,currentValue:S}}}}return t}if(t.ihmMode==="PARAM_SELECT"){const x=(t.selectedParamIndex+1)%n.length;return{...t,selectedParamIndex:x}}if(t.ihmMode==="PARAM_EDIT"){const x=(r==null?void 0:r.step)??1,M=(r==null?void 0:r.max)??9999,S=Math.min(M,Number((t.editBuffer+x).toFixed(x<1?1:0)));return{...t,editBuffer:S}}return t}case"PRESS_DOWN":{if(t.ihmMode==="MONIT"){if(t.controlSource==="LOC"&&!t.activeFault){const x=((s=t.parameters.P0121)==null?void 0:s.currentValue)??t.outputFrequency??0,S=Math.max(0,Number((x-5).toFixed(1)));return{...t,parameters:{...t.parameters,P0121:{...t.parameters.P0121,currentValue:S}}}}return t}if(t.ihmMode==="PARAM_SELECT"){const x=(t.selectedParamIndex-1+n.length)%n.length;return{...t,selectedParamIndex:x}}if(t.ihmMode==="PARAM_EDIT"){const x=(r==null?void 0:r.step)??1,M=(r==null?void 0:r.min)??0,S=Math.max(M,Number((t.editBuffer-x).toFixed(x<1?1:0)));return{...t,editBuffer:S}}return t}case"SELECT_PARAM_DIRECT":{const x=n.indexOf(e.payload);return x===-1?t:{...t,selectedParamIndex:x,ihmMode:"PARAM_SELECT"}}case"PRESS_RUN":{if(t.activeFault)return t;if(t.controlSource==="LOC"){const x=((l=t.parameters.P0121)==null?void 0:l.currentValue)??0,M=x>0?x:30;return{...t,motorStatus:"RUNNING",parameters:{...t.parameters,P0121:{...t.parameters.P0121,currentValue:M}}}}return t}case"PRESS_STOP":return t.activeFault?{...t,activeFault:null,motorStatus:"READY"}:t.ihmMode==="PARAM_EDIT"?{...t,ihmMode:"PARAM_SELECT"}:t.ihmMode==="PARAM_SELECT"?{...t,ihmMode:"MONIT"}:{...t,motorStatus:"READY"};case"PRESS_LOCREM":return{...t,controlSource:t.controlSource==="LOC"?"REM":"LOC",motorStatus:"READY"};case"PRESS_DIRECTION":return{...t,isForwardDirection:!t.isForwardDirection};case"SET_DIGITAL_INPUT":{const x={...t.digitalInputs,[e.payload.input]:e.payload.value};let M=t.motorStatus,S=t.isForwardDirection,b=((c=t.parameters.P0121)==null?void 0:c.currentValue)??60;if(t.controlSource==="REM"&&!t.activeFault){const T=!!(x.di1??x.DI1),A=!!(x.di2??x.DI2),v=!!(x.di3??x.DI3),R=!!(x.di4??x.DI4);M=T?"RUNNING":"READY",S=!A,v&&!R?b=((p=t.parameters.P0125)==null?void 0:p.currentValue)??35:!v&&R?b=((h=t.parameters.P0126)==null?void 0:h.currentValue)??50:v&&R?b=((u=t.parameters.P0127)==null?void 0:u.currentValue)??60:(((m=t.parameters.P0222)==null?void 0:m.currentValue)===6||T)&&(b=((_=t.parameters.P0124)==null?void 0:_.currentValue)??15)}return{...t,digitalInputs:x,motorStatus:M,isForwardDirection:S,parameters:{...t.parameters,P0121:{...t.parameters.P0121,currentValue:b}}}}case"SET_ANALOG_INPUT_1":{const x=Math.min(10,Math.max(0,e.payload)),M=((E=t.parameters.P0133)==null?void 0:E.currentValue)??3,S=((g=t.parameters.P0134)==null?void 0:g.currentValue)??60,b=M+x/10*(S-M);return{...t,ai1Voltage:x,parameters:t.controlSource==="REM"&&((d=t.parameters.P0222)==null?void 0:d.currentValue)===1?{...t.parameters,P0121:{...t.parameters.P0121,currentValue:+b.toFixed(1)}}:t.parameters}}case"TRIGGER_FAULT":return{...t,activeFault:e.payload,motorStatus:"FAULT",outputFrequency:0,outputCurrent:0,motorRPM:0};case"RESET_FAULT":return{...t,activeFault:null,motorStatus:"READY"};case"RESET_FACTORY_DEFAULTS":{const x=xm(t.parameters);return{...t,ihmMode:"PARAM_SELECT",parameters:x,motorStatus:"READY",activeFault:null,outputFrequency:0,outputCurrent:0,motorRPM:0,controlSource:"LOC",isForwardDirection:!0,lastFactoryResetTimestamp:Date.now()}}case"UPDATE_DYNAMIC_TELEMETRY":return{...t,outputFrequency:e.payload.freq,outputCurrent:e.payload.current,motorRPM:e.payload.rpm,parameters:{...t.parameters,P0001:{...t.parameters.P0001,currentValue:e.payload.rpm},P0002:{...t.parameters.P0002,currentValue:e.payload.freq},P0003:{...t.parameters.P0003,currentValue:e.payload.current}}};default:return t}},xa={P0000:{code:"P0000",description:"Acesso aos Parâmetros",min:0,max:9999,step:1,defaultValue:0,currentValue:5,unit:""},P0001:{code:"P0001",description:"Velocidade de Saída (RPM)",min:0,max:18e3,step:1,defaultValue:0,currentValue:0,unit:"RPM",readOnly:!0},P0002:{code:"P0002",description:"Frequência de Saída",min:0,max:300,step:.1,defaultValue:0,currentValue:0,unit:"Hz",readOnly:!0},P0003:{code:"P0003",description:"Corrente do Motor",min:0,max:100,step:.1,defaultValue:0,currentValue:0,unit:"A",readOnly:!0},P0004:{code:"P0004",description:"Tensão Barramento CC",min:0,max:1e3,step:1,defaultValue:310,currentValue:310,unit:"V",readOnly:!0},P0005:{code:"P0005",description:"Frequência da Referência",min:0,max:300,step:.1,defaultValue:60,currentValue:60,unit:"Hz",readOnly:!0},P0006:{code:"P0006",description:"Estado do Inversor",min:0,max:10,step:1,defaultValue:0,currentValue:0,unit:"",readOnly:!0},P0007:{code:"P0007",description:"Tensão de Saída Motor",min:0,max:500,step:1,defaultValue:0,currentValue:0,unit:"V",readOnly:!0},P0008:{code:"P0008",description:"Fator de Potência",min:0,max:1,step:.01,defaultValue:.82,currentValue:.82,unit:"",readOnly:!0},P0009:{code:"P0009",description:"Torque do Motor",min:-200,max:200,step:.1,defaultValue:0,currentValue:0,unit:"%",readOnly:!0},P0010:{code:"P0010",description:"Potência de Saída",min:0,max:100,step:.1,defaultValue:0,currentValue:0,unit:"kW",readOnly:!0},P0011:{code:"P0011",description:"Sobrecarga Inversor Ixt",min:0,max:100,step:1,defaultValue:0,currentValue:0,unit:"%",readOnly:!0},P0012:{code:"P0012",description:"Status Entradas DI1-DI4",min:0,max:15,step:1,defaultValue:0,currentValue:0,unit:"",readOnly:!0},P0013:{code:"P0013",description:"Status Saídas Relé",min:0,max:7,step:1,defaultValue:1,currentValue:1,unit:"",readOnly:!0},P0014:{code:"P0014",description:"Valor Entrada AI1 (%)",min:0,max:100,step:.1,defaultValue:0,currentValue:0,unit:"%",readOnly:!0},P0018:{code:"P0018",description:"Valor Entrada AI1 (V)",min:0,max:10,step:.1,defaultValue:0,currentValue:0,unit:"V",readOnly:!0},P0023:{code:"P0023",description:"Versão do Software",min:0,max:99.99,step:.01,defaultValue:3.2,currentValue:3.2,unit:"",readOnly:!0},P0030:{code:"P0030",description:"Temperatura Dissipador",min:0,max:150,step:1,defaultValue:38,currentValue:38,unit:"°C",readOnly:!0},P0037:{code:"P0037",description:"Sobrecarga Motor Ixt",min:0,max:100,step:1,defaultValue:0,currentValue:0,unit:"%",readOnly:!0},P0050:{code:"P0050",description:"Última Falha Ocorrida",min:0,max:999,step:1,defaultValue:0,currentValue:0,unit:"",readOnly:!0},P0100:{code:"P0100",description:"Tempo de Aceleração 1",min:.1,max:999,step:.1,defaultValue:5,currentValue:5,unit:"s"},P0101:{code:"P0101",description:"Tempo de Desaceleração 1",min:.1,max:999,step:.1,defaultValue:5,currentValue:5,unit:"s"},P0102:{code:"P0102",description:"Tempo de Aceleração 2",min:.1,max:999,step:.1,defaultValue:10,currentValue:10,unit:"s"},P0103:{code:"P0103",description:"Tempo de Desaceleração 2",min:.1,max:999,step:.1,defaultValue:10,currentValue:10,unit:"s"},P0104:{code:"P0104",description:"Forma da Rampa (0=Linear, 1=S)",min:0,max:1,step:1,defaultValue:0,currentValue:0,unit:""},P0105:{code:"P0105",description:"Seleção 2ª Rampa",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0120:{code:"P0120",description:"Backup Referência IHM",min:0,max:300,step:.1,defaultValue:60,currentValue:60,unit:"Hz"},P0121:{code:"P0121",description:"Referência Frequência IHM",min:0,max:300,step:.1,defaultValue:3,currentValue:60,unit:"Hz"},P0122:{code:"P0122",description:"Frequência de JOG",min:0,max:300,step:.1,defaultValue:5,currentValue:5,unit:"Hz"},P0123:{code:"P0123",description:"Aceleração JOG",min:.1,max:999,step:.1,defaultValue:5,currentValue:5,unit:"s"},P0124:{code:"P0124",description:"Multispeed Referência 1",min:0,max:300,step:.1,defaultValue:5,currentValue:5,unit:"Hz"},P0125:{code:"P0125",description:"Multispeed Referência 2",min:0,max:300,step:.1,defaultValue:10,currentValue:10,unit:"Hz"},P0126:{code:"P0126",description:"Multispeed Referência 3",min:0,max:300,step:.1,defaultValue:20,currentValue:20,unit:"Hz"},P0127:{code:"P0127",description:"Multispeed Referência 4",min:0,max:300,step:.1,defaultValue:30,currentValue:30,unit:"Hz"},P0128:{code:"P0128",description:"Multispeed Referência 5",min:0,max:300,step:.1,defaultValue:40,currentValue:40,unit:"Hz"},P0129:{code:"P0129",description:"Multispeed Referência 6",min:0,max:300,step:.1,defaultValue:50,currentValue:50,unit:"Hz"},P0130:{code:"P0130",description:"Multispeed Referência 7",min:0,max:300,step:.1,defaultValue:55,currentValue:55,unit:"Hz"},P0131:{code:"P0131",description:"Multispeed Referência 8",min:0,max:300,step:.1,defaultValue:60,currentValue:60,unit:"Hz"},P0133:{code:"P0133",description:"Frequência Mínima",min:0,max:300,step:.1,defaultValue:3,currentValue:3,unit:"Hz"},P0134:{code:"P0134",description:"Frequência Máxima",min:0,max:300,step:.1,defaultValue:60,currentValue:60,unit:"Hz"},P0135:{code:"P0135",description:"Corrente Máxima de Saída",min:0,max:50,step:.1,defaultValue:10,currentValue:10,unit:"A"},P0136:{code:"P0136",description:"Boost de Torque Manual (V/F)",min:0,max:30,step:.1,defaultValue:5,currentValue:5,unit:"%"},P0137:{code:"P0137",description:"Boost de Torque Automático",min:0,max:30,step:.1,defaultValue:0,currentValue:0,unit:"%"},P0138:{code:"P0138",description:"Compensação Escorregamento",min:0,max:10,step:.1,defaultValue:1,currentValue:1,unit:"%"},P0139:{code:"P0139",description:"Frequência Chaveamento PWM",min:2.5,max:15,step:.5,defaultValue:5,currentValue:5,unit:"kHz"},P0140:{code:"P0140",description:"Tipo de Frenagem (0=Rampa, 1=Inércia)",min:0,max:1,step:1,defaultValue:0,currentValue:0,unit:""},P0142:{code:"P0142",description:"Tensão de Frenagem CC",min:0,max:30,step:.1,defaultValue:0,currentValue:0,unit:"%"},P0143:{code:"P0143",description:"Tempo Frenagem CC",min:0,max:15,step:.1,defaultValue:0,currentValue:0,unit:"s"},P0145:{code:"P0145",description:"Freq Início Frenagem CC",min:0,max:15,step:.1,defaultValue:2,currentValue:2,unit:"Hz"},P0150:{code:"P0150",description:"Tempo de Duração da Frenagem CC na Parada",min:0,max:15,step:.1,defaultValue:1,currentValue:1,unit:"s"},P0151:{code:"P0151",description:"Frequência de Início da Frenagem CC",min:0,max:15,step:.1,defaultValue:1,currentValue:1,unit:"Hz"},P0152:{code:"P0152",description:"Corrente de Injeção de Frenagem CC",min:0,max:100,step:.1,defaultValue:20,currentValue:20,unit:"%"},P0156:{code:"P0156",description:"Corrente de Sobrecarga do Motor (Limite Térmico)",min:.1,max:30,step:.1,defaultValue:5,currentValue:5,unit:"A"},P0169:{code:"P0169",description:"Frequência de Ressonância (Bypass Mecânico 1)",min:0,max:300,step:.1,defaultValue:0,currentValue:0,unit:"Hz"},P0202:{code:"P0202",description:"Tipo de Controle (0=V/F, 1=VVW)",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0204:{code:"P0204",description:"Carrega Padrão Fábrica (5=Reset)",min:0,max:5,step:1,defaultValue:0,currentValue:0,unit:""},P0205:{code:"P0205",description:"Parâmetro Inicial Display",min:1,max:9,step:1,defaultValue:2,currentValue:2,unit:""},P0206:{code:"P0206",description:"Auto-Reset de Falhas",min:0,max:1,step:1,defaultValue:0,currentValue:0,unit:""},P0208:{code:"P0208",description:"Tensão Nominal Rede CA",min:200,max:480,step:10,defaultValue:220,currentValue:220,unit:"V"},P0217:{code:"P0217",description:"Função Sleep / Dormir",min:0,max:300,step:1,defaultValue:15,currentValue:15,unit:"Hz"},P0218:{code:"P0218",description:"Tempo Inatividade Sleep",min:0,max:999,step:1,defaultValue:120,currentValue:120,unit:"s"},P0219:{code:"P0219",description:"Frequência Despertar Sleep",min:0,max:300,step:.1,defaultValue:10,currentValue:10,unit:"Hz"},P0220:{code:"P0220",description:"Seleção Modo Local/Remoto",min:0,max:3,step:1,defaultValue:2,currentValue:2,unit:""},P0221:{code:"P0221",description:"Referência Local (0=IHM, 1=AI1)",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0222:{code:"P0222",description:"Referência Remota (0=IHM, 1=AI1, 6=Multi, 7=Modbus)",min:0,max:7,step:1,defaultValue:1,currentValue:1,unit:""},P0223:{code:"P0223",description:"Sentido Giro Modo Local",min:0,max:2,step:1,defaultValue:2,currentValue:2,unit:""},P0224:{code:"P0224",description:"Gira/Para Modo Local",min:0,max:1,step:1,defaultValue:0,currentValue:0,unit:""},P0225:{code:"P0225",description:"JOG Modo Local",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0226:{code:"P0226",description:"Sentido Giro Modo Remoto",min:0,max:2,step:1,defaultValue:2,currentValue:2,unit:""},P0227:{code:"P0227",description:"Gira/Para Modo Remoto",min:0,max:1,step:1,defaultValue:1,currentValue:1,unit:""},P0228:{code:"P0228",description:"JOG Modo Remoto",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0231:{code:"P0231",description:"Função Sinal Entrada AI1",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0232:{code:"P0232",description:"Ganho da Entrada AI1",min:0,max:10,step:.01,defaultValue:1,currentValue:1,unit:""},P0233:{code:"P0233",description:"Sinal Entrada AI1 (0=0-10V, 1=4-20mA)",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0234:{code:"P0234",description:"Offset Entrada AI1",min:-100,max:100,step:.1,defaultValue:0,currentValue:0,unit:"%"},P0235:{code:"P0235",description:"Filtro Entrada AI1",min:0,max:10,step:.01,defaultValue:.05,currentValue:.05,unit:"s"},P0251:{code:"P0251",description:"Função Saída Analógica AO1",min:0,max:5,step:1,defaultValue:0,currentValue:0,unit:""},P0252:{code:"P0252",description:"Ganho Saída AO1",min:0,max:10,step:.01,defaultValue:1,currentValue:1,unit:""},P0253:{code:"P0253",description:"Tipo Sinal Saída AO1",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0254:{code:"P0254",description:"Escala Máxima Saída AO1",min:0,max:300,step:1,defaultValue:60,currentValue:60,unit:"Hz"},P0263:{code:"P0263",description:"Função Entrada DI1 (1=Gira/Para)",min:0,max:20,step:1,defaultValue:1,currentValue:1,unit:""},P0264:{code:"P0264",description:"Função Entrada DI2 (1=Sentido, 2=Multi)",min:0,max:20,step:1,defaultValue:1,currentValue:1,unit:""},P0265:{code:"P0265",description:"Função Entrada DI3 (1=Reset, 2=Multi)",min:0,max:20,step:1,defaultValue:2,currentValue:2,unit:""},P0266:{code:"P0266",description:"Função Entrada DI4 (1=JOG, 2=Multi)",min:0,max:20,step:1,defaultValue:2,currentValue:2,unit:""},P0267:{code:"P0267",description:"Função Entrada DI5",min:0,max:20,step:1,defaultValue:0,currentValue:0,unit:""},P0268:{code:"P0268",description:"Função Entrada DI6",min:0,max:20,step:1,defaultValue:0,currentValue:0,unit:""},P0275:{code:"P0275",description:"Função Relé RL1 (15=RUN, 14=Falha)",min:0,max:20,step:1,defaultValue:15,currentValue:15,unit:""},P0276:{code:"P0276",description:"Função Relé RL2 (14=Falha, 1=OK)",min:0,max:20,step:1,defaultValue:14,currentValue:14,unit:""},P0277:{code:"P0277",description:"Função Saída Transistor DO1",min:0,max:20,step:1,defaultValue:14,currentValue:14,unit:""},P0278:{code:"P0278",description:"Atraso Ligação Relé RL1",min:0,max:99.9,step:.1,defaultValue:0,currentValue:0,unit:"s"},P0279:{code:"P0279",description:"Atraso Desligamento Relé RL1",min:0,max:99.9,step:.1,defaultValue:0,currentValue:0,unit:"s"},P0295:{code:"P0295",description:"Corrente Nominal Inversor",min:.1,max:100,step:.1,defaultValue:7.3,currentValue:7.3,unit:"A",readOnly:!0},P0297:{code:"P0297",description:"PWM Automático por Temp.",min:0,max:1,step:1,defaultValue:1,currentValue:1,unit:""},P0308:{code:"P0308",description:"Endereço Modbus RTU",min:1,max:247,step:1,defaultValue:1,currentValue:1,unit:""},P0310:{code:"P0310",description:"Baud Rate (1=19200)",min:0,max:3,step:1,defaultValue:0,currentValue:0,unit:""},P0311:{code:"P0311",description:"Paridade Serial (1=Par 1Stop)",min:0,max:2,step:1,defaultValue:1,currentValue:1,unit:""},P0312:{code:"P0312",description:"Protocolo Comunicação",min:0,max:2,step:1,defaultValue:0,currentValue:0,unit:""},P0313:{code:"P0313",description:"Ação Timeout Comunicação",min:0,max:3,step:1,defaultValue:0,currentValue:0,unit:""},P0314:{code:"P0314",description:"Tempo Limite Timeout Serial",min:0,max:99.9,step:.1,defaultValue:1,currentValue:1,unit:"s"},P0316:{code:"P0316",description:"Telegramas Modbus Válidos",min:0,max:65535,step:1,defaultValue:142,currentValue:142,unit:"",readOnly:!0},P0340:{code:"P0340",description:"Habilita Tecla LOC/REM",min:0,max:1,step:1,defaultValue:1,currentValue:1,unit:""},P0341:{code:"P0341",description:"Habilita Tecla Sentido Giro",min:0,max:1,step:1,defaultValue:1,currentValue:1,unit:""},P0400:{code:"P0400",description:"Tensão Nominal Motor",min:100,max:600,step:1,defaultValue:220,currentValue:220,unit:"V"},P0401:{code:"P0401",description:"Frequência Nominal Motor",min:10,max:300,step:.1,defaultValue:60,currentValue:60,unit:"Hz"},P0402:{code:"P0402",description:"Rotação Nominal Motor",min:0,max:18e3,step:1,defaultValue:1750,currentValue:1750,unit:"RPM"},P0403:{code:"P0403",description:"Corrente Nominal Motor",min:.1,max:50,step:.1,defaultValue:4.5,currentValue:4.5,unit:"A"},P0404:{code:"P0404",description:"Potência Nominal Motor",min:.1,max:20,step:.1,defaultValue:1.5,currentValue:1.5,unit:"cv"},P0405:{code:"P0405",description:"Rendimento Nominal (Eta)",min:50,max:99,step:.1,defaultValue:83.5,currentValue:83.5,unit:"%"},P0406:{code:"P0406",description:"Fator de Potência Motor",min:.5,max:.99,step:.01,defaultValue:.82,currentValue:.82,unit:""},P0407:{code:"P0407",description:"Fator de Serviço Motor",min:1,max:1.5,step:.01,defaultValue:1.15,currentValue:1.15,unit:""},P0408:{code:"P0408",description:"Auto-Ajuste do Motor",min:0,max:1,step:1,defaultValue:0,currentValue:0,unit:""},P0409:{code:"P0409",description:"Resistência Estatórica (Rs)",min:0,max:99.9,step:.1,defaultValue:2.8,currentValue:2.8,unit:"Ω"}},Jx="@CFW500_EEPROM_STORAGE_V3",b1=()=>{try{const t=localStorage.getItem(Jx);if(!t)return xa;const e=JSON.parse(t),n={...xa};return Object.keys(xa).forEach(i=>{e[i]&&typeof e[i].currentValue=="number"&&(n[i]={...xa[i],currentValue:e[i].currentValue})}),n}catch{return xa}},C1={parameters:b1(),selectedParamIndex:0,editBuffer:0,ihmMode:"MONIT",controlSource:"LOC",motorStatus:"READY",isForwardDirection:!0,activeFault:null,digitalInputs:{di1:!1,di2:!1,di3:!1,di4:!1},ai1Voltage:0,outputFrequency:0,outputCurrent:0,motorRPM:0,dcBusVoltage:310},ev=ue.createContext(void 0),A1=({children:t})=>{const[e,n]=ue.useReducer(T1,C1);ue.useEffect(()=>{localStorage.setItem(Jx,JSON.stringify(e.parameters))},[e.parameters]);const i=Object.keys(e.parameters),r=e.parameters[i[e.selectedParamIndex]]||xa.P0000;let a="rdy";if(e.activeFault)a=typeof e.activeFault=="object"?e.activeFault.code:e.activeFault;else if(e.ihmMode==="MONIT"){const o=e.outputFrequency??0;a=e.motorStatus==="RUNNING"||o>0?o.toFixed(1):"rdy"}else if(e.ihmMode==="PARAM_SELECT")a=r?r.code:"P0000";else if(e.ihmMode==="PARAM_EDIT"){const s=((r==null?void 0:r.step)??1)<1?1:0;a=r?Number(e.editBuffer??0).toFixed(s):"0"}return f.jsx(ev.Provider,{value:{state:e,dispatch:n,currentDisplayValue:a,selectedParameter:r},children:t})},Zn=()=>{const t=ue.useContext(ev);if(!t)throw new Error("useInverter deve ser usado dentro de InverterProvider");return t},R1=({loadTorquePercent:t=20,enableNoise:e=!0}={})=>{const{state:n,dispatch:i}=Zn(),r=ue.useRef(n.outputFrequency),a=ue.useRef(n.motorRPM),o=ue.useRef(n.outputCurrent),s=ue.useRef(null),l=ue.useRef(0);ue.useEffect(()=>{let c;const p=h=>{var L,U,V,N,X,Z,ce,De,Ie;s.current===null&&(s.current=h);const u=Math.min((h-s.current)/1e3,.1);s.current=h;const m=((L=n.parameters.P0217)==null?void 0:L.currentValue)===1,_=((U=n.parameters.P0218)==null?void 0:U.currentValue)??120;n.motorStatus==="RUNNING"&&m&&!n.digitalInputs.di2?(l.current+=u,l.current>=_&&(l.current=0,i({type:"SET_DIGITAL_INPUT",payload:{input:"di1",value:!1}}))):l.current=0;const E=n.motorStatus==="RUNNING"&&!n.activeFault?((V=n.parameters.P0121)==null?void 0:V.currentValue)??60:0,g=((N=n.parameters.P0133)==null?void 0:N.currentValue)??3,d=((X=n.parameters.P0134)==null?void 0:X.currentValue)??60,x=E>0?Math.min(d,Math.max(g,E)):0,M=Math.max(.1,((Z=n.parameters.P0100)==null?void 0:Z.currentValue)??5),S=Math.max(.1,((ce=n.parameters.P0101)==null?void 0:ce.currentValue)??5),b=d/M,T=d/S;r.current<x?r.current=Math.min(x,r.current+b*u):r.current>x&&(r.current=Math.max(x,r.current-T*u));const A=r.current*120/4,R=A>0?50*(t/100):0;a.current=Math.max(0,Math.round(A-R));const P=((De=n.parameters.P0403)==null?void 0:De.currentValue)??4.5,I=P*.35,O=I+(P-I)*(t/100),ee=r.current<x?P*.4:0,D=e&&r.current>0?(Math.random()-.5)*.15:0;o.current=r.current>0?Math.max(0,O*(r.current/d)+ee+D):0;const G=((Ie=n.parameters.P0135)==null?void 0:Ie.currentValue)??10;o.current>G&&!n.activeFault&&i({type:"TRIGGER_FAULT",payload:{code:"F006",name:"Sobrecorrente de Saída",description:"Corrente ultrapassou o limite do parâmetro P0135.",autoResetable:!1}}),i({type:"UPDATE_DYNAMIC_TELEMETRY",payload:{freq:+r.current.toFixed(1),current:+o.current.toFixed(1),rpm:a.current}}),c=requestAnimationFrame(p)};return c=requestAnimationFrame(p),()=>cancelAnimationFrame(c)},[n.motorStatus,n.activeFault,n.parameters,n.digitalInputs,t,e,i])},w1=()=>{const{dispatch:t}=Zn();ue.useEffect(()=>{const e=n=>{const i=n.target;if(i.tagName==="INPUT"&&i.getAttribute("type")==="text")return;switch(n.key.toLowerCase()){case"p":case"enter":n.preventDefault(),t({type:"PRESS_PROG"});break;case"arrowup":n.preventDefault(),t({type:"PRESS_UP"});break;case"arrowdown":n.preventDefault(),t({type:"PRESS_DOWN"});break;case"i":case"r":n.preventDefault(),t({type:"PRESS_RUN"});break;case"o":case" ":case"escape":n.preventDefault(),t({type:"PRESS_STOP"});break;case"l":n.preventDefault(),t({type:"PRESS_LOCREM"});break;case"d":n.preventDefault(),t({type:"PRESS_DIRECTION"});break}};return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}},[t])},lu=()=>{const{state:t,dispatch:e,currentDisplayValue:n,selectedParameter:i}=Zn(),r=Object.keys(t.parameters),a=t.motorStatus==="RUNNING",o=t.activeFault!==null;return f.jsxs("div",{style:P1,children:[f.jsxs("div",{style:I1,children:[f.jsxs("div",{style:D1,children:[f.jsxs("div",{style:L1,children:[f.jsx("span",{style:cu,children:"w"}),f.jsx("span",{style:cu,children:"e"}),f.jsx("span",{style:cu,children:"g"})]}),f.jsxs("div",{style:N1,children:[f.jsx("span",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"1px"},children:"CFW500"}),f.jsx("span",{style:{fontSize:"8px",color:"#90caf9",letterSpacing:"0.5px"},children:"VARIABLE SPEED DRIVE"})]})]}),f.jsxs("div",{style:F1,children:[f.jsx("div",{style:U1,children:f.jsxs("div",{style:O1,children:[f.jsxs("div",{style:z1,children:[f.jsx("span",{style:{fontWeight:"bold",color:t.controlSource==="LOC"?"#0f2410":"#72986e"},children:"[LOC]"}),f.jsx("span",{style:{fontWeight:"bold",color:t.controlSource==="REM"?"#0f2410":"#72986e"},children:"[REM]"}),f.jsx("span",{style:{fontWeight:"bold",color:t.ihmMode==="PARAM_EDIT"?"#0f2410":"#72986e"},children:"PROG"}),f.jsx("span",{style:{fontWeight:"bold",color:a?"#0f2410":"#72986e"},children:t.isForwardDirection?"FWD ↻":"REV ↺"})]}),f.jsx("div",{style:k1,children:f.jsx("span",{style:B1,children:n})}),f.jsxs("div",{style:V1,children:[f.jsx("span",{style:{fontSize:"11px",fontWeight:800},children:t.ihmMode==="PARAM_EDIT"?(i==null?void 0:i.unit)||"VAL":"Hz"}),f.jsx("span",{style:{fontSize:"10px",fontWeight:800,letterSpacing:"0.5px"},children:o?"FAULT":a?"RUN":"READY"})]})]})}),f.jsxs("div",{style:H1,children:[f.jsxs("div",{style:uu,children:[f.jsx("div",{style:{...du,background:a?"#00e676":"#143818",boxShadow:a?"0 0 10px #00e676, 0 0 2px #fff":"inset 0 1px 2px #000"}}),f.jsx("span",{style:fu,children:"RUN"})]}),f.jsxs("div",{style:uu,children:[f.jsx("div",{style:{...du,background:o?"#ff1744":"#3e1518",boxShadow:o?"0 0 10px #ff1744, 0 0 2px #fff":"inset 0 1px 2px #000"}}),f.jsx("span",{style:fu,children:"FAULT"})]}),f.jsxs("div",{style:uu,children:[f.jsx("div",{style:{...du,background:t.controlSource==="REM"?"#ffb300":"#33260c",boxShadow:t.controlSource==="REM"?"0 0 10px #ffb300, 0 0 2px #fff":"inset 0 1px 2px #000"}}),f.jsx("span",{style:fu,children:"REM"})]})]}),f.jsxs("div",{style:G1,children:[f.jsx("button",{style:{...ji,background:"#005b9f",color:"#fff"},onClick:()=>e({type:"PRESS_PROG"}),title:"Menu / Entrar / Salvar (PROG)",children:f.jsx("span",{style:{fontSize:"11px",fontWeight:900},children:"PROG"})}),f.jsx("button",{style:ji,onClick:()=>e({type:"PRESS_UP"}),title:"Incrementar / Próximo Parâmetro (▲)",children:f.jsx("span",{style:{fontSize:"16px"},children:"▲"})}),f.jsx("button",{style:{...ji,fontSize:"10px"},onClick:()=>e({type:"PRESS_LOCREM"}),title:"Alternar Local / Remoto",children:f.jsxs("span",{style:{fontWeight:800,lineHeight:"1.1"},children:["LOC",f.jsx("br",{}),"REM"]})}),f.jsx("button",{style:ji,onClick:()=>e({type:"PRESS_DIRECTION"}),title:"Inverter Sentido de Giro",children:f.jsx("span",{style:{fontSize:"14px",fontWeight:900},children:"↻/↺"})}),f.jsx("button",{style:ji,onClick:()=>e({type:"PRESS_DOWN"}),title:"Decrementar / Parâmetro Anterior (▼)",children:f.jsx("span",{style:{fontSize:"16px"},children:"▼"})}),f.jsx("button",{style:{...ji,color:"#90caf9"},onClick:()=>e({type:"PRESS_PROG"}),title:"Entrar no Modo Parâmetro",children:f.jsx("span",{style:{fontSize:"9px",fontWeight:800},children:"MENU"})}),f.jsx("button",{style:{...ji,...W1},onClick:()=>e({type:"PRESS_RUN"}),title:"Partir Inversor (RUN - Tecla I)",children:f.jsx("span",{style:{fontSize:"18px",fontWeight:900},children:"I"})}),f.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:f.jsx("div",{style:X1,title:"Módulo de Expansão Plug-in CFW500-IOS",children:f.jsx("span",{style:{fontSize:"8px",color:"#546e7a",fontWeight:700},children:"PLUG-IN"})})}),f.jsx("button",{style:{...ji,...j1},onClick:()=>e({type:"PRESS_STOP"}),title:"Parar / Resetar Inversor (STOP - Tecla O)",children:f.jsx("span",{style:{fontSize:"18px",fontWeight:900},children:"O"})})]})]}),f.jsxs("div",{style:q1,children:[f.jsx("div",{style:zs}),f.jsx("div",{style:zs}),f.jsx("div",{style:zs}),f.jsx("div",{style:zs})]})]}),f.jsxs("div",{style:Y1,children:[f.jsxs("div",{style:$1,children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[f.jsx("span",{style:{color:"#0091ea",fontSize:"14px"},children:"📋"}),f.jsx("strong",{style:{fontSize:"13px",color:"#eceff1"},children:"MAPA DE PARÂMETROS (EEPROM)"})]}),f.jsx("span",{style:K1,children:(i==null?void 0:i.code)||"P0000"})]}),f.jsxs("div",{style:Z1,children:[f.jsxs("div",{style:ks,children:[f.jsx("span",{style:Bs,children:"Função:"}),f.jsx("strong",{style:{color:"#64b5f6",textAlign:"right",maxWidth:"65%",fontSize:"12px"},children:i==null?void 0:i.description})]}),f.jsxs("div",{style:ks,children:[f.jsx("span",{style:Bs,children:"Faixa de Ajuste:"}),f.jsxs("span",{style:vm,children:[i==null?void 0:i.min," a ",i==null?void 0:i.max," ",i==null?void 0:i.unit]})]}),f.jsxs("div",{style:ks,children:[f.jsx("span",{style:Bs,children:"Padrão de Fábrica:"}),f.jsxs("span",{style:vm,children:[i==null?void 0:i.defaultValue," ",i==null?void 0:i.unit]})]}),f.jsxs("div",{style:{...ks,borderBottom:"none",paddingTop:"4px"},children:[f.jsx("span",{style:Bs,children:"Valor Atual em Memória:"}),f.jsxs("strong",{style:{color:"#00e676",fontSize:"14px"},children:[i==null?void 0:i.currentValue," ",i==null?void 0:i.unit]})]})]}),f.jsx("h4",{style:{fontSize:"11px",color:"#90a4ae",marginTop:"10px",marginBottom:"6px",letterSpacing:"0.5px"},children:"SELEÇÃO DIRETA DE PARÂMETROS:"}),f.jsx("div",{style:Q1,children:r.map(s=>{const l=(i==null?void 0:i.code)===s;return f.jsxs("div",{onClick:()=>e({type:"SELECT_PARAM_DIRECT",payload:s}),style:{...J1,background:l?"rgba(0, 145, 234, 0.2)":"transparent",borderLeft:l?"3px solid #0091ea":"3px solid transparent",color:l?"#fff":"#b0bec5"},children:[f.jsxs("span",{children:[f.jsx("strong",{style:{color:l?"#64b5f6":"#90a4ae",fontFamily:"monospace"},children:s})," ","- ",t.parameters[s].description]}),f.jsxs("span",{style:{fontFamily:"monospace",fontWeight:700},children:[t.parameters[s].currentValue," ",t.parameters[s].unit]})]},s)})})]})]})},P1={display:"flex",flexWrap:"wrap",gap:"16px",width:"100%",flex:"1 1 520px"},I1={width:"100%",maxWidth:"310px",margin:"0 auto",background:"linear-gradient(180deg, #2b3038 0%, #1c2026 100%)",borderRadius:"14px",padding:"12px",border:"2px solid #3a414d",boxShadow:"0 16px 36px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)",display:"flex",flexDirection:"column",gap:"10px",boxSizing:"border-box",flexShrink:0},D1={background:"linear-gradient(180deg, #005a9c 0%, #004377 100%)",margin:"-12px -12px 2px -12px",padding:"10px 14px",borderTopLeftRadius:"12px",borderTopRightRadius:"12px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"2px solid #002d50",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.2)"},L1={display:"flex",alignItems:"center",background:"#ffffff",padding:"2px 8px",borderRadius:"4px",boxShadow:"0 2px 4px rgba(0,0,0,0.3)"},cu={color:"#005a9c",fontSize:"18px",fontWeight:900,lineHeight:"1",fontFamily:"Arial, sans-serif",letterSpacing:"-1px"},N1={display:"flex",flexDirection:"column",alignItems:"flex-end",color:"#ffffff"},F1={background:"linear-gradient(180deg, #171a1f 0%, #121418 100%)",borderRadius:"10px",padding:"12px",border:"2px solid #0d0f12",boxShadow:"inset 0 2px 6px rgba(0,0,0,0.8)",display:"flex",flexDirection:"column",gap:"10px"},U1={background:"linear-gradient(180deg, #0a0c0e 0%, #181c22 100%)",padding:"8px",borderRadius:"8px",border:"2px solid #232832",boxShadow:"inset 0 3px 8px rgba(0,0,0,0.9), 0 1px 2px rgba(255,255,255,0.05)"},O1={background:"#8cb885",borderRadius:"4px",padding:"8px 10px",color:"#132811",fontFamily:"monospace",boxShadow:"inset 0 0 12px rgba(0,0,0,0.25)",display:"flex",flexDirection:"column",gap:"4px"},z1={display:"flex",justifyContent:"space-between",fontSize:"9px",letterSpacing:"0.5px",borderBottom:"1px dashed rgba(19, 40, 17, 0.3)",paddingBottom:"2px"},k1={display:"flex",justifyContent:"flex-end",alignItems:"center",minHeight:"44px"},B1={fontSize:"38px",fontWeight:900,letterSpacing:"2px",lineHeight:"40px",fontFamily:'"Courier New", Courier, monospace',textShadow:"1px 1px 0px rgba(0,0,0,0.15)"},V1={display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px dashed rgba(19, 40, 17, 0.3)",paddingTop:"2px"},H1={display:"flex",justifyContent:"space-around",alignItems:"center",background:"#0d0f12",padding:"6px 10px",borderRadius:"6px",border:"1px solid #20252e"},uu={display:"flex",alignItems:"center",gap:"6px"},du={width:"11px",height:"11px",borderRadius:"50%",transition:"all 0.15s ease",border:"1px solid rgba(0,0,0,0.5)"},fu={fontSize:"9px",fontWeight:800,color:"#90a4ae",letterSpacing:"0.5px"},G1={display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"8px",marginTop:"2px"},ji={background:"linear-gradient(180deg, #373e4a 0%, #242932 100%)",border:"1px solid #485261",borderRadius:"6px",color:"#eceff1",height:"44px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 3px 0 #15181e, 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",transition:"transform 0.05s ease, box-shadow 0.05s ease",userSelect:"none"},W1={background:"linear-gradient(180deg, #2e7d32 0%, #1b5e20 100%)",border:"1px solid #43a047",color:"#ffffff",boxShadow:"0 3px 0 #0d3310, 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"},j1={background:"linear-gradient(180deg, #c62828 0%, #8e0000 100%)",border:"1px solid #e53935",color:"#ffffff",boxShadow:"0 3px 0 #4d0000, 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"},X1={width:"100%",height:"36px",background:"#15181e",border:"1px dashed #323946",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center"},q1={display:"flex",justifyContent:"space-between",gap:"6px",padding:"4px 8px 0 8px"},zs={flex:1,height:"14px",background:"#0e1013",borderRadius:"3px",border:"1px solid #2a2f38",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.8)"},Y1={flex:"1 1 280px",minWidth:"270px",background:"#1a1d21",borderRadius:"14px",padding:"14px",border:"1px solid #323842",display:"flex",flexDirection:"column",boxShadow:"0 8px 24px rgba(0,0,0,0.4)"},$1={display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #2a2f38",paddingBottom:"8px",marginBottom:"10px"},K1={background:"#005a9c",color:"#fff",fontFamily:"monospace",fontSize:"12px",fontWeight:800,padding:"3px 8px",borderRadius:"4px",boxShadow:"0 2px 6px rgba(0,90,156,0.4)"},Z1={background:"#121417",borderRadius:"8px",padding:"10px",border:"1px solid #252b36",display:"flex",flexDirection:"column",gap:"6px"},ks={display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"11px",paddingBottom:"4px",borderBottom:"1px solid #1c212b"},Bs={color:"#90a4ae"},vm={color:"#cfd8dc",fontWeight:600},Q1={maxHeight:"180px",overflowY:"auto",background:"#121417",borderRadius:"6px",padding:"4px",border:"1px solid #202631"},J1={display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"11px",padding:"6px 8px",borderRadius:"4px",marginBottom:"2px",cursor:"pointer",transition:"background 0.15s ease"};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Lp="185",eS=0,_m=1,tS=2,wl=1,nS=2,Do=3,Oi=0,mn=1,bi=2,Ii=0,Oa=1,ym=2,Sm=3,Mm=4,iS=5,wr=100,rS=101,aS=102,oS=103,sS=104,lS=200,cS=201,uS=202,dS=203,qd=204,Yd=205,fS=206,pS=207,hS=208,mS=209,gS=210,xS=211,vS=212,_S=213,yS=214,$d=0,Kd=1,Zd=2,qa=3,Qd=4,Jd=5,ef=6,tf=7,tv=0,SS=1,MS=2,pi=0,nv=1,iv=2,rv=3,av=4,ov=5,sv=6,lv=7,cv=300,Wr=301,Ya=302,pu=303,hu=304,Pc=306,nf=1e3,Ri=1001,rf=1002,Wt=1003,ES=1004,Vs=1005,Vt=1006,mu=1007,Fr=1008,yn=1009,uv=1010,dv=1011,ss=1012,Np=1013,gi=1014,ci=1015,zi=1016,Fp=1017,Up=1018,ls=1020,fv=35902,pv=35899,hv=1021,mv=1022,qn=1023,ki=1026,Ur=1027,gv=1028,Op=1029,jr=1030,zp=1031,kp=1033,Pl=33776,Il=33777,Dl=33778,Ll=33779,af=35840,of=35841,sf=35842,lf=35843,cf=36196,uf=37492,df=37496,ff=37488,pf=37489,ac=37490,hf=37491,mf=37808,gf=37809,xf=37810,vf=37811,_f=37812,yf=37813,Sf=37814,Mf=37815,Ef=37816,Tf=37817,bf=37818,Cf=37819,Af=37820,Rf=37821,wf=36492,Pf=36494,If=36495,Df=36283,Lf=36284,oc=36285,Nf=36286,TS=3200,Ff=0,bS=1,ir="",Pn="srgb",sc="srgb-linear",lc="linear",nt="srgb",Qr=7680,Em=519,CS=512,AS=513,RS=514,Bp=515,wS=516,PS=517,Vp=518,IS=519,Tm=35044,bm="300 es",ui=2e3,cs=2001;function DS(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function cc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function LS(){const t=cc("canvas");return t.style.display="block",t}const Cm={};function Am(...t){const e="THREE."+t.shift();console.log(e,...t)}function xv(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Fe(...t){t=xv(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function Qe(...t){t=xv(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function za(...t){const e=t.join(" ");e in Cm||(Cm[e]=!0,Fe(...t))}function NS(t,e,n){return new Promise(function(i,r){function a(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}const FS={[$d]:Kd,[Zd]:ef,[Qd]:tf,[qa]:Jd,[Kd]:$d,[ef]:Zd,[tf]:Qd,[Jd]:qa};class Yr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(n);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,o=r.length;a<o;a++)r[a].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],gu=Math.PI/180,Uf=180/Math.PI;function gs(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[t&255]+Zt[t>>8&255]+Zt[t>>16&255]+Zt[t>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[n&63|128]+Zt[n>>8&255]+"-"+Zt[n>>16&255]+Zt[n>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function Ye(t,e,n){return Math.max(e,Math.min(n,t))}function US(t,e){return(t%e+e)%e}function xu(t,e,n){return(1-n)*t+n*e}function po(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function cn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Yp=class Yp{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),a=this.x-e.x,o=this.y-e.y;return this.x=a*i-o*r+e.x,this.y=a*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Yp.prototype.isVector2=!0;let $e=Yp;class eo{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,a,o,s){let l=i[r+0],c=i[r+1],p=i[r+2],h=i[r+3],u=a[o+0],m=a[o+1],_=a[o+2],E=a[o+3];if(h!==E||l!==u||c!==m||p!==_){let g=l*u+c*m+p*_+h*E;g<0&&(u=-u,m=-m,_=-_,E=-E,g=-g);let d=1-s;if(g<.9995){const x=Math.acos(g),M=Math.sin(x);d=Math.sin(d*x)/M,s=Math.sin(s*x)/M,l=l*d+u*s,c=c*d+m*s,p=p*d+_*s,h=h*d+E*s}else{l=l*d+u*s,c=c*d+m*s,p=p*d+_*s,h=h*d+E*s;const x=1/Math.sqrt(l*l+c*c+p*p+h*h);l*=x,c*=x,p*=x,h*=x}}e[n]=l,e[n+1]=c,e[n+2]=p,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,a,o){const s=i[r],l=i[r+1],c=i[r+2],p=i[r+3],h=a[o],u=a[o+1],m=a[o+2],_=a[o+3];return e[n]=s*_+p*h+l*m-c*u,e[n+1]=l*_+p*u+c*h-s*m,e[n+2]=c*_+p*m+s*u-l*h,e[n+3]=p*_-s*h-l*u-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,a=e._z,o=e._order,s=Math.cos,l=Math.sin,c=s(i/2),p=s(r/2),h=s(a/2),u=l(i/2),m=l(r/2),_=l(a/2);switch(o){case"XYZ":this._x=u*p*h+c*m*_,this._y=c*m*h-u*p*_,this._z=c*p*_+u*m*h,this._w=c*p*h-u*m*_;break;case"YXZ":this._x=u*p*h+c*m*_,this._y=c*m*h-u*p*_,this._z=c*p*_-u*m*h,this._w=c*p*h+u*m*_;break;case"ZXY":this._x=u*p*h-c*m*_,this._y=c*m*h+u*p*_,this._z=c*p*_+u*m*h,this._w=c*p*h-u*m*_;break;case"ZYX":this._x=u*p*h-c*m*_,this._y=c*m*h+u*p*_,this._z=c*p*_-u*m*h,this._w=c*p*h+u*m*_;break;case"YZX":this._x=u*p*h+c*m*_,this._y=c*m*h+u*p*_,this._z=c*p*_-u*m*h,this._w=c*p*h-u*m*_;break;case"XZY":this._x=u*p*h-c*m*_,this._y=c*m*h-u*p*_,this._z=c*p*_+u*m*h,this._w=c*p*h+u*m*_;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],a=n[8],o=n[1],s=n[5],l=n[9],c=n[2],p=n[6],h=n[10],u=i+s+h;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(p-l)*m,this._y=(a-c)*m,this._z=(o-r)*m}else if(i>s&&i>h){const m=2*Math.sqrt(1+i-s-h);this._w=(p-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(a+c)/m}else if(s>h){const m=2*Math.sqrt(1+s-i-h);this._w=(a-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+p)/m}else{const m=2*Math.sqrt(1+h-i-s);this._w=(o-r)/m,this._x=(a+c)/m,this._y=(l+p)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,a=e._z,o=e._w,s=n._x,l=n._y,c=n._z,p=n._w;return this._x=i*p+o*s+r*c-a*l,this._y=r*p+o*l+a*s-i*c,this._z=a*p+o*c+i*l-r*s,this._w=o*p-i*s-r*l-a*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,a=e._z,o=e._w,s=this.dot(e);s<0&&(i=-i,r=-r,a=-a,o=-o,s=-s);let l=1-n;if(s<.9995){const c=Math.acos(s),p=Math.sin(c);l=Math.sin(l*c)/p,n=Math.sin(n*c)/p,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+a*n,this._w=this._w*l+o*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+a*n,this._w=this._w*l+o*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(n),a*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const $p=class $p{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Rm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Rm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6]*r,this.y=a[1]*n+a[4]*i+a[7]*r,this.z=a[2]*n+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,a=e.elements,o=1/(a[3]*n+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*r+a[12])*o,this.y=(a[1]*n+a[5]*i+a[9]*r+a[13])*o,this.z=(a[2]*n+a[6]*i+a[10]*r+a[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,a=e.x,o=e.y,s=e.z,l=e.w,c=2*(o*r-s*i),p=2*(s*n-a*r),h=2*(a*i-o*n);return this.x=n+l*c+o*h-s*p,this.y=i+l*p+s*c-a*h,this.z=r+l*h+a*p-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r,this.y=a[1]*n+a[5]*i+a[9]*r,this.z=a[2]*n+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,a=e.z,o=n.x,s=n.y,l=n.z;return this.x=r*l-a*s,this.y=a*o-i*l,this.z=i*s-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return vu.copy(this).projectOnVector(e),this.sub(vu)}reflect(e){return this.sub(vu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};$p.prototype.isVector3=!0;let H=$p;const vu=new H,Rm=new eo,Kp=class Kp{constructor(e,n,i,r,a,o,s,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,a,o,s,l,c)}set(e,n,i,r,a,o,s,l,c){const p=this.elements;return p[0]=e,p[1]=r,p[2]=s,p[3]=n,p[4]=a,p[5]=l,p[6]=i,p[7]=o,p[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,a=this.elements,o=i[0],s=i[3],l=i[6],c=i[1],p=i[4],h=i[7],u=i[2],m=i[5],_=i[8],E=r[0],g=r[3],d=r[6],x=r[1],M=r[4],S=r[7],b=r[2],T=r[5],A=r[8];return a[0]=o*E+s*x+l*b,a[3]=o*g+s*M+l*T,a[6]=o*d+s*S+l*A,a[1]=c*E+p*x+h*b,a[4]=c*g+p*M+h*T,a[7]=c*d+p*S+h*A,a[2]=u*E+m*x+_*b,a[5]=u*g+m*M+_*T,a[8]=u*d+m*S+_*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],p=e[8];return n*o*p-n*s*c-i*a*p+i*s*l+r*a*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],p=e[8],h=p*o-s*c,u=s*l-p*a,m=c*a-o*l,_=n*h+i*u+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/_;return e[0]=h*E,e[1]=(r*c-p*i)*E,e[2]=(s*i-r*o)*E,e[3]=u*E,e[4]=(p*n-r*l)*E,e[5]=(r*a-s*n)*E,e[6]=m*E,e[7]=(i*l-c*n)*E,e[8]=(o*n-i*a)*E,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,a,o,s){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*o+c*s)+o+e,-r*c,r*l,-r*(-c*o+l*s)+s+n,0,0,1),this}scale(e,n){return za("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(_u.makeScale(e,n)),this}rotate(e){return za("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(_u.makeRotation(-e)),this}translate(e,n){return za("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(_u.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Kp.prototype.isMatrix3=!0;let ze=Kp;const _u=new ze,wm=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pm=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function OS(){const t={enabled:!0,workingColorSpace:sc,spaces:{},convert:function(r,a,o){return this.enabled===!1||a===o||!a||!o||(this.spaces[a].transfer===nt&&(r.r=Di(r.r),r.g=Di(r.g),r.b=Di(r.b)),this.spaces[a].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===nt&&(r.r=ka(r.r),r.g=ka(r.g),r.b=ka(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ir?lc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,o){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return za("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return za("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[sc]:{primaries:e,whitePoint:i,transfer:lc,toXYZ:wm,fromXYZ:Pm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Pn},outputColorSpaceConfig:{drawingBufferColorSpace:Pn}},[Pn]:{primaries:e,whitePoint:i,transfer:nt,toXYZ:wm,fromXYZ:Pm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Pn}}}),t}const qe=OS();function Di(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function ka(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Jr;class zS{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Jr===void 0&&(Jr=cc("canvas")),Jr.width=e.width,Jr.height=e.height;const r=Jr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Jr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=cc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=Di(a[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Di(n[i]/255)*255):n[i]=Di(n[i]);return{data:n,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let kS=0;class Hp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kS++}),this.uuid=gs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,s=r.length;o<s;o++)r[o].isDataTexture?a.push(yu(r[o].image)):a.push(yu(r[o]))}else a=yu(r);i.url=a}return n||(e.images[this.uuid]=i),i}}function yu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?zS.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let BS=0;const Su=new H;class en extends Yr{constructor(e=en.DEFAULT_IMAGE,n=en.DEFAULT_MAPPING,i=Ri,r=Ri,a=Vt,o=Fr,s=qn,l=yn,c=en.DEFAULT_ANISOTROPY,p=ir){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:BS++}),this.uuid=gs(),this.name="",this.source=new Hp(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=s,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=p,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Su).x}get height(){return this.source.getSize(Su).y}get depth(){return this.source.getSize(Su).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Fe(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Fe(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nf:e.x=e.x-Math.floor(e.x);break;case Ri:e.x=e.x<0?0:1;break;case rf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case nf:e.y=e.y-Math.floor(e.y);break;case Ri:e.y=e.y<0?0:1;break;case rf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=cv;en.DEFAULT_ANISOTROPY=1;const Zp=class Zp{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*a,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*a,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*a,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,a;const l=e.elements,c=l[0],p=l[4],h=l[8],u=l[1],m=l[5],_=l[9],E=l[2],g=l[6],d=l[10];if(Math.abs(p-u)<.01&&Math.abs(h-E)<.01&&Math.abs(_-g)<.01){if(Math.abs(p+u)<.1&&Math.abs(h+E)<.1&&Math.abs(_+g)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(c+1)/2,S=(m+1)/2,b=(d+1)/2,T=(p+u)/4,A=(h+E)/4,v=(_+g)/4;return M>S&&M>b?M<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(M),r=T/i,a=A/i):S>b?S<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(S),i=T/r,a=v/r):b<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(b),i=A/a,r=v/a),this.set(i,r,a,n),this}let x=Math.sqrt((g-_)*(g-_)+(h-E)*(h-E)+(u-p)*(u-p));return Math.abs(x)<.001&&(x=1),this.x=(g-_)/x,this.y=(h-E)/x,this.z=(u-p)/x,this.w=Math.acos((c+m+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this.w=Ye(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this.w=Ye(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Zp.prototype.isVector4=!0;let gt=Zp;class VS extends Yr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new gt(0,0,e,n),this.scissorTest=!1,this.viewport=new gt(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},a=new en(r),o=i.count;for(let s=0;s<o;s++)this.textures[s]=a.clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Hp(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends VS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class vv extends en{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class HS extends en{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const pc=class pc{constructor(e,n,i,r,a,o,s,l,c,p,h,u,m,_,E,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,a,o,s,l,c,p,h,u,m,_,E,g)}set(e,n,i,r,a,o,s,l,c,p,h,u,m,_,E,g){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=a,d[5]=o,d[9]=s,d[13]=l,d[2]=c,d[6]=p,d[10]=h,d[14]=u,d[3]=m,d[7]=_,d[11]=E,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pc().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/ea.setFromMatrixColumn(e,0).length(),a=1/ea.setFromMatrixColumn(e,1).length(),o=1/ea.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,a=e.z,o=Math.cos(i),s=Math.sin(i),l=Math.cos(r),c=Math.sin(r),p=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){const u=o*p,m=o*h,_=s*p,E=s*h;n[0]=l*p,n[4]=-l*h,n[8]=c,n[1]=m+_*c,n[5]=u-E*c,n[9]=-s*l,n[2]=E-u*c,n[6]=_+m*c,n[10]=o*l}else if(e.order==="YXZ"){const u=l*p,m=l*h,_=c*p,E=c*h;n[0]=u+E*s,n[4]=_*s-m,n[8]=o*c,n[1]=o*h,n[5]=o*p,n[9]=-s,n[2]=m*s-_,n[6]=E+u*s,n[10]=o*l}else if(e.order==="ZXY"){const u=l*p,m=l*h,_=c*p,E=c*h;n[0]=u-E*s,n[4]=-o*h,n[8]=_+m*s,n[1]=m+_*s,n[5]=o*p,n[9]=E-u*s,n[2]=-o*c,n[6]=s,n[10]=o*l}else if(e.order==="ZYX"){const u=o*p,m=o*h,_=s*p,E=s*h;n[0]=l*p,n[4]=_*c-m,n[8]=u*c+E,n[1]=l*h,n[5]=E*c+u,n[9]=m*c-_,n[2]=-c,n[6]=s*l,n[10]=o*l}else if(e.order==="YZX"){const u=o*l,m=o*c,_=s*l,E=s*c;n[0]=l*p,n[4]=E-u*h,n[8]=_*h+m,n[1]=h,n[5]=o*p,n[9]=-s*p,n[2]=-c*p,n[6]=m*h+_,n[10]=u-E*h}else if(e.order==="XZY"){const u=o*l,m=o*c,_=s*l,E=s*c;n[0]=l*p,n[4]=-h,n[8]=c*p,n[1]=u*h+E,n[5]=o*p,n[9]=m*h-_,n[2]=_*h-m,n[6]=s*p,n[10]=E*h+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(GS,e,WS)}lookAt(e,n,i){const r=this.elements;return xn.subVectors(e,n),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),Xi.crossVectors(i,xn),Xi.lengthSq()===0&&(Math.abs(i.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),Xi.crossVectors(i,xn)),Xi.normalize(),Hs.crossVectors(xn,Xi),r[0]=Xi.x,r[4]=Hs.x,r[8]=xn.x,r[1]=Xi.y,r[5]=Hs.y,r[9]=xn.y,r[2]=Xi.z,r[6]=Hs.z,r[10]=xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,a=this.elements,o=i[0],s=i[4],l=i[8],c=i[12],p=i[1],h=i[5],u=i[9],m=i[13],_=i[2],E=i[6],g=i[10],d=i[14],x=i[3],M=i[7],S=i[11],b=i[15],T=r[0],A=r[4],v=r[8],R=r[12],P=r[1],I=r[5],O=r[9],$=r[13],ee=r[2],D=r[6],G=r[10],L=r[14],U=r[3],V=r[7],N=r[11],X=r[15];return a[0]=o*T+s*P+l*ee+c*U,a[4]=o*A+s*I+l*D+c*V,a[8]=o*v+s*O+l*G+c*N,a[12]=o*R+s*$+l*L+c*X,a[1]=p*T+h*P+u*ee+m*U,a[5]=p*A+h*I+u*D+m*V,a[9]=p*v+h*O+u*G+m*N,a[13]=p*R+h*$+u*L+m*X,a[2]=_*T+E*P+g*ee+d*U,a[6]=_*A+E*I+g*D+d*V,a[10]=_*v+E*O+g*G+d*N,a[14]=_*R+E*$+g*L+d*X,a[3]=x*T+M*P+S*ee+b*U,a[7]=x*A+M*I+S*D+b*V,a[11]=x*v+M*O+S*G+b*N,a[15]=x*R+M*$+S*L+b*X,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],a=e[12],o=e[1],s=e[5],l=e[9],c=e[13],p=e[2],h=e[6],u=e[10],m=e[14],_=e[3],E=e[7],g=e[11],d=e[15],x=l*m-c*u,M=s*m-c*h,S=s*u-l*h,b=o*m-c*p,T=o*u-l*p,A=o*h-s*p;return n*(E*x-g*M+d*S)-i*(_*x-g*b+d*T)+r*(_*M-E*b+d*A)-a*(_*S-E*T+g*A)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],s=e[9],l=e[2],c=e[6],p=e[10];return n*(o*p-s*c)-i*(a*p-s*l)+r*(a*c-o*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],p=e[8],h=e[9],u=e[10],m=e[11],_=e[12],E=e[13],g=e[14],d=e[15],x=n*s-i*o,M=n*l-r*o,S=n*c-a*o,b=i*l-r*s,T=i*c-a*s,A=r*c-a*l,v=p*E-h*_,R=p*g-u*_,P=p*d-m*_,I=h*g-u*E,O=h*d-m*E,$=u*d-m*g,ee=x*$-M*O+S*I+b*P-T*R+A*v;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/ee;return e[0]=(s*$-l*O+c*I)*D,e[1]=(r*O-i*$-a*I)*D,e[2]=(E*A-g*T+d*b)*D,e[3]=(u*T-h*A-m*b)*D,e[4]=(l*P-o*$-c*R)*D,e[5]=(n*$-r*P+a*R)*D,e[6]=(g*S-_*A-d*M)*D,e[7]=(p*A-u*S+m*M)*D,e[8]=(o*O-s*P+c*v)*D,e[9]=(i*P-n*O-a*v)*D,e[10]=(_*T-E*S+d*x)*D,e[11]=(h*S-p*T-m*x)*D,e[12]=(s*R-o*I-l*v)*D,e[13]=(n*I-i*R+r*v)*D,e[14]=(E*M-_*b-g*x)*D,e[15]=(p*b-h*M+u*x)*D,this}scale(e){const n=this.elements,i=e.x,r=e.y,a=e.z;return n[0]*=i,n[4]*=r,n[8]*=a,n[1]*=i,n[5]*=r,n[9]*=a,n[2]*=i,n[6]*=r,n[10]*=a,n[3]*=i,n[7]*=r,n[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),a=1-i,o=e.x,s=e.y,l=e.z,c=a*o,p=a*s;return this.set(c*o+i,c*s-r*l,c*l+r*s,0,c*s+r*l,p*s+i,p*l-r*o,0,c*l-r*s,p*l+r*o,a*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,a,o){return this.set(1,i,a,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,a=n._x,o=n._y,s=n._z,l=n._w,c=a+a,p=o+o,h=s+s,u=a*c,m=a*p,_=a*h,E=o*p,g=o*h,d=s*h,x=l*c,M=l*p,S=l*h,b=i.x,T=i.y,A=i.z;return r[0]=(1-(E+d))*b,r[1]=(m+S)*b,r[2]=(_-M)*b,r[3]=0,r[4]=(m-S)*T,r[5]=(1-(u+d))*T,r[6]=(g+x)*T,r[7]=0,r[8]=(_+M)*A,r[9]=(g-x)*A,r[10]=(1-(u+E))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return i.set(1,1,1),n.identity(),this;let o=ea.set(r[0],r[1],r[2]).length();const s=ea.set(r[4],r[5],r[6]).length(),l=ea.set(r[8],r[9],r[10]).length();a<0&&(o=-o),Bn.copy(this);const c=1/o,p=1/s,h=1/l;return Bn.elements[0]*=c,Bn.elements[1]*=c,Bn.elements[2]*=c,Bn.elements[4]*=p,Bn.elements[5]*=p,Bn.elements[6]*=p,Bn.elements[8]*=h,Bn.elements[9]*=h,Bn.elements[10]*=h,n.setFromRotationMatrix(Bn),i.x=o,i.y=s,i.z=l,this}makePerspective(e,n,i,r,a,o,s=ui,l=!1){const c=this.elements,p=2*a/(n-e),h=2*a/(i-r),u=(n+e)/(n-e),m=(i+r)/(i-r);let _,E;if(l)_=a/(o-a),E=o*a/(o-a);else if(s===ui)_=-(o+a)/(o-a),E=-2*o*a/(o-a);else if(s===cs)_=-o/(o-a),E=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+s);return c[0]=p,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,a,o,s=ui,l=!1){const c=this.elements,p=2/(n-e),h=2/(i-r),u=-(n+e)/(n-e),m=-(i+r)/(i-r);let _,E;if(l)_=1/(o-a),E=o/(o-a);else if(s===ui)_=-2/(o-a),E=-(o+a)/(o-a);else if(s===cs)_=-1/(o-a),E=-a/(o-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+s);return c[0]=p,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};pc.prototype.isMatrix4=!0;let vt=pc;const ea=new H,Bn=new vt,GS=new H(0,0,0),WS=new H(1,1,1),Xi=new H,Hs=new H,xn=new H,Im=new vt,Dm=new eo;class xr{constructor(e=0,n=0,i=0,r=xr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,a=r[0],o=r[4],s=r[8],l=r[1],c=r[5],p=r[9],h=r[2],u=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(Ye(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-p,m),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(s,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-p,c),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(s,m));break;case"XZY":this._z=Math.asin(-Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(s,a)):(this._x=Math.atan2(-p,m),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Im.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Im,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Dm.setFromEuler(this),this.setFromQuaternion(Dm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xr.DEFAULT_ORDER="XYZ";class _v{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jS=0;const Lm=new H,ta=new eo,vi=new vt,Gs=new H,ho=new H,XS=new H,qS=new eo,Nm=new H(1,0,0),Fm=new H(0,1,0),Um=new H(0,0,1),Om={type:"added"},YS={type:"removed"},na={type:"childadded",child:null},Mu={type:"childremoved",child:null};class Xt extends Yr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jS++}),this.uuid=gs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Xt.DEFAULT_UP.clone();const e=new H,n=new xr,i=new eo,r=new H(1,1,1);function a(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new ze}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _v,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ta.setFromAxisAngle(e,n),this.quaternion.multiply(ta),this}rotateOnWorldAxis(e,n){return ta.setFromAxisAngle(e,n),this.quaternion.premultiply(ta),this}rotateX(e){return this.rotateOnAxis(Nm,e)}rotateY(e){return this.rotateOnAxis(Fm,e)}rotateZ(e){return this.rotateOnAxis(Um,e)}translateOnAxis(e,n){return Lm.copy(e).applyQuaternion(this.quaternion),this.position.add(Lm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Nm,e)}translateY(e){return this.translateOnAxis(Fm,e)}translateZ(e){return this.translateOnAxis(Um,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Gs.copy(e):Gs.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ho.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(ho,Gs,this.up):vi.lookAt(Gs,ho,this.up),this.quaternion.setFromRotationMatrix(vi),r&&(vi.extractRotation(r.matrixWorld),ta.setFromRotationMatrix(vi),this.quaternion.premultiply(ta.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Om),na.child=e,this.dispatchEvent(na),na.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(YS),Mu.child=e,this.dispatchEvent(Mu),Mu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Om),na.child=e,this.dispatchEvent(na),na.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ho,e,XS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ho,qS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=n-a[0]*n-a[4]*i-a[8]*r,a[13]+=i-a[1]*n-a[5]*i-a[9]*r,a[14]+=r-a[2]*n-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const a=this.children;for(let o=0,s=a.length;o<s;o++)a[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(s=>({...s,boundingBox:s.boundingBox?s.boundingBox.toJSON():void 0,boundingSphere:s.boundingSphere?s.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(s=>({...s})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(s,l){return s[l.uuid]===void 0&&(s[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const s=this.geometry.parameters;if(s!==void 0&&s.shapes!==void 0){const l=s.shapes;if(Array.isArray(l))for(let c=0,p=l.length;c<p;c++){const h=l[c];a(e.shapes,h)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const s=[];for(let l=0,c=this.material.length;l<c;l++)s.push(a(e.materials,this.material[l]));r.material=s}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let s=0;s<this.children.length;s++)r.children.push(this.children[s].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let s=0;s<this.animations.length;s++){const l=this.animations[s];r.animations.push(a(e.animations,l))}}if(n){const s=o(e.geometries),l=o(e.materials),c=o(e.textures),p=o(e.images),h=o(e.shapes),u=o(e.skeletons),m=o(e.animations),_=o(e.nodes);s.length>0&&(i.geometries=s),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),p.length>0&&(i.images=p),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(s){const l=[];for(const c in s){const p=s[c];delete p.metadata,l.push(p)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Xt.DEFAULT_UP=new H(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Pa extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $S={type:"move"};class Eu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,a=null,o=null;const s=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const E of e.hand.values()){const g=n.getJointPose(E,i),d=this._getHandJoint(c,E);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const p=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=p.position.distanceTo(h.position),m=.02,_=.005;c.inputState.pinching&&u>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=n.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));s!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent($S)))}return s!==null&&(s.visible=r!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Pa;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const yv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Ws={h:0,s:0,l:0};function Tu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class We{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=qe.workingColorSpace){return this.r=e,this.g=n,this.b=i,qe.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=qe.workingColorSpace){if(e=US(e,1),n=Ye(n,0,1),i=Ye(i,0,1),n===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+n):i+n-i*n,o=2*i-a;this.r=Tu(o,a,e+1/3),this.g=Tu(o,a,e),this.b=Tu(o,a,e-1/3)}return qe.colorSpaceToWorking(this,r),this}setStyle(e,n=Pn){function i(a){a!==void 0&&parseFloat(a)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=r[1],s=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:Fe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(a,16),n);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Pn){const i=yv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=ka(e.r),this.g=ka(e.g),this.b=ka(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pn){return qe.workingToColorSpace(Qt.copy(this),e),Math.round(Ye(Qt.r*255,0,255))*65536+Math.round(Ye(Qt.g*255,0,255))*256+Math.round(Ye(Qt.b*255,0,255))}getHexString(e=Pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=qe.workingColorSpace){qe.workingToColorSpace(Qt.copy(this),n);const i=Qt.r,r=Qt.g,a=Qt.b,o=Math.max(i,r,a),s=Math.min(i,r,a);let l,c;const p=(s+o)/2;if(s===o)l=0,c=0;else{const h=o-s;switch(c=p<=.5?h/(o+s):h/(2-o-s),o){case i:l=(r-a)/h+(r<a?6:0);break;case r:l=(a-i)/h+2;break;case a:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=p,e}getRGB(e,n=qe.workingColorSpace){return qe.workingToColorSpace(Qt.copy(this),n),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=Pn){qe.workingToColorSpace(Qt.copy(this),e);const n=Qt.r,i=Qt.g,r=Qt.b;return e!==Pn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+n,qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(qi),e.getHSL(Ws);const i=xu(qi.h,Ws.h,n),r=xu(qi.s,Ws.s,n),a=xu(qi.l,Ws.l,n);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*n+a[3]*i+a[6]*r,this.g=a[1]*n+a[4]*i+a[7]*r,this.b=a[2]*n+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new We;We.NAMES=yv;class KS extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xr,this.environmentIntensity=1,this.environmentRotation=new xr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Vn=new H,_i=new H,bu=new H,yi=new H,ia=new H,ra=new H,zm=new H,Cu=new H,Au=new H,Ru=new H,wu=new gt,Pu=new gt,Iu=new gt;class Xn{constructor(e=new H,n=new H,i=new H){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Vn.subVectors(e,n),r.cross(Vn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,n,i,r,a){Vn.subVectors(r,n),_i.subVectors(i,n),bu.subVectors(e,n);const o=Vn.dot(Vn),s=Vn.dot(_i),l=Vn.dot(bu),c=_i.dot(_i),p=_i.dot(bu),h=o*c-s*s;if(h===0)return a.set(0,0,0),null;const u=1/h,m=(c*l-s*p)*u,_=(o*p-s*l)*u;return a.set(1-m-_,_,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(e,n,i,r,a,o,s,l){return this.getBarycoord(e,n,i,r,yi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,yi.x),l.addScaledVector(o,yi.y),l.addScaledVector(s,yi.z),l)}static getInterpolatedAttribute(e,n,i,r,a,o){return wu.setScalar(0),Pu.setScalar(0),Iu.setScalar(0),wu.fromBufferAttribute(e,n),Pu.fromBufferAttribute(e,i),Iu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(wu,a.x),o.addScaledVector(Pu,a.y),o.addScaledVector(Iu,a.z),o}static isFrontFacing(e,n,i,r){return Vn.subVectors(i,n),_i.subVectors(e,n),Vn.cross(_i).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),Vn.cross(_i).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Xn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,a){return Xn.getInterpolation(e,this.a,this.b,this.c,n,i,r,a)}containsPoint(e){return Xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,a=this.c;let o,s;ia.subVectors(r,i),ra.subVectors(a,i),Cu.subVectors(e,i);const l=ia.dot(Cu),c=ra.dot(Cu);if(l<=0&&c<=0)return n.copy(i);Au.subVectors(e,r);const p=ia.dot(Au),h=ra.dot(Au);if(p>=0&&h<=p)return n.copy(r);const u=l*h-p*c;if(u<=0&&l>=0&&p<=0)return o=l/(l-p),n.copy(i).addScaledVector(ia,o);Ru.subVectors(e,a);const m=ia.dot(Ru),_=ra.dot(Ru);if(_>=0&&m<=_)return n.copy(a);const E=m*c-l*_;if(E<=0&&c>=0&&_<=0)return s=c/(c-_),n.copy(i).addScaledVector(ra,s);const g=p*_-m*h;if(g<=0&&h-p>=0&&m-_>=0)return zm.subVectors(a,r),s=(h-p)/(h-p+(m-_)),n.copy(r).addScaledVector(zm,s);const d=1/(g+E+u);return o=E*d,s=u*d,n.copy(i).addScaledVector(ia,o).addScaledVector(ra,s)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class xs{constructor(e=new H(1/0,1/0,1/0),n=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Hn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Hn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Hn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(n===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,s=a.count;o<s;o++)e.isMesh===!0?e.getVertexPosition(o,Hn):Hn.fromBufferAttribute(a,o),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),js.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),js.copy(i.boundingBox)),js.applyMatrix4(e.matrixWorld),this.union(js)}const r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mo),Xs.subVectors(this.max,mo),aa.subVectors(e.a,mo),oa.subVectors(e.b,mo),sa.subVectors(e.c,mo),Yi.subVectors(oa,aa),$i.subVectors(sa,oa),Mr.subVectors(aa,sa);let n=[0,-Yi.z,Yi.y,0,-$i.z,$i.y,0,-Mr.z,Mr.y,Yi.z,0,-Yi.x,$i.z,0,-$i.x,Mr.z,0,-Mr.x,-Yi.y,Yi.x,0,-$i.y,$i.x,0,-Mr.y,Mr.x,0];return!Du(n,aa,oa,sa,Xs)||(n=[1,0,0,0,1,0,0,0,1],!Du(n,aa,oa,sa,Xs))?!1:(qs.crossVectors(Yi,$i),n=[qs.x,qs.y,qs.z],Du(n,aa,oa,sa,Xs))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Si=[new H,new H,new H,new H,new H,new H,new H,new H],Hn=new H,js=new xs,aa=new H,oa=new H,sa=new H,Yi=new H,$i=new H,Mr=new H,mo=new H,Xs=new H,qs=new H,Er=new H;function Du(t,e,n,i,r){for(let a=0,o=t.length-3;a<=o;a+=3){Er.fromArray(t,a);const s=r.x*Math.abs(Er.x)+r.y*Math.abs(Er.y)+r.z*Math.abs(Er.z),l=e.dot(Er),c=n.dot(Er),p=i.dot(Er);if(Math.max(-Math.max(l,c,p),Math.min(l,c,p))>s)return!1}return!0}const Dt=new H,Ys=new $e;let ZS=0;class mi extends Yr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ZS++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Tm,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ys.fromBufferAttribute(this,n),Ys.applyMatrix3(e),this.setXY(n,Ys.x,Ys.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix3(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix4(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyNormalMatrix(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.transformDirection(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=po(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=cn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=po(n,this.array)),n}setX(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=po(n,this.array)),n}setY(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=po(n,this.array)),n}setZ(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=po(n,this.array)),n}setW(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=cn(n,this.array),i=cn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=cn(n,this.array),i=cn(i,this.array),r=cn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,a){return e*=this.itemSize,this.normalized&&(n=cn(n,this.array),i=cn(i,this.array),r=cn(r,this.array),a=cn(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Tm&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Sv extends mi{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Mv extends mi{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class tn extends mi{constructor(e,n,i){super(new Float32Array(e),n,i)}}const QS=new xs,go=new H,Lu=new H;class Ic{constructor(e=new H,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):QS.setFromPoints(e).getCenter(i);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;go.subVectors(e,this.center);const n=go.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(go,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(go.copy(e.center).add(Lu)),this.expandByPoint(go.copy(e.center).sub(Lu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let JS=0;const An=new vt,Nu=new Xt,la=new H,vn=new xs,xo=new xs,kt=new H;class zn extends Yr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:JS++}),this.uuid=gs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(DS(e)?Mv:Sv)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new ze().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return An.makeRotationFromQuaternion(e),this.applyMatrix4(An),this}rotateX(e){return An.makeRotationX(e),this.applyMatrix4(An),this}rotateY(e){return An.makeRotationY(e),this.applyMatrix4(An),this}rotateZ(e){return An.makeRotationZ(e),this.applyMatrix4(An),this}translate(e,n,i){return An.makeTranslation(e,n,i),this.applyMatrix4(An),this}scale(e,n,i){return An.makeScale(e,n,i),this.applyMatrix4(An),this}lookAt(e){return Nu.lookAt(e),Nu.updateMatrix(),this.applyMatrix4(Nu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(la).negate(),this.translate(la.x,la.y,la.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new tn(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const a=e[r];n.setXYZ(r,a.x,a.y,a.z||0)}e.length>n.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xs);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const a=n[i];vn.setFromBufferAttribute(a),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ic);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const i=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),n)for(let a=0,o=n.length;a<o;a++){const s=n[a];xo.setFromBufferAttribute(s),this.morphTargetsRelative?(kt.addVectors(vn.min,xo.min),vn.expandByPoint(kt),kt.addVectors(vn.max,xo.max),vn.expandByPoint(kt)):(vn.expandByPoint(xo.min),vn.expandByPoint(xo.max))}vn.getCenter(i);let r=0;for(let a=0,o=e.count;a<o;a++)kt.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(kt));if(n)for(let a=0,o=n.length;a<o;a++){const s=n[a],l=this.morphTargetsRelative;for(let c=0,p=s.count;c<p;c++)kt.fromBufferAttribute(s,c),l&&(la.fromBufferAttribute(e,c),kt.add(la)),r=Math.max(r,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,a=n.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new mi(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const s=[],l=[];for(let v=0;v<i.count;v++)s[v]=new H,l[v]=new H;const c=new H,p=new H,h=new H,u=new $e,m=new $e,_=new $e,E=new H,g=new H;function d(v,R,P){c.fromBufferAttribute(i,v),p.fromBufferAttribute(i,R),h.fromBufferAttribute(i,P),u.fromBufferAttribute(a,v),m.fromBufferAttribute(a,R),_.fromBufferAttribute(a,P),p.sub(c),h.sub(c),m.sub(u),_.sub(u);const I=1/(m.x*_.y-_.x*m.y);isFinite(I)&&(E.copy(p).multiplyScalar(_.y).addScaledVector(h,-m.y).multiplyScalar(I),g.copy(h).multiplyScalar(m.x).addScaledVector(p,-_.x).multiplyScalar(I),s[v].add(E),s[R].add(E),s[P].add(E),l[v].add(g),l[R].add(g),l[P].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let v=0,R=x.length;v<R;++v){const P=x[v],I=P.start,O=P.count;for(let $=I,ee=I+O;$<ee;$+=3)d(e.getX($+0),e.getX($+1),e.getX($+2))}const M=new H,S=new H,b=new H,T=new H;function A(v){b.fromBufferAttribute(r,v),T.copy(b);const R=s[v];M.copy(R),M.sub(b.multiplyScalar(b.dot(R))).normalize(),S.crossVectors(T,R);const I=S.dot(l[v])<0?-1:1;o.setXYZW(v,M.x,M.y,M.z,I)}for(let v=0,R=x.length;v<R;++v){const P=x[v],I=P.start,O=P.count;for(let $=I,ee=I+O;$<ee;$+=3)A(e.getX($+0)),A(e.getX($+1)),A(e.getX($+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new mi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const r=new H,a=new H,o=new H,s=new H,l=new H,c=new H,p=new H,h=new H;if(e)for(let u=0,m=e.count;u<m;u+=3){const _=e.getX(u+0),E=e.getX(u+1),g=e.getX(u+2);r.fromBufferAttribute(n,_),a.fromBufferAttribute(n,E),o.fromBufferAttribute(n,g),p.subVectors(o,a),h.subVectors(r,a),p.cross(h),s.fromBufferAttribute(i,_),l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,g),s.add(p),l.add(p),c.add(p),i.setXYZ(_,s.x,s.y,s.z),i.setXYZ(E,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,m=n.count;u<m;u+=3)r.fromBufferAttribute(n,u+0),a.fromBufferAttribute(n,u+1),o.fromBufferAttribute(n,u+2),p.subVectors(o,a),h.subVectors(r,a),p.cross(h),i.setXYZ(u+0,p.x,p.y,p.z),i.setXYZ(u+1,p.x,p.y,p.z),i.setXYZ(u+2,p.x,p.y,p.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)kt.fromBufferAttribute(e,n),kt.normalize(),e.setXYZ(n,kt.x,kt.y,kt.z)}toNonIndexed(){function e(s,l){const c=s.array,p=s.itemSize,h=s.normalized,u=new c.constructor(l.length*p);let m=0,_=0;for(let E=0,g=l.length;E<g;E++){s.isInterleavedBufferAttribute?m=l[E]*s.data.stride+s.offset:m=l[E]*p;for(let d=0;d<p;d++)u[_++]=c[m++]}return new mi(u,p,h)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new zn,i=this.index.array,r=this.attributes;for(const s in r){const l=r[s],c=e(l,i);n.setAttribute(s,c)}const a=this.morphAttributes;for(const s in a){const l=[],c=a[s];for(let p=0,h=c.length;p<h;p++){const u=c[p],m=e(u,i);l.push(m)}n.morphAttributes[s]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let s=0,l=o.length;s<l;s++){const c=o[s];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],p=[];for(let h=0,u=c.length;h<u;h++){const m=c[h];p.push(m.toJSON(e.data))}p.length>0&&(r[l]=p,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const s=this.boundingSphere;return s!==null&&(e.data.boundingSphere=s.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const p=r[c];this.setAttribute(c,p.clone(n))}const a=e.morphAttributes;for(const c in a){const p=[],h=a[c];for(let u=0,m=h.length;u<m;u++)p.push(h[u].clone(n));this.morphAttributes[c]=p}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,p=o.length;c<p;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const s=e.boundingBox;s!==null&&(this.boundingBox=s.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let eM=0;class to extends Yr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:eM++}),this.uuid=gs(),this.name="",this.type="Material",this.blending=Oa,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qd,this.blendDst=Yd,this.blendEquation=wr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=qa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Em,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qr,this.stencilZFail=Qr,this.stencilZPass=Qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Fe(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Fe(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Oa&&(i.blending=this.blending),this.side!==Oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==qd&&(i.blendSrc=this.blendSrc),this.blendDst!==Yd&&(i.blendDst=this.blendDst),this.blendEquation!==wr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==qa&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Em&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const o=[];for(const s in a){const l=a[s];delete l.metadata,o.push(l)}return o}if(n){const a=r(e.textures),o=r(e.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new We().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new $e().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Mi=new H,Fu=new H,$s=new H,Ki=new H,Uu=new H,Ks=new H,Ou=new H;class Ev{constructor(e=new H,n=new H(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Mi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,n),Mi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Fu.copy(e).add(n).multiplyScalar(.5),$s.copy(n).sub(e).normalize(),Ki.copy(this.origin).sub(Fu);const a=e.distanceTo(n)*.5,o=-this.direction.dot($s),s=Ki.dot(this.direction),l=-Ki.dot($s),c=Ki.lengthSq(),p=Math.abs(1-o*o);let h,u,m,_;if(p>0)if(h=o*l-s,u=o*s-l,_=a*p,h>=0)if(u>=-_)if(u<=_){const E=1/p;h*=E,u*=E,m=h*(h+o*u+2*s)+u*(o*h+u+2*l)+c}else u=a,h=Math.max(0,-(o*u+s)),m=-h*h+u*(u+2*l)+c;else u=-a,h=Math.max(0,-(o*u+s)),m=-h*h+u*(u+2*l)+c;else u<=-_?(h=Math.max(0,-(-o*a+s)),u=h>0?-a:Math.min(Math.max(-a,-l),a),m=-h*h+u*(u+2*l)+c):u<=_?(h=0,u=Math.min(Math.max(-a,-l),a),m=u*(u+2*l)+c):(h=Math.max(0,-(o*a+s)),u=h>0?a:Math.min(Math.max(-a,-l),a),m=-h*h+u*(u+2*l)+c);else u=o>0?-a:a,h=Math.max(0,-(o*u+s)),m=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Fu).addScaledVector($s,u),m}intersectSphere(e,n){Mi.subVectors(e.center,this.origin);const i=Mi.dot(this.direction),r=Mi.dot(Mi)-i*i,a=e.radius*e.radius;if(r>a)return null;const o=Math.sqrt(a-r),s=i-o,l=i+o;return l<0?null:s<0?this.at(l,n):this.at(s,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,a,o,s,l;const c=1/this.direction.x,p=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),p>=0?(a=(e.min.y-u.y)*p,o=(e.max.y-u.y)*p):(a=(e.max.y-u.y)*p,o=(e.min.y-u.y)*p),i>o||a>r||((a>i||isNaN(i))&&(i=a),(o<r||isNaN(r))&&(r=o),h>=0?(s=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(s=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),i>l||s>r)||((s>i||i!==i)&&(i=s),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,n,i,r,a){Uu.subVectors(n,e),Ks.subVectors(i,e),Ou.crossVectors(Uu,Ks);let o=this.direction.dot(Ou),s;if(o>0){if(r)return null;s=1}else if(o<0)s=-1,o=-o;else return null;Ki.subVectors(this.origin,e);const l=s*this.direction.dot(Ks.crossVectors(Ki,Ks));if(l<0)return null;const c=s*this.direction.dot(Uu.cross(Ki));if(c<0||l+c>o)return null;const p=-s*Ki.dot(Ou);return p<0?null:this.at(p/o,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gp extends to{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xr,this.combine=tv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const km=new vt,Tr=new Ev,Zs=new Ic,Bm=new H,Qs=new H,Js=new H,el=new H,zu=new H,tl=new H,Vm=new H,nl=new H;class Lt extends Xt{constructor(e=new zn,n=new Gp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const s=this.morphTargetInfluences;if(a&&s){tl.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const p=s[l],h=a[l];p!==0&&(zu.fromBufferAttribute(h,e),o?tl.addScaledVector(zu,p):tl.addScaledVector(zu.sub(n),p))}n.add(tl)}return n}raycast(e,n){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Zs.copy(i.boundingSphere),Zs.applyMatrix4(a),Tr.copy(e.ray).recast(e.near),!(Zs.containsPoint(Tr.origin)===!1&&(Tr.intersectSphere(Zs,Bm)===null||Tr.origin.distanceToSquared(Bm)>(e.far-e.near)**2))&&(km.copy(a).invert(),Tr.copy(e.ray).applyMatrix4(km),!(i.boundingBox!==null&&Tr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Tr)))}_computeIntersections(e,n,i){let r;const a=this.geometry,o=this.material,s=a.index,l=a.attributes.position,c=a.attributes.uv,p=a.attributes.uv1,h=a.attributes.normal,u=a.groups,m=a.drawRange;if(s!==null)if(Array.isArray(o))for(let _=0,E=u.length;_<E;_++){const g=u[_],d=o[g.materialIndex],x=Math.max(g.start,m.start),M=Math.min(s.count,Math.min(g.start+g.count,m.start+m.count));for(let S=x,b=M;S<b;S+=3){const T=s.getX(S),A=s.getX(S+1),v=s.getX(S+2);r=il(this,d,e,i,c,p,h,T,A,v),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),E=Math.min(s.count,m.start+m.count);for(let g=_,d=E;g<d;g+=3){const x=s.getX(g),M=s.getX(g+1),S=s.getX(g+2);r=il(this,o,e,i,c,p,h,x,M,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,E=u.length;_<E;_++){const g=u[_],d=o[g.materialIndex],x=Math.max(g.start,m.start),M=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let S=x,b=M;S<b;S+=3){const T=S,A=S+1,v=S+2;r=il(this,d,e,i,c,p,h,T,A,v),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),E=Math.min(l.count,m.start+m.count);for(let g=_,d=E;g<d;g+=3){const x=g,M=g+1,S=g+2;r=il(this,o,e,i,c,p,h,x,M,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function tM(t,e,n,i,r,a,o,s){let l;if(e.side===mn?l=i.intersectTriangle(o,a,r,!0,s):l=i.intersectTriangle(r,a,o,e.side===Oi,s),l===null)return null;nl.copy(s),nl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(nl);return c<n.near||c>n.far?null:{distance:c,point:nl.clone(),object:t}}function il(t,e,n,i,r,a,o,s,l,c){t.getVertexPosition(s,Qs),t.getVertexPosition(l,Js),t.getVertexPosition(c,el);const p=tM(t,e,n,i,Qs,Js,el,Vm);if(p){const h=new H;Xn.getBarycoord(Vm,Qs,Js,el,h),r&&(p.uv=Xn.getInterpolatedAttribute(r,s,l,c,h,new $e)),a&&(p.uv1=Xn.getInterpolatedAttribute(a,s,l,c,h,new $e)),o&&(p.normal=Xn.getInterpolatedAttribute(o,s,l,c,h,new H),p.normal.dot(i.direction)>0&&p.normal.multiplyScalar(-1));const u={a:s,b:l,c,normal:new H,materialIndex:0};Xn.getNormal(Qs,Js,el,u.normal),p.face=u,p.barycoord=h}return p}class nM extends en{constructor(e=null,n=1,i=1,r,a,o,s,l,c=Wt,p=Wt,h,u){super(null,o,s,l,c,p,r,a,h,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ku=new H,iM=new H,rM=new ze;class Rr{constructor(e=new H(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=ku.subVectors(i,n).cross(iM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(ku),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(o<0||o>1)?null:n.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||rM.getNormalMatrix(e),r=this.coplanarPoint(ku).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const br=new Ic,aM=new $e(.5,.5),rl=new H;class Wp{constructor(e=new Rr,n=new Rr,i=new Rr,r=new Rr,a=new Rr,o=new Rr){this.planes=[e,n,i,r,a,o]}set(e,n,i,r,a,o){const s=this.planes;return s[0].copy(e),s[1].copy(n),s[2].copy(i),s[3].copy(r),s[4].copy(a),s[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=ui,i=!1){const r=this.planes,a=e.elements,o=a[0],s=a[1],l=a[2],c=a[3],p=a[4],h=a[5],u=a[6],m=a[7],_=a[8],E=a[9],g=a[10],d=a[11],x=a[12],M=a[13],S=a[14],b=a[15];if(r[0].setComponents(c-o,m-p,d-_,b-x).normalize(),r[1].setComponents(c+o,m+p,d+_,b+x).normalize(),r[2].setComponents(c+s,m+h,d+E,b+M).normalize(),r[3].setComponents(c-s,m-h,d-E,b-M).normalize(),i)r[4].setComponents(l,u,g,S).normalize(),r[5].setComponents(c-l,m-u,d-g,b-S).normalize();else if(r[4].setComponents(c-l,m-u,d-g,b-S).normalize(),n===ui)r[5].setComponents(c+l,m+u,d+g,b+S).normalize();else if(n===cs)r[5].setComponents(l,u,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),br.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(br)}intersectsSprite(e){br.center.set(0,0,0);const n=aM.distanceTo(e.center);return br.radius=.7071067811865476+n,br.applyMatrix4(e.matrixWorld),this.intersectsSphere(br)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(rl.x=r.normal.x>0?e.max.x:e.min.x,rl.y=r.normal.y>0?e.max.y:e.min.y,rl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(rl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Tv extends to{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const uc=new H,dc=new H,Hm=new vt,vo=new Ev,al=new Ic,Bu=new H,Gm=new H;class oM extends Xt{constructor(e=new zn,n=new Tv){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,a=n.count;r<a;r++)uc.fromBufferAttribute(n,r-1),dc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=uc.distanceTo(dc);e.setAttribute("lineDistance",new tn(i,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),al.copy(i.boundingSphere),al.applyMatrix4(r),al.radius+=a,e.ray.intersectsSphere(al)===!1)return;Hm.copy(r).invert(),vo.copy(e.ray).applyMatrix4(Hm);const s=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=s*s,c=this.isLineSegments?2:1,p=i.index,u=i.attributes.position;if(p!==null){const m=Math.max(0,o.start),_=Math.min(p.count,o.start+o.count);for(let E=m,g=_-1;E<g;E+=c){const d=p.getX(E),x=p.getX(E+1),M=ol(this,e,vo,l,d,x,E);M&&n.push(M)}if(this.isLineLoop){const E=p.getX(_-1),g=p.getX(m),d=ol(this,e,vo,l,E,g,_-1);d&&n.push(d)}}else{const m=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let E=m,g=_-1;E<g;E+=c){const d=ol(this,e,vo,l,E,E+1,E);d&&n.push(d)}if(this.isLineLoop){const E=ol(this,e,vo,l,_-1,m,_-1);E&&n.push(E)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}}function ol(t,e,n,i,r,a,o){const s=t.geometry.attributes.position;if(uc.fromBufferAttribute(s,r),dc.fromBufferAttribute(s,a),n.distanceSqToSegment(uc,dc,Bu,Gm)>i)return;Bu.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Bu);if(!(c<e.near||c>e.far))return{distance:c,point:Gm.clone().applyMatrix4(t.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:t}}const Wm=new H,jm=new H;class sM extends oM{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,a=n.count;r<a;r+=2)Wm.fromBufferAttribute(n,r),jm.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Wm.distanceTo(jm);e.setAttribute("lineDistance",new tn(i,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class bv extends en{constructor(e=[],n=Wr,i,r,a,o,s,l,c,p){super(e,n,i,r,a,o,s,l,c,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lM extends en{constructor(e,n,i,r,a,o,s,l,c){super(e,n,i,r,a,o,s,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $a extends en{constructor(e,n,i=gi,r,a,o,s=Wt,l=Wt,c,p=ki,h=1){if(p!==ki&&p!==Ur)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:h};super(u,r,a,o,s,l,p,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Hp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class cM extends $a{constructor(e,n=gi,i=Wr,r,a,o=Wt,s=Wt,l,c=ki){const p={width:e,height:e,depth:1},h=[p,p,p,p,p,p];super(e,e,n,i,r,a,o,s,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Cv extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class wi extends zn{constructor(e=1,n=1,i=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:a,depthSegments:o};const s=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const l=[],c=[],p=[],h=[];let u=0,m=0;_("z","y","x",-1,-1,i,n,e,o,a,0),_("z","y","x",1,-1,i,n,-e,o,a,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,a,4),_("x","y","z",-1,-1,e,n,-i,r,a,5),this.setIndex(l),this.setAttribute("position",new tn(c,3)),this.setAttribute("normal",new tn(p,3)),this.setAttribute("uv",new tn(h,2));function _(E,g,d,x,M,S,b,T,A,v,R){const P=S/A,I=b/v,O=S/2,$=b/2,ee=T/2,D=A+1,G=v+1;let L=0,U=0;const V=new H;for(let N=0;N<G;N++){const X=N*I-$;for(let Z=0;Z<D;Z++){const ce=Z*P-O;V[E]=ce*x,V[g]=X*M,V[d]=ee,c.push(V.x,V.y,V.z),V[E]=0,V[g]=0,V[d]=T>0?1:-1,p.push(V.x,V.y,V.z),h.push(Z/A),h.push(1-N/v),L+=1}}for(let N=0;N<v;N++)for(let X=0;X<A;X++){const Z=u+X+D*N,ce=u+X+D*(N+1),De=u+(X+1)+D*(N+1),Ie=u+(X+1)+D*N;l.push(Z,ce,Ie),l.push(ce,De,Ie),U+=6}s.addGroup(m,U,R),m+=U,u+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Pr extends zn{constructor(e=1,n=1,i=1,r=32,a=1,o=!1,s=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:a,openEnded:o,thetaStart:s,thetaLength:l};const c=this;r=Math.floor(r),a=Math.floor(a);const p=[],h=[],u=[],m=[];let _=0;const E=[],g=i/2;let d=0;x(),o===!1&&(e>0&&M(!0),n>0&&M(!1)),this.setIndex(p),this.setAttribute("position",new tn(h,3)),this.setAttribute("normal",new tn(u,3)),this.setAttribute("uv",new tn(m,2));function x(){const S=new H,b=new H;let T=0;const A=(n-e)/i;for(let v=0;v<=a;v++){const R=[],P=v/a,I=P*(n-e)+e;for(let O=0;O<=r;O++){const $=O/r,ee=$*l+s,D=Math.sin(ee),G=Math.cos(ee);b.x=I*D,b.y=-P*i+g,b.z=I*G,h.push(b.x,b.y,b.z),S.set(D,A,G).normalize(),u.push(S.x,S.y,S.z),m.push($,1-P),R.push(_++)}E.push(R)}for(let v=0;v<r;v++)for(let R=0;R<a;R++){const P=E[R][v],I=E[R+1][v],O=E[R+1][v+1],$=E[R][v+1];(e>0||R!==0)&&(p.push(P,I,$),T+=3),(n>0||R!==a-1)&&(p.push(I,O,$),T+=3)}c.addGroup(d,T,0),d+=T}function M(S){const b=_,T=new $e,A=new H;let v=0;const R=S===!0?e:n,P=S===!0?1:-1;for(let O=1;O<=r;O++)h.push(0,g*P,0),u.push(0,P,0),m.push(.5,.5),_++;const I=_;for(let O=0;O<=r;O++){const ee=O/r*l+s,D=Math.cos(ee),G=Math.sin(ee);A.x=R*G,A.y=g*P,A.z=R*D,h.push(A.x,A.y,A.z),u.push(0,P,0),T.x=D*.5+.5,T.y=G*.5*P+.5,m.push(T.x,T.y),_++}for(let O=0;O<r;O++){const $=b+O,ee=I+O;S===!0?p.push(ee,ee+1,$):p.push(ee+1,ee,$),v+=3}c.addGroup(d,v,S===!0?1:2),d+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class vs extends zn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const a=e/2,o=n/2,s=Math.floor(i),l=Math.floor(r),c=s+1,p=l+1,h=e/s,u=n/l,m=[],_=[],E=[],g=[];for(let d=0;d<p;d++){const x=d*u-o;for(let M=0;M<c;M++){const S=M*h-a;_.push(S,-x,0),E.push(0,0,1),g.push(M/s),g.push(1-d/l)}}for(let d=0;d<l;d++)for(let x=0;x<s;x++){const M=x+c*d,S=x+c*(d+1),b=x+1+c*(d+1),T=x+1+c*d;m.push(M,S,T),m.push(S,b,T)}this.setIndex(m),this.setAttribute("position",new tn(_,3)),this.setAttribute("normal",new tn(E,3)),this.setAttribute("uv",new tn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ka(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(Xm(r))r.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(Xm(r[0])){const a=[];for(let o=0,s=r.length;o<s;o++)a[o]=r[o].clone();e[n][i]=a}else e[n][i]=r.slice();else e[n][i]=r}}return e}function rn(t){const e={};for(let n=0;n<t.length;n++){const i=Ka(t[n]);for(const r in i)e[r]=i[r]}return e}function Xm(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function uM(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Av(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const dM={clone:Ka,merge:rn};var fM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xi extends to{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fM,this.fragmentShader=pM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ka(e.uniforms),this.uniformsGroups=uM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new We().setHex(r.value);break;case"v2":this.uniforms[i].value=new $e().fromArray(r.value);break;case"v3":this.uniforms[i].value=new H().fromArray(r.value);break;case"v4":this.uniforms[i].value=new gt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new ze().fromArray(r.value);break;case"m4":this.uniforms[i].value=new vt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class hM extends xi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ca extends to{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ff,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class mM extends to{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=TS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gM extends to{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Rv extends Xt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const Vu=new vt,qm=new H,Ym=new H;class xM{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wp,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;qm.setFromMatrixPosition(e.matrixWorld),n.position.copy(qm),Ym.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Ym),n.updateMatrixWorld(),Vu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vu,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===cs||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Vu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const sl=new H,ll=new eo,ni=new H;class wv extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(sl,ll,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sl,ll,ni.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(sl,ll,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sl,ll,ni.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Zi=new H,$m=new $e,Km=new $e;class Ln extends wv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Uf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(gu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Uf*2*Math.atan(Math.tan(gu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zi.x,Zi.y).multiplyScalar(-e/Zi.z),Zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Zi.x,Zi.y).multiplyScalar(-e/Zi.z)}getViewSize(e,n){return this.getViewBounds(e,$m,Km),n.subVectors(Km,$m)}setViewOffset(e,n,i,r,a,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(gu*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;a+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const s=this.filmOffset;s!==0&&(a+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class jp extends wv{constructor(e=-1,n=1,i=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,o=i+e,s=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,s-=p*this.view.offsetY,l=s-p*this.view.height}this.projectionMatrix.makeOrthographic(a,o,s,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class vM extends xM{constructor(){super(new jp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zm extends Rv{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.shadow=new vM}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class _M extends Rv{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const ua=-90,da=1;class yM extends Xt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ln(ua,da,e,n);r.layers=this.layers,this.add(r);const a=new Ln(ua,da,e,n);a.layers=this.layers,this.add(a);const o=new Ln(ua,da,e,n);o.layers=this.layers,this.add(o);const s=new Ln(ua,da,e,n);s.layers=this.layers,this.add(s);const l=new Ln(ua,da,e,n);l.layers=this.layers,this.add(l);const c=new Ln(ua,da,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,a,o,s,l]=n;for(const c of n)this.remove(c);if(e===ui)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===cs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,s,l,c,p]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,p),e.setRenderTarget(h,u,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class SM extends Ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class MM{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Fe("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=performance.now();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}const Qp=class Qp{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const a=this.elements;return a[0]=e,a[2]=n,a[1]=i,a[3]=r,this}};Qp.prototype.isMatrix2=!0;let Qm=Qp;class EM extends sM{constructor(e=10,n=10,i=4473924,r=8947848){i=new We(i),r=new We(r);const a=n/2,o=e/n,s=e/2,l=[],c=[];for(let u=0,m=0,_=-s;u<=n;u++,_+=o){l.push(-s,0,_,s,0,_),l.push(_,0,-s,_,0,s);const E=u===a?i:r;E.toArray(c,m),m+=3,E.toArray(c,m),m+=3,E.toArray(c,m),m+=3,E.toArray(c,m),m+=3}const p=new zn;p.setAttribute("position",new tn(l,3)),p.setAttribute("color",new tn(c,3));const h=new Tv({vertexColors:!0,toneMapped:!1});super(p,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function Jm(t,e,n,i){const r=TM(i);switch(n){case hv:return t*e;case gv:return t*e/r.components*r.byteLength;case Op:return t*e/r.components*r.byteLength;case jr:return t*e*2/r.components*r.byteLength;case zp:return t*e*2/r.components*r.byteLength;case mv:return t*e*3/r.components*r.byteLength;case qn:return t*e*4/r.components*r.byteLength;case kp:return t*e*4/r.components*r.byteLength;case Pl:case Il:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Dl:case Ll:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case of:case lf:return Math.max(t,16)*Math.max(e,8)/4;case af:case sf:return Math.max(t,8)*Math.max(e,8)/2;case cf:case uf:case ff:case pf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case df:case ac:case hf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case mf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case gf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case xf:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case vf:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case _f:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case yf:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Sf:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Mf:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Ef:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Tf:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case bf:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Cf:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Af:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Rf:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case wf:case Pf:case If:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Df:case Lf:return Math.ceil(t/4)*Math.ceil(e/4)*8;case oc:case Nf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function TM(t){switch(t){case yn:case uv:return{byteLength:1,components:1};case ss:case dv:case zi:return{byteLength:2,components:1};case Fp:case Up:return{byteLength:2,components:4};case gi:case Np:case ci:return{byteLength:4,components:1};case fv:case pv:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lp}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Pv(){let t=null,e=!1,n=null,i=null;function r(a,o){n(a,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){n=a},setContext:function(a){t=a}}}function bM(t){const e=new WeakMap;function n(s,l){const c=s.array,p=s.usage,h=c.byteLength,u=t.createBuffer();t.bindBuffer(l,u),t.bufferData(l,c,p),s.onUploadCallback();let m;if(c instanceof Float32Array)m=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=t.HALF_FLOAT;else if(c instanceof Uint16Array)s.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=t.SHORT;else if(c instanceof Uint32Array)m=t.UNSIGNED_INT;else if(c instanceof Int32Array)m=t.INT;else if(c instanceof Int8Array)m=t.BYTE;else if(c instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:s.version,size:h}}function i(s,l,c){const p=l.array,h=l.updateRanges;if(t.bindBuffer(c,s),h.length===0)t.bufferSubData(c,0,p);else{h.sort((m,_)=>m.start-_.start);let u=0;for(let m=1;m<h.length;m++){const _=h[u],E=h[m];E.start<=_.start+_.count+1?_.count=Math.max(_.count,E.start+E.count-_.start):(++u,h[u]=E)}h.length=u+1;for(let m=0,_=h.length;m<_;m++){const E=h[m];t.bufferSubData(c,E.start*p.BYTES_PER_ELEMENT,p,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),e.get(s)}function a(s){s.isInterleavedBufferAttribute&&(s=s.data);const l=e.get(s);l&&(t.deleteBuffer(l.buffer),e.delete(s))}function o(s,l){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const p=e.get(s);(!p||p.version<s.version)&&e.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const c=e.get(s);if(c===void 0)e.set(s,n(s,l));else if(c.version<s.version){if(c.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,s,l),c.version=s.version}}return{get:r,remove:a,update:o}}var CM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,AM=`#ifdef USE_ALPHAHASH
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
#endif`,RM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,PM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,IM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,DM=`#ifdef USE_AOMAP
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
#endif`,LM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,NM=`#ifdef USE_BATCHING
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
#endif`,FM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,UM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,OM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,kM=`#ifdef USE_IRIDESCENCE
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
#endif`,BM=`#ifdef USE_BUMPMAP
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
#endif`,VM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,HM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,GM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,WM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,XM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,qM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,YM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,$M=`#define PI 3.141592653589793
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
} // validated`,KM=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ZM=`vec3 transformedNormal = objectNormal;
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
#endif`,QM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,JM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,eE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nE="gl_FragColor = linearToOutputTexel( gl_FragColor );",iE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rE=`#ifdef USE_ENVMAP
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
#endif`,aE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,oE=`#ifdef USE_ENVMAP
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
#endif`,sE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lE=`#ifdef USE_ENVMAP
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
#endif`,cE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,uE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pE=`#ifdef USE_GRADIENTMAP
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
}`,hE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,vE=`#ifdef USE_ENVMAP
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
#endif`,_E=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,SE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ME=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,EE=`PhysicalMaterial material;
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
#endif`,TE=`uniform sampler2D dfgLUT;
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
}`,bE=`
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
#endif`,CE=`#if defined( RE_IndirectDiffuse )
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
#endif`,AE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,RE=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,wE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,PE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,IE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,DE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,LE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,NE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,FE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,UE=`#if defined( USE_POINTS_UV )
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
#endif`,OE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,BE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,VE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,HE=`#ifdef USE_MORPHTARGETS
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
#endif`,GE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,WE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,jE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,XE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,YE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,$E=`#ifdef USE_NORMALMAP
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
#endif`,KE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ZE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,QE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,JE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,nT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,iT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,aT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,oT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,uT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,dT=`float getShadowMask() {
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
}`,fT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pT=`#ifdef USE_SKINNING
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
#endif`,hT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mT=`#ifdef USE_SKINNING
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
#endif`,gT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_T=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yT=`#ifdef USE_TRANSMISSION
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
#endif`,ST=`#ifdef USE_TRANSMISSION
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
#endif`,MT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ET=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,TT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const CT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,AT=`uniform sampler2D t2D;
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
}`,RT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,PT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,IT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DT=`#include <common>
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
}`,LT=`#if DEPTH_PACKING == 3200
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
}`,NT=`#define DISTANCE
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
}`,FT=`#define DISTANCE
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
}`,UT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,OT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zT=`uniform float scale;
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
}`,kT=`uniform vec3 diffuse;
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
}`,BT=`#include <common>
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
}`,VT=`uniform vec3 diffuse;
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
}`,HT=`#define LAMBERT
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
}`,GT=`#define LAMBERT
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
}`,WT=`#define MATCAP
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
}`,jT=`#define MATCAP
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
}`,XT=`#define NORMAL
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
}`,qT=`#define NORMAL
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
}`,YT=`#define PHONG
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
}`,$T=`#define PHONG
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
}`,KT=`#define STANDARD
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
}`,ZT=`#define STANDARD
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
}`,QT=`#define TOON
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
}`,JT=`#define TOON
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
}`,eb=`uniform float size;
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
}`,tb=`uniform vec3 diffuse;
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
}`,nb=`#include <common>
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
}`,ib=`uniform vec3 color;
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
}`,rb=`uniform float rotation;
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
}`,ab=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:CM,alphahash_pars_fragment:AM,alphamap_fragment:RM,alphamap_pars_fragment:wM,alphatest_fragment:PM,alphatest_pars_fragment:IM,aomap_fragment:DM,aomap_pars_fragment:LM,batching_pars_vertex:NM,batching_vertex:FM,begin_vertex:UM,beginnormal_vertex:OM,bsdfs:zM,iridescence_fragment:kM,bumpmap_pars_fragment:BM,clipping_planes_fragment:VM,clipping_planes_pars_fragment:HM,clipping_planes_pars_vertex:GM,clipping_planes_vertex:WM,color_fragment:jM,color_pars_fragment:XM,color_pars_vertex:qM,color_vertex:YM,common:$M,cube_uv_reflection_fragment:KM,defaultnormal_vertex:ZM,displacementmap_pars_vertex:QM,displacementmap_vertex:JM,emissivemap_fragment:eE,emissivemap_pars_fragment:tE,colorspace_fragment:nE,colorspace_pars_fragment:iE,envmap_fragment:rE,envmap_common_pars_fragment:aE,envmap_pars_fragment:oE,envmap_pars_vertex:sE,envmap_physical_pars_fragment:vE,envmap_vertex:lE,fog_vertex:cE,fog_pars_vertex:uE,fog_fragment:dE,fog_pars_fragment:fE,gradientmap_pars_fragment:pE,lightmap_pars_fragment:hE,lights_lambert_fragment:mE,lights_lambert_pars_fragment:gE,lights_pars_begin:xE,lights_toon_fragment:_E,lights_toon_pars_fragment:yE,lights_phong_fragment:SE,lights_phong_pars_fragment:ME,lights_physical_fragment:EE,lights_physical_pars_fragment:TE,lights_fragment_begin:bE,lights_fragment_maps:CE,lights_fragment_end:AE,lightprobes_pars_fragment:RE,logdepthbuf_fragment:wE,logdepthbuf_pars_fragment:PE,logdepthbuf_pars_vertex:IE,logdepthbuf_vertex:DE,map_fragment:LE,map_pars_fragment:NE,map_particle_fragment:FE,map_particle_pars_fragment:UE,metalnessmap_fragment:OE,metalnessmap_pars_fragment:zE,morphinstance_vertex:kE,morphcolor_vertex:BE,morphnormal_vertex:VE,morphtarget_pars_vertex:HE,morphtarget_vertex:GE,normal_fragment_begin:WE,normal_fragment_maps:jE,normal_pars_fragment:XE,normal_pars_vertex:qE,normal_vertex:YE,normalmap_pars_fragment:$E,clearcoat_normal_fragment_begin:KE,clearcoat_normal_fragment_maps:ZE,clearcoat_pars_fragment:QE,iridescence_pars_fragment:JE,opaque_fragment:eT,packing:tT,premultiplied_alpha_fragment:nT,project_vertex:iT,dithering_fragment:rT,dithering_pars_fragment:aT,roughnessmap_fragment:oT,roughnessmap_pars_fragment:sT,shadowmap_pars_fragment:lT,shadowmap_pars_vertex:cT,shadowmap_vertex:uT,shadowmask_pars_fragment:dT,skinbase_vertex:fT,skinning_pars_vertex:pT,skinning_vertex:hT,skinnormal_vertex:mT,specularmap_fragment:gT,specularmap_pars_fragment:xT,tonemapping_fragment:vT,tonemapping_pars_fragment:_T,transmission_fragment:yT,transmission_pars_fragment:ST,uv_pars_fragment:MT,uv_pars_vertex:ET,uv_vertex:TT,worldpos_vertex:bT,background_vert:CT,background_frag:AT,backgroundCube_vert:RT,backgroundCube_frag:wT,cube_vert:PT,cube_frag:IT,depth_vert:DT,depth_frag:LT,distance_vert:NT,distance_frag:FT,equirect_vert:UT,equirect_frag:OT,linedashed_vert:zT,linedashed_frag:kT,meshbasic_vert:BT,meshbasic_frag:VT,meshlambert_vert:HT,meshlambert_frag:GT,meshmatcap_vert:WT,meshmatcap_frag:jT,meshnormal_vert:XT,meshnormal_frag:qT,meshphong_vert:YT,meshphong_frag:$T,meshphysical_vert:KT,meshphysical_frag:ZT,meshtoon_vert:QT,meshtoon_frag:JT,points_vert:eb,points_frag:tb,shadow_vert:nb,shadow_frag:ib,sprite_vert:rb,sprite_frag:ab},ge={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},si={basic:{uniforms:rn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:rn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new We(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:rn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:rn([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:rn([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new We(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:rn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:rn([ge.points,ge.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:rn([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:rn([ge.common,ge.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:rn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:rn([ge.sprite,ge.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:rn([ge.common,ge.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:rn([ge.lights,ge.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};si.physical={uniforms:rn([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const cl={r:0,b:0,g:0},ob=new vt,Iv=new ze;Iv.set(-1,0,0,0,1,0,0,0,1);function sb(t,e,n,i,r,a){const o=new We(0);let s=r===!0?0:1,l,c,p=null,h=0,u=null;function m(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){const S=x.backgroundBlurriness>0;M=e.get(M,S)}return M}function _(x){let M=!1;const S=m(x);S===null?g(o,s):S&&S.isColor&&(g(S,1),M=!0);const b=t.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(t.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function E(x,M){const S=m(M);S&&(S.isCubeTexture||S.mapping===Pc)?(c===void 0&&(c=new Lt(new wi(1,1,1),new xi({name:"BackgroundCubeMaterial",uniforms:Ka(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ob.makeRotationFromEuler(M.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Iv),c.material.toneMapped=qe.getTransfer(S.colorSpace)!==nt,(p!==S||h!==S.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,p=S,h=S.version,u=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Lt(new vs(2,2),new xi({name:"BackgroundMaterial",uniforms:Ka(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=qe.getTransfer(S.colorSpace)!==nt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(p!==S||h!==S.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,p=S,h=S.version,u=t.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function g(x,M){x.getRGB(cl,Av(t)),n.buffers.color.setClear(cl.r,cl.g,cl.b,M,a)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,M=1){o.set(x),s=M,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(x){s=x,g(o,s)},render:_,addToRenderList:E,dispose:d}}function lb(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=u(null);let a=r,o=!1;function s(I,O,$,ee,D){let G=!1;const L=h(I,ee,$,O);a!==L&&(a=L,c(a.object)),G=m(I,ee,$,D),G&&_(I,ee,$,D),D!==null&&e.update(D,t.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,S(I,O,$,ee),D!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function l(){return t.createVertexArray()}function c(I){return t.bindVertexArray(I)}function p(I){return t.deleteVertexArray(I)}function h(I,O,$,ee){const D=ee.wireframe===!0;let G=i[O.id];G===void 0&&(G={},i[O.id]=G);const L=I.isInstancedMesh===!0?I.id:0;let U=G[L];U===void 0&&(U={},G[L]=U);let V=U[$.id];V===void 0&&(V={},U[$.id]=V);let N=V[D];return N===void 0&&(N=u(l()),V[D]=N),N}function u(I){const O=[],$=[],ee=[];for(let D=0;D<n;D++)O[D]=0,$[D]=0,ee[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:$,attributeDivisors:ee,object:I,attributes:{},index:null}}function m(I,O,$,ee){const D=a.attributes,G=O.attributes;let L=0;const U=$.getAttributes();for(const V in U)if(U[V].location>=0){const X=D[V];let Z=G[V];if(Z===void 0&&(V==="instanceMatrix"&&I.instanceMatrix&&(Z=I.instanceMatrix),V==="instanceColor"&&I.instanceColor&&(Z=I.instanceColor)),X===void 0||X.attribute!==Z||Z&&X.data!==Z.data)return!0;L++}return a.attributesNum!==L||a.index!==ee}function _(I,O,$,ee){const D={},G=O.attributes;let L=0;const U=$.getAttributes();for(const V in U)if(U[V].location>=0){let X=G[V];X===void 0&&(V==="instanceMatrix"&&I.instanceMatrix&&(X=I.instanceMatrix),V==="instanceColor"&&I.instanceColor&&(X=I.instanceColor));const Z={};Z.attribute=X,X&&X.data&&(Z.data=X.data),D[V]=Z,L++}a.attributes=D,a.attributesNum=L,a.index=ee}function E(){const I=a.newAttributes;for(let O=0,$=I.length;O<$;O++)I[O]=0}function g(I){d(I,0)}function d(I,O){const $=a.newAttributes,ee=a.enabledAttributes,D=a.attributeDivisors;$[I]=1,ee[I]===0&&(t.enableVertexAttribArray(I),ee[I]=1),D[I]!==O&&(t.vertexAttribDivisor(I,O),D[I]=O)}function x(){const I=a.newAttributes,O=a.enabledAttributes;for(let $=0,ee=O.length;$<ee;$++)O[$]!==I[$]&&(t.disableVertexAttribArray($),O[$]=0)}function M(I,O,$,ee,D,G,L){L===!0?t.vertexAttribIPointer(I,O,$,D,G):t.vertexAttribPointer(I,O,$,ee,D,G)}function S(I,O,$,ee){E();const D=ee.attributes,G=$.getAttributes(),L=O.defaultAttributeValues;for(const U in G){const V=G[U];if(V.location>=0){let N=D[U];if(N===void 0&&(U==="instanceMatrix"&&I.instanceMatrix&&(N=I.instanceMatrix),U==="instanceColor"&&I.instanceColor&&(N=I.instanceColor)),N!==void 0){const X=N.normalized,Z=N.itemSize,ce=e.get(N);if(ce===void 0)continue;const De=ce.buffer,Ie=ce.type,K=ce.bytesPerElement,re=Ie===t.INT||Ie===t.UNSIGNED_INT||N.gpuType===Np;if(N.isInterleavedBufferAttribute){const oe=N.data,Ue=oe.stride,Oe=N.offset;if(oe.isInstancedInterleavedBuffer){for(let Le=0;Le<V.locationSize;Le++)d(V.location+Le,oe.meshPerAttribute);I.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Le=0;Le<V.locationSize;Le++)g(V.location+Le);t.bindBuffer(t.ARRAY_BUFFER,De);for(let Le=0;Le<V.locationSize;Le++)M(V.location+Le,Z/V.locationSize,Ie,X,Ue*K,(Oe+Z/V.locationSize*Le)*K,re)}else{if(N.isInstancedBufferAttribute){for(let oe=0;oe<V.locationSize;oe++)d(V.location+oe,N.meshPerAttribute);I.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let oe=0;oe<V.locationSize;oe++)g(V.location+oe);t.bindBuffer(t.ARRAY_BUFFER,De);for(let oe=0;oe<V.locationSize;oe++)M(V.location+oe,Z/V.locationSize,Ie,X,Z*K,Z/V.locationSize*oe*K,re)}}else if(L!==void 0){const X=L[U];if(X!==void 0)switch(X.length){case 2:t.vertexAttrib2fv(V.location,X);break;case 3:t.vertexAttrib3fv(V.location,X);break;case 4:t.vertexAttrib4fv(V.location,X);break;default:t.vertexAttrib1fv(V.location,X)}}}}x()}function b(){R();for(const I in i){const O=i[I];for(const $ in O){const ee=O[$];for(const D in ee){const G=ee[D];for(const L in G)p(G[L].object),delete G[L];delete ee[D]}}delete i[I]}}function T(I){if(i[I.id]===void 0)return;const O=i[I.id];for(const $ in O){const ee=O[$];for(const D in ee){const G=ee[D];for(const L in G)p(G[L].object),delete G[L];delete ee[D]}}delete i[I.id]}function A(I){for(const O in i){const $=i[O];for(const ee in $){const D=$[ee];if(D[I.id]===void 0)continue;const G=D[I.id];for(const L in G)p(G[L].object),delete G[L];delete D[I.id]}}}function v(I){for(const O in i){const $=i[O],ee=I.isInstancedMesh===!0?I.id:0,D=$[ee];if(D!==void 0){for(const G in D){const L=D[G];for(const U in L)p(L[U].object),delete L[U];delete D[G]}delete $[ee],Object.keys($).length===0&&delete i[O]}}}function R(){P(),o=!0,a!==r&&(a=r,c(a.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:R,resetDefaultState:P,dispose:b,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:E,enableAttribute:g,disableUnusedAttributes:x}}function cb(t,e,n){let i;function r(l){i=l}function a(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function o(l,c,p){p!==0&&(t.drawArraysInstanced(i,l,c,p),n.update(c,i,p))}function s(l,c,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,p);let u=0;for(let m=0;m<p;m++)u+=c[m];n.update(u,i,1)}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ub(t,e,n,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==qn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(A){const v=A===zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==yn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==ci&&!v)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const p=l(c);p!==c&&(Fe("WebGLRenderer:",c,"not supported, using",p,"instead."),c=p);const h=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),x=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),M=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),b=t.getParameter(t.MAX_SAMPLES),T=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:s,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:_,maxTextureSize:E,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:S,maxSamples:b,samples:T}}function db(t){const e=this;let n=null,i=0,r=!1,a=!1;const o=new Rr,s=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const m=h.length!==0||u||i!==0||r;return r=u,i=h.length,m},this.beginShadows=function(){a=!0,p(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,u){n=p(h,u,0)},this.setState=function(h,u,m){const _=h.clippingPlanes,E=h.clipIntersection,g=h.clipShadows,d=t.get(h);if(!r||_===null||_.length===0||a&&!g)a?p(null):c();else{const x=a?0:i,M=x*4;let S=d.clippingState||null;l.value=S,S=p(_,u,M,m);for(let b=0;b!==M;++b)S[b]=n[b];d.clippingState=S,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function p(h,u,m,_){const E=h!==null?h.length:0;let g=null;if(E!==0){if(g=l.value,_!==!0||g===null){const d=m+E*4,x=u.matrixWorldInverse;s.getNormalMatrix(x),(g===null||g.length<d)&&(g=new Float32Array(d));for(let M=0,S=m;M!==E;++M,S+=4)o.copy(h[M]).applyMatrix4(x,s),o.normal.toArray(g,S),g[S+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,g}}const or=4,e0=[.125,.215,.35,.446,.526,.582],Ir=20,fb=256,_o=new jp,t0=new We;let Hu=null,Gu=0,Wu=0,ju=!1;const pb=new H;class n0{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,a={}){const{size:o=256,position:s=pb}=a;Hu=this._renderer.getRenderTarget(),Gu=this._renderer.getActiveCubeFace(),Wu=this._renderer.getActiveMipmapLevel(),ju=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,s),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=a0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=r0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Hu,Gu,Wu),this._renderer.xr.enabled=ju,e.scissorTest=!1,fa(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Wr||e.mapping===Ya?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hu=this._renderer.getRenderTarget(),Gu=this._renderer.getActiveCubeFace(),Wu=this._renderer.getActiveMipmapLevel(),ju=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:zi,format:qn,colorSpace:sc,depthBuffer:!1},r=i0(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=i0(e,n,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=hb(a)),this._blurMaterial=gb(a,e,n),this._ggxMaterial=mb(a,e,n)}return r}_compileMaterial(e){const n=new Lt(new zn,e);this._renderer.compile(n,_o)}_sceneToCubeUV(e,n,i,r,a){const l=new Ln(90,1,n,i),c=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,m=h.toneMapping;h.getClearColor(t0),h.toneMapping=pi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Lt(new wi,new Gp({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,g=E.material;let d=!1;const x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,d=!0):(g.color.copy(t0),d=!0);for(let M=0;M<6;M++){const S=M%3;S===0?(l.up.set(0,c[M],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+p[M],a.y,a.z)):S===1?(l.up.set(0,0,c[M]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+p[M],a.z)):(l.up.set(0,c[M],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+p[M]));const b=this._cubeSize;fa(r,S*b,M>2?b:0,b,b),h.setRenderTarget(r),d&&h.render(E,l),h.render(e,l)}h.toneMapping=m,h.autoClear=u,e.background=x}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Wr||e.mapping===Ya;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=a0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=r0());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const s=a.uniforms;s.envMap.value=e;const l=this._cubeSize;fa(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,_o)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,a=this._pingPongRenderTarget,o=this._ggxMaterial,s=this._lodMeshes[i];s.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),p=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-p*p),u=0+c*1.25,m=h*u,{_lodMax:_}=this,E=this._sizeLods[i],g=3*E*(i>_-or?i-_+or:0),d=4*(this._cubeSize-E);l.envMap.value=e.texture,l.roughness.value=m,l.mipInt.value=_-n,fa(a,g,d,3*E,2*E),r.setRenderTarget(a),r.render(s,_o),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=_-i,fa(e,g,d,3*E,2*E),r.setRenderTarget(e),r.render(s,_o)}_blur(e,n,i,r,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",a),this._halfBlur(o,e,i,i,r,"longitudinal",a)}_halfBlur(e,n,i,r,a,o,s){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const p=3,h=this._lodMeshes[r];h.material=c;const u=c.uniforms,m=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*m):2*Math.PI/(2*Ir-1),E=a/_,g=isFinite(a)?1+Math.floor(p*E):Ir;g>Ir&&Fe(`sigmaRadians, ${a}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ir}`);const d=[];let x=0;for(let A=0;A<Ir;++A){const v=A/E,R=Math.exp(-v*v/2);d.push(R),A===0?x+=R:A<g&&(x+=2*R)}for(let A=0;A<d.length;A++)d[A]=d[A]/x;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=d,u.latitudinal.value=o==="latitudinal",s&&(u.poleAxis.value=s);const{_lodMax:M}=this;u.dTheta.value=_,u.mipInt.value=M-i;const S=this._sizeLods[r],b=3*S*(r>M-or?r-M+or:0),T=4*(this._cubeSize-S);fa(n,b,T,3*S,2*S),l.setRenderTarget(n),l.render(h,_o)}}function hb(t){const e=[],n=[],i=[];let r=t;const a=t-or+1+e0.length;for(let o=0;o<a;o++){const s=Math.pow(2,r);e.push(s);let l=1/s;o>t-or?l=e0[o-t+or-1]:o===0&&(l=0),n.push(l);const c=1/(s-2),p=-c,h=1+c,u=[p,p,h,p,h,h,p,p,h,h,p,h],m=6,_=6,E=3,g=2,d=1,x=new Float32Array(E*_*m),M=new Float32Array(g*_*m),S=new Float32Array(d*_*m);for(let T=0;T<m;T++){const A=T%3*2/3-1,v=T>2?0:-1,R=[A,v,0,A+2/3,v,0,A+2/3,v+1,0,A,v,0,A+2/3,v+1,0,A,v+1,0];x.set(R,E*_*T),M.set(u,g*_*T);const P=[T,T,T,T,T,T];S.set(P,d*_*T)}const b=new zn;b.setAttribute("position",new mi(x,E)),b.setAttribute("uv",new mi(M,g)),b.setAttribute("faceIndex",new mi(S,d)),i.push(new Lt(b,null)),r>or&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function i0(t,e,n){const i=new hi(t,e,n);return i.texture.mapping=Pc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function fa(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function mb(t,e,n){return new xi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:fb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Dc(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function gb(t,e,n){const i=new Float32Array(Ir),r=new H(0,1,0);return new xi({name:"SphericalGaussianBlur",defines:{n:Ir,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Dc(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function r0(){return new xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dc(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function a0(){return new xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Dc(){return`

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
	`}class Dv extends hi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new bv(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new wi(5,5,5),a=new xi({name:"CubemapFromEquirect",uniforms:Ka(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:mn,blending:Ii});a.uniforms.tEquirect.value=n;const o=new Lt(r,a),s=n.minFilter;return n.minFilter===Fr&&(n.minFilter=Vt),new yM(1,10,this).update(e,o),n.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(a)}}function xb(t){let e=new WeakMap,n=new WeakMap,i=null;function r(u,m=!1){return u==null?null:m?o(u):a(u)}function a(u){if(u&&u.isTexture){const m=u.mapping;if(m===pu||m===hu)if(e.has(u)){const _=e.get(u).texture;return s(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const E=new Dv(_.height);return E.fromEquirectangularTexture(t,u),e.set(u,E),u.addEventListener("dispose",c),s(E.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const m=u.mapping,_=m===pu||m===hu,E=m===Wr||m===Ya;if(_||E){let g=n.get(u);const d=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new n0(t)),g=_?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),g.texture;if(g!==void 0)return g.texture;{const x=u.image;return _&&x&&x.height>0||E&&x&&l(x)?(i===null&&(i=new n0(t)),g=_?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),u.addEventListener("dispose",p),g.texture):null}}}return u}function s(u,m){return m===pu?u.mapping=Wr:m===hu&&(u.mapping=Ya),u}function l(u){let m=0;const _=6;for(let E=0;E<_;E++)u[E]!==void 0&&m++;return m===_}function c(u){const m=u.target;m.removeEventListener("dispose",c);const _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function p(u){const m=u.target;m.removeEventListener("dispose",p);const _=n.get(m);_!==void 0&&(n.delete(m),_.dispose())}function h(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function vb(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&za("WebGLRenderer: "+i+" extension not supported."),r}}}function _b(t,e,n,i){const r={},a=new WeakMap;function o(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",o),delete r[u.id];const m=a.get(u);m&&(e.remove(m),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function s(h,u){return r[u.id]===!0||(u.addEventListener("dispose",o),r[u.id]=!0,n.memory.geometries++),u}function l(h){const u=h.attributes;for(const m in u)e.update(u[m],t.ARRAY_BUFFER)}function c(h){const u=[],m=h.index,_=h.attributes.position;let E=0;if(_===void 0)return;if(m!==null){const x=m.array;E=m.version;for(let M=0,S=x.length;M<S;M+=3){const b=x[M+0],T=x[M+1],A=x[M+2];u.push(b,T,T,A,A,b)}}else{const x=_.array;E=_.version;for(let M=0,S=x.length/3-1;M<S;M+=3){const b=M+0,T=M+1,A=M+2;u.push(b,T,T,A,A,b)}}const g=new(_.count>=65535?Mv:Sv)(u,1);g.version=E;const d=a.get(h);d&&e.remove(d),a.set(h,g)}function p(h){const u=a.get(h);if(u){const m=h.index;m!==null&&u.version<m.version&&c(h)}else c(h);return a.get(h)}return{get:s,update:l,getWireframeAttribute:p}}function yb(t,e,n){let i;function r(h){i=h}let a,o;function s(h){a=h.type,o=h.bytesPerElement}function l(h,u){t.drawElements(i,u,a,h*o),n.update(u,i,1)}function c(h,u,m){m!==0&&(t.drawElementsInstanced(i,u,a,h*o,m),n.update(u,i,m))}function p(h,u,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,a,h,0,m);let E=0;for(let g=0;g<m;g++)E+=u[g];n.update(E,i,1)}this.setMode=r,this.setIndex=s,this.render=l,this.renderInstances=c,this.renderMultiDraw=p}function Sb(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,s){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=s*(a/3);break;case t.LINES:n.lines+=s*(a/2);break;case t.LINE_STRIP:n.lines+=s*(a-1);break;case t.LINE_LOOP:n.lines+=s*a;break;case t.POINTS:n.points+=s*a;break;default:Qe("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Mb(t,e,n){const i=new WeakMap,r=new gt;function a(o,s,l){const c=o.morphTargetInfluences,p=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,h=p!==void 0?p.length:0;let u=i.get(s);if(u===void 0||u.count!==h){let P=function(){v.dispose(),i.delete(s),s.removeEventListener("dispose",P)};var m=P;u!==void 0&&u.texture.dispose();const _=s.morphAttributes.position!==void 0,E=s.morphAttributes.normal!==void 0,g=s.morphAttributes.color!==void 0,d=s.morphAttributes.position||[],x=s.morphAttributes.normal||[],M=s.morphAttributes.color||[];let S=0;_===!0&&(S=1),E===!0&&(S=2),g===!0&&(S=3);let b=s.attributes.position.count*S,T=1;b>e.maxTextureSize&&(T=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const A=new Float32Array(b*T*4*h),v=new vv(A,b,T,h);v.type=ci,v.needsUpdate=!0;const R=S*4;for(let I=0;I<h;I++){const O=d[I],$=x[I],ee=M[I],D=b*T*4*I;for(let G=0;G<O.count;G++){const L=G*R;_===!0&&(r.fromBufferAttribute(O,G),A[D+L+0]=r.x,A[D+L+1]=r.y,A[D+L+2]=r.z,A[D+L+3]=0),E===!0&&(r.fromBufferAttribute($,G),A[D+L+4]=r.x,A[D+L+5]=r.y,A[D+L+6]=r.z,A[D+L+7]=0),g===!0&&(r.fromBufferAttribute(ee,G),A[D+L+8]=r.x,A[D+L+9]=r.y,A[D+L+10]=r.z,A[D+L+11]=ee.itemSize===4?r.w:1)}}u={count:h,texture:v,size:new $e(b,T)},i.set(s,u),s.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let _=0;for(let g=0;g<c.length;g++)_+=c[g];const E=s.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",E),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:a}}function Eb(t,e,n,i,r){let a=new WeakMap;function o(c){const p=r.render.frame,h=c.geometry,u=e.get(c,h);if(a.get(u)!==p&&(e.update(u),a.set(u,p)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==p&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),a.set(c,p))),c.isSkinnedMesh){const m=c.skeleton;a.get(m)!==p&&(m.update(),a.set(m,p))}return u}function s(){a=new WeakMap}function l(c){const p=c.target;p.removeEventListener("dispose",l),i.releaseStatesOfObject(p),n.remove(p.instanceMatrix),p.instanceColor!==null&&n.remove(p.instanceColor)}return{update:o,dispose:s}}const Tb={[nv]:"LINEAR_TONE_MAPPING",[iv]:"REINHARD_TONE_MAPPING",[rv]:"CINEON_TONE_MAPPING",[av]:"ACES_FILMIC_TONE_MAPPING",[sv]:"AGX_TONE_MAPPING",[lv]:"NEUTRAL_TONE_MAPPING",[ov]:"CUSTOM_TONE_MAPPING"};function bb(t,e,n,i,r,a){const o=new hi(e,n,{type:t,depthBuffer:r,stencilBuffer:a,samples:i?4:0,depthTexture:r?new $a(e,n):void 0}),s=new hi(e,n,{type:zi,depthBuffer:!1,stencilBuffer:!1}),l=new zn;l.setAttribute("position",new tn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new tn([0,2,0,0,2,0],2));const c=new hM({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new Lt(l,c),h=new jp(-1,1,1,-1,0,1);let u=null,m=null,_=!1,E,g=null,d=[],x=!1;this.setSize=function(M,S){o.setSize(M,S),s.setSize(M,S);for(let b=0;b<d.length;b++){const T=d[b];T.setSize&&T.setSize(M,S)}},this.setEffects=function(M){d=M,x=d.length>0&&d[0].isRenderPass===!0;const S=o.width,b=o.height;for(let T=0;T<d.length;T++){const A=d[T];A.setSize&&A.setSize(S,b)}},this.begin=function(M,S){if(_||M.toneMapping===pi&&d.length===0)return!1;if(g=S,S!==null){const b=S.width,T=S.height;(o.width!==b||o.height!==T)&&this.setSize(b,T)}return x===!1&&M.setRenderTarget(o),E=M.toneMapping,M.toneMapping=pi,!0},this.hasRenderPass=function(){return x},this.end=function(M,S){M.toneMapping=E,_=!0;let b=o,T=s;for(let A=0;A<d.length;A++){const v=d[A];if(v.enabled!==!1&&(v.render(M,T,b,S),v.needsSwap!==!1)){const R=b;b=T,T=R}}if(u!==M.outputColorSpace||m!==M.toneMapping){u=M.outputColorSpace,m=M.toneMapping,c.defines={},qe.getTransfer(u)===nt&&(c.defines.SRGB_TRANSFER="");const A=Tb[m];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=b.texture,M.setRenderTarget(g),M.render(p,h),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),l.dispose(),c.dispose()}}const Lv=new en,Of=new $a(1,1),Nv=new vv,Fv=new HS,Uv=new bv,o0=[],s0=[],l0=new Float32Array(16),c0=new Float32Array(9),u0=new Float32Array(4);function no(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let a=o0[r];if(a===void 0&&(a=new Float32Array(r),o0[r]=a),e!==0){i.toArray(a,0);for(let o=1,s=0;o!==e;++o)s+=n,t[o].toArray(a,s)}return a}function Ot(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function zt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Lc(t,e){let n=s0[e];n===void 0&&(n=new Int32Array(e),s0[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Cb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Ab(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2fv(this.addr,e),zt(n,e)}}function Rb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ot(n,e))return;t.uniform3fv(this.addr,e),zt(n,e)}}function wb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4fv(this.addr,e),zt(n,e)}}function Pb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),zt(n,e)}else{if(Ot(n,i))return;u0.set(i),t.uniformMatrix2fv(this.addr,!1,u0),zt(n,i)}}function Ib(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),zt(n,e)}else{if(Ot(n,i))return;c0.set(i),t.uniformMatrix3fv(this.addr,!1,c0),zt(n,i)}}function Db(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),zt(n,e)}else{if(Ot(n,i))return;l0.set(i),t.uniformMatrix4fv(this.addr,!1,l0),zt(n,i)}}function Lb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Nb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2iv(this.addr,e),zt(n,e)}}function Fb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3iv(this.addr,e),zt(n,e)}}function Ub(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4iv(this.addr,e),zt(n,e)}}function Ob(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function zb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2uiv(this.addr,e),zt(n,e)}}function kb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3uiv(this.addr,e),zt(n,e)}}function Bb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4uiv(this.addr,e),zt(n,e)}}function Vb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let a;this.type===t.SAMPLER_2D_SHADOW?(Of.compareFunction=n.isReversedDepthBuffer()?Vp:Bp,a=Of):a=Lv,n.setTexture2D(e||a,r)}function Hb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Fv,r)}function Gb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Uv,r)}function Wb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Nv,r)}function jb(t){switch(t){case 5126:return Cb;case 35664:return Ab;case 35665:return Rb;case 35666:return wb;case 35674:return Pb;case 35675:return Ib;case 35676:return Db;case 5124:case 35670:return Lb;case 35667:case 35671:return Nb;case 35668:case 35672:return Fb;case 35669:case 35673:return Ub;case 5125:return Ob;case 36294:return zb;case 36295:return kb;case 36296:return Bb;case 35678:case 36198:case 36298:case 36306:case 35682:return Vb;case 35679:case 36299:case 36307:return Hb;case 35680:case 36300:case 36308:case 36293:return Gb;case 36289:case 36303:case 36311:case 36292:return Wb}}function Xb(t,e){t.uniform1fv(this.addr,e)}function qb(t,e){const n=no(e,this.size,2);t.uniform2fv(this.addr,n)}function Yb(t,e){const n=no(e,this.size,3);t.uniform3fv(this.addr,n)}function $b(t,e){const n=no(e,this.size,4);t.uniform4fv(this.addr,n)}function Kb(t,e){const n=no(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function Zb(t,e){const n=no(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function Qb(t,e){const n=no(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function Jb(t,e){t.uniform1iv(this.addr,e)}function eC(t,e){t.uniform2iv(this.addr,e)}function tC(t,e){t.uniform3iv(this.addr,e)}function nC(t,e){t.uniform4iv(this.addr,e)}function iC(t,e){t.uniform1uiv(this.addr,e)}function rC(t,e){t.uniform2uiv(this.addr,e)}function aC(t,e){t.uniform3uiv(this.addr,e)}function oC(t,e){t.uniform4uiv(this.addr,e)}function sC(t,e,n){const i=this.cache,r=e.length,a=Lc(n,r);Ot(i,a)||(t.uniform1iv(this.addr,a),zt(i,a));let o;this.type===t.SAMPLER_2D_SHADOW?o=Of:o=Lv;for(let s=0;s!==r;++s)n.setTexture2D(e[s]||o,a[s])}function lC(t,e,n){const i=this.cache,r=e.length,a=Lc(n,r);Ot(i,a)||(t.uniform1iv(this.addr,a),zt(i,a));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Fv,a[o])}function cC(t,e,n){const i=this.cache,r=e.length,a=Lc(n,r);Ot(i,a)||(t.uniform1iv(this.addr,a),zt(i,a));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Uv,a[o])}function uC(t,e,n){const i=this.cache,r=e.length,a=Lc(n,r);Ot(i,a)||(t.uniform1iv(this.addr,a),zt(i,a));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Nv,a[o])}function dC(t){switch(t){case 5126:return Xb;case 35664:return qb;case 35665:return Yb;case 35666:return $b;case 35674:return Kb;case 35675:return Zb;case 35676:return Qb;case 5124:case 35670:return Jb;case 35667:case 35671:return eC;case 35668:case 35672:return tC;case 35669:case 35673:return nC;case 5125:return iC;case 36294:return rC;case 36295:return aC;case 36296:return oC;case 35678:case 36198:case 36298:case 36306:case 35682:return sC;case 35679:case 36299:case 36307:return lC;case 35680:case 36300:case 36308:case 36293:return cC;case 36289:case 36303:case 36311:case 36292:return uC}}class fC{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=jb(n.type)}}class pC{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=dC(n.type)}}class hC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const s=r[a];s.setValue(e,n[s.id],i)}}}const Xu=/(\w+)(\])?(\[|\.)?/g;function d0(t,e){t.seq.push(e),t.map[e.id]=e}function mC(t,e,n){const i=t.name,r=i.length;for(Xu.lastIndex=0;;){const a=Xu.exec(i),o=Xu.lastIndex;let s=a[1];const l=a[2]==="]",c=a[3];if(l&&(s=s|0),c===void 0||c==="["&&o+2===r){d0(n,c===void 0?new fC(s,t,e):new pC(s,t,e));break}else{let h=n.map[s];h===void 0&&(h=new hC(s),d0(n,h)),n=h}}}class Nl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const s=e.getActiveUniform(n,o),l=e.getUniformLocation(n,s.name);mC(s,l,this)}const r=[],a=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):a.push(o);r.length>0&&(this.seq=r.concat(a))}setValue(e,n,i,r){const a=this.map[n];a!==void 0&&a.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let a=0,o=n.length;a!==o;++a){const s=n[a],l=i[s.id];l.needsUpdate!==!1&&s.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,a=e.length;r!==a;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function f0(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const gC=37297;let xC=0;function vC(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,n.length);for(let o=r;o<a;o++){const s=o+1;i.push(`${s===e?">":" "} ${s}: ${n[o]}`)}return i.join(`
`)}const p0=new ze;function _C(t){qe._getMatrix(p0,qe.workingColorSpace,t);const e=`mat3( ${p0.elements.map(n=>n.toFixed(4))} )`;switch(qe.getTransfer(t)){case lc:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function h0(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),a=(t.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const s=parseInt(o[1]);return n.toUpperCase()+`

`+a+`

`+vC(t.getShaderSource(e),s)}else return a}function yC(t,e){const n=_C(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const SC={[nv]:"Linear",[iv]:"Reinhard",[rv]:"Cineon",[av]:"ACESFilmic",[sv]:"AgX",[lv]:"Neutral",[ov]:"Custom"};function MC(t,e){const n=SC[e];return n===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const ul=new H;function EC(){qe.getLuminanceCoefficients(ul);const t=ul.x.toFixed(4),e=ul.y.toFixed(4),n=ul.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function TC(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lo).join(`
`)}function bC(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function CC(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=t.getActiveAttrib(e,r),o=a.name;let s=1;a.type===t.FLOAT_MAT2&&(s=2),a.type===t.FLOAT_MAT3&&(s=3),a.type===t.FLOAT_MAT4&&(s=4),n[o]={type:a.type,location:t.getAttribLocation(e,o),locationSize:s}}return n}function Lo(t){return t!==""}function m0(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function g0(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const AC=/^[ \t]*#include +<([\w\d./]+)>/gm;function zf(t){return t.replace(AC,wC)}const RC=new Map;function wC(t,e){let n=Ve[e];if(n===void 0){const i=RC.get(e);if(i!==void 0)n=Ve[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return zf(n)}const PC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function x0(t){return t.replace(PC,IC)}function IC(t,e,n,i){let r="";for(let a=parseInt(e);a<parseInt(n);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function v0(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const DC={[wl]:"SHADOWMAP_TYPE_PCF",[Do]:"SHADOWMAP_TYPE_VSM"};function LC(t){return DC[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const NC={[Wr]:"ENVMAP_TYPE_CUBE",[Ya]:"ENVMAP_TYPE_CUBE",[Pc]:"ENVMAP_TYPE_CUBE_UV"};function FC(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":NC[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const UC={[Ya]:"ENVMAP_MODE_REFRACTION"};function OC(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":UC[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const zC={[tv]:"ENVMAP_BLENDING_MULTIPLY",[SS]:"ENVMAP_BLENDING_MIX",[MS]:"ENVMAP_BLENDING_ADD"};function kC(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":zC[t.combine]||"ENVMAP_BLENDING_NONE"}function BC(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function VC(t,e,n,i){const r=t.getContext(),a=n.defines;let o=n.vertexShader,s=n.fragmentShader;const l=LC(n),c=FC(n),p=OC(n),h=kC(n),u=BC(n),m=TC(n),_=bC(a),E=r.createProgram();let g,d,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Lo).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Lo).join(`
`),d.length>0&&(d+=`
`)):(g=[v0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lo).join(`
`),d=[v0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+p:"",n.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==pi?"#define TONE_MAPPING":"",n.toneMapping!==pi?Ve.tonemapping_pars_fragment:"",n.toneMapping!==pi?MC("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,yC("linearToOutputTexel",n.outputColorSpace),EC(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Lo).join(`
`)),o=zf(o),o=m0(o,n),o=g0(o,n),s=zf(s),s=m0(s,n),s=g0(s,n),o=x0(o),s=x0(s),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",n.glslVersion===bm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===bm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=x+g+o,S=x+d+s,b=f0(r,r.VERTEX_SHADER,M),T=f0(r,r.FRAGMENT_SHADER,S);r.attachShader(E,b),r.attachShader(E,T),n.index0AttributeName!==void 0?r.bindAttribLocation(E,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function A(I){if(t.debug.checkShaderErrors){const O=r.getProgramInfoLog(E)||"",$=r.getShaderInfoLog(b)||"",ee=r.getShaderInfoLog(T)||"",D=O.trim(),G=$.trim(),L=ee.trim();let U=!0,V=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(U=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,E,b,T);else{const N=h0(r,b,"vertex"),X=h0(r,T,"fragment");Qe("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+D+`
`+N+`
`+X)}else D!==""?Fe("WebGLProgram: Program Info Log:",D):(G===""||L==="")&&(V=!1);V&&(I.diagnostics={runnable:U,programLog:D,vertexShader:{log:G,prefix:g},fragmentShader:{log:L,prefix:d}})}r.deleteShader(b),r.deleteShader(T),v=new Nl(r,E),R=CC(r,E)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let R;this.getAttributes=function(){return R===void 0&&A(this),R};let P=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(E,gC)),P},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=xC++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=b,this.fragmentShader=T,this}let HC=0;class GC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new WC(e),n.set(e,i)),i}}class WC{constructor(e){this.id=HC++,this.code=e,this.usedTimes=0}}function jC(t){return t===jr||t===ac||t===oc}function XC(t,e,n,i,r,a){const o=new _v,s=new GC,l=new Set,c=[],p=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function E(v,R,P,I,O,$){const ee=I.fog,D=O.geometry,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,L=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,U=e.get(v.envMap||G,L),V=U&&U.mapping===Pc?U.image.height:null,N=m[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Fe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const X=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,Z=X!==void 0?X.length:0;let ce=0;D.morphAttributes.position!==void 0&&(ce=1),D.morphAttributes.normal!==void 0&&(ce=2),D.morphAttributes.color!==void 0&&(ce=3);let De,Ie,K,re;if(N){const Ee=si[N];De=Ee.vertexShader,Ie=Ee.fragmentShader}else{De=v.vertexShader,Ie=v.fragmentShader;const Ee=s.getVertexShaderStage(v),Mt=s.getFragmentShaderStage(v);s.update(v,Ee,Mt),K=Ee.id,re=Mt.id}const oe=t.getRenderTarget(),Ue=t.state.buffers.depth.getReversed(),Oe=O.isInstancedMesh===!0,Le=O.isBatchedMesh===!0,ht=!!v.map,He=!!v.matcap,tt=!!U,Ke=!!v.aoMap,Xe=!!v.lightMap,yt=!!v.bumpMap&&v.wireframe===!1,bt=!!v.normalMap,Ct=!!v.displacementMap,It=!!v.emissiveMap,ft=!!v.metalnessMap,St=!!v.roughnessMap,z=v.anisotropy>0,At=v.clearcoat>0,et=v.dispersion>0,w=v.iridescence>0,y=v.sheen>0,B=v.transmission>0,q=z&&!!v.anisotropyMap,Q=At&&!!v.clearcoatMap,le=At&&!!v.clearcoatNormalMap,fe=At&&!!v.clearcoatRoughnessMap,J=w&&!!v.iridescenceMap,te=w&&!!v.iridescenceThicknessMap,he=y&&!!v.sheenColorMap,Te=y&&!!v.sheenRoughnessMap,de=!!v.specularMap,ae=!!v.specularColorMap,be=!!v.specularIntensityMap,Ne=B&&!!v.transmissionMap,ke=B&&!!v.thicknessMap,F=!!v.gradientMap,pe=!!v.alphaMap,ne=v.alphaTest>0,me=!!v.alphaHash,_e=!!v.extensions;let ie=pi;v.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(ie=t.toneMapping);const Ae={shaderID:N,shaderType:v.type,shaderName:v.name,vertexShader:De,fragmentShader:Ie,defines:v.defines,customVertexShaderID:K,customFragmentShaderID:re,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Le,batchingColor:Le&&O._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&O.instanceColor!==null,instancingMorph:Oe&&O.morphTexture!==null,outputColorSpace:oe===null?t.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:qe.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:ht,matcap:He,envMap:tt,envMapMode:tt&&U.mapping,envMapCubeUVHeight:V,aoMap:Ke,lightMap:Xe,bumpMap:yt,normalMap:bt,displacementMap:Ct,emissiveMap:It,normalMapObjectSpace:bt&&v.normalMapType===bS,normalMapTangentSpace:bt&&v.normalMapType===Ff,packedNormalMap:bt&&v.normalMapType===Ff&&jC(v.normalMap.format),metalnessMap:ft,roughnessMap:St,anisotropy:z,anisotropyMap:q,clearcoat:At,clearcoatMap:Q,clearcoatNormalMap:le,clearcoatRoughnessMap:fe,dispersion:et,iridescence:w,iridescenceMap:J,iridescenceThicknessMap:te,sheen:y,sheenColorMap:he,sheenRoughnessMap:Te,specularMap:de,specularColorMap:ae,specularIntensityMap:be,transmission:B,transmissionMap:Ne,thicknessMap:ke,gradientMap:F,opaque:v.transparent===!1&&v.blending===Oa&&v.alphaToCoverage===!1,alphaMap:pe,alphaTest:ne,alphaHash:me,combine:v.combine,mapUv:ht&&_(v.map.channel),aoMapUv:Ke&&_(v.aoMap.channel),lightMapUv:Xe&&_(v.lightMap.channel),bumpMapUv:yt&&_(v.bumpMap.channel),normalMapUv:bt&&_(v.normalMap.channel),displacementMapUv:Ct&&_(v.displacementMap.channel),emissiveMapUv:It&&_(v.emissiveMap.channel),metalnessMapUv:ft&&_(v.metalnessMap.channel),roughnessMapUv:St&&_(v.roughnessMap.channel),anisotropyMapUv:q&&_(v.anisotropyMap.channel),clearcoatMapUv:Q&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:le&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:te&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:he&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Te&&_(v.sheenRoughnessMap.channel),specularMapUv:de&&_(v.specularMap.channel),specularColorMapUv:ae&&_(v.specularColorMap.channel),specularIntensityMapUv:be&&_(v.specularIntensityMap.channel),transmissionMapUv:Ne&&_(v.transmissionMap.channel),thicknessMapUv:ke&&_(v.thicknessMap.channel),alphaMapUv:pe&&_(v.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(bt||z),vertexNormals:!!D.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!D.attributes.uv&&(ht||pe),fog:!!ee,useFog:v.fog===!0,fogExp2:!!ee&&ee.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||D.attributes.normal===void 0&&bt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ue,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:ce,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&P.length>0,shadowMapType:t.shadowMap.type,toneMapping:ie,decodeVideoTexture:ht&&v.map.isVideoTexture===!0&&qe.getTransfer(v.map.colorSpace)===nt,decodeVideoTextureEmissive:It&&v.emissiveMap.isVideoTexture===!0&&qe.getTransfer(v.emissiveMap.colorSpace)===nt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===bi,flipSided:v.side===mn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:_e&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&v.extensions.multiDraw===!0||Le)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ae.vertexUv1s=l.has(1),Ae.vertexUv2s=l.has(2),Ae.vertexUv3s=l.has(3),l.clear(),Ae}function g(v){const R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.customVertexShaderID),R.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)R.push(P),R.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(d(R,v),x(R,v),R.push(t.outputColorSpace)),R.push(v.customProgramCacheKey),R.join()}function d(v,R){v.push(R.precision),v.push(R.outputColorSpace),v.push(R.envMapMode),v.push(R.envMapCubeUVHeight),v.push(R.mapUv),v.push(R.alphaMapUv),v.push(R.lightMapUv),v.push(R.aoMapUv),v.push(R.bumpMapUv),v.push(R.normalMapUv),v.push(R.displacementMapUv),v.push(R.emissiveMapUv),v.push(R.metalnessMapUv),v.push(R.roughnessMapUv),v.push(R.anisotropyMapUv),v.push(R.clearcoatMapUv),v.push(R.clearcoatNormalMapUv),v.push(R.clearcoatRoughnessMapUv),v.push(R.iridescenceMapUv),v.push(R.iridescenceThicknessMapUv),v.push(R.sheenColorMapUv),v.push(R.sheenRoughnessMapUv),v.push(R.specularMapUv),v.push(R.specularColorMapUv),v.push(R.specularIntensityMapUv),v.push(R.transmissionMapUv),v.push(R.thicknessMapUv),v.push(R.combine),v.push(R.fogExp2),v.push(R.sizeAttenuation),v.push(R.morphTargetsCount),v.push(R.morphAttributeCount),v.push(R.numDirLights),v.push(R.numPointLights),v.push(R.numSpotLights),v.push(R.numSpotLightMaps),v.push(R.numHemiLights),v.push(R.numRectAreaLights),v.push(R.numDirLightShadows),v.push(R.numPointLightShadows),v.push(R.numSpotLightShadows),v.push(R.numSpotLightShadowsWithMaps),v.push(R.numLightProbes),v.push(R.shadowMapType),v.push(R.toneMapping),v.push(R.numClippingPlanes),v.push(R.numClipIntersection),v.push(R.depthPacking)}function x(v,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function M(v){const R=m[v.type];let P;if(R){const I=si[R];P=dM.clone(I.uniforms)}else P=v.uniforms;return P}function S(v,R){let P=p.get(R);return P!==void 0?++P.usedTimes:(P=new VC(t,R,v,r),c.push(P),p.set(R,P)),P}function b(v){if(--v.usedTimes===0){const R=c.indexOf(v);c[R]=c[c.length-1],c.pop(),p.delete(v.cacheKey),v.destroy()}}function T(v){s.remove(v)}function A(){s.dispose()}return{getParameters:E,getProgramCacheKey:g,getUniforms:M,acquireProgram:S,releaseProgram:b,releaseShaderCache:T,programs:c,dispose:A}}function qC(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let s=t.get(o);return s===void 0&&(s={},t.set(o,s)),s}function i(o){t.delete(o)}function r(o,s,l){t.get(o)[s]=l}function a(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:a}}function YC(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function _0(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function y0(){const t=[];let e=0;const n=[],i=[],r=[];function a(){e=0,n.length=0,i.length=0,r.length=0}function o(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function s(u,m,_,E,g,d){let x=t[e];return x===void 0?(x={id:u.id,object:u,geometry:m,material:_,materialVariant:o(u),groupOrder:E,renderOrder:u.renderOrder,z:g,group:d},t[e]=x):(x.id=u.id,x.object=u,x.geometry=m,x.material=_,x.materialVariant=o(u),x.groupOrder=E,x.renderOrder=u.renderOrder,x.z=g,x.group=d),e++,x}function l(u,m,_,E,g,d){const x=s(u,m,_,E,g,d);_.transmission>0?i.push(x):_.transparent===!0?r.push(x):n.push(x)}function c(u,m,_,E,g,d){const x=s(u,m,_,E,g,d);_.transmission>0?i.unshift(x):_.transparent===!0?r.unshift(x):n.unshift(x)}function p(u,m,_){n.length>1&&n.sort(u||YC),i.length>1&&i.sort(m||_0),r.length>1&&r.sort(m||_0),_&&(n.reverse(),i.reverse(),r.reverse())}function h(){for(let u=e,m=t.length;u<m;u++){const _=t[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:r,init:a,push:l,unshift:c,finish:h,sort:p}}function $C(){let t=new WeakMap;function e(i,r){const a=t.get(i);let o;return a===void 0?(o=new y0,t.set(i,[o])):r>=a.length?(o=new y0,a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function KC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new H,color:new We};break;case"SpotLight":n={position:new H,direction:new H,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new H,color:new We,distance:0,decay:0};break;case"HemisphereLight":n={direction:new H,skyColor:new We,groundColor:new We};break;case"RectAreaLight":n={color:new We,position:new H,halfWidth:new H,halfHeight:new H};break}return t[e.id]=n,n}}}function ZC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let QC=0;function JC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function eA(t){const e=new KC,n=ZC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new H);const r=new H,a=new vt,o=new vt;function s(c){let p=0,h=0,u=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let m=0,_=0,E=0,g=0,d=0,x=0,M=0,S=0,b=0,T=0,A=0;c.sort(JC);for(let R=0,P=c.length;R<P;R++){const I=c[R],O=I.color,$=I.intensity,ee=I.distance;let D=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===jr?D=I.shadow.map.texture:D=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)p+=O.r*$,h+=O.g*$,u+=O.b*$;else if(I.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(I.sh.coefficients[G],$);A++}else if(I.isDirectionalLight){const G=e.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const L=I.shadow,U=n.get(I);U.shadowIntensity=L.intensity,U.shadowBias=L.bias,U.shadowNormalBias=L.normalBias,U.shadowRadius=L.radius,U.shadowMapSize=L.mapSize,i.directionalShadow[m]=U,i.directionalShadowMap[m]=D,i.directionalShadowMatrix[m]=I.shadow.matrix,x++}i.directional[m]=G,m++}else if(I.isSpotLight){const G=e.get(I);G.position.setFromMatrixPosition(I.matrixWorld),G.color.copy(O).multiplyScalar($),G.distance=ee,G.coneCos=Math.cos(I.angle),G.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),G.decay=I.decay,i.spot[E]=G;const L=I.shadow;if(I.map&&(i.spotLightMap[b]=I.map,b++,L.updateMatrices(I),I.castShadow&&T++),i.spotLightMatrix[E]=L.matrix,I.castShadow){const U=n.get(I);U.shadowIntensity=L.intensity,U.shadowBias=L.bias,U.shadowNormalBias=L.normalBias,U.shadowRadius=L.radius,U.shadowMapSize=L.mapSize,i.spotShadow[E]=U,i.spotShadowMap[E]=D,S++}E++}else if(I.isRectAreaLight){const G=e.get(I);G.color.copy(O).multiplyScalar($),G.halfWidth.set(I.width*.5,0,0),G.halfHeight.set(0,I.height*.5,0),i.rectArea[g]=G,g++}else if(I.isPointLight){const G=e.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),G.distance=I.distance,G.decay=I.decay,I.castShadow){const L=I.shadow,U=n.get(I);U.shadowIntensity=L.intensity,U.shadowBias=L.bias,U.shadowNormalBias=L.normalBias,U.shadowRadius=L.radius,U.shadowMapSize=L.mapSize,U.shadowCameraNear=L.camera.near,U.shadowCameraFar=L.camera.far,i.pointShadow[_]=U,i.pointShadowMap[_]=D,i.pointShadowMatrix[_]=I.shadow.matrix,M++}i.point[_]=G,_++}else if(I.isHemisphereLight){const G=e.get(I);G.skyColor.copy(I.color).multiplyScalar($),G.groundColor.copy(I.groundColor).multiplyScalar($),i.hemi[d]=G,d++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=p,i.ambient[1]=h,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==m||v.pointLength!==_||v.spotLength!==E||v.rectAreaLength!==g||v.hemiLength!==d||v.numDirectionalShadows!==x||v.numPointShadows!==M||v.numSpotShadows!==S||v.numSpotMaps!==b||v.numLightProbes!==A)&&(i.directional.length=m,i.spot.length=E,i.rectArea.length=g,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=S+b-T,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=A,v.directionalLength=m,v.pointLength=_,v.spotLength=E,v.rectAreaLength=g,v.hemiLength=d,v.numDirectionalShadows=x,v.numPointShadows=M,v.numSpotShadows=S,v.numSpotMaps=b,v.numLightProbes=A,i.version=QC++)}function l(c,p){let h=0,u=0,m=0,_=0,E=0;const g=p.matrixWorldInverse;for(let d=0,x=c.length;d<x;d++){const M=c[d];if(M.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),h++}else if(M.isSpotLight){const S=i.spot[m];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),m++}else if(M.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(g),o.identity(),a.copy(M.matrixWorld),a.premultiply(g),o.extractRotation(a),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const S=i.point[u];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(g),u++}else if(M.isHemisphereLight){const S=i.hemi[E];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(g),E++}}}return{setup:s,setupView:l,state:i}}function S0(t){const e=new eA(t),n=[],i=[],r=[];function a(u){h.camera=u,n.length=0,i.length=0,r.length=0}function o(u){n.push(u)}function s(u){i.push(u)}function l(u){r.push(u)}function c(){e.setup(n)}function p(u){e.setupView(n,u)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:h,setupLights:c,setupLightsView:p,pushLight:o,pushShadow:s,pushLightProbeGrid:l}}function tA(t){let e=new WeakMap;function n(r,a=0){const o=e.get(r);let s;return o===void 0?(s=new S0(t),e.set(r,[s])):a>=o.length?(s=new S0(t),o.push(s)):s=o[a],s}function i(){e=new WeakMap}return{get:n,dispose:i}}const nA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iA=`uniform sampler2D shadow_pass;
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
}`,rA=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],aA=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],M0=new vt,yo=new H,qu=new H;function oA(t,e,n){let i=new Wp;const r=new $e,a=new $e,o=new gt,s=new mM,l=new gM,c={},p=n.maxTextureSize,h={[Oi]:mn,[mn]:Oi,[bi]:bi},u=new xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:nA,fragmentShader:iA}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const _=new zn;_.setAttribute("position",new mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Lt(_,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wl;let d=this.type;this.render=function(T,A,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===nS&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=wl);const R=t.getRenderTarget(),P=t.getActiveCubeFace(),I=t.getActiveMipmapLevel(),O=t.state;O.setBlending(Ii),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const $=d!==this.type;$&&A.traverse(function(ee){ee.material&&(Array.isArray(ee.material)?ee.material.forEach(D=>D.needsUpdate=!0):ee.material.needsUpdate=!0)});for(let ee=0,D=T.length;ee<D;ee++){const G=T[ee],L=G.shadow;if(L===void 0){Fe("WebGLShadowMap:",G,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;r.copy(L.mapSize);const U=L.getFrameExtents();r.multiply(U),a.copy(L.mapSize),(r.x>p||r.y>p)&&(r.x>p&&(a.x=Math.floor(p/U.x),r.x=a.x*U.x,L.mapSize.x=a.x),r.y>p&&(a.y=Math.floor(p/U.y),r.y=a.y*U.y,L.mapSize.y=a.y));const V=t.state.buffers.depth.getReversed();if(L.camera._reversedDepth=V,L.map===null||$===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===Do){if(G.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new hi(r.x,r.y,{format:jr,type:zi,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),L.map.texture.name=G.name+".shadowMap",L.map.depthTexture=new $a(r.x,r.y,ci),L.map.depthTexture.name=G.name+".shadowMapDepth",L.map.depthTexture.format=ki,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Wt,L.map.depthTexture.magFilter=Wt}else G.isPointLight?(L.map=new Dv(r.x),L.map.depthTexture=new cM(r.x,gi)):(L.map=new hi(r.x,r.y),L.map.depthTexture=new $a(r.x,r.y,gi)),L.map.depthTexture.name=G.name+".shadowMap",L.map.depthTexture.format=ki,this.type===wl?(L.map.depthTexture.compareFunction=V?Vp:Bp,L.map.depthTexture.minFilter=Vt,L.map.depthTexture.magFilter=Vt):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Wt,L.map.depthTexture.magFilter=Wt);L.camera.updateProjectionMatrix()}const N=L.map.isWebGLCubeRenderTarget?6:1;for(let X=0;X<N;X++){if(L.map.isWebGLCubeRenderTarget)t.setRenderTarget(L.map,X),t.clear();else{X===0&&(t.setRenderTarget(L.map),t.clear());const Z=L.getViewport(X);o.set(a.x*Z.x,a.y*Z.y,a.x*Z.z,a.y*Z.w),O.viewport(o)}if(G.isPointLight){const Z=L.camera,ce=L.matrix,De=G.distance||Z.far;De!==Z.far&&(Z.far=De,Z.updateProjectionMatrix()),yo.setFromMatrixPosition(G.matrixWorld),Z.position.copy(yo),qu.copy(Z.position),qu.add(rA[X]),Z.up.copy(aA[X]),Z.lookAt(qu),Z.updateMatrixWorld(),ce.makeTranslation(-yo.x,-yo.y,-yo.z),M0.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),L._frustum.setFromProjectionMatrix(M0,Z.coordinateSystem,Z.reversedDepth)}else L.updateMatrices(G);i=L.getFrustum(),S(A,v,L.camera,G,this.type)}L.isPointLightShadow!==!0&&this.type===Do&&x(L,v),L.needsUpdate=!1}d=this.type,g.needsUpdate=!1,t.setRenderTarget(R,P,I)};function x(T,A){const v=e.update(E);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new hi(r.x,r.y,{format:jr,type:zi})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,t.setRenderTarget(T.mapPass),t.clear(),t.renderBufferDirect(A,null,v,u,E,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,t.setRenderTarget(T.map),t.clear(),t.renderBufferDirect(A,null,v,m,E,null)}function M(T,A,v,R){let P=null;const I=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)P=I;else if(P=v.isPointLight===!0?l:s,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const O=P.uuid,$=A.uuid;let ee=c[O];ee===void 0&&(ee={},c[O]=ee);let D=ee[$];D===void 0&&(D=P.clone(),ee[$]=D,A.addEventListener("dispose",b)),P=D}if(P.visible=A.visible,P.wireframe=A.wireframe,R===Do?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:h[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const O=t.properties.get(P);O.light=v}return P}function S(T,A,v,R,P){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&P===Do)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);const $=e.update(T),ee=T.material;if(Array.isArray(ee)){const D=$.groups;for(let G=0,L=D.length;G<L;G++){const U=D[G],V=ee[U.materialIndex];if(V&&V.visible){const N=M(T,V,R,P);T.onBeforeShadow(t,T,A,v,$,N,U),t.renderBufferDirect(v,null,$,N,T,U),T.onAfterShadow(t,T,A,v,$,N,U)}}}else if(ee.visible){const D=M(T,ee,R,P);T.onBeforeShadow(t,T,A,v,$,D,null),t.renderBufferDirect(v,null,$,D,T,null),T.onAfterShadow(t,T,A,v,$,D,null)}}const O=T.children;for(let $=0,ee=O.length;$<ee;$++)S(O[$],A,v,R,P)}function b(T){T.target.removeEventListener("dispose",b);for(const v in c){const R=c[v],P=T.target.uuid;P in R&&(R[P].dispose(),delete R[P])}}}function sA(t,e){function n(){let F=!1;const pe=new gt;let ne=null;const me=new gt(0,0,0,0);return{setMask:function(_e){ne!==_e&&!F&&(t.colorMask(_e,_e,_e,_e),ne=_e)},setLocked:function(_e){F=_e},setClear:function(_e,ie,Ae,Ee,Mt){Mt===!0&&(_e*=Ee,ie*=Ee,Ae*=Ee),pe.set(_e,ie,Ae,Ee),me.equals(pe)===!1&&(t.clearColor(_e,ie,Ae,Ee),me.copy(pe))},reset:function(){F=!1,ne=null,me.set(-1,0,0,0)}}}function i(){let F=!1,pe=!1,ne=null,me=null,_e=null;return{setReversed:function(ie){if(pe!==ie){const Ae=e.get("EXT_clip_control");ie?Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.ZERO_TO_ONE_EXT):Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.NEGATIVE_ONE_TO_ONE_EXT),pe=ie;const Ee=_e;_e=null,this.setClear(Ee)}},getReversed:function(){return pe},setTest:function(ie){ie?oe(t.DEPTH_TEST):Ue(t.DEPTH_TEST)},setMask:function(ie){ne!==ie&&!F&&(t.depthMask(ie),ne=ie)},setFunc:function(ie){if(pe&&(ie=FS[ie]),me!==ie){switch(ie){case $d:t.depthFunc(t.NEVER);break;case Kd:t.depthFunc(t.ALWAYS);break;case Zd:t.depthFunc(t.LESS);break;case qa:t.depthFunc(t.LEQUAL);break;case Qd:t.depthFunc(t.EQUAL);break;case Jd:t.depthFunc(t.GEQUAL);break;case ef:t.depthFunc(t.GREATER);break;case tf:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}me=ie}},setLocked:function(ie){F=ie},setClear:function(ie){_e!==ie&&(_e=ie,pe&&(ie=1-ie),t.clearDepth(ie))},reset:function(){F=!1,ne=null,me=null,_e=null,pe=!1}}}function r(){let F=!1,pe=null,ne=null,me=null,_e=null,ie=null,Ae=null,Ee=null,Mt=null;return{setTest:function(st){F||(st?oe(t.STENCIL_TEST):Ue(t.STENCIL_TEST))},setMask:function(st){pe!==st&&!F&&(t.stencilMask(st),pe=st)},setFunc:function(st,Qn,Jn){(ne!==st||me!==Qn||_e!==Jn)&&(t.stencilFunc(st,Qn,Jn),ne=st,me=Qn,_e=Jn)},setOp:function(st,Qn,Jn){(ie!==st||Ae!==Qn||Ee!==Jn)&&(t.stencilOp(st,Qn,Jn),ie=st,Ae=Qn,Ee=Jn)},setLocked:function(st){F=st},setClear:function(st){Mt!==st&&(t.clearStencil(st),Mt=st)},reset:function(){F=!1,pe=null,ne=null,me=null,_e=null,ie=null,Ae=null,Ee=null,Mt=null}}}const a=new n,o=new i,s=new r,l=new WeakMap,c=new WeakMap;let p={},h={},u={},m=new WeakMap,_=[],E=null,g=!1,d=null,x=null,M=null,S=null,b=null,T=null,A=null,v=new We(0,0,0),R=0,P=!1,I=null,O=null,$=null,ee=null,D=null;const G=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let L=!1,U=0;const V=t.getParameter(t.VERSION);V.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(V)[1]),L=U>=1):V.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),L=U>=2);let N=null,X={};const Z=t.getParameter(t.SCISSOR_BOX),ce=t.getParameter(t.VIEWPORT),De=new gt().fromArray(Z),Ie=new gt().fromArray(ce);function K(F,pe,ne,me){const _e=new Uint8Array(4),ie=t.createTexture();t.bindTexture(F,ie),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ae=0;Ae<ne;Ae++)F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY?t.texImage3D(pe,0,t.RGBA,1,1,me,0,t.RGBA,t.UNSIGNED_BYTE,_e):t.texImage2D(pe+Ae,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,_e);return ie}const re={};re[t.TEXTURE_2D]=K(t.TEXTURE_2D,t.TEXTURE_2D,1),re[t.TEXTURE_CUBE_MAP]=K(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[t.TEXTURE_2D_ARRAY]=K(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),re[t.TEXTURE_3D]=K(t.TEXTURE_3D,t.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),oe(t.DEPTH_TEST),o.setFunc(qa),yt(!1),bt(_m),oe(t.CULL_FACE),Ke(Ii);function oe(F){p[F]!==!0&&(t.enable(F),p[F]=!0)}function Ue(F){p[F]!==!1&&(t.disable(F),p[F]=!1)}function Oe(F,pe){return u[F]!==pe?(t.bindFramebuffer(F,pe),u[F]=pe,F===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=pe),F===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=pe),!0):!1}function Le(F,pe){let ne=_,me=!1;if(F){ne=m.get(pe),ne===void 0&&(ne=[],m.set(pe,ne));const _e=F.textures;if(ne.length!==_e.length||ne[0]!==t.COLOR_ATTACHMENT0){for(let ie=0,Ae=_e.length;ie<Ae;ie++)ne[ie]=t.COLOR_ATTACHMENT0+ie;ne.length=_e.length,me=!0}}else ne[0]!==t.BACK&&(ne[0]=t.BACK,me=!0);me&&t.drawBuffers(ne)}function ht(F){return E!==F?(t.useProgram(F),E=F,!0):!1}const He={[wr]:t.FUNC_ADD,[rS]:t.FUNC_SUBTRACT,[aS]:t.FUNC_REVERSE_SUBTRACT};He[oS]=t.MIN,He[sS]=t.MAX;const tt={[lS]:t.ZERO,[cS]:t.ONE,[uS]:t.SRC_COLOR,[qd]:t.SRC_ALPHA,[gS]:t.SRC_ALPHA_SATURATE,[hS]:t.DST_COLOR,[fS]:t.DST_ALPHA,[dS]:t.ONE_MINUS_SRC_COLOR,[Yd]:t.ONE_MINUS_SRC_ALPHA,[mS]:t.ONE_MINUS_DST_COLOR,[pS]:t.ONE_MINUS_DST_ALPHA,[xS]:t.CONSTANT_COLOR,[vS]:t.ONE_MINUS_CONSTANT_COLOR,[_S]:t.CONSTANT_ALPHA,[yS]:t.ONE_MINUS_CONSTANT_ALPHA};function Ke(F,pe,ne,me,_e,ie,Ae,Ee,Mt,st){if(F===Ii){g===!0&&(Ue(t.BLEND),g=!1);return}if(g===!1&&(oe(t.BLEND),g=!0),F!==iS){if(F!==d||st!==P){if((x!==wr||b!==wr)&&(t.blendEquation(t.FUNC_ADD),x=wr,b=wr),st)switch(F){case Oa:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ym:t.blendFunc(t.ONE,t.ONE);break;case Sm:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Mm:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Qe("WebGLState: Invalid blending: ",F);break}else switch(F){case Oa:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ym:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Sm:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Mm:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",F);break}M=null,S=null,T=null,A=null,v.set(0,0,0),R=0,d=F,P=st}return}_e=_e||pe,ie=ie||ne,Ae=Ae||me,(pe!==x||_e!==b)&&(t.blendEquationSeparate(He[pe],He[_e]),x=pe,b=_e),(ne!==M||me!==S||ie!==T||Ae!==A)&&(t.blendFuncSeparate(tt[ne],tt[me],tt[ie],tt[Ae]),M=ne,S=me,T=ie,A=Ae),(Ee.equals(v)===!1||Mt!==R)&&(t.blendColor(Ee.r,Ee.g,Ee.b,Mt),v.copy(Ee),R=Mt),d=F,P=!1}function Xe(F,pe){F.side===bi?Ue(t.CULL_FACE):oe(t.CULL_FACE);let ne=F.side===mn;pe&&(ne=!ne),yt(ne),F.blending===Oa&&F.transparent===!1?Ke(Ii):Ke(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),a.setMask(F.colorWrite);const me=F.stencilWrite;s.setTest(me),me&&(s.setMask(F.stencilWriteMask),s.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),s.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),It(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?oe(t.SAMPLE_ALPHA_TO_COVERAGE):Ue(t.SAMPLE_ALPHA_TO_COVERAGE)}function yt(F){I!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),I=F)}function bt(F){F!==eS?(oe(t.CULL_FACE),F!==O&&(F===_m?t.cullFace(t.BACK):F===tS?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ue(t.CULL_FACE),O=F}function Ct(F){F!==$&&(L&&t.lineWidth(F),$=F)}function It(F,pe,ne){F?(oe(t.POLYGON_OFFSET_FILL),(ee!==pe||D!==ne)&&(ee=pe,D=ne,o.getReversed()&&(pe=-pe),t.polygonOffset(pe,ne))):Ue(t.POLYGON_OFFSET_FILL)}function ft(F){F?oe(t.SCISSOR_TEST):Ue(t.SCISSOR_TEST)}function St(F){F===void 0&&(F=t.TEXTURE0+G-1),N!==F&&(t.activeTexture(F),N=F)}function z(F,pe,ne){ne===void 0&&(N===null?ne=t.TEXTURE0+G-1:ne=N);let me=X[ne];me===void 0&&(me={type:void 0,texture:void 0},X[ne]=me),(me.type!==F||me.texture!==pe)&&(N!==ne&&(t.activeTexture(ne),N=ne),t.bindTexture(F,pe||re[F]),me.type=F,me.texture=pe)}function At(){const F=X[N];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function et(){try{t.compressedTexImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function w(){try{t.compressedTexImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function y(){try{t.texSubImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function B(){try{t.texSubImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function q(){try{t.compressedTexSubImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function Q(){try{t.compressedTexSubImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function le(){try{t.texStorage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function fe(){try{t.texStorage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function J(){try{t.texImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function te(){try{t.texImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function he(F){return h[F]!==void 0?h[F]:t.getParameter(F)}function Te(F,pe){h[F]!==pe&&(t.pixelStorei(F,pe),h[F]=pe)}function de(F){De.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),De.copy(F))}function ae(F){Ie.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),Ie.copy(F))}function be(F,pe){let ne=c.get(pe);ne===void 0&&(ne=new WeakMap,c.set(pe,ne));let me=ne.get(F);me===void 0&&(me=t.getUniformBlockIndex(pe,F.name),ne.set(F,me))}function Ne(F,pe){const me=c.get(pe).get(F);l.get(pe)!==me&&(t.uniformBlockBinding(pe,me,F.__bindingPointIndex),l.set(pe,me))}function ke(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),p={},h={},N=null,X={},u={},m=new WeakMap,_=[],E=null,g=!1,d=null,x=null,M=null,S=null,b=null,T=null,A=null,v=new We(0,0,0),R=0,P=!1,I=null,O=null,$=null,ee=null,D=null,De.set(0,0,t.canvas.width,t.canvas.height),Ie.set(0,0,t.canvas.width,t.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:oe,disable:Ue,bindFramebuffer:Oe,drawBuffers:Le,useProgram:ht,setBlending:Ke,setMaterial:Xe,setFlipSided:yt,setCullFace:bt,setLineWidth:Ct,setPolygonOffset:It,setScissorTest:ft,activeTexture:St,bindTexture:z,unbindTexture:At,compressedTexImage2D:et,compressedTexImage3D:w,texImage2D:J,texImage3D:te,pixelStorei:Te,getParameter:he,updateUBOMapping:be,uniformBlockBinding:Ne,texStorage2D:le,texStorage3D:fe,texSubImage2D:y,texSubImage3D:B,compressedTexSubImage2D:q,compressedTexSubImage3D:Q,scissor:de,viewport:ae,reset:ke}}function lA(t,e,n,i,r,a,o){const s=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,p=new WeakMap,h=new Set;let u;const m=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(w,y){return _?new OffscreenCanvas(w,y):cc("canvas")}function g(w,y,B){let q=1;const Q=et(w);if((Q.width>B||Q.height>B)&&(q=B/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const le=Math.floor(q*Q.width),fe=Math.floor(q*Q.height);u===void 0&&(u=E(le,fe));const J=y?E(le,fe):u;return J.width=le,J.height=fe,J.getContext("2d").drawImage(w,0,0,le,fe),Fe("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+le+"x"+fe+")."),J}else return"data"in w&&Fe("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function d(w){return w.generateMipmaps}function x(w){t.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?t.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function S(w,y,B,q,Q,le=!1){if(w!==null){if(t[w]!==void 0)return t[w];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let fe;q&&(fe=e.get("EXT_texture_norm16"),fe||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=y;if(y===t.RED&&(B===t.FLOAT&&(J=t.R32F),B===t.HALF_FLOAT&&(J=t.R16F),B===t.UNSIGNED_BYTE&&(J=t.R8),B===t.UNSIGNED_SHORT&&fe&&(J=fe.R16_EXT),B===t.SHORT&&fe&&(J=fe.R16_SNORM_EXT)),y===t.RED_INTEGER&&(B===t.UNSIGNED_BYTE&&(J=t.R8UI),B===t.UNSIGNED_SHORT&&(J=t.R16UI),B===t.UNSIGNED_INT&&(J=t.R32UI),B===t.BYTE&&(J=t.R8I),B===t.SHORT&&(J=t.R16I),B===t.INT&&(J=t.R32I)),y===t.RG&&(B===t.FLOAT&&(J=t.RG32F),B===t.HALF_FLOAT&&(J=t.RG16F),B===t.UNSIGNED_BYTE&&(J=t.RG8),B===t.UNSIGNED_SHORT&&fe&&(J=fe.RG16_EXT),B===t.SHORT&&fe&&(J=fe.RG16_SNORM_EXT)),y===t.RG_INTEGER&&(B===t.UNSIGNED_BYTE&&(J=t.RG8UI),B===t.UNSIGNED_SHORT&&(J=t.RG16UI),B===t.UNSIGNED_INT&&(J=t.RG32UI),B===t.BYTE&&(J=t.RG8I),B===t.SHORT&&(J=t.RG16I),B===t.INT&&(J=t.RG32I)),y===t.RGB_INTEGER&&(B===t.UNSIGNED_BYTE&&(J=t.RGB8UI),B===t.UNSIGNED_SHORT&&(J=t.RGB16UI),B===t.UNSIGNED_INT&&(J=t.RGB32UI),B===t.BYTE&&(J=t.RGB8I),B===t.SHORT&&(J=t.RGB16I),B===t.INT&&(J=t.RGB32I)),y===t.RGBA_INTEGER&&(B===t.UNSIGNED_BYTE&&(J=t.RGBA8UI),B===t.UNSIGNED_SHORT&&(J=t.RGBA16UI),B===t.UNSIGNED_INT&&(J=t.RGBA32UI),B===t.BYTE&&(J=t.RGBA8I),B===t.SHORT&&(J=t.RGBA16I),B===t.INT&&(J=t.RGBA32I)),y===t.RGB&&(B===t.UNSIGNED_SHORT&&fe&&(J=fe.RGB16_EXT),B===t.SHORT&&fe&&(J=fe.RGB16_SNORM_EXT),B===t.UNSIGNED_INT_5_9_9_9_REV&&(J=t.RGB9_E5),B===t.UNSIGNED_INT_10F_11F_11F_REV&&(J=t.R11F_G11F_B10F)),y===t.RGBA){const te=le?lc:qe.getTransfer(Q);B===t.FLOAT&&(J=t.RGBA32F),B===t.HALF_FLOAT&&(J=t.RGBA16F),B===t.UNSIGNED_BYTE&&(J=te===nt?t.SRGB8_ALPHA8:t.RGBA8),B===t.UNSIGNED_SHORT&&fe&&(J=fe.RGBA16_EXT),B===t.SHORT&&fe&&(J=fe.RGBA16_SNORM_EXT),B===t.UNSIGNED_SHORT_4_4_4_4&&(J=t.RGBA4),B===t.UNSIGNED_SHORT_5_5_5_1&&(J=t.RGB5_A1)}return(J===t.R16F||J===t.R32F||J===t.RG16F||J===t.RG32F||J===t.RGBA16F||J===t.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function b(w,y){let B;return w?y===null||y===gi||y===ls?B=t.DEPTH24_STENCIL8:y===ci?B=t.DEPTH32F_STENCIL8:y===ss&&(B=t.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===gi||y===ls?B=t.DEPTH_COMPONENT24:y===ci?B=t.DEPTH_COMPONENT32F:y===ss&&(B=t.DEPTH_COMPONENT16),B}function T(w,y){return d(w)===!0||w.isFramebufferTexture&&w.minFilter!==Wt&&w.minFilter!==Vt?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function A(w){const y=w.target;y.removeEventListener("dispose",A),R(y),y.isVideoTexture&&p.delete(y),y.isHTMLTexture&&h.delete(y)}function v(w){const y=w.target;y.removeEventListener("dispose",v),I(y)}function R(w){const y=i.get(w);if(y.__webglInit===void 0)return;const B=w.source,q=m.get(B);if(q){const Q=q[y.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&P(w),Object.keys(q).length===0&&m.delete(B)}i.remove(w)}function P(w){const y=i.get(w);t.deleteTexture(y.__webglTexture);const B=w.source,q=m.get(B);delete q[y.__cacheKey],o.memory.textures--}function I(w){const y=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(y.__webglFramebuffer[q]))for(let Q=0;Q<y.__webglFramebuffer[q].length;Q++)t.deleteFramebuffer(y.__webglFramebuffer[q][Q]);else t.deleteFramebuffer(y.__webglFramebuffer[q]);y.__webglDepthbuffer&&t.deleteRenderbuffer(y.__webglDepthbuffer[q])}else{if(Array.isArray(y.__webglFramebuffer))for(let q=0;q<y.__webglFramebuffer.length;q++)t.deleteFramebuffer(y.__webglFramebuffer[q]);else t.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&t.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&t.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let q=0;q<y.__webglColorRenderbuffer.length;q++)y.__webglColorRenderbuffer[q]&&t.deleteRenderbuffer(y.__webglColorRenderbuffer[q]);y.__webglDepthRenderbuffer&&t.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const B=w.textures;for(let q=0,Q=B.length;q<Q;q++){const le=i.get(B[q]);le.__webglTexture&&(t.deleteTexture(le.__webglTexture),o.memory.textures--),i.remove(B[q])}i.remove(w)}let O=0;function $(){O=0}function ee(){return O}function D(w){O=w}function G(){const w=O;return w>=r.maxTextures&&Fe("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),O+=1,w}function L(w){const y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function U(w,y){const B=i.get(w);if(w.isVideoTexture&&z(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){const q=w.image;if(q===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{Ue(B,w,y);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,B.__webglTexture,t.TEXTURE0+y)}function V(w,y){const B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){Ue(B,w,y);return}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,B.__webglTexture,t.TEXTURE0+y)}function N(w,y){const B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){Ue(B,w,y);return}n.bindTexture(t.TEXTURE_3D,B.__webglTexture,t.TEXTURE0+y)}function X(w,y){const B=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&B.__version!==w.version){Oe(B,w,y);return}n.bindTexture(t.TEXTURE_CUBE_MAP,B.__webglTexture,t.TEXTURE0+y)}const Z={[nf]:t.REPEAT,[Ri]:t.CLAMP_TO_EDGE,[rf]:t.MIRRORED_REPEAT},ce={[Wt]:t.NEAREST,[ES]:t.NEAREST_MIPMAP_NEAREST,[Vs]:t.NEAREST_MIPMAP_LINEAR,[Vt]:t.LINEAR,[mu]:t.LINEAR_MIPMAP_NEAREST,[Fr]:t.LINEAR_MIPMAP_LINEAR},De={[CS]:t.NEVER,[IS]:t.ALWAYS,[AS]:t.LESS,[Bp]:t.LEQUAL,[RS]:t.EQUAL,[Vp]:t.GEQUAL,[wS]:t.GREATER,[PS]:t.NOTEQUAL};function Ie(w,y){if(y.type===ci&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Vt||y.magFilter===mu||y.magFilter===Vs||y.magFilter===Fr||y.minFilter===Vt||y.minFilter===mu||y.minFilter===Vs||y.minFilter===Fr)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(w,t.TEXTURE_WRAP_S,Z[y.wrapS]),t.texParameteri(w,t.TEXTURE_WRAP_T,Z[y.wrapT]),(w===t.TEXTURE_3D||w===t.TEXTURE_2D_ARRAY)&&t.texParameteri(w,t.TEXTURE_WRAP_R,Z[y.wrapR]),t.texParameteri(w,t.TEXTURE_MAG_FILTER,ce[y.magFilter]),t.texParameteri(w,t.TEXTURE_MIN_FILTER,ce[y.minFilter]),y.compareFunction&&(t.texParameteri(w,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(w,t.TEXTURE_COMPARE_FUNC,De[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Wt||y.minFilter!==Vs&&y.minFilter!==Fr||y.type===ci&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");t.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function K(w,y){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",A));const q=y.source;let Q=m.get(q);Q===void 0&&(Q={},m.set(q,Q));const le=L(y);if(le!==w.__cacheKey){Q[le]===void 0&&(Q[le]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[le].usedTimes++;const fe=Q[w.__cacheKey];fe!==void 0&&(Q[w.__cacheKey].usedTimes--,fe.usedTimes===0&&P(y)),w.__cacheKey=le,w.__webglTexture=Q[le].texture}return B}function re(w,y,B){return Math.floor(Math.floor(w/B)/y)}function oe(w,y,B,q){const le=w.updateRanges;if(le.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,y.width,y.height,B,q,y.data);else{le.sort((Te,de)=>Te.start-de.start);let fe=0;for(let Te=1;Te<le.length;Te++){const de=le[fe],ae=le[Te],be=de.start+de.count,Ne=re(ae.start,y.width,4),ke=re(de.start,y.width,4);ae.start<=be+1&&Ne===ke&&re(ae.start+ae.count-1,y.width,4)===Ne?de.count=Math.max(de.count,ae.start+ae.count-de.start):(++fe,le[fe]=ae)}le.length=fe+1;const J=n.getParameter(t.UNPACK_ROW_LENGTH),te=n.getParameter(t.UNPACK_SKIP_PIXELS),he=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,y.width);for(let Te=0,de=le.length;Te<de;Te++){const ae=le[Te],be=Math.floor(ae.start/4),Ne=Math.ceil(ae.count/4),ke=be%y.width,F=Math.floor(be/y.width),pe=Ne,ne=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,ke),n.pixelStorei(t.UNPACK_SKIP_ROWS,F),n.texSubImage2D(t.TEXTURE_2D,0,ke,F,pe,ne,B,q,y.data)}w.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,J),n.pixelStorei(t.UNPACK_SKIP_PIXELS,te),n.pixelStorei(t.UNPACK_SKIP_ROWS,he)}}function Ue(w,y,B){let q=t.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(q=t.TEXTURE_2D_ARRAY),y.isData3DTexture&&(q=t.TEXTURE_3D);const Q=K(w,y),le=y.source;n.bindTexture(q,w.__webglTexture,t.TEXTURE0+B);const fe=i.get(le);if(le.version!==fe.__version||Q===!0){if(n.activeTexture(t.TEXTURE0+B),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const ne=qe.getPrimaries(qe.workingColorSpace),me=y.colorSpace===ir?null:qe.getPrimaries(y.colorSpace),_e=y.colorSpace===ir||ne===me?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}n.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment);let te=g(y.image,!1,r.maxTextureSize);te=At(y,te);const he=a.convert(y.format,y.colorSpace),Te=a.convert(y.type);let de=S(y.internalFormat,he,Te,y.normalized,y.colorSpace,y.isVideoTexture);Ie(q,y);let ae;const be=y.mipmaps,Ne=y.isVideoTexture!==!0,ke=fe.__version===void 0||Q===!0,F=le.dataReady,pe=T(y,te);if(y.isDepthTexture)de=b(y.format===Ur,y.type),ke&&(Ne?n.texStorage2D(t.TEXTURE_2D,1,de,te.width,te.height):n.texImage2D(t.TEXTURE_2D,0,de,te.width,te.height,0,he,Te,null));else if(y.isDataTexture)if(be.length>0){Ne&&ke&&n.texStorage2D(t.TEXTURE_2D,pe,de,be[0].width,be[0].height);for(let ne=0,me=be.length;ne<me;ne++)ae=be[ne],Ne?F&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,ae.width,ae.height,he,Te,ae.data):n.texImage2D(t.TEXTURE_2D,ne,de,ae.width,ae.height,0,he,Te,ae.data);y.generateMipmaps=!1}else Ne?(ke&&n.texStorage2D(t.TEXTURE_2D,pe,de,te.width,te.height),F&&oe(y,te,he,Te)):n.texImage2D(t.TEXTURE_2D,0,de,te.width,te.height,0,he,Te,te.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ne&&ke&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,de,be[0].width,be[0].height,te.depth);for(let ne=0,me=be.length;ne<me;ne++)if(ae=be[ne],y.format!==qn)if(he!==null)if(Ne){if(F)if(y.layerUpdates.size>0){const _e=Jm(ae.width,ae.height,y.format,y.type);for(const ie of y.layerUpdates){const Ae=ae.data.subarray(ie*_e/ae.data.BYTES_PER_ELEMENT,(ie+1)*_e/ae.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,ie,ae.width,ae.height,1,he,Ae)}y.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,0,ae.width,ae.height,te.depth,he,ae.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ne,de,ae.width,ae.height,te.depth,0,ae.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?F&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,0,ae.width,ae.height,te.depth,he,Te,ae.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ne,de,ae.width,ae.height,te.depth,0,he,Te,ae.data)}else{Ne&&ke&&n.texStorage2D(t.TEXTURE_2D,pe,de,be[0].width,be[0].height);for(let ne=0,me=be.length;ne<me;ne++)ae=be[ne],y.format!==qn?he!==null?Ne?F&&n.compressedTexSubImage2D(t.TEXTURE_2D,ne,0,0,ae.width,ae.height,he,ae.data):n.compressedTexImage2D(t.TEXTURE_2D,ne,de,ae.width,ae.height,0,ae.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?F&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,ae.width,ae.height,he,Te,ae.data):n.texImage2D(t.TEXTURE_2D,ne,de,ae.width,ae.height,0,he,Te,ae.data)}else if(y.isDataArrayTexture)if(Ne){if(ke&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,de,te.width,te.height,te.depth),F)if(y.layerUpdates.size>0){const ne=Jm(te.width,te.height,y.format,y.type);for(const me of y.layerUpdates){const _e=te.data.subarray(me*ne/te.data.BYTES_PER_ELEMENT,(me+1)*ne/te.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,me,te.width,te.height,1,he,Te,_e)}y.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,he,Te,te.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,de,te.width,te.height,te.depth,0,he,Te,te.data);else if(y.isData3DTexture)Ne?(ke&&n.texStorage3D(t.TEXTURE_3D,pe,de,te.width,te.height,te.depth),F&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,he,Te,te.data)):n.texImage3D(t.TEXTURE_3D,0,de,te.width,te.height,te.depth,0,he,Te,te.data);else if(y.isFramebufferTexture){if(ke)if(Ne)n.texStorage2D(t.TEXTURE_2D,pe,de,te.width,te.height);else{let ne=te.width,me=te.height;for(let _e=0;_e<pe;_e++)n.texImage2D(t.TEXTURE_2D,_e,de,ne,me,0,he,Te,null),ne>>=1,me>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in t){const ne=t.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),te.parentNode!==ne){ne.appendChild(te),h.add(y),ne.onpaint=me=>{const _e=me.changedElements;for(const ie of h)_e.includes(ie.image)&&(ie.needsUpdate=!0)},ne.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,te);else{const _e=t.RGBA,ie=t.RGBA,Ae=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,_e,ie,Ae,te)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(be.length>0){if(Ne&&ke){const ne=et(be[0]);n.texStorage2D(t.TEXTURE_2D,pe,de,ne.width,ne.height)}for(let ne=0,me=be.length;ne<me;ne++)ae=be[ne],Ne?F&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,he,Te,ae):n.texImage2D(t.TEXTURE_2D,ne,de,he,Te,ae);y.generateMipmaps=!1}else if(Ne){if(ke){const ne=et(te);n.texStorage2D(t.TEXTURE_2D,pe,de,ne.width,ne.height)}F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,he,Te,te)}else n.texImage2D(t.TEXTURE_2D,0,de,he,Te,te);d(y)&&x(q),fe.__version=le.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function Oe(w,y,B){if(y.image.length!==6)return;const q=K(w,y),Q=y.source;n.bindTexture(t.TEXTURE_CUBE_MAP,w.__webglTexture,t.TEXTURE0+B);const le=i.get(Q);if(Q.version!==le.__version||q===!0){n.activeTexture(t.TEXTURE0+B);const fe=qe.getPrimaries(qe.workingColorSpace),J=y.colorSpace===ir?null:qe.getPrimaries(y.colorSpace),te=y.colorSpace===ir||fe===J?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const he=y.isCompressedTexture||y.image[0].isCompressedTexture,Te=y.image[0]&&y.image[0].isDataTexture,de=[];for(let ie=0;ie<6;ie++)!he&&!Te?de[ie]=g(y.image[ie],!0,r.maxCubemapSize):de[ie]=Te?y.image[ie].image:y.image[ie],de[ie]=At(y,de[ie]);const ae=de[0],be=a.convert(y.format,y.colorSpace),Ne=a.convert(y.type),ke=S(y.internalFormat,be,Ne,y.normalized,y.colorSpace),F=y.isVideoTexture!==!0,pe=le.__version===void 0||q===!0,ne=Q.dataReady;let me=T(y,ae);Ie(t.TEXTURE_CUBE_MAP,y);let _e;if(he){F&&pe&&n.texStorage2D(t.TEXTURE_CUBE_MAP,me,ke,ae.width,ae.height);for(let ie=0;ie<6;ie++){_e=de[ie].mipmaps;for(let Ae=0;Ae<_e.length;Ae++){const Ee=_e[Ae];y.format!==qn?be!==null?F?ne&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ae,0,0,Ee.width,Ee.height,be,Ee.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ae,ke,Ee.width,Ee.height,0,Ee.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ae,0,0,Ee.width,Ee.height,be,Ne,Ee.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ae,ke,Ee.width,Ee.height,0,be,Ne,Ee.data)}}}else{if(_e=y.mipmaps,F&&pe){_e.length>0&&me++;const ie=et(de[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,me,ke,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(Te){F?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,de[ie].width,de[ie].height,be,Ne,de[ie].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ke,de[ie].width,de[ie].height,0,be,Ne,de[ie].data);for(let Ae=0;Ae<_e.length;Ae++){const Mt=_e[Ae].image[ie].image;F?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ae+1,0,0,Mt.width,Mt.height,be,Ne,Mt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ae+1,ke,Mt.width,Mt.height,0,be,Ne,Mt.data)}}else{F?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,be,Ne,de[ie]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ke,be,Ne,de[ie]);for(let Ae=0;Ae<_e.length;Ae++){const Ee=_e[Ae];F?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ae+1,0,0,be,Ne,Ee.image[ie]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ae+1,ke,be,Ne,Ee.image[ie])}}}d(y)&&x(t.TEXTURE_CUBE_MAP),le.__version=Q.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function Le(w,y,B,q,Q,le){const fe=a.convert(B.format,B.colorSpace),J=a.convert(B.type),te=S(B.internalFormat,fe,J,B.normalized,B.colorSpace),he=i.get(y),Te=i.get(B);if(Te.__renderTarget=y,!he.__hasExternalTextures){const de=Math.max(1,y.width>>le),ae=Math.max(1,y.height>>le);Q===t.TEXTURE_3D||Q===t.TEXTURE_2D_ARRAY?n.texImage3D(Q,le,te,de,ae,y.depth,0,fe,J,null):n.texImage2D(Q,le,te,de,ae,0,fe,J,null)}n.bindFramebuffer(t.FRAMEBUFFER,w),St(y)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,q,Q,Te.__webglTexture,0,ft(y)):(Q===t.TEXTURE_2D||Q>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,q,Q,Te.__webglTexture,le),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ht(w,y,B){if(t.bindRenderbuffer(t.RENDERBUFFER,w),y.depthBuffer){const q=y.depthTexture,Q=q&&q.isDepthTexture?q.type:null,le=b(y.stencilBuffer,Q),fe=y.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;St(y)?s.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ft(y),le,y.width,y.height):B?t.renderbufferStorageMultisample(t.RENDERBUFFER,ft(y),le,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,le,y.width,y.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,fe,t.RENDERBUFFER,w)}else{const q=y.textures;for(let Q=0;Q<q.length;Q++){const le=q[Q],fe=a.convert(le.format,le.colorSpace),J=a.convert(le.type),te=S(le.internalFormat,fe,J,le.normalized,le.colorSpace);St(y)?s.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ft(y),te,y.width,y.height):B?t.renderbufferStorageMultisample(t.RENDERBUFFER,ft(y),te,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,te,y.width,y.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function He(w,y,B){const q=y.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=i.get(y.depthTexture);if(Q.__renderTarget=y,(!Q.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),q){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,y.depthTexture.addEventListener("dispose",A)),Q.__webglTexture===void 0){Q.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,Q.__webglTexture),Ie(t.TEXTURE_CUBE_MAP,y.depthTexture);const he=a.convert(y.depthTexture.format),Te=a.convert(y.depthTexture.type);let de;y.depthTexture.format===ki?de=t.DEPTH_COMPONENT24:y.depthTexture.format===Ur&&(de=t.DEPTH24_STENCIL8);for(let ae=0;ae<6;ae++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,de,y.width,y.height,0,he,Te,null)}}else U(y.depthTexture,0);const le=Q.__webglTexture,fe=ft(y),J=q?t.TEXTURE_CUBE_MAP_POSITIVE_X+B:t.TEXTURE_2D,te=y.depthTexture.format===Ur?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(y.depthTexture.format===ki)St(y)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,te,J,le,0,fe):t.framebufferTexture2D(t.FRAMEBUFFER,te,J,le,0);else if(y.depthTexture.format===Ur)St(y)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,te,J,le,0,fe):t.framebufferTexture2D(t.FRAMEBUFFER,te,J,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(w){const y=i.get(w),B=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){const q=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),q){const Q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),y.__depthDisposeCallback=Q}y.__boundDepthTexture=q}if(w.depthTexture&&!y.__autoAllocateDepthBuffer)if(B)for(let q=0;q<6;q++)He(y.__webglFramebuffer[q],w,q);else{const q=w.texture.mipmaps;q&&q.length>0?He(y.__webglFramebuffer[0],w,0):He(y.__webglFramebuffer,w,0)}else if(B){y.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[q]),y.__webglDepthbuffer[q]===void 0)y.__webglDepthbuffer[q]=t.createRenderbuffer(),ht(y.__webglDepthbuffer[q],w,!1);else{const Q=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,le=y.__webglDepthbuffer[q];t.bindRenderbuffer(t.RENDERBUFFER,le),t.framebufferRenderbuffer(t.FRAMEBUFFER,Q,t.RENDERBUFFER,le)}}else{const q=w.texture.mipmaps;if(q&&q.length>0?n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=t.createRenderbuffer(),ht(y.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,le=y.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,le),t.framebufferRenderbuffer(t.FRAMEBUFFER,Q,t.RENDERBUFFER,le)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ke(w,y,B){const q=i.get(w);y!==void 0&&Le(q.__webglFramebuffer,w,w.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),B!==void 0&&tt(w)}function Xe(w){const y=w.texture,B=i.get(w),q=i.get(y);w.addEventListener("dispose",v);const Q=w.textures,le=w.isWebGLCubeRenderTarget===!0,fe=Q.length>1;if(fe||(q.__webglTexture===void 0&&(q.__webglTexture=t.createTexture()),q.__version=y.version,o.memory.textures++),le){B.__webglFramebuffer=[];for(let J=0;J<6;J++)if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[J]=[];for(let te=0;te<y.mipmaps.length;te++)B.__webglFramebuffer[J][te]=t.createFramebuffer()}else B.__webglFramebuffer[J]=t.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let J=0;J<y.mipmaps.length;J++)B.__webglFramebuffer[J]=t.createFramebuffer()}else B.__webglFramebuffer=t.createFramebuffer();if(fe)for(let J=0,te=Q.length;J<te;J++){const he=i.get(Q[J]);he.__webglTexture===void 0&&(he.__webglTexture=t.createTexture(),o.memory.textures++)}if(w.samples>0&&St(w)===!1){B.__webglMultisampledFramebuffer=t.createFramebuffer(),B.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let J=0;J<Q.length;J++){const te=Q[J];B.__webglColorRenderbuffer[J]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,B.__webglColorRenderbuffer[J]);const he=a.convert(te.format,te.colorSpace),Te=a.convert(te.type),de=S(te.internalFormat,he,Te,te.normalized,te.colorSpace,w.isXRRenderTarget===!0),ae=ft(w);t.renderbufferStorageMultisample(t.RENDERBUFFER,ae,de,w.width,w.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+J,t.RENDERBUFFER,B.__webglColorRenderbuffer[J])}t.bindRenderbuffer(t.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=t.createRenderbuffer(),ht(B.__webglDepthRenderbuffer,w,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(le){n.bindTexture(t.TEXTURE_CUBE_MAP,q.__webglTexture),Ie(t.TEXTURE_CUBE_MAP,y);for(let J=0;J<6;J++)if(y.mipmaps&&y.mipmaps.length>0)for(let te=0;te<y.mipmaps.length;te++)Le(B.__webglFramebuffer[J][te],w,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+J,te);else Le(B.__webglFramebuffer[J],w,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);d(y)&&x(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(fe){for(let J=0,te=Q.length;J<te;J++){const he=Q[J],Te=i.get(he);let de=t.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(de=w.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(de,Te.__webglTexture),Ie(de,he),Le(B.__webglFramebuffer,w,he,t.COLOR_ATTACHMENT0+J,de,0),d(he)&&x(de)}n.unbindTexture()}else{let J=t.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(J=w.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(J,q.__webglTexture),Ie(J,y),y.mipmaps&&y.mipmaps.length>0)for(let te=0;te<y.mipmaps.length;te++)Le(B.__webglFramebuffer[te],w,y,t.COLOR_ATTACHMENT0,J,te);else Le(B.__webglFramebuffer,w,y,t.COLOR_ATTACHMENT0,J,0);d(y)&&x(J),n.unbindTexture()}w.depthBuffer&&tt(w)}function yt(w){const y=w.textures;for(let B=0,q=y.length;B<q;B++){const Q=y[B];if(d(Q)){const le=M(w),fe=i.get(Q).__webglTexture;n.bindTexture(le,fe),x(le),n.unbindTexture()}}}const bt=[],Ct=[];function It(w){if(w.samples>0){if(St(w)===!1){const y=w.textures,B=w.width,q=w.height;let Q=t.COLOR_BUFFER_BIT;const le=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,fe=i.get(w),J=y.length>1;if(J)for(let he=0;he<y.length;he++)n.bindFramebuffer(t.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+he,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,fe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+he,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);const te=w.texture.mipmaps;te&&te.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let he=0;he<y.length;he++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=t.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=t.STENCIL_BUFFER_BIT)),J){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,fe.__webglColorRenderbuffer[he]);const Te=i.get(y[he]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Te,0)}t.blitFramebuffer(0,0,B,q,0,0,B,q,Q,t.NEAREST),l===!0&&(bt.length=0,Ct.length=0,bt.push(t.COLOR_ATTACHMENT0+he),w.depthBuffer&&w.resolveDepthBuffer===!1&&(bt.push(le),Ct.push(le),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ct)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,bt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),J)for(let he=0;he<y.length;he++){n.bindFramebuffer(t.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+he,t.RENDERBUFFER,fe.__webglColorRenderbuffer[he]);const Te=i.get(y[he]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,fe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+he,t.TEXTURE_2D,Te,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const y=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[y])}}}function ft(w){return Math.min(r.maxSamples,w.samples)}function St(w){const y=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function z(w){const y=o.render.frame;p.get(w)!==y&&(p.set(w,y),w.update())}function At(w,y){const B=w.colorSpace,q=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==sc&&B!==ir&&(qe.getTransfer(B)===nt?(q!==qn||Q!==yn)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",B)),y}function et(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=$,this.getTextureUnits=ee,this.setTextureUnits=D,this.setTexture2D=U,this.setTexture2DArray=V,this.setTexture3D=N,this.setTextureCube=X,this.rebindTextures=Ke,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=St,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function cA(t,e){function n(i,r=ir){let a;const o=qe.getTransfer(r);if(i===yn)return t.UNSIGNED_BYTE;if(i===Fp)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Up)return t.UNSIGNED_SHORT_5_5_5_1;if(i===fv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===pv)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===uv)return t.BYTE;if(i===dv)return t.SHORT;if(i===ss)return t.UNSIGNED_SHORT;if(i===Np)return t.INT;if(i===gi)return t.UNSIGNED_INT;if(i===ci)return t.FLOAT;if(i===zi)return t.HALF_FLOAT;if(i===hv)return t.ALPHA;if(i===mv)return t.RGB;if(i===qn)return t.RGBA;if(i===ki)return t.DEPTH_COMPONENT;if(i===Ur)return t.DEPTH_STENCIL;if(i===gv)return t.RED;if(i===Op)return t.RED_INTEGER;if(i===jr)return t.RG;if(i===zp)return t.RG_INTEGER;if(i===kp)return t.RGBA_INTEGER;if(i===Pl||i===Il||i===Dl||i===Ll)if(o===nt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Pl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Il)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Dl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ll)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Pl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Il)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Dl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ll)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===af||i===of||i===sf||i===lf)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===af)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===of)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===sf)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===lf)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===cf||i===uf||i===df||i===ff||i===pf||i===ac||i===hf)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===cf||i===uf)return o===nt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===df)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===ff)return a.COMPRESSED_R11_EAC;if(i===pf)return a.COMPRESSED_SIGNED_R11_EAC;if(i===ac)return a.COMPRESSED_RG11_EAC;if(i===hf)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===mf||i===gf||i===xf||i===vf||i===_f||i===yf||i===Sf||i===Mf||i===Ef||i===Tf||i===bf||i===Cf||i===Af||i===Rf)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===mf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===gf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===vf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===_f)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===yf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Sf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Mf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ef)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Tf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===bf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Cf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Af)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Rf)return o===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===wf||i===Pf||i===If)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===wf)return o===nt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Pf)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===If)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Df||i===Lf||i===oc||i===Nf)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===Df)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Lf)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===oc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Nf)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ls?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const uA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dA=`
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

}`;class fA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Cv(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new xi({vertexShader:uA,fragmentShader:dA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Lt(new vs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class pA extends Yr{constructor(e,n){super();const i=this;let r=null,a=1,o=null,s="local-floor",l=1,c=null,p=null,h=null,u=null,m=null,_=null;const E=typeof XRWebGLBinding<"u",g=new fA,d={},x=n.getContextAttributes();let M=null,S=null;const b=[],T=[],A=new $e;let v=null;const R=new Ln;R.viewport=new gt;const P=new Ln;P.viewport=new gt;const I=[R,P],O=new SM;let $=null,ee=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let re=b[K];return re===void 0&&(re=new Eu,b[K]=re),re.getTargetRaySpace()},this.getControllerGrip=function(K){let re=b[K];return re===void 0&&(re=new Eu,b[K]=re),re.getGripSpace()},this.getHand=function(K){let re=b[K];return re===void 0&&(re=new Eu,b[K]=re),re.getHandSpace()};function D(K){const re=T.indexOf(K.inputSource);if(re===-1)return;const oe=b[re];oe!==void 0&&(oe.update(K.inputSource,K.frame,c||o),oe.dispatchEvent({type:K.type,data:K.inputSource}))}function G(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",L);for(let K=0;K<b.length;K++){const re=T[K];re!==null&&(T[K]=null,b[K].disconnect(re))}$=null,ee=null,g.reset();for(const K in d)delete d[K];e.setRenderTarget(M),m=null,u=null,h=null,r=null,S=null,Ie.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){a=K,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){s=K,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return h===null&&E&&(h=new XRWebGLBinding(r,n)),h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",G),r.addEventListener("inputsourceschange",L),x.xrCompatible!==!0&&await n.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(A),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,Ue=null,Oe=null;x.depth&&(Oe=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,oe=x.stencil?Ur:ki,Ue=x.stencil?ls:gi);const Le={colorFormat:n.RGBA8,depthFormat:Oe,scaleFactor:a};h=this.getBinding(),u=h.createProjectionLayer(Le),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new hi(u.textureWidth,u.textureHeight,{format:qn,type:yn,depthTexture:new $a(u.textureWidth,u.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const oe={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(r,n,oe),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new hi(m.framebufferWidth,m.framebufferHeight,{format:qn,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(s),Ie.setContext(r),Ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function L(K){for(let re=0;re<K.removed.length;re++){const oe=K.removed[re],Ue=T.indexOf(oe);Ue>=0&&(T[Ue]=null,b[Ue].disconnect(oe))}for(let re=0;re<K.added.length;re++){const oe=K.added[re];let Ue=T.indexOf(oe);if(Ue===-1){for(let Le=0;Le<b.length;Le++)if(Le>=T.length){T.push(oe),Ue=Le;break}else if(T[Le]===null){T[Le]=oe,Ue=Le;break}if(Ue===-1)break}const Oe=b[Ue];Oe&&Oe.connect(oe)}}const U=new H,V=new H;function N(K,re,oe){U.setFromMatrixPosition(re.matrixWorld),V.setFromMatrixPosition(oe.matrixWorld);const Ue=U.distanceTo(V),Oe=re.projectionMatrix.elements,Le=oe.projectionMatrix.elements,ht=Oe[14]/(Oe[10]-1),He=Oe[14]/(Oe[10]+1),tt=(Oe[9]+1)/Oe[5],Ke=(Oe[9]-1)/Oe[5],Xe=(Oe[8]-1)/Oe[0],yt=(Le[8]+1)/Le[0],bt=ht*Xe,Ct=ht*yt,It=Ue/(-Xe+yt),ft=It*-Xe;if(re.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ft),K.translateZ(It),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Oe[10]===-1)K.projectionMatrix.copy(re.projectionMatrix),K.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const St=ht+It,z=He+It,At=bt-ft,et=Ct+(Ue-ft),w=tt*He/z*St,y=Ke*He/z*St;K.projectionMatrix.makePerspective(At,et,w,y,St,z),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function X(K,re){re===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(re.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let re=K.near,oe=K.far;g.texture!==null&&(g.depthNear>0&&(re=g.depthNear),g.depthFar>0&&(oe=g.depthFar)),O.near=P.near=R.near=re,O.far=P.far=R.far=oe,($!==O.near||ee!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),$=O.near,ee=O.far),O.layers.mask=K.layers.mask|6,R.layers.mask=O.layers.mask&-5,P.layers.mask=O.layers.mask&-3;const Ue=K.parent,Oe=O.cameras;X(O,Ue);for(let Le=0;Le<Oe.length;Le++)X(Oe[Le],Ue);Oe.length===2?N(O,R,P):O.projectionMatrix.copy(R.projectionMatrix),Z(K,O,Ue)};function Z(K,re,oe){oe===null?K.matrix.copy(re.matrixWorld):(K.matrix.copy(oe.matrixWorld),K.matrix.invert(),K.matrix.multiply(re.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(re.projectionMatrix),K.projectionMatrixInverse.copy(re.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Uf*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(K){return d[K]};let ce=null;function De(K,re){if(p=re.getViewerPose(c||o),_=re,p!==null){const oe=p.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let Ue=!1;oe.length!==O.cameras.length&&(O.cameras.length=0,Ue=!0);for(let He=0;He<oe.length;He++){const tt=oe[He];let Ke=null;if(m!==null)Ke=m.getViewport(tt);else{const yt=h.getViewSubImage(u,tt);Ke=yt.viewport,He===0&&(e.setRenderTargetTextures(S,yt.colorTexture,yt.depthStencilTexture),e.setRenderTarget(S))}let Xe=I[He];Xe===void 0&&(Xe=new Ln,Xe.layers.enable(He),Xe.viewport=new gt,I[He]=Xe),Xe.matrix.fromArray(tt.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(tt.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),He===0&&(O.matrix.copy(Xe.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ue===!0&&O.cameras.push(Xe)}const Oe=r.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&E){h=i.getBinding();const He=h.getDepthInformation(oe[0]);He&&He.isValid&&He.texture&&g.init(He,r.renderState)}if(Oe&&Oe.includes("camera-access")&&E){e.state.unbindTexture(),h=i.getBinding();for(let He=0;He<oe.length;He++){const tt=oe[He].camera;if(tt){let Ke=d[tt];Ke||(Ke=new Cv,d[tt]=Ke);const Xe=h.getCameraImage(tt);Ke.sourceTexture=Xe}}}}for(let oe=0;oe<b.length;oe++){const Ue=T[oe],Oe=b[oe];Ue!==null&&Oe!==void 0&&Oe.update(Ue,re,c||o)}ce&&ce(K,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),_=null}const Ie=new Pv;Ie.setAnimationLoop(De),this.setAnimationLoop=function(K){ce=K},this.dispose=function(){}}}const hA=new vt,Ov=new ze;Ov.set(-1,0,0,0,1,0,0,0,1);function mA(t,e){function n(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,Av(t)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,x,M,S){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?a(g,d):d.isMeshLambertMaterial?(a(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(a(g,d),h(g,d)):d.isMeshPhongMaterial?(a(g,d),p(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(a(g,d),u(g,d),d.isMeshPhysicalMaterial&&m(g,d,S)):d.isMeshMatcapMaterial?(a(g,d),_(g,d)):d.isMeshDepthMaterial?a(g,d):d.isMeshDistanceMaterial?(a(g,d),E(g,d)):d.isMeshNormalMaterial?a(g,d):d.isLineBasicMaterial?(o(g,d),d.isLineDashedMaterial&&s(g,d)):d.isPointsMaterial?l(g,d,x,M):d.isSpriteMaterial?c(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function a(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,n(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===mn&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,n(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===mn&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,n(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,n(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const x=e.get(d),M=x.envMap,S=x.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(hA.makeRotationFromEuler(S)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Ov),g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,g.aoMapTransform))}function o(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform))}function s(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function l(g,d,x,M){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*x,g.scale.value=M*.5,d.map&&(g.map.value=d.map,n(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function c(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function p(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function h(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function u(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function m(g,d,x){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===mn&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,d){d.matcap&&(g.matcap.value=d.matcap)}function E(g,d){const x=e.get(d).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function gA(t,e,n,i){let r={},a={},o=[];const s=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,b){const T=b.program;i.uniformBlockBinding(S,T)}function c(S,b){let T=r[S.id];T===void 0&&(g(S),T=p(S),r[S.id]=T,S.addEventListener("dispose",x));const A=b.program;i.updateUBOMapping(S,A);const v=e.render.frame;a[S.id]!==v&&(u(S),a[S.id]=v)}function p(S){const b=h();S.__bindingPointIndex=b;const T=t.createBuffer(),A=S.__size,v=S.usage;return t.bindBuffer(t.UNIFORM_BUFFER,T),t.bufferData(t.UNIFORM_BUFFER,A,v),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,b,T),T}function h(){for(let S=0;S<s;S++)if(o.indexOf(S)===-1)return o.push(S),S;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const b=r[S.id],T=S.uniforms,A=S.__cache;t.bindBuffer(t.UNIFORM_BUFFER,b);for(let v=0,R=T.length;v<R;v++){const P=T[v];if(Array.isArray(P))for(let I=0,O=P.length;I<O;I++)m(P[I],v,I,A);else m(P,v,0,A)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(S,b,T,A){if(E(S,b,T,A)===!0){const v=S.__offset,R=S.value;if(Array.isArray(R)){let P=0;for(let I=0;I<R.length;I++){const O=R[I],$=d(O);_(O,S.__data,P),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(P+=$.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(R,S.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,v,S.__data)}}function _(S,b,T){typeof S=="number"||typeof S=="boolean"?b[0]=S:S.isMatrix3?(b[0]=S.elements[0],b[1]=S.elements[1],b[2]=S.elements[2],b[3]=0,b[4]=S.elements[3],b[5]=S.elements[4],b[6]=S.elements[5],b[7]=0,b[8]=S.elements[6],b[9]=S.elements[7],b[10]=S.elements[8],b[11]=0):ArrayBuffer.isView(S)?b.set(new S.constructor(S.buffer,S.byteOffset,b.length)):S.toArray(b,T)}function E(S,b,T,A){const v=S.value,R=b+"_"+T;if(A[R]===void 0)return typeof v=="number"||typeof v=="boolean"?A[R]=v:ArrayBuffer.isView(v)?A[R]=v.slice():A[R]=v.clone(),!0;{const P=A[R];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return A[R]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function g(S){const b=S.uniforms;let T=0;const A=16;for(let R=0,P=b.length;R<P;R++){const I=Array.isArray(b[R])?b[R]:[b[R]];for(let O=0,$=I.length;O<$;O++){const ee=I[O],D=Array.isArray(ee.value)?ee.value:[ee.value];for(let G=0,L=D.length;G<L;G++){const U=D[G],V=d(U),N=T%A,X=N%V.boundary,Z=N+X;T+=X,Z!==0&&A-Z<V.storage&&(T+=A-Z),ee.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),ee.__offset=T,T+=V.storage}}}const v=T%A;return v>0&&(T+=A-v),S.__size=T,S.__cache={},this}function d(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(b.boundary=16,b.storage=S.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",S),b}function x(S){const b=S.target;b.removeEventListener("dispose",x);const T=o.indexOf(b.__bindingPointIndex);o.splice(T,1),t.deleteBuffer(r[b.id]),delete r[b.id],delete a[b.id]}function M(){for(const S in r)t.deleteBuffer(r[S]);o=[],r={},a={}}return{bind:l,update:c,dispose:M}}const xA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ii=null;function vA(){return ii===null&&(ii=new nM(xA,16,16,jr,zi),ii.name="DFG_LUT",ii.minFilter=Vt,ii.magFilter=Vt,ii.wrapS=Ri,ii.wrapT=Ri,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}class _A{constructor(e={}){const{canvas:n=LS(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:m=yn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=o;const E=m,g=new Set([kp,zp,Op]),d=new Set([yn,gi,ss,ls,Fp,Up]),x=new Uint32Array(4),M=new Int32Array(4),S=new H;let b=null,T=null;const A=[],v=[];let R=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let I=!1,O=null,$=null,ee=null,D=null;this._outputColorSpace=Pn;let G=0,L=0,U=null,V=-1,N=null;const X=new gt,Z=new gt;let ce=null;const De=new We(0);let Ie=0,K=n.width,re=n.height,oe=1,Ue=null,Oe=null;const Le=new gt(0,0,K,re),ht=new gt(0,0,K,re);let He=!1;const tt=new Wp;let Ke=!1,Xe=!1;const yt=new vt,bt=new H,Ct=new gt,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ft=!1;function St(){return U===null?oe:1}let z=i;function At(C,k){return n.getContext(C,k)}try{const C={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:p,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Lp}`),n.addEventListener("webglcontextlost",Mt,!1),n.addEventListener("webglcontextrestored",st,!1),n.addEventListener("webglcontextcreationerror",Qn,!1),z===null){const k="webgl2";if(z=At(k,C),z===null)throw At(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(C){throw Qe("WebGLRenderer: "+C.message),C}let et,w,y,B,q,Q,le,fe,J,te,he,Te,de,ae,be,Ne,ke,F,pe,ne,me,_e,ie;function Ae(){et=new vb(z),et.init(),me=new cA(z,et),w=new ub(z,et,e,me),y=new sA(z,et),w.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),$=z.createFramebuffer(),ee=z.createFramebuffer(),D=z.createFramebuffer(),B=new Sb(z),q=new qC,Q=new lA(z,et,y,q,w,me,B),le=new xb(P),fe=new bM(z),_e=new lb(z,fe),J=new _b(z,fe,B,_e),te=new Eb(z,J,fe,_e,B),F=new Mb(z,w,Q),be=new db(q),he=new XC(P,le,et,w,_e,be),Te=new mA(P,q),de=new $C,ae=new tA(et),ke=new sb(P,le,y,te,_,l),Ne=new oA(P,te,w),ie=new gA(z,B,w,y),pe=new cb(z,et,B),ne=new yb(z,et,B),B.programs=he.programs,P.capabilities=w,P.extensions=et,P.properties=q,P.renderLists=de,P.shadowMap=Ne,P.state=y,P.info=B}Ae(),E!==yn&&(R=new bb(E,n.width,n.height,s,r,a));const Ee=new pA(P,z);this.xr=Ee,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const C=et.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=et.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(C){C!==void 0&&(oe=C,this.setSize(K,re,!1))},this.getSize=function(C){return C.set(K,re)},this.setSize=function(C,k,Y=!0){if(Ee.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}K=C,re=k,n.width=Math.floor(C*oe),n.height=Math.floor(k*oe),Y===!0&&(n.style.width=C+"px",n.style.height=k+"px"),R!==null&&R.setSize(n.width,n.height),this.setViewport(0,0,C,k)},this.getDrawingBufferSize=function(C){return C.set(K*oe,re*oe).floor()},this.setDrawingBufferSize=function(C,k,Y){K=C,re=k,oe=Y,n.width=Math.floor(C*Y),n.height=Math.floor(k*Y),this.setViewport(0,0,C,k)},this.setEffects=function(C){if(E===yn){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let k=0;k<C.length;k++)if(C[k].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(X)},this.getViewport=function(C){return C.copy(Le)},this.setViewport=function(C,k,Y,W){C.isVector4?Le.set(C.x,C.y,C.z,C.w):Le.set(C,k,Y,W),y.viewport(X.copy(Le).multiplyScalar(oe).round())},this.getScissor=function(C){return C.copy(ht)},this.setScissor=function(C,k,Y,W){C.isVector4?ht.set(C.x,C.y,C.z,C.w):ht.set(C,k,Y,W),y.scissor(Z.copy(ht).multiplyScalar(oe).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(C){y.setScissorTest(He=C)},this.setOpaqueSort=function(C){Ue=C},this.setTransparentSort=function(C){Oe=C},this.getClearColor=function(C){return C.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(C=!0,k=!0,Y=!0){let W=0;if(C){let j=!1;if(U!==null){const ve=U.texture.format;j=g.has(ve)}if(j){const ve=U.texture.type,Se=d.has(ve),xe=ke.getClearColor(),Ce=ke.getClearAlpha(),Re=xe.r,Be=xe.g,Ge=xe.b;Se?(x[0]=Re,x[1]=Be,x[2]=Ge,x[3]=Ce,z.clearBufferuiv(z.COLOR,0,x)):(M[0]=Re,M[1]=Be,M[2]=Ge,M[3]=Ce,z.clearBufferiv(z.COLOR,0,M))}else W|=z.COLOR_BUFFER_BIT}k&&(W|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(W|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&z.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),O=C},this.dispose=function(){n.removeEventListener("webglcontextlost",Mt,!1),n.removeEventListener("webglcontextrestored",st,!1),n.removeEventListener("webglcontextcreationerror",Qn,!1),ke.dispose(),de.dispose(),ae.dispose(),q.dispose(),le.dispose(),te.dispose(),_e.dispose(),ie.dispose(),he.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",eh),Ee.removeEventListener("sessionend",th),Sr.stop()};function Mt(C){C.preventDefault(),Am("WebGLRenderer: Context Lost."),I=!0}function st(){Am("WebGLRenderer: Context Restored."),I=!1;const C=B.autoReset,k=Ne.enabled,Y=Ne.autoUpdate,W=Ne.needsUpdate,j=Ne.type;Ae(),B.autoReset=C,Ne.enabled=k,Ne.autoUpdate=Y,Ne.needsUpdate=W,Ne.type=j}function Qn(C){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Jn(C){const k=C.target;k.removeEventListener("dispose",Jn),Wv(k)}function Wv(C){jv(C),q.remove(C)}function jv(C){const k=q.get(C).programs;k!==void 0&&(k.forEach(function(Y){he.releaseProgram(Y)}),C.isShaderMaterial&&he.releaseShaderCache(C))}this.renderBufferDirect=function(C,k,Y,W,j,ve){k===null&&(k=It);const Se=j.isMesh&&j.matrixWorld.determinantAffine()<0,xe=Yv(C,k,Y,W,j);y.setMaterial(W,Se);let Ce=Y.index,Re=1;if(W.wireframe===!0){if(Ce=J.getWireframeAttribute(Y),Ce===void 0)return;Re=2}const Be=Y.drawRange,Ge=Y.attributes.position;let we=Be.start*Re,rt=(Be.start+Be.count)*Re;ve!==null&&(we=Math.max(we,ve.start*Re),rt=Math.min(rt,(ve.start+ve.count)*Re)),Ce!==null?(we=Math.max(we,0),rt=Math.min(rt,Ce.count)):Ge!=null&&(we=Math.max(we,0),rt=Math.min(rt,Ge.count));const Rt=rt-we;if(Rt<0||Rt===1/0)return;_e.setup(j,W,xe,Y,Ce);let Et,at=pe;if(Ce!==null&&(Et=fe.get(Ce),at=ne,at.setIndex(Et)),j.isMesh)W.wireframe===!0?(y.setLineWidth(W.wireframeLinewidth*St()),at.setMode(z.LINES)):at.setMode(z.TRIANGLES);else if(j.isLine){let Yt=W.linewidth;Yt===void 0&&(Yt=1),y.setLineWidth(Yt*St()),j.isLineSegments?at.setMode(z.LINES):j.isLineLoop?at.setMode(z.LINE_LOOP):at.setMode(z.LINE_STRIP)}else j.isPoints?at.setMode(z.POINTS):j.isSprite&&at.setMode(z.TRIANGLES);if(j.isBatchedMesh)if(et.get("WEBGL_multi_draw"))at.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const Yt=j._multiDrawStarts,ye=j._multiDrawCounts,gn=j._multiDrawCount,Ze=Ce?fe.get(Ce).bytesPerElement:1,Cn=q.get(W).currentProgram.getUniforms();for(let ei=0;ei<gn;ei++)Cn.setValue(z,"_gl_DrawID",ei),at.render(Yt[ei]/Ze,ye[ei])}else if(j.isInstancedMesh)at.renderInstances(we,Rt,j.count);else if(Y.isInstancedBufferGeometry){const Yt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,ye=Math.min(Y.instanceCount,Yt);at.renderInstances(we,Rt,ye)}else at.render(we,Rt)};function Jp(C,k,Y){C.transparent===!0&&C.side===bi&&C.forceSinglePass===!1?(C.side=mn,C.needsUpdate=!0,ys(C,k,Y),C.side=Oi,C.needsUpdate=!0,ys(C,k,Y),C.side=bi):ys(C,k,Y)}this.compile=function(C,k,Y=null){Y===null&&(Y=C),T=ae.get(Y),T.init(k),v.push(T),Y.traverseVisible(function(j){j.isLight&&j.layers.test(k.layers)&&(T.pushLight(j),j.castShadow&&T.pushShadow(j))}),C!==Y&&C.traverseVisible(function(j){j.isLight&&j.layers.test(k.layers)&&(T.pushLight(j),j.castShadow&&T.pushShadow(j))}),T.setupLights();const W=new Set;return C.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const ve=j.material;if(ve)if(Array.isArray(ve))for(let Se=0;Se<ve.length;Se++){const xe=ve[Se];Jp(xe,Y,j),W.add(xe)}else Jp(ve,Y,j),W.add(ve)}),T=v.pop(),W},this.compileAsync=function(C,k,Y=null){const W=this.compile(C,k,Y);return new Promise(j=>{function ve(){if(W.forEach(function(Se){q.get(Se).currentProgram.isReady()&&W.delete(Se)}),W.size===0){j(C);return}setTimeout(ve,10)}et.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let Nc=null;function Xv(C){Nc&&Nc(C)}function eh(){Sr.stop()}function th(){Sr.start()}const Sr=new Pv;Sr.setAnimationLoop(Xv),typeof self<"u"&&Sr.setContext(self),this.setAnimationLoop=function(C){Nc=C,Ee.setAnimationLoop(C),C===null?Sr.stop():Sr.start()},Ee.addEventListener("sessionstart",eh),Ee.addEventListener("sessionend",th),this.render=function(C,k){if(k!==void 0&&k.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;O!==null&&O.renderStart(C,k);const Y=Ee.enabled===!0&&Ee.isPresenting===!0,W=R!==null&&(U===null||Y)&&R.begin(P,U);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(k),k=Ee.getCamera()),C.isScene===!0&&C.onBeforeRender(P,C,k,U),T=ae.get(C,v.length),T.init(k),T.state.textureUnits=Q.getTextureUnits(),v.push(T),yt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),tt.setFromProjectionMatrix(yt,ui,k.reversedDepth),Xe=this.localClippingEnabled,Ke=be.init(this.clippingPlanes,Xe),b=de.get(C,A.length),b.init(),A.push(b),Ee.enabled===!0&&Ee.isPresenting===!0){const Se=P.xr.getDepthSensingMesh();Se!==null&&Fc(Se,k,-1/0,P.sortObjects)}Fc(C,k,0,P.sortObjects),b.finish(),P.sortObjects===!0&&b.sort(Ue,Oe,k.reversedDepth),ft=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,ft&&ke.addToRenderList(b,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&be.beginShadows();const j=T.state.shadowsArray;if(Ne.render(j,C,k),Ke===!0&&be.endShadows(),(W&&R.hasRenderPass())===!1){const Se=b.opaque,xe=b.transmissive;if(T.setupLights(),k.isArrayCamera){const Ce=k.cameras;if(xe.length>0)for(let Re=0,Be=Ce.length;Re<Be;Re++){const Ge=Ce[Re];ih(Se,xe,C,Ge)}ft&&ke.render(C);for(let Re=0,Be=Ce.length;Re<Be;Re++){const Ge=Ce[Re];nh(b,C,Ge,Ge.viewport)}}else xe.length>0&&ih(Se,xe,C,k),ft&&ke.render(C),nh(b,C,k)}U!==null&&L===0&&(Q.updateMultisampleRenderTarget(U),Q.updateRenderTargetMipmap(U)),W&&R.end(P),C.isScene===!0&&C.onAfterRender(P,C,k),_e.resetDefaultState(),V=-1,N=null,v.pop(),v.length>0?(T=v[v.length-1],Q.setTextureUnits(T.state.textureUnits),Ke===!0&&be.setGlobalState(P.clippingPlanes,T.state.camera)):T=null,A.pop(),A.length>0?b=A[A.length-1]:b=null,O!==null&&O.renderEnd()};function Fc(C,k,Y,W){if(C.visible===!1)return;if(C.layers.test(k.layers)){if(C.isGroup)Y=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(k);else if(C.isLightProbeGrid)T.pushLightProbeGrid(C);else if(C.isLight)T.pushLight(C),C.castShadow&&T.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||tt.intersectsSprite(C)){W&&Ct.setFromMatrixPosition(C.matrixWorld).applyMatrix4(yt);const Se=te.update(C),xe=C.material;xe.visible&&b.push(C,Se,xe,Y,Ct.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||tt.intersectsObject(C))){const Se=te.update(C),xe=C.material;if(W&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ct.copy(C.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ct.copy(Se.boundingSphere.center)),Ct.applyMatrix4(C.matrixWorld).applyMatrix4(yt)),Array.isArray(xe)){const Ce=Se.groups;for(let Re=0,Be=Ce.length;Re<Be;Re++){const Ge=Ce[Re],we=xe[Ge.materialIndex];we&&we.visible&&b.push(C,Se,we,Y,Ct.z,Ge)}}else xe.visible&&b.push(C,Se,xe,Y,Ct.z,null)}}const ve=C.children;for(let Se=0,xe=ve.length;Se<xe;Se++)Fc(ve[Se],k,Y,W)}function nh(C,k,Y,W){const{opaque:j,transmissive:ve,transparent:Se}=C;T.setupLightsView(Y),Ke===!0&&be.setGlobalState(P.clippingPlanes,Y),W&&y.viewport(X.copy(W)),j.length>0&&_s(j,k,Y),ve.length>0&&_s(ve,k,Y),Se.length>0&&_s(Se,k,Y),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function ih(C,k,Y,W){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[W.id]===void 0){const we=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[W.id]=new hi(1,1,{generateMipmaps:!0,type:we?zi:yn,minFilter:Fr,samples:Math.max(4,w.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}const ve=T.state.transmissionRenderTarget[W.id],Se=W.viewport||X;ve.setSize(Se.z*P.transmissionResolutionScale,Se.w*P.transmissionResolutionScale);const xe=P.getRenderTarget(),Ce=P.getActiveCubeFace(),Re=P.getActiveMipmapLevel();P.setRenderTarget(ve),P.getClearColor(De),Ie=P.getClearAlpha(),Ie<1&&P.setClearColor(16777215,.5),P.clear(),ft&&ke.render(Y);const Be=P.toneMapping;P.toneMapping=pi;const Ge=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),T.setupLightsView(W),Ke===!0&&be.setGlobalState(P.clippingPlanes,W),_s(C,Y,W),Q.updateMultisampleRenderTarget(ve),Q.updateRenderTargetMipmap(ve),et.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let rt=0,Rt=k.length;rt<Rt;rt++){const Et=k[rt],{object:at,geometry:Yt,material:ye,group:gn}=Et;if(ye.side===bi&&at.layers.test(W.layers)){const Ze=ye.side;ye.side=mn,ye.needsUpdate=!0,rh(at,Y,W,Yt,ye,gn),ye.side=Ze,ye.needsUpdate=!0,we=!0}}we===!0&&(Q.updateMultisampleRenderTarget(ve),Q.updateRenderTargetMipmap(ve))}P.setRenderTarget(xe,Ce,Re),P.setClearColor(De,Ie),Ge!==void 0&&(W.viewport=Ge),P.toneMapping=Be}function _s(C,k,Y){const W=k.isScene===!0?k.overrideMaterial:null;for(let j=0,ve=C.length;j<ve;j++){const Se=C[j],{object:xe,geometry:Ce,group:Re}=Se;let Be=Se.material;Be.allowOverride===!0&&W!==null&&(Be=W),xe.layers.test(Y.layers)&&rh(xe,k,Y,Ce,Be,Re)}}function rh(C,k,Y,W,j,ve){C.onBeforeRender(P,k,Y,W,j,ve),C.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),j.onBeforeRender(P,k,Y,W,C,ve),j.transparent===!0&&j.side===bi&&j.forceSinglePass===!1?(j.side=mn,j.needsUpdate=!0,P.renderBufferDirect(Y,k,W,j,C,ve),j.side=Oi,j.needsUpdate=!0,P.renderBufferDirect(Y,k,W,j,C,ve),j.side=bi):P.renderBufferDirect(Y,k,W,j,C,ve),C.onAfterRender(P,k,Y,W,j,ve)}function ys(C,k,Y){k.isScene!==!0&&(k=It);const W=q.get(C),j=T.state.lights,ve=T.state.shadowsArray,Se=j.state.version,xe=he.getParameters(C,j.state,ve,k,Y,T.state.lightProbeGridArray),Ce=he.getProgramCacheKey(xe);let Re=W.programs;W.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?k.environment:null,W.fog=k.fog;const Be=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;W.envMap=le.get(C.envMap||W.environment,Be),W.envMapRotation=W.environment!==null&&C.envMap===null?k.environmentRotation:C.envMapRotation,Re===void 0&&(C.addEventListener("dispose",Jn),Re=new Map,W.programs=Re);let Ge=Re.get(Ce);if(Ge!==void 0){if(W.currentProgram===Ge&&W.lightsStateVersion===Se)return oh(C,xe),Ge}else xe.uniforms=he.getUniforms(C),O!==null&&C.isNodeMaterial&&O.build(C,Y,xe),C.onBeforeCompile(xe,P),Ge=he.acquireProgram(xe,Ce),Re.set(Ce,Ge),W.uniforms=xe.uniforms;const we=W.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(we.clippingPlanes=be.uniform),oh(C,xe),W.needsLights=Kv(C),W.lightsStateVersion=Se,W.needsLights&&(we.ambientLightColor.value=j.state.ambient,we.lightProbe.value=j.state.probe,we.directionalLights.value=j.state.directional,we.directionalLightShadows.value=j.state.directionalShadow,we.spotLights.value=j.state.spot,we.spotLightShadows.value=j.state.spotShadow,we.rectAreaLights.value=j.state.rectArea,we.ltc_1.value=j.state.rectAreaLTC1,we.ltc_2.value=j.state.rectAreaLTC2,we.pointLights.value=j.state.point,we.pointLightShadows.value=j.state.pointShadow,we.hemisphereLights.value=j.state.hemi,we.directionalShadowMatrix.value=j.state.directionalShadowMatrix,we.spotLightMatrix.value=j.state.spotLightMatrix,we.spotLightMap.value=j.state.spotLightMap,we.pointShadowMatrix.value=j.state.pointShadowMatrix),W.lightProbeGrid=T.state.lightProbeGridArray.length>0,W.currentProgram=Ge,W.uniformsList=null,Ge}function ah(C){if(C.uniformsList===null){const k=C.currentProgram.getUniforms();C.uniformsList=Nl.seqWithValue(k.seq,C.uniforms)}return C.uniformsList}function oh(C,k){const Y=q.get(C);Y.outputColorSpace=k.outputColorSpace,Y.batching=k.batching,Y.batchingColor=k.batchingColor,Y.instancing=k.instancing,Y.instancingColor=k.instancingColor,Y.instancingMorph=k.instancingMorph,Y.skinning=k.skinning,Y.morphTargets=k.morphTargets,Y.morphNormals=k.morphNormals,Y.morphColors=k.morphColors,Y.morphTargetsCount=k.morphTargetsCount,Y.numClippingPlanes=k.numClippingPlanes,Y.numIntersection=k.numClipIntersection,Y.vertexAlphas=k.vertexAlphas,Y.vertexTangents=k.vertexTangents,Y.toneMapping=k.toneMapping}function qv(C,k){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;S.setFromMatrixPosition(k.matrixWorld);for(let Y=0,W=C.length;Y<W;Y++){const j=C[Y];if(j.texture!==null&&j.boundingBox.containsPoint(S))return j}return null}function Yv(C,k,Y,W,j){k.isScene!==!0&&(k=It),Q.resetTextureUnits();const ve=k.fog,Se=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?k.environment:null,xe=U===null?P.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:qe.workingColorSpace,Ce=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Re=le.get(W.envMap||Se,Ce),Be=W.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ge=!!Y.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),we=!!Y.morphAttributes.position,rt=!!Y.morphAttributes.normal,Rt=!!Y.morphAttributes.color;let Et=pi;W.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Et=P.toneMapping);const at=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Yt=at!==void 0?at.length:0,ye=q.get(W),gn=T.state.lights;if(Ke===!0&&(Xe===!0||C!==N)){const lt=C===N&&W.id===V;be.setState(W,C,lt)}let Ze=!1;W.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==gn.state.version||ye.outputColorSpace!==xe||j.isBatchedMesh&&ye.batching===!1||!j.isBatchedMesh&&ye.batching===!0||j.isBatchedMesh&&ye.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&ye.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&ye.instancing===!1||!j.isInstancedMesh&&ye.instancing===!0||j.isSkinnedMesh&&ye.skinning===!1||!j.isSkinnedMesh&&ye.skinning===!0||j.isInstancedMesh&&ye.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&ye.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&ye.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&ye.instancingMorph===!1&&j.morphTexture!==null||ye.envMap!==Re||W.fog===!0&&ye.fog!==ve||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==be.numPlanes||ye.numIntersection!==be.numIntersection)||ye.vertexAlphas!==Be||ye.vertexTangents!==Ge||ye.morphTargets!==we||ye.morphNormals!==rt||ye.morphColors!==Rt||ye.toneMapping!==Et||ye.morphTargetsCount!==Yt||!!ye.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,ye.__version=W.version);let Cn=ye.currentProgram;Ze===!0&&(Cn=ys(W,k,j),O&&W.isNodeMaterial&&O.onUpdateProgram(W,Cn,ye));let ei=!1,Vi=!1,$r=!1;const ot=Cn.getUniforms(),wt=ye.uniforms;if(y.useProgram(Cn.program)&&(ei=!0,Vi=!0,$r=!0),W.id!==V&&(V=W.id,Vi=!0),ye.needsLights){const lt=qv(T.state.lightProbeGridArray,j);ye.lightProbeGrid!==lt&&(ye.lightProbeGrid=lt,Vi=!0)}if(ei||N!==C){y.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),ot.setValue(z,"projectionMatrix",C.projectionMatrix),ot.setValue(z,"viewMatrix",C.matrixWorldInverse);const Gi=ot.map.cameraPosition;Gi!==void 0&&Gi.setValue(z,bt.setFromMatrixPosition(C.matrixWorld)),w.logarithmicDepthBuffer&&ot.setValue(z,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ot.setValue(z,"isOrthographic",C.isOrthographicCamera===!0),N!==C&&(N=C,Vi=!0,$r=!0)}if(ye.needsLights&&(gn.state.directionalShadowMap.length>0&&ot.setValue(z,"directionalShadowMap",gn.state.directionalShadowMap,Q),gn.state.spotShadowMap.length>0&&ot.setValue(z,"spotShadowMap",gn.state.spotShadowMap,Q),gn.state.pointShadowMap.length>0&&ot.setValue(z,"pointShadowMap",gn.state.pointShadowMap,Q)),j.isSkinnedMesh){ot.setOptional(z,j,"bindMatrix"),ot.setOptional(z,j,"bindMatrixInverse");const lt=j.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),ot.setValue(z,"boneTexture",lt.boneTexture,Q))}j.isBatchedMesh&&(ot.setOptional(z,j,"batchingTexture"),ot.setValue(z,"batchingTexture",j._matricesTexture,Q),ot.setOptional(z,j,"batchingIdTexture"),ot.setValue(z,"batchingIdTexture",j._indirectTexture,Q),ot.setOptional(z,j,"batchingColorTexture"),j._colorsTexture!==null&&ot.setValue(z,"batchingColorTexture",j._colorsTexture,Q));const Hi=Y.morphAttributes;if((Hi.position!==void 0||Hi.normal!==void 0||Hi.color!==void 0)&&F.update(j,Y,Cn),(Vi||ye.receiveShadow!==j.receiveShadow)&&(ye.receiveShadow=j.receiveShadow,ot.setValue(z,"receiveShadow",j.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&k.environment!==null&&(wt.envMapIntensity.value=k.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=vA()),Vi){if(ot.setValue(z,"toneMappingExposure",P.toneMappingExposure),ye.needsLights&&$v(wt,$r),ve&&W.fog===!0&&Te.refreshFogUniforms(wt,ve),Te.refreshMaterialUniforms(wt,W,oe,re,T.state.transmissionRenderTarget[C.id]),ye.needsLights&&ye.lightProbeGrid){const lt=ye.lightProbeGrid;wt.probesSH.value=lt.texture,wt.probesMin.value.copy(lt.boundingBox.min),wt.probesMax.value.copy(lt.boundingBox.max),wt.probesResolution.value.copy(lt.resolution)}Nl.upload(z,ah(ye),wt,Q)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Nl.upload(z,ah(ye),wt,Q),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ot.setValue(z,"center",j.center),ot.setValue(z,"modelViewMatrix",j.modelViewMatrix),ot.setValue(z,"normalMatrix",j.normalMatrix),ot.setValue(z,"modelMatrix",j.matrixWorld),W.uniformsGroups!==void 0){const lt=W.uniformsGroups;for(let Gi=0,Kr=lt.length;Gi<Kr;Gi++){const sh=lt[Gi];ie.update(sh,Cn),ie.bind(sh,Cn)}}return Cn}function $v(C,k){C.ambientLightColor.needsUpdate=k,C.lightProbe.needsUpdate=k,C.directionalLights.needsUpdate=k,C.directionalLightShadows.needsUpdate=k,C.pointLights.needsUpdate=k,C.pointLightShadows.needsUpdate=k,C.spotLights.needsUpdate=k,C.spotLightShadows.needsUpdate=k,C.rectAreaLights.needsUpdate=k,C.hemisphereLights.needsUpdate=k}function Kv(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(C,k,Y){const W=q.get(C);W.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),q.get(C.texture).__webglTexture=k,q.get(C.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Y,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,k){const Y=q.get(C);Y.__webglFramebuffer=k,Y.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(C,k=0,Y=0){U=C,G=k,L=Y;let W=null,j=!1,ve=!1;if(C){const xe=q.get(C);if(xe.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(z.FRAMEBUFFER,xe.__webglFramebuffer),X.copy(C.viewport),Z.copy(C.scissor),ce=C.scissorTest,y.viewport(X),y.scissor(Z),y.setScissorTest(ce),V=-1;return}else if(xe.__webglFramebuffer===void 0)Q.setupRenderTarget(C);else if(xe.__hasExternalTextures)Q.rebindTextures(C,q.get(C.texture).__webglTexture,q.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Be=C.depthTexture;if(xe.__boundDepthTexture!==Be){if(Be!==null&&q.has(Be)&&(C.width!==Be.image.width||C.height!==Be.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(C)}}const Ce=C.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(ve=!0);const Re=q.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Re[k])?W=Re[k][Y]:W=Re[k],j=!0):C.samples>0&&Q.useMultisampledRTT(C)===!1?W=q.get(C).__webglMultisampledFramebuffer:Array.isArray(Re)?W=Re[Y]:W=Re,X.copy(C.viewport),Z.copy(C.scissor),ce=C.scissorTest}else X.copy(Le).multiplyScalar(oe).floor(),Z.copy(ht).multiplyScalar(oe).floor(),ce=He;if(Y!==0&&(W=$),y.bindFramebuffer(z.FRAMEBUFFER,W)&&y.drawBuffers(C,W),y.viewport(X),y.scissor(Z),y.setScissorTest(ce),j){const xe=q.get(C.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+k,xe.__webglTexture,Y)}else if(ve){const xe=k;for(let Ce=0;Ce<C.textures.length;Ce++){const Re=q.get(C.textures[Ce]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ce,Re.__webglTexture,Y,xe)}}else if(C!==null&&Y!==0){const xe=q.get(C.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,xe.__webglTexture,Y)}V=-1},this.readRenderTargetPixels=function(C,k,Y,W,j,ve,Se,xe=0){if(!(C&&C.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=q.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Se!==void 0&&(Ce=Ce[Se]),Ce){y.bindFramebuffer(z.FRAMEBUFFER,Ce);try{const Re=C.textures[xe],Be=Re.format,Ge=Re.type;if(C.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+xe),!w.textureFormatReadable(Be)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(Ge)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=C.width-W&&Y>=0&&Y<=C.height-j&&z.readPixels(k,Y,W,j,me.convert(Be),me.convert(Ge),ve)}finally{const Re=U!==null?q.get(U).__webglFramebuffer:null;y.bindFramebuffer(z.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(C,k,Y,W,j,ve,Se,xe=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=q.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Se!==void 0&&(Ce=Ce[Se]),Ce)if(k>=0&&k<=C.width-W&&Y>=0&&Y<=C.height-j){y.bindFramebuffer(z.FRAMEBUFFER,Ce);const Re=C.textures[xe],Be=Re.format,Ge=Re.type;if(C.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+xe),!w.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const we=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,we),z.bufferData(z.PIXEL_PACK_BUFFER,ve.byteLength,z.STREAM_READ),z.readPixels(k,Y,W,j,me.convert(Be),me.convert(Ge),0);const rt=U!==null?q.get(U).__webglFramebuffer:null;y.bindFramebuffer(z.FRAMEBUFFER,rt);const Rt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await NS(z,Rt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,we),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ve),z.deleteBuffer(we),z.deleteSync(Rt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,k=null,Y=0){const W=Math.pow(2,-Y),j=Math.floor(C.image.width*W),ve=Math.floor(C.image.height*W),Se=k!==null?k.x:0,xe=k!==null?k.y:0;Q.setTexture2D(C,0),z.copyTexSubImage2D(z.TEXTURE_2D,Y,0,0,Se,xe,j,ve),y.unbindTexture()},this.copyTextureToTexture=function(C,k,Y=null,W=null,j=0,ve=0){let Se,xe,Ce,Re,Be,Ge,we,rt,Rt;const Et=C.isCompressedTexture?C.mipmaps[ve]:C.image;if(Y!==null)Se=Y.max.x-Y.min.x,xe=Y.max.y-Y.min.y,Ce=Y.isBox3?Y.max.z-Y.min.z:1,Re=Y.min.x,Be=Y.min.y,Ge=Y.isBox3?Y.min.z:0;else{const wt=Math.pow(2,-j);Se=Math.floor(Et.width*wt),xe=Math.floor(Et.height*wt),C.isDataArrayTexture?Ce=Et.depth:C.isData3DTexture?Ce=Math.floor(Et.depth*wt):Ce=1,Re=0,Be=0,Ge=0}W!==null?(we=W.x,rt=W.y,Rt=W.z):(we=0,rt=0,Rt=0);const at=me.convert(k.format),Yt=me.convert(k.type);let ye;k.isData3DTexture?(Q.setTexture3D(k,0),ye=z.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Q.setTexture2DArray(k,0),ye=z.TEXTURE_2D_ARRAY):(Q.setTexture2D(k,0),ye=z.TEXTURE_2D),y.activeTexture(z.TEXTURE0),y.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,k.flipY),y.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),y.pixelStorei(z.UNPACK_ALIGNMENT,k.unpackAlignment);const gn=y.getParameter(z.UNPACK_ROW_LENGTH),Ze=y.getParameter(z.UNPACK_IMAGE_HEIGHT),Cn=y.getParameter(z.UNPACK_SKIP_PIXELS),ei=y.getParameter(z.UNPACK_SKIP_ROWS),Vi=y.getParameter(z.UNPACK_SKIP_IMAGES);y.pixelStorei(z.UNPACK_ROW_LENGTH,Et.width),y.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Et.height),y.pixelStorei(z.UNPACK_SKIP_PIXELS,Re),y.pixelStorei(z.UNPACK_SKIP_ROWS,Be),y.pixelStorei(z.UNPACK_SKIP_IMAGES,Ge);const $r=C.isDataArrayTexture||C.isData3DTexture,ot=k.isDataArrayTexture||k.isData3DTexture;if(C.isDepthTexture){const wt=q.get(C),Hi=q.get(k),lt=q.get(wt.__renderTarget),Gi=q.get(Hi.__renderTarget);y.bindFramebuffer(z.READ_FRAMEBUFFER,lt.__webglFramebuffer),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,Gi.__webglFramebuffer);for(let Kr=0;Kr<Ce;Kr++)$r&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,q.get(C).__webglTexture,j,Ge+Kr),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,q.get(k).__webglTexture,ve,Rt+Kr)),z.blitFramebuffer(Re,Be,Se,xe,we,rt,Se,xe,z.DEPTH_BUFFER_BIT,z.NEAREST);y.bindFramebuffer(z.READ_FRAMEBUFFER,null),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(j!==0||C.isRenderTargetTexture||q.has(C)){const wt=q.get(C),Hi=q.get(k);y.bindFramebuffer(z.READ_FRAMEBUFFER,ee),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,D);for(let lt=0;lt<Ce;lt++)$r?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,wt.__webglTexture,j,Ge+lt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,wt.__webglTexture,j),ot?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Hi.__webglTexture,ve,Rt+lt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Hi.__webglTexture,ve),j!==0?z.blitFramebuffer(Re,Be,Se,xe,we,rt,Se,xe,z.COLOR_BUFFER_BIT,z.NEAREST):ot?z.copyTexSubImage3D(ye,ve,we,rt,Rt+lt,Re,Be,Se,xe):z.copyTexSubImage2D(ye,ve,we,rt,Re,Be,Se,xe);y.bindFramebuffer(z.READ_FRAMEBUFFER,null),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else ot?C.isDataTexture||C.isData3DTexture?z.texSubImage3D(ye,ve,we,rt,Rt,Se,xe,Ce,at,Yt,Et.data):k.isCompressedArrayTexture?z.compressedTexSubImage3D(ye,ve,we,rt,Rt,Se,xe,Ce,at,Et.data):z.texSubImage3D(ye,ve,we,rt,Rt,Se,xe,Ce,at,Yt,Et):C.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,ve,we,rt,Se,xe,at,Yt,Et.data):C.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,ve,we,rt,Et.width,Et.height,at,Et.data):z.texSubImage2D(z.TEXTURE_2D,ve,we,rt,Se,xe,at,Yt,Et);y.pixelStorei(z.UNPACK_ROW_LENGTH,gn),y.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ze),y.pixelStorei(z.UNPACK_SKIP_PIXELS,Cn),y.pixelStorei(z.UNPACK_SKIP_ROWS,ei),y.pixelStorei(z.UNPACK_SKIP_IMAGES,Vi),ve===0&&k.generateMipmaps&&z.generateMipmap(ye),y.unbindTexture()},this.initRenderTarget=function(C){q.get(C).__webglFramebuffer===void 0&&Q.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Q.setTextureCube(C,0):C.isData3DTexture?Q.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Q.setTexture2DArray(C,0):Q.setTexture2D(C,0),y.unbindTexture()},this.resetState=function(){G=0,L=0,U=null,y.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),n.unpackColorSpace=qe._getUnpackColorSpace()}}const E0={default:{id:"default",model:"W22 Plus IE3",poles:4,powerCv:"1.5 cv",powerKw:"1.1 kW",voltage:"220 / 380 V",current:"4.50 / 2.60 A",frequency:"60 Hz",syncRpm:1800,nominalRpm:1750,efficiency:"84.5%",powerFactor:"0.81",serviceFactor:"1.15",protection:"IP55",isolation:"Cl. F"},high_speed:{id:"high_speed",model:"W21 2 Polos",poles:2,powerCv:"1.0 cv",powerKw:"0.75 kW",voltage:"220 / 380 V",current:"3.10 / 1.80 A",frequency:"60 Hz",syncRpm:3600,nominalRpm:3480,efficiency:"82.0%",powerFactor:"0.85",serviceFactor:"1.15",protection:"IP55",isolation:"Cl. F"},heavy_duty:{id:"heavy_duty",model:"W22 Premium IE4",poles:4,powerCv:"3.0 cv",powerKw:"2.2 kW",voltage:"220 / 380 V",current:"8.40 / 4.85 A",frequency:"60 Hz",syncRpm:1800,nominalRpm:1745,efficiency:"89.5%",powerFactor:"0.83",serviceFactor:"1.25",protection:"IP66",isolation:"Cl. H"}},So=({loadTorquePercent:t=0,customNameplate:e})=>{const{state:n}=Zn(),i=ue.useRef(null),[r,a]=ue.useState("default"),[o,s]=ue.useState(!1),l=e||E0[r]||E0.default,c=ue.useRef(n);c.current=n;const p=ue.useRef(l);p.current=l;const h=ue.useRef(null),u=ue.useRef(null),m=ue.useRef(null),_=ue.useRef(null),E=ue.useRef(null),g=ue.useRef(!1),d=ue.useRef({x:0,y:0}),x=ue.useRef({theta:Math.PI/4,phi:Math.PI/3,radius:4.2}),M=D=>{var N,X,Z,ce,De;if(!D)return!1;if(D.isForwardDirection===!1||D.rotationDirection==="REV"||D.direction==="REV"||D.motorDirection==="REV"||D.localDirection==="REV"||D.isReverse===!0)return!0;const G=(N=D.parameters)==null?void 0:N.P0223;if(Number(typeof G=="object"?(G==null?void 0:G.currentValue)??(G==null?void 0:G.value)??0:G??0)===1||typeof D.outputFrequency=="number"&&D.outputFrequency<0||typeof D.targetFrequency=="number"&&D.targetFrequency<0)return!0;const U=D.controlSource==="REM"||D.isLocal===!1,V=!!((X=D.digitalInputs)!=null&&X[1]||(Z=D.digitalInputs)!=null&&Z.DI2||(ce=D.digitalInputs)!=null&&ce.di2||(De=D.digitalInputs)!=null&&De["2"]);return!!(U&&V)},S=Math.abs(Number(n.outputFrequency??0)),b=M(n),T=(n.motorStatus==="RUNNING"||S>.1)&&n.motorStatus!=="FAULT",A=Math.round(S/60*l.nominalRpm),v=n.outputCurrent??(T?(1.2+S/60*3.3).toFixed(1):"0.0"),R=()=>{if(!u.current)return;const{theta:D,phi:G,radius:L}=x.current;u.current.position.x=L*Math.sin(G)*Math.sin(D),u.current.position.y=L*Math.cos(G),u.current.position.z=L*Math.sin(G)*Math.cos(D),u.current.lookAt(0,0,0)},P=D=>{const G=document.createElement("canvas");G.width=2048,G.height=1024;const L=G.getContext("2d",{alpha:!1});L&&(L.imageSmoothingEnabled=!0,L.imageSmoothingQuality="high",L.fillStyle="#f8f9fa",L.fillRect(0,0,2048,1024),L.strokeStyle="#1e272e",L.lineWidth=24,L.strokeRect(16,16,2016,992),L.fillStyle="#005ea6",L.fillRect(32,32,1984,180),L.fillStyle="#ffffff",L.font="900 110px Arial, sans-serif",L.fillText("WEG",70,160),L.font="bold 70px Arial, sans-serif",L.fillText(`MOTOR DE INDUÇÃO 3~ | ${D.model}`,380,150),L.strokeStyle="#005ea6",L.lineWidth=6,L.beginPath(),L.moveTo(40,230),L.lineTo(2008,230),L.stroke(),L.fillStyle="#000000",L.font='bold 58px "Courier New", monospace',L.fillText(`POTÊNCIA: ${D.powerCv} (${D.powerKw})`,70,320),L.fillText(`POLOS: ${D.poles}P`,1200,320),L.fillText(`TENSÃO: ${D.voltage}`,70,440),L.fillText(`CORRENTE: ${D.current}`,1200,440),L.fillText(`FREQ: ${D.frequency}   FS: ${D.serviceFactor}`,70,560),L.fillText(`ROTAÇÃO: ${D.nominalRpm} RPM`,1200,560),L.fillText(`REND(η): ${D.efficiency}   COS φ: ${D.powerFactor}`,70,680),L.fillText(`ISOLAMENTO: ${D.isolation}`,1200,680),L.fillText(`GRAU PROT: ${D.protection}`,70,800),L.fillText("REGIME: S1 CONTÍNUO",1200,800),L.fillStyle="#2f3542",L.font="bold 46px Arial, sans-serif",L.fillText("FABRICADO NO BRASIL - NBR 17094 / IEC 60034",70,950),L.fillText("PADRÃO INDUSTRIAL",1400,950));const U=new lM(G);return U.generateMipmaps=!1,U.minFilter=Vt,U.magFilter=Vt,U.anisotropy=16,U.needsUpdate=!0,U};ue.useEffect(()=>{if(E.current&&m.current){const D=P(l);D.anisotropy=m.current.capabilities.getMaxAnisotropy(),E.current.material.map=D,E.current.material.needsUpdate=!0}},[l]),ue.useEffect(()=>{if(!i.current)return;const D=i.current.clientWidth||300,G=i.current.clientHeight||250,L=new KS;h.current=L,L.background=new We("#0a0d12");const U=new Ln(45,D/G,.1,100);u.current=U,R();const V=new _A({antialias:!0,alpha:!0,powerPreference:"high-performance"});V.setSize(D,G),V.setPixelRatio(Math.min(window.devicePixelRatio,2)),V.shadowMap.enabled=!0,m.current=V,i.current.appendChild(V.domElement);const N=new _M(16777215,.9);L.add(N);const X=new Zm(16777215,1.4);X.position.set(5,8,6),L.add(X);const Z=new Zm(8508666,.8);Z.position.set(-5,-2,-5),L.add(Z);const ce=new ca({color:24230,roughness:.35,metalness:.25}),De=new ca({color:1976110,roughness:.6,metalness:.4}),Ie=new ca({color:14474721,roughness:.2,metalness:.85}),K=new ca({color:3094080,roughness:.4,metalness:.7}),re=new Pa;L.add(re);const oe=new Pr(.85,.85,1.8,32);oe.rotateZ(Math.PI/2);const Ue=new Lt(oe,ce);re.add(Ue);for(let de=-.7;de<=.7;de+=.14){const ae=new Pr(.92,.92,.04,32);ae.rotateZ(Math.PI/2);const be=new Lt(ae,ce);be.position.x=de,re.add(be)}const Oe=new Pr(.86,.86,.5,32);Oe.rotateZ(Math.PI/2);const Le=new Lt(Oe,De);Le.position.x=-1.1,re.add(Le);const ht=new wi(.6,.35,.55),He=new Lt(ht,ce);He.position.set(0,.95,0),re.add(He);const tt=new wi(1.6,.15,.3),Ke=new Lt(tt,De);Ke.position.set(0,-.85,.65),re.add(Ke);const Xe=new Lt(tt,De);Xe.position.set(0,-.85,-.65),re.add(Xe);const yt=new wi(.98,.54,.04),bt=new ca({color:1119773,roughness:.5,metalness:.6}),Ct=new Lt(yt,bt);Ct.position.set(0,.05,.94),re.add(Ct);const It=P(p.current);It.anisotropy=V.capabilities.getMaxAnisotropy();const ft=new vs(.94,.5),St=new ca({map:It,roughness:.2,metalness:.1,side:Oi}),z=new Lt(ft,St);z.position.set(0,.05,.963),E.current=z,re.add(z);const At=new Pa;_.current=At,At.position.set(.9,0,0),re.add(At);const et=new Pr(.18,.18,.8,24);et.rotateZ(Math.PI/2);const w=new Lt(et,Ie);w.position.x=.3,At.add(w);const y=new Pr(.5,.5,.3,32);y.rotateZ(Math.PI/2);const B=new Lt(y,K);B.position.x=.55,At.add(B);const q=new wi(.32,.08,.52),Q=new Gp({color:16717636}),le=new Lt(q,Q);le.position.x=.55,At.add(le);const fe=new EM(6,12,166097,2042167);fe.position.y=-.93,L.add(fe);const J=new MM;let te;const he=()=>{te=requestAnimationFrame(he);const de=J.getDelta(),ae=c.current,be=Math.abs(Number((ae==null?void 0:ae.outputFrequency)??0)),Ne=((ae==null?void 0:ae.motorStatus)==="RUNNING"||be>.1)&&(ae==null?void 0:ae.motorStatus)!=="FAULT";if(_.current&&Ne){const F=M(ae)?-1:1,pe=be/60*p.current.nominalRpm,me=2*Math.PI*pe/60*.35;_.current.rotation.x+=me*de*F}V.render(L,U)};he();const Te=()=>{if(!i.current||!m.current||!u.current)return;const de=i.current.clientWidth,ae=i.current.clientHeight;u.current.aspect=de/ae,u.current.updateProjectionMatrix(),m.current.setSize(de,ae)};return window.addEventListener("resize",Te),()=>{cancelAnimationFrame(te),window.removeEventListener("resize",Te),i.current&&V.domElement&&i.current.removeChild(V.domElement),V.dispose()}},[]);const I=D=>{g.current=!0,d.current={x:D.clientX,y:D.clientY}},O=D=>{if(!g.current)return;const G=D.clientX-d.current.x,L=D.clientY-d.current.y;x.current.theta-=G*.008,x.current.phi=Math.max(.1,Math.min(Math.PI/2-.05,x.current.phi-L*.008)),R(),d.current={x:D.clientX,y:D.clientY}},$=()=>{g.current=!1},ee=(D,G,L=4.2)=>{x.current={theta:D,phi:G,radius:L},R()};return f.jsxs("div",{style:yA,children:[f.jsxs("div",{style:SA,children:[f.jsxs("div",{children:[f.jsx("strong",{style:{fontSize:"12px",color:"#fff"},children:"Motor de Indução WEG (3D Realista)"}),f.jsxs("span",{style:{fontSize:"10px",color:"#90a4ae",display:"block"},children:["🖱️ Arraste para girar em 360° | Placa: ",l.model," (",l.powerCv,")"]})]}),f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap"},children:[f.jsxs("select",{value:r,onChange:D=>a(D.target.value),style:MA,title:"Escolha a placa de identificação para estudos e exercícios práticos",children:[f.jsx("option",{value:"default",children:"🏷️ WEG W22 1.5cv 4P (Padrão)"}),f.jsx("option",{value:"high_speed",children:"🏷️ WEG W21 1.0cv 2P (Alta Vel.)"}),f.jsx("option",{value:"heavy_duty",children:"🏷️ WEG W22 3.0cv 4P (Industrial)"})]}),f.jsx("button",{onClick:()=>ee(Math.PI/4,Math.PI/3),style:Yu,children:"📐 Isométrica"}),f.jsx("button",{onClick:()=>ee(0,Math.PI/2.05,2.3),style:{...Yu,background:"#0288d1",color:"#fff"},title:"Aproxima a câmera 3D na placa",children:"🔍 Foco 3D"}),f.jsx("button",{onClick:()=>s(!0),style:{...Yu,background:"#00e676",color:"#000"},title:"Abre a placa em tela cheia 100% nítida",children:"📄 Ver Placa Completa"})]})]}),f.jsx("div",{ref:i,style:EA,onMouseDown:I,onMouseMove:O,onMouseUp:$,onMouseLeave:$}),f.jsxs("div",{style:TA,children:[f.jsxs("div",{style:Mo,children:[f.jsx("span",{style:Eo,children:"FREQUÊNCIA"}),f.jsxs("strong",{style:{color:"#00e676",fontSize:"13px"},children:[S.toFixed(1)," Hz"]})]}),f.jsxs("div",{style:Mo,children:[f.jsx("span",{style:Eo,children:"SENTIDO DE GIRO"}),f.jsx("strong",{style:{color:b?"#ffb74d":"#81d4fa",fontSize:"13px"},children:b?"↺ ANTI-HORÁRIO (REV)":"↻ HORÁRIO (FWD)"})]}),f.jsxs("div",{style:Mo,children:[f.jsx("span",{style:Eo,children:"VELOCIDADE"}),f.jsxs("strong",{style:{color:"#81d4fa",fontSize:"13px"},children:[A," RPM"]})]}),f.jsxs("div",{style:Mo,children:[f.jsx("span",{style:Eo,children:"CORRENTE"}),f.jsxs("strong",{style:{color:"#ffb74d",fontSize:"13px"},children:[v," A"]})]}),f.jsxs("div",{style:Mo,children:[f.jsx("span",{style:Eo,children:"CARGA NO EIXO"}),f.jsxs("strong",{style:{color:"#f06292",fontSize:"13px"},children:[t,"%"]})]})]}),o&&f.jsx("div",{style:bA,onClick:()=>s(!1),children:f.jsxs("div",{style:CA,onClick:D=>D.stopPropagation(),children:[f.jsxs("div",{style:AA,children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[f.jsx("span",{style:{fontSize:"20px",fontWeight:"900",color:"#fff",background:"#005ea6",padding:"2px 8px",borderRadius:"4px"},children:"WEG"}),f.jsxs("strong",{style:{fontSize:"14px",color:"#fff"},children:["Placa de Identificação Oficial • ",l.model]})]}),f.jsx("button",{onClick:()=>s(!1),style:RA,children:"✕"})]}),f.jsxs("div",{style:wA,children:[f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Modelo:"}),f.jsx("strong",{children:l.model})]}),f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Potência:"}),f.jsxs("strong",{children:[l.powerCv," (",l.powerKw,")"]})]}),f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Tensão Nominal:"}),f.jsx("strong",{children:l.voltage})]}),f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Corrente Nominal:"}),f.jsx("strong",{children:l.current})]}),f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Frequência:"}),f.jsx("strong",{children:l.frequency})]}),f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Rotação Nominal:"}),f.jsxs("strong",{children:[l.nominalRpm," RPM"]})]}),f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Número de Polos:"}),f.jsxs("strong",{children:[l.poles," Polos"]})]}),f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Fator de Serviço:"}),f.jsx("strong",{children:l.serviceFactor})]}),f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Rendimento (η):"}),f.jsx("strong",{children:l.efficiency})]}),f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Fator de Potência (Cos φ):"}),f.jsx("strong",{children:l.powerFactor})]}),f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Grau de Proteção:"}),f.jsx("strong",{children:l.protection})]}),f.jsxs("div",{style:Rn,children:[f.jsx("span",{children:"Classe de Isolamento:"}),f.jsx("strong",{children:l.isolation})]})]}),f.jsx("div",{style:{marginTop:"12px",textAlign:"right"},children:f.jsx("button",{onClick:()=>s(!1),style:PA,children:"Fechar Leitura"})})]})})]})},yA={background:"#11151a",border:"1px solid #252e3b",borderRadius:"12px",padding:"12px",display:"flex",flexDirection:"column",gap:"10px",width:"100%",boxSizing:"border-box",position:"relative"},SA={display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #21262d",paddingBottom:"8px",flexWrap:"wrap",gap:"8px"},MA={background:"#161b22",border:"1px solid #30363d",color:"#81d4fa",borderRadius:"6px",padding:"4px 8px",fontSize:"10px",fontWeight:"bold",cursor:"pointer",outline:"none"},Yu={background:"#1f2937",border:"1px solid #374151",borderRadius:"6px",color:"#b0bec5",padding:"4px 8px",fontSize:"10px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s ease"},EA={width:"100%",height:"250px",borderRadius:"8px",overflow:"hidden",cursor:"grab",userSelect:"none"},TA={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))",gap:"8px"},Mo={background:"#161b22",border:"1px solid #21262d",borderRadius:"6px",padding:"6px 8px",display:"flex",flexDirection:"column",gap:"2px"},Eo={fontSize:"9px",color:"#90a4ae",fontWeight:"bold"},bA={position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"16px"},CA={background:"#131922",border:"2px solid #0288d1",borderRadius:"12px",padding:"16px",maxWidth:"520px",width:"100%",boxShadow:"0 8px 32px rgba(0,0,0,0.7)"},AA={display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #252f3d",paddingBottom:"10px",marginBottom:"12px"},RA={background:"transparent",border:"none",color:"#90a4ae",fontSize:"16px",cursor:"pointer",fontWeight:"bold"},wA={display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"},Rn={background:"#0d1117",border:"1px solid #21262d",borderRadius:"6px",padding:"6px 8px",display:"flex",flexDirection:"column",gap:"2px",fontSize:"11px",color:"#cfd8dc"},PA={background:"#0288d1",border:"none",borderRadius:"6px",color:"#fff",padding:"6px 14px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},T0=()=>{const{state:t,dispatch:e}=Zn(),[n,i]=ue.useState(0),r=o=>{const s=!t.digitalInputs[o];e({type:"SET_DIGITAL_INPUT",payload:{input:o,value:s}})},a=t.controlSource==="REM";return f.jsxs("div",{style:IA,children:[f.jsxs("div",{style:DA,children:[f.jsx("strong",{children:"RÉGUA DE BORNES I/O"}),f.jsx("span",{style:{fontSize:"11px",color:a?"#00e676":"#ffa726"},children:a?"REMOTO ATIVO":"LOCAL ATIVO"})]}),f.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(8, 1fr)",gap:"4px",background:"#121417",padding:"6px",borderRadius:"6px",marginBottom:"10px"},children:["+10V","AI1","GND","+24V","DI1","DI2","DI3","DI4"].map((o,s)=>f.jsxs("div",{style:{textAlign:"center",background:"#252a33",padding:"4px 0",borderRadius:"4px",fontSize:"10px"},children:[f.jsx("span",{style:{color:"#64b5f6",fontWeight:"bold"},children:s+1}),f.jsx("br",{}),o]},o))}),f.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"6px",marginBottom:"10px"},children:["di1","di2","di3","di4"].map(o=>f.jsxs("button",{onClick:()=>r(o),style:{padding:"6px 4px",borderRadius:"4px",border:"none",fontSize:"11px",fontWeight:"bold",color:"#fff",background:t.digitalInputs[o]?"#2e7d32":"#374151",cursor:"pointer"},children:[o.toUpperCase(),": ",t.digitalInputs[o]?"ON":"OFF"]},o))}),f.jsxs("div",{children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px",marginBottom:"4px"},children:[f.jsx("span",{children:"Entrada Analógica AI1 (0 a 10V):"}),f.jsxs("strong",{style:{color:"#64b5f6"},children:[n.toFixed(2)," V"]})]}),f.jsx("input",{type:"range",min:"0",max:"10",step:"0.1",value:n,onChange:o=>{const s=parseFloat(o.target.value);i(s),e({type:"SET_ANALOG_INPUT_1",payload:s})},style:{width:"100%",cursor:"pointer",accentColor:"#0288d1"}})]})]})},IA={background:"#1a1d21",border:"1px solid #323842",borderRadius:"12px",padding:"14px",flex:1,minWidth:"280px"},DA={display:"flex",justifyContent:"space-between",fontSize:"13px",borderBottom:"1px solid #2a2f38",paddingBottom:"6px",marginBottom:"10px"},b0=(t,e)=>{switch(t){case 13:return e.activeFault===null;case 14:return e.activeFault!==null;case 15:return e.motorStatus==="RUNNING"&&e.outputFrequency>.1;case 2:return e.motorStatus==="RUNNING"&&Math.abs(e.outputFrequency-e.parameters.P0121.currentValue)<=.1;default:return!1}},LA=()=>{const{state:t}=Zn(),e=b0(t.parameters.P0275.currentValue,t),n=b0(t.parameters.P0277.currentValue,t);return f.jsxs("div",{style:{background:"#1a1d21",border:"1px solid #323842",borderRadius:"12px",padding:"14px",flex:1,minWidth:"280px"},children:[f.jsx("div",{style:{fontSize:"13px",fontWeight:"bold",borderBottom:"1px solid #2a2f38",paddingBottom:"6px",marginBottom:"10px"},children:"SAÍDAS A RELÉ (RL1 / RL2)"}),f.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"},children:[f.jsxs("div",{style:{background:"#141619",padding:"10px",borderRadius:"6px",display:"flex",alignItems:"center",gap:"10px"},children:[f.jsx("div",{style:{width:24,height:24,borderRadius:"50%",background:e?"#00e676":"#1b5e20",boxShadow:e?"0 0 12px #00e676":"none"}}),f.jsxs("div",{children:[f.jsx("strong",{style:{fontSize:"12px"},children:"RL1 (RUN)"}),f.jsx("div",{style:{fontSize:"10px",color:"#888"},children:e?"FECHADO":"ABERTO"})]})]}),f.jsxs("div",{style:{background:"#141619",padding:"10px",borderRadius:"6px",display:"flex",alignItems:"center",gap:"10px"},children:[f.jsx("div",{style:{width:24,height:24,borderRadius:"50%",background:n?"#ff1744":"#b71c1c",boxShadow:n?"0 0 12px #ff1744":"none"}}),f.jsxs("div",{children:[f.jsx("strong",{style:{fontSize:"12px"},children:"RL2 (FALHA)"}),f.jsx("div",{style:{fontSize:"10px",color:"#888"},children:n?"FECHADO":"ABERTO"})]})]})]})]})},NA=[{code:"F006",name:"Sobrecorrente / Curto-Circuito",description:"Corrente de saída ultrapassou o limite máximo dos IGBTs.",autoResetable:!1},{code:"F021",name:"Subtensão no Barramento CC",description:"Tensão do link CC caiu abaixo do limite operacional.",autoResetable:!0},{code:"F022",name:"Sobretensão no Barramento CC",description:"Regeneração excessiva de energia pelo motor.",autoResetable:!1},{code:"F070",name:"Sobretemperatura no Dissipador",description:"Temperatura dos módulos de potência excedeu o limite seguro.",autoResetable:!0}],$u=()=>{const{state:t,dispatch:e}=Zn();return f.jsxs("div",{style:FA,children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #2a2f38",paddingBottom:"6px"},children:[f.jsx("strong",{style:{fontSize:"13px",color:"#ff5252"},children:"⚠️ INJEÇÃO DE FALHAS & DIAGNÓSTICO"}),t.activeFault?f.jsxs("span",{style:{fontSize:"11px",color:"#ff5252",fontWeight:"bold"},children:["FALHA ATIVA: ",t.activeFault.code]}):f.jsx("span",{style:{fontSize:"11px",color:"#00e676",fontWeight:"bold"},children:"SISTEMA SAUDÁVEL (NORMAL)"})]}),f.jsx("div",{style:UA,children:NA.map(n=>{var r;const i=((r=t.activeFault)==null?void 0:r.code)===n.code;return f.jsxs("button",{onClick:()=>e({type:"TRIGGER_FAULT",payload:n}),style:{...OA,background:i?"#b71c1c":"#21262d",borderColor:i?"#ff1744":"#30363d",color:i?"#fff":"#c9d1d9"},title:n.description,children:[f.jsx("strong",{children:n.code}),f.jsx("span",{style:{fontSize:"10px"},children:n.name})]},n.code)})}),f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"4px"},children:[f.jsx("small",{style:{color:"#8b949e",fontSize:"10px"},children:'Para limpar falhas: use o botão abaixo ou pressione a tecla "O" na IHM.'}),f.jsx("button",{onClick:()=>e({type:"RESET_FAULT"}),disabled:!t.activeFault,style:{...zA,background:t.activeFault?"#0277bd":"#1c2128",opacity:t.activeFault?1:.4,cursor:t.activeFault?"pointer":"not-allowed"},children:"🔄 Resetar Falhas"})]})]})},FA={background:"#161b22",border:"1px solid #30363d",borderRadius:"12px",padding:"14px",display:"flex",flexDirection:"column",gap:"10px",width:"100%",boxSizing:"border-box"},UA={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"8px"},OA={padding:"8px 10px",borderRadius:"6px",border:"1px solid",display:"flex",flexDirection:"column",alignItems:"flex-start",cursor:"pointer",textAlign:"left"},zA={padding:"6px 14px",color:"#fff",border:"none",borderRadius:"6px",fontWeight:"bold",fontSize:"11px"},kA=({isMuted:t=!1,masterVolume:e=.3}={})=>{const{state:n}=Zn(),i=ue.useRef(null),r=ue.useRef(null),a=ue.useRef(null),o=ue.useRef(null),s=ue.useRef(null),l=ue.useRef(null),c=()=>{if(i.current){i.current.state==="suspended"&&i.current.resume();return}const h=window.AudioContext||window.webkitAudioContext,u=new h;i.current=u;const m=u.createGain();m.gain.setValueAtTime(t?0:e,u.currentTime),m.connect(u.destination),r.current=m;const _=u.createOscillator();_.type="sine",_.frequency.setValueAtTime(4e3,u.currentTime);const E=u.createGain();E.gain.setValueAtTime(0,u.currentTime),_.connect(E),E.connect(m),_.start(),a.current=E;const g=u.createOscillator();g.type="triangle",g.frequency.setValueAtTime(20,u.currentTime);const d=u.createGain();d.gain.setValueAtTime(0,u.currentTime),g.connect(d),d.connect(m),g.start(),o.current=g,s.current=d},p=()=>{const h=i.current;if(!h||t||h.state==="suspended")return;const u=h.createOscillator(),m=h.createGain();u.type="square",u.frequency.setValueAtTime(1200,h.currentTime),m.gain.setValueAtTime(.15*e,h.currentTime),m.gain.exponentialRampToValueAtTime(1e-4,h.currentTime+.18),u.connect(m),m.connect(h.destination),u.start(),u.stop(h.currentTime+.2)};return ue.useEffect(()=>{var _,E,g,d,x;const h=i.current;if(!h)return;const u=h.currentTime,m=n.motorStatus==="RUNNING"&&n.outputFrequency>.1;if(r.current&&r.current.gain.setTargetAtTime(t?0:e,u,.05),m&&!n.activeFault){const M=n.parameters.P0134.currentValue||60,S=Math.min(1,n.outputFrequency/M);(_=o.current)==null||_.frequency.setTargetAtTime(25+S*95,u,.05),(E=s.current)==null||E.gain.setTargetAtTime(.08*S,u,.05),(g=a.current)==null||g.gain.setTargetAtTime(.04*S,u,.05)}else(d=s.current)==null||d.gain.setTargetAtTime(0,u,.05),(x=a.current)==null||x.gain.setTargetAtTime(0,u,.05)},[n.outputFrequency,n.motorStatus,n.activeFault,t,e,n.parameters.P0134]),ue.useEffect(()=>(n.activeFault&&!t?(p(),l.current=window.setInterval(()=>p(),700)):l.current!==null&&(clearInterval(l.current),l.current=null),()=>{l.current!==null&&clearInterval(l.current)}),[n.activeFault,t]),{initAudio:c}},BA=()=>{const[t,e]=ue.useState(!1),[n,i]=ue.useState(.3),[r,a]=ue.useState(!1),{initAudio:o}=kA({isMuted:t,masterVolume:n}),s=()=>{r||(o(),a(!0)),e(!t)};return f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#1a1d21",padding:"8px 14px",borderRadius:"8px",border:"1px solid #323842",width:"100%"},children:[f.jsx("button",{onClick:s,style:{background:"#263238",border:"1px solid #455a64",color:"#eceff1",borderRadius:"4px",padding:"6px 12px",fontSize:"12px",fontWeight:600,cursor:"pointer"},children:t||!r?"🔇 Áudio Desativado":"🔊 Efeitos Sonoros ON"}),f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",fontSize:"11px",color:"#90a4ae"},children:[f.jsx("span",{children:"Volume:"}),f.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:n,onChange:l=>{r||(o(),a(!0)),i(parseFloat(l.target.value))},style:{width:"80px",accentColor:"#0288d1",cursor:"pointer"}})]})]})},Pe=(t,e)=>{if(!t||!t.parameters)return 0;const n=t.parameters[e];return n==null?0:typeof n=="object"&&"currentValue"in n?Number(n.currentValue??0):Number(n??0)},ri=(t,e)=>t?Array.isArray(t.digitalInputs)?!!t.digitalInputs[e-1]:t.digitalInputs&&typeof t.digitalInputs=="object"?!!(t.digitalInputs[`DI${e}`]??t.digitalInputs[`di${e}`]??t.digitalInputs[String(e)]):!1:!1,us=[{id:"mod-0",moduleNumber:0,title:"Manual de Programação CFW500",icon:"📑",description:"Acesse e baixe o manual oficial completo de programação do WEG CFW500 para consulta técnica.",lessons:[{id:"l0-1",title:"Download do Manual Oficial de Programação",durationMin:2,type:"THEORY",description:"Material de apoio indispensável para consulta de parâmetros, tabelas de falhas e diagramas de ligação.",theoryData:{title:"Documentação Técnica Oficial WEG",content:["O manual de programação do WEG CFW500 reúne toda a tabela detalhada de parâmetros, diagramas dos cartões plug-in, curvas de torque e guias de resolução de falhas.","Clique no botão abaixo para baixar o PDF e utilize-o como fonte de consulta durante os desafios e comissionamentos das próximas etapas."],diagramInfo:"DOCUMENTAÇÃO TÉCNICA OFICIAL ➔ WEG CFW500 (CÓD. 10001469555)",keyTakeaway:"Baixe o manual no seu computador ou celular para consultar os parâmetros e grupos de controle durante o treinamento."}}]},{id:"mod-1",moduleNumber:1,title:"Fundamentos da IHM e Primeiro Acionamento",icon:"⚡",description:"Navegação pelas teclas da IHM, liberação de acesso aos parâmetros e partida local.",lessons:[{id:"l1-1",title:"Estrutura da IHM e Senha de Acesso (P0000)",durationMin:5,type:"THEORY",description:"Aprenda como a IHM WEG opera e como desbloquear a edição de parâmetros.",theoryData:{title:"Proteção por Senha e Modos da IHM",content:["A IHM do WEG CFW500 possui 3 modos de operação: Monitor (leitura), Seleção de Parâmetros (Pxxxx) e Edição (valor piscando).","Para liberar a alteração de parâmetros de controle, insira a senha mestra no parâmetro P0000 (valor padrão: 5).","Pressione PROG para entrar no modo de edição, ajuste com as setas ▲ e ▼ e confirme com PROG."],diagramInfo:"[MONIT: 0.0Hz] ➔ (PROG) ➔ [P0000] ➔ (PROG) ➔ [EDITAR: 5] ➔ (PROG) ➔ [LIBERADO]",keyTakeaway:"Sempre defina P0000 = 5 antes de tentar alterar qualquer parâmetro operacional."}},{id:"l1-2",title:"Prática: Desbloqueio e Partida em Modo Local",durationMin:8,type:"PRACTICE",description:"Desbloqueie o inversor no P0000, garanta o modo Local e acione o motor.",steps:[{id:"s1-1",title:"Desbloquear Acesso no P0000 (Definir como 5)",instruction:"Na IHM, aperte PROG em P0000, ajuste o valor para 5 com a seta ▲ e aperte PROG para salvar.",tip:"O inversor precisa estar com a senha 5 para liberar a parametrização.",isCompleted:t=>Pe(t,"P0000")===5||t.isUnlocked===!0},{id:"s1-2",title:"Garantir Modo Local (LOC)",instruction:"Pressione a tecla LOC/REM se necessário até o LED verde LOC acender no topo da IHM.",tip:"O inversor só aceita o comando RUN do teclado se estiver em modo LOC.",isCompleted:t=>t.controlSource==="LOC"||t.isLocal===!0},{id:"s1-3",title:"Ligar o Motor e Elevar Frequência",instruction:"Aperte a tecla verde I (RUN) e use a seta ▲ para acelerar o motor acima de 15.0 Hz.",tip:"Observe o motor girando e a frequência de saída subir.",isCompleted:t=>{const e=t.outputFrequency??0,n=t.targetFrequency??0,i=Pe(t,"P0121");return(t.motorStatus==="RUNNING"||e>.1||n>.1)&&(e>=15||n>=15||i>=15)}}]}]},{id:"mod-2",moduleNumber:2,title:"Dados do Motor e Rampas de Aceleração/Desaceleração",icon:"⚙️",description:"Configuração da curva V/F, corrente nominal e tempos de rampa (P0100 e P0101).",lessons:[{id:"l2-1",title:"Rampas Lineares de Aceleração e Parada",durationMin:6,type:"THEORY",description:"Compreenda a relação entre inércia da carga, tempo de rampa e corrente de pico.",theoryData:{title:"Ajuste de Rampas: P0100 (Aceleração) e P0101 (Desaceleração)",content:["O parâmetro P0100 define o tempo em segundos para acelerar de 0 até 60Hz.","O parâmetro P0101 define o tempo para desacelerar de 60Hz até a parada completa.","Rampas muito curtas em cargas pesadas causam sobrecorrente (F070) ou sobretensão (F021)."],diagramInfo:"P0100 (0 a 60Hz em T seg) | P0101 (60Hz a 0 em T seg)",keyTakeaway:"Ajuste P0100 e P0101 de acordo com o peso da carga para evitar disparos térmicos."}},{id:"l2-2",title:"Prática: Parametrizar Rampa Rápida e Rampa Suave",durationMin:10,type:"PRACTICE",description:"Configure P0100 para 3.0s e P0101 para 2.0s e teste o comportamento dinâmico.",steps:[{id:"s2-1",title:"Ajustar Rampa de Aceleração (P0100 = 3.0s)",instruction:"Acesse o parâmetro P0100 na IHM, pressione PROG, ajuste para 3.0 segundos e pressione PROG.",tip:"Ajuste para 3.0 com as setas e salve.",isCompleted:t=>{const e=Pe(t,"P0100");return e>=2.8&&e<=3.2}},{id:"s2-2",title:"Ajustar Rampa de Desaceleração (P0101 = 2.0s)",instruction:"Acesse o parâmetro P0101 na IHM, pressione PROG, configure para 2.0 segundos e pressione PROG.",tip:"Isso garantirá uma frenagem controlada rápida de 2 segundos.",isCompleted:t=>{const e=Pe(t,"P0101");return e>=1.8&&e<=2.2}},{id:"s2-3",title:"Testar Resposta Dinâmica (Ligar e Parar)",instruction:"Ligue o motor pela tecla I (RUN), aguarde acelerar e em seguida pressione a tecla O (STOP).",tip:"O inversor desacelerará até 0 Hz em 2 segundos.",isCompleted:t=>(t.motorStatus==="READY"||t.motorStatus==="STOPPED")&&t.outputFrequency<=.5}]}]},{id:"mod-3",moduleNumber:3,title:"Entradas Digitais (DI1 a DI4) e Modo Remoto",icon:"🔌",description:"Comando por chaves externas de borne com controle de partida e reversão de rotação.",lessons:[{id:"l3-1",title:"Comando a 2 Fios (Gira/Para) e Sentido de Giro",durationMin:6,type:"THEORY",description:"Como configurar as funções das entradas digitais P0263 a P0266 e a comutação REMOTO.",theoryData:{title:"Configuração dos Bornes da Régua de Controle",content:["O parâmetro P0263 define a função da entrada digital DI1 (Padrão: 1 = Gira/Para a 2 fios).","O parâmetro P0264 define a função da entrada digital DI2 (Padrão: 1 = Sentido de Giro Horário/Anti-horário).","Para que o inversor responda às chaves DI1 e DI2, o modo de controle deve estar em REMOTO."],diagramInfo:"[P0000=5] ➔ [LED REM ACESO] ➔ [DI1: ON = PARTIDA] ➔ [DI2: ON = SENTIDO REV]",keyTakeaway:"Em modo Remoto, os botões I (RUN) e ▲/▼ da IHM transferem o controle para os bornes."}},{id:"l3-2",title:"Prática: Ligar e Inverter Rotação pelos Bornes Externos",durationMin:10,type:"PRACTICE",description:"Comute para modo Remoto, acione a partida pela chave DI1 e execute a reversão pela chave DI2.",steps:[{id:"s3-1",title:"Comutar para Modo Remoto (LED REM Aceso)",instruction:"Pressione o botão LOC/REM na IHM até o LED verde REM acender.",tip:"Isso habilita os comandos vindos das chaves de borne.",isCompleted:t=>t.controlSource==="REM"||t.isLocal===!1},{id:"s3-2",title:"Ligar o Motor pela Chave Externa DI1",instruction:"Com o inversor em REM, clique na chave DI1 no painel de bornes (posição ON).",tip:"Observe o motor acelerar em sentido horário (FWD).",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ri(t,1)},{id:"s3-3",title:"Inverter Sentido de Giro pela Chave Externa DI2",instruction:"Com a chave DI1 ligada, clique na chave DI2 para fechar o contato e acionar a reversão.",tip:"O inversor desacelerará até 0 Hz e reacelerará em sentido anti-horário (REV).",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ri(t,1)&&ri(t,2)}]}]},{id:"mod-4",moduleNumber:4,title:"Velocidades Fixas Pré-Programadas (Multispeed)",icon:"📊",description:"Seleção digital de frequências pré-programadas através da comutação da entrada digital DI3.",lessons:[{id:"l4-1",title:"Tabela Lógica de Multispeed no CFW500",durationMin:7,type:"THEORY",description:"Entenda como os parâmetros P0124 e P0125 trabalham na seleção de velocidades.",theoryData:{title:"Controle de Velocidade em Etapas",content:["A função Multispeed permite selecionar velocidades fixas sem potenciômetro.","• DI3 = OFF ➔ Frequência P0124 (Velocidade 1: 15.0 Hz)","• DI3 = ON  ➔ Frequência P0125 (Velocidade 2: 35.0 Hz)","Ao comutar a chave DI3, o inversor aplica a rampa suavemente até a nova velocidade."],diagramInfo:"[DI3: OFF] = P0124 (15.0 Hz) ➔ [DI3: ON] = P0125 (35.0 Hz)",keyTakeaway:"Ideal para esteiras industriais com velocidade lenta de carga e rápida de transporte."}},{id:"l4-2",title:"Prática: Programar e Selecionar Velocidades por DI3",durationMin:12,type:"PRACTICE",description:"Configure P0124=15Hz, P0125=35Hz e alterne a velocidade pela chave digital DI3.",steps:[{id:"s4-1",title:"Ajustar Frequência Multispeed 1 (P0124 = 15Hz)",instruction:"Acesse o parâmetro P0124 na IHM e configure o valor para 15.0 Hz.",tip:"Esta será a primeira velocidade padrão do motor.",isCompleted:t=>{const e=Pe(t,"P0124");return e>=14&&e<=16}},{id:"s4-2",title:"Ajustar Frequência Multispeed 2 (P0125 = 35Hz)",instruction:"Acesse o parâmetro P0125 na IHM e configure o valor para 35.0 Hz.",tip:"Esta será a segunda velocidade (mais rápida).",isCompleted:t=>{const e=Pe(t,"P0125");return e>=34&&e<=36}},{id:"s4-3",title:"Ligar em Modo Remoto e Acionar DI3",instruction:"Comute para REM, ligue a chave DI1 para partir e acione a chave DI3 para comutar a rotação para 35.0 Hz.",tip:"Observe a velocidade subir suavemente pela rampa.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ri(t,1)&&ri(t,3)}]}]},{id:"mod-5",moduleNumber:5,title:'Entrada Analógica (0-10V) e Rampa em "S"',icon:"🎛️",description:"Controle contínuo de rotação via sinal analógico e curvas suaves de aceleração sem trancos.",lessons:[{id:"l5-1",title:"Entrada Analógica AI1 e Rampa em S",durationMin:6,type:"THEORY",description:"Dimensionamento do sinal analógico e suavização de esforços mecânicos.",theoryData:{title:"Potenciômetro e Suavização de Cargas Críticas",content:["A entrada analógica AI1 lê um sinal de 0 a 10V.","0V corresponde a 0.0 Hz e 10V corresponde à frequência máxima programada (P0134).",'A rampa em "S" insere uma curvatura suave evitando trancos mecânicos.'],diagramInfo:'0V (0 Hz) ➔ 5V (30 Hz) ➔ 10V (60 Hz) com curva amortecida em "S"',keyTakeaway:"A rampa em S protege engrenagens e caixas redutoras contra choque mecânico."}},{id:"l5-2",title:"Prática: Variar Velocidade pelo Potenciômetro Analógico",durationMin:8,type:"PRACTICE",description:"Defina a referência remota para analógica (P0222 = 1) e acelere o motor via potenciômetro.",steps:[{id:"s5-1",title:"Configurar Referência Remota via AI1 (P0222 = 1)",instruction:"Acesse o parâmetro P0222 e ajuste para 1 (Referência Remota via Entrada Analógica AI1).",tip:"Padrão WEG para controle por potenciômetro.",isCompleted:t=>Pe(t,"P0222")===1||Pe(t,"P0222")===0},{id:"s5-2",title:"Ligar em Modo Remoto (DI1=ON)",instruction:"Comute para REM e feche a chave DI1 para habilitar o acionamento do motor.",tip:"O motor responderá proporcionalmente ao potenciômetro.",isCompleted:t=>ri(t,1)&&(t.motorStatus==="RUNNING"||t.outputFrequency>.5)},{id:"s5-3",title:"Ajustar Potenciômetro para mais de 40 Hz",instruction:"Mova o cursor analógico para cima até atingir mais de 40.0 Hz de rotação.",tip:"Veja a rotação do motor aumentar em tempo real.",isCompleted:t=>t.outputFrequency>=40}]}]},{id:"mod-6",moduleNumber:6,title:"Função Sleep / Modo Dormir (P0217 e P0218)",icon:"💤",description:"Desligamento automático inteligente para sistemas de bombeamento e economia de energia.",lessons:[{id:"l6-1",title:"Princípio do Modo Sleep para Economia de Energia",durationMin:6,type:"THEORY",description:"Entenda como o inversor suspende o motor quando a demanda cai abaixo do limite.",theoryData:{title:"Automação de Bombas de Pressurização",content:["Em sistemas de bombeamento com válvulas fechadas, o motor não precisa continuar girando.","O parâmetro P0217 define a frequência de dormir e P0218 define o tempo de atraso para desligamento.","Assim que a demanda sobe, o inversor acorda automaticamente."],diagramInfo:"Referência < P0217 por P0218 seg ➔ Desliga Motor (0Hz)",keyTakeaway:"Economiza eletricidade e evita o superaquecimento do fluido na bomba."}},{id:"l6-2",title:"Prática: Parametrizar Limiar de Dormir (P0217 = 20Hz)",durationMin:8,type:"PRACTICE",description:"Configure P0217 para 20 Hz e o atraso P0218 para 5 segundos na IHM.",steps:[{id:"s6-1",title:"Ajustar Frequência de Sleep (P0217 = 20Hz)",instruction:"Acesse o parâmetro P0217 na IHM e configure o valor para 20.0 Hz.",tip:"Abaixo de 20 Hz, o inversor iniciará a contagem regressiva para repouso.",isCompleted:t=>{const e=Pe(t,"P0217");return e>=18&&e<=22}},{id:"s6-2",title:"Definir Tempo de Atraso de Sleep (P0218 = 5.0s)",instruction:"Acesse o parâmetro P0218 e configure para 5.0 segundos.",tip:"Tempo de filtro para evitar desligamentos falsos por oscilação de pressão.",isCompleted:t=>{const e=Pe(t,"P0218");return e>=4&&e<=6}}]}]},{id:"mod-7",moduleNumber:7,title:"Frenagem por Injeção de Corrente Contínua (CC)",icon:"🛑",description:"Parada ultrarrápida e travamento de eixo magnético em máquinas de alta inércia.",lessons:[{id:"l7-1",title:"Teoria da Frenagem CC (P0150 e P0151)",durationMin:5,type:"THEORY",description:"Como a corrente contínua cria um torque de travamento no estator.",theoryData:{title:"Frenagem Elétrica sem Resistores Externos",content:["O inversor injeta CC no estator gerando um campo estático que trava o rotor.","O parâmetro P0150 define o tempo de duração e P0151 define a frequência de início da injeção.","Ideal para serras, exaustores e centrífugas industriais."],diagramInfo:"Desacelera normal ➔ Atinge P0151 (5Hz) ➔ Injeta CC por P0150 seg ➔ Eixo Travado",keyTakeaway:"Garante a parada do eixo mecânico sem rotação residual perigosa."}},{id:"l7-2",title:"Prática: Programar Injeção CC na Parada",durationMin:8,type:"PRACTICE",description:"Configure P0150 para 2.0s e P0151 para 5.0Hz na IHM.",steps:[{id:"s7-1",title:"Ajustar Duração da Frenagem CC (P0150 = 2.0s)",instruction:"Acesse o parâmetro P0150 e defina o tempo em 2.0 segundos.",tip:"Tempo em que o campo magnético de parada atuará.",isCompleted:t=>{const e=Pe(t,"P0150");return e>=1.5&&e<=2.5}},{id:"s7-2",title:"Ajustar Frequência de Início CC (P0151 = 5.0Hz)",instruction:"Acesse o parâmetro P0151 e configure para 5.0 Hz.",tip:"Abaixo de 5 Hz, a rampa cessa e o freio CC atua.",isCompleted:t=>{const e=Pe(t,"P0151");return e>=4&&e<=6}}]}]},{id:"mod-8",moduleNumber:8,title:"Diagnóstico de Falhas (F070) e Reset Operacional",icon:"🚨",description:"Identificação de falha de sobrecorrente e procedimento seguro de rearme.",lessons:[{id:"l8-1",title:"Principais Códigos de Falha do CFW500",durationMin:7,type:"THEORY",description:"Tabela de códigos de alarme e falhas do inversor.",theoryData:{title:"Guia de Diagnóstico de Campo",content:["• F006: Subtensão no Link CC (rede caiu).","• F070: Sobrecorrente / Curto-circuito na saída.","• F072: Sobrecarga térmica no motor (Ixt).","• F021: Sobretensão no barramento CC."],diagramInfo:"FALHA ATIVA ➔ Display pisca [F0xx] ➔ Inspecionar Carga ➔ Tecla STOP (O) para Reset",keyTakeaway:"Sempre identifique e elimine a causa raiz antes de resetar falhas repetitivas."}},{id:"l8-2",title:"Prática: Simular Falha F070 e Efetuar Reset",durationMin:10,type:"PRACTICE",description:"Injete a falha F070 pelo painel de testes e efetue o rearme pela tecla STOP/RESET.",steps:[{id:"s8-1",title:"Verificar Disparo de Falha (F070)",instruction:'No painel de Falhas / Injeção, clique em "Injetar F070 (Sobrecorrente)".',tip:"O display começará a piscar o código F070.",isCompleted:t=>t.motorStatus==="FAULT"||!!t.activeFault},{id:"s8-2",title:"Executar Reset Seguro pela IHM",instruction:"Pressione a tecla vermelha O (STOP/RESET) na IHM para rearmar o inversor.",tip:"O inversor voltará ao estado PRONTO (READY) com 0.0 Hz.",isCompleted:t=>(t.motorStatus==="READY"||t.motorStatus==="STOPPED")&&!t.activeFault}]}]},{id:"mod-9",moduleNumber:9,title:"Rede e Comunicação Industrial (Modbus RTU / RS485)",icon:"🌐",description:"Integração do CFW500 com PLCs, CLPs industriais e sistemas SCADA.",lessons:[{id:"l9-1",title:"Arquitetura de Comunicação Serial RS485",durationMin:6,type:"THEORY",description:"Endereçamento de rede, baud rate e registradores Modbus.",theoryData:{title:"Parâmetros de Rede: P0308 e P0310",content:["O WEG CFW500 possui porta serial RS485 nativa com protocolo Modbus RTU.","• P0308: Endereço do escravo na rede (1 a 247).","• P0310: Taxa de transmissão serial (1 = 19200 bps)."],diagramInfo:"CLP Mestre (RS485) ➔ Inversor Escravo (P0308=2)",keyTakeaway:"Utilize cabo blindado com par trançado e resistor de terminação de 120 ohms."}},{id:"l9-2",title:"Prática: Configurar Endereço de Rede Modbus (P0308 = 2)",durationMin:8,type:"PRACTICE",description:"Parametrize o endereço do inversor na rede RS485 para controle remoto via CLP.",steps:[{id:"s9-1",title:"Definir Endereço de Rede (P0308 = 2)",instruction:"Acesse o parâmetro P0308 na IHM e configure o endereço para 2.",tip:"Identifica o escravo na rede RS485.",isCompleted:t=>Pe(t,"P0308")===2},{id:"s9-2",title:"Verificar Taxa de Transmissão (P0310 = 1)",instruction:"Acesse P0310 e certifique-se de que está ajustado em 1 (19200 bps).",tip:"Velocidade padrão de 19200 bps.",isCompleted:t=>Pe(t,"P0310")===1}]}]},{id:"mod-10",moduleNumber:10,title:"Desafio 1: Diagnóstico de Falha de Partida em Modo Remoto",icon:"🔍",description:"O operador fechou a chave externa de comando, o display acusa REM, mas o inversor ignora o sinal de partida. Descubra a causa raiz e repare o acionamento.",lessons:[{id:"l10-1",title:"Cenário: Chave de Partida Acionada sem Resposta do Motor",durationMin:10,type:"PRACTICE",description:"Analise os grupos de parametrização de origem de comando remoto e as funções dos bornes digitais para restabelecer a operação.",steps:[{id:"s10-1",title:"Corrigir Origem de Partida em Modo Remoto",instruction:"Identifique na memória do inversor qual registro define a fonte do comando Gira/Para quando em controle remoto e configure-o para aceitar os bornes físicos.",tip:"Investigue o grupo de seleção de comandos remotos.",isCompleted:t=>Pe(t,"P0227")===1},{id:"s10-2",title:"Validar Função da Entrada Digital de Partida",instruction:"Acesse a configuração da primeira entrada digital da régua de bornes e assegure que sua função esteja programada como comando de Partida/Parada (Gira/Para).",tip:"Consulte a lista de funções das entradas digitais.",isCompleted:t=>Pe(t,"P0263")===1},{id:"s10-3",title:"Testar e Validar Acionamento em Campo",instruction:"Comute a IHM para modo Remoto e feche a chave de partida no painel para confirmar que o motor acelera normalmente.",tip:"A frequência de saída deve se elevar e o status mudar para operação.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ri(t,1)&&(t.motorStatus==="RUNNING"||t.outputFrequency>.5)}]}]},{id:"mod-11",moduleNumber:11,title:"Desafio 2: Proteção Térmica e Subfrequência em Bomba Centrífuga",icon:"💧",description:"Uma bomba de recalque industrial está sofrendo aquecimento e cavitação quando o operador reduz a rotação. Aplique as proteções necessárias.",lessons:[{id:"l11-1",title:"Cenário: Proteção Hidráulica e Limite Térmico de Corrente",durationMin:12,type:"PRACTICE",description:"Imponha um piso de segurança para a rotação mínima do rotor e calibre a corrente nominal exata de proteção térmica do enrolamento.",steps:[{id:"s11-1",title:"Parametrizar Piso de Velocidade Mínima de Segurança",instruction:"Localize a configuração de limite inferior de frequência e ajuste-a para 20.0 Hz, impedindo que a bomba trabalhe sem fluxo de refrigeração.",tip:"Procure o parâmetro de frequência mínima no grupo de limites.",isCompleted:t=>{const e=Pe(t,"P0133");return e>=19.5&&e<=20.5}},{id:"s11-2",title:"Calibrar Proteção de Sobrecarga Térmica do Motor",instruction:"A placa de identificação da bomba especifica corrente de serviço contínua de 4.8 A. Ajuste o limite térmico de sobrecarga para exatamente 4.8 A.",tip:"Ajuste a corrente de sobrecarga térmica do motor.",isCompleted:t=>{const e=Pe(t,"P0156");return e>=4.7&&e<=4.9}},{id:"s11-3",title:"Validar Estabilidade com Referência no Mínimo",instruction:"Ligue o comando de partida em modo remoto e posicione o sinal analógico no zero. A rotação deve se manter perfeitamente travada no piso de segurança.",tip:"Verifique se a frequência de saída não desce abaixo do limite estabelecido.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ri(t,1)&&t.outputFrequency>=19&&t.outputFrequency<=21}]}]},{id:"mod-12",moduleNumber:12,title:"Comissionamento: Esteira Transportadora de Embalagens",icon:"🍾",description:"Linha de envase de produtos de vidro. Exige partida progressiva para não tombar frascos e parada controlada por frenagem elétrica.",lessons:[{id:"l12-1",title:"Adequação da Dinâmica Mecânica da Esteira",durationMin:12,type:"PRACTICE",description:"Configure o formato da aceleração para curva amortecida, defina o tempo de subida em 8.0s e programe a frenagem estática na parada em 1.5s.",steps:[{id:"s12-1",title:"Ativar Perfil de Aceleração com Curvatura Suave",instruction:"Modifique o formato padrão da rampa de linear para Curva S para eliminar solavancos mecânicos no instante da partida.",tip:"Ajuste o parâmetro que altera o formato da rampa.",isCompleted:t=>Pe(t,"P0104")===1},{id:"s12-2",title:"Programar Tempo de Rampa de Subida",instruction:"Ajuste o tempo da primeira rampa de aceleração da máquina para 8.0 segundos.",tip:"Configure o parâmetro principal de tempo de aceleração.",isCompleted:t=>{const e=Pe(t,"P0100");return e>=7.8&&e<=8.2}},{id:"s12-3",title:"Configurar Duração da Frenagem por Injeção CC",instruction:"Ajuste o tempo de aplicação do campo estático de frenagem CC na parada para 1.5 segundos, garantindo imobilização rápida.",tip:"Localize o tempo de duração da frenagem CC.",isCompleted:t=>{const e=Pe(t,"P0150");return e>=1.4&&e<=1.6}}]}]},{id:"mod-13",moduleNumber:13,title:"Comissionamento: Exaustor com Salto de Ressonância (Bypass)",icon:"🌪️",description:"Um sistema de ventilação entra em ressonância mecânica destrutiva aos 25.0 Hz e precisa desligar automaticamente quando a pressão estabilizar.",lessons:[{id:"l13-1",title:"Proteção contra Vibração Estrutural e Repouso Automático",durationMin:12,type:"PRACTICE",description:"Parametrize o salto da faixa crítica de vibração e ative a lógica de repouso automático com atraso.",steps:[{id:"s13-1",title:"Definir Ponto Crítico de Salto Mecânico",instruction:"Insira a frequência de ressonância mecânica em 25.0 Hz para que o inversor transite por ela sem permanecer estacionado.",tip:"Ajuste a frequência de rejeição / bypass mecânico.",isCompleted:t=>{const e=Pe(t,"P0169");return e>=24.5&&e<=25.5}},{id:"s13-2",title:"Ajustar Limiar de Frequência para Repouso Automático",instruction:"Configure a frequência de acionamento do modo dormir para 18.0 Hz.",tip:"Ajuste o valor do limiar de sleep.",isCompleted:t=>{const e=Pe(t,"P0217");return e>=17.5&&e<=18.5}},{id:"s13-3",title:"Definir Tempo de Atraso para Entrada em Repouso",instruction:"Programe o temporizador de confirmação de inatividade em 6.0 segundos antes de suspender a modulação.",tip:"Ajuste o atraso do modo dormir.",isCompleted:t=>{const e=Pe(t,"P0218");return e>=5.5&&e<=6.5}}]}]},{id:"mod-14",moduleNumber:14,title:"Desafio 3: Solução de Sobretensão no Barramento CC (F021)",icon:"⚡",description:"Uma centrífuga industrial desarma por sobretensão interna no barramento contínuo toda vez que recebe ordem de parada rápida. Solucione o problema.",lessons:[{id:"l14-1",title:"Cenário: Regeneração Excessiva em Carga de Alta Inércia",durationMin:14,type:"PRACTICE",description:"Readeque a rampa de desaceleração para 12.0s e regule a tensão de frenagem CC para 15.0%.",steps:[{id:"s14-1",title:"Alongar o Tempo de Desaceleração Controlada",instruction:"Aumente o tempo da rampa de descida para 12.0 segundos, reduzindo a taxa de regeneração de energia para o barramento CC.",tip:"Ajuste o tempo da primeira rampa de desaceleração.",isCompleted:t=>{const e=Pe(t,"P0101");return e>=11.5&&e<=12.5}},{id:"s14-2",title:"Calibrar Tensão de Injeção de Frenagem CC",instruction:"Ajuste o nível percentual de tensão de frenagem CC para 15.0% para garantir frenagem magnética suave.",tip:"Localize a configuração de nível de tensão de frenagem CC.",isCompleted:t=>{const e=Pe(t,"P0142");return e>=14&&e<=16}},{id:"s14-3",title:"Validar Ciclo Operacional Completo",instruction:"Em modo Local, acelere o motor até a velocidade máxima e pressione STOP. O motor deve desacelerar sem apresentar código de falha.",tip:"Aguarde a parada completa em 0.0 Hz.",isCompleted:t=>(t.motorStatus==="READY"||t.motorStatus==="STOPPED")&&!t.activeFault&&Pe(t,"P0101")>=11.5}]}]},{id:"mod-15",moduleNumber:15,title:"Comissionamento: Içamento de Cargas em Ponte Rolante",icon:"🏗️",description:"Sistema de elevação de carga que necessita de velocidades fixas pré-programadas para aproximação milimétrica, média, transporte e velocidade máxima.",lessons:[{id:"l15-1",title:"Programação dos Estágios de Velocidade Fixa",durationMin:15,type:"PRACTICE",description:"Programe os 4 primeiros estágios de velocidades digitais conforme os requisitos de projeto: 10.0 Hz, 25.0 Hz, 45.0 Hz e 60.0 Hz.",steps:[{id:"s15-1",title:"Programar Velocidade de Posicionamento Lento",instruction:"Defina a primeira frequência da tabela de velocidades fixas em 10.0 Hz.",tip:"Ajuste o primeiro estágio da tabela de multispeed.",isCompleted:t=>{const e=Pe(t,"P0124");return e>=9.5&&e<=10.5}},{id:"s15-2",title:"Programar Velocidade Intermediária",instruction:"Defina a segunda frequência da tabela de velocidades fixas em 25.0 Hz.",tip:"Ajuste o segundo estágio da tabela de multispeed.",isCompleted:t=>{const e=Pe(t,"P0125");return e>=24.5&&e<=25.5}},{id:"s15-3",title:"Programar Velocidade de Transporte Rápido",instruction:"Defina a terceira frequência da tabela de velocidades fixas em 45.0 Hz.",tip:"Ajuste o terceiro estágio da tabela de multispeed.",isCompleted:t=>{const e=Pe(t,"P0126");return e>=44.5&&e<=45.5}},{id:"s15-4",title:"Programar Velocidade Máxima de Içamento",instruction:"Defina a quarta frequência da tabela de velocidades fixas em 60.0 Hz.",tip:"Ajuste o quarto estágio da tabela de multispeed.",isCompleted:t=>{const e=Pe(t,"P0127");return e>=59&&e<=61}}]}]},{id:"mod-16",moduleNumber:16,title:"Desafio 4: Motor Travado na Partida por Falta de Torque Inicial",icon:"🔩",description:"Um moinho triturador com material acumulado na câmara não consegue quebrar a inércia estática e trava na partida. Aumente a força inicial.",lessons:[{id:"l16-1",title:"Cenário: Carga com Alto Conjugado Resistente Estático",durationMin:14,type:"PRACTICE",description:"Aplique reforço de magnetização em baixas rotações, amplie o teto de corrente momentânea e ative a correção de escorregamento.",steps:[{id:"s16-1",title:"Elevar o Reforço de Torque Manual na Partida",instruction:"Aumente a compensação de torque manual da curva V/F para 12.0%, elevando a tensão aplicada nas frequências de 0 a 10 Hz.",tip:"Localize o parâmetro de Boost de Torque Manual.",isCompleted:t=>{const e=Pe(t,"P0136");return e>=11.5&&e<=12.5}},{id:"s16-2",title:"Ajustar o Teto de Corrente Máxima de Partida",instruction:"Permita que o inversor forneça até 15.0 A de corrente instantânea para vencer o travamento mecânico.",tip:"Ajuste o limite de corrente máxima de saída.",isCompleted:t=>{const e=Pe(t,"P0135");return e>=14.5&&e<=15.5}},{id:"s16-3",title:"Ativar Compensação de Queda de Rotação por Carga",instruction:"Ajuste a compensação de escorregamento do rotor em 3.0% para manter a velocidade constante sob esforço.",tip:"Ajuste o parâmetro de compensação de escorregamento.",isCompleted:t=>{const e=Pe(t,"P0138");return e>=2.8&&e<=3.2}}]}]},{id:"mod-17",moduleNumber:17,title:"Comissionamento: Compressor de Parafuso e Pressurização",icon:"💨",description:"Compressor rotativo de ar comprimido. Exige dinâmica de alívio rápido, velocidade mínima para circulação de óleo e ruído eletromagnético reduzido.",lessons:[{id:"l17-1",title:"Parametrização Específica para Compressores Industriais",durationMin:15,type:"PRACTICE",description:"Ajuste as rampas para 4.0s de subida e 3.0s de descida, fixe o piso de lubrificação em 25.0 Hz e eleve a portadora PWM para 10.0 kHz.",steps:[{id:"s17-1",title:"Ajustar Rampa de Carga",instruction:"Defina o tempo de aceleração em 4.0 segundos.",tip:"Ajuste o tempo de aceleração.",isCompleted:t=>{const e=Pe(t,"P0100");return e>=3.8&&e<=4.2}},{id:"s17-2",title:"Ajustar Rampa de Alívio Rápido",instruction:"Defina o tempo de desaceleração em 3.0 segundos para fechamento rápido de válvula.",tip:"Ajuste o tempo de desaceleração.",isCompleted:t=>{const e=Pe(t,"P0101");return e>=2.8&&e<=3.2}},{id:"s17-3",title:"Fixar Piso de Rotação para Bombeamento de Óleo",instruction:"Configure a frequência mínima em 25.0 Hz para assegurar a película de lubrificação no elemento compressor.",tip:"Ajuste o limite de frequência mínima.",isCompleted:t=>{const e=Pe(t,"P0133");return e>=24.5&&e<=25.5}},{id:"s17-4",title:"Ajustar Frequência de Chaveamento Silenciosa",instruction:"Eleve a frequência de chaveamento PWM para 10.0 kHz para eliminar o ruído audível na casa de máquinas.",tip:"Ajuste a frequência de chaveamento PWM dos IGBTs.",isCompleted:t=>{const e=Pe(t,"P0139");return e>=9.5&&e<=10.5}}]}]},{id:"mod-18",moduleNumber:18,title:"Desafio 5: Otimização Térmica dos IGBTs e Redução de Ruído",icon:"🔥",description:"Um técnico elevou a frequência PWM ao máximo e o inversor agora desarma por sobreaquecimento nos transistores de potência. Recalibre o sistema.",lessons:[{id:"l18-1",title:"Cenário: Perdas Excessivas por Comutação no Módulo IGBT",durationMin:12,type:"PRACTICE",description:"Reduza a taxa de chaveamento para 5.0 kHz e habilite o algoritmo de rebaixamento térmico automático.",steps:[{id:"s18-1",title:"Recalibrar Frequência de Chaveamento PWM",instruction:"Ajuste a frequência PWM para 5.0 kHz para diminuir as perdas térmicas por comutação nos semicondutores.",tip:"Ajuste a frequência de chaveamento PWM.",isCompleted:t=>{const e=Pe(t,"P0139");return e>=4.8&&e<=5.2}},{id:"s18-2",title:"Habilitar Redução Automática de PWM por Temperatura",instruction:"Ative a proteção inteligente que diminui o PWM automaticamente se o dissipador atingir temperatura crítica.",tip:"Habilite o parâmetro de redução de PWM automática.",isCompleted:t=>Pe(t,"P0297")===1},{id:"s18-3",title:"Validar Estabilidade de Temperatura do Dissipador",instruction:"Acesse o parâmetro de leitura da temperatura interna dos IGBTs na IHM para validar a estabilidade.",tip:"Consulte o parâmetro de leitura de temperatura.",isCompleted:t=>Pe(t,"P0139")<=5.2&&Pe(t,"P0297")===1}]}]},{id:"mod-19",moduleNumber:19,title:"Comissionamento: Misturador Químico com Reversão Cíclica",icon:"🧪",description:"Tanque de homogeneização que realiza bateladas alternando o sentido de rotação das pás através de sinal digital de CLP.",lessons:[{id:"l19-1",title:"Parametrização de Transições Suaves de Inversão",durationMin:15,type:"PRACTICE",description:"Configure a entrada DI2 para inversão de giro, estabeleça rampas simétricas de 4.0s e teste a reversão em modo remoto.",steps:[{id:"s19-1",title:"Configurar Entrada Digital para Sentido de Giro",instruction:"Programe a segunda entrada digital da régua de bornes com a função de comando de Sentido de Giro.",tip:"Ajuste a função da entrada DI2.",isCompleted:t=>Pe(t,"P0264")===1},{id:"s19-2",title:"Equalizar Tempos de Aceleração e Desaceleração",instruction:"Ajuste tanto o tempo de aceleração quanto o de desaceleração para exatamente 4.0 segundos.",tip:"Configure os tempos das rampas de subida e descida.",isCompleted:t=>{const e=Pe(t,"P0100"),n=Pe(t,"P0101");return e>=3.8&&e<=4.2&&n>=3.8&&n<=4.2}},{id:"s19-3",title:"Executar Ciclo de Reversão em Modo Remoto",instruction:"Em modo REM, acione a partida pela chave DI1 e, em seguida, feche a chave DI2 para testar a rampa de inversão completa.",tip:"Observe a passagem por 0.0 Hz e a rotação no sentido inverso.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&ri(t,1)&&ri(t,2)}]}]},{id:"mod-20",moduleNumber:20,title:"Desafio Mestre: Comissionamento Completo de Retificadora CNC",icon:"🏆",description:"O teste definitivo: parametrização integral a partir da placa do motor, seleção de controle vetorial sensorless e integração na rede RS485 da máquina.",lessons:[{id:"l20-1",title:"Parametrização Integral de Todos os Grupos Funcionais",durationMin:20,type:"PRACTICE",description:"Insira os dados elétricos de placa, ative o controle vetorial VVW e configure os parâmetros de comunicação serial.",steps:[{id:"s20-1",title:"Inserir Dados de Tensão, Frequência e Rotação Nominal",instruction:"Acesse o grupo de dados do motor e programe: Tensão Nominal = 220 V, Frequência Nominal = 60.0 Hz e Rotação Nominal = 1750 RPM.",tip:"Localize os parâmetros de placa do motor.",isCompleted:t=>Pe(t,"P0400")===220&&Pe(t,"P0401")>=59&&Pe(t,"P0402")>=1700},{id:"s20-2",title:"Ajustar Corrente e Potência Nominal do Motor",instruction:"Programe a Corrente Nominal em 4.5 A e a Potência Nominal em 1.5 cv nos parâmetros correspondentes.",tip:"Ajuste corrente e potência de placa.",isCompleted:t=>{const e=Pe(t,"P0403"),n=Pe(t,"P0404");return e>=4.4&&e<=4.6&&n>=1.4&&n<=1.6}},{id:"s20-3",title:"Selecionar Modo de Controle Vetorial Sensorless (VVW)",instruction:"Altere o algoritmo de controle do inversor de Escalar (V/F) para Controle Vetorial VVW para assegurar alto torque e rigidez em baixas rotações.",tip:"Altere o método de controle.",isCompleted:t=>Pe(t,"P0202")===2},{id:"s20-4",title:"Configurar Endereço e Taxa de Rede Serial do CNC",instruction:"Defina o endereço escravo da rede Modbus RS485 para 5 e certifique-se de que a taxa de comunicação esteja em 19200 bps.",tip:"Ajuste os parâmetros de comunicação serial.",isCompleted:t=>Pe(t,"P0308")===5&&Pe(t,"P0310")===1},{id:"s20-5",title:"Concluir Comissionamento Geral da Máquina",instruction:"Certifique-se de que todos os parâmetros foram gravados na memória e que o acesso mestre permaneça validado com senha.",tip:"Validação final de comissionamento.",isCompleted:t=>Pe(t,"P0202")===2&&Pe(t,"P0308")===5&&Pe(t,"P0400")===220}]}]}],Qi=(t,e)=>{if(!t||!t.parameters)return 0;const n=t.parameters[e];return n==null?0:typeof n=="object"&&"currentValue"in n?Number(n.currentValue??0):Number(n??0)},To=(t,e)=>t?Array.isArray(t.digitalInputs)?!!t.digitalInputs[e-1]:t.digitalInputs&&typeof t.digitalInputs=="object"?!!(t.digitalInputs[`DI${e}`]??t.digitalInputs[`di${e}`]??t.digitalInputs[String(e)]):!1:!1,C0=[{id:"cfw300-mod-1",moduleNumber:1,title:"IHM do CFW300 e Desbloqueio P0000",icon:"⚡",description:"Navegação pela IHM compacta do inversor CFW300, liberação de escrita no P0000 e acionamento local.",lessons:[{id:"c300-l1-1",title:"Operação da IHM Compacta e Senha Mestra",durationMin:5,type:"THEORY",description:"Conheça o display LED de 4 dígitos e a lógica de parametrização do inversor micro CFW300.",theoryData:{title:"Estrutura da IHM e Parâmetro P0000",content:["O WEG CFW300 é um microinversor compacto voltado para máquinas e esteiras de pequeno porte.","Por padrão de fábrica da WEG, para alterar parâmetros de ajuste o usuário deve inserir o valor 5 no parâmetro P0000.","A tecla PROG seleciona o parâmetro e confirma o novo valor programado."],diagramInfo:"[DISPLAY: 0.0] ➔ (PROG) ➔ [P0000] ➔ (PROG) ➔ [VALOR: 5] ➔ (PROG) ➔ [LIBERADO]",keyTakeaway:"Sempre insira P0000 = 5 antes de iniciar a parametrização do inversor CFW300."}},{id:"c300-l1-2",title:"Prática: Desbloqueio e Partida Local no CFW300",durationMin:8,type:"PRACTICE",description:"Insira a senha mestra 5 no P0000, verifique o modo Local e dê a primeira partida.",steps:[{id:"c300-s1-1",title:"Desbloquear o Acesso no P0000",instruction:"Acesse o parâmetro P0000, pressione PROG, insira o valor 5 e pressione PROG para confirmar.",tip:"O parâmetro P0000 deve ficar com o valor 5.",isCompleted:t=>Qi(t,"P0000")===5||t.isUnlocked===!0},{id:"c300-s1-2",title:"Verificar Modo Local",instruction:"Certifique-se de que o inversor está em modo Local (LED LOC aceso).",tip:"Use a tecla LOC/REM se necessário.",isCompleted:t=>t.controlSource==="LOC"||t.isLocal===!0},{id:"c300-s1-3",title:"Ligar e Acelerar o Motor",instruction:"Pressione a tecla I (RUN) e eleve a frequência acima de 20.0 Hz usando as setas ▲.",tip:"A frequência de saída deve subir no display.",isCompleted:t=>(t.motorStatus==="RUNNING"||(t.outputFrequency??0)>.1)&&((t.outputFrequency??0)>=20||(t.targetFrequency??0)>=20)}]}]},{id:"cfw300-mod-2",moduleNumber:2,title:"Dados do Motor e Parametrização Escalar V/F",icon:"⚙️",description:"Inserção dos dados de catálogo do motor e configuração dos limites de frequência P0133 e P0134.",lessons:[{id:"c300-l2-1",title:"Configuração da Faixa Operacional e Placa",durationMin:6,type:"THEORY",description:"Como o CFW300 calcula a curva V/F e protege contra rotação excessiva.",theoryData:{title:"Limites de Frequência no CFW300",content:["• P0133: Frequência mínima do motor (padrão 0.0 Hz).","• P0134: Frequência máxima de saída permitida (padrão 60.0 Hz ou até 400.0 Hz em retíficas).","• P0156: Corrente de sobrecarga térmica para proteção do motor."],diagramInfo:"P0133 (Frequência Mínima) ➔ Faixa Linear V/F ➔ P0134 (Frequência Máxima)",keyTakeaway:"Sempre configure P0133 e P0134 antes de liberar o inversor para produção."}},{id:"c300-l2-2",title:"Prática: Programar Frequência Máxima e Rampas",durationMin:10,type:"PRACTICE",description:"Ajuste a frequência máxima P0134 para 65.0 Hz e a aceleração P0100 para 2.5s.",steps:[{id:"c300-s2-1",title:"Ajustar Frequência Máxima (P0134 = 65.0 Hz)",instruction:"Acesse o parâmetro P0134 na IHM e configure o valor para 65.0 Hz.",tip:"Defina P0134 em 65.0.",isCompleted:t=>{const e=Qi(t,"P0134");return e>=64&&e<=66}},{id:"c300-s2-2",title:"Programar Tempo de Aceleração Rápida (P0100 = 2.5s)",instruction:"Acesse P0100 e ajuste o tempo de subida para 2.5 segundos.",tip:"Ajuste P0100 = 2.5.",isCompleted:t=>{const e=Qi(t,"P0100");return e>=2.3&&e<=2.7}},{id:"c300-s2-3",title:"Testar e Validar Resposta",instruction:"Ligue o motor em modo Local e comprove a aceleração até a velocidade máxima.",tip:"Acelere o motor com a tecla ▲ até atingir a nova velocidade.",isCompleted:t=>(t.motorStatus==="RUNNING"||(t.outputFrequency??0)>.5)&&(t.outputFrequency??0)>=60}]}]},{id:"cfw300-mod-3",moduleNumber:3,title:"Entradas Digitais e Bornes Remotos do CFW300",icon:"🔌",description:"Comando por chaves a 2 fios (Gira/Para e Sentido de Giro) nas entradas digitais integradas.",lessons:[{id:"c300-l3-1",title:"Régua de Controle e Funções P0263 a P0266",durationMin:7,type:"THEORY",description:"Atribuição de funções das entradas DI1 a DI4 no inversor compacto.",theoryData:{title:"Configuração de Bornes no CFW300",content:["O CFW300 possui entradas digitais configuráveis na régua de controle.","• P0263: Função da entrada digital DI1 (1 = Gira/Para).","• P0264: Função da entrada digital DI2 (1 = Sentido de Giro Horário/Anti-horário).","• P0220: Seleção da fonte Local/Remoto."],diagramInfo:"[DI1: ON = RUN] | [DI2: ON = SENTIDO REV] em Modo Remoto (LED REM)",keyTakeaway:"Em modo REM, o CFW300 obedece diretamente às chaves da régua de bornes."}},{id:"c300-l3-2",title:"Prática: Partida e Reversão Remota no CFW300",durationMin:10,type:"PRACTICE",description:"Comute para REM, ligue DI1 e realize a reversão de giro acionando DI2.",steps:[{id:"c300-s3-1",title:"Comutar para Modo Remoto",instruction:"Pressione a tecla LOC/REM para acender o LED verde REM no inversor.",tip:"Transfere o controle para os bornes.",isCompleted:t=>t.controlSource==="REM"||t.isLocal===!1},{id:"c300-s3-2",title:"Ligar o Motor pela Chave DI1",instruction:"Feche a chave digital DI1 para acionar o motor em sentido direto.",tip:"O motor deve acelerar em FWD.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&To(t,1)},{id:"c300-s3-3",title:"Comutar Sentido de Giro pela Chave DI2",instruction:"Com DI1 ligada, acione a chave DI2 para inverter o giro para sentido anti-horário (REV).",tip:"O inversor desacelera até 0 e reacelera em rotação invertida.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&To(t,1)&&To(t,2)}]}]},{id:"cfw300-mod-4",moduleNumber:4,title:"Desafio CFW300 1: Parametrização de Micro-Esteira Seletora",icon:"🔍",description:"Uma micro-esteira de bancada requer 2 velocidades digitais: 12.0 Hz para inspeção visual e 40.0 Hz para descarte rápido sem uso de potenciômetro.",lessons:[{id:"c300-l4-1",title:"Cenário: Programação de Velocidades Fixas no CFW300",durationMin:12,type:"PRACTICE",description:"Analise os parâmetros de velocidade pré-programada (Multispeed) do CFW300 e calibre os dois estágios solicitados.",steps:[{id:"c300-s4-1",title:"Programar Frequência do Estágio 1 (Inspeção Lenta)",instruction:"Localize na memória do inversor a primeira frequência da tabela de velocidades pré-programadas e ajuste para 12.0 Hz.",tip:"Acesse o primeiro estágio de multispeed do CFW300.",isCompleted:t=>{const e=Qi(t,"P0124");return e>=11.5&&e<=12.5}},{id:"c300-s4-2",title:"Programar Frequência do Estágio 2 (Descarte Rápido)",instruction:"Localize a segunda frequência da tabela de velocidades pré-programadas e ajuste para 40.0 Hz.",tip:"Acesse o segundo estágio de multispeed do CFW300.",isCompleted:t=>{const e=Qi(t,"P0125");return e>=39&&e<=41}},{id:"c300-s4-3",title:"Validar Seleção em Modo Remoto",instruction:"Em modo REM, ligue a chave de partida DI1 e acione a chave seletora DI3 para comutar para a velocidade rápida.",tip:"A rotação deve atingir a velocidade correspondente ao estágio 2.",isCompleted:t=>(t.controlSource==="REM"||t.isLocal===!1)&&To(t,1)&&To(t,3)}]}]},{id:"cfw300-mod-5",moduleNumber:5,title:"Desafio CFW300 2: Diagnóstico e Proteção Térmica em Ventilador",icon:"🌪️",description:"Um micro-ventilador de painel está sofrendo sobreaquecimento por operação em rampa excessivamente curta. Reajuste a dinâmica e a corrente térmica.",lessons:[{id:"c300-l5-1",title:"Cenário: Sobrecarga na Partida e Parametrização Segura",durationMin:12,type:"PRACTICE",description:"Suavize a partida ajustando a rampa para 6.0s e limite a corrente térmica em 2.2 A.",steps:[{id:"c300-s5-1",title:"Suavizar Tempo de Aceleração da Hélice",instruction:"Aumente o tempo de aceleração do ventilador para 6.0 segundos para evitar picos de partida no motor monofásico/trifásico.",tip:"Ajuste o tempo da rampa de subida principal.",isCompleted:t=>{const e=Qi(t,"P0100");return e>=5.8&&e<=6.2}},{id:"c300-s5-2",title:"Ajustar Proteção de Corrente Térmica",instruction:"Ajuste o parâmetro de sobrecarga térmica do CFW300 para 2.2 A conforme a placa do ventilador.",tip:"Localize a proteção de corrente de sobrecarga térmica.",isCompleted:t=>{const e=Qi(t,"P0156");return e>=2.1&&e<=2.3}},{id:"c300-s5-3",title:"Testar e Validar Operação Normal",instruction:"Acione o motor em modo Local e comprove a partida suave até atingir a velocidade de regime.",tip:"O motor deve partir suavemente e permanecer operando sem disparos.",isCompleted:t=>(t.motorStatus==="RUNNING"||(t.outputFrequency??0)>.5)&&Qi(t,"P0100")>=5.8}]}]}],Ku={},VA="@CFW500_STUDENT_SESSION",zv="@CFW500_PROGRESS_DATA_",kv="@CFW500_ADMIN_UNLOCK_ALL",HA=(Ku==null?void 0:Ku.VITE_API_URL)||"https://seudominio.com.br/api",Bv=()=>{try{const t=localStorage.getItem(VA);if(t)return JSON.parse(t)}catch{}return{id:"aluno-demo",name:"Aluno de Teste"}},Go=()=>{const t=Bv();try{const e=localStorage.getItem(`${zv}${t.id}`);if(e)return JSON.parse(e)}catch{}return{studentId:t.id,studentName:t.name,completedLessons:[],completedSteps:{}}},Xp=t=>{try{localStorage.setItem(`${zv}${t.studentId}`,JSON.stringify(t)),window.dispatchEvent(new Event("course_progress_updated"))}catch(e){console.warn("Erro ao salvar no localStorage:",e)}},qp=async t=>{if(t.studentId!=="aluno-demo")try{await fetch(`${HA}/save_progress.php`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}catch(e){console.warn("Modo offline ativo ou falha ao sincronizar com UOL Host:",e)}},GA=(t,e)=>{const n=Go(),i=n.completedSteps[t]||[];i.includes(e)||(n.completedSteps[t]=[...i,e],n.lastLessonId=t,Xp(n),qp(n))},A0=t=>{const e=Go();e.completedLessons.includes(t)||(e.completedLessons.push(t),e.lastLessonId=t,Xp(e),qp(e))},fc=()=>{try{return localStorage.getItem(kv)==="true"}catch{return!1}},WA=t=>{try{localStorage.setItem(kv,t?"true":"false"),window.dispatchEvent(new Event("course_progress_updated"))}catch(e){console.warn("Erro ao salvar admin bypass:",e)}},jA=t=>{const e=Bv(),i={studentId:e.id,studentName:e.name,completedLessons:[],completedSteps:{}};Xp(i),qp(i)},Vv=(t,e)=>!t||!t.lessons||!t.lessons.length?!1:t.lessons.every(n=>e.completedLessons.includes(n.id)),Hv=(t,e,n=us)=>{if(fc()||t===0)return!0;const i=n[t-1];return i?Vv(i,e):!1},Zu=(t,e,n,i=us)=>{if(fc())return!0;if(!Hv(t,n,i))return!1;if(e===0)return!0;const r=i[t];if(!r||!r.lessons)return!1;const a=r.lessons[e-1];return a?n.completedLessons.includes(a.id):!1},XA=(t,e)=>{if(!t||!t.lessons||!t.lessons.length)return 0;const n=t.lessons.filter(i=>e.completedLessons.includes(i.id)).length;return Math.round(n/t.lessons.length*100)},qA=({selectedLesson:t,setSelectedLesson:e,userRole:n})=>{const{state:i,dispatch:r}=Zn(),[a,o]=ue.useState("CFW500"),[s,l]=ue.useState(()=>Go()),[c,p]=ue.useState(()=>fc()),h=a==="CFW500"?us:C0,u=ue.useRef(t.id),m=()=>{if(r)try{r({type:"RESET_FACTORY_DEFAULTS"})}catch{try{r({type:"RESET_DEFAULTS"})}catch{}}};ue.useEffect(()=>{u.current!==t.id&&(m(),u.current=t.id)},[t.id]),ue.useEffect(()=>{const b=()=>{l(Go()),p(fc())};return window.addEventListener("course_progress_updated",b),()=>window.removeEventListener("course_progress_updated",b)},[]),ue.useEffect(()=>{if(t.type==="PRACTICE"&&t.steps){const b=s.completedSteps[t.id]||[];t.steps.forEach(R=>{b.includes(R.id)||R.isCompleted(i)&&GA(t.id,R.id)});const T=Go(),A=T.completedSteps[t.id]||[];if(t.steps.every(R=>A.includes(R.id))&&!T.completedLessons.includes(t.id)){A0(t.id);const R=h.find(P=>P.lessons.some(I=>I.id===t.id));R&&R.lessons.every(I=>I.id===t.id||T.completedLessons.includes(I.id))&&m()}}},[i,t,s.completedSteps,s.completedLessons,h]);const _=b=>{var A;if(b===a)return;o(b),m();const T=b==="CFW500"?us:C0;(A=T[0])!=null&&A.lessons[0]&&e(T[0].lessons[0])},E=()=>{const b=!c;WA(b),p(b)},g=()=>{var b;window.confirm("Deseja resetar todo o progresso do aluno para reiniciar os testes da lição 1?")&&(jA(),m(),(b=h[0])!=null&&b.lessons[0]&&e(h[0].lessons[0]))},d=()=>{A0(t.id),m()},x=()=>{m();let b=!1;for(let T=0;T<h.length;T++){const A=h[T];for(let v=0;v<A.lessons.length;v++){const R=A.lessons[v];if(b&&Zu(T,v,s,h)){e(R);return}R.id===t.id&&(b=!0)}}},M=s.completedLessons.includes(t.id),S=s.completedSteps[t.id]||[];return f.jsxs("div",{style:YA,children:[n==="ADMIN"&&f.jsxs("div",{style:$A,children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[f.jsx("span",{style:{fontSize:"11px",fontWeight:"bold",color:"#ffb74d"},children:"⚙️ Painel ADM:"}),f.jsx("button",{onClick:E,style:{...R0,background:c?"#00e676":"#374151",color:c?"#000":"#fff"},title:"Libera o acesso imediato a todos os módulos",children:c?"🔓 Todos Módulos Liberados":"🔒 Trava Sequencial Ativa"})]}),f.jsx("button",{onClick:g,style:{...R0,background:"#d32f2f",color:"#fff"},title:"Zera o progresso do aluno para testar o fluxo desde o início",children:"🗑️ Resetar Progresso"})]}),f.jsxs("div",{style:KA,children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"},children:[f.jsx("button",{onClick:()=>_("CFW500"),style:{...w0,background:a==="CFW500"?"#0288d1":"#161b22",borderColor:a==="CFW500"?"#29b6f6":"#30363d",color:a==="CFW500"?"#fff":"#90a4ae"},children:"⚡ Inversor CFW500"}),f.jsx("button",{onClick:()=>_("CFW300"),style:{...w0,background:a==="CFW300"?"#0288d1":"#161b22",borderColor:a==="CFW300"?"#29b6f6":"#30363d",color:a==="CFW300"?"#fff":"#90a4ae"},children:"⚙️ Inversor CFW300"})]}),f.jsx("div",{style:ZA,children:h.map((b,T)=>{const A=Hv(T,s,h),v=Vv(b,s),R=XA(b,s),P=b.lessons.some(I=>I.id===t.id);return f.jsxs("div",{style:{...QA,borderColor:P?"#0288d1":A?"#374151":"#1f242c",background:P?"#132337":A?"#161b22":"#0d1117",opacity:A?1:.5,cursor:A?"pointer":"not-allowed"},onClick:()=>{if(A){m();const I=b.lessons.find((O,$)=>Zu(T,$,s,h))||b.lessons[0];e(I)}},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[f.jsx("span",{style:{fontSize:"14px"},children:A?b.icon:"🔒"}),f.jsx("span",{style:{fontSize:"10px",color:v?"#00e676":"#81d4fa",fontWeight:"bold"},children:v?"✅ 100%":`${R}%`})]}),f.jsxs("strong",{style:{fontSize:"11px",color:A?"#fff":"#6b7280",marginTop:"4px",display:"block"},children:["Módulo ",b.moduleNumber]}),f.jsx("span",{style:{fontSize:"9px",color:"#90a4ae",display:"block",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"},children:b.title}),f.jsx("div",{style:JA,children:f.jsx("div",{style:{...eR,width:`${R}%`,background:v?"#00e676":"#0288d1"}})})]},b.id)})})]}),f.jsxs("div",{style:tR,children:[f.jsxs("div",{style:nR,children:[f.jsxs("strong",{style:{fontSize:"11px",color:"#81d4fa",marginBottom:"8px",display:"block"},children:["Lições do Módulo (",a,"):"]}),f.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:h.map((b,T)=>b.lessons.some(v=>v.id===t.id)?b.lessons.map((v,R)=>{const P=Zu(T,R,s,h),I=s.completedLessons.includes(v.id),O=v.id===t.id;return f.jsx("button",{disabled:!P,onClick:()=>{m(),e(v)},style:{...iR,background:O?"#0288d1":P?"#1f2937":"#111418",color:O?"#fff":P?"#e0e0e0":"#4b5563",borderColor:O?"#29b6f6":"#374151",cursor:P?"pointer":"not-allowed"},children:f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[f.jsx("span",{children:I?"✅":P?v.type==="THEORY"?"📖":"🛠️":"🔒"}),f.jsx("span",{style:{fontSize:"11px",textAlign:"left",flex:1},children:v.title})]})},v.id)}):null)})]}),f.jsxs("div",{style:rR,children:[f.jsxs("div",{style:aR,children:[f.jsxs("div",{children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[f.jsx("span",{style:oR,children:t.type==="THEORY"?"📖 TEORIA & CONCEITO":"🛠️ PRÁTICA INTERATIVA"}),f.jsxs("span",{style:{fontSize:"10px",color:"#90a4ae"},children:["⏱️ ",t.durationMin," min"]})]}),f.jsx("h2",{style:{fontSize:"15px",color:"#fff",margin:"6px 0 2px 0"},children:t.title}),f.jsx("p",{style:{fontSize:"11px",color:"#b0bec5",margin:0},children:t.description})]}),f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t.type==="PRACTICE"&&f.jsx("button",{onClick:m,style:sR,title:"Restaura os parâmetros do inversor para o padrão de fábrica da bancada",children:"🔄 Resetar Inversor"}),M?f.jsx("span",{style:lR,children:"✓ CONCLUÍDA"}):f.jsx("span",{style:cR,children:"EM ANDAMENTO"})]})]}),t.type==="THEORY"&&t.theoryData&&f.jsxs("div",{style:uR,children:[f.jsx("h3",{style:{fontSize:"13px",color:"#81d4fa",marginBottom:"8px"},children:t.theoryData.title}),f.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:t.theoryData.content.map((b,T)=>f.jsx("p",{style:{fontSize:"11px",color:"#cfd8dc",lineHeight:"1.5",margin:0},children:b},T))}),t.id==="l0-1"&&f.jsxs("div",{style:dR,children:[f.jsx("a",{href:"/WEG-CFW500-programming-manual-10001469555-pt.pdf",target:"_blank",rel:"noopener noreferrer",style:fR,children:"📥 WEG-CFW500-programming-manual-10001469555-pt.pdf"}),f.jsx("span",{style:{fontSize:"10px",color:"#81d4fa",fontWeight:"bold"},children:"👇 Baixe o manual"})]}),t.theoryData.diagramInfo&&f.jsxs("div",{style:pR,children:[f.jsx("strong",{style:{fontSize:"10px",color:"#00e676"},children:"Fluxo / Diagrama:"}),f.jsx("div",{style:{fontSize:"11px",color:"#fff",marginTop:"2px",fontFamily:"monospace"},children:t.theoryData.diagramInfo})]}),f.jsxs("div",{style:hR,children:[f.jsx("strong",{children:"💡 Ponto-Chave para o Eletricista:"}),f.jsx("p",{style:{margin:"4px 0 0 0",fontSize:"11px",color:"#eceff1"},children:t.theoryData.keyTakeaway})]}),f.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"14px",gap:"8px"},children:M?f.jsx("button",{onClick:x,style:P0,children:"Próxima Lição ➔"}):f.jsx("button",{onClick:d,style:xR,children:"✓ Concluir Leitura (OK)"})})]}),t.type==="PRACTICE"&&t.steps&&f.jsxs("div",{style:mR,children:[f.jsx("strong",{style:{fontSize:"11px",color:"#81d4fa",display:"block",marginBottom:"6px"},children:"Checklist Prático no Painel e IHM ao lado:"}),f.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:t.steps.map((b,T)=>{const A=S.includes(b.id)||b.isCompleted(i);return f.jsxs("div",{style:{...gR,borderColor:A?"#00e676":"#374151",background:A?"rgba(0, 230, 118, 0.08)":"#161b22"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[f.jsx("span",{style:{fontSize:"13px"},children:A?"✅":"⭕"}),f.jsxs("strong",{style:{fontSize:"11px",color:A?"#00e676":"#fff"},children:[T+1,". ",b.title]})]}),f.jsx("span",{style:{fontSize:"9px",color:A?"#00e676":"#ffb74d",fontWeight:"bold"},children:A?"OK":"Pendente"})]}),f.jsx("p",{style:{fontSize:"10px",color:"#b0bec5",margin:"3px 0 0 22px"},children:b.instruction})]},b.id)})}),M&&f.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px"},children:f.jsx("button",{onClick:x,style:P0,children:"🎉 Tarefa Concluída! Próxima Lição ➔"})})]})]})]})]})},YA={background:"#11151a",border:"1px solid #252e3b",borderRadius:"12px",padding:"12px",display:"flex",flexDirection:"column",gap:"10px",width:"100%",boxSizing:"border-box"},$A={display:"flex",justifyContent:"space-between",alignItems:"center",background:"#1b222c",border:"1px solid #374151",borderRadius:"8px",padding:"6px 10px",boxSizing:"border-box"},R0={border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"10px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s ease"},w0={border:"1px solid",borderRadius:"6px",padding:"5px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s ease"},KA={display:"flex",flexDirection:"column",gap:"6px"},ZA={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(130px, 1fr))",gap:"6px"},QA={borderRadius:"8px",padding:"6px 8px",border:"1px solid",transition:"all 0.2s ease"},JA={height:"3px",background:"#252d38",borderRadius:"2px",marginTop:"4px",overflow:"hidden"},eR={height:"100%",transition:"width 0.3s ease"},tR={display:"flex",flexDirection:"column",gap:"10px"},nR={background:"#0d1117",border:"1px solid #21262d",borderRadius:"8px",padding:"8px",boxSizing:"border-box"},iR={padding:"6px 8px",borderRadius:"6px",border:"1px solid",fontSize:"11px",fontWeight:"bold",transition:"all 0.2s ease",boxSizing:"border-box",width:"100%",textAlign:"left"},rR={background:"#161b22",border:"1px solid #30363d",borderRadius:"8px",padding:"12px",boxSizing:"border-box"},aR={display:"flex",justifyContent:"space-between",alignItems:"flex-start",borderBottom:"1px solid #21262d",paddingBottom:"8px",marginBottom:"8px"},oR={background:"#0288d1",color:"#fff",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",fontWeight:"bold"},sR={background:"#263238",border:"1px solid #455a64",color:"#81d4fa",borderRadius:"6px",padding:"3px 8px",fontSize:"10px",fontWeight:"bold",cursor:"pointer"},lR={background:"rgba(0, 230, 118, 0.15)",border:"1px solid #00e676",color:"#00e676",padding:"3px 6px",borderRadius:"4px",fontSize:"9px",fontWeight:"bold"},cR={background:"rgba(255, 179, 0, 0.15)",border:"1px solid #ffb300",color:"#ffb300",padding:"3px 6px",borderRadius:"4px",fontSize:"9px",fontWeight:"bold"},uR={display:"flex",flexDirection:"column",gap:"6px"},dR={background:"#131e2b",border:"1px solid #0288d1",borderRadius:"8px",padding:"12px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"6px",margin:"8px 0"},fR={background:"#0288d1",color:"#ffffff",textDecoration:"none",borderRadius:"6px",padding:"10px 16px",fontSize:"12px",fontWeight:"bold",display:"inline-flex",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(2, 136, 209, 0.4)",transition:"transform 0.2s ease",cursor:"pointer"},pR={background:"#0d1117",border:"1px dashed #30363d",borderRadius:"6px",padding:"6px 8px",marginTop:"4px"},hR={background:"#1f2937",borderLeft:"3px solid #00e676",padding:"6px 8px",borderRadius:"0 4px 4px 0",marginTop:"4px"},mR={display:"flex",flexDirection:"column",gap:"6px"},gR={padding:"6px 8px",borderRadius:"6px",border:"1px solid",transition:"all 0.2s ease"},xR={background:"#00e676",color:"#000",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},P0={background:"#0288d1",color:"#fff",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},vR=()=>{const{state:t,dispatch:e}=Zn(),[n,i]=ue.useState("ladder"),[r,a]=ue.useState(1),[o,s]=ue.useState(45),[l,c]=ue.useState(!0),[p,h]=ue.useState({I1:!1,I2:!0,I3:!1,I4:!1}),[u,m]=ue.useState({M1:!1,M2:!1}),[_,E]=ue.useState([{id:"rung_1",cells:[{type:"NO",tag:"I1"},{type:"NC",tag:"I2"},{type:"WIRE",tag:""}],coil:{type:"OUT",tag:"Q1"}},{id:"rung_2",cells:[{type:"NO",tag:"I3"},{type:"WIRE",tag:""},{type:"WIRE",tag:""}],coil:{type:"MB_SPEED",tag:"P0681",speedValue:50}}]),[g,d]=ue.useState([]),[x,M]=ue.useState(!1),[S,b]=ue.useState(35),[T,A]=ue.useState([{id:1,time:new Date().toLocaleTimeString(),type:"RX",frame:"01 03 00 00 00 04 44 09",description:"CLIC-02 Modbus Master Polling (Registradores 40001 a 40004)"}]),v=(N,X,Z)=>{A(ce=>[{id:Date.now(),time:new Date().toLocaleTimeString(),type:N,frame:X,description:Z},...ce.slice(0,19)])},R=()=>{const N=Object.keys(p);if(N.length>=12)return;const Z=`I${N.length+1}`;h(ce=>({...ce,[Z]:!1}))},P=()=>{const N=Object.keys(p);if(N.length<=2)return;const X=N[N.length-1];h(Z=>{const ce={...Z};return delete ce[X],ce})},I=N=>{if(N.type==="NONE")return!1;if(N.type==="WIRE")return!0;const X=N.tag.startsWith("I"),Z=N.tag.startsWith("M"),ce=X?!!p[N.tag]:Z?!!u[N.tag]:!1;return N.type==="NO"?ce:N.type==="NC"?!ce:!1},O=N=>{let X=!0;for(const Z of N.cells){if(Z.type==="NONE")return!1;if(!I(Z)){X=!1;break}}return X};ue.useEffect(()=>{if(!l||n!=="ladder")return;let N=!1;_.forEach(X=>{const Z=O(X);if(X.coil.type==="OUT")X.coil.tag==="Q1"?N=Z:X.coil.tag.startsWith("M")&&m(ce=>({...ce,[X.coil.tag]:Z}));else if(X.coil.type==="SET"&&Z)X.coil.tag==="Q1"&&(N=!0);else if(X.coil.type==="RST"&&Z)X.coil.tag==="Q1"&&(N=!1);else if(X.coil.type==="MB_SPEED"&&Z){const ce=X.coil.speedValue||50,Ie=Math.round(ce/60*8192).toString(16).toUpperCase().padStart(4,"0");Math.abs(t.parameters.P0121.currentValue-ce)>.5&&(v("TX",`01 06 00 01 ${Ie.slice(0,2)} ${Ie.slice(2)}`,`[CLIC-02 LADDER] MB_WRITE_SPEED: P0681 = ${ce} Hz`),e({type:"SELECT_PARAM_DIRECT",payload:"P0121"}),e({type:"SET_ANALOG_INPUT_1",payload:ce/60*10}))}}),N&&t.motorStatus!=="RUNNING"?(v("TX","01 06 00 00 00 01 48 0A","[CLIC-02] Coil Q1 energizada -> MB_WRITE(40001, 1) RUN"),e({type:"PRESS_RUN"})):!N&&t.motorStatus==="RUNNING"&&(v("TX","01 06 00 00 00 00 89 CA","[CLIC-02] Coil Q1 desenergizada -> MB_WRITE(40001, 0) STOP"),e({type:"PRESS_STOP"}))},[l,p,u,_,n,t.motorStatus,t.parameters.P0121.currentValue,e]);const $=(N,X)=>{if(l)return;const Z=[..._],ce=Z[N].cells[X],De=["NO","NC","WIRE","NONE"],Ie=(De.indexOf(ce.type)+1)%De.length,K=De[Ie];Z[N].cells[X]={type:K,tag:K==="WIRE"||K==="NONE"?"":ce.tag||"I1"},E(Z)},ee=(N,X,Z)=>{const ce=[..._];ce[N].cells[X].tag=Z,E(ce)},D=N=>{if(l)return;const X=[..._],Z=X[N].coil,ce=["OUT","SET","RST","MB_SPEED"],De=(ce.indexOf(Z.type)+1)%ce.length,Ie=ce[De];X[N].coil={type:Ie,tag:Ie==="MB_SPEED"?"P0681":"Q1",speedValue:Z.speedValue||50},E(X)},G=()=>{_.length>=8||E([..._,{id:`rung_${Date.now()}`,cells:[{type:"NO",tag:"I1"},{type:"WIRE",tag:""},{type:"WIRE",tag:""}],coil:{type:"OUT",tag:"Q1"}}])},L=N=>{_.length<=1||E(_.filter((X,Z)=>Z!==N))},U=()=>{M(!0),d(["[INIT] Serial2.begin(19200, SERIAL_8N1);","[MODBUS] node.begin(1, Serial2);",`[TX] node.writeSingleRegister(0x0001, ${Math.round(S/60*8192)}); // Speed ${S}Hz`]);const N=Math.round(S/60*8192),X=N.toString(16).toUpperCase().padStart(4,"0");v("TX",`01 06 00 01 ${X.slice(0,2)} ${X.slice(2)}`,`C++ ModbusMaster::writeSingleRegister(0x0001, ${N})`),e({type:"SELECT_PARAM_DIRECT",payload:"P0121"}),e({type:"SET_ANALOG_INPUT_1",payload:S/60*10}),setTimeout(()=>{d(Z=>[...Z,"[TX] node.writeSingleRegister(0x0000, 0x0001); // CMD: START"]),v("TX","01 06 00 00 00 01 48 0A","C++ CMD START INVERTER"),e({type:"PRESS_RUN"}),setTimeout(()=>{d(Z=>[...Z,"[RX] uint8_t res = node.readHoldingRegisters(0x0003, 3);",`[DATA] Freq: ${S.toFixed(1)}Hz | I: ${t.outputCurrent.toFixed(1)}A | RPM: ${t.motorRPM}`]),M(!1)},500)},400)},V=Object.keys(p);return f.jsxs("div",{style:_R,children:[f.jsxs("div",{style:yR,children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[f.jsx("span",{style:{fontSize:"18px"},children:"📡"}),f.jsxs("div",{children:[f.jsx("strong",{style:{color:"#fff",fontSize:"14px"},children:"AUTOMAÇÃO & MODBUS RTU RS-485 (WEG CLIC-02 / C++)"}),f.jsx("div",{style:{fontSize:"10px",color:"#90a4ae"},children:"Simulador SoftPLC IEC 61131-3 & Arduino Embedded"})]})]}),f.jsxs("div",{style:SR,children:[f.jsx("button",{onClick:()=>i("ladder"),style:{...Qu,background:n==="ladder"?"#00897b":"#1e2229",color:n==="ladder"?"#fff":"#90a4ae"},children:"🪜 Editor Ladder CLIC-02"}),f.jsx("button",{onClick:()=>i("standard"),style:{...Qu,background:n==="standard"?"#0288d1":"#1e2229",color:n==="standard"?"#fff":"#90a4ae"},children:"🎛️ Painel SCADA"}),f.jsx("button",{onClick:()=>i("cpp"),style:{...Qu,background:n==="cpp"?"#7b1fa2":"#1e2229",color:n==="cpp"?"#fff":"#90a4ae"},children:"💻 Código C++ (Arduino/ESP)"})]})]}),n==="ladder"&&f.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[f.jsxs("div",{style:MR,children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[f.jsx("button",{onClick:()=>c(!l),style:{...ai,background:l?"#2e7d32":"#c62828",padding:"6px 14px",display:"flex",alignItems:"center",gap:"6px"},children:f.jsx("span",{children:l?"🟢 MODO: RUN":"🔴 MODO: STOP / EDIT"})}),f.jsx("span",{style:{fontSize:"11px",color:"#80cbc4"},children:l?"⚡ Programa em execução contínua":"✏️ Clique nos contatos ou bobinas para editar"})]}),f.jsx("button",{onClick:G,disabled:l||_.length>=8,style:{...ai,background:l?"#37474f":"#00796b",padding:"6px 12px",opacity:l?.6:1,cursor:l?"not-allowed":"pointer"},children:"➕ Adicionar Rung (Linha)"})]}),f.jsx("div",{style:ER,children:_.map((N,X)=>{const Z=l&&O(N);return f.jsxs("div",{style:TR,children:[f.jsx("div",{style:{...I0,background:l?"#00e676":"#546e7a"}}),N.cells.map((ce,De)=>{const Ie=l&&I(ce);return f.jsxs(K0.Fragment,{children:[f.jsxs("div",{onClick:()=>$(X,De),style:{...CR,borderColor:Ie?"#00e676":l?"#37474f":"#0288d1",background:Ie?"rgba(0, 230, 118, 0.08)":"#12161b",cursor:l?"default":"pointer"},title:l?"":"Clique para alternar: NA -> NF -> FIO -> VAZIO",children:[ce.type==="NONE"&&f.jsx("span",{style:{color:"#455a64"},children:"— Vazio —"}),ce.type==="WIRE"&&f.jsx("div",{style:{width:"100%",height:"2px",background:Ie?"#00e676":"#546e7a"}}),(ce.type==="NO"||ce.type==="NC")&&f.jsxs(f.Fragment,{children:[l?f.jsx("span",{style:{fontSize:"10px",color:"#90a4ae"},children:ce.tag}):f.jsxs("select",{value:ce.tag,onChange:K=>ee(X,De,K.target.value),onClick:K=>K.stopPropagation(),style:RR,children:[V.map(K=>f.jsxs("option",{value:K,children:[K," ",K==="I1"?"(Start)":K==="I2"?"(Stop NF)":""]},K)),f.jsx("option",{value:"M1",children:"M1 (Flag)"}),f.jsx("option",{value:"M2",children:"M2 (Flag)"})]}),f.jsx("strong",{style:{fontSize:"14px",color:Ie?"#00e676":"#fff"},children:ce.type==="NO"?"[   ]":"[ / ]"}),f.jsx("small",{style:{fontSize:"9px",color:Ie?"#00e676":"#78909c"},children:ce.type==="NO"?"NA":"NF"})]})]}),f.jsx("div",{style:{...bR,background:Ie?"#00e676":"#37474f"}})]},De)}),f.jsx("div",{onClick:()=>D(X),style:{...AR,borderColor:Z?"#00e676":l?"#37474f":"#ab47bc",background:Z?"rgba(0, 230, 118, 0.12)":"#12161b",cursor:l?"default":"pointer"},title:l?"":"Clique para alternar tipo de bobina (OUT, SET, RST, MB_SPEED)",children:N.coil.type==="MB_SPEED"?f.jsxs("div",{style:{textAlign:"center"},children:[f.jsx("span",{style:{fontSize:"9px",color:"#ce93d8",fontWeight:"bold"},children:"MB_SPEED (P0681)"}),l?f.jsxs("div",{style:{fontSize:"11px",color:Z?"#00e676":"#fff",fontWeight:"bold"},children:[N.coil.speedValue," Hz"]}):f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",marginTop:"2px"},children:[f.jsx("input",{type:"number",min:"0",max:"60",value:N.coil.speedValue||50,onClick:ce=>ce.stopPropagation(),onChange:ce=>{const De=[..._];De[X].coil.speedValue=Number(ce.target.value),E(De)},style:{width:"45px",background:"#1c2128",color:"#fff",border:"1px solid #444",textAlign:"center",fontSize:"10px"}}),f.jsx("span",{style:{fontSize:"9px",color:"#aaa"},children:"Hz"})]})]}):f.jsxs(f.Fragment,{children:[f.jsxs("span",{style:{fontSize:"10px",color:"#90a4ae"},children:[N.coil.type," ",N.coil.tag]}),f.jsxs("strong",{style:{fontSize:"14px",color:Z?"#00e676":"#fff"},children:["( ",N.coil.tag==="Q1"?"CFW_RUN":N.coil.tag," )"]}),f.jsx("small",{style:{fontSize:"9px",color:Z?"#00e676":"#78909c"},children:Z?"ON":"OFF"})]})}),f.jsx("div",{style:{...I0,background:"#37474f"}}),!l&&f.jsx("button",{onClick:()=>L(X),style:{background:"#c62828",border:"none",color:"#fff",borderRadius:"4px",cursor:"pointer",padding:"4px 8px",fontSize:"10px"},children:"✖"})]},N.id)})}),f.jsxs("div",{style:bo,children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",flexWrap:"wrap",gap:"6px"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[f.jsxs("span",{style:{fontSize:"11px",color:"#90caf9",fontWeight:"bold"},children:["Bancada de Chaves do CLP (Entradas I1 a I",V.length,"):"]}),f.jsxs("span",{style:{fontSize:"10px",color:"#80cbc4"},children:["(",V.length," entradas ativas)"]})]}),f.jsxs("div",{style:{display:"flex",gap:"6px"},children:[f.jsx("button",{onClick:R,disabled:V.length>=12,style:{...ai,background:V.length>=12?"#37474f":"#0288d1",padding:"4px 8px",fontSize:"10px",opacity:V.length>=12?.5:1,cursor:V.length>=12?"not-allowed":"pointer"},title:"Adicionar entrada digital (até I12)",children:"➕ Adicionar Entrada"}),f.jsx("button",{onClick:P,disabled:V.length<=2,style:{...ai,background:V.length<=2?"#37474f":"#b71c1c",padding:"4px 8px",fontSize:"10px",opacity:V.length<=2?.5:1,cursor:V.length<=2?"not-allowed":"pointer"},title:"Remover última entrada (mínimo 2)",children:"➖ Remover Entrada"})]})]}),f.jsx("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:V.map(N=>{const X=p[N];return f.jsxs("button",{onClick:()=>h(Z=>({...Z,[N]:!Z[N]})),style:{...ai,background:X?"#00e676":"#263238",color:X?"#0f2410":"#eceff1",border:X?"1px solid #69f0ae":"1px solid #455a64",minWidth:"85px",padding:"8px",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"},children:[f.jsxs("strong",{children:[N," ",N==="I1"?"(Start)":N==="I2"?"(Stop NF)":""]}),f.jsx("span",{style:{fontSize:"10px"},children:X?"FECHADO (1)":"ABERTO (0)"})]},N)})})]})]}),n==="standard"&&f.jsxs("div",{style:D0,children:[f.jsxs("div",{style:bo,children:[f.jsx("h4",{style:Co,children:"Comandos Manuais Modbus (Holding Registers)"}),f.jsxs("div",{style:wR,children:[f.jsx("label",{style:L0,children:"Slave Address (P0313):"}),f.jsx("input",{type:"number",min:"1",max:"247",value:r,onChange:N=>a(Number(N.target.value)),style:PR})]}),f.jsxs("div",{style:{display:"flex",gap:"8px",marginTop:"10px"},children:[f.jsx("button",{style:{...ai,background:"#2e7d32"},onClick:()=>{v("TX","01 06 00 00 00 01 48 0A","Write 40001 = 0x0001 (RUN)"),e({type:"PRESS_RUN"})},children:"▶ LIGAR (RUN)"}),f.jsx("button",{style:{...ai,background:"#c62828"},onClick:()=>{v("TX","01 06 00 00 00 00 89 CA","Write 40001 = 0x0000 (STOP)"),e({type:"PRESS_STOP"})},children:"⏹ PARAR (STOP)"}),f.jsx("button",{style:{...ai,background:"#0277bd"},onClick:()=>{v("TX","01 06 00 00 00 04 88 09","Write 40001 = 0x0004 (Inverte Sentido)"),e({type:"PRESS_DIRECTION"})},children:"↻/↺ SENTIDO"})]}),f.jsxs("div",{style:{marginTop:"14px"},children:[f.jsxs("label",{style:{...L0,display:"flex",justifyContent:"space-between"},children:[f.jsx("span",{children:"Frequência P0681 (0 - 8192):"}),f.jsxs("strong",{style:{color:"#64b5f6"},children:[o.toFixed(1)," Hz"]})]}),f.jsxs("div",{style:{display:"flex",gap:"8px",marginTop:"6px"},children:[f.jsx("input",{type:"range",min:"0",max:"60",step:"0.5",value:o,onChange:N=>s(Number(N.target.value)),style:{flex:1}}),f.jsx("button",{style:{...ai,background:"#37474f",padding:"6px 12px"},onClick:()=>{const X=Math.round(o/60*8192).toString(16).toUpperCase().padStart(4,"0");v("TX",`01 06 00 01 ${X.slice(0,2)} ${X.slice(2)}`,`Write P0681 = ${o}Hz`),e({type:"SELECT_PARAM_DIRECT",payload:"P0121"}),e({type:"SET_ANALOG_INPUT_1",payload:o/60*10})},children:"Enviar"})]})]})]}),f.jsxs("div",{style:bo,children:[f.jsx("h4",{style:Co,children:"Mapeamento de Registradores WEG CFW500"}),f.jsxs("table",{style:IR,children:[f.jsx("thead",{children:f.jsxs("tr",{style:{color:"#90a4ae",borderBottom:"1px solid #2a2f38",textAlign:"left",fontSize:"10px"},children:[f.jsx("th",{style:{padding:"4px"},children:"REG"}),f.jsx("th",{style:{padding:"4px"},children:"PARÂMETRO"}),f.jsx("th",{style:{padding:"4px"},children:"HEX BRUTO"}),f.jsx("th",{style:{padding:"4px"},children:"ENGENHARIA"})]})}),f.jsxs("tbody",{children:[f.jsxs("tr",{style:dl,children:[f.jsx("td",{style:wn,children:"40001"}),f.jsx("td",{style:wn,children:"P0680 (Controle)"}),f.jsxs("td",{style:fl,children:["0x",t.motorStatus==="RUNNING"?"0001":"0000"]}),f.jsx("td",{style:wn,children:t.motorStatus})]}),f.jsxs("tr",{style:dl,children:[f.jsx("td",{style:wn,children:"40002"}),f.jsx("td",{style:wn,children:"P0681 (Velocidade)"}),f.jsxs("td",{style:fl,children:["0x",Math.round(t.outputFrequency/60*8192).toString(16).toUpperCase()]}),f.jsxs("td",{style:wn,children:[t.outputFrequency.toFixed(1)," Hz"]})]}),f.jsxs("tr",{style:dl,children:[f.jsx("td",{style:wn,children:"40004"}),f.jsx("td",{style:wn,children:"P0002 (Freq. Saída)"}),f.jsxs("td",{style:fl,children:["0x",Math.round(t.outputFrequency*10).toString(16).toUpperCase()]}),f.jsxs("td",{style:{...wn,color:"#00e676",fontWeight:"bold"},children:[t.outputFrequency.toFixed(1)," Hz"]})]}),f.jsxs("tr",{style:dl,children:[f.jsx("td",{style:wn,children:"40005"}),f.jsx("td",{style:wn,children:"P0003 (Corrente)"}),f.jsxs("td",{style:fl,children:["0x",Math.round(t.outputCurrent*10).toString(16).toUpperCase()]}),f.jsxs("td",{style:{...wn,color:"#ffb300"},children:[t.outputCurrent.toFixed(1)," A"]})]})]})]})]})]}),n==="cpp"&&f.jsxs("div",{style:D0,children:[f.jsxs("div",{style:bo,children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[f.jsx("h4",{style:{...Co,color:"#ba68c8"},children:"📄 firmware_modbus_cfw500.cpp"}),f.jsx("span",{style:{fontSize:"10px",color:"#ce93d8"},children:"C++17 • ModbusMaster.h"})]}),f.jsx("pre",{style:DR,children:`#include <Arduino.h>
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
}`}),f.jsxs("div",{style:{display:"flex",gap:"8px",marginTop:"10px",alignItems:"center"},children:[f.jsxs("label",{style:{fontSize:"11px",color:"#cfd8dc"},children:["Freq: ",S,"Hz"]}),f.jsx("input",{type:"range",min:"5",max:"60",value:S,onChange:N=>b(Number(N.target.value)),style:{flex:1}}),f.jsx("button",{style:{...ai,background:x?"#6a1b9a":"#8e24aa"},onClick:U,disabled:x,children:x?"⏳ Compilando...":"▶ Compilar & Executar"})]})]}),f.jsxs("div",{style:bo,children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[f.jsx("h4",{style:{...Co,color:"#ba68c8"},children:"🖥️ Monitor Serial (Output RS-485)"}),f.jsx("span",{style:{fontSize:"10px",color:"#90a4ae"},children:"19200 baud"})]}),f.jsx("div",{style:LR,children:g.length===0?f.jsx("span",{style:{color:"#546e7a"},children:'// Pressione "Compilar & Executar" para carregar a rotina C++...'}):g.map((N,X)=>f.jsx("div",{style:{marginBottom:"4px"},children:f.jsx("span",{style:{color:N.startsWith("[TX]")?"#ba68c8":N.startsWith("[RX]")?"#00e676":"#90caf9"},children:N})},X))})]})]}),f.jsxs("div",{style:{marginTop:"12px"},children:[f.jsx("h4",{style:{...Co,marginBottom:"6px"},children:"Sniffer de Rede RS-485 (Transmissão de Pacotes RTU):"}),f.jsx("div",{style:NR,children:T.map(N=>f.jsxs("div",{style:{display:"flex",gap:"8px",fontSize:"11px",fontFamily:"monospace",marginBottom:"3px"},children:[f.jsxs("span",{style:{color:"#546e7a"},children:["[",N.time,"]"]}),f.jsxs("span",{style:{color:N.type==="TX"?"#00e676":"#64b5f6",fontWeight:"bold"},children:[N.type,":"]}),f.jsx("span",{style:{color:"#eceff1",letterSpacing:"1px"},children:N.frame}),f.jsxs("span",{style:{color:"#90a4ae"},children:["— ",N.description]})]},N.id))})]})]})},_R={background:"#16191d",borderRadius:"12px",padding:"14px",border:"1px solid #282f3a",width:"100%",boxSizing:"border-box"},yR={display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px",borderBottom:"1px solid #232a35",paddingBottom:"10px",marginBottom:"12px"},SR={display:"flex",gap:"6px",flexWrap:"wrap"},Qu={padding:"6px 12px",borderRadius:"6px",border:"1px solid #323842",fontSize:"11px",fontWeight:700,cursor:"pointer"},MR={display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0f1216",padding:"8px 12px",borderRadius:"8px",border:"1px solid #252e38",flexWrap:"wrap",gap:"8px"},ER={background:"#0a0c0e",padding:"12px",borderRadius:"8px",border:"1px solid #1c222b",display:"flex",flexDirection:"column",gap:"10px",overflowX:"auto"},TR={display:"flex",alignItems:"center",gap:"6px",minWidth:"580px"},I0={width:"6px",height:"52px",borderRadius:"2px",flexShrink:0},bR={flex:1,height:"2px",minWidth:"12px"},CR={width:"100px",height:"52px",border:"1px solid #37474f",borderRadius:"6px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",userSelect:"none",flexShrink:0},AR={width:"120px",height:"52px",border:"1px solid #37474f",borderRadius:"6px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",userSelect:"none",flexShrink:0},RR={background:"#1a1f26",color:"#80cbc4",border:"1px solid #37474f",borderRadius:"3px",fontSize:"9px",padding:"1px 2px"},D0={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"12px"},bo={background:"#101215",padding:"12px",borderRadius:"8px",border:"1px solid #202630",display:"flex",flexDirection:"column"},Co={fontSize:"12px",color:"#90caf9",marginBottom:"10px",fontWeight:700},wR={display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},L0={fontSize:"11px",color:"#b0bec5"},PR={background:"#1e2229",border:"1px solid #3e4756",color:"#fff",borderRadius:"4px",padding:"4px 8px",width:"60px",textAlign:"center"},ai={padding:"8px 10px",color:"#fff",border:"none",borderRadius:"6px",fontWeight:"bold",fontSize:"11px",cursor:"pointer"},IR={width:"100%",borderCollapse:"collapse",fontSize:"11px"},dl={borderBottom:"1px solid #1a1e24"},wn={padding:"5px 4px",color:"#cfd8dc"},fl={padding:"5px 4px",color:"#ffb74d",fontFamily:"monospace"},DR={background:"#0a0c0e",border:"1px solid #23272e",borderRadius:"6px",padding:"10px",fontFamily:"monospace",fontSize:"11px",color:"#e0e0e0",maxHeight:"220px",overflowY:"auto"},LR={background:"#0a0c0e",border:"1px solid #23272e",borderRadius:"6px",padding:"10px",fontFamily:"monospace",fontSize:"11px",minHeight:"220px",maxHeight:"220px",overflowY:"auto"},NR={background:"#0a0c0e",border:"1px solid #1e232b",borderRadius:"6px",padding:"8px 10px",maxHeight:"130px",overflowY:"auto"},io="https://gaflink.com.br/auth.php",Gv=[{id:"admin_master",username:"admin",name:"Gildon Gledson (Instrutor)",email:"gildongledson@gmail.com",password:"123",role:"ADMIN",status:"APPROVED",requestedAt:"Hoje"},{id:"student_demo",username:"aluno",name:"Aluno Demonstração",email:"aluno@gaflink.com.br",password:"123",role:"STUDENT",status:"APPROVED",requestedAt:"Hoje"}],FR=async()=>{try{const t=await fetch(`${io}?action=list`);if(t.ok){const e=await t.json();if(e.success&&Array.isArray(e.users))return e.users}}catch(t){console.warn("Servidor UOLHost offline ou sem resposta, usando fallback local:",t)}return Gv},UR=async(t,e)=>{const n=t.trim().toLowerCase(),i=e.trim();try{const a=await fetch(`${io}?action=login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:i})});if(a.ok)return await a.json()}catch(a){console.warn("Falha na requisição ao UOLHost, tentando autenticação local:",a)}const r=Gv.find(a=>a.username.toLowerCase()===n&&a.password===i);return r?{success:!0,user:r}:{success:!1,message:"Usuário ou senha inválidos. Verifique suas credenciais."}},OR=async t=>{try{const e=await fetch(`${io}?action=register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t.username.trim(),name:t.name.trim(),email:t.email.trim(),password:t.password.trim()})});if(e.ok)return await e.json()}catch(e){console.warn("Erro ao conectar ao UOLHost:",e)}return{success:!1,message:"Não foi possível conectar ao servidor. Tente novamente em instantes."}},zR=async t=>{try{const e=await fetch(`${io}?action=create_manual`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t.name.trim(),username:t.username.trim(),email:t.email.trim(),password:t.password.trim()})});if(e.ok)return await e.json()}catch(e){console.warn("Erro ao salvar no UOLHost:",e)}return{success:!1,message:"Erro de comunicação com o servidor ao cadastrar aluno."}},N0=async(t,e)=>{try{await fetch(`${io}?action=update_status`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t,status:e})})}catch(n){console.warn("Erro ao atualizar status:",n)}},kR=async t=>{try{await fetch(`${io}?action=delete`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t})})}catch(e){console.warn("Erro ao excluir usuário:",e)}},BR=({onLoginSuccess:t})=>{const[e,n]=ue.useState(!1),[i,r]=ue.useState(""),[a,o]=ue.useState(""),[s,l]=ue.useState(""),[c,p]=ue.useState(""),[h,u]=ue.useState(""),[m,_]=ue.useState(""),[E,g]=ue.useState(null),[d,x]=ue.useState(!1),M=async b=>{b.preventDefault(),g(null),x(!0);const T=await UR(i,a);if(x(!1),T.success&&T.user){const A={name:T.user.name,role:T.user.role,username:T.user.username};localStorage.setItem("cfw500_auth_user",JSON.stringify(A)),t(A)}else g({type:"error",text:T.message||"Credenciais inválidas."})},S=async b=>{b.preventDefault(),g(null),x(!0);const T=await OR({name:s,email:c,username:h,password:m});x(!1),T.success?(g({type:"success",text:T.message}),l(""),p(""),u(""),_(""),setTimeout(()=>n(!1),3500)):g({type:"error",text:T.message})};return f.jsx("div",{style:VR,children:f.jsxs("div",{style:HR,children:[f.jsxs("div",{style:GR,children:[f.jsx("div",{style:WR,children:"⚡"}),f.jsx("h2",{style:{fontSize:"18px",color:"#fff",margin:"8px 0 2px 0"},children:"Portal de Treinamento CFW500"}),f.jsx("span",{style:{fontSize:"11px",color:"#90a4ae"},children:"GafLink Automação • Plataforma de Capacitação Técnica"})]}),E&&f.jsx("div",{style:{...jR,background:E.type==="error"?"rgba(211, 47, 47, 0.15)":"rgba(0, 230, 118, 0.15)",borderColor:E.type==="error"?"#d32f2f":"#00e676",color:E.type==="error"?"#ff8a80":"#b9f6ca"},children:f.jsxs("span",{children:[E.type==="error"?"⚠️":"✅"," ",E.text]})}),!e&&f.jsxs("form",{onSubmit:M,style:{display:"flex",flexDirection:"column",gap:"12px"},children:[f.jsxs("div",{children:[f.jsx("label",{style:pa,children:"Usuário:"}),f.jsx("input",{type:"text",required:!0,value:i,onChange:b=>r(b.target.value),placeholder:"Digite seu usuário",style:ha,autoFocus:!0})]}),f.jsxs("div",{children:[f.jsx("label",{style:pa,children:"Senha:"}),f.jsx("input",{type:"password",required:!0,value:a,onChange:b=>o(b.target.value),placeholder:"••••••••",style:ha})]}),f.jsx("button",{type:"submit",disabled:d,style:{...F0,background:d?"#01579b":"#0288d1",cursor:d?"not-allowed":"pointer"},children:d?"Verificando...":"Acessar Plataforma ➔"}),f.jsxs("div",{style:{textAlign:"center",marginTop:"6px"},children:[f.jsx("span",{style:{fontSize:"11px",color:"#90a4ae"},children:"Ainda não possui acesso? "}),f.jsx("button",{type:"button",onClick:()=>{g(null),n(!0)},style:U0,children:"Solicitar Cadastro"})]})]}),e&&f.jsxs("form",{onSubmit:S,style:{display:"flex",flexDirection:"column",gap:"10px"},children:[f.jsxs("div",{children:[f.jsx("label",{style:pa,children:"Nome Completo:"}),f.jsx("input",{type:"text",required:!0,value:s,onChange:b=>l(b.target.value),placeholder:"Ex: Carlos Silva",style:ha,autoFocus:!0})]}),f.jsxs("div",{children:[f.jsx("label",{style:pa,children:"E-mail:"}),f.jsx("input",{type:"email",required:!0,value:c,onChange:b=>p(b.target.value),placeholder:"carlos@exemplo.com",style:ha})]}),f.jsxs("div",{children:[f.jsx("label",{style:pa,children:"Usuário Desejado:"}),f.jsx("input",{type:"text",required:!0,value:h,onChange:b=>u(b.target.value),placeholder:"carlos.silva",style:ha})]}),f.jsxs("div",{children:[f.jsx("label",{style:pa,children:"Senha:"}),f.jsx("input",{type:"password",required:!0,value:m,onChange:b=>_(b.target.value),placeholder:"••••••••",style:ha})]}),f.jsx("button",{type:"submit",disabled:d,style:{...F0,background:d?"#004d40":"#00897b",cursor:d?"not-allowed":"pointer"},children:d?"Enviando Pedido...":"Enviar Solicitação de Cadastro 📩"}),f.jsx("div",{style:{textAlign:"center",marginTop:"4px"},children:f.jsx("button",{type:"button",onClick:()=>{g(null),n(!1)},style:U0,children:"← Voltar para o Login"})})]})]})})},VR={minHeight:"100vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center",background:"radial-gradient(circle at center, #1b222d 0%, #0c0f13 100%)",padding:"16px",boxSizing:"border-box"},HR={background:"#14181f",border:"1px solid #2d3748",borderRadius:"16px",padding:"24px",maxWidth:"400px",width:"100%",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.6), 0 0 15px rgba(2, 136, 209, 0.1)",display:"flex",flexDirection:"column",gap:"14px"},GR={display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"},WR={width:"44px",height:"44px",borderRadius:"12px",background:"linear-gradient(135deg, #0288d1 0%, #00e676 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",color:"#fff",boxShadow:"0 4px 12px rgba(2, 136, 209, 0.4)"},jR={border:"1px solid",borderRadius:"8px",padding:"8px 12px",fontSize:"11px",textAlign:"center"},pa={fontSize:"11px",color:"#cfd8dc",fontWeight:600,marginBottom:"4px",display:"block"},ha={width:"100%",background:"#0d1014",border:"1px solid #374151",borderRadius:"8px",padding:"9px 12px",color:"#fff",fontSize:"12px",outline:"none",boxSizing:"border-box"},F0={padding:"11px",color:"#fff",border:"none",borderRadius:"8px",fontSize:"12px",fontWeight:"bold",letterSpacing:"0.5px",boxShadow:"0 4px 14px rgba(0, 0, 0, 0.4)",transition:"all 0.2s ease",marginTop:"4px"},U0={background:"none",border:"none",color:"#64b5f6",fontSize:"11px",fontWeight:"bold",cursor:"pointer",textDecoration:"underline"},XR=()=>{const[t,e]=ue.useState([]),[n,i]=ue.useState(!1),[r,a]=ue.useState(!1),[o,s]=ue.useState(""),[l,c]=ue.useState(""),[p,h]=ue.useState(""),[u,m]=ue.useState(""),[_,E]=ue.useState(null),g=ue.useCallback(async()=>{a(!0);const T=await FR();e(T),a(!1)},[]);ue.useEffect(()=>{g();const T=setInterval(g,8e3);return()=>clearInterval(T)},[g]);const d=async T=>{T.preventDefault(),E(null),a(!0);const A=await zR({name:o,email:l,username:p,password:u});A.success?(E({type:"success",text:A.message}),s(""),c(""),h(""),m(""),await g(),setTimeout(()=>{i(!1),E(null)},1500)):(E({type:"error",text:A.message}),a(!1))},x=async T=>{a(!0),await N0(T,"APPROVED"),await g()},M=async T=>{a(!0),await N0(T,"REJECTED"),await g()},S=async T=>{window.confirm("Deseja realmente remover este cadastro?")&&(a(!0),await kR(T),await g())},b=t.filter(T=>T.status==="PENDING").length;return f.jsxs("div",{style:qR,children:[f.jsxs("div",{style:YR,children:[f.jsxs("div",{children:[f.jsxs("h3",{style:{fontSize:"15px",color:"#fff",display:"flex",alignItems:"center",gap:"8px",margin:0},children:[f.jsx("span",{children:"🛡️"})," Painel de Gestão & Aprovação de Alunos"]}),f.jsxs("span",{style:{fontSize:"11px",color:"#90a4ae"},children:["Servidor Próprio UOLHost • ",f.jsx("strong",{style:{color:"#81d4fa"},children:"gildongledson@gmail.com"})]})]}),f.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[b>0&&f.jsxs("span",{style:$R,children:["⚠️ ",b," ",b===1?"pendente":"pendentes"]}),f.jsx("button",{onClick:g,disabled:r,style:{...KR,opacity:r?.6:1},children:r?"⏳ Sincronizando...":"🔄 Atualizar"}),f.jsx("button",{onClick:()=>{i(!n),E(null)},style:ZR,children:n?"✕ Fechar":"➕ Novo Aluno"})]})]}),n&&f.jsxs("div",{style:QR,children:[f.jsx("strong",{style:{fontSize:"12px",color:"#00e676",display:"block",marginBottom:"8px"},children:"➕ Cadastrar Aluno Manualmente (Salvo no UOLHost com Acesso Imediato)"}),_&&f.jsx("div",{style:{padding:"6px 10px",borderRadius:"6px",fontSize:"11px",marginBottom:"10px",background:_.type==="error"?"rgba(211,47,47,0.2)":"rgba(0,230,118,0.2)",color:_.type==="error"?"#ff8a80":"#b9f6ca",border:`1px solid ${_.type==="error"?"#d32f2f":"#00e676"}`},children:_.text}),f.jsxs("form",{onSubmit:d,style:JR,children:[f.jsxs("div",{children:[f.jsx("label",{style:pl,children:"Nome Completo:"}),f.jsx("input",{type:"text",required:!0,value:o,onChange:T=>s(T.target.value),placeholder:"Ex: Carlos Silva",style:hl})]}),f.jsxs("div",{children:[f.jsx("label",{style:pl,children:"E-mail:"}),f.jsx("input",{type:"email",required:!0,value:l,onChange:T=>c(T.target.value),placeholder:"carlos@gmail.com",style:hl})]}),f.jsxs("div",{children:[f.jsx("label",{style:pl,children:"Usuário de Acesso:"}),f.jsx("input",{type:"text",required:!0,value:p,onChange:T=>h(T.target.value),placeholder:"carlos.silva",style:hl})]}),f.jsxs("div",{children:[f.jsx("label",{style:pl,children:"Senha:"}),f.jsx("input",{type:"text",required:!0,value:u,onChange:T=>m(T.target.value),placeholder:"Ex: 123456",style:hl})]}),f.jsx("div",{style:{gridColumn:"1 / -1",display:"flex",justifyContent:"flex-end",marginTop:"4px"},children:f.jsx("button",{type:"submit",disabled:r,style:e2,children:"💾 Salvar e Liberar Acesso no UOLHost"})})]})]}),f.jsx("div",{style:{overflowX:"auto"},children:f.jsxs("table",{style:t2,children:[f.jsx("thead",{children:f.jsxs("tr",{style:{color:"#90a4ae",borderBottom:"1px solid #2a313d",textAlign:"left",fontSize:"11px"},children:[f.jsx("th",{style:{padding:"8px"},children:"NOME"}),f.jsx("th",{style:{padding:"8px"},children:"USUÁRIO"}),f.jsx("th",{style:{padding:"8px"},children:"SENHA"}),f.jsx("th",{style:{padding:"8px"},children:"STATUS"}),f.jsx("th",{style:{padding:"8px",textAlign:"center"},children:"AÇÕES DE CONTROLE"})]})}),f.jsx("tbody",{children:t.map(T=>f.jsxs("tr",{style:{borderBottom:"1px solid #1a1f26",fontSize:"11px"},children:[f.jsx("td",{style:{padding:"8px",color:"#fff",fontWeight:"bold"},children:T.name}),f.jsxs("td",{style:{padding:"8px",color:"#81d4fa",fontFamily:"monospace"},children:["@",T.username]}),f.jsx("td",{style:{padding:"8px",color:"#ffd54f",fontFamily:"monospace"},children:T.password}),f.jsx("td",{style:{padding:"8px"},children:f.jsx("span",{style:{...n2,background:T.status==="APPROVED"?"rgba(0, 230, 118, 0.15)":T.status==="PENDING"?"rgba(255, 179, 0, 0.15)":"rgba(211, 47, 47, 0.15)",color:T.status==="APPROVED"?"#00e676":T.status==="PENDING"?"#ffb300":"#ff5252",borderColor:T.status==="APPROVED"?"#00e676":T.status==="PENDING"?"#ffb300":"#ff5252"},children:T.status==="APPROVED"?"✓ APROVADO":T.status==="PENDING"?"⏳ PENDENTE":"✕ RECUSADO"})}),f.jsx("td",{style:{padding:"8px",textAlign:"center"},children:T.role!=="ADMIN"?f.jsxs("div",{style:{display:"flex",gap:"6px",justifyContent:"center",alignItems:"center"},children:[T.status!=="APPROVED"&&f.jsx("button",{onClick:()=>x(T.id),style:{...Ju,background:"#2e7d32"},title:"Liberar Acesso",children:"✅ Aprovar"}),T.status!=="REJECTED"&&f.jsx("button",{onClick:()=>M(T.id),style:{...Ju,background:"#d32f2f"},title:"Recusar Acesso",children:"⛔ Recusar"}),f.jsx("button",{onClick:()=>S(T.id),style:{...Ju,background:"#37474f"},title:"Remover Aluno",children:"🗑️"})]}):f.jsx("span",{style:{fontSize:"10px",color:"#90a4ae"},children:"Administrador Master"})})]},T.id))})]})})]})},qR={background:"#14181f",borderRadius:"12px",padding:"16px",border:"1px solid #283344",display:"flex",flexDirection:"column",gap:"12px",width:"100%",boxSizing:"border-box"},YR={display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"10px",borderBottom:"1px solid #222a36",paddingBottom:"10px"},$R={background:"#ff8f00",color:"#000",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:"bold"},KR={background:"#0288d1",color:"#fff",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},ZR={background:"#00897b",color:"#fff",border:"none",borderRadius:"6px",padding:"6px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},QR={background:"#0d1117",border:"1px solid #30363d",borderRadius:"8px",padding:"14px"},JR={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:"10px"},pl={fontSize:"10px",color:"#cfd8dc",fontWeight:"bold",display:"block",marginBottom:"4px"},hl={width:"100%",background:"#161b22",border:"1px solid #30363d",borderRadius:"6px",padding:"8px 10px",color:"#fff",fontSize:"11px",boxSizing:"border-box"},e2={background:"#00e676",color:"#000",border:"none",borderRadius:"6px",padding:"8px 14px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},t2={width:"100%",borderCollapse:"collapse"},n2={padding:"2px 8px",borderRadius:"4px",fontSize:"10px",fontWeight:"bold",border:"1px solid",display:"inline-block"},Ju={border:"none",borderRadius:"4px",color:"#fff",padding:"4px 8px",fontSize:"10px",fontWeight:"bold",cursor:"pointer"},O0=()=>{const{state:t,dispatch:e}=Zn(),n=l=>{e({type:"KEY_PRESS",payload:l})},i=l=>{var h;const c=`di${l}`,p=!!((h=t.digitalInputs)!=null&&h[c]);e({type:"SET_DIGITAL_INPUT",payload:{input:`DI${l}`,value:!p}})},r=l=>{const c=parseFloat(l.target.value);e({type:"SET_ANALOG_INPUT",payload:{input:"AI1",value:c}})},a=()=>t.activeFault?typeof t.activeFault=="string"?t.activeFault:typeof t.activeFault=="object"&&(t.activeFault.code||t.activeFault.id)||"F070":"F070",s=(()=>{const l=t;if(l.analogInputs){const c=l.analogInputs.AI1??l.analogInputs.ai1??0;return typeof c=="number"?c:0}return typeof l.potentiometerValue=="number"?l.potentiometerValue/100:0})();return f.jsxs("div",{style:i2,children:[f.jsxs("div",{style:r2,children:[f.jsx("span",{style:{fontSize:"13px",fontWeight:"bold",color:"#00e676"},children:"WEG CFW300 • MICRO DRIVE COMPACTO"}),f.jsx("span",{style:{fontSize:"10px",color:"#90a4ae"},children:"Plug-in I/O • Bornes Rápidos"})]}),f.jsxs("div",{style:a2,children:[f.jsxs("div",{style:o2,children:[f.jsxs("div",{style:s2,children:[f.jsx("strong",{style:{color:"#0288d1",fontSize:"12px"},children:"WEG"}),f.jsx("span",{style:{fontSize:"10px",color:"#fff",fontWeight:"bold"},children:"CFW300"})]}),f.jsxs("div",{style:l2,children:[f.jsxs("div",{style:c2,children:[f.jsx("span",{style:{color:t.controlSource==="LOC"?"#00e676":"#374151",fontSize:"9px",fontWeight:"bold"},children:"● LOC"}),f.jsx("span",{style:{color:t.controlSource==="REM"?"#00e676":"#374151",fontSize:"9px",fontWeight:"bold"},children:"● REM"}),f.jsx("span",{style:{color:t.motorStatus==="RUNNING"?"#00e676":"#374151",fontSize:"9px",fontWeight:"bold"},children:"● RUN"}),f.jsx("span",{style:{color:t.motorStatus==="FAULT"?"#ff1744":"#374151",fontSize:"9px",fontWeight:"bold"},children:"● FLT"})]}),f.jsx("div",{style:u2,children:t.motorStatus==="FAULT"?a():(t.outputFrequency??0).toFixed(1)})]}),f.jsxs("div",{style:d2,children:[f.jsx("button",{onClick:()=>n("UP"),style:ma,children:"▲"}),f.jsx("button",{onClick:()=>n("PROG"),style:{...ma,background:"#0288d1",color:"#fff"},children:"PROG"}),f.jsx("button",{onClick:()=>n("DOWN"),style:ma,children:"▼"}),f.jsx("button",{onClick:()=>n("RUN"),style:{...ma,background:"#2e7d32",color:"#fff"},children:"I (RUN)"}),f.jsx("button",{onClick:()=>n("LOC_REM"),style:ma,children:"LOC/REM"}),f.jsx("button",{onClick:()=>n("STOP"),style:{...ma,background:"#c62828",color:"#fff"},children:"O (STOP)"})]})]}),f.jsxs("div",{style:f2,children:[f.jsx("strong",{style:{fontSize:"11px",color:"#81d4fa",marginBottom:"8px",display:"block"},children:"Bornes de Comando (CFW300-IOAR):"}),f.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px"},children:[1,2,3,4].map(l=>{var p;const c=!!((p=t.digitalInputs)!=null&&p[`di${l}`]);return f.jsxs("button",{onClick:()=>i(l),style:{...p2,borderColor:c?"#00e676":"#374151",background:c?"#1b5e20":"#161b22",color:c?"#fff":"#90a4ae"},children:["DI",l,": ",c?"ON (24V)":"OFF (0V)"]},l)})}),f.jsxs("div",{style:{marginTop:"12px"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"10px",color:"#b0bec5",marginBottom:"4px"},children:[f.jsx("span",{children:"Entrada Analógica AI1 (0-10V):"}),f.jsxs("strong",{style:{color:"#00e676"},children:[(s*10).toFixed(1)," V"]})]}),f.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:s,onChange:r,style:{width:"100%",accentColor:"#0288d1"}})]})]})]})]})},i2={background:"#0d1117",border:"1px solid #30363d",borderRadius:"12px",padding:"12px",display:"flex",flexDirection:"column",gap:"10px",width:"100%",boxSizing:"border-box"},r2={display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #21262d",paddingBottom:"6px"},a2={display:"flex",gap:"12px",flexWrap:"wrap"},o2={background:"#161b22",border:"2px solid #21262d",borderRadius:"10px",padding:"10px",width:"190px",boxShadow:"0 4px 12px rgba(0,0,0,0.5)"},s2={display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},l2={background:"#05070a",border:"2px solid #1f242c",borderRadius:"6px",padding:"6px",textAlign:"center",marginBottom:"8px"},c2={display:"flex",justifyContent:"space-around",marginBottom:"4px"},u2={fontFamily:"monospace",fontSize:"24px",fontWeight:"bold",color:"#ff3d00",letterSpacing:"2px",textShadow:"0 0 8px rgba(255, 61, 0, 0.6)"},d2={display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"4px"},ma={background:"#21262d",border:"1px solid #30363d",borderRadius:"4px",color:"#e0e0e0",padding:"6px 2px",fontSize:"9px",fontWeight:"bold",cursor:"pointer"},f2={flex:1,minWidth:"220px",background:"#161b22",border:"1px solid #21262d",borderRadius:"10px",padding:"10px"},p2={border:"1px solid",borderRadius:"6px",padding:"6px",fontSize:"10px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s ease"},h2=({user:t,onLogout:e})=>{const[n,i]=ue.useState("workbench"),[r,a]=ue.useState("CFW500"),[o,s]=ue.useState(20),[l,c]=ue.useState(us[0].lessons[0]);R1({loadTorquePercent:o,enableNoise:!0}),w1();const p=l.id.startsWith("c300-");return f.jsxs("div",{style:g2,children:[f.jsxs("div",{style:x2,children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[f.jsx("span",{style:{fontSize:"16px"},children:"👤"}),f.jsxs("div",{children:[f.jsx("strong",{style:{fontSize:"12px",color:"#fff"},children:t.name}),f.jsxs("span",{style:{fontSize:"10px",color:"#90a4ae",marginLeft:"6px"},children:["(",t.role==="ADMIN"?"Instrutor / Admin":"Aluno",") • @",t.username]})]})]}),f.jsx("button",{onClick:e,style:v2,title:"Encerrar sessão",children:"🚪 Sair"})]}),f.jsxs("div",{style:_2,children:[f.jsxs("div",{style:y2,children:[f.jsx("button",{onClick:()=>i("workbench"),style:{...ml,background:n==="workbench"?"#0288d1":"#1a1d21",color:n==="workbench"?"#fff":"#90a4ae",borderColor:n==="workbench"?"#29b6f6":"#323842"},children:"🎛️ Bancada de Operação"}),f.jsx("button",{onClick:()=>i("modbus"),style:{...ml,background:n==="modbus"?"#0288d1":"#1a1d21",color:n==="modbus"?"#fff":"#90a4ae",borderColor:n==="modbus"?"#29b6f6":"#323842"},children:"📡 Modbus RTU (RS-485)"}),f.jsx("button",{onClick:()=>i("tutorial"),style:{...ml,background:n==="tutorial"?"#0288d1":"#1a1d21",color:n==="tutorial"?"#fff":"#90a4ae",borderColor:n==="tutorial"?"#29b6f6":"#323842"},children:"🎓 Modo Aula & Trilha"}),t.role==="ADMIN"&&f.jsx("button",{onClick:()=>i("admin"),style:{...ml,background:n==="admin"?"#f57c00":"#1a1d21",color:n==="admin"?"#fff":"#ffb74d",borderColor:n==="admin"?"#ffa726":"#323842"},children:"🛡️ Painel Admin (Aprovações)"})]}),f.jsx(BA,{})]}),n==="workbench"&&f.jsxs("div",{style:gl,children:[f.jsxs("div",{style:S2,children:[f.jsx("span",{style:{fontSize:"11px",fontWeight:"bold",color:"#90a4ae"},children:"Modelo de Inversor Ativo na Bancada:"}),f.jsxs("div",{style:{display:"flex",gap:"8px"},children:[f.jsx("button",{onClick:()=>a("CFW500"),style:{...z0,background:r==="CFW500"?"#0288d1":"#161b22",borderColor:r==="CFW500"?"#29b6f6":"#30363d",color:r==="CFW500"?"#fff":"#90a4ae"},children:"⚡ WEG CFW500 (Padrão Industrial)"}),f.jsx("button",{onClick:()=>a("CFW300"),style:{...z0,background:r==="CFW300"?"#0288d1":"#161b22",borderColor:r==="CFW300"?"#29b6f6":"#30363d",color:r==="CFW300"?"#fff":"#90a4ae"},children:"⚙️ WEG CFW300 (Micro Drive Compacto)"})]})]}),r==="CFW500"?f.jsxs(f.Fragment,{children:[f.jsxs("div",{style:ga,children:[f.jsx(lu,{}),f.jsxs("div",{style:Ao,children:[f.jsx(So,{loadTorquePercent:o}),f.jsxs("div",{style:k0,children:[f.jsxs("label",{style:{fontSize:"11px",color:"#90a4ae",display:"flex",justifyContent:"space-between"},children:[f.jsx("span",{children:"Carga Mecânica no Eixo (Freio)"}),f.jsxs("strong",{children:[o,"%"]})]}),f.jsx("input",{type:"range",min:"0",max:"100",value:o,onChange:h=>s(Number(h.target.value)),style:{width:"100%",marginTop:"8px",cursor:"pointer",height:"28px"}})]})]})]}),f.jsxs("div",{style:ga,children:[f.jsx(T0,{}),f.jsx(LA,{})]}),f.jsx($u,{})]}):f.jsxs(f.Fragment,{children:[f.jsxs("div",{style:ga,children:[f.jsx(O0,{}),f.jsxs("div",{style:Ao,children:[f.jsx(So,{loadTorquePercent:o}),f.jsxs("div",{style:k0,children:[f.jsxs("label",{style:{fontSize:"11px",color:"#90a4ae",display:"flex",justifyContent:"space-between"},children:[f.jsx("span",{children:"Carga Mecânica no Eixo (Freio)"}),f.jsxs("strong",{children:[o,"%"]})]}),f.jsx("input",{type:"range",min:"0",max:"100",value:o,onChange:h=>s(Number(h.target.value)),style:{width:"100%",marginTop:"8px",cursor:"pointer",height:"28px"}})]})]})]}),f.jsx($u,{})]})]}),n==="modbus"&&f.jsxs("div",{style:gl,children:[f.jsx(vR,{}),f.jsxs("div",{style:ga,children:[f.jsx(lu,{}),f.jsx("div",{style:Ao,children:f.jsx(So,{loadTorquePercent:o})})]})]}),n==="tutorial"&&f.jsxs("div",{style:gl,children:[f.jsx(qA,{selectedLesson:l,setSelectedLesson:c,userRole:t.role}),l.type==="PRACTICE"&&f.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"14px",marginTop:"6px"},children:[f.jsxs("div",{style:{fontSize:"12px",color:"#64b5f6",fontWeight:"bold"},children:["🎛️ Bancada Ativa para a Lição (",p?"WEG CFW300":"WEG CFW500","):"]}),p?f.jsxs("div",{style:ga,children:[f.jsx(O0,{}),f.jsx("div",{style:Ao,children:f.jsx(So,{loadTorquePercent:o})})]}):f.jsxs("div",{style:ga,children:[f.jsx(lu,{}),f.jsxs("div",{style:Ao,children:[f.jsx(So,{loadTorquePercent:o}),f.jsx(T0,{})]})]}),f.jsx($u,{})]})]}),n==="admin"&&t.role==="ADMIN"&&f.jsx("div",{style:gl,children:f.jsx(XR,{})})]})};function m2(){const[t,e]=ue.useState(null),[n,i]=ue.useState(!0);ue.useEffect(()=>{const a=localStorage.getItem("cfw500_auth_user");if(a)try{e(JSON.parse(a))}catch{localStorage.removeItem("cfw500_auth_user")}i(!1)},[]);const r=()=>{localStorage.removeItem("cfw500_auth_user"),e(null)};return n?f.jsx("div",{style:{background:"#0a0d11",minHeight:"100vh"}}):t?f.jsx(A1,{children:f.jsx(h2,{user:t,onLogout:r})}):f.jsx(BR,{onLoginSuccess:e})}const g2={maxWidth:"1100px",width:"100%",margin:"0 auto",padding:"12px",display:"flex",flexDirection:"column",gap:"14px",boxSizing:"border-box"},x2={display:"flex",justifyContent:"space-between",alignItems:"center",background:"#13171d",border:"1px solid #232b36",borderRadius:"8px",padding:"8px 14px"},v2={background:"#b71c1c",border:"none",borderRadius:"6px",color:"#fff",padding:"5px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},_2={display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:"10px"},y2={display:"flex",gap:"8px",flexWrap:"wrap"},ml={padding:"10px 18px",borderRadius:"8px",border:"1px solid",fontSize:"13px",fontWeight:700,cursor:"pointer",transition:"all 0.2s ease",boxShadow:"0 4px 12px rgba(0,0,0,0.3)"},S2={display:"flex",justifyContent:"space-between",alignItems:"center",background:"#13171d",border:"1px solid #232b36",borderRadius:"8px",padding:"8px 12px",flexWrap:"wrap",gap:"8px"},z0={border:"1px solid",borderRadius:"6px",padding:"6px 12px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s ease"},gl={display:"flex",flexDirection:"column",gap:"14px",width:"100%"},ga={display:"flex",flexWrap:"wrap",gap:"14px",width:"100%"},Ao={display:"flex",flexDirection:"column",gap:"14px",flex:"1 1 280px"},k0={background:"#1a1d21",border:"1px solid #323842",borderRadius:"12px",padding:"12px 14px"};ed.createRoot(document.getElementById("root")).render(f.jsx(K0.StrictMode,{children:f.jsx(m2,{})}));
