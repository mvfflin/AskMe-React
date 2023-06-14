import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Text,
} from "@chakra-ui/react";
import { setToast } from "../../utils/toast";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

export const LoginPanel = () => {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const { makeToast } = setToast();

    const loginSubmit = async () => {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify({
                email: formik.values.email,
                password: formik.values.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status == 202) {
            makeToast(
                "Failed to login!",
                "User with that email doesn't exists.",
                "error"
            );
            console.log("test");
        } else if (res.status == 201) {
            makeToast(
                "Failed to login!",
                "Your password is incorrect. Please try again!",
                "error"
            );
            console.log("test2");
        } else if (res.status == 500) {
            makeToast(
                "Failed to login!",
                "Something is wrong in database! Please wait...",
                "error"
            );
        } else if (res.status == 200) {
            const data = await res.json();
            makeToast(
                "Success!",
                "Redirecting to account panel now...",
                "success"
            );
            console.log(data);
            const token = data.token;
            signIn({
                token: token,
                tokenType: "Bearer",
                expiresIn: 30,
                authState: {
                    token: token,
                },
            });
            return navigate("/account/admin");
        }
    };

    const validSchema = yup.object({
        email: yup
            .string()
            .required("Required")
            .email("Please input a valid email address"),
        password: yup
            .string()
            .required("Required")
            .min(7, "Password must have atl 7 chars"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validateOnBlur: true,
        validationSchema: validSchema,
        onSubmit: loginSubmit,
    });

    return (
        <Flex>
            <Box w={"full"} h={"full"} textColor={"white"} mt={"60px"}>
                <Heading my={5}>Log-in to your existing account.</Heading>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl isInvalid={formik.errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            textColor={"black"}
                            type="text"
                            variant={"solid"}
                            p={5}
                            placeholder="Insert your email..."
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <FormErrorMessage>
                            <FormErrorIcon />
                            {formik.errors.email}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl mt={7} isInvalid={formik.errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            textColor={"black"}
                            type="text"
                            variant={"solid"}
                            p={5}
                            placeholder="Insert your password..."
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <FormErrorMessage>
                            <FormErrorIcon />
                            {formik.errors.password}
                        </FormErrorMessage>
                    </FormControl>
                    <Button
                        w={"100%"}
                        mt={10}
                        type="submit"
                        colorScheme="facebook"
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Flex>
    );
};
