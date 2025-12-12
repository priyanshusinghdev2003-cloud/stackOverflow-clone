import { NextResponse } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

export async function middleware(request) {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
  return NextResponse.next();
}
export const config = {
  // match all paths except for the one that start with /api next/static next/image favicon
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
