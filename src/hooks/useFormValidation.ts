import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';

export interface ValidationRule {
  field: string;
  schema: z.ZodType<any>;
  message?: string;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
}

export interface ValidationState {
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValidating: Record<string, boolean>;
  hasBeenSubmitted: boolean;
}

export interface UseFormValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
  debounceMs?: number;
  showErrorsOnlyAfterTouch?: boolean;
}

export function useFormValidation(
  rules: ValidationRule[],
  options: UseFormValidationOptions = {}
) {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    debounceMs = 300,
    showErrorsOnlyAfterTouch = true
  } = options;

  const [state, setState] = useState<ValidationState>({
    isValid: false,
    errors: {},
    touched: {},
    isValidating: {},
    hasBeenSubmitted: false
  });

  const [debounceTimeouts, setDebounceTimeouts] = useState<Record<string, NodeJS.Timeout>>({});

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      Object.values(debounceTimeouts).forEach(clearTimeout);
    };
  }, [debounceTimeouts]);

  const validateField = useCallback(async (
    field: string, 
    value: any, 
    immediate = false
  ): Promise<string | null> => {
    const rule = rules.find(r => r.field === field);
    if (!rule) return null;

    const delay = immediate ? 0 : (rule.debounceMs ?? debounceMs);

    // Clear existing timeout
    if (debounceTimeouts[field]) {
      clearTimeout(debounceTimeouts[field]);
    }

    return new Promise((resolve) => {
      const timeout = setTimeout(async () => {
        setState(prev => ({
          ...prev,
          isValidating: { ...prev.isValidating, [field]: true }
        }));

        try {
          await rule.schema.parseAsync(value);
          setState(prev => ({
            ...prev,
            errors: { ...prev.errors, [field]: '' },
            isValidating: { ...prev.isValidating, [field]: false }
          }));
          resolve(null);
        } catch (error) {
          if (error instanceof z.ZodError) {
            const errorMessage = rule.message || error.errors[0]?.message || 'Valor inválido';
            setState(prev => ({
              ...prev,
              errors: { ...prev.errors, [field]: errorMessage },
              isValidating: { ...prev.isValidating, [field]: false }
            }));
            resolve(errorMessage);
          }
        }
      }, delay);

      setDebounceTimeouts(prev => ({ ...prev, [field]: timeout }));
    });
  }, [rules, debounceMs, debounceTimeouts]);

  const validateAll = useCallback(async (values: Record<string, any>): Promise<boolean> => {
    const validationPromises = rules.map(rule => 
      validateField(rule.field, values[rule.field], true)
    );

    const results = await Promise.all(validationPromises);
    const hasErrors = results.some(error => error !== null);
    
    setState(prev => ({
      ...prev,
      isValid: !hasErrors,
      hasBeenSubmitted: true
    }));

    return !hasErrors;
  }, [rules, validateField]);

  const handleFieldChange = useCallback((field: string, value: any) => {
    const rule = rules.find(r => r.field === field);
    const shouldValidate = validateOnChange && (rule?.validateOnChange ?? true);

    if (shouldValidate) {
      validateField(field, value);
    }
  }, [rules, validateOnChange, validateField]);

  const handleFieldBlur = useCallback((field: string, value: any) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true }
    }));

    const rule = rules.find(r => r.field === field);
    const shouldValidate = validateOnBlur && (rule?.validateOnBlur ?? true);

    if (shouldValidate) {
      validateField(field, value, true); // Immediate validation on blur
    }
  }, [rules, validateOnBlur, validateField]);

  const handleFieldFocus = useCallback((field: string) => {
    // Clear error when user focuses on field (better UX)
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: '' }
    }));
  }, []);

  const getFieldError = useCallback((field: string): string | null => {
    const error = state.errors[field];
    const touched = state.touched[field];
    const hasBeenSubmitted = state.hasBeenSubmitted;

    if (!error) return null;

    if (showErrorsOnlyAfterTouch) {
      return (touched || hasBeenSubmitted) ? error : null;
    }

    return error;
  }, [state.errors, state.touched, state.hasBeenSubmitted, showErrorsOnlyAfterTouch]);

  const getFieldStatus = useCallback((field: string) => {
    const error = getFieldError(field);
    const isValidating = state.isValidating[field];
    const touched = state.touched[field];

    return {
      hasError: !!error,
      isValidating,
      isTouched: touched,
      error,
      isValid: !error && touched
    };
  }, [getFieldError, state.isValidating, state.touched]);

  const reset = useCallback(() => {
    setState({
      isValid: false,
      errors: {},
      touched: {},
      isValidating: {},
      hasBeenSubmitted: false
    });
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: error }
    }));
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: '' }
    }));
  }, []);

  return {
    state,
    validateField,
    validateAll,
    handleFieldChange,
    handleFieldBlur,
    handleFieldFocus,
    getFieldError,
    getFieldStatus,
    reset,
    setFieldError,
    clearFieldError
  };
}

// Validation schemas for common use cases
export const validationSchemas = {
  required: (message = 'Este campo é obrigatório') => 
    z.string().min(1, message),
  
  email: (message = 'Email inválido') => 
    z.string().email(message),
  
  minLength: (min: number, message?: string) => 
    z.string().min(min, message || `Mínimo de ${min} caracteres`),
  
  maxLength: (max: number, message?: string) => 
    z.string().max(max, message || `Máximo de ${max} caracteres`),
  
  number: (message = 'Deve ser um número') => 
    z.number({ message }),
  
  positiveNumber: (message = 'Deve ser um número positivo') => 
    z.number().positive(message),
  
  age: (message = 'Idade deve estar entre 0 e 120 anos') => 
    z.number().min(0).max(120, message),
  
  weight: (message = 'Peso deve estar entre 0.1 e 50 kg') => 
    z.number().min(0.1).max(50, message),
  
  babyName: (message = 'Nome deve ter entre 2 e 50 caracteres') => 
    z.string().min(2).max(50, message),
  
  foodName: (message = 'Nome do alimento deve ter entre 2 e 30 caracteres') => 
    z.string().min(2).max(30, message),
  
  date: (message = 'Data inválida') => 
    z.date({ message }),
  
  futureDate: (message = 'Data deve ser no futuro') => 
    z.date().refine(date => date > new Date(), { message }),
  
  pastDate: (message = 'Data deve ser no passado') => 
    z.date().refine(date => date < new Date(), { message }),
  
  time: (message = 'Horário inválido') => 
    z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, message),
  
  phone: (message = 'Telefone inválido') => 
    z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, message),
  
  url: (message = 'URL inválida') => 
    z.string().url(message)
}; 