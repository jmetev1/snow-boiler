(this["webpackJsonpexpress-HelloWorld"]=this["webpackJsonpexpress-HelloWorld"]||[]).push([[0],{123:function(e,t,n){},190:function(e,t,n){e.exports=n.p+"static/media/pnglogo.a87f43c6.png"},194:function(e,t,n){e.exports=n(474)},199:function(e,t,n){},474:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(186),o=n.n(i),c=(n(199),n(6)),l=n(7),u=n(9),s=n(8),d=n(10),m=n(65);n(123);n(200).load();console.log("jack7","true");var p="/",h=function getMyClinics(){return fetch(p+"clinic",{method:"GET"}).then((function(e){return e.json()}))},f=void 0!==Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_PROD_DATA:"true"}).showState&&Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_PROD_DATA:"true"}).showState,b=n(44),v=n.n(b),y=n(66),E=n(31),g=n(14),O=n(482),j=n(483),S=n(484),C=n(481),A=n(480),w=function r(e){return e[Math.floor(Math.random()*e.length)]},P=["Educational Lunch","Resupply","In-Service","Issue Resolution/Tech Support","Educational Visit"],k=function firstState(){return{provider:"",amountSpent:(45*Math.random()).toFixed(2),reason:w(P),materials:"stuff",receipt:"coming soon"}},D=n(478),V=function SelectClinic(){var e=this;return this.state.allMyClinics?r.a.createElement(O.a,{label:"Choose a Clinic",onChange:function onChange(t){return e.addValue("clinic",t)}},r.a.createElement("option",{key:0,value:0},"Choose A Clinic"),this.state.allMyClinics.map((function(e){var t=e._id,n=e.name;return r.a.createElement("option",{key:t,value:t},n)}))):"loading Clinics"},_=function Wrapper(e){var t=e.children;return r.a.createElement(D.a,{display:"flex",padding:6,background:"tint2",borderRadius:3},r.a.createElement(D.a,{flex:1,alignItems:"center"},t))},M=function SubmitButton(){var e=this,t=this.state,n=t.submitted;return t.waiting&&!n?"Submitting Data":n?r.a.createElement("div",null,"'Successfully Submitted'",r.a.createElement("button",{onClick:function reload(){return location.reload()}},"Add Another")):r.a.createElement(S.a,{onClick:function doIt(){console.log(e),e.setState({submitted:!1,waiting:!0},Object(y.a)(v.a.mark((function _callee(){return v.a.wrap((function _callee$(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.submit();case 2:e.setState({submitted:!0});case 3:case"end":return t.stop()}}),_callee)}))))},appearance:"primary"},"Submit")},T=function DevInfo(e){var t=e.children;return f?r.a.createElement(r.a.Fragment,null,t):null},B=function addValue(e,t){var n={},a=t.target.value;n[e]=a,this.setState(n)},I=function OneClinic(e){var t=e.clinicID,n=e.visits,i=void 0===n?[]:n,o=e.name,c=Object(a.useState)({}),l=Object(E.a)(c,2),u=l[0],s=l[1],d=Object(a.useState)(null),m=Object(E.a)(d,2),h=m[0],f=m[1];Object(a.useEffect)((function(){fetch(p+"getSpendingByDoctor/".concat(t)).then((function(e){return e.json()})).then(s)}),[t]);var b=Object.values(u);return b.length?r.a.createElement(r.a.Fragment,null,"In the last year your total spending by provider at this clinic has been:",b.map((function(e){var t=e.amount,n=e.name;Object(g.a)(e,["amount","name"]);return r.a.createElement("div",{key:n},n,": $",t)})),r.a.createElement("h2",null,"Visits to ",o," "),r.a.createElement(O.a,{label:"Choose Visit To See Details",onChange:function onChange(e){var t=e.target;return f(t.value)}},r.a.createElement("option",{value:"0"},"Choose a Date"),i.map((function(e){e.providers,e.amountSpent;var t=e.date,n=(e.materials,e.receipt,e._id);Object(g.a)(e,["providers","amountSpent","date","materials","receipt","_id"]);return r.a.createElement("option",{key:n,value:n},new Date(t).toLocaleDateString())}))),r.a.createElement(x,{visitID:h,visits:i,spending:u})):"Choose Clinic Or None Found"},x=function OneVisit(e){var t=e.visitID,n=e.visits,a=e.spending;if(console.log(t,n,"in one visit"),t&&"0"!==t){var i=n.filter((function(e){return e._id===t}));if(!i.length)return"Loading or none found";var o=i[0],c=o.amountSpent,l=o.providers,u=o.materials;o.receipt;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",null,"For This Visit"),r.a.createElement("div",null,"Amount Spent: ",c),r.a.createElement("div",null,"Materials: ",u),r.a.createElement("div",null," Providers Present:",l.map((function(e){return r.a.createElement("div",{key:e},a[e].name)}))))}return"Choose a Date"},R=function Err(e){var t=e.children;return r.a.createElement("div",{style:{background:"red"}},t)},q=n(24),N=n(38),F=(N.string().min(2,"Too Short!").max(50,"Too Long!").required("Required"),N.string().min(2,"Too Short!").max(50,"Too Long!").required("Required"),N.string().email("Invalid email").required("Required"),N.object().shape({clinic:N.string().min(2,"Choose a clinic").required("Required"),providers:N.array().min(1,"Choose at least one provider").required("Required"),amountSpent:N.string().min(1,"Enter Amount Spent").required("Required"),reason:N.string().min(2,"Choose Reason For Visit").required("Required"),date:N.string().min(2,"Enter Date and Time").required("Required")})),L=N.object().shape({username:N.string().required(),password:N.string().required()}),z=function(e){function AddVisit(){var e;return Object(c.a)(this,AddVisit),(e=Object(u.a)(this,Object(s.a)(AddVisit).call(this))).submit=function(){var t=Object(y.a)(v.a.mark((function _callee(t,n){var a,r;return v.a.wrap((function _callee$(i){for(;;)switch(i.prev=i.next){case 0:for(r in a=n.resetForm,Object(g.a)(n,["resetForm"]))console.log(26,r);return i.next=4,fetch(p+"visit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(t){console.log(61,t),t&&t._id?(console.log("resetting"),a(),alert("Successfully Submitted")):e.setState({submitError:t})}));case 4:case"end":return i.stop()}}),_callee)})));return function(e,n){return t.apply(this,arguments)}}(),e.state=k(),e.state.allMyClinics=[],e.state.submitError=null,e}return Object(d.a)(AddVisit,e),Object(l.a)(AddVisit,[{key:"componentDidMount",value:function componentDidMount(){var e=this;h().then((function(t){return e.setState({allMyClinics:t})})),fetch(p+"getproviders").then((function(e){return e.json()})).then((function(t){return e.setState({providersByClinic:t})}))}},{key:"render",value:function render(){var e=this,t=this.state,n=t.providersByClinic,a=t.allMyClinics;t.clinic;return console.log(44,"production"),r.a.createElement(q.d,{initialValues:{date:"",providers:[],amountSpent:"",reason:"0"},validationSchema:F,onSubmit:this.submit},(function(t){var i=t.isSubmitting,o=t.values;Object(g.a)(t,["isSubmitting","values"]);return r.a.createElement(_,null,r.a.createElement(q.c,null,r.a.createElement(J,{values:o}),r.a.createElement(q.a,{component:R,name:"clinic"}),r.a.createElement(q.b,{name:"clinic",as:O.a,label:"Choose Clinic"},r.a.createElement("option",{key:0,value:0},"Choose Clinic"),a.map((function(e){var t=e._id,n=e.name;return r.a.createElement("option",{key:t,value:t,children:n})}))),r.a.createElement(q.a,{component:R,name:"date"}),r.a.createElement(q.b,{name:"date",label:"Date",type:"datetime-local",as:j.a,autoComplete:"true"}),r.a.createElement(K,{providersByClinic:n,clinic:o.clinic}),r.a.createElement(q.a,{component:R,name:"reason"}),r.a.createElement(q.b,{name:"reason",as:O.a,label:"Reason For Visit"},r.a.createElement("option",{value:"0",key:0},"Choose a Reason"),P.map((function(e){return r.a.createElement("option",{value:e,key:e},e)}))),r.a.createElement(q.a,{component:R,name:"amountSpent"}),r.a.createElement(q.b,{name:"amountSpent",as:j.a,label:"Enter Amount Spent"}),r.a.createElement("label",null,"Additional Notes:",r.a.createElement("div",null,r.a.createElement(q.b,{name:"notes",as:"textarea"}))),r.a.createElement(j.a,{type:"file",capture:"camera",accept:"image/*",label:"Add Receipt"}),r.a.createElement("div",null,r.a.createElement(S.a,{type:"submit",disabled:i,children:"Submit"}),i&&"Adding Visit",e.state.submitError&&e.state.submitError)))}))}}]),AddVisit}(r.a.Component),J=function See(e){var t=e.values;e.errors;return r.a.createElement(T,null,Object.entries(t).map((function(e){var t=Object(E.a)(e,2),n=t[0],a=t[1];return r.a.createElement("div",{key:n},n," value is ",a||"empty")})))},K=function SelectProvider(e){var t=e.providersByClinic,n=e.clinic,a=(Object(g.a)(e,["providersByClinic","clinic"]),t&&t[n]||[]);return r.a.createElement(C.a,{label:"Choose Providers"},r.a.createElement(q.a,{component:R,name:"providers"}),a.map((function(e){var t=e._id,n=e.name;return r.a.createElement(q.b,{key:t,label:n,as:A.a,type:"checkbox",name:"providers",value:t})})))},U=n(2),H=n(23),W=n(74),$=n(67),G=n.n($);function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var Q=function(e){function AddProvider(){var e;return Object(c.a)(this,AddProvider),(e=Object(u.a)(this,Object(s.a)(AddProvider).call(this))).submit=function(){var t=function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(n,!0).forEach((function(t){Object(U.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.state);delete t.allMyClinics,fetch(p+"provider",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){}))},e.Input=function(t){var n=t.id,a=t.label;return r.a.createElement(j.a,{required:!0,label:a,value:e.state[n],onChange:e.addValue.bind(Object(H.a)(e),n)})},e.SelectType=function(){return r.a.createElement(W.SelectField,{label:"Provider Type",defaultValue:"MD",onChange:function onChange(t){return e.addValue("type",t)}},e.providerTypes.map((function(e){return r.a.createElement("option",{key:e,value:e},e)})))},e.See=function(){return r.a.createElement(T,null,Object.entries(e.state).map((function(e){var t=Object(E.a)(e,2),n=t[0],a=t[1];return"allMyClinics"!==n&&r.a.createElement("div",{key:n},n," is ",a)})))},e.state={name:G.a.first()+" "+G.a.last(),clinic:"",type:"MD"},e.providerTypes=["MD","PA","NP","MSN"],e.SelectClinic=V.bind(Object(H.a)(e)),e.SubmitButton=M.bind(Object(H.a)(e)),e}return Object(d.a)(AddProvider,e),Object(l.a)(AddProvider,[{key:"componentDidMount",value:function componentDidMount(){var e=this;h().then((function(t){var n=function rando(e){return Math.floor(Math.random()*e)};e.setState({type:e.providerTypes[n(4)],allMyClinics:t,clinic:t[n(t.length)]._id},(function(){}))}))}},{key:"addValue",value:function addValue(e,t){var n={};n[e]=t.target.value,this.setState(n)}},{key:"render",value:function render(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(this.See,null),r.a.createElement(this.SelectClinic,null),r.a.createElement(this.Input,{id:"name",label:"Provider Name"}),r.a.createElement(this.SelectType,null),r.a.createElement(this.SubmitButton,null))}}]),AddProvider}(r.a.Component),X=function(e){function AddClinic(){var e;return Object(c.a)(this,AddClinic),(e=Object(u.a)(this,Object(s.a)(AddClinic).call(this))).submit=function(){console.log(17),fetch(p+"clinic",{method:"POST",body:JSON.stringify(e.state),headers:{"Content-Type":"application/json"}}).then((function(e){console.log(23,e),e.json()})).then((function(e){console.log("add clinic",e)}))},e.Input=function(t){var n=t.id,a=t.desc;return r.a.createElement(j.a,{label:a,required:!0,value:e.state[n],onChange:e.addValue.bind(Object(H.a)(e),n)})},e.See=function(){return r.a.createElement(T,null,Object.entries(e.state).map((function(e){var t=Object(E.a)(e,2),n=t[0],a=t[1];return r.a.createElement("div",{key:n},n," is ",a)})))},e.state={name:G.a.last()+" Clinic",address:"100 "+G.a.middle()+" St."},e.SubmitButton=M.bind(Object(H.a)(e)),e}return Object(d.a)(AddClinic,e),Object(l.a)(AddClinic,[{key:"componentDidMount",value:function componentDidMount(){0}},{key:"addValue",value:function addValue(e,t){var n={};n[e]=t.target.value,this.setState(n)}},{key:"render",value:function render(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(this.See,null),r.a.createElement(this.Input,{id:"name",desc:"Clinic Name"}),r.a.createElement(this.Input,{id:"address",desc:"Clinic Address"}),r.a.createElement(this.SubmitButton,null))}}]),AddClinic}(r.a.Component),Y=function(e){function PastVisits(){var e;return Object(c.a)(this,PastVisits),(e=Object(u.a)(this,Object(s.a)(PastVisits).call(this))).state={},e.SelectClinic=V.bind(Object(H.a)(e)),e.addValue=B.bind(Object(H.a)(e)),e}return Object(d.a)(PastVisits,e),Object(l.a)(PastVisits,[{key:"componentDidMount",value:function componentDidMount(){var e=this;fetch(p+"clinic").then((function(e){return e.json()})).then((function(t){e.setState({allMyClinics:t},(function(){console.log(16,t),e.clinicIdToName=t.reduce((function(e,t){var n=t.name;return e[t._id]=n,e}),{})}))})),fetch(p+"visits").then((function(e){return e.json()})).then((function(t){e.setState({allVisits:t},(function(){var n=t.reduce((function(e,t){var n=t.clinic;return e[n]=e[n]?e[n].concat([t]):[t],e}),{});e.setState({byClinic:n})}))})),fetch(p+"getproviders").then((function(e){return e.json()})).then((function(t){return e.setState({providersById:t})}))}},{key:"render",value:function render(){var e=this.state,t=e.allVisits,n=e.clinic,a=e.byClinic,i=void 0===a?{}:a;return console.log(this.state),console.log(this.clinicIdToName),r.a.createElement(_,null,t?r.a.createElement(r.a.Fragment,null,r.a.createElement(this.SelectClinic,null),r.a.createElement(I,{clinicID:n,visits:i[n],name:this.clinicIdToName[n]})):"Loading")}}]),PastVisits}(r.a.Component),Z=function(e){function Authorized(){var e;return Object(c.a)(this,Authorized),(e=Object(u.a)(this,Object(s.a)(Authorized).call(this))).Header=function(){var t={"Past Visits":Y,"Add Clinic":X,"Add Provider":Q,"Add Visit":z},n=function MyButton(e){return r.a.createElement(m.Button,Object.assign({style:{flex:"1 1 33%"},height:"36"},e))},a={margin:"auto"};return r.a.createElement("nav",{style:{display:"flex",flexWrap:"wrap"}},r.a.createElement(n,{key:"logout",onClick:e.logout,children:r.a.createElement("span",{style:a},"Logout")}),Object.entries(t).map((function(t){var i=Object(E.a)(t,2),o=i[0],c=i[1];return r.a.createElement(n,{key:o,appearance:c===e.state.show?"primary":"default",onClick:function onClick(){return e.setState({show:c})}},r.a.createElement("span",{style:a},o))})))},e.state={show:z},e}return Object(d.a)(Authorized,e),Object(l.a)(Authorized,[{key:"logout",value:function(){var e=Object(y.a)(v.a.mark((function _callee(){return v.a.wrap((function _callee$(e){for(;;)switch(e.prev=e.next){case 0:fetch(p+"logout").then((function(){return location.reload()}));case 1:case"end":return e.stop()}}),_callee)})));return function logout(){return e.apply(this,arguments)}}()},{key:"render",value:function render(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(this.Header,null),"function"===typeof this.state.show?r.a.createElement(D.a,{paddingTop:30,display:"flex",alignItems:"center",justifyContent:"center"},r.a.createElement(D.a,{width:"90vw",border:"default"},r.a.createElement(this.state.show,null))):r.a.createElement("div",null,"you broke authorized.js"))}}]),Authorized}(r.a.Component),ee=n(190),te=n.n(ee),ne=function(e){function App(){var e,t;Object(c.a)(this,App);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(t=Object(u.a)(this,(e=Object(s.a)(App)).call.apply(e,[this].concat(a)))).submit=function(e){fetch(p+"login",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){t.setState({region:e})}))},t.Login=function(){return r.a.createElement(D.a,{display:"flex",alignItems:"center",justifyContent:"center",height:"70vh"},r.a.createElement(D.a,{width:"90vw",border:"default"},r.a.createElement("img",{src:te.a,height:"47px",alt:"pgl logo"}),r.a.createElement(q.d,{initialValues:{username:"",password:""},onSubmit:t.submit,validationSchema:L},(function(e){var t=e.isSubmitting;return r.a.createElement(q.c,null,r.a.createElement(q.a,{component:R,name:"username"}),r.a.createElement(q.b,{as:j.a,name:"username",label:"Username"}),r.a.createElement(q.a,{component:R,name:"password"}),r.a.createElement(q.b,{as:j.a,name:"password",label:"Password",type:"password"}),r.a.createElement(m.Button,{type:"submit",disabled:t,children:"Submit"}))}))))},t}return Object(d.a)(App,e),Object(l.a)(App,[{key:"componentDidMount",value:function componentDidMount(){var e=this;this.props.region.then((function(e){return e.json()})).then((function(t){e.setState({region:t.rep})})).catch((function(e){throw new Error("app js setstate on comp did mount")}))}},{key:"render",value:function render(){return r.a.createElement(r.a.StrictMode,null,this.state&&this.state.region?r.a.createElement(Z,null):r.a.createElement(this.Login,null))}}]),App}(r.a.Component);function ErrorBoundary_ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var ae=function(e){function ErrorBoundary(e){var t;return Object(c.a)(this,ErrorBoundary),(t=Object(u.a)(this,Object(s.a)(ErrorBoundary).call(this,e))).state={error:null},t}return Object(d.a)(ErrorBoundary,e),Object(l.a)(ErrorBoundary,[{key:"componentDidCatch",value:function componentDidCatch(e,t){this.setState(function ErrorBoundary_objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ErrorBoundary_ownKeys(n,!0).forEach((function(t){Object(U.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ErrorBoundary_ownKeys(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({error:e},t))}},{key:"render",value:function render(){return this.state.error?r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Something went wrong."),Object.entries(this.state).map((function(e){var t=Object(E.a)(e,2),n=t[0],a=t[1];return r.a.createElement("div",{style:{outline:"solid",padding:"10px"},key:n},n," is ",a.toString())})),"    "):this.props.children}}]),ErrorBoundary}(r.a.Component),re=fetch(p+"login",{credentials:"include"});o.a.render(r.a.createElement(ae,null,r.a.createElement(ne,{region:re})),document.getElementById("root"))}},[[194,1,2]]]);
//# sourceMappingURL=main.fb38ffc3.chunk.js.map