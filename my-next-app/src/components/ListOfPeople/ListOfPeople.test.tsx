import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ListOfPeople from "./ListOfPeople";
import selectedItemsSlice, {
  toggleItem,
} from "../../../store/slices/selectedItemsSlice";
import { Data } from "../../../interface";
import "@testing-library/jest-dom";

vi.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "",
    query: {},
  }),
}));

const store = configureStore({
  reducer: {
    selectedItem: selectedItemsSlice,
  },
});

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

describe("ListOfPeople", () => {
  let setPage: () => {};

  beforeEach(() => {
    setPage = vi.fn();
  });

  it("should render correctly when data is provided", () => {
    render(
      <Provider store={store}>
        <ListOfPeople data={mockData} page={1} setPage={setPage} />
      </Provider>,
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Leia Organa")).toBeInTheDocument();
  });

  it("should call setPage with the previous page when previous button is clicked", () => {
    render(
      <Provider store={store}>
        <ListOfPeople data={mockData} page={2} setPage={setPage} />
      </Provider>,
    );

    fireEvent.click(screen.getByText("←"));

    expect(setPage).toHaveBeenCalledWith(1);
  });

  it("should call setPage with the next page when next button is clicked", () => {
    render(
      <Provider store={store}>
        <ListOfPeople data={mockData} page={1} setPage={setPage} />
      </Provider>,
    );

    fireEvent.click(screen.getByText("→"));

    expect(setPage).toHaveBeenCalledWith(2);
  });

  it("should toggle item selection when checkbox is clicked", () => {
    const dispatch = vi.fn();
    vi.spyOn(store, "dispatch").mockImplementation(dispatch);

    render(
      <Provider store={store}>
        <ListOfPeople data={mockData} page={1} setPage={setPage} />
      </Provider>,
    );

    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledWith(
      toggleItem({
        name: "Luke Skywalker",
        birthYear: "19BBY",
        gender: "male",
        height: "172",
      }),
    );
  });

  it("should render data not found message when no results are available", () => {
    const emptyData: Data = {
      results: [],
      count: 0,
      next: null,
      previous: null,
    };

    render(
      <Provider store={store}>
        <ListOfPeople data={emptyData} page={1} setPage={setPage} />
      </Provider>,
    );

    expect(screen.getByText("= Data Not Found =")).toBeInTheDocument();
  });
});
