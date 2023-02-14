import { DocumentData } from "firebase/firestore";
import { string } from "yup";

export namespace Questions {
  export type Quiz = {
    id: string;
    data: () => {
      que: string;
      queNo: number | string;
      options: string[];
      ans: string;
    };
  };

  // Fetch
  export type FetchProps = {};
  export type FetchResponse = {
    [key: string]: any;
  };
  export interface FetchAPIPayload extends FetchProps {}
}
