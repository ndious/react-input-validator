import React from 'react';

export const Input = ({
  type, name, id,
  validator, required,
  onBlur, onChange,
  ...props
}) => {

  const test = target => {
    const isEmpty = target.value.length === 0
    let isValid
    if (typeof validator === 'function') {
      isValid = validator(target.value)
    } else {
      isValid = validator.test(target.value)
    }
    const onError = required ? (isEmpty || !isValid) : !(isValid || isEmpty)

    return {
      ...target,
      isEmpty,
      isValid,
      onError,
    }
  }

  const handleChange = ev => {
    console.log('there is change', onChange)
    if (onChange) {
      return onChange({
        ...ev,
        target: test(ev.target)
      })
    }
  }

  const handleBlur = ev => {
    if (onBlur) {
      return onBlur({
        ...ev,
        target: test(ev.target)
      })
    }
  }

  return (
    <input
      type={type}
      name={name || id}
      id={id || name}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
      required
    />
  )
}
