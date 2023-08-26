import {
	Avatar,
	Box,
	Center,
	Container,
	Flex,
	HStack,
	Heading,
	IconButton,
	Link,
	Tag,
	Text,
	VStack,
} from "@chakra-ui/react";
import askmcjpg from "../assets/askmc.jpg";
import { BiLogoGithub } from "react-icons/bi";

export const Creators = () => {
	return (
		<Flex
			pt={250}
			id="welcome"
			w={"full"}
			h={"100vh"}
			bgImage={`linear-gradient(to top, black, #646464), url(${askmcjpg})`}
			bgPos={"center"}
			bgRepeat={"no-repeat"}
			bgSize={"cover"}
			bgBlendMode={"multiply"}
		>
			<Center w={"100%"} h={"70%"}>
				<VStack>
					<Heading color={"white"}>AskMe Creators</Heading>

					<HStack spacing={10}>
						<Box w="auto" h={"auto"} bgColor={"gray.700"} rounded={10} p={10}>
							<Container textAlign={"center"}>
								<Avatar
									src="https://github.com/WillisRH.png"
									name="WillisRH"
									size={"xl"}
								/>
								<Text fontSize={"2xl"} textColor={"white"} mt={3}>
									WillisRH
								</Text>
								<Text fontSize={"md"} color={"white"}>
									As
								</Text>
								<HStack spacing={2} mt={3}>
									<Tag colorScheme="green" variant={"solid"}>
										Founder
									</Tag>{" "}
									<Tag colorScheme="yellow" variant={"solid"}>
										Back-end
									</Tag>
								</HStack>
								<Text fontSize={"lg"} color="white" mt={4}>
									Visit WillisRH
								</Text>
								<HStack spacing={4} mt={5} justify={"center"}>
									<Link href="https://github.com/WillisRH" target="_blank">
										<IconButton icon={<BiLogoGithub />} />
									</Link>
								</HStack>
							</Container>
						</Box>
						<Box w="auto" h={"auto"} bgColor={"gray.700"} rounded={10} p={10}>
							<Container textAlign={"center"}>
								<Avatar
									src="https://github.com/mvfflin.png"
									name="mvfflin"
									size={"xl"}
								/>
								<Text fontSize={"2xl"} textColor={"white"} mt={3}>
									mvfflin
								</Text>
								<Text fontSize={"md"} color={"white"}>
									As
								</Text>
								<HStack spacing={2} mt={3}>
									<Tag variant={"solid"} colorScheme="facebook">
										Front-end
									</Tag>{" "}
									<Tag variant={"solid"} colorScheme="yellow">
										Back-end
									</Tag>
								</HStack>
								<Text fontSize={"lg"} color="white" mt={4}>
									Visit mvfflin
								</Text>
								<HStack spacing={4} mt={5} justify={"center"}>
									<Link href="https://github.com/mvfflin" target="_blank">
										<IconButton icon={<BiLogoGithub />} />
									</Link>
								</HStack>
							</Container>
						</Box>
					</HStack>
				</VStack>
			</Center>
		</Flex>
	);
};
