import { Dispatch, SetStateAction } from "react";
import { Data } from "../../../interface";
import styles from "./ListOfPeople.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { toggleItem } from "../../../store/slices/selectedItemsSlice";
import Link from "next/link";

interface ListOfPeopleProps {
  data: Data;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function ListOfPeople({
  data,
  page,
  setPage,
}: ListOfPeopleProps) {
  const dispatch: AppDispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItem);
  const router = useRouter();

  const results = data?.results || [];
  const count = data?.count ?? 0;
  const nextPageAvailable = Boolean(data?.next);

  const handleCheckboxChange = (
    peopleName: string,
    peopleBirthYear: string,
    peopleGender: string,
    peopleHeight: string,
  ) => {
    dispatch(
      toggleItem({
        name: peopleName,
        birthYear: peopleBirthYear,
        gender: peopleGender,
        height: peopleHeight,
      }),
    );
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (nextPageAvailable) {
      setPage(page + 1);
    }
  };

  return (
    <div className={styles.listPeopleWrapper}>
      <div className={styles.listCharactersWrapper}>
        {results.length ? (
          results.map((peopleItem) => (
            <div key={peopleItem.name} className={styles.personWrapper}>
              <input
                type="checkbox"
                checked={selectedItems.some(
                  (item) => item.name === peopleItem.name,
                )}
                onChange={() =>
                  handleCheckboxChange(
                    peopleItem.name,
                    peopleItem.birth_year,
                    peopleItem.gender,
                    peopleItem.height,
                  )
                }
              />
              <Link
                href={`/people/${peopleItem.url.split("/")[5]}${router.asPath.split("?")[1] ? `?${router.asPath.split("?")[1]}` : ""}`}
                className={styles.link}
              >
                <h3 className="person-name">{peopleItem.name}</h3>
              </Link>
            </div>
          ))
        ) : (
          <h4 style={{ grid: "none", margin: "0 auto", display: "" }}>
            = Data Not Found =
          </h4>
        )}
      </div>
      {count > 10 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            alignSelf: "center",
          }}
        >
          <button disabled={page === 1} onClick={handlePreviousClick}>
            ←
          </button>
          <p>{page}</p>
          <button disabled={!nextPageAvailable} onClick={handleNextClick}>
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
