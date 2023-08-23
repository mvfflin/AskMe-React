import { Text, Container, HStack, Button, Flex, Link } from "@chakra-ui/react";
import askmcjpg from "../assets/askmc.jpg";
import { BiUser } from "react-icons/bi";

export const Home = () => {
	return (
		<>
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
				<Container>
					<Text
						textAlign={"center"}
						fontSize={"6xl"}
						fontWeight={"bold"}
						color={"white"}
					>
						AskMe Website
					</Text>
					<Text color={"gray.400"} textAlign={"center"} fontSize={"2xl"}>
						A website where you can create a session and your friends will fill
						it
					</Text>
					<HStack mt={"25px"} justifyContent={"center"}>
						<Link
							href="/login"
							_active={{ textDecoration: "none" }}
							_hover={{ textDecoration: "none" }}
						>
							<Button leftIcon={<BiUser />}>Sign In Now!</Button>
						</Link>
					</HStack>
				</Container>
			</Flex>
		</>
	);
};
