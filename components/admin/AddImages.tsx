import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import React from "react";
import adminStyles from "../../styles/Admin.module.scss";

export default function AddImages({
    selectFiles,
    photosLength,
}: {
    selectFiles: (event: React.ChangeEvent<HTMLInputElement>) => void;
    photosLength: number;
}) {
    return (
        <div className={adminStyles.formSection}>
            <Button variant="contained" component="label" size="large">
                <FontAwesomeIcon icon={faUpload} />
                Ladda {photosLength > 0 ? "upp fler" : "upp"} bilder
                <input
                    onChange={selectFiles}
                    type="file"
                    hidden
                    multiple={true}
                />
            </Button>
        </div>
    );
}
