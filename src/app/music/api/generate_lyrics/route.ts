import { NextResponse, NextRequest } from "next/server";
import { sunoApi } from "@/lib/music/sunoClient";
import { corsHeaders } from "@/lib/music/sunoUtils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    if (req.method === "POST") {
        try {
            const body = await req.json();
            const { prompt } = body;

            const lyrics = await (await sunoApi).generateLyrics(prompt);

            return new NextResponse(JSON.stringify(lyrics), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    ...corsHeaders,
                },
            });
        } catch (error: any) {
            console.error(
                "Error generating lyrics:",
                JSON.stringify(error.response.data)
            );
            if (error.response.status === 402) {
                return new NextResponse(
                    JSON.stringify({ error: error.response.data.detail }),
                    {
                        status: 402,
                        headers: {
                            "Content-Type": "application/json",
                            ...corsHeaders,
                        },
                    }
                );
            }
            return new NextResponse(
                JSON.stringify({
                    error:
                        "Internal server error: " +
                        JSON.stringify(error.response.data.detail),
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                        ...corsHeaders,
                    },
                }
            );
        }
    } else {
        return new NextResponse("Method Not Allowed", {
            headers: {
                Allow: "POST",
                ...corsHeaders,
            },
            status: 405,
        });
    }
}

export async function OPTIONS(request: Request) {
    return new Response(null, {
        status: 200,
        headers: corsHeaders,
    });
}
