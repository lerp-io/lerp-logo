precision highp float;

varying vec2 v_uv;

uniform float iTime;

uniform float size;

uniform float alpha;


#define SPEED 0.01
#define PI 3.141593


//signed distance to a 2D triangle by iq : https://www.shadertoy.com/view/XsXSz4
float sdTriangle( in vec2 p0, in vec2 p1, in vec2 p2, in vec2 p ){
    vec2 e0 = p1 - p0;
    vec2 e1 = p2 - p1;
    vec2 e2 = p0 - p2;

    vec2 v0 = p - p0;
    vec2 v1 = p - p1;
    vec2 v2 = p - p2;

    vec2 pq0 = v0 - e0*clamp( dot(v0,e0)/dot(e0,e0), 0.0, 1.0 );
    vec2 pq1 = v1 - e1*clamp( dot(v1,e1)/dot(e1,e1), 0.0, 1.0 );
    vec2 pq2 = v2 - e2*clamp( dot(v2,e2)/dot(e2,e2), 0.0, 1.0 );
    
    float s = sign( e0.x*e2.y - e0.y*e2.x );
    vec2 d = min( min( vec2( dot( pq0, pq0 ), s*(v0.x*e0.y-v0.y*e0.x) ),
                       vec2( dot( pq1, pq1 ), s*(v1.x*e1.y-v1.y*e1.x) )),
                       vec2( dot( pq2, pq2 ), s*(v2.x*e2.y-v2.y*e2.x) ));

    return -sqrt(d.x)*sign(d.y);
}

float pit = PI*2.0/3.0; 

float a0 = 0.*PI*2.0/3.0;
float a1 = 1.*PI*2.0/3.0; 
float a2 = 2.*PI*2.0/3.0;


float b = 0.01;
float r = 0.2;


float drawStar(vec2 uv,float t,float bend){

    float angle_offset = mod(sin(t),pit) - bend;
    vec2 v0 = vec2(cos(a0-angle_offset)*r,sin(a0-angle_offset)*r);
    vec2 v1 = vec2(cos(a1-angle_offset)*r,sin(a1-angle_offset)*r);
    vec2 v2 = vec2(cos(a2-angle_offset)*r,sin(a2-angle_offset)*r);
    return sdTriangle( v0, v1, v2, uv);   
}

void main(){
    float t = iTime;
    float rot = sin(t);
    float alpha = clamp(alpha,0.0001,1.0);
    vec2 uv = -1.0 * vec2(v_uv-0.5)*0.5/alpha;
    float dist = pow(length(uv*5.0),.5);
    float twist = (rot/pit) * 6.0;
    float bend = dist * twist - twist*.75;


    float d = drawStar(uv,t,bend);
    float col = clamp(d*size*1.6,.0,1.);

    // d = drawStar(uv,t+0.5,bend);
    // float col2 = clamp(d*size*1.6,.0,1.);

    // d = drawStar(uv,-t*.5,bend);
    // float col3 = clamp(d*90.0,.0,1.);



    gl_FragColor = vec4(vec3(0.25),1.0-col);
}