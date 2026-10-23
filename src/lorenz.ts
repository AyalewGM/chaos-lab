export type Vector={x:number;y:number;z:number};
export type Parameters={sigma:number;rho:number;beta:number};
export const defaults:Parameters={sigma:10,rho:28,beta:8/3};
export const initial:Vector={x:1,y:1,z:1};
export function derivative(v:Vector,p:Parameters):Vector{return{x:p.sigma*(v.y-v.x),y:v.x*(p.rho-v.z)-v.y,z:v.x*v.y-p.beta*v.z}}
export function add(a:Vector,b:Vector,k:number):Vector{return{x:a.x+k*b.x,y:a.y+k*b.y,z:a.z+k*b.z}}
export function rk4(v:Vector,dt:number,p:Parameters):Vector{const k1=derivative(v,p),k2=derivative(add(v,k1,dt/2),p),k3=derivative(add(v,k2,dt/2),p),k4=derivative(add(v,k3,dt),p);return{x:v.x+dt*(k1.x+2*k2.x+2*k3.x+k4.x)/6,y:v.y+dt*(k1.y+2*k2.y+2*k3.y+k4.y)/6,z:v.z+dt*(k1.z+2*k2.z+2*k3.z+k4.z)/6}}
export function distance(a:Vector,b:Vector){return Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z)}
export function simulate(v:Vector,p:Parameters,steps:number,dt=.01){let current={...v};const result=[current];for(let i=0;i<steps;i++){current=rk4(current,dt,p);if(!Number.isFinite(current.x+current.y+current.z))throw Error('Integrator diverged');result.push(current)}return result}
