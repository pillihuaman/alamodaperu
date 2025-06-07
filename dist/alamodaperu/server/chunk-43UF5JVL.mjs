import './polyfills.server.mjs';
import{d as t,y as a}from"./chunk-QOSB5ZEG.mjs";var i=class e{loggedIn=new t(!1);isLoggedIn$=this.loggedIn.asObservable();setLoginState(o){this.loggedIn.next(o)}logout(){this.setLoginState(!1),localStorage.removeItem("token")}static \u0275fac=function(n){return new(n||e)};static \u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})};export{i as a};
