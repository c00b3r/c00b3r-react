import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Data } from "../../../interface";
import useLocalStorage from "@/hooks/useLocalStorage";
import SearchBar from "@/components/SearchBar/SearchBar";
import ListOfPeople from "@/components/ListOfPeople/ListOfPeople";
import FlyoutComponent from "@/components/FlyoutComponent/FlyoutComponent";
import DarkLightThemeContext from "@/context/LightDarkThemeContext";
import { useGetAllPeopleQuery } from "../../../store/thunks/starWarsApi";
import styles from "../../styles/MainPage.module.css";

export default function MainPage() {
  const [dataOfPeople, setDataOfPeople] = useState<Data | undefined>(undefined);
  const [localStorageItem, setLocalStorageItem] =
    useLocalStorage("prevSearchItem");

  const router = useRouter();
  const searchParams = router.query;

  const { data, isLoading } = useGetAllPeopleQuery({
    searchParam: (searchParams.search as string) || localStorageItem,
    page: parseInt((searchParams.page as string) || "1", 10),
  });

  const themeContext = useContext(DarkLightThemeContext);

  function handleSearch(searchParam: string): void {
    const trimmedSearchParam = searchParam.trim();
    if (trimmedSearchParam === "") {
      localStorage.removeItem("prevSearchItem");
      router.push("/");
    } else {
      setLocalStorageItem(trimmedSearchParam);
      router.push({
        pathname: "/",
        query: { search: trimmedSearchParam, page: "1" },
      });
    }
  }

  useEffect(() => {
    if (data) {
      setDataOfPeople(data);
    }
  }, [data]);

  if (!themeContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <div className={`${styles.mainPage} ${styles[theme]} ${styles.root}`}>
      <div className={styles.mainWrapper}>
        <div className={styles.header}>
          <SearchBar
            onSearch={handleSearch}
            updateLocalStorageItem={setLocalStorageItem}
          />
          <button onClick={toggleTheme} className={styles.switchTheme}>
            Switch to {theme === "dark" ? "Light" : "Dark"} Theme
          </button>
        </div>
        {isLoading ? (
          <h3 className={styles.loadingContainer}>Loading data, please wait</h3>
        ) : (
          <main className={styles.mainContent}>
            <ListOfPeople
              data={dataOfPeople as Data}
              page={parseInt((searchParams.page as string) || "1", 10)}
              setPage={(page) => {
                router.push({
                  pathname: `/`,
                  query: { search: localStorageItem, page: page.toString() },
                });
              }}
            />
          </main>
        )}
      </div>
      <FlyoutComponent />
    </div>
  );
}
