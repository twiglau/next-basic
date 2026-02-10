import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import BackableDialog from "../backable-dialog";
import CreateEventForm from "@/app/dashboard/event/page";

export default function EventPage() {
    return (
        <BackableDialog>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle>创建活动</DialogTitle>
                <CreateEventForm />
            </DialogContent>
        </BackableDialog>
    );
}