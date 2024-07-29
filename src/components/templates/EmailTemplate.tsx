// import React from "react";

// interface EmailTemplateProps {
// 	name: string;
// 	email: string;
// 	phone: string;
// 	reason: string;
// 	availability: string;
// 	smsOptIn: boolean;
// 	emailOptIn: boolean;
// 	// fileUploaded: boolean;
// 	isPlatform: boolean;
// 	// appointmentDate: string;
// 	// appointmentTime: string;
// 	isNewCustomer: boolean;
// }

// const EmailTemplate: React.FC<EmailTemplateProps> = ({
// 	name,
// 	email,
// 	phone,
// 	reason,
// 	availability,
// 	isNewCustomer,
// 	smsOptIn,
// 	emailOptIn,
// 	// fileUploaded,
// 	isPlatform,
// 	// appointmentDate,
// 	// appointmentTime
// }) => {
// 	const primaryColor = isPlatform ? "#4A90E2" : "#6B46C1";
// 	const secondaryColor = isPlatform ? "#2C3E50" : "#4A5568";

// 	return (
// 		<div
// 			style={{
// 				fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// 				color: "#333",
// 				backgroundColor: "#f4f7f9",
// 				padding: "20px",
// 				maxWidth: "600px",
// 				margin: "0 auto",
// 			}}
// 		>
// 			<table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
// 				<tr>
// 					<td>
// 						<div
// 							style={{
// 								backgroundColor: primaryColor,
// 								color: "white",
// 								padding: "30px",
// 								textAlign: "center",
// 								borderRadius: "10px 10px 0 0",
// 							}}
// 						>
// 							<h1
// 								style={{
// 									margin: "0",
// 									fontSize: "28px",
// 									fontWeight: "bold",
// 								}}
// 							>
// 								{isPlatform
// 									? "New Registration Alert"
// 									: "Welcome to NexusConjure!"}
// 							</h1>
// 						</div>
// 					</td>
// 				</tr>
// 				<tr>
// 					<td>
// 						<div
// 							style={{
// 								backgroundColor: "white",
// 								padding: "30px",
// 								borderRadius: "0 0 10px 10px",
// 								boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
// 							}}
// 						>
// 							<p
// 								style={{
// 									fontSize: "18px",
// 									lineHeight: "1.6",
// 									color: secondaryColor,
// 									marginBottom: "20px",
// 								}}
// 							>
// 								{isPlatform
// 									? `A new user, ${name}, has just registered with NexusConjure. Here are the details:`
// 									: `Thank you for registering with NexusConjure, ${name}! We're excited to have you on board. Here's a summary of your registration:`}
// 							</p>
// 							<table
// 								cellPadding="0"
// 								cellSpacing="0"
// 								style={{ width: "100%", marginBottom: "20px" }}
// 							>
// 								<tr>
// 									<td
// 										style={{
// 											padding: "10px",
// 											backgroundColor: "#f0f4f8",
// 											fontWeight: "bold",
// 										}}
// 									>
// 										Name:
// 									</td>
// 									<td style={{ padding: "10px" }}>{name}</td>
// 								</tr>
// 								<tr>
// 									<td
// 										style={{
// 											padding: "10px",
// 											backgroundColor: "#f0f4f8",
// 											fontWeight: "bold",
// 										}}
// 									>
// 										Email:
// 									</td>
// 									<td style={{ padding: "10px" }}>{email}</td>
// 								</tr>
// 								<tr>
// 									<td
// 										style={{
// 											padding: "10px",
// 											backgroundColor: "#f0f4f8",
// 											fontWeight: "bold",
// 										}}
// 									>
// 										Phone:
// 									</td>
// 									<td style={{ padding: "10px" }}>{phone}</td>
// 								</tr>
// 								<tr>
// 									<td
// 										style={{
// 											padding: "10px",
// 											backgroundColor: "#f0f4f8",
// 											fontWeight: "bold",
// 										}}
// 									>
// 										Reason:
// 									</td>
// 									<td style={{ padding: "10px" }}>
// 										{reason}
// 									</td>
// 								</tr>
// 								<tr>
// 									<td
// 										style={{
// 											padding: "10px",
// 											backgroundColor: "#f0f4f8",
// 											fontWeight: "bold",
// 										}}
// 									>
// 										Availability:
// 									</td>
// 									<td style={{ padding: "10px" }}>
// 										{availability}
// 									</td>
// 								</tr>
// 							</table>
// 							<div
// 								style={{
// 									backgroundColor: "#f0f4f8",
// 									padding: "15px",
// 									borderRadius: "5px",
// 									marginBottom: "20px",
// 								}}
// 							>
// 								<p
// 									style={{
// 										margin: "0 0 10px 0",
// 										fontWeight: "bold",
// 									}}
// 								>
// 									Notification Preferences:
// 								</p>
// 								<p style={{ margin: "0" }}>
// 									SMS Notifications:{" "}
// 									{smsOptIn ? "✅ Opted In" : "❌ Opted Out"}
// 								</p>
// 								<p style={{ margin: "5px 0 0 0" }}>
// 									Email Updates:{" "}
// 									{emailOptIn
// 										? "✅ Opted In"
// 										: "❌ Opted Out"}
// 								</p>
// 							</div>
// 							{
// 								/*fileUploaded && */ isPlatform && (
// 									<p
// 										style={{
// 											backgroundColor: "#e6fffa",
// 											color: "#047481",
// 											padding: "10px",
// 											borderRadius: "5px",
// 											marginBottom: "20px",
// 										}}
// 									>
// 										📎 Additional file uploaded by the user.
// 										Please check the attachment.
// 									</p>
// 								)
// 							}
// 							<p
// 								style={{
// 									fontSize: "16px",
// 									lineHeight: "1.6",
// 									color: secondaryColor,
// 								}}
// 							>
// 								{isPlatform
// 									? "Please review this information and contact the registrant at your earliest convenience to discuss their needs and the suggested appointment time."
// 									: "We will contact you soon to discuss your registration and confirm your appointment. If you have any questions in the meantime, please don't hesitate to reach out."}
// 							</p>
// 							<div
// 								style={{
// 									textAlign: "center",
// 									marginTop: "30px",
// 								}}
// 							>
// 								<a
// 									href="https://nexusconjure.com/dashboard"
// 									style={{
// 										backgroundColor: primaryColor,
// 										color: "white",
// 										padding: "12px 24px",
// 										textDecoration: "none",
// 										borderRadius: "5px",
// 										fontWeight: "bold",
// 										display: "inline-block",
// 									}}
// 								>
// 									{isPlatform
// 										? "View Registration Details"
// 										: "Access Your Dashboard"}
// 								</a>
// 							</div>
// 						</div>
// 					</td>
// 				</tr>
// 				<tr>
// 					<td>
// 						<div
// 							style={{
// 								textAlign: "center",
// 								marginTop: "20px",
// 								color: "#718096",
// 								fontSize: "14px",
// 							}}
// 						>
// 							<p>© 2024 NexusConjure. All rights reserved.</p>
// 							<p>
// 								If you have any questions, please contact us at{" "}
// 								<a
// 									href="mailto:support@nexusconjure.com"
// 									style={{ color: primaryColor }}
// 								>
// 									support@nexusconjure.com
// 								</a>
// 							</p>
// 						</div>
// 					</td>
// 				</tr>
// 			</table>
// 		</div>
// 	);
// };

