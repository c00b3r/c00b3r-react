import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FlyoutComponent.module.css";
import { clearSelectedItems } from "../../../store/slices/selectedItemsSlice";
import { PeopleInfo } from "../../../interface";

export default function FlyoutComponent() {
  const dispatch: AppDispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItem);

  function handleUnselectOnClick() {
    dispatch(clearSelectedItems());
  }

  function convertToCSV(items: PeopleInfo[]): string {
    const headers = ["Name", "Birth Year", "Gender", "Height"];
    const csvContent = [
      headers.join(","),
      ...items.map(
        (item) =>
          `${item.name},${item.birthYear},${item.gender},${item.height}`,
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    return URL.createObjectURL(blob);
  }

  return (
    <>
      {selectedItems && selectedItems.length ? (
        <div className={styles.favoriteWrapper}>
          <div className={styles.favoriteWrapperTools}>
            <h4>{selectedItems.length} items are selected</h4>
            <button
              className={styles.toolsButton}
              onClick={handleUnselectOnClick}
            >
              Unselect all
            </button>
            <a
              className={styles.toolsButton}
              href={convertToCSV(selectedItems)}
              download={`starwars_${selectedItems.length}.csv`}
            >
              Download
            </a>
          </div>
          <div className={styles.favoriteItemsList}>
            {selectedItems.map((item, index) => (
              <p key={index}>{item.name}</p>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
