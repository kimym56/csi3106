import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

type Props<
  Component extends React.ComponentType<any>,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> =
  // prettier-ignore
  { as?: Component }
  & UseControllerProps<TFieldValues, TName>
  & (Component extends React.ComponentType<infer P> ? P : TextInputProps);

export default function TextInputController<
  Component extends React.ComponentType<any> = typeof TextInput,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  as: Component = TextInput,
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  ...props
}: Props<Component, TFieldValues, TName>) {
  const {
    field: { ref, value, onBlur, onChange },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return <Component {...props} ref={ref} value={value} onBlur={onBlur} onChangeText={onChange} />;
}
