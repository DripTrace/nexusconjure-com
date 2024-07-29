"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, ChevronDown, Info } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import { Tooltip } from "react-tooltip";
import * as THREE from "three";

const reasonOptions = [
	{
		value: "web-digital-presence",
		label: "Web & Digital Presence",
		children: [
			{
				value: "website-development",
				label: "Custom Website Development",
			},
			{
				value: "ecommerce-solutions",
				label: "E-commerce Platform Integration",
			},
			{
				value: "cms-implementation",
				label: "Content Management System (CMS) Setup",
			},
			{
				value: "seo-optimization",
				label: "Search Engine Optimization (SEO)",
			},
			{
				value: "web-accessibility",
				label: "Web Accessibility Compliance",
			},
			{
				value: "progressive-web-apps",
				label: "Progressive Web App (PWA) Development",
			},
		],
	},
	{
		value: "business-operations",
		label: "Business Operations & Management",
		children: [
			{
				value: "erp-implementation",
				label: "Enterprise Resource Planning (ERP) Systems",
			},
			{
				value: "crm-solutions",
				label: "Customer Relationship Management (CRM) Tools",
			},
			{
				value: "business-intelligence",
				label: "Business Intelligence & Analytics",
			},
			{
				value: "project-management",
				label: "Project Management Solutions",
			},
			{
				value: "supply-chain-optimization",
				label: "Supply Chain Optimization",
			},
			{
				value: "inventory-management",
				label: "Inventory Management Systems",
			},
		],
	},
	{
		value: "financial-services",
		label: "Financial Services & FinTech",
		children: [
			{ value: "payment-gateways", label: "Payment Gateway Integration" },
			{
				value: "cryptocurrency-solutions",
				label: "Cryptocurrency & Blockchain Solutions",
			},
			{
				value: "financial-analytics",
				label: "Financial Analytics & Reporting",
			},
			{
				value: "risk-management-systems",
				label: "Risk Management Systems",
			},
			{
				value: "regulatory-compliance",
				label: "Financial Regulatory Compliance Tools",
			},
			{ value: "robo-advisory", label: "Robo-Advisory Platforms" },
		],
	},
	{
		value: "healthcare-medical",
		label: "Healthcare & Medical Technologies",
		children: [
			{
				value: "ehr-systems",
				label: "Electronic Health Record (EHR) Systems",
			},
			{
				value: "telemedicine-platforms",
				label: "Telemedicine & Remote Care Platforms",
			},
			{
				value: "medical-imaging",
				label: "Medical Imaging & Diagnostics Solutions",
			},
			{
				value: "healthcare-analytics",
				label: "Healthcare Analytics & Predictive Modeling",
			},
			{
				value: "patient-engagement",
				label: "Patient Engagement & Portal Systems",
			},
			{
				value: "clinical-trial-management",
				label: "Clinical Trial Management Systems",
			},
		],
	},
	{
		value: "education-elearning",
		label: "Education & E-Learning",
		children: [
			{
				value: "lms-development",
				label: "Learning Management System (LMS) Development",
			},
			{
				value: "educational-content",
				label: "Interactive Educational Content Creation",
			},
			{
				value: "student-information-systems",
				label: "Student Information Systems",
			},
			{
				value: "adaptive-learning",
				label: "Adaptive Learning Technologies",
			},
			{
				value: "virtual-classrooms",
				label: "Virtual Classroom Solutions",
			},
			{
				value: "education-analytics",
				label: "Educational Analytics & Performance Tracking",
			},
		],
	},
	{
		value: "media-entertainment",
		label: "Media & Entertainment",
		children: [
			{
				value: "streaming-platforms",
				label: "Video & Audio Streaming Platforms",
			},
			{
				value: "content-management",
				label: "Digital Asset Management Systems",
			},
			{
				value: "gaming-solutions",
				label: "Gaming & Interactive Entertainment Solutions",
			},
			{
				value: "ar-vr-experiences",
				label: "Augmented & Virtual Reality Experiences",
			},
			{
				value: "media-analytics",
				label: "Media Analytics & Audience Insights",
			},
			{
				value: "content-recommendation",
				label: "Content Recommendation Engines",
			},
		],
	},
	{
		value: "iot-smart-devices",
		label: "IoT & Smart Devices",
		children: [
			{ value: "iot-platforms", label: "IoT Platform Development" },
			{ value: "smart-home", label: "Smart Home & Building Automation" },
			{
				value: "industrial-iot",
				label: "Industrial IoT & Predictive Maintenance",
			},
			{ value: "wearable-tech", label: "Wearable Technology Solutions" },
			{ value: "iot-security", label: "IoT Security & Privacy" },
			{ value: "edge-computing", label: "Edge Computing Solutions" },
		],
	},
	{
		value: "ai-machine-learning",
		label: "AI & Machine Learning",
		children: [
			{
				value: "predictive-analytics",
				label: "Predictive Analytics & Forecasting",
			},
			{
				value: "nlp-solutions",
				label: "Natural Language Processing Applications",
			},
			{
				value: "computer-vision",
				label: "Computer Vision & Image Recognition",
			},
			{
				value: "chatbots-virtual-assistants",
				label: "Chatbots & Virtual Assistants",
			},
			{
				value: "recommendation-systems",
				label: "AI-Powered Recommendation Systems",
			},
			{
				value: "autonomous-systems",
				label: "Autonomous Systems & Robotics",
			},
		],
	},
	{
		value: "cybersecurity",
		label: "Cybersecurity & Data Protection",
		children: [
			{
				value: "threat-detection",
				label: "Advanced Threat Detection & Prevention",
			},
			{
				value: "encryption-solutions",
				label: "Data Encryption & Secure Communication",
			},
			{
				value: "identity-access-management",
				label: "Identity & Access Management",
			},
			{
				value: "security-compliance",
				label: "Security Compliance & Audit Tools",
			},
			{
				value: "incident-response",
				label: "Incident Response & Forensics",
			},
			{
				value: "blockchain-security",
				label: "Blockchain Security Solutions",
			},
		],
	},
	{
		value: "cloud-infrastructure",
		label: "Cloud & Infrastructure",
		children: [
			{ value: "cloud-migration", label: "Cloud Migration & Strategy" },
			{
				value: "multi-cloud-management",
				label: "Multi-Cloud Management Solutions",
			},
			{
				value: "serverless-architecture",
				label: "Serverless Architecture Implementation",
			},
			{
				value: "container-orchestration",
				label: "Container Orchestration (e.g., Kubernetes)",
			},
			{
				value: "infrastructure-as-code",
				label: "Infrastructure as Code (IaC)",
			},
			{ value: "cloud-security", label: "Cloud Security & Compliance" },
		],
	},
	{
		value: "blockchain-dlt",
		label: "Blockchain & Distributed Ledger Technologies",
		children: [
			{
				value: "smart-contracts",
				label: "Smart Contract Development & Auditing",
			},
			{
				value: "dapps",
				label: "Decentralized Application (DApp) Development",
			},
			{ value: "tokenization", label: "Asset Tokenization Platforms" },
			{
				value: "blockchain-integration",
				label: "Blockchain Integration for Existing Systems",
			},
			{
				value: "consensus-mechanisms",
				label: "Consensus Mechanism Design & Implementation",
			},
			{
				value: "crypto-exchanges",
				label: "Cryptocurrency Exchange Platforms",
			},
		],
	},
	{
		value: "energy-sustainability",
		label: "Energy & Sustainability",
		children: [
			{
				value: "energy-management",
				label: "Smart Grid & Energy Management Systems",
			},
			{
				value: "renewable-energy",
				label: "Renewable Energy Integration Solutions",
			},
			{
				value: "carbon-footprint",
				label: "Carbon Footprint Tracking & Reporting",
			},
			{
				value: "waste-management",
				label: "Waste Management & Recycling Solutions",
			},
			{
				value: "sustainable-supply-chain",
				label: "Sustainable Supply Chain Management",
			},
			{
				value: "environmental-monitoring",
				label: "Environmental Monitoring & Compliance",
			},
		],
	},
	{
		value: "transportation-logistics",
		label: "Transportation & Logistics",
		children: [
			{
				value: "fleet-management",
				label: "Fleet Management & Telematics",
			},
			{
				value: "route-optimization",
				label: "Route Optimization & Planning",
			},
			{
				value: "warehouse-automation",
				label: "Warehouse Management & Automation",
			},
			{
				value: "freight-tracking",
				label: "Real-time Freight Tracking & Visibility",
			},
			{
				value: "last-mile-delivery",
				label: "Last-Mile Delivery Optimization",
			},
			{
				value: "autonomous-vehicles",
				label: "Autonomous Vehicle Technologies",
			},
		],
	},
	{
		value: "agriculture-foodtech",
		label: "Agriculture & FoodTech",
		children: [
			{
				value: "precision-agriculture",
				label: "Precision Agriculture Solutions",
			},
			{
				value: "crop-monitoring",
				label: "Crop Monitoring & Yield Prediction",
			},
			{ value: "smart-irrigation", label: "Smart Irrigation Systems" },
			{
				value: "food-traceability",
				label: "Food Traceability & Safety Solutions",
			},
			{
				value: "vertical-farming",
				label: "Vertical Farming Technologies",
			},
			{
				value: "agri-marketplaces",
				label: "Agricultural Marketplaces & Supply Chain",
			},
		],
	},
	{
		value: "legal-regulatory",
		label: "Legal & Regulatory Technology",
		children: [
			{
				value: "legal-practice-management",
				label: "Legal Practice Management Systems",
			},
			{
				value: "contract-analysis",
				label: "AI-Powered Contract Analysis",
			},
			{
				value: "compliance-management",
				label: "Regulatory Compliance Management",
			},
			{
				value: "ip-management",
				label: "Intellectual Property Management",
			},
			{
				value: "legal-research",
				label: "Legal Research & Analytics Tools",
			},
			{
				value: "online-dispute-resolution",
				label: "Online Dispute Resolution Platforms",
			},
		],
	},
	{
		value: "manufacturing-industry40",
		label: "Manufacturing & Industry 4.0",
		children: [
			{
				value: "smart-manufacturing",
				label: "Smart Manufacturing Systems",
			},
			{
				value: "predictive-maintenance",
				label: "Predictive Maintenance Solutions",
			},
			{ value: "digital-twin", label: "Digital Twin Technology" },
			{
				value: "quality-control-ai",
				label: "AI-Powered Quality Control",
			},
			{
				value: "additive-manufacturing",
				label: "3D Printing & Additive Manufacturing",
			},
			{
				value: "industrial-automation",
				label: "Industrial Automation & Robotics",
			},
		],
	},
	{
		value: "research-development",
		label: "Research & Development",
		children: [
			{
				value: "lab-management",
				label: "Laboratory Information Management Systems (LIMS)",
			},
			{
				value: "research-collaboration",
				label: "Research Collaboration Platforms",
			},
			{
				value: "data-visualization",
				label: "Scientific Data Visualization Tools",
			},
			{
				value: "simulation-modeling",
				label: "Simulation & Modeling Software",
			},
			{
				value: "research-analytics",
				label: "Research Analytics & Insights",
			},
			{
				value: "grant-management",
				label: "Grant Management & Funding Platforms",
			},
		],
	},
	{
		value: "human-resources",
		label: "Human Resources & Workforce Management",
		children: [
			{
				value: "hris",
				label: "Human Resource Information Systems (HRIS)",
			},
			{
				value: "talent-acquisition",
				label: "AI-Powered Talent Acquisition",
			},
			{
				value: "employee-engagement",
				label: "Employee Engagement & Experience Platforms",
			},
			{
				value: "performance-management",
				label: "Performance Management Solutions",
			},
			{
				value: "workforce-analytics",
				label: "Workforce Analytics & Planning",
			},
			{
				value: "learning-development",
				label: "Learning & Development Platforms",
			},
		],
	},
	{
		value: "creative-design",
		label: "Creative & Design Technologies",
		children: [
			{
				value: "design-collaboration",
				label: "Design Collaboration Tools",
			},
			{ value: "3d-modeling", label: "3D Modeling & Rendering Software" },
			{
				value: "generative-design",
				label: "AI-Powered Generative Design",
			},
			{
				value: "motion-graphics",
				label: "Motion Graphics & Animation Tools",
			},
			{
				value: "virtual-production",
				label: "Virtual Production Technologies",
			},
			{
				value: "creative-asset-management",
				label: "Creative Asset Management Systems",
			},
		],
	},
	{
		value: "other",
		label: "Other Specialized Solutions",
		children: [
			{
				value: "custom-development",
				label: "Custom Software Development",
			},
			{
				value: "legacy-modernization",
				label: "Legacy System Modernization",
			},
			{ value: "data-migration", label: "Data Migration & Integration" },
			{ value: "api-development", label: "API Development & Management" },
			{
				value: "technology-consulting",
				label: "Technology Strategy Consulting",
			},
			{
				value: "emerging-tech",
				label: "Emerging Technology Exploration",
			},
		],
	},
];

