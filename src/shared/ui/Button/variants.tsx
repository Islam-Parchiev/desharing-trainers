import { cva } from "class-variance-authority";

export const buttonVariants = cva('Button', {
    variants: {
        variant: {
            default: 'Button__primary',
            primary: 'Button__primary',
            secondary: 'Button__secondary',
            iconPrimary: 'Button__iconPrimary',
            iconSecondary: 'Button__iconSecondary',
            iconThird: 'Button__iconThird',
        },
        size: {
            default: 'Button__big',
            big: 'Button__big',
            medium: 'Button__medium',
            small: 'Button__small',
            iconBig: 'Button__iconBig',
            iconSmall: 'Button__iconSmall',
        },
        loading: {
            true: 'Button__loading',
        },
        fullWidth: {
            true: 'Button__fullWidth',
        },
        isDisabled: {
            true: 'Button__disabled',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})