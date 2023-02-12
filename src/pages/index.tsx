/* home */
import Image from "next/image"
import Head from "next/head"

import { GetStaticProps } from "next"
import Link from "next/link"
import { ArrowFromRight, HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from "keen-slider/react"
import 'keen-slider/keen-slider.min.css'

import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import { BiArrowFromRight } from "react-icons/bi";

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })


  return (
    <>
      <Head>
        <title>Home | iGUIS Shop</title>
      </Head>

      <ArrowFromRight>
        <BiArrowFromRight size={30} />
        Click e arraste para o lado para ver mais produtos
      </ArrowFromRight>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt=""/>

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
    
  )
}

/* Busca API para não para o usuário final não ter acesso */
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    // Para buscar o preço padrão do produto
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount === null ? 0 : price.unit_amount / 100), // Preço do produto
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}