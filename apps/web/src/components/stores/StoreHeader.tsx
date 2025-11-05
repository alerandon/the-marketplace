import { MapPin, Phone, Calendar } from "lucide-react";
import { Store } from "@/lib/types";
import dayjs from "dayjs";
import "dayjs/locale/es";

interface StoreHeaderProps {
  store: Store;
}

const StoreHeader = ({ store }: StoreHeaderProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <h1 className="text-3xl font-bold mb-4">{store.name}</h1>

      <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">{store.address}</p>
            <p className="text-sm">{store.city}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="font-medium text-foreground">{store.phone}</p>
        </div>

        <div className="flex items-center gap-3 md:col-span-2">
          <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-sm">
            Registrada el {dayjs(store.createdAt).locale("es").format("D [de] MMMM, YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
