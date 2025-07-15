import React, { forwardRef, useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  isValidating?: boolean;
  isValid?: boolean;
  isTouched?: boolean;
  showValidationIcon?: boolean;
  showCharacterCount?: boolean;
  maxLength?: number;
  helperText?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  onValidationChange?: (field: string, value: any) => void;
  onValidationBlur?: (field: string, value: any) => void;
  onValidationFocus?: (field: string) => void;
  fieldName?: string;
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({
    label,
    error,
    isValidating = false,
    isValid = false,
    isTouched = false,
    showValidationIcon = true,
    showCharacterCount = false,
    maxLength,
    helperText,
    variant = 'default',
    onValidationChange,
    onValidationBlur,
    onValidationFocus,
    fieldName,
    className,
    type = 'text',
    value,
    onChange,
    onBlur,
    onFocus,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');

    useEffect(() => {
      setInternalValue(value || '');
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      
      if (onChange) {
        onChange(e);
      }
      
      if (onValidationChange && fieldName) {
        onValidationChange(fieldName, newValue);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e);
      }
      
      if (onValidationBlur && fieldName) {
        onValidationBlur(fieldName, e.target.value);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus(e);
      }
      
      if (onValidationFocus && fieldName) {
        onValidationFocus(fieldName);
      }
    };

    const getVariantStyles = () => {
      switch (variant) {
        case 'success':
          return 'border-green-500 focus:border-green-500 focus:ring-green-500';
        case 'error':
          return 'border-red-500 focus:border-red-500 focus:ring-red-500';
        case 'warning':
          return 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500';
        default:
          if (error) {
            return 'border-red-500 focus:border-red-500 focus:ring-red-500';
          }
          if (isValid && isTouched) {
            return 'border-green-500 focus:border-green-500 focus:ring-green-500';
          }
          return '';
      }
    };

    const getValidationIcon = () => {
      if (isValidating) {
        return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
      }
      
      if (error) {
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      }
      
      if (isValid && isTouched) {
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      }
      
      return null;
    };

    const characterCount = String(internalValue).length;
    const isOverLimit = maxLength && characterCount > maxLength;

    return (
      <div className="space-y-2">
        {label && (
          <Label 
            htmlFor={props.id || fieldName} 
            className={cn(
              "text-sm font-medium",
              error ? "text-red-700 dark:text-red-400" : "text-gray-700 dark:text-gray-300"
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        
        <div className="relative">
          <Input
            ref={ref}
            type={type === 'password' && showPassword ? 'text' : type}
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={cn(
              "pr-10 transition-all duration-200",
              getVariantStyles(),
              type === 'password' && 'pr-16',
              className
            )}
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${fieldName}-error` : 
              helperText ? `${fieldName}-helper` : undefined
            }
            {...props}
          />
          
          {/* Validation Icon */}
          {showValidationIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {type === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
              {getValidationIcon()}
            </div>
          )}
        </div>
        
        {/* Helper Text and Character Count */}
        <div className="flex justify-between items-center">
          <div className="flex-1">
            {error && (
              <p 
                id={`${fieldName}-error`}
                className="text-sm text-red-600 dark:text-red-400 animate-fade-in"
                role="alert"
              >
                {error}
              </p>
            )}
            {!error && helperText && (
              <p 
                id={`${fieldName}-helper`}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                {helperText}
              </p>
            )}
          </div>
          
          {showCharacterCount && maxLength && (
            <div className={cn(
              "text-xs font-medium",
              isOverLimit ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"
            )}>
              {characterCount}/{maxLength}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ValidatedInput.displayName = 'ValidatedInput'; 