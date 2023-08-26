import {
	Flex,
	Text,
	Box,
	HStack,
	ButtonGroup,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Link,
} from "@chakra-ui/react";
import { useIsAuthenticated } from "react-auth-kit";
import { BiArchive, BiHome, BiUser } from "react-icons/bi";

export const Navbar = () => {
	const isAuthed = useIsAuthenticated();

	return (
		<Flex
			w={"100vw"}
			h={"80px"}
			bgColor={"gray.900"}
			pos={"fixed"}
			top={0}
			zIndex={100}
		>
			<Flex p={3} pl={20} justify={"flex-start"} w={"full"}>
				<Text fontSize={"4xl"} fontWeight={"semibold"} color={"white"}>
					AskMe
				</Text>
			</Flex>

			<Flex justify={"flex-end"} mr={10}>
				<HStack>
					<ButtonGroup spacing={10} justifyItems={"space-between"}>
						<Link href="/">
							<Button leftIcon={<BiHome />}>Home</Button>
						</Link>
						{!isAuthed() ? (
							<Menu>
								<MenuButton as={Button} leftIcon={<BiUser />}>
									Sign In
								</MenuButton>
								<MenuList>
									<Link
										href="/register"
										_active={{ textDecoration: "none" }}
										_hover={{ textDecoration: "none" }}
									>
										<MenuItem>Register</MenuItem>
									</Link>
									<Link
										href="/login"
										_active={{ textDecoration: "none" }}
										_hover={{ textDecoration: "none" }}
									>
										<MenuItem>Login</MenuItem>
									</Link>
								</MenuList>
							</Menu>
						) : (
							<Link
								href="/admin/account"
								_active={{ textDecoration: "none" }}
								_hover={{ textDecoration: "none" }}
							>
								<Button leftIcon={<BiUser />}>Account Panel</Button>
							</Link>
						)}
						<Link href="/creators">
							<Button leftIcon={<BiArchive />}>Creators</Button>
						</Link>
					</ButtonGroup>
				</HStack>
			</Flex>
		</Flex>
	);
};
