(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,n,t){e.exports=t(41)},40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(16),c=t.n(u),o=t(17),i=t(6),l=t(2),s=t(4),m=t.n(s),f="/api/persons",d=function(){return m.a.get(f).then((function(e){return e.data}))},b=function(e){return m.a.post(f,e).then((function(e){return e.data}))},h=function(e){return m.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},p=function(e){return m.a.put("".concat(f,"/").concat(e.id),e).then((function(e){return e.data}))},E=function(e){var n=e.person,t=e.onDelete;return r.a.createElement("li",null,n.name," - ",n.number," ",r.a.createElement("button",{onClick:function(){return t(n)}},"Delete"))},g=function(e){var n=e.persons,t=e.filter,a=e.onDelete;return r.a.createElement("ul",null,n.filter((function(e){return e.name.toLowerCase().includes(t)})).map((function(e){return r.a.createElement(E,{key:e.name,person:e,onDelete:a})})))},v=function(e){var n=e.onFilterChange;return r.a.createElement(a.Fragment,null,"filter ",r.a.createElement("input",{onChange:function(e){return n(e)}}))},w=function(e){return r.a.createElement("form",{onSubmit:function(n){return e.onSubmit(n)}},r.a.createElement("div",null,"name:"," ",r.a.createElement("input",{onChange:function(n){return e.onNameChange(n)},value:e.newName})),r.a.createElement("div",null,"number",r.a.createElement("input",{onChange:function(n){return e.onNumberChange(n)},value:e.newNumber})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},j=(t(40),function(e){var n=e.children,t=e.success,u=e.hide;return Object(a.useEffect)((function(){setTimeout((function(){u()}),5e3)}),[u]),r.a.createElement(a.Fragment,null,n?r.a.createElement("div",{className:"notification",style:{backgroundColor:t?"green":"red"}},n):null)}),C=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),s=Object(l.a)(c,2),m=s[0],f=s[1],E=Object(a.useState)(""),C=Object(l.a)(E,2),O=C[0],k=C[1],N=Object(a.useState)(""),S=Object(l.a)(N,2),y=S[0],D=S[1],F=Object(a.useState)(null),L=Object(l.a)(F,2),A=L[0],x=L[1];return Object(a.useEffect)((function(){d().then((function(e){u(e)}))}),[]),r.a.createElement("div",null,A&&r.a.createElement(j,{success:A.success,hide:function(){return x(null)}},A.message),r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{onFilterChange:function(e){D(e.target.value.toLowerCase())}}),r.a.createElement("h2",null,"Add new"),r.a.createElement(w,{onSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name.toLowerCase()===m.toLowerCase()}));if(n){if(O!==n.number)if(window.confirm("".concat(n.name," is already added to the phonebook, do you want to replace the old phone number with the new one?")))return p(Object(i.a)(Object(i.a)({},n),{},{number:O})).then((function(){u((function(e){return e.map((function(e){return e.id===n.id&&(e.number=O),e}))})),x({message:"Updated phone number",success:!0})}));return alert("Person is already in phonebook")}b({name:m,number:O}).then((function(){u((function(e){return[].concat(Object(o.a)(e),[{name:m,number:O}])})),x({message:"Added ".concat(m),success:!0}),k(""),f("")}))},onNameChange:function(e){f(e.target.value)},onNumberChange:function(e){k(e.target.value)},newName:m,newNumber:O}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(g,{persons:t,filter:y,onDelete:function(e){window.confirm("Delete ".concat(e.name,"?"))&&h(e.id).then((function(){u((function(n){return n.filter((function(n){return n.id!==e.id}))})),x({message:"Deleted Successfully",success:!0})})).catch((function(n){return 404===n.response.status?x({message:"".concat(e.name," has already been removed"),success:!1}):x({message:"An unexpected error ocurred",success:!1})}))}}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(C,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.d305d6b3.chunk.js.map