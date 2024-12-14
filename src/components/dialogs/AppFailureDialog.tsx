import { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error"; // Import the error icon

type FailureDialogProps = {
    open: boolean;
    message: string;
    onClose: () => void;
};

export default function FailureDialog({ open, message, onClose }: FailureDialogProps) {
    useEffect(() => {
        if (open) {
            // Auto-dismiss the dialog after 5 seconds if not closed
            const timer = setTimeout(onClose, 7000);
            return () => clearTimeout(timer); // Clean up timer on unmount
        }
    }, [open, onClose]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                {/* Add the red error icon and style it */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <ErrorIcon style={{ color: "red", fontSize: "40px" }} />
                    <span>{message}</span>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    );
}
