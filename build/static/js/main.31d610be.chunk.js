(this["webpackJsonpexpress-HelloWorld"]=this["webpackJsonpexpress-HelloWorld"]||[]).push([[0],{123:function(e,t,n){},190:function(e,t,n){e.exports=n.p+"static/media/pglogo.70990ae3.webp"},194:function(e,t,n){e.exports=n(475)},199:function(e,t,n){},200:function(e,t,n){e.exports=n.p+"static/media/la_south.b57e2716.gif"},475:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(186),c=n.n(i),o=(n(199),n(6)),l=n(7),u=n(9),s=n(8),m=n(10),d=n(66);n(123),n(200);n(201).load();console.log("jack7","true");var p="/",h=function(){return fetch(p+"clinic",{method:"GET"}).then((function(e){return e.json()}))},f=void 0!==Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_PROD_DATA:"true"}).showState&&Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_PROD_DATA:"true"}).showState,v=n(39),b=n.n(v),E=n(55),y=n(33),g=n(14),j=n(483),O=n(484),S=n(485),C=n(482),k=n(481),w=["Educational Lunch","Resupply","In-Service","Issue Resolution/Tech Support","Educational Visit"],P=function(){return{provider:"",amountSpent:(45*Math.random()).toFixed(2),reason:(e=w,e[Math.floor(Math.random()*e.length)]),materials:"stuff",receipt:"coming soon"};var e},D=n(479),T=function(){var e=this;return this.state.allMyClinics?r.a.createElement(j.a,{label:"Choose a Clinic",onChange:function(t){return e.addValue("clinic",t)}},r.a.createElement("option",{key:0,value:0},"Choose A Clinic"),this.state.allMyClinics.map((function(e){var t=e._id,n=e.name;return r.a.createElement("option",{key:t,value:t},n)}))):"loading Clinics"},x=function(e){var t=e.children;return r.a.createElement(D.a,{display:"flex",padding:6,background:"tint2",borderRadius:3},r.a.createElement(D.a,{flex:1,alignItems:"center"},t))},A=function(){var e=this,t=this.state,n=t.submitted;return t.waiting&&!n?"Submitting Data":n?r.a.createElement("div",null,"'Successfully Submitted'",r.a.createElement("button",{onClick:function(){return location.reload()}},"Add Another")):r.a.createElement(S.a,{onClick:function(){console.log(e),e.setState({submitted:!1,waiting:!0},Object(E.a)(b.a.mark((function t(){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.submit();case 2:e.setState({submitted:!0});case 3:case"end":return t.stop()}}),t)}))))},appearance:"primary"},"Submit")},M=function(e){var t=e.children;return f?r.a.createElement(r.a.Fragment,null,t):null},I=function(e,t){var n={},a=t.target.value;n[e]=a,this.setState(n)},V=function(e){var t=e.clinicID,n=e.visits,i=void 0===n?[]:n,c=e.name,o=Object(a.useState)({}),l=Object(y.a)(o,2),u=l[0],s=l[1],m=Object(a.useState)(null),d=Object(y.a)(m,2),h=d[0],f=d[1];Object(a.useEffect)((function(){fetch(p+"getSpendingByDoctor/".concat(t)).then((function(e){return e.json()})).then(s)}),[t]);var v=Object.values(u);return v.length?r.a.createElement(r.a.Fragment,null,"In the last year your total spending by provider at this clinic has been:",v.map((function(e){var t=e.amount,n=e.name;Object(g.a)(e,["amount","name"]);return r.a.createElement("div",{key:n},n,": $",t)})),r.a.createElement("h2",null,"Visits to ",c," "),r.a.createElement(j.a,{label:"Choose Visit To See Details",onChange:function(e){var t=e.target;return f(t.value)}},r.a.createElement("option",{value:"0"},"Choose a Date"),i.map((function(e){e.providers,e.amountSpent;var t=e.date,n=(e.materials,e.receipt,e._id);Object(g.a)(e,["providers","amountSpent","date","materials","receipt","_id"]);return r.a.createElement("option",{key:n,value:n},new Date(t).toLocaleDateString())}))),r.a.createElement(R,{visitID:h,visits:i,spending:u})):"Choose Clinic Or None Found"},R=function(e){var t=e.visitID,n=e.visits,a=e.spending;if(console.log(t,n,"in one visit"),t&&"0"!==t){var i=n.filter((function(e){return e._id===t}));if(!i.length)return"Loading or none found";var c=i[0],o=c.amountSpent,l=c.providers,u=c.materials;c.receipt;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",null,"For This Visit"),r.a.createElement("div",null,"Amount Spent: ",o),r.a.createElement("div",null,"Materials: ",u),r.a.createElement("div",null," Providers Present:",l.map((function(e){return r.a.createElement("div",{key:e},a[e].name)}))))}return"Choose a Date"},q=function(e){var t=e.children;return r.a.createElement("div",{style:{background:"red"}},t)},_=n(24),B=n(38),N=(B.string().min(2,"Too Short!").max(50,"Too Long!").required("Required"),B.string().min(2,"Too Short!").max(50,"Too Long!").required("Required"),B.string().email("Invalid email").required("Required"),B.object().shape({clinic:B.string().min(2,"Choose a clinic").required("Required"),providers:B.array().min(1,"Choose at least one provider").required("Required"),amountSpent:B.string().min(1,"Enter Amount Spent").required("Required"),reason:B.string().min(2,"Choose Reason For Visit").required("Required"),date:B.string().min(2,"Enter Date and Time").required("Required")})),F=B.object().shape({username:B.string().required(),password:B.string().required()}),L=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(s.a)(t).call(this))).submit=function(){var e=Object(E.a)(b.a.mark((function e(t,n){var a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object.entries(t).forEach((function(e){var t=Object(y.a)(e,2),n=t[0],a=t[1];return console.log(n+" "+a)})),a=JSON.stringify(t),console.log(a),e.next=5,fetch(p+"visit",{method:"POST",headers:{"Content-Type":"application/json"},body:a}).then((function(e){if(console.log(61,e),!e.ok)throw new Error("error posting")}));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),e.state=P(),e.state.allMyClinics=[],e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;h().then((function(t){return e.setState({allMyClinics:t})})),this.getAllProviders()}},{key:"getAllProviders",value:function(){var e=Object(E.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(p+"getproviders",{method:"GET"}).then((function(e){return e.json()}));case 2:t=e.sent,this.setState({providersByClinic:t});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.providersByClinic,n=e.allMyClinics;e.clinic;return r.a.createElement(_.d,{initialValues:{date:"",providers:[],amountSpent:"",reason:"0"},validationSchema:N,onSubmit:this.submit},(function(e){var a=e.isSubmitting,i=e.values,c=Object(g.a)(e,["isSubmitting","values"]);return console.log(c.errors),r.a.createElement(x,null,r.a.createElement(_.c,null,r.a.createElement(J,{values:i}),r.a.createElement(_.a,{component:q,name:"clinic"}),r.a.createElement(_.b,{name:"clinic",as:j.a,label:"Choose Clinic"},r.a.createElement("option",{key:0,value:0},"Choose Clinic"),n.map((function(e){var t=e._id,n=e.name;return r.a.createElement("option",{key:t,value:t,children:n})}))),r.a.createElement(_.a,{component:q,name:"date"}),r.a.createElement(_.b,{name:"date",label:"Date",type:"datetime-local",as:O.a,autoComplete:"true"}),r.a.createElement(U,{providersByClinic:t,clinic:i.clinic}),r.a.createElement(_.a,{component:q,name:"reason"}),r.a.createElement(_.b,{name:"reason",as:j.a,label:"Reason For Visit"},r.a.createElement("option",{value:"0",key:0},"Choose a Reason"),w.map((function(e){return r.a.createElement("option",{value:e,key:e},e)}))),r.a.createElement(_.a,{component:q,name:"amountSpent"}),r.a.createElement(_.b,{name:"amountSpent",as:O.a,label:"Enter Amount Spent"}),r.a.createElement("label",null,"Additional Notes:",r.a.createElement("div",null,r.a.createElement(_.b,{name:"notes",as:"textarea"}))),r.a.createElement(O.a,{type:"file",capture:"camera",accept:"image/*",label:"Add Receipt"}),r.a.createElement("div",null,r.a.createElement(S.a,{type:"submit",disabled:a,children:"Submit"}))))}))}}]),t}(r.a.Component),J=function(e){var t=e.values;e.errors;return r.a.createElement(M,null,Object.entries(t).map((function(e){var t=Object(y.a)(e,2),n=t[0],a=t[1];return r.a.createElement("div",{key:n},n," value is ",a||"empty")})))},U=function(e){var t=e.providersByClinic,n=e.clinic,a=(Object(g.a)(e,["providersByClinic","clinic"]),t&&t[n]||[]);return r.a.createElement(C.a,{label:"Choose Providers"},r.a.createElement(_.a,{component:q,name:"providers"}),a.map((function(e){var t=e._id,n=e.name;return r.a.createElement(_.b,{key:t,label:n,as:k.a,type:"checkbox",name:"providers",value:t})})))},H=n(2),W=n(23),G=n(74),z=n(67),$=n.n(z);function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var Q=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(s.a)(t).call(this))).submit=function(){var t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(n,!0).forEach((function(t){Object(H.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.state);delete t.allMyClinics,fetch(p+"provider",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){}))},e.Input=function(t){var n=t.id,a=t.label;return r.a.createElement(O.a,{required:!0,label:a,value:e.state[n],onChange:e.addValue.bind(Object(W.a)(e),n)})},e.SelectType=function(){return r.a.createElement(G.SelectField,{label:"Provider Type",defaultValue:"MD",onChange:function(t){return e.addValue("type",t)}},e.providerTypes.map((function(e){return r.a.createElement("option",{key:e,value:e},e)})))},e.See=function(){return r.a.createElement(M,null,Object.entries(e.state).map((function(e){var t=Object(y.a)(e,2),n=t[0],a=t[1];return"allMyClinics"!==n&&r.a.createElement("div",{key:n},n," is ",a)})))},e.state={name:$.a.first()+" "+$.a.last(),clinic:"",type:"MD"},e.providerTypes=["MD","PA","NP","MSN"],e.SelectClinic=T.bind(Object(W.a)(e)),e.SubmitButton=A.bind(Object(W.a)(e)),e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;h().then((function(t){var n=function(e){return Math.floor(Math.random()*e)};e.setState({type:e.providerTypes[n(4)],allMyClinics:t,clinic:t[n(t.length)]._id},(function(){}))}))}},{key:"addValue",value:function(e,t){var n={};n[e]=t.target.value,this.setState(n)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(this.See,null),r.a.createElement(this.SelectClinic,null),r.a.createElement(this.Input,{id:"name",label:"Provider Name"}),r.a.createElement(this.SelectType,null),r.a.createElement(this.SubmitButton,null))}}]),t}(r.a.Component),X=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(s.a)(t).call(this))).submit=function(){console.log(17),fetch(p+"clinic",{method:"POST",body:JSON.stringify(e.state),headers:{"Content-Type":"application/json"}}).then((function(e){console.log(23,e),e.json()})).then((function(e){console.log("add clinic",e)}))},e.Input=function(t){var n=t.id,a=t.desc;return r.a.createElement(O.a,{label:a,required:!0,value:e.state[n],onChange:e.addValue.bind(Object(W.a)(e),n)})},e.See=function(){return r.a.createElement(M,null,Object.entries(e.state).map((function(e){var t=Object(y.a)(e,2),n=t[0],a=t[1];return r.a.createElement("div",{key:n},n," is ",a)})))},e.state={name:$.a.last()+" Clinic",address:"100 "+$.a.middle()+" St."},e.SubmitButton=A.bind(Object(W.a)(e)),e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){0}},{key:"addValue",value:function(e,t){var n={};n[e]=t.target.value,this.setState(n)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(this.See,null),r.a.createElement(this.Input,{id:"name",desc:"Clinic Name"}),r.a.createElement(this.Input,{id:"address",desc:"Clinic Address"}),r.a.createElement(this.SubmitButton,null))}}]),t}(r.a.Component),Y=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(s.a)(t).call(this))).state={},e.SelectClinic=T.bind(Object(W.a)(e)),e.addValue=I.bind(Object(W.a)(e)),e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch(p+"clinic").then((function(e){return e.json()})).then((function(t){e.setState({allMyClinics:t},(function(){e.clinicIdToName=t.reduce((function(e,t){var n=t.name;return e[t._id]=n,e}),{})}))})),fetch(p+"visits").then((function(e){return e.json()})).then((function(t){e.setState({allVisits:t},(function(){var n=t.reduce((function(e,t){var n=t.clinic;return e[n]=e[n]?e[n].concat([t]):[t],e}),{});e.setState({byClinic:n})}))})),fetch(p+"getproviders").then((function(e){return e.json()})).then((function(t){return e.setState({providersById:t})}))}},{key:"render",value:function(){var e=this.state,t=e.allVisits,n=e.clinic,a=e.byClinic,i=void 0===a?{}:a;return console.log(this.state),r.a.createElement(x,null,t?r.a.createElement(r.a.Fragment,null,r.a.createElement(this.SelectClinic,null),r.a.createElement(V,{clinicID:n,visits:i[n],name:this.clinicIdToName[n]})):"Loading")}}]),t}(r.a.Component),Z=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(s.a)(t).call(this))).Header=function(){var t={"Add Provider":Q,"Add Clinic":X,"Past Visits":Y,"Add Visit":L},n=function(e){return r.a.createElement(d.Button,Object.assign({style:{flex:"1 1 33%"},height:"40"},e))},a={margin:"auto"};return r.a.createElement("nav",{style:{display:"flex",flexWrap:"wrap"}},r.a.createElement(n,{key:"logout",onClick:e.logout,children:r.a.createElement("span",{style:a},"Logout")}),Object.entries(t).map((function(t){var i=Object(y.a)(t,2),c=i[0],o=i[1];return r.a.createElement(n,{key:c,appearance:o===e.state.show?"primary":"default",onClick:function(){return e.setState({show:o})}},r.a.createElement("span",{style:a},c))})))},e.state={show:L},e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"logout",value:function(){var e=Object(E.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch(p+"logout").then((function(){return location.reload()}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(this.Header,null),"function"===typeof this.state.show?r.a.createElement(D.a,{paddingTop:30,display:"flex",alignItems:"center",justifyContent:"center"},r.a.createElement(D.a,{width:"90vw",border:"default"},r.a.createElement(this.state.show,null))):r.a.createElement("div",null,"you broke authorized.js"))}}]),t}(r.a.Component),ee=n(190),te=n.n(ee),ne=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,i=new Array(a),c=0;c<a;c++)i[c]=arguments[c];return(n=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(i)))).submit=function(e){fetch(p+"login",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){n.setState({region:e})}))},n.Login=function(){return r.a.createElement(D.a,{display:"flex",alignItems:"center",justifyContent:"center",height:"70vh"},r.a.createElement(D.a,{width:"90vw",border:"default"},r.a.createElement("img",{src:te.a,height:"47px",alt:"pgl logo"}),r.a.createElement(_.d,{initialValues:{username:"",password:""},onSubmit:n.submit,validationSchema:F},(function(e){var t=e.isSubmitting;return r.a.createElement(_.c,null,r.a.createElement(_.a,{component:q,name:"username"}),r.a.createElement(_.b,{as:O.a,name:"username",label:"Username"}),r.a.createElement(_.a,{component:q,name:"password"}),r.a.createElement(_.b,{as:O.a,name:"password",label:"Password",type:"password"}),r.a.createElement(d.Button,{type:"submit",disabled:t,children:"Submit"}))}))))},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.region.then((function(e){return e.json()})).then((function(t){e.setState({region:t.rep})}))}},{key:"render",value:function(){return this.state&&this.state.region?r.a.createElement(Z,null):r.a.createElement(this.Login,null)}}]),t}(r.a.Component),ae=fetch(p+"login",{credentials:"include"});c.a.render(r.a.createElement(ne,{region:ae}),document.getElementById("root"))}},[[194,1,2]]]);