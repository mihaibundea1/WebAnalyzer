// src/pages/auth/register.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { AuthCard } from '@/components/ui/auth-card'
import { FormField } from '@/components/ui/form-field'
import { useAuth } from '@/hooks/useAuth'
import type { RegisterCredentials, AuthError } from '@/types/auth'

export const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (credentials.password !== credentials.confirmPassword) {
      newErrors.confirmPassword = 'Parolele nu se potrivesc'
    }
    
    if (credentials.password.length < 8) {
      newErrors.password = 'Parola trebuie să aibă cel puțin 8 caractere'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      await register(credentials)
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
        title="Creați un cont nou"
        description="Completați formularul pentru a vă înregistra"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="name"
            name="name"
            type="text"
            label="Nume complet"
            value={credentials.name}
            onChange={handleChange}
            error={errors.name}
            disabled={isLoading}
            required
          />
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
          <FormField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirmă parola"
            value={credentials.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
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
            {isLoading ? "Se procesează..." : "Înregistrare"}
          </Button>
        </form>
      </AuthCard>
    </div>
  )
}