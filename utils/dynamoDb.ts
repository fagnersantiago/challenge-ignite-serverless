import { DynamoDB } from "aws-sdk";

const options = {
  region: process.env.IS_OFFILINE,
  endpoint: "http://localhost:8000",
};

const isOffiLine = () => {
  return process.env.IS_OFFILINE;
};

export const document = isOffiLine()
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();
