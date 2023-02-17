import { database } from "platform/initFirebase";
import { Questions } from "./types";


const dbInstance = database.collection("quiz-set");

// Fetch
export async function fetch(
  props: Questions.FetchAPIPayload,
): Promise<Questions.FetchResponse> {
  const { docs } = await dbInstance.get();
  const data  = docs.map((item) => item.data())

  return data;
}


// Create
export async function create(props: Questions.CreateAPIPayload): Promise<any> {
  const { id } = await dbInstance.add({
    ...props.data,
    created: new Date().toISOString(),
  });
  return id;
}