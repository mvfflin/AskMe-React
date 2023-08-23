import {
	Avatar,
	Box,
	Container,
	Flex,
	Tag,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import askmcjpg from "../assets/askmc.jpg";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToast } from "../utils/toast";
import jwt_decode from "jwt-decode";
import api from "../utils/axios";
import { BiSolidStar } from "react-icons/bi";

export const AccountPanel = () => {
	const isAuthed = useIsAuthenticated();
	const authUser = useAuthUser();
	const signOut = useSignOut();
	const navigate = useNavigate();
	const { makeToast } = setToast();
	const [decoded, setDecoded] = useState({});
	const [userData, setUserData] = useState({});

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
			getUserData();
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
				<Container textAlign={"center"} justifyContent={"center"}>
					<Box w="auto" h={"auto"} bgColor={"gray.700"} rounded={10} p={10}>
						<Container textAlign={"center"}>
							<Avatar src="" name={decoded?.username} />
							<Text mt={3} fontSize={"2xl"} textColor={"white"}>
								{decoded?.username}
							</Text>
							{userData?.special == true ? (
								<Tooltip label="Adios">
									<Tag
										mt={5}
										size={"lg"}
										variant={"solid"}
										colorScheme="green"
										cursor={"pointer"}
									>
										<BiSolidStar /> Special User
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
						</Container>
					</Box>
				</Container>
			</Flex>
		</>
	);
};
