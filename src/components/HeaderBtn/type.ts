import React from 'react'

export interface btnType{
    name: string
    icon: React.ReactNode
    style?: React.CSSProperties | undefined
    disabled?: boolean
    onClick?: () => void
    show: boolean
}