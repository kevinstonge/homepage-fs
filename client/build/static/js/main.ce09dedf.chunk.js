(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{32:function(e,t,c){},33:function(e,t,c){},34:function(e,t,c){},59:function(e,t,c){},60:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),a=c(25),i=c.n(a),l=(c(32),c(9)),r=c(2),j=(c(33),c(34),c(0));var d=function(){return Object(j.jsxs)("header",{children:[Object(j.jsxs)("h1",{children:[Object(j.jsx)("span",{className:"pageTitle",children:"Kevin St.Onge"}),Object(j.jsx)("span",{className:"pageSubtitle",children:"Full-Stack Web Developer"})]}),Object(j.jsxs)("nav",{children:[Object(j.jsx)(l.b,{exact:!0,to:"/",activeClassName:"selected",children:"Skills"}),Object(j.jsx)(l.b,{to:"/about",activeClassName:"selected",children:"About Me"}),Object(j.jsx)(l.b,{to:"/contact",activeClassName:"selected",children:"Contact"})]})]})},o=c(11),h=c(27),b=c.n(h);c(59);var O=function(){var e={1:"beginner",2:"intermediate",3:"advanced",4:"expert"},t=Object(n.useState)([]),c=Object(o.a)(t,2),s=c[0],a=c[1],i=Object(n.useState)([]),l=Object(o.a)(i,2),r=l[0],d=l[1],h=Object(n.useState)("... fetching data from server ..."),O=Object(o.a)(h,2),p=O[0],x=O[1];return Object(n.useEffect)((function(){b.a.get("".concat("https://www.kevinstonge.com","/api/portfolio/projects")).then((function(e){200===e.status?(a(e.data.projects),d(e.data.skills),x(null)):(console.log("error"),x("error getting data from server"))}))}),[]),Object(j.jsxs)(j.Fragment,{children:[s.length>0&&Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("h2",{children:"Projects"}),Object(j.jsx)("div",{className:"projects",children:s.length>0&&s.map((function(e,t){return Object(j.jsxs)("div",{className:"projectCard",children:[Object(j.jsx)("h3",{children:e.title}),Object(j.jsxs)("div",{className:"cardContent",children:[Object(j.jsx)("div",{className:"left",children:Object(j.jsx)("img",{src:"https://www.kevinstonge.com/images/".concat(e.image?e.image:"defaultImage.png"),alt:e.title})}),Object(j.jsxs)("div",{className:"right",children:[Object(j.jsxs)("p",{children:[Object(j.jsx)("span",{className:"label",children:"description: "}),e.description]}),Object(j.jsx)("p",{children:Object(j.jsxs)("p",{children:[Object(j.jsx)("span",{className:"label",children:"deployed application: "}),Object(j.jsx)("a",{href:e.url,children:e.url.replace(/^(http)+(s)*(:\/\/)+(www\.)*/i,"")})]})}),Object(j.jsxs)("p",{children:[Object(j.jsx)("span",{className:"label",children:"github repository: "}),Object(j.jsx)("a",{href:e.github,children:e.github.replace(/^(http)+(s)*(:\/\/)+(www\.)*/i,"")})]}),Object(j.jsxs)("p",{children:[Object(j.jsx)("span",{className:"label",children:"skills"}),":",e.skills.length>0&&r.length>0&&e.skills.map((function(t,c){return"".concat(r.filter((function(e){return e.id===t}))[0].short_name).concat(c<e.skills.length-1?", ":"","\n                              ")}))]})]})]})]},"".concat(e.title,"-").concat(t))}))})]}),r.length>0&&Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("h2",{children:"My technical skills"}),Object(j.jsx)("div",{className:"skills",children:r.map((function(t){return Object(j.jsxs)("div",{className:"skillCard",children:[Object(j.jsx)("img",{src:"https://www.kevinstonge.com/images/".concat(t.logo),alt:"".concat(t.long_name)}),Object(j.jsxs)("div",{className:"name-prof",children:[Object(j.jsx)("p",{className:"skill-name",children:t.long_name}),Object(j.jsxs)("p",{className:"proficiency",children:["[",e[t.proficiency],"]"]})]})]},"$skill_".concat(t.id))}))})]}),null!==p&&Object(j.jsx)("p",{children:p})]})};var p=function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(l.a,{children:Object(j.jsxs)("div",{id:"mainContainer",children:[Object(j.jsx)(d,{}),Object(j.jsxs)("div",{id:"contentContainer",children:[Object(j.jsx)(r.a,{exact:!0,path:"/",children:Object(j.jsx)(O,{})}),Object(j.jsx)(r.a,{path:"/about",children:Object(j.jsx)("p",{children:"about"})}),Object(j.jsx)(r.a,{path:"/contact",children:Object(j.jsx)("p",{children:"contact"})})]})]})})})},x=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,61)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),n(e),s(e),a(e),i(e)}))};i.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(p,{})}),document.getElementById("root")),x()}},[[60,1,2]]]);
//# sourceMappingURL=main.ce09dedf.chunk.js.map