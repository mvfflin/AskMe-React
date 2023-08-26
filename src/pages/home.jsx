import {
	Text,
	Container,
	HStack,
	Button,
	Flex,
	Link,
	VStack,
} from "@chakra-ui/react";
import askmcjpg from "../assets/askmc.jpg";
import { BiUser } from "react-icons/bi";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useEffect, useState } from "react";
import api from "../utils/axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const isAuthed = useIsAuthenticated();
	const authUser = useAuthUser();
	const signOut = useSignOut();
	const [decoded, setDecoded] = useState({});
	const [totalSessions, setTotalSessions] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthed()) {
			const token = authUser().token;
			const decodedjwt = jwt_decode(token);
			const getUserData = async () => {
				try {
					const res = await api.get(`/user/${decodedjwt.id}`);
					const data = await res.data;
					setDecoded(data);
				} catch (err) {
					makeToast(
						"Error!",
						"Something wrong with the server, please contact admin",
						"error"
					);
					signOut();
					navigate("/");
					// console.log(err)
				}
			};
			const getUserSessions = async () => {
				try {
					const res = await api.get(`/user-sessions/${decodedjwt.id}`);
					const data = await res.data;
					setTotalSessions(data.length);
				} catch (err) {
					makeToast(
						"Error!",
						"Something wrong with the server, please contact admin",
						"error"
					);
					signOut();
					navigate("/");
					// console.log(err)
				}
			};
			getUserData();
			getUserSessions();
		}
	}, []);

	return (
		<>
			<Flex
				pt={250}
				id="welcome"
				w={"full"}
				h={"100vh"}
				bgImage={`linear-gradient(to top, black, #646464), url(${askmcjpg})`}
				bgPos={"center"}
				bgRepeat={"no-repeat"}
				bgSize={"cover"}
				bgBlendMode={"multiply"}
			>
				<Container>
					<Text
						textAlign={"center"}
						fontSize={"6xl"}
						fontWeight={"bold"}
						color={"white"}
					>
						AskMe Website
					</Text>
					<Text color={"gray.400"} textAlign={"center"} fontSize={"2xl"}>
						A website where you can create a session and your friends will fill
						it
					</Text>
					{!isAuthed() ? (
						<HStack mt={"25px"} justifyContent={"center"}>
							<Link
								href="/login"
								_active={{ textDecoration: "none" }}
								_hover={{ textDecoration: "none" }}
							>
								<Button leftIcon={<BiUser />}>Sign In Now!</Button>
							</Link>
						</HStack>
					) : (
						<VStack mt={5}>
							<Text textAlign={"center"} color="white" fontSize={"2xl"}>
								Welcome back, {decoded.username}!
								<br />
								You have {totalSessions} sessions.
							</Text>
							<Link href="/admin/account">
								<Button leftIcon={<BiUser />}>Account Panel</Button>
							</Link>
						</VStack>
					)}
				</Container>
			</Flex>
		</>
	);
};
