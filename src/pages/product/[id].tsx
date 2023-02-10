import { stripe } from "@/src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Stripe from "stripe"

interface ProductProps {
    product: {
      id: string
      name: string
      imageUrl: string
      price: string
      description: string
      defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    async function handleBuyProduct() {
        try {
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })

            const { checkoutUrl } = response.data

            // Estamos mandado para uma pagina externa
            window.location.href = checkoutUrl

        } catch (err) {
            alert('Falha ao redirencionar ao checkout!!!')
        }
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt=""/>
                
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>

                <button onClick={handleBuyProduct}>
                    Comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // adicionar os produtos mais acessados ou comprados
    return {
        paths: [
            {params: {id: 'prod_NJad81ZEvgJqr2'}}
        ],
        fallback: 'blocking',
    }
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
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1, // 1 hora
    }
}