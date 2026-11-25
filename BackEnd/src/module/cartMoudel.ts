import { PrismaClient } from "../generated/prisma/client.js";

const Prisma = new PrismaClient();

export const CartModule = {

    async CreateCart(UserId: string) {
        return await Prisma.cart.create({
            data: {
                UserId: UserId
            }
        });
    },

    async GetUserCart(UserId: string) {
        return await Prisma.cart.findUnique({
            where: {
                UserId: UserId
            },
            include: {
                Items: {
                    include: {
                        Product: true
                    }
                }
            }
        });
    },

    async AddToCart(
        UserId: string,
        ProductId: string,
        Quantity: number
    ) {

        const Product = await Prisma.products.findUnique({
            where: {
                ProductId: ProductId
            }
        });

        if (!Product) {
            throw new Error("Product not found");
        }

        if (Product.ProductQunatati < Quantity) {
            throw new Error("Not enough product in stock");
        }

        let Cart = await Prisma.cart.findUnique({
            where: {
                UserId: UserId
            }
        });

        if (!Cart) {
            Cart = await Prisma.cart.create({
                data: {
                    UserId: UserId
                }
            });
        }

        return await Prisma.cartItem.upsert({
            where: {
                CartId_ProductId: {
                    CartId: Cart.CartId,
                    ProductId: ProductId
                }
            },

            update: {
                Quantity: {
                    increment: Quantity
                }
            },

            create: {
                CartId: Cart.CartId,
                ProductId: ProductId,
                Quantity: Quantity
            }
        });
    },

    async UpdateCartItem(
        UserId: string,
        ProductId: string,
        Quantity: number
    ) {

        const Cart = await Prisma.cart.findUnique({
            where: {
                UserId: UserId
            }
        });

        if (!Cart) {
            throw new Error("Cart not found");
        }

        const Product = await Prisma.products.findUnique({
            where: {
                ProductId: ProductId
            }
        });

        if (!Product) {
            throw new Error("Product not found");
        }

        if (Product.ProductQunatati < Quantity) {
            throw new Error("Not enough product in stock");
        }

        return await Prisma.cartItem.update({
            where: {
                CartId_ProductId: {
                    CartId: Cart.CartId,
                    ProductId: ProductId
                }
            },

            data: {
                Quantity: Quantity
            }
        });
    },

    async RemoveFromCart(
        UserId: string,
        ProductId: string
    ) {

        const Cart = await Prisma.cart.findUnique({
            where: {
                UserId: UserId
            }
        });

        if (!Cart) {
            throw new Error("Cart not found");
        }

        return await Prisma.cartItem.delete({
            where: {
                CartId_ProductId: {
                    CartId: Cart.CartId,
                    ProductId: ProductId
                }
            }
        });
    },

    async ClearCart(UserId: string) {

        const Cart = await Prisma.cart.findUnique({
            where: {
                UserId: UserId
            }
        });

        if (!Cart) {
            throw new Error("Cart not found");
        }

        return await Prisma.cartItem.deleteMany({
            where: {
                CartId: Cart.CartId
            }
        });
    },

    async BuyCart(UserId: string) {

        const Cart = await Prisma.cart.findUnique({
            where: {
                UserId: UserId
            },
            include: {
                Items: {
                    include: {
                        Product: true
                    }
                }
            }
        });

        if (!Cart) {
            throw new Error("Cart not found");
        }

        if (Cart.Items.length === 0) {
            throw new Error("Cart is empty");
        }

        let TotalPrice = 0;

        for (const Item of Cart.Items) {

            if (
                Item.Product.ProductQunatati <
                Item.Quantity
            ) {
                throw new Error(
                    `${Item.Product.ProductName} does not have enough stock`
                );
            }

            TotalPrice +=
                Item.Quantity *
                Item.Product.ProductPrice;
        }

        for (const Item of Cart.Items) {

            await Prisma.products.update({
                where: {
                    ProductId: Item.ProductId
                },

                data: {
                    ProductQunatati: {
                        decrement: Item.Quantity
                    }
                }
            });
        }

        await Prisma.cartItem.deleteMany({
            where: {
                CartId: Cart.CartId
            }
        });

        return {
            message: "Purchase successful",
            TotalPrice: TotalPrice
        };
    }
};