export function InputOTPLoadingFallback() {
  return (
    <div className="flex gap-2 opacity-50">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-10 w-10 rounded-md border-2 border-input">
          <span className="sr-only">otp slot</span>
        </div>
      ))}
    </div>
  )
}

export default function InputOTPTimer({ timeLeft }: { timeLeft: number }) {
  return (
    <div className="flex h-10 items-center justify-center">
      <p className="text-center text-muted-foreground">Please wait for {timeLeft} second/s to try again</p>
    </div>
  )
}
