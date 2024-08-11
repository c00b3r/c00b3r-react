import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PersonDetail from "./[id]";
import { useRouter } from "next/router";
import { starWarsApi } from "../../../store/thunks/starWarsApi";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../../../store/thunks/starWarsApi", () => ({
  starWarsApi: {
    useGetPersonInformationQuery: vi.fn(),
  },
}));

describe("PersonDetail", () => {
  it("should display person details", async () => {
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      query: { id: "1" },
      push: vi.fn(),
    });

    (
      starWarsApi.useGetPersonInformationQuery as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: {
        height: "172",
        mass: "77",
        birth_year: "19BBY",
        gender: "male",
      },
    });

    render(<PersonDetail />);

    expect(await screen.findByText(/Height:/i)).toBeInTheDocument();
    expect(await screen.findByText("172")).toBeInTheDocument();
    expect(await screen.findByText(/Mass:/i)).toBeInTheDocument();
    expect(await screen.findByText("77")).toBeInTheDocument();
    expect(await screen.findByText(/BirthYear:/i)).toBeInTheDocument();
    expect(await screen.findByText("19BBY")).toBeInTheDocument();
    expect(await screen.findByText(/Gender:/i)).toBeInTheDocument();
    expect(await screen.findByText("male")).toBeInTheDocument();
  });

  it("should call router.push when close button is clicked", () => {
    const pushMock = vi.fn();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      query: { id: "1" },
      push: pushMock,
    });

    render(<PersonDetail />);

    fireEvent.click(screen.getByText(/Close/i));
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("should call handleClose on click outside the component", async () => {
    const pushMock = vi.fn();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      query: { id: "1" },
      push: pushMock,
    });

    render(<PersonDetail />);

    await waitFor(() => {
      fireEvent.click(document.body);
    });

    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
