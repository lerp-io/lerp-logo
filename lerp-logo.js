module.exports=function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){var i,a,s,r,o,l,p=function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")};({h:o,Component:a}=n(1)),({Shader:r,Box:i}=n(2)),l=n(3),(s=class e extends a{constructor(){super(...arguments),this.onClick=this.onClick.bind(this),this.draw=this.draw.bind(this)}componentDidMount(){if(this.base.width=this.props.size||50,this.base.height=this.props.size||50,this.box=new i({canvas:this.base,resize:!1,clearColor:[0,0,0,0],uv:[1,1],context:{premultipliedAlpha:!1,antialias:!1,depth:!1}}),this.shader=new r({source:l,uniforms:{iTime:{type:"1f",value:this.props.time},alpha:{type:"1f",value:0},size:{type:"1f",value:this.props.size||50}}}),this.stage={alpha:-4,time:-1*this.props.time},this.state={alpha:this.props.alpha,time:this.props.time},this.box.add(this.shader),!this._anim)return this._anim=!0,this.draw()}onClick(){return p(this,e),this.draw()}draw(){if(p(this,e),this.base&&!(Math.abs(this.stage.time-this.state.time)<.01&&Math.abs(this.stage.alpha-this.state.alpha)<.01))return this.stage.time+=.1*(this.state.time-this.stage.time),this.stage.alpha+=.3*(this.state.alpha-this.stage.alpha),this.shader.uniforms.iTime.value=this.stage.time,this.shader.uniforms.alpha.value=this.stage.alpha,requestAnimationFrame(this.draw),this.box.clear().draw(this.shader)}componentWillUpdate(e){if(e.time!==this.state.time)return this.state.time=e.time,this.draw()}render(e){var t;return this.base&&(this.base.width=e.size||50,this.base.height=e.size||50,this.shader.uniforms.size.value=e.size||50),t={width:e.size||50,height:e.size||50},Object.assign(t,e),o("canvas",t)}}).defaultProps={alpha:1,t:1},e.exports=s},function(e,t){e.exports=require("preact")},function(e,t){e.exports=require("shader-box")},function(e,t){e.exports="precision highp float;\n\nvarying vec2 v_uv;\n\nuniform float iTime;\n\nuniform float size;\n\nuniform float alpha;\n\n\n#define SPEED 0.01\n#define PI 3.141593\n\n\n//signed distance to a 2D triangle by iq : https://www.shadertoy.com/view/XsXSz4\nfloat sdTriangle( in vec2 p0, in vec2 p1, in vec2 p2, in vec2 p ){\n    vec2 e0 = p1 - p0;\n    vec2 e1 = p2 - p1;\n    vec2 e2 = p0 - p2;\n\n    vec2 v0 = p - p0;\n    vec2 v1 = p - p1;\n    vec2 v2 = p - p2;\n\n    vec2 pq0 = v0 - e0*clamp( dot(v0,e0)/dot(e0,e0), 0.0, 1.0 );\n    vec2 pq1 = v1 - e1*clamp( dot(v1,e1)/dot(e1,e1), 0.0, 1.0 );\n    vec2 pq2 = v2 - e2*clamp( dot(v2,e2)/dot(e2,e2), 0.0, 1.0 );\n    \n    float s = sign( e0.x*e2.y - e0.y*e2.x );\n    vec2 d = min( min( vec2( dot( pq0, pq0 ), s*(v0.x*e0.y-v0.y*e0.x) ),\n                       vec2( dot( pq1, pq1 ), s*(v1.x*e1.y-v1.y*e1.x) )),\n                       vec2( dot( pq2, pq2 ), s*(v2.x*e2.y-v2.y*e2.x) ));\n\n    return -sqrt(d.x)*sign(d.y);\n}\n\nfloat pit = PI*2.0/3.0; \n\nfloat a0 = 0.*PI*2.0/3.0;\nfloat a1 = 1.*PI*2.0/3.0; \nfloat a2 = 2.*PI*2.0/3.0;\n\n\nfloat b = 0.01;\nfloat r = 0.2;\n\n\nfloat drawStar(vec2 uv,float t,float bend){\n\n    float angle_offset = mod(sin(t),pit) - bend;\n    vec2 v0 = vec2(cos(a0-angle_offset)*r,sin(a0-angle_offset)*r);\n    vec2 v1 = vec2(cos(a1-angle_offset)*r,sin(a1-angle_offset)*r);\n    vec2 v2 = vec2(cos(a2-angle_offset)*r,sin(a2-angle_offset)*r);\n    return sdTriangle( v0, v1, v2, uv);   \n}\n\nvoid main(){\n    float t = iTime;\n    float rot = sin(t);\n    float alpha = clamp(alpha,0.0001,1.0);\n    vec2 uv = -1.0 * vec2(v_uv-0.5)*0.5/alpha;\n    float dist = pow(length(uv*5.0),.5);\n    float twist = (rot/pit) * 6.0;\n    float bend = dist * twist - twist*.75;\n\n\n    float d = drawStar(uv,t,bend);\n    float col = clamp(d*size*1.6,.0,1.);\n\n    // d = drawStar(uv,t+0.5,bend);\n    // float col2 = clamp(d*size*1.6,.0,1.);\n\n    // d = drawStar(uv,-t*.5,bend);\n    // float col3 = clamp(d*90.0,.0,1.);\n\n\n\n    gl_FragColor = vec4(vec3(0.25),1.0-col);\n}"}]);
//# sourceMappingURL=lerp-logo.js.map