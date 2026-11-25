-- CreateTable
CREATE TABLE `Users` (
    `UserId` VARCHAR(191) NOT NULL,
    `UserName` VARCHAR(191) NOT NULL,
    `UserEmail` VARCHAR(191) NOT NULL,
    `UserPassword` VARCHAR(191) NULL,
    `UserRole` ENUM('customer', 'Admin') NOT NULL DEFAULT 'customer',

    PRIMARY KEY (`UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `ProductId` VARCHAR(191) NOT NULL,
    `ProductName` VARCHAR(191) NOT NULL,
    `ProductDesc` VARCHAR(191) NOT NULL,
    `ProductQunatati` INTEGER NOT NULL,
    `ProductPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`ProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Catgory` (
    `CatgoyId` VARCHAR(191) NOT NULL,
    `CatgoryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CatgoyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductsCatgory` (
    `ProductCatgoryId` VARCHAR(191) NOT NULL,
    `Product_Id` VARCHAR(191) NOT NULL,
    `Catgory_Id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ProductCatgoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductsCatgory` ADD CONSTRAINT `ProductsCatgory_Product_Id_fkey` FOREIGN KEY (`Product_Id`) REFERENCES `Products`(`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsCatgory` ADD CONSTRAINT `ProductsCatgory_Catgory_Id_fkey` FOREIGN KEY (`Catgory_Id`) REFERENCES `Catgory`(`CatgoyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
