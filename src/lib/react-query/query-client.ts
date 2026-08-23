import { QueryClient } from "@tanstack/react-query";

const MINUTE = 60 * 1000;

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: { // These options apply to every useQuery().

            retry: 1, // Meaning: If a query fails because of something temporary (for example, a network hiccup), React Query will try one more time to call that api.

            staleTime: 5 * MINUTE, // After five minutes, the data becomes stale, meaning React Query may refetch it depending on the situation.

            gcTime: 10 * MINUTE, // (gc = Garbage Collection) Suppose you leave the Profile page, No component is using data anymore. React Query says: I'll keep it in memory for 10 minutes...

            refetchOnWindowFocus: false, // 'refetchOnWindowFocus' means refetching the data when user switch between other apps, 'refetchOnWindowFocus' refetches the data immediately, but for journal Application it is unnecessary so we keep it disable...

            refetchOnReconnect: true, // suppose: Internet loss -> Queries fails -> Internet returns, React Query automatically retries...

            refetchOnMount: true, // if 'refetchOnMount' is true, it will refetch if the cached data is stale. If the data is still fresh (within staleTime), React Query serves it from the cache without making a network request.
        },

        // retry: 0, This is intentional. Imagine: If the server returns an error: Do not retry automatically. The user should decide what to do next.
        mutations: {
            retry: 0,
        },
    },
});