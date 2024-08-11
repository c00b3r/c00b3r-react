import "@testing-library/jest-dom";

globalThis.URL.createObjectURL = () => "data:text/csv;charset=utf-8,";