// const AlertsPage: React.FC = () => {
// 	const [formData, setFormData] = useState<FormData>({
// 		name: "",
// 		email: "",
// 		phone: "",
// 		reason: "",
// 		smsOptIn: false,
// 		emailOptIn: false,
// 		availability: "",
// 	});
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const [submitMessage, setSubmitMessage] = useState("");
// 	const [errors, setErrors] = useState<Partial<FormData>>({});
// 	const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
// 	const [termsOfServiceAgreed, setTermsOfServiceAgreed] = useState(false);

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value, type, checked } = e.target;
// 		setFormData((prev) => ({
// 			...prev,
// 			[name]: type === "checkbox" ? checked : value,
// 		}));
// 		validateField(name, type === "checkbox" ? checked : value);
// 	};

// 	const handleSelectChange = (value: string) => {
// 		setFormData((prev) => ({ ...prev, reason: value }));
// 		validateField("reason", value);
// 	};

// 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (e.target.files && e.target.files[0]) {
// 			setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
// 		}
// 	};

// 	const validateField = (name: string, value: any) => {
// 		let error = "";
// 		switch (name) {
// 			case "name":
// 				error = value.trim() === "" ? "Name is required" : "";
// 				break;
// 			case "email":
// 				error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
// 					? "Invalid email address"
// 					: "";
// 				break;
// 			case "phone":
// 				error = !isValidPhoneNumber(value, "US")
// 					? "Invalid phone number"
// 					: "";
// 				break;
// 			case "reason":
// 				error = value === "" ? "Please select a reason" : "";
// 				break;
// 			case "availability":
// 				error =
// 					value === ""
// 						? "Please select your availability (must be at least 48 hours in advanced)"
// 						: "";
// 				break;
// 		}
// 		setErrors((prev) => ({ ...prev, [name]: error }));
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		const formErrors = Object.values(errors).filter(
// 			(error) => error !== ""
// 		);
// 		if (formErrors.length > 0) {
// 			setSubmitMessage("Please correct the errors in the form.");
// 			return;
// 		}

// 		setIsSubmitting(true);
// 		setSubmitMessage("");

// 		const formDataToSend = new FormData();
// 		Object.entries(formData).forEach(([key, value]) => {
// 			if (key !== "file") {
// 				formDataToSend.append(key, value.toString());
// 			}
// 		});
// 		if (formData.file) {
// 			formDataToSend.append("file", formData.file);
// 		}

// 		try {
// 			console.log("DEBUG 1", formDataToSend);
// 			const response = await fetch("/api/register-alerts/route", {
// 				method: "POST",
// 				body: formDataToSend,
// 			});

// 			if (response.ok) {
// 				setSubmitMessage(
// 					"Registration successful! Check your phone and email for confirmation messages."
// 				);
// 				setFormData({
// 					name: "",
// 					email: "",
// 					phone: "",
// 					reason: "",
// 					smsOptIn: false,
// 					emailOptIn: false,
// 					availability: "",
// 				});
// 			} else {
// 				setSubmitMessage("Registration failed. Please try again.");
// 			}
// 		} catch (error) {
// 			setSubmitMessage("An error occurred. Please try again later.");
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	return (
// 		<motion.div
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ duration: 0.5 }}
// 			className="p-8 bg-background text-foreground size-full flex items-center justify-center"
// 		>
// 			<div className="max-w-[60rem]">
// 				<h1 className="text-4xl font-bold mb-8 text-primary">
// 					Register for Alerts
// 				</h1>
// 				<Form.Root onSubmit={handleSubmit} className="space-y-4">
// 					<Form.Field name="name">
// 						<Form.Label className="block text-sm font-medium text-gray-300">
// 							Name
// 						</Form.Label>
// 						<Form.Control asChild>
// 							<input
// 								type="text"
// 								required
// 								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-blue-200 text-gray-900"
// 								value={formData.name}
// 								onChange={handleInputChange}
// 								name="name"
// 								title="Enter your full name"
// 							/>
// 						</Form.Control>
// 						{errors.name && (
// 							<p className="text-red-500 text-xs mt-1">
// 								{errors.name}
// 							</p>
// 						)}
// 					</Form.Field>
// 					<Form.Field name="email">
// 						<Form.Label className="block text-sm font-medium text-gray-300">
// 							Email
// 						</Form.Label>
// 						<Form.Control asChild>
// 							<input
// 								type="email"
// 								required
// 								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-blue-200 text-gray-900"
// 								value={formData.email}
// 								onChange={handleInputChange}
// 								name="email"
// 								title="Enter your email address"
// 							/>
// 						</Form.Control>
// 						{errors.email && (
// 							<p className="text-red-500 text-xs mt-1">
// 								{errors.email}
// 							</p>
// 						)}
// 					</Form.Field>
// 					<Form.Field name="phone">
// 						<Form.Label className="block text-sm font-medium text-gray-300">
// 							Phone Number
// 						</Form.Label>
// 						<Form.Control asChild>
// 							<input
// 								type="tel"
// 								required
// 								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-blue-200 text-gray-900"
// 								value={formData.phone}
// 								onChange={handleInputChange}
// 								name="phone"
// 								title="Enter your phone number"
// 							/>
// 						</Form.Control>
// 						{errors.phone && (
// 							<p className="text-red-500 text-xs mt-1">
// 								{errors.phone}
// 							</p>
// 						)}
// 					</Form.Field>
// 					<Form.Field name="reason">
// 						<Form.Label className="block text-sm font-medium text-gray-300">
// 							Reason for Platform Use
// 						</Form.Label>
// 						<Select.Root onValueChange={handleSelectChange}>
// 							<Select.Trigger
// 								className="mt-1 py-2 flex items-center justify-center w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-blue-200 text-blue-800"
// 								aria-label="Select reason for platform use"
// 							>
// 								<Select.Value placeholder="Select a reason" />
// 								<Select.Icon>
// 									<ChevronDown className="ml-2 h-4 w-4" />
// 								</Select.Icon>
// 							</Select.Trigger>
// 							<Select.Portal>
// 								<Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
// 									<Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-blue-200 text-blue-800 cursor-default">
// 										<ChevronDown className="rotate-180" />
// 									</Select.ScrollUpButton>
// 									<Select.Viewport className="p-2">
// 										{reasonOptions.map((category) => (
// 											<Select.Group key={category.value}>
// 												<Select.Label className="px-8 py-2 text-sm bg-blue-200 font-bold text-blue-800">
// 													{category.label}
// 												</Select.Label>
// 												{category.children.map(
// 													(option) => (
// 														<Select.Item
// 															key={option.value}
// 															value={option.value}
// 															className="relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 font-medium focus:bg-gray-100 cursor-default select-none outline-none"
// 														>
// 															<Select.ItemText>
// 																{option.label}
// 															</Select.ItemText>
// 															<Select.ItemIndicator className="absolute left-2 inline-flex items-center">
// 																<svg
// 																	width="15"
// 																	height="15"
// 																	viewBox="0 0 15 15"
// 																	fill="none"
// 																	xmlns="http://www.w3.org/2000/svg"
// 																>
// 																	<path
// 																		d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
// 																		fill="currentColor"
// 																		fillRule="evenodd"
// 																		clipRule="evenodd"
// 																	></path>
// 																</svg>
// 															</Select.ItemIndicator>
// 														</Select.Item>
// 													)
// 												)}
// 											</Select.Group>
// 										))}
// 									</Select.Viewport>
// 									<Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-blue-800 cursor-default">
// 										<ChevronDown />
// 									</Select.ScrollDownButton>
// 								</Select.Content>
// 							</Select.Portal>
// 						</Select.Root>
// 						{errors.reason && (
// 							<p className="text-red-500 text-xs mt-1">
// 								{errors.reason}
// 							</p>
// 						)}
// 					</Form.Field>

