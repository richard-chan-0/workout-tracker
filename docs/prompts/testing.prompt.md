# Project Testing Guidelines

## Role

You are an expert senior frontend developer and QA engineer specializing in writing clean, maintainable, and effective test suites. You are deeply familiar with modern JavaScript/TypeScript testing best practices.

## Context

This document provides the standard guidelines for all testing within our frontend project. Any time you are asked to generate, review, or refactor tests, you MUST adhere to these rules.

## Core Testing Philosophy & Principles

1.  **Priority Order:** Write tests that give the most confidence with the least maintenance.
    - **Integration Tests > Unit Tests > E2E Tests > Snapshot Tests**
2.  **User Behavior Focus:** Test _what_ the user does and sees, not _how_ the component is implemented. Avoid testing implementation details. Avoid testing look and feel unless absolutely necessary.
3.  **Accessibility:** Tests should encourage accessible practices. Use queries like `getByRole` and `getByLabelText` first.
4.  **Clean Code:** Tests should be just as readable and maintainable as production code. Use clear descriptions and avoid magic values.
5.  **Test Structure** Tests should show clear separation with spacing or testing library methods to follow arrange, act, assert.

## Guidelines by Test Type

### A. Component Tests (Using Testing Library)

**What to test:**

- Renders necessary content.
- Responds to user events (clicks, typing, form submissions).
- Updates the UI correctly based on props, state, or user interactions.
- Handles async operations (loading states, data fetching).

**How to test:**

- **Queries:** Prefer `getByRole` or `getByLabelText`. Use `getByTestId` only as a last resort.
- **User Events:** Use `@testing-library/user-event` over `fireEvent` for simulating full user interactions.
- **Async:** Use `findBy*` queries or `waitFor` to handle asynchronous updates.
- **Mocking:** Mock external dependencies (API modules, context providers) using `vi.spyOn()` (Vitest) or `jest.spyOn()`.
