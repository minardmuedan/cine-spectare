import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { passwordSchema } from '@/features/authentication/schema'
import { Input } from '@/components/ui/input'
import zxcvbn from 'zxcvbn'
import { Label } from '@/components/ui/label'

type TProps = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  typeError: string[] | undefined
  setTypeError: Dispatch<SetStateAction<string[] | undefined>>
  autoFocus?: boolean
}

export default function CreatePasswordInput({ value, setValue, typeError, setTypeError, autoFocus = true }: TProps) {
  const [passwordScore, setPasswordScore] = useState(0)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const inputtedValue = e.target.value
    setValue(inputtedValue)
    setPasswordScore(zxcvbn(inputtedValue).score)
    const validateFields = passwordSchema.safeParse({ password: inputtedValue })
    setTypeError(validateFields.error?.flatten().fieldErrors.password)
  }

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="passwordInput">New Password</Label>
        <Input
          autoFocus={autoFocus}
          id="passwordInput"
          type="text"
          placeholder="********"
          autoComplete="off"
          onChange={handleOnChange}
          value={value}
        />

        <ul className="flex gap-2">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <li
                key={i}
                className={`h-1 flex-1 ${i >= passwordScore ? 'bg-accent' : passwordScore == 1 ? 'bg-destructive' : passwordScore == 2 ? 'bg-orange-500' : passwordScore == 3 ? 'bg-yellow-500' : 'bg-green-500'}`}
              >
                <span className="sr-only">password score {i}</span>
              </li>
            ))}
        </ul>

        <p
          className={`text-sm ${value == '' ? 'text-muted-foreground' : passwordScore <= 1 ? 'text-destructive' : passwordScore == 2 ? 'text-orange-500' : passwordScore == 3 ? 'text-yellow-500' : 'text-green-500'}`}
        >
          {!value
            ? 'Create a strong password'
            : passwordScore <= 1
              ? 'Very Weak! 💤'
              : passwordScore == 2
                ? 'Weak! 😓'
                : passwordScore == 3
                  ? 'Fair 😐'
                  : 'Strong 💪'}
        </p>
      </div>

      {typeError && (
        <ul className="mt-6 list-inside list-disc text-sm">
          {typeError.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </>
  )
}
