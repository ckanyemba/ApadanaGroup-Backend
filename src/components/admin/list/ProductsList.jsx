import styled from "styled-components";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

export default function ProductsList() {
    const { items } = useSelector((state) => state.products);

    const rows =
        items &&
        items.map((item) => {
            return {
                id: item._id,
                imageUrl: item.image.url,
                pName: item.name,
                pDesc: item.desc,
                price: item.price.toLocaleString(),
            };
        });

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 220,
        },
        {
            field: "imageUrl",
            headerName: "Image",
            width: 80,
            renderCell: (params) => {
                return (
                    <ImageContainer>
                        <img src={params.row.imageUrl} alt="" />
                    </ImageContainer>
                );
            },
        },
        {
            field: "pName",
            headerName: "Name",
            width: 130,
        },
        {
            field: "pDesc",
            headerName: "Description",
            width: 130,
        },
        {
            field: "price",
            headerName: "Price",
            width: 80,
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 170,
            renderCell: (params) => {
                return(
                    <Actions>
                        <Delete>Delete</Delete>
                        <View>View</View>
                    </Actions>
                );
            },
        },

    ];

    return
    (
        <div style={{ height: 400, width: "100%"}}></div>
    )

}