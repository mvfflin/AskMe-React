import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    Link,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { BiRightArrow, BiRightArrowAlt } from "react-icons/bi";
import { TypeAnimation } from "react-type-animation";
import { setToast } from "../../utils/toast";
import { decodeToken } from "react-jwt";

export const HomeWelcome = () => {
    // to check if user is authenticated
    const isAuthed = useIsAuthenticated();
    // auth user id, email, dll
    const authUser = useAuthUser();
    const userData = decodeToken(authUser()?.token);
    console.log(userData);
    const { makeToast } = setToast();

    return (
        <>
            <Flex justify={"center"} mx={"auto"} w={"full"} h={"full"}>
                <Box mt={225} textAlign={"center"}>
                    {!isAuthed() ? (
                        <>
                            <VStack gap={35}>
                                <Heading
                                    fontSize={{
                                        base: 50,
                                        sm: 60,
                                        md: 80,
                                        lg: 100,
                                    }}
                                    color={"white"}
                                    mx={15}
                                >
                                    Welcome to <br />
                                    <Text
                                        bgColor={"white"}
                                        textColor={"black"}
                                        p={5}
                                        borderRadius={10}
                                    >
                                        <TypeAnimation
                                            sequence={[
                                                "AskEm",
                                                500,
                                                "AskMe Weebs",
                                                500,
                                                "AskMe Websiet",
                                                500,
                                                "AskMe Website!",
                                                500,
                                            ]}
                                            cursor={false}
                                        />
                                    </Text>
                                </Heading>
                                <Text color={"white"} fontSize={25}>
                                    <TypeAnimation
                                        sequence={[
                                            "Get answers from your questions anonymously",
                                            1000,
                                            "Get answers from your questions misteriously",
                                            1000,
                                        ]}
                                    />
                                </Text>
                                <Link>
                                    <Button
                                        size={"lg"}
                                        leftIcon={<BiRightArrowAlt />}
                                        onClick={() => {
                                            makeToast("Hi", "there", "success");
                                        }}
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </VStack>
                        </>
                    ) : (
                        <VStack>
                            <Heading fontSize={100} color={"white"} mx={40}>
                                Hello again, {userData?.username}
                            </Heading>
                            <Link>
                                <Button
                                    leftIcon={<BiRightArrowAlt />}
                                    onClick={() =>
                                        (window.location.href = "#about")
                                    }
                                >
                                    Account Panel
                                </Button>
                            </Link>
                        </VStack>
                    )}
                </Box>
            </Flex>
        </>
    );
};
