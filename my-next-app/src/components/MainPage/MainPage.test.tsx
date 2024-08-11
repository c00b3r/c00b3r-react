import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MainPage from "./MainPage";
import { Data } from "../../../interface";
import selectedItemsSlice from "../../../store/slices/selectedItemsSlice";
import { useGetAllPeopleQuery } from "../../../store/thunks/starWarsApi";
import DarkLightThemeContext from "../../context/LightDarkThemeContext";
import { useRouter } from "next/router";

const mockData: Data = {
  results: [
    {
      name: "Luke Skywalker",
      birth_year: "19BBY",
      gender: "male",
      height: "172",
      url: "https://swapi.dev/api/people/1/",
      mass: "",
      hair_color: "",
      skin_color: "",
      eye_color: "",
      homeworld: "",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "",
      edited: "",
    },
    {
      name: "Leia Organa",
      birth_year: "19BBY",
      gender: "female",
      height: "150",
      url: "https://swapi.dev/api/people/2/",
      mass: "",
      hair_color: "",
      skin_color: "",
      eye_color: "",
      homeworld: "",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "",
      edited: "",
    },
  ],
  count: 20,
  next: "https://swapi.dev/api/people/?page=2",
  previous: null,
};

vi.mock("next/router", () => ({
  useRouter: vi.fn().mockReturnValue({
    query: {},
    asPath: "/",
    push: vi.fn(),
  }),
}));

vi.mock("../../../hooks/useLocalStorage", () => ({
  default: vi.fn(() => [undefined, vi.fn()]),
}));

vi.mock("../../../store/thunks/starWarsApi", () => ({
  useGetAllPeopleQuery: vi.fn(() => ({
    data: mockData,
    isLoading: false,
  })),
}));

const store = configureStore({
  reducer: {
    selectedItem: selectedItemsSlice,
  },
});

describe("MainPage", () => {
  let routerPush: ReturnType<typeof vi.fn>;
  let mockThemeContext: {
    theme: string;
    toggleTheme: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    routerPush = vi.fn();
    mockThemeContext = {
      theme: "dark",
      toggleTheme: vi.fn(),
    };

    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      query: {},
      asPath: "/",
      push: routerPush,
    });
  });

  it("should render search bar and theme switch button", () => {
    render(
      <Provider store={store}>
        <DarkLightThemeContext.Provider value={mockThemeContext}>
          <MainPage />
        </DarkLightThemeContext.Provider>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/Switch to Light Theme/i)).toBeInTheDocument();
  });

  it("should handle search and update URL", async () => {
    render(
      <Provider store={store}>
        <DarkLightThemeContext.Provider value={mockThemeContext}>
          <MainPage />
        </DarkLightThemeContext.Provider>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Luke Skywalker" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith({
        pathname: "/",
        query: { search: "Luke Skywalker", page: "1" },
      });
    });
  });

  it("should switch theme when button is clicked", () => {
    render(
      <Provider store={store}>
        <DarkLightThemeContext.Provider value={mockThemeContext}>
          <MainPage />
        </DarkLightThemeContext.Provider>
      </Provider>,
    );

    fireEvent.click(screen.getByText(/Switch to Light Theme/i));

    expect(mockThemeContext.toggleTheme).toHaveBeenCalled();
  });

  it("should display loading message while data is loading", () => {
    (useGetAllPeopleQuery as ReturnType<typeof vi.fn>).mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    });

    render(
      <Provider store={store}>
        <DarkLightThemeContext.Provider value={mockThemeContext}>
          <MainPage />
        </DarkLightThemeContext.Provider>
      </Provider>,
    );

    expect(screen.getByText(/Loading data, please wait/i)).toBeInTheDocument();
  });

  it("should render ListOfPeople component with data", async () => {
    render(
      <Provider store={store}>
        <DarkLightThemeContext.Provider value={mockThemeContext}>
          <MainPage />
        </DarkLightThemeContext.Provider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
      expect(screen.getByText("Leia Organa")).toBeInTheDocument();
    });
  });
});
