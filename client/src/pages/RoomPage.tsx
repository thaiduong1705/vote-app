import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import { useSocket } from "../hooks/useSocket";
import type { Restaurant, Vote, Participant } from "../types/api";

interface VoteWithRestaurant extends Vote {
	restaurant: Restaurant;
}

export default function RoomPage() {
	const { roomId } = useParams<{ roomId: string }>();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
	const [votes, setVotes] = useState<VoteWithRestaurant[]>([]);
	const [participants, setParticipants] = useState<Participant[]>([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState("");
	const [loading, setLoading] = useState(false);
	const [hasVoted, setHasVoted] = useState(false);
	const [isOwner, setIsOwner] = useState(false);

	// Invite states
	const [inviteEmails, setInviteEmails] = useState("");
	const [inviteLoading, setInviteLoading] = useState(false);
	const [inviteError, setInviteError] = useState("");
	const [inviteSuccess, setInviteSuccess] = useState(false);

	// Add restaurant states
	const [newRestaurantName, setNewRestaurantName] = useState("");
	const [addRestaurantLoading, setAddRestaurantLoading] = useState(false);
	const [addRestaurantError, setAddRestaurantError] = useState("");
	const [addRestaurantSuccess, setAddRestaurantSuccess] = useState(false);

	const { socket, isConnected } = useSocket(roomId || null);

	useEffect(() => {
		loadRoomData();
	}, [roomId]);

	useEffect(() => {
		if (!socket) return;

		socket.on("vote-updated", () => {
			console.log("Vote updated - reloading room data");
			loadRoomData();
		});

		socket.on("restaurants-updated", () => {
			console.log("Restaurants updated - reloading room data");
			loadRoomData();
		});

		socket.on("room-closed", (data) => {
			console.log("Room closed:", data);
			alert(`Room closed! Winner: ${data.winnerName || "No votes yet"}`);
			navigate("/");
		});

		return () => {
			socket.off("vote-updated");
			socket.off("restaurants-updated");
			socket.off("room-closed");
		};
	}, [socket]);

	const loadRoomData = async () => {
		try {
			const votesResponse = await api.getRoomVotes(roomId!);

			if (votesResponse.statusRoom === "CLOSED") {
				alert(`Room đã đóng! Món thắng cuộc: ${votesResponse.winnerName || "Chưa có phiếu nào"}`);
				navigate("/");
			}

			// Set all data from single API response
			setRestaurants(votesResponse.restaurants);
			setParticipants(votesResponse.participants || []);

			// Check if user is owner from API response
			if (votesResponse.currentUserRole === "HOST") {
				setIsOwner(true);
			} else if (searchParams.get("owner") === "true") {
				// Fallback: verify ownership via dedicated endpoint
				try {
					const verifyResult = await api.verifyOwner(roomId!);
					setIsOwner(verifyResult.isOwner);
				} catch {
					setIsOwner(false);
				}
			} else {
				setIsOwner(false);
			}

			// Map votes with restaurant data
			const votesWithRestaurants = votesResponse.votes.map((vote) => {
				const restaurant = votesResponse.restaurants.find((r) => r.id === vote.restaurantId);
				return {
					...vote,
					restaurant: restaurant || { id: vote.restaurantId, name: "Unknown", menuImageUrl: null, createdAt: "" },
				};
			});
			setVotes(votesWithRestaurants);

			// Check if current user has already voted
			const participantId = localStorage.getItem("participantId");
			if (participantId && votesResponse.votes.some((v) => v.participantId === participantId)) {
				setHasVoted(true);
			}
		} catch (err) {
			console.error("Failed to load room data:", err);
		}
	};

	const handleSendInvites = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!roomId) return;

		setInviteLoading(true);
		setInviteError("");
		setInviteSuccess(false);

		try {
			const emails = inviteEmails
				.split(/[,;\n]/)
				.map((e) => e.trim())
				.filter((e) => e.length > 0);

			if (emails.length === 0) {
				setInviteError("Please enter at least one email address");
				return;
			}

			await api.sendInvites({
				roomId,
				emails,
			});

			setInviteSuccess(true);
			setInviteEmails("");

			// Hide success message after 3 seconds
			setTimeout(() => {
				setInviteSuccess(false);
			}, 3000);
		} catch (err) {
			setInviteError("Gửi lời mời thất bại. Vui lòng thử lại.");
			console.error(err);
		} finally {
			setInviteLoading(false);
		}
	};

	const handleAddRestaurant = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!roomId) return;

		if (!newRestaurantName.trim()) {
			setAddRestaurantError("Vui lòng nhập tên món");
			return;
		}

		setAddRestaurantLoading(true);
		setAddRestaurantError("");
		setAddRestaurantSuccess(false);

		try {
			await api.addNewRestaurant(roomId, newRestaurantName.trim());

			setAddRestaurantSuccess(true);
			setNewRestaurantName("");

			// Hide success message after 3 seconds
			setTimeout(() => {
				setAddRestaurantSuccess(false);
			}, 3000);
		} catch (err) {
			setAddRestaurantError("Thêm món thất bại. Vui lòng thử lại.");
			console.error(err);
		} finally {
			setAddRestaurantLoading(false);
		}
	};

	const handleVote = async () => {
		if (!selectedRestaurant) {
			alert("🍽️ Vui lòng chọn nhà hàng trước!");
			return;
		}

		setLoading(true);
		try {
			const participantId = localStorage.getItem("participantId") || "";
			await api.submitVote({
				roomId: roomId!,
				participantId,
				restaurantId: selectedRestaurant,
			});
			await loadRoomData();
			setHasVoted(true);
			setSelectedRestaurant("");
		} catch (err) {
			console.error(err);
			alert("❌ Gửi phiếu thất bại. Vui lòng thử lại.");
		} finally {
			setLoading(false);
		}
	};

	// Calculate vote counts and percentages
	const voteCounts = votes.reduce(
		(acc, vote) => {
			const restaurantId = vote.restaurantId;
			const restaurantName = vote.restaurant.name;
			if (!acc[restaurantId]) {
				acc[restaurantId] = { name: restaurantName, count: 0 };
			}
			acc[restaurantId].count += 1;
			return acc;
		},
		{} as Record<string, { name: string; count: number }>,
	);

	const sortedResults = Object.entries(voteCounts)
		.sort(([, a], [, b]) => b.count - a.count)
		.map(([id, data]) => ({
			id,
			name: data.name,
			count: data.count,
			percentage: votes.length > 0 ? (data.count / votes.length) * 100 : 0,
		}));

	const maxVotes = sortedResults[0]?.count || 0;

	return (
		<div className="min-h-screen bg-linear-to-br from-green-bg via-green-100 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
			<div
				className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"
				style={{ animationDelay: "1.5s" }}></div>
			<div
				className="absolute top-1/2 left-1/2 w-80 h-80 bg-lime-500/5 rounded-full blur-3xl animate-pulse"
				style={{ animationDelay: "3s" }}></div>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Header Section */}
				<div className="text-center mb-12 animate-slide-in">
					<div className="inline-flex items-center justify-center w-28 h-28 bg-linear-to-br from-emerald-500 via-green-500 to-lime-600 rounded-4xl mb-6 shadow-forest-lg animate-float relative overflow-hidden">
						<div className="absolute inset-0 bg-white/20 animate-pulse"></div>
						<span className="text-6xl relative z-10">🗳️</span>
					</div>
					<h1 className="text-5xl lg:text-6xl font-black bg-linear-to-r from-emerald-600 via-green-600 to-lime-600 bg-clip-text text-transparent mb-4 tracking-tight">
						Bình Chọn Ngay
					</h1>
					<div className="flex items-center justify-center gap-4 text-slate-600 font-medium">
						<span className="text-sm px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-green-200">
							Mã Phòng: {roomId}
						</span>
						<div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-green-200">
							<div
								className={`w-2.5 h-2.5 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}></div>
							<span className="text-sm font-semibold">{isConnected ? "Trực tiếp" : "Ngoại tuyến"}</span>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
					{/* Voting Section - 2 columns */}
					<div className="lg:col-span-2 space-y-8">
						{/* Voting Card */}
						<div className="bg-white/95 backdrop-blur-md rounded-4xl shadow-forest-lg p-8 border border-green-200/50 animate-slide-in relative overflow-hidden">
							<div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-emerald-200/30 to-transparent rounded-full blur-2xl"></div>

							<div className="relative z-10">
								<div className="flex items-center gap-3 mb-6">
									<div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
										<span className="text-2xl">🍽️</span>
									</div>
									<h2 className="text-3xl font-black text-slate-800">Phiếu Bầu Của Bạn</h2>
								</div>

								{hasVoted ? (
									<div className="space-y-4">
										<div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-300">
											<div className="flex items-center gap-3 mb-3">
												<span className="text-4xl">✅</span>
												<div>
													<h3 className="text-xl font-bold text-emerald-700">Đã Ghi Nhận Phiếu!</h3>
													<p className="text-sm text-emerald-600">Cảm ơn bạn đã tham gia</p>
												</div>
											</div>
										</div>
										<p className="text-sm text-slate-600 text-center">
											Xem kết quả cập nhật khi người khác bình chọn →
										</p>
									</div>
								) : (
									<div className="space-y-6">
										<div>
											<label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
												<span className="text-lg">🎯</span>
												Chọn Món Yêu Thích
											</label>
											<div className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
												{restaurants.map((restaurant) => (
													<button
														key={restaurant.id}
														onClick={() => setSelectedRestaurant(restaurant.id)}
														className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300 font-semibold ${
															selectedRestaurant === restaurant.id
																? "bg-linear-to-r from-emerald-500 to-green-600 text-white border-emerald-600 shadow-lg"
																: "bg-white/70 hover:bg-green-50 border-green-200 hover:border-emerald-400 text-slate-700"
														}`}>
														<div className="flex items-center justify-between">
															<span className="text-base">{restaurant.name}</span>
															{selectedRestaurant === restaurant.id && <span className="text-xl">✓</span>}
														</div>
													</button>
												))}
											</div>
										</div>

										<button
											onClick={handleVote}
											disabled={loading || !selectedRestaurant}
											className="w-full bg-linear-to-r from-emerald-500 via-green-600 to-lime-600 hover:from-lime-600 hover:via-emerald-500 hover:to-green-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-black py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-3 text-lg group relative overflow-hidden">
											<div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
											<span className="text-2xl relative z-10">{loading ? "⏳" : "🚀"}</span>
											<span className="relative z-10">{loading ? "Đang gửi..." : "Bình Chọn"}</span>
										</button>
									</div>
								)}
							</div>
						</div>

						{/* Invite Section - Only for Owner */}
						{isOwner && (
							<div
								className="bg-white/95 backdrop-blur-md rounded-4xl shadow-forest-lg p-8 border border-green-200/50 animate-slide-in relative overflow-hidden"
								style={{ animationDelay: "0.2s" }}>
								<div className="absolute top-0 left-0 w-32 h-32 bg-linear-to-br from-blue-200/30 to-transparent rounded-full blur-2xl"></div>

								<div className="relative z-10">
									<div className="flex items-center gap-3 mb-6">
										<div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
											<span className="text-2xl">📧</span>
										</div>
										<h2 className="text-2xl font-black text-slate-800">Mời Người Tham Gia</h2>
									</div>

									<form
										onSubmit={handleSendInvites}
										className="space-y-4">
										<div>
											<label className="block text-sm font-bold text-slate-700 mb-2">Địa Chỉ Email</label>
											<textarea
												value={inviteEmails}
												onChange={(e) => setInviteEmails(e.target.value)}
												rows={3}
												className="w-full px-4 py-3 border-2 border-green-200 rounded-2xl bg-white/80 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 font-medium placeholder:text-slate-400 resize-none"
												placeholder="alice@example.com, bob@example.com"
											/>
											<p className="text-xs text-slate-500 mt-2">
												Tách nhiều email bằng dấu phẩy, dấu chấm phẩy hoặc xuống dòng
											</p>
										</div>

										{inviteError && (
											<div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-3">
												<span className="text-xl">⚠️</span>
												<span className="font-medium text-sm">{inviteError}</span>
											</div>
										)}

										{inviteSuccess && (
											<div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-2xl flex items-center gap-3 animate-slide-in">
												<span className="text-xl">✅</span>
												<span className="font-medium text-sm">Lời mời đã được gửi thành công!</span>
											</div>
										)}

										<button
											type="submit"
											disabled={inviteLoading}
											className="w-full bg-linear-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-purple-600 hover:via-blue-500 hover:to-indigo-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-base">
											<span className="text-xl">{inviteLoading ? "⏳" : "📤"}</span>
											<span>{inviteLoading ? "Đang gửi..." : "Gửi Lời Mời"}</span>
										</button>
									</form>
								</div>
							</div>
						)}

						{/* Add Restaurant Section - Only for Owner */}
						{isOwner && (
							<div
								className="bg-white/95 backdrop-blur-md rounded-4xl shadow-forest-lg p-8 border border-green-200/50 animate-slide-in relative overflow-hidden"
								style={{ animationDelay: "0.25s" }}>
								<div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-orange-200/30 to-transparent rounded-full blur-2xl"></div>

								<div className="relative z-10">
									<div className="flex items-center gap-3 mb-6">
										<div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
											<span className="text-2xl">➕</span>
										</div>
										<h2 className="text-2xl font-black text-slate-800">Thêm Món Mới</h2>
									</div>

									<form
										onSubmit={handleAddRestaurant}
										className="space-y-4">
										<div>
											<label className="block text-sm font-bold text-slate-700 mb-2">Tên Món Ăn</label>
											<div className="flex gap-2">
												<input
													type="text"
													value={newRestaurantName}
													onChange={(e) => setNewRestaurantName(e.target.value)}
													className="flex-1 px-4 py-3 border-2 border-green-200 rounded-2xl bg-white/80 focus:bg-white focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-slate-900 font-medium placeholder:text-slate-400"
													placeholder="Nhập tên món mới (vd: Mì Quảng)..."
												/>
												<button
													type="submit"
													disabled={addRestaurantLoading}
													className="px-6 py-3 bg-linear-to-r from-orange-500 to-red-600 hover:from-red-600 hover:to-orange-500 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
													<span className="text-lg">{addRestaurantLoading ? "⏳" : "✨"}</span>
													<span>{addRestaurantLoading ? "Đang..." : "Thêm"}</span>
												</button>
											</div>
											<p className="text-xs text-slate-500 mt-2">
												Món mới sẽ có sẵn cho tất cả phòng (hiện tại và tương lai)
											</p>
										</div>

										{addRestaurantError && (
											<div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-3">
												<span className="text-xl">⚠️</span>
												<span className="font-medium text-sm">{addRestaurantError}</span>
											</div>
										)}

										{addRestaurantSuccess && (
											<div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-2xl flex items-center gap-3 animate-slide-in">
												<span className="text-xl">✅</span>
												<span className="font-medium text-sm">
													Thêm món thành công! Tất cả người chơi sẽ thấy nó ngay lập tức 🎉
												</span>
											</div>
										)}
									</form>
								</div>
							</div>
						)}

						{/* Participants List */}
						<div
							className="bg-white/95 backdrop-blur-md rounded-4xl shadow-forest-lg p-8 border border-green-200/50 animate-slide-in relative overflow-hidden"
							style={{ animationDelay: "0.3s" }}>
							<div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-purple-200/30 to-transparent rounded-full blur-2xl"></div>

							<div className="relative z-10">
								<div className="flex items-center gap-3 mb-6">
									<div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
										<span className="text-2xl">👥</span>
									</div>
									<div>
										<h2 className="text-2xl font-black text-slate-800">Người Tham Gia</h2>
										<p className="text-sm text-slate-600 font-medium">{participants.length} đã tham gia</p>
									</div>
								</div>

								{participants.length === 0 ? (
									<div className="text-center py-8">
										<span className="text-4xl block mb-3 opacity-50">👤</span>
										<p className="text-sm font-medium text-slate-500">Chưa có người tham gia</p>
									</div>
								) : (
									<div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
										{participants.map((participant) => {
											const hasVoted = votes.some((v) => v.participantId === participant.id);
											return (
												<div
													key={participant.id}
													className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-slate-50 to-purple-50/30 rounded-2xl border border-slate-200 hover:border-purple-300 transition-all duration-200">
													<div className="flex items-center gap-3">
														<div className="w-10 h-10 bg-linear-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
															{participant.name.charAt(0).toUpperCase()}
														</div>
														<span className="font-semibold text-slate-800">{participant.name}</span>
													</div>
													{hasVoted ? (
														<div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 rounded-full border border-emerald-300">
															<span className="text-sm">✓</span>
															<span className="text-xs font-bold text-emerald-700">Đã bình chọn</span>
														</div>
													) : (
														<div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full border border-amber-300">
															<span className="text-sm">⏳</span>
															<span className="text-xs font-bold text-amber-700">Đang chờ</span>
														</div>
													)}
												</div>
											);
										})}
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Live Results Section - 3 columns */}
					<div className="lg:col-span-3">
						<div
							className="bg-white/95 backdrop-blur-md rounded-4xl shadow-forest-lg p-8 border border-green-200/50 animate-slide-in relative overflow-hidden"
							style={{ animationDelay: "0.1s" }}>
							<div className="absolute bottom-0 left-0 w-40 h-40 bg-linear-to-tr from-lime-200/30 to-transparent rounded-full blur-2xl"></div>

							<div className="relative z-10">
								<div className="flex items-center justify-between mb-8">
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 bg-linear-to-br from-lime-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
											<span className="text-2xl">📊</span>
										</div>
										<div>
											<h2 className="text-3xl font-black text-slate-800">Kết Quả Trực Tiếp</h2>
											<p className="text-sm text-slate-600 font-medium">{votes.length} phiếu đã gửi</p>
										</div>
									</div>
									<div className="px-4 py-2 bg-linear-to-r from-emerald-500/10 to-green-500/10 rounded-full border border-emerald-300">
										<span className="text-sm font-bold text-emerald-700">TRỰC TIẾP</span>
									</div>
								</div>

								{sortedResults.length === 0 ? (
									<div className="text-center py-16">
										<span className="text-6xl block mb-4 animate-bounce">🎈</span>
										<p className="text-xl font-bold text-slate-600">Chưa có phiếu!</p>
										<p className="text-sm text-slate-500 mt-2">Hãy là người đầu tiên bình chọn</p>
									</div>
								) : (
									<div className="space-y-4">
										{sortedResults.map((result, index) => {
											const isWinning = result.count === maxVotes;
											return (
												<div
													key={result.id}
													className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
														isWinning
															? "border-emerald-400 bg-linear-to-r from-emerald-50 to-green-50 shadow-lg scale-105"
															: "border-green-200 bg-white/60"
													}`}
													style={{
														animationDelay: `${index * 0.05}s`,
													}}>
													{/* Progress bar background */}
													<div
														className={`absolute inset-0 transition-all duration-1000 ease-out ${
															isWinning
																? "bg-linear-to-r from-emerald-400/30 to-green-400/30"
																: "bg-linear-to-r from-green-300/20 to-lime-300/20"
														}`}
														style={{
															width: `${result.percentage}%`,
														}}></div>

													{/* Content */}
													<div className="relative z-10 px-6 py-5 flex items-center justify-between">
														<div className="flex items-center gap-4 flex-1">
															<div
																className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
																	isWinning
																		? "bg-linear-to-br from-emerald-500 to-green-600 text-white shadow-lg"
																		: "bg-slate-200 text-slate-600"
																}`}>
																{index + 1}
															</div>
															<div className="flex-1">
																<h3
																	className={`font-bold text-lg ${isWinning ? "text-emerald-800" : "text-slate-800"}`}>
																	{result.name}
																</h3>
															</div>
														</div>
														<div className="flex items-center gap-6">
															<div className="text-right">
																<div
																	className={`text-3xl font-black ${isWinning ? "text-emerald-700" : "text-slate-700"}`}>
																	{result.count}
																</div>
																<div className="text-xs text-slate-500 font-semibold">
																	{result.percentage.toFixed(0)}%
																</div>
															</div>
															{isWinning && <span className="text-3xl animate-bounce">👑</span>}
														</div>
													</div>
												</div>
											);
										})}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>{`
				.custom-scrollbar::-webkit-scrollbar {
					width: 6px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: #f0fdf4;
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: #10b981;
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb:hover {
					background: #059669;
				}
			`}</style>
		</div>
	);
}