// 					<Form.Field name="smsOptIn">
// 						<div className="flex items-center">
// 							<Form.Control asChild>
// 								<input
// 									title="Agree to receive SMS alerts"
// 									type="checkbox"
// 									checked={formData.smsOptIn}
// 									onChange={handleInputChange}
// 									name="smsOptIn"
// 									className="mr-2"
// 								/>
// 							</Form.Control>
// 							<Form.Label className="text-sm text-gray-300">
// 								I agree to receive SMS alerts
// 							</Form.Label>
// 						</div>
// 					</Form.Field>

// 					<Form.Field name="emailOptIn">
// 						<div className="flex items-center">
// 							<Form.Control asChild>
// 								<input
// 									title="Agree to receive email updates"
// 									type="checkbox"
// 									checked={formData.emailOptIn}
// 									onChange={handleInputChange}
// 									name="emailOptIn"
// 									className="mr-2"
// 								/>
// 							</Form.Control>
// 							<Form.Label className="text-sm text-gray-300">
// 								I agree to receive email updates
// 							</Form.Label>
// 						</div>
// 					</Form.Field>

// 					<Form.Field name="availability">
// 						<Form.Label className="block text-sm font-medium text-gray-300">
// 							Preferred Availability
// 						</Form.Label>

// 						<Form.Control asChild>
// 							<input
// 								title="Select your availability"
// 								type="datetime-local"
// 								value={formData.availability}
// 								onChange={handleInputChange}
// 								name="availability"
// 								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-blue-200 text-gray-900"
// 							/>
// 						</Form.Control>
// 						{errors.availability && (
// 							<p className="text-red-500 text-xs mt-1">
// 								{errors.availability}
// 							</p>
// 						)}
// 					</Form.Field>

