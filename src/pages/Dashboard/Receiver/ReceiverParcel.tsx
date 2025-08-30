import type { Parcel } from '@/types/index.types'
import { useConfirmDeliveryMutation, useGetIncomingParcelsQuery } from '@/redux/features/parcel/parcel.api'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import ParcelStatusLogModal from '../Sender/ParcelStatusLogModal'
import { ParcelTable } from '@/components/common/ParcelTable'
import type { ColumnDef } from '@tanstack/react-table'


export default function ReceiverParcel() {

    const { data: parcels, isLoading } = useGetIncomingParcelsQuery(undefined)
    const [confirmDeliver] = useConfirmDeliveryMutation()
    console.log("parcels", parcels?.data)

    const handleCancelParcel = async (parcelId: string) => {
        try {
            const res = await confirmDeliver(parcelId).unwrap()
            console.log(res)
            toast.success("Delivery confirm for the parcel!")
        } catch {
            toast.error("Couldn't confirm the parcel!")
        }
    }

    // Define columns for the ParcelTable
    const columns: ColumnDef<Parcel>[] = [
        { accessorKey: 'trackingId', header: 'Tracking ID' },
        { accessorKey: 'type', header: 'Type' },
        { accessorKey: 'weight', header: 'Weight', cell: ({ row }) => <div>{row.original.weight}Kg</div> },
        { accessorKey: 'fee', header: 'Fee', cell: ({ row }) => <div>${row.original.fee}</div> },
        { accessorKey: 'fromAddress', header: 'From' },
        { accessorKey: 'toAddress', header: 'To' },
        { accessorKey: 'currentStatus', header: 'Status' },
        {
            id: 'statusLogs',
            header: 'Status Logs',
            cell: ({ row }) => (
                <ParcelStatusLogModal statusLogs={row.original.statusLogs} currentStatus={row.original.currentStatus} />
            ),
        },
        { accessorKey: 'createdAt', header: 'Created At' },
        {
            id: 'action',
            header: 'Action',
            cell: ({ row }) => (
                <Button
                    disabled={row.original.currentStatus !== 'in_transit'}
                    onClick={() => handleCancelParcel(row.original._id)}
                    className='border border-green-500 text-green-500'
                    variant={'outline'}
                    size={'sm'}
                >
                    {row.original.currentStatus === 'canceled' && 'Canceled'}
                    {row.original.currentStatus === 'delivered' && 'Delivered'}
                    {!['canceled', 'delivered'].includes(row.original.currentStatus) && 'Confirm'}
                </Button>
            ),
        },
    ]

    return (
        <div className='p-5'>
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
