import { Badge } from '@/components/ui/badge'
import type { Parcel } from '@/types/index.types'
import { useCancelParcelMutation, useGetAllParcelsQuery, useGetIncomingParcelsQuery, useGetMyParcelsQuery, useToggleParcelBlockMutation } from '@/redux/features/parcel/parcel.api'
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
import UpdateParcelStatusModal from './UpdateParcelStatusModal'


export default function AdminParcel() {

    const { data: parcels } = useGetAllParcelsQuery(undefined)
    const [toggleBlock] = useToggleParcelBlockMutation()
    console.log("parcels", parcels?.data)

    const handleBlockParcel = async (parcelId: string, isBlocked: boolean) => {
        try {
            const res = await toggleBlock(parcelId).unwrap()
            console.log(res)
            if (!isBlocked) {
                toast.success("Blocked the parcel!")
            } else {
                toast.success("Unblocked the parcel!")
            }
        } catch (error) {
            toast.error("Couldn't cancel the parcel!")
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
                                    <TableCell>{parcel.fromAddress}</TableCell>
                                    <TableCell>{parcel.toAddress}</TableCell>
                                    <TableCell>
                                        {/* <Badge variant="outline">{parcel?.currentStatus?.toLocaleUpperCase()}</Badge> */}
                                        <ParcelStatusLogModal statusLogs={parcel?.statusLogs} currentStatus={parcel?.currentStatus}/>
                                    </TableCell>
                                    <TableCell>{parcel.createdAt}</TableCell>
                                    <TableCell className="space-x-3 flex">
                                        {/* Update Status */}
                                        <UpdateParcelStatusModal
                                            parcelId={parcel._id}
                                            currentStatus={parcel.currentStatus}
                                        >
                                            <Button
                                                disabled={parcel.currentStatus === "canceled" || parcel.currentStatus === "delivered"}
                                                variant="outline"
                                                size="sm"
                                            >
                                                Update Status
                                            </Button>
                                        </UpdateParcelStatusModal>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            disabled={parcel.currentStatus === "canceled" || parcel.currentStatus === "delivered"}
                                            onClick={() => handleBlockParcel(parcel._id, parcel.isBlocked)}
                                            className="border border-red-500 text-red-500"
                                            variant={"outline"}
                                            size={"sm"}
                                        >
                                            {parcel?.isBlocked ? "Unblock" : "Block"}
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))
                        }


                    </TableBody>
                </Table>

            </div>
        </div>
    )
}
