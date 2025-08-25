import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ParcelStatusLogModal({
  statusLogs,
  currentStatus,
}: {
  statusLogs: any
  currentStatus: any
}) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Badge
            className="cursor-pointer hover:bg-primary hover:text-white transition"
            variant="outline"
          >
            {currentStatus?.toLocaleUpperCase()}
          </Badge>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-4">
              Parcel Status Timeline
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Track the full journey of this parcel from creation to delivery.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {statusLogs?.map((log: any, index: number) => (
              <div
                key={index}
                className="relative border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
              >
                {/* Left timeline dot */}
                {/* <span className="absolute -left-3 top-5 h-3 w-3 rounded-full bg-primary"></span> */}

                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">
                    <span className="font-semibold text-primary">
                      {log.status.toUpperCase()}
                    </span>
                  </p>
                  {log?.note && (
                    <p className="text-sm text-muted-foreground">
                      Note: {log.note}
                    </p>
                  )}
                  {log?.location && (
                    <p className="text-sm text-muted-foreground">
                      Location: {log.location}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
