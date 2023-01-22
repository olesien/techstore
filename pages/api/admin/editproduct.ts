import { product_images } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fs from "fs";
import prisma from "../../../lib/prisma";
import { AddProductForm, NewProduct } from "./addproduct";

//Solution credit: https://stackoverflow.com/questions/69478495/how-to-send-file-in-form-data-in-next-js
//^^ above solution didn't even have upvotes :(
async function parseFormData(
    req: NextApiRequest & { files?: any },
    res: NextApiResponse
) {
    const storage = multer.memoryStorage();
    const multerUpload = multer({ storage });
    const multerFiles = multerUpload.any();
    await new Promise((resolve, reject) => {
        multerFiles(req as any, res as any, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
    return {
        fields: req.body,
        files: req.files,
    };
}
// IMPORTANT: Prevents next from trying to parse the form
export const config = {
    api: {
        bodyParser: false,
    },
};

const upload = multer({
    dest: "/public/test",
});

async function editProductRoute(req: NextApiRequest, res: NextApiResponse) {
    if (req.session.user && req.session.user.admin) {
        const result = await parseFormData(req, res);
        const form = JSON.parse(result.fields.form) as NewProduct["form"] & {
            id: number;
        };
        const specs = JSON.parse(result.fields.specs) as NewProduct["specs"];
        const incompats = JSON.parse(
            result.fields.incompats
        ) as NewProduct["incompat"];

        const existingPhotos = JSON.parse(
            result.fields.images
        ) as product_images[];

        const photos = result.files as {
            fieldname: string;
            originalname: string;
            encoding: string;
            mimetype: string;
            buffer: Buffer;
            size: number;
        }[];
        console.log(form, specs, photos);

        const time = Date.now();

        // name?: string;
        // categoryid?: string;
        // quickspecs?: string;
        // description?: string;
        // price?: string;
        // oldprice?: string;
        // instock?: string;

        if (!("name" in form) || !form.name || form.name.length < 2) {
            return res
                .status(400)
                .json({ message: "Namnet är odefinerat eller för kort" });
        }

        if (
            !("categoryid" in form) ||
            !form.categoryid ||
            !(await prisma.categories.findFirst({
                where: { id: Number(form.categoryid) },
            }))
        ) {
            return res
                .status(400)
                .json({ message: "Kategorin är odefinerad eller finns ej" });
        }

        if (
            !("quickspecs" in form) ||
            !form.quickspecs ||
            form.quickspecs.length < 2
        ) {
            return res
                .status(400)
                .json({ message: "Quickspecs är odefinerat eller för kort" });
        }

        if (
            !("description" in form) ||
            !form.description ||
            form.description.length < 20
        ) {
            return res.status(400).json({
                message:
                    "Beskrivning är odefinerat eller för kort (minst 20 längd)",
            });
        }

        if (
            !("price" in form) ||
            !form.price ||
            form.price.length < 2 ||
            form.price.length > 100000
        ) {
            return res.status(400).json({
                message:
                    "Pris är odefinerat eller för långt (max hundra tusen)",
            });
        }

        if (
            "oldprice" in form &&
            (!form.oldprice ||
                form.oldprice.length < 2 ||
                form.oldprice.length > 100000)
        ) {
            return res.status(400).json({
                message: "Gammalt Pris är fel (är det över hundra tusen?)",
            });
        }

        if (
            !("instock" in form) ||
            !form.instock ||
            form.instock.length < 0 ||
            form.instock.length > 1000
        ) {
            return res.status(400).json({
                message: "Lagersaldo är odefinerat eller för stort (max 1000)",
            });
        }
        const data = {
            ...form,
            categoryid: Number(form.categoryid),
            price: Number(form.price),
            instock: Number(form.instock),
            id: Number(form.id),
        } as AddProductForm & { id: number };

        if ("oldprice" in data) {
            data.oldprice = Number(data.oldprice);
        }
        try {
            //Create product
            const newProduct = await prisma.products.update({
                where: {
                    id: data.id,
                },
                data,
            });

            //Figure out if any pictures were removed, and if so delete them.
            const photosInDb = await prisma.product_images.findMany({
                where: { productid: data.id },
            });

            //Delete if needed

            for (let i = 0; i < photosInDb.length; i++) {
                const dbPhoto = photosInDb[i];
                //If they are in photosInDb but NOT in the existingPhotos, they should be removed
                const existingPhoto = existingPhotos.find(
                    (photo) => Number(photo.id) === dbPhoto.id
                );
                if (!existingPhoto) {
                    //Remove
                    await prisma.product_images.delete({
                        where: {
                            id: dbPhoto.id,
                        },
                    });
                }
            }

            //Upload files and create references
            for (let i = 0; i < photos.length; i++) {
                const photo = photos[i];
                //Set max length to 30
                let splitName = photo.originalname.split(".");
                let name =
                    splitName[0].substring(0, 30) +
                    "." +
                    splitName[splitName.length - 1];
                console.log(name);

                fs.writeFileSync(
                    "./public/images/categories/" +
                        data.categoryid +
                        "/" +
                        time +
                        "-" +
                        name,
                    photo.buffer
                );
                //Create product_images references
                await prisma.product_images.create({
                    data: {
                        name: name,
                        productid: newProduct.id,
                        image: time + "-" + name,
                    },
                });
            }

            //Delete all older specs
            const deletedSpecs = await prisma.product_specs.deleteMany({
                where: { productid: data.id },
            });

            //Create new specs
            for (let i = 0; i < specs.length; i++) {
                const spec = specs[i];
                await prisma.product_specs.createMany({
                    data: spec.items.map((field) => {
                        const splitBySpace = field.content.split(" ");
                        let content = field.content;
                        let extrainfo = null;
                        if (splitBySpace.length > 0) {
                            const nameWithoutComma = splitBySpace[0].replace(
                                /,/g,
                                ""
                            );
                            content = nameWithoutComma;
                            if (splitBySpace.length > 1) {
                                extrainfo = splitBySpace[1].replace(
                                    /[()\s]/g,
                                    ""
                                );
                            }
                        }

                        if (
                            content.toLowerCase() === "sant" ||
                            content.toLowerCase() === "ja"
                        ) {
                            content = "true";
                        } else if (
                            content.toLowerCase() === "falskt" ||
                            content.toLowerCase() === "nej"
                        ) {
                            content = "false";
                        }

                        let extra: { extrainfo?: string } = {};
                        if (extrainfo) {
                            //add extra
                            extra.extrainfo = extrainfo;
                        }

                        return {
                            ...field,
                            content,
                            speccategory: spec.name,
                            productid: newProduct.id,
                            ...extra,
                        };
                    }),
                });
            }

            //Delete all older compats
            const deletedCompats = await prisma.product_compat.deleteMany({
                where: { productid1: data.id },
            });

            //Add (in)compats
            for (let i = 0; i < incompats.length; i++) {
                const incompat = incompats[i];
                //Get product id
                const product = await prisma.products.findFirst({
                    where: {
                        name: {
                            search: incompat.product,
                        },
                    },
                });

                if (product) {
                    await prisma.product_compat.create({
                        data: {
                            productid1: newProduct.id,
                            productid2: product.id,
                            error: incompat.error,
                            message: incompat.message,
                        },
                    });
                }
            }

            return res.status(200).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    } else {
        console.log("Tillåtelse nekades.");
    }
}
export default withIronSessionApiRoute(editProductRoute, sessionOptions);
