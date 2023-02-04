import { styled } from "../styles"

const Button = styled('button', {
  backgroundColor: '$green300',
  borderRadius: 6,
  border: 0,
  padding: '4px 8px',

  span: {
    fontWeight: 'bold',
    padding: '4px',
  },

  '&:hover': {
    filter: 'brightness(90%)',
  },
})

export default function Home() {
  return (
    <Button>
      <span>Teste</span>
      Enviar
    </Button>
  )
}
