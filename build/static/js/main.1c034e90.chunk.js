(this["webpackJsonpejercicio2.10"]=this["webpackJsonpejercicio2.10"]||[]).push([[0],{41:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n(17),a=n.n(c),s=(n(8),n(3)),i=n(0),u=function(e){var t=e.name,n=e.number;return Object(i.jsxs)("p",{children:[Object(i.jsxs)("span",{children:["Name: ",t,"  "]}),Object(i.jsxs)("span",{children:["Number: ",n,"   "]})]})},o=function(e){var t=e.setNewFilter;return Object(i.jsx)("div",{children:Object(i.jsxs)("div",{children:["Search with an : ",Object(i.jsx)("input",{onChange:function(e){t(e.target.value)}})]})})},d=n(4),j=n.n(d),l="/api/persons",b={getAll:function(){return j.a.get(l).then((function(e){return e.data}))},create:function(e){return j.a.post(l,e).then((function(e){return e.data}))},update:function(e,t){return j.a.put(l+"/"+e,t).then((function(e){return e.data}))},deleteData:function(e){return j.a.delete(l+"/"+e.id,e).then()}},f=function(e){var t=e.persons,n=e.setPersons,c=e.setNewMessage,a=Object(r.useState)(""),u=Object(s.a)(a,2),o=u[0],d=u[1],j=Object(r.useState)(""),l=Object(s.a)(j,2),f=l[0],m=l[1];return console.log("render Adder"),Object(i.jsx)("div",{children:Object(i.jsxs)("form",{onSubmit:function(e){e.preventDefault();var r={name:o,number:f};if(t.some((function(e){return e.name===r.name}))){var a={description:"".concat(r.name," ya fue agregad@... Desea cambiar el numero?"),state:"error"};if(c(a),setTimeout((function(){c({description:null,state:""})}),5e3),window.confirm("".concat(r.name," ya fue agregad@... Desea cambiar el numero?"))){var s=t.find((function(e){return e.name===r.name}));b.update(s.id,r).then((function(){n(t.map((function(e){return e.name===r.name?r:e}))),c({description:"Added "+r.name,state:"message"}),setTimeout((function(){c({description:null,state:""})}),5e3)}))}}else b.create(r).then((function(e){n(t.concat(e)),c({description:"Added "+r.name,state:"message"}),setTimeout((function(){c({description:null,state:""})}),5e3)}))},children:[Object(i.jsxs)("div",{children:["Name: ",Object(i.jsx)("input",{onChange:function(e){d(e.target.value)}})]}),Object(i.jsxs)("div",{children:["Number: ",Object(i.jsx)("input",{onChange:function(e){m(e.target.value)}})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})})},m=function(e){var t=e.message,n=e.stateMessage;return null===t?null:Object(i.jsx)("div",{className:n,children:t})},h=function(){var e=Object(r.useState)([]),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),d=Object(s.a)(a,2),j=d[0],l=d[1],h=Object(r.useState)({description:null,state:""}),O=Object(s.a)(h,2),p=O[0],x=O[1];Object(r.useEffect)((function(){b.getAll().then((function(e){c(e)}))}),[]),console.log("render APP");return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(m,{message:p.description,stateMessage:p.state}),Object(i.jsx)(o,{setNewFilter:l}),Object(i.jsx)("h2",{children:"Add a new"}),Object(i.jsx)(f,{setPersons:c,persons:n,setNewMessage:x}),Object(i.jsx)("h2",{children:"Persons"}),n.filter((function(e){return e.name.toLowerCase().includes(j.toLowerCase())})).map((function(e){return Object(i.jsxs)("div",{children:[Object(i.jsx)(u,{name:e.name,number:e.number}),Object(i.jsx)("button",{onClick:function(){return t=e,void(window.confirm("La entrada sera borrada...Esta seguro?")&&b.deleteData(t).then((function(e){c(n.filter((function(e){return e.id!==t.id})))})));var t},children:"delete"})]},e.id)}))]})};a.a.render(Object(i.jsx)(h,{}),document.getElementById("root"))},8:function(e,t,n){}},[[41,1,2]]]);
//# sourceMappingURL=main.1c034e90.chunk.js.map