import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/MainPage.module.css";

const MainPage = dynamic(() => import("../components/MainPage/MainPage"), {
  ssr: false,
});
const PersonDetail = dynamic(() => import("./people/[id]"), { ssr: false });

export default function HomePage() {
  const router = useRouter();
  const { id } = router.query;
  const [detailId, setDetailId] = useState<string | null>(id as string | null);

  useEffect(() => {
    setDetailId(id as string | null);
  }, [id]);

  return (
    <div className={styles.container}>
      <MainPage />
      {detailId && (
        <div className={styles.detailContainer}>
          <PersonDetail />
        </div>
      )}
    </div>
  );
}
