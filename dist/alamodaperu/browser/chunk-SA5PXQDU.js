import{a as w}from"./chunk-LVBVXXGA.js";import"./chunk-QEQZLWSE.js";import{a as $}from"./chunk-LWBRQBKD.js";import{a as j}from"./chunk-C4MTUD5M.js";import"./chunk-X3J7YRVF.js";import"./chunk-PDVU36C2.js";import"./chunk-2FA2V676.js";import"./chunk-UYLGKDWS.js";import"./chunk-DEYWHEGI.js";import{j as G}from"./chunk-ELOWQZB7.js";import{$a as b,Bb as C,Cb as S,Gb as h,Ia as p,Ib as M,Ka as u,Kb as _,Ob as N,Qb as F,Rc as R,Sb as x,Tb as I,Wc as E,Xc as L,Y as m,Yc as O,Zd as k,ba as d,ea as y,fb as f,ia as s,id as P,jd as D,la as i,sa as t,sd as T,ta as o,ua as l,xd as q,yb as g,yd as B,za as c,zb as v}from"./chunk-HKEP7HVR.js";function U(n,r){if(n&1&&(t(0,"nb-option",16),p(1),o()),n&2){let e=r.$implicit;i("value",e.idSystem),m(),u(" ",e.description," ")}}function z(n,r){if(n&1&&(t(0,"nb-option",16),p(1),o()),n&2){let e=r.$implicit;i("value",e.idMenu),m(),u(" ",e.description," ")}}function H(n,r){if(n&1&&(t(0,"nb-option",16),p(1),o()),n&2){let e=r.$implicit;i("value",e.idSubMenu),m(),u(" ",e.description," ")}}function J(n,r){if(n&1&&(t(0,"nb-option",16),p(1),o()),n&2){let e=r.$implicit;i("value",e.idPage),m(),u(" ",e.description," ")}}var A=class n{constructor(r,e,a){this.fb=r;this.supportService=e;this.modalRepository=a;this.myForm=this.fb.group({objectId:[null],idSystem:[""],idMenu:[""],idSubMenu:[""],idPage:[""],description:[""],icono:[""],iconClass:[""],status:[""],styleClass:[""],text:[""]})}myForm;listSystem=[{idSystem:1,description:"support"}];listMenu=[{idMenu:1,idSystem:1,description:"support menu"}];listSubMenu=[{idSubMenu:1,idMenu:1,idSystem:1,description:"support product"}];listPage=[{idPage:1,idSystem:1,description:"support controls"}];btn;ngOnInit(){}searchUser(){}save(){let r={description:this.myForm.get("description")?.value,iconClass:this.myForm.get("iconClass")?.value,icono:this.myForm.get("icono")?.value,idMenu:this.myForm.get("idMenu")?.value,idPage:this.myForm.get("idPage")?.value,idSystem:this.myForm.get("idSystem")?.value,status:1,styleClass:this.myForm.get("styleClass")?.value,text:this.myForm.get("text")?.value,id_user:"64f8efabb4ddac6094476946"};this.supportService.saveControl(r).subscribe(e=>{this.modalRepository.showToast("success",e+"Authenti interce","")},e=>{this.modalRepository.showToast("danger",e.message+"Authenti interce","")})}state(r){return r}static \u0275fac=function(e){return new(e||n)(d(F),d($),d(j))};static \u0275cmp=y({type:n,selectors:[["app-register-control"]],decls:28,vars:10,consts:[[3,"formGroup"],[1,"container"],[1,"form-group","col-sm-4"],["placeholder","System","formControlName","idSystem","required",""],[3,"value",4,"ngFor","ngForOf"],["placeholder","Menu","formControlName","idMenu","required",""],["placeholder","Sub Menu","formControlName","idSubMenu","required",""],["placeholder","Page","formControlName","idPage","required",""],["nbInput","","type","text","placeholder","Control Name","formControlName","text",3,"maxLength"],["nbInput","","type","text","placeholder","Description","required","","formControlName","description",3,"maxLength"],["nbInput","","type","text","placeholder","Icon","required","","formControlName","icono",3,"maxLength"],["nbInput","","type","text","placeholder","Icon Class","formControlName","iconClass",3,"maxLength"],["nbInput","","type","text","placeholder","Style Class","required","","formControlName","styleClass",3,"maxLength"],[1,"form-group"],["nbButton","","status","primary",3,"click"],[3,"click"],[3,"value"]],template:function(e,a){e&1&&(t(0,"form",0)(1,"div",1)(2,"div",2)(3,"nb-select",3),s(4,U,2,2,"nb-option",4),o()(),t(5,"div",2)(6,"nb-select",5),s(7,z,2,2,"nb-option",4),o()(),t(8,"div",2)(9,"nb-select",6),s(10,H,2,2,"nb-option",4),o()(),t(11,"div",2)(12,"nb-select",7),s(13,J,2,2,"nb-option",4),o()(),t(14,"div",2),l(15,"input",8),o(),t(16,"div",2),l(17,"input",9),o(),t(18,"div",2),l(19,"input",10),o(),t(20,"div",2),l(21,"input",11),o(),t(22,"div",2),l(23,"input",12),o(),t(24,"div",13)(25,"button",14),c("click",function(){return a.save()}),p(26,"Save"),o(),t(27,"app-router-button",15),c("click",function(){return a.save()}),o()()()()),e&2&&(i("formGroup",a.myForm),m(4),i("ngForOf",a.listSystem),m(3),i("ngForOf",a.listMenu),m(3),i("ngForOf",a.listSubMenu),m(3),i("ngForOf",a.listPage),m(2),i("maxLength",50),m(2),i("maxLength",50),m(2),i("maxLength",50),m(2),i("maxLength",50),m(2),i("maxLength",100))},dependencies:[f,b,I,h,v,C,S,N,M,_,G,T,g,O,L,E,D,P,R,k,B,q,x,w],encapsulation:2})};export{A as RegisterControlComponent};
