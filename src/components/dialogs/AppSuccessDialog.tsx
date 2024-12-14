import { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import the check circle icon

type SuccessDialogProps = {
    open: boolean;
    message: string;
    onClose: () => void;
};

export default function SuccessDialog({ open, message, onClose }: SuccessDialogProps) {
    useEffect(() => {
        if (open) {
            // Auto-dismiss the dialog after 7 seconds if not closed
            const timer = setTimeout(onClose, 7000);
            return () => clearTimeout(timer); // Clean up timer on unmount
        }
    }, [open, onClose]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
                {/* Add the green check icon and style it */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <CheckCircleIcon style={{ color: "green", fontSize: "40px" }} />
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
