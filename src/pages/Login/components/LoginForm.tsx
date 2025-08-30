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
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import type { LoginRequest } from "@/types/index.types"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>()
  const [loginUser, { isLoading }] = useLoginMutation()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const isApiError = (err: unknown): err is { data?: { message?: string } } => {
    return (
      typeof err === 'object' && err !== null && 'data' in err &&
      typeof (err as { data?: unknown }).data === 'object'
    )
  }

  const onSubmit = async (data: LoginRequest) => {
    try {
      setError(null)
      await loginUser(data).unwrap()
      toast.success("Logged in successfully!")

      // Role-based redirection
      // switch (result.data.user.role) {
      //   case 'admin':
      //     navigate('/admin')
      //     break
      //   case 'sender':
      //     navigate('/sender')
      //     break
      //   case 'receiver':
      //     navigate('/receiver')
      //     break
      //   default:
      //     navigate('/')
      // }
      navigate("/")
    } catch (err: unknown) {
      const message = isApiError(err) && typeof err.data?.message === 'string'
        ? err.data?.message
        : 'Login failed'
      setError(message || 'Login failed')
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full gradient-hero hover-glow" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                {/* <Button variant="outline" className="w-full gradient-hero hover-glow" type="button">
                  Login with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
