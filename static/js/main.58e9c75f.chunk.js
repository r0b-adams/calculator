(this.webpackJsonpcalculator=this.webpackJsonpcalculator||[]).push([[0],{36:function(t,n,e){},46:function(t,n){},47:function(t,n,e){"use strict";e.r(n);var c=e(16),a=e.n(c),l=e(29),o=e.n(l),s=e(9),u=e(14),b=e(51),i=e(50),r=(e(36),e(8)),j=Object(b.a)(i.a);function p(){var t=Object(c.useState)(""),n=Object(u.a)(t,2),e=n[0],a=n[1],l=Object(c.useState)([]),o=Object(u.a)(l,2),b=o[0],i=o[1],p=function(t){var n=t.target.value,c=e,l=(c+=n).match(/\d+/g),o=l.reduce((function(t,n){return t+n.length}),0);l[1]&&l[1].length>10?alert("max digits after decimal is 10"):o>15?alert("max number of digits is 15"):"0"!==e&&a(c)},d=function(t){var n=t.target.value,e=Object(s.a)(b),c=h();c?(e.push(c),e.push(n),i(e)):b.length&&(e[e.length-1]=n,i(e)),a("")},h=function(){if(e&&"(-"!==e){var t=e;return t.endsWith(".")&&(t+="0"),t.startsWith("(-")&&!t.endsWith(")")&&(t+=")"),t}},m=function(){var t=h(),n=b.join("")+t;if(t)try{var e=j.evaluate(n);return(e=j.format(e,{precision:10})).toString()}catch(c){console.log("invalid expression")}return""};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("p",{className:"input",children:b.join(" ")+" "+e}),Object(r.jsx)("p",{className:"output",children:m()}),Object(r.jsx)("button",{className:"operator-btn",type:"button",onClick:function(){if(e.length)switch(e){case"(-":case"0.":a("");break;case"(-0.":a("(-");break;default:a(e.slice(0,-1))}else if(b.length){var t=Object(s.a)(b).slice(0,-1),n=t.pop();a(n),i(t)}},children:"BKSPC"}),Object(r.jsx)("button",{className:"clear-btn",type:"button",onClick:function(){a("")},children:"C"}),Object(r.jsx)("button",{className:"clear-btn",type:"button",onClick:function(){a(""),i([])},children:"AC"}),Object(r.jsx)("button",{className:"operator-btn",type:"button",onClick:d,value:"/",children:"\xf7"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:p,value:"7",children:"7"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:p,value:"8",children:"8"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:p,value:"9",children:"9"}),Object(r.jsx)("button",{className:"operator-btn",type:"button",onClick:d,value:"*",children:"\xd7"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:p,value:"4",children:"4"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:p,value:"5",children:"5"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:p,value:"6",children:"6"}),Object(r.jsx)("button",{className:"operator-btn",type:"button",onClick:d,value:"-",children:"-"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:p,value:"1",children:"1"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:p,value:"2",children:"2"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:p,value:"3",children:"3"}),Object(r.jsx)("button",{className:"operator-btn",type:"button",onClick:d,value:"+",children:"+"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:function(){e.startsWith("(-")?"(-"===e?a(""):e.endsWith(")")?a(e.substring(2,e.length-1)):a(e.substring(2)):a("(-".concat(e))},children:"+/-"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:p,value:"0",children:"0"}),Object(r.jsx)("button",{className:"numpad-btn",type:"button",onClick:function(){if(e.includes("."))alert("invalid format");else{var t=e;e.length&&"(-"!==e||(t+="0"),a(t+=".")}},value:".",children:"."}),Object(r.jsx)("button",{className:"operator-btn",type:"button",onClick:function(){var t=m();t&&(i([]),a(t))},children:"="})]})}o.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(p,{})}),document.getElementById("root"))}},[[47,1,2]]]);
//# sourceMappingURL=main.58e9c75f.chunk.js.map