import{a as c}from"./chunk-SGZVPLXZ.js";import{Ud as D,Wd as l,Xd as y,db as m,f as d}from"./chunk-HKEP7HVR.js";var g=class{page=c.page;pageSize=c.perPage;result;customizePropertyNames(e,t){return e.map((r,n)=>{let a={};for(let o in r)t[o]&&(a[t[o]]=r[o]);return{data:a}})}revertPropertyNames(e,t){return e.map(r=>{let n={};for(let a in r.data){let f=Object.keys(t).find(o=>t[o]===a);n[f||a]=r.data[a]}return n})}onPageSizeChange(e){}onPageChange(e){this.page=e,console.log("emitter pageChange->>>employee "+this.page),this.findByDefualt()}findByparameter(){}findByDefualt(){}};var i=class{static typeProductClothing="PRODUCTTYPESGENERAL001";static objectIdPattern=/^[0-9a-fA-F]{24}$/};var s=d(D());var p=class{static getKeysJson(e){let t=[];for(let r of Object.keys(e))t.push(r);return t}static sortDate=(e,t,r)=>{let n=Number(new m("es-PE").transform(t,"YYYY-MM-DDTHH:mm:ss.sssZ")),a=Number(new m("static").transform(r,"YYYY-MM-DDTHH:mm:ss.sssZ"));return n<a?-1*e:n>a?e:0};static getfechaActual(){return s.default.locale("es"),(0,s.default)().format("YYYY-MM-DD HH:mm:ss")}static getfechaFormatoEnvio(e){return s.default.locale("es"),(0,s.default)(e).format("YYYY-MM-DD HH:mm:ss")}static getfechaActualMas1Year(){return s.default.locale("es"),(0,s.default)().add(1,"year").format("YYYY-MM-DD HH:mm:ss")}static aleatoryName=()=>{let e=window.crypto,t=new Uint32Array(1);return(e.getRandomValues(t)[0]*new Date().getTime()).toString(36).replace(/\./g,"")};static separateArrayInOtherArray(e,t,r=2){e.forEach((n,a)=>{a%r===0?t.push([n]):t[(a-a%r)/r].push(n)})}static empty(e){switch(e){case"":case 0:case"0":case null:case!1:case typeof e>"u":return!0;default:return!1}}static isValidObjectId(e){return!!i.objectIdPattern.test(e)}static convertStringToDate(e){let r=(0,s.default)(e,"DD/MM/yyyy HH:mm:ss");return r.isValid()?r.toDate():null}static convertDateToString(e){debugger;if(!e)return"";let t;return typeof e=="string"?t=l(e,"dd/MM/yyyy",new Date):t=e,isNaN(t.getTime())?(console.error("Invalid date:",e),""):y(t,"dd/MM/yyyy")}static parseDate(e){if(!e)return null;let[t,r,n]=e.split("/").map(Number);return new Date(n,r-1,t).toISOString().split("T")[0]}};export{g as a,p as b};
