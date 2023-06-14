import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import "@fontsource/lato";

export const HomeAbout = () => {
    return (
        <Box>
            <Flex
                justify={"center"}
                mt={225}
                bgColor={"rgba(255,255,255,0.2)"}
                h={"5xl"}
                backdropFilter={"blur(12px)"}
            >
                <VStack
                    textAlign={"center"}
                    mx={50}
                    mt={250}
                    textColor={"black"}
                >
                    <Text fontSize={"5xl"} fontFamily={"Lato"} fontWeight={900}>
                        About AskMe.
                    </Text>
                    <Text fontSize={"2xl"} fontWeight={400}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Obcaecati dolorum voluptate dicta, cupiditate
                        voluptatibus dolor neque totam qui mollitia iure
                        suscipit minima eius expedita? Saepe laudantium quasi
                        deleniti atque iure sed quas hic vitae deserunt? Ratione
                        neque minima minus dolorum. Quibusdam sunt placeat
                        eveniet reiciendis, assumenda dicta distinctio aut
                        impedit ut amet in eaque neque laudantium ipsum sint,
                        officiis, quae quam voluptas pariatur! Recusandae illo
                        earum tenetur! Architecto, rerum? Delectus non facere
                        suscipit ab iusto eveniet accusantium placeat.
                        Laudantium adipisci quaerat unde maxime consectetur,
                        eaque repellat, architecto expedita illo sunt fugiat
                        mollitia nemo cupiditate culpa quidem temporibus?
                        Veritatis deserunt soluta ipsum sit voluptate odio ipsa
                        error est? Sequi doloribus iure, provident corrupti
                        cupiditate cumque, labore molestiae, illo inventore
                        voluptatibus ad?
                    </Text>
                </VStack>
            </Flex>
        </Box>
    );
};
