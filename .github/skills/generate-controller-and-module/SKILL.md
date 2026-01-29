---
name: nestjs-agent-controller-module-generation
description: Guide for an agent to generate NestJS controller and module files, and import the module into a target module.
---

---

Use this guide when asked to scaffold a **NestJS controller and module**, then wire the module into an existing module.

## Scope

- Generate a controller file
- Generate a module file
- Register the controller in the module
- Import the generated module into a specified target module

## Assumptions

- Project uses standard NestJS structure
- TypeScript is enabled
- Paths are relative to `src/`

## Process

1. **Identify inputs**
   - Feature name (e.g., `users`)
   - HTTP route prefix (e.g., `/users`)
   - Target module to import into (e.g., `app.module.ts`)
   - Optional: service dependency

2. **Generate controller file**
   - Path: `src/<feature>/<feature>.controller.ts`
   - Responsibilities:
     - Define `@Controller('<route>')`
     - Expose basic handlers (e.g., `GET /health`)
     - Inject service if provided

3. **Generate module file**
   - Path: `src/<feature>/<feature>.module.ts`
   - Responsibilities:
     - Declare `@Module({ controllers, providers })`
     - Export providers if needed by other modules

4. **Wire controller to module**
   - Ensure the controller is listed in `controllers: []`
   - Ensure required providers are listed in `providers: []`

5. **Import module into target module**
   - Open the specified target module file
   - Add the generated module to `imports: []`
   - Preserve existing imports and formatting

6. **Validate**
   - Ensure all paths are correct
   - Ensure there are no circular imports
   - Project should compile without errors

## Minimal Templates

### Controller

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('<route>')
export class <Feature>Controller {
  @Get('health')
  health() {
    return { status: 'ok' };
  }
}
```

### Module

```ts
import { Module } from '@nestjs/common';
import { <Feature>Controller } from './<feature>.controller';

@Module({
  controllers: [<Feature>Controller],
  providers: [<Feature>Service], // also add providers that the service using
  exports: [<Feature>Service],
})
export class <Feature>Module {}
```

### Import into Target Module

```ts
import { <Feature>Module } from './<feature>/<feature>.module';

@Module({
  imports: [<Feature>Module],
})
export class AppModule {}
```

## Notes

- Follow existing project naming conventions.
- Do not remove unrelated imports or modules.
- Prefer explicit, minimal boilerplate.
