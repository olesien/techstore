import { product_specs } from "@prisma/client";
import React from "react";
import productStyles from "../styles/Product.module.scss";
import translate from "../lib/translations";

export default function SpecList({ list }: { list: product_specs[] }) {
    // {
    //     category: "namehere",
    //     list: [{id: 1, title: "hi", content: "Lian Li"}]
    // }
    const specs = list.reduce(
        (
            prevCats: { category: string | null; list: product_specs[] }[],
            spec
        ) => {
            const catIndex = prevCats.findIndex(
                (cat) => cat.category === spec.speccategory
            );
            if (catIndex >= 0) {
                //Exists!
                const cat = prevCats[catIndex];
                cat.list.push(spec);
                prevCats.splice(catIndex, 1, cat);
            } else {
                prevCats.push({ category: spec.speccategory, list: [spec] });
            }

            return prevCats;
        },
        []
    );
    const getContent = (content: string) => {
        if (content === "true") {
            return "Ja";
        }
        if (content === "false") {
            return "Nej";
        }
        if (Number(content) > 0) {
            return `${content} st`;
        }
        return content;
    };
    return (
        <div className={productStyles.speclist}>
            {specs.map((category, index) => {
                return (
                    <div key={index}>
                        <h3>
                            {category?.category ?? "Produkt Specifikationer"}
                        </h3>
                        <ul>
                            {category.list.map((spec) => (
                                <li key={spec.id}>
                                    <p>{translate(spec.title)}</p>
                                    <p>
                                        {getContent(spec.content)}
                                        {spec.extrainfo
                                            ? ", " + spec.extrainfo
                                            : ""}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}
