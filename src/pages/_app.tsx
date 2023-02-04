import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'
import Image from 'next/image'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image 
          src={logoImg.src} 
          alt="" 
          width={40}
          height={40}
        />
      </Header>
      <Component {...pageProps} />
    </Container>
    
  )
}
