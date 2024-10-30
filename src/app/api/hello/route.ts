import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type RequestData = {
  num: number;
  info: string;
};

type ResponseData = {
  message: string;
};

export async function POST(
  request: NextRequest
): Promise<NextResponse<ResponseData>> {
  const { info }: Partial<RequestData> = await request.json();

  const data = await prisma.user.findMany();

  console.log(data);

  return NextResponse.json({ message: info! });
}
