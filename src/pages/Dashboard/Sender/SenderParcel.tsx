import type { Parcel } from '@/types/index.types'
import { useCancelParcelMutation, useGetMyParcelsQuery, useGetReceiverUsersQuery } from '@/redux/features/parcel/parcel.api'
import { Button } from '@/components/ui/button'
import AddParcelModal from './AddParcelModal'
import { toast } from 'sonner'
import ParcelStatusLogModal from './ParcelStatusLogModal'
import { ParcelTable } from '@/components/common/ParcelTable'
import type {
  ColumnDef,
} from "@tanstack/react-table"


export default function SenderParcel() {

    const { data: parcels, isLoading } = useGetMyParcelsQuery(undefined)
    const [cancelParcel] = useCancelParcelMutation()
    const {data} = useGetReceiverUsersQuery(undefined)
    console.log(data?.data, "receivers")

    // console.log("parcels", parcels?.data)

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


    // Define columns for the ParcelTable
    const columns: ColumnDef<Parcel>[] = [
        {
            accessorKey: "trackingId",
            header: "Tracking ID",
        },
        {
            accessorKey: "type",
            header: "Type",
        },
        {
            accessorKey: "weight",
            header: "Weight",
            cell: ({ row }) => <div>{row.original.weight}Kg</div>,
        },
        {
            accessorKey: "fee",
            header: "Fee",
            cell: ({ row }) => <div>${row.original.fee}</div>,
        },
        {
            accessorKey: "fromAddress",
            header: "From",
        },
        {
            accessorKey: "toAddress",
            header: "To",
        },
        {
            accessorKey: "currentStatus",
            header: "Status",
        },
        {
            id: "statusLogs",
            header: "Status Logs",
            cell: ({ row }) => (
                <ParcelStatusLogModal
                    statusLogs={row.original.statusLogs}
                    currentStatus={row.original.currentStatus}
                />
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
        },
        {
            id: "cancel",
            header: "Cancel",
            cell: ({ row }) => (
                <Button
                    disabled={row.original.currentStatus === "canceled"}
                    onClick={() => handleCancelParcel(row.original._id, row.original.currentStatus)}
                    className='border border-red-500 text-red-500'
                    variant={"outline"}
                    size={"sm"}
                >
                    Cancel
                </Button>
            ),
        },
    ];

    return (
        <div className='p-5'>
            <div className='mb-3'>
                <AddParcelModal />
            </div>
            <div className='border rounded-lg overflow-hidden p-5'>
                <ParcelTable
                    columns={columns}
                    data={parcels?.data || []}
                    isLoading={isLoading}
                    searchableColumns={["trackingId", "type", "fromAddress", "toAddress"]}
                    filterableColumns={[
                        {
                            id: "currentStatus",
                            title: "Status",
                            options: [
                                { label: "Requested", value: "requested" },
                                { label: "Approved", value: "approved" },
                                { label: "Dispatched", value: "dispatched" },
                                { label: "In Transit", value: "in_transit" },
                                { label: "Delivered", value: "delivered" },
                                { label: "Canceled", value: "canceled" },
                            ],
                        },
                    ]}
                    initialHiddenColumns={["currentStatus"]}
                />
            </div>
        </div>
    )
}
