(this["webpackJsonpaviasales-test-task"]=this["webpackJsonpaviasales-test-task"]||[]).push([[0],[,,,,,,,function(e,a,t){e.exports=t.p+"static/media/logo.96990a1b.svg"},function(e,a,t){e.exports=t(19)},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var c=t(0),n=t.n(c),l=t(6),r=t.n(l),s=(t(13),t(14),t(7)),o=t.n(s),i=(t(15),function(){return n.a.createElement("header",{className:"header"},n.a.createElement("img",{src:o.a,alt:"logo"}))}),m=t(3),b=t(1),u=t(2),d=(t(16),t(17),function(e){var a=e.stopType,t=e.isChecked,c=e.label,l=e.onChange;return n.a.createElement("div",{className:"checkbox"},n.a.createElement("label",{className:"checkbox-label"},n.a.createElement("input",{type:"checkbox",className:"checkbox-input",checked:t,onChange:l,"data-type":a}),n.a.createElement("span",{className:"checkbox-display"}),c))}),h=function(){var e=Object(c.useState)({all:{label:"\u0412\u0441\u0435",checked:!0},"without stops":{label:"\u0411\u0435\u0437 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043e\u043a",checked:!0},"one stop":{label:"1 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0430",checked:!0},"two stops":{label:"2 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0438",checked:!0},"three stops":{label:"3 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0438",checked:!0}}),a=Object(u.a)(e,2),t=a[0],l=a[1],r=Object(c.useCallback)((function(e){var a=e.target.dataset.type,c=e.target.checked;if("all"!==a){var n=Object(b.a)(Object(b.a)({},t),{},Object(m.a)({},a,Object(b.a)(Object(b.a)({},t[a]),{},{checked:c}))),r=Object.entries(n).filter((function(e){return"all"!==Object(u.a)(e,1)[0]})).every((function(e){return Object(u.a)(e,2)[1].checked}));n.all=Object(b.a)(Object(b.a)({},n.all),{},{checked:r}),l(n)}else l(Object.entries(t).reduce((function(e,a){var t=Object(u.a)(a,2),n=t[0],l=t[1];return Object(b.a)(Object(b.a)({},e),{},Object(m.a)({},n,Object(b.a)(Object(b.a)({},l),{},{checked:c})))}),{}))}),[t]);return n.a.createElement("aside",{className:"filter col-4"},n.a.createElement("div",{className:"filter-header"},"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043e\u043a"),n.a.createElement("div",{className:"checkbox-list"},Object.entries(t).map((function(e,a){var t=Object(u.a)(e,2),c=t[0],l=t[1],s=l.label,o=l.checked;return n.a.createElement(d,{key:a,label:s,stopType:c,isChecked:o,onChange:r})}))))},k=t(4),f=t.n(k),v=(t(18),function(){var e=Object(c.useState)("cheap"),a=Object(u.a)(e,2),t=a[0],l=a[1],r=f()("tab","left-tab",{active:"cheap"===t}),s=f()("tab","right-tab",{active:"fast"===t}),o=Object(c.useCallback)((function(e){var a=e.target.dataset.sortname;l(a)}),[]);return n.a.createElement("div",{className:"tabs"},n.a.createElement("div",{className:r,onClick:o,"data-sortname":"cheap"},"\u0421\u0430\u043c\u044b\u0439 \u0434\u0435\u0448\u0435\u0432\u044b\u0439"),n.a.createElement("div",{className:s,onClick:o,"data-sortname":"fast"},"\u0421\u0430\u043c\u044b\u0439 \u0431\u044b\u0441\u0442\u0440\u044b\u0439"))}),p=function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement(i,null),n.a.createElement("main",{className:"main-grid"},n.a.createElement(h,null),n.a.createElement("div",{className:"col-8"},n.a.createElement(v,null),n.a.createElement("div",{className:"tickets"},n.a.createElement("div",{className:"ticket"})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.58a2429a.chunk.js.map