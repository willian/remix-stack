import Index from '../../routes/index'
import { render, screen, within } from '@testing-library/react'

test('home', () => {
  render(<Index />)

  const main = within(screen.getByRole('main'))
  expect(main.getByRole('heading', { level: 1, name: /welcome to remix/i })).toBeInTheDocument()

  const links = main.getAllByRole('link')
  expect(links.length).toBe(3)
  expect(links[0]).toHaveAttribute('href', 'https://remix.run/tutorials/blog')
  expect(links[1]).toHaveAttribute('href', 'https://remix.run/tutorials/jokes')
  expect(links[2]).toHaveAttribute('href', 'https://remix.run/docs')
})
