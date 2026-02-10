import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

function JoinRoomPage() {
	const navigate = useNavigate();
	const { token } = useParams<{ token: string }>();
	const [countdown, setCountdown] = useState(3);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [joined, setJoined] = useState(false);
	const [roomId, setRoomId] = useState<string>("");

	// Check if user already has valid token and redirect to room
	useEffect(() => {
		const checkExistingAccess = async () => {
			try {
				const result = await api.verifyAccess();
				if (result.hasAccess && result.roomId) {
					const ownerParam = result.isOwner ? "?owner=true" : "";
					navigate(`/room/${result.roomId}${ownerParam}`, { replace: true });
				}
			} catch (err) {
				// No valid token, stay on join page
				console.log("No existing access");
			}
		};
		checkExistingAccess();
	}, [navigate]);

	const joinRoomHandler = async () => {
		if (!token) {
			setError("Token không hợp lệ");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const { roomId } = await api.joinRoom({ token });
			setRoomId(roomId);
			setJoined(true);
			setCountdown(3);
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : "Tham gia phòng thất bại. Lời mời không hợp lệ hoặc đã hết hạn.";
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	// Auto-navigate after countdown reaches 0 when joined
	useEffect(() => {
		if (!joined || countdown <= 0) return;

		const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
		return () => clearTimeout(timer);
	}, [countdown, joined]);

	useEffect(() => {
		if (joined && countdown === 0) {
			navigate(`/room/${roomId}`);
		}
	}, [joined, countdown, navigate, roomId]);

	const handleNavigateNow = () => {
		navigate(`/room/${roomId}`);
	};

	// Error state
	if (error) {
		return (
			<div className="min-h-screen bg-linear-to-br from-green-50 via-green-100 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
				<div className="absolute top-20 right-10 w-72 h-72 bg-red-400/10 rounded-full blur-3xl"></div>

				<div className="max-w-lg mx-auto relative z-10">
					<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 text-center border border-red-200/50 animate-slide-in">
						<div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-red-400 to-red-500 rounded-full mb-6 shadow-lg">
							<span className="text-5xl">❌</span>
						</div>
						<h1 className="text-4xl font-bold text-red-600 mb-4">Tham Gia Thất Bại</h1>
						<button
							onClick={() => navigate("/")}
							className="bg-linear-to-r from-emerald-500 to-green-600 hover:from-green-600 hover:to-emerald-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 cursor-pointer inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
							<span className="text-xl">🏠</span> Về Trang Chủ
						</button>
					</div>
				</div>
			</div>
		);
	}

	// Loading state
	if (loading) {
		return (
			<div className="min-h-screen bg-linear-to-br from-green-50 via-green-100 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
				<div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute bottom-10 right-10 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}></div>

				<div className="max-w-lg mx-auto relative z-10">
					<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 lg:p-12 border border-green-200/50 animate-slide-in">
						<div className="text-center">
							<div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-lg animate-pulse">
								<span className="text-5xl">⏳</span>
							</div>
							<h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 via-green-600 to-lime-600 bg-clip-text text-transparent mb-4">
								Đang Tham Gia Phòng...
							</h1>
							<p className="text-slate-600 text-lg font-medium">Vui lòng chờ một chút 🎊</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// If joined -> show success + countdown
	if (joined) {
		return (
			<div className="min-h-screen bg-linear-to-br from-green-50 via-green-100 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
				<div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute bottom-10 right-10 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}></div>

				<div className="max-w-lg mx-auto relative z-10">
					<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 lg:p-12 border border-green-200/50 animate-slide-in">
						<div className="text-center">
							<div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-lg animate-bounce">
								<span className="text-5xl">✅</span>
							</div>
							<h1 className="text-5xl font-bold bg-linear-to-r from-emerald-600 via-green-600 to-lime-600 bg-clip-text text-transparent mb-4">
								Tham Gia Thành Công!
							</h1>
							<p className="text-slate-600 text-lg font-medium mb-8">Bạn đã sẵn sàng bình chọn đồ ăn ngon! 🍕</p>

							{/* Countdown Info */}
							<div className="bg-linear-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-6 mb-6">
								<p className="text-slate-600 text-sm mb-2">Chuyển hướng trong</p>
								<div className="text-6xl font-bold text-emerald-600 mb-2">{countdown}</div>
								<p className="text-slate-500 text-xs">hoặc bấm nút bên dưới để vào ngay</p>
							</div>

							{/* CTA Button */}
							<button
								onClick={handleNavigateNow}
								className="w-full bg-linear-to-r from-emerald-500 via-green-500 to-lime-500 hover:from-lime-500 hover:via-emerald-500 hover:to-green-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 text-lg group relative overflow-hidden">
								<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
								<span className="text-2xl relative z-10">🚀</span>
								<span className="relative z-10">Vào Phòng Bình Chọn Ngay</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Default: show confirmation + Join button
	return (
		<div className="min-h-screen bg-linear-to-br from-green-50 via-green-100 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
			<div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
			<div className="max-w-lg mx-auto relative z-10">
				<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 lg:p-12 border border-green-200/50 animate-slide-in">
					<div className="text-center">
						<div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-lg">
							<span className="text-4xl">🔔</span>
						</div>
						<h1 className="text-3xl font-bold mb-3">Xác nhận tham gia phòng</h1>
						<p className="text-slate-600 mb-6">Nhấn "Tham gia" để chấp nhận lời mời và vào phòng bình chọn.</p>

						<button
							onClick={joinRoomHandler}
							disabled={loading}
							className="w-full bg-linear-to-r from-emerald-500 via-green-500 to-lime-500 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
							{loading ? "Đang tham gia..." : "Tham gia"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default JoinRoomPage;
