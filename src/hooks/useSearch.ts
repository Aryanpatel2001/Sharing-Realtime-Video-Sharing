// import { useEffect, useState } from "react";

// import { searchUsers } from "@/actions/user";
// import { useQueryData } from "./useQueryData";

// export const useSearch = (key: string, type: "USERS") => {
//   const [query, setQuery] = useState("");
//   const [debounce, setDebounce] = useState("");
//   const [onUsers, setOnUsers] = useState<
//     | {
//         id: string;
//         subscription: {
//           plan: "PRO" | "FREE";
//         } | null;
//         firstname: string | null;
//         lastname: string | null;
//         image: string | null;
//         email: string | null;
//       }[]
//     | undefined
//   >(undefined);

//   const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//   };

//   useEffect(() => {
//     const delayInputTimeoutId = setTimeout(() => {
//       setDebounce(query);
//     }, 1000);
//     return () => clearTimeout(delayInputTimeoutId);
//   }, [query]);

//   const { isFetching } = useQueryData(
//     [key, debounce],
//     async ({ queryKey }) => {
//       if (type === "USERS") {
//         const users = await searchUsers(queryKey[1] as string);
//         if (users.status === 200) setOnUsers(users.data);
//       }
//     },
//     false
//   );

//   return { onSearchQuery, query, isFetching, onUsers };
// };
import { useEffect, useState } from "react";
import { searchUsers } from "@/actions/user";
import { useQueryData } from "./useQueryData";

export const useSearch = (key: string, type: "USERS") => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [users, setUsers] = useState<
    {
      id: string;
      subscription: { plan: "PRO" | "FREE" } | null;
      firstname: string | null;
      lastname: string | null;
      image: string | null;
      email: string | null;
    }[]
  >([]);

  // Load all users when component mounts
  const { isFetching: isLoadingInitial } = useQueryData(
    ["initial-users"],
    async () => {
      const response = await searchUsers("");
      const data = response.status === 200 ? response.data || [] : [];
      setUsers(data);
      return data;
    },
    true
  );

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  // Search users when query changes
  const { isFetching: isSearching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      const response = await searchUsers(queryKey[1] as string);
      const data = response.status === 200 ? response.data || [] : [];
      setUsers(data);
      return data;
    },
    true // Changed to always be enabled instead of Boolean(debounce)
  );

  return {
    onSearchQuery,
    query,
    isFetching: isLoadingInitial || isSearching,
    users,
  };
};
