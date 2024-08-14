// "use server"

// export default async function Page({ params, searchParams }) {
//     return <h1>Api</h1>
//   }

"use server";

interface PageProps {
	params: Record<string, string>;
	searchParams: Record<string, string | string[]>;
}

export default async function Page({ params, searchParams }: PageProps) {
	return <h1>Api</h1>;
}
