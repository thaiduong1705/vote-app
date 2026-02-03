import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

function JoinRoomPage() {
	const navigate = useNavigate();
	const { token } = useParams<{ token: string }>();
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Early validation for missing token
	if (!token) {
		return (
			<div className="min-h-screen bg-[linear-gradient(to_bottom_right,var(--tw-gradient-stops))] from-green-bg via-green-100 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
				{/* Background Decorative Elements */}
				<div className="absolute top-20 right-10 w-72 h-72 bg-red-400/10 rounded-full blur-3xl"></div>

				<div className="max-w-lg mx-auto relative z-10">
					<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-forest-lg p-8 text-center border border-red-200/50 animate-slide-in">
						<div className="inline-flex items-center justify-center w-24 h-24 bg-[linear-gradient(to_bottom_right,var(--tw-gradient-stops))] from-red-400 to-red-500 rounded-full mb-6 shadow-forest">
							<span className="text-5xl">❌</span>
						</div>
						<h1 className="text-4xl font-bold text-red-600 mb-4">Invalid Invitation</h1>
						<p className="text-slate-600 mb-6 text-lg">This invitation link is invalid or expired.</p>
						<button
							onClick={() => navigate("/")}
							className="bg-[linear-gradient(to_right,var(--tw-gradient-stops))] from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#10B981] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 cursor-pointer inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
							<span className="text-xl">🏠</span> Go to Home
						</button>
					</div>
				</div>
			</div>
		);
	}

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (name.trim().length < 2) {
				setError("Name must be at least 2 characters");
				return;
			}

			setLoading(true);
			setError("");

			try {
				const result = await api.joinRoom({ token, name: name.trim() });
				localStorage.setItem("participantId", result.participant.id);
				navigate(`/room/${result.room.id}`);
			} catch (err: unknown) {
				const errorMessage = err instanceof Error ? err.message : "Failed to join room. Invalid or expired invitation.";
				setError(errorMessage);
				console.error(err);
			} finally {
				setLoading(false);
			}
		},
		[token, name, navigate],
	);

	return (
		<div className="min-h-screen bg-linear-to-br from-green-bg via-green-100 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
			{/* Background Decorative Elements */}
			<div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
			<div
				className="absolute bottom-10 right-10 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"
				style={{ animationDelay: "1s" }}></div>

			<div className="max-w-lg mx-auto relative z-10">
				<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-forest-lg p-8 lg:p-12 border border-green-200/50 animate-slide-in">
					<div className="text-center mb-10">
						<div className="inline-flex items-center justify-center w-24 h-24 bg-[linear-gradient(to_bottom_right,var(--tw-gradient-stops))] from-emerald-500 to-green-600 rounded-full mb-6 shadow-forest animate-float">
							<span className="text-5xl">🍕</span>
						</div>
						<h1 className="text-5xl font-bold bg-[linear-gradient(to_right,var(--tw-gradient-stops))] from-emerald-600 via-green-600 to-lime-600 bg-clip-text text-transparent mb-4">
							Join Voting Room
						</h1>
						<p className="text-slate-600 text-lg font-medium">You've been invited to vote for delicious food! 🎊</p>
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-4">
						<div>
							<label
								htmlFor="name"
								className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
								<span className="text-lg">👤</span> Your Name
							</label>
							<input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								minLength={2}
								className="w-full px-4 py-2.5 border-2 border-green-200 rounded-2xl bg-white/80 focus:bg-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 font-medium text-base placeholder:text-slate-400"
								placeholder="Enter your name 😊"
								autoFocus
							/>
						</div>

						{error && (
							<div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-3 animate-slide-in">
								<span className="text-xl">⚠️</span>
								<span className="font-medium text-sm">{error}</span>
							</div>
						)}

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-[linear-gradient(to_right,var(--tw-gradient-stops))] from-[#10B981] via-[#059669] to-[#65a30d] hover:from-[#65a30d] hover:via-[#10B981] hover:to-[#059669] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 text-base group relative overflow-hidden">
							<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
							<span className="text-2xl relative z-10">{loading ? "⏳" : "🚀"}</span>
							<span className="relative z-10">{loading ? "Joining..." : "Join the Fun"}</span>
						</button>
					</form>

					<div className="mt-8 pt-6 border-t-2 border-green-200">
						<p className="text-xs text-slate-500 text-center flex items-center justify-center gap-2 font-mono">
							<span>🔑</span> Token: {token.substring(0, 8)}...
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default JoinRoomPage;
