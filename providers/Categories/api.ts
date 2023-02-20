import { database } from "platform/initFirebase";
import { Categories } from "./types";

const dbInstance = database.collection("quiz-categories");

// Fetch
export async function fetch(
  props: Categories.FetchAPIPayload,
): Promise<Categories.FetchResponse> {
  const { docs } = await dbInstance.get();
  const data  = docs.map((item) => item.data())

  return data;
}
