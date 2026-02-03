import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load pages for better bundle splitting (bundle-dynamic-imports)
const CreateRoomPage = lazy(() => import("./pages/CreateRoomPage"));
const JoinRoomPage = lazy(() => import("./pages/JoinRoomPage"));
const RoomPage = lazy(() => import("./pages/RoomPage"));

function App() {
	return (
		<BrowserRouter>
			<Suspense
				fallback={
					<div className="min-h-screen bg-linear-to-br from-green-bg via-green-100 to-emerald-50 flex items-center justify-center">
						<div className="text-center">
							<div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-emerald-500 to-green-500 rounded-full mb-6 shadow-forest animate-pulse">
								<span className="text-5xl">🍽️</span>
							</div>
							<p className="text-slate-600 text-lg font-medium">Loading...</p>
						</div>
					</div>
				}>
				<Routes>
					<Route
						path="/"
						element={<CreateRoomPage />}
					/>
					<Route
						path="/join/:token"
						element={<JoinRoomPage />}
					/>
					<Route
						path="/room/:roomId"
						element={<RoomPage />}
					/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;

