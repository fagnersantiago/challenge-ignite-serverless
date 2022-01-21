import { document } from "../utils/dynamoDb";

export const handle = async (event) => {
  const { id } = event.pathParameters;

  const response = await document
    .query({
      TableName: "Todos",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeNames: {
        id: id,
      },
    })
    .promise();

  const todoExist = response.Items[0];

  if (todoExist) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        todoExist,
      }),
    };
  }
  return {
    statusCode: 400,
    body: {
      message: "TODOS does not exists",
    },
  };
};
