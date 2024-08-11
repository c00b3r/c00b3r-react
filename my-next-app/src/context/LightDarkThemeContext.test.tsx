import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "./LightDarkThemeContext";
import { useContext } from "react";
import DarkLightThemeContext from "./LightDarkThemeContext";

const TestComponent = () => {
  const context = useContext(DarkLightThemeContext);

  if (!context) {
    throw new Error("TestComponent must be used within a ThemeProvider");
  }

  return (
    <div>
      <span>Current Theme: {context.theme}</span>
      <button onClick={context.toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeProvider", () => {
  it("should initialize with the dark theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText(/Current Theme: dark/i)).toBeInTheDocument();
    expect(document.body.className).toBe("dark");
  });

  it("should toggle theme when button is clicked", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText(/Current Theme: dark/i)).toBeInTheDocument();
    expect(document.body.className).toBe("dark");

    fireEvent.click(screen.getByText(/Toggle Theme/i));

    expect(screen.getByText(/Current Theme: light/i)).toBeInTheDocument();
    expect(document.body.className).toBe("light");
  });

  it("should provide context values", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText(/Current Theme: dark/i)).toBeInTheDocument();
  });
});
