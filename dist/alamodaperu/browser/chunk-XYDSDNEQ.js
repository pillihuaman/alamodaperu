import{a as X}from"./chunk-LVBVXXGA.js";import"./chunk-QEQZLWSE.js";import{a as W}from"./chunk-X3J7YRVF.js";import"./chunk-PDVU36C2.js";import"./chunk-UYLGKDWS.js";import"./chunk-DEYWHEGI.js";import{j as Q}from"./chunk-ELOWQZB7.js";import{$a as v,Aa as c,Ab as x,Bb as S,Cb as k,Db as M,Eb as i,Gb as P,I as f,Ia as b,Ib as V,J as C,Jb as T,Kb as D,Ob as E,Pb as G,Qb as O,Qc as R,Rc as L,Sb as A,Tb as B,Wc as q,Xc as j,Y as l,Yc as K,Zd as J,ab as F,ba as y,ea as h,fb as I,ia as _,id as U,jd as z,la as s,sa as o,sd as H,ta as n,ua as d,xa as g,yb as N,za as p,zb as w}from"./chunk-HKEP7HVR.js";var u=class{static newGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=Math.random()*16|0,r=e=="x"?t:t&3|8;return r.toString(16)})}};function $(a,e){if(a&1){let t=g();o(0,"nb-icon",16),p("click",function(){f(t);let m=c().index,Z=c();return C(Z.removeInputControl(m))}),n()}}function ee(a,e){if(a&1){let t=g();o(0,"div",12)(1,"input",13),p("focus",function(){f(t);let m=c();return C(m.disableControl())}),n(),_(2,$,1,0,"nb-icon",14),o(3,"nb-icon",15),p("click",function(){f(t);let m=c();return C(m.addInputControl())}),n()()}if(a&2){let t=e.index,r=c();l(),s("formControlName",t),l(),s("ngIf",r.parameterItems.length>1)}}var Y=class a{constructor(e,t){this.fb=e;this.supportService=t;this.myForm=new M({parameterItems:new G([new i("")]),id:new i(""),name:new i(""),idCode:new i(""),description:new i("")}),this.myForm.get("name")?.valueChanges.subscribe(r=>{this.updateIdCode(r)})}timeFormControl;event;myForm;btn;controlType;flag=!1;cantidadForm;controlName;booleanContro=!1;booleanControSelect=!1;ngOnInit(){this.booleanControSelect=!0}get parameterItems(){return this.myForm.get("parameterItems")}save(){let e=this.parameterItems.getRawValue(),t={description:this.myForm.get("description")?.value,idCode:this.myForm.get("idCode")?.value,name:this.myForm.get("name")?.value,parameterItems:e};this.supportService.saveParameter(t).subscribe(r=>{},r=>{}),this.controlType="text"}state(e){return e}createControl(){this.controlName="dynamicControl"+u.newGuid();let e=new i("",x.required);this.myForm.addControl(this.controlName,e),this.cantidadForm=Object.keys(this.myForm.controls).length,console.log(this.cantidadForm)}addInputControl(){this.controlName="dynamicControl"+u.newGuid();let e=new i("",x.required);this.myForm.addControl(this.controlName,e),this.parameterItems.push(new i("",x.required))}removeInputControl(e){this.myForm,this.parameterItems.removeAt(e)}disableControl(){this.myForm.get("name")?.disable(),this.myForm.get("idCode")?.disable(),this.myForm.get("description")?.disable()}clearControl(){this.myForm.get("name")?.enable(),this.myForm.get("idCode")?.enable(),this.myForm.get("description")?.enable();for(let e=0;e<this.parameterItems.length;e++)e!=0&&this.parameterItems.removeAt(e);this.myForm.reset()}onKeyUp(e){return this.booleanContro=!0,this.booleanControSelect=!1,!0}updateIdCode(e){this.myForm.get("idCode")?.setValue(e)}static \u0275fac=function(t){return new(t||a)(y(O),y(W))};static \u0275cmp=h({type:a,selectors:[["app-parameters"]],decls:17,vars:5,consts:[[3,"formGroup"],[1,"container"],[1,"form-group","col-sm-4"],["nbInput","","readonly","","type","text","placeholder","Id Code","formControlName","idCode",3,"maxLength"],["nbInput","","type","text","placeholder","Parameter Name","formControlName","name",3,"maxLength"],["nbInput","","type","text","placeholder","Detail","required","","formControlName","description",3,"maxLength"],["formArrayName","parameterItems",1,"form-group","col-sm-4"],["class","d-flex align-items-center",4,"ngFor","ngForOf"],[1,"form-group","col-sm-2","d-flex","justify-content-between"],["nbButton","","status","primary",3,"click"],["nbButton","","status","warning",3,"click"],[3,"click"],[1,"d-flex","align-items-center"],["nbInput","",3,"focus","formControlName"],["icon","trash-2-outline","status","danger",3,"click",4,"ngIf"],["icon","plus-circle-outline","status","success",3,"click"],["icon","trash-2-outline","status","danger",3,"click"]],template:function(t,r){t&1&&(o(0,"form",0)(1,"div",1)(2,"div",2),d(3,"input",3),n(),o(4,"div",2),d(5,"input",4),n(),o(6,"div",2),d(7,"input",5),n(),o(8,"div",6),_(9,ee,4,2,"div",7),n(),d(10,"br"),o(11,"div",8)(12,"button",9),p("click",function(){return r.save()}),b(13,"Save"),n(),o(14,"button",10),p("click",function(){return r.clearControl()}),b(15,"Clear"),n(),o(16,"app-router-button",11),p("click",function(){return r.save()}),n()()()()),t&2&&(s("formGroup",r.myForm),l(3),s("maxLength",50),l(2),s("maxLength",50),l(2),s("maxLength",50),l(2),s("ngForOf",r.parameterItems.controls))},dependencies:[I,v,F,B,P,w,S,k,E,V,D,T,Q,H,N,K,j,q,z,U,L,R,J,A,X],styles:[".time-picker-component[_ngcontent-%COMP%]   .mat-form-field-infix[_ngcontent-%COMP%]{display:inherit}"]})};export{Y as ParametersComponent};
