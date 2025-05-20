import { auth } from "@/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";
 
export const { POST, GET } = toNextJsHandler(auth);

// /api/auth/sign-in
// /api/auth/sign-up
// /api/auth/get-session