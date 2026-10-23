export type State={a:number;b:number;va:number;vb:number};
export type Params={m1:number;m2:number;l1:number;l2:number;g:number};
export const params:Params={m1:1,m2:1,l1:1,l2:1,g:9.81};
export const initialState:State={a:2.2,b:2.5,va:0,vb:0};
export function rates(s:State,p:Params):State{const{a,b,va,vb}=s,{m1,m2,l1,l2,g}=p,d=a-b,den=2*m1+m2-m2*Math.cos(2*d);return{a:va,b:vb,va:(-g*(2*m1+m2)*Math.sin(a)-m2*g*Math.sin(a-2*b)-2*Math.sin(d)*m2*(vb*vb*l2+va*va*l1*Math.cos(d)))/(l1*den),vb:2*Math.sin(d)*(va*va*l1*(m1+m2)+g*(m1+m2)*Math.cos(a)+vb*vb*l2*m2*Math.cos(d))/(l2*den)}}
const add=(s:State,k:State,h:number):State=>({a:s.a+h*k.a,b:s.b+h*k.b,va:s.va+h*k.va,vb:s.vb+h*k.vb});
export function step(s:State,p:Params,h=.005):State{const k1=rates(s,p),k2=rates(add(s,k1,h/2),p),k3=rates(add(s,k2,h/2),p),k4=rates(add(s,k3,h),p);return{a:s.a+h*(k1.a+2*k2.a+2*k3.a+k4.a)/6,b:s.b+h*(k1.b+2*k2.b+2*k3.b+k4.b)/6,va:s.va+h*(k1.va+2*k2.va+2*k3.va+k4.va)/6,vb:s.vb+h*(k1.vb+2*k2.vb+2*k3.vb+k4.vb)/6}}
export function points(s:State,p:Params){const x1=p.l1*Math.sin(s.a),y1=p.l1*Math.cos(s.a);return{x1,y1,x2:x1+p.l2*Math.sin(s.b),y2:y1+p.l2*Math.cos(s.b)}}
export function energy(s:State,p:Params){const{m1,m2,l1,l2,g}=p,{a,b,va,vb}=s;return .5*(m1+m2)*l1*l1*va*va+.5*m2*l2*l2*vb*vb+m2*l1*l2*va*vb*Math.cos(a-b)-(m1+m2)*g*l1*Math.cos(a)-m2*g*l2*Math.cos(b)}
