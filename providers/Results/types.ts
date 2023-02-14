export namespace Result {
  export type Items = {
    _id: string;
    name: string;
    email: string;
    score: number;
    total_ques: number;
    submission: {
      [key:string]: string | number | boolean
    };
  };

  // Fetch
  export type FetchProps = {};
  export type FetchResponse = {
    data: Items[];
  };
  export interface FetchAPIPayload extends FetchProps {}

  // Detail
  export type DetailProps = {
    id: string | undefined;
  };
  export type DetailResponse = {
    data: Items;
  };
  export interface DetailAPIPayload extends DetailProps {}

  // Create
  export type CreateProps = {};
  export type CreateResponse = {
    data: Items;
  };
  export type CreateMutationPayload = {
    name: string;
    email: string;
    score: number;
    total_ques: number;
    submission: {
      [key:string]: string | number | boolean
    };
  };
  export interface CreateAPIPayload extends CreateProps {
    data: CreateMutationPayload;
  }
}
