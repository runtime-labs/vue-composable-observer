# Contributing

Contributions are welcome — bug reports, feature requests, and pull requests.

## Development setup

```bash
pnpm install
pnpm test       # run all tests
pnpm build      # build all packages
pnpm play       # build + start playground
```

## Project structure

- `packages/core` — `@runtime-labs/observer-core`: framework-agnostic runtime tracking engine
- `packages/plugin` — `@runtime-labs/composable-plugin`: build-time transform + Vue DevTools integration
- `playground` — Vite + Vue 3 app for manual testing

## Making changes

1. Fork the repository and create a branch from `main`
2. Run `pnpm install` to install dependencies
3. Make your changes and add tests where applicable
4. Ensure `pnpm test` and `pnpm lint` pass
5. Submit a pull request

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `fix:` bug fixes
- `feat:` new features
- `ci:` CI/CD changes
- `docs:` documentation only
- `chore:` maintenance

## Releases

This project uses [Changesets](https://github.com/changesets/changesets). If your change is user-facing, run `pnpm changeset` and follow the prompts before opening your PR.
