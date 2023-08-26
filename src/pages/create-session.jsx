import {
	Box,
	Button,
	Container,
	Divider,
	Flex,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { setToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import askmcjpg from "../assets/askmc.jpg";
import api from "../utils/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import jwt_decode from "jwt-decode";

export const CreateSession = () => {
	const isAuthed = useIsAuthenticated();
	const { makeToast } = setToast();
	const navigate = useNavigate();
	const authUser = useAuthUser();
	const [decoded, setDecoded] = useState({});

	useEffect(() => {
		if (!isAuthed()) {
			navigate("/login");
			makeToast("Error!", "Please login first to open account panel", "error");
		} else {
			const token = authUser().token;
			const decodedjwt = jwt_decode(token);
			setDecoded(decodedjwt);
		}
	}, []);

	const validSchema = yup.object({
		question: yup
			.string()
			.required("Required")
			.max(100, "Question is limited to 100 chars"),
	});

	const formik = useFormik({
		initialValues: {
			question: "",
		},
		validateOnBlur: true,
		validationSchema: validSchema,
	});

	const createSession = async () => {
		try {
			const res = await api.post("/session", {
				question: formik.values.question,
				creator: decoded.id,
			});
			const status = res.status;
			if (status == 201) {
				makeToast("Error", "User id or question not defined", "error");
			} else if (status == 202) {
				makeToast("Error", "Creator id not found", "error");
			} else if (status == 200) {
				makeToast(
					"Session Created!",
					"Session created successfully.",
					"success"
				);
				navigate("/admin/account");
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
						<Heading color={"white"}>Create a new session</Heading>
						<Divider my={7} />
						<form>
							<FormControl isInvalid={formik.errors.question}>
								<FormLabel textColor={"white"}>
									Insert your question...
								</FormLabel>
								<Input
									bgColor={"white"}
									type="text"
									name="question"
									placeholder="Input your question here...."
									value={formik.values.question}
									onChange={formik.handleChange}
								/>
								<FormErrorMessage>
									<FormErrorIcon />
									{formik.errors.question}
								</FormErrorMessage>
							</FormControl>
							<Button mt={7} onClick={createSession}>
								Create new session
							</Button>
						</form>
					</Container>
				</Box>
			</Container>
		</Flex>
	);
};
