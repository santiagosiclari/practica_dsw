import "./CardItem.css"

export const CardItem = ({ nombre, imagen, precio, seleccionado, alSeleccionarItem }) => {
    return <div
        className={`card ${seleccionado && "selected"}`}
        onClick={alSeleccionarItem}
    >
        <h3>{nombre}</h3>
        <img src={imagen} alt={"Imagen" + nombre + " item"} />
        <p className="price">${precio}</p>
    </div>
}