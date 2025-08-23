// import data from '@/assets/data.json'
// import DataTable from '../components/DataTable'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '../components/DataTable'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import type { Parcel } from '@/types/index.types'
import { useGetMyParcelsQuery } from '@/redux/features/parcel/parcel.api'

// type User = {
//   id: string
//   name: string
//   email: string
//   status: string
// }

const userColumns: ColumnDef<Parcel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge>{row.getValue("status")}</Badge>,
  },
]

 const data: Parcel[] = [
    { id: "1", name: "Alice", email: "alice@mail.com", status: "Active" },
    { id: "2", name: "Bob", email: "bob@mail.com", status: "Inactive" },
  ]

export default function SenderParcel() {

    const {data:parcels} = useGetMyParcelsQuery({page: 1, limit: 10})
    console.log(parcels)
  return (
    <div>
        <DataTable data={data} columns={userColumns} />
    </div>
  )
}
