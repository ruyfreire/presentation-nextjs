import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

type InputFieldProps = React.ComponentProps<typeof Input> & {
  errorMessage?: string
  label?: string
}

function InputField({ errorMessage, label, ...props }: InputFieldProps) {
  return (
    <Field data-invalid={!!errorMessage}>
      {label && <FieldLabel htmlFor={props.id}>{label}</FieldLabel>}
      <Input
        {...props}
        className="truncate"
        onFocus={(event) => {
          const input = event.currentTarget
          if (input.value) {
            requestAnimationFrame(() => {
              if (input.scrollWidth > input.clientWidth) {
                const length = input.value.length
                input.setSelectionRange(length, length)
                input.scrollLeft = input.scrollWidth
              }
            })
          }

          props.onFocus?.(event)
        }}
      />
      {errorMessage && <FieldError errors={[{ message: errorMessage }]} />}
    </Field>
  )
}

export { InputField }
