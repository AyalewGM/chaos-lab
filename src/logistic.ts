export function logistic(x:number,r:number){return r*x*(1-x)}
export function orbit(r:number,x0=.2,n=200){let x=x0;const result=[x];for(let i=0;i<n;i++){x=logistic(x,r);result.push(x)}return result}
export function bifurcation(r:number,burn=300,keep=80){let x=.2137;for(let i=0;i<burn;i++)x=logistic(x,r);const out:number[]=[];for(let i=0;i<keep;i++){x=logistic(x,r);out.push(x)}return out}
export function lyapunov(r:number,x0=.215,burn=400,n=400){let x=x0;for(let i=0;i<burn;i++)x=logistic(x,r);let sum=0;for(let i=0;i<n;i++){x=logistic(x,r);sum+=Math.log(Math.max(1e-14,Math.abs(r*(1-2*x))))}return sum/n}
