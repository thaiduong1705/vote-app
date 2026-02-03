import { useParams } from "react-router-dom";

function RoomPage() {
	const { roomId } = useParams<{ roomId: string }>();

	return (
		<div className="min-h-screen bg-linear-to-br from-green-bg via-green-100 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
			{/* Background Decorative Elements */}
			<div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
			<div
				className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"
				style={{ animationDelay: "1.5s" }}></div>

			<div className="max-w-6xl mx-auto relative z-10">
				<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-forest-lg p-8 lg:p-12 border border-green-200/50 animate-slide-in">
					{/* Header */}
					<div className="text-center mb-10">
						<div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-forest animate-float">
							<span className="text-5xl">🗳️</span>
						</div>
						<h1 className="text-5xl font-bold bg-linear-to-r from-emerald-600 via-green-600 to-lime-600 bg-clip-text text-transparent mb-4">
							Voting Room
						</h1>
						<p className="text-slate-600 text-lg font-medium">Room ID: {roomId}</p>
					</div>

					{/* Coming Soon Content */}
					<div className="text-center py-16">
						<div className="inline-block bg-linear-to-br from-green-100 to-emerald-100 rounded-3xl p-12 border border-green-200">
							<span className="text-8xl mb-6 block animate-bounce">🚧</span>
							<h2 className="text-3xl font-bold text-slate-800 mb-4">Coming Soon!</h2>
							<p className="text-slate-600 text-lg max-w-md mx-auto">
								This is the voting room page where you can vote for restaurants. We're working hard to bring you this
								feature.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RoomPage;