// 					<Form.Field name="file">
// 						<Form.Label className="block text-sm font-medium text-gray-300">
// 							Upload File (Optional)
// 						</Form.Label>
// 						<Form.Control asChild>
// 							<input
// 								title="Upload a file"
// 								type="file"
// 								onChange={handleFileChange}
// 								className="mt-1 block w-full text-sm text-gray-300
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-full file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-primary file:text-primary-foreground
//                 hover:file:bg-primary-dark"
// 							/>
// 						</Form.Control>
// 					</Form.Field>

// 					<Form.Field name="privacyPolicy">
// 						<div className="flex items-center">
// 							<input
// 								title="Agree to the Privacy"
// 								type="checkbox"
// 								id="privacyPolicy"
// 								checked={privacyPolicyAgreed}
// 								onChange={(e) =>
// 									setPrivacyPolicyAgreed(e.target.checked)
// 								}
// 								className="mr-2"
// 							/>
// 							<Form.Label
// 								htmlFor="privacyPolicy"
// 								className="text-sm text-gray-300"
// 							>
// 								I agree to the{" "}
// 								<a
// 									href="/privacy"
// 									className="text-primary hover:underline"
// 									target="_blank"
// 									rel="noopener noreferrer"
// 								>
// 									Privacy Policy
// 								</a>
// 							</Form.Label>
// 						</div>
// 					</Form.Field>

