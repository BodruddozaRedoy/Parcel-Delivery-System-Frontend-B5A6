import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCreateParcelMutation, useGetReceiverUsersQuery } from "@/redux/features/parcel/parcel.api"
import { useGetProfileQuery } from "@/redux/features/auth/auth.api"
import type { CreateParcelRequest, User } from "@/types/index.types"
import { toast } from "sonner"
import { useState } from "react"

type ParcelFormValues = CreateParcelRequest & {
    receiver: CreateParcelRequest["receiver"] & { _id?: string }
}

export default function AddParcelModal() {
    const [addParcel] = useCreateParcelMutation()
    const { data: user } = useGetProfileQuery()
    const [open, setOpen] = useState(false)
    const { data:users } = useGetReceiverUsersQuery(undefined)
    const receiverUsers = users?.data as User[] | undefined
    const [isOtherSelected, setIsOtherSelected] = useState(false)

    const form = useForm<ParcelFormValues>({
        defaultValues: {
            type: "",
            weight: 0,
            sender: "",
            fee: 0,
            receiver: {
                name: "",
                phone: ""
            },
            fromAddress: "",
            toAddress: "",
        },
    })

    const onSubmit = async (data: ParcelFormValues) => {
        console.log("Form Submitted:", data)
        try {
            // Ensure receiver._id is populated before submit, if user selected from list
            if (!data.receiver._id && data.receiver.phone) {
                const selectedUser = receiverUsers?.find((u: User) => u.phone === data.receiver.phone)
                if (selectedUser) {
                    data = {
                        ...data,
                        receiver: { ...data.receiver, _id: selectedUser._id }
                    }
                }
            }

            const res = await addParcel(data).unwrap()
            console.log(res)
            if (res.success) {
                toast.success("Parcel created successfully!")
                form.reset()
                setOpen(false)
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Parcel
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add a New Parcel</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Type */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parcel Type</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Document, Electronics" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Weight */}
                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weight (kg)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Fee */}
                        <FormField
                            control={form.control}
                            name="fee"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Delivery Fee</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Sender (Read-only from profile) */}
                        <FormField
                            control={form.control}
                            name="sender"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Sender Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={user?.data?.fullName || ""}
                                            readOnly
                                            placeholder="Sender Name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Receiver */}
                        <FormField
                            control={form.control}
                            name="receiver.phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Receiver Phone</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            // Check if "Other" option is selected
                                            if (value === "other") {
                                                setIsOtherSelected(true)
                                                form.setValue("receiver.name", "")
                                            } else {
                                                setIsOtherSelected(false)
                                                // Find the selected user and auto-fill the name
                                                const selectedUser = receiverUsers?.find((user: User) => user.phone === value)
                                                if (selectedUser) {
                                                    form.setValue("receiver.name", selectedUser.fullName)
                                                    // Also store receiver's _id so backend can use it
                                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                    // @ts-ignore - receiver._id is optional in our form type
                                                    form.setValue("receiver._id", selectedUser._id)
                                                }
                                            }
                                        }}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select receiver phone or type manually" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {receiverUsers?.map((user: User) => (
                                                <SelectItem key={user._id} value={user.phone}>
                                                    {user.phone} - {user.fullName}
                                                </SelectItem>
                                            ))}
                                            {/* <SelectItem value="other">Other (Type manually)</SelectItem> */}
                                        </SelectContent>
                                    </Select>
                                    
                                    {/* Manual input field for "Other" option */}
                                    {isOtherSelected && (
                                        <Input
                                            placeholder="+8801XXXXXXXXX"
                                            className="mt-2"
                                            value={field.value === "other" ? "" : field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                                // Also update the form value directly to ensure it's captured
                                                form.setValue("receiver.phone", e.target.value)
                                            }}
                                        />
                                    )}
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="receiver.name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Receiver Name</FormLabel>
                                    <FormControl>
                                        <Input
                                        readOnly
                                            placeholder="Receiver Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* From Address */}
                        <FormField
                            control={form.control}
                            name="fromAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>From Address</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Sender's full address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* To Address */}
                        <FormField
                            control={form.control}
                            name="toAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>To Address</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Receiver's full address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Tracking ID */}
                        {/* <FormField
                            control={form.control}
                            name="trackingId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tracking ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Unique Tracking ID" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        {/* Submit */}
                        <div className="pt-4 flex justify-end">
                            <Button type="submit">Submit Parcel</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )

}
