import React, { useState } from "react";
import { Modal } from "./Modal";
import "./Auth.css";
import { t } from "../i18n";

interface RegisterModalProps {
	isOpen: boolean;
	onClose: () => void;
	language: "en" | "ru";
	setUserEmail: (email: string) => void;
}

export function RegisterModal({ isOpen, onClose, language, setUserEmail }: RegisterModalProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const API = import.meta.env.VITE_API_BASE_URL;

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert(t(language, "passwordsDontMatch"));
			return;
		}

		try {
			const res = await fetch(`${API}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			console.log("response:", res);

			let data;
			try {
				data = await res.json();
			} catch {
				alert("Invalid response format from server");
				return;
			}

			if (!res.ok) {
				alert(data.message || "Registration failed");
				return;
			}

			localStorage.setItem("token", data.token);
			const payload = JSON.parse(atob(data.token.split(".")[1]));
			setUserEmail(payload.email);

			window.dispatchEvent(new Event("auth-update"));
			onClose();
		} catch (err) {
			alert("Something went wrong. Please try again.");
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h2>{t(language, "register")}</h2>
			<form onSubmit={handleRegister} className="auth-form">
				<input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" placeholder={t(language, "password")} required value={password} onChange={(e) => setPassword(e.target.value)} />
				<input type="password" placeholder={t(language, "confirmPassword")} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
				<button type="submit">{t(language, "register")}</button>
			</form>
		</Modal>
	);
}
