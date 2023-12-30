import { PersonNameProps } from '@/shared/value-objects/PersonName/types/PersonNameProps';
import PersonNameValidatorFacade from '@/utils/facades/PersonNameValidatorFacade';

describe('PersonNameValidatorFacade', () => {
  it('should validate person name props successfully', () => {
    const validProps: PersonNameProps = {
      firstName: 'John',
      lastName: 'Doe',
    };

    expect(() =>
      PersonNameValidatorFacade.validateProps(validProps)
    ).not.toThrow();
  });

  it('should throw validation errors for invalid person name props', () => {
    const invalidProps: PersonNameProps = {
      firstName: 'John123',
      lastName: 'Doe',
    };

    expect(() =>
      PersonNameValidatorFacade.validateProps(invalidProps)
    ).toThrow();
  });
});
