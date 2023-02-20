import {
  UseQueryResult,
  useQuery,
  UseMutationResult,
  useQueryClient,
  useMutation,
} from "react-query";
import * as api from "./api";
import { Questions } from "./types";

const KEY = "Questions";

// Fetch
export function useQuizQuestion(
  props: Questions.FetchProps = {},
): UseQueryResult<Questions.FetchResponse> {
  return useQuery(KEY, () => api.fetch(props), {});
}

//Create
export function useCreateQuiz(
  props: Questions.CreateProps = {},
): UseMutationResult<
  Questions.CreateResponse,
  {
    message?: string;
  },
  Questions.CreateMutationPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.create({ ...props, data: payload }), {
    mutationKey: `${KEY}|Create`,
    onSuccess: () => {
      queryClient.invalidateQueries(KEY);
    },
    retry: 0,
  });
}