// 					<Form.Field name="termsOfService">
// 						<div className="flex items-center">
// 							<input
// 								title="Agree to the Terms of Service"
// 								type="checkbox"
// 								id="termsOfService"
// 								checked={termsOfServiceAgreed}
// 								onChange={(e) =>
// 									setTermsOfServiceAgreed(e.target.checked)
// 								}
// 								className="mr-2"
// 							/>
// 							<Form.Label
// 								htmlFor="termsOfService"
// 								className="text-sm text-gray-300"
// 							>
// 								I agree to the{" "}
// 								<a
// 									href="/terms-of-service"
// 									className="text-primary hover:underline"
// 									target="_blank"
// 									rel="noopener noreferrer"
// 								>
// 									Terms of Service
// 								</a>
// 							</Form.Label>
// 						</div>
// 					</Form.Field>

// 					<Form.Submit asChild>
// 						<motion.button
// 							whileHover={{ scale: 1.05 }}
// 							whileTap={{ scale: 0.95 }}
// 							className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-lg flex items-center justify-center"
// 							disabled={isSubmitting}
// 							type="submit"
// 							title="Submit registration form"
// 						>
// 							{isSubmitting ? "Submitting..." : "Register"}
// 							<Send className="ml-2 h-4 w-4" />
// 						</motion.button>
// 					</Form.Submit>
// 				</Form.Root>
// 				{submitMessage && (
// 					<p
// 						className={`mt-4 text-center text-sm font-medium ${
// 							submitMessage.includes("successful")
// 								? "text-green-600"
// 								: "text-red-600"
// 						}`}
// 					>
// 						{submitMessage}
// 					</p>
// 				)}
// 			</div>
// 		</motion.div>
// 	);
// };

// export default AlertsPage;

// ("use client");

// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Bell, Send, ChevronDown, Info } from "lucide-react";
// import * as Form from "@radix-ui/react-form";
// import * as Select from "@radix-ui/react-select";
// import { isValidPhoneNumber } from "libphonenumber-js";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Box, OrbitControls } from "@react-three/drei";
// import { Tooltip } from "react-tooltip";
// import * as THREE from "three";

// interface FormData {
// 	name: string;
// 	email: string;
// 	phone: string;
// 	reason: string;
// 	smsOptIn: boolean;
// 	emailOptIn: boolean;
// 	availability: string;
// 	file?: File;
// }

// const AnimatedBox = () => {
// 	const meshRef = useRef<THREE.Mesh>(null);

// 	useFrame((state, delta) => {
// 		if (meshRef.current) {
// 			meshRef.current.rotation.x += delta;
// 			meshRef.current.rotation.y += delta * 0.5;
// 		}
// 	});

// 	return (
// 		<Box ref={meshRef} args={[1, 1, 1]}>
// 			<meshStandardMaterial color="#6B46C1" />
// 		</Box>
// 	);
// };

// const AlertsPage: React.FC = () => {
// 	const [formData, setFormData] = useState<FormData>({
// 		name: "",
// 		email: "",
// 		phone: "",
// 		reason: "",
// 		smsOptIn: false,
// 		emailOptIn: false,
// 		availability: "",
// 	});
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const [submitMessage, setSubmitMessage] = useState("");
// 	const [errors, setErrors] = useState<Partial<FormData>>({});
// 	const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
// 	const [termsOfServiceAgreed, setTermsOfServiceAgreed] = useState(false);

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value, type, checked } = e.target;
// 		setFormData((prev) => ({
// 			...prev,
// 			[name]: type === "checkbox" ? checked : value,
// 		}));
// 		validateField(name, type === "checkbox" ? checked : value);
// 	};

// 	const handleSelectChange = (value: string) => {
// 		setFormData((prev) => ({ ...prev, reason: value }));
// 		validateField("reason", value);
// 	};

// 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (e.target.files && e.target.files[0]) {
// 			setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
// 		}
// 	};

// 	const validateField = (name: string, value: any) => {
// 		let error = "";
// 		switch (name) {
// 			case "name":
// 				error = value.trim() === "" ? "Name is required" : "";
// 				break;
// 			case "email":
// 				error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
// 					? "Invalid email address"
// 					: "";
// 				break;
// 			case "phone":
// 				error = !isValidPhoneNumber(value, "US")
// 					? "Invalid phone number"
// 					: "";
// 				break;
// 			case "reason":
// 				error = value === "" ? "Please select a reason" : "";
// 				break;
// 			case "availability":
// 				error =
// 					value === ""
// 						? "Please select your availability (must be at least 48 hours in advanced)"
// 						: "";
// 				break;
// 		}
// 		setErrors((prev) => ({ ...prev, [name]: error }));
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		const formErrors = Object.values(errors).filter(
// 			(error) => error !== ""
// 		);
// 		if (formErrors.length > 0) {
// 			setSubmitMessage("Please correct the errors in the form.");
// 			return;
// 		}

// 		setIsSubmitting(true);
// 		setSubmitMessage("");

// 		const formDataToSend = new FormData();
// 		Object.entries(formData).forEach(([key, value]) => {
// 			if (key !== "file") {
// 				formDataToSend.append(key, value.toString());
// 			}
// 		});
// 		if (formData.file) {
// 			formDataToSend.append("file", formData.file);
// 		}

// 		try {
// 			console.log("DEBUG 1", formDataToSend);
// 			const response = await fetch("/api/register-alerts/route", {
// 				method: "POST",
// 				body: formDataToSend,
// 			});

// 			if (response.ok) {
// 				setSubmitMessage(
// 					"Registration successful! Check your phone and email for confirmation messages."
// 				);
// 				setFormData({
// 					name: "",
// 					email: "",
// 					phone: "",
// 					reason: "",
// 					smsOptIn: false,
// 					emailOptIn: false,
// 					availability: "",
// 				});
// 			} else {
// 				setSubmitMessage("Registration failed. Please try again.");
// 			}
// 		} catch (error) {
// 			setSubmitMessage("An error occurred. Please try again later.");
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};
// 	return (
// 		<motion.div
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ duration: 0.5 }}
// 			className="p-8 bg-gradient-to-br from-purple-900 to-indigo-800 text-white min-h-screen"
// 		>
// 			<div className="max-w-4xl mx-auto">
// 				<div className="flex items-center justify-between mb-8">
// 					<h1 className="text-4xl font-bold">Register for Alerts</h1>
// 					<div className="w-32 h-32">
// 						<Canvas>
// 							<ambientLight intensity={0.5} />
// 							<pointLight position={[10, 10, 10]} />
// 							<AnimatedBox />
// 							<OrbitControls enableZoom={false} />
// 						</Canvas>
// 					</div>
// 				</div>

