import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/sucess";

export default function Success() {
    return (
        <SuccessContainer>
            <h1>Compra efetuada!</h1>

            <ImageContainer></ImageContainer>

            <p>
                Uhuul <span>André Borges</span>, sua <span>Camiseta Astro Code</span> já está a caminho da sua casa.
            </p>

            <Link href="/">
                Voltar ao Catalogo
            </Link>
        </SuccessContainer>
    )
}