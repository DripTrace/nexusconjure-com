"use client";

import React from "react";
import { motion } from "framer-motion";
import {
	Layers,
	Shield,
	Zap,
	Users,
	BarChart,
	Globe,
	Briefcase,
} from "lucide-react";

const FeaturesPage: React.FC = () => {
	const features = [
		{
			title: "All-in-One Platform",
			description:
				"Access a wide range of digital tools and services in one place, from website creation to advanced data analytics.",
			icon: <Layers className="w-12 h-12 text-primary" />,
		},
		{
			title: "Industry-Specific Solutions",
			description:
				"Tailored features and workflows designed to meet the unique needs of your specific industry.",
			icon: <Briefcase className="w-12 h-12 text-primary" />,
		},
		{
			title: "Enhanced Security",
			description:
				"State-of-the-art security measures to protect your data and ensure compliance with industry regulations.",
			icon: <Shield className="w-12 h-12 text-primary" />,
		},
		{
			title: "Rapid Implementation",
			description:
				"Get up and running quickly with our user-friendly interface and guided setup process.",
			icon: <Zap className="w-12 h-12 text-primary" />,
		},
		{
			title: "Collaboration Tools",
			description:
				"Streamline teamwork with built-in communication and project management features.",
			icon: <Users className="w-12 h-12 text-primary" />,
		},
		{
			title: "Insightful Analytics",
			description:
				"Gain valuable insights into your operations with easy-to-understand data visualizations and reports.",
			icon: <BarChart className="w-12 h-12 text-primary" />,
		},
	];

	const useCases = [
		{
			industry: "Healthcare",
			example:
				"Streamline patient management and ensure HIPAA compliance.",
		},
		{
			industry: "Finance",
			example:
				"Enhance security for financial transactions and automate reporting.",
		},
		{
			industry: "Education",
			example:
				"Create engaging online learning experiences and track student progress.",
		},
		{
			industry: "Retail",
			example:
				"Manage inventory across multiple channels and personalize customer experiences.",
		},
	];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="p-8 bg-background text-foreground"
		>
			<motion.h1
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.5 }}
				className="text-4xl font-bold text-primary text-center mb-8"
			>
				NexusConjure Features
			</motion.h1>

			<p className="text-center mb-12 text-muted-foreground max-w-2xl mx-auto">
				Discover how NexusConjure can transform your business with its
				powerful, yet easy-to-use features designed for various
				industries.
			</p>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
				{features.map((feature, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						className="bg-card p-6 rounded-lg shadow-md"
					>
						<div className="flex items-center mb-4">
							{feature.icon}
							<h2 className="text-xl font-semibold ml-4">
								{feature.title}
							</h2>
						</div>
						<p className="text-muted-foreground">
							{feature.description}
						</p>
					</motion.div>
				))}
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className="mb-12"
			>
				<h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
					<Globe className="w-8 h-8 text-primary mr-2" />
					Industry Use Cases
				</h2>
				<div className="grid md:grid-cols-2 gap-4">
					{useCases.map((useCase, index) => (
						<div
							key={index}
							className="bg-secondary p-4 rounded-lg"
						>
							<h3 className="font-semibold text-secondary-foreground">
								{useCase.industry}
							</h3>
							<p className="text-muted-foreground">
								{useCase.example}
							</p>
						</div>
					))}
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.5 }}
				className="text-center"
			>
				<p className="mb-4 text-muted-foreground">
					Ready to experience these features in action?
				</p>
				<motion.a
					href="/demo"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-full shadow-lg"
				>
					Request a Demo
				</motion.a>
			</motion.div>
		</motion.div>
	);
};

export default FeaturesPage;
