import { useState } from "react";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { Navbar } from "./components/layouts/navbar";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import { AuthPage } from "./pages/auth";
import { AccountPanel } from "./pages/account";

function App() {
    const [count, setCount] = useState(0);

    return (
        <AuthProvider>
            <HelmetProvider>
                <AuthProvider authType="cookie" authName="_auth">
                    <ChakraProvider>
                        <Navbar />
                        <Box
                            bgImage={
                                "linear-gradient(to bottom right, rgb(0, 0, 153), rgb(255, 204, 255))"
                            }
                        >
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route
                                        path="/auth"
                                        element={<AuthPage />}
                                    />
                                    <Route
                                        path="/account/admin"
                                        element={<AccountPanel />}
                                    />
                                </Routes>
                            </BrowserRouter>
                        </Box>
                    </ChakraProvider>
                </AuthProvider>
            </HelmetProvider>
        </AuthProvider>
    );
}

export default App;
