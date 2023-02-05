import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg'
import { Container, Header, Logo } from '../styles/pages/app'
import Image from 'next/image'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Logo>
          <Image 
            src={logoImg.src} 
            alt="" 
            width={50}
            height={50}
          />

          <div>
            <span>iGUIS Shop</span>
          </div>
        </Logo>
      </Header>
      <Component {...pageProps} />
    </Container>
    
  )
}
