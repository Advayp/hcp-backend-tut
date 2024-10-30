/**
 * @jest-environment node
 */
import { User } from "@prisma/client";
import { GET } from "./route";
import { prismaMock } from "@/__test__/singleton";

test("should fetch single user", async () => {
  const user: User = {
    id: 1,
    email: "apat23@uw.edu",
    name: "Advay Patil",
  };

  prismaMock.user.findMany.mockResolvedValue([user]);

  const response = await (await GET()).json();

  expect(response).toEqual([
    {
      id: 1,
      email: "apat23@uw.edu",
      name: "Advay Patil",
    },
  ]);
});
