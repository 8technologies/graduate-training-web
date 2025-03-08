// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Forward to your real server (adjust URL)
        const res = await fetch("https://gtts-api.comfarnet.org/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            // Suppose your real back-end responds with { "message": "Invalid credentials", ... }
            // We parse it
            const errorData = await res.json();
            // Then we ONLY return { "message": "<whatever>" } from that object
            return NextResponse.json(
                { message: errorData.message || "Login failed" },
                { status: res.status }
            );
        }

        // If success, return the successful JSON
        const data = await res.json();
        return NextResponse.json(data);
    } catch (err: any) {
        // If there's a network issue or something else
        return NextResponse.json(
            { message: err.message || "Server error" },
            { status: 500 }
        );
    }
}

