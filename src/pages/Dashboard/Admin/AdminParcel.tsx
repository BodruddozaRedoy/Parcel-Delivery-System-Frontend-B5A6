import { Badge } from '@/components/ui/badge'
import type { Parcel } from '@/types/index.types'
import { useCancelParcelMutation, useGetAllParcelsQuery, useGetIncomingParcelsQuery, useGetMyParcelsQuery, useToggleBlockMutation, useUpdateParcelStatusMutation } from '@/redux/features/parcel/parcel.api'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
// import AddParcelModal from './AddParcelModal'
import { toast } from 'sonner'


export default function AdminParcel() {

    const { data: parcels } = useGetAllParcelsQuery(undefined)
    const [toggleBlock] = useToggleBlockMutation()
    const [updateParcelStatus] = useUpdateParcelStatusMutation()
    console.log("parcels", parcels?.data)

    const handleBlockParcel = async (parcelId: string, isBlocked:boolean) => {
        try {
            const res = await toggleBlock(parcelId).unwrap()
            console.log(res)
            if(!isBlocked){
                toast.success("Blocked the parcel!")
            }else{
                toast.success("Unblocked the parcel!")
            }
        } catch (error) {
            toast.error("Couldn't cancel the parcel!")
        }
    }

    const handleUpdateParcelStatus = async (parcelId: string, status: string) => {
        const data = {
            status: status,
            location: "murpur",
            note: "muri kha"
        }
        try {
            const res = await updateParcelStatus({ parcelId, data })
            console.log(res)
            toast.success("Status updated!")
        } catch (error) {
            toast.error("Something went wrong!")
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
                            <TableHead>Status</TableHead>
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
                                        <Badge variant="outline">{parcel?.currentStatus?.toLocaleUpperCase()}</Badge>
                                    </TableCell>
                                    <TableCell>{parcel.createdAt}</TableCell>
                                    <TableCell className="space-x-3 flex">
                                        {/* Update Status */}
                                        <Select
                                            value={parcel.currentStatus}
                                            onValueChange={(value) => handleUpdateParcelStatus(parcel._id, value)}
                                        >
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="requested">Requested</SelectItem>
                                                    <SelectItem value="approved">Approved</SelectItem>
                                                    <SelectItem value="dispatched">Dispatched</SelectItem>
                                                    <SelectItem value="in_transit">In Transit</SelectItem>
                                                    <SelectItem value="delivered">Delivered</SelectItem>
                                                    <SelectItem value="canceled">Canceled</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>


                                    </TableCell>
                                    <TableCell>
                                        <Button
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
