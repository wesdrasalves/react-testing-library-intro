import React from 'react'
import { render, screen,fireEvent } from '@testing-library/react'

import App, { calcularNovoSaldo } from './App';

describe('Componente principal', () => {
  describe('Quando eu abro o app do banco', () => {
    // eslint-disable-next-line no-sequences
    it('O nome é exibido', () => {
      render(<App/>)
  
      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    });
    
    it('O Saldo é exibido', () => {
      render(<App/>);
      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    })
  });

  describe("Quando eu realizo uma transacao", () => {
    
    it('que é um saque, o valor vai diminuir', () =>{
      const valores1 = {
        transacao: 'saque',
        valor: 50
      }

      const novoSaldo1 = calcularNovoSaldo(valores1, 150);

      expect(novoSaldo1).toBe(100)

    });
    it('que é um deposito, o valor vai aumenta', () =>{
      const valores = {
        transacao: 'deposito',
        valor: 50
      }

      const novoSaldo = calcularNovoSaldo(valores, 100);

      expect(novoSaldo).toBe(150)

    });

    it('que é um saque, a transacao deve ser realizada', () => {
      const {
             getByText, 
             getByLabelText, 
             getByTestId
            } = render(<App/>)

      const saldo = getByText('R$ 1000');
      const transacao = getByLabelText('Saque');
      const valor = getByTestId('valor');
      const botaoTransacao = getByText('Realizar operação');

      fireEvent.click(transacao, {target: {value : 'saque'}});
      fireEvent.change(valor, {target: {value: 10}});
      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe('R$ 990')
    });

    
    
  })
})