import { useRouter } from "next/router";

export default function useQueries() {
    const router = useRouter();
    const query = router.query;
    const changeQuery = (queryIndex: string, value: number | string) => {
        router.push({
            pathname: location.pathname,
            query: { ...query, [queryIndex]: value },
        });
    };

    const removeQuery = (queryIndex: string) => {
        let newQuery = { ...query };
        delete newQuery[queryIndex];
        router.push({
            pathname: location.pathname,
            query: newQuery,
        });
    };
    return { query, changeQuery, removeQuery };
}
