import { database } from "platform/initFirebase";
import { Result } from "./types";

const dbInstance = database.collection("quiz-result");

// Fetch
export async function fetch(props: Result.FetchAPIPayload): Promise<any> {
  const { docs } = await dbInstance.get();
  const data = docs.map((item) => item.data());

  return data;
}

// Detail
export async function detail(props: Result.DetailAPIPayload): Promise<any> {
  const result = await dbInstance.doc(`${props.id}`).get();
  // const data  = data.map((item) => item.data())
  return result.data();
}

// Create
export async function create(props: Result.CreateAPIPayload): Promise<any> {
  const { id } = await dbInstance.add({
    ...props,
    created: new Date().toISOString(),
  });
  return id;
}
