import { UseQueryResult, useQuery } from "react-query";
import * as api from "./api";
import { Questions } from "./types";

const KEY = "Questions";

// Fetch
export function useQuizQuestion(
  props: Questions.FetchProps = {},
): UseQueryResult<Questions.FetchResponse> {
  return useQuery("question", () => api.fetch(props), {});
}
