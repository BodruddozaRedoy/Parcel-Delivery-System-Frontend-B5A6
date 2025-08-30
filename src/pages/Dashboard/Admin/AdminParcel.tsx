import { Badge } from '@/components/ui/badge'
import type { Parcel } from '@/types/index.types'
import { useCancelParcelMutation, useGetAllParcelsQuery, useGetIncomingParcelsQuery, useGetMyParcelsQuery, useToggleParcelBlockMutation } from '@/redux/features/parcel/parcel.api'
import { Button } from '@/components/ui/button'
// import AddParcelModal from './AddParcelModal'
import { toast } from 'sonner'
import ParcelStatusLogModal from '../Sender/ParcelStatusLogModal'
import UpdateParcelStatusModal from './UpdateParcelStatusModal'
import { ParcelTable } from '@/components/common/ParcelTable'
import type {
  ColumnDef,
} from "@tanstack/react-table"


export default function AdminParcel() {

    const { data: parcels, isLoading } = useGetAllParcelsQuery(undefined)
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
            id: "updateStatus",
            header: "Update Status",
            cell: ({ row }) => (
                <UpdateParcelStatusModal
                    parcelId={row.original._id}
                    currentStatus={row.original.currentStatus}
                >
                    <Button
                        disabled={row.original.currentStatus === "canceled" || row.original.currentStatus === "delivered"}
                        variant="outline"
                        size="sm"
                    >
                        Update Status
                    </Button>
                </UpdateParcelStatusModal>
            ),
        },
        {
            id: "block",
            header: "Block",
            cell: ({ row }) => (
                <Button
                    disabled={row.original.currentStatus === "canceled" || row.original.currentStatus === "delivered"}
                    onClick={() => handleBlockParcel(row.original._id, row.original.isBlocked)}
                    className="border border-red-500 text-red-500"
                    variant={"outline"}
                    size={"sm"}
                >
                    {row.original?.isBlocked ? "Unblock" : "Block"}
                </Button>
            ),
        },
    ];

    return (
        <div className='p-5'>
            <div className='mb-3'>
                {/* <AddParcelModal /> */}
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
