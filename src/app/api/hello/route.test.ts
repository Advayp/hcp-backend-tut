/**
 * @jest-environment node
 */
import { POST } from "./route";

test("POST route correctly formats response", async () => {
  const testMessage = "hello";

  const requestObj = {
    json: async () => ({ info: testMessage }),
  } as any;

  const response = await POST(requestObj);
  const body = await response.json();

  expect(body.message).toBe(testMessage);
});
