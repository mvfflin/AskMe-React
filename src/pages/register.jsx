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

export const Register = () => {
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
		email: yup
			.string()
			.required("Required")
			.email("Please enter a valid email address"),
		password: yup
			.string()
			.required("Required")
			.min(8, "Password have minimum of 8 chars"),
	});

	const registerSubmit = async () => {
		const res = await api.post("/register", {
			username: formik.values.username,
			email: formik.values.email,
			password: formik.values.password,
		});
		const data = res.data;
		const status = res.status;
		if (status == 201) {
			makeToast("Failed to login!", "Username already used.", "error");
		} else if (status == 202) {
			makeToast("Failed to login!", "Email already used.", "error");
		} else if (status == 203) {
			makeToast("Failed to login!", "Incomplete credentials.", "error");
		} else if (status == 200) {
			makeToast(
				"Success to register!",
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
	};

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		validateOnBlur: true,
		validationSchema: validSchema,
		onSubmit: registerSubmit,
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
								Register to create a new account
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
								<FormControl mt={7} isInvalid={formik.errors.email}>
									<FormLabel textColor={"white"}>Email</FormLabel>
									<Input
										bgColor={"white"}
										name="email"
										placeholder="Insert your email..."
										value={formik.values.email}
										onChange={formik.handleChange}
									/>
									<FormErrorMessage>
										<FormErrorIcon />
										{formik.errors.email}
									</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={formik.errors.password} mt={7}>
									<FormLabel textColor={"white"}>Password</FormLabel>
									<Input
										bgColor={"white"}
										name="password"
										type="password"
										placeholder="Insert your password..."
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
									Already have an account?{" "}
									<Link textColor={"blue.100"} href="/login">
										Login
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
