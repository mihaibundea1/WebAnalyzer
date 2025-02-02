// src/pages/auth/login.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { AuthCard } from '@/components/ui/auth-card'
import { FormField } from '@/components/ui/form-field'
import { useAuth } from '@/hooks/useAuth'
import type { LoginCredentials, AuthError } from '@/types/auth'

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      await login(credentials)
      navigate('/dashboard')
    } catch (error) {
      const authError = error as AuthError
      if (authError.field) {
        setErrors({ [authError.field]: authError.message })
      } else {
        setErrors({ general: authError.message })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <AuthCard 
        title="Bine ați revenit"
        description="Introduceți datele pentru a vă autentifica"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={credentials.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
            required
          />
          <FormField
            id="password"
            name="password"
            type="password"
            label="Parolă"
            value={credentials.password}
            onChange={handleChange}
            error={errors.password}
            disabled={isLoading}
            required
          />
          {errors.general && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Se procesează..." : "Autentificare"}
          </Button>
        </form>
      </AuthCard>
    </div>
  )
}