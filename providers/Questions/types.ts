import { DocumentData } from "firebase/firestore";
import { string } from "yup";

export namespace Questions {
  export type Item = {
    que: string;
    queNo: number | string;
    options: string[];
    ans: string;
    category: string;
  };

  export type Quiz = {
    id: string;
    data: () => Item;
  };

  // Fetch
  export type FetchProps = {};
  export type FetchResponse = {
    [key: string]: any;
  };
  export interface FetchAPIPayload extends FetchProps {}

  // Create
  export type CreateProps = {};
  export type CreateResponse = {
    data: Item;
  };
  export type CreateMutationPayload = {
    que: string;
    queNo: number | string;
    options: string[];
    ans: string;
    category: string;
  };
  export interface CreateAPIPayload extends CreateProps {
    data: CreateMutationPayload;
  }
}
