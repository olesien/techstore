import { Box, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function SliderWithValue({
    filter,
    filterData,
    handleCommit,
}: {
    filter: {
        id: number;
        title: string;
        value: string;
        type: string;
    };
    filterData: {
        value: string;
        list: {
            content: string;
            id: number;
        }[];
    };
    handleCommit: (index: string, value: string[]) => void;
}) {
    const [values, setValues] = useState<number[]>([]);
    const handleChangeChange = (event: any) => {
        setValues(event.target.value);
    };

    //Update
    useEffect(() => {
        console.log(filterData);
        if (filterData.value && filterData.value !== "unselected") {
            // setValues(JSON.parse(filterData.value) as number[]);
        } else {
            const pureValues = filterData.list.map((item) =>
                Number(item.content)
            );
            setValues([Math.min(...pureValues), Math.max(...pureValues)]);
            console.log([Math.min(...pureValues), Math.max(...pureValues)]);
        }
        console.log(filterData.value);
    }, [filterData]);

    console.log(values);

    function valuetext(value: number) {
        return `${value} st`;
    }

    //JSON.parse(filterData.value) as number[]
    const pureValues = filterData.list.map((item) => Number(item.content));

    return (
        <Box sx={{ width: 300, padding: 1 }}>
            <p>{filter.title}</p>
            <Slider
                getAriaLabel={() => filter.title}
                value={values}
                onChange={handleChangeChange}
                onChangeCommitted={() => {
                    handleCommit(
                        filter.value,
                        values.map((value) => String(value))
                    );
                }}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                // step={1}
                // min={data.filters.price.min}
                // max={data.filters.price.max}
                marks={filterData.list.map((item) => ({
                    value: Number(item.content),
                    label: `${item.content} st`,
                }))}
                min={Math.min(...pureValues)}
                max={Math.max(...pureValues)}
                step={Math.floor(
                    (Math.max(...pureValues) - Math.min(...pureValues)) / 10
                )}
                // marks={[
                //     {
                //         value: data.filters.price.min,
                //         label: data.filters.price.min + " kr",
                //     },

                //     {
                //         value: data.filters.price.max,
                //         label: data.filters.price.max + " kr",
                //     },
                // ]}
            />
        </Box>
    );
}
