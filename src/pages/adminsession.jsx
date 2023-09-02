import { useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useNavigate, useParams } from "react-router-dom";
import { setToast } from "../utils/toast";
import {
	Box,
	Button,
	ButtonGroup,
	Container,
	Flex,
	Heading,
	Link,
	Table,
	Tag,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	VStack,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import api from "../utils/axios";
import askmcjpg from "../assets/askmc.jpg";
import { BiArrowBack, BiLink, BiRefresh, BiShare } from "react-icons/bi";
import CopyToClipboard from "react-copy-to-clipboard";

export const AdminSession = () => {
	const { sessionid } = useParams();
	const isAuthed = useIsAuthenticated();
	const navigate = useNavigate();
	const { makeToast } = setToast();
	const authUser = useAuthUser();
	const [decoded, setDecoded] = useState({});
	const [sessionData, setSessionData] = useState({});
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		if (!isAuthed()) {
			navigate("/login");
			makeToast("Error!", "Please login first to open account panel", "error");
		} else {
			const token = authUser().token;
			const decodedjwt = jwt_decode(token);
			setDecoded(decodedjwt);
			const getSessionInfo = async () => {
				try {
					const res = await api.get(`/session/${sessionid}`);
					const data = await res.data;
					const status = res.status;
					if (status == 202) {
						makeToast(
							"Error",
							`Session with that id not found in your account`,
							"error"
						);
						navigate("/admin/account");
					} else {
						if (data.creator != decodedjwt.id) {
							navigate("/admin/account");
							makeToast(
								"Error",
								"Session with that id not found in your account",
								"error"
							);
						}
						setSessionData(data);
						setAnswers(data.answers);
						console.log(data.answers);
					}
				} catch (err) {
					makeToast(
						"Error!",
						"Something wrong with the server, please contact admin",
						"error"
					);
					navigate("/");
					// console.log(err)
				}
			};
			getSessionInfo();
		}
	}, []);

	const url = window.location.href;
	const newUrl = url.replace("/admin/account/", "/");

	const onCopy = () => {
		makeToast("Success", "Link copied to clipboard!", "success");
	};

	const deleteAnswer = async (answeridd) => {
		try {
			const res = await api.patch("/delete-answer", {
				sessionid: sessionData.id,
				answerid: answeridd,
			});
			if (res.status == 200) {
				window.location = window.location;
				makeToast("Success", "Answer deleted", "success");
			}
		} catch (err) {
			makeToast(
				"Error!",
				"Something wrong with the server, please contact admin",
				"error"
			);
			navigate("/");
			// console.log(err)
		}
	};

	return (
		<Flex
			py={250}
			id="welcome"
			w={"full"}
			h={"auto"}
			bgImage={`linear-gradient(to top, black, #646464), url(${askmcjpg})`}
			bgPos={"center"}
			bgRepeat={"no-repeat"}
			bgSize={"cover"}
			bgBlendMode={"multiply"}
		>
			<Container textAlign={"center"} justifyContent={"center"}>
				<Box w="auto" h={"max-content"} bgColor={"gray.700"} rounded={10}>
					<Container textAlign={"center"}>
						<Heading color={"white"} pt={10}>
							Session Admin Panel
						</Heading>
						<Tag size={"lg"} my={5}>
							{sessionData.question}
						</Tag>
						<br />
						<ButtonGroup spacing={6}>
							<CopyToClipboard text={newUrl} onCopy={onCopy}>
								<Button leftIcon={<BiShare />} colorScheme="facebook">
									Share
								</Button>
							</CopyToClipboard>
							<Link href={`/session/${sessionData.id}`}>
								<Button leftIcon={<BiLink />} colorScheme="green">
									Preview
								</Button>
							</Link>
						</ButtonGroup>
						<br />
						<Button
							mt={5}
							colorScheme="blackAlpha"
							onClick={() => (window.location = window.location)}
							leftIcon={<BiRefresh />}
						>
							Refresh
						</Button>
						<Text textColor={"white"} my={5} fontSize={"lg"}>
							Answers
						</Text>
						<Box overflowY={"auto"} maxHeight={"280px"} mt={5} zIndex={1}>
							<Table
								variant={"simple"}
								textAlign={"center"}
								bgColor={"gray.900"}
								fontSize={{ base: "sm", md: "lg" }}
							>
								<Thead position={"sticky"} top={0} bgColor={"grey"} zIndex={20}>
									<Tr>
										<Th textColor={"white"}>ID</Th>
										<Th textColor={"white"}>Answers</Th>
										<Th textColor={"white"}>Actions</Th>
									</Tr>
								</Thead>
								<Tbody>
									{answers.map((answer, index) => {
										return (
											<Tr key={index}>
												<Td textColor={"white"}>{answer.id}</Td>
												<Td textColor={"white"}>{answer.answer}</Td>
												<Td>
													<VStack>
														<Link
															href={`/admin/account/session/${sessionData.id}/view/${answer.id}`}
														>
															<Button size={"sm"} colorScheme="green">
																Open
															</Button>
														</Link>
														<Button
															onClick={() => {
																deleteAnswer(answer.id);
															}}
															size={"sm"}
															colorScheme="red"
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

						<Button
							onClick={() => {
								navigate("/admin/account");
							}}
							mt={5}
							mb={5}
							leftIcon={<BiArrowBack />}
						>
							Back to Account panel
						</Button>
					</Container>
				</Box>
			</Container>
		</Flex>
	);
};
