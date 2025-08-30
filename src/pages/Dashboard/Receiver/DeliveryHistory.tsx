import { Badge } from '@/components/ui/badge'
import type { Parcel } from '@/types/index.types'
import { useGetIncomingParcelsQuery } from '@/redux/features/parcel/parcel.api'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



export default function DeliveryHistory() {

    const { data: parcels, isLoading } = useGetIncomingParcelsQuery(undefined)
    console.log("parcels", parcels?.data)

    const updatedParcels = parcels?.data?.filter((prev: Parcel) => prev.currentStatus === "delivered")



    return (
        <div className='p-5'>
            <div className='mb-3'>
                {/* <AddParcelModal /> */}
            </div>
            <div className='border rounded-lg overflow-hidden p-5'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tracking ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Weight</TableHead>
                            <TableHead>Fee</TableHead>
                            {/* <TableHead>Sender</TableHead> */}
                            {/* <TableHead>Receiver</TableHead> */}
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Status</TableHead>
                            {/* <TableHead>Delivery Date</TableHead> */}
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && (
                            Array.from({ length: 8 }).map((_, r) => (
                                <TableRow key={`hist-skel-${r}`}>
                                    {Array.from({ length: 8 }).map((_, c) => (
                                        <TableCell key={`hist-skel-${r}-${c}`}>
                                            <Skeleton className="h-4 w-24" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                        {!isLoading && updatedParcels?.map((parcel: Parcel, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="">{parcel.trackingId}</TableCell>
                                <TableCell>{parcel.type}</TableCell>
                                <TableCell>{parcel?.weight}Kg</TableCell>
                                <TableCell>${parcel.fee}</TableCell>
                                <TableCell>{parcel.fromAddress}</TableCell>
                                <TableCell>{parcel.toAddress}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{parcel?.currentStatus?.toLocaleUpperCase()}</Badge>
                                </TableCell>
                                <TableCell>{parcel.createdAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}
