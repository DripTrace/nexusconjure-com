import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
	try {
		const { name, phone, reason } = await request.json();

		if (!name || !phone || !reason) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		await client.messages.create({
			body: `Thank you ${name} for registering with NexusConjure for ${reason}. We're excited to have you on board!`,
			from: fromNumber,
			to: phone,
		});

		return NextResponse.json(
			{ message: "SMS sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending SMS:", error);
		return NextResponse.json(
			{ error: "Failed to send SMS" },
			{ status: 500 }
		);
	}
}
