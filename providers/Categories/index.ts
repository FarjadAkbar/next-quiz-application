import {
  UseQueryResult,
  useQuery,
} from "react-query";
import * as api from "./api";
import { Categories } from "./types";

const KEY = "Categories";

// Fetch
export function useQuizCategory(
  props: Categories.FetchProps = {},
): UseQueryResult<Categories.FetchResponse> {
  return useQuery(KEY, () => api.fetch(props), {});
}
