/*
 * Raphael 0.6.4 - JavaScript Vector Library
 *
 * Copyright (c) 2008 – 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('J 1r=(N(n){J r=N(){11 r.4o.2F(r,P)};r.4C="0.6.4";r.1p=n;J q={1F:0,1E:0,1u:"#4N","1u-1x":1,21:\'73 "4P"\',"21-4k":\'"4P"\',"21-3z":"16",2E:0,1b:0,1x:1,1f:"4g,0",r:0,2W:0,2f:0,2e:0,2A:"1 1",1g:"#1T","1g-2M":"","1g-3x":"3h","1g-4d":"3h","1g-4b":0,"1g-1x":1,"1g-17":1,2D:"0 0",17:0,x:0,y:0},3P={1F:"1N",1E:"1N",1u:"3Q","1u-1x":"1N","21-3z":"1N",1b:"1N",1x:"1N",1f:"1f",r:"1N",2W:"1N",2f:"1N",2e:"1N",2A:"3R",1g:"3Q","1g-1x":"1N","1g-17":"1N",2D:"3R",17:"1N",x:"1N",y:"1N"},C={};K(n=="3w"){J u=N(i,j,l){J g=1i.1D("1B:28"),39=g.1q;39.2k="2o";39.1Y=0;39.1C=0;39.17=l.17+"1I";39.1b=l.1b+"1I";J m=1i.1D("1B:2N"),3c=m.1q;3c.17=l.17+"1I";3c.1b=l.1b+"1I";m.1f="";K(i["56"]){m.6g=i["56"]}m.3o=9.3o;m.3l=9.3l;g.1j(m);l.1l.1j(g);J p=1M A(m,g,l);p.18=1X;p.1p="1f";p.1f=[];p.13={x:0,y:0,1Q:0,1S:0,18:1X};p.2B="";p.3i=N(){9.18=1X;11 9};p.3Z=N(){9.18=2T;11 9};p.3j=N(x,y){J d=9.18?"m":"t";d+=15.1d(19(x,10))+" "+15.1d(19(y,10));9.1c.1f=9.2B+=d;9.13.x=(9.18?0:9.13.x)+19(x,10);9.13.y=(9.18?0:9.13.y)+19(y,10);9.13.18=9.18;9.O.1f+=(9.18?"M":"m")+[x,y];11 9};p.26=N(x,y){J d=9.18?"l":"r";d+=15.1d(19(x,10))+" "+15.1d(19(y,10));9[0].1f=9.2B+=d;9.13.x=(9.18?0:9.13.x)+19(x,10);9.13.y=(9.18?0:9.13.y)+19(y,10);9.13.18=9.18;9.O.1f+=(9.18?"L":"l")+[x,y];11 9};p.46=N(a,b,c,e,f,g){f=(9.18?0:9.13.x)+f;g=(9.18?0:9.13.y)+g;J h=9.13.x,3p=9.13.y,x=(h-f)/2,y=(3p-g)/2,k=(c==e?-1:1)*15.5E(15.4c(a*a*b*b-a*a*y*y-b*b*x*x)/(a*a*y*y+b*b*x*x)),1F=k*a*y/b+(h+f)/2,1E=k*-b*x/a+(3p+g)/2,d=e?(9.18?"5C":"5B"):(9.18?"5A":"5z"),1Y=15.1d(1F-a),1C=15.1d(1E-b);d+=[1Y,1C,15.1d(1Y+a*2),15.1d(1C+b*2),15.1d(h),15.1d(3p),15.1d(19(f,10)),15.1d(19(g,10))].1z(", ");9.1c.1f=9.2B+=d;9.13.x=(9.18?0:9.13.x)+19(f,10);9.13.y=(9.18?0:9.13.y)+19(g,10);9.13.18=9.18;9.O.1f+=(9.18?"A":"a")+[a,b,0,c,e,f,g];11 9};p.5i=N(a,b,c){K(!c){11 9.26(a,b)}1k{J x=15.1d(15.1d(19(a,10)*2g)/2g),y=15.1d(15.1d(19(b,10)*2g)/2g),w=15.1d(15.1d(19(c,10)*2g)/2g),d=9.18?"c":"v",1s=[15.1d(9.13.x)+w,15.1d(9.13.y),x-w,y,x,y],5l=[9.13.x+c,9.13.y,a-c,b,a,b];d+=1s.1z(" ")+" ";9.13.x=(9.18?0:9.13.x)+1s[4];9.13.y=(9.18?0:9.13.y)+1s[5];9.13.1Q=1s[2];9.13.1S=1s[3];9.1c.1f=9.2B+=d;9.O.1f+=(9.18?"C":"c")+5l;11 9}};p.1J=N(){J d=9.18?"c":"v";K(P.14==6){9.13.1Q=(9.18?0:9.13.x)+19(P[2],10);9.13.1S=(9.18?0:9.13.y)+19(P[3],10);9.13.x=(9.18?0:9.13.x)+19(P[4],10);9.13.y=(9.18?0:9.13.y)+19(P[5],10);d+=[15.1d(19(P[0],10)),15.1d(19(P[1],10)),15.1d(19(P[2],10)),15.1d(19(P[3],10)),15.1d(19(P[4],10)),15.1d(19(P[5],10))].1z(" ")+" ";9.13.18=9.18;9.O.1f+=(9.18?"C":"c")+3a.1t.2q.38(P,0,P.14)}K(P.14==4){J a=9.13.x*2-9.13.1Q;J b=9.13.y*2-9.13.1S;9.13.1Q=(9.18?0:9.13.x)+19(P[0],10);9.13.1S=(9.18?0:9.13.y)+19(P[1],10);9.13.x=(9.18?0:9.13.x)+19(P[2],10);9.13.y=(9.18?0:9.13.y)+19(P[3],10);d+=[15.1d(a),15.1d(b),15.1d(19(P[0],10)),15.1d(19(P[1],10)),15.1d(19(P[2],10)),15.1d(19(P[3],10))].1z(" ")+" ";9.O.1f+=(9.18?"S":"s")+3a.1t.2q.38(P,0,P.14)}9.1c.1f=9.2B+=d;11 9};p.3I=N(){J d="5N";K(P.14==4){9.13.36=(9.18?0:9.13.x)+19(P[0],10);9.13.3e=(9.18?0:9.13.y)+19(P[1],10);9.13.x=(9.18?0:9.13.x)+19(P[2],10);9.13.y=(9.18?0:9.13.y)+19(P[3],10);d+=[15.1d(9.13.36),15.1d(9.13.3e),15.1d(9.13.x),15.1d(9.13.y)].1z(" ")+" ";9.13.18=9.18;9.O.1f+=(9.18?"Q":"q")+3a.1t.2q.38(P,0,P.14)}K(P.14==2){9.13.36=9.13.x*2-9.13.36;9.13.3e=9.13.y*2-9.13.3e;9.13.x=(9.18?0:9.13.x)+19(P[2],10);9.13.y=(9.18?0:9.13.y)+19(P[3],10);d+=[15.1d(9.13.36),15.1d(9.13.3e),15.1d(9.13.x),15.1d(9.13.y)].1z(" ")+" ";9.O.1f+=(9.18?"T":"t")+3a.1t.2q.38(P,0,P.14)}9.1c.1f=9.2B+=d;9.1f.2j({1p:"5V",66:[].6h.38(P,0),6p:9.18});11 9};p.53=N(r,a){J R=.51*r,2y=9.18,o=9;K(2y){9.3Z();2y=N(){o.3i()}}1k{2y=N(){}}J b={l:N(){11{u:N(){o.1J(-R,0,-r,-(r-R),-r,-r)},d:N(){o.1J(-R,0,-r,r-R,-r,r)}}},r:N(){11{u:N(){o.1J(R,0,r,-(r-R),r,-r)},d:N(){o.1J(R,0,r,r-R,r,r)}}},u:N(){11{r:N(){o.1J(0,-R,-(R-r),-r,r,-r)},l:N(){o.1J(0,-R,R-r,-r,-r,-r)}}},d:N(){11{r:N(){o.1J(0,R,-(R-r),r,r,r)},l:N(){o.1J(0,R,R-r,r,-r,r)}}}};b[a.3H(0)]()[a.3H(1)]();2y();11 o};p.4j=N(){9.1c.1f=(9.2B+="x e");9.O.1f+="z";11 9};K(j){p.3i();p.O.1f="";C.3B(p,""+j)}p.2L();v(p,i);K(i.2E){z(p,i.2E)}11 p};J v=N(o,a){J s=o[0].1q;o.O=o.O||{};1m(J b 1L a){o.O[b]=a[b]}K(a.1f&&o.1p=="1f"){o.2B="";o.1f=[];C.3B(o,a.1f)}K(a.2W!=6P){o.1y.1q.2W=a.2W}K(a.2D){J c=a.2D.2n(/[, ]+/);o.2J(c[0],c[1])}K(a.2A){J c=a.2A.2n(/[, ]+/);o.2A(c[0],c[1])}K(o.1p=="2p"&&a.1x){o.1c.3V=" 4L:4K.4J.7a(1x="+(a.1x*2g)+")";o.1c.1q.4q=(o.1c.3k||"")+(o.1c.3V||"")}a["21-4k"]&&(s.7b=a["21-4k"]);a["21-3z"]&&(s.7c=a["21-3z"]);a["21"]&&(s.21=a["21"]);a["21-4r"]&&(s.7g=a["21-4r"]);K(1v a.1x!="1O"||1v a["1g-17"]!="1O"||1v a.1u!="1O"||1v a.1g!="1O"){o=o.2N||o.1c;J d=(o.3m("1u")&&o.3m("1u")[0])||1i.1D("1B:1u");K("1u-1x"1L a||"1x"1L a){d.1x=((a["1u-1x"]+1||2)-1)*((a.1x+1||2)-1)}K(a.1u){d.2v=1X}K(d.2v==1O||a.1u=="24"){d.2v=2T}K(d.2v&&a.1u){J e=a.1u.4t(/^3g\\(([^\\)]+)\\)$/i);K(e){d.40=e[1];d.1p="6B"}1k{d.2x=a.1u;d.40="";d.1p="7j"}}o.1j(d);J f=(o.3m("1g")&&o.3m("1g")[0])||1i.1D("1B:1g");K((a.1g&&a.1g!="24")||a["1g-17"]||a["1g-1x"]||a["1g-2M"]){f.2v=1X}K(a.1g=="24"||1v f.2v=="1O"){f.2v=2T}K(f.2v&&a.1g){f.2x=a.1g}f.1x=((a["1g-1x"]+1||2)-1)*((a.1x+1||2)-1);a["1g-4d"]&&(f.7f=a["1g-4d"]||"4H");f.4b=a["1g-4b"]||8;a["1g-3x"]&&(f.79={3h:"78",4n:"4n",1d:"1d"}[a["1g-3x"]]||"4H");a["1g-17"]&&(f.4r=(19(a["1g-17"],10)||1)*12/16);K(a["1g-2M"]){J g={"-":"6N",".":"6M","-.":"6F","-..":"6E",". ":"6D","- ":"6v","--":"5T","- .":"5S","--.":"5Q","--..":"5P"};f.5F=g[a["1g-2M"]]||""}o.1j(f)}};J z=N(o,a){o.O=o.O||{};o.O.2E=a;o=o.2N||o[0];J b=o.3m("1u");K(b.14){b=b[0]}1k{b=1i.1D("1B:1u")}K(a.1K.14){b.2v=1X;b.5x="24";b.1p=(a.1p.2S()=="5r")?"2E":"5s";K(1v a.1K[0].2x!="1O"){b.2x=a.1K[0].2x||"#1T"}K(1v a.1K[a.1K.14-1].2x!="1O"){b.5D=a.1K[a.1K.14-1].2x||"#1T"}J c=[];1m(J i=0,1o=a.1K.14;i<1o;i++){K(a.1K[i].3q){c.2j(a.1K[i].3q+" "+a.1K[i].2x)}};J d=a.1K[0].1x||1;J e=a.1K[a.1K.14-1].1x||1;K(c){b.5H.5I=c.1z(",");e+=d;d=e-d;e-=d}b.1a("1x",d);b.1a("5O",e);K(a.2l){J f=15.1d(15.60((19(a.2l[3],10)-19(a.2l[1],10))/(19(a.2l[2],10)-19(a.2l[0],10)))*57.29)||0;b.67=6d-f}K(a.1p.2S()=="6f"){b.6o="2g%";b.6r="0.5 0.5"}}};J A=N(a,b,c){J d=0,6u=0,6w=0,6x=1;9[0]=a;9.1c=a;9.X=0;9.Y=0;9.O={};9.1y=b;9.1V=c;9.1n={2Y:0,2Z:0,2m:0,2C:1,2I:1}};A.1t.3M=N(a,b){K(a==1O){11 9.1n.2m}K(b){9.1n.2m=a}1k{9.1n.2m+=a}9.1y.1q.2W=9.1n.2m;11 9};A.1t.2L=N(a){J b=9.1y.1q,2G=9[0].1q;1m(J i 1L a){9.O[i]=a[i]}J c=9.O,x,y,w,h;27(9.1p){1e"33":x=c.1F-c.r;y=c.1E-c.r;w=h=c.r*2;1h;1e"32":x=c.1F-c.2f;y=c.1E-c.2e;w=c.2f*2;h=c.2e*2;1h;1e"2i":1e"2p":x=c.x;y=c.y;w=c.17||0;h=c.1b||0;1h;1e"2a":9.4h.v=["m",15.1d(c.x),", ",15.1d(c.y-2),"l",15.1d(c.x)+1,", ",15.1d(c.y-2)].1z("");11;1e"1f":K(!9.O.1f){x=0;y=0;w=9.1V.17;h=9.1V.1b}1k{J d=1r.3D(9.O.1f),x=d.x;y=d.y;w=d.17;h=d.1b}1h;2K:x=0;y=0;w=9.1V.17;h=9.1V.1b;1h}K(9.1p=="1f"){J e=15.1d(9.1V.17/2-w/2-x),1C=15.1d(9.1V.1b/2-h/2-y);b.1Y=-e+"1I";b.1C=-1C+"1I";9.X=e;9.Y=1C;9.W=w;9.H=h;2G.1C=1C+"1I";2G.1Y=e+"1I"}1k{J e=9.1V.17/2-w/2,1C=9.1V.1b/2-h/2;b.2k="2o";b.1Y=x-e+"1I";b.1C=y-1C+"1I";9.X=x-e;9.Y=y-1C;9.W=w;9.H=h;b.17=9.1V.17+"1I";b.1b=9.1V.1b+"1I";2G.2k="2o";2G.1C=1C+"1I";2G.1Y=e+"1I";2G.17=w+"1I";2G.1b=h+"1I"}};A.1t.4O=N(){9.1y.1q.3K="24";11 9};A.1t.4M=N(){9.1y.1q.3K="4D";11 9};A.1t.2J=N(x,y){K(x==1O&&y==1O){11{x:9.1n.2Y,y:9.1n.2Z}}9.1n.2Y+=+x;9.1n.2Z+=+y;K(9.1p=="1f"){J a=9.O.1f;a=1r.3v(a);a[0][1]+=+x;a[0][2]+=+y;9.1s({1f:a.1z(" ")})}9.2L({x:9.1n.2Y,y:9.1n.2Z});11 9};A.1t.3u=N(){11{x:9.X,y:9.Y,17:9.W,1b:9.H}};A.1t.3t=N(){9[0].1w.2r(9[0]);9.1y.1w.2r(9.1y);9.2N&&9.2N.1w.2r(9.2N)};A.1t.1s=N(){K(P.14==1&&1v P[0]=="2z"){K(P[0]=="2D"){11 9.2J()}11 9.O[P[0]]}K(9.O&&P.14==1&&P[0]4y 3a){J a={};1m(J i=0,1o=P[0].14;i<1o;i++){a[P[0][i]]=9.O[P[0][i]]};11 a}K(9[0].7m.2S()=="28"){J b=9[0].3n;9.O=9.O||{};K(P.14==2){9.O[P[0]]=P[1]}1k K(P.14==1||1v P[0]=="2R"){1m(J j 1L P[0]){9.O[j]=P[0][j]}}1m(J i=0,1o=b.14;i<1o;i++){9.1s.2F(1M 7p(b[i],9[0],9.1V),P)}}1k{J c;K(P.14==2){c={};c[P[0]]=P[1]}K(P.14==1&&1v P[0]=="2R"){c=P[0]}K(c){v(9,c);9.2L(c);K(c.2E){z(9,c.2E)}K(c.2a&&9.1p=="2a"){9[0].2z=c.2a}K(c.2O){9[0].2O=c.2O}}}11 9};A.1t.4G=N(){9.1y.1w.1j(9.1y);11 9};A.1t.4x=N(){K(9.1y.1w.2h!=9.1y){9.1y.1w.2w(9.1y,9.1y.1w.2h)}11 9};A.1t.4z=N(a){K(a.1y.3T){a.1y.1w.2w(9.1y,a.1y.3T)}1k{a.1y.1w.1j(9.1y)}11 9};A.1t.2w=N(a){a.1y.1w.2w(9.1y,a.1y);11 9};J B=N(a,x,y,r){J g=1i.1D("1B:28");J o=1i.1D("1B:4Q");g.1j(o);a.1l.1j(g);J b=1M A(o,g,a);v(b,{1g:"#1T",1u:"24"});b.2L({x:x-r,y:y-r,17:r*2,1b:r*2});b.O.1F=x;b.O.1E=y;b.O.r=r;b.1p="33";11 b};J D=N(a,x,y,w,h,r){J g=1i.1D("1B:28");J o=1i.1D(r?"1B:71":"1B:2i");K(r){o.70=r/(15.31(w,h))}g.1j(o);a.1l.1j(g);J b=1M A(o,g,a);v(b,{1g:"#1T"});b.2L({x:x,y:y,17:w,1b:h});b.O.x=x;b.O.y=y;b.O.w=w;b.O.h=h;b.O.r=r;b.1p="2i";11 b};J E=N(a,x,y,b,c){J g=1i.1D("1B:28");J o=1i.1D("1B:4Q");g.1j(o);a.1l.1j(g);J d=1M A(o,g,a);v(d,{1g:"#1T"});d.2L({x:x-b,y:y-c,17:b*2,1b:c*2});d.O.1F=x;d.O.1E=y;d.O.2f=b;d.O.2e=c;d.1p="32";11 d};J F=N(a,b,x,y,w,h){J g=1i.1D("1B:28");J o=1i.1D("1B:2p");o.40=b;g.1j(o);a.1l.1j(g);J c=1M A(o,g,a);c.1p="2p";c.2L({x:x,y:y,17:w,1b:h});c.O.x=x;c.O.y=y;c.O.w=w;c.O.h=h;11 c};J G=N(a,x,y,b){J g=1i.1D("1B:28"),37=g.1q;J c=1i.1D("1B:2N"),3c=c.1q;J d=1i.1D("1B:1f"),6Z=d.1q;d.v=["m",15.1d(x),", ",15.1d(y-2),"l",15.1d(x)+1,", ",15.1d(y-2)].1z("");d.6X=1X;3c.17=a.17;3c.1b=a.1b;37.2k="2o";37.1Y=0;37.1C=0;37.17=a.17;37.1b=a.1b;J o=1i.1D("1B:4h");o.2z=b;o.2v=1X;o.3o=a.3o;o.3l=a.3l;c.1j(o);c.1j(d);g.1j(c);a.1l.1j(g);J e=1M A(o,g,a);e.2N=c;e.4h=d;e.1p="2a";e.O.x=x;e.O.y=y;e.O.w=1;e.O.h=1;v(e,{1g:"24",1u:"#1T"});11 e};J H=N(a){J b=1i.1D("1B:28"),35=b.1q;35.2k="2o";35.1Y=0;35.1C=0;35.17=a.17;35.1b=a.1b;K(a.1l){a.1l.1j(b)}J c=1M A(b,b,a);1m(J f 1L a){K(f.3H(0)!="1n"&&1v a[f]=="N"){c[f]=(N(f){11 N(){J e=a[f].2F(a,P);b.1j(e[0].1w);11 e}})(f)}}c.1p="28";11 c};r.4o=N(){J e,17,1b;K(1v P[0]=="2z"){e=1i.4R(P[0]);17=P[1];1b=P[2]}K(1v P[0]=="2R"){e=P[0];17=P[1];1b=P[2]}K(1v P[0]=="1N"){e=1;x=P[0];y=P[1];17=P[2];1b=P[3]}K(!e){4S 1M 4T("3w 4U 4V 4X.");}K(!1i.4v["1B"]){1i.4v.6A("1B","6z:6y-5Z-5J:1V");1i.5G().5t("1B\\\\:*","5o:3g(#2K#3w)")}J c=1i.1D("4w"),d=1i.1D("4w"),r=C.1l=1i.1D("1B:28"),2c=c.1q,34=r.1q;C.17=17;C.1b=1b;17=17||"7o";1b=1b||"7n";2c.7k="2i(0 "+17+" "+1b+" 0)";2c.1C="-4A";2c.1Y="-4A";2c.2k="2o";34.2k="2o";d.1q.2k="7i";34.17=17;34.1b=1b;r.3o=(17=="2g%"?17:19(17))+" "+(1b=="2g%"?1b:19(1b));r.3l="0 0";J b=1i.1D("1B:2i"),3s=b.1q;3s.1Y=3s.1C=0;3s.17=34.17;3s.1b=34.1b;b.77=b.72="f";r.1j(b);c.1j(r);d.1j(c);K(e==1){1i.3L.1j(d);2c.2k="2o";2c.1Y=x+"1I";2c.1C=y+"1I";2c.17=17;2c.1b=1b;e={1q:{17:17,1b:1b}}}1k{2c.17=e.1q.17=17;2c.1b=e.1q.1b=1b;K(e.2h){e.2w(d,e.2h)}1k{e.1j(d)}}1m(J f 1L C){e[f]=C[f]}e.4l=N(){J a=[];1m(J i=0,1o=r.3n.14;i<1o;i++){K(r.3n[i]!=b){a.2j(r.3n[i])}}1m(i=0,1o=a.14;i<1o;i++){r.2r(a[i])}};11 e};C.3t=N(){C.1l.1w.1w.1w.2r(C.1l.1w.1w)}}K(n=="3d"){J u=N(g,h,j){J k=1i.25(j.23,"1f");k.1a("1u","24");K(j.1l){j.1l.1j(k)}J p=1M A(k,j);p.18=1X;p.1p="1f";p.13={x:0,y:0,1Q:0,1S:0};p.3i=N(){9.18=1X;11 9};p.3Z=N(){9.18=2T;11 9};p.3j=N(x,y){J d=9.18?"M":"m";d+=19(x,10).1W(3)+" "+19(y,10).1W(3)+" ";J a=9[0].2V("d")||"";(a=="4g,0")&&(a="");9[0].1a("d",a+d);9.13.x=(9.18?0:9.13.x)+19(x,10);9.13.y=(9.18?0:9.13.y)+19(y,10);9.O.1f=a+d;11 9};p.26=N(x,y){9.13.x=(9.18?0:9.13.x)+19(x,10);9.13.y=(9.18?0:9.13.y)+19(y,10);J d=9.18?"L":"l";d+=19(x,10).1W(3)+" "+19(y,10).1W(3)+" ";J a=9[0].2V("d")||"";9[0].1a("d",a+d);9.O.1f=a+d;11 9};p.46=N(a,b,c,e,x,y){J d=9.18?"A":"a";d+=[19(a,10).1W(3),19(b,10).1W(3),0,c,e,19(x,10).1W(3),19(y,10).1W(3)].1z(" ");J f=9[0].2V("d")||"";9[0].1a("d",f+d);9.13.x=19(x,10);9.13.y=19(y,10);9.O.1f=f+d;11 9};p.5i=N(a,b,c){K(!c){11 9.26(a,b)}1k{J p={};J x=19(a,10);J y=19(b,10);J w=19(c,10);J d=9.18?"C":"c";J e=[+9.13.x+w,+9.13.y,x-w,y,x,y];1m(J i=0,1o=e.14;i<1o;i++){d+=e[i].1W(3)+" "}9.13.x=(9.18?0:9.13.x)+e[4];9.13.y=(9.18?0:9.13.y)+e[5];9.13.1Q=e[2];9.13.1S=e[3];J f=9[0].2V("d")||"";9[0].1a("d",f+d);9.O.1f=f+d;11 9}};p.1J=N(){J p={},3E=[0,1,2,3,"s",5,"c"];J d=3E[P.14];K(9.18){d=d.2U()}1m(J i=0,1o=P.14;i<1o;i++){d+=19(P[i],10).1W(3)+" "}9.13.x=(9.18?0:9.13.x)+19(P[P.14-2],10);9.13.y=(9.18?0:9.13.y)+19(P[P.14-1],10);9.13.1Q=19(P[P.14-4],10);9.13.1S=19(P[P.14-3],10);J a=9.1c.2V("d")||"";9.1c.1a("d",a+d);9.O.1f=a+d;11 9};p.3I=N(){J p={},3E=[0,1,"t",3,"q"];J d=3E[P.14];K(9.18){d=d.2U()}1m(J i=0,1o=P.14;i<1o;i++){d+=19(P[i],10).1W(3)+" "}9.13.x=(9.18?0:9.13.x)+19(P[P.14-2],10);9.13.y=(9.18?0:9.13.y)+19(P[P.14-1],10);K(P.14!=2){9.13.36=19(P[P.14-4],10);9.13.3e=19(P[P.14-3],10)}J a=9.1c.2V("d")||"";9.1c.1a("d",a+d);9.O.1f=a+d;11 9};p.53=N(r,a){J R=.51*r,2y=9.18,o=9;K(2y){9.3Z();2y=N(){o.3i()}}1k{2y=N(){}}J b={l:N(){11{u:N(){o.1J(-R,0,-r,-(r-R),-r,-r)},d:N(){o.1J(-R,0,-r,r-R,-r,r)}}},r:N(){11{u:N(){o.1J(R,0,r,-(r-R),r,-r)},d:N(){o.1J(R,0,r,r-R,r,r)}}},u:N(){11{r:N(){o.1J(0,-R,-(R-r),-r,r,-r)},l:N(){o.1J(0,-R,R-r,-r,-r,-r)}}},d:N(){11{r:N(){o.1J(0,R,-(R-r),r,r,r)},l:N(){o.1J(0,R,R-r,r,-r,r)}}}};b[a[0]]()[a[1]]();2y();11 o};p.4j=N(){J a=9[0].2V("d")||"";9[0].1a("d",a+"Z ");9.O.1f=a+"Z ";11 9};K(h){p.O.1f=""+h;p.3i();C.3B(p,p.O.1f)}K(g){v(p,g)}11 p};J z=N(o,a,b){J c=1i.25(b.23,a.1p+"6H");c.2O="4W-2E-"+b.4i++;K(a.2l&&a.2l.14){c.1a("6t",a.2l[0]);c.1a("3p",a.2l[1]);c.1a("6s",a.2l[2]);c.1a("5U",a.2l[3])}b.3A.1j(c);1m(J i=0,1o=a.1K.14;i<1o;i++){J d=1i.25(b.23,"3C");d.1a("3q",a.1K[i].3q?a.1K[i].3q:(i==0)?"0%":"2g%");d.1a("3C-2x",a.1K[i].2x||"#4N");K(1v a.1K[i].1x!="1O"){d.1a("3C-1x",a.1K[i].1x)}c.1j(d)};o.1a("1u","3g(#"+c.2O+")")};J I=N(o){K(o.3y){J a=o.1c.3u();o.3y.1a("5v","2J("+[a.x,a.y].1z(",")+")")}};J v=N(o,c){J d={"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},4f=N(o,a){a=d[a.1P().2S()];K(a){J b=o.O["1g-17"]||"1",3h={1d:b,4n:b,3h:0}[o.O["1g-3x"]||c["1g-3x"]]||0,4e=[];1m(J i=0,1o=a.14;i<1o;i++){4e.2j(a[i]*b+((i%2)?1:-1)*3h)}a=4e.1z(",");o.1c.1a("1g-2M",a)}};1m(J e 1L c){J f=c[e];o.O[e]=f;27(e){1e"1f":K(o.1p=="1f"){o.1c.1a("d","4g,0");C.3B(o,f)}1e"2f":1e"1F":1e"x":o.1c.1a(e,f);I(o);1h;1e"2e":1e"1E":1e"y":o.1c.1a(e,f);I(o);1h;1e"17":o.1c.1a(e,f);1h;1e"1b":o.1c.1a(e,f);1h;1e"2E":z(o.1c,f,o.2b);1h;1e"1g-17":o.1c.1q.5q=f;o.1c.1a(e,f);K(o.O["1g-2M"]){4f(o,o.O["1g-2M"])}1h;1e"1g-2M":4f(o,f);1h;1e"2a":K(o.1p=="2a"){o.1c.3n.14&&o.1c.2r(o.1c.2h);o.1c.1j(1i.5n(f))}1h;1e"2W":o.3M(f,1X);1h;1e"2D":J g=f.2n(/[, ]+/);o.2J(g[0],g[1]);1h;1e"2A":J g=f.2n(/[, ]+/);o.2A(g[0],g[1]);1h;1e"1u":J h=f.4t(/^3g\\(([^\\)]+)\\)$/i);K(h){J j=1i.25(o.2b.23,"3y");J k=1i.25(o.2b.23,"2p");j.2O="4W-3y-"+o.2b.4i++;j.1a("x",0);j.1a("y",0);j.1a("5y","5p");k.1a("x",0);k.1a("y",0);k.5m(o.2b.3N,"5k",h[1]);j.1j(k);J l=1i.1D("5u");l.1q.2k="2o";l.1q.1C="-5j";l.1q.1Y="-5j";l.5w=N(){j.1a("17",9.5h);j.1a("1b",9.5g);k.1a("17",9.5h);k.1a("1b",9.5g);1i.3L.2r(9);C.3O()};1i.3L.1j(l);l.40=h[1];o.2b.3A.1j(j);o.1c.1q.1u="3g(#"+j.2O+")";o.1c.1a("1u","3g(#"+j.2O+")");o.3y=j;I(o);1h}2K:J m=e.48(/(\\-.)/g,N(w){11 w.1U(1).2U()});o.1c.1q[m]=f;o.1c.1a(e,f);1h}}};J A=N(a,b){J X=0,Y=0;9[0]=a;9.1c=a;9.2b=b;9.O=9.O||{};9.2s=[];9.1n={2Y:0,2Z:0,2m:{3b:0,x:0,y:0},2C:1,2I:1}};A.1t.2J=N(x,y){K(x==1O&&y==1O){11{x:9.1n.2Y,y:9.1n.2Z}}9.1n.2Y+=+x;9.1n.2Z+=+y;27(9.1p){1e"33":1e"32":9.1s({1F:9.O.1F+x,1E:9.O.1E+y});1h;1e"2i":1e"2p":1e"2a":9.1s({x:9.O.x+x,y:9.O.y+y});1h;1e"1f":J a=1r.3v(9.O.1f);a[0][1]+=+x;a[0][2]+=+y;9.1s({1f:a.1z(" ")});1h}11 9};A.1t.3M=N(a,b){K(a==1O){11 9.1n.2m.3b}J c=9.3u();K(b){9.1n.2m.3b=a}1k{9.1n.2m.3b+=a}K(9.1n.2m.3b){9.2s[0]=("3M("+9.1n.2m.3b+" "+(c.x+c.17/2)+" "+(c.y+c.1b/2)+")")}1k{9.2s[0]=""}9.1c.1a("47",9.2s.1z(" "));11 9};A.1t.4O=N(){9.1c.1q.3K="24";11 9};A.1t.4M=N(){9.1c.1q.3K="4D";11 9};A.1t.3t=N(){9.1c.1w.2r(9.1c)};A.1t.3u=N(){11 9.1c.3u()};A.1t.1s=N(){K(P.14==1&&1v P[0]=="2z"){K(P[0]=="2D"){11 9.2J()}11 9.O[P[0]]}K(P.14==1&&P[0]4y 3a){J a={};1m(J j 1L P[0]){a[P[0][j]]=9.O[P[0][j]]}11 a}K(P.14==2){J b={};b[P[0]]=P[1];v(9,b)}1k K(P.14==1&&1v P[0]=="2R"){v(9,P[0])}11 9};A.1t.4G=N(){9.1c.1w.1j(9.1c);11 9};A.1t.4x=N(){K(9.1c.1w.2h!=9.1c){9.1c.1w.2w(9.1c,9.1c.1w.2h)}11 9};A.1t.4z=N(a){K(a.1c.3T){a.1c.1w.2w(9.1c,a.1c.3T)}1k{a.1c.1w.1j(9.1c)}11 9};A.1t.2w=N(a){a.1c.1w.2w(9.1c,a.1c);11 9};J B=N(a,x,y,r){J b=1i.25(a.23,"33");b.1a("1F",x);b.1a("1E",y);b.1a("r",r);b.1a("1u","24");b.1a("1g","#1T");K(a.1l){a.1l.1j(b)}J c=1M A(b,a);c.O=c.O||{};c.O.1F=x;c.O.1E=y;c.O.r=r;c.O.1g="#1T";c.1p="33";11 c};J D=N(a,x,y,w,h,r){J b=1i.25(a.23,"2i");b.1a("x",x);b.1a("y",y);b.1a("17",w);b.1a("1b",h);K(r){b.1a("2f",r);b.1a("2e",r)}b.1a("1u","24");b.1a("1g","#1T");K(a.1l){a.1l.1j(b)}J c=1M A(b,a);c.O=c.O||{};c.O.x=x;c.O.y=y;c.O.17=w;c.O.1b=h;c.O.1g="#1T";K(r){c.O.2f=c.O.2e=r}c.1p="2i";11 c};J E=N(a,x,y,b,c){J d=1i.25(a.23,"32");d.1a("1F",x);d.1a("1E",y);d.1a("2f",b);d.1a("2e",c);d.1a("1u","24");d.1a("1g","#1T");K(a.1l){a.1l.1j(d)}J e=1M A(d,a);e.O=e.O||{};e.O.1F=x;e.O.1E=y;e.O.2f=b;e.O.2e=c;e.O.1g="#1T";e.1p="32";11 e};J F=N(a,b,x,y,w,h){J c=1i.25(a.23,"2p");c.1a("x",x);c.1a("y",y);c.1a("17",w);c.1a("1b",h);c.1a("5K","24");c.5m(a.3N,"5k",b);K(a.1l){a.1l.1j(c)}J d=1M A(c,a);d.O=d.O||{};d.O.x=x;d.O.y=y;d.O.17=w;d.O.1b=h;d.1p="2p";11 d};J G=N(a,x,y,b){J c=1i.25(a.23,"2a");c.1a("x",x);c.1a("y",y);c.1a("2a-5L","5M");c.1a("1u","#1T");K(b){c.1j(1i.5n(b))}K(a.1l){a.1l.1j(c)}J d=1M A(c,a);d.O=d.O||{};d.O.x=x;d.O.y=y;d.O.1u="#1T";d.1p="2a";11 d};J H=N(a){J b=1i.25(a.23,"g");K(a.1l){a.1l.1j(b)}J i=1M A(b,a);1m(J f 1L a){K(f[0]!="1n"&&1v a[f]=="N"){i[f]=(N(f){11 N(){J e=a[f].2F(a,P);b.1j(e[0]);11 e}})(f)}}i.1p="28";11 i};r.4o=N(){K(1v P[0]=="2z"){J a=1i.4R(P[0]);J b=P[1];J c=P[2]}K(1v P[0]=="2R"){J a=P[0];J b=P[1];J c=P[2]}K(1v P[0]=="1N"){J a=1,x=P[0],y=P[1],b=P[2],c=P[3]}K(!a){4S 1M 4T("3d 4U 4V 4X.");}C.1l=1i.25(C.23,"2b");C.1l.1a("17",b||5f);C.17=b||5f;C.1l.1a("1b",c||5e);C.1b=c||5e;K(a==1){1i.3L.1j(C.1l);C.1l.1q.2k="2o";C.1l.1q.1Y=x+"1I";C.1l.1q.1C=y+"1I"}1k{K(a.2h){a.2w(C.1l,a.2h)}1k{a.1j(C.1l)}}a={1l:C.1l,4l:N(){5d(9.1l.2h){9.1l.2r(9.1l.2h)}9.3A=1i.25(C.23,"3A");9.4i=0;9.1l.1j(9.3A)}};1m(J d 1L C){K(d!="5R"){a[d]=C[d]}}a.4l();11 a};C.3t=N(){C.1l.1w.2r(C.1l)};C.23="5c://5b.5a.59/5W/2b";C.3N="5c://5b.5a.59/5X/3N"}K(n=="3w"||n=="3d"){C.33=N(x,y,r){11 B(9,x,y,r)};C.2i=N(x,y,w,h,r){11 D(9,x,y,w,h,r)};C.32=N(x,y,a,b){11 E(9,x,y,a,b)};C.1f=N(a,b){11 u(a,b,9)};C.2p=N(a,x,y,w,h){11 F(9,a,x,y,w,h)};C.2a=N(x,y,a){11 G(9,x,y,a)};C.28=N(){11 H(9)};C.5Y=N(x,y,w,h,a,b,c){c=c||"#1T";J p=9.1f({1g:c,"1g-17":1}).3j(x,y).26(x+w,y).26(x+w,y+h).26(x,y+h).26(x,y),45=h/b,44=w/a;1m(J i=1;i<b;i++){p.3j(x,y+i*45).26(x+w,y+i*45)}1m(J i=1;i<a;i++){p.3j(x+i*44,y).26(x+i*44,y+h)}11 p};C.3O=N(){K(61.62=="63 64, 65."){J a=C.2i(-C.17,-C.1b,C.17*3,C.1b*3).1s({1g:"24"});58(N(){a.3t()},0)}};A.1t.3C=N(){42(9.3G)};A.1t.2A=N(x,y){K(x==1O&&y==1O){11{x:9.1n.2C,y:9.1n.2I}}y=y||x;J a,2P,1F,1E;K(x!=0&&!(x==1&&y==1)){J b=15.1d(x/15.4c(x)),2d=15.1d(y/15.4c(y)),s=9.1c.1q;a=9.1s("x");2P=9.1s("y");1F=9.1s("1F");1E=9.1s("1E");K(b!=1||2d!=1){K(9.2s){9.2s[2]="2A("+[b,2d]+")";9.1c.1a("47",9.2s.1z(" "));a=(b<0)?-9.1s("x")-9.O.17*x*b/9.1n.2C:9.1s("x");2P=(2d<0)?-9.1s("y")-9.O.1b*y*2d/9.1n.2I:9.1s("y");1F=9.1s("1F")*b;1E=9.1s("1E")*2d}1k{9.1c.3k=" 4L:4K.4J.68(69="+b+", 6a=0, 6b=0, 6c="+2d+", 6e=0, 6i=0, 6j=\'6k 6l\', 6m=\'6n\')";s.4q=(9.1c.3k||"")+(9.1c.3V||"")}}1k{K(9.2s){9.2s[2]="";9.1c.1a("47",9.2s.1z(" "))}1k{9.1c.3k="";s.4q=(9.1c.3k||"")+(9.1c.3V||"")}}27(9.1p){1e"2i":1e"2p":9.1s({17:9.O.17*x*b/9.1n.2C,1b:9.O.1b*y*2d/9.1n.2I,x:a,y:2P});1h;1e"33":1e"32":9.1s({2f:9.O.2f*x*b/9.1n.2C,2e:9.O.2e*y*2d/9.1n.2I,r:9.O.r*x*2d/9.1n.2C,1F:1F,1E:1E});1h;1e"1f":J c=1r.3v(1r.30(9.1s("1f"))),43=1X,2Q=1r.3D(9.O.1f),a=-2Q.17*(x-1)/2,2P=-2Q.1b*(y-1)/2;1m(J i=0,1o=c.14;i<1o;i++){K(c[i][0].2U()=="M"&&43){54}1k{43=2T}K(c[i][0].2U()=="A"){c[i][c[i].14-2]*=x*b;c[i][c[i].14-1]*=y*2d}1k{1m(J j=1,22=c[i].14;j<22;j++){c[i][j]*=(j%2)?x*b/9.1n.2C:y*2d/9.1n.2I}}}J d=1r.3D(c),a=2Q.x+2Q.17/2-d.x-d.17/2,2P=2Q.y+2Q.1b/2-d.y-d.1b/2;c=1r.3v(c);c[0][1]+=a;c[0][2]+=2P;9.1s({1f:c.1z(" ")})}}9.1n.2C=x;9.1n.2I=y;11 9};A.1t.6q=N(c,d,e){42(9.3G);J f={},2H={},1R={},t={x:0,y:0};1m(J g 1L c){K(g 1L 3P){f[g]=9.1s(g);K(1v f[g]=="1O"){f[g]=q[g]}2H[g]=c[g];27(3P[g]){1e"1N":1R[g]=(2H[g]-f[g])/d;1h;1e"3Q":f[g]=1r.49(f[g]);J h=1r.49(2H[g]);1R[g]={r:(h.r-f[g].r)/d,g:(h.g-f[g].g)/d,b:(h.b-f[g].b)/d};1h;1e"1f":J k=1r.52(f[g],2H[g]);f[g]=k[0];2H[g]=k[1];1R[g]=[];1m(J i=0,1o=f[g].14;i<1o;i++){1R[g][i]=[0];1m(J j=1,22=f[g][i].14;j<22;j++){1R[g][i][j]=(2H[g][i][j]-f[g][i][j])/d}}1h;1e"3R":J l=c[g].2n(/[, ]+/);K(g=="2D"){f[g]=[0,0];1R[g]=[l[0]/d,l[1]/d]}1k{f[g]=f[g].2n(/[, ]+/);1R[g]=[(l[0]-f[g][0])/d,(l[1]-f[g][0])/d]}2H[g]=l}}}J m=1M 50(),3X=0,2X=9;(N(){J a=(1M 50()).4Z()-m.4Z(),3W={},1Z;K(a<d){1m(J b 1L f){27(3P[b]){1e"1N":1Z=+f[b]+a*1R[b];1h;1e"3Q":1Z="4a("+[15.1d(f[b].r+a*1R[b].r),15.1d(f[b].g+a*1R[b].g),15.1d(f[b].b+a*1R[b].b)].1z(",")+")";1h;1e"1f":1Z=[];1m(J i=0,1o=f[b].14;i<1o;i++){1Z[i]=[f[b][i][0]];1m(J j=1,22=f[b][i].14;j<22;j++){1Z[i][j]=f[b][i][j]+a*1R[b][i][j]}1Z[i]=1Z[i].1z(" ")}1Z=1Z.1z(" ");1h;1e"3R":K(b=="2D"){J x=1R[b][0]*(a-3X),y=1R[b][1]*(a-3X);t.x+=x;t.y+=y;1Z=[x,y].1z(" ")}1k{1Z=[+f[b][0]+a*1R[b][0],+f[b][1]+a*1R[b][1]].1z(" ")}1h}K(b=="21-3z"){3W[b]=1Z+"1I"}1k{3W[b]=1Z}}2X.1s(3W);2X.3G=58(P.3U,0);C.3O()}1k{K(t.x||t.y){2X.2J(-t.x,-t.y)}2X.1s(c);42(2X.3G);C.3O();(1v e=="N")&&e.38(2X)}3X=a})();11 9};C.3B=N(p,g){J h={M:N(x,y){9.3j(x,y)},C:N(a,b,c,d,e,f){9.1J(a,b,c,d,e,f)},Q:N(a,b,c,d){9.3I(a,b,c,d)},T:N(x,y){9.3I(x,y)},S:N(a,b,c,d){p.1J(a,b,c,d)},L:N(x,y){p.26(x,y)},H:N(x){9.26(x,9.13.y)},V:N(y){9.26(9.13.x,y)},A:N(a,b,c,d,e,x,y){9.46(a,b,d,e,x,y)},Z:N(){9.4j()}};g=1r.3r(g);1m(J i=0,1o=g.14;i<1o;i++){J b=g[i].6C();h[b].2F(p,g[i])}};11 r}1k{11 N(){}}})((!4Y.6G)?"3w":"3d");1r.1V=!(1r.2b=(1r.1p=="3d"));K(1r.1V&&4Y.6I){1r.1p="6J 6K";1r.1V=1r.2b=2T}1r.1P=N(){11"6L 6O "+(9.1V?"6Q\'t ":"")+"6R"+(9.2b?"s":"")+" 3d.\\6S 6T 6U "+6V("6W%6Y%20")+9.4C};1r.3J=N(a,c,d){K(1v a=="2R"&&"h"1L a&&"s"1L a&&"b"1L a){d=a.b;c=a.s;a=a.h}J e,1H,1G;K(d==0){11{r:0,g:0,b:0,41:"#1T"}}1k{J i=15.74(a*6),f=(a*6)-i,p=d*(1-c),q=d*(1-(c*f)),t=d*(1-(c*(1-f)));[N(){e=d;1H=t;1G=p},N(){e=q;1H=d;1G=p},N(){e=p;1H=d;1G=t},N(){e=p;1H=q;1G=d},N(){e=t;1H=p;1G=d},N(){e=d;1H=p;1G=q},N(){e=d;1H=t;1G=p}][i]()}J h={r:e,g:1H,b:1G};e*=3f;1H*=3f;1G*=3f;J r=15.1d(e).1P(16);K(r.14==1){r="0"+r}J g=15.1d(1H).1P(16);K(g.14==1){g="0"+g}J b=15.1d(1G).1P(16);K(b.14==1){b="0"+b}h.41="#"+r+g+b;11 h};1r.76=N(a,b,c){K(1v a=="2R"&&"r"1L a&&"g"1L a&&"b"1L a){c=a.b;b=a.g;a=a.r}K(1v a=="2z"&&a.3H(0)=="#"){K(a.14==4){c=1A(a.1U(3),16);b=1A(a.1U(2,3),16);a=1A(a.1U(1,2),16)}1k{c=1A(a.1U(5),16);b=1A(a.1U(3,5),16);a=1A(a.1U(1,3),16)}}K(a>1||b>1||c>1){a/=3f;b/=3f;c/=3f}J d=15.3F(a,b,c),31=15.31(a,b,c),2t,4m,4I=d;K(31==d){11{h:0,s:0,b:d}}1k{J e=(d-31);4m=e/d;K(a==d){2t=(b-c)/e}1k K(b==d){2t=2+((c-a)/e)}1k{2t=4+((a-b)/e)}2t/=6;K(2t<0){2t+=1}K(2t>1){2t-=1}}11{h:2t,s:4m,b:4I}};1r.49=N(a){J c,1H,1G,d=a.4t(/^\\s*((#[a-f\\d]{6})|(#[a-f\\d]{3})|4a\\(\\s*(\\d+,\\s*\\d+,\\s*\\d+)\\s*\\)|4a\\(\\s*(\\d+%,\\s*\\d+%,\\s*\\d+%)\\s*\\)|4F\\(\\s*(\\d+,\\s*\\d+,\\s*\\d+)\\s*\\)|4F\\(\\s*(\\d+%,\\s*\\d+%,\\s*\\d+%)\\s*\\))\\s*$/i);K(d){K(d[2]){1G=1A(d[2].1U(5),16);1H=1A(d[2].1U(3,5),16);c=1A(d[2].1U(1,3),16)}K(d[3]){1G=1A(d[3].1U(3)+d[3].1U(3),16);1H=1A(d[3].1U(2,3)+d[3].1U(2,3),16);c=1A(d[3].1U(1,2)+d[3].1U(1,2),16)}K(d[4]){d=d[4].2n(/\\s*,\\s*/);c=1A(d[0],10);1H=1A(d[1],10);1G=1A(d[2],10)}K(d[5]){d=d[5].2n(/\\s*,\\s*/);c=1A(d[0],10)*2.55;1H=1A(d[1],10)*2.55;1G=1A(d[2],10)*2.55}K(d[6]){d=d[6].2n(/\\s*,\\s*/);c=1A(d[0],10);1H=1A(d[1],10);1G=1A(d[2],10);11 9.3J(c,1H,1G)}K(d[7]){d=d[7].2n(/\\s*,\\s*/);c=1A(d[0],10)*2.55;1H=1A(d[1],10)*2.55;1G=1A(d[2],10)*2.55;11 9.3J(c,1H,1G)}J d={r:c,g:1H,b:1G};J r=15.1d(c).1P(16);(r.14==1)&&(r="0"+r);J g=15.1d(1H).1P(16);(g.14==1)&&(g="0"+g);J b=15.1d(1G).1P(16);(b.14==1)&&(b="0"+b);d.41="#"+r+g+b;11 d}};1r.4E=N(a){J b=P.3U.2u=P.3U.2u||{h:0,s:1,b:a||.75};J c=9.3J(b.h,b.s,b.b);b.h+=.7d;K(b.h>1){b.h=0;b.s-=.2;K(b.s<=0){P.3U.2u={h:0,s:1,b:b.b}}}11 c.41};1r.4E.7e=N(){9.2u=1O};1r.30=N(e){J f={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},3S=[],1P=N(){J a="";1m(J i=0,1o=9.14;i<1o;i++){a+=9[i][0]+9[i].1z(",").1U(2)}11 a};K(e.1P.1P()==1P.1P()){11 e}e.48(/([7h])[\\s,]*((-?\\d*\\.?\\d*\\s*,?\\s*)+)/4B,N(a,b,c){J d=[],3Y=b.2S();c.48(/(-?\\d*\\.?\\d*)\\s*,?\\s*/4B,N(a,b){b&&d.2j(+b)});5d(d.14>=f[3Y]){3S.2j([b].7l(d.2q(0,f[3Y])));K(!f[3Y]){1h}}});3S.1P=1P;11 3S};1r.3D=N(a){J b=a;K(1v a=="2z"){b=9.30(a)}b=9.3r(b);J x=[],y=[],14=0;1m(J i=0,1o=b.14;i<1o;i++){27(b[i][0]){1e"Z":1h;1e"A":x.2j(b[i][b[i].14-2]);y.2j(b[i][b[i].14-1]);1h;2K:1m(J j=1,22=b[i].14;j<22;j++){K(j%2){x.2j(b[i][j])}1k{y.2j(b[i][j])}}}}J c=15.31.2F(15,x),4p=15.31.2F(15,y);11{x:c,y:4p,17:15.3F.2F(15,x)-c,1b:15.3F.2F(15,y)-4p,X:x,Y:y}};1r.3v=N(a){J b=[];K(1v a=="2z"){a=9.30(a)}J x=0,y=0,2u=0;K(a[0][0]=="M"){x=a[0][1];y=a[0][2];2u++;b.2j(a[0])}1m(J i=2u,1o=a.14;i<1o;i++){b[i]=[];K(a[i][0]!=a[i][0].2S()){b[i][0]=a[i][0].2S();27(b[i][0]){1e"a":b[i][1]=a[i][1];b[i][2]=a[i][2];b[i][3]=0;b[i][4]=a[i][4];b[i][5]=a[i][5];b[i][6]=+(a[i][6]-x).1W(3);b[i][7]=+(a[i][7]-y).1W(3);1h;1e"v":b[i][1]=+(a[i][1]-y).1W(3);1h;2K:1m(J j=1,22=a[i].14;j<22;j++){b[i][j]=+(a[i][j]-((j%2)?x:y)).1W(3)}}}1k{b[i]=a[i]}27(b[i][0]){1e"z":1h;1e"h":x+=b[i][b[i].14-1];1h;1e"v":y+=b[i][b[i].14-1];1h;2K:x+=b[i][b[i].14-2];y+=b[i][b[i].14-1]}}b.1P=a.1P;11 b};1r.3r=N(a){J b=[];K(1v a=="2z"){a=9.30(a)}J x=0,y=0,2u=0;K(a[0][0]=="M"){x=+a[0][1];y=+a[0][2];2u++;b[0]=a[0]}1m(J i=2u,1o=a.14;i<1o;i++){b[i]=[];K(a[i][0]!=a[i][0].2U()){b[i][0]=a[i][0].2U();27(b[i][0]){1e"A":b[i][1]=a[i][1];b[i][2]=a[i][2];b[i][3]=0;b[i][4]=a[i][4];b[i][5]=a[i][5];b[i][6]=+(a[i][6]+x).1W(3);b[i][7]=+(a[i][7]+y).1W(3);1h;1e"V":b[i][1]=+a[i][1]+y;1h;2K:1m(J j=1,22=a[i].14;j<22;j++){b[i][j]=+a[i][j]+((j%2)?x:y)}}}1k{b[i]=a[i]}27(b[i][0]){1e"Z":1h;1e"H":x=b[i][1];1h;1e"V":y=b[i][1];1h;2K:x=b[i][b[i].14-2];y=b[i][b[i].14-1]}}b.1P=a.1P;11 b};1r.52=N(e,f){J g=[9.3r(9.30(e)),9.3r(9.30(f))],O=[{x:0,y:0,1Q:0,1S:0,X:0,Y:0},{x:0,y:0,1Q:0,1S:0,X:0,Y:0}],4s=N(a,d){K(!a){11["U"]}27(a[0]){1e"M":d.X=a[1];d.Y=a[2];1h;1e"S":J b=d.x+(d.x-(d.1Q||d.x));J c=d.y+(d.y-(d.1S||d.y));a=["C",b,c,a[1],a[2],a[3],a[4]];1h;1e"T":J b=d.x+(d.x-(d.1Q||d.x));J c=d.y+(d.y-(d.1S||d.y));a=["Q",b,c,a[1],a[2]];1h;1e"H":a=["L",a[1],d.y];1h;1e"V":a=["L",d.x,a[1]];1h;1e"Z":a=["L",d.X,d.Y];1h}11 a},4u=N(a,b,i){K(g[a][i][0]=="M"&&g[b][i][0]!="M"){g[b].2q(i,0,["M",O[b].x,O[b].y]);O[a].1Q=g[a][i][g[a][i].14-4]||0;O[a].1S=g[a][i][g[a][i].14-3]||0;O[a].x=g[a][i][g[a][i].14-2];O[a].y=g[a][i][g[a][i].14-1];11 1X}1k K(g[a][i][0]=="L"&&g[b][i][0]=="C"){g[a][i]=["C",O[a].x,O[a].y,g[a][i][1],g[a][i][2],g[a][i][1],g[a][i][2]]}1k K(g[a][i][0]=="L"&&g[b][i][0]=="Q"){g[a][i]=["Q",g[a][i][1],g[a][i][2],g[a][i][1],g[a][i][2]]}1k K(g[a][i][0]=="Q"&&g[b][i][0]=="C"){J x=g[b][i][g[b][i].14-2];J y=g[b][i][g[b][i].14-1];g[b].2q(i+1,0,["Q",x,y,x,y]);g[a].2q(i,0,["C",O[a].x,O[a].y,O[a].x,O[a].y,O[a].x,O[a].y]);i++;O[b].1Q=g[b][i][g[b][i].14-4]||0;O[b].1S=g[b][i][g[b][i].14-3]||0;O[b].x=g[b][i][g[b][i].14-2];O[b].y=g[b][i][g[b][i].14-1];11 1X}1k K(g[a][i][0]=="A"&&g[b][i][0]=="C"){J x=g[b][i][g[b][i].14-2];J y=g[b][i][g[b][i].14-1];g[b].2q(i+1,0,["A",0,0,g[a][i][3],g[a][i][4],g[a][i][5],x,y]);g[a].2q(i,0,["C",O[a].x,O[a].y,O[a].x,O[a].y,O[a].x,O[a].y]);i++;O[b].1Q=g[b][i][g[b][i].14-4]||0;O[b].1S=g[b][i][g[b][i].14-3]||0;O[b].x=g[b][i][g[b][i].14-2];O[b].y=g[b][i][g[b][i].14-1];11 1X}1k K(g[a][i][0]=="U"){g[a][i][0]=g[b][i][0];1m(J j=1,22=g[b][i].14;j<22;j++){g[a][i][j]=(j%2)?O[a].x:O[a].y}}11 2T};1m(J i=0;i<15.3F(g[0].14,g[1].14);i++){g[0][i]=4s(g[0][i],O[0]);g[1][i]=4s(g[1][i],O[1]);K(g[0][i][0]!=g[1][i][0]&&(4u(0,1,i)||4u(1,0,i))){54}O[0].1Q=g[0][i][g[0][i].14-4]||0;O[0].1S=g[0][i][g[0][i].14-3]||0;O[0].x=g[0][i][g[0][i].14-2];O[0].y=g[0][i][g[0][i].14-1];O[1].1Q=g[1][i][g[1][i].14-4]||0;O[1].1S=g[1][i][g[1][i].14-3]||0;O[1].x=g[1][i][g[1][i].14-2];O[1].y=g[1][i][g[1][i].14-1]}11 g};',62,460,'|||||||||this||||||||||||||||||||||||||||||||||||var|if|||function|attrs|arguments||||||||||||return||last|length|Math||width|isAbsolute|parseFloat|setAttribute|height|node|round|case|path|stroke|break|document|appendChild|else|canvas|for|_|ii|type|style|Raphael|attr|prototype|fill|typeof|parentNode|opacity|Group|join|parseInt|rvml|top|createElement|cy|cx|blue|green|px|curveTo|dots|in|new|number|undefined|toString|bx|diff|by|000|substring|vml|toFixed|true|left|now||font|jj|svgns|none|createElementNS|lineTo|switch|group||text|svg|cs|diry|ry|rx|100|firstChild|rect|push|position|vector|rt|split|absolute|image|splice|removeChild|transformations|hue|start|on|insertBefore|color|rollback|string|scale|Path|sx|translation|gradient|apply|os|to|sy|translate|default|setBox|dasharray|shape|id|dy|dim|object|toLowerCase|false|toUpperCase|getAttribute|rotation|that|tx|ty|parsePathString|min|ellipse|circle|rs|els|qx|gs|call|gl|Array|deg|ol|SVG|qy|255|url|butt|absolutely|moveTo|filterMatrix|coordorigin|getElementsByTagName|childNodes|coordsize|y1|offset|pathToAbsolute|bs|remove|getBBox|pathToRelative|VML|linecap|pattern|size|defs|pathfinder|stop|pathDimensions|command|max|animation_in_progress|charAt|qcurveTo|hsb2rgb|display|body|rotate|xlink|safari|availableAnimAttrs|colour|csv|data|nextSibling|callee|filterOpacity|set|prev|name|relatively|src|hex|clearTimeout|skip|columnWidth|rowHeight|arcTo|transform|replace|getRGB|rgb|miterlimit|abs|linejoin|dashes|addDashes|M0|textpath|gradients|andClose|family|clear|saturation|square|_create|miny|filter|weight|processPath|match|edgeCases|namespaces|div|toBack|instanceof|insertAfter|2px|ig|version|block|getColor|hsb|toFront|miter|brightness|Microsoft|DXImageTransform|progid|show|fff|hide|Arial|oval|getElementById|throw|Error|container|not|raphael|found|window|getTime|Date|5522|pathEqualiser|addRoundedCorner|continue||class||setTimeout|org|w3|www|http|while|200|320|offsetHeight|offsetWidth|cplineTo|9999em|href|svgattr|setAttributeNS|createTextNode|behavior|userSpaceOnUse|strokeWidth|linear|gradientTitle|addRule|img|patternTransform|onload|method|patternUnits|ar|at|wr|wa|color2|sqrt|dashstyle|createStyleSheet|colors|value|com|preserveAspectRatio|anchor|middle|qb|opacity2|longdashdotdot|longdashdot|create|dashdot|longdash|y2|qcurve|2000|1999|drawGrid|microsoft|atan|navigator|vendor|Apple|Computer|Inc|arg|angle|Matrix|M11|M12|M21|M22|270|Dx|radial|className|slice|Dy|sizingmethod|auto|expand|filtertype|bilinear|focus|pos|animate|focusposition|x2|x1|RotX|dash|RotY|Scale|schemas|urn|add|tile|shift|dot|shortdashdotdot|shortdashdot|SVGAngle|Gradient|CanvasRenderingContext2D|Canvas|only|Your|shortdot|shortdash|browser|null|doesn|support|nYou|are|running|unescape|Rapha|textpathok|EBl|ps|arcsize|roundrect|stroked|16px|floor||rgb2hsb|filled|flat|endcap|Alpha|fontFamily|fontSize|075|reset|joinstyle|fontWeight|achlmqstvz|relative|solid|clip|concat|tagName|200px|320px|item'.split('|'),0,{}))
