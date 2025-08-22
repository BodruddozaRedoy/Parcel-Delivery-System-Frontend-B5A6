"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Send, MapPin, Phone } from "lucide-react"
import emailjs from "emailjs-com"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string
      )
      toast.success("✅ Message sent successfully!")
      form.reset()
    } catch (error) {
      console.error(error)
      toast.error("❌ Message was not sent!")
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-muted/30 flex items-center">
      <div className="container max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Info Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg">
            Have a question, feedback, or partnership idea?  
            Drop us a message and our team will get back to you within 24 hours.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="text-primary h-5 w-5" />
              <span className="text-foreground">Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-primary h-5 w-5" />
              <span className="text-foreground">+880 1234-567890</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-primary h-5 w-5" />
              <span className="text-foreground">support@swiftship.com</span>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <Card className="shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground text-sm">
                Fill out the form below and we’ll reply shortly.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your message here..."
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full gradient-hero hover-glow flex items-center gap-2"
                >
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
