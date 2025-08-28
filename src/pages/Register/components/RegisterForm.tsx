import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import type { RegisterRequest } from "@/types/index.types"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterRequest>()
  const [registerUser, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const onSubmit = async (data: RegisterRequest) => {
    try {
      setError(null)
      await registerUser(data).unwrap()
      toast.success("Registration successful! Please login.")
      navigate('/login', { state: { message: 'Registration successful! Please login.' } })
    } catch (err: any) {
      setError(err.data?.message || 'Registration failed')
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName", { required: "Full name is required" })}
                />
                {errors.fullName && (
                  <span className="text-red-500 text-sm">{errors.fullName.message}</span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone.message}</span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("role", { required: "Role is required" })}
                >
                  <option value="">Select a role</option>
                  <option value="sender">Sender</option>
                  <option value="receiver">Receiver</option>
                </select>
                {errors.role && (
                  <span className="text-red-500 text-sm">{errors.role.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full gradient-hero hover-glow" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
                {/* <Button variant="outline" className="w-full gradient-hero hover-glow" type="button">
                  Sign up with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
