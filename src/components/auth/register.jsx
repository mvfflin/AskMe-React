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
} from "@chakra-ui/react";
import * as yup from "yup";
import { useFormik } from "formik";

export const RegisterPanel = () => {
    const registHandler = async () => {
        const res = await fetch(
            "https://cc29-111-94-109-109.ngrok-free.app/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formik.values.username,
                    password: formik.values.password,
                    email: formik.values.email,
                }),
            }
        );
        const statusCode = res.status;
        console.log(statusCode);
    };

    const validSchema = yup.object({
        username: yup
            .string()
            .required("Required")
            .min(4, "Username must have at least 4 chars")
            .max(20, "Username can only have 20 chars max"),
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
            username: "",
            email: "",
            password: "",
        },
        validateOnBlur: true,
        validationSchema: validSchema,
        onSubmit: registHandler,
    });

    return (
        <Flex>
            <Box w={"full"} h={"full"} textColor={"white"}>
                <Heading mt={10} mb={7} textColor={"white"}>
                    Register new account
                </Heading>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl isInvalid={formik.errors.username}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            textColor={"black"}
                            type="text"
                            p={5}
                            variant={"solid"}
                            placeholder="Insert your username..."
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        <FormErrorMessage>
                            <FormErrorIcon />
                            {formik.errors.username}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl my={7} isInvalid={formik.errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            textColor={"black"}
                            type="text"
                            p={5}
                            variant={"solid"}
                            placeholder="Insert your email..."
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            name="email"
                        />
                        <FormErrorMessage>
                            <FormErrorIcon />
                            {formik.errors.email}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            textColor={"black"}
                            type="text"
                            p={5}
                            variant={"solid"}
                            placeholder="Insert your password..."
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            name="password"
                        />
                        <FormErrorMessage>
                            <FormErrorIcon />
                            {formik.errors.password}
                        </FormErrorMessage>
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="facebook"
                        mt={7}
                        w={"full"}
                    >
                        Register
                    </Button>
                </form>
            </Box>
        </Flex>
    );
};
