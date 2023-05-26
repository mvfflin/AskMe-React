import {
    Box,
    Button,
    Container,
    Flex,
    HStack,
    Text,
    VStack,
} from "@chakra-ui/react";
import "@fontsource/lato";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NavInvisibleMenuItem, NavMenuItem } from "./navbarButton";
import { BiCard, BiCircle, BiHome, BiMenu, BiUser } from "react-icons/bi";
import { useIsAuthenticated } from "react-auth-kit";
import Hamburger from "hamburger-react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export const Navbar = () => {
    const [scrollTop, setScrollTop] = useState(0);
    const [isOpen, onToggle] = useState(false);
    const path = window.location.pathname;
    const isAuthed = useIsAuthenticated();

    const toggleMenu = () => {
        onToggle(!isOpen);
    };

    useEffect(() => {
        const handleScroll = (event) => {
            setScrollTop(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <Flex
                top={0}
                zIndex={9999}
                pos={"fixed"}
                w={"full"}
                h={"110px"}
                transition={"all 0.2s ease-in-out"}
                bgColor={
                    isOpen == true
                        ? "gray.800"
                        : path == "/" && scrollTop == 0
                        ? "transparent"
                        : "gray.800"
                }
            >
                {/* logo brand */}
                <Flex
                    cursor={"pointer"}
                    w={"200px"}
                    justify={"flex-start"}
                    p={25}
                    pt={30}
                    pl={{ base: 10, sm: 20, md: 10, lg: 75 }}
                >
                    {/* TODO: check if user is logged in or nah */}
                    <Text
                        as={motion.div}
                        fontSize={"4xl"}
                        fontFamily={"Lato"}
                        textColor={"white"}
                        fontWeight={900}
                        onClick={() => window.location.reload}
                    >
                        AskMe
                    </Text>
                </Flex>

                <Flex
                    justify={"flex-end"}
                    pos={"relative"}
                    w={"full"}
                    p={30}
                    pr={50}
                >
                    {/* pc/laptop and tablets view */}
                    <HStack
                        gap={10}
                        display={{
                            base: "none",
                            sm: "none",
                            md: "flex",
                            lg: "flex",
                        }}
                    >
                        <NavMenuItem icon={<BiHome />} link={"/"} name="Home" />
                        <NavMenuItem
                            icon={<BiCard />}
                            link="/creators"
                            name="Creators"
                        />
                        {!isAuthed() ? (
                            <NavMenuItem
                                icon={<BiUser />}
                                link={"/auth"}
                                name="Login/Register"
                            />
                        ) : (
                            <NavMenuItem
                                icon={<BiUser />}
                                link={"/account/admin"}
                                name="Account Panel"
                            />
                        )}
                    </HStack>
                </Flex>

                <Flex
                    display={{
                        base: "flex",
                        sm: "flex",
                        md: "none",
                        lg: "none",
                    }}
                    justify={"flex-end"}
                    pos={"relative"}
                    w={"full"}
                    pr={{ base: 2, sm: 7 }}
                    pt={8}
                >
                    <Button
                        size={"lg"}
                        as={motion.div}
                        whileHover={{ scale: 1.3 }}
                        transition={"all 0.5s ease-in-out"}
                        textColor={"white"}
                        variant={"ghost"}
                        _hover={{ bgColor: "none" }}
                        _active={{ bgColor: "none" }}
                        fontSize={50}
                        cursor={"pointer"}
                    >
                        <Hamburger toggled={isOpen} toggle={toggleMenu} />
                    </Button>
                </Flex>
            </Flex>

            {/* phone view tab darken effect */}
            <Flex
                display={{
                    base: "flex",
                    sm: "flex",
                    md: "none",
                    lg: "none",
                }}
                as={motion.div}
                transition={"all 0.5s ease-in-out"}
                pos={"fixed"}
                left={isOpen == true ? "0%" : "100%"}
                w={"100vw"}
                h={"full"}
                zIndex={1000}
                bgColor={"blackAlpha.600"}
                top={110}
            ></Flex>

            {/* phone view tab */}

            <Flex
                display={{
                    base: "flex",
                    sm: "flex",
                    md: "none",
                    lg: "none",
                }}
                as={motion.div}
                transition={"all 0.5s ease-in-out"}
                pos={"fixed"}
                left={isOpen == true ? "50%" : "100%"}
                w={"100vw"}
                h={"full"}
                zIndex={1000}
                bgColor={"blackAlpha.800"}
                top={110}
            >
                <Flex justify={"flex-start"}>
                    <VStack gap={5} mt={100} ml={2}>
                        <NavInvisibleMenuItem
                            icon={<BiHome />}
                            link={"/"}
                            name="Home"
                        />
                        <NavInvisibleMenuItem
                            icon={<BiCard />}
                            link="/creators"
                            name="Creators"
                        />
                        {!isAuthed() ? (
                            <NavInvisibleMenuItem
                                icon={<BiUser />}
                                link={"/auth"}
                                name="Login/Register"
                            />
                        ) : (
                            <NavInvisibleMenuItem
                                icon={<BiUser />}
                                link={"/account/admin"}
                                name="Account Panel"
                            />
                        )}
                    </VStack>
                </Flex>
            </Flex>
        </>
    );
};
