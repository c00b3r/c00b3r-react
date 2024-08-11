import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (searchParam: string) => void;
  updateLocalStorageItem: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  onSearch,
  updateLocalStorageItem,
}: SearchBarProps) {
  const [valueInput, setValueInput] = useState<string>(
    localStorage.getItem("prevSearchItem") ?? "",
  );
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValueInput(event.target?.value);
  }

  function handleClick() {
    onSearch(valueInput);
    setValueInput("");
    if (valueInput === "") {
      router.push("/");
      updateLocalStorageItem("");
    }
  }

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        value={valueInput}
        onChange={(event) => handleChange(event)}
        placeholder="Search..."
        className={styles.searchInput}
      />
      <button onClick={handleClick} className={styles.searchButton}>
        Search People
      </button>
    </div>
  );
}
