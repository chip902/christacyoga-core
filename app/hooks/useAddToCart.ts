// hooks/useAddToCart.ts
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toaster } from "@/src/components/ui/toaster";

export const useAddToCart = (productId: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const queryClient = useQueryClient();
	const router = useRouter();

	const addToCart = async () => {
		setIsLoading(true);

		try {
			toaster.promise(axios.post("/api/cart", { productId }), {
				loading: { title: "Adding class to cart..." },
				success: (response) => ({
					title: "Success",
					description: response.data.message || "Class added to your cart.",
					type: "success",
					duration: 3000,
				}),
				error: (error) => ({
					title: "Error",
					description: `Failed to add class to cart. ${String(error.message)}`,
					type: "error",
					duration: 5000,
				}),
			});

			// Invalidate or update your query cache if needed
			await queryClient.invalidateQueries({ queryKey: ["cart"] });
			router.push("/booking/checkout");
		} catch (error) {
			console.error("Failed to add class to cart:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return { addToCart, isLoading };
};
