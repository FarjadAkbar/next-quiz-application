import { app, database } from "platform/initFirebase";
import { collection, getDocs } from "firebase/firestore";
import { Questions } from "./types";
import { useState } from "react";

const dbInstance = database.collection("quiz-set");

// Fetch
export async function fetch(
  props: Questions.FetchAPIPayload,
): Promise<Questions.FetchResponse> {
  const { docs } = await dbInstance.get();
  const data  = docs.map((item) => item.data())

  return data;
}
