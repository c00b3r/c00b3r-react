import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FlyoutComponent from "./FlyoutComponent";
import selectedItemsSlice, {
  clearSelectedItems,
  toggleItem,
} from "../../../store/slices/selectedItemsSlice";
import { PeopleInfo } from "../../../interface";
import "@testing-library/jest-dom";

const store = configureStore({
  reducer: {
    selectedItem: selectedItemsSlice,
  },
});

describe("FlyoutComponent", () => {
  beforeEach(() => {
    store.dispatch(clearSelectedItems());
  });

  it("should render correctly when there are selected items", () => {
    const items: PeopleInfo[] = [
      {
        name: "Luke Skywalker",
        birthYear: "19BBY",
        gender: "male",
        height: "172",
      },
      {
        name: "Leia Organa",
        birthYear: "19BBY",
        gender: "female",
        height: "150",
      },
    ];

    store.dispatch(toggleItem(items[0]));
    store.dispatch(toggleItem(items[1]));

    render(
      <Provider store={store}>
        <FlyoutComponent />
      </Provider>,
    );

    expect(screen.getByText("2 items are selected")).toBeInTheDocument();
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Leia Organa")).toBeInTheDocument();
  });

  it("should call dispatch to clear selected items when button is clicked", () => {
    const items: PeopleInfo[] = [
      {
        name: "Luke Skywalker",
        birthYear: "19BBY",
        gender: "male",
        height: "172",
      },
    ];

    store.dispatch(toggleItem(items[0]));

    const dispatch = vi.fn();
    vi.spyOn(store, "dispatch").mockImplementation(dispatch);

    render(
      <Provider store={store}>
        <FlyoutComponent />
      </Provider>,
    );

    fireEvent.click(screen.getByText("Unselect all"));

    expect(dispatch).toHaveBeenCalledWith(clearSelectedItems());
  });

  it("should generate a CSV file link with correct content", () => {
    const items: PeopleInfo[] = [
      {
        name: "Luke Skywalker",
        birthYear: "19BBY",
        gender: "male",
        height: "172",
      },
    ];

    store.dispatch(toggleItem(items[0]));

    render(
      <Provider store={store}>
        <FlyoutComponent />
      </Provider>,
    );

    const downloadLink = screen.getByText("Download") as HTMLAnchorElement;
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink.href).toContain("data:text/csv;charset=utf-8,");
  });
});
