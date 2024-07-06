import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ListOfPeople from "./components/ListOfPeople/ListOfPeople";
import { AppState, Results } from "./interface";
export default class App extends Component {
  state: Readonly<AppState> = {
    dataOfPeople: {
      count: 0,
      next: "",
      previous: null,
      results: [],
    },
    loading: false,
  };

  constructor(props: object) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount(): void {
    const searchParam = localStorage.getItem("prevSearchItem") || "";
    this.fetchDataOfPeople(searchParam);
  }

  // componentDidUpdate(): void {
  //   throw new Error("test error");
  // }

  fetchDataOfPeople = async (searchParam: string) => {
    this.setState({ loading: true });
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchParam}`,
      );
      const data = await response.json();
      if (data) {
        this.setState({ dataOfPeople: data });
        this.setState({ loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
      // console.error("Error fetching data:", error);
      throw error;
    }
  };

  handleSearch(searchParam: string): void {
    localStorage.setItem("prevSearchItem", searchParam);
    this.fetchDataOfPeople(searchParam);
  }

  render() {
    return (
      <>
        <SearchBar onSearch={this.handleSearch} />
        <ListOfPeople
          result={this.state.dataOfPeople.results as Results[]}
          loadingData={this.state.loading}
        />
      </>
    );
  }
}