// An extension to Raphael to draw a spinner (useful to show user when waiting for something to load).
// It returns a function that you can execute later to remove the spinner.
Raphael.spinner = function(holderid, R1, R2, count, stroke_width, colour) {
    var sectorsCount = count || 12,
        color = colour || "#fff",
        width = stroke_width || 15,
        r1 = Math.min(R1, R2) || 35,
        r2 = Math.max(R1, R2) || 60,
        cx = r2 + width,
        cy = r2 + width,
        r = Raphael(holderid, r2 * 2 + width * 2, r2 * 2 + width * 2),

        sectors = [],
        opacity = [],
        beta = 2 * Math.PI / sectorsCount,

        pathParams = {stroke: color, "stroke-width": width, "stroke-linecap": "round"};
    Raphael.getColor.reset();
    for (var i = 0; i < sectorsCount; i++) {
        var alpha = beta * i - Math.PI / 2,
            cos = Math.cos(alpha),
            sin = Math.sin(alpha);
        opacity[i] = 1 / sectorsCount * i;
        sectors[i] = r.path(pathParams)
                        .moveTo(cx + r1 * cos, cy + r1 * sin)
                        .lineTo(cx + r2 * cos, cy + r2 * sin);
        if (color == "rainbow") {
            sectors[i].attr("stroke", Raphael.getColor());
        }
    }
    var tick;
    (function ticker() {
        opacity.unshift(opacity.pop());
        for (var i = 0; i < sectorsCount; i++) {
            sectors[i].attr("opacity", opacity[i]);
        }
        r.safari();
        tick = setTimeout(ticker, 1000 / sectorsCount);
    })();
    return function () {
        clearTimeout(tick);
        r.remove();
    };
};
