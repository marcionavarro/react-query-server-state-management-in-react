import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useQuery } from "react-query";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

export function useStaff(): UseStaff {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");
  const selectFn = useCallback(
    (unfilteredStaff) => filterByTreatment(unfilteredStaff, filter),
    [filter]
  )

  const fallback: Staff[] = [];
  const { data: staff = fallback } = useQuery(queryKeys.staff, getStaff,
    { select: filter !== 'all' ? selectFn : undefined }
  )
  return { staff, filter, setFilter };
}
