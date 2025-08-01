import * as React from "react";
import { render } from "@testing-library/react";
import { handleCSSLoadError } from "@components/shared/WithComponentStyles";

// Mock console.warn to capture error messages
const mockConsoleWarn = jest.fn();
const originalConsoleWarn = console.warn;

beforeEach(() => {
  console.warn = mockConsoleWarn;
  mockConsoleWarn.mockClear();
});

afterEach(() => {
  console.warn = originalConsoleWarn;
});

describe("WithComponentStyles CSS Error Handling", () => {
  it("should log appropriate warning when CSS fails to load", () => {
    // Create a mock link element
    const mockLinkElement = document.createElement('link');
    mockLinkElement.href = 'http://localhost:8000/global.css';
    
    // Create a mock event
    const mockEvent = {
      currentTarget: mockLinkElement
    } as React.SyntheticEvent<HTMLLinkElement>;
    
    // Call the error handler
    handleCSSLoadError(mockEvent);
    
    // Check that console.warn was called with the appropriate message
    expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
    const warnArgs = mockConsoleWarn.mock.calls[0];
    expect(warnArgs.join(' ')).toContain("[Duffel Components] Failed to load CSS file from:");
    expect(warnArgs.join(' ')).toContain("COMPONENT_CDN is misconfigured");
    expect(warnArgs.join(' ')).toContain("For production, use: COMPONENT_CDN=https://assets.duffel.com/components");
    expect(warnArgs.join(' ')).toContain("localhost:8000");
    expect(warnArgs.join(' ')).toContain("port 3200, not 8000");
  });
});