import { afterEach, afterAll, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import { server } from "./src/mocks/server";

beforeAll(() => server.listen())

afterEach(() => {
    cleanup();
    server.resetHandlers()
});

afterAll(() => server.close())