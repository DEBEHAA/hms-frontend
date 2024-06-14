import { getLoggedInUser } from "@/db/auth";
import { useStore } from "@/store";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);
  const isFirstVisit = useStore((state) => state.isFirstVisit);
  const setFirstVisit = useStore((state) => state.setFirstVisit);

  useEffect(() => {
    if (user || !isFirstVisit) {
      setIsLoading(false);
    } else {
      (async () => {
        const result = await getLoggedInUser();

        if (result.status === "success") {
          setUser(result.data.user);
        } else {
          setUser(null);
        }

        setFirstVisit(false);
        setIsLoading(false);
      })();
    }
  }, []);

  return { isLoading, user };
};

export default useAuth;
