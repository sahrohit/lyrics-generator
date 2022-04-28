import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
	return (
		<Box textAlign="center" py={10} px={6}>
			<Heading
				display="inline-block"
				as="h2"
				size="2xl"
				bgGradient="linear(to-r, red.400, red.600)"
				backgroundClip="text"
			>
				500
			</Heading>
			<Text fontSize="18px" mt={3} mb={2}>
				Internal Server Error
			</Text>
			<Text color={"gray.500"} mb={6}>
				Let us fix our servers, please try again later.
			</Text>
			<Link href="/" passHref>
				<Button
					colorScheme="red"
					bgGradient="linear(to-r, red.400, red.500, red.600)"
					color="white"
					variant="solid"
				>
					Go to Home
				</Button>
			</Link>
		</Box>
	);
}
