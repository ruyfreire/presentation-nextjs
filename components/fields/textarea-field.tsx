import { Field, FieldError, FieldLabel } from '../ui/field'
import { Textarea } from '../ui/textarea'

type TextareaFieldProps = React.ComponentProps<typeof Textarea> & {
  errorMessage?: string
  label?: string
}

function TextareaField({ errorMessage, label, ...props }: TextareaFieldProps) {
  return (
    <Field data-invalid={!!errorMessage}>
      {label && <FieldLabel htmlFor={props.id}>{label}</FieldLabel>}
      <Textarea {...props} />
      {errorMessage && <FieldError errors={[{ message: errorMessage }]} />}
    </Field>
  )
}

export { TextareaField }
