import { Badge } from '@/components/ui/badge'
import type { Parcel } from '@/types/index.types'
import { useGetMyParcelsQuery } from '@/redux/features/parcel/parcel.api'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import AddParcelModal from './AddParcelModal'


export default function SenderParcel() {

    const { data: parcels } = useGetMyParcelsQuery(undefined)
    console.log("parcels", parcels?.data)
    return (
        <div className='p-5'>
            <div className='mb-3'>
                <AddParcelModal/>
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
                            {/* <TableHead>Updated At</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            parcels?.data?.map((parcel: Parcel, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="">{parcel.trackingId}</TableCell>
                                    <TableCell>{parcel.type}</TableCell>
                                    <TableCell>{parcel?.weight}Kg</TableCell>
                                    <TableCell>${parcel.fee}</TableCell>
                                    {/* <TableCell>{parcel.sender}</TableCell> */}
                                    {/* <TableCell>{parcel.receiver}</TableCell> */}
                                    <TableCell>{parcel.fromAddress}</TableCell>
                                    <TableCell>{parcel.toAddress}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{parcel.statusLogs[0]?.status?.toLocaleUpperCase()}</Badge>
                                    </TableCell>
                                    {/* <TableCell>{parcel.deliveryDate}</TableCell> */}
                                    <TableCell>{parcel.createdAt}</TableCell>
                                    {/* <TableCell>2025-08-22</TableCell> */}
                                </TableRow>
                            ))
                        }


                    </TableBody>
                </Table>

            </div>
        </div>
    )
}
