import { useEffect, useState } from "react"
import { useCarDataMutate } from "../../hooks/useCarDataMutate"
import { CarData } from "../../interface/CarData"
import "./modal.css"

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

const Input = ({label, value, updateValue}: InputProps) => {
    return(
        <>
        <label>{label}</label>
        <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

interface ModalProps {
    closeModal(): void
}

export function CreateModal({ closeModal : ModalProps}) {

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const {mutate, isSuccess} = useCarDataMutate()

    const submit = () => {
        const carData: CarData = {
            title,
            price,
            image
        }
        mutate(carData)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal()
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo carro na concessionária</h2>
                <form className="input-container">
                <Input label="Nome do carro" value={title} updateValue={setTitle} />
                <Input label="Preço" value={price} updateValue={setPrice} />
                <Input label="Url da imagem" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary">Send</button>
            </div>
        </div>
    )}