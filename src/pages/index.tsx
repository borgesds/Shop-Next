/* home */
import Image from "next/image"

import { GetServerSideProps } from "next"
import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from "keen-slider/react"
import 'keen-slider/keen-slider.min.css'

import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png'

import { stripe } from "../lib/stripe"

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })


  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={camiseta1} width={520} height={480} alt=""/>

        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta2} width={520} height={480} alt=""/>

        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt=""/>

        <footer>
          <strong>Camiseta z</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta1} width={520} height={480} alt=""/>

        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

    </HomeContainer>
  )
}

/* Busca API para não para o usuário final não ter acesso */
export const getStaticProps: GetServerSideProps = async () => {
  const response = await stripe.products.list()

  console.log(response.data)

  return {
    props: {
      list: [1, 2, 3]
    }
  }
}