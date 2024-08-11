import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { starWarsApi } from "../../../store/thunks/starWarsApi";
import styles from "../../styles/DetailPage.module.css";

export default function PersonDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: result } = starWarsApi.useGetPersonInformationQuery({
    idOfPerson: id as string,
  });
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.peopleInfo} ref={ref}>
      <p>
        <span style={{ fontWeight: "bold" }}>Height:</span> {result?.height}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Mass:</span> {result?.mass}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>BirthYear:</span>{" "}
        {result?.birth_year}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Gender:</span> {result?.gender}
      </p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
}
