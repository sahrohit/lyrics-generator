import axios from "axios";
import { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Box,
	useColorMode,
	IconButton,
	Heading,
	Flex,
	Text,
	InputGroup,
	Icon,
	InputRightElement,
	Tooltip,
	Stack,
	useToast,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	SliderMark,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaGithub, FaRandom } from "react-icons/fa";
import randomQuestion from "../components/helpers/RandomQuestion";
import OpenGraphHead from "../components/shared/OpenGraphHead";
import { motion, AnimatePresence } from "framer-motion";
import FloatingIcon from "../components/FloatingIcon";
import { FaArchive } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { useRouter } from "next/router";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { AiFillApi } from "react-icons/ai";
import { MdGraphicEq } from "react-icons/md";

const Home = () => {
	const inputRef = useRef();
	const router = useRouter();
	const toast = useToast();

	const { colorMode, toggleColorMode } = useColorMode();
	const [response, setResponse] = useState();
	const [loading, setLoading] = useState(false);

	const [sliderValue, setSliderValue] = useState(400);
	const [showTooltip, setShowTooltip] = useState(false);

	const [messageAcknowledged, setMessageAcknowledged] = useState(false);

	const MotionBox = motion(Box);

	const handleSubmit = async () => {
		setLoading(true);
		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lyrics`, {
				initiator: inputRef.current.value,
				characters: sliderValue,
			})
			.then(function (response) {
				setResponse(response.data.generated_lyrics);
				setLoading(false);
				toast.closeAll();
			})
			.catch(function (error) {
				setResponse(error);
				setLoading(false);
			});
	};

	const validateMessage = (value) => {
		let error;
		if (!value) {
			error = "Initiator is required";
		} else if (value.length <= 15) {
			error = "Be Creative, Add more words!";
		} else if (value.length > 60) {
			error = "Don't be greedy, keep it under 60 characters";
		}
		return error;
	};

	return (
		<>
			<OpenGraphHead />

			<Flex
				height="100vh"
				justifyContent="center"
				direction="column"
				textAlign="center"
				alignItems="center"
			>
				<Flex
					height="40%"
					as="main"
					justifyContent="space-around"
					direction="row"
					textAlign="center"
					alignItems="center"
					width="80%"
					flexWrap={{ base: "wrap", lg: "nowrap" }}
				>
					<Box w={{ base: "full", lg: 1 / 3 }}>
						<Box>
							<Heading as="h1" size="2xl">
								Lyrics Generator
							</Heading>
							<Text fontSize="xl">Get started by typing in the box below</Text>
						</Box>

						<Box my={50}>
							<Formik
								initialValues={{
									message: "",
									characters: 200,
								}}
								onSubmit={(_values, actions) => {
									if (!messageAcknowledged) {
										toast({
											title: "It might take a while.",
											position: "top",
											variant: "subtle",
											description: "We're spinning servers just for you.",
											status: "info",
											duration: 9000,
											isClosable: true,
										});
										setMessageAcknowledged(true);
									}

									handleSubmit();
									setTimeout(() => {
										actions.setSubmitting(false);
									}, 500);
								}}
							>
								{(props) => (
									<Form>
										<Stack direction={"column"} spacing={6}>
											<Field name="message" validate={validateMessage}>
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors.message && form.touched.message
														}
													>
														<FormLabel id="field-message-label" htmlFor="text">
															Initiators
														</FormLabel>
														<InputGroup>
															<Input
																{...field}
																id="text"
																placeholder="Type your inner feelings."
																ref={inputRef}
																width={{ base: "100%", lg: 400, xl: 400 }}
															/>
															<InputRightElement width="4.5rem">
																<Tooltip
																	offset={[10, 10]}
																	label="Try Random Initiators"
																	placement="top"
																	openDelay={1000}
																>
																	<IconButton
																		h="1.75rem"
																		size="sm"
																		icon={<Icon as={FaRandom} />}
																		onClick={() => {
																			props.setFieldValue(
																				"message",
																				randomQuestion(),
																				true
																			);
																		}}
																	/>
																</Tooltip>
															</InputRightElement>
														</InputGroup>
														<FormErrorMessage>
															{form.errors.message}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>

											<Field name="characters" validate={validateMessage}>
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors.characters && form.touched.characters
														}
													>
														<FormLabel id="field-message-label" htmlFor="text">
															Number of Characters
														</FormLabel>
														<InputGroup>
															<Slider
																aria-label="slider-ex-1"
																value={sliderValue}
																min={100}
																max={1000}
																onChange={(val) => {
																	setSliderValue(val);
																}}
																onMouseEnter={() => setShowTooltip(true)}
																onMouseLeave={() => setShowTooltip(false)}
															>
																<SliderMark
																	value={100}
																	mt="1"
																	ml="-2.5"
																	fontSize="sm"
																>
																	100
																</SliderMark>
																<SliderMark
																	value={500}
																	mt="1"
																	ml="-2.5"
																	fontSize="sm"
																>
																	500
																</SliderMark>
																<SliderMark
																	value={1000}
																	mt="1"
																	ml="-2.5"
																	fontSize="sm"
																>
																	1000
																</SliderMark>
																<SliderTrack>
																	<SliderFilledTrack />
																</SliderTrack>
																<Tooltip
																	hasArrow
																	bg="teal.500"
																	color="white"
																	placement="top"
																	isOpen={showTooltip}
																	label={`${sliderValue}`}
																>
																	<SliderThumb boxSize={6}>
																		<Box color="blue" as={MdGraphicEq} />
																	</SliderThumb>
																</Tooltip>
															</Slider>
															{/* <Input
														{...field}
														id="text"
														placeholder="Characters"
														ref={inputRef}
														width={{ base: "100%", lg: 400, xl: 400 }}
													/> */}
														</InputGroup>
														<FormErrorMessage>
															{form.errors.message}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Button
												colorScheme="teal"
												isLoading={props.isSubmitting || loading}
												disabled={props.isSubmitting}
												type="submit"
											>
												Generate Lyrics
											</Button>
										</Stack>
									</Form>
								)}
							</Formik>
						</Box>
					</Box>

					<Box mx={10} w={{ base: "full", lg: 2 / 3 }}>
						<Text
							fontSize="xl"
							textOverflow="wrap"
							style={{ opacity: response ? 100 : 0 }}
							dangerouslySetInnerHTML={{
								__html: response?.replaceAll("\n", "<br />"),
							}}
						/>
					</Box>
				</Flex>
			</Flex>
			<AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
				<MotionBox
					position="fixed"
					top={{ base: 10, lg: 5, xl: 20 }}
					right={{ base: 10, lg: 5, xl: 20 }}
					drag
					dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
					dragElastic={0.2}
					dragTransition={{ bounceStiffness: 1000, bounceDamping: 10 }}
					onDrag={(_event, info) => {
						console.log(info.point.x, info.point.y);
						if (info.point.y > 300) {
							toggleColorMode();
						}
					}}
				>
					<Tooltip label="Drag me down" closeOnClick={false} placement="top">
						<IconButton
							variant="nooutline"
							colorScheme="teal"
							aria-label="Toggle Light Mode"
							icon={colorMode == "light" ? <MoonIcon /> : <SunIcon />}
						/>
					</Tooltip>
				</MotionBox>
			</AnimatePresence>
			<AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
				<Stack
					direction="row"
					position="fixed"
					top={{ base: 10, lg: 5, xl: 20 }}
					left={{ base: 10, lg: 5, xl: 20 }}
				>
					<MotionBox
						drag
						dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
						dragElastic={0.2}
						dragTransition={{ bounceStiffness: 1000, bounceDamping: 10 }}
					>
						<Tooltip label="Archive" closeOnClick={false} placement="top">
							<IconButton
								fontSize="2xl"
								variant="nooutline"
								colorScheme="teal"
								aria-label="Toggle Light Mode"
								icon={<FaArchive />}
								onClick={() => {
									router.push("/logs");
								}}
							/>
						</Tooltip>
					</MotionBox>
				</Stack>
			</AnimatePresence>
			<FloatingIcon
				icon={<FaGithub />}
				position="fixed"
				bottom={{ base: 5, lg: 5, xl: 10 }}
				right={{ base: 5, lg: 5, xl: 10 }}
			/>
		</>
	);
};

export default Home;
