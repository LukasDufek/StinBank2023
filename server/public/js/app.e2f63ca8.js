(function(){var n={299:function(n,t,e){"use strict";e.r(t),t["default"]="03.05.2023 #85\nzemě|měna|množství|kód|kurz\nAustrálie|dolar|1|AUD|14,228\nBrazílie|real|1|BRL|4,240\nBulharsko|lev|1|BGN|12,043\nČína|žen-min-pi|1|CNY|3,091\nDánsko|koruna|1|DKK|3,162\nEMU|euro|1|EUR|23,560\nFilipíny|peso|100|PHP|38,616\nHongkong|dolar|1|HKD|2,721\nIndie|rupie|100|INR|26,109\nIndonesie|rupie|1000|IDR|1,455\nIsland|koruna|100|ISK|15,696\nIzrael|nový šekel|1|ILS|5,872\nJaponsko|jen|100|JPY|15,732\nJižní Afrika|rand|1|ZAR|1,169\nKanada|dolar|1|CAD|15,674\nKorejská republika|won|100|KRW|1,602\nMaďarsko|forint|100|HUF|6,273\nMalajsie|ringgit|1|MYR|4,797\nMexiko|peso|1|MXN|1,189\nMMF|ZPČ|1|XDR|28,721\nNorsko|koruna|1|NOK|1,982\nNový Zéland|dolar|1|NZD|13,301\nPolsko|zlotý|1|PLN|5,143\nRumunsko|leu|1|RON|4,778\nSingapur|dolar|1|SGD|16,031\nŠvédsko|koruna|1|SEK|2,080\nŠvýcarsko|frank|1|CHF|24,015\nThajsko|baht|100|THB|62,814\nTurecko|lira|1|TRY|1,097\nUSA|dolar|1|USD|21,360\nVelká Británie|libra|1|GBP|26,694\n"},782:function(n,t,e){"use strict";var a=e(963),o=e(252);const c={id:"app"};function l(n,t,e,a,l,i){const s=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)("div",c,[(0,o._)("main",null,[(0,o.Wm)(s)])])}var i={name:"App",components:{}},s=e(744);const r=(0,s.Z)(i,[["render",l]]);var u=r,_=e(169);(0,a.ri)(u).use(_.Z).mount("#app")},169:function(n,t,e){"use strict";e.d(t,{Z:function(){return _n}});var a=e(201),o=e(252),c=e(963);const l={class:"container-login"},i={class:"card card-container"},s=(0,o._)("h1",{class:"welcome"},"Vítejte v aplikaci",-1),r=(0,o._)("h3",{class:"logo",style:{color:"red!important"}},"StinBank",-1),u=(0,o._)("h1",{class:"login-input"},"Přihlášení",-1),_=(0,o._)("img",{class:"profile-img-card",alt:"",src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png"},null,-1),p={class:"form-signin"},h=(0,o._)("span",{class:"reauth-email"},null,-1),m=(0,o._)("br",null,null,-1);function d(n,t,e,a,d,g){return(0,o.wg)(),(0,o.iD)("div",l,[(0,o._)("div",i,[s,(0,o.Uk)(),r,u,_,(0,o._)("form",p,[h,(0,o.wy)((0,o._)("input",{type:"text",id:"email-adress",placeholder:"Email","onUpdate:modelValue":t[0]||(t[0]=n=>d.email=n)},null,512),[[c.nr,d.email]]),(0,o.wy)((0,o._)("input",{type:"password",id:"inputPassword",placeholder:"Heslo","onUpdate:modelValue":t[1]||(t[1]=n=>d.password=n)},null,512),[[c.nr,d.password]]),(0,o._)("button",{class:"login-button",value:"login",onClick:t[2]||(t[2]=(...n)=>g.loginSystem&&g.loginSystem(...n)),type:"submit"},"Přihlásit"),m])])])}var g=e(154),y={name:"loginComponent",data(){return{email:"",password:"",msg:"",client:{},clients:[]}},async mounted(){this.clients=[];try{this.clients=(await g.Z.get("/api/clients")).data}catch(n){console.log(n)}console.log(this.clients)},methods:{login_compare(){for(let n=0;n<this.clients.length;n++)if(this.clients[n].mail===this.email&&this.clients[n].password===this.password)return localStorage.setItem("client",JSON.stringify(this.clients[n])),!0;return!1},async loginSystem(){this.login_compare()?(this.$router.push("./between"),await this.sendEmail()):console.log("Nesprávné jméno nebo heslo")},async sendEmail(){const n={to:this.email},t=await fetch("api/send",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});console.log(JSON.stringify(n)),t.ok?alert("Email byl úspěšně odeslán."):alert("Odeslání emailu se nezdařilo.")}}},f=e(744);const w=(0,f.Z)(y,[["render",d]]);var v=w,b=e(577);const k={class:"container"},S={class:"overView"},C=(0,o._)("h1",{style:{"font-size":"45px"}},"Přehled profilu",-1),Z={class:"profile-info"},z={key:0,class:"overView"},D=["onClick"],P={key:1,class:"overView"},O=["value"],U={class:"overView"},V=(0,o._)("h1",null,"Platba",-1),K={style:{"font-size":"28px"}},j={style:{"font-size":"28px"}},I={class:"main-content"},M=(0,o._)("h2",null,"Přehled plateb",-1),N=(0,o._)("br",null,null,-1),x=(0,o._)("br",null,null,-1),F=(0,o._)("hr",null,null,-1);function B(n,t,e,a,l,i){const s=(0,o.up)("header-page");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(s),(0,o._)("div",k,[(0,o._)("div",S,[C,(0,o._)("section",Z,[(0,o._)("h3",null,"Jméno: "+(0,b.zw)(l.client.first_name),1),(0,o._)("h3",null,"Příjmení: "+(0,b.zw)(l.client.last_name),1),(0,o._)("h3",null,"Účet: "+(0,b.zw)(l.actual_account.account_number),1),(0,o._)("h3",null,"Měna: "+(0,b.zw)(l.actual_account.currency),1),(0,o._)("h3",null,"Stav účtu: "+(0,b.zw)(Math.round(100*this.actual_account.balance)/100)+" "+(0,b.zw)(l.actual_account.currency),1),(0,o._)("h3",null,[(0,o.Uk)(" Vložit peníze: "),(0,o.wy)((0,o._)("input",{class:"input-submit",type:"number",step:"0.01",min:"0","onUpdate:modelValue":t[0]||(t[0]=n=>l.money1=n)},null,512),[[c.nr,l.money1]]),(0,o.Uk)(),(0,o._)("button",{onClick:t[1]||(t[1]=n=>i.deposit_money(l.money1)),class:"btn"},"+")]),(0,o._)("button",{class:"btn",onClick:t[2]||(t[2]=(...n)=>i.to_changing_phase&&i.to_changing_phase(...n))},"Změnit účet"),(0,o.Uk)(),(0,o._)("button",{class:"btn",onClick:t[3]||(t[3]=(...n)=>i.to_creating_phase&&i.to_creating_phase(...n))},"Vytvořit nový účet")])]),l.account_changing_phase?((0,o.wg)(),(0,o.iD)("div",z,[(0,o._)("h2",null,[(0,o.Uk)("Změna účtu "),(0,o._)("button",{class:"close-btn",onClick:t[4]||(t[4]=n=>i.close_window("change_window"))},"X")]),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.client.accounts,(n=>((0,o.wg)(),(0,o.iD)("section",{key:n._id},[(0,o._)("h3",null,[(0,o.Uk)("Číslo účtu: "+(0,b.zw)(n.account_number)+" Měna: "+(0,b.zw)(n.currency)+" ",1),(0,o._)("button",{class:"btn",onClick:t=>i.change_account(n)},"Zvolit",8,D)])])))),128))])):(0,o.kq)("",!0),l.account_creating_phase?((0,o.wg)(),(0,o.iD)("div",P,[(0,o._)("h2",null,[(0,o.Uk)("Vytvoření nového účtu "),(0,o._)("button",{class:"close-btn",onClick:t[5]||(t[5]=n=>i.close_window("create_window"))},"X")]),(0,o._)("h2",null,[(0,o.Uk)(" Vyber měnu: "),(0,o.wy)((0,o._)("select",{style:{"font-size":"23px"},"onUpdate:modelValue":t[6]||(t[6]=n=>l.testVal=n)},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.currencies,(n=>((0,o.wg)(),(0,o.iD)("option",{value:n,key:n},(0,b.zw)(n),9,O)))),128))],512),[[c.bM,l.testVal]])]),(0,o._)("button",{class:"btn",onClick:t[7]||(t[7]=n=>i.create_new_account(l.testVal))},"Vytvořit nový účet")])):(0,o.kq)("",!0),(0,o._)("div",U,[V,(0,o._)("h2",null,"Stav účtu: "+(0,b.zw)(Math.round(100*this.actual_account.balance)/100)+" "+(0,b.zw)(l.actual_account.currency),1),(0,o._)("h3",K,[(0,o.Uk)(" Částka: "),(0,o.wy)((0,o._)("input",{class:"input-submit",type:"number",step:"0.01",min:"0","onUpdate:modelValue":t[8]||(t[8]=n=>l.money=n)},null,512),[[c.nr,l.money]])]),(0,o._)("h3",j,[(0,o.Uk)(" Na účet: "),(0,o.wy)((0,o._)("input",{class:"input-submit",type:"number","onUpdate:modelValue":t[9]||(t[9]=n=>l.account_number=n)},null,512),[[c.nr,l.account_number]])]),(0,o._)("button",{class:"btn",onClick:t[10]||(t[10]=n=>i.make_payment(l.account_number,l.money))},"Zaplatit")]),(0,o._)("div",I,[M,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.client.payments,(n=>((0,o.wg)(),(0,o.iD)("section",{key:n._id},[N,(0,o._)("h3",null,"Datum "+(0,b.zw)(n.date_of_transaction),1),(0,o._)("h3",null,"Platba z účtu "+(0,b.zw)(n.from_account),1),(0,o._)("h3",null,"Na účet "+(0,b.zw)(n.to_account),1),(0,o._)("h3",null,"Částka "+(0,b.zw)(n.money),1),(0,o._)("h3",null,"Měna "+(0,b.zw)(n.currency),1),x,F])))),128))])])])}const H=e(901).Z,R=e(884),J=e(218),T=R;var A={name:"overviewComponent",components:{HeaderPage:H},data(){return{all_clients:[],all_payments:[],client:{},actual_account:{},currencies:[],account_creating_phase:!1,account_changing_phase:!1,money:0,money1:0,account_number:0,text:"",testVal:null}},async mounted(){this.client=JSON.parse(localStorage.client??"{}"),await this.load_all_clients()},methods:{async load_all_clients(){try{this.all_clients=Array.from((await J.get("/api/clients")).data)}catch(t){console.log(t)}this.actual_account=this.client.accounts[0];let n=T.read_cnb_file();for(let e=0;e<n.length;e++)this.currencies.push(n[e].country_code);this.currencies.push("CZK"),this.currencies.sort()},async set_client(){await this.load_all_clients();for(let n=0;n<this.all_clients.length;n++)this.all_clients[n].mail===this.client.mail&&localStorage.setItem("client",JSON.stringify(this.all_clients[n]))},to_creating_phase(){this.account_creating_phase=!0},to_changing_phase(){this.account_changing_phase=!0},close_window(n){"create_window"===n?this.account_creating_phase=!1:"change_window"===n&&(this.account_changing_phase=!1)},async create_new_account(n){await T.add_new_account_all(this.client,n),await this.set_client()},change_account(n){this.actual_account=n,this.account_changing_phase=!1},async make_payment(n,t){if(t>0&&t<=this.actual_account.balance){let e=(new Date).toLocaleDateString("en-GB",{day:"numeric",month:"numeric",year:"numeric"}),a={mail_sender:this.client.mail,from_account:this.actual_account.account_number,to_account:n,money:t,currency:this.actual_account.currency,date_of_transaction:e};console.log(a),await T.create_payment(a,this.client)}await this.set_client()},async deposit_money(n){await T.deposit_money(n,this.actual_account.account_number,this.client),await this.set_client()}}};const E=(0,f.Z)(A,[["render",B]]);var Y=E;const G={class:"container-login"},L={class:"card card-container"},X=(0,o._)("h1",{class:"welcome"},"Vítejte v aplikaci",-1),$=(0,o._)("h3",{class:"logo"},"StinBank",-1),W=(0,o._)("h1",{class:"login-input"},"Přihlášení",-1),q=(0,o._)("img",{class:"profile-img-card",alt:"",src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png"},null,-1),Q={class:"form-signin"},nn=(0,o._)("span",{class:"reauth-email"},null,-1),tn=(0,o._)("h2",{class:"write-code"},"Zadej ověřovací kod",-1),en=(0,o._)("br",null,null,-1);function an(n,t,e,a,l,i){return(0,o.wg)(),(0,o.iD)("div",G,[(0,o._)("div",L,[X,(0,o.Uk)(),$,W,q,(0,o._)("form",Q,[nn,tn,(0,o.wy)((0,o._)("input",{id:"inputPassword",placeholder:"Heslo",type:"password","onUpdate:modelValue":t[0]||(t[0]=n=>l.code=n)},null,512),[[c.nr,l.code]]),(0,o._)("button",{class:"login-button",value:"login",onClick:t[1]||(t[1]=(...n)=>i.to_profile&&i.to_profile(...n)),type:"submit"},"Přihlásit"),en])])])}const on=e(218);var cn={name:"betweenComponent",data(){return{client:JSON.parse(localStorage.client),clients:[],code:0}},async mounted(){this.clients=[];try{this.clients=(await on.get("/api/clients")).data}catch(n){console.log(n)}this.find_client()},methods:{find_client(){for(let n=0;n<this.clients.length;n++)this.clients[n].mail===this.client.mail&&(this.client=this.clients[n]);console.log(this.client)},to_profile(){parseInt(this.code)===this.client.code?this.$router.push("./profile"):alert("Spatny kod")}}};const ln=(0,f.Z)(cn,[["render",an]]);var sn=ln;const rn=[{path:"/",component:v},{path:"/between",component:sn},{path:"/profile",component:Y}],un=(0,a.p7)({history:(0,a.PO)("/"),routes:rn});var _n=un},884:function(n,t,e){const a=e(889),o={load_all_clients:async()=>{let n=[];try{n=Array.from((await a.get("/api/clients")).data)}catch(t){console.log(t)}return n},is_same_client:(n,t)=>{for(let e=0;e<t.length;e++)for(let a=0;a<t[e].accounts.length;a++)if(parseInt(n)===t[e].accounts[a].account_number)return!0;return!1},create_new_account:n=>{let t,e=1e5,a=999999;return t=Math.floor(Math.random()*(a-e+1))+e,{account_number:t,currency:n,balance:0,payments:[]}},add_new_account_part:(n,t,e)=>{n.accounts.push(t);for(let a=0;a<e.length;a++)e[a].mail===n.mail&&(e[a]=n);return n},add_new_account_all:async(n,t)=>{let e=o.add_new_account_part(n,o.create_new_account(t),o.load_all_clients());await o.save_clients(e)},save_clients:async n=>{let t=n._id;await a({method:"put",url:`/api/clients/${t}`,data:n})},create_payment:async(n,t)=>{let e=await o.load_all_clients(),a=o.is_same_client(n.to_account,e);if(a)t=o.payment_for_same_client(n,t),await o.put_client(t,!0);else if(!a&&o.if_client_exist(n.mail_sender,e)){let a=o.payment_for_another_client(n,e);null!==a&&await o.put_client(t)}},payment_for_same_client:(n,t)=>{for(let e=0;e<t.accounts.length;e++)t.accounts[e].account_number===parseInt(n.from_account)&&(t.accounts[e].balance-=parseFloat(n.money)),t.accounts[e].account_number===parseFloat(n.to_account)&&(t.accounts[e].balance+=o.convert_currency_manager(parseFloat(n.money),n.currency,t.accounts[e].currency));return t.payments.push(n),t},payment_for_another_client:(n,t)=>{let e=null;for(let a=0;a<t.length;a++)for(let c=0;c<t[a].accounts.length;c++)t[a].accounts[c].account_number===parseInt(n.to_account)&&(t[a].accounts[c].balance+=o.convert_currency_manager(parseFloat(n.money),n.currency,t[a].accounts[c].currency),t[a].payments.push(n),e=t[a]);return e},put_client:async n=>{let t=n._id;await a({method:"put",url:`/api/clients/${t}`,data:n})},if_client_exist:(n,t)=>{let e=!1;for(let a=0;a<t.length;a++)t[a].mail===n&&(e=!0);return e},read_cnb_file:()=>{const n=e(299);let t=n.default,a=t.split("\n");a.shift(),a.shift(),a.pop();let o=[],c=[];for(let e=0;e<a.length;e++){let n={};c=a[e].split("|"),n={amount:c[2],country_code:c[3],course:c[4]},o.push(n)}return o},convert_CZK_to_some:(n,t)=>{let e=0,a=o.read_cnb_file();for(let o=0;o<a.length;o++)t===a[o].country_code&&(1===parseInt(a[o].amount)?e=n/parseFloat(a[o].course):100===parseInt(a[o].amount)&&(e=100*n/parseFloat(a[o].course)));return e},convert_some_to_CZK:(n,t)=>{let e=0,a=o.read_cnb_file();for(let o=0;o<a.length;o++)t===a[o].country_code&&(1===parseInt(a[o].amount)?e=n*parseFloat(a[o].course):100===parseInt(a[o].amount)&&(e=n/100*parseFloat(a[o].course)));return e},convert_currency_manager:(n,t,e)=>{let a;return t===e?(console.log("stejna mena"),a=n):"CZK"===t&&"CZK"!==e?(console.log("czk2some"),a=o.convert_CZK_to_some(n,e),console.log(a)):"CZK"!==t&&"CZK"===e?(console.log("some2czk"),a=o.convert_some_to_CZK(n,t)):(console.log("some2some"),a=o.convert_CZK_to_some(o.convert_some_to_CZK(n,t),e)),a},deposit_money_part:(n,t,e)=>{for(let a=0;a<e.accounts.length;a++)e.accounts[a].account_number===t&&(e.accounts[a].balance+=parseFloat(n));return e},generate_number:()=>Math.floor(9e5*Math.random())+1e5,deposit_money:async(n,t,e)=>{o.deposit_money_part(n,t,e),await o.put_client(e,!0)}};n.exports=o},901:function(n,t,e){"use strict";e.d(t,{Z:function(){return m}});var a=e(252);const o=n=>((0,a.dD)("data-v-5593e254"),n=n(),(0,a.Cn)(),n),c={class:"header"},l=o((()=>(0,a._)("div",{class:"logo"},"StinBank",-1))),i={class:"navbar"},s=o((()=>(0,a._)("h3",null,"Vítejte v aplikaci StinBank",-1)));function r(n,t,e,o,r,u){return(0,a.wg)(),(0,a.iD)("header",c,[l,(0,a._)("div",i,[s,(0,a._)("button",{class:"logout-button",onClick:t[0]||(t[0]=(...n)=>u.logout&&u.logout(...n))},"Odhlásit se")])])}var u=e(169),_={name:"headerPage",methods:{logout(){u.Z.push("./"),localStorage.removeItem("client")}}},p=e(744);const h=(0,p.Z)(_,[["render",r],["__scopeId","data-v-5593e254"]]);var m=h}},t={};function e(a){var o=t[a];if(void 0!==o)return o.exports;var c=t[a]={exports:{}};return n[a](c,c.exports,e),c.exports}e.m=n,function(){var n=[];e.O=function(t,a,o,c){if(!a){var l=1/0;for(u=0;u<n.length;u++){a=n[u][0],o=n[u][1],c=n[u][2];for(var i=!0,s=0;s<a.length;s++)(!1&c||l>=c)&&Object.keys(e.O).every((function(n){return e.O[n](a[s])}))?a.splice(s--,1):(i=!1,c<l&&(l=c));if(i){n.splice(u--,1);var r=o();void 0!==r&&(t=r)}}return t}c=c||0;for(var u=n.length;u>0&&n[u-1][2]>c;u--)n[u]=n[u-1];n[u]=[a,o,c]}}(),function(){e.d=function(n,t){for(var a in t)e.o(t,a)&&!e.o(n,a)&&Object.defineProperty(n,a,{enumerable:!0,get:t[a]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)}}(),function(){e.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})}}(),function(){var n={143:0};e.O.j=function(t){return 0===n[t]};var t=function(t,a){var o,c,l=a[0],i=a[1],s=a[2],r=0;if(l.some((function(t){return 0!==n[t]}))){for(o in i)e.o(i,o)&&(e.m[o]=i[o]);if(s)var u=s(e)}for(t&&t(a);r<l.length;r++)c=l[r],e.o(n,c)&&n[c]&&n[c][0](),n[c]=0;return e.O(u)},a=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=e.O(void 0,[998],(function(){return e(782)}));a=e.O(a)})();
//# sourceMappingURL=app.e2f63ca8.js.map