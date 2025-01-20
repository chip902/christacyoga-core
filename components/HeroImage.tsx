import { Center, type CenterProps } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

export const HeroImage = (props: CenterProps) => (
	<Center w="full" h="full" bg="bg.muted" color="fg.subtle" {...props}>
		<Image height="100vh" src="/hero.jpeg" />
	</Center>
);
