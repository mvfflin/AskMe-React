import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";
import { setToast } from "../utils/toast";
import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Tag,
} from "@chakra-ui/react";
import askmcjpg from "../assets/askmc.jpg";
import { useFormik } from "formik";
import * as yup from "yup";

export const SubmitAnswer = () => {
	const { session } = useParams();
	const navigate = useNavigate();
	const { makeToast } = setToast();
	const [sessionData, setSessionData] = useState({});
	const [creator, setCreator] = useState({});

	useEffect(() => {
		const getSessionData = async () => {
			const res = await api.get(`/session/${session}`);
			const status = res.status;
			if (status == 202) {
				makeToast("Error", "Session not found!", "error");
				navigate("/");
			} else {
				const data = await res.data;
				setSessionData(data);
				const getUserData = async () => {
					const res1 = await api.get(`/user/${data.creator}`);
					const data1 = await res1.data;
					if (data.creator == data1.id) {
						setCreator(data1);
					}
				};
				getUserData();
			}
		};
		getSessionData();
	}, []);

	const validSchema = yup.object({
		answer: yup.string().required("Required"),
	});

	const answerSubmit = async () => {
		const res = await api.patch(`/new-answer`, {
			sessionid: sessionData.id,
			answer: formik.values.answer,
		});
		if (res.status == 202) {
			makeToast("Error", "Session not found", "error");
			navigate("/");
		} else {
			makeToast(
				"Success",
				"Answer uploaded! wait for them to react to it 😀",
				"success"
			);
			navigate("/");
		}
	};

	const formik = useFormik({
		initialValues: {
			answer: "",
		},
		validateOnBlur: true,
		validationSchema: validSchema,
		onSubmit: answerSubmit,
	});

	return (
		<Flex
			py={250}
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
						<Heading color={"white"}>
							Answer to {creator.username}'s question!
						</Heading>
						<Tag size={"lg"} my={5}>
							{sessionData.question}
						</Tag>
						<form onSubmit={formik.handleSubmit}>
							<FormControl isInvalid={formik.errors.answer}>
								<FormLabel color="white">Your answer</FormLabel>
								<Input
									type="text"
									bgColor={"white"}
									placeholder="Insert your answer to this question..."
									name="answer"
									value={formik.values.answer}
									onChange={formik.handleChange}
								/>
								<FormErrorMessage>
									<FormErrorIcon />
									{formik.errors.answer}
								</FormErrorMessage>
							</FormControl>
							<Button mt={7} type="submit" colorScheme="green">
								Submit your answer
							</Button>
						</form>
					</Container>
				</Box>
			</Container>
		</Flex>
	);
};
