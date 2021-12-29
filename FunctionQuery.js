import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

export const searchResult = async (
    inputSearch,
    setSearchedResult,
    searchedResult
) => {
    const q = query(
        collection(db, "profile"),
        where("name", ">=", inputSearch),
        where("name", "<=", inputSearch + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        setSearchedResult((val) => [...val, doc.data()]);
    });
};
export const showUser = (id, navigate) => {
    navigate(`/profile/${id}`);
};