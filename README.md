
# Initialize the Project

Run first:

```bash
npm init
```

# Install Dependencies

Install:

```bash
npm install express sharp
```

In `dependencies`:

- `express`
- `sharp`

# Install Dev Dependencies

Install:

```bash
npm install --save-dev typescript ts-node jasmine eslint prettier supertest
```

In `devDependencies`:

- `typescript`
- `ts-node`
- `jasmine`
- `eslint`
- `prettier`
- `supertest`

# Why Add Type Definitions?

This project uses TypeScript, so the JavaScript packages you install also need type definitions.

Install:

```bash
npm install --save-dev @types/node @types/express @types/jasmine @types/supertest
```

These definitions let TypeScript understand the packages used in the project.

- `@types/express`
- `@types/node`
- `@types/jasmine`
- `@types/supertest`

# Initialize TypeScript

Run:

```bash
npx tsc --init
```

After that, configure the `tsconfig.json` file with the project settings.
