import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
export interface AddProduct {
    name?: string;
    categoryid?: string;
    quickspecs?: string;
    description?: string;
    price?: string;
    oldprice?: string;
    instock?: string;
}

export interface NewProduct {
    form: Pick<
        AddProduct,
        | "name"
        | "categoryid"
        | "description"
        | "instock"
        | "price"
        | "quickspecs"
    >;
    photos: File[];
    specs: { name: string; items: { title: string; content: string }[] }[];
}

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
async function addProductRoute(req: NextApiRequest, res: NextApiResponse) {
    if (req.session.user && req.session.user.admin) {
        const result = await parseFormData(req, res);
        const form = JSON.parse(result.fields.form) as NewProduct["form"];
        const specs = JSON.parse(result.fields.specs) as NewProduct["specs"];

        const photos = result.files as {
            fieldname: string;
            originalname: string;
            encoding: string;
            mimetype: string;
            buffer: Buffer;
            size: number;
        };
        console.log(form, specs, photos);
    } else {
        console.log("Permission denied");
    }
}
export default withIronSessionApiRoute(addProductRoute, sessionOptions);
