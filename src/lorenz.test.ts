import{describe,it,expect}from'vitest';import{defaults,initial,derivative,rk4,simulate,distance}from'./lorenz';
describe('Lorenz mathematical engine',()=>{
it('computes exact derivatives',()=>expect(derivative({x:1,y:2,z:3},defaults)).toEqual({x:10,y:23,z:-6}));
it('zero step is identity',()=>expect(rk4(initial,0,defaults)).toEqual(initial));
it('RK4 agrees with two half steps',()=>{const one=rk4(initial,.01,defaults),half=rk4(rk4(initial,.005,defaults),.005,defaults);expect(distance(one,half)).toBeLessThan(1e-6)});
it('simulation is deterministic',()=>expect(simulate(initial,defaults,100)).toEqual(simulate(initial,defaults,100)));
it('initially nearby trajectories diverge after sufficient integration',()=>{const a=simulate(initial,defaults,3000),b=simulate({...initial,x:initial.x+.001},defaults,3000);expect(distance(a[a.length-1],b[b.length-1])).toBeGreaterThan(.01)});
it('original initial vector is unchanged',()=>{const before={...initial};simulate(initial,defaults,50);expect(initial).toEqual(before)});
});
