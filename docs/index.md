---
layout: home

hero:
  name: Vue Composable Observer
  text: Debug composables at runtime
  tagline: Visualize composable relationships, component ownership, reactive state and dependency chains — directly inside Vue DevTools.
  image:
    src: /demo.gif
    alt: Vue Composable Observer Demo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/runtime-labs/vue-composable-observer

features:
  - icon: 🔍
    title: Runtime inspection
    details: See every composable instance as it's created, updated and destroyed — without touching your source code.
  - icon: 🌳
    title: Dependency graph
    details: Understand which composables depend on each other and visualize the full nesting hierarchy.
  - icon: 📦
    title: Component ownership
    details: Know exactly which component is responsible for each composable instance.
  - icon: ⚡
    title: Reactive state tracking
    details: Watch reactive state change in real time. Every ref and reactive object is tracked automatically.
  - icon: 🛠
    title: Vue DevTools integration
    details: Three dedicated inspectors — Runtime, Component, and Flat — plus a Composables group injected straight into the standard Components panel.
  - icon: 🧹
    title: Opt-out in production
    details: Conditionally register the Vue plugin behind import.meta.env.DEV to skip tracking in production builds.
---