// 				<Form.Root onSubmit={handleSubmit} className="space-y-6">
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// 						<Form.Field name="name">
// 							<Form.Label className="block text-sm font-medium mb-1">
// 								Name
// 							</Form.Label>
// 							<Form.Control asChild>
// 								<input
// 									title="Enter your full name"
// 									type="text"
// 									required
// 									className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// 									value={formData.name}
// 									onChange={handleInputChange}
// 									name="name"
// 								/>
// 							</Form.Control>
// 						</Form.Field>

// 						<Form.Field name="email">
// 							<Form.Label className="block text-sm font-medium mb-1">
// 								Email
// 							</Form.Label>
// 							<Form.Control asChild>
// 								<input
// 									title="Enter your email address"
// 									type="email"
// 									required
// 									className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// 									value={formData.email}
// 									onChange={handleInputChange}
// 									name="email"
// 								/>
// 							</Form.Control>
// 						</Form.Field>

// 						<Form.Field name="phone">
// 							<Form.Label className="block text-sm font-medium mb-1">
// 								Phone Number
// 							</Form.Label>
// 							<Form.Control asChild>
// 								<input
// 									title="Enter your phone number"
// 									type="tel"
// 									required
// 									className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// 									value={formData.phone}
// 									onChange={handleInputChange}
// 									name="phone"
// 								/>
// 							</Form.Control>
// 						</Form.Field>

// 						<Form.Field name="reason">
// 							<div className="flex items-center">
// 								<Form.Label className="block text-sm font-medium mb-1">
// 									Reason for Platform Use
// 								</Form.Label>
// 								<Info
// 									className="ml-2 text-purple-300 cursor-pointer"
// 									data-tooltip-id="reason-tooltip"
// 									data-tooltip-content="This can be changed later if needed."
// 								/>
// 							</div>
// 							<Select.Root onValueChange={handleSelectChange}>
// 								<Select.Trigger className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center">
// 									<Select.Value placeholder="Select a reason" />
// 									<Select.Icon>
// 										<ChevronDown className="h-4 w-4" />
// 									</Select.Icon>
// 								</Select.Trigger>
// 								<Select.Portal>
// 									<Select.Content className="bg-purple-900 rounded-md shadow-lg">
// 										<Select.Viewport className="p-2">
// 											{reasonOptions.map((option) => (
// 												<Select.Item
// 													key={option.value}
// 													value={option.value}
// 													className="px-2 py-1 rounded hover:bg-purple-700 cursor-pointer"
// 												>
// 													<Select.ItemText>
// 														{option.label}
// 													</Select.ItemText>
// 												</Select.Item>
// 											))}
// 										</Select.Viewport>
// 									</Select.Content>
// 								</Select.Portal>
// 							</Select.Root>
// 						</Form.Field>
// 					</div>

// 					<Form.Field name="availability">
// 						<div className="flex items-center">
// 							<Form.Label className="block text-sm font-medium mb-1">
// 								Preferred Availability
// 							</Form.Label>
// 							<Info
// 								className="ml-2 text-purple-300 cursor-pointer"
// 								data-tooltip-id="availability-tooltip"
// 								data-tooltip-content="Suggested appointments must be at least 48 hours in advance."
// 							/>
// 						</div>
// 						<Form.Control asChild>
// 							<input
// 								title="Select your availability"
// 								type="datetime-local"
// 								required
// 								className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// 								value={formData.availability}
// 								onChange={handleInputChange}
// 								name="availability"
// 								min={new Date(Date.now() + 172800000)
// 									.toISOString()
// 									.slice(0, 16)}
// 							/>
// 						</Form.Control>
// 					</Form.Field>

// 					<div className="flex space-x-4">
// 						<Form.Field
// 							name="smsOptIn"
// 							className="flex items-center"
// 						>
// 							<Form.Control asChild>
// 								<input
// 									title="Agree to receive SMS alerts"
// 									type="checkbox"
// 									checked={formData.smsOptIn}
// 									onChange={handleInputChange}
// 									name="smsOptIn"
// 									className="mr-2"
// 								/>
// 							</Form.Control>
// 							<Form.Label>Opt-in for SMS alerts</Form.Label>
// 						</Form.Field>

// 						<Form.Field
// 							name="emailOptIn"
// 							className="flex items-center"
// 						>
// 							<Form.Control asChild>
// 								<input
// 									title="Agree to receive email updates"
// 									type="checkbox"
// 									checked={formData.emailOptIn}
// 									onChange={handleInputChange}
// 									name="emailOptIn"
// 									className="mr-2"
// 								/>
// 							</Form.Control>
// 							<Form.Label>Opt-in for email updates</Form.Label>
// 						</Form.Field>
// 					</div>

// 					<Form.Field name="file">
// 						<Form.Label className="block text-sm font-medium mb-1">
// 							Upload File (Optional)
// 						</Form.Label>
// 						<Form.Control asChild>
// 							<input
// 								title="Upload a file"
// 								type="file"
// 								onChange={handleFileChange}
// 								className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// 							/>
// 						</Form.Control>
// 					</Form.Field>

// 					<Form.Submit asChild>
// 						<motion.button
// 							whileHover={{ scale: 1.05 }}
// 							whileTap={{ scale: 0.95 }}
// 							className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md shadow-lg flex items-center justify-center"
// 							disabled={isSubmitting}
// 							type="submit"
// 						>
// 							{isSubmitting ? "Submitting..." : "Register"}
// 							<Send className="ml-2 h-4 w-4" />
// 						</motion.button>
// 					</Form.Submit>
// 				</Form.Root>

// 				{submitMessage && (
// 					<p
// 						className={`mt-4 text-center text-sm font-medium ${
// 							submitMessage.includes("successful")
// 								? "text-green-400"
// 								: "text-red-400"
// 						}`}
// 					>
// 						{submitMessage}
// 					</p>
// 				)}
// 			</div>

