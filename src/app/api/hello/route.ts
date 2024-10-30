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

  console.log(info);

  return NextResponse.json({ message: info! });
}
