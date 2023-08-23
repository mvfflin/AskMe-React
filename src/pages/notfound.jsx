import { Flex, Text, Container, Button, Link } from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";

export const NotFound = () => {
	return (
		<>
			<Flex bgColor={"gray.700"} w={"full"} h={"100vh"}>
				<Container pt={"350px"} textAlign={"center"}>
					<Text fontSize={"4xl"} textAlign={"center"} color={"white"}>
						Page not found.
					</Text>
					<Link
						href="/"
						_active={{ textDecoration: "none" }}
						_hover={{ textDecoration: "none" }}
					>
						<Button mt={"25px"} leftIcon={<BiHome />}>
							Home
						</Button>
					</Link>
				</Container>
			</Flex>
		</>
	);
};