// 			<Tooltip id="reason-tooltip" />
// 			<Tooltip id="availability-tooltip" />
// 		</motion.div>
// 	);
// };

// export default AlertsPage;

interface FormData {
	name: string;
	email: string;
	phone: string;
	reason: string;
	smsOptIn: boolean;
	emailOptIn: boolean;
	availability: string;
	file?: File;
	privacyPolicyOptIn: boolean;
	termsOfServiceOptIn: boolean;
}

const AnimatedBox = () => {
	const meshRef = useRef<THREE.Mesh>(null);

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.x += delta;
			meshRef.current.rotation.y += delta * 0.5;
		}
	});

	return (
		<Box ref={meshRef} args={[1, 1, 1]}>
			<meshStandardMaterial color="#6B46C1" />
		</Box>
	);
};

const AlertsPage: React.FC = () => {
	const smsTooltipContent = `
    Receive important alerts via SMS.
    
    You can opt out at any time by:
    • Texting "STOP-TEXT" to our number
    • Updating your preferences in your account settings
  `;

	const emailTooltipContent = `
    Receive updates and newsletters via email.
    
    You can opt out at any time by:
    • Texting "STOP-EMAIL" to our number
    • Updating your preferences in your account settings
  `;
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		phone: "",
		reason: "",
		smsOptIn: false,
		emailOptIn: false,
		availability: "",
		privacyPolicyOptIn: false,
		termsOfServiceOptIn: false,
	});
	const [file, setFile] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");
	const [errors, setErrors] = useState<Partial<FormData>>({});
	// const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
	// const [termsOfServiceAgreed, setTermsOfServiceAgreed] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
		validateField(name, type === "checkbox" ? checked : value);
	};

	const handleSelectChange = (value: string) => {
		setFormData((prev) => ({ ...prev, reason: value }));
		validateField("reason", value);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const validateField = (name: string, value: any) => {
		let error = "";
		switch (name) {
			case "name":
				error = value.trim() === "" ? "Name is required" : "";
				break;
			case "email":
				error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
					? "Invalid email address"
					: "";
				break;
			case "phone":
				error = !isValidPhoneNumber(value, "US")
					? "Invalid phone number"
					: "";
				break;
			case "reason":
				error = value === "" ? "Please select a reason" : "";
				break;
			case "availability":
				error =
					value === ""
						? "Please select your availability (must be at least 48 hours in advanced)"
						: "";
				break;
		}
		setErrors((prev) => ({ ...prev, [name]: error }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formErrors = Object.values(errors).filter(
			(error) => error !== ""
		);
		if (formErrors.length > 0) {
			setSubmitMessage("Please correct the errors in the form.");
			return;
		}

		setIsSubmitting(true);
		setSubmitMessage("");

		const formDataToSend = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			formDataToSend.append(key, value.toString());
		});

		if (file) {
			formDataToSend.append("file", file);
		}

		try {
			const response = await fetch("/api/register-alerts/route", {
				method: "POST",
				body: formDataToSend,
			});

			if (response.ok) {
				setSubmitMessage(
					"Registration successful! Check your phone and email for confirmation messages."
				);
				setFormData({
					name: "",
					email: "",
					phone: "",
					reason: "",
					availability: "",
					smsOptIn: false,
					emailOptIn: false,
					privacyPolicyOptIn: false,
					termsOfServiceOptIn: false,
				});
				setFile(null);
			} else {
				setSubmitMessage("Registration failed. Please try again.");
			}
		} catch (error) {
			setSubmitMessage("An error occurred. Please try again later.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="p-8 bg-gradient-to-br from-purple-900 to-indigo-800 text-white min-h-screen"
		>
			<div className="max-w-4xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-4xl font-bold">Register for Alerts</h1>
					<div className="w-32 h-32">
						<Canvas>
							<ambientLight intensity={0.5} />
							<pointLight position={[10, 10, 10]} />
							<AnimatedBox />
							<OrbitControls enableZoom={false} />
						</Canvas>
					</div>
				</div>

				<Form.Root onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Form.Field name="name">
							<Form.Label className="block text-sm font-medium mb-1">
								Name
							</Form.Label>
							<Form.Control asChild>
								<input
									title="Enter your full name"
									type="text"
									required
									className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
									value={formData.name}
									onChange={handleInputChange}
									name="name"
								/>
							</Form.Control>
						</Form.Field>

						<Form.Field name="email">
							<Form.Label className="block text-sm font-medium mb-1">
								Email
							</Form.Label>
							<Form.Control asChild>
								<input
									title="Enter your email address"
									type="email"
									required
									className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
									value={formData.email}
									onChange={handleInputChange}
									name="email"
								/>
							</Form.Control>
						</Form.Field>

						<Form.Field name="phone">
							<Form.Label className="block text-sm font-medium mb-1">
								Phone Number
							</Form.Label>
							<Form.Control asChild>
								<input
									title="Enter your phone number"
									type="tel"
									required
									className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
									value={formData.phone}
									onChange={handleInputChange}
									name="phone"
								/>
							</Form.Control>
						</Form.Field>

						<Form.Field name="reason">
							<div className="flex items-center">
								<Form.Label className="block text-sm font-medium mb-1">
									Reason for Platform Use
								</Form.Label>
								<Info
									className="ml-2 text-purple-300 cursor-pointer"
									data-tooltip-id="reason-tooltip"
									data-tooltip-content="This can be changed later if needed."
								/>
							</div>
							<Select.Root onValueChange={handleSelectChange}>
								<Select.Trigger className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center">
									<Select.Value placeholder="Select a reason" />
									<Select.Icon>
										<ChevronDown className="h-4 w-4" />
									</Select.Icon>
								</Select.Trigger>
								<Select.Portal>
									<Select.Content className="bg-purple-900 rounded-md shadow-lg max-h-80 overflow-auto">
										<Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-purple-900 text-white cursor-default">
											<ChevronDown className="rotate-180" />
										</Select.ScrollUpButton>
										<Select.Viewport className="p-2">
											{reasonOptions.map((category) => (
												<Select.Group
													key={category.value}
												>
													<Select.Label className="px-2 py-1 text-sm font-bold text-purple-300">
														{category.label}
													</Select.Label>
													{category.children.map(
														(option) => (
															<Select.Item
																key={
																	option.value
																}
																value={
																	option.value
																}
																className="px-2 py-1 rounded hover:bg-purple-700 cursor-pointer"
															>
																<Select.ItemText>
																	{
																		option.label
																	}
																</Select.ItemText>
															</Select.Item>
														)
													)}
												</Select.Group>
											))}
										</Select.Viewport>
										<Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-purple-900 text-white cursor-default">
											<ChevronDown />
										</Select.ScrollDownButton>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
						</Form.Field>
					</div>

					<Form.Field name="availability">
						<div className="flex items-center">
							<Form.Label className="block text-sm font-medium mb-1">
								Preferred Availability
							</Form.Label>
							<Info
								className="ml-2 text-purple-300 cursor-pointer"
								data-tooltip-id="availability-tooltip"
								data-tooltip-content="Suggested appointments must be at least 48 hours in advance."
							/>
						</div>
						<Form.Control asChild>
							<input
								title="Select your availability"
								type="datetime-local"
								required
								className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
								value={formData.availability}
								onChange={handleInputChange}
								name="availability"
								min={new Date(Date.now() + 172800000)
									.toISOString()
									.slice(0, 16)}
							/>
						</Form.Control>
					</Form.Field>
					<Form.Field name="file">
						<div className="flex items-center">
							<Form.Label className="block text-sm font-medium mb-1">
								Upload File (Optional)
							</Form.Label>
							<Info
								className="ml-2 text-purple-300 cursor-pointer"
								data-tooltip-id="file-tooltip"
								data-tooltip-content="Upload relevant documents or files that represent your business assets."
							/>
						</div>
						<Form.Control asChild>
							<input
								title="Upload a file"
								type="file"
								onChange={handleFileChange}
								className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
						</Form.Control>
					</Form.Field>

					<div className="flex space-x-6">
						<div className="flex space-x-6">
							<Form.Field
								name="smsOptIn"
								className="flex items-center"
							>
								<Form.Control asChild>
									<input
										type="checkbox"
										checked={formData.smsOptIn}
										onChange={handleInputChange}
										name="smsOptIn"
										className="mr-2"
									/>
								</Form.Control>
								<Form.Label className="text-sm">
									Opt-in for SMS alerts
								</Form.Label>
								<Info
									className="ml-2 text-purple-300 cursor-pointer"
									data-tooltip-id="sms-optin-tooltip"
								/>
							</Form.Field>

							<Form.Field
								name="emailOptIn"
								className="flex items-center"
							>
								<Form.Control asChild>
									<input
										type="checkbox"
										checked={formData.emailOptIn}
										onChange={handleInputChange}
										name="emailOptIn"
										className="mr-2"
									/>
								</Form.Control>
								<Form.Label className="text-sm">
									Opt-in for email updates
								</Form.Label>
								<Info
									className="ml-2 text-purple-300 cursor-pointer"
									data-tooltip-id="email-optin-tooltip"
								/>
							</Form.Field>
						</div>
					</div>

					<div className="space-y-2">
						<Form.Field
							name="privacyPolicyOptIn"
							className="flex items-center"
						>
							<Form.Control asChild>
								<input
									title="Agree to the Privacy Policy"
									type="checkbox"
									checked={formData.privacyPolicyOptIn}
									onChange={handleInputChange}
									name="privacyPolicyOptIn"
									className="mr-2"
								/>
							</Form.Control>
							<Form.Label>
								I agree to the{" "}
								<a
									href="/privacy-policy"
									target="_blank"
									rel="noopener noreferrer"
									className="text-purple-300 hover:text-purple-100 underline"
								>
									Privacy Policy
								</a>
							</Form.Label>
							<Info
								className="ml-2 text-purple-300 cursor-pointer"
								data-tooltip-id="privacy-tooltip"
								data-tooltip-content="Read our Privacy Policy to understand how we handle your data."
							/>
						</Form.Field>

						<Form.Field
							name="termsOfServiceOptIn"
							className="flex items-center"
						>
							<Form.Control asChild>
								<input
									title="Agree to the Terms of Service"
									type="checkbox"
									checked={formData.termsOfServiceOptIn}
									onChange={handleInputChange}
									name="termsOfServiceOptIn"
									className="mr-2"
								/>
							</Form.Control>
							<Form.Label>
								I agree to the{" "}
								<a
									href="/terms-of-service"
									target="_blank"
									rel="noopener noreferrer"
									className="text-purple-300 hover:text-purple-100 underline"
								>
									Terms of Service
								</a>
							</Form.Label>
							<Info
								className="ml-2 text-purple-300 cursor-pointer"
								data-tooltip-id="terms-tooltip"
								data-tooltip-content="Review our Terms of Service before agreeing."
							/>
						</Form.Field>
					</div>

					<Form.Submit asChild>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md shadow-lg flex items-center justify-center"
							disabled={isSubmitting}
							type="submit"
						>
							{isSubmitting ? "Submitting..." : "Register"}
							<Send className="ml-2 h-4 w-4" />
						</motion.button>
					</Form.Submit>
				</Form.Root>

				{submitMessage && (
					<p
						className={`mt-4 text-center text-sm font-medium ${
							submitMessage.includes("successful")
								? "text-green-400"
								: "text-red-400"
						}`}
					>
						{submitMessage}
					</p>
				)}
			</div>
			<Tooltip
				id="sms-optin-tooltip"
				place="top"
				content={smsTooltipContent}
				className="max-w-xs whitespace-pre-line"
			/>
			<Tooltip
				id="email-optin-tooltip"
				place="top"
				content={emailTooltipContent}
				className="max-w-xs whitespace-pre-line"
			/>
			<Tooltip id="reason-tooltip" />
			<Tooltip id="availability-tooltip" />
			<Tooltip id="file-tooltip" />
			<Tooltip id="privacy-tooltip" />
			<Tooltip id="terms-tooltip" />
		</motion.div>
	);
};

export default AlertsPage;
