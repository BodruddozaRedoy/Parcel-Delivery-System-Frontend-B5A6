import type { Parcel } from '@/types/index.types'
import { useCancelParcelMutation, useGetMyParcelsQuery } from '@/redux/features/parcel/parcel.api'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import AddParcelModal from './AddParcelModal'
import { toast } from 'sonner'
import ParcelStatusLogModal from './ParcelStatusLogModal'


export default function SenderParcel() {

    const { data: parcels } = useGetMyParcelsQuery(undefined)
    const [cancelParcel] = useCancelParcelMutation()
    console.log("parcels", parcels?.data)

    const handleCancelParcel = async (parcelId: string, status: string) => {
        console.log("status", status)
        const normalizedStatus = status?.trim().toLowerCase()
        console.log("normalized:", normalizedStatus)

        try {
            if (["dispatched", "in_transit", "delivered", "canceled"].includes(normalizedStatus)) {
                return toast.error("You can't cancel the parcel!!")
            }

            const res = await cancelParcel(parcelId).unwrap()
            console.log(res)
            toast.success("Canceled the parcel!")
        } catch (error) {
            toast.error("Couldn't cancel the parcel!")
        }
    }

    return (
        <div className='p-5'>
            <div className='mb-3'>
                <AddParcelModal />
            </div>
            <div className='border rounded-lg overflow-hidden p-5'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tracking ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Weight</TableHead>
                            <TableHead>Fee</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Status Logs</TableHead>
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

                                        <ParcelStatusLogModal statusLogs={parcel?.statusLogs} currentStatus={parcel?.currentStatus} />
                                    </TableCell>
                                    <TableCell>{parcel.createdAt}</TableCell>
                                    <TableCell><Button disabled={parcel.currentStatus === "canceled"} onClick={() => handleCancelParcel(parcel._id, parcel.currentStatus)} className='border border-red-500 text-red-500' variant={"outline"} size={"sm"}>Cancel</Button></TableCell>
                                </TableRow>
                            ))
                        }


                    </TableBody>
                </Table>

            </div>
        </div>
    )
}
