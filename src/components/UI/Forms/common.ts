import { css } from '@theme'

interface IInputProps {
  hasError?: boolean
}

export const baseInputStyle = css`
  font-family: inherit;
  font-size: 1.25rem;
  line-height: 1.25;

  display: inline-flex;
  width: 100%;

  background-color: transparent;
  color: ${({ theme }) => theme.colors.foreground};

  border: 0;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  appearance: none;
  -webkit-appearance: none;

  border-bottom: 1px solid ${({ theme }) => theme.colors.subtle};
  padding: 0.25rem 0;

  transition: border-color ${({ theme }) => theme.transitions.ease()},
    color ${({ theme }) => theme.transitions.ease()};

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    color: ${({ theme }) => theme.colors.foreground} !important;
    transition: all 5000s ease-in-out 0s;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.medium};
  }

  &:active,
  &:focus {
    border-color: ${({ theme }) => theme.colors.foreground};

    ${(p: IInputProps) =>
      p.hasError &&
      css`
        color: ${({ theme }) => theme.colors.error};
        border-color: ${({ theme }) => theme.colors.error};
      `}
  }

  ${(p: IInputProps) =>
    p.hasError &&
    css`
      color: ${({ theme }) => theme.colors.error};
      border-color: ${({ theme }) => theme.colors.error};
    `}
`
