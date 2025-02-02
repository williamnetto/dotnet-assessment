import '@testing-library/jest-dom'
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { worker } from './msw/worker';
expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Start worker before all tests
beforeAll(() => { worker.listen() })

//  Close worker after all tests
afterAll(() => {worker.close()})

// Reset handlers after each test `important for test isolation`
afterEach(() => {worker.resetHandlers()})