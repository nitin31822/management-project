import { NextRequest,NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";

export async function GET(req:NextRequest) {

    const searchParams = req.nextUrl.searchParams
    const orgid = searchParams.get("OrgId")

    if (!orgid) {
        throw new ApiError(400,"org not found")
        
    }
    
    
}