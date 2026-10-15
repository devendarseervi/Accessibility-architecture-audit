
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Accessibility Audit Platform", () => {
  it("displays all five documented accessibility findings", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: "success",
          message: "Backend server is running",
        }),
      })
    );

    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "Accessibility Audit Platform",
      })
    ).toBeInTheDocument();

    expect(screen.getByText("A11Y-01")).toBeInTheDocument();
    expect(screen.getByText("A11Y-02")).toBeInTheDocument();
    expect(screen.getByText("A11Y-03")).toBeInTheDocument();
    expect(screen.getByText("A11Y-04")).toBeInTheDocument();
    expect(screen.getByText("A11Y-05")).toBeInTheDocument();

    expect(
      await screen.findByText("Backend server is running")
    ).toBeInTheDocument();
  });

  it("shows evidence and recommended fixes when details are opened", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: "success",
          message: "Backend server is running",
        }),
      })
    );

    render(<App />);

    fireEvent.click(screen.getAllByRole("button", { name: "View details" })[0]);

    expect(
      screen.getByText(/Lighthouse flagged #serviceByCategoryList/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Inspect the DOM, remove the inappropriate listitem role/)
    ).toBeInTheDocument();
  });
});
