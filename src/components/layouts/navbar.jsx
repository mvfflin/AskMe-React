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
	IconButton,
	useDisclosure,
	Collapse,
	VStack,
	Stack,
} from "@chakra-ui/react";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import {
	BiArchive,
	BiChevronDown,
	BiChevronUp,
	BiHome,
	BiMenu,
	BiUser,
} from "react-icons/bi";
import { FiList } from "react-icons/fi";

export const Navbar = () => {
	const isAuthed = useIsAuthenticated();
	const { onToggle, isOpen } = useDisclosure();
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<Flex
			w={"100vw"}
			h={"80px"}
			bgColor={"gray.900"}
			pos={"fixed"}
			top={0}
			zIndex={100}
		>
			<Collapse in={isOpen} animateOpacity>
				<Flex
					display={{ base: "flex", md: "none" }}
					w={"100%"}
					h={"auto"}
					bgColor={"gray.900"}
					pos={"fixed"}
					top={0}
				>
					<VStack
						p={10}
						mt={"80px"}
						color={"white"}
						fontSize={"25px"}
						fontWeight={"semibold"}
						w={"full"}
						align={"start"}
						textAlign={"start"}
						spacing={5}
					>
						<Link href="/">
							<Button
								as={Text}
								cursor={"pointer"}
								leftIcon={<BiHome />}
								variant={"ghost"}
								w={"full"}
								color={"white"}
								size={"lg"}
								fontSize={"2xl"}
								_hover={{ bgColor: "none" }}
								_active={{ bgColor: "none" }}
							>
								Home
							</Button>
						</Link>
						{!isAuthed() ? (
							<VStack>
								<Button
									as={Text}
									cursor={"pointer"}
									leftIcon={<BiUser />}
									variant={"ghost"}
									w={"full"}
									color={"white"}
									_hover={{ bgColor: "none" }}
									_active={{ bgColor: "none" }}
									size={"lg"}
									fontSize={"2xl"}
									onClick={() => {
										setOpenMenu(() => !openMenu);
									}}
									rightIcon={
										openMenu == false ? <BiChevronDown /> : <BiChevronUp />
									}
								>
									Sign In
								</Button>
								<Collapse in={openMenu} animateOpacity>
									<Stack
										borderLeft={1}
										borderStyle={"solid"}
										borderColor={"white"}
										ml={10}
										pl={4}
										mt={5}
										fontSize={"2xl"}
										spacing={5}
									>
										<Link
											href="/register"
											_hover={{ textDecor: "none" }}
											_active={{ textDecor: "none" }}
										>
											<Text>Register</Text>
										</Link>
										<Link
											href="/login"
											_hover={{ textDecor: "none" }}
											_active={{ textDecor: "none" }}
										>
											<Text>Login</Text>
										</Link>
									</Stack>
								</Collapse>
							</VStack>
						) : (
							<Link
								href="/admin/account"
								_active={{ textDecoration: "none" }}
								_hover={{ textDecoration: "none" }}
							>
								<Button
									as={Text}
									cursor={"pointer"}
									leftIcon={<BiUser />}
									variant={"ghost"}
									w={"full"}
									color={"white"}
									_hover={{ bgColor: "none" }}
									_active={{ bgColor: "none" }}
									size={"lg"}
									fontSize={"2xl"}
								>
									Account Panel
								</Button>
							</Link>
						)}
						<Link href="/creators">
							<Button
								as={Text}
								cursor={"pointer"}
								leftIcon={<BiArchive />}
								variant={"ghost"}
								w={"full"}
								color={"white"}
								size={"lg"}
								fontSize={"2xl"}
								_hover={{ bgColor: "none" }}
								_active={{ bgColor: "none" }}
							>
								Creators
							</Button>
						</Link>
					</VStack>
				</Flex>
			</Collapse>

			<Flex p={3} pl={20} justify={"flex-start"} w={"full"} zIndex={99}>
				<Link href="/">
					<Text fontSize={"4xl"} fontWeight={"semibold"} color={"white"}>
						AskMe
					</Text>
				</Link>
			</Flex>

			<Flex justify={"flex-end"} mr={10}>
				<HStack>
					<Flex
						display={{ base: "flex", md: "none" }}
						color={"white"}
						fontSize={"6xl"}
					>
						<Hamburger onToggle={onToggle} toggled={isOpen} />
					</Flex>
					{/* <IconButton
						display={{ base: "flex", md: "none" }}
						icon={<BiMenu />}
						fontSize={"6xl"}
						variant={"ghost"}
						color={"white"}
						_hover={{ bgColor: "none" }}
						_active={{ bgColor: "none" }}
						onClick={onToggle}
					/> */}
					<ButtonGroup
						display={{ base: "none", md: "flex" }}
						spacing={10}
						justifyItems={"space-between"}
					>
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
