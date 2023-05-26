import { Avatar, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { setToast } from "../utils/toast";

export const AccountPanel = () => {
    const isAuthed = useIsAuthenticated();
    const authUser = useAuthUser();
    const navigate = useNavigate();
    const signOut = useSignOut();
    const { makeToast } = setToast();

    useEffect(() => {
        // check if user is loggedin or not
        if (!isAuthed()) {
            makeToast(
                "You are not authenticated",
                "Please login or register first to open account panel",
                "error"
            );
            navigate("/auth");
        }
    }, [isAuthed(), navigate]);

    return (
        <>
            <Box>
                <Box w={"full"} h={"5xl"}>
                    <Flex justify={"center"}>
                        <Box
                            w={800}
                            h={600}
                            mt={225}
                            mx={5}
                            borderRadius={10}
                            bgColor={"blackAlpha.500"}
                        >
                            <Flex mt={50} justify={"center"}>
                                <VStack gap={5}>
                                    <Avatar
                                        size={"xl"}
                                        name={authUser().username}
                                    />
                                    <Text
                                        fontSize={"3xl"}
                                        textColor={"white"}
                                        fontWeight={"700"}
                                    >
                                        {authUser().username}
                                    </Text>
                                </VStack>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </>
    );
};
