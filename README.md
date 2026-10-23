# Chaos Theory Laboratory

**Discover how deterministic equations can lead to unpredictable long-term behavior.** This is a standalone React + TypeScript teaching application in the series that includes Game of Life, Mandelbrot Explorer, Optimization Playground, and Neural Network Playground.

## The Lorenz system

Edward Lorenz introduced a simplified mathematical model of atmospheric convection in 1963:

$$
\begin{aligned}
\frac{dx}{dt}&=\sigma(y-x),\\
\frac{dy}{dt}&=x(\rho-z)-y,\\
\frac{dz}{dt}&=xy-\beta z.
\end{aligned}
$$

The classical parameter values are $\sigma=10$, $\rho=28$, and $\beta=8/3$. The variables form a **three-dimensional trajectory** through state space. The display shows a **two-dimensional projection**, not a literal 3D scene.

### Determinism versus predictability

The equations contain no random terms. Given an exact initial state, the future is determined. Nevertheless, a tiny measurement error in the initial state can eventually produce a radically different predicted trajectory. This is **sensitive dependence on initial conditions**, popularly known as the **butterfly effect**.

For two trajectories $\mathbf{x}(t)$ and $\tilde{\mathbf{x}}(t)$, the displayed separation is

$$
d(t)=\|\mathbf{x}(t)-\tilde{\mathbf{x}}(t)\|_2.
$$

In a chaotic regime, small perturbations frequently grow approximately exponentially for an initial interval, associated with a positive largest Lyapunov exponent. This is not a claim that every parameter choice or every pair of states separates exponentially forever.

### Numerical integration

A computer approximates solutions of the differential equations. The simulation uses the classical **fourth-order Runge–Kutta** method with time step $h=0.01$:

$$
\begin{aligned}
k_1&=F(\mathbf{x}_n),\\
k_2&=F(\mathbf{x}_n+\tfrac{h}{2}k_1),\\
k_3&=F(\mathbf{x}_n+\tfrac{h}{2}k_2),\\
k_4&=F(\mathbf{x}_n+hk_3),\\
\mathbf{x}_{n+1}&=\mathbf{x}_n+\frac{h}{6}(k_1+2k_2+2k_3+k_4).
\end{aligned}
$$

Numerical roundoff and integration error matter especially over long simulation times, so the pictures are illustrations of the model, not exact trajectories.

## Interactive experiments

- Compare **two nearby initial conditions**, shown in mint and violet.
- Adjust $\sigma$, $\rho$, and $\beta$ to explore different regimes.
- Change the initial perturbation $\Delta x$.
- Switch between XY, XZ, and YZ projections.
- Play, pause, step and reset the simulation.
- Observe the Euclidean separation of the two simulated states.

### Guided questions

1. How long does it take for initial states separated by $10^{-6}$ to visibly diverge?
2. What changes when you increase the starting perturbation to $10^{-2}$?
3. Do all parameter choices produce the familiar butterfly-shaped attractor?
4. Why can't we reliably forecast arbitrarily far into the future simply by measuring more precisely?
5. How might the results change with a smaller numerical integration step?

## Why chaos theory still matters

Chaos theory remains important in **weather forecasting**, **nonlinear control**, **orbital mechanics**, **fluid dynamics**, and the theory of numerical simulations. It explains a fundamental limit: even with known deterministic laws, uncertainty in measurements can make long-range predictions unreliable. It also helps distinguish chaotic dynamics from randomness.

The Lorenz model is a simplified dynamical system; it is **not** a complete numerical weather prediction model.

## Running locally

Requires recent Node.js 20+ or 22+.

```bash
npm install
npm test
npm run dev
npm run build
```

The GitHub Actions workflow runs tests and builds the application before deploying from `main`. Set **Settings → Pages → Source → GitHub Actions**. Vite uses the production base `/chaos-lab/`.

## Further reading

- [Lorenz attractor — Encyclopedia of Mathematics](https://encyclopediaofmath.org/wiki/Lorenz_attractor)
- [Chaos theory — Scholarpedia](http://www.scholarpedia.org/article/Chaos)
- Edward Lorenz, *Deterministic Nonperiodic Flow*, Journal of the Atmospheric Sciences (1963), DOI: [10.1175/1520-0469(1963)020<0130:DNF>2.0.CO;2](https://doi.org/10.1175/1520-0469(1963)020%3C0130:DNF%3E2.0.CO;2)

## Scope

Initial release: Lorenz differential equations and butterfly-effect comparison. Potential future modules: double pendulum, logistic-map bifurcation diagrams, Lyapunov-exponent estimation and 3D WebGL scenes.

## Additional interactive modules

### Double pendulum

Two point masses attached to massless rods provide a classic nonlinear mechanical system. For rod lengths $l_1,l_2$, masses $m_1,m_2$, and angles $\theta_1,\theta_2$, the kinetic and gravitational potential energies can be written as

$$
T=\tfrac12(m_1+m_2)l_1^2\dot\theta_1^2+\tfrac12m_2l_2^2\dot\theta_2^2 +m_2l_1l_2\dot\theta_1\dot\theta_2\cos(\theta_1-\theta_2),
$$

$$
V=-(m_1+m_2)gl_1\cos\theta_1-m_2gl_2\cos\theta_2.
$$

The Euler–Lagrange equations derived from $L=T-V$ determine the coupled angular accelerations. The simulator integrates them with RK4, compares two slightly different initial angles, and displays mechanical energy as a numerical accuracy diagnostic. It assumes ideal, frictionless joints; long-term trajectory accuracy is limited by both chaotic sensitivity and finite time steps.

### Logistic map and bifurcation

The logistic map is a minimal example of how repeated deterministic updates can produce period doubling and chaos:

$$
x_{n+1}=r x_n(1-x_n), \qquad 0\leq x_n\leq1,\quad 0\leq r\leq4.
$$

The bifurcation visualization sweeps $r$ from $2.5$ to $4$, discards a transient and plots subsequent iterations. A finite-time Lyapunov exponent estimates average sensitivity:

$$
\lambda\approx\frac1N\sum_{k=1}^{N}\log\left|r(1-2x_k)\right|.
$$

Explore how a stable point changes into cycles and then chaotic regimes, and how periodic windows can reappear inside chaos. Positive finite-time values suggest sensitive dependence, but estimates depend on numerical and sampling choices.

**New experiments:** Compare two nearby double-pendulum starts, inspect approximate energy conservation, vary the logistic growth parameter, and identify periodic windows within the bifurcation diagram.
