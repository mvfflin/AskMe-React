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
import { BiLink, BiShare } from "react-icons/bi";

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
				const res = await api.get(`/session/${sessionid}`);
				const data = await res.data;
				const status = res.status;
				if (res.status == 202) {
					makeToast("Error", `Please enter a valid session id!`, "error");
					navigate("/admin/account");
				} else {
					setSessionData(data);
					setAnswers(data.answers);
					console.log(data.answers);
				}
			};
			getSessionInfo();
		}
	}, []);

	return (
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
						<Heading color={"white"}>Session Admin Panel</Heading>
						<Tag size={"lg"} my={5}>
							{sessionData.question}
						</Tag>
						<br />
						<ButtonGroup spacing={6}>
							<Button leftIcon={<BiShare />} colorScheme="facebook">
								Share
							</Button>
							<Button leftIcon={<BiLink />} colorScheme="green">
								Preview
							</Button>
						</ButtonGroup>
						<Text textColor={"white"} my={5} fontSize={"lg"}>
							Answers
						</Text>
						<Box overflowY={"auto"} maxHeight={"280px"} mt={5} zIndex={1}>
							<Table variant={"unstyled"} textAlign={"center"}>
								<Thead position={"sticky"} top={0} bgColor={"grey"} zIndex={20}>
									<Tr>
										<Th>ID</Th>
										<Th>Answers</Th>
										<Th>Actions</Th>
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
														<Button size={"sm"} colorScheme="green">
															Open
														</Button>
														<Button size={"sm"} colorScheme="red">
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
					</Container>
				</Box>
			</Container>
		</Flex>
	);
};
