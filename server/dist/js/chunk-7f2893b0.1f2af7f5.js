(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f2893b0"],{"0c0b":function(t,n,s){"use strict";s.r(n);var e=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"flow"},[t._l(t.plainFlowData,(function(t,n){return e("FlowContent",{key:n,attrs:{flowMsg:t}})})),e("img",{staticClass:"write-icon",attrs:{src:s("1b63"),alt:"write"},on:{click:function(n){return t.$router.push("/writemsg")}}})],2)},a=[],o=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"flow-content"},[s("article",[s("p",{staticClass:"date"},[t._v(t._s(t.flowMsg.date))]),s("p",{staticClass:"content"},[t._v(t._s(t.flowMsg.content))]),s("p",{staticClass:"username"},[t._v("━ "+t._s(t.flowMsg.username))])]),t._l(t.flowMsg.tags,(function(t,n){return s("FlowStreams",{key:n,attrs:{tag:t}})}))],2)},l=[],c=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"flow-streams"},[s("ul",[s("li",[t._v(" # "+t._s(t.tag)+" ")])])])},i=[],r={name:"FlowStreams",props:{tag:String}},u=r,f=(s("a121"),s("2877")),w=Object(f["a"])(u,c,i,!1,null,"47a295e3",null),p=w.exports,m={name:"DisplayFlow",props:{flowMsg:Object},components:{FlowStreams:p}},d=m,g=(s("5dcf"),Object(f["a"])(d,o,l,!1,null,"330946ff",null)),_=g.exports,b={name:"Flow",components:{FlowContent:_},beforeMount:function(){this.$store.dispatch("getFlow")},computed:{plainFlowData:function(){return this.$store.state.plainFlowData}}},v=b,F=(s("4d71"),Object(f["a"])(v,e,a,!1,null,"68b270e4",null));n["default"]=F.exports},"1b63":function(t,n,s){t.exports=s.p+"img/write.631394d7.svg"},"35f8":function(t,n,s){},"4d71":function(t,n,s){"use strict";s("989b")},"5dcf":function(t,n,s){"use strict";s("d9a8")},"989b":function(t,n,s){},a121:function(t,n,s){"use strict";s("35f8")},d9a8:function(t,n,s){}}]);
//# sourceMappingURL=chunk-7f2893b0.1f2af7f5.js.map