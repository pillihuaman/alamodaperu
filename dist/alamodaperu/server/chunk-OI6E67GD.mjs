import './polyfills.server.mjs';
import{a as z}from"./chunk-3JBG2532.mjs";import{a as A}from"./chunk-QSNGXSKX.mjs";import"./chunk-LGLALFI7.mjs";import{a as R}from"./chunk-YLUJOFQ6.mjs";import"./chunk-RMFMLZ2X.mjs";import{a as j}from"./chunk-FUVFZO2C.mjs";import{a as O}from"./chunk-2CRQO2D4.mjs";import"./chunk-ZUFXFZKB.mjs";import{Bb as x,Bd as k,Ce as y,D as d,Da as b,E as _,Fa as g,Ga as i,K as T,Oa as h,Wa as F,Xa as v,Y as S,_ as s,_b as N,bc as M,da as u,ga as I,ka as f,qa as C,ra as m,ub as $,vb as E,wb as D,wc as V,ya as r,za as c}from"./chunk-XCJYKJAR.mjs";import"./chunk-S6KH3LOX.mjs";var w=class n{constructor(t){this.supportService=t}image;urlApiImagen=`${j.API_IMAGEN}/v1/imagen/getImagen?codImagen=`;urlImagen;ngOnInit(){this.image&&(console.log(this.image),console.log(this.image.firstObject),console.log(this.image.attr))}clickCount(t){console.log(t)}concateInput(t,e){return t.concat(e)}dataget(){console.log(this.image),this.supportService.saveClickCountImagen(this.image).subscribe(t=>{t&&console.log(JSON.stringify(t))},t=>{console.error("Error al guardar el conteo de clics",t)})}static \u0275fac=function(e){return new(e||n)(u(A))};static \u0275cmp=I({type:n,selectors:[["app-imagen-catch-information"]],inputs:{image:"image",urlImagen:"urlImagen"},decls:1,vars:2,consts:[[1,"responsiveImagen",3,"click","src","alt"]],template:function(e,o){e&1&&(r(0,"img",0),g("click",function(){return o.dataget()}),c()),e&2&&m("src",o.concateInput(o.urlApiImagen,o.image.imageSrc),S)("alt",o.image.imageAlt)},dependencies:[x,k,M,y],styles:[".responsiveImagen[_ngcontent-%COMP%]{width:100%;max-height:100%}@media only screen and (max-width: 480px){img[_ngcontent-%COMP%]{width:100%}}"]})};var P=n=>[n],H=()=>["/homedetail"];function J(n,t){if(n&1){let e=b();r(0,"div")(1,"div",9),g("click",function(){d(e);let a=i().$implicit,l=i(2).$implicit,p=i();return _(p.changeImage(l,a))}),r(2,"span",10),h(3,"arrow_back_ios"),c()(),r(4,"app-imagen-catch-information",11),g("click",function(){d(e);let a=i().$implicit,l=i(3);return _(l.enviarData(a))})("mouseover",function(){d(e);let a=i().$implicit,l=i(2).$implicit,p=i();return _(p.changeImage(l,a))}),c(),r(5,"div",9),g("click",function(){d(e);let a=i().$implicit,l=i(2).$implicit,p=i();return _(p.changeImage(l,a))}),r(6,"span",10),h(7,"arrow_forward_ios"),c()(),r(8,"div",9),g("click",function(){d(e);let a=i().$implicit,l=i(2).$implicit,p=i();return _(p.changeImage(l,a))}),r(9,"a",12),h(10,"Ver Detalle"),c()()()}if(n&2){let e=i().$implicit,o=i(2).$implicit,a=i();s(),m("ngClass",v(10,P,e.imagetoken===a.selectToken?"row-left":"row-left-off")),s(3),m("ngClass",v(12,P,e.firstObject!==null?"image-active":"image-active-off"))("image",e),C("id",e.imagetoken),s(),m("ngClass",v(14,P,e.imagetoken===a.selectToken?"row-right":"row-right-off")),C("id",e.imageCountainerToken),s(3),m("ngClass",v(16,P,e.imagetoken===a.selectToken?"row-detail":"row-right-off")),C("id",e.imageCountainerToken),s(),m("routerLink",F(18,H))("state",o)}}function U(n,t){if(n&1&&(r(0,"div",7),f(1,J,11,19,"div",8),c()),n&2){let e=t.$implicit,o=i(3);s(),m("ngIf",e.indicators!==null||e.imageCountainerToken===o.selectCountainerToken)}}function q(n,t){if(n&1&&(r(0,"div",5),f(1,U,2,1,"div",6),c()),n&2){let e=i().$implicit;s(),m("ngForOf",e.lstCorouseImages)}}function K(n,t){if(n&1&&(r(0,"div",3),f(1,q,2,1,"div",4),c()),n&2){let e=t.$implicit;C("id",e.tokenCol),s(),m("ngIf",e.lstCorouseImages==null?null:e.lstCorouseImages.length)}}var G=class n{constructor(t,e){this.imagenData=t;this.imagenTempService=e}lstIMf=[];selectToken="";selectCountainerToken;updateImagen=new T;ngOnInit(){this.imagenTempService.listMainTopImagen(O.page,O.perPage).subscribe(t=>{t?.payload&&(this.lstIMf=t.payload)},t=>{console.error("Error al cargar im\xE1genes",t)})}changeImage(t,e){this.selectToken=e.imagetoken,this.selectCountainerToken=e.imageCountainerToken}enviarData(t){this.updateImagen.emit(t)}static \u0275fac=function(e){return new(e||n)(u(z),u(R))};static \u0275cmp=I({type:n,selectors:[["app-main-page"]],inputs:{lstIMf:"lstIMf",selectToken:"selectToken",selectCountainerToken:"selectCountainerToken"},outputs:{updateImagen:"updateImagen"},decls:3,vars:1,consts:[[1,"container"],[1,"row"],["class","col-md-12 col-sm-12 col-lg-6 custom",4,"ngFor","ngForOf"],[1,"col-md-12","col-sm-12","col-lg-6","custom"],["class","carousel-container",4,"ngIf"],[1,"carousel-container"],["class","imagenContainer",4,"ngFor","ngForOf"],[1,"imagenContainer"],[4,"ngIf"],[3,"click","ngClass"],[1,"material-icons","dot"],[3,"click","mouseover","ngClass","image"],[3,"routerLink","state"]],template:function(e,o){e&1&&(r(0,"div",0)(1,"div",1),f(2,K,2,2,"div",2),c()()),e&2&&(s(2),m("ngForOf",o.lstIMf))},dependencies:[x,$,E,D,M,N,k,y,w,V],styles:[".carousel-container[_ngcontent-%COMP%]{width:100%;max-height:100%;border-radius:15px}.carousel-container[_ngcontent-%COMP%]   app-imagen-catch-information.image-active[_ngcontent-%COMP%]{display:block;width:100%;max-height:100%;height:400px}.carousel-container[_ngcontent-%COMP%]   app-imagen-catch-information.image-active-active[_ngcontent-%COMP%]{display:block;width:100%;max-height:100%;height:400px}.carousel-container[_ngcontent-%COMP%]   app-imagen-catch-information.image-active-off[_ngcontent-%COMP%]{display:none;width:100%;max-height:100%;height:400px}.carousel-dot-container[_ngcontent-%COMP%]{right:0;left:0;display:flex;justify-content:center;padding:0;margin-bottom:1 rem}.dot[_ngcontent-%COMP%]{cursor:pointer;margin:0 5px;border-radius:50%;display:inline;transition:opacity .6s ease;opacity:.5;object-fit:none;text-align:center;font-size:xx-large;background:#e1d5ca}.active[_ngcontent-%COMP%], .dot[_ngcontent-%COMP%]:hover{opacity:1}.hid[_ngcontent-%COMP%]{display:none}.imagenContainer[_ngcontent-%COMP%]{align-items:center;position:relative;padding-top:1px}.row-left[_ngcontent-%COMP%]{position:absolute;left:-1%;top:50%}.row-right[_ngcontent-%COMP%]{position:absolute;left:90%;top:50%}.row-right-off[_ngcontent-%COMP%], .row-left-off[_ngcontent-%COMP%]{display:none}.row-detail[_ngcontent-%COMP%]{position:absolute;left:50%;top:90%;background-color:#e4e4e0;text-align:center;transition:opacity 1s ease;opacity:2}@media (min-width: 768px){.row-detail[_ngcontent-%COMP%]{font-size:18px}}@media (min-width: 1024px){.row-detail[_ngcontent-%COMP%]{font-size:19px}}@media (min-width: 1280px){.row-detail[_ngcontent-%COMP%]{font-size:20px}}.row-detail[_ngcontent-%COMP%]:hover{opacity:16;transition:opacity 4s ease;font-family:Verdana,Geneva,Tahoma,sans-serif;background-color:#0f95d3;color:#f5f5f5!important}"]})};export{G as MainPageComponent};
