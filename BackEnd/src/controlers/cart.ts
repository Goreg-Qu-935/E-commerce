import { Request, Response } from "express";
import { CartModule } from "../Modules/Cart.js";

export const CartControllers = {

    async CreateCart(req: Request, res: Response) {
        try {

            const UserId = req.user.UserId;

            const Cart = await CartModule.CreateCart(UserId);

            return res.status(201).json({
                message: "Cart created successfully",
                data: Cart
            });

        } catch (error: any) {

            return res.status(400).json({
                message: error.message
            });
        }
    },


    async GetCart(req: Request, res: Response) {
        try {

            const UserId = req.user.UserId;

            const Cart = await CartModule.GetUserCart(UserId);

            if (!Cart) {
                return res.status(404).json({
                    message: "Cart not found"
                });
            }

            let TotalPrice = 0;

            for (const Item of Cart.Items) {

                TotalPrice +=
                    Item.Quantity *
                    Item.Product.ProductPrice;

            }

            return res.status(200).json({
                data: Cart,
                TotalPrice: TotalPrice
            });

        } catch (error: any) {

            return res.status(400).json({
                message: error.message
            });
        }
    },


    async AddToCart(req: Request, res: Response) {
        try {

            const UserId = req.user.UserId;

            const { ProductId, Quantity } = req.body;

            if (!ProductId || !Quantity) {
                return res.status(400).json({
                    message: "ProductId and Quantity are required"
                });
            }

            if (Quantity <= 0) {
                return res.status(400).json({
                    message: "Quantity must be greater than 0"
                });
            }

            const CartItem = await CartModule.AddToCart(
                UserId,
                ProductId,
                Number(Quantity)
            );

            return res.status(201).json({
                message: "Product added to cart",
                data: CartItem
            });

        } catch (error: any) {

            return res.status(400).json({
                message: error.message
            });
        }
    },


    async UpdateCartItem(req: Request, res: Response) {
        try {

            const UserId = req.user.UserId;

            const { ProductId } = req.params;
            const { Quantity } = req.body;

            if (!ProductId || !Quantity) {
                return res.status(400).json({
                    message: "ProductId and Quantity are required"
                });
            }

            if (Quantity <= 0) {
                return res.status(400).json({
                    message: "Quantity must be greater than 0"
                });
            }

            const CartItem = await CartModule.UpdateCartItem(
                UserId,
                ProductId,
                Number(Quantity)
            );

            return res.status(200).json({
                message: "Cart updated successfully",
                data: CartItem
            });

        } catch (error: any) {

            return res.status(400).json({
                message: error.message
            });
        }
    },


    async RemoveFromCart(req: Request, res: Response) {
        try {

            const UserId = req.user.UserId;

            const { ProductId } = req.params;

            if (!ProductId) {
                return res.status(400).json({
                    message: "ProductId is required"
                });
            }

            const CartItem = await CartModule.RemoveFromCart(
                UserId,
                ProductId
            );

            return res.status(200).json({
                message: "Product removed from cart",
                data: CartItem
            });

        } catch (error: any) {

            return res.status(400).json({
                message: error.message
            });
        }
    },


    async ClearCart(req: Request, res: Response) {
        try {

            const UserId = req.user.UserId;

            await CartModule.ClearCart(UserId);

            return res.status(200).json({
                message: "Cart cleared successfully"
            });

        } catch (error: any) {

            return res.status(400).json({
                message: error.message
            });
        }
    },


    async BuyCart(req: Request, res: Response) {
        try {

            const UserId = req.user.UserId;

            const Result = await CartModule.BuyCart(UserId);

            return res.status(200).json(Result);

        } catch (error: any) {

            return res.status(400).json({
                message: error.message
            });
        }
    }
};