import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Fetch all Users
  // Expected output: []
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);

  await prisma.user.create({
    data: {
      email: "apat23@uw.edu",
      name: "Advay",
      posts: {
        create: { title: "Hello, UW" },
      },
      profile: {
        create: { bio: "I like UW" },
      },
    },
  });

  const updatedUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(updatedUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
