import {
	Avatar,
	Box,
	Button,
	Container,
	Flex,
	HStack,
	Link,
	Table,
	TableCaption,
	TableContainer,
	Tag,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
	VStack,
} from "@chakra-ui/react";
import askmcjpg from "../assets/askmc.jpg";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToast } from "../utils/toast";
import jwt_decode from "jwt-decode";
import api from "../utils/axios";
import { BiLogOut, BiSolidStar } from "react-icons/bi";
import "@fontsource/poppins";
import { AdminSession } from "./adminsession";

export const AccountPanel = () => {
	const isAuthed = useIsAuthenticated();
	const authUser = useAuthUser();
	const signOut = useSignOut();
	const navigate = useNavigate();
	const { makeToast } = setToast();
	const [decoded, setDecoded] = useState({});
	const [userData, setUserData] = useState({});
	const [userSessions, setUserSessions] = useState([]);

	useEffect(() => {
		if (!isAuthed()) {
			navigate("/login");
			makeToast("Error!", "Please login first to open account panel", "error");
		} else {
			const token = authUser().token;
			const decodedjwt = jwt_decode(token);
			setDecoded(decodedjwt);
			const getUserData = async () => {
				const res = await api.get(`/user/${decodedjwt.id}`);
				const data = await res.data;
				setUserData(data);
				console.log(data);
				if (data.err == "User not found") {
					signOut();
				}
			};

			const getUserSessions = async () => {
				const res = await api.get(`/user-sessions/${decodedjwt.id}`);
				const data = await res.data;
				setUserSessions(data);
				console.log(data);
			};

			getUserSessions();
			getUserData();
		}
	}, []);

	const deleteSession = async (id) => {
		const res = await api.delete(`/session/${id}`);
		const status = res.status;
		if (status == 201) {
			makeToast("Error", "Session not found, try refreshing the page", "error");
		} else {
			window.location.reload();
			makeToast("Success", "Session successfully deleted.", "success");
		}
	};

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
				<Container textAlign={"center"} justifyContent={"center"}>
					<Box w="auto" h={"auto"} bgColor={"gray.700"} rounded={10} p={10}>
						<Container textAlign={"center"}>
							<Avatar src="" name={decoded?.username} />
							<Text mt={3} fontSize={"2xl"} textColor={"white"}>
								{decoded?.username}
							</Text>
							{userData?.special == true ? (
								<Tooltip label="You are a special user.">
									<Tag
										mt={5}
										size={"lg"}
										variant={"solid"}
										colorScheme="green"
										cursor={"pointer"}
										fontFamily={"Poppins"}
									>
										<BiSolidStar />
										&nbsp;Special User
									</Tag>
								</Tooltip>
							) : (
								<Text
									mt={5}
									textColor={"white"}
									fontWeight={"bold"}
									fontSize={"lg"}
								>
									No Badges
								</Text>
							)}
							<Text mt={5} textColor={"white"} fontFamily={"Poppins"}>
								Your sessions
							</Text>
							<Box overflowY={"auto"} maxHeight={"280px"} mt={5} zIndex={1}>
								<Table variant={"unstyled"} textAlign={"center"}>
									<Thead
										position={"sticky"}
										top={0}
										bgColor={"grey"}
										zIndex={20}
									>
										<Tr>
											<Th w={"100px"} textColor={"white"}>
												ID
											</Th>
											<Th textColor={"white"}>Question</Th>
											<Th textColor={"white"}>Actions</Th>
										</Tr>
									</Thead>
									<Tbody wordBreak={"break-word"} textColor={"white"}>
										{userSessions?.map((session, index) => {
											return (
												<Tr key={index}>
													<Td>{session.id}</Td>
													<Td>{session.question}</Td>
													<Td>
														<VStack>
															<Link href={`account/session/${session.id}`}>
																<Button colorScheme="green" size={"sm"}>
																	Open
																</Button>
															</Link>
															<Button
																onClick={() => {
																	deleteSession(session.id);
																}}
																colorScheme="red"
																size={"sm"}
															>
																Delete
															</Button>
														</VStack>
													</Td>
												</Tr>
											);
										})}
									</Tbody>
								</Table>
							</Box>
							<Text textColor={"white"} mt={5}>
								Create new session!{" "}
								<Link href={`/admin/account/create-session`} color={"blue.100"}>
									New session
								</Link>
							</Text>
							<Text mt={5} color={"white"}>
								Want to log out?
							</Text>
							<Button
								onClick={() => {
									signOut();
									navigate("/");
									makeToast("Success", "Successfully logged out!", "success");
								}}
								leftIcon={<BiLogOut />}
							>
								Log out
							</Button>
						</Container>
					</Box>
				</Container>
			</Flex>
		</>
	);
};
