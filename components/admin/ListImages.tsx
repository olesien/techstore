import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { NewProduct } from "../../pages/api/admin/addproduct";
import { product_images } from "@prisma/client";

export default function ListImages({
    photos,
    setPhotos,
    setExistingPhotos,
    categoryid,
}: {
    photos: NewProduct["photos"] | product_images[];
    setPhotos?: React.Dispatch<React.SetStateAction<File[]>>;
    setExistingPhotos?: React.Dispatch<React.SetStateAction<product_images[]>>;
    categoryid?: number;
}) {
    return (
        <div>
            <List>
                {photos.map((photo, index) => (
                    <ListItem
                        key={index}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                    if ("size" in photo && setPhotos) {
                                        setPhotos((currentPhotos) =>
                                            currentPhotos.filter(
                                                (current) =>
                                                    current.name !== photo.name
                                            )
                                        );
                                    } else if (
                                        !("size" in photo) &&
                                        setExistingPhotos
                                    ) {
                                        setExistingPhotos((currentPhotos) =>
                                            currentPhotos.filter(
                                                (current) =>
                                                    current.id !== photo.id
                                            )
                                        );
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <img
                                    src={
                                        "size" in photo
                                            ? URL.createObjectURL(photo)
                                            : `/images/categories/${
                                                  categoryid ?? 1
                                              }/${photo.image}`
                                    }
                                    alt="X"
                                />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${photo.name}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
