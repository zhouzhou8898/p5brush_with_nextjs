!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], e)
    : e(
        ((t = 'undefined' != typeof globalThis ? globalThis : t || self).brush =
          {})
      );
})(this, function (t) {
  'use strict';
  function e(t, e) {
    let s = new i(t),
      n = () => s.next();
    return (
      (n.double = () => n() + 11102230246251565e-32 * ((2097152 * n()) | 0)),
      (n.int32 = () => (4294967296 * s.next()) | 0),
      (n.quick = n),
      (function (t, e, i) {
        let s = i && i.state;
        s &&
          ('object' == typeof s && e.copy(s, e),
          (t.state = () => e.copy(e, {})));
      })(n, s, e),
      n
    );
  }
  class i {
    constructor(t) {
      null == t && (t = +new Date());
      let e = 4022871197;
      function i(t) {
        t = String(t);
        for (let i = 0; i < t.length; i++) {
          e += t.charCodeAt(i);
          let s = 0.02519603282416938 * e;
          (e = s >>> 0),
            (s -= e),
            (s *= e),
            (e = s >>> 0),
            (s -= e),
            (e += 4294967296 * s);
        }
        return 2.3283064365386963e-10 * (e >>> 0);
      }
      (this.c = 1),
        (this.s0 = i(' ')),
        (this.s1 = i(' ')),
        (this.s2 = i(' ')),
        (this.s0 -= i(t)),
        this.s0 < 0 && (this.s0 += 1),
        (this.s1 -= i(t)),
        this.s1 < 0 && (this.s1 += 1),
        (this.s2 -= i(t)),
        this.s2 < 0 && (this.s2 += 1);
    }
    next() {
      let { c: t, s0: e, s1: i, s2: s } = this,
        n = 2091639 * e + 2.3283064365386963e-10 * t;
      return (this.s0 = i), (this.s1 = s), (this.s2 = n - (this.c = 0 | n));
    }
    copy(t, e) {
      return (e.c = t.c), (e.s0 = t.s0), (e.s1 = t.s1), (e.s2 = t.s2), e;
    }
  }
  let s,
    n = !1,
    o = !1,
    r = !1,
    a = !1;
  function h(t = !1) {
    let e = !(!r || !t) && a;
    n && l(!1), !t && r && (t = a), (s = t || window.self), y.load(e), (o = !0);
  }
  function l(t = !0) {
    n &&
      (y.masks[0].remove(),
      (y.masks[0] = null),
      y.masks[1].remove(),
      (y.masks[1] = null),
      y.masks[2].remove(),
      (y.masks[2] = null),
      t && brush.load());
  }
  function c() {
    n || (o || h(), z.create(), A(s.width / 250), (n = !0));
  }
  let m = new e(Math.random());
  const d = {
    random: (t = 0, e = 1) => t + m() * (e - t),
    randInt(t, e) {
      return Math.floor(this.random(t, e));
    },
    gaussian(t = 0, e = 1) {
      const i = 1 - m(),
        s = m();
      return Math.sqrt(-2 * Math.log(i)) * Math.cos(2 * Math.PI * s) * e + t;
    },
    weightedRand(t) {
      let e,
        i,
        s = [];
      for (e in t) for (i = 0; i < 10 * t[e]; i++) s.push(e);
      return s[Math.floor(m() * s.length)];
    },
    map(t, e, i, s, n, o = !1) {
      let r = s + ((t - e) / (i - e)) * (n - s);
      return o
        ? s < n
          ? this.constrain(r, s, n)
          : this.constrain(r, n, s)
        : r;
    },
    constrain: (t, e, i) => Math.max(Math.min(t, i), e),
    cos(t) {
      return this.c[Math.floor((((t % 360) + 360) % 360) * 4)];
    },
    sin(t) {
      return this.s[Math.floor((((t % 360) + 360) % 360) * 4)];
    },
    isPrecalculationDone: !1,
    preCalculation() {
      if (this.isPrecalculationDone) return;
      const t = 1440,
        e = (2 * Math.PI) / t;
      (this.c = new Float64Array(t)), (this.s = new Float64Array(t));
      for (let i = 0; i < t; i++) {
        const t = i * e;
        (d.c[i] = Math.cos(t)), (d.s[i] = Math.sin(t));
      }
      this.isPrecalculationDone = !0;
    },
    isNumber: (t) => !isNaN(t),
    toDegrees: (t) =>
      ((('radians' === s.angleMode() ? (180 * t) / Math.PI : t) % 360) + 360) %
      360,
    dist: (t, e, i, s) => Math.hypot(i - t, s - e),
  };
  function u(t, e, i, s, n = !1) {
    let o = t.x,
      r = t.y,
      a = e.x,
      h = e.y,
      l = i.x,
      c = i.y,
      m = s.x,
      d = s.y;
    if ((o === a && r === h) || (l === m && c === d)) return !1;
    let u = a - o,
      p = h - r,
      f = m - l,
      v = d - c,
      g = v * u - f * p;
    if (0 === g) return !1;
    let x = (f * (r - c) - v * (o - l)) / g,
      y = (u * (r - c) - p * (o - l)) / g;
    return !(!n && (y < 0 || y > 1)) && { x: o + x * u, y: r + x * p };
  }
  function p(t, e, i, s) {
    return (
      (((Math.atan2(-(s - e), i - t) * (180 / Math.PI)) % 360) + 360) % 360
    );
  }
  d.preCalculation();
  const f = { field: {}, stroke: {}, hatch: {}, fill: {}, others: {} };
  const v = {
    translation: [0, 0],
    rotation: 0,
    trans() {
      return (
        (this.translation = [
          s._renderer.uMVMatrix.mat4[12],
          s._renderer.uMVMatrix.mat4[13],
        ]),
        this.translation
      );
    },
  };
  let g = 1;
  function x(t) {
    g *= t;
  }
  const y = {
    loaded: !1,
    isBlending: !1,
    isCaching: !0,
    currentColor: new Float32Array(3),
    load(t) {
      (this.type = r && !t ? 0 : t ? 2 : 1), (this.masks = []);
      for (let e = 0; e < 3; e++)
        switch (this.type) {
          case 0:
            this.masks[e] = s.createGraphics(
              s.width,
              s.height,
              1 == e ? s.WEBGL : s.P2D
            );
            break;
          case 1:
            this.masks[e] = createGraphics(
              s.width,
              s.height,
              1 == e ? WEBGL : P2D
            );
            break;
          case 2:
            this.masks[e] = t.createGraphics(
              t.width,
              t.height,
              1 == e ? t.WEBGL : t.P2D
            );
        }
      for (let t of this.masks)
        t.pixelDensity(s.pixelDensity()),
          t.clear(),
          t.angleMode(s.DEGREES),
          t.noSmooth();
      (this.shader = s.createShader(this.vert, this.frag)), (y.loaded = !0);
    },
    getPigment(t) {
      let e = t.levels,
        i = new Float32Array(3);
      return (i[0] = e[0] / 255), (i[1] = e[1] / 255), (i[2] = e[2] / 255), i;
    },
    color1: new Float32Array(3),
    color2: new Float32Array(3),
    blending1: !1,
    blending2: !1,
    blend(t = !1, e = !1, i = !1) {
      if (
        (c(),
        (this.isBlending = i ? this.blending1 : this.blending2),
        (this.currentColor = i ? this.color1 : this.color2),
        !this.isBlending)
      )
        if (t)
          (this.currentColor = this.getPigment(t)),
            i
              ? ((this.blending1 = !0), (this.color1 = this.currentColor))
              : ((this.blending2 = !0), (this.color2 = this.currentColor));
        else if (e) return void (i || w());
      if (
        (t ? this.getPigment(t) : this.currentColor).toString() !==
          this.currentColor.toString() ||
        e ||
        !this.isCaching
      ) {
        if ((w(), this.isBlending)) {
          s.push(),
            s.translate(-v.trans()[0], -v.trans()[1]),
            s.shader(this.shader),
            this.shader.setUniform('addColor', this.currentColor),
            this.shader.setUniform('source', s._renderer),
            this.shader.setUniform('active', y.watercolor),
            this.shader.setUniform('random', [
              d.random(),
              d.random(),
              d.random(),
            ]);
          let t = i ? this.masks[1] : this.masks[0];
          this.shader.setUniform('mask', t),
            s.fill(0, 0, 0, 0),
            s.noStroke(),
            s.rect(-s.width / 2, -s.height / 2, s.width, s.height),
            s.pop(),
            t.clear();
        }
        e ||
          ((this.currentColor = this.getPigment(t)),
          i
            ? (this.color1 = this.currentColor)
            : (this.color2 = this.currentColor));
      }
      e &&
        ((this.isBlending = !1),
        i
          ? (this.blending1 = this.isBlending)
          : (this.blending2 = this.isBlending));
    },
    vert: 'precision highp float;attribute vec3 aPosition;attribute vec2 aTexCoord;uniform mat4 uModelViewMatrix,uProjectionMatrix;varying vec2 vVertTexCoord;void main(){gl_Position=uProjectionMatrix*uModelViewMatrix*vec4(aPosition,1);vVertTexCoord=aTexCoord;}',
    frag: 'precision highp float;varying vec2 vVertTexCoord;uniform sampler2D source,mask;uniform vec4 addColor;uniform vec3 random;uniform bool active;\n        #ifndef SPECTRAL\n        #define SPECTRAL\n        float x(float v){return v<.04045?v/12.92:pow((v+.055)/1.055,2.4);}float v(float v){return v<.0031308?v*12.92:1.055*pow(v,1./2.4)-.055;}vec3 m(vec3 v){return vec3(x(v[0]),x(v[1]),x(v[2]));}vec3 f(vec3 f){return clamp(vec3(v(f[0]),v(f[1]),v(f[2])),0.,1.);}void f(vec3 v,out float m,out float f,out float x,out float y,out float z,out float i,out float r){m=min(v.x,min(v.y,v.z));v-=m;f=min(v.y,v.z);x=min(v.x,v.z);y=min(v.x,v.y);z=min(max(0.,v.x-v.z),max(0.,v.x-v.y));i=min(max(0.,v.y-v.z),max(0.,v.y-v.x));r=min(max(0.,v.z-v.y),max(0.,v.z-v.x));}void f(vec3 v,inout float i[38]){float x,y,d,z,o,m,e;f(v,x,y,d,z,o,m,e);i[0]=max(1e-4,x+y*.96853629+d*.51567122+z*.02055257+o*.03147571+m*.49108579+e*.97901834);i[1]=max(1e-4,x+y*.96855103+d*.5401552+z*.02059936+o*.03146636+m*.46944057+e*.97901649);i[2]=max(1e-4,x+y*.96859338+d*.62645502+z*.02062723+o*.03140624+m*.4016578+e*.97901118);i[3]=max(1e-4,x+y*.96877345+d*.75595012+z*.02073387+o*.03119611+m*.2449042+e*.97892146);i[4]=max(1e-4,x+y*.96942204+d*.92826996+z*.02114202+o*.03053888+m*.0682688+e*.97858555);i[5]=max(1e-4,x+y*.97143709+d*.97223624+z*.02233154+o*.02856855+m*.02732883+e*.97743705);i[6]=max(1e-4,x+y*.97541862+d*.98616174+z*.02556857+o*.02459485+m*.013606+e*.97428075);i[7]=max(1e-4,x+y*.98074186+d*.98955255+z*.03330189+o*.0192952+m*.01000187+e*.96663223);i[8]=max(1e-4,x+y*.98580992+d*.98676237+z*.05185294+o*.01423112+m*.01284127+e*.94822893);i[9]=max(1e-4,x+y*.98971194+d*.97312575+z*.10087639+o*.01033111+m*.02636635+e*.89937713);i[10]=max(1e-4,x+y*.99238027+d*.91944277+z*.24000413+o*.00765876+m*.07058713+e*.76070164);i[11]=max(1e-4,x+y*.99409844+d*.32564851+z*.53589066+o*.00593693+m*.70421692+e*.4642044);i[12]=max(1e-4,x+y*.995172+d*.13820628+z*.79874659+o*.00485616+m*.85473994+e*.20123039);i[13]=max(1e-4,x+y*.99576545+d*.05015143+z*.91186529+o*.00426186+m*.95081565+e*.08808402);i[14]=max(1e-4,x+y*.99593552+d*.02912336+z*.95399623+o*.00409039+m*.9717037+e*.04592894);i[15]=max(1e-4,x+y*.99564041+d*.02421691+z*.97137099+o*.00438375+m*.97651888+e*.02860373);i[16]=max(1e-4,x+y*.99464769+d*.02660696+z*.97939505+o*.00537525+m*.97429245+e*.02060067);i[17]=max(1e-4,x+y*.99229579+d*.03407586+z*.98345207+o*.00772962+m*.97012917+e*.01656701);i[18]=max(1e-4,x+y*.98638762+d*.04835936+z*.98553736+o*.0136612+m*.9425863+e*.01451549);i[19]=max(1e-4,x+y*.96829712+d*.0001172+z*.98648905+o*.03181352+m*.99989207+e*.01357964);i[20]=max(1e-4,x+y*.89228016+d*8.554e-5+z*.98674535+o*.10791525+m*.99989891+e*.01331243);i[21]=max(1e-4,x+y*.53740239+d*.85267882+z*.98657555+o*.46249516+m*.13823139+e*.01347661);i[22]=max(1e-4,x+y*.15360445+d*.93188793+z*.98611877+o*.84604333+m*.06968113+e*.01387181);i[23]=max(1e-4,x+y*.05705719+d*.94810268+z*.98559942+o*.94275572+m*.05628787+e*.01435472);i[24]=max(1e-4,x+y*.03126539+d*.94200977+z*.98507063+o*.96860996+m*.06111561+e*.01479836);i[25]=max(1e-4,x+y*.02205445+d*.91478045+z*.98460039+o*.97783966+m*.08987709+e*.0151525);i[26]=max(1e-4,x+y*.01802271+d*.87065445+z*.98425301+o*.98187757+m*.13656016+e*.01540513);i[27]=max(1e-4,x+y*.0161346+d*.78827548+z*.98403909+o*.98377315+m*.22169624+e*.01557233);i[28]=max(1e-4,x+y*.01520947+d*.65738359+z*.98388535+o*.98470202+m*.32176956+e*.0156571);i[29]=max(1e-4,x+y*.01475977+d*.59909403+z*.98376116+o*.98515481+m*.36157329+e*.01571025);i[30]=max(1e-4,x+y*.01454263+d*.56817268+z*.98368246+o*.98537114+m*.4836192+e*.01571916);i[31]=max(1e-4,x+y*.01444459+d*.54031997+z*.98365023+o*.98546685+m*.46488579+e*.01572133);i[32]=max(1e-4,x+y*.01439897+d*.52110241+z*.98361309+o*.98550011+m*.47440306+e*.01572502);i[33]=max(1e-4,x+y*.0143762+d*.51041094+z*.98357259+o*.98551031+m*.4857699+e*.01571717);i[34]=max(1e-4,x+y*.01436343+d*.50526577+z*.98353856+o*.98550741+m*.49267971+e*.01571905);i[35]=max(1e-4,x+y*.01435687+d*.5025508+z*.98351247+o*.98551323+m*.49625685+e*.01571059);i[36]=max(1e-4,x+y*.0143537+d*.50126452+z*.98350101+o*.98551563+m*.49807754+e*.01569728);i[37]=max(1e-4,x+y*.01435408+d*.50083021+z*.98350852+o*.98551547+m*.49889859+e*.0157002);}vec3 t(vec3 x){mat3 i;i[0]=vec3(3.24306333,-1.53837619,-.49893282);i[1]=vec3(-.96896309,1.87542451,.04154303);i[2]=vec3(.05568392,-.20417438,1.05799454);float v=dot(i[0],x),y=dot(i[1],x),o=dot(i[2],x);return f(vec3(v,y,o));}vec3 d(float m[38]){vec3 i=vec3(0);i+=m[0]*vec3(6.469e-5,1.84e-6,.00030502);i+=m[1]*vec3(.00021941,6.21e-6,.00103681);i+=m[2]*vec3(.00112057,3.101e-5,.00531314);i+=m[3]*vec3(.00376661,.00010475,.01795439);i+=m[4]*vec3(.01188055,.00035364,.05707758);i+=m[5]*vec3(.02328644,.00095147,.11365162);i+=m[6]*vec3(.03455942,.00228226,.17335873);i+=m[7]*vec3(.03722379,.00420733,.19620658);i+=m[8]*vec3(.03241838,.0066888,.18608237);i+=m[9]*vec3(.02123321,.0098884,.13995048);i+=m[10]*vec3(.01049099,.01524945,.08917453);i+=m[11]*vec3(.00329584,.02141831,.04789621);i+=m[12]*vec3(.00050704,.03342293,.02814563);i+=m[13]*vec3(.00094867,.05131001,.01613766);i+=m[14]*vec3(.00627372,.07040208,.0077591);i+=m[15]*vec3(.01686462,.08783871,.00429615);i+=m[16]*vec3(.02868965,.09424905,.00200551);i+=m[17]*vec3(.04267481,.09795667,.00086147);i+=m[18]*vec3(.05625475,.09415219,.00036904);i+=m[19]*vec3(.0694704,.08678102,.00019143);i+=m[20]*vec3(.08305315,.07885653,.00014956);i+=m[21]*vec3(.0861261,.0635267,9.231e-5);i+=m[22]*vec3(.09046614,.05374142,6.813e-5);i+=m[23]*vec3(.08500387,.04264606,2.883e-5);i+=m[24]*vec3(.07090667,.03161735,1.577e-5);i+=m[25]*vec3(.05062889,.02088521,3.94e-6);i+=m[26]*vec3(.03547396,.01386011,1.58e-6);i+=m[27]*vec3(.02146821,.00810264,0);i+=m[28]*vec3(.01251646,.0046301,0);i+=m[29]*vec3(.00680458,.00249138,0);i+=m[30]*vec3(.00346457,.0012593,0);i+=m[31]*vec3(.00149761,.00054165,0);i+=m[32]*vec3(.0007697,.00027795,0);i+=m[33]*vec3(.00040737,.00014711,0);i+=m[34]*vec3(.00016901,6.103e-5,0);i+=m[35]*vec3(9.522e-5,3.439e-5,0);i+=m[36]*vec3(4.903e-5,1.771e-5,0);i+=m[37]*vec3(2e-5,7.22e-6,0);return i;}float d(float y,float m,float v){float z=m*pow(v,2.);return z/(y*pow(1.-v,2.)+z);}vec3 f(vec3 v,vec3 y,float z){vec3 x=m(v),o=m(y);float i[38],a[38];f(x,i);f(o,a);float r=d(i)[1],e=d(a)[1];z=d(r,e,z);float s[38];for(int u=0;u<38;u++){float p=(1.-z)*(pow(1.-i[u],2.)/(2.*i[u]))+z*(pow(1.-a[u],2.)/(2.*a[u]));s[u]=1.+p-sqrt(pow(p,2.)+2.*p);}return t(d(s));}vec4 f(vec4 v,vec4 x,float y){return vec4(f(v.xyz,x.xyz,y),mix(v.w,x.w,y));}\n        #endif\n        float d(vec2 m,vec2 v,float y,out vec2 i){vec2 f=vec2(m.x+m.y*.5,m.y),x=floor(f),o=fract(f);float z=step(o.y,o.x);vec2 d=vec2(z,1.-z),r=x+d,e=x+1.,a=vec2(x.x-x.y*.5,x.y),p=vec2(a.x+d.x-d.y*.5,a.y+d.y),s=vec2(a.x+.5,a.y+1.),w=m-a,g=m-p,k=m-s;vec3 u,c,t,A;if(any(greaterThan(v,vec2(0)))){t=vec3(a.x,p.x,s);A=vec3(a.y,p.y,s.y);if(v.x>0.)t=mod(vec3(a.x,p.x,s),v.x);if(v.y>0.)A=mod(vec3(a.y,p.y,s.y),v.y);u=floor(t+.5*A+.5);c=floor(A+.5);}else u=vec3(x.x,r.x,e),c=vec3(x.y,r.y,e.y);vec3 S=mod(u,289.);S=mod((S*51.+2.)*S+c,289.);S=mod((S*34.+10.)*S,289.);vec3 b=S*.07482+y,C=cos(b),D=sin(b);vec2 h=vec2(C.x,D),B=vec2(C.y,D.y),E=vec2(C.z,D.z);vec3 F=.8-vec3(dot(w,w),dot(g,g),dot(k,k));F=max(F,0.);vec3 G=F*F,H=G*G,I=vec3(dot(h,w),dot(B,g),dot(E,k)),J=G*F,K=-8.*J*I;i=10.9*(H.x*h+K.x*w+(H.y*B+K.y*g)+(H.z*E+K.z*k));return 10.9*dot(H,I);}vec4 d(vec3 v,float x){return vec4(mix(v,vec3(dot(vec3(.299,.587,.114),v)),x),1);}float f(vec2 v,float x,float y,float f){return fract(sin(dot(v,vec2(x,y)))*f);}void main(){vec4 v=texture2D(mask,vVertTexCoord);if(v.x>0.){vec2 x=vec2(12.9898,78.233),o=vec2(7.9898,58.233),m=vec2(17.9898,3.233);float y=f(vVertTexCoord,x.x,x.y,43358.5453)*2.-1.,z=f(vVertTexCoord,o.x,o.y,43213.5453)*2.-1.,e=f(vVertTexCoord,m.x,m.y,33358.5453)*2.-1.;const vec2 i=vec2(0);vec2 s;vec4 r;if(active){float a=d(vVertTexCoord*5.,i,10.*random.x,s),p=d(vVertTexCoord*5.,i,10.*random.y,s),g=d(vVertTexCoord*5.,i,10.*random.z,s),k=.25+.25*d(vVertTexCoord*4.,i,3.*random.x,s);r=vec4(d(addColor.xyz,k).xyz+vec3(a,p,g)*.03*abs(addColor.x-addColor.y-addColor.z),1);}else r=vec4(addColor.xyz,1);if(v.w>.7){float a=.5*(v.w-.7);r=r*(1.-a)-vec4(.5)*a;}vec3 a=f(texture2D(source,vVertTexCoord).xyz,r.xyz,.9*v.w);gl_FragColor=vec4(a+.01*vec3(y,z,e),1);}}',
  };
  function w() {
    s.push(),
      s.translate(-v.trans()[0], -v.trans()[1]),
      s.image(y.masks[2], -s.width / 2, -s.height / 2),
      y.masks[2].clear(),
      s.pop();
  }
  function k(t) {
    t.registerMethod('afterSetup', () => y.blend(!1, !0)),
      t.registerMethod('afterSetup', () => y.blend(!1, !0, !0)),
      t.registerMethod('post', () => y.blend(!1, !0)),
      t.registerMethod('post', () => y.blend(!1, !0, !0));
  }
  function _(t, e) {
    z.list.set(t, { gen: e }), (z.current = t), z.refresh();
  }
  'undefined' != typeof p5 && k(p5.prototype);
  const z = {
    isActive: !1,
    list: new Map(),
    current: '',
    step_length: () => Math.min(s.width, s.height) / 1e3,
    create() {
      (this.R = 0.01 * s.width),
        (this.left_x = -1 * s.width),
        (this.top_y = -1 * s.height),
        (this.num_columns = Math.round((2 * s.width) / this.R)),
        (this.num_rows = Math.round((2 * s.height) / this.R)),
        this.addStandard();
    },
    flow_field() {
      return this.list.get(this.current).field;
    },
    refresh(t = 0) {
      this.list.get(this.current).field = this.list
        .get(this.current)
        .gen(t, this.genField());
    },
    genField() {
      let t = new Array(this.num_columns);
      for (let e = 0; e < this.num_columns; e++)
        t[e] = new Float64Array(this.num_rows);
      return t;
    },
    addStandard() {
      _('curved', function (t, e) {
        let i = d.randInt(-25, -15);
        d.randInt(0, 100) % 2 == 0 && (i *= -1);
        for (let n = 0; n < z.num_columns; n++)
          for (let o = 0; o < z.num_rows; o++) {
            let r = s.noise(0.02 * n + 0.03 * t, 0.02 * o + 0.03 * t),
              a = d.map(r, 0, 1, -i, i);
            e[n][o] = 3 * a;
          }
        return e;
      }),
        _('truncated', function (t, e) {
          let i = d.randInt(-25, -15) + 5 * d.sin(t);
          d.randInt(0, 100) % 2 == 0 && (i *= -1);
          let n = d.randInt(5, 10);
          for (let t = 0; t < z.num_columns; t++)
            for (let o = 0; o < z.num_rows; o++) {
              let r = s.noise(0.02 * t, 0.02 * o),
                a = Math.round(d.map(r, 0, 1, -i, i) / n) * n;
              e[t][o] = 4 * a;
            }
          return e;
        }),
        _('zigzag', function (t, e) {
          let i = d.randInt(-30, -15) + Math.abs(44 * d.sin(t));
          d.randInt(0, 100) % 2 == 0 && (i *= -1);
          let s = i,
            n = 0;
          for (let t = 0; t < z.num_columns; t++) {
            for (let i = 0; i < z.num_rows; i++)
              (e[t][i] = n), (n += s), (s *= -1);
            (n += s), (s *= -1);
          }
          return e;
        }),
        _('waves', function (t, e) {
          let i = d.randInt(10, 15) + 5 * d.sin(t),
            s = d.randInt(3, 6) + 3 * d.cos(t),
            n = d.randInt(20, 35);
          for (let t = 0; t < z.num_columns; t++)
            for (let o = 0; o < z.num_rows; o++) {
              let r = d.sin(i * t) * (n * d.cos(o * s)) + d.randInt(-3, 3);
              e[t][o] = r;
            }
          return e;
        }),
        _('seabed', function (t, e) {
          let i = d.random(0.4, 0.8),
            s = d.randInt(18, 26);
          for (let n = 0; n < z.num_columns; n++)
            for (let o = 0; o < z.num_rows; o++) {
              let r = d.randInt(15, 20),
                a = s * d.sin(i * o * n + r);
              e[n][o] = 1.1 * a * d.cos(t);
            }
          return e;
        });
    },
  };
  class b {
    constructor(t, e) {
      this.update(t, e), (this.plotted = 0);
    }
    update(t, e) {
      (this.x = t),
        (this.y = e),
        z.isActive &&
          ((this.x_offset = this.x - z.left_x + v.trans()[0]),
          (this.y_offset = this.y - z.top_y + v.trans()[1]),
          (this.column_index = Math.round(this.x_offset / z.R)),
          (this.row_index = Math.round(this.y_offset / z.R)));
    }
    reset() {
      this.plotted = 0;
    }
    isIn() {
      return z.isActive
        ? this.column_index >= 0 &&
            this.row_index >= 0 &&
            this.column_index < z.num_columns &&
            this.row_index < z.num_rows
        : this.isInCanvas();
    }
    isInCanvas() {
      let t = s.width,
        e = s.height;
      return (
        this.x >= -t - v.trans()[0] &&
        this.x <= t - v.trans()[0] &&
        this.y >= -e - v.trans()[1] &&
        this.y <= e - v.trans()[1]
      );
    }
    angle() {
      return this.isIn() && z.isActive
        ? z.flow_field()[this.column_index][this.row_index]
        : 0;
    }
    moveTo(t, e, i = C.spacing(), s = !0) {
      if (this.isIn()) {
        let n, o;
        s || ((n = d.cos(-e)), (o = d.sin(-e)));
        for (let r = 0; r < t / i; r++) {
          if (s) {
            let t = this.angle();
            (n = d.cos(t - e)), (o = d.sin(t - e));
          }
          let t = i * n,
            r = i * o;
          (this.plotted += i), this.update(this.x + t, this.y + r);
        }
      } else this.plotted += i;
    }
    plotTo(t, e, i, s) {
      if (this.isIn()) {
        const n = 1 / s;
        for (let s = 0; s < e / i; s++) {
          let e = this.angle(),
            s = t.angle(this.plotted),
            o = i * d.cos(e - s),
            r = i * d.sin(e - s);
          (this.plotted += i * n), this.update(this.x + o, this.y + r);
        }
      } else this.plotted += i / x;
    }
  }
  function A(t) {
    for (let e of Z) {
      let i = C.list.get(e[0]).param;
      (i.weight *= t), (i.vibration *= t), (i.spacing *= t);
    }
    M = t;
  }
  let M = 1;
  const C = {
    isActive: !0,
    list: new Map(),
    c: '#000000',
    w: 1,
    cr: null,
    name: 'HB',
    spacing() {
      return (
        (this.p = this.list.get(this.name).param),
        'default' === this.p.type || 'spray' === this.p.type
          ? this.p.spacing / this.w
          : this.p.spacing
      );
    },
    initializeDrawingState(t, e, i, s, n) {
      (this.position = new b(t, e)),
        (this.length = i),
        (this.flow = s),
        (this.plot = n),
        n && n.calcIndex(0);
    },
    draw(t, e) {
      e || (this.dir = t), this.pushState();
      const i = this.spacing(),
        s = e ? Math.round((this.length * t) / i) : Math.round(this.length / i);
      for (let n = 0; n < s; n++)
        this.tip(),
          e
            ? this.position.plotTo(this.plot, i, i, t)
            : this.position.moveTo(i, t, i, this.flow);
      this.popState();
    },
    drawTip(t) {
      this.pushState(!0), this.tip(t), this.popState(!0);
    },
    pushState(t = !1) {
      if (((this.p = this.list.get(this.name).param), !t)) {
        (this.a = 'custom' !== this.p.pressure.type ? d.random(-1, 1) : 0),
          (this.b = 'custom' !== this.p.pressure.type ? d.random(1, 1.5) : 0),
          (this.cp =
            'custom' !== this.p.pressure.type
              ? d.random(3, 3.5)
              : d.random(-0.2, 0.2));
        const [t, e] = this.p.pressure.min_max;
        (this.min = t), (this.max = e);
      }
      (this.c = s.color(this.c)),
        (this.mask = this.p.blend
          ? 'image' === this.p.type
            ? y.masks[1]
            : y.masks[0]
          : y.masks[2]),
        v.trans(),
        this.mask.push(),
        this.mask.noStroke(),
        'image' === this.p.type
          ? this.mask.translate(v.translation[0], v.translation[1])
          : this.mask.translate(
              v.translation[0] + s.width / 2,
              v.translation[1] + s.height / 2
            ),
        this.mask.rotate(-v.rotation),
        this.mask.scale(g),
        this.p.blend &&
          ((y.watercolor = !1),
          'image' !== this.p.type ? y.blend(this.c) : y.blend(this.c, !1, !0),
          t || this.markerTip()),
        (this.alpha = this.calculateAlpha()),
        this.applyColor(this.alpha);
    },
    popState(t = !1) {
      this.p.blend && !t && this.markerTip(), this.mask.pop();
    },
    tip(t = !1) {
      let e = t || this.calculatePressure();
      if (this.isInsideClippingArea())
        switch (this.p.type) {
          case 'spray':
            this.drawSpray(e);
            break;
          case 'marker':
            this.drawMarker(e);
            break;
          case 'custom':
          case 'image':
            this.drawCustomOrImage(e, this.alpha);
            break;
          default:
            this.drawDefault(e);
        }
    },
    calculatePressure() {
      return this.plot
        ? this.simPressure() * this.plot.pressure(this.position.plotted)
        : this.simPressure();
    },
    simPressure() {
      return 'custom' === this.p.pressure.type
        ? d.map(
            this.p.pressure.curve(this.position.plotted / this.length) +
              this.cp,
            0,
            1,
            this.min,
            this.max,
            !0
          )
        : this.gauss();
    },
    gauss(
      t = 0.5 + C.p.pressure.curve[0] * C.a,
      e = 1 - C.p.pressure.curve[1] * C.b,
      i = C.cp,
      s = C.min,
      n = C.max
    ) {
      return d.map(
        1 /
          (1 +
            Math.pow(
              Math.abs(
                (this.position.plotted - t * this.length) /
                  ((e * this.length) / 2)
              ),
              2 * i
            )),
        0,
        1,
        s,
        n
      );
    },
    calculateAlpha() {
      return 'default' !== this.p.type && 'spray' !== this.p.type
        ? this.p.opacity / this.w
        : this.p.opacity;
    },
    applyColor(t) {
      this.p.blend
        ? this.mask.fill(255, 0, 0, t / 2)
        : (this.c.setAlpha(t), this.mask.fill(this.c));
    },
    isInsideClippingArea() {
      if (C.cr)
        return (
          this.position.x >= C.cr[0] &&
          this.position.x <= C.cr[2] &&
          this.position.y >= C.cr[1] &&
          this.position.y <= C.cr[3]
        );
      {
        let t = 0.55 * s.width,
          e = 0.55 * s.height;
        return (
          this.position.x >= -t - v.trans()[0] &&
          this.position.x <= t - v.trans()[0] &&
          this.position.y >= -e - v.trans()[1] &&
          this.position.y <= e - v.trans()[1]
        );
      }
    },
    drawSpray(t) {
      let e =
          this.w * this.p.vibration * t +
          (this.w * d.gaussian() * this.p.vibration) / 3,
        i = this.p.weight * d.random(0.9, 1.1);
      const s = this.p.quality / t;
      for (let t = 0; t < s; t++) {
        let t = d.random(0.9, 1.1),
          s = t * e * d.random(-1, 1),
          n = d.random(-1, 1),
          o = Math.pow(t * e, 2),
          r = Math.sqrt(o - Math.pow(s, 2));
        this.mask.circle(this.position.x + s, this.position.y + n * r, i);
      }
    },
    drawMarker(t, e = !0) {
      let i = e ? this.w * this.p.vibration : 0,
        s = e ? i * d.random(-1, 1) : 0,
        n = e ? i * d.random(-1, 1) : 0;
      this.mask.circle(
        this.position.x + s,
        this.position.y + n,
        this.w * this.p.weight * t
      );
    },
    drawCustomOrImage(t, e, i = !0) {
      this.mask.push();
      let s = i ? this.w * this.p.vibration : 0,
        n = i ? s * d.random(-1, 1) : 0,
        o = i ? s * d.random(-1, 1) : 0;
      this.mask.translate(this.position.x + n, this.position.y + o),
        this.adjustSizeAndRotation(this.w * t, e),
        this.p.tip(this.mask),
        this.mask.pop();
    },
    drawDefault(t) {
      let e =
        this.w *
        this.p.vibration *
        (this.p.definition +
          ((1 - this.p.definition) *
            d.gaussian() *
            this.gauss(0.5, 0.9, 5, 0.2, 1.2)) /
            t);
      d.random(0, this.p.quality * t) > 0.4 &&
        this.mask.circle(
          this.position.x + 0.7 * e * d.random(-1, 1),
          this.position.y + e * d.random(-1, 1),
          t * this.p.weight * d.random(0.85, 1.15)
        );
    },
    adjustSizeAndRotation(t, e) {
      if (
        (this.mask.scale(t),
        'image' === this.p.type &&
          (this.p.blend
            ? this.mask.tint(255, 0, 0, e / 2)
            : this.mask.tint(
                this.mask.red(this.c),
                this.mask.green(this.c),
                this.mask.blue(this.c),
                e
              )),
        'random' === this.p.rotate)
      )
        this.mask.rotate(d.randInt(0, 360));
      else if ('natural' === this.p.rotate) {
        let t =
          (this.plot ? -this.plot.angle(this.position.plotted) : -this.dir) +
          (this.flow ? this.position.angle() : 0);
        this.mask.rotate(t);
      }
    },
    markerTip() {
      if (this.isInsideClippingArea()) {
        let t = this.calculatePressure(),
          e = this.calculateAlpha(t);
        if ((this.mask.fill(255, 0, 0, e / 1.5), 'marker' === C.p.type))
          for (let e = 1; e < 5; e++) this.drawMarker((t * e) / 5, !1);
        else if ('custom' === C.p.type || 'image' === C.p.type)
          for (let i = 1; i < 5; i++)
            this.drawCustomOrImage((t * i) / 5, e, !1);
      }
    },
  };
  function S(t, e) {
    const i = 'marker' === e.type || 'custom' === e.type || 'image' === e.type;
    i || 'spray' === e.type || (e.type = 'default'),
      'image' === e.type &&
        (B.add(e.image.src),
        (e.tip = () =>
          C.mask.image(
            B.tips.get(C.p.image.src),
            -C.p.weight / 2,
            -C.p.weight / 2,
            C.p.weight,
            C.p.weight
          ))),
      (e.blend = !!((i && !1 !== e.blend) || e.blend)),
      C.list.set(t, { param: e, colors: [], buffers: [] });
  }
  function P(t, e, i = 1) {
    I(t), (C.c = e), (C.w = i), (C.isActive = !0);
  }
  function I(t) {
    C.name = t;
  }
  function D(t, e, i, s) {
    c();
    let n = d.dist(t, e, i, s);
    if (0 == n) return;
    C.initializeDrawingState(t, e, n, !1, !1);
    let o = p(t, e, i, s);
    C.draw(o, !1);
  }
  function T(t, e, i, s) {
    c(), C.initializeDrawingState(e, i, t.length, !0, t), C.draw(s, !0);
  }
  const B = {
    tips: new Map(),
    add(t) {
      this.tips.set(t, !1);
    },
    imageToWhite(t) {
      t.loadPixels();
      for (let e = 0; e < 4 * t.width * t.height; e += 4) {
        let i = (t.pixels[e] + t.pixels[e + 1] + t.pixels[e + 2]) / 3;
        (t.pixels[e] = t.pixels[e + 1] = t.pixels[e + 2] = 255),
          (t.pixels[e + 3] = 255 - i);
      }
      t.updatePixels();
    },
    load() {
      for (let t of this.tips.keys()) {
        let e = (r ? a : window.self).loadImage(t, () => B.imageToWhite(e));
        this.tips.set(t, e);
      }
    },
  };
  function E(t = 5, e = 45, i = { rand: !1, continuous: !1, gradient: !1 }) {
    (F.isActive = !0), (F.hatchingParams = [t, e, i]);
  }
  const F = {
      isActive: !1,
      hatchingParams: [5, 45, {}],
      hatchingBrush: !1,
      hatch(t) {
        let e = F.hatchingParams[0],
          i = F.hatchingParams[1],
          s = F.hatchingParams[2],
          n = C.c,
          o = C.name,
          r = C.w,
          a = C.isActive;
        F.hatchingBrush &&
          P(F.hatchingBrush[0], F.hatchingBrush[1], F.hatchingBrush[2]),
          (i = d.toDegrees(i) % 180);
        let h = 1 / 0,
          l = -1 / 0,
          c = 1 / 0,
          m = -1 / 0,
          u = (t) => {
            for (let e of t.a)
              (h = e[0] < h ? e[0] : h),
                (l = e[0] > l ? e[0] : l),
                (c = e[1] < c ? e[1] : c),
                (m = e[1] > m ? e[1] : m);
          };
        Array.isArray(t) || (t = [t]);
        for (let e of t) u(e);
        let p = new R([
            [h, c],
            [l, c],
            [l, m],
            [h, m],
          ]),
          f = i <= 90 && i >= 0 ? c : m,
          v = s.gradient ? d.map(s.gradient, 0, 1, 1, 1.1, !0) : 1,
          g = [],
          x = 0,
          y = e,
          w = (t) => ({
            point1: {
              x: h + y * t * d.cos(90 - i),
              y: f + y * t * d.sin(90 - i),
            },
            point2: {
              x: h + y * t * d.cos(90 - i) + d.cos(-i),
              y: f + y * t * d.sin(90 - i) + d.sin(-i),
            },
          });
        for (; p.intersect(w(x)).length > 0; ) {
          let e = [];
          for (let i of t) e.push(i.intersect(w(x)));
          (g[x] = e
            .flat()
            .sort((t, e) => (t.x === e.x ? t.y - e.y : t.x - e.x))),
            (y *= v),
            x++;
        }
        let k = [];
        for (let t of g) void 0 !== t[0] && k.push(t);
        let _ = s.rand ? s.rand : 0;
        for (let t = 0; t < k.length; t++) {
          let i = k[t],
            n = t > 0 && s.continuous;
          for (let s = 0; s < i.length - 1; s += 2)
            0 !== _ &&
              ((i[s].x += _ * e * d.random(-10, 10)),
              (i[s].y += _ * e * d.random(-10, 10)),
              (i[s + 1].x += _ * e * d.random(-10, 10)),
              (i[s + 1].y += _ * e * d.random(-10, 10))),
              D(i[s].x, i[s].y, i[s + 1].x, i[s + 1].y),
              n && D(k[t - 1][1].x, k[t - 1][1].y, i[s].x, i[s].y);
        }
        P(o, n, r), (C.isActive = a);
      },
    },
    V = F.hatch;
  class R {
    constructor(t, e = !1) {
      (this.a = t),
        (this.vertices = t.map((t) => ({ x: t[0], y: t[1] }))),
        e && (this.vertices = t),
        (this.sides = this.vertices.map((t, e, i) => [
          t,
          i[(e + 1) % i.length],
        ]));
    }
    intersect(t) {
      let e = `${t.point1.x},${t.point1.y}-${t.point2.x},${t.point2.y}`;
      if (this._intersectionCache && this._intersectionCache[e])
        return this._intersectionCache[e];
      let i = [];
      for (let e of this.sides) {
        let s = u(t.point1, t.point2, e[0], e[1]);
        !1 !== s && i.push(s);
      }
      return (
        this._intersectionCache || (this._intersectionCache = {}),
        (this._intersectionCache[e] = i),
        i
      );
    }
    draw(t = !1, e, i) {
      let s = C.isActive;
      if ((t && P(t, e, i), C.isActive)) {
        c();
        for (let t of this.sides) D(t[0].x, t[0].y, t[1].x, t[1].y);
      }
      C.isActive = s;
    }
    fill(t = !1, e, i, s, n, o) {
      let r = J.isActive;
      t && (U(t, e), K(i, o), $(s, n)),
        J.isActive && (c(), J.fill(this)),
        (J.isActive = r);
    }
    hatch(t = !1, e, i) {
      let s = F.isActive;
      t && E(t, e, i), F.isActive && (c(), F.hatch(this)), (F.isActive = s);
    }
    erase(t = !1, e = j.a) {
      if (j.isActive || t) {
        y.masks[2].push(), y.masks[2].noStroke();
        let i = s.color(t || j.c);
        i.setAlpha(e), y.masks[2].fill(i), y.masks[2].beginShape();
        for (let t of this.vertices) y.masks[2].vertex(t.x, t.y);
        y.masks[2].endShape(s.CLOSE), y.masks[2].pop();
      }
    }
    show() {
      this.fill(), this.hatch(), this.draw(), this.erase();
    }
  }
  class G {
    constructor(t) {
      (this.segments = []),
        (this.angles = []),
        (this.pres = []),
        (this.type = t),
        (this.dir = 0),
        this.calcIndex(0),
        (this.pol = !1);
    }
    addSegment(t = 0, e = 0, i = 1, s = !1) {
      this.angles.length > 0 && this.angles.splice(-1),
        (t = s ? ((t % 360) + 360) % 360 : d.toDegrees(t)),
        this.angles.push(t),
        this.pres.push(i),
        this.segments.push(e),
        (this.length = this.segments.reduce((t, e) => t + e, 0)),
        this.angles.push(t);
    }
    endPlot(t = 0, e = 1, i = !1) {
      (t = i ? ((t % 360) + 360) % 360 : d.toDegrees(t)),
        this.angles.splice(-1),
        this.angles.push(t),
        this.pres.push(e);
    }
    rotate(t) {
      this.dir = d.toDegrees(t);
    }
    pressure(t) {
      return t > this.length
        ? this.pres[this.pres.length - 1]
        : this.curving(this.pres, t);
    }
    angle(t) {
      return t > this.length
        ? this.angles[this.angles.length - 1]
        : (this.calcIndex(t),
          'curve' === this.type
            ? this.curving(this.angles, t) + this.dir
            : this.angles[this.index] + this.dir);
    }
    curving(t, e) {
      let i = t[this.index],
        s = t[this.index + 1];
      return (
        void 0 === s && (s = i),
        Math.abs(s - i) > 180 && (s > i ? (s = -(360 - s)) : (i = -(360 - i))),
        d.map(e - this.suma, 0, this.segments[this.index], i, s, !0)
      );
    }
    calcIndex(t) {
      (this.index = -1), (this.suma = 0);
      let e = 0;
      for (; e <= t; )
        (this.suma = e), (e += this.segments[this.index + 1]), this.index++;
      return this.index;
    }
    genPol(t, e, i = 1, s = !1) {
      c();
      const n = 0.5,
        o = [],
        r = Math.round(this.length / n),
        a = new b(t, e);
      let h = s ? 0.15 : 3 * J.bleed_strength,
        l = 0,
        m = 0;
      for (let t = 0; t < r; t++) {
        a.plotTo(this, n, n, 1);
        let t = this.calcIndex(a.plotted);
        (l += n),
          (l >= this.segments[t] * h * d.random(0.7, 1.3) || t >= m) &&
            a.x &&
            (o.push([a.x, a.y]), (l = 0), t >= m && m++);
      }
      return new R(o);
    }
    draw(t, e, i) {
      C.isActive &&
        (c(),
        this.origin && ((t = this.origin[0]), (e = this.origin[1]), (i = 1)),
        T(this, t, e, i));
    }
    fill(t, e, i) {
      J.isActive &&
        (c(),
        this.origin && ((t = this.origin[0]), (e = this.origin[1]), (i = 1)),
        (this.pol = this.genPol(t, e, i)),
        this.pol.fill());
    }
    hatch(t, e, i) {
      F.isActive &&
        (c(),
        this.origin && ((t = this.origin[0]), (e = this.origin[1]), (i = 1)),
        (this.pol = this.genPol(t, e, i, !0)),
        this.pol.hatch());
    }
    erase(t, e, i) {
      if (j.isActive) {
        this.origin && ((t = this.origin[0]), (e = this.origin[1]), (i = 1)),
          (this.pol = this.genPol(t, e, i, !0)),
          y.masks[2].push(),
          y.masks[2].noStroke();
        let n = s.color(j.c);
        n.setAlpha(j.a), y.masks[2].fill(n), y.masks[2].beginShape();
        for (let t of this.pol.vertices) y.masks[2].vertex(t.x, t.y);
        y.masks[2].endShape(s.CLOSE), y.masks[2].pop();
      }
    }
    show(t, e, i = 1) {
      this.draw(t, e, i),
        this.fill(t, e, i),
        this.hatch(t, e, i),
        this.erase(t, e, i);
    }
  }
  let L,
    H = !1;
  function O(t = 0) {
    (L = d.constrain(t, 0, 1)), (H = []);
  }
  function q(t, e, i) {
    H.push([t, e, i]);
  }
  function N(t) {
    c(),
      t === s.CLOSE && (H.push(H[0]), H.push(H[1])),
      (0 != L || z.isActive ? W(H, L, t === s.CLOSE) : new R(H)).show(),
      (H = !1);
  }
  function W(t, e = 0.5, i = !1) {
    let s = new G(0 === e ? 'segments' : 'curve');
    if (t && t.length > 0) {
      let n,
        o,
        r,
        a = 0;
      for (let h = 0; h < t.length - 1; h++)
        if (e > 0 && h < t.length - 2) {
          let l = t[h],
            c = t[h + 1],
            m = t[h + 2],
            f = d.dist(l[0], l[1], c[0], c[1]),
            v = d.dist(c[0], c[1], m[0], m[1]),
            g = p(l[0], l[1], c[0], c[1]),
            x = p(c[0], c[1], m[0], m[1]),
            y = e * Math.min(Math.min(f, v), 0.5 * Math.min(f, v)),
            w = Math.max(f, v),
            k = f - y,
            _ = v - y;
          if (Math.floor(g) === Math.floor(x)) {
            let e = i && 0 === h ? 0 : f - a,
              m = i ? (0 === h ? 0 : v - r) : v;
            s.addSegment(g, e, l[2], !0),
              h === t.length - 3 && s.addSegment(x, m, c[2], !0),
              (a = 0),
              0 === h && ((n = f), (r = y), (o = t[1]), (a = 0));
          } else {
            let e = { x: c[0] - y * d.cos(-g), y: c[1] - y * d.sin(-g) },
              m = { x: e.x + w * d.cos(90 - g), y: e.y + w * d.sin(90 - g) },
              p = { x: c[0] + y * d.cos(-x), y: c[1] + y * d.sin(-x) },
              f = u(
                e,
                m,
                p,
                { x: p.x + w * d.cos(90 - x), y: p.y + w * d.sin(90 - x) },
                !0
              ),
              v = d.dist(e.x, e.y, f.x, f.y),
              z = d.dist(e.x, e.y, p.x, p.y) / 2,
              b = 2 * Math.asin(z / v) * (180 / Math.PI),
              A = (2 * Math.PI * v * b) / 360,
              M = i && 0 === h ? 0 : k - a,
              C = h === t.length - 3 ? (i ? n - y : _) : 0;
            s.addSegment(g, M, l[2], !0),
              s.addSegment(g, isNaN(A) ? 0 : A, l[2], !0),
              s.addSegment(x, C, c[2], !0),
              (a = y),
              0 === h && ((n = k), (r = y), (o = [e.x, e.y]));
          }
          h == t.length - 3 && s.endPlot(x, c[2], !0);
        } else if (0 === e) {
          0 === h && i && t.pop();
          let e = t[h],
            n = t[h + 1],
            o = d.dist(e[0], e[1], n[0], n[1]),
            r = p(e[0], e[1], n[0], n[1]);
          s.addSegment(r, o, 1, !0), h == t.length - 2 && s.endPlot(r, 1, !0);
        }
      s.origin = i && 0 !== e ? o : t[0];
    }
    return s;
  }
  const j = {};
  function U(t, e, i, n) {
    c(),
      (J.opacity = arguments.length < 4 ? (arguments.length < 3 ? e : 1) : n),
      (J.color = arguments.length < 3 ? s.color(t) : s.color(t, e, i)),
      (J.isActive = !0);
  }
  function K(t, e = 'out') {
    c(), (J.bleed_strength = d.constrain(t, 0, 0.6)), (J.direction = e);
  }
  function $(t = 0.4, e = 0.4) {
    c(),
      (J.texture_strength = d.constrain(t, 0, 1)),
      (J.border_strength = d.constrain(e, 0, 1));
  }
  const J = {
    isActive: !1,
    isAnimated: !1,
    color: '#002185',
    opacity: 80,
    bleed_strength: 0.07,
    texture_strength: 0.4,
    border_strength: 0.4,
    fill(t) {
      (this.polygon = t), (this.v = [...t.vertices]);
      const e = this.v.length * d.random(0.4);
      J.m = this.v.map((t, i) => {
        let s = d.random(0.8, 1.2) * this.bleed_strength;
        return i < e ? d.constrain(2 * s, 0, 0.9) : s;
      });
      let i = d.randInt(0, this.v.length);
      if (J.light_source)
        for (let t = 0; t < this.v.length; t++)
          d.dist(this.v[t].x, this.v[t].y, J.light_source.x, J.light_source.y) <
            d.dist(
              this.v[i].x,
              this.v[i].y,
              J.light_source.x,
              J.light_source.y
            ) && (i = t);
      (this.v = [...this.v.slice(i), ...this.v.slice(0, i)]),
        new X(this.v, this.m, this.calcCenter(), [], !0).fill(
          this.color,
          Math.floor(d.map(this.opacity, 0, 155, 0, 20, !0)),
          this.texture_strength
        );
    },
    calcCenter() {
      let t = 0,
        e = 0;
      for (let i = 0; i < this.v.length; ++i)
        (t += this.v[i].x), (e += this.v[i].y);
      return (t /= this.v.length), (e /= this.v.length), { x: t, y: e };
    },
  };
  function Q(t, e, i, s, n) {
    let o = d.cos(n),
      r = d.sin(n);
    return {
      x: o * (i - t) + r * (s - e) + t,
      y: o * (s - e) - r * (i - t) + e,
    };
  }
  class X {
    constructor(t, e, i, s, n = !1) {
      (this.pol = new R(t, !0)),
        (this.v = t),
        (this.dir = s),
        (this.m = e),
        (this.midP = i),
        (this.size = -1 / 0);
      for (let t of this.v) {
        let e = d.dist(this.midP.x, this.midP.y, t.x, t.y);
        e > this.size && (this.size = e);
      }
      if (n)
        for (let t = 0; t < this.v.length; t++) {
          const e = this.v[t],
            i = this.v[(t + 1) % this.v.length],
            s = { x: i.x - e.x, y: i.y - e.y },
            n = Q(0, 0, s.x, s.y, 90);
          let o = {
            point1: { x: e.x + s.x / 2, y: e.y + s.y / 2 },
            point2: { x: e.x + s.x / 2 + n.x, y: e.y + s.y / 2 + n.y },
          };
          const r = (t, e, i) =>
            (e.x - t.x) * (i.y - t.y) - (e.y - t.y) * (i.x - t.x) > 0.01;
          let a = 0;
          for (let t of J.polygon.intersect(o)) r(e, i, t) && a++;
          this.dir[t] = a % 2 == 0;
        }
    }
    trim(t) {
      let e = [...this.v],
        i = [...this.m],
        s = [...this.dir];
      if (this.v.length > 10 && t >= 0.2) {
        let n = ~~((1 - t) * this.v.length),
          o = ~~this.v.length / 2 - ~~n / 2;
        e.splice(o, n), i.splice(o, n), s.splice(o, n);
      }
      return { v: e, m: i, dir: s };
    }
    grow(t, e = !1) {
      const i = [],
        s = [],
        n = [];
      let o = this.trim(t);
      const r = e ? -0.5 : 1,
        a = (t) => t + 0.1 * (d.gaussian(0.5, 0.1) - 0.5);
      for (let e = 0; e < o.v.length; e++) {
        const h = o.v[e],
          l = o.v[(e + 1) % o.v.length];
        let c = 0.1 === t ? (J.bleed_strength <= 0.1 ? 0.25 : 0.75) : o.m[e];
        (c *= r), i.push(h), s.push(a(c));
        let m = { x: l.x - h.x, y: l.y - h.y },
          u = o.dir[e],
          p = 'out' == J.direction ? -90 : 90,
          f = (u ? p : -p) + 45 * d.gaussian(0, 0.4),
          v = d.constrain(d.gaussian(0.5, 0.2), 0.1, 0.9),
          g = { x: h.x + m.x * v, y: h.y + m.y * v },
          x = d.gaussian(0.5, 0.2) * d.random(0.6, 1.4) * c,
          y = Q(0, 0, m.x, m.y, f);
        (g.x += y.x * x),
          (g.y += y.y * x),
          i.push(g),
          s.push(a(c)),
          n.push(u, u);
      }
      return new X(i, s, this.midP, n);
    }
    fill(t, e, i) {
      let n = d.map(J.bleed_strength, 0, 0.15, 0.6, 1, !0);
      const o = 24 * n,
        r = e / 5 + (i * e) / 6,
        a = e / 4 + (i * e) / 3,
        h = e / 7 + (i * e) / 3,
        l = e / 5,
        c = 3 * i;
      (y.watercolor = !0),
        v.trans(),
        y.blend(t, !1, !1, !0),
        y.masks[0].push(),
        y.masks[0].noStroke(),
        y.masks[0].translate(
          v.translation[0] + s.width / 2,
          v.translation[1] + s.height / 2
        ),
        y.masks[0].rotate(v.rotation),
        y.masks[0].scale(g);
      let m = this.grow(),
        u = m.grow().grow(0.9),
        p = u.grow(0.75),
        f = this.grow(0.6);
      for (let t = 0; t < o; t++)
        (t !== Math.floor(o / 4) &&
          t !== Math.floor(o / 2) &&
          t !== Math.floor((3 * o) / 4)) ||
          ((m = m.grow()),
          (1 !== n && t !== Math.floor(o / 2)) ||
            ((u = u.grow(0.75)), (p = p.grow(0.75)), (f = f.grow(0.1, !0)))),
          m.grow().layer(t, l),
          f.grow(0.1, !0).grow(0.1).layer(t, h, !1),
          u.grow(0.1).grow(0.1).layer(t, a, !1),
          p.grow(0.8).grow(0.1).layer(t, r, !1),
          0 !== c && m.erase(c, e);
      y.masks[0].pop();
    }
    layer(t, e, i = !0) {
      y.masks[0].fill(255, 0, 0, e),
        i
          ? (y.masks[0].stroke(255, 0, 0, 0.5 + 1.5 * J.border_strength),
            y.masks[0].strokeWeight(d.map(t, 0, 24, 6, 0.5)))
          : y.masks[0].noStroke(),
        y.masks[0].beginShape();
      for (let t of this.v) y.masks[0].vertex(t.x, t.y);
      y.masks[0].endShape(s.CLOSE);
    }
    erase(t, e) {
      const i = d.random(130, 200),
        s = this.size / 2,
        n = 0.025 * this.size,
        o = 0.19 * this.size;
      y.masks[0].erase(3.5 * t - d.map(e, 80, 120, 0.3, 1, !0), 0);
      for (let t = 0; t < i; t++) {
        const t = this.midP.x + d.gaussian(0, s),
          e = this.midP.y + d.gaussian(0, s),
          i = d.random(n, o);
        y.masks[0].circle(t, e, i);
      }
      y.masks[0].noErase();
    }
  }
  const Y = [
      'weight',
      'vibration',
      'definition',
      'quality',
      'opacity',
      'spacing',
      'pressure',
      'type',
      'tip',
      'rotate',
    ],
    Z = [
      [
        'pen',
        [
          0.35,
          0.12,
          0.5,
          8,
          200,
          0.3,
          { curve: [0.15, 0.2], min_max: [1.4, 0.9] },
        ],
      ],
      [
        'rotring',
        [
          0.2,
          0.05,
          1,
          3,
          250,
          0.15,
          { curve: [0.05, 0.2], min_max: [1.7, 0.8] },
        ],
      ],
      [
        '2B',
        [
          0.35,
          0.5,
          0.1,
          8,
          180,
          0.2,
          { curve: [0.15, 0.2], min_max: [1.3, 1] },
        ],
      ],
      [
        'HB',
        [
          0.3,
          0.5,
          0.4,
          4,
          180,
          0.25,
          { curve: [0.15, 0.2], min_max: [1.2, 0.9] },
        ],
      ],
      [
        '2H',
        [
          0.2,
          0.4,
          0.3,
          2,
          150,
          0.2,
          { curve: [0.15, 0.2], min_max: [1.2, 0.9] },
        ],
      ],
      [
        'cpencil',
        [
          0.4,
          0.6,
          0.8,
          7,
          120,
          0.15,
          { curve: [0.15, 0.2], min_max: [0.95, 1.2] },
        ],
      ],
      [
        'charcoal',
        [
          0.5,
          2,
          0.8,
          300,
          110,
          0.06,
          { curve: [0.15, 0.2], min_max: [1.3, 0.8] },
        ],
      ],
      [
        'hatch_brush',
        [0.2, 0.4, 0.3, 2, 150, 0.15, { curve: [0.5, 0.7], min_max: [1, 1.5] }],
      ],
      [
        'spray',
        [
          0.3,
          12,
          15,
          40,
          80,
          0.65,
          { curve: [0, 0.1], min_max: [0.15, 1.2] },
          'spray',
        ],
      ],
      [
        'marker',
        [
          2.5,
          0.12,
          null,
          null,
          25,
          0.4,
          { curve: [0.35, 0.25], min_max: [1.5, 1] },
          'marker',
        ],
      ],
      [
        'marker2',
        [
          2.5,
          0.12,
          null,
          null,
          25,
          0.35,
          { curve: [0.35, 0.25], min_max: [1.3, 0.95] },
          'custom',
          function (t) {
            let e = M;
            t.rect(-1.5 * e, -1.5 * e, 3 * e, 3 * e),
              t.rect(1 * e, 1 * e, 1 * e, 1 * e);
          },
          'natural',
        ],
      ],
    ];
  for (let t of Z) {
    let e = {};
    for (let i = 0; i < t[1].length; i++) e[Y[i]] = t[1][i];
    S(t[0], e);
  }
  (t.Plot = G),
    (t.Polygon = R),
    (t.Position = b),
    (t.add = S),
    (t.addField = _),
    (t.arc = function (t, e, i, s, n) {
      c();
      let o = new G('curve'),
        r = 270 - d.toDegrees(s),
        a = 270 - d.toDegrees(n),
        h = d.toDegrees(n - s),
        l = (Math.PI * i * h) / 180;
      o.addSegment(r, l, 1, !0),
        o.endPlot(a, 1, !0),
        o.draw(t + i * d.cos(-r - 90), e + i * d.sin(-r - 90), 1);
    }),
    (t.beginShape = O),
    (t.beginStroke = function (t, e, i) {
      (L = [e, i]), (H = new G(t));
    }),
    (t.bleed = K),
    (t.box = function () {
      return Array.from(C.list.keys());
    }),
    (t.circle = function (t, e, i, s = !1) {
      c();
      let n = new G('curve'),
        o = (Math.PI * i) / 2,
        r = d.random(0, 360),
        a = () => (s ? d.random(-1, 1) : 0);
      n.addSegment(0 + r + a(), o + a(), 1, !0),
        n.addSegment(-90 + r + a(), o + a(), 1, !0),
        n.addSegment(-180 + r + a(), o + a(), 1, !0),
        n.addSegment(-270 + r + a(), o + a(), 1, !0);
      let h = s ? d.randInt(-5, 5) : 0;
      s && n.addSegment(0 + r, h * (Math.PI / 180) * i, !0),
        n.endPlot(h + r, 1, !0);
      let l = [t - i * d.sin(r), e - i * d.cos(-r)];
      n.show(l[0], l[1], 1);
    }),
    (t.clip = function (t) {
      C.cr = t;
    }),
    (t.colorCache = function (t = !0) {
      y.isCaching = t;
    }),
    (t.endShape = N),
    (t.endStroke = function (t, e) {
      H.endPlot(t, e), H.draw(L[0], L[1], 1), (H = !1);
    }),
    (t.erase = function (t = 'white', e = 255) {
      (j.isActive = !0), (j.c = t), (j.a = e);
    }),
    (t.field = function (t) {
      c(), (z.isActive = !0), (z.current = t);
    }),
    (t.fill = U),
    (t.fillAnimatedMode = function (t) {
      J.isAnimated = t;
    }),
    (t.fillTexture = $),
    (t.flowLine = function (t, e, i, s) {
      c(),
        C.initializeDrawingState(t, e, i, !0, !1),
        C.draw(d.toDegrees(s), !1);
    }),
    (t.gravity = function (t, e) {
      c(), (J.light_source = { x: t, y: e });
    }),
    (t.hatch = E),
    (t.hatchArray = V),
    (t.instance = function (t) {
      (r = !0), (a = t), (s = t), k(t);
    }),
    (t.line = D),
    (t.listFields = function () {
      return Array.from(z.list.keys());
    }),
    (t.load = h),
    (t.noClip = function () {
      C.cr = null;
    }),
    (t.noErase = function () {
      j.isActive = !1;
    }),
    (t.noField = function () {
      c(), (z.isActive = !1);
    }),
    (t.noFill = function () {
      J.isActive = !1;
    }),
    (t.noGravity = function () {
      J.light_source = !1;
    }),
    (t.noHatch = function () {
      (F.isActive = !1), (F.hatchingBrush = !1);
    }),
    (t.noStroke = function () {
      C.isActive = !1;
    }),
    (t.pick = I),
    (t.plot = T),
    (t.polygon = function (t) {
      new R(t).show();
    }),
    (t.pop = function () {
      (z.isActive = f.field.isActive),
        (z.current = f.field.current),
        (C.isActive = f.stroke.isActive),
        (C.name = f.stroke.name),
        (C.c = f.stroke.color),
        (C.w = f.stroke.weight),
        (C.cr = f.stroke.clip),
        (F.isActive = f.hatch.isActive),
        (F.hatchingParams = f.hatch.hatchingParams),
        (F.hatchingBrush = f.hatch.hatchingBrush),
        (J.isActive = f.fill.isActive),
        (J.color = f.fill.color),
        (J.opacity = f.fill.opacity),
        (J.bleed_strength = f.fill.bleed_strength),
        (J.texture_strength = f.fill.texture_strength),
        (J.border_strength = f.fill.border_strength),
        (v.rotation = f.others.rotate);
    }),
    (t.preload = function () {
      B.load();
    }),
    (t.push = function () {
      (f.field.isActive = z.isActive),
        (f.field.current = z.current),
        (f.stroke.isActive = C.isActive),
        (f.stroke.name = C.name),
        (f.stroke.color = C.c),
        (f.stroke.weight = C.w),
        (f.stroke.clip = C.cr),
        (f.hatch.isActive = F.isActive),
        (f.hatch.hatchingParams = F.hatchingParams),
        (f.hatch.hatchingBrush = F.hatchingBrush),
        (f.fill.isActive = J.isActive),
        (f.fill.color = J.color),
        (f.fill.opacity = J.opacity),
        (f.fill.bleed_strength = J.bleed_strength),
        (f.fill.texture_strength = J.texture_strength),
        (f.fill.border_strength = J.border_strength),
        (f.others.rotate = v.rotation);
    }),
    (t.reBlend = function () {
      y.blend(!1, !0), y.blend(!1, !0, !0);
    }),
    (t.reDraw = w),
    (t.rect = function (t, e, i, n, o = s.CORNER) {
      if ((o == s.CENTER && ((t -= i / 2), (e -= n / 2)), z.isActive))
        O(0), q(t, e), q(t + i, e), q(t + i, e + n), q(t, e + n), N(s.CLOSE);
      else {
        new R([
          [t, e],
          [t + i, e],
          [t + i, e + n],
          [t, e + n],
        ]).show();
      }
    }),
    (t.refreshField = function (t) {
      z.refresh(t);
    }),
    (t.remove = l),
    (t.rotate = function (t = 0) {
      v.rotation = d.toDegrees(t);
    }),
    (t.scale = x),
    (t.scaleBrushes = A),
    (t.seed = function (t) {
      m = new e(t);
    }),
    (t.segment = function (t, e, i) {
      H.addSegment(t, e, i);
    }),
    (t.set = P),
    (t.setHatch = function (t, e = 'black', i = 1) {
      F.hatchingBrush = [t, e, i];
    }),
    (t.spline = function (t, e = 0.5) {
      W(t, e).draw();
    }),
    (t.stroke = function (t, e, i) {
      arguments.length > 0 && (C.c = arguments.length < 2 ? t : [t, e, i]),
        (C.isActive = !0);
    }),
    (t.strokeWeight = function (t) {
      C.w = t;
    }),
    (t.vertex = q);
});
