import { document } from "../utils/dynamoDb";
import { ICreateTODO } from "./dto/ICreateTodo";

export const handle = async (event) => {
  const { user_id } = event.pathParameters;
  const { id, title, done } = JSON.parse(event.body) as ICreateTODO;

  const response = await document
    .query({
      TableName: "Todos",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();

  const todo = response.Items[0];

  if (!todo) {
    await document
      .put({
        //cria tabela
        TableName: "Todos",
        //cria coluna
        Item: {
          id,
          user_id,
          title,
          done,
          deadline: new Date(),
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Todo created",
      }),

      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
