import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type PostRequest = {
  email: string;
  name: string;
};

type PostResponse = {
  success: boolean;
};

export async function POST(
  req: NextRequest
): Promise<NextResponse<PostResponse>> {
  const { email, name }: PostRequest = await req.json();

  const user = await prisma.user.create({
    data: {
      email,
      name,
      profile: {
        create: {
          bio: "bio",
        },
      },
      posts: {
        create: {
          title: "Title 1",
        },
      },
    },
  });

  console.log(user);

  return NextResponse.json({ success: true });
}

export async function GET() {
  const data = await prisma.user.findMany();

  return NextResponse.json(data);
}
