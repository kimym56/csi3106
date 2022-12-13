import React, { useMemo } from 'react';
import { Text, TextProps } from 'react-native';
import { format, isValid, parseISO } from 'date-fns';

export type Props = OwnProps & Omit<TextProps, keyof OwnProps>;

interface OwnProps {
  format?: string;
  fallback?: string;
  children?: string | null;
}

export default function DateTimeDisplay({
  format: formatProp = 'yyyy.MM.dd HH:mm',
  fallback = '-',
  children: childrenProp,
  ...props
}: Props) {
  const children = useMemo(() => {
    if (childrenProp == null) {
      return fallback;
    }

    const date = parseISO(childrenProp);

    if (!isValid(date)) {
      return fallback;
    }

    return format(date, formatProp);
  }, [childrenProp, formatProp, fallback]);

  return <Text {...props}>{children}</Text>;
}
