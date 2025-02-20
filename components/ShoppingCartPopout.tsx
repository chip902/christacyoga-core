"use client";
import { Stack, Box, Text, Button, Badge, IconButton, Spinner, Center, useDisclosure } from "@chakra-ui/react";
import useCart from "@/app/(my-app)/hooks/useCart";
import { MdShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import { CartItem } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import NextLink from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";

type LoadingState = {
	[key: string]: boolean;
};

const ShoppingCartPopout = () => {
	const { cartItems, addItemToCart, decreaseQuantity, isLoading } = useCart();
	const [cartItemsCount, setCartItemsCount] = useState(0);
	const [loadingStates, setLoadingStates] = useState<LoadingState>({});
	const { onOpen, onClose, isOpen } = useDisclosure();
	const queryClient = new QueryClient();

	useEffect(() => {
		if (cartItems) {
			const initialState = cartItems.reduce((acc: object, item: { id: string }) => ({ ...acc, [item.id]: false }), {});
			setLoadingStates(initialState);
			const totalQuantity = cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);
			setCartItemsCount(totalQuantity);
		}
		queryClient.invalidateQueries({ queryKey: ["cart"] });
	}, [cartItems, queryClient]);

	return (
		<Box position="relative">
			<Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
				<PopoverTrigger>
					<IconButton aria-label="Shopping cart" icon={<MdShoppingCart />} />
				</PopoverTrigger>
				{cartItemsCount > 0 && (
					<Badge colorScheme="red" borderRadius="2rem" position="absolute" zIndex={10} top="-5px" right="-15px">
						{cartItemsCount}
					</Badge>
				)}
				<PopoverContent>
					<Stack gap={4}>
						{cartItems && cartItemsCount > 0 ? (
							cartItems.map((item: CartItem) => (
								<Box key={item.id} display="flex" alignItems="center" padding={5}>
									<Stack gap={1}>
										<Text fontWeight="bold">{item.product.name}</Text>
										<Text>{`$${item.product.price} x ${item.quantity}`}</Text>
										<Box display="flex" alignItems="center">
											{loadingStates[item.id] ? (
												<Spinner />
											) : (
												<>
													<Button disabled={isLoading} size="sm" onClick={() => decreaseQuantity(item)} mr={2}>
														-
													</Button>
													<Text>{`Quantity: ${item.quantity}`}</Text>
												</>
											)}
											<Button disabled={isLoading} size="sm" onClick={() => addItemToCart(item)} ml={2}>
												+
											</Button>
										</Box>
									</Stack>
								</Box>
							))
						) : (
							<Box display="flex" alignItems="center" padding={5}>
								<Text fontWeight="bold">Your Cart is Empty!</Text>
							</Box>
						)}
						<Center display="flex" padding={5}>
							<NextLink href="/booking/checkout" passHref legacyBehavior>
								<Button onClick={onClose} disabled={isLoading} variant="plain">
									Checkout
								</Button>
							</NextLink>
						</Center>
					</Stack>
				</PopoverContent>
			</Popover>
		</Box>
	);
};

export default ShoppingCartPopout;
