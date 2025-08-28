import type { Parcel } from '@/types/index.types'
import { useCancelParcelMutation, useConfirmDeliveryMutation, useGetIncomingParcelsQuery, useGetMyParcelsQuery } from '@/redux/features/parcel/parcel.api'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
// import AddParcelModal from './AddParcelModal'
import { toast } from 'sonner'
import ParcelStatusLogModal from '../Sender/ParcelStatusLogModal'


export default function ReceiverParcel() {

    const { data: parcels } = useGetIncomingParcelsQuery(undefined)
    const [confirmDeliver] = useConfirmDeliveryMutation()
    console.log("parcels", parcels?.data)

    const handleCancelParcel = async (parcelId: string) => {
        try {
            const res = await confirmDeliver(parcelId).unwrap()
            console.log(res)
            toast.success("Delivery confirm for the parcel!")
        } catch (error) {
            toast.error("Couldn't confirm the parcel!")
        }
    }

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
                            <TableHead>Status Logs</TableHead>
                            {/* <TableHead>Delivery Date</TableHead> */}
                            <TableHead>Created At</TableHead>
                            <TableHead>Action</TableHead>
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
                                        {/* <Badge variant="outline">{parcel?.currentStatus?.toLocaleUpperCase()}</Badge> */}
                                        <ParcelStatusLogModal statusLogs={parcel?.statusLogs} currentStatus={parcel?.currentStatus} />
                                    </TableCell>
                                    {/* <TableCell>{parcel.deliveryDate}</TableCell> */}
                                    <TableCell>{parcel.createdAt}</TableCell>
                                    <TableCell>
                                        <Button disabled={parcel.currentStatus !== "in_transit"} onClick={() => handleCancelParcel(parcel._id, parcel.currentStatus)} className='border border-green-500 text-green-500' variant={"outline"} size={"sm"}>
                                            {parcel.currentStatus === "canceled" && "Canceled"}
                                            {parcel.currentStatus === "delivered" && "Delivered"}
                                            {!["canceled", "delivered"].includes(parcel.currentStatus) && "Confirm"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }


                    </TableBody>
                </Table>
                <div className='mt-5'>
                </div>

            </div>
        </div>
    )
}
