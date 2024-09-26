"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/layout/authProvider";

const WAITLIST_API_URL = "/api/dashboard/api/waitlists/route/";

interface ErrorMessage {
    message: string;
    code: string;
}

interface Errors {
    email?: ErrorMessage[];
    [key: string]: ErrorMessage[] | undefined;
}

export default function WaitlistForm() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const auth = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch(WAITLIST_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.username}`,
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors(data);
            } else {
                // Handle successful submission
                console.log("Waitlist entry added successfully");
                setEmail("");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrors({
                general: [
                    { message: "An unexpected error occurred", code: "" },
                ],
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {errors.email && (
                    <ul className="text-red-500 mt-1">
                        {errors.email.map((error, index) => (
                            <li key={index}>{error.message}</li>
                        ))}
                    </ul>
                )}
            </div>
            {errors.general && (
                <ul className="text-red-500">
                    {errors.general.map((error, index) => (
                        <li key={index}>{error.message}</li>
                    ))}
                </ul>
            )}
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}
