import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./index";
import { useRouter } from "next/router";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../components/MainPage/MainPage", () => ({
  __esModule: true,
  default: () => <div>MainPage Component</div>,
}));

vi.mock("./people/[id]", () => ({
  __esModule: true,
  default: () => <div>PersonDetail Component</div>,
}));

describe("HomePage", () => {
  it("should render MainPage and PersonDetail components when id is present", async () => {
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      query: { id: "1" },
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("MainPage Component")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("PersonDetail Component")).toBeInTheDocument();
    });
  });

  it("should render only MainPage component when id is not present", async () => {
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      query: {},
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("MainPage Component")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByText("PersonDetail Component"),
      ).not.toBeInTheDocument();
    });
  });
});
