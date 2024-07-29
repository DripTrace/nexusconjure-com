// // import { NextResponse } from "next/server";
// // import twilio from "twilio";

// // const accountSid = process.env.TWILIO_ACCOUNT_SID;
// // const authToken = process.env.TWILIO_AUTH_TOKEN;
// // const fromNumber = process.env.TWILIO_PHONE_NUMBER;

// // const client = twilio(accountSid, authToken);

// // export async function POST(request: Request) {
// // 	try {
// // 		const { name, phone, reason } = await request.json();

// // 		if (!name || !phone || !reason) {
// // 			return NextResponse.json(
// // 				{ error: "Missing required fields" },
// // 				{ status: 400 }
// // 			);
// // 		}

// // 		await client.messages.create({
// // 			body: `Thank you ${name} for registering with NexusConjure for ${reason}. We're excited to have you on board!`,
// // 			from: fromNumber,
// // 			to: phone,
// // 		});

// // 		return NextResponse.json(
// // 			{ message: "SMS sent successfully" },
// // 			{ status: 200 }
// // 		);
// // 	} catch (error) {
// // 		console.error("Error sending SMS:", error);
// // 		return NextResponse.json(
// // 			{ error: "Failed to send SMS" },
// // 			{ status: 500 }
// // 		);
// // 	}
// // }

// import { NextResponse } from "next/server";
// import twilio from "twilio";
// import nodemailer from "nodemailer";
// import { IncomingForm, File } from "formidable";
// import fs from "fs/promises";
// import path from "path";
// import { renderToString } from "react-dom/server";
// import EmailTemplate from "@/components/templates/EmailTemplate";
// import React from "react";
// import type { Attachment } from "nodemailer/lib/mailer";

// export const config = {
// 	api: {
// 		bodyParser: false,
// 	},
// };

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const fromNumber = process.env.TWILIO_PHONE_NUMBER;

// const client = twilio(accountSid, authToken);

// const transporter = nodemailer.createTransport({
// 	host: process.env.SMTP_HOST,
// 	port: parseInt(process.env.SMTP_PORT || "587"),
// 	secure: process.env.SMTP_SECURE === "true",
// 	auth: {
// 		user: process.env.SMTP_USER,
// 		pass: process.env.SMTP_PASSWORD,
// 	},
// });

// async function saveFile(file: File): Promise<string> {
// 	const uploadDir = path.join(process.cwd(), "uploads");
// 	await fs.mkdir(uploadDir, { recursive: true });
// 	const newPath = path.join(
// 		uploadDir,
// 		file.originalFilename || "unnamed_file"
// 	);
// 	await fs.copyFile(file.filepath, newPath);
// 	await fs.unlink(file.filepath);
// 	return newPath;
// }

// export async function POST(request: Request) {
// 	const data = await request.formData();
// 	console.log("DEBUG 2", data);
// 	const file = data.get("file") as File | null;

// 	try {
// 		const name = data.get("name") as string;
// 		const email = data.get("email") as string;
// 		const phone = data.get("phone") as string;
// 		const reason = data.get("reason") as string;
// 		const smsOptIn = data.get("smsOptIn") as string;
// 		const emailOptIn = data.get("emailOptIn") as string;
// 		const availability = data.get("availability") as string;

// 		if (!name || !email || !phone || !reason || !availability) {
// 			return NextResponse.json(
// 				{ error: "Missing required fields" },
// 				{ status: 400 }
// 			);
// 		}

// 		let filePath = "";
// 		if (file) {
// 			filePath = await saveFile(file);
// 		}

// 		if (smsOptIn === "true") {
// 			await client.messages.create({
// 				body: `Thank you ${name} for registering with NexusConjure for ${reason}. We're excited to have you on board!`,
// 				from: fromNumber,
// 				to: phone,
// 			});
// 		}

// 		const commonEmailProps = {
// 			name,
// 			email,
// 			phone,
// 			reason,
// 			availability,
// 			smsOptIn: smsOptIn === "true",
// 			emailOptIn: emailOptIn === "true",
// 			fileUploaded: !!file,
// 		};

// 		const platformEmailHtml = renderToString(
// 			React.createElement(EmailTemplate, {
// 				...commonEmailProps,
// 				isPlatform: true,
// 				appointmentDate: "",
// 				appointmentTime: "",
// 			})
// 		);

// 		const customerEmailHtml = renderToString(
// 			React.createElement(EmailTemplate, {
// 				...commonEmailProps,
// 				isPlatform: false,
// 				appointmentDate: "",
// 				appointmentTime: "",
// 			})
// 		);

// 		// Send email to platform
// 		await transporter.sendMail({
// 			from: process.env.SMTP_FROM,
// 			to: "rpalm@driptrace.io",
// 			subject: "New NexusConjure Registration",
// 			html: platformEmailHtml,
// 			attachments: file
// 				? ([
// 						{
// 							filename: file.originalFilename || "",
// 							path: filePath,
// 						},
// 				  ] as Attachment[])
// 				: undefined,
// 		});

// 		// Send email to customer if they opted in
// 		if (emailOptIn === "true") {
// 			await transporter.sendMail({
// 				from: process.env.SMTP_FROM,
// 				to: email,
// 				subject: "NexusConjure Registration Confirmation",
// 				html: customerEmailHtml,
// 			});
// 		}

// 		// Here you would typically save the registration data to a database
// 		// Including the filePath if a file was uploaded

// 		return NextResponse.json(
// 			{ message: "Registration successful", filePath },
// 			{ status: 200 }
// 		);
// 	} catch (error) {
// 		console.error("Error processing registration:", error);
// 		return NextResponse.json(
// 			{ error: "Failed to process registration" },
// 			{ status: 500 }
// 		);
// 	}
// }

export default function SendSms() {}
