import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AppState } from "../types";
import "./Landing.css";
import { LoginModal } from "../components/LoginModal";
import { RegisterModal } from "../components/RegisterModal";

interface LandingProps {
	appState: AppState;
	setAppState: React.Dispatch<React.SetStateAction<AppState>>;
	userEmail: string | null;
	onLogout: () => void;
	setUserEmail: (email: string) => void;
}

export function Landing({ appState, setAppState, userEmail, onLogout, setUserEmail }: LandingProps) {
	const [loginOpen, setLoginOpen] = useState(false);
	const [registerOpen, setRegisterOpen] = useState(false);

	return (
		<div className="landing-page">
			<Header onLogin={() => setLoginOpen(true)} onLogout={onLogout} userEmail={userEmail} />

			<main className="landing-main container">
				<section className="hero">
					<h1>Everything a QA needs. In one place.</h1>
					<p>Join a community that elevates QA careers with practical tools and resources.</p>
					<button className="cta-button">Explore the Platform</button>
				</section>

				<section className="features-grid">
					{features.map(({ title, desc, icon }) => (
						<div key={title} className="feature-card">
							<div className="feature-icon">{icon}</div>
							<h3>{title}</h3>
							<p>{desc}</p>
						</div>
					))}
				</section>

				<section className="testimonial">
					<blockquote>
						“QAhead has transformed my testing workflow. The tools and resources are indispensable!”
						<br />
						<span>– Alex</span>
					</blockquote>
				</section>

				<section className="cta-section">
					<h2>Join QAhead – and level up your testing career</h2>
					<button className="cta-button">Get Started</button>
				</section>
			</main>

			<Footer appState={appState} setAppState={setAppState} />

			<LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} setRegisterOpen={() => setRegisterOpen(true)} language={appState.language} setUserEmail={setUserEmail} />

			<RegisterModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} language={appState.language} setUserEmail={setUserEmail} />
		</div>
	);
}

const features = [
	{
		title: "Flashcards",
		desc: "Interview prep with spaced repetition.",
		icon: "📇",
	},
	{
		title: "Resume Writing",
		desc: "How to build a standout QA resume.",
		icon: "📝",
	},
	{
		title: "HR Screening Tips",
		desc: "Self-introduction and soft-skills advice.",
		icon: "🗣️",
	},
	{
		title: "Checklists",
		desc: "Pre-built test coverage checklists.",
		icon: "✅",
	},
	{
		title: "Test Data Generator",
		desc: "Create test strings and inputs instantly.",
		icon: "⚙️",
	},
	{
		title: "Utility Tools",
		desc: "Mini-tools (UUID, Regex, etc.)",
		icon: "🧰",
	},
	{
		title: "Templates",
		desc: "Test plans, bug reports, and more.",
		icon: "📄",
	},
];
