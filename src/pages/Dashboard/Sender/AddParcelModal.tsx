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
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api"
import { useGetProfileQuery } from "@/redux/features/auth/auth.api"
import type { Parcel } from "@/types/index.types"
import { toast } from "sonner"
import { useState } from "react"


type ParcelFormValues = Omit<Parcel, "_id" | "statusLogs" | "createdAt" | "updatedAt">

export default function AddParcelModal() {
    const [addParcel] = useCreateParcelMutation()
    const { data: user } = useGetProfileQuery()
    const [open, setOpen] = useState(false)
    const form = useForm<ParcelFormValues>({
        defaultValues: {
            type: "",
            weight: 0,
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
                            name="receiver"
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <FormItem>
                                        <FormLabel>Receiver Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Jane Smith"
                                                value={field.value.name}
                                                onChange={(e) =>
                                                    field.onChange({ ...field.value, name: e.target.value })
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                    <FormItem>
                                        <FormLabel>Receiver Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="+8801XXXXXXXXX"
                                                value={field.value.phone}
                                                onChange={(e) =>
                                                    field.onChange({ ...field.value, phone: e.target.value })
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
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
