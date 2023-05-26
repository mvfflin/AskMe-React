import { Box, Flex, Text } from "@chakra-ui/react";
import { HomeWelcome } from "../components/home/welcoming";
import { HomeAbout } from "../components/home/about";

export const HomePage = () => {
    return (
        <>
            <Box>
                <section id="home">
                    <Box w={"full"} h={"5xl"}>
                        <HomeWelcome />
                    </Box>
                </section>
                <section id="about">
                    <Box w={"full"} h={"5xl"}>
                        <HomeAbout />
                    </Box>
                </section>
            </Box>
        </>
    );
};
