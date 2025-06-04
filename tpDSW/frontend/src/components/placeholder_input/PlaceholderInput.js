import './PlaceholderInput.css';

export const PlaceholderSimple = ({tipo, placeInicial}) => {
    return <input type={tipo} placeholder={placeInicial} className="search-input"/>
}

export const PlaceholderDoble = ({tipo, placeInicial, placeFinal}) => {
    return <div className="rango">
        <input type={tipo} placeholder={placeInicial} />
        <p>{"-"}</p>
        <input type={tipo} placeholder={placeFinal} />
    </div>
}