import React, { ButtonHTMLAttributes } from 'react'

import {Container} from './style';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => (
    <Container type="button" {...props} >
        {props.children}
    </Container>
)

export default Button;