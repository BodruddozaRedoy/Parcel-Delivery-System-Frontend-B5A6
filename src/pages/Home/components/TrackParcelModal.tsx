import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useTrackParcelQuery } from '@/redux/features/parcel/parcel.api'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Search } from "lucide-react"

export default function TrackParcelModal() {
  const [trackingId, setTrackingId] = useState("")
  const [submittedId, setSubmittedId] = useState("")
  const { data: parcel, isFetching } = useTrackParcelQuery(submittedId, {
    skip: !submittedId, // don’t query until user submits
  })

  console.log(parcel)

  const handleTrack = () => {
    if (!trackingId.trim()) return
    setSubmittedId(trackingId.trim())
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 hover:shadow-md transition"
          >
            Track Package
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Track Your Parcel
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Enter your tracking ID below to see the current status and history of your parcel.
            </DialogDescription>
          </DialogHeader>

          {/* Tracking Input Section */}
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Enter tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTrack} disabled={isFetching}>
              <Search className="h-4 w-4 mr-2" />
              {isFetching ? "Searching..." : "Track"}
            </Button>
          </div>

          {/* Timeline Section */}
          <div className="space-y-4 mt-6">
            {isFetching && (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={`skel-${i}`} className="relative border rounded-xl p-4 bg-white">
                  <span className="absolute -left-3 top-5 h-3 w-3 rounded-full bg-muted" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-64" />
                    <Skeleton className="h-3 w-52" />
                  </div>
                </div>
              ))
            )}

            {!isFetching && parcel?.data?.statusLogs?.length ? (
              parcel.data.statusLogs.map((log: { status: string; note?: string; location?: string; timestamp?: string | number | Date }, index: number) => (
                <div
                  key={index}
                  className="relative border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
                >
                  <span className="absolute -left-3 top-5 h-3 w-3 rounded-full bg-primary"></span>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">
                      <span className="font-semibold text-primary">
                        {log.status.toUpperCase()}
                      </span>
                    </p>
                    {log?.note && (
                      <p className="text-sm text-muted-foreground">Note: {log.note}</p>
                    )}
                    {log?.location && (
                      <p className="text-sm text-muted-foreground">Location: {log.location}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              submittedId && !isFetching && (
                <p className="text-sm text-muted-foreground mt-4">
                  No logs found for this tracking ID.
                </p>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
