import { Box, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function SliderWithValue({
    filter,
    filterData,
    type,
    handleCommit,
}: {
    filter: {
        id: number;
        title: string;
        value: string;
    };
    filterData: {
        value: string[] | number[] | string;
        list: {
            content: string | number;
            id: number;
        }[];
    };

    type: string;
    handleCommit: (index: string, values: number[]) => void;
}) {
    const [values, setValues] = useState<number[]>([]);
    const handleChangeChange = (event: any) => {
        setValues(event.target.value);
    };

    //Update
    useEffect(() => {
        console.log(filterData);
        if (filterData.value && typeof filterData.value !== "string") {
            console.log(filterData.value);
            setValues(filterData.value.map((value) => Number(value)));
            //setValues(JSON.parse(filterData.value) as number[]);
        } else {
            const pureValues = filterData.list.map((item) =>
                Number(item.content)
            );
            setValues([Math.min(...pureValues), Math.max(...pureValues)]);
            console.log([Math.min(...pureValues), Math.max(...pureValues)]);
        }
    }, [filterData]);

    console.log(values);

    function valuetext(value: number) {
        return `${value} type`;
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
                    handleCommit(filter.value, values);
                }}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                marks={filterData.list.map((item) => ({
                    value: Number(item.content),
                    label: `${item.content} ${type}`,
                }))}
                min={Math.min(...pureValues)}
                max={Math.max(...pureValues)}
                step={Math.floor(
                    (Math.max(...pureValues) - Math.min(...pureValues)) / 10
                )}
            />
        </Box>
    );
}
