import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

// Helper to get default times
const getDefaultTimes = () => {
	const now = new Date();
	const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

	// Format for datetime-local input (YYYY-MM-DDTHH:mm)
	const formatDateTime = (date: Date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

	return {
		startAt: formatDateTime(now),
		endAt: formatDateTime(oneHourLater),
	};
};

function CreateRoomPage() {
	const navigate = useNavigate();
	const defaultTimes = useMemo(() => getDefaultTimes(), []);

	const [formData, setFormData] = useState({
		roomName: "",
		ownerEmail: "",
		startAt: defaultTimes.startAt,
		endAt: defaultTimes.endAt,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Client-side validation based on server DTO
	const validateForm = useCallback(() => {
		// Room name min length: 3
		if (formData.roomName.trim().length < 3) {
			return "Room name must be at least 3 characters";
		}

		// Email validation (basic)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.ownerEmail)) {
			return "Please enter a valid email address";
		}

		// Date validation
		const start = new Date(formData.startAt);
		const end = new Date(formData.endAt);

		if (isNaN(start.getTime()) || isNaN(end.getTime())) {
			return "Please enter valid dates";
		}

		if (end <= start) {
			return "End time must be after start time";
		}

		return null;
	}, [formData]);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setError("");

			// Validate form
			const validationError = validateForm();
			if (validationError) {
				setError(validationError);
				return;
			}

			setLoading(true);

			try {
				// Convert datetime-local to ISO format for API
				const result = await api.createRoom({
					roomName: formData.roomName.trim(),
					ownerEmail: formData.ownerEmail.trim(),
					startAt: new Date(formData.startAt).toISOString(),
					endAt: new Date(formData.endAt).toISOString(),
				});

				navigate(`/room/${result.room.id}?owner=true`);
			} catch (err) {
				setError("Failed to create room. Please try again.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		},
		[formData, navigate, validateForm],
	);

	return (
		<div className="min-h-screen bg-linear-to-br from-green-bg via-green-100 to-emerald-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center">
			{/* Background Decorative Elements */}
			<div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
			<div
				className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"
				style={{ animationDelay: "1s" }}></div>

			<div className="max-w-3xl mx-auto relative z-10 w-full">
				<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-forest-lg p-6 lg:p-8 border border-green-200/50 animate-slide-in">
					{/* Header Section */}
					<div className="text-center mb-6">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-emerald-500 to-green-500 rounded-3xl mb-4 shadow-forest animate-float">
							<span className="text-3xl">🍽️</span>
						</div>
						<h1 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-emerald-600 via-green-600 to-lime-600 bg-clip-text text-transparent mb-2">
							Create Voting Room
						</h1>
						<p className="text-slate-600 text-base font-medium">Set up a fun voting session for your team 🎉</p>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className="space-y-4">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							{/* Room Name */}
							<div>
								<label
									htmlFor="roomName"
									className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
									<span className="text-lg">🏷️</span> Room Name
								</label>
								<input
									id="roomName"
									type="text"
									value={formData.roomName}
									onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
									required
									minLength={3}
									className="w-full px-4 py-2.5 border-2 border-green-200 rounded-2xl bg-white/80 focus:bg-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 font-medium placeholder:text-slate-400"
									placeholder="Team Lunch Vote 🍕"
								/>
							</div>

							{/* Owner Email */}
							<div>
								<label
									htmlFor="ownerEmail"
									className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
									<span className="text-lg">📧</span> Your Email
								</label>
								<input
									id="ownerEmail"
									type="email"
									value={formData.ownerEmail}
									onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
									required
									className="w-full px-4 py-2.5 border-2 border-green-200 rounded-2xl bg-white/80 focus:bg-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 font-medium placeholder:text-slate-400"
									placeholder="you@example.com"
								/>
							</div>

							{/* Start Time */}
							<div>
								<label
									htmlFor="startAt"
									className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
									<span className="text-lg">🕐</span> Voting Starts At
								</label>
								<input
									id="startAt"
									type="datetime-local"
									value={formData.startAt}
									onChange={(e) => setFormData({ ...formData, startAt: e.target.value })}
									required
									className="w-full px-4 py-2.5 border-2 border-green-200 rounded-2xl bg-white/80 focus:bg-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 font-medium"
								/>
							</div>

							{/* End Time */}
							<div>
								<label
									htmlFor="endAt"
									className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
									<span className="text-lg">🏁</span> Voting Ends At
								</label>
								<input
									id="endAt"
									type="datetime-local"
									value={formData.endAt}
									onChange={(e) => setFormData({ ...formData, endAt: e.target.value })}
									required
									className="w-full px-4 py-2.5 border-2 border-green-200 rounded-2xl bg-white/80 focus:bg-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 font-medium"
								/>
							</div>
						</div>

						{/* Error Message */}
						{error && (
							<div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-3 animate-slide-in">
								<span className="text-xl">⚠️</span>
								<span className="font-medium text-sm">{error}</span>
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading}
							className="w-full bg-linear-to-r from-[#10B981] via-[#059669] to-[#65a30d] hover:from-[#65a30d] hover:via-[#10B981] hover:to-[#059669] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 text-base group relative overflow-hidden">
							<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
							<span className="text-2xl relative z-10">{loading ? "⏳" : "🎉"}</span>
							<span className="relative z-10">{loading ? "Creating..." : "Create Voting Room"}</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CreateRoomPage;
