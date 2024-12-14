import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

type ConfirmationDialogProps = {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    onClose: () => void;
};

const AppConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
                                                                   open,
                                                                   title,
                                                                   message,
                                                                   onConfirm,
                                                                   onCancel,
                                                                   onClose,
                                                               }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="secondary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AppConfirmationDialog;
