import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

// prettier-ignore
type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = 
  UseControllerProps<TFieldValues, TName> & TextInputProps;

export default function TextInputController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, defaultValue, rules, shouldUnregister, ...props }: Props<TFieldValues, TName>) {
  const {
    field: { value, onBlur, onChange },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return <TextInput {...props} value={value} onBlur={onBlur} onChangeText={onChange} />;
}
