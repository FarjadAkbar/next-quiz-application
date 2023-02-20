import { DocumentData } from "firebase/firestore";
import { string } from "yup";

export namespace Categories {
  export type Item = {
    name: string;
  };

  export type Category = {
    id: string;
    data: () => Item;
  };


  // Fetch
  export type FetchProps = {};
  export type FetchResponse = {
    [key: string]: any;
  };
  export interface FetchAPIPayload extends FetchProps {}
}
