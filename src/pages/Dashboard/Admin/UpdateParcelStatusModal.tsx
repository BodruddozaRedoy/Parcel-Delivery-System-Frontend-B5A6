import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useUpdateParcelStatusMutation } from "@/redux/features/parcel/parcel.api"
import type { UpdateParcelStatusRequest } from "@/types/index.types"
import { toast } from "sonner"
import { useState } from "react"

interface UpdateParcelStatusModalProps {
  parcelId: string
  currentStatus: string
  children: React.ReactNode
}

export default function UpdateParcelStatusModal({
  parcelId,
  currentStatus,
  children,
}: UpdateParcelStatusModalProps) {
  const [updateParcelStatus] = useUpdateParcelStatusMutation()
  const [open, setOpen] = useState(false)

  const form = useForm<UpdateParcelStatusRequest>({
    defaultValues: {
      status: currentStatus,
      location: "",
      note: "",
    },
  })

  const onSubmit = async (data: UpdateParcelStatusRequest) => {
    try {
      const res = await updateParcelStatus({ parcelId, data }).unwrap()
      console.log(res)
      toast.success("Status updated successfully!")
      form.reset()
      setOpen(false)
    } catch (error) {
      toast.error("Failed to update status!")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Parcel Status</DialogTitle>
          <DialogDescription>
            Update the status of this parcel with location and note information.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={currentStatus === "canceled" || currentStatus === "delivered"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Note */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="pt-4 flex justify-end">
              <Button 
                type="submit"
                disabled={currentStatus === "canceled" || currentStatus === "delivered"}
              >
                Update Status
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}