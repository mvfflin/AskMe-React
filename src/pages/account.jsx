import {
    Avatar,
    Box,
    Button,
    Flex,
    Table,
    TableCaption,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { setToast } from "../utils/toast";
import { decodeToken } from "react-jwt";

export const AccountPanel = () => {
    const isAuthed = useIsAuthenticated();
    const authUser = useAuthUser();
    const navigate = useNavigate();
    const { makeToast } = setToast();
    const userData = decodeToken(authUser()?.token);
    const [specialUsers, setSpecialUsers] = useState([]);
    const [userQuestions, setUserQuestions] = useState([]);

    useEffect(() => {
        // get special user data
        const specialUserData = async () => {
            const res = await fetch("http://localhost:3000/specialuserlist", {
                method: "POST",
            });

            const data = await res.json();
            setSpecialUsers(data);
        };
        specialUserData();

        // get questions
        const getUserQuestions = async () => {
            const res = await fetch(
                `http://localhost:3000/questionsprofilelist/${userData?.id}`,
                {
                    method: "POST",
                }
            );

            const data = await res.json();
            setUserQuestions(data);
        };
        getUserQuestions();
    }, []);

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
                            h={"auto"}
                            mt={225}
                            mx={5}
                            borderRadius={10}
                            bgColor={"blackAlpha.500"}
                        >
                            <Flex my={50} justify={"center"}>
                                <VStack gap={5}>
                                    <Avatar
                                        size={"xl"}
                                        name={userData?.username}
                                    />
                                    <Text
                                        fontSize={"3xl"}
                                        textColor={"white"}
                                        fontWeight={"700"}
                                    >
                                        {userData?.username}
                                    </Text>
                                    {specialUsers.includes(userData?.id) ? (
                                        <Tooltip
                                            label="You are a special user"
                                            placement="top"
                                        >
                                            <Tag
                                                bgColor={"green.700"}
                                                size={"lg"}
                                                cursor={"pointer"}
                                            >
                                                Special User
                                            </Tag>
                                        </Tooltip>
                                    ) : (
                                        <Text fontSize={"md"}>No Badge</Text>
                                    )}
                                    <Text fontSize={"2xl"}>Question Table</Text>
                                    <TableContainer mx={10}>
                                        <Table
                                            variant={"simple"}
                                            bgColor={"gray"}
                                        >
                                            <TableCaption>
                                                Create a question
                                            </TableCaption>
                                            <Thead textAlign={"center"}>
                                                <Tr>
                                                    <Th
                                                        isNumeric
                                                        textAlign={"center"}
                                                    >
                                                        Question ID
                                                    </Th>
                                                    <Th textAlign={"center"}>
                                                        Question
                                                    </Th>
                                                    <Th textAlign={"center"}>
                                                        Action
                                                    </Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody textAlign={"center"}>
                                                {userQuestions.map(
                                                    (question, index) => {
                                                        return (
                                                            <Tr key={index}>
                                                                <Td
                                                                    textAlign={
                                                                        "center"
                                                                    }
                                                                >
                                                                    {
                                                                        question.questionid
                                                                    }
                                                                </Td>
                                                                <Td
                                                                    textAlign={
                                                                        "center"
                                                                    }
                                                                    wordBreak={
                                                                        "break-all"
                                                                    }
                                                                >
                                                                    {
                                                                        question.questiontitle
                                                                    }
                                                                </Td>
                                                                <Td
                                                                    textAlign={
                                                                        "center"
                                                                    }
                                                                >
                                                                    <Button>
                                                                        Open
                                                                    </Button>
                                                                    <Button>
                                                                        Delete
                                                                    </Button>
                                                                </Td>
                                                            </Tr>
                                                        );
                                                    }
                                                )}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                    <Button
                                        onClick={() =>
                                            console.log(userQuestions)
                                        }
                                    >
                                        test
                                    </Button>
                                </VStack>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </>
    );
};
