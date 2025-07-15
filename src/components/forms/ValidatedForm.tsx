import React, { forwardRef, useCallback, useState } from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useFormValidation, ValidationRule } from '@/hooks/useFormValidation';

export interface ValidatedFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  title?: string;
  description?: string;
  validationRules: ValidationRule[];
  onSubmit: (data: Record<string, any>, isValid: boolean) => Promise<void> | void;
  submitButtonText?: string;
  submitButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  isSubmitting?: boolean;
  showValidationSummary?: boolean;
  resetOnSubmit?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  showProgressBar?: boolean;
  autoFocus?: boolean;
}

export const ValidatedForm = forwardRef<HTMLFormElement, ValidatedFormProps>(
  ({
    title,
    description,
    validationRules,
    onSubmit,
    submitButtonText = 'Enviar',
    submitButtonVariant = 'default',
    isSubmitting = false,
    showValidationSummary = true,
    resetOnSubmit = false,
    validateOnChange = true,
    validateOnBlur = true,
    children,
    className,
    cardClassName,
    headerClassName,
    contentClassName,
    footerClassName,
    showProgressBar = false,
    autoFocus = false,
    ...props
  }, ref) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const {
      state,
      validateAll,
      handleFieldChange,
      handleFieldBlur,
      handleFieldFocus,
      getFieldStatus,
      reset
    } = useFormValidation(validationRules, {
      validateOnChange,
      validateOnBlur,
      validateOnSubmit: true
    });

    const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError(null);
      setSubmitSuccess(null);

      try {
        const isValid = await validateAll(formData);
        
        if (isValid) {
          await onSubmit(formData, true);
          setSubmitSuccess('Formulário enviado com sucesso!');
          
          if (resetOnSubmit) {
            reset();
            setFormData({});
          }
        } else {
          setSubmitError('Por favor, corrija os erros antes de continuar.');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar formulário';
        setSubmitError(errorMessage);
      }
    }, [formData, validateAll, onSubmit, resetOnSubmit, reset]);

    const handleFieldUpdate = useCallback((field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      handleFieldChange(field, value);
      setSubmitError(null);
      setSubmitSuccess(null);
    }, [handleFieldChange]);

    const handleFieldBlurUpdate = useCallback((field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      handleFieldBlur(field, value);
    }, [handleFieldBlur]);

    const getValidationSummary = () => {
      const errors = Object.entries(state.errors)
        .filter(([_, error]) => error)
        .map(([field, error]) => ({ field, error }));
      
      if (errors.length === 0) return null;

      return (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
            <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
              Corrija os seguintes erros:
            </h4>
          </div>
          <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
            {errors.map(({ field, error }) => (
              <li key={field} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    const getProgressPercentage = () => {
      const totalFields = validationRules.length;
      const validFields = Object.entries(state.errors)
        .filter(([field, error]) => !error && state.touched[field])
        .length;
      
      return totalFields > 0 ? (validFields / totalFields) * 100 : 0;
    };

    const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.props && typeof child.props === 'object' && 'fieldName' in child.props) {
        const fieldName = child.props.fieldName as string;
        const fieldStatus = getFieldStatus(fieldName);
        
        return React.cloneElement(child, {
          ...fieldStatus,
          onValidationChange: handleFieldUpdate,
          onValidationBlur: handleFieldBlurUpdate,
          onValidationFocus: handleFieldFocus,
          value: formData[fieldName] || '',
          autoFocus: autoFocus && validationRules[0]?.field === fieldName
        } as any);
      }
      return child;
    });

    const content = (
      <form 
        ref={ref}
        onSubmit={handleFormSubmit}
        className={cn("space-y-6", className)}
        noValidate
        {...props}
      >
        {showProgressBar && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        )}

        {showValidationSummary && state.hasBeenSubmitted && getValidationSummary()}

        {submitError && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
              <p className="text-sm text-red-800 dark:text-red-200">{submitError}</p>
            </div>
          </div>
        )}

        {submitSuccess && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
              <p className="text-sm text-green-800 dark:text-green-200">{submitSuccess}</p>
            </div>
          </div>
        )}

        <div className={cn("space-y-4", contentClassName)}>
          {enhancedChildren}
        </div>

        <div className={cn("flex justify-end space-x-3", footerClassName)}>
          <Button
            type="submit"
            variant={submitButtonVariant}
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              submitButtonText
            )}
          </Button>
        </div>
      </form>
    );

    if (title || description) {
      return (
        <Card className={cn("w-full max-w-2xl mx-auto", cardClassName)}>
          <CardHeader className={headerClassName}>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            {content}
          </CardContent>
        </Card>
      );
    }

    return content;
  }
);

ValidatedForm.displayName = 'ValidatedForm'; 