import { useEffect } from "react";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import {
	Flex,
	Container,
	Box,
	Heading,
	Divider,
	Text,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormErrorIcon,
	Input,
	Button,
	Link,
} from "@chakra-ui/react";
import askmcjpg from "../assets/askmc.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../utils/axios";
import { setToast } from "../utils/toast";

export const Login = () => {
	const isAuthed = useIsAuthenticated();
	const navigate = useNavigate();
	const { makeToast } = setToast();
	const signIn = useSignIn();

	const validSchema = yup.object({
		username: yup
			.string()
			.required("Required")
			.min(3, "Username have minimum of 3 chars")
			.max(20, "Username have maximum of 20 chars"),
		password: yup
			.string()
			.required("Required")
			.min(8, "Password have minimum of 8 chars"),
	});

	const loginSubmit = async () => {
		try {
			const res = await api.post("/login", {
				username: formik.values.username,
				password: formik.values.password,
			});
			const data = res.data;
			const status = res.status;
			if (status == 201) {
				makeToast("Failed to login!", "Incomplete credentials.", "error");
			} else if (status == 202) {
				makeToast("Failed to login!", "User not found.", "error");
			} else if (status == 203) {
				makeToast("Failed to login!", "Password does not match.", "error");
			} else if (status == 200) {
				makeToast(
					"Success to login!",
					"Redirecting to account panel...",
					"success"
				);
				signIn({
					token: data.token,
					tokenType: "Bearer",
					expiresIn: 30,
					authState: {
						token: data.token,
					},
				});
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

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validateOnBlur: true,
		validationSchema: validSchema,
		onSubmit: loginSubmit,
	});

	useEffect(() => {
		if (isAuthed()) {
			navigate("/admin/account");
		}
	}, []);

	return (
		<>
			<Flex
				py={250}
				w={"full"}
				h={"auto"}
				bgImage={`linear-gradient(to top, black, #646464), url(${askmcjpg})`}
				bgPos={"center"}
				bgRepeat={"no-repeat"}
				bgSize={"cover"}
				bgBlendMode={"multiply"}
			>
				<Container>
					<Box w={"auto"} h={"auto"} bgColor={"gray.700"} rounded={10} p={10}>
						<Container textAlign={"center"}>
							<Heading color={"white"} textAlign={"left"} py={5}>
								Login to existing account
							</Heading>
							<Divider mb={7} />
							<form onSubmit={formik.handleSubmit}>
								<FormControl isInvalid={formik.errors.username}>
									<FormLabel textColor={"white"}>Username</FormLabel>
									<Input
										bgColor={"white"}
										name="username"
										placeholder="Insert your username..."
										value={formik.values.username}
										onChange={formik.handleChange}
									/>
									<FormErrorMessage>
										<FormErrorIcon />
										{formik.errors.username}
									</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={formik.errors.password} mt={7}>
									<FormLabel textColor={"white"}>Password</FormLabel>
									<Input
										bgColor={"white"}
										name="password"
										placeholder="Insert your password..."
										type="password"
										value={formik.values.password}
										onChange={formik.handleChange}
									/>
									<FormErrorMessage>
										<FormErrorIcon />
										{formik.errors.password}
									</FormErrorMessage>
								</FormControl>
								<Button type="submit" mt={"20px"}>
									Submit
								</Button>
								<Text mt={5} textColor={"white"}>
									Not registered?{" "}
									<Link textColor={"blue.100"} href="/register">
										Register
									</Link>{" "}
								</Text>
							</form>
						</Container>
					</Box>
				</Container>
			</Flex>
		</>
	);
};
