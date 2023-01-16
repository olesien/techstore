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

export default function ListImages({
    photos,
    setPhotos,
}: {
    photos: NewProduct["photos"];
    setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
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
                                    setPhotos((currentPhotos) =>
                                        currentPhotos.filter(
                                            (current) =>
                                                current.name !== photo.name
                                        )
                                    );
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <img src={URL.createObjectURL(photo)} alt="X" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${photo.name} (${photo.size})`}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
