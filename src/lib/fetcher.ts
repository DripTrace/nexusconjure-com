import { getAuthToken } from "@/components/layout/authProvider";

const fetcher = async (url: string) => {
    const token = getAuthToken();
    console.log("Fetcher token:", token);
    try {
        const response = await fetch(url, {
            headers: {
                // Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        if (!response.ok) {
            console.error("Fetch error status:", response.status);
            console.error("Fetch error text:", await response.text());
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

export default fetcher;
