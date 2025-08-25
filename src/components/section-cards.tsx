import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Parcel } from "@/types/index.types"

export function SectionCards(data: { data: Parcel[] }) {
  const totalParcels = data?.data?.length
  const deliveredParcels = data?.data?.filter(
    (prev: any) => prev.currentStatus === "delivered"
  )
  const inTransitParcels = data?.data?.filter(
    (prev: any) => prev.currentStatus === "in_transit"
  )
  const canceledParcels = data?.data?.filter(
    (prev: any) => prev.currentStatus === "canceled"
  )

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Parcels */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Parcels</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalParcels}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Overall growth in parcel volume <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Compared to last month’s shipments
          </div>
        </CardFooter>
      </Card>

      {/* Delivered Parcels */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Delivered</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {deliveredParcels?.length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +8.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Higher on-time deliveries <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Delivery success rate improving steadily
          </div>
        </CardFooter>
      </Card>

      {/* In Transit Parcels */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>In Transit</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {inTransitParcels?.length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -5.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Fewer parcels awaiting delivery{" "}
            <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Transit efficiency has improved
          </div>
        </CardFooter>
      </Card>

      {/* Canceled Parcels */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Cancelled</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {canceledParcels?.length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -2.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Decline in cancellations <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Customer satisfaction is trending up
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
