import { url } from "inspector";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
    customerName: string
    product: {
        name: string
        imageUrl: string
    }
}

export default function Success({ customerName, product }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | iGUIS Shop</title>

                <meta name="robots" content="noindex" />
            </Head>

            <SuccessContainer>
                <h1>Compra efetuada!</h1>

                <ImageContainer>
                    <Image src={product.imageUrl} width={120} height={110} alt="" />
                </ImageContainer>

                <p>
                    Uhuul <span>{customerName}</span>, sua <span>{product.name}</span> já está a caminho da sua casa.
                </p>

                <Link href="/">
                    Voltar ao Catalogo
                </Link>
            </SuccessContainer>
        </>
    )
        
        
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    // Redirecionar para a home se não tiver acesso
    if (!query.session_id) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    const sessionId = String(query.session_id)

    if (!sessionId) {}

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details.name
    const product = session.line_items.data[0].price.product

    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0],
            }
        }
    }
}