(this["webpackJsonpthree-d-rendering-engine"]=this["webpackJsonpthree-d-rendering-engine"]||[]).push([[0],{13:function(t,n,e){},14:function(t,n,e){},15:function(t,n,e){"use strict";e.r(n);var a=e(0),r=e.n(a),i=e(7),o=e.n(i),c=(e(13),e(14),e(1)),s=e(4),u=e(3),l=e(2),d=e(5),h="undefined"!==typeof Float32Array?Float32Array:Array;Math.random;Math.PI;function f(){var t=new h(3);return h!==Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function m(t,n,e){var a=new h(3);return a[0]=t,a[1]=n,a[2]=e,a}function v(t,n,e){return t[0]=n[0]+e[0],t[1]=n[1]+e[1],t[2]=n[2]+e[2],t}function p(t,n,e){return t[0]=n[0]-e[0],t[1]=n[1]-e[1],t[2]=n[2]-e[2],t}function g(t,n,e){return t[0]=n[0]*e,t[1]=n[1]*e,t[2]=n[2]*e,t}function w(t,n,e,a){return t[0]=n[0]+e[0]*a,t[1]=n[1]+e[1]*a,t[2]=n[2]+e[2]*a,t}function b(t){var n=t[0],e=t[1],a=t[2];return n*n+e*e+a*a}function y(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function j(t){var n=t[0],e=t[1],a=t[2],r=Math.sqrt(n*n+e*e+a*a),i=new h(3);return i[0]=n/r,i[1]=e/r,i[2]=a/r,i}Math.hypot||(Math.hypot=function(){for(var t=0,n=arguments.length;n--;)t+=arguments[n]*arguments[n];return Math.sqrt(t)});!function(){var t=f()}();var M=function t(n,e){var a=this;Object(c.a)(this,t),this.origin=function(){return a.orig},this.direction=function(){return a.dir},this.at=function(t){return w(f(),a.orig,a.dir,t)},n&&e?(this.orig=n,this.dir=e):(this.orig=m(0,0,0),this.dir=m(0,0,0))};function _(){var t=this;this.p=f(),this.normal=f(),this.t=0,this.front_face=!1,this.set_face_normal=function(n,e){t.front_face=y(n.direction(),e),t.normal=t.front_face?e:-e},this.copy=function(n){t.p=n.p,t.normal=n.normal,t.t=n.t,t.front_face=n.front_face}}var O=function t(){Object(c.a)(this,t),this.hit=function(t,n,e,a){}},k=function(t){Object(u.a)(e,t);var n=Object(l.a)(e);function e(t){var a;return Object(c.a)(this,e),(a=n.call(this)).objects=[],a.add=function(t){return a.objects.push(t)},a.length=function(){return a.objects.length},a.clear=function(){a.objects=[]},a.hit=function(t,n,e,r){for(var i=new _,o=!1,c=e,s=0;s<a.length();s++)a.objects[s].hit(t,n,c,i)&&(o=!0,c=i.t,r.copy(i));return o},void 0!==t&&a.add(t),a}return e}(O),E=function(t){Object(u.a)(e,t);var n=Object(l.a)(e);function e(t,a){var r;return Object(c.a)(this,e),(r=n.call(this)).hit=function(t,n,e,a){var i=f();i=p(i,t.origin(),r.center);var o=b(t.direction()),c=y(i,t.direction()),s=c*c-o*(b(i)-r.radius*r.radius);if(s>0){var u=Math.sqrt(s),l=(-c-u)/o;if(l<e&&l>n){a.t=l,a.p=t.at(a.t);var d=f();return d=j(d=p(d,a.p,r.center)),a.set_face_normal(t,d),!0}if((l=(-c+u)/o)<e&&l>n){a.t=l,a.p=t.at(a.t);var h=f();return h=j(h=p(h,a.p,r.center)),a.set_face_normal(t,h),!0}}return!1},r.center=t,r.radius=a,r}return e}(O),I=function(t){Object(u.a)(e,t);var n=Object(l.a)(e);function e(t){var a;return Object(c.a)(this,e),(a=n.call(this,t)).hit_sphere=function(t,n,e){var r=f();r=p(r,e.origin(),a.center);var i=b(e.direction()),o=y(r,e.direction()),c=o*o-i*(b(r)-a.radius*a.radius);return c<0?-1:Math.min((-o-Math.sqrt(c))/i,(-o+Math.sqrt(c))/i)},a.ray_color=function(t,n,e){var a=new _;if(e.hit(t,0,Math.pow(10,10)/1,a))return g(f(),v(f(),a.normal,m(1,1,1)),.5);var r=j(t.direction()),i=Math.abs(r[1]),o=g(f(),m(1,1,1),1-i),c=g(f(),m(.5,.7,n),i);return v(f(),o,c)},a.buildImage=function(t){a.setState({animate:!1},(function(){a.b=0,a.drawImage(t)}))},a.clamp=function(t,n,e){return t<n?n:t>e?e:t},a.drawImage=function(t){var n=a.state.canvasDOM;n.style.visibility="visible";var e=n.height,r=n.width,i=r/e,o=a.props.samples_per_pixel,c=new k;c.add(new E(m(0,0,-1),.5)),c.add(new E(m(-1,0,-1),.25)),c.add(new E(m(1,0,-1),.25)),c.add(new E(m(0,1,-1),.25)),c.add(new E(m(2,0,1),.5)),c.add(new E(m(1,0,1),.25)),c.add(new E(m(3,0,1),.25)),c.add(new E(m(2,1,1),.25)),c.add(new E(m(-2,0,2),.5)),c.add(new E(m(-1,0,2.4),.25)),c.add(new E(m(-3,0,2.9),.25)),c.add(new E(m(-2,1,3),.25)),c.add(new E(m(0,-100.5,-1),100));var s=2*i,u=m(0,0,t),l=m(s,0,0),h=m(0,2,0),v=f();w(v,u,l,-.5),w(v,v,h,-.5),p(v,v,m(0,0,1));var g=a.state.ctx,b=g.getImageData(0,0,r,e),y=b.data,j=y.length/4,_=1,O=new Float32Array(3*j),I=document.getElementById("passValue"),A=document.getElementById("timeTaken");var x=function n(){_<o&&setTimeout(n.bind(this));for(var a=Date.now(),i=0;i<e;i++)for(var s=0;s<r;s++){var d=3*((e-i-1)*r+s),m=(s+Math.random())/(r+1),k=(i+Math.random())/(e+1),E=f();w(E,v,l,m),w(E,E,h,k),p(E,E,u);var x=new M(u,E),C=this.ray_color(x,Math.abs(t),c);O[d]+=C[0],O[d+1]+=C[1],O[d+2]+=C[2]}for(var T=0;T<j;T++){var S=4*T,W=3*T;y[S]=Math.floor(256*this.clamp(O[W]/_,0,.9999)),y[S+1]=Math.floor(256*this.clamp(O[W+1]/_,0,.9999)),y[S+2]=Math.floor(256*this.clamp(O[W+2]/_,0,.9999)),y[S+3]=255}g.putImageData(b,0,0);var B=Date.now();I.innerText="Pass: ".concat(_,"/").concat(o);var D=((B-a)/1e3).toPrecision(3);A.innerText="Time Taken: ".concat(D,"s"),_++}.bind(Object(d.a)(a));setTimeout((function(){return x()}))},a.animate=function(){a.state.animate&&(requestAnimationFrame(a.animate),a.drawImage(a.b),a.b+=.2,a.b>20&&(a.b=0))},a.toggleAnimation=function(){a.setState({animate:!a.state.animate},(function(){a.state.animate&&a.animate()}))},a.state={canvasDOM:null,ctx:null,animate:!1},a.b=0,a}return Object(s.a)(e,[{key:"componentDidMount",value:function(){var t=document.getElementById("myCanvas");t.style.visibility="hidden",t.width=this.props.width,t.height=this.props.height;var n=t.getContext("2d");this.setState({canvasDOM:t,ctx:n})}},{key:"render",value:function(){var t=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:function(){return t.buildImage(1)},id:"buildImageBtn",className:"btn"},"Build Image"),r.a.createElement("button",{onClick:function(){return t.toggleAnimation()},id:"buildImageBtn2",className:"btn"},this.state.animate?"Stop ":"Start ","Animation"),r.a.createElement("p",{id:"passValue"}),r.a.createElement("p",{id:"timeTaken"}),r.a.createElement("canvas",{id:"myCanvas"}))}}]),e}(a.Component),A=function(t){Object(u.a)(e,t);var n=Object(l.a)(e);function e(t){var a;Object(c.a)(this,e),a=n.call(this,t);var r=window.innerWidth,i=window.innerHeight,o=r/i,s=Math.floor(.5*r),u=Math.floor(.5*i);return a.state={aspectRatio:o,width:s,height:u,samples_per_pixel:1},a}return Object(s.a)(e,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"main-content"},r.a.createElement("div",{className:"canvas-container"},r.a.createElement(I,{samples_per_pixel:this.state.samples_per_pixel,width:this.state.width,height:this.state.height}))))}}]),e}(r.a.Component);var x=function(){return r.a.createElement(A,null)},C=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function T(t,n){navigator.serviceWorker.register(t).then((function(t){t.onupdatefound=function(){var e=t.installing;null!=e&&(e.onstatechange=function(){"installed"===e.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(t)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(t)))})}})).catch((function(t){console.error("Error during service worker registration:",t)}))}o.a.render(r.a.createElement(x,null),document.getElementById("root")),function(t){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat(".","/service-worker.js");C?(!function(t,n){fetch(t,{headers:{"Service-Worker":"script"}}).then((function(e){var a=e.headers.get("content-type");404===e.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(t){t.unregister().then((function(){window.location.reload()}))})):T(t,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,t),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):T(n,t)}))}}()},8:function(t,n,e){t.exports=e(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.24ee188f.chunk.js.map