import { toast } from "@/components/app/toast";
import { QueryClient } from "react-query";

function errorHandler(errorMsg: string | unknown) {
  // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
  // one message per page load, not one message per query
  // the user doesn't care that there were three failed queries on the staff page
  //    (staff, treatments, user)
  const id = "react-query-toast";

  if (!toast.isActive(id)) {
    const action = "fetch";
    const title = `could not ${action} data: ${
      errorMsg ?? "error connecting to server"
    }`;
    toast({ id, title, status: "error", variant: "subtle", isClosable: true });
  }
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            onError: errorHandler,
            staleTime: 600000, // 10 minutes
            cacheTime: 900000, // 15 minutes (doens't make sense for staleTime to exceed cache)
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false
        }
    }
});