// export default EmailTemplate;

import React from "react";

export interface EmailTemplateProps {
	name: string;
	email: string;
	phone: string;
	reason: string;
	appointmentDate: string;
	appointmentTime: string;
	availability: string;
	smsOptIn: boolean;
	emailOptIn: boolean;
	fileUploaded: boolean;
	isPlatform: boolean;
	privacyPolicyOptIn: boolean;
	termsOfServiceOptIn: boolean;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
	name,
	email,
	phone,
	reason,
	appointmentDate,
	appointmentTime,
	availability,
	smsOptIn,
	emailOptIn,
	fileUploaded,
	isPlatform,
	privacyPolicyOptIn,
	termsOfServiceOptIn,
}) => {
	const primaryColor = "#4A90E2";
	const secondaryColor = "#2C3E50";

	return (
		<div
			style={{
				fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
				color: "#333",
				backgroundColor: "#f4f7f9",
				padding: "20px",
				maxWidth: "600px",
				margin: "0 auto",
			}}
		>
			<table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
				<tr>
					<td>
						<div
							style={{
								backgroundColor: primaryColor,
								color: "white",
								padding: "30px",
								textAlign: "center",
								borderRadius: "10px 10px 0 0",
							}}
						>
							<h1
								style={{
									margin: "0",
									fontSize: "28px",
									fontWeight: "bold",
								}}
							>
								{isPlatform
									? "New Alert Registration"
									: "NexusConjure Alert Confirmation"}
							</h1>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div
							style={{
								backgroundColor: "white",
								padding: "30px",
								borderRadius: "0 0 10px 10px",
								boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
							}}
						>
							<p
								style={{
									fontSize: "18px",
									lineHeight: "1.6",
									color: secondaryColor,
									marginBottom: "20px",
								}}
							>
								{isPlatform
									? `A new alert registration has been submitted by ${name}. Here are the details:`
									: `Thank you for registering for alerts with NexusConjure, ${name}! Here's a summary of your registration:`}
							</p>
							<table
								cellPadding="0"
								cellSpacing="0"
								style={{ width: "100%", marginBottom: "20px" }}
							>
								<tr>
									<td
										style={{
											padding: "10px",
											backgroundColor: "#f0f4f8",
											fontWeight: "bold",
										}}
									>
										Name:
									</td>
									<td style={{ padding: "10px" }}>{name}</td>
								</tr>
								<tr>
									<td
										style={{
											padding: "10px",
											backgroundColor: "#f0f4f8",
											fontWeight: "bold",
										}}
									>
										Email:
									</td>
									<td style={{ padding: "10px" }}>{email}</td>
								</tr>
								<tr>
									<td
										style={{
											padding: "10px",
											backgroundColor: "#f0f4f8",
											fontWeight: "bold",
										}}
									>
										Phone:
									</td>
									<td style={{ padding: "10px" }}>{phone}</td>
								</tr>
								<tr>
									<td
										style={{
											padding: "10px",
											backgroundColor: "#f0f4f8",
											fontWeight: "bold",
										}}
									>
										Reason:
									</td>
									<td style={{ padding: "10px" }}>
										{reason}
									</td>
								</tr>
								<tr>
									<td
										style={{
											padding: "10px",
											backgroundColor: "#f0f4f8",
											fontWeight: "bold",
										}}
									>
										Appointment:
									</td>
									<td style={{ padding: "10px" }}>
										{appointmentDate} at {appointmentTime}
									</td>
								</tr>
							</table>
							<div
								style={{
									backgroundColor: "#f0f4f8",
									padding: "15px",
									borderRadius: "5px",
									marginBottom: "20px",
								}}
							>
								<p
									style={{
										margin: "0 0 10px 0",
										fontWeight: "bold",
									}}
								>
									Notification Preferences:
								</p>
								<p style={{ margin: "0" }}>
									SMS Notifications:{" "}
									{smsOptIn ? "✅ Opted In" : "❌ Opted Out"}
								</p>
								<p style={{ margin: "5px 0 0 0" }}>
									Email Updates:{" "}
									{emailOptIn
										? "✅ Opted In"
										: "❌ Opted Out"}
								</p>
							</div>
							{fileUploaded && isPlatform && (
								<p
									style={{
										backgroundColor: "#e6fffa",
										color: "#047481",
										padding: "10px",
										borderRadius: "5px",
										marginBottom: "20px",
									}}
								>
									📎 Additional file uploaded by the user.
									Please check the attachment.
								</p>
							)}
							<p
								style={{
									fontSize: "16px",
									lineHeight: "1.6",
									color: secondaryColor,
								}}
							>
								{isPlatform
									? "Please review this information and take appropriate action based on the alert registration details."
									: "We've registered you for alerts based on the information provided. You'll receive notifications according to your preferences."}
							</p>
							<div
								style={{
									textAlign: "center",
									marginTop: "30px",
								}}
							>
								<a
									href="https://nexusconjure.com/dashboard"
									style={{
										backgroundColor: primaryColor,
										color: "white",
										padding: "12px 24px",
										textDecoration: "none",
										borderRadius: "5px",
										fontWeight: "bold",
										display: "inline-block",
									}}
								>
									{isPlatform
										? "View Alert Details"
										: "Manage Your Alerts"}
								</a>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div
							style={{
								textAlign: "center",
								marginTop: "20px",
								color: "#718096",
								fontSize: "14px",
							}}
						>
							<p>© 2024 NexusConjure. All rights reserved.</p>
							<p>
								If you have any questions, please contact us at{" "}
								<a
									href="mailto:support@nexusconjure.com"
									style={{ color: primaryColor }}
								>
									support@nexusconjure.com
								</a>
							</p>
						</div>
					</td>
				</tr>
			</table>
		</div>
	);
};

export default EmailTemplate;
