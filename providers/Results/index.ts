import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import * as api from "./api";
import { Result } from "./types";

const KEY = "RESULT";

export function getKeyFromProps(
  props: any,
  type: "RESULT" | "DETAIL",
): string[] {
  const key = [KEY, type];
  key.push(props);
  return key;
}

export function getStatsProviderKey(
  arg0: { id: number | undefined },
  arg1: string,
): import("react-query").InvalidateQueryFilters<unknown> | undefined {
  throw new Error("Function not implemented.");
}

export function getFormProviderKey(
  arg0: { id: string | undefined },
  arg1: string,
): import("react-query").InvalidateQueryFilters<unknown> | undefined {
  throw new Error("Function not implemented.");
}

// Fetch
export function useFetchResult(
  props: Result.FetchProps = {},
): UseQueryResult<Result.FetchResponse> {
  return useQuery(getKeyFromProps(props, "RESULT"), () => api.fetch(props), {});
}
// Detail
export function useResultDetail(
  props: Result.DetailProps,
): UseQueryResult<Result.DetailResponse> {
  return useQuery(getKeyFromProps(props, "DETAIL"), () => api.detail(props));
}

//Create
export function useCreateResult(
  props: Result.CreateProps = {},
): UseMutationResult<
  Result.CreateResponse,
  {
    message?: string;
  },
  Result.CreateMutationPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.create({ ...props, data: payload }), {
    mutationKey: `${KEY}|Create`,
    onSuccess: () => {
      queryClient.invalidateQueries(getKeyFromProps(props, "RESULT"));
    },
    retry: 0,
  });
}
