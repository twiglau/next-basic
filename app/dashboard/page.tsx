
import EventListComponent from "@/components/EventList";
import { getEvents } from "@/utils/actions";
import Image from "next/image";

const DashboardPage = async () => {

  const events = await getEvents(10, 0);
  return (
    <div>
      <div className="relative w-full h-auto aspect-4/1">
        <Image
          src="/images/banner.png"
          alt="Dashboard"
          fill
          className="object-cover"
        />
        <div className="absolute  text-6xl inset-0 bg-black/40 py-40 text-center text-white font-anton">
          Rocking hard since 1984
        </div>
      </div>
      <EventListComponent events={events}  />
    </div>
  );
};

export default DashboardPage;