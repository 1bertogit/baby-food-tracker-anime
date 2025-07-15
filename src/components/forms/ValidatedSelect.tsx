import { forwardRef } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface ValidatedSelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  error?: string | null;
  isValidating?: boolean;
  isValid?: boolean;
  isTouched?: boolean;
  showValidationIcon?: boolean;
  helperText?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  onValidationChange?: (field: string, value: any) => void;
  onValidationBlur?: (field: string, value: any) => void;
  onValidationFocus?: (field: string) => void;
  fieldName?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  autoFocus?: boolean;
}

export const ValidatedSelect = forwardRef<HTMLButtonElement, ValidatedSelectProps>(
  ({
    label,
    placeholder = 'Selecione uma opção',
    options,
    error,
    isValidating = false,
    isValid = false,
    isTouched = false,
    showValidationIcon = true,
    helperText,
    variant = 'default',
    onValidationChange,
    onValidationBlur,
    onValidationFocus,
    fieldName,
    value,
    defaultValue,
    disabled = false,
    required = false,
    className,
    autoFocus = false,
    ...props
  }, ref) => {
    const handleValueChange = (newValue: string) => {
      if (onValidationChange && fieldName) {
        onValidationChange(fieldName, newValue);
      }
    };

    const handleOpenChange = (open: boolean) => {
      if (!open && onValidationBlur && fieldName) {
        onValidationBlur(fieldName, value);
      }
      if (open && onValidationFocus && fieldName) {
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

    return (
      <div className="space-y-2">
        {label && (
          <Label 
            htmlFor={fieldName} 
            className={cn(
              "text-sm font-medium",
              error ? "text-red-700 dark:text-red-400" : "text-gray-700 dark:text-gray-300"
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        
        <div className="relative">
          <Select
            value={value}
            defaultValue={defaultValue}
            onValueChange={handleValueChange}
            onOpenChange={handleOpenChange}
            disabled={disabled}
          >
            <SelectTrigger
              ref={ref}
              className={cn(
                "transition-all duration-200",
                getVariantStyles(),
                showValidationIcon && "pr-10",
                className
              )}
              aria-invalid={!!error}
              aria-describedby={
                error ? `${fieldName}-error` : 
                helperText ? `${fieldName}-helper` : undefined
              }
              autoFocus={autoFocus}
              {...props}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            
            <SelectContent>
              {options.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  disabled={option.disabled}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span>{option.label}</span>
                    {option.description && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {option.description}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Validation Icon */}
          {showValidationIcon && (
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {getValidationIcon()}
            </div>
          )}
        </div>
        
        {/* Helper Text and Error */}
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
        </div>
      </div>
    );
  }
);

ValidatedSelect.displayName = 'ValidatedSelect'; 