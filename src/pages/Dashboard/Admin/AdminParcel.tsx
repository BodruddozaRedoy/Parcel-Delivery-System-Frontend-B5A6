import { Badge } from '@/components/ui/badge'
import type { Parcel } from '@/types/index.types'
import { useCancelParcelMutation, useGetAllParcelsQuery, useGetIncomingParcelsQuery, useGetMyParcelsQuery } from '@/redux/features/parcel/parcel.api'
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
                                    {/* <TableCell>{parcel.sender}</TableCell> */}
                                    {/* <TableCell>{parcel.receiver}</TableCell> */}
                                    <TableCell>{parcel.fromAddress}</TableCell>
                                    <TableCell>{parcel.toAddress}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{parcel?.currentStatus?.toLocaleUpperCase()}</Badge>
                                    </TableCell>
                                    {/* <TableCell>{parcel.deliveryDate}</TableCell> */}
                                    <TableCell>{parcel.createdAt}</TableCell>
                                    <TableCell className='space-x-3 flex'>
                                        <Button disabled={parcel.currentStatus !== "in_transit"} onClick={() => handleCancelParcel(parcel._id, parcel.currentStatus)} className='border border-green-500 text-green-500' variant={"outline"} size={"sm"}>
                                            {parcel.currentStatus === "canceled" && "Canceled"}
                                            {parcel.currentStatus === "delivered" && "Delivered"}
                                            {!["canceled", "delivered"].includes(parcel.currentStatus) && "Confirm"}
                                        </Button>
                                        <Select value={parcel.currentStatus?.toUpperCase()}>
                                            <SelectTrigger className="">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="approved">Approved</SelectItem>
                                                    <SelectItem value="dispatched">dispatched</SelectItem>
                                                    <SelectItem value="in_transit">in_transit</SelectItem>
                                                    <SelectItem value="delivered">delivered</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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
