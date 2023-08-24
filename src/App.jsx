import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { AuthProvider } from "react-auth-kit";
import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./components/layouts/navbar";
import { NotFound } from "./pages/notfound";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { AccountPanel } from "./pages/accpanel";
import { CreateSession } from "./pages/create-session";

function App() {
	const [count, setCount] = useState(0);

	return (
		<AuthProvider authName="_auth" authType="cookie">
			<ChakraProvider>
				<Navbar />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/admin/account" element={<AccountPanel />} />
						<Route
							path="/admin/account/create-session"
							element={<CreateSession />}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</ChakraProvider>
		</AuthProvider>
	);
}

export default App;
