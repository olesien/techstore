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
        if (filterData.value && typeof filterData.value !== "string") {
            setValues(filterData.value.map((value) => Number(value)));
        } else {
            const pureValues = filterData.list.map((item) =>
                Number(item.content)
            );
            setValues([Math.min(...pureValues), Math.max(...pureValues)]);
        }
    }, [filterData]);

    function valuetext(value: number) {
        return `${value} type`;
    }
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
