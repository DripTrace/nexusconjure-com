"use client";

import { useAuth } from "@/components/layout/authProvider";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import fetcher from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const WAITLIST_API_URL = "/api/dashboard/api/waitlists/route";

interface WaitlistItem {
    id: number;
    email: string;
    description: string;
}

export default function WaitlistTable() {
    const auth = useAuth();
    const router = useRouter();

    console.log("WaitlistTable auth state:", auth.isAuthenticated);
    console.log("WaitlistTable username:", auth.username);
    // console.log("THE COOKIE: >>>> ", auth.token);

    const { data, error, isLoading } = useSWR<WaitlistItem[]>(
        auth.isAuthenticated ? WAITLIST_API_URL : null,
        fetcher
    );

    useEffect(() => {
        if (!auth.loading && !auth.isAuthenticated) {
            console.log("Not authenticated, redirecting to login");
            router.push("/dashboard/login");
        }
    }, [auth.isAuthenticated, auth.loading, router]);

    console.log("SWR data:", data);
    console.log("SWR error:", error);
    console.log("SWR isLoading:", isLoading);

    if (auth.loading) return <div>Loading authentication...</div>;
    if (!auth.isAuthenticated) return null;
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    // Check if data is an array before mapping
    if (!Array.isArray(data)) {
        console.error("Expected array, got:", data);
        return <div>Error: Invalid data format</div>;
    }

    if (data.length === 0) {
        return <div>No waitlist entries found.</div>;
    }

    return (
        <Table>
            <TableCaption>A list of your waitlist entries.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item: WaitlistItem, idx: number) => (
                    <TableRow
                        className="hover:cursor-pointer"
                        key={`item-${idx}`}
                        onClick={() =>
                            router.push(`/dashboard/waitlists/${item.id}`)
                        }
                    >
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell className="font-medium">
                            {item.email}
                        </TableCell>
                        <TableCell className="font-medium">
                            {item.description}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
