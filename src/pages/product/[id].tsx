import { stripe } from "@/src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"

interface ProductProps {
    product: {
      id: string
      name: string
      imageUrl: string
      price: string
      description: string
    }
}

export default function Product({ product }: ProductProps) {
    const { query } = useRouter()

    return (
        <ProductContainer>
            <ImageContainer>
                
            </ImageContainer>

            <ProductDetails>
                <h1>Camiseta x</h1>
                <span>R$ 79,90</span>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nulla quas accusamus, beatae quasi atque commodi laboriosam ipsam, vitae maxime, deserunt voluptas facilis magni debitis sit et odit quae? Quaerat?</p>

                <button>
                    Comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }: any) => {
    // vamos usar o params para pegar o id do produto que exibir na pagina
    const productId = params.id

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    // Para buscar o preço padrão do produto
    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount === null ? 0 : price.unit_amount / 100), // Preço do produto
                description: product.description,
            }
        },
        revalidate: 60 * 60 * 1, // 1 hora
    }
}