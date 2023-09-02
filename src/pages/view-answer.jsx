import { useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useNavigate, useParams } from "react-router-dom";
import { setToast } from "../utils/toast";
import jwt_decode from "jwt-decode";
import api from "../utils/axios";
import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	HStack,
	Heading,
	IconButton,
	Link,
	Menu,
	Text,
	VStack,
	useOutsideClick,
} from "@chakra-ui/react";
import { ColorPicker } from "chakra-color-picker";
import {
	BiArrowBack,
	BiBullseye,
	BiExitFullscreen,
	BiFullscreen,
} from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useRef } from "react";

export const ViewAnswer = () => {
	const { sessionid, answerid } = useParams();
	const isAuthed = useIsAuthenticated();
	const authUser = useAuthUser();
	const navigate = useNavigate();
	const { makeToast } = setToast();
	const [sessionData, setSessionData] = useState({});
	const [answerData, setAnswerData] = useState({});
	const [color1, setColor1] = useState("red.500");
	const [color2, setColor2] = useState("red.500");
	const fshandler = useFullScreenHandle();
	const [hide, setHide] = useState(true);
	const ref = useRef();
	useOutsideClick({
		ref: ref,
		handler: () => setHide(true),
	});

	const onChange1 = (value) => {
		setColor1(value);
	};

	const onChange2 = (value) => {
		setColor2(value);
	};

	useEffect(() => {
		if (!isAuthed()) {
			navigate("/login");
			makeToast("Error!", "Please login first to open account panel", "error");
		} else {
			const token = authUser().token;
			const decodedjwt = jwt_decode(token);
			const getSessionInfo = async () => {
				try {
					const res = await api.get(`/session/${sessionid}`);
					if (res.status == 202) {
						makeToast("Error!", "Session not found", "error");
						navigate("/admin/account");
					} else {
						const data = await res.data;
						const findAnswer = data.answers.find(
							(answer) => answer.id == answerid
						);
						if (data.creator != decodedjwt.id) {
							navigate("/");
							makeToast(
								"Error!",
								"Session with that id not found in your account",
								"error"
							);
						}
						if (findAnswer) {
							setAnswerData(findAnswer);
							setSessionData(data);
						} else {
							navigate(`/admin/account/session/${data.id}`);
							makeToast("Error!", "Answer not found", "error");
						}
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

	const colors = [
		"red.500",
		"blue.500",
		"green.500",
		"white",
		"black",
		"cyan.500",
		"lime",
		"orange.500",
		"yellow.500",
		"teal.500",
		"purple.500",
		"pink.500",
	];

	return (
		<>
			<FullScreen handle={fshandler}>
				<Flex
					id="welcome"
					w={"full"}
					h={"100vh"}
					bgImage={`linear-gradient(to bottom right, ${color1}, ${color2})`}
					bgPos={"center"}
					bgRepeat={"no-repeat"}
					bgSize={"cover"}
					bgBlendMode={"multiply"}
					zIndex={101}
					position={"fixed"}
				>
					<Flex
						m={{ base: "10px", md: 50 }}
						p={5}
						pos={"absolute"}
						fontSize={"2xl"}
						bgColor={"white"}
						display={hide != false ? "flex" : "none"}
					>
						<VStack>
							<Text textAlign={"left"} fontSize={"sm"}>
								Pick your background color
							</Text>
							<HStack textAlign={"left"} spacing={6}>
								<ColorPicker colors={colors} onChange={onChange1} />
								<ColorPicker colors={colors} onChange={onChange2} />
								<Menu></Menu>
							</HStack>
						</VStack>
					</Flex>
					<Flex right={0} pos={"absolute"} m={{ base: "10px", md: 50 }}>
						<IconButton
							mr={"7px"}
							size={"lg"}
							icon={<FiEye />}
							onClick={() => {
								setHide((hide) => !hide);
							}}
							display={hide != false ? "flex" : "none"}
						/>
						<VStack>
							<Link href="../">
								<IconButton
									size={"lg"}
									icon={<BiArrowBack />}
									display={
										hide != false && fshandler.active.valueOf() == false
											? "flex"
											: "none"
									}
								/>
							</Link>
							<IconButton
								size={"lg"}
								icon={
									fshandler.active.valueOf() == false ? (
										<BiFullscreen />
									) : (
										<BiExitFullscreen />
									)
								}
								onClick={
									fshandler.active.valueOf() == false
										? fshandler.enter
										: fshandler.exit
								}
								display={hide != false ? "flex" : "none"}
							/>
						</VStack>
					</Flex>
					<Center w={"100%"} h={"100%"} px={10}>
						<Box
							w="auto"
							h={"max-content"}
							bgColor={"white"}
							rounded={10}
							mt={{ base: 50, md: 0 }}
						>
							<Container
								w={"100%"}
								h={"30%"}
								top={0}
								bgImage={"linear-gradient(to bottom right, blue, red)"}
								roundedTop={10}
								zIndex={2}
								textAlign={"center"}
							>
								<Text
									py={"50px"}
									fontSize={{ base: "xl", md: "3xl" }}
									textColor={"white"}
									textAlign={"center"}
								>
									{sessionData.question}
								</Text>
							</Container>
							<Container
								w={"100%"}
								my={10}
								bgColor={"white"}
								roundedBottom={10}
								wordBreak={"break-all"}
								px={10}
								textAlign={"center"}
							>
								<Text fontSize={"inherit"}>{answerData.answer}</Text>
							</Container>
						</Box>
					</Center>
				</Flex>
			</FullScreen>
		</>
	);
};
