import { render, screen } from '@testing-library/react';
import React from 'react'
import App from '../App';
import Conta from './Conta'

describe('Componente Conta', () => {

  it("valor está formatado com marcara", () => {
    render(<Conta saldo={1000}/>)

    const saldo = screen.getByTestId('saldo-conta');

    expect(saldo.textContent).toBe('R$ 1000');

  })

});