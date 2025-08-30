import { Badge } from '@/components/ui/badge'
import type { Parcel, User } from '@/types/index.types'
import { useCancelParcelMutation, useGetAllParcelsQuery, useGetIncomingParcelsQuery, useGetMyParcelsQuery, useUpdateParcelStatusMutation } from '@/redux/features/parcel/parcel.api'
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
import { useGetAllUsersQuery, useToggleUserBlockMutation } from '@/redux/features/auth/auth.api'
import { Skeleton } from '@/components/ui/skeleton'


export default function UserPage() {

    const { data: users, isLoading } = useGetAllUsersQuery({page:1, limit:20})

    const [toggleBlock] = useToggleUserBlockMutation()
    const [updateParcelStatus] = useUpdateParcelStatusMutation()
    console.log("parcels", users?.data)

    const handleBlockParcel = async (userId: string, isBlocked: boolean | undefined) => {
        try {
            const res = await toggleBlock(userId).unwrap()
            console.log(res)
            if (!isBlocked) {
                toast.success("Blocked the user!")
            } else {
                toast.success("Unblocked the user!")
            }
        } catch (error) {
            toast.error("Couldn't block the user!")
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
                            <TableHead>Index</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            {/* <TableHead>Parcels</TableHead> */}
                            <TableHead>Created At</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && (
                            Array.from({ length: 8 }).map((_, r) => (
                                <TableRow key={`user-skel-${r}`}>
                                    {Array.from({ length: 8 }).map((_, c) => (
                                        <TableCell key={`user-skel-${r}-${c}`}>
                                            <Skeleton className="h-4 w-24" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}

                        {!isLoading && users?.data?.map((user: User, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="">{index+1}</TableCell>
                                <TableCell>{user.fullName}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{user.status}</Badge>
                                </TableCell>
                                <TableCell>{user.createdAt}</TableCell>

                                <TableCell>
                                    <Button
                                        onClick={() => handleBlockParcel(user._id, user?.isBlocked)}
                                        className="border border-red-500 text-red-500"
                                        variant={"outline"}
                                        size={"sm"}
                                    >
                                        {user?.isBlocked ? "Unblock" : "Block"}
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}
