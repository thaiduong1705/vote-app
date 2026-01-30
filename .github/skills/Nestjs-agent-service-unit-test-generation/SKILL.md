---
name: nestjs-agent-service-unit-test-generation
description: Guide for an agent to generate NestJS unit test files for a service, colocated under **test** folder of a feature.
---

---

Use this guide when asked to generate **unit tests for an existing NestJS service**.

## Scope

- Generate a unit test file for a service
- Place the test file under `__test__` directory of the feature
- Configure `TestingModule` correctly
- Mock dependencies explicitly

## Assumptions

- Service already exists
- Testing framework is **Jest** (default NestJS)
- Project uses TypeScript
- Paths are relative to `src/`

## Process

1. **Identify inputs**
   - Feature name (e.g., `users`)
   - Service class name (e.g., `UsersService`)
   - Service file path (e.g., `src/users/users.service.ts`)
   - Dependencies to mock (e.g., repositories, external services)

2. **Determine test file location**
   - Folder: `src/<feature>/__test__/`
   - File name: `<feature>.service.spec.ts`

3. **Create testing module**
   - Use `Test.createTestingModule`
   - Register the service under test
   - Provide mocked dependencies using `useValue` or `useFactory`

4. **Write baseline test structure**
   - `describe('<Feature>Service', ...)`
   - Initialize `service` in `beforeEach`
   - Verify service is defined

5. **Generate test cases per public method**
   - Happy path
   - Error / edge case (if applicable)
   - Assert returned value or thrown error

6. **Validate**
   - Ensure imports are correct
   - Ensure mocks match constructor signature
   - Tests should run with `npm test` or `pnpm test`

## Minimal Template

### Service Unit Test

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { <Feature>Service } from '../<feature>.service';

describe('<Feature>Service', () => {
  let service: <Feature>Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        <Feature>Service,
        // {
        //   provide: DependencyToken,
        //   useValue: mockDependency,
        // },
      ],
    }).compile();

    service = module.get<<Feature>Service>(<Feature>Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('methodName', () => {
  //   it('should return expected result', async () => {
  //     const result = await service.methodName();
  //     expect(result).toEqual(expected);
  //   });
  // });
});
```

## Notes

- Do not use real database or network calls.
- Prefer deterministic mocks.
- One spec file per service.
- Keep unit tests isolated; integration tests belong elsewhere.
