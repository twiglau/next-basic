import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import BackableDialog from "../backable-dialog";
import CreateVenueForm from "@/app/dashboard/venue/page";

export default function VenuePage() {
    return (
        <BackableDialog>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle>创建场地</DialogTitle>
                <CreateVenueForm />
            </DialogContent>
        </BackableDialog>
    );
}